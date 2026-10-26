// api/inquiry.js (Vercel Serverless Function)
export default async function handler(req, res) {
  // CORS 및 POST 메서드 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { category, name, email, phone, content, honeypot } = req.body || {};

  // 1. 스팸 봇(Honeypot) 차단: 숨겨진 필드에 값이 있으면 가짜 성공 응답 후 조용히 종료
  if (honeypot) {
    return res.status(200).json({ success: true, message: 'Processed' });
  }

  // 2. 필수 입력값 검증
  if (!category || !name || !email || !phone || !content) {
    return res.status(400).json({ error: '모든 필수 항목을 입력해 주세요.' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const ALERT_TO_EMAIL = process.env.ALERT_TO_EMAIL || 'young.kim@aionlabs.kr';

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  try {
    // 3. Supabase Cloud DB에 영구 저장 (Service Role Key로 안전하게 직접 REST INSERT)
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/partnerships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          category,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          content: content.trim(),
          client_ip: Array.isArray(clientIp) ? clientIp[0] : (clientIp.split(',')[0] || '').trim(),
          user_agent: userAgent
        })
      });

      if (!dbRes.ok) {
        const errText = await dbRes.text();
        console.error('Supabase DB Insert Error:', errText);
        throw new Error('데이터베이스 저장 실패');
      }
    } else {
      console.warn('SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 미설정 상태입니다.');
    }

    // 4. Resend API를 통해 대표님 메일로 즉시 포워딩
    const categoryLabels = {
      gov: '지자체 행정홍보 / 기획예산 / 방재과 (B2G)',
      merchant: '소상공인 / 전통시장 / 슈퍼마켓협동조합 (B2B)',
      ir: '투자사 / 액셀러레이터 / TIPS 운영사 (IR)',
      other: '기타 비즈니스 제휴'
    };

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #1E3A8A; color: white; padding: 24px;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 800;">🏛️ Locally 제휴·협약 신규 신청 접수</h2>
          <p style="margin: 6px 0 0; font-size: 13px; color: #93C5FD;">로컬리 홍보 웹사이트를 통해 새로운 상담 요청이 접수되었습니다.</p>
        </div>
        <div style="padding: 24px; background: #FFFFFF; font-size: 14px; line-height: 1.6; color: #0F172A;">
          <div style="margin-bottom: 12px;"><strong>• 협력 구분:</strong> <span style="color: #EA580C; font-weight: bold;">${categoryLabels[category] || category}</span></div>
          <div style="margin-bottom: 12px;"><strong>• 신청자/직함:</strong> ${name}</div>
          <div style="margin-bottom: 12px;"><strong>• 공식 이메일:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></div>
          <div style="margin-bottom: 16px;"><strong>• 직통 연락처:</strong> <a href="tel:${phone}" style="color: #059669; font-weight: bold; font-size: 16px;">${phone}</a> <span style="font-size: 12px; color: #64748B;">(클릭 시 통화 연결)</span></div>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <div style="font-size: 12px; color: #64748B; margin-bottom: 6px; font-weight: bold;">[문의 상세 내용]</div>
            <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${content}</div>
          </div>
          <div style="margin-top: 20px; font-size: 11px; color: #94A3B8; border-top: 1px solid #F1F5F9; padding-top: 12px;">
            접수 일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} (KST)<br>
            접속 IP: ${Array.isArray(clientIp) ? clientIp[0] : (clientIp.split(',')[0] || '').trim()}
          </div>
        </div>
      </div>
    `;

    if (RESEND_API_KEY) {
      const mailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Locally 알림 <onboarding@resend.dev>',
          to: [ALERT_TO_EMAIL],
          subject: `[Locally 제휴접수] ${name}님 (${categoryLabels[category] || category})`,
          html: emailHtml
        })
      });

      if (!mailRes.ok) {
        const mailErr = await mailRes.text();
        console.error('Resend Mail Send Error:', mailErr);
      }
    } else {
      console.warn('RESEND_API_KEY 미설정 상태입니다.');
    }

    return res.status(200).json({ success: true, message: '정상 접수 완료' });
  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    return res.status(500).json({ error: '서버 내부 오류로 접수에 실패했습니다.' });
  }
}

제공해주신 HTML 기획안의 모든 디자인 토큰, 텍스트, 구조, 컴포넌트 시뮬레이션 및 스크립트 로직을 누락 없이 정리한 **Antigravity Coding Agent 제공용 마크다운(Markdown) 문서**입니다.

---

# 로컬리(Locally) 디자인 시스템 & 브랜드 가이드라인

> **버전/식별자**: 🏛️ Locally AX/DX Design System v1.2  
> **문서 목적**: 공공데이터의 확고한 신뢰(Civic Trust)와 골목상권의 생동감(Commerce Vitality)을 상호 순환시키는 초지역(Hyper-Local) 맞춤형 정보포털 디자인 시스템 가이드

---

## 0. 기술 명세 & 글로벌 디자인 토큰 (CSS Variables)

### 0.1 폰트 설정 (Typography)
* **Pretendard Font CDN**: 
  ```html
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
  ```
* **Font Family**: `"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif`
* **Text Smoothing**: `-webkit-font-smoothing: antialiased;`
* **Line Height**: `1.6`

### 0.2 디자인 토큰 정의 (`:root`)
```css
:root {
  /* [Brand Core Tokens] */
  --civic-deep-blue: #1E3A8A;       /* Primary: 신뢰, 공공데이터 */
  --civic-blue-light: #EFF6FF;
  --tangerine-action: #EA580C;       /* Secondary CTA: WCAG AA 준수 (4.58:1) */
  --tangerine-vivid: #F97316;        /* Secondary Badge: 고채도 활력 */
  --tangerine-light: #FFF7ED;
  
  /* [Functional & Semantic Tokens] */
  --alert-crimson: #DC2626;         /* Danger/Emergency */
  --alert-crimson-light: #FEF2F2;
  --meadow-green: #059669;          /* Safety/Eco/Clean */
  --meadow-green-light: #ECFDF5;
  --merchant-gold: #D97706;         /* @상점명백 전용 공인 뱃지 */
  --merchant-gold-light: #FEF3C7;

  /* [Neutral Tokens] */
  --slate-charcoal: #0F172A;        /* Base Text */
  --slate-muted: #64748B;           /* Secondary Text */
  --border-subtle: #E2E8F0;         /* Line / Divider */
  --off-white: #F8FAFC;             /* Page Background */
  --surface-white: #FFFFFF;         /* Card Surface */

  /* [Layout & Elevation] */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-card: 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-hover: 0 12px 24px -4px rgba(15, 23, 42, 0.1);
}
```

### 0.3 글로벌 레이아웃 & 반응형 중단점 (Breakpoints)
* **최대 너비**: `1200px` (중앙 정렬)
* **Hero Background**: `linear-gradient(135deg, #09132C 0%, var(--civic-deep-blue) 100%)`
* **Hero Radial Effect**: `radial-gradient(circle, rgba(234, 88, 12, 0.18) 0%, transparent 70%)` (top: -50%, right: -20%, width: 500px, height: 500px)
* **미디어 쿼리 (반응형 규칙)**:
  * `max-width: 900px`:
    * `.engine-grid` 템플릿: `grid-template-columns: 1fr 1fr;`
    * `.sandbox-grid` 템플릿: `grid-template-columns: 1fr;`
  * `max-width: 580px`:
    * `.engine-grid` 템플릿: `grid-template-columns: 1fr;`
    * `.hero` 패딩: `44px 18px 36px;`
    * `.main-container` 패딩: `24px 16px 60px;`

---

## 1. 헤더 영역 (Executive Header)

* **상단 배지**: `🏛️ Locally AX/DX Design System v1.2`
  * 스타일: `background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(8px); color: #93C5FD; border-radius: 99px; font-size: 13px; font-weight: 600;`
* **헤드라인 (H1)**: `로컬리(Locally) 브랜드 & 비주얼 전략`
  * 타이포그래피: `font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -0.02em;`
* **디스크립션 (P)**: 
  > 공공데이터의 확고한 신뢰(Civic Trust)와 골목상권의 생동감(Commerce Vitality)을 상호 순환시키는 초지역(Hyper-Local) 맞춤형 정보포털 디자인 시스템 가이드입니다.
  * 스타일: `font-size: 16px; color: #CBD5E1; max-width: 820px; line-height: 1.65;`

---

## 2. 브랜드 포지셔닝 & 4C 가치 체계 (Brand Core Values)

> **그리드 구조**: 4열 그리드 (`grid-template-columns: repeat(4, 1fr); gap: 16px;`), 각 카드 상단 4px 보더 적용

| 엔진 / 가치 | 상단 보더 컬러 | 설명 |
| :--- | :--- | :--- |
| **🏛️ Civic Trust (공공 신뢰)** | `--civic-deep-blue` (`#1E3A8A`) | 지자체 공식 보도자료, 기상청 단기 실황, 재난문자 등 공공데이터 원천을 왜곡 없이 투명하게 전달합니다. |
| **🛒 Commerce (골목 활력)** | `--tangerine-action` (`#EA580C`) | 동네 슈퍼마켓, 전통시장의 타임세일과 공동구매를 옴니채널로 연계해 지역 내 소비 촉진을 이끕니다. |
| **⚡ Agility (초국지성 민첩성)** | `--meadow-green` (`#059669`) | 트위터형 200자 마이크로 소통, 10분 단위 국지성 기상 이변, 반경 내 거주자 인증 번개모임을 지원합니다. |
| **🔄 Circularity (상생 순환)** | `--merchant-gold` (`#D97706`) | 지자체 정책 홍보와 상권 DX를 결합하여 지역 소멸을 방지하고 국토 균형 발전의 기반을 마련합니다. |

---

## 3. 정밀화된 브랜드 컬러 팔레트 (Refined Color System)

> **인터랙션 안내**: `HEX 코드를 클릭하면 클립보드로 복사됩니다`  
> **그리드 구조**: 반응형 카드 그리드 (`minmax(270px, 1fr); gap: 20px;`)

### 3.1 Civic Deep Blue
* **토큰 태그**: `PRIMARY · 공공 신뢰`
* **HEX 코드**: `#1E3A8A`
* **WCAG 검증**: `AAA 준수 (11.9:1)` (배경: `#DCFCE7`, 텍스트: `#166534`)
* **상세 설명**: 지자체 공식 보도자료, GNB 바, 신뢰 데이터 카드에 기본 적용되는 기둥 컬러입니다.
* **적용 영역 (Usages)**: `지자체 보도`, `기상청 연동`, `헤더`

### 3.2 Hyper Tangerine (Action)
* **토큰 태그**: `SECONDARY · 행동 유도`
* **HEX 코드**: `#EA580C`
* **WCAG 검증**: `AA 통과 (4.58:1)`
* **상세 설명**: 야외 모바일 시인성을 극대화한 CTA 전용 오렌지색으로, 주문 및 참가 전환을 촉진합니다.
* **적용 영역 (Usages)**: `공동구매 CTA`, `번개모임 신청`, `장바구니`

### 3.3 Merchant Gold (@상점명백 전용)
* **토큰 태그**: `MERCHANT · 골목상점`
* **HEX 코드**: `#D97706`
* **WCAG 검증**: `인증 마크`
* **상세 설명**: 사업자 인증을 마친 '@상점명백(白)' 소상공인 계정의 프리미엄 인증 배지에 사용됩니다.
* **적용 영역 (Usages)**: `@상점명백 배지`, `단골 랭킹`, `우수점포`

### 3.4 Meadow Green
* **토큰 태그**: `ECO / SAFETY · 환경·안전`
* **HEX 코드**: `#059669`
* **WCAG 검증**: `AA 통과`
* **상세 설명**: 미세먼지 ‘좋음’, 자외선 안전, 안심 결제 인증 마크 등 긍정적 생활 환경을 전달합니다.
* **적용 영역 (Usages)**: `대기질 좋음`, `러닝 지수`, `안심결제 완료`

### 3.5 Alert Crimson
* **토큰 태그**: `EMERGENCY · 기상특보`
* **HEX 코드**: `#DC2626`
* **WCAG 검증**: `긴급/특보`
* **상세 설명**: 호우·폭염·대설 등 지자체 기상특보 및 마감 10분 전 타임세일 경고에 한정 사용됩니다.
* **적용 영역 (Usages)**: `기상특보`, `재난문자`, `마감임박 칩`

### 3.6 Slate Charcoal
* **토큰 태그**: `NEUTRAL DARK · 텍스트`
* **HEX 코드**: `#0F172A`
* **WCAG 검증**: `최고 명암비`
* **상세 설명**: 장시간 뉴스 열람 시 눈의 피로를 최소화하는 본문용 텍스트 및 3D 캔버스 배경 컬러입니다.
* **적용 영역 (Usages)**: `기사 본문`, `피드 텍스트`, `3D Canvas`

---

## 4. 실제 화면 컴포넌트 적용 시뮬레이션 (Live Hyper-Local UI Component Sandbox)

> **그리드 구조**: 2열 그리드 (`grid-template-columns: 1fr 1fr; gap: 24px;`)

### 4.1 Panel A: 공공 데이터 & 안전 영역
* **타이틀 바**:
  * 좌측: `🏛️ 공공 데이터 & 안전 영역`
  * 우측: `역삼1동 기준`
* **긴급 재난 바 (Emergency Alert Bar)**:
  * 배경: `--alert-crimson-light` (`#FEF2F2`), 보더: `#FECACA`
  * 배지: `긴급특보` (`background: var(--alert-crimson); color: white; animation: pulse 1.8s infinite;`)
  * 내용: `14:30 강남구 전역 호우주의보 발령, 반지하 및 축대 점검 요망` (`color: #991B1B;`)
* **지자체 공식 보도자료 카드 (Gov Press Release Card)**:
  * 보더 스타일: 좌측 3.5px 솔리드 `--civic-deep-blue` (`#1E3A8A`), 배경: `--off-white`
  * 배지: `🏛️ 강남구청 보도자료` (배경: `--civic-blue-light`, 텍스트: `--civic-deep-blue`)
  * 타이틀: `골목상권 DX 활성화를 위한 모바일 포털 연계 지원` (15px, 700)
  * 본문: `역삼1동 소상공인 대상 오픈채팅 주문 연동 및 수수료 제로 결제망 구축 시범사업을 실시합니다.` (12.5px, `--slate-muted`)
* **날씨 및 환경 Bento Strip**:
  * 2단 그리드 구성 (`1fr 1fr`, gap: 8px)
  * 카드 1:
    * 라벨: `미세먼지 실황`
    * 수치: `14 ㎍/㎥ (좋음)` (`color: var(--meadow-green); font-weight: 800; font-size: 16px;`)
  * 카드 2:
    * 라벨: `초단기 강우확률`
    * 수치: `75% (우산 필요)` (`color: var(--civic-deep-blue); font-weight: 800; font-size: 16px;`)

### 4.2 Panel B: 골목상권 옴니채널 커머스 (@상점명백 Feed)
* **타이틀 바**:
  * 좌측: `🛒 골목상권 옴니채널 커머스`
  * 우측: `반경 300m 이내`
* **상점 프로필 헤더 (Merchant Header)**:
  * 아바타: `🏬` (원형 40x40, 배경: `--merchant-gold-light`, 보더: `1.5px solid var(--merchant-gold)`)
  * 상점명: `@역삼국민상회백(白)`
  * 공인 배지: `공인상점` (`background: var(--merchant-gold); color: white; font-size: 10px;`)
  * 메타 정보: `소상공인연합회 DX 인증 • 8분 전` (11px, `--slate-muted`)
* **피드 본문 텍스트**:
  > 오늘 새벽 가락시장에서 직송된 산딸기 40팩 한정 번개세일! 댓글로 주문 수량을 남기시면 자동 접수됩니다. 🍓
* **타임세일 특가 카드 (Deal Card)**:
  * 배경: `--tangerine-light`, 보더: `#FED7AA`
  * 배지 행:
    * 배지: `⏳ 18:00 마감 타임세일` (배경: `--tangerine-vivid`, 글자색: 흰색)
    * 잔여 수량: `잔여 8팩` (11px, bold, `color: var(--tangerine-action);`)
  * 상품명: `지리산 친환경 산딸기 500g 1박스` (14px, bold)
  * 가격 영역:
    * 판매가: `9,900원` (17px, bold, `color: var(--tangerine-action);`)
    * 정상가 (취소선): `~~16,000원~~` (12px, normal, `color: #94A3B8;`)
* **CTA 주문 버튼**:
  * 라벨: `댓글로 즉시 주문하기 (클릭)`
  * 스타일: `background: var(--tangerine-action); color: white; width: 100%; padding: 11px; border-radius: 8px; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25);`
  * 호버 상태: `background: #C2410C;`
  * 클릭 액션: `alert('댓글 주문 및 예약 프로세스로 이동합니다.')`

---

## 5. 색상 배분 비율 (60-30-10 법칙 / The 60-30-10 Rule Alignment)

> **원칙 목적**: 시각 피로도 감소와 전환율 극대화의 황금비

### 5.1 시각 배분 바 (Visual Ratio Bar)
```
[================ 60% ===============][========= 30% =========][=== 10% ===]
          60% Base                      30% Civic Blue          10% Tangerine & Alert
 (Off White / White / Slate)          (신뢰/정보구조)                (전환/긴급)
  배경: #F1F5F9 / 글자: Slate         배경: #1E3A8A / 글자: White     배경: #EA580C / 글자: White
```

### 5.2 비율별 세부 가이드
* **60% 베이스**: 카드 표면, 모바일 배경, 본문 가독성을 지탱하여 시각 피로를 방지합니다.
* **30% 공공 구조**: GNB, 지자체 공식 배지, 기상 대시보드 레이아웃에 배치되어 '정부·지자체 포털급 신뢰'를 구축합니다.
* **10% 인터랙션**: 타임세일 주문 CTA 버튼, 재난 알림 등 사용자 반응이 반드시 필요한 스팟에만 제한적으로 사용하여 집중도를 극대화합니다.

---

## 6. 인터랙션 및 스크립트 명세 (Script & Animations)

### 6.1 긴급 알림 펄스 애니메이션 (Keyframes)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

### 6.2 토큰 클립보드 복사 토스트 알림 (JavaScript & Toast UI)
* **토스트 UI 엘리먼트**: `#copyToast`
  * 기본 텍스트: `컬러 코드가 복사되었습니다!`
  * 포지션: `fixed; bottom: 24px; right: 24px; z-index: 1000;`
  * 스타일: `background: var(--slate-charcoal); color: white; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; opacity: 0; transform: translateY(10px); transition: all 0.25s ease-out;`
  * 활성화 클래스 (`.show`): `opacity: 1; transform: translateY(0);`
* **동작 스크립트 함수**:
```javascript
function copyToken(hexCode) {
  navigator.clipboard.writeText(hexCode).then(() => {
    const toast = document.getElementById('copyToast');
    toast.textContent = `${hexCode} 코드가 클립보드에 복사되었습니다.`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
}
```
# 【특허출원 명세서】

## 【발명의 명칭】

* **국문:** 시공간 기상 벡터의 이류-감쇠 추적 및 지형 가중치 기반 지역 누적 기상 히스토리 유사도 매칭을 이용한 초지역 기상이변 피해 예측, 임계 절단형 생체기상학 활동지수 산출 및 인공지능 행동 강령 생성 시스템, 그 동작 방법, 컴퓨터 판독 가능 기록매체 및 컴퓨터 프로그램
* **영문:** System, Method, Computer-Readable Medium, and Computer Program for Hyper-Local Weather Anomaly Damage Prediction, Threshold-Cutoff Biometeorological Activity Index Calculation, and AI Action Guideline Generation Using Spatio-Temporal Weather Vector Advection-Decay Tracking and Topographically Weighted Regional Historical Weather Similarity Matching



## 【기술분야】

본 발명은 초지역(Hyper-Local, 동네 단위 미시 권역) 기상 인텔리전스 및 재난 예방 기술에 관한 것으로, 더욱 상세하게는 기상 위성 및 레이더 연속 프레임의 무경계 오버스케일(Overscale, 해상도 한계 초과 확대 보간) 합성과 강수 셀의 이류-감쇠(Advection-Decay, 수평 이동 및 세력 증감) 벡터 연산을 통해 분 단위 도달 예상 시간(ETA, Estimated Time of Arrival)을 산출하고, 지형적 취약성 가중치가 반영된 기초지자체별 과거 기상 극값 데이터베이스와의 다변량 유사도 매칭을 통해 역대 위험도 백분위 및 당시 지역 피해 뉴스 기사를 바인딩(Binding, 데이터 결합)하며, 선행 강수 포화도와 노면 온도를 반영한 임계 절단형(Threshold-Cutoff, 특정 임계치 도달 시 점수를 급격히 차단하는 방식) 생체기상학 활동지수 및 인공지능 기반 맞춤형 행동 강령과 골목상권 동적 타임세일 트리거를 통합 생성하는 시스템, 그 동작 방법, 컴퓨터 판독 가능 기록매체 및 컴퓨터 프로그램에 관한 것이다.

* **국제특허분류 (IPC / CPC):** G01W 1/10 (기상 예측), G06F 16/29 (지리정보 데이터베이스), G06N 20/00 (기계학습), G06Q 50/26 (공공안전 및 재난관리 서비스)



## 【발명의 배경이 되는 기술】

### 1.1 배경 기술

기후변화 가속화로 인해 반경 500m 내지 5km 이내의 좁은 지역에서 수십 분 내에 급격히 발달하고 소멸하는 국지성 극한호우(Guerrilla Heavy Rain, 게릴라성 폭우), 돌풍(Microburst, 국지성 하강 돌풍), 도로 살얼음(Black Ice, 노면 박막 결빙), 극한 폭염 등 초지역 기상이변이 빈발하고 있다. 
이에 따라 모바일 단말을 통해 사용자가 위치한 동네의 기상 변화를 분 단위로 추적하고, 야외 활동(러닝, 등산, 운전 등)의 물리적·생리적 위험도를 정량적으로 평가하며, 재난에 선제적으로 대비할 수 있도록 지원하는 초지역 기상 인텔리전스 기술의 필요성이 급증하고 있다.

### 1.2 종래 기술의 한계 및 기술적 문제점

종래의 기상 정보 제공 시스템 및 선행문헌들은 다음과 같은 4가지 구조적 한계를 내포하고 있다.

1. **이종 기상 타일 간 해상도 붕괴 및 비구름 세력 변화 미반영:**
	* 종래의 기상 애플리케이션은 물리적 해상도가 낮은 정지궤도 위성 적외선 타일(최대 줌 레벨 7~8)과 지상 기상 레이더 타일(최대 줌 레벨 11~12)을 동 단위 고배율 뷰포트(줌 레벨 14~16)로 확대할 때 타일 결측(HTTP 404 Error)이나 심각한 격자 깨짐(Pixelation, 픽셀 계단 현상)이 발생한다.
	* 또한 단순 중심점 외삽만 수행할 뿐 이동 중 강수 셀의 발달·소멸률(Growth/Decay Rate)과 접근 각도 내적을 연산하지 못해, 실제 동네 도달 시점의 강수 강도와 잔여 시간(ETA) 예측 정확도가 현저히 떨어진다.

1. **기상 수치의 인지적 단절(Cognitive Gap) 및 지형 특성 배제:**
	* 일반 시민에게 "시간당 강수량 45mm, 최대풍속 14m/s"라는 물리적 수치만 제시할 경우, 해당 수치가 자신의 거주 지역 지형(분지, 해안, 급경사지 등)에서 어느 정도의 침수나 파손 피해를 일으키는 수준인지 직관적으로 체감하지 못해 대피 골든타임을 놓치게 된다.

2. **단순 선형 합산 방식 생활기상지수의 치명적 왜곡:**
	* 종래의 생활기상지수는 현재 시점의 기온과 습도만을 단순 가중 평균하여 산출한다.
	* 이로 인해 전날 내린 폭우로 등산로 토양이 포화되어 미끄럼 사고 위험이 극대화되었거나, 현재 하늘은 맑더라도 노면 온도가 영상 1.5°C 이하로 떨어져 블랙아이스가 형성된 치명적 위험 상황에서 '야외활동 좋음(80점 이상)'으로 오판하는 결함이 존재한다.

3. **백엔드 알고리즘 은닉에 따른 특허 침해 입증(Observability) 곤란 및 상권 연계 단절:**
	* 기상 연산 로직이 서버 내부에만 은닉될 경우 경쟁사가 이를 모방하더라도 외적 입증이 어렵다.
	* 또한 기상이변에 따른 동네 보행 유동인구 급감을 정량적으로 예측하여 인근 소상공인의 재고 소진(타임세일)과 유기적으로 연결하는 데이터 파이프라인이 부재하다.





## 【선행기술문헌】

* **특허문헌 1:** 미국 등록특허 제10,094,955호 (발명의 명칭: Method and System for Providing Hyper-Local Precipitation Forecasts, 2018.10.09. 등록) 
  (출처: USPTO, `[https://www.uspto.gov](https://www.uspto.gov)`)
* **특허문헌 2:** 대한민국 등록특허 제10-2189412호 (발명의 명칭: 기상 레이더 영상을 이용한 초단기 강수 예측 시스템 및 방법, 2020.12.04. 등록) 
  (출처: KIPRIS, `[https://www.kipris.or.kr](https://www.kipris.or.kr)`)
* **비특허문헌 1:** 국립재난안전연구원, "상황유사도 기반 재난전조정보 분석 및 과거 재난사례 매칭 알고리즘 개발", 연구보고서, 2022. 
  (출처: NDMI, `[https://www.ndmi.go.kr](https://www.ndmi.go.kr)`)



## 【발명의 내용】

### 【해결하고자 하는 과제】

본 발명은 상술한 종래 기술의 문제점을 해결하기 위해 안출된 것으로서, 다음과 같은 구체적인 기술적 과제를 해결하고자 한다.

1. 정지궤도 위성 적외선 구름 타일과 기상 레이더 반사도 타일을 동 단위 고배율 뷰포트에서 결측이나 격자 깨짐 없이 인메모리(In-Memory, 메모리 내 직접 처리) 합성하고, 강수 클러스터의 이류 벡터와 반사도 증감률을 동시에 연산하여 사용자 위치 도달 예상 시간(ETA)과 도달 시점 예상 강도를 분 단위로 정밀 도출한다.
2. 현재 관측 또는 예보된 다변량 기상 벡터에 선행 토양 포화도 및 기초지자체별 지형 취약성 가중치를 결합하여 과거 누적 기상 극값 DB와 유사도 연산을 수행함으로써, 역대 기상 위험도 백분위 순위(Percentile Rank)와 과거 동일 수준 기상이변 당시의 실제 지역 피해 뉴스 기사를 자동 바인딩하여 사용자에게 직관적인 간접체험 대시보드를 제공한다.
3. 실시간 7대 기상 변수에 선행 48시간 누적 강수량 및 노면 온도를 결합하고 비선형 감쇠 함수와 치명적 위험 컷오프 승수(Gate Multiplier, 특정 위험 조건 충족 시 전체 점수를 강제 감산하는 승수)를 적용하여 러닝·등산·운전 안전 지수를 100점 만점으로 산출하되, 변수별 감점 기여도를 설명 가능한 인공지능(XAI, Explainable AI) 분해 게이지로 시각화한다.
4. 산출된 분 단위 ETA, 역대 기상 순위 및 과거 뉴스, 3대 활동지수를 인공지능 언어 모델(LLM)의 결정론적 컨텍스트로 주입하여 맞춤형 행동 강령을 생성하고, 기상이변에 따른 동네 보행 유동인구 감쇠율이 임계치를 초과할 경우 관할 구역 소상공인 단말로 동적 타임세일 트리거를 발송하며, 이 모든 연산 결과가 클라이언트 화면의 고유한 UI 상태 전이(네온 펄스 링, 간접체험 모달, XAI 감점 바)로 동기화 표출되도록 하여 특허 침해의 외적 입증력을 극대화한다.

### 【과제의 해결 수단】

상기 과제를 해결하기 위한 본 발명의 일 실시예에 따른 초지역 기상이변 피해 예측 및 행동 강령 생성 시스템은: 기상 관측 서버로부터 위성 적외선 구름 타일 및 기상 레이더 반사도 타일을 포함하는 시계열 기상 데이터를 수신하는 통신 인터페이스; 전국 기초지자체 단위로 구분된 지형 취약성 계수, 과거 누적 기상 극값 레코드 및 해당 기상 현상 발생 당시의 지역 뉴스 기사 메타데이터를 연관 저장하는 데이터베이스(210); 및 상기 통신 인터페이스와 상기 데이터베이스(210)에 동작 가능하게 연결된 적어도 하나의 프로세서;를 포함하되, 상기 프로세서는 제1핵심계층(100, 시공간 벡터 추적 엔진), 제2핵심계층(200, 지형 가중 히스토리 유사도 및 뉴스 매칭 엔진), 제3핵심계층(300, 임계 절단형 생체기상학 활동지수 엔진), 및 제4핵심계층(400, 융합 AI 행동 강령 및 상권 트리거 제어 엔진)을 유기적으로 구동하고, 각 계층의 데이터 결측 및 이상치 발생 시 다단계 폴백(Fallback, 예비 대체 실행) 메커니즘을 수행하도록 구성된다.

### 【발명의 효과】

본 발명에 따르면 다음과 같은 탁월한 기술적·산업적 효과가 도출된다.

1. **고배율 무경계 기상 가시화 및 분 단위 골든타임 확보:** 물리적 해상도가 상이한 위성 및 레이더 타일을 오버스케일 보간 합성하고 이류-감쇠 벡터를 연산함으로써, 동네 주민이 기상이변의 도달 시점과 예상 강도를 분 단위로 정확히 파악하여 재난 대비 골든타임을 확보할 수 있다.
2. **과거 지역 피해 뉴스 간접체험을 통한 경각심 극대화:** 단순 수치 나열에서 벗어나 해당 기초지자체의 역대 기상 순위와 과거 유사 기상 당시의 실제 동네 침수·파손 뉴스 기사를 즉각 제시함으로써, 시민의 인지적 단절을 해소하고 자율 대피 및 예방 행동 실행률을 비약적으로 향상시킨다.
3. **선행 기상 및 노면 물리 상태가 반영된 무결점 안전 지수 제공:** 전날 강수에 의한 등산로 미끄럼 위험과 노면 온도·습도 결합에 의한 블랙아이스 위험을 비선형 컷오프 승수로 엄격히 차단하여, 맑은 날에도 발생할 수 있는 등산객 낙상 및 차량 다중 추돌 사고를 원천 예방한다.
4. **기상이변에 따른 골목상권 손실 방어 및 외적 침해 입증 완성:** 기상이변 도달 전 보행 유동인구 급감을 정량 예측하여 소상공인에게 선제적 타임세일 발행을 권고함으로써 지역 경제 손실을 줄이고, 백엔드 연산 산출물이 클라이언트의 고유한 시각적 식별 징표(Observable UI Evidence)와 1:1로 동기화되어 제3자의 특허 무단 도용을 화면 관측만으로 즉각 입증할 수 있다.



## 【도면의 간단한 설명】

* 【도면 1】은 본 발명의 일 실시예에 따른 초지역 기상이변 피해 예측, 임계 절단형 생체기상학 활동지수 산출 및 인공지능 행동 강령 생성 시스템의 전체 아키텍처와 참조 부호 매핑 구조를 도시한 블록 다이어그램이다.
* 【도면 2】는 본 발명의 일 실시예에 따른 공간 기상 게이트웨이(30)와 제1 내지 제4핵심계층(100, 200, 300, 400) 간의 비동기 병렬 데이터 흐름 및 골목상권 타임세일 트리거 시퀀스를 도시한 흐름도이다.
* 【도면 3】은 본 발명의 일 실시예에 따른 모듈 간 데이터 입출력(I/O, Input/Output) 파이프라인 및 6대 예외 상황(EX-01 ~ EX-06) 발생 시의 무중단 폴백(Fallback, 예비 대체 실행) 상태 전이를 도시한 상태도이다.



## 【발명을 실시하기 위한 구체적인 내용】

이하, 첨부된 도면 및 구체적인 실시예를 참조하여 본 발명이 속하는 기술 분야에서 통상의 지식을 가진 자가 용이하게 실시할 수 있도록 본 발명의 아키텍처(Architecture, 시스템 구조), 데이터 흐름(Data Flow, 데이터 처리 흐름), 입출력 명세(I/O Specification, 입출력 데이터 규격), 수학적 알고리즘, 데이터베이스 프로시저(Database Procedure, 데이터베이스 내장 함수) 및 예외 처리(Exception Handling, 오류 및 결측 대응 처리) 메커니즘을 상세히 설명한다.

### 1. 전체 시스템 아키텍처 및 데이터 흐름 (System Architecture & Data Flow)

본 발명에 따른 시스템은 모바일 웹 또는 네이티브 앱 형태의 **사용자 단말(10, Client PWA, Progressive Web Application)**, 인근 상점주가 운영하는 **소상공인 단말(20, Merchant Terminal)**, 클라이언트 요청을 중계하고 시공간 데이터를 조합하는 **공간 기상 게이트웨이(30, Spatial Weather BFF, Backend For Frontend)**, 그리고 4개의 핵심 연산 계층(Layer 1 ~ Layer 4, 도면부호 100 ~ 400)을 구동하는 백엔드 프로세서 및 공간 데이터베이스(210, PostgreSQL/PostGIS 기반)로 구성된다.

1. **공간 기상 게이트웨이(30, BFF):** 사용자 단말(10)로부터 위경도 좌표(`lat`, `lng`), 현재 지도 뷰포트의 줌 레벨(`zoomLevel`), 그리고 역지오코딩(Reverse Geocoding, 좌표를 행정구역 코드로 변환하는 처리)된 기초지자체 식별 코드(`space_id`, 전국 226개 시·군·구 표준 행정구역 코드)를 수신한다.
2. **병렬 파이프라인 실행(Parallel Execution):** 게이트웨이(30)는 응답 지연(Latency)을 최소화하기 위해 제1핵심계층(100, 타일 합성 및 벡터 연산), 제2핵심계층(200, 과거 히스토리 유사도 및 뉴스 매칭), 제3핵심계층(300, 생체기상학 활동지수 연산)을 비동기 병렬(Asynchronous Parallel)로 호출한 뒤, 그 중간 산출물들을 제4핵심계층(400, AI 행동 강령 및 상권 트리거 엔진)으로 집계(Aggregation)하여 최종 통합 페이로드(Payload, 전송 데이터 묶음)를 반환한다.



### 2. 계층별 데이터 입출력 명세 (I/O Specification)

본 시스템의 각 계층 간 데이터 결합 무결성을 보장하기 위한 표준 입출력 규격(I/O Specification)은 아래 표와 같다.

| **계층 구분**                             | **입력 데이터 규격**<br>(Input Specification)                                                                                                                                                            | **출력 데이터 규격** <br>(Output Specification)                                                                                                                                                                                                                   | **데이터 포맷 및 제약 조건**<br>(Constraints)                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Layer 1 (100, 시공간 벡터 추적 계층)**       | • `userCoord`: `{lat: float, lng: float}`<br>• `zoomLevel`: `int (0~20)`<br>• `radarFrames`: 시점 $t-20, t-10, t$의 격자 반사도 배열 `Array<{lat, lng, dbz}>`<br>• `irTileBuffer`: 위성 적외선 PNG 바이너리 스트림      | • `directionDeg`: `int (0~360)`<br>• `directionLabel`: `string (8방위)`<br>• `speedKmh`: `float`<br>• `etaMinutes`: `int \| null`<br>• `arrivalExpectedDbz`: `float`<br>• `isHighlightActive`: `boolean`                                                     | • 반사도 유효 임계치: `dbz` $\ge 30$<br>• 도달 판정 내적 각도 편차: $\pm 45^\circ$ 이내<br>• 최소 유효 이동 속도: $3.0 \text{ km/h}$ 이상  |
| **Layer 2 (200, 기상 히스토리 & 뉴스 매칭 계층)** | • `space_id`: `varchar(64)` (시군구 코드)<br>• `currentVector`: `{rain1h, windMax, tempDiff, snowDepth}`<br>• `antecedentRain48h`: `float (mm)`<br>• `anomalyType`: `enum ('HEAVY_RAIN', 'GALE', ...)` | • `historicalRank`: `int` (역대 순위)<br>• `topPercentile`: `float (0.1~100.0)`<br>• `similarityScore`: `float (0.0~1.0)`<br>• `matchedDate`: `date`<br>• `referenceNewsList`: `Array<NewsObject>`                                                             | • 지형 취약 가중치 $\omega_k$ 정규화 적용<br>• 뉴스 매칭 시간 윈도우: 사건 발생일 $-1\text{일} \sim +2\text{일}$<br>• 유사도 임계치: $0.85$ 이상 |
| **Layer 3 (300, 생체기상학 활동지수 계층)**      | • `obs7Vars`: 기온, 습도, 풍속, 시간당 강수, 초미세먼지(PM2.5), 자외선(UV), 시정거리<br>• `antecedentRain24h`, `antecedentRain48h`: `float`<br>• `roadSurfaceTempC`: `float \| null`                                     | • `activityScores`: `Array<ActivityScoreResult>`<br>- `activityType`: `'RUNNING' \| 'HIKING' \| 'DRIVING'`<br>- `totalScore`: `int (0~100)`<br>- `cutoffApplied`: `boolean`<br>- `deductionFactors`: `Array<{factor, penalty, contributionRatio, reason}>` | • 최종 점수는 $[0, 100]$ 구간 클램핑(Clamping, 상하한 제한)<br>• 컷오프 승수 작동 시 최대 점수 39점 이하('위험' 등급)로 강제 절단                   |
| **Layer 4 (400, 융합 AI & 상권 트리거 계층)**  | • Layer 1, Layer 2, Layer 3의 출력 JSON 객체 전체<br>• `merchantList`: 관할 `space_id` 내 활성 소상공인 단말 토큰 목록                                                                                                  | • `actionGuidelineText`: `string (150자 이내)`<br>• `footTrafficDecayRate`: `float (0.0~1.0)`<br>• `timesaleTriggerFired`: `boolean`<br>• `uiStateTransitionToken`: `string (SHA-256)`                                                                        | • LLM 응답 타임아웃 가드: $1,500\text{ ms}$<br>• 숫자 할루시네이션 정규식 검증 필수<br>• UI 상태 토큰을 통한 클라이언트 렌더링 강제 동기화              |



### 3. 제1핵심계층(100): 무경계 듀얼 타일 오버스케일 합성 및 이류-감쇠 보정형 8방위 기상 벡터 ETA 엔진

본 계층은 물리적 최대 해상도가 상이한 정지궤도 위성 적외선 구름 타일(물리적 최대 줌 레벨 $Z_{\text{max\_sat}} = 7$)과 기상 레이더 반사도 타일(물리적 최대 줌 레벨 $Z_{\text{max\_rad}} = 12$)을 사용자의 동 단위 고배율 뷰포트($Z_{\text{view}} \in [14, 18]$)에서 타일 결측이나 격자 깨짐 없이 합성하고, 접근 중인 강수 클러스터의 이동 및 세력 변화를 추적하여 분 단위 도달 시간(ETA)을 도출한다.

#### 3.1 무경계 오버스케일 타일 합성 메커니즘

클라이언트 뷰포트 줌 레벨 $Z_{\text{view}}$가 타일 소스의 물리적 상한 $Z_{\text{max}}$를 초과할 경우, 오버스케일 보간 합성 모듈(120)은 타일 요청 URL의 줌 파라미터를 $Z_{\text{req}} = \min(Z_{\text{view}}, Z_{\text{max}})$로 클램핑(MaxZoom Guard)하여 HTTP 404 결측 에러를 원천 차단한다. 이후 수신된 PNG 타일의 스캔라인(Scanline) 바이트 스트림에 대하여 Paeth 예측 필터 역연산(Unfiltering)을 수행한 뒤, 오버스케일 배율 $S = 2^{(Z_{\text{view}} - Z_{\text{req}})}$에 맞춰 쌍선형 리샘플링 보간(Bilinear Resampling Interpolation)을 적용함으로써 구름 및 강수 경계면의 계단 현상을 제거한다.

#### 3.2 강수 셀의 이류-감쇠(Advection-Decay) 벡터 및 분 단위 ETA 산출 수학식

단순 무게중심 이동만 계산할 경우, 소규모 강수 셀들이 분산되어 있을 때 중심점이 왜곡되거나 이동 중 비구름이 소멸·발달하는 현상을 놓치게 된다. 이를 해결하기 위해 본 발명은 반사도 $35\text{ dBZ}$ 이상인 격자들을 공간 군집화하여 사용자 위치에 가장 위협적인 주 강수 클러스터 $C$를 추출한 뒤, 시점 $t-\Delta t$와 시점 $t$에서의 반사도 가중 중심점 좌표 $(\Phi, \Lambda)$ 및 반사도 성장·소멸률 $\gamma$를 아래 [수학식 1]로 연산한다.

$$\Phi_t = \frac{\sum_{i \in C_t} w_i \cdot \text{lat}_i}{\sum_{i \in C_t} w_i}, \quad \Lambda_t = \frac{\sum_{i \in C_t} w_i \cdot \text{lng}_i}{\sum_{i \in C_t} w_i}, \quad \text{단, 가중치 } w_i = 10^{(\text{dBZ}_i / 10)}$$

$$\gamma = \frac{\overline{\text{dBZ}}_t - \overline{\text{dBZ}}_{t-\Delta t}}{\Delta t} \quad (\text{단위: dBZ/min})$$

여기서 가중치 $w_i$를 선형 $\text{dBZ}$가 아닌 데시벨 역로그 스케일($10^{\text{dBZ}/10}$, 레이더 반사도 인자 $Z$에 비례)로 부여함으로써, 폭우 코어(Core, 핵심 강수 구역)의 이동 궤적이 정밀하게 반영된다. 이후 하버사인(Haversine) 거리 $\Delta D$, 이동 속도 $V_{\text{cell}}$, 이동 방위각 $\theta_{\text{move}}$, 사용자 위치 방위각 $\theta_{\text{user}}$를 구하고, 도달 예상 시간 $\text{ETA}$와 도달 시점 예상 최대 반사도 $\widehat{\text{dBZ}}_{\text{arrival}}$를 아래 [수학식 2]로 도출한다.

$$V_{\text{rad}} = V_{\text{cell}} \cdot \cos(\theta_{\text{move}} - \theta_{\text{user}})$$

$$\text{ETA (분)} = \begin{cases} \max\left(1, \text{round}\left(\frac{D_{\text{user}}}{V_{\text{rad}}} \times 60\right)\right), & \text{if } |\theta_{\text{move}} - \theta_{\text{user}}| \le 45^\circ \text{ and } V_{\text{rad}} \ge 3.0 \text{ km/h} \\ \text{null}, & \text{otherwise} \end{cases}$$

$$\widehat{\text{dBZ}}_{\text{arrival}} = \text{clamp}\left(\max_{i \in C_t}(\text{dBZ}_i) + \gamma \cdot \min(\text{ETA}, 30), \ 0, \ 65\right)$$

위 [수학식 2]에서 단순 속도가 아닌 사용자 방향 사영 속도(Radial Velocity, $V_{\text{rad}} = V_{\text{cell}} \cdot \cos(\Delta \theta)$)를 분모로 사용함으로써 비구름이 비스듬히 접근할 때의 도달 시간 오차를 물리적으로 제거하였다. 또한 도달 시점 예상 반사도 $\widehat{\text{dBZ}}_{\text{arrival}}$가 $35\text{ dBZ}$ 이상이고 $\text{ETA} \le 45\text{분}$일 때만 하이라이트 플래그를 활성화하여, 이동 중 소멸하는 비구름에 의한 거짓 경보(False Alarm)를 방지한다.

#### [실시예 1-1] 이류-감쇠 보정 및 폴백이 적용된 시공간 레이더 벡터 추적 엔진 (TypeScript)

```typescript
export interface RadarCell {
  lat: number;
  lng: number;
  dbz: number;
}

export interface WeatherMovementVector {
  directionDeg: number;           // 이동 방향 방위각 (0~360)
  directionLabel: string;         // '서남서', '북동' 등 8방위 명칭
  speedKmh: number;               // 비구름 군집 이동 속도 (km/h)
  radialSpeedKmh: number;         // 사용자 방향 유효 접근 속도 (km/h)
  etaMinutes: number | null;      // 내 동네 도달 예상 시간 (분 단위)
  maxCurrentDbz: number;          // 현재 비구름 최대 반사도 (dBZ)
  arrivalExpectedDbz: number;     // 도달 시점 예상 반사도 (이류-감쇠 보정치)
  growthDecayRateDbzPerMin: number; // 분당 세력 증감률 (dBZ/min)
  isHighlightActive: boolean;     // 기상이변 네온 펄스 UI 발동 플래그
  isFallbackExtrapolated: boolean;// 레이더 결측 폴백 작동 여부
}

export class SpatioTemporalRadarTracker {
  private static readonly EARTH_RADIUS_KM = 6371.0;

  public static calculateArrivalEta(
    userLat: number,
    userLng: number,
    prevFrameCells: RadarCell[],
    currFrameCells: RadarCell[],
    deltaMinutes: number = 10,
    cachedLastVector?: WeatherMovementVector
  ): WeatherMovementVector {
    // [예외 처리 1] 현재 프레임 레이더 타일 결측 또는 빈 배열 수신 시 캐시 외삽 폴백 수행
    const validCurr = currFrameCells.filter(c => c.dbz >= 30 && !Number.isNaN(c.lat));
    const validPrev = prevFrameCells.filter(c => c.dbz >= 30 && !Number.isNaN(c.lat));

    if (validCurr.length === 0 || validPrev.length === 0) {
      if (cachedLastVector && cachedLastVector.etaMinutes !== null) {
        const fallbackEta = Math.max(1, cachedLastVector.etaMinutes - deltaMinutes);
        return {
          ...cachedLastVector,
          etaMinutes: fallbackEta,
          isHighlightActive: fallbackEta <= 45 && cachedLastVector.arrivalExpectedDbz >= 35,
          isFallbackExtrapolated: true,
        };
      }
      return this.createCalmStateVector();
    }

    // 1. 데시벨 역로그 스케일(Z = 10^(dBZ/10)) 가중 무게중심 연산
    const prevCentroid = this.getReflectivityWeightedCentroid(validPrev);
    const currCentroid = this.getReflectivityWeightedCentroid(validCurr);

    // 2. 이동 거리, 속도 및 방위각 계산
    const distMovedKm = this.haversineKm(
      prevCentroid.lat, prevCentroid.lng,
      currCentroid.lat, currCentroid.lng
    );
    const rawSpeedKmh = (distMovedKm / Math.max(1, deltaMinutes)) * 60;
    // 비물리적 점프 노이즈 필터링 (시속 120km 상한 클램핑)
    const speedKmh = Number(Math.min(120.0, rawSpeedKmh).toFixed(1));
    const bearingMove = this.calculateBearing(
      prevCentroid.lat, prevCentroid.lng,
      currCentroid.lat, currCentroid.lng
    );

    // 3. 사용자 위치까지의 거리 및 사영 접근 속도(Radial Velocity) 내적 판정
    const distToUserKm = this.haversineKm(currCentroid.lat, currCentroid.lng, userLat, userLng);
    const bearingToUser = this.calculateBearing(currCentroid.lat, currCentroid.lng, userLat, userLng);
    const angleDiffDeg = Math.abs(((bearingMove - bearingToUser + 540) % 360) - 180);
    const angleDiffRad = (angleDiffDeg * Math.PI) / 180.0;

    const radialSpeedKmh = Number((speedKmh * Math.cos(angleDiffRad)).toFixed(1));
    const isApproaching = angleDiffDeg <= 45 && radialSpeedKmh >= 3.0;

    // 4. 분 단위 도달 예상 시간(ETA) 및 이류-감쇠(Growth/Decay) 보정 반사도 산출
    const etaMinutes = isApproaching
      ? Math.max(1, Math.round((distToUserKm / radialSpeedKmh) * 60))
      : null;

    const maxCurrentDbz = Math.max(...validCurr.map(c => c.dbz));
    const growthDecayRate = Number(
      ((currCentroid.meanDbz - prevCentroid.meanDbz) / Math.max(1, deltaMinutes)).toFixed(2)
    );

    const projectedDeltaDbz = etaMinutes !== null
      ? growthDecayRate * Math.min(etaMinutes, 30)
      : 0;
    const arrivalExpectedDbz = Number(
      Math.max(0, Math.min(65, maxCurrentDbz + projectedDeltaDbz)).toFixed(1)
    );

    // 5. 이동 중 소멸하는 비구름(도달 예상 dBZ 35 미만) 거짓 경보 차단
    const isHighlightActive =
      (etaMinutes !== null && etaMinutes <= 45 && arrivalExpectedDbz >= 35) ||
      maxCurrentDbz >= 45;

    return {
      directionDeg: Math.round(bearingMove),
      directionLabel: this.degTo8Compass(bearingMove),
      speedKmh,
      radialSpeedKmh: Math.max(0, radialSpeedKmh),
      etaMinutes,
      maxCurrentDbz,
      arrivalExpectedDbz,
      growthDecayRateDbzPerMin: growthDecayRate,
      isHighlightActive,
      isFallbackExtrapolated: false,
    };
  }

  private static getReflectivityWeightedCentroid(cells: RadarCell[]): {
    lat: number;
    lng: number;
    meanDbz: number;
  } {
    let sumLat = 0;
    let sumLng = 0;
    let sumWeight = 0;
    let sumDbz = 0;

    for (const c of cells) {
      const weight = Math.pow(10, c.dbz / 10.0);
      sumLat += c.lat * weight;
      sumLng += c.lng * weight;
      sumWeight += weight;
      sumDbz += c.dbz;
    }
    return {
      lat: sumLat / sumWeight,
      lng: sumLng / sumWeight,
      meanDbz: sumDbz / cells.length,
    };
  }

  private static haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (d: number) => (d * Math.PI) / 180.0;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * this.EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
  }

  private static calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (d: number) => (d * Math.PI) / 180.0;
    const toDeg = (r: number) => (r * 180.0) / Math.PI;
    const dLng = toRad(lng2 - lng1);
    const y = Math.sin(dLng) * Math.cos(toRad(lat2));
    const x =
      Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  }

  private static degTo8Compass(deg: number): string {
    const dirs = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
    return dirs[Math.round(deg / 45) % 8];
  }

  private static createCalmStateVector(): WeatherMovementVector {
    return {
      directionDeg: 0,
      directionLabel: '정체',
      speedKmh: 0,
      radialSpeedKmh: 0,
      etaMinutes: null,
      maxCurrentDbz: 0,
      arrivalExpectedDbz: 0,
      growthDecayRateDbzPerMin: 0,
      isHighlightActive: false,
      isFallbackExtrapolated: false,
    };
  }
}

```



### 4. 제2핵심계층(200): 지형 취약성 가중치가 반영된 구·군 단위 기상 히스토리 유사도 및 과거 피해 뉴스 매칭 엔진

본 계층은 현재 관측 또는 예보된 다변량 기상 벡터를 전국 226개 기초지자체별 지형 취약성 계수(Topographical Vulnerability Factor)와 결합하여 과거 누적 기상 극값 레코드와 대조하고, 역대 위험도 백분위 순위 및 당시 실제 피해 뉴스를 추출한다.

#### 4.1 지형 취약성 가중 정규화 유사도 수학식

현재 시점의 4차원 기상 특성 벡터를 $\mathbf{x} = [x_1(\text{1시간 강수량}), x_2(\text{최대풍속}), x_3(\text{기온편차}), x_4(\text{48시간 선행강수량})]^T$라 하고, 기초지자체 $s$의 과거 기상이변 사건 $k$의 특성 벡터를 $\mathbf{h}_k = [h_{k,1}, h_{k,2}, h_{k,3}, h_{k,4}]^T$라 하자. 이때 지자체 $s$의 불투수 면적비($\alpha_{\text{imp}} \in [0, 1]$)와 평균 경사도($\beta_{\text{slope}} \in [0, 1]$)를 반영한 지형 가중치 행렬 $\mathbf{W}*s = \text{diag}(\omega*{s,1}, \omega_{s,2}, \omega_{s,3}, \omega_{s,4})$를 구성하여, 과거 사건 $k$와의 유사도 점수 $\text{Sim}(\mathbf{x}, \mathbf{h}_k)$를 아래 **[수학식 3]** 및 [수학식 4]로 연산한다.

$$\omega_{s,1} = 1.0 + 0.5 \cdot \alpha_{\text{imp}}, \quad \omega_{s,4} = 1.0 + 0.6 \cdot \beta_{\text{slope}}$$

$$d_s(\mathbf{x}, \mathbf{h}_k) = \sqrt{\sum_{j=1}^{4} \omega_{s,j} \cdot \left(\frac{x_j - h_{k,j}}{\sigma_j}\right)^2}$$

$$\text{Sim}(\mathbf{x}, \mathbf{h}_k) = \frac{1}{1 + d_s(\mathbf{x}, \mathbf{h}_k)} \in (0, 1]$$

여기서 $\sigma_j$는 변수별 스케일 정규화 상수($\sigma_1 = 50\text{ mm}$, $\sigma_2 = 15\text{ m/s}$, $\sigma_3 = 20^\circ\text{C}$, $\sigma_4 = 120\text{ mm}$)이다. 도심 불투수율이 높은 지자체는 시간당 강수량($j=1$)의 가중치 $\omega_{s,1}$이 증폭되고, 산악 경사도가 높은 지자체는 선행 48시간 누적 강수량($j=4$, 산사태 및 토양 포화 직결 변수)의 가중치 $\omega_{s,4}$가 증폭되어 지역별 재난 취약 특성에 부합하는 정밀 매칭이 이루어진다.

#### [실시예 2-1] 지형 가중치 및 K-Ring 공간 확장 폴백이 적용된 과거 재난 뉴스 매칭 RPC (PostgreSQL)

```sql
CREATE OR REPLACE FUNCTION public.match_historical_weather_anomaly_v2(
  p_space_id VARCHAR(64),
  p_rain_1h NUMERIC,
  p_wind_max NUMERIC,
  p_temp_extreme NUMERIC,
  p_antecedent_rain_48h NUMERIC,
  p_anomaly_type VARCHAR(32) -- 'HEAVY_RAIN', 'HEAVY_SNOW', 'HEATWAVE', 'COLDWAVE', 'GALE'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_imp_ratio NUMERIC := 0.5;
  v_slope_ratio NUMERIC := 0.3;
  v_w_rain NUMERIC;
  v_w_ante NUMERIC;
  v_rank INT;
  v_total_events INT;
  v_percentile NUMERIC(5,2);
  v_matched_event RECORD;
  v_related_news JSONB;
  v_is_spatial_fallback BOOLEAN := FALSE;
BEGIN
  -- 0. 해당 기초지자체의 지형 취약성 메타데이터(불투수율, 경사도 지수) 조회
  SELECT COALESCE(impervious_ratio, 0.5), COALESCE(slope_index, 0.3)
  INTO v_imp_ratio, v_slope_ratio
  FROM public.district_topography_meta
  WHERE space_id = p_space_id;

  v_w_rain := 1.0 + (0.5 * v_imp_ratio);
  v_w_ante := 1.0 + (0.6 * v_slope_ratio);

  -- 1. 해당 구/군(space_id) 내 동일 유형 기상이변 누적 히스토리 중 역대 순위 산출
  SELECT COUNT(*) + 1 INTO v_rank
  FROM public.weather_historical_extremes
  WHERE space_id = p_space_id
    AND anomaly_type = p_anomaly_type
    AND primary_metric_value > GREATEST(p_rain_1h, p_wind_max, ABS(p_temp_extreme));

  SELECT COUNT(*) INTO v_total_events
  FROM public.weather_historical_extremes
  WHERE space_id = p_space_id AND anomaly_type = p_anomaly_type;

  v_percentile := CASE WHEN v_total_events > 0
    THEN ROUND(LEAST(100.0, (v_rank::NUMERIC / v_total_events::NUMERIC) * 100.0), 1)
    ELSE 1.0 END;

  -- 2. 지형 가중 정규화 거리 기반 최고 유사도 과거 기상이변 사건 1건 추출
  SELECT event_id, space_id AS matched_space_id, event_date, rain_1h, wind_max,
         temp_extreme, antecedent_rain_48h, damage_summary,
         ROUND((1.0 / (1.0 + SQRT(
           v_w_rain * POWER((rain_1h - p_rain_1h) / 50.0, 2) +
           1.0      * POWER((wind_max - p_wind_max) / 15.0, 2) +
           1.0      * POWER((temp_extreme - p_temp_extreme) / 20.0, 2) +
           v_w_ante * POWER((COALESCE(antecedent_rain_48h, 0) - p_antecedent_rain_48h) / 120.0, 2)
         )))::NUMERIC, 3) AS similarity_score
  INTO v_matched_event
  FROM public.weather_historical_extremes
  WHERE space_id = p_space_id AND anomaly_type = p_anomaly_type
  ORDER BY similarity_score DESC
  LIMIT 1;

  -- [예외 처리 2] 관할 구·군 내 유사도 0.85 이상 사건이 없을 경우 인접 지자체(Spatial K-Ring) 확장 폴백
  IF v_matched_event IS NULL OR v_matched_event.similarity_score < 0.85 THEN
    v_is_spatial_fallback := TRUE;
    SELECT e.event_id, e.space_id AS matched_space_id, e.event_date, e.rain_1h, e.wind_max,
           e.temp_extreme, e.antecedent_rain_48h, e.damage_summary,
           ROUND((1.0 / (1.0 + SQRT(
             v_w_rain * POWER((e.rain_1h - p_rain_1h) / 50.0, 2) +
             1.0      * POWER((e.wind_max - p_wind_max) / 15.0, 2) +
             1.0      * POWER((e.temp_extreme - p_temp_extreme) / 20.0, 2) +
             v_w_ante * POWER((COALESCE(e.antecedent_rain_48h, 0) - p_antecedent_rain_48h) / 120.0, 2)
           )))::NUMERIC, 3) AS similarity_score
    INTO v_matched_event
    FROM public.weather_historical_extremes e
    JOIN public.district_adjacency_ring r ON e.space_id = r.neighbor_space_id
    WHERE r.center_space_id = p_space_id AND e.anomaly_type = p_anomaly_type
    ORDER BY similarity_score DESC
    LIMIT 1;
  END IF;

  -- 3. 매칭된 과거 사건 일자(-1일 ~ +2일 윈도우)의 실제 지역 피해 뉴스 아카이브 조인
  IF v_matched_event IS NOT NULL THEN
    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'news_id', id,
      'title', title,
      'summary', summary_250ja,
      'source_url', original_url,
      'published_at', published_at
    )), '[]'::jsonb)
    INTO v_related_news
    FROM (
      SELECT id, title, summary_250ja, original_url, published_at
      FROM public.news_articles
      WHERE target_district = v_matched_event.matched_space_id
        AND published_at BETWEEN v_matched_event.event_date - INTERVAL '1 day'
                             AND v_matched_event.event_date + INTERVAL '2 days'
      ORDER BY relevance_score DESC, published_at DESC
      LIMIT 3
    ) sub;
  ELSE
    v_related_news := '[]'::jsonb;
  END IF;

  RETURN jsonb_build_object(
    'historical_rank', v_rank,
    'top_percentile', v_percentile,
    'matched_space_id', COALESCE(v_matched_event.matched_space_id, p_space_id),
    'matched_date', v_matched_event.event_date,
    'similarity_score', COALESCE(v_matched_event.similarity_score, 0.0),
    'past_damage_summary', COALESCE(v_matched_event.damage_summary, '유사 과거 피해 기록 없음'),
    'is_spatial_fallback', v_is_spatial_fallback,
    'reference_news_list', v_related_news
  );
END;
$$;

```



### 5. 제3핵심계층(300): 선행 강수 포화도 및 노면 열수지 기반 임계 절단형 다변량 생체기상학 활동지수 엔진

본 계층은 실시간 7대 기상 변수와 선행 24~48시간 누적 강수량 및 노면 온도를 결합하여 러닝(Running), 등산(Hiking), 운전(Driving) 안전 지수를 산출하되, 단순 선형 합산의 맹점을 극복하기 위해 임계 절단형 승수(Gate Cutoff Multiplier)와 노면 온도 결측 폴백 추정식을 적용한다.

#### 5.1 임계 절단형 활동지수 및 XAI 감점 분해 수학식

활동 유형 $a \in {\text{RUNNING}, \text{HIKING}, \text{DRIVING}}$에 대한 최종 활동지수 $S_a$는 기본 점수 $100$점에서 개별 기상 요인 $m$에 의한 비선형 감점 함수 $P_{a,m}$의 합을 차감한 뒤, 치명적 위험 게이트 승수 $\Gamma_a \in (0, 1]$를 곱하여 아래 [수학식 5]로 산출한다.

$$S_a = \text{clamp}\left(\text{round}\left( \left(100 - \sum_{m=1}^{M} P_{a,m}(\mathbf{v})\right) \times \Gamma_a(\mathbf{v}) \right), \ 0, \ 100\right)$$

$$\Gamma_{\text{DRIVING}}(\mathbf{v}) = \begin{cases} 0.40, & \text{if } T_{\text{road}} \le 1.5^\circ\text{C} \text{ and } (R_{\text{ante24h}} > 0 \text{ or } \text{RH} \ge 80\%) \quad \text{[블랙아이스 컷오프]} \\ 0.35, & \text{if } R_{\text{1h}} \ge 30.0\text{ mm} \text{ or } V_{\text{vis}} < 0.3\text{ km} \quad \text{[극한호우/농무 컷오프]} \\ 1.00, & \text{otherwise} \end{cases}$$

$$\Gamma_{\text{HIKING}}(\mathbf{v}) = \begin{cases} 0.45, & \text{if } R_{\text{ante48h}} \ge 50.0\text{ mm} \text{ or } W_{\text{wind}} \ge 14.0\text{ m/s} \quad \text{[토양포화 실족/강풍 컷오프]} \\ 1.00, & \text{otherwise} \end{cases}$$

또한 도로 기상 관측망 센서로부터 실측 노면 온도 $T_{\text{road}}$를 수신하지 못하는 결측(Null) 상황에서는 대기 온도 $T_{\text{air}}$, 상대습도 $\text{RH}$로부터 유도된 이슬점 온도 $T_{\text{dew}}$, 및 시간대별 복사 냉각 보정치 $\Delta T_{\text{rad}}$를 결합한 아래 [수학식 6]의 열수지 폴백 추정식을 통해 가상 노면 온도 $\widehat{T}_{\text{road}}$를 자동 복원한다.

$$\widehat{T}_{\text{road}} = 0.85 \cdot T_{\text{air}} + 0.15 \cdot T_{\text{dew}} + \Delta T_{\text{rad}}(\text{hour})$$

(단, 심야·새벽 시간대인 22시~07시 구간에서 $\Delta T_{\text{rad}} = -2.2^\circ\text{C}$를 적용하여 교량 및 터널 출입구의 복사 냉각에 의한 도로 살얼음 발생 조건을 보수적으로 포착한다.)

#### [실시예 3-1] 노면 온도 폴백 및 XAI 기여도 역산이 포함된 생체기상학 엔진 (TypeScript)

```typescript
export interface DeductionItem {
  factor: string;
  penalty: number;
  contributionRatio: number; // 전체 감점 중 해당 요인이 차지하는 XAI 백분율 (%)
  reason: string;
}

export interface ActivityScoreResult {
  activityType: 'RUNNING' | 'HIKING' | 'DRIVING';
  totalScore: number;
  gradeLabel: '최적' | '양호' | '주의' | '위험(활동자제)';
  cutoffApplied: boolean;
  estimatedRoadTempUsed: boolean;
  deductionFactors: DeductionItem[];
}

export interface BioWeatherInput {
  tempC: number;
  humidity: number;
  windMs: number;
  rain1hMm: number;
  antecedentRain24hMm: number;
  antecedentRain48hMm: number;
  pm25: number;
  uvIndex: number;
  visibilityKm: number;
  roadSurfaceTempC: number | null; // 결측 가능
  currentHourKst: number;          // 0 ~ 23
}

export class BiometeorologyIndexEngine {
  public static evaluateAllActivities(input: BioWeatherInput): ActivityScoreResult[] {
    // [예외 처리 3] 노면 온도 센서 결측(Null/NaN) 시 대기온도·이슬점·복사냉각 열수지 폴백 추정
    const isRoadTempMissing =
      input.roadSurfaceTempC === null || Number.isNaN(input.roadSurfaceTempC);
    const effectiveRoadTempC = isRoadTempMissing
      ? this.estimateRoadSurfaceTemp(input.tempC, input.humidity, input.currentHourKst)
      : input.roadSurfaceTempC!;

    return [
      this.calcRunningScore(input, isRoadTempMissing),
      this.calcHikingScore(input, isRoadTempMissing),
      this.calcDrivingScore(input, effectiveRoadTempC, isRoadTempMissing),
    ];
  }

  private static estimateRoadSurfaceTemp(tempC: number, rh: number, hour: number): number {
    const dewPoint = tempC - (100 - rh) / 5.0;
    const isNightCooling = hour >= 22 || hour <= 7;
    const radiationOffset = isNightCooling ? -2.2 : 1.5;
    return Number((0.85 * tempC + 0.15 * dewPoint + radiationOffset).toFixed(1));
  }

  private static calcDrivingScore(
    d: BioWeatherInput,
    roadTempC: number,
    estimatedRoadTempUsed: boolean
  ): ActivityScoreResult {
    let rawScore = 100;
    let cutoffMultiplier = 1.0;
    const rawDeductions: Array<{ factor: string; penalty: number; reason: string }> = [];

    // 1. 블랙아이스(도로 살얼음) 비선형 컷오프 판정
    if (roadTempC <= 1.5 && (d.antecedentRain24hMm > 0 || d.humidity >= 80)) {
      rawDeductions.push({
        factor: 'BLACK_ICE',
        penalty: 45,
        reason: `노면온도 ${roadTempC}°C 및 수분 응결로 블랙아이스 고위험 감지`,
      });
      rawScore -= 45;
      cutoffMultiplier = 0.4;
    }

    // 2. 수막현상(Hydroplaning) 비선형 감점
    if (d.rain1hMm >= 5.0) {
      const pen = Math.min(45, Math.round(Math.pow(d.rain1hMm / 5.0, 1.5) * 7));
      rawDeductions.push({
        factor: 'HYDROPLANING',
        penalty: pen,
        reason: `시간당 ${d.rain1hMm}mm 강수로 수막현상 및 제동거리 급증`,
      });
      rawScore -= pen;
    }

    // 3. 안개/시정거리 감점
    if (d.visibilityKm < 2.0) {
      const pen = Math.round((2.0 - d.visibilityKm) * 22);
      rawDeductions.push({
        factor: 'VISIBILITY',
        penalty: pen,
        reason: `시정거리 ${d.visibilityKm}km 시야 확보 불량`,
      });
      rawScore -= pen;
    }

    return this.finalizeScore('DRIVING', rawScore, cutoffMultiplier, rawDeductions, estimatedRoadTempUsed);
  }

  private static calcHikingScore(
    d: BioWeatherInput,
    estimatedRoadTempUsed: boolean
  ): ActivityScoreResult {
    let rawScore = 100;
    let cutoffMultiplier = 1.0;
    const rawDeductions: Array<{ factor: string; penalty: number; reason: string }> = [];

    // 1. 선행 48시간 누적 강수에 따른 등산로 진흙탕/실족 페널티 (현재 맑아도 감점 작동)
    if (d.antecedentRain48hMm >= 15.0) {
      const mudPenalty = Math.min(40, Math.round((d.antecedentRain48hMm - 10.0) * 0.8));
      rawDeductions.push({
        factor: 'TRAIL_SOIL_SATURATION',
        penalty: mudPenalty,
        reason: `선행 48시간 누적 ${d.antecedentRain48hMm}mm 강수로 등산로 화강암·토양 미끄럼 위험`,
      });
      rawScore -= mudPenalty;
      if (d.antecedentRain48hMm >= 50.0) cutoffMultiplier = 0.45;
    }

    // 2. 능선 강풍 및 체감온도 감점
    if (d.windMs >= 8.0) {
      const windPen = Math.min(35, Math.round((d.windMs - 6.0) * 4.5));
      rawDeductions.push({
        factor: 'RIDGE_GALE',
        penalty: windPen,
        reason: `풍속 ${d.windMs}m/s로 산악 능선 저체온증 및 낙석 주의`,
      });
      rawScore -= windPen;
      if (d.windMs >= 14.0) cutoffMultiplier = 0.45;
    }

    return this.finalizeScore('HIKING', rawScore, cutoffMultiplier, rawDeductions, estimatedRoadTempUsed);
  }

  private static calcRunningScore(
    d: BioWeatherInput,
    estimatedRoadTempUsed: boolean
  ): ActivityScoreResult {
    let rawScore = 100;
    let cutoffMultiplier = 1.0;
    const rawDeductions: Array<{ factor: string; penalty: number; reason: string }> = [];

    // 초미세먼지(PM2.5) 호흡기 감점
    if (d.pm25 > 35) {
      const pmPen = Math.min(40, Math.round((d.pm25 - 35) * 0.9));
      rawDeductions.push({
        factor: 'PM25_RESPIRATORY',
        penalty: pmPen,
        reason: `초미세먼지 ${d.pm25}μg/m³로 심폐 지구력 활동 시 호흡기 부하 증가`,
      });
      rawScore -= pmPen;
      if (d.pm25 >= 76) cutoffMultiplier = 0.45;
    }

    // 폭염/습구온도 열사병 감점
    if (d.tempC >= 28) {
      const heatPen = Math.min(45, Math.round((d.tempC - 26) * (1 + d.humidity / 100) * 3.5));
      rawDeductions.push({
        factor: 'HEAT_STRESS',
        penalty: heatPen,
        reason: `기온 ${d.tempC}°C 및 습도 ${d.humidity}% 결합으로 온열질환 위험`,
      });
      rawScore -= heatPen;
      if (d.tempC >= 33) cutoffMultiplier = 0.40;
    }

    return this.finalizeScore('RUNNING', rawScore, cutoffMultiplier, rawDeductions, estimatedRoadTempUsed);
  }

  private static finalizeScore(
    activityType: 'RUNNING' | 'HIKING' | 'DRIVING',
    rawScore: number,
    cutoffMultiplier: number,
    rawDeductions: Array<{ factor: string; penalty: number; reason: string }>,
    estimatedRoadTempUsed: boolean
  ): ActivityScoreResult {
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore * cutoffMultiplier)));
    const totalPenaltySum = rawDeductions.reduce((acc, cur) => acc + cur.penalty, 0);

    // XAI 감점 분해 바(Bar) 렌더링을 위한 항목별 기여율(%) 정규화 역산
    const deductionFactors: DeductionItem[] = rawDeductions.map(item => ({
      ...item,
      contributionRatio:
        totalPenaltySum > 0 ? Math.round((item.penalty / totalPenaltySum) * 100) : 0,
    }));

    return {
      activityType,
      totalScore: finalScore,
      gradeLabel:
        finalScore >= 80
          ? '최적'
          : finalScore >= 60
          ? '양호'
          : finalScore >= 40
          ? '주의'
          : '위험(활동자제)',
      cutoffApplied: cutoffMultiplier < 1.0,
      estimatedRoadTempUsed,
      deductionFactors,
    };
  }
}

```



### 6. 제4핵심계층(400): 결정론적 가드레일 기반 XAI 행동 강령 생성, 유동인구 감쇠 연동 타임세일 트리거 및 외적 침해 입증 UI 제어 계층

본 계층은 제1~제3핵심계층(100, 200, 300)의 정량 출력을 융합하여 자연어 행동 강령을 생성하고, 기상이변에 따른 동네 보행 유동인구 감쇠율(Foot-Traffic Decay Rate)을 연산하여 골목상권 소상공인 단말(20)에 타임세일 등록 트리거를 발송하며, 클라이언트 화면의 시각적 상태 전이를 강제 동기화하는 시각 상태 제어 지시자(Observable UI Directives) 및 결정론적 UI 상태 해시 토큰(UI State Transition Hash Token)을 발행한다.

#### 6.1 동네 보행 유동인구 감쇠율 및 타임세일 점화 수학식

기상이변 접근 시 동네 골목상권의 예상 보행 유동인구 감쇠율 $D_{\text{foot}} \in [0, 1]$은 제1계층의 도달 예상 시간 $\text{ETA}$와 제3계층의 보행 외출 대표 지수인 러닝 지수 $S_{\text{RUNNING}}$을 결합하여 아래 [수학식 7]로 산출한다.

$$D_{\text{foot}} = \text{clamp}\left( \left(1 - \frac{S_{\text{RUNNING}}}{100}\right) \times \exp\left(-\frac{\max(0, \text{ETA} - 15)}{60}\right), \ 0.0, \ 1.0 \right)$$

$$\text{Trigger}_{\text{timesale}} = \begin{cases} \text{True}, & \text{if } D_{\text{foot}} \ge 0.40 \text{ and } 15 \le \text{ETA} \le 60 \text{ (분)} \\ \text{False}, & \text{otherwise} \end{cases}$$

즉, 기상이변으로 인해 보행 유동인구가 평시 대비 $40\%$ 이상 급감할 것으로 예측($D_{\text{foot}} \ge 0.40$)되면서 동시에 비구름 도달까지 $15\text{분} \sim 60\text{분}$의 준비 골든타임이 남아 있을 때만 타임세일 권고 트리거를 점화하여, 주민들이 귀가하기 직전 인근 상점에서 빠르게 상품을 구매하도록 유도한다.

#### [실시예 4-1] 할루시네이션 가드레일, 상권 트리거 및 외적 침해 입증 토큰 생성기 (TypeScript)

```typescript
import * as crypto from 'crypto';
import { WeatherMovementVector } from './SpatioTemporalRadarTracker';
import { ActivityScoreResult } from './BiometeorologyIndexEngine';

export interface HistoricalMatchPayload {
  historical_rank: number;
  top_percentile: number;
  matched_date: string;
  similarity_score: number;
  past_damage_summary: string;
  reference_news_list: Array<{ title: string; source_url: string }>;
}

export interface IntegratedActionPayload {
  actionGuidelineText: string;
  footTrafficDecayRate: number;
  timesaleTriggerFired: boolean;
  uiStateTransitionToken: string; // 외적 침해 입증용 결정론적 상태 해시
  observableUiDirectives: {
    renderNeonPulseRing: boolean;
    pulseFrequencyHz: number;
    openHistoricalNewsModalBadge: boolean;
    xaiDeductionBarSegments: Array<{ label: string; widthPercent: number }>;
  };
}

export class HyperLocalActionOrchestrator {
  public static async orchestrateResponse(
    spaceId: string,
    vector: WeatherMovementVector,
    history: HistoricalMatchPayload,
    activities: ActivityScoreResult[],
    llmClient?: { generateText: (prompt: string, timeoutMs: number) => Promise<string> }
  ): Promise<IntegratedActionPayload> {
    const runningScore = activities.find(a => a.activityType === 'RUNNING')?.totalScore ?? 80;
    const drivingResult = activities.find(a => a.activityType === 'DRIVING')!;

    // 1. 동네 보행 유동인구 감쇠율(Foot-Traffic Decay Rate) 연산
    const etaForDecay = vector.etaMinutes ?? 120;
    const timeWeight = Math.exp(-Math.max(0, etaForDecay - 15) / 60.0);
    const footTrafficDecayRate = Number(
      Math.max(0, Math.min(1, (1 - runningScore / 100.0) * timeWeight)).toFixed(2)
    );

    // 2. 골목상권 타임세일 골든타임 트리거 판정 (감쇠율 40% 이상 & 도달 15~60분 전)
    const timesaleTriggerFired =
      footTrafficDecayRate >= 0.40 &&
      vector.etaMinutes !== null &&
      vector.etaMinutes >= 15 &&
      vector.etaMinutes <= 60;

    // 3. LLM 행동 강령 생성 및 결정론적 할루시네이션/타임아웃 폴백(Fallback) 제어
    let actionGuidelineText = '';
    const deterministicFallbackText = this.buildDeterministicBriefing(vector, history, drivingResult);

    if (llmClient) {
      try {
        const prompt = JSON.stringify({ vector, history, activities });
        const rawLlmText = await llmClient.generateText(prompt, 1500);
        // [예외 처리 4] LLM 출력 내 핵심 수치(ETA, 점수) 변조(할루시네이션) 검증
        const isEtaConsistent =
          vector.etaMinutes === null || rawLlmText.includes(String(vector.etaMinutes));
        actionGuidelineText = isEtaConsistent ? rawLlmText : deterministicFallbackText;
      } catch {
        // 타임아웃(1500ms 초과) 또는 API 장애 시 즉시 규칙 기반 브리핑으로 무중단 전환
        actionGuidelineText = deterministicFallbackText;
      }
    } else {
      actionGuidelineText = deterministicFallbackText;
    }

    // 4. 외적 침해 입증용 UI 디렉티브 및 결정론적 상태 전이 해시 토큰 생성
    const observableUiDirectives = {
      renderNeonPulseRing: vector.isHighlightActive,
      pulseFrequencyHz: vector.etaMinutes && vector.etaMinutes <= 15 ? 2.0 : 1.0,
      openHistoricalNewsModalBadge: history.similarity_score >= 0.85 && history.reference_news_list.length > 0,
      xaiDeductionBarSegments: drivingResult.deductionFactors.map(d => ({
        label: d.factor,
        widthPercent: d.contributionRatio,
      })),
    };

    const stateSignatureString = `${spaceId}|ETA:${vector.etaMinutes}|RANK:${history.historical_rank}|DRV:${drivingResult.totalScore}|TS:${timesaleTriggerFired}`;
    const uiStateTransitionToken = crypto
      .createHash('sha256')
      .update(stateSignatureString)
      .digest('hex')
      .substring(0, 16);

    return {
      actionGuidelineText,
      footTrafficDecayRate,
      timesaleTriggerFired,
      uiStateTransitionToken,
      observableUiDirectives,
    };
  }

  private static buildDeterministicBriefing(
    v: WeatherMovementVector,
    h: HistoricalMatchPayload,
    drv: ActivityScoreResult
  ): string {
    const etaPart = v.etaMinutes !== null
      ? `${v.directionLabel} 방향에서 시속 ${v.speedKmh}km로 접근 중인 기상이변이 약 ${v.etaMinutes}분 후 도달합니다.`
      : `현재 뚜렷하게 접근 중인 강수 셀은 없습니다.`;
    const histPart = h.similarity_score >= 0.85
      ? ` 이번 기상은 우리 동네 역대 상위 ${h.top_percentile}% 수준(${h.matched_date} 피해 사례와 유사도 ${Math.round(h.similarity_score * 100)}%)입니다.`
      : '';
    const actPart = ` 운전 안전 지수는 ${drv.totalScore}점(${drv.gradeLabel})이므로 안전에 유의하십시오.`;
    return `${etaPart}${histPart}${actPart}`;
  }
}

```



### 7. 전 계층 예외 처리 및 장애 복구 명세 (Exception Handling & Fallback Mechanisms)

특허법 제42조 제3항(실시가능성) 요건을 완벽히 충족하기 위하여, 본 시스템은 기상 관측망 장애, 데이터베이스 매칭 실패, 외부 센서 결측 및 인공지능 언어 모델 오류 등 6대 예외 상황에 대해 다음과 같은 무중단 자동 복구(Graceful Degradation & Fallback) 메커니즘을 수행한다.

| 예외 코드 | 발생 계층 및 장애 시나리오 (Exception Scenario) | 감지 조건 (Detection Rule) | 자동 폴백 및 복구 메커니즘 (Automated Fallback Logic) |
| --- | --- | --- | --- |
| **EX-01** | **고배율 뷰포트 위성/레이더 타일 결측** (클라이언트가 줌 레벨 15 이상 확대 시 기상청 원천 타일 서버 404 에러) | $Z_{\text{view}} > Z_{\text{max\_source}}$ | 타일 요청 줌 파라미터를 $Z_{\text{max\_source}}$(위성 7, 레이더 12)로 클램핑(MaxZoom Guard)하여 상위 타일을 인메모리 패치한 후 $2^{(Z_{\text{view}} - Z_{\text{max}})}$ 배율로 쌍선형 보간 오버레이 수행 |
| **EX-02** | **레이더 프레임 패킷 유실 또는 강수 셀 일시 소실** (기상청 API 지연으로 현재 프레임 $t$가 비어 있음) | `currFrameCells.length === 0` 및 직전 유효 벡터 캐시 존재 | 직전 프레임($t-10\text{분}, t-20\text{분}$)에서 산출된 캐시 이동 벡터의 속도와 방향을 유지한 채 $\text{ETA}*{\text{fallback}} = \max(1, \text{ETA}*{\text{cached}} - \Delta t)$로 칼만 외삽을 수행하고 `isFallbackExtrapolated = true` 플래그 표출 |
| **EX-03** | **강수 셀의 비물리적 점프 또는 다중 셀 병합 노이즈** (서로 다른 비구름이 합쳐지며 무게중심이 급격히 이동) | 산출된 이동 속도 $V_{\text{cell}} > 120\text{ km/h}$ | 기상학적으로 한반도 중위도 강수 셀의 최대 이동 한계 속도인 $120\text{ km/h}$로 상한 클램핑(Velocity Clamping)을 수행하여 비정상적인 1분 도달 오경보 차단 |
| **EX-04** | **신설 행정구역 또는 해당 구·군 내 유사 과거 사례 부재** (특정 지자체에서 유사도 $0.85$ 이상인 레코드 미존재) | `similarity_score < 0.85` 또는 `v_matched_event IS NULL` | `district_adjacency_ring` 테이블을 조인하여 반경 $15\text{ km}$ 이내 인접 기초지자체(Spatial K-Ring)로 탐색 범위를 자동 확장하여 가장 유사한 인접 지역 피해 사례와 뉴스를 바인딩 |
| **EX-05** | **도로 노면 온도 센서 결측(Null)** (이면도로 및 비관측 구간에서 `roadSurfaceTempC` 미수신) | `roadSurfaceTempC === null` 또는 `NaN` | 대기 온도($T_{\text{air}}$), 상대습도 기반 이슬점 온도($T_{\text{dew}}$), 심야 복사 냉각 계수($\Delta T_{\text{rad}}$)를 결합한 열수지 추정식([수학식 6])을 즉시 가동하여 블랙아이스 컷오프 판정 무결성 유지 |
| **EX-06** | **인공지능 언어 모델(LLM) 응답 지연 또는 수치 환각(Hallucination)** (네트워크 지연 또는 잘못된 ETA/점수 생성) | 응답 시간 $> 1,500\text{ ms}$ 또는 생성 텍스트 내 `etaMinutes` 수치 불일치 | 비동기 `Promise.race` 타임아웃 가드 및 정규식 수치 대조 검증기가 즉시 개입하여 LLM 출력을 폐기하고, `buildDeterministicBriefing()` 결정론적 규칙 기반 템플릿 문장으로 $10\text{ ms}$ 내에 폴백 응답 반환 |



### 【부호의 설명】

본 발명의 도면 및 명세서 본문에 기재된 주요 기술적 구성요소의 참조 부호(Reference Numerals, 도면 참조 번호)와 각 모듈의 기능적 명세는 아래 표와 같다 (출처: 특허청 특허·실용신안 도면 및 부호 기재 지침, `[https://www.kipo.go.kr](https://www.kipo.go.kr)`).

| 도면 부호 | 구성요소 명칭 (국문 / 영문 병기) | 핵심 기술 기능 및 비즈니스 가치 (Technical Function & Business Value) |
| --- | --- | --- |
| **10** | **사용자 단말** (Client PWA Terminal, 클라이언트 프로그레시브 웹 앱 단말) | 기상이변 네온 펄스 링, 과거 피해 뉴스 간접체험 모달, 100점 만점 XAI(설명 가능한 인공지능) 감점 분해 게이지 및 1줄 행동 강령을 화면에 동기화 표출하여 시민의 즉각적 대피·대비 유도 |
| **20** | **소상공인 단말** (Merchant Terminal, 골목상권 상점주 단말) | 기상이변 도달 15~60분 전 보행 유동인구 급감(40% 이상) 예측 시 우천·기상이변 타임세일 등록 권고 알림을 수신하여 신선식품 및 일일 재고 폐기 손실 방어 |
| **30** | **공간 기상 게이트웨이** (Spatial Weather BFF Gateway, 프론트엔드 맞춤형 백엔드 게이트웨이) | 단말의 GPS(Global Positioning System, 위성항법시스템) 좌표를 전국 226개 기초지자체 코드(`space_id`)로 역지오코딩(Reverse Geocoding, 좌표의 행정구역 변환)하고 제1~제3핵심계층을 병렬 호출 |
| **100** | **제1핵심계층: 시공간 벡터 및 이류-감쇠 추적 엔진** (Spatio-Temporal Vector Engine, 시공간 벡터 엔진) | 위성 적외선(IR, Infrared) 타일과 레이더 반사도(dBZ, 데시벨 반사도) 타일을 무경계 합성하고 강수 군집의 이동·성장·소멸을 추적하여 분 단위 도달 시간 산출 |
| **110** | 시계열 타일 수집 모듈 (Time-Series Tile Collector, 시계열 타일 수집기) | 기상 관측 서버로부터 연속 시점($t-20\text{분}, t-10\text{분}, t$)의 위성 구름 타일 및 기상 레이더 반사도 타일 패킷을 실시간 수신 |
| **120** | 오버스케일 보간 합성 모듈 (Overscale Interpolation Compositor, 고배율 보간 합성기) | MaxZoom Guard(최대 줌 상한 보호기) 및 쌍선형 리샘플링 보간(Bilinear Resampling Interpolation)을 통해 동 단위 고배율(Zoom 14~18) 확대 시 404 결측 및 픽셀 깨짐 원천 차단 |
| **130** | 이류-감쇠 벡터 및 ETA 연산 모듈 (Advection-Decay & ETA Calculator, 이류-감쇠 및 도달시간 연산기) | 데시벨 역로그 스케일($10^{\text{dBZ}/10}$) 가중 중심점 변위, 사용자 방향 사영 접근 속도 및 반사도 증감률($\gamma$)을 연산하여 분 단위 도달 시간 및 도달 시점 강도 도출 |
| **140** | 레이더 결측 외삽 폴백 처리기 (Extrapolation Fallback Handler, 외삽 예비 대체 처리기) | 통신 지연으로 현재 레이더 프레임 결측 시 직전 유효 프레임의 캐시(Cache, 임시 저장 데이터) 이동 벡터를 기반으로 잔여 도달 시간을 칼만 외삽(Kalman Extrapolation) 복원 |
| **200** | **제2핵심계층: 지형 가중 기상 히스토리 및 뉴스 매칭 엔진** (Historical Weather-News Matching Engine, 과거 기상-뉴스 매칭 엔진) | 지자체별 지형 취약성(불투수율·경사도)을 반영하여 과거 누적 기상 극값과 현재 기상을 비교하고 역대 순위 및 당시 실제 피해 뉴스를 자동 연결 |
| **210** | 지형 취약 계수 및 극값 DB (Topography & Extremes Database, 지형 및 기상 극값 데이터베이스) | 전국 226개 시·군·구별 불투수 면적비, 평균 경사도, 과거 기상이변 극값 레코드 및 로컬 언론사 재난 보도 아카이브를 연관 저장 |
| **220** | 지형 가중 유사도 및 백분위 연산부 (Weighted Similarity & Percentile Unit, 가중 유사도 및 백분위 연산부) | 도심 저지대(불투수율 가중)와 산악 경사지(선행 48시간 강수 가중)의 물리적 취약성을 반영한 정규화 거리 수식으로 역대 상위 백분위(%) 위험도 도출 |
| **230** | 과거 지역 피해 뉴스 바인딩부 (Historical Damage News Binder, 과거 피해 뉴스 결합부) | 최고 유사도($0.85$ 이상) 과거 기상 사건 발생일 전후($-1\text{일} \sim +2\text{일}$)에 보도된 해당 지자체의 실제 침수·파손 뉴스 기사 3건을 추출하여 경고 카드에 결합 |
| **240** | 공간 K-Ring 확장 탐색 폴백 처리기 (Spatial K-Ring Fallback Handler, 인접 권역 확장 대체 처리기) | 관할 구·군 내 유사 사례 부재 시 반경 $15\text{ km}$ 이내 인접 기초지자체 연결망(Spatial K-Ring)으로 검색 범위를 자동 확장하여 매칭 실패 방지 |
| **300** | **제3핵심계층: 임계 절단형 생체기상학 활동지수 엔진** (Biometeorological Activity Index Engine, 생체기상학 활동지수 엔진) | 실시간 7대 기상 변수와 선행 강수량 및 노면 온도를 결합하여 러닝·등산·운전 안전 지수를 100점 만점으로 산출하고 감점 원인을 분해 |
| **310** | 다변량 기상 및 선행 강수 입력부 (Multivariate & Antecedent Rain Input Unit, 다변량 및 선행 강수 입력부) | 기온, 습도, 풍속, 시간당 강수, 초미세먼지(PM2.5), 자외선(UV), 시정거리 및 선행 24~48시간 누적 강수량을 주입 |
| **320** | 노면 온도 열수지 폴백 추정기 (Road Surface Temp Fallback Estimator, 노면 온도 예비 추정기) | 도로 기상 센서 결측(Null) 시 대기 온도, 상대습도 기반 이슬점 온도 및 심야 복사 냉각 계수($-2.2^\circ\text{C}$)를 결합한 열수지 수식으로 가상 노면 온도 복원 |
| **330** | 비선형 감쇠 및 임계 컷오프 연산기 (Nonlinear Decay & Gate Cutoff Unit, 비선형 감쇠 및 임계 차단 연산기) | 블랙아이스 조건(노면 $\le 1.5^\circ\text{C}$ & 수분 존재)이나 등산로 토양 포화 조건 감지 시 컷오프 승수($0.40 \sim 0.45$)를 작동시켜 전체 점수를 위험 등급으로 강제 하향 |
| **340** | XAI 감점 기여율 역산 모듈 (XAI Deduction Contribution Module, 설명 가능한 AI 감점 기여율 모듈) | 전체 감점 합계 대비 개별 위험 요인(수막현상, 블랙아이스, 진흙탕 등)의 감점 비중을 백분율(%)로 역산하여 클라이언트 막대그래프 분할 폭으로 제공 |
| **400** | **제4핵심계층: 융합 AI 행동 강령 및 상권 트리거 제어 엔진** (AI Action & Commerce Trigger Orchestrator, AI 행동 및 상권 트리거 통합 제어기) | 제1~제3핵심계층 산출물을 융합하여 자연어 가이드를 생성하고 유동인구 감쇠 기반 타임세일 발송 및 침해 입증용 UI(User Interface, 사용자 인터페이스) 상태 토큰을 발행 |
| **410** | 할루시네이션 검증 및 규칙 폴백 엔진 (Hallucination Guard & Rule Fallback Engine, 환각 방지 및 규칙 기반 대체 엔진) | LLM(Large Language Model, 거대언어모델) 응답 지연($1,500\text{ ms}$ 초과) 또는 수치 변조 감지 시 출력을 폐기하고 결정론적 규칙 기반 브리핑 문장으로 즉시 대체 |
| **420** | 보행 유동인구 감쇠율 및 타임세일 판정부 (Foot-Traffic Decay & Timesale Trigger Unit, 유동인구 감쇠 및 타임세일 판정부) | 분 단위 ETA와 보행 활동지수를 지수 감쇠 수식으로 결합하여 유동인구 급감률($40\%$ 이상) 및 골든타임($15 \sim 60\text{분}$) 충족 시 소상공인 단말(20)로 타임세일 트리거 발송 |
| **430** | 외적 침해 입증 UI 상태 해시 발행부 (Observable UI State Hash Issuer, 외적 입증용 UI 상태 해시 발행부) | 백엔드 연산 결과들을 조합한 SHA-256(Secure Hash Algorithm 256-bit, 256비트 보안 해시 알고리즘) 상태 토큰을 생성하여 단말(10)의 시각적 효과를 강제 동기화 |



## 【특허청구범위】

### 【청구항 1】 (독립항: 시스템)

사용자 단말(10)의 위치 좌표를 기반으로 초지역(Hyper-Local, 동네 단위 미시 권역) 기상 정보를 제공하는 시스템으로서,
기상 관측 서버로부터 위성 적외선 구름 타일 및 기상 레이더 반사도 타일을 포함하는 시계열 기상 데이터를 수신하는 통신 인터페이스;
전국 기초지자체 단위로 구분된 지형 취약성 계수, 과거 누적 기상 극값 레코드 및 해당 기상 현상 발생 당시의 지역 뉴스 기사 메타데이터를 연관 저장하는 데이터베이스(210); 및
상기 통신 인터페이스 및 상기 데이터베이스(210)와 동작 가능하게 연결되어 제1핵심계층(100) 내지 제4핵심계층(400)을 구동하도록 구성된 적어도 하나의 프로세서;를 포함하고,
상기 프로세서는:
연속된 복수의 시점에 대한 상기 기상 레이더 반사도 타일의 강수 셀들에 대하여 데시벨 역로그 스케일 가중치가 부여된 중심점 변위 및 시간에 따른 반사도 증감률(Growth/Decay Rate, 시간에 따른 강수 세력 성장·소멸률)을 연산하여, 상기 사용자 단말(10)이 위치한 행정구역 방향으로의 사영 접근 속도(Radial Velocity, 사용자 방향 유효 접근 속도), 분 단위 도달 예상 시간(ETA, Estimated Time of Arrival) 및 도달 시점 예상 반사도를 산출하는 제1핵심계층(100);
현재 관측 또는 예보된 다변량 기상 수치 벡터에 선행 누적 강수량 및 해당 행정구역의 상기 지형 취약성 계수를 반영하여 상기 데이터베이스(210)에 저장된 과거 누적 기상 극값 레코드들과의 지형 가중 정규화 유사도를 연산함으로써, 현재 기상 현상의 역대 위험도 백분위 순위를 도출하고 기설정된 유사도 임계치 이상인 과거 기상 사례 및 이에 매칭된 과거 지역 뉴스 기사를 추출하는 제2핵심계층(200);
실시간 기상 변수들과 함께 선행 누적 강수량 및 노면 온도를 활동 유형별 비선형 감쇠 함수 및 치명적 위험 임계 컷오프 승수(Gate Cutoff Multiplier, 치명적 위험 감지 시 점수를 강제 하향 절단하는 승수)에 대입하여 러닝 지수, 등산 지수 및 운전 안전 지수를 포함하는 100점 만점 기준의 야외 활동별 지수와 설명 가능한 인공지능(XAI, Explainable AI) 항목별 감점 기여율을 산출하는 제3핵심계층(300); 및
상기 산출된 분 단위 도달 예상 시간, 상기 역대 위험도 백분위 순위와 과거 지역 뉴스 기사, 및 상기 야외 활동별 지수를 인공지능 언어 모델에 주입하되 수치 일치 여부 검증 및 타임아웃 폴백(Fallback, 예비 대체 실행) 제어를 거쳐 자연어 행동 가이드 메시지를 생성하고, 상기 산출된 정량 지표들에 대응하는 시각 상태 제어 지시자(Observable UI Directives, 화면의 시각적 상태를 제어하는 지시 데이터)를 생성하여 상기 사용자 단말(10)의 화면 상에 기상이변 하이라이트 효과, 과거 사례 간접체험 인터페이스 및 항목별 감점 분해 게이지가 동기화 표출되도록 제어하는 제4핵심계층(400);을 포함하는 것을 특징으로 하는,
시공간 기상 벡터의 이류-감쇠 추적 및 지형 가중치 기반 지역 누적 기상 히스토리 유사도 매칭을 이용한 초지역 기상이변 피해 예측 및 행동 강령 생성 시스템.

### 【청구항 2】 (종속항: 무경계 듀얼 타일 오버스케일 합성 및 이류-감쇠 거짓 경보 차단)

제1항에 있어서,
상기 제1핵심계층(100)은:
물리적 최대 줌 레벨이 제한된 상기 위성 적외선 구름 타일 및 상기 기상 레이더 반사도 타일에 대하여 상기 사용자 단말(10) 뷰포트의 줌 레벨이 물리적 상한을 초과할 경우, 오버스케일 보간 합성 모듈(120)을 통해 최대 줌 레벨 상한 가드(MaxZoom Guard, 최대 줌 초과 방지 보호기) 및 쌍선형 리샘플링 보간(Bilinear Resampling Interpolation, 쌍선형 재표본화 보간)을 적용하여 타일 결측 없이 다중 적층(Stacking, 다층 겹침) 렌더링하고,
이류-감쇠 벡터 및 ETA 연산 모듈(130)을 통해 산출된 상기 분 단위 도달 예상 시간이 기설정된 임계 시간 이내이더라도 상기 반사도 증감률에 기초하여 산출된 상기 도달 시점 예상 반사도가 유효 강수 임계치 미만인 경우, 이동 중 소멸하는 강수 셀로 판정하여 상기 기상이변 하이라이트 효과의 발동을 억제하는 것을 특징으로 하는 시스템.

### 【청구항 3】 (종속항: 지형 가중 히스토리 유사도 및 공간 K-Ring 확장 폴백 매칭)

제1항에 있어서,
상기 제2핵심계층(200)은:
지형 가중 유사도 및 백분위 연산부(220)를 통해 해당 기초지자체의 불투수 면적비에 비례하여 시간당 강수량 편차의 가중치를 증폭시키고 평균 경사도에 비례하여 선행 48시간 누적 강수량 편차의 가중치를 증폭시킨 지형 가중 정규화 거리를 기반으로 과거 기상 사건들과의 유사도를 산출하되,
해당 기초지자체 내에 상기 유사도 임계치 이상인 과거 기상 사례가 존재하지 않는 경우, 공간 K-Ring 확장 탐색 폴백 처리기(240)를 통해 인접 기초지자체 연결망(Spatial K-Ring, 인접 행정구역 공간 연결망)으로 탐색 범위를 자동 확장하여 최고 유사도를 가진 인접 지역의 과거 기상 사례 및 당시 발행된 지역 피해 뉴스 기사를 과거 지역 피해 뉴스 바인딩부(230)로 대체 바인딩(Binding, 데이터 결합)하는 것을 특징으로 하는 시스템.

### 【청구항 4】 (종속항: 노면 열수지 폴백 추정 및 임계 컷오프가 적용된 야외 활동별 지수)

제1항에 있어서,
상기 제3핵심계층(300)은:
도로 기상 관측망으로부터 실측 노면 온도 데이터가 결측된 경우, 노면 온도 열수지 폴백 추정기(320)를 통해 대기 온도, 상대습도 기반 이슬점 온도 및 심야 시간대 복사 냉각 보정치를 결합한 열수지 추정식을 이용하여 가상 노면 온도를 복원하고;
비선형 감쇠 및 임계 컷오프 연산기(330)를 통해 등산 지수 산출 시 현재 강수가 없더라도 선행 48시간 누적 강수량이 임계치를 초과하면 토양 포화 미끄럼 페널티를 차감하며, 운전 안전 지수 산출 시 상기 실측 또는 복원된 노면 온도가 영상 1.5°C 이하이면서 선행 강수 이력이 존재하거나 상대습도가 80% 이상인 경우 블랙아이스(Black Ice, 도로 살얼음) 임계 컷오프 승수를 작동시켜 전체 점수를 위험 등급 구간으로 강제 하향 절단하고;
XAI 감점 기여율 역산 모듈(340)을 통해 전체 감점 합계 대비 각 기상 요인의 감점 비율을 정규화 역산하여 상기 사용자 단말(10) 화면의 감점 분해 바(Bar, 막대 게이지)의 분할 폭(Width Percent, 너비 백분율)으로 매핑하는 것을 특징으로 하는 시스템.

### 【청구항 5】 (종속항: 보행 유동인구 감쇠율 연동 골목상권 타임세일 골든타임 트리거)

제1항에 있어서,
상기 제4핵심계층(400)은:
보행 유동인구 감쇠율 및 타임세일 판정부(420)를 통해 상기 산출된 분 단위 도달 예상 시간과 상기 야외 활동별 지수 중 보행 외출 지수를 지수 감쇠 함수로 결합하여 해당 행정구역의 향후 보행 유동인구 감쇠율(Foot-Traffic Decay Rate, 보행 유동인구 감소 비율)을 연산하고,
상기 보행 유동인구 감쇠율이 기설정된 임계 비율 이상이면서 상기 분 단위 도달 예상 시간이 사전 대비 골든타임 구간(15분 이상 60분 이하) 내에 위치하는 경우, 해당 행정구역 내 인증된 소상공인 단말(20)로 재고 소진을 위한 우천·기상이변 타임세일 등록 권고 트리거(Trigger, 자동 실행 신호)를 자동 발송하도록 제어하는 것을 특징으로 하는 시스템.

### 【청구항 6】 (종속항: 다계층 무중단 예외 처리, 할루시네이션 가드레일 및 상태 전이 해시 토큰 발행)

제1항에 있어서,
상기 프로세서는:
현재 시점의 기상 레이더 타일 프레임이 결측된 경우 상기 제1핵심계층(100)의 레이더 결측 외삽 폴백 처리기(140)를 통해 직전 유효 프레임에서 산출된 캐시(Cache, 임시 저장 데이터) 이동 벡터를 이용하여 잔여 도달 예상 시간을 외삽 보정하고,
상기 인공지능 언어 모델의 응답 시간이 기설정된 임계 시간을 초과하거나 생성된 문장 내의 수치 데이터가 상기 제1 내지 제3핵심계층(100, 200, 300)에서 산출된 원본 정량 수치와 불일치하는 할루시네이션(Hallucination, 인공지능 환각 현상)이 감지되는 경우, 상기 제4핵심계층(400)의 할루시네이션 검증 및 규칙 폴백 엔진(410)을 통해 상기 인공지능 언어 모델의 출력을 즉시 폐기하고 결정론적 규칙 기반 템플릿 브리핑 문장으로 대체 출력하며,
상기 제4핵심계층(400)의 외적 침해 입증 UI 상태 해시 발행부(430)를 통해 해당 행정구역 식별자, 상기 분 단위 도달 예상 시간, 상기 역대 위험도 순위 및 상기 야외 활동별 지수를 조합한 결정론적 상태 전이 해시 토큰(UI State Transition Hash Token, 화면 상태 전이 검증용 해시 토큰)을 발행하여 상기 사용자 단말(10)의 시각적 상태 전이를 검증 및 동기화하는 것을 특징으로 하는 시스템.

### 【청구항 7】 (독립항: 방법)

프로세서를 포함하는 컴퓨팅 시스템에 의해 수행되는 초지역 기상이변 피해 예측 및 행동 강령 생성 방법으로서,
제1핵심계층(100)이 위성 적외선 구름 타일 및 기상 레이더 반사도 타일의 연속 프레임으로부터 데시벨 역로그 스케일 가중 중심점 변위 및 반사도 증감률을 연산하여, 사용자 단말(10)이 위치한 행정구역으로 접근하는 기상이변의 사영 접근 속도, 분 단위 도달 예상 시간(ETA) 및 도달 시점 예상 반사도를 산출하는 단계;
제2핵심계층(200)이 현재 관측 또는 예보된 다변량 기상 수치 벡터에 선행 누적 강수량 및 해당 행정구역의 지형 취약성 계수를 반영하여 데이터베이스(210)에 저장된 과거 누적 기상 극값 레코드들과의 지형 가중 정규화 유사도를 연산함으로써, 역대 위험도 백분위 순위를 도출하고 가장 유사한 과거 기상 사례 당시의 지역 피해 뉴스 기사를 매칭하는 단계;
제3핵심계층(300)이 실시간 기상 변수들과 함께 선행 누적 강수량 및 노면 온도를 활동 유형별 비선형 감쇠 함수 및 치명적 위험 임계 컷오프 승수에 대입하여 러닝, 등산 및 운전 안전을 포함하는 100점 만점 기준의 야외 활동별 지수와 설명 가능한 인공지능(XAI) 항목별 감점 기여율을 산출하는 단계; 및
제4핵심계층(400)이 상기 분 단위 도달 예상 시간, 상기 역대 위험도 백분위 순위와 과거 지역 피해 뉴스 기사, 및 상기 야외 활동별 지수를 인공지능 언어 모델로 융합하되 수치 일치 여부 검증 및 타임아웃 폴백 제어를 거쳐 자연어 행동 가이드 메시지를 생성하고, 상기 산출된 정량 지표들에 대응하는 시각 상태 제어 지시자(Observable UI Directives)를 생성하여 상기 사용자 단말(10) 화면의 기상이변 하이라이트 인터페이스 동기화 표출 및 보행 유동인구 감쇠율에 따른 소상공인 단말(20)의 타임세일 트리거 판정을 수행하는 단계;를 포함하는 방법.

### 【청구항 8】 (독립항: 컴퓨터 판독 가능 기록매체)

제7항의 방법을 프로세서가 실행하도록 하기 위한 프로그램이 기록된, 컴퓨터로 판독 가능한 비일시적 기록매체.

### 【청구항 9】 (독립항: 컴퓨터 프로그램)

하드웨어인 컴퓨터와 결합하여 제7항의 방법을 실행하기 위하여 컴퓨터 판독 가능 기록매체에 저장된 컴퓨터 프로그램.



## 【요약서】

### 【요약】

본 발명은 시공간 기상 벡터의 이류-감쇠(Advection-Decay, 수평 이동 및 세력 증감) 추적 및 지형 가중치 기반 지역 누적 기상 히스토리 유사도 매칭을 이용한 초지역(Hyper-Local, 동네 단위 미시 권역) 기상이변 피해 예측, 임계 절단형(Threshold-Cutoff, 위험 임계치 도달 시 점수를 강제 하향 차단하는 방식) 생체기상학 활동지수 산출 및 인공지능 행동 강령 생성 시스템 및 방법에 관한 것이다. 본 발명은 정지궤도 위성 타일과 레이더 타일을 오버스케일(Overscale, 해상도 한계 초과 확대 보간) 합성하고 강수 셀의 사영 접근 속도(Radial Velocity, 사용자 방향 유효 접근 속도)와 반사도 증감률을 연산하여 동네 도달 예상 시간(ETA, Estimated Time of Arrival)을 분 단위로 산출하며, 불투수율·경사도가 반영된 지형 가중 유사도 연산을 통해 해당 구·군의 역대 기상 순위와 과거 실제 피해 뉴스를 매칭하여 간접체험 모달(Modal, 화면 오버레이 팝업창)로 제공한다. 또한 선행 강수량과 노면 온도 열수지 추정치를 결합한 임계 컷오프 수식으로 러닝·등산·운전 100점 지수와 설명 가능한 인공지능(XAI, Explainable AI) 감점 바를 도출하고, 보행 유동인구 감쇠율에 연동하여 골목상권 타임세일 트리거(Trigger, 자동 실행 신호)를 발송함으로써 재난 예방과 지역 상권 보호를 동시에 달성한다.

### 【대표도】

도면 1



## 【도면】

### 【도면 1】 전체 시스템 아키텍처 및 참조 부호 매핑 도면

```mermaid
%%{init: {
  'flowchart': {
    'wrappingWidth': 450,
    'nodeSpacing': 45,
    'rankSpacing': 45
  }
}}%%
flowchart TD
    subgraph ClientTier ["클라이언트 및 골목상권 단말 계층 (Client & Merchant Tier)"]
        direction TB
        U10["사용자 단말 (10)\n• 기상이변 네온 펄스 링 표출\n• 과거 피해 뉴스 간접체험 모달\n• 100점 만점 XAI 감점 분해 게이지"]
        M20["소상공인 단말 (20)\n• 유동인구 급감 예측 경보 수신\n• 우천·기상이변 타임세일 원클릭 등록"]
    end

    BFF30["공간 기상 게이트웨이 (30)\n• 현위치(lat, lng) ➔ 시군구 코드(space_id) 역지오코딩\n• 제1~제3핵심계층 비동기 병렬 라우팅 제어"]

    subgraph Layer100 ["제1핵심계층: 시공간 기상 벡터 및 이류-감쇠 추적 엔진 (100)"]
        direction TB
        M110["시계열 타일 수집 모듈 (110)\n위성(IR) & 레이더(dBZ) 연속 프레임 수신"]
        M120["오버스케일 보간 합성 모듈 (120)\nMaxZoom 가드 & 쌍선형 리샘플링 무경계 합성"]
        M130["이류-감쇠 벡터 및 ETA 연산 모듈 (130)\n역로그 가중 중심점·사영 접근속도·도달 예상 dBZ 산출"]
        M140["레이더 결측 외삽 폴백 처리기 (140)\n패킷 유실 시 캐시 벡터 기반 칼만 외삽 복원"]
        M110 --> M120 --> M130 --> M140
    end

    subgraph Layer200 ["제2핵심계층: 지형 가중 기상 히스토리 및 뉴스 매칭 엔진 (200)"]
        direction TB
        M210["지형 취약 계수 및 극값 DB (210)\n226개 시군구 불투수율·경사도·과거 극값·로컬 뉴스"]
        M220["지형 가중 유사도 및 백분위 연산부 (220)\n지형 가중 정규화 거리 & 역대 위험도 순위(%) 산출"]
        M230["과거 지역 피해 뉴스 바인딩부 (230)\n유사 사건 발생일(-1일~+2일) 실제 피해 뉴스 조인"]
        M240["공간 K-Ring 확장 탐색 폴백 처리기 (240)\n유사도 0.85 미달 시 반경 15km 인접 지자체 확장"]
        M210 --> M220 --> M230 --> M240
    end

    subgraph Layer300 ["제3핵심계층: 임계 절단형 생체기상학 활동지수 엔진 (300)"]
        direction TB
        M310["다변량 기상 및 선행 강수 입력부 (310)\n7대 실시간 기상변수 + 48시간 선행 누적 강수량"]
        M320["노면 온도 열수지 폴백 추정기 (320)\n센서 결측 시 대기온도·이슬점·심야 복사냉각 복원"]
        M330["비선형 감쇠 및 임계 컷오프 연산기 (330)\n블랙아이스·토양포화 감지 시 컷오프 승수 강제 적용"]
        M340["XAI 감점 기여율 역산 모듈 (340)\n러닝·등산·운전 100점 지수 및 요인별 감점 비중(%) 도출"]
        M310 --> M320 --> M330 --> M340
    end

    subgraph Layer400 ["제4핵심계층: 융합 AI 행동 강령 및 상권 트리거 제어 엔진 (400)"]
        direction TB
        M410["할루시네이션 검증 및 규칙 폴백 엔진 (410)\nLLM 행동 강령 생성 & 지연/환각 시 결정론적 템플릿 전환"]
        M420["보행 유동인구 감쇠율 및 타임세일 판정부 (420)\n유동인구 감쇠율(40%+) & 골든타임(15~60분) 트리거 연산"]
        M430["외적 침해 입증 UI 상태 해시 발행부 (430)\nSHA-256 상태 토큰 발행 및 클라이언트 시각 상태 동기화"]
        M410 --> M420 --> M430
    end

    U10 <-->|"1. 위치 좌표 요청"| BFF30
    BFF30 -->|"2. 병렬 연산 실행"| Layer100 & Layer200 & Layer300
    M140 & M240 & M340 -->|"3. 정량 메타데이터 주입"| Layer400
    M420 ==>|"4-A. 긴급 타임세일 등록 권고 푸시"| M20
    M430 ==>|"4-B. 통합 페이로드 + UI 상태 토큰 반환"| U10

```



### 【도면 2】 전체 시스템 데이터 흐름 및 예외 처리 시퀀스 도면

```mermaid
sequenceDiagram
    autonumber
    actor User as 사용자 단말 (10)
    actor Merchant as 소상공인 단말 (20)
    participant BFF as 공간 기상 게이트웨이 (30)
    participant VectorEngine as 제1핵심계층: 벡터 엔진 (100)
    participant HistoryDB as 제2핵심계층: 히스토리 DB (200)
    participant BioEngine as 제3핵심계층: 생체기상 엔진 (300)
    participant AIEngine as 제4핵심계층: AI/상권 제어기 (400)

    User->>BFF: 1. 현위치 좌표(lat, lng), 뷰포트 줌(z=15), 행정구역(space_id) 전송
    par 제1핵심계층(100) 시공간 레이더 벡터 연산
        BFF->>VectorEngine: 2-A. 위성(IR) 및 레이더(dBZ) 연속 프레임(t-20m, t-10m, t) 조회
        VectorEngine->>VectorEngine: 3-A. 오버스케일 보간 합성(120) 및 이류-감쇠 ETA 연산(130)
        VectorEngine->>VectorEngine: 4-A. 타일 결측 시 캐시 기반 칼만 외삽 폴백(140) 작동
    and 제2핵심계층(200) 지형 가중 히스토리 및 뉴스 매칭
        BFF->>HistoryDB: 2-B. 현재 다변량 기상 벡터 + 48h 선행 강수량 전송
        HistoryDB->>HistoryDB: 3-B. 불투수율·경사도 가중 정규화 거리 및 역대 백분위 연산(220)
        HistoryDB->>HistoryDB: 4-B. 유사도 0.85 미달 시 인접 지자체 K-Ring 확장(240) 후 피해 뉴스 조인(230)
    and 제3핵심계층(300) 임계 절단형 생체기상학 지수 연산
        BFF->>BioEngine: 2-C. 7대 실시간 기상변수 + 48h 선행 강수량 + 노면 온도 주입(310)
        BioEngine->>BioEngine: 3-C. 노면 온도 결측 시 열수지 복원(320) 및 블랙아이스/진흙탕 컷오프 연산(330)
        BioEngine->>BioEngine: 4-C. 러닝·등산·운전 100점 지수 및 XAI 감점 분해 배열 생성(340)
    end
    VectorEngine-->>AIEngine: 5-A. WeatherMovementVector 페이로드 전달
    HistoryDB-->>AIEngine: 5-B. HistoricalMatchPayload 전달
    BioEngine-->>AIEngine: 5-C. ActivityScoreResult[] 배열 전달
    AIEngine->>AIEngine: 6. LLM 행동 강령 생성 및 할루시네이션/타임아웃(1500ms) 폴백 검증(410)
    AIEngine->>AIEngine: 7. 보행 유동인구 감쇠율 연산(420) 및 UI 상태 해시 토큰 생성(430)
    alt 보행 유동인구 감쇠율 >= 40% AND 15분 <= ETA <= 60분
        AIEngine-->>Merchant: 8-A. 골목상권 긴급 타임세일 등록 권고 트리거 발송
    end
    AIEngine-->>User: 8-B. 최종 응답 반환 (네온 펄스 링 + 과거 뉴스 간접체험 모달 + XAI 게이지 + AI 행동 강령)

```



### 【도면 3】 모듈 간 데이터 입출력(I/O) 파이프라인 및 6대 예외 처리 상태 전이 도면

```mermaid
stateDiagram-v2
    [*] --> DataIngestion: 단말(10) 위치 좌표(lat, lng, space_id) 수신 (30)
    DataIngestion --> L1_Vector: 기상/레이더 타일 정상 수신
    DataIngestion --> Fallback_EX01_02: [EX-01/02] 고배율 404 에러 또는 레이더 패킷 결측

    state "제1~제4핵심계층 정상 파이프라인 (Normal Execution Pipeline)" as NormalPipeline {
        L1_Vector: 제1계층(100) 이류-감쇠 벡터 및 사영 접근속도 ETA 산출
        L2_History: 제2계층(200) 지형가중 정규화 거리 및 과거 피해 뉴스 바인딩
        L3_Bio: 제3계층(300) 임계 컷오프 3대 활동지수 및 XAI 감점 역산
        L4_AI: 제4계층(400) LLM 행동강령·타임세일 트리거·UI 해시 생성
        L1_Vector --> L2_History
        L2_History --> L3_Bio
        L3_Bio --> L4_AI
    }

    Fallback_EX01_02 --> L2_History: MaxZoom 클램핑(120) 및 캐시 벡터 칼만 외삽(140) 대체
    L1_Vector --> Fallback_EX03: [EX-03] 다중 셀 병합으로 이동속도 120km/h 초과 노이즈 발생
    Fallback_EX03 --> L2_History: 한반도 중위도 물리 상한 속도(120km/h) 클램핑 보정

    L2_History --> Fallback_EX04: [EX-04] 관할 구·군 내 유사도 0.85 이상 과거 사례 부재
    Fallback_EX04 --> L3_Bio: 인접 기초지자체 연결망(Spatial K-Ring, 240) 확장 탐색 매칭

    L3_Bio --> Fallback_EX05: [EX-05] 도로 관측망 노면 온도 센서 결측(Null)
    Fallback_EX05 --> L4_AI: 대기온도·이슬점·심야 복사냉각 열수지 추정식(320) 자동 가동

    L4_AI --> Fallback_EX06: [EX-06] LLM 응답 지연(>1500ms) 또는 ETA 수치 불일치(환각) 감지
    Fallback_EX06 --> UI_Render: 결정론적 규칙 기반(Rule-based) 브리핑 템플릿(410) 즉시 전환
    L4_AI --> UI_Render: 정상 JSON 페이로드 + 타임세일 트리거(420) + UI 상태 해시(430) 출력
    UI_Render --> [*]

```



## 💡 출원인(대표님)을 위한 전략적 활용 요약 (특허 포트폴리오 및 R&D 방어 가이드)

본 제2호 특허출원 명세서는 선행 특허인 제1호 특허(출원번호: 특허-2026-0182139)와 결합하여 로컬리(Locally, 초지역 뉴스·기상·커머스 통합 플랫폼)의 핵심 비즈니스 모델(BM, Business Model)과 기술적 진입장벽(Technical Moat, 기술적 해자)을 동시에 완성하도록 설계되었습니다 
(출처: 한국특허전략개발원 IP-R&D 전략 수립 가이드, `[https://www.kista.re.kr](https://www.kista.re.kr)`).

### 1. 정부지원사업(예비/초기창업패키지, TIPS, 글로벌 ODA/KSP 제안 등) 서류 작성 전략

* **특허 제1호 (출원번호 10-2026-0182139):** "비정형 자연어 주문 정형화 및 원자적 동시성 재고 제어" ➔ **[골목상권 커머스 트랜잭션 무결성 엔진 - 출원 완료 증빙]**
* **특허 제2호 (본 신규 고도화 출원안):** "시공간 기상 벡터의 이류-감쇠 추적 및 지형 가중치 기반 지역 누적 기상 히스토리 유사도 매칭을 이용한 초지역 기상이변 피해 예측, 임계 절단형 생체기상학 활동지수 산출 및 인공지능 행동 강령 생성 시스템" ➔ **[초지역 기상·재난 인텔리전스 및 상권 수요 예측 엔진 - 핵심 R&D 지식재산권]**
* **고위 의사결정자 및 심사위원 설득 인사이트 (Executive Insight):**
  단순히 날씨를 알려주는 앱이나 단순 할인 쿠폰을 뿌리는 커머스 앱은 기존 시장에 많습니다. 
  그러나 본 특허 포트폴리오는 "
  ① 분 단위 기상이변 도달 예측 및 과거 지역 피해 뉴스 간접체험(제2호 청구항 1~3) ➔ 
  ② 야외 활동지수 급락에 따른 동네 보행 유동인구 감쇠율 정량 산출 및 골든타임 타임세일 자동 점화(제2호 청구항 4~5) ➔ 
  ③ 타임세일 발동으로 폭증하는 동네 주민들의 선착순 주문을 초과 판매(Overselling, 재고 부족 결제 사고) 없이 처리하는 원자적 재고 제어(제1호 특허)
  "로 이어지는 완벽한 기술적 인과관계를 형성합니다 
(출처: 중소벤처기업부 창업성장기술개발사업 기술성 평가 기준, `[https://www.smtech.go.kr](https://www.smtech.go.kr)`).

### 2. 심사관 거절이유(Office Action) 대비 대안(Alternatives) 및 리스크 관리 매트릭스

향후 특허청 심사 과정에서 발생할 수 있는 심사관의 의견제출통지서(OA, Office Action)에 대응하기 위한 사전 방어 논리와 보정 대안은 아래 표와 같습니다 (출처: 특허청 인공지능 및 컴퓨터프로그램 심사기준, `[https://www.kipo.go.kr](https://www.kipo.go.kr)`).

| 리스크 유형 (Risk Category) | 심사관 예상 지적 사항 (Potential Examiner Objection) | 명세서 내 반영된 1차 방어 논리 (Primary Defense in Spec) | 최악의 경우 활용 가능한 2차 보정 대안 (Secondary Amendment Alternative) |
| --- | --- | --- | --- |
| **진보성 리스크 1 (기상 레이더 추적)** | 기상청 나우캐스트나 해외 기상 특허(AccuWeather 등)의 단순 레이더 외삽과 유사함 | 단순 외삽이 아니라 데시벨 역로그 가중치($10^{\text{dBZ}/10}$), 사용자 방향 사영 속도($V_{\text{cell}}\cos\Delta\theta$), 및 반사도 증감률($\gamma$)을 결합해 이동 중 소멸하는 비구름의 거짓 경보를 차단하는 물리 수식임을 강조 | 청구항 2의 '반사도 증감률 기반 소멸 비구름 하이라이트 억제 구성'과 청구항 6의 '레이더 결측 시 캐시 벡터 칼만 외삽(140) 구성'을 청구항 1(독립항)에 병합 보정하여 즉시 등록 확보 |
| **진보성 리스크 2 (과거 재난 매칭)** | 과거 기상 DB에서 유사 사례를 검색하는 공지된 정보검색 기술의 단순 적용임 | 단순 수치 검색이 아니라 기초지자체별 불투수 면적비($\alpha_{\text{imp}}$)와 평균 경사도($\beta_{\text{slope}}$)를 시간당 강수량 및 48시간 선행 강수량 가중치로 차등 부여하고, 매칭 실패 시 인접 지자체(Spatial K-Ring, 240)로 자동 확장하는 공간 연산 기술임을 입증 | 청구항 3에 기재된 '지자체 불투수율·경사도 비례 가중 정규화 거리 수식(220)'과 'Spatial K-Ring 확장 폴백(240)' 구성을 독립항에 구체화하여 공지 문헌과의 구조적 차이 확립 |
| **진보성 리스크 3 (타임세일 연동 BM)** | 우천 시 할인 쿠폰을 발송하는 공지된 마케팅 영업방법(BM)과의 단순 결합임 | 단순 비 예보가 아니라 '분 단위 ETA'와 '100점 만점 생체기상 보행 지수'를 지수 감쇠 함수([수학식 7])로 결합해 보행 유동인구 감쇠율($40\%$ 이상)과 골든타임($15 \sim 60\text{분}$)을 동시 판정(420)하는 공학적 트리거임을 강조 | 타임세일 권고 알림 시 해당 상점의 품목별 폐기 위험도와 유동인구 감쇠율을 곱하여 '최적 권장 할인율(%)'까지 자동 산출하도록 실시예의 수식 범위를 한정 보정 |
| **기재불비 리스크 (실시가능성)** | 외부 기상 센서 결측이나 LLM 오류 시 시스템 동작이 불명확함 (특허법 제42조 제3항) | 본 명세서 제7절에 6대 예외 코드(EX-01 ~ EX-06)를 정의하고, 특히 노면 온도 결측 시 대기온도·이슬점·복사냉각 열수지 복원 수식([수학식 6], 320)과 LLM 타임아웃/할루시네이션 시 규칙 기반 템플릿 폴백(410)을 완벽히 기재함 | 심사관이 특정 용어의 명확화를 요구할 경우, 제2절의 입출력 명세표(I/O Specification)에 정의된 데이터 타입과 제약 조건을 청구항 문언에 그대로 인용하여 간단히 해소 |

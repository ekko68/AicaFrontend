# front-user-cmm-tsp — AI TSP User Frontend

> 이 프로젝트는 AICA 플랫폼 내부용 TSP 사용자 포털 시스템입니다.
> AICA 플랫폼의 **TSP(기술지원포털) 전용 사용자 프론트엔드** 모노레포입니다.  
> `front-user-cmm`과 동일한 모노레포 구조를 가지며, TSP 사용자 포털 기능에 특화되어 있습니다.  
> 로컬 개발용 `server` 패키지가 포함되어 있으며, 모바일/PC 반응형 대응이 구현되어 있습니다.

---

## 📌 프로젝트 개요

| 항목          | 내용                                 |
| ------------- | ------------------------------------ |
| 패키지명      | `ai-common-front`                    |
| 버전          | `0.0.0`                              |
| 모노레포 도구 | Lerna + Yarn Workspaces              |
| 언어          | TypeScript                           |
| 프레임워크    | React 17 (CRACO 기반)                |
| 스타일        | MUI v5 + Emotion + SCSS              |
| 상태관리      | Zustand + React Query + SWR          |
| 라우팅        | React Router DOM v6 (Dynamic Router) |
| 반응형        | PC / 모바일 동적 감지                |
| 배포          | Docker + Nginx                       |

---

## 📁 패키지 구조 (Yarn Workspace)

```
front-user-cmm-tsp/
├── Dockerfile                  # Docker 빌드 설정 (nginx 기반)
├── nginx.conf                  # Nginx 설정
├── lerna.json                  # Lerna 모노레포 설정
├── craco.config.js             # 공통 CRACO 설정
├── tsconfig.json               # 공통 TypeScript 설정
└── packages/
    ├── server/                 # 로컬 개발용 서버 패키지
    │
    ├── shared/                 # 공통 컴포넌트 및 유틸 라이브러리
    │   ├── .storybook/         # Storybook 설정
    │   └── src/
    │       ├── DynamicRouter.tsx           # API 기반 동적 라우터
    │       ├── ErrorBoundary.tsx
    │       ├── store/
    │       │   ├── RouteConfigStore.ts     # 라우트 설정 스토어
    │       │   └── GlobalConfigStore.ts    # 전역 설정 스토어 (디바이스 등)
    │       ├── api/                        # Axios 공통 API 설정
    │       ├── authentication/             # JWT 토큰 관리
    │       ├── components/
    │       │   └── GlobalModals.tsx        # 전역 모달 관리
    │       ├── fetches/                    # SWR/React-Query API 연동
    │       ├── layout/                     # 레이아웃 (basic 등)
    │       ├── libs/                       # 라이브러리 공통 설정
    │       ├── stories/                    # Storybook 스토리
    │       ├── styles/                     # 전역 SCSS 스타일
    │       ├── theme/                      # MUI 테마 설정
    │       └── utils/                      # 공통 유틸 함수
    │
    ├── tsp/                    # TSP(기술지원포털) 사용자 앱
    │   └── src/
    │       ├── App.tsx             # 앱 진입점 (portalType: PORTAL_TSP, layout: basic)
    │       ├── routes/             # 라우트 정의
    │       ├── pages/
    │       │   ├── About/              # 서비스 / 기관 소개
    │       │   ├── Apply/              # 서비스 신청
    │       │   ├── ApplyResource/      # 신청 자원 / 시설
    │       │   ├── Home/               # 메인 홈
    │       │   ├── Info/               # 공지 / 안내 정보
    │       │   ├── Mypage/             # 마이페이지
    │       │   ├── Sign/               # 로그인 / 회원가입 / 로그아웃
    │       │   └── Temp/               # 개발/임시 페이지
    │       ├── service/            # 서비스 레이어
    │       ├── store/              # Zustand 로컬 상태
    │       ├── styles/             # TSP 전용 스타일
    │       └── utils/              # TSP 유틸 함수
    │
    └── usp/                    # USP 사용자 앱 (공통 포함)
        └── src/
            ├── App.tsx
            ├── DynamicRouter.tsx
            ├── Routes/
            ├── api/
            ├── components/
            ├── fetches/
            ├── layout/
            ├── models/
            ├── pages/
            │   ├── Board/
            │   ├── BusFacility/
            │   ├── Community/
            │   ├── EquipmentClassify/
            │   ├── EventNews/
            │   ├── Factor/
            │   ├── Home/
            │   ├── MyPage/
            │   ├── Notice/
            │   ├── ParticipationEvent/
            │   ├── ServiceIntroduction/
            │   ├── SignIn / SignOut / SignUp/
            │   ├── SnsNaverCallback/
            │   └── SupportForUse/
            ├── service/
            ├── store/
            └── styles/
```

---

## 🛠 기술 스택

### Core

- **React** `^17.0.2` + **TypeScript** `^4.4.2`
- **CRACO** `^6.4.3` — CRA 설정 커스터마이징
- **Lerna** `^4.0.0` + **Yarn Workspaces** — 모노레포 관리

### UI / Design

- **@mui/material** `^5.5.2` + **@mui/x-data-grid-pro** + **@mui/x-date-pickers**
- **@emotion/react** + **@emotion/styled** — MUI 스타일 엔진
- **sass** `^1.49.9` — SCSS 컴파일
- **swiper** `6.8.4` — 슬라이더/캐러셀
- **polished** `^4.1.4` — CSS-in-JS 유틸

### 상태 관리 & 데이터 패칭

- **Zustand** `^4.0.0-rc.1` — 전역 상태 (RouteConfigStore, GlobalConfigStore)
- **React Query** `^3.38.0` — 서버 상태 캐싱
- **SWR** `^1.2.2` — 데이터 패칭
- **Axios** `^0.26.1` — HTTP 클라이언트

### 라우팅 & 인증

- **react-router-dom** `^6.2.2` — SPA 라우팅
- **Dynamic Router** — `PORTAL_TSP` 기반 서버 메뉴 동적 라우팅
- **JWT** — `shared/authentication` 모듈

### 반응형 / 디바이스 처리

- `GlobalConfigStore.setDevice()` — `mobile`/`pc` 타입 동적 감지
- `window.resize` 이벤트 + `isMobileDevice()` 유틸

### 기타 라이브러리

- **react-daum-postcode** — 우편번호 검색
- **react-player** — 영상 플레이어
- **xlsx** — 엑셀 처리
- **chart.js** + **@nivo** — 데이터 시각화
- **dayjs** / **ramda** — 날짜·함수형 유틸
- **Storybook** `^6.4.19` — 컴포넌트 문서화

---

## 🌐 포털 구분

| 패키지 | Portal Type  | 접속 경로  | 설명                           |
| ------ | ------------ | ---------- | ------------------------------ |
| `tsp`  | `PORTAL_TSP` | `/`        | 기술지원포털 사용자 (TSP 전용) |
| `usp`  | `PORTAL_UAM` | `/biz/...` | 사용자지원포털 사용자          |

---

## 🗺 TSP 사용자 앱 주요 페이지

| 페이지          | 설명                     |
| --------------- | ------------------------ |
| `Home`          | 메인 홈                  |
| `About`         | 서비스·기관 소개         |
| `Apply`         | 서비스 신청              |
| `ApplyResource` | 신청 자원/시설           |
| `Info`          | 공지/안내 정보           |
| `Mypage`        | 마이페이지               |
| `Sign`          | 로그인·회원가입·로그아웃 |

---

## 🚀 실행 방법

### 설치

```bash
yarn install
```

### 개발 서버

```bash
# TSP 사용자 포털 (Mac)
yarn tsp start:dev

# TSP 사용자 포털 (Windows)
yarn tsp winStart

# Storybook
yarn storybook
```

### 빌드

```bash
yarn tsp build
yarn usp build
```

### 실행 모드

| 스크립트      | 환경                              |
| ------------- | --------------------------------- |
| `start:dev`   | 개발 (`REACT_APP_MODE=dev`)       |
| `start:stage` | 스테이징 (`REACT_APP_MODE=stage`) |
| `start`       | 운영 (`REACT_APP_MODE=prod`)      |

---

## 🐳 Docker 배포

```bash
docker build -t front-user-cmm-tsp .
docker run -p 80:80 front-user-cmm-tsp
```

> `packages/tsp/build` → `/app/build`로 복사 후 Nginx로 서빙

---

## ⚙️ 환경 설정

```bash
# /etc/hosts 등록
127.0.0.1 pc.bnet.com
```

```javascript
// craco.config.js
devServer: { host: 'pc.bnet.com', port: 5500 }
```

---

> 이 프로젝트는 AICA 플랫폼 내부용 TSP 사용자 포털 시스템입니다.

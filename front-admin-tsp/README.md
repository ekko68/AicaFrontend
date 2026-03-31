# front-admin-tsp — AI TSP Admin Frontend

## ⚠️ This project is an internal admin system for the AICA Platform.

> AICA 플랫폼의 **TSP(기술지원포털) 전용 관리자 프론트엔드** 모노레포입니다.  
> `front-admin-cmm`과 동일한 모노레포 구조를 가지며, TSP 관리자 기능에 특화되어 있습니다.

---

## 📌 프로젝트 개요

| 항목          | 내용                                 |
| ------------- | ------------------------------------ |
| 패키지명      | `ai-common-admin`                    |
| 버전          | `0.0.0`                              |
| 모노레포 도구 | Lerna + Yarn Workspaces              |
| 언어          | TypeScript                           |
| 프레임워크    | React 17 (CRACO 기반)                |
| 스타일        | MUI v5 + Emotion + SCSS              |
| 상태관리      | Zustand + React Query + SWR          |
| 라우팅        | React Router DOM v6 (Dynamic Router) |
| 배포          | Docker + Nginx                       |

---

## 📁 패키지 구조 (Yarn Workspace)

```
front-admin-tsp/
├── Dockerfile                  # Docker 빌드 설정 (nginx 기반, tsp/build 서빙)
├── nginx.conf                  # Nginx 설정
├── lerna.json                  # Lerna 모노레포 설정
├── craco.config.js             # 공통 CRACO 설정
├── tsconfig.json               # 공통 TypeScript 설정
└── packages/
    ├── shared/                 # 공통 컴포넌트 및 유틸 라이브러리
    │   ├── .storybook/         # Storybook 설정
    │   └── src/
    │       ├── DynamicRouter.tsx   # API 기반 동적 메뉴 라우터
    │       ├── ErrorBoundary.tsx   # 에러 경계 처리
    │       ├── Store/              # Zustand 전역 상태
    │       ├── api/                # Axios 공통 API 설정
    │       ├── authentication/     # JWT 토큰 관리
    │       ├── components/         # 공통 UI 컴포넌트
    │       ├── fetches/            # SWR/React-Query API 연동
    │       ├── layout/             # 레이아웃 (adminLayout)
    │       ├── libs/               # 라이브러리 공통 설정
    │       ├── stories/            # Storybook 스토리
    │       ├── styles/             # 전역 SCSS 스타일
    │       ├── theme/              # MUI 테마 설정
    │       └── utils/              # 공통 유틸 함수
    │
    ├── tsp/                    # TSP 관리자 앱 — /tsp_admin
    │   └── src/
    │       ├── App.tsx             # 앱 진입점 (portalType: PORTAL_TAM)
    │       ├── Routes/             # 라우트 정의
    │       ├── pages/
    │       │   ├── Dashboard/      # 대시보드 (현황 통계 등)
    │       │   ├── EquipmentMgt/   # 장비 관리
    │       │   ├── Operation/      # 운영 관리
    │       │   ├── Sign/           # 로그인 / 로그아웃
    │       │   └── UseMgt/         # 사용자 관리
    │       ├── service/            # 서비스 레이어
    │       ├── store/              # Zustand 로컬 상태
    │       ├── styles/             # TSP 전용 스타일
    │       └── utils/              # TSP 유틸 함수
    │
    └── usp/                    # USP 관리자 앱 (공통 포함)
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
            │   ├── AnnouncementReception/
            │   ├── Board/
            │   ├── BusInformationMgt/
            │   ├── Convention/
            │   ├── EducationMgt/
            │   ├── EvalSelection/
            │   ├── Home/
            │   ├── Mypage/
            │   ├── OperationMgt/
            │   ├── PerformanceMgt/
            │   ├── ResAllMgt/
            │   ├── ResidentFacilityMgt/
            │   ├── SignIn / SignOut / SignUp/
            │   ├── SystemMgt/
            │   └── TaskMgt/
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

- **@mui/material** `^5.5.2` — Material UI
- **@mui/x-data-grid-pro** — 프로 데이터 그리드 (라이선스 필요)
- **@mui/x-date-pickers-pro** — 날짜 선택기
- **@emotion/react** + **@emotion/styled** — MUI 스타일 엔진
- **sass** `^1.49.9` — SCSS 컴파일
- **polished** `^4.1.4` — CSS-in-JS 유틸

### 상태 관리 & 데이터 패칭

- **Zustand** `^4.0.0-rc.1` — 전역 클라이언트 상태
- **React Query** `^3.38.0` — 서버 상태 캐싱
- **SWR** `^1.2.2` — 데이터 패칭 & 재검증
- **Axios** `^0.26.1` — HTTP 클라이언트

### 라우팅 & 인증

- **react-router-dom** `^6.2.2` — SPA 라우팅
- **Dynamic Router** — 서버 메뉴 API 기반 동적 라우팅
- **JWT** — `shared/authentication` 모듈

### 소셜 로그인 (TSP)

- **react-google-login** `^5.2.2`
- **react-kakao-login** `^2.1.0`
- **react-naver-login** `^0.1.4`

### 기타

- **chart.js** `^3.7.1` / **@nivo** 차트 — 데이터 시각화
- **swiper** `6.8.4` / **dayjs** / **ramda** — 유틸리티
- **Storybook** `^6.4.19` — 컴포넌트 문서화

---

## 🌐 포털 구분

| 패키지 | Portal Type  | 접속 경로    | 설명                  |
| ------ | ------------ | ------------ | --------------------- |
| `tsp`  | `PORTAL_TAM` | `/tsp_admin` | 기술지원포털 관리자   |
| `usp`  | `PORTAL_UAM` | `/`          | 사용자지원포털 관리자 |

---

## 🚀 실행 방법

### 설치

```bash
yarn install
```

### 개발 서버

```bash
# TSP 관리자 개발 (Mac)
yarn tsp start:dev

# TSP 관리자 개발 (Windows)
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
docker build -t front-admin-tsp .
docker run -p 80:80 front-admin-tsp
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

> 이 프로젝트는 AICA 플랫폼 내부용 TSP 관리자 시스템입니다.

# front-admin-cmm — AI Common Admin Frontend

## ⚠️ This project is an internal admin system for the AICA Platform.

> AICA 플랫폼의 **공통 관리자(Admin) 프론트엔드** 모노레포입니다.  
> TSP(기술지원포털) 관리자 + USP(사용자지원포털) 관리자를 단일 저장소에서 관리합니다.

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
front-admin-cmm/
├── Dockerfile                  # Docker 빌드 설정 (nginx 기반, tsp/build 서빙)
├── nginx.conf                  # Nginx 설정
├── lerna.json                  # Lerna 모노레포 설정
├── craco.config.js             # 공통 CRACO 설정
├── tsconfig.json               # 공통 TypeScript 설정
└── packages/
    ├── shared/                 # 공통 컴포넌트 및 유틸 라이브러리
    │   ├── .storybook/         # Storybook 설정
    │   └── src/
    │       ├── App.tsx
    │       ├── DynamicRouter.tsx   # 동적 메뉴 라우터 (API 기반)
    │       ├── ErrorBoundary.tsx
    │       ├── Store/              # Zustand 전역 상태
    │       ├── api/                # Axios 공통 API 설정
    │       ├── authentication/     # JWT 토큰 관리
    │       ├── components/         # 공통 UI 컴포넌트
    │       ├── fetches/            # SWR/React-Query API 연동
    │       ├── layout/             # 레이아웃 (adminLayout 등)
    │       ├── libs/               # 라이브러리 공통 설정 (Axios 등)
    │       ├── stories/            # Storybook 스토리
    │       ├── styles/             # 전역 SCSS 스타일
    │       ├── theme/              # MUI 테마 설정
    │       └── utils/              # 공통 유틸 함수
    │
    ├── tsp/                    # TSP(기술지원포털) 관리자 앱 — /tsp_admin
    │   └── src/
    │       ├── App.tsx             # 앱 진입점 (portalType: PORTAL_TAM)
    │       ├── Routes/             # 라우트 정의
    │       ├── pages/
    │       │   ├── Dashboard/      # 대시보드
    │       │   ├── EquipmentMgt/   # 장비 관리
    │       │   ├── Operation/      # 운영 관리
    │       │   ├── Sign/           # 로그인/로그아웃
    │       │   └── UseMgt/         # 사용자 관리
    │       ├── service/            # 서비스 레이어
    │       ├── store/              # Zustand 로컬 상태
    │       ├── styles/             # TSP 전용 스타일
    │       └── utils/              # TSP 유틸 함수
    │
    └── usp/                    # USP(사용자지원포털) 관리자 앱
        └── src/
            ├── App.tsx             # 앱 진입점 (portalType: PORTAL_UAM)
            ├── DynamicRouter.tsx   # 동적 라우터 (메뉴 API 기반)
            ├── Routes/             # 라우트 정의
            ├── api/                # API 연동
            ├── components/         # USP 전용 컴포넌트
            ├── fetches/            # API 패칭
            ├── layout/             # 레이아웃
            ├── models/             # 타입/모델 정의
            ├── pages/
            │   ├── AnnouncementReception/  # 공고 접수
            │   ├── Board/                  # 게시판
            │   ├── BusInformationMgt/      # 사업정보 관리
            │   ├── Convention/             # 협약 관리
            │   ├── EducationMgt/           # 교육 관리
            │   ├── EvalSelection/          # 평가/선정
            │   ├── Home/                   # 홈
            │   ├── Mypage/                 # 마이페이지
            │   ├── OperationMgt/           # 운영 관리
            │   ├── PerformanceMgt/         # 성과 관리
            │   ├── ResAllMgt/              # 입주사 전체 관리
            │   ├── ResidentFacilityMgt/    # 입주시설 관리
            │   ├── SignIn/SignOut/SignUp/   # 인증
            │   ├── SystemMgt/              # 시스템 관리
            │   └── TaskMgt/               # 업무 관리
            ├── service/            # 서비스 레이어
            ├── store/              # Zustand 로컬 상태
            └── styles/             # USP 전용 스타일
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
- **JWT 인증** — `shared/authentication` 모듈
- **react-cookie** + **js-cookie** — 쿠키 기반 토큰 관리

### 소셜 로그인 (TSP)

- **react-google-login** `^5.2.2`
- **react-kakao-login** `^2.1.0`
- **react-naver-login** `^0.1.4`

### 기타 라이브러리

- **chart.js** `^3.7.1` — 차트
- **@nivo/bar, @nivo/line, @nivo/pie** — Nivo 차트 (USP)
- **swiper** `6.8.4` — 슬라이더
- **dayjs** `^1.11.0` — 날짜 처리
- **ramda** `^0.28.0` — 함수형 유틸
- **react-daum-postcode** — 우편번호 검색 (USP)
- **react-player** `^2.10.1` — 영상 플레이어 (USP)
- **xlsx** `^0.18.5` — 엑셀 처리 (USP)

### 개발 & 테스트

- **Storybook** `^6.4.19` — 컴포넌트 개발 및 문서화
- **ESLint** + **Prettier** — 코드 품질 관리

---

## 🌐 포털 구분

| 패키지 | Portal Type  | 접속 경로    | 설명                  |
| ------ | ------------ | ------------ | --------------------- |
| `tsp`  | `PORTAL_TAM` | `/tsp_admin` | 기술지원포털 관리자   |
| `usp`  | `PORTAL_UAM` | `/`          | 사용자지원포털 관리자 |

---

## 🗺 Dynamic Router 구조

서버 메뉴 API(`/member/api/auth/menus/{portalType}/me`)에서 메뉴 목록을 받아 동적으로 라우트를 생성합니다.

```
API 호출 → 1차원 메뉴 목록 → 계층 구조 변환 → React Router 동적 생성
```

- 인증된 경로: `middleware(['auth'])` 적용 → 토큰 없으면 로그인 페이지 리다이렉트
- 레이아웃: `studio` (인증 후 대시보드), `space` (로그인 등 비인증 페이지)

---

## 🔐 JWT 인증

```typescript
import authentication from 'shared/authentication';

authentication.set(tokenData); // 토큰 저장
authentication.get(); // 전체 인증 정보
authentication.get('accessToken'); // 특정 토큰 조회
authentication.remove(); // 토큰 삭제
```

---

## ⚙️ 환경 설정

개발 서버는 `craco.config.js`에서 설정합니다.

```javascript
module.exports = {
  devServer: {
    host: 'pc.bnet.com',
    port: 5500,
  },
};
```

> `/etc/hosts`에 `127.0.0.1 pc.bnet.com` 등록 필요

---

## 🚀 실행 방법

### 설치

```bash
yarn install
```

### 개발 서버

```bash
# TSP 관리자 (Mac)
yarn tsp start:dev

# TSP 관리자 (Windows)
yarn tsp winStart

# Storybook (shared 컴포넌트)
yarn storybook
```

### 빌드

```bash
# TSP 빌드
yarn tsp build

# USP 빌드
yarn usp build
```

### 실행 모드

| 스크립트      | 설명                                   |
| ------------- | -------------------------------------- |
| `start:dev`   | 개발 환경 (`REACT_APP_MODE=dev`)       |
| `start:stage` | 스테이징 환경 (`REACT_APP_MODE=stage`) |
| `start`       | 운영 환경 (`REACT_APP_MODE=prod`)      |

---

## 🐳 Docker 배포

```bash
# TSP 빌드 결과물로 Docker 이미지 생성
docker build -t front-admin-cmm .
docker run -p 80:80 front-admin-cmm
```

- `packages/tsp/build` → Docker 이미지 내 `/app/build`로 복사
- Nginx가 80 포트로 정적 파일 서빙

---

## 📂 참고 파일

| 파일                                       | 설명                  |
| ------------------------------------------ | --------------------- |
| `packages/shared/src/DynamicRouter.tsx`    | 동적 라우터 핵심 로직 |
| `packages/usp/src/layout/Studio/Header/`   | 헤더 / 네비게이션     |
| `packages/usp/src/pages/Board/Board.tsx`   | 게시판 샘플 구현      |
| `packages/usp/src/pages/SignIn/Factor.tsx` | 비밀번호 확인 구현    |
| `packages/shared/src/authentication/`      | JWT 인증 모듈         |

---

> 이 프로젝트는 AICA 플랫폼 내부용 관리자 시스템입니다.

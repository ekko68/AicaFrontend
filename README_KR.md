# AicaFrontend — AICA 플랫폼 프론트엔드 모노레포 그룹

> AICA 플랫폼의 **전체 프론트엔드 프로젝트 모음**입니다.  
> 4개의 독립 모노레포로 구성되며, 두 개의 서비스 그룹으로 분류됩니다.
> 이 저장소는 AICA 플랫폼 내부용 프론트엔드 프로젝트 모음입니다.

---

## 🗂 프로젝트 그룹 구조

```
AicaFrontend/
├── front-user-cmm/         # [그룹 A] 공통 사용자 포털 (TSP + USP)
├── front-admin-cmm/        # [그룹 A] 공통 관리자 포털 (TSP Admin + USP Admin)
├── front-user-cmm-tsp/     # [그룹 B] TSP 전용 사용자 포털
└── front-admin-tsp/        # [그룹 B] TSP 전용 관리자 포털
```

---

## 🔵 그룹 A — CMM (Common) 공통 플랫폼

> TSP(기술지원포털)와 USP(사용자지원포털) **두 포털을 하나의 모노레포에서 함께 관리**하는 통합 프로젝트입니다.

```
┌─────────────────────────────────────────────────┐
│              그룹 A — CMM 공통 플랫폼             │
│                                                 │
│  front-user-cmm          front-admin-cmm        │
│  (사용자 포털)            (관리자 포털)           │
│  ┌──────────────┐        ┌──────────────┐       │
│  │ packages/    │        │ packages/    │       │
│  │  ├ shared    │        │  ├ shared    │       │
│  │  ├ tsp (USR) │        │  ├ tsp (ADM) │       │
│  │  ├ usp (USR) │        │  ├ usp (ADM) │       │
│  │  └ server    │        └──────────────┘       │
│  └──────────────┘                               │
└─────────────────────────────────────────────────┘
```

| 프로젝트          | 역할                             | 패키지명          | Portal Types               |
| ----------------- | -------------------------------- | ----------------- | -------------------------- |
| `front-user-cmm`  | **사용자** 통합 포털 (TSP + USP) | `ai-common-front` | `PORTAL_TSP`, `PORTAL_UAM` |
| `front-admin-cmm` | **관리자** 통합 포털 (TSP + USP) | `ai-common-admin` | `PORTAL_TAM`, `PORTAL_UAM` |

### 주요 특징

- `shared` 패키지를 통해 TSP/USP 간 컴포넌트·유틸·인증 모듈 **공유**
- 단일 저장소에서 **두 포털(TSP + USP)** 동시 개발·배포 가능
- `front-user-cmm`은 로컬 개발용 `server` 패키지 포함
- USP 관리자(front-admin-cmm)는 20개 이상의 풀 기능 관리 페이지 포함  
  (SystemMgt, EvalSelection, ResidentFacilityMgt, TaskMgt 등)

---

## 🟢 그룹 B — TSP (Technology Support Portal) 전용 플랫폼

> TSP(기술지원포털) **단독 서비스**에 특화된 분리 프로젝트입니다.  
> CMM 그룹과 동일한 모노레포 구조를 가지되, TSP 기능에 집중합니다.

```
┌─────────────────────────────────────────────────┐
│              그룹 B — TSP 전용 플랫폼             │
│                                                 │
│  front-user-cmm-tsp      front-admin-tsp        │
│  (사용자 포털)            (관리자 포털)           │
│  ┌──────────────┐        ┌──────────────┐       │
│  │ packages/    │        │ packages/    │       │
│  │  ├ shared    │        │  ├ shared    │       │
│  │  ├ tsp (USR) │        │  ├ tsp (ADM) │       │
│  │  ├ usp       │        │  └ usp       │       │
│  │  └ server    │        └──────────────┘       │
│  └──────────────┘                               │
└─────────────────────────────────────────────────┘
```

| 프로젝트             | 역할                     | 패키지명          | Portal Types |
| -------------------- | ------------------------ | ----------------- | ------------ |
| `front-user-cmm-tsp` | TSP **사용자** 전용 포털 | `ai-common-front` | `PORTAL_TSP` |
| `front-admin-tsp`    | TSP **관리자** 전용 포털 | `ai-common-admin` | `PORTAL_TAM` |

### 주요 특징

- TSP 단독 배포 요구사항에 대응하는 **경량화·특화** 버전
- 사용자 포털: Home / About / Apply / ApplyResource / Info / Mypage / Sign 중심 구성
- 관리자 포털: Dashboard / EquipmentMgt / Operation / UseMgt 중심 구성

---

## 🔄 그룹 간 관계도

```
                        AICA Platform
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
     [그룹 A] CMM                        [그룹 B] TSP
  공통(TSP + USP) 플랫폼                TSP 전용 플랫폼
          │                                   │
    ┌─────┴─────┐                       ┌─────┴─────┐
    │           │                       │           │
front-user-cmm front-admin-cmm  front-user-cmm-tsp front-admin-tsp
  사용자 포털   관리자 포털          사용자 포털    관리자 포털
(TSP + USP)  (TSP + USP)          (TSP 전용)   (TSP 전용)
```

---

## 📦 공통 기술 스택

4개 프로젝트 모두 동일한 기술 기반을 공유합니다.

| 분류              | 기술                                            |
| ----------------- | ----------------------------------------------- |
| **언어**          | TypeScript                                      |
| **프레임워크**    | React 17 + CRACO                                |
| **모노레포**      | Lerna + Yarn Workspaces                         |
| **UI**            | Material UI v5 + Emotion + SCSS                 |
| **상태관리**      | Zustand + React Query + SWR                     |
| **라우팅**        | React Router DOM v6 + Dynamic Router (API 기반) |
| **HTTP**          | Axios                                           |
| **인증**          | JWT (`shared/authentication`)                   |
| **배포**          | Docker + Nginx                                  |
| **코드 품질**     | ESLint + Prettier                               |
| **컴포넌트 문서** | Storybook                                       |

---

## 🗺 Dynamic Router 공통 아키텍처

모든 프로젝트는 **서버 메뉴 API**로부터 라우트를 동적 생성하는 구조를 공유합니다.

```
서버 API (/member/api/auth/menus/{portalType}/me)
        │
        ▼
1차원 메뉴 목록 수신
        │
        ▼
계층 구조(트리) 변환
        │
        ▼
React Router v6 동적 라우트 생성
        │
  ┌─────┴──────────────────────────┐
  │  middleware(['auth']) 적용      │
  │  레이아웃 분기 (studio / space) │
  └─────────────────────────────────┘
```

---

## 🚀 각 프로젝트 실행 방법 요약

| 프로젝트             | 설치           | 개발 서버            | 빌드             |
| -------------------- | -------------- | -------------------- | ---------------- |
| `front-user-cmm`     | `yarn install` | `yarn tsp start:dev` | `yarn tsp build` |
| `front-admin-cmm`    | `yarn install` | `yarn tsp start:dev` | `yarn tsp build` |
| `front-user-cmm-tsp` | `yarn install` | `yarn tsp start:dev` | `yarn tsp build` |
| `front-admin-tsp`    | `yarn install` | `yarn tsp start:dev` | `yarn tsp build` |

> 개발 서버 실행 전 `/etc/hosts`에 `127.0.0.1 pc.bnet.com` 등록 필요

---

## 🐳 Docker 배포 요약

```bash
# 각 프로젝트 루트에서 실행
docker build -t <project-name> .
docker run -p 80:80 <project-name>
```

- 빌드 결과물: `packages/tsp/build` → Docker 이미지 `/app/build`
- Nginx가 80 포트로 정적 파일 서빙

---

## 📄 각 프로젝트 상세 문서

| 프로젝트             | 한국어                                      | 영어                                              |
| -------------------- | ------------------------------------------- | ------------------------------------------------- |
| `front-user-cmm`     | [README.md](./front-user-cmm/README.md)     | [README_EN.md](./front-user-cmm/README_EN.md)     |
| `front-admin-cmm`    | [README.md](./front-admin-cmm/README.md)    | [README_EN.md](./front-admin-cmm/README_EN.md)    |
| `front-user-cmm-tsp` | [README.md](./front-user-cmm-tsp/README.md) | [README_EN.md](./front-user-cmm-tsp/README_EN.md) |
| `front-admin-tsp`    | [README.md](./front-admin-tsp/README.md)    | [README_EN.md](./front-admin-tsp/README_EN.md)    |

---

> 이 저장소는 AICA 플랫폼 내부용 프론트엔드 프로젝트 모음입니다.

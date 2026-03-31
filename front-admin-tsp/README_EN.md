# front-admin-tsp — AI TSP Admin Frontend

## ⚠️ This project is an internal admin system for the AICA Platform.

> A **monorepo dedicated to the TSP (Technology Support Portal) Admin** of the AICA Platform.  
> Shares the same monorepo structure as `front-admin-cmm`, specialized for TSP administration.

---

## 📌 Project Overview

| Item             | Details                              |
| ---------------- | ------------------------------------ |
| Package Name     | `ai-common-admin`                    |
| Version          | `0.0.0`                              |
| Monorepo Tool    | Lerna + Yarn Workspaces              |
| Language         | TypeScript                           |
| Framework        | React 17 (CRACO-based)               |
| Styling          | MUI v5 + Emotion + SCSS              |
| State Management | Zustand + React Query + SWR          |
| Routing          | React Router DOM v6 (Dynamic Router) |
| Deployment       | Docker + Nginx                       |

---

## 📁 Package Structure (Yarn Workspace)

```
front-admin-tsp/
├── Dockerfile                  # Docker build config (nginx-based, serves tsp/build)
├── nginx.conf                  # Nginx configuration
├── lerna.json                  # Lerna monorepo settings
├── craco.config.js             # Shared CRACO configuration
├── tsconfig.json               # Shared TypeScript configuration
└── packages/
    ├── shared/                 # Shared component & utility library
    │   ├── .storybook/         # Storybook configuration
    │   └── src/
    │       ├── DynamicRouter.tsx   # API-driven dynamic menu router
    │       ├── ErrorBoundary.tsx
    │       ├── Store/              # Zustand global state
    │       ├── api/                # Axios shared API setup
    │       ├── authentication/     # JWT token management
    │       ├── components/         # Shared UI components
    │       ├── fetches/            # SWR / React-Query API integration
    │       ├── layout/             # Layouts (adminLayout)
    │       ├── libs/               # Library configuration
    │       ├── stories/            # Storybook stories
    │       ├── styles/             # Global SCSS styles
    │       ├── theme/              # MUI theme configuration
    │       └── utils/              # Shared utility functions
    │
    ├── tsp/                    # TSP Admin app — served at /tsp_admin
    │   └── src/
    │       ├── App.tsx             # Entry point (portalType: PORTAL_TAM)
    │       ├── Routes/             # Route definitions
    │       ├── pages/
    │       │   ├── Dashboard/      # Dashboard (statistics, overview)
    │       │   ├── EquipmentMgt/   # Equipment management
    │       │   ├── Operation/      # Operations management
    │       │   ├── Sign/           # Login / Logout
    │       │   └── UseMgt/         # User management
    │       ├── service/            # Service layer
    │       ├── store/              # Zustand local state
    │       ├── styles/             # TSP-specific styles
    │       └── utils/              # TSP utility functions
    │
    └── usp/                    # USP Admin app (shared baseline)
        └── src/
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
            └── ...
```

---

## 🛠 Tech Stack

### Core

- **React** `^17.0.2` + **TypeScript** `^4.4.2`
- **CRACO** `^6.4.3` — CRA customization
- **Lerna** `^4.0.0` + **Yarn Workspaces** — Monorepo management

### UI / Design

- **@mui/material** `^5.5.2` + **@mui/x-data-grid-pro** + **@mui/x-date-pickers-pro**
- **@emotion/react** + **@emotion/styled** — MUI styling engine
- **sass** `^1.49.9` — SCSS compilation
- **polished** `^4.1.4` — CSS-in-JS utilities

### State Management & Data Fetching

- **Zustand** `^4.0.0-rc.1` — Global client state
- **React Query** `^3.38.0` — Server state caching
- **SWR** `^1.2.2` — Data fetching & revalidation
- **Axios** `^0.26.1` — HTTP client

### Routing & Authentication

- **react-router-dom** `^6.2.2` + Dynamic Router (API-driven menu)
- **JWT Authentication** via `shared/authentication`

### Social Login (TSP)

- **react-google-login** / **react-kakao-login** / **react-naver-login**

### Other

- **chart.js** + **@nivo** — Data visualization
- **swiper** / **dayjs** / **ramda** — Utilities
- **Storybook** `^6.4.19` — Component documentation

---

## 🌐 Portal Types

| Package | Portal Type  | Base Path    | Description |
| ------- | ------------ | ------------ | ----------- |
| `tsp`   | `PORTAL_TAM` | `/tsp_admin` | TSP Admin   |
| `usp`   | `PORTAL_UAM` | `/`          | USP Admin   |

---

## 🚀 Getting Started

### Installation

```bash
yarn install
```

### Development Server

```bash
# TSP Admin (Mac)
yarn tsp start:dev

# TSP Admin (Windows)
yarn tsp winStart

# Storybook
yarn storybook
```

### Build

```bash
yarn tsp build
yarn usp build
```

### Run Modes

| Script        | Environment                        |
| ------------- | ---------------------------------- |
| `start:dev`   | Development (`REACT_APP_MODE=dev`) |
| `start:stage` | Staging (`REACT_APP_MODE=stage`)   |
| `start`       | Production (`REACT_APP_MODE=prod`) |

---

## 🐳 Docker Deployment

```bash
docker build -t front-admin-tsp .
docker run -p 80:80 front-admin-tsp
```

> `packages/tsp/build` is copied to `/app/build` and served by Nginx on port 80.

---

## ⚙️ Environment Configuration

```bash
# Add to /etc/hosts
127.0.0.1 pc.bnet.com
```

```javascript
// craco.config.js
devServer: { host: 'pc.bnet.com', port: 5500 }
```

---

> ⚠️ This project is an internal TSP admin system for the AICA Platform.

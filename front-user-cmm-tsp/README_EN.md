# front-user-cmm-tsp — AI TSP User Frontend

> ⚠️ This project is an internal TSP user portal for the AICA Platform.
> A **monorepo dedicated to the TSP (Technology Support Portal) User Portal** of the AICA Platform.  
> Shares the same monorepo structure as `front-user-cmm`, specialized for TSP user-facing features.  
> Includes a local development `server` package and full PC / mobile responsive support.

---

## 📌 Project Overview

| Item             | Details                              |
| ---------------- | ------------------------------------ |
| Package Name     | `ai-common-front`                    |
| Version          | `0.0.0`                              |
| Monorepo Tool    | Lerna + Yarn Workspaces              |
| Language         | TypeScript                           |
| Framework        | React 17 (CRACO-based)               |
| Styling          | MUI v5 + Emotion + SCSS              |
| State Management | Zustand + React Query + SWR          |
| Routing          | React Router DOM v6 (Dynamic Router) |
| Responsive       | PC / Mobile dynamic detection        |
| Deployment       | Docker + Nginx                       |

---

## 📁 Package Structure (Yarn Workspace)

```
front-user-cmm-tsp/
├── Dockerfile                  # Docker build config (nginx-based)
├── nginx.conf                  # Nginx configuration
├── lerna.json                  # Lerna monorepo settings
├── craco.config.js             # Shared CRACO configuration
├── tsconfig.json               # Shared TypeScript configuration
└── packages/
    ├── server/                 # Local development server package
    │
    ├── shared/                 # Shared component & utility library
    │   ├── .storybook/         # Storybook configuration
    │   └── src/
    │       ├── DynamicRouter.tsx           # API-driven dynamic router
    │       ├── ErrorBoundary.tsx
    │       ├── store/
    │       │   ├── RouteConfigStore.ts     # Route configuration store
    │       │   └── GlobalConfigStore.ts    # Global config store (device, screen mode)
    │       ├── api/                        # Axios shared API setup
    │       ├── authentication/             # JWT token management
    │       ├── components/
    │       │   └── GlobalModals.tsx        # Global modal management
    │       ├── fetches/                    # SWR / React-Query API integration
    │       ├── layout/                     # Layouts (basic, etc.)
    │       ├── libs/                       # Library configuration
    │       ├── stories/                    # Storybook stories
    │       ├── styles/                     # Global SCSS styles
    │       ├── theme/                      # MUI theme configuration
    │       └── utils/                      # Shared utility functions
    │
    ├── tsp/                    # TSP User Portal app (primary)
    │   └── src/
    │       ├── App.tsx             # Entry point (portalType: PORTAL_TSP, layout: basic)
    │       ├── routes/             # Route definitions
    │       ├── pages/
    │       │   ├── About/              # Service / organization introduction
    │       │   ├── Apply/              # Service application flow
    │       │   ├── ApplyResource/      # Resource & facility application
    │       │   ├── Home/               # Home
    │       │   ├── Info/               # Information & notices
    │       │   ├── Mypage/             # My page
    │       │   ├── Sign/               # Login / Sign up / Sign out
    │       │   └── Temp/               # Development / temp pages
    │       ├── service/            # Service layer
    │       ├── store/              # Zustand local state
    │       ├── styles/             # TSP-specific styles
    │       └── utils/              # TSP utility functions
    │
    └── usp/                    # USP User Portal app (shared baseline)
        └── src/
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
            └── ...
```

---

## 🛠 Tech Stack

### Core

- **React** `^17.0.2` + **TypeScript** `^4.4.2`
- **CRACO** `^6.4.3` — CRA customization
- **Lerna** `^4.0.0` + **Yarn Workspaces** — Monorepo management

### UI / Design

- **@mui/material** `^5.5.2` + **@mui/x-data-grid-pro** + **@mui/x-date-pickers**
- **@emotion/react** + **@emotion/styled** — MUI styling engine
- **sass** `^1.49.9` — SCSS compilation
- **swiper** `6.8.4` — Sliders / carousels
- **polished** `^4.1.4` — CSS-in-JS utilities

### State Management & Data Fetching

- **Zustand** `^4.0.0-rc.1` — Global state (`RouteConfigStore`, `GlobalConfigStore`)
- **React Query** `^3.38.0` — Server state caching
- **SWR** `^1.2.2` — Data fetching & revalidation
- **Axios** `^0.26.1` — HTTP client

### Routing & Authentication

- **react-router-dom** `^6.2.2` — SPA routing
- **Dynamic Router** — API-driven route generation (`PORTAL_TSP`)
- **JWT Authentication** via `shared/authentication`
- **react-cookie** + **js-cookie** — Cookie-based token management

### Responsive / Device Handling

- **GlobalConfigStore** — Dynamically tracks device type (`mobile`/`pc`) and screen mode
- `window.resize` listener + `isMobileDevice()` utility function

### Other Libraries

- **react-daum-postcode** — Korean postal code lookup
- **react-player** — Video player
- **xlsx** — Excel processing
- **chart.js** + **@nivo** — Data visualization
- **dayjs** / **ramda** — Date & functional utilities
- **Storybook** `^6.4.19` — Component documentation

---

## 🌐 Portal Types

| Package | Portal Type  | Base Path  | Description                     |
| ------- | ------------ | ---------- | ------------------------------- |
| `tsp`   | `PORTAL_TSP` | `/`        | TSP User Portal (primary focus) |
| `usp`   | `PORTAL_UAM` | `/biz/...` | USP User Portal                 |

---

## 📄 TSP User Portal — Key Pages

| Page            | Description                         |
| --------------- | ----------------------------------- |
| `Home`          | Main home                           |
| `About`         | Service & organization introduction |
| `Apply`         | Service application flow            |
| `ApplyResource` | Resource & facility application     |
| `Info`          | Information & notices               |
| `Mypage`        | My account & profile                |
| `Sign`          | Login / Sign up / Sign out          |

---

## 🚀 Getting Started

### Installation

```bash
yarn install
```

### Development Server

```bash
# TSP User Portal (Mac)
yarn tsp start:dev

# TSP User Portal (Windows)
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
docker build -t front-user-cmm-tsp .
docker run -p 80:80 front-user-cmm-tsp
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

> ⚠️ This project is an internal TSP user portal for the AICA Platform.

# front-user-cmm — AI Common User Frontend

> This project is a user portal system for the AICA platform.
> A **monorepo for the AICA Platform User portals**, combining the TSP (Technology Support Portal) and USP (User Support Portal) user-facing applications.  
> Includes a local development `server` package and full PC / mobile responsive support.

---

## 📌 Project Overview

| Item             | Details                                          |
| ---------------- | ------------------------------------------------ |
| Package Name     | `ai-common-front`                                |
| Version          | `0.0.0`                                          |
| Monorepo Tool    | Lerna + Yarn Workspaces                          |
| Language         | TypeScript                                       |
| Framework        | React 17 (CRACO-based)                           |
| Styling          | MUI v5 + Emotion + SCSS                          |
| State Management | Zustand + React Query + SWR                      |
| Routing          | React Router DOM v6 (Dynamic Router)             |
| Responsive       | PC / Mobile dynamic detection (`isMobileDevice`) |
| Deployment       | Docker + Nginx                                   |

---

## 📁 Package Structure (Yarn Workspace)

```
front-user-cmm/
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
    ├── tsp/                    # TSP User Portal app
    │   └── src/
    │       ├── App.tsx             # Entry point (portalType: PORTAL_TSP, layout: basic)
    │       ├── routes/             # Route definitions
    │       ├── pages/
    │       │   ├── About/              # Service / organization introduction
    │       │   ├── Apply/              # Service application
    │       │   ├── ApplyResource/      # Application resources & facilities
    │       │   ├── Home/               # Home
    │       │   ├── Info/               # Information & notices
    │       │   ├── Mypage/             # My page
    │       │   ├── Sign/               # Login / Sign up / Sign out
    │       │   └── Temp/               # Development/temp pages
    │       ├── service/            # Service layer
    │       ├── store/              # Zustand local state
    │       ├── styles/             # TSP-specific styles
    │       └── utils/              # TSP utility functions
    │
    └── usp/                    # USP User Portal app
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
            │   ├── Board/                  # Board
            │   ├── BusFacility/            # Business facility information
            │   ├── Community/              # Community
            │   ├── EquipmentClassify/      # Equipment classification guide
            │   ├── EventNews/              # Events & news
            │   ├── Factor/                 # Password verification
            │   ├── Home/                   # Home
            │   ├── MyPage/                 # My page
            │   ├── Notice/                 # Notices
            │   ├── ParticipationEvent/     # Participation events
            │   ├── ServiceIntroduction/    # Service introduction
            │   ├── SignIn / SignOut / SignUp/ # Authentication
            │   ├── SnsNaverCallback/       # Naver SNS login callback
            │   ├── SupportForUse/          # Usage support
            │   └── biz/                    # Business-related pages
            ├── service/
            ├── store/
            └── styles/
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
- **Dynamic Router** — API-driven route generation (`PORTAL_TSP` / `PORTAL_UAM`)
- **JWT Authentication** via `shared/authentication`
- **react-cookie** + **js-cookie** — Cookie-based token management

### Responsive / Device Handling

- **GlobalConfigStore** — Dynamically tracks device type (`mobile`/`pc`) and screen mode
- `window.resize` listener + `isMobileDevice()` utility

### Other Libraries

- **react-daum-postcode** — Korean postal code lookup
- **react-player** `^2.10.1` — Video player
- **xlsx** `^0.18.5` — Excel processing
- **chart.js** + **@nivo** — Data visualization
- **dayjs** / **ramda** — Date & functional utilities
- **Storybook** `^6.4.19` — Component documentation

---

## 🌐 Portal Types

| Package | Portal Type  | Base Path  | Description     |
| ------- | ------------ | ---------- | --------------- |
| `tsp`   | `PORTAL_TSP` | `/`        | TSP User Portal |
| `usp`   | `PORTAL_UAM` | `/biz/...` | USP User Portal |

---

## 📄 TSP User Portal — Key Pages

| Page            | Description                         |
| --------------- | ----------------------------------- |
| `Home`          | Main home                           |
| `About`         | Service & organization introduction |
| `Apply`         | Service application flow            |
| `ApplyResource` | Resource & facility application     |
| `Info`          | Notices & information               |
| `Mypage`        | My account & profile                |
| `Sign`          | Login / Sign up / Sign out          |

## 📄 USP User Portal — Key Pages

| Page                    | Description                   |
| ----------------------- | ----------------------------- |
| `Home`                  | Main home                     |
| `ServiceIntroduction`   | Service introduction          |
| `BusFacility`           | Business facility information |
| `EquipmentClassify`     | Equipment classification      |
| `Community`             | Community                     |
| `EventNews`             | Events & news                 |
| `ParticipationEvent`    | Participation events          |
| `SupportForUse`         | Usage support                 |
| `Notice`                | Notices                       |
| `Board`                 | Board                         |
| `MyPage`                | My account & profile          |
| `SignIn/SignUp/SignOut` | Authentication                |
| `SnsNaverCallback`      | Naver OAuth callback          |

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
docker build -t front-user-cmm .
docker run -p 80:80 front-user-cmm
```

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

> ⚠️ This project is an internal user portal for the AICA Platform.

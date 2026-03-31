# front-admin-cmm — AI Common Admin Frontend

## ⚠️ This project is an internal admin system for the AICA Platform.

> A **monorepo for the AICA Platform Admin portals**, combining the TSP (Technology Support Portal) Admin and USP (User Support Portal) Admin into a single repository.

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
front-admin-cmm/
├── Dockerfile                  # Docker build config (nginx-based, serves tsp/build)
├── nginx.conf                  # Nginx configuration
├── lerna.json                  # Lerna monorepo settings
├── craco.config.js             # Shared CRACO configuration
├── tsconfig.json               # Shared TypeScript configuration
└── packages/
    ├── shared/                 # Shared component & utility library
    │   ├── .storybook/         # Storybook configuration
    │   └── src/
    │       ├── App.tsx
    │       ├── DynamicRouter.tsx   # API-driven dynamic menu router
    │       ├── ErrorBoundary.tsx
    │       ├── Store/              # Zustand global state
    │       ├── api/                # Axios shared API setup
    │       ├── authentication/     # JWT token management
    │       ├── components/         # Shared UI components
    │       ├── fetches/            # SWR / React-Query API integration
    │       ├── layout/             # Layouts (adminLayout, etc.)
    │       ├── libs/               # Library configuration (Axios, etc.)
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
    │       │   ├── Dashboard/      # Dashboard
    │       │   ├── EquipmentMgt/   # Equipment management
    │       │   ├── Operation/      # Operations management
    │       │   ├── Sign/           # Login / Logout
    │       │   └── UseMgt/         # User management
    │       ├── service/            # Service layer
    │       ├── store/              # Zustand local state
    │       ├── styles/             # TSP-specific styles
    │       └── utils/              # TSP utility functions
    │
    └── usp/                    # USP Admin app
        └── src/
            ├── App.tsx             # Entry point (portalType: PORTAL_UAM)
            ├── DynamicRouter.tsx   # Dynamic router (API-driven menu)
            ├── Routes/             # Route definitions
            ├── api/                # API integration
            ├── components/         # USP-specific components
            ├── fetches/            # API fetching
            ├── layout/             # Layout components
            ├── models/             # Type / model definitions
            ├── pages/
            │   ├── AnnouncementReception/  # Announcement reception
            │   ├── Board/                  # Board
            │   ├── BusInformationMgt/      # Business information management
            │   ├── Convention/             # Convention management
            │   ├── EducationMgt/           # Education management
            │   ├── EvalSelection/          # Evaluation & selection
            │   ├── Home/                   # Home
            │   ├── Mypage/                 # My page
            │   ├── OperationMgt/           # Operations management
            │   ├── PerformanceMgt/         # Performance management
            │   ├── ResAllMgt/              # All resident management
            │   ├── ResidentFacilityMgt/    # Resident facility management
            │   ├── SignIn / SignOut / SignUp/ # Authentication
            │   ├── SystemMgt/              # System management
            │   └── TaskMgt/                # Task management
            ├── service/            # Service layer
            ├── store/              # Zustand local state
            └── styles/             # USP-specific styles
```

---

## 🛠 Tech Stack

### Core

- **React** `^17.0.2` + **TypeScript** `^4.4.2`
- **CRACO** `^6.4.3` — CRA configuration customization
- **Lerna** `^4.0.0` + **Yarn Workspaces** — Monorepo management

### UI / Design

- **@mui/material** `^5.5.2` — Material UI
- **@mui/x-data-grid-pro** — Pro data grid (license required)
- **@mui/x-date-pickers-pro** — Date pickers
- **@emotion/react** + **@emotion/styled** — MUI styling engine
- **sass** `^1.49.9` — SCSS compilation
- **polished** `^4.1.4` — CSS-in-JS utilities

### State Management & Data Fetching

- **Zustand** `^4.0.0-rc.1` — Global client state
- **React Query** `^3.38.0` — Server state caching
- **SWR** `^1.2.2` — Data fetching & revalidation
- **Axios** `^0.26.1` — HTTP client

### Routing & Authentication

- **react-router-dom** `^6.2.2` — SPA routing
- **Dynamic Router** — Server API-driven dynamic routing
- **JWT Authentication** — `shared/authentication` module
- **react-cookie** + **js-cookie** — Cookie-based token management

### Social Login (TSP)

- **react-google-login** `^5.2.2`
- **react-kakao-login** `^2.1.0`
- **react-naver-login** `^0.1.4`

### Other Libraries

- **chart.js** `^3.7.1` — Charts
- **@nivo/bar**, **@nivo/line**, **@nivo/pie** — Nivo charts (USP)
- **swiper** `6.8.4` — Sliders
- **dayjs** `^1.11.0` — Date utilities
- **ramda** `^0.28.0` — Functional utility library
- **react-daum-postcode** — Korean postal code lookup (USP)
- **react-player** `^2.10.1` — Video player (USP)
- **xlsx** `^0.18.5` — Excel processing (USP)

### Development & Testing

- **Storybook** `^6.4.19` — Component development & documentation
- **ESLint** + **Prettier** — Code quality

---

## 🌐 Portal Types

| Package | Portal Type  | Base Path    | Description                           |
| ------- | ------------ | ------------ | ------------------------------------- |
| `tsp`   | `PORTAL_TAM` | `/tsp_admin` | TSP (Technology Support Portal) Admin |
| `usp`   | `PORTAL_UAM` | `/`          | USP (User Support Portal) Admin       |

---

## 🗺 Dynamic Router

Routes are dynamically generated from the server menu API: `/member/api/auth/menus/{portalType}/me`

```
API call → flat menu list → hierarchy transform → React Router routes
```

- Protected routes: `middleware(['auth'])` applied → redirects to login if no token
- Layouts: `studio` (authenticated dashboard), `space` (login / public pages)

---

## 🔐 JWT Authentication

```typescript
import authentication from 'shared/authentication';

authentication.set(tokenData); // Save token
authentication.get(); // Get full auth info
authentication.get('accessToken'); // Get specific token
authentication.remove(); // Remove token
```

---

## ⚙️ Environment Configuration

The dev server is configured via `craco.config.js`:

```javascript
module.exports = {
  devServer: {
    host: 'pc.bnet.com',
    port: 5500,
  },
};
```

> Add `127.0.0.1 pc.bnet.com` to `/etc/hosts` before starting.

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

# Storybook (shared components)
yarn storybook
```

### Build

```bash
# Build TSP
yarn tsp build

# Build USP
yarn usp build
```

### Run Modes

| Script        | Description                        |
| ------------- | ---------------------------------- |
| `start:dev`   | Development (`REACT_APP_MODE=dev`) |
| `start:stage` | Staging (`REACT_APP_MODE=stage`)   |
| `start`       | Production (`REACT_APP_MODE=prod`) |

---

## 🐳 Docker Deployment

```bash
docker build -t front-admin-cmm .
docker run -p 80:80 front-admin-cmm
```

- `packages/tsp/build` → copied to `/app/build` inside the Docker image
- Nginx serves static files on port 80

---

## 📂 Key Reference Files

| File                                       | Description                 |
| ------------------------------------------ | --------------------------- |
| `packages/shared/src/DynamicRouter.tsx`    | Core dynamic routing logic  |
| `packages/usp/src/layout/Studio/Header/`   | Header & navigation         |
| `packages/usp/src/pages/Board/Board.tsx`   | Board sample implementation |
| `packages/usp/src/pages/SignIn/Factor.tsx` | Password verification       |
| `packages/shared/src/authentication/`      | JWT authentication module   |

---

> ⚠️ This project is an internal admin system for the AICA Platform.

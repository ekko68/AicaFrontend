# AicaFrontend — AICA Platform Frontend Monorepo Group

> The **complete collection of frontend projects** for the AICA Platform.  
> Composed of 4 independent monorepos, organized into two service groups.  
> ⚠️ This repository is an internal frontend project collection for the AICA Platform.

---

## 🗂 Project Group Structure

```
AicaFrontend/
├── front-user-cmm/         # [Group A] Common User Portal (TSP + USP)
├── front-admin-cmm/        # [Group A] Common Admin Portal (TSP Admin + USP Admin)
├── front-user-cmm-tsp/     # [Group B] TSP-Dedicated User Portal
└── front-admin-tsp/        # [Group B] TSP-Dedicated Admin Portal
```

---

## 🔵 Group A — CMM (Common) Integrated Platform

> An integrated project that **manages both the TSP (Technology Support Portal) and USP (User Support Portal) within a single monorepo**.

```
┌─────────────────────────────────────────────────┐
│           Group A — CMM Common Platform          │
│                                                 │
│  front-user-cmm          front-admin-cmm        │
│  (User Portal)           (Admin Portal)         │
│  ┌──────────────┐        ┌──────────────┐       │
│  │ packages/    │        │ packages/    │       │
│  │  ├ shared    │        │  ├ shared    │       │
│  │  ├ tsp (USR) │        │  ├ tsp (ADM) │       │
│  │  ├ usp (USR) │        │  ├ usp (ADM) │       │
│  │  └ server    │        └──────────────┘       │
│  └──────────────┘                               │
└─────────────────────────────────────────────────┘
```

| Project             | Role                                    | Package Name      | Portal Types               |
| ------------------- | --------------------------------------- | ----------------- | -------------------------- |
| `front-user-cmm`    | **User** integrated portal (TSP + USP)  | `ai-common-front` | `PORTAL_TSP`, `PORTAL_UAM` |
| `front-admin-cmm`   | **Admin** integrated portal (TSP + USP) | `ai-common-admin` | `PORTAL_TAM`, `PORTAL_UAM` |

### Key Characteristics

- The `shared` package provides **shared** components, utilities, and authentication modules across TSP and USP
- Both portals (TSP + USP) can be developed and deployed from a **single repository**
- `front-user-cmm` includes a local development `server` package
- The USP Admin (`front-admin-cmm`) contains 20+ full-featured management pages  
  (SystemMgt, EvalSelection, ResidentFacilityMgt, TaskMgt, etc.)

---

## 🟢 Group B — TSP (Technology Support Portal) Dedicated Platform

> A **standalone project specialized for the TSP** service only.  
> Shares the same monorepo structure as Group A but focuses exclusively on TSP functionality.

```
┌─────────────────────────────────────────────────┐
│           Group B — TSP Dedicated Platform       │
│                                                 │
│  front-user-cmm-tsp      front-admin-tsp        │
│  (User Portal)           (Admin Portal)         │
│  ┌──────────────┐        ┌──────────────┐       │
│  │ packages/    │        │ packages/    │       │
│  │  ├ shared    │        │  ├ shared    │       │
│  │  ├ tsp (USR) │        │  ├ tsp (ADM) │       │
│  │  ├ usp       │        │  └ usp       │       │
│  │  └ server    │        └──────────────┘       │
│  └──────────────┘                               │
└─────────────────────────────────────────────────┘
```

| Project              | Role                         | Package Name      | Portal Types |
| -------------------- | ---------------------------- | ----------------- | ------------ |
| `front-user-cmm-tsp` | TSP **User** dedicated portal  | `ai-common-front` | `PORTAL_TSP` |
| `front-admin-tsp`    | TSP **Admin** dedicated portal | `ai-common-admin` | `PORTAL_TAM` |

### Key Characteristics

- A **lightweight, TSP-specialized** version designed for standalone TSP deployment
- User portal focused on: Home / About / Apply / ApplyResource / Info / Mypage / Sign
- Admin portal focused on: Dashboard / EquipmentMgt / Operation / UseMgt

---

## 🔄 Group Relationship Diagram

```
                        AICA Platform
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
     [Group A] CMM                        [Group B] TSP
  Common (TSP + USP) Platform           TSP-Only Platform
          │                                     │
    ┌─────┴─────┐                         ┌─────┴─────┐
    │           │                         │           │
front-user-cmm front-admin-cmm  front-user-cmm-tsp front-admin-tsp
  User Portal   Admin Portal        User Portal     Admin Portal
 (TSP + USP)  (TSP + USP)          (TSP only)      (TSP only)
```

---

## 📦 Shared Tech Stack

All 4 projects share the same technical foundation.

| Category             | Technology                                       |
| -------------------- | ------------------------------------------------ |
| **Language**         | TypeScript                                       |
| **Framework**        | React 17 + CRACO                                 |
| **Monorepo**         | Lerna + Yarn Workspaces                          |
| **UI**               | Material UI v5 + Emotion + SCSS                  |
| **State Management** | Zustand + React Query + SWR                      |
| **Routing**          | React Router DOM v6 + Dynamic Router (API-based) |
| **HTTP**             | Axios                                            |
| **Authentication**   | JWT (`shared/authentication`)                    |
| **Deployment**       | Docker + Nginx                                   |
| **Code Quality**     | ESLint + Prettier                                |
| **Component Docs**   | Storybook                                        |

---

## 🗺 Shared Dynamic Router Architecture

All projects share the same pattern of **dynamically generating routes from the server menu API**.

```
Server API (/member/api/auth/menus/{portalType}/me)
        │
        ▼
Receive flat menu list
        │
        ▼
Transform into hierarchy (tree)
        │
        ▼
Generate React Router v6 dynamic routes
        │
  ┌─────┴──────────────────────────────┐
  │  middleware(['auth']) applied       │
  │  Layout branching (studio / space) │
  └────────────────────────────────────┘
```

---

## 🚀 Quick Start Summary

| Project              | Install          | Dev Server           | Build            |
| -------------------- | ---------------- | -------------------- | ---------------- |
| `front-user-cmm`     | `yarn install`   | `yarn tsp start:dev` | `yarn tsp build` |
| `front-admin-cmm`    | `yarn install`   | `yarn tsp start:dev` | `yarn tsp build` |
| `front-user-cmm-tsp` | `yarn install`   | `yarn tsp start:dev` | `yarn tsp build` |
| `front-admin-tsp`    | `yarn install`   | `yarn tsp start:dev` | `yarn tsp build` |

> Before starting the dev server, add `127.0.0.1 pc.bnet.com` to `/etc/hosts`.

---

## 🐳 Docker Deployment Summary

```bash
# Run from each project root
docker build -t <project-name> .
docker run -p 80:80 <project-name>
```

- Build output: `packages/tsp/build` → copied to `/app/build` inside the Docker image
- Nginx serves static files on port 80

---

## 📄 Individual Project Documentation

| Project              | Korean                                        | English                                             |
| -------------------- | --------------------------------------------- | --------------------------------------------------- |
| `front-user-cmm`     | [README.md](./front-user-cmm/README.md)       | [README_EN.md](./front-user-cmm/README_EN.md)       |
| `front-admin-cmm`    | [README.md](./front-admin-cmm/README.md)      | [README_EN.md](./front-admin-cmm/README_EN.md)      |
| `front-user-cmm-tsp` | [README.md](./front-user-cmm-tsp/README.md)   | [README_EN.md](./front-user-cmm-tsp/README_EN.md)   |
| `front-admin-tsp`    | [README.md](./front-admin-tsp/README.md)      | [README_EN.md](./front-admin-tsp/README_EN.md)      |

---

> ⚠️ This repository is an internal frontend project collection for the AICA Platform.

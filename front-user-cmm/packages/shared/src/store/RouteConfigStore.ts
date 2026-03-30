import create from "zustand";
import {LayoutType} from "../layout";
import {RouteData} from "../utils/RouteUtiles";

interface State{
  routes: RouteData[]
  memberServerUrl: string
  layout: LayoutType
  defaultLayout: LayoutType
  middleware: string[]

  setRoutes: (routes: RouteData[]) => void
  setMemberServer: (memberServer: string) => void
  setLayout: (layout: LayoutType) => void
  setDefaultLayout: (layout: LayoutType) => void
  setMiddleware: (middleware: string[]) => void
}

export const useRouteStore = create<State>( set => ({
  routes: [],
  memberServerUrl: `${process.env.REACT_APP_DOMAIN_MEMBER_DEV}`,
  layout: "studio",
  defaultLayout: "studio",
  middleware: [],

  setRoutes: (routes: RouteData[]) => {
    set(state => ({
      routes: routes
    }))
  },
  setMemberServer: (memberServer: string) => {
    set(state => ({
      memberServerUrl: memberServer
    }))
  },
  setLayout: (layout: LayoutType) => {
    set(state => ({
      layout: layout
    }))
  },
  setDefaultLayout: (layout: LayoutType) => {
    set(state => ({
      defaultLayout: layout
    }))
  },
  setMiddleware: (middleware: string[]) => {
    set(state => ({
      middleware: middleware
    }))
  },
}))
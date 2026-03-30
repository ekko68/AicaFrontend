import create from "zustand";
import {LayoutType} from "../layout";
import {RouteData} from "../utils/RouteUtiles";

interface State{
  memberServerUrl: string
  layout: LayoutType
  defaultLayout: LayoutType
  middleware: string[]

  setMemberServer: (url: string) => void
  setLayout: (layout: LayoutType) => void
  setDefaultLayout: (layout: LayoutType) => void
  setMiddleware: (middleware: string[]) => void
}

export const useRouteStore = create<State>( set => ({
  memberServerUrl: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}`,
  layout: "studio",
  defaultLayout: "studio",
  middleware: [],

  setMemberServer: (url: string) => {
    set(state => ({
      memberServerUrl: url
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
import React from "react";
import {Loader, middleware, RouteType} from "shared/utils/RouteUtiles";

export const SignRoutes: RouteType[] = [
  {
    path: '/tsp/signin',
    label: '로그인',
    element: (
      <Loader
        route={{
          label: 'signin',
          layout: 'empty',
          element: React.lazy(() => import('~/pages/Sign/SignIn')),
        }}
      />
    ),
  },{
    path: '/tsp/signout',
    label: '로그아웃',
    element: (
      <Loader
        route={{
          label: 'signout',
          layout: 'empty',
          element: React.lazy(() => import('~/pages/Sign/SignOut')),
        }}
      />
    ),
  },{
    path: 'signup',
    label: '회원가입',
    element: (
      <Loader
        route={{
          label: 'signup',
          layout: 'empty',
          element: React.lazy(() => import('~/pages/Sign/SignUp')),
        }}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
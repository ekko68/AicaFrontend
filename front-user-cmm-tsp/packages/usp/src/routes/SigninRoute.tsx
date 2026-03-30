import React from 'react';
import { Loader } from '~/DynamicRouter';
import { MiddlewareType, RouteType } from '~/models/RouteType';

// 로그인 라우터
export const SigninRoute: RouteType[] = [
  {
    path: 'signin',
    children: [
      {
        index: true,
        element: (
          <Loader
            route={{
              label: 'signin',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn')),
            }}
          />
        ),
      },
      {
        path: 'dormancyPass',
        label: '비밀번호 변경 안내',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/dormancy/DormancyPass')),
            }}
          />
        ),
      },
      {
        path: 'idtrouver',
        label: '아이디 찾기',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/IdTrouver')),
            }}
          />
        ),
      },
      {
        path: 'IdTrouverFind',
        label: '아이디 확인',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/IdTrouverFind')),
            }}
          />
        ),
      },
      {
        path: 'signout',
        label: '로그아웃',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignOut')),
            }}
          />
        ),
      },
      {
        path: 'factorfind',
        label: '비밀번호 확인 (본인인증)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/FactorFind')),
            }}
          />
        ),
      },
      {
        path: 'factorreset',
        label: '비밀번호 확인 (재설정)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/FactorReset')),
            }}
          />
        ),
      },
      {
        path: 'Factor',
        label: '비밀번호 재설정',
        element: (
          <Loader
            route={{
              label: 'space',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/Factor')),
            }}
          />
        ),
      },
      {
        path: 'snsNaverCallback',
        label: '컴포넌트 샘플',
        element: (
          <Loader
            route={{
              label: 'sns-login',
              layout: 'space',
              element: React.lazy(() => import('~/pages/SnsNaverCallback')),
            }}
          />
        ),
      },
      {
        path: 'snsNaverConfigCallback',
        label: '네이버 로그인 설정 콜백',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'space',
              element: React.lazy(() => import('~/pages/SnsNaverCallback/SnsNaverConfigCallback')),
            }}
          />
        ),
      },
    ],
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
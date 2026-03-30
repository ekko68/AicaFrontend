import React from "react";
import {RouteType} from "~/DynamicRouter";
import {Loader, middleware} from "shared/utils/RouteUtiles";
import Temp from "~/pages/Temp/Temp";

export const UtilityRoutes: RouteType[] = [
  {
    path: 'signup',
    label: '회원가입',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp')),
        }}
      />
    ),
  },
  {
    path: 'consumer',
    label: '약관동의(개인)',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/Consumer')),
        }}
      />
    ),
  },
  {
    path: 'consumerform',
    label: '회원가입정보입력(개인)',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/ConsumerForm')),
        }}
      />
    ),
  },
  {
    path: 'producer',
    label: '약관동의(사업자)',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/Producer')),
        }}
      />
    ),
  },
  {
    path: 'producerform',
    label: '회원가입정보입력(개인)',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/ProducerForm')),
        }}
      />
    ),
  },
  {
    path: 'confirm',
    label: '보호자인증화면',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/Confirm')),
        }}
      />
    ),
  },
  {
    path: 'exist',
    label: '기 가입 안내 (사업자)',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/Exist')),
        }}
      />
    ),
  },
  {
    path: 'complete',
    label: '가입완료',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignUp/Complete')),
        }}
      />
    ),
  },
  {
    path: 'signin',
    label: '로그인',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'space',
          element: React.lazy(() => import('~/pages/SignIn')),
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
          layout: 'space',
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
          layout: 'space',
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
          layout: 'space',
          element: React.lazy(() => import('~/pages/SignOut')),
        }}
      />
    ),
  },
  {
    path: 'factor',
    label: '비밀번호 재설정',
    element: (
      <Loader
        route={
          {
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/SignIn/Factor')),
          }
        }
      />
    ),
  },
  {
    path: 'factorfind',
    label: '비밀번호 확인 (본인인증)',
    element: (
      <Loader
        route={middleware(
          {
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/SignIn/FactorFind')),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: 'factorreset',
    label: '비밀번호 확인 (재설정)',
    element: (
      <Loader
        route={middleware(
          {
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/SignIn/FactorReset')),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: 'composampl',
    label: '컴포넌트 샘플',
    element: (
      <Loader
        route={{
          label: 'sample',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/Composampl')),
        }}
      />
    ),
  },
  {
    path: 'Temp/SampleView',
    label: 'data table temp',
    element: (
      <Loader
        route={{
          label: 'sample',
          layout: 'empty',
          element: React.lazy(() => import('~/pages/Temp/Temp')),
        }}
      />
    ),
  },
  {
    path: 'board',
    label: '게시판 board',
    element: (
      <Loader
        route={{
          label: 'sample',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/Board')),
        }}
      />
    ),
  },
  {
    path: 'temp',
    label: '게시판 temp',
    element: (
      <Loader
        route={{
          label: 'temp',
          layout: 'empty',
          element: React.lazy(() => import('~/pages/Temp/Temp')),
        }}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
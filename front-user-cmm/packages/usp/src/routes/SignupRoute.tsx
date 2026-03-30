import React from 'react';
import { Loader } from '~/DynamicRouter';
import { MiddlewareType, RouteType } from '~/models/RouteType';

// 회원가입 라우터
export const SignupRoute: RouteType[] = [
  {
    path: 'signup',
    children: [
      {
        index: true,
        element: (
          <Loader
            route={{
              label: 'signup',
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
        path: 'ExistConsumer',
        label: '기 가입 안내 (개인)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignUp/Exist/ExistConsumer')),
            }}
          />
        ),
      },
      {
        path: 'WithdrawCon',
        label: '탈퇴회원 전환안내(개인)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignUp/WithdrawCon')),
            }}
          />
        ),
      },
      {
        path: 'WithdrawPro',
        label: '탈퇴회원 전환안내(사업자)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignUp/WithdrawPro')),
            }}
          />
        ),
      },
      {
        path: 'IdpassNone',
        label: '가입정보 없음',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/IdpassNone')),
            }}
          />
        ),
      },
      {
        path: 'dormancyCon',
        label: '휴면회원 안내(개인)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/dormancy/DormancyCon')),
            }}
          />
        ),
      },
      {
        path: 'dormancyPro',
        label: '휴면회원 안내(사업자)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/dormancy/DormancyPro')),
            }}
          />
        ),
      },
      {
        path: 'dormancyLift',
        label: '휴면회원 해지',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/dormancy/DormancyLift')),
            }}
          />
        ),
      },
      {
        path: 'dormancyLock',
        label: '계정잠김(개인)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/dormancy/DormancyLock')),
            }}
          />
        ),
      },
      {
        path: 'dormancyLockPro',
        label: '계정잠김(사업자)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/dormancy/DormancyLockPro')),
            }}
          />
        ),
      },
      {
        path: 'complete',
        label: '가입완료(사업자)',
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
        path: 'CompleteConsumer',
        label: '가입완료(개인)',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignUp/Complete/CompleteConsumer')),
            }}
          />
        ),
      },
      {
        path: 'NiceSuccess',
        label: 'Nice인증성공페이지',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'space',
              element: React.lazy(
                () => import('~/pages/SignUp/NiceAuth/NiceSuccess')
              ),
            }}
          />
        ),
      },
      {
        path: 'NiceFail',
        label: 'Nice인증실페페이지',
        element: (
          <Loader
            route={{
              label: 'home',
              layout: 'space',
              element: React.lazy(
                () => import('~/pages/SignUp/NiceAuth/NiceFail')
              ),
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
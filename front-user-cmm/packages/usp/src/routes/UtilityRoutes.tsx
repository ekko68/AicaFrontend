import React from 'react';
import { Loader } from '~/DynamicRouter';
import { MiddlewareType, RouteType } from '~/models/RouteType';

// 미들웨어 생성 메뉴 권한 부여
const middleware = (route: RouteType, type: MiddlewareType[]) =>{
  const middleware = [...(route.middleware || []), ...type];
  return Object.assign(route, { middleware });
}

// 공통 라우트
export const UtilityRoutes: RouteType[] = [
  {
    path: 'factor',
    label: '비밀번호 확인',
    element: (
      <Loader
        route={{
          label: 'factor',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/Factor')),
        }}
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/BusinessConversionEnter',
    label: '사업자 전환 입력폼',
    element: (
      <Loader
        route={
          middleware(
            {
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/MyPage/MemberInfoMmt/BusinessConversionEnter')),
            },['auth']
          )
        }
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/BusinessConversionFinish',
    label: '사업자 전환 완료',
    element: (
      <Loader
        route={
          middleware(
            {
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/MyPage/MemberInfoMmt/BusinessConversionFinish')),
            },['auth']
          )
        }
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/BusinessConversionSpool',
    label: '사업자 전환 실패',
    element: (
      <Loader
        route={
          middleware(
            {
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/MyPage/MemberInfoMmt/BusinessConversionSpool')),
            },['auth']
          )
        }
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/MemberInfoOut',
    label: '회원탈퇴',
    element: (
      <Loader
        route={
          middleware(
            {
              label: 'home',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/MyPage/MemberInfoMmt/MemberInfoOut')),
            },['auth']
          )
        }
      />
    ),
  },

  // {SubmissionMaterials
  //   path: '/biz/BusinessAppMgt',
  //   label: '사업신청',
  //   element: (
  //     <Loader
  //       route={
  //         middleware(
  //           {
  //             label: 'space',
  //             layout: 'studio',
  //             element: React.lazy(() => import('~/pages/biz/BusinessAppMgt')),
  //           },['auth']
  //         )}
  //     />
  //   ),
  // },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
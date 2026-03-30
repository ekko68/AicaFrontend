import React, { Suspense } from 'react';
import * as DOM from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import NotFound from 'shared/NotFound';
import Layout from '~/layout';
import { LayoutType } from '~/models/RouteType';

export type RouteType = {
  label?: string;
  layout?: LayoutType;
  element?: any;
  path?: string;
  index?: boolean;
  middleware?: string[];
  children?: RouteType[];
};

type MiddlewareType = 'auth' | 'factor';

function middleware(route: RouteType, type: MiddlewareType[]) {
  const middleware = [...(route.middleware || []), ...type];
  return Object.assign(route, { middleware });
}

//* Route 설정
export const ServiceRoutes: RouteType[] = [
  {
    path: 'notice',
    label: '공고알림',
    children: [
      middleware(
        {
          path: 'recruitmentNotice',
          label: '모집공고',
          layout: 'studio',
          element: (
            <Loader
              route={{
                label: 'notice',
                layout: 'studio',
                element: React.lazy(() => import('~/pages/Notice')),
              }}
            />
          ),
        },
        ['auth']
      ),
      {
        path: 'NoticeDetall',
        label: '모집공고상세',
        element: (
          <Loader
            route={{
              label: 'notice',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Notice/View/NoticeDetall')
              ),
            }}
          />
        ),
      },
      {
        path: 'announcementSelectionRes',
        label: '선정결과공고',
        element: (
          <Loader
            route={{
              label: 'notice',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Notice/AnnouncementSelectionRes')
              ),
            }}
          />
        ),
      },
      {
        path: 'businessInfoNoti',
        label: '사업정보알림',
        element: (
          <Loader
            route={{
              label: 'notice',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Notice/BusinessInfoNoti')
              ),
            }}
          />
        ),
      },
      {
        path: 'announcement',
        label: '공지사항',
        element: (
          <Loader
            route={{
              label: 'notice',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/Notice/Announcement')),
            }}
          />
        ),
      },
    ],
  },
  {
    path: 'SupportForUse',
    label: '이용지원',
    children: [
      {
        path: 'frequentlyAskedQuestions',
        label: '자주묻는질문',
        element: (
          <Loader
            route={{
              label: 'SupportForUse',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SupportForUse')),
            }}
          />
        ),
      },
      {
        path: 'userManual',
        label: '사용자 메뉴얼',
        element: (
          <Loader
            route={{
              label: 'SupportForUse',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SupportForUse/UserManual')
              ),
            }}
          />
        ),
      },
      {
        path: 'referenceRoom',
        label: '자료실',
        element: (
          <Loader
            route={{
              label: 'SupportForUse',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SupportForUse/ReferenceRoom')
              ),
            }}
          />
        ),
      },
      {
        path: 'expertApplication',
        label: '전문가신청',
        element: (
          <Loader
            route={{
              label: 'SupportForUse',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SupportForUse/ExpertApplication')
              ),
            }}
          />
        ),
      },
    ].map((route: Partial<RouteType>) => ({
      ...route,
      layout: 'studio',
    })) as RouteType[],
  },
  {
    path: 'Community',
    label: '커뮤니티',
    children: [
      {
        path: 'facilityReservation',
        label: '사업단 소개',
        element: (
          <Loader
            route={{
              label: 'Community',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/Community')),
            }}
          />
        ),
      },
      {
        path: 'introductionBusGroup',
        label: '시설예약',
        element: (
          <Loader
            route={{
              label: 'Community',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Community/IntroductionBusGroup')
              ),
            }}
          />
        ),
      },
      {
        path: 'introductionBusGroupDetail',
        label: '시설예약상세페이지',
        element: (
          <Loader
            route={{
              label: 'Community',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Community/IntroductionBusGroupDetail')
              ),
            }}
          />
        ),
      },
      {
        path: 'ReservationOne',
        label: '시설예약시간선택페이지',
        element: (
          <Loader
            route={{
              label: 'Community',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Community/ReservationOne')
              ),
            }}
          />
        ),
      },
      {
        path: 'ReservationTwo',
        label: '시설예약신청페이지',
        element: (
          <Loader
            route={{
              label: 'Community',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/Community/ReservationTwo')
              ),
            }}
          />
        ),
      },
    ],
  },
  {
    path: 'EventNews',
    label: '이벤트뉴스',
    children: [
      {
        path: 'honsaEvent',
        label: '행사/이벤트',
        element: (
          <Loader
            route={{
              label: 'EventNews',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/EventNews')),
            }}
          />
        ),
      },
      {
        path: 'honsaEventDetail',
        label: '행사/이벤트 상세',
        element: (
          <Loader
            route={{
              label: 'EventNews',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/EventNews/View/HonsaEventDetail')),
            }}
          />
        ),
      },
      {
        path: 'treadmill',
        label: '디딤널',
        element: (
          <Loader
            route={{
              label: 'EventNews',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/EventNews/Treadmill')),
            }}
          />
        ),
      },
      {
        path: 'resourceInfoSharing',
        label: '자원정보공유',
        element: (
          <Loader
            route={{
              label: 'EventNews',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/EventNews/ResInfoSharing')
              ),
            }}
          />
        ),
      },
    ].map((route: Partial<RouteType>) => ({
      ...route,
      layout: 'studio',
    })) as RouteType[],
  },
  {
    path: 'ServiceIntroduction',
    label: '서비스소개',
    children: [
      {
        path: 'serviceInformation',
        label: '서비스안내',
        element: (
          <Loader
            route={{
              label: 'ServiceIntroduction',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/ServiceIntroduction')),
            }}
          />
        ),
      },
    ].map((route: Partial<RouteType>) => ({
      ...route,
      layout: 'studio',
    })) as RouteType[],
  },
];

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
          layout: 'studio',
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
    path: 'factor',
    label: '비밀번호 확인',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignIn/Factor')),
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
    path: 'snsNaverCallback',
    label: '컴포넌트 샘플',
    element: (
      <Loader
        route={{
          label: 'sns-login',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SnsNaverCallback')),
        }}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];

export const SampleRoute: RouteType[] = [
  {
    path: 'board',
    children: [
      {
        index: true,
        element: (
          <Loader
            route={{
              label: 'board',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/Board')),
            }}
          />
        ),
      },
      {
        path: ':id',
        element: (
          <Loader
            route={{
              label: 'view',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/Board/View')),
            }}
          />
        ),
      },
    ],
  },
  // {
  //   path: 'mypage',
  //   element: (
  //     <Loader
  //       route={middleware(
  //         {
  //           label: 'mypage',
  //           layout: 'studio',
  //           element: React.lazy(() => import('~/pages/MyPage')),
  //         },
  //         ['auth', 'factor']
  //       )}
  //     />
  //   ),
  // },
];

export const ReferenceRoutes: RouteType[] = [];

function Loader({ route }: { route: RouteType }) {
  const View = route.element;
  return (
    <Suspense
      fallback={<div>loading.... check your chrome DevTool console</div>}
    >
      <Layout
        name={route.layout!}
        label={route.label!}
        middleware={route.middleware}
      >
        <View />
      </Layout>
    </Suspense>
  );
}

function Routes() {
  const routes = useRoutes([
    {
      index: true,
      element: (
        <Loader
          route={{
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/Home')),
          }}
        />
      ),
    },
    ...ServiceRoutes,
    ...UtilityRoutes,
    ...SampleRoute,
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return routes;
}

function Router() {
  return (
    <DOM.BrowserRouter>
      <Routes />
    </DOM.BrowserRouter>
  );
}
export default Router;

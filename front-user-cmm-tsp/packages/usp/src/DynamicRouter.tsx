import * as R from 'ramda';
import React, { Suspense } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import Layout from '~/layout';
import LinearProgress from '../src/components/Loading/LinearProgress';
import { MiddlewareType, RouteType } from '~/models/RouteType';
import create from 'zustand';
import SystemErrorPage from './components/Loading/SystemErrorPage';
import Error404Page from './components/Loading/Error404Page';
import { fetchSiteMap } from './fetches/fetchGetCommCode';
import { useQuery, useQueryClient } from 'react-query';

/* 
  작성일    :   2022/05/15
  화면명    :   공통 다이나믹 라우터
  회면ID    :   
  화면/개발 :   navycui
*/
//전역 스토어 생성
type routeType = {
  routes: RouteType[];
  type: string;
};
export const useRoutesStore = create<routeType>(() => ({
  routes: [],
  type: '',
}));
const DynamicRouter = () => {
  const queryClient = useQueryClient();
  //* 타입별 경로
  const [, type] = useLocation().pathname.split('/');
  // route type 정의
  const menu: any =
    {
      biz: 'PORTAL_PMS',
    }[type] || 'PORTAL_USP';

  // 메뉴 조회
  const { data, error }: any = useQuery(
    `${menu}`,
    async () => await fetchSiteMap(menu)
  );

  if (!data) {
    if (!!error) {
      if (error.response.status >= 500) {
        return (
          <>
            <SystemErrorPage msg={error ? error.response.data : null} />
          </>
        );
      } else if (error.response.status === 404) {
        return (
          <>
            <Error404Page msg={error ? error.response.data : null} />
          </>
        );
      } else {
        return (
          <>
            <SystemErrorPage msg={error ? error.response.data : null} />
          </>
        );
      }
    }
    return <div />;
  }

  // 메뉴 재조립
  const routes = hierarchy(data.list);

  // 케시 데이터 추가
  queryClient.setQueryData('route://service', routes);
  useRoutesStore.setState(
    (state: any) => ((state.routes = routes), (state.type = menu))
  );
  return <Routes routes={routes} />;
};

// 미들웨어 생성 메뉴 권한 부여
const middleware = (route: RouteType, type: MiddlewareType[]) => {
  const middleware = [...(route.middleware || []), ...type];
  return Object.assign(route, { middleware });
};
// 로드 컴포넌트
export const Loader = ({ route }: any) => {
  const View = route.element;
  return (
    <Suspense
      fallback={
        <>
          <LinearProgress />
        </>
      }
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
};
// 메뉴 트리구조 생성
const flatten = (routes: any) => {
  const res = routes.reduce((a: any, b: any) => {
    const { children = [] } = b;
    const c = R.omit(['children'])(b);
    const d = flatten(children);
    return [...a, c, ...d];
  }, []);
  return res;
};
// 메뉴 패턴 재조립
const adaptor = (routes: any) => {
  return routes.map((route: any) => {
    const { label, path, layout } = route;
      if((path.includes(('/biz')))){
      return {
        label,
        path,
        element: (
          <Loader
            route=
            { middleware(
              {
                layout: layout,
                //* path 컴포넌트
                element: React.lazy(() => import(`~/pages${path}`)),
              },['auth'])
            }
          />
        ),
      }
      } else {
      return {
        label,
        path,
        element: (
          <Loader
            route={{
              layout: layout,
              //* path 컴포넌트
              element: React.lazy(() => import(`~/pages${path}`)),
            }}
          />
        ),
      };
    };
  });
};

// 사업관리 메인 라우트
export const BizMainRoute: RouteType[] = [
  {
    path: '/biz',
    label: 'biz Home',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/biz/Home')),
        }}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];

// 검색 라우트
export const SearchRoute: RouteType[] = [
  {
    path: 'search',
    label: '검색',
    children: [
      {
        index: true,
        element: (
          <Loader
            route={{
              label: 'search',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/Home/SearchEngine/SearchMain')),
            }}
          />
        ),
      },
      {
        path: 'result',
        label: '검색결과',
        element: (
          <Loader
            route={{
              label: 'searchResult',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/Home/SearchEngine/SearchResult')),
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignUp/Exist/ExistConsumer')
              ),
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
              label: 'sign',
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignUp/WithdrawPro')),
            }}
          />
        ),
      },
      {
        path: 'idpassNone',
        label: '가입정보 없음',
        element: (
          <Loader
            route={{
              label: 'sign',
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignIn/dormancy/DormancyCon')
              ),
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignIn/dormancy/DormancyPro')
              ),
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignIn/dormancy/DormancyLift')
              ),
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignIn/dormancy/DormancyLock')
              ),
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignIn/dormancy/DormancyLockPro')
              ),
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
              label: 'sign',
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignUp/Complete/CompleteConsumer')
              ),
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(
                () => import('~/pages/SignIn/dormancy/DormancyPass')
              ),
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
              label: 'sign',
              layout: 'studio',
              element: React.lazy(() => import('~/pages/SignIn/IdTrouver')),
            }}
          />
        ),
      },
      {
        path: 'idTrouverFind',
        label: '아이디 확인',
        element: (
          <Loader
            route={{
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              label: 'sign',
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
              element: React.lazy(
                () => import('~/pages/SnsNaverCallback/SnsNaverConfigCallback')
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

// 상세페이지 라우트
export const DetailPagesRoutes: RouteType[] = [
  {
    path: '/Notice/Notice/:id',
    label: '모집공고 상세',
    element: (
      <Loader
        route={{
          label: 'NoticeDetall',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/Notice/View/NoticeDetall')),
        }}
      />
    ),
  },
  {
    path: '/Notice/Announcement/:id',
    label: '공지사항상세페이지',
    element: (
      <Loader
        route={{
          label: 'announcement',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/Notice/View/AnnouncementDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/Notice/AnnouncementSelectionRes/:id',
    label: '선정결과공고상세페이지',
    element: (
      <Loader
        route={{
          label: 'announcement',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/Notice/View/AnnouncementSelectionResDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/SupportForUse/ReferenceRoom/:id',
    label: '자료실상세페이지',
    element: (
      <Loader
        route={{
          label: 'reference',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/SupportForUse/View/ReferenceRoomDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/MyPage/InquiryMmt/:id',
    label: '1:1문의상세',
    element: (
      <Loader
        route={{
          label: 'OneByOneMmtDetail',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/MyPage/InquiryMmt/OneByOneMmtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/EventNews/HonsaEvent/:id',
    label: '행사/이벤트 상세',
    element: (
      <Loader
        route={{
          label: 'honsa',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/EventNews/View/HonsaEventDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/MyPage/UsageMmt/:id',
    label: '디딤널상세',
    element: (
      <Loader
        route={{
          label: 'treadmill',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/MyPage/UsageMmt/TreadmillMmtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/MyPage/UsageMmt/:id',
    label: '시설예약상세',
    element: (
      <Loader
        route={{
          label: 'reservation',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/MyPage/UsageMmt/FacilityReservationMmtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/EventNews/ResInfoSharing/:id',
    label: '자원정보공유 상세',
    element: (
      <Loader
        route={{
          label: 'resource',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/EventNews/View/ResInfoSharingDetail')
          ),
        }}
      />
    ),
  },
  {
    path: 'ResourceInfoSharing',
    label: '자원정보공유 의견작성',
    element: (
      <Loader
        route={{
          label: 'resource',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/EventNews/ResourceInfoSharing')
          ),
        }}
      />
    ),
  },
  {
    path: '/SupportForUse/UserManual/:id',
    label: '사용자메뉴얼상세',
    element: (
      <Loader
        route={{
          label: 'manual',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/SupportForUse/View/UserManualDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/SupportForUse/FrequentlyAskedQuestions/:id',
    label: '자주묻는질문',
    element: (
      <Loader
        route={{
          label: 'question',
          layout: 'studio',
          element: React.lazy(
            () =>
              import(
                '~/pages/SupportForUse/View/FrequentlyAskedQuestionsDetail'
              )
          ),
        }}
      />
    ),
  },
  {
    path: '/Community/IntroductionBusGroup/:id',
    label: '시설예약상세페이지',
    element: (
      <Loader
        route={{
          label: 'reservation',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/Community/IntroductionBusGroupDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/Community/ReservationOne/:id',
    label: '시설예약시간선택페이지',
    element: (
      <Loader
        route={{
          label: 'reservation',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/Community/ReservationOne')),
        }}
      />
    ),
  },
  {
    path: '/Community/ReservationTwo/:id',
    label: '시설예약신청페이지',
    element: (
      <Loader
        route={middleware(
          {
            label: 'reservation',
            layout: 'studio',
            element: React.lazy(
              () => import('~/pages/Community/ReservationTwo')
            ),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/SupportForUse/ExpertApplicationDetail01',
    label: '전문가신청(신청자정보)',
    element: (
      <Loader
        route={{
          label: 'expert',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/SupportForUse/View/ExpertApplicationDetail01')
          ),
        }}
      />
    ),
  },
  {
    path: '/SupportForUse/ExpertApplicationDetail02',
    label: '전문가신청(커리어정보)',
    element: (
      <Loader
        route={{
          label: 'expert',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/SupportForUse/View/ExpertApplicationDetail02')
          ),
        }}
      />
    ),
  },
  {
    path: '/SupportForUse/ExpertApplicationDetail03',
    label: '전문가신청(신청완료)',
    element: (
      <Loader
        route={{
          label: 'expert',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/SupportForUse/View/ExpertApplicationDetail03')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/BusinessAppMgt/BusinessApp/:id',
    label: '신청체크리스트',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/BusinessAppMgt/BusinessApp')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/BusinessAppMgt/BusinessAppInfo/:id',
    label: '신청자정보',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/BusinessAppMgt/BusinessAppInfo')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/BusinessAppMgt/BusinessAppConfirmInfo/:id',
    label: '신청정보',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/BusinessAppMgt/BusinessAppConfirmInfo')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/BusinessAppMgt/BusAppMgtDetail/:id',
    label: '사업신청 관리 상세',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/BusinessAppMgt/BusAppMgtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/EvaluationMgt/SubmissionMaterials/:id',
    label: '발표자료 제출',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/EvaluationMgt/View/SubmissionMaterials')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/BusinessPlanMgtDetail/:id',
    label: '사업계획서관리 상세',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/View/BusinessPlanMgtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/ElectronicAgtMgtDetail/:id',
    label: '전자협약관리 상세',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/View/ElectronicAgtMgtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp/:id',
    label: '협약변경관리 신청',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/View/AgreementChangeMgtApp')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp00/:id',
    label: '협약변경관리 신청 과제정보',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp00')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp01/:id',
    label: '협약변경관리 신청 참여기업',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp01')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp02/:id',
    label: '협약변경관리 신청 참여인력',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp02')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp03/:id',
    label: '협약변경관리 신청 사업비',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp03')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp04/:id',
    label: '협약변경관리 신청 비목별사업비',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp04')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp05/:id',
    label: '협약변경관리 신청 신청자정보',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp05')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/ContractMgt/AgreementChangeMgtApp06/:id',
    label: '협약변경관리 신청 과제책임자',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/ContractMgt/AgreementChangeMgtApp06')
          ),
        }}
      />
    ),
  },

  {
    path: '/biz/EvaluationMgt/ObjectionDetail/:id',
    label: '협약변경관리 상세',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages//biz/EvaluationMgt/View/ObjectionDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/TaskManagement/PerformanceMgtDetail/:id',
    label: '성과상세페이지',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/biz/TaskManagement/PerformanceMgtDetail')
          ),
        }}
      />
    ),
  },
  {
    path: '/biz/TaskManagement/ReportSubmissionDetail/:id',
    label: '보고서 제출',
    element: (
      <Loader
        route={{
          label: 'biz',
          layout: 'studio',
          element: React.lazy(
            () =>
              import('~/pages/biz/TaskManagement/View/ReportSubmissionDetail')
          ),
        }}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];

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
        route={middleware(
          {
            label: 'BusinessConversionEnter',
            layout: 'studio',
            element: React.lazy(
              () =>
                import('~/pages/MyPage/MemberInfoMmt/BusinessConversionEnter')
            ),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/BusinessConversionFinish',
    label: '사업자 전환 완료',
    element: (
      <Loader
        route={middleware(
          {
            label: 'BusinessConversionFinish',
            layout: 'studio',
            element: React.lazy(
              () =>
                import('~/pages/MyPage/MemberInfoMmt/BusinessConversionFinish')
            ),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/BusinessConversionSpool',
    label: '사업자 전환 실패',
    element: (
      <Loader
        route={middleware(
          {
            label: 'BusinessConversionSpool',
            layout: 'studio',
            element: React.lazy(
              () =>
                import('~/pages/MyPage/MemberInfoMmt/BusinessConversionSpool')
            ),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: 'MyPage/MemberInfoMmt/MemberInfoOut',
    label: '회원탈퇴',
    element: (
      <Loader
        route={middleware(
          {
            label: 'MemberInfoOut',
            layout: 'studio',
            element: React.lazy(
              () => import('~/pages/MyPage/MemberInfoMmt/MemberInfoOut')
            ),
          },
          ['auth']
        )}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];

// 라우터 생성 컴포넌트
const Routes = ({ routes }: any) => {
  const menus = R.pipe(flatten, adaptor)(routes);
  const nav = useRoutes([
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
    ...menus,
    ...BizMainRoute,
    ...SearchRoute,
    ...SignupRoute,
    ...SigninRoute,
    ...UtilityRoutes,
    ...DetailPagesRoutes,
    {
      path: '*',
      element: <Error404Page />,
    },
  ]);

  return nav;
};
//* 1차원 배열을 계층 구조로 변환
const hierarchy = (list: any) => {
  //* 객체 복사
  const record: any[] = R.pipe(JSON.stringify, JSON.parse)(list);
  let map = record.reduce((a, b, i) => ({ ...a, [b.menuId]: i }), {});
  let root: any = {};

  //* 계층 생성
  record.forEach((item) => {
    item.path = `${item.url}`.replace(/\/\//g, '/');
    item.label = item.menuNm;
    item.layout = 'studio';
    const el =
      R.isNil(item.parentMenuId) || item.parentMenuId === 'ROOT'
        ? root
        : record[map[item.parentMenuId]];

    if (R.isNil(el.children)) el.children = [];

    el.children.push(item);
  });

  return root.children;
};
// db menu search api
// const fetcher = (url: string) => {
//   return api({ baseURL: 'http://api.bnet.com',method: 'get', url });
// };

export default DynamicRouter;

import React from 'react';
import { Loader } from '~/DynamicRouter';
import { MiddlewareType, RouteType } from '~/models/RouteType';

// 미들웨어 생성 메뉴 권한 부여
const middleware = (route: RouteType, type: MiddlewareType[]) =>{
  const middleware = [...(route.middleware || []), ...type];
  return Object.assign(route, { middleware });
}

// 상세페이지 라우트
export const DetailPagesRoutes: RouteType[] = [
  {
    path: 'NoticeDetall/:id',
    label: '모집공고 상세',
      element: (
        <Loader
          route={{
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/Notice/View/NoticeDetall')),
          }}
        />
      ),
  },
  {
    path: 'announcementDetail/:id',
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
    path: 'announcementSelectionResDetail/:id',
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
    path: 'referenceRoomDetail/:id',
    label: '자료실상세페이지',
    element: (
      <Loader
        route={{
          label: 'reference',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SupportForUse/View/ReferenceRoomDetail')),
        }}
      />
    ),
  },
  {
    path: 'MyPage/InquiryMmt/OneByOneMmtDetail/:id',
    label: '1:1문의상세',
    element: (
      <Loader
        route={{
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/MyPage/InquiryMmt/OneByOneMmtDetail')),
        }}
      />
    ),
  },
  {
    path: 'honsaEventDetail/:id',
    label: '행사/이벤트 상세',
    element: (
      <Loader
        route={{
          label: 'honsa',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/EventNews/View/HonsaEventDetail')),
        }}
      />
    ),
  },
  {
    path: 'MyPage/UsageMmt/TreadmillMmtDetail/:id',
    label: '디딤널상세',
    element: (
      <Loader
        route={{
          label: 'treadmill',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/MyPage/UsageMmt/TreadmillMmtDetail')),
        }}
      />
    ),
  },
  {
    path: 'FacilityReservationMmtDetail/:id',
    label: '시설예약상세',
    element: (
      <Loader
        route={{
          label: 'reservation',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/MyPage/UsageMmt/FacilityReservationMmtDetail')),
        }}
      />
    ),
  },
  {
    path: 'ResInfoSharingDetail/:id',
    label: '자원정보공유 상세',
    element: (
      <Loader
        route={{
          label: 'resource',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/EventNews/View/ResInfoSharingDetail')),
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
          element: React.lazy(() => import('~/pages/EventNews/ResourceInfoSharing')),
        }}
      />
    ),
  },
  {
    path: 'UserManualDetail/:id',
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
    path: 'FrequentlyAskedQuestionsDetail/:id',
    label: '자주묻는질문',
    element: (
      <Loader
        route={{
          label: 'question',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/SupportForUse/View/FrequentlyAskedQuestionsDetail')
          ),
        }}
      />
    ),
  },
  {
    path: 'IntroductionBusGroupDetail/:id',
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
    path: 'ReservationOne/:id',
    label: '시설예약시간선택페이지',
    element: (
      <Loader
        route={{
          label: 'reservation',
          layout: 'studio',
          element: React.lazy(
            () => import('~/pages/Community/ReservationOne')
          ),
        }}
      />
    ),
  },
  {
    path: 'ReservationTwo/:id',
    label: '시설예약신청페이지',
    element: (
      <Loader
        route={

               middleware(
                {
                  label: 'reservation',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/Community/ReservationTwo'))
                },['auth'])
            
      
         }
      />
    ),
  },
  {
    path: 'ExpertApplicationDetail01',
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
    path: 'ExpertApplicationDetail02',
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
    path: 'ExpertApplicationDetail03',
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
          element: React.lazy(() => import('~/pages/biz/BusinessAppMgt/BusinessApp')),
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
          element: React.lazy(() => import('~/pages/biz/BusinessAppMgt/BusinessAppInfo')),
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
          element: React.lazy(() => import('~/pages/biz/BusinessAppMgt/BusinessAppConfirmInfo')),
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
          element: React.lazy(() => import('~/pages/biz/BusinessAppMgt/BusAppMgtDetail')),
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
            element: React.lazy(() => import('~/pages/biz/EvaluationMgt/View/SubmissionMaterials')),
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
            element: React.lazy(() => import('~/pages/biz/ContractMgt/View/BusinessPlanMgtDetail')),
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
            element: React.lazy(() => import('~/pages/biz/ContractMgt/View/ElectronicAgtMgtDetail')),
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
            element: React.lazy(() => import('~/pages/biz/ContractMgt/View/AgreementChangeMgtApp')),
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
            element: React.lazy(() => import('~/pages//biz/EvaluationMgt/View/ObjectionDetail')),
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
            element: React.lazy(() => import('~/pages/biz/TaskManagement/PerformanceMgtDetail')),
          }}
        />
      ),
  },
  {
    path: '/biz/TaskManagement/View/ReportSubmissionDetail/:id',
    label: '보고서 제출',
      element: (
        <Loader
          route={{
            label: 'biz',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/biz/TaskManagement/View/ReportSubmissionDetail')),
          }}
        />
      ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
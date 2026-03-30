import {RouteType} from "~/DynamicRouter";
import {Loader, middleware} from "shared/utils/RouteUtiles";
import React from "react";


export const OperationMgtRoutes: RouteType[] = [
  {
    path: '/OperationMgt/ExpertMgt/ExpertAppMgt/:id',
    label: '전문가신청 상세',
    element: (
      <Loader
        route={{
          label: 'ExpertAppMgtDetail',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/OperationMgt/ExpertMgt/ExpertAppMgt/ExpertAppMgtDetail')),
        }}
      />)
  },{
    path: '/OperationMgt/ExpertMgt/ExpertInformationMgt/:id',
    label: '전문가신청 상세',
    element: (
      <Loader
        route={{
          label: 'ExpertInformationMgtDetail',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/OperationMgt/ExpertMgt/ExpertInformationMgt/ExpertInformationMgtDetail')),
        }}
      />)
  }, {
  },{
    path: '/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut/FrequentlyAskedQutRegi',
    label: '자주묻는질문 등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'FrequentlyAskedQutRegi',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut/FrequentlyAskedQutRegi")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut/:id',
    label: '자주묻는질문 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'FrequentlyAskedQutDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut/FrequentlyAskedQutDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/ParticipationEventMgt/StepMgt/:id',
    label: '디딤널 관리 상세',
    element: (
      <Loader
        route={{
          label: 'StepInfo',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/StepMgtDetail')),
        }}
      />)
  },
  {
    path: '/OperationMgt/ParticipationEventMgt/ResourceInfmtSharMgt/:id',
    label: '자원정보공유 관리 상세',
    element: (
      <Loader
        route={{
          label: 'ResourceInfmtSharInfo',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/ResourceInfmtSharDetail')),
        }}
      />)
  },
  {
    path: '/OperationMgt/ParticipationEventMgt/EventEventMgt/:id',
    label: '행사/이벤트 상세',
    element: (
      <Loader
        route={{
          label: 'EventEventInfo',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/EventEventDetail')),
        }}
      />)
  },
  {
    path: '/OperationMgt/ParticipationEventMgt/EventEventMgt/Resister',
    label: '행사/이벤트 등록',
    element: (
      <Loader
        route={{
          label: 'EventEventRegister',
          layout: 'adminLayout',
          element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/EventEventResister')),
        }}
      />)
  },{
    path: '/OperationMgt/CustomerSupportMgt/UserManualMgt/UserManualMgtRegi',
    label: '사용자메뉴얼 등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'UserManualMgtRegi',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/UserManualMgt/UserManualMgtRegi")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/CustomerSupportMgt/UserManualMgt/:id',
    label: '사용자메뉴얼 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'UserManualMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/UserManualMgt/UserManualMgtDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/OperationMgt/CustomerSupportMgt/ArchiveMgt/ArchiveMgtRegi',
    label: '자료 등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ArchiveMgtRegi',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/ArchiveMgt/ArchiveMgtRegi")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/CustomerSupportMgt/ArchiveMgt/:id',
    label: '자료 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ArchiveMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/ArchiveMgt/ArchiveMgtDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/CustomerSupportMgt/OnebyOneInquiryMgt/:id',
    label: '1:1문의 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'OnebyOneInquiryMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/OnebyOneInquiryMgt/OnebyOneInquiryMgtDetail")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt/:id',
    label: '만족도조사 관리 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'SatisfaSurveyMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/SatisfaSurveyMgt/SatisfaSurveryMgtDetail")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt/SurveyRegister',
    label: '설문지 등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'SurveyRegister',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/SatisfaSurveyMgt/SurveyRegister")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/CustomerSupportMgt/NoticeInfoMgt/NoticeInfoMgtRegi',
    label: '공지사항 등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'NoticeInfoMgtRegi',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/NoticeInfoMgt/NoticeInfoMgtRegi")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/CustomerSupportMgt/NoticeInfoMgt/:id',
    label: '공지사항 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'NoticeInfoMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/NoticeInfoMgt/NoticeInfoMgtDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt/ManagerNoticeMgtRegi',
    label: '관리자공지사항 등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ManagerNoticeMgtRegi',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt/ManagerNoticeMgtRegi")),
          },
          []
        )}
      />
    ),
  },{
    path: '/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt/:id',
    label: '관리자공지사항 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ManagerNoticeMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt/ManagerNoticeMgtDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/MemberMgt/MemberMgt/:id',
    label: '회원관리상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'MemberMgt',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/MemberMgt/MemberDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/SiteMgt/HomePopUpWindowMgt/:id',
    label: '홈팝업창상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'SiteMgt',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/SiteMgt/HomePopUpWindowDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/SiteMgt/HomePopUpWindowMgt/ApplyPopUp',
    label: '홈팝업창등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'SiteMgt',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/SiteMgt/HomePopUpWindowApply")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/SiteMgt/HomeBannerMgt/Apply',
    label: '홈배너등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'SiteMgt',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/SiteMgt/HomeBannerApply")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/OperationMgt/SiteMgt/HomeBannerMgt/:id',
    label: '홈배너상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'SiteMgt',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/OperationMgt/SiteMgt/HomeBannerDetail")),
          },
          []
        )}
      />
    ),
  },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
import React, { Suspense } from 'react';
import * as DOM from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import NotFound from 'shared/NotFound';
import Layout, { LayoutType } from '~/layout';

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
    path: 'BusInformationMgt',
    label: '사업정보관리',
    children: [
      {
        path: 'BusInformationMgt',
        label: '사업정보관리',
        children: [
          {
            path: 'BusInformationMgt',
            label: '사업정보관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'BusInformationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/BusInformationMgt/BusInformationMgt')),
                }}
              />
            ),
          },
          {
            path: 'StdBusInformationMgt',
            label: '기준사업정보관리',
            element: (
              <Loader
                route={{
                  label: 'BusInformationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/BusInformationMgt/BusInformationMgt/StdBusInformationMgt')),
                }}
              />
            ),
          },
          {
            path: 'StdBusClassificationMgt',
            label: '기준사업분류관리',
            element: (
              <Loader
                route={{
                  label: 'BusInformationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/BusInformationMgt/BusInformationMgt/StdBusClassificationMgt')),
                }}
              />
            ),
          },
          {
            path: 'MgtOfBusExpenses',
            label: '사업비비목관리',
            element: (
              <Loader
                route={{
                  label: 'BusInformationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/BusInformationMgt/BusInformationMgt/MgtOfBusExpenses')),
                }}
              />
            ),
          },]
      },
      {
        path: 'BusStatusMgt',
        label: '사업현황관리',
        children: [
          {
            path: 'CompanyStatusInquiry',
            label: '사업정보관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'BusInformationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/BusInformationMgt/BusStatusMgt/CompanyStatusInquiry')),
                }}
              />
            )
          },]
      }
    ]
  },
  {
    path: 'AnnouncementReception',
    label: '공고/접수',
    children: [
      {
        path: 'NoticeMgt',
        label: '공고관리',
        children: [
          {
            path: 'SupportProNotMgt',
            label: '지원사업공고관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'AnnouncementReception',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/AnnouncementReception/NoticeMgt/SupportProNotMgt')),
                }}
              />
            ),
          },
          {
            path: 'SelResAmtMgt',
            label: '선정결과공고관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'AnnouncementReception',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/AnnouncementReception/NoticeMgt/SelResAmtMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'ReceptionMgt',
        label: '접수관리',
        children: [
          {
            path: 'AppReceptionMgt',
            label: '신청접수관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'AnnouncementReception',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/AnnouncementReception/ReceptionMgt/AppReceptionMgt')),
                }}
              />
            ),
          },
          {
            path: 'RegularReceptionMgt',
            label: '상시접수관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'AnnouncementReception',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/AnnouncementReception/ReceptionMgt/RegularReceptionMgt')),
                }}
              />
            ),
          }]
      },
    ]
  },
  {
    path: 'EvalSelection',
    label: '평가/선정',
    children: [
      {
        path: 'EvalMgt',
        label: '평가관리',
        children: [
          {
            path: 'EvalSheetMgt',
            label: '평가표관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/EvalMgt/EvalSheetMgt')),
                }}
              />
            ),
          },
          {
            path: 'EvalPlanMgt',
            label: '평가계획관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/EvalMgt/EvalPlanMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'EvalCommitteeMgt',
        label: '평가위원회관리',
        children: [
          {
            path: 'SelectionOfEvaluators',
            label: '평가위원 추출',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/EvalCommitteeMgt/SelectionOfEvaluators')),
                }}
              />
            ),
          },
          {
            path: 'RecCommMem',
            label: '평가위원 섭외',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/EvalCommitteeMgt/RecCommMem')),
                }}
              />
            ),
          }]
      },
      {
        path: 'EvalProgressMgt',
        label: '평가진행관리',
        children: [
          {
            path: 'EvalProgressMgt',
            label: '평가진행관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/EvalProgressMgt/EvalProgressMgt')),
                }}
              />
            ),
          },
          {
            path: 'PresentationDataMgt',
            label: '발표자료관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/EvalProgressMgt/PresentationDataMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'SelectionMgt',
        label: '선정관리',
        children: [
          {
            path: 'SelectionMgt',
            label: '선정관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/SelectionMgt/SelectionMgt')),
                }}
              />
            ),
          },
          {
            path: 'MgtOfObjectionApp',
            label: '이의신청접수관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EvalSelection',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EvalSelection/SelectionMgt/MgtOfObjectionApp')),
                }}
              />
            ),
          }]
      },
    ],
  },
  {
    path: 'Convention',
    label: '협약',
    children: [
      {
        path: 'MgtOfContractSigning',
        label: '협약체결관리',
        children: [
          {
            path: 'BusPlanReceptionMgt',
            label: '사업계획서접수관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'Convention',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/Convention/MgtOfContractSigning/BusPlanReceptionMgt')),
                }}
              />
            ),
          },
          {
            path: 'ElectronicAgtMgt',
            label: '전자협약관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'Convention',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'ContractMgt',
        label: '협약관리',
        children: [
          {
            path: 'AgtChangeMgt',
            label: '협약변경관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'Convention',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/Convention/ContractMgt/AgtChangeMgt')),
                }}
              />
            ),
          },
          {
            path: 'AgtChangeDetails',
            label: '협약변경내역',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'Convention',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/Convention/ContractMgt/AgtChangeDetails')),
                }}
              />
            ),
          },
          {
            path: 'AgtTerminationMgt',
            label: '협약해지관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'Convention',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/Convention/ContractMgt/AgtTerminationMgt')),
                }}
              />
            ),
          }]
      }
    ]
  },
  {
    path: 'TaskMgt',
    label: '과제관리',
    children: [
      {
        path: 'ReportMgt',
        label: '보고서관리',
        children: [
          {
            path: 'BusPlanReceptionMgt',
            label: '사업계획서접수관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'TaskMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/TaskMgt/ReportMgt/InterimReportMgt')),
                }}
              />
            ),
          },
          {
            path: 'ElectronicAgtMgt',
            label: '전자협약관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'TaskMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/TaskMgt/ReportMgt/ResultReportMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'SettlementMgt',
        label: '정산관리',
        children: [
          {
            path: 'SettlementMgt',
            label: '정산관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'TaskMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/TaskMgt/SettlementMgt/SettlementMgt')),
                }}
              />
            ),
          }]
      },
    ]
  },
  {
    path: 'PerformanceMgt',
    label: '성과관리',
    children: [
      {
        path: 'PerformanceMgt',
        label: '성과관리',
        children: [
          {
            path: 'PerformanceStatusInquiry',
            label: '성과현황조회',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'PerformanceMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/PerformanceMgt/PerformanceMgt/PerformanceStatusInquiry')),
                }}
              />
            ),
          }]
      }
    ]
  },
  {
    path: 'EducationMgt',
    label: '교육관리',
    children: [
      {
        path: 'TraineeMgt',
        label: '교육생관리',
        children: [
          {
            path: 'TraineeMatchingMgt',
            label: '교육생매칭관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EducationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EducationMgt/TraineeMgt/TraineeMatchingMgt')),
                }}
              />
            ),
          },
          {
            path: 'TraineeHistoryMgt',
            label: '교육생이력관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EducationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EducationMgt/TraineeMgt/TraineeHistoryMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'EducationOperationMgt',
        label: '교육운영관리',
        children: [
          {
            path: 'EducationLmsMgt',
            label: '교육(LMS)관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EducationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EducationMgt/EducationOperationMgt/EducationLmsMgt')),
                }}
              />
            ),
          },
          {
            path: 'EducationContentLcmsMgt',
            label: '교육콘텐츠(LCMS)관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'EducationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/EducationMgt/EducationOperationMgt/EducationContentLcmsMgt')),
                }}
              />
            ),
          }]
      },
    ]
  },
  {
    path: 'ResidentFacilityMgt',
    label: '입주시설관리',
    children: [
      {
        path: 'FacilityMgt',
        label: '시설관리',
        children: [
          {
            path: 'FacilityReservationMgt',
            label: '시설예약관리',
            element: (
              <Loader
                route={{
                  label: 'ResidentFacilityMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/FacilityMgt/FacilityReservationMgt')),
                }}
              />
            ),
          },
          {
            path: 'ResidentFacInfmtMgt',
            label: '입주시설정보관리',
            element: (
              <Loader
                route={{
                  label: 'TaskMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/FacilityMgt/ResidentFacInfmtMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'TenantCompMgt',
        label: '입주업체관리',
        children: [
          {
            path: 'TenantCompPerfMgt',
            label: '입주업체성과관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'ResidentFacilityMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/TenantCompMgt/TenantCompPerfMgt')),
                }}
              />
            ),
          },
          {
            path: 'TenantCompMgtPage',
            label: '입주업체관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'ResidentFacilityMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/TenantCompMgt/TenantCompMgtPage')),
                }}
              />
            ),
          }]
      },
      {
        path: 'CheckOutMgt',
        label: '입퇴실관리',
        children: [
          {
            path: 'MoveInExeAppMgt',
            label: '입주연장신청관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'ResidentFacilityMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/CheckOutMgt/MoveInExeAppMgt')),
                }}
              />
            ),
          },
          {
            path: 'CheckOutAppMgt',
            label: '퇴실신청관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'ResidentFacilityMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/CheckOutMgt/CheckOutAppMgt')),
                }}
              />
            ),
          },
          {
            path: 'StatusOccRooms',
            label: '입주실현황',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'ResidentFacilityMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResidentFacilityMgt/CheckOutMgt/StatusOccRooms')),
                }}
              />
            ),
          }]
      },
    ]
  },
  {
    path: 'ResAllMgt',
    label: '자원할당관리',
    children: [
      {
        path: 'ResAllMgt',
        label: '자원할당관리',
        children: [
          {
            path: 'ResAllStatusInquiry',
            label: '자원할당현황조회',
            element: (
              <Loader
                route={{
                  label: 'ResAllMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResAllMgt/ResAllStatusInquiry')),
                }}
              />
            ),
          },
          {
            path: 'ResAllInventoryMgt',
            label: '자원할당재고관리',
            element: (
              <Loader
                route={{
                  label: 'ResAllMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/ResAllMgt/ResAllInventoryMgt')),
                }}
              />
            ),
          }]
      },
    ]
  },
  {
    path: 'OperationMgt',
    label: '운영관리',
    children: [
      {
        path: 'ExpertMgt',
        label: '전문가관리',
        children: [
          {
            path: 'ExpertAppMgt',
            label: '전문가신청관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ExpertMgt/ExpertAppMgt')),
                }}
              />
            ),
          },
          {
            path: 'ExpertInformationMgt',
            label: '전문가정보관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ExpertMgt/ExpertInformationMgt')),
                }}
              />
            ),
          },
          {
            path: 'ExpertStatusInquiry',
            label: '전문가현황조회',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ExpertMgt/ExpertStatusInquiry')),
                }}
              />
            ),
          },
          {
            path: 'ExpertClassificationMgt',
            label: '전문가분류관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ExpertMgt/ExpertClassificationMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'SatisfaSurveyMgt',
        label: '만족도조사관리',
        children: [
          {
            path: 'SatisfaSurveyMgt',
            label: '만족도조사관리',
            element: (
              <Loader
                route={{
                  label: 'SatisfaSurveyMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/MemberMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'ParticipationEventMgt',
        label: '참여/이벤트관리',
        children: [
          {
            path: 'StepMgt',
            label: '디딤널관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/StepMgt')),
                }}
              />
            ),
          },
          {
            path: 'ResourceInfmtSharMgt',
            label: '자원정보공유관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/ResourceInfmtSharMgt')),
                }}
              />
            ),
          },
          {
            path: 'EventEventMgt',
            label: '행사/이벤트관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/ParticipationEventMgt/EventEventMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'SiteMgt',
        label: '사이트관리',
        children: [
          {
            path: 'HomePopUpWindowMgt',
            label: '홈팝업창관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/SiteMgt/HomePopUpWindowMgt')),
                }}
              />
            ),
          },
          {
            path: 'HomeBannerMgt',
            label: '홈배너관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/SiteMgt/HomeBannerMgt')),
                }}
              />
            ),
          },
          {
            path: 'TermsAndConditionsMgt',
            label: '약관관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/SiteMgt/TermsAndConditionsMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'CustomerSupportMgt',
        label: '고객지원관리',
        children: [
          {
            path: 'FrequentlyAskedQut',
            label: '자주묻는질문관리',
            layout: 'studio',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut')),
                }}
              />
            ),
          },
          {
            path: 'UserManualMgt',
            label: '사용자 매뉴얼관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/CustomerSupportMgt/UserManualMgt')),
                }}
              />
            ),
          },
          {
            path: 'ArchiveMgt',
            label: '자료실관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/CustomerSupportMgt/ArchiveMgt')),
                }}
              />
            ),
          },
          {
            path: '1_1InquiryMgt',
            label: '1:1문의관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/CustomerSupportMgt/OnebyOneInquiryMgt')),
                }}
              />
            ),
          },
          {
            path: 'NoticeInfoMgt',
            label: '공지사항관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/CustomerSupportMgt/NoticeInfoMgt')),
                }}
              />
            ),
          },
          {
            path: 'ManagerNoticeMgt',
            label: '관리자공지사항관리',
            element: (
              <Loader
                route={{
                  label: 'OperationMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'MemberMgt',
        label: '회원관리',
        children: [
          {
            path: 'MemberMgt',
            label: '회원관리',
            element: (
              <Loader
                route={{
                  label: 'MemberMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/MemberMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'StatsLogs',
        label: '통계/로그',
        children: [
          {
            path: 'CompanyStatus',
            label: '기업현황',
            element: (
              <Loader
                route={{
                  label: 'StatsLogs',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/StatsLogs/CompanyStatus')),
                }}
              />
            ),
          },
          {
            path: 'UserStatus',
            label: '사용자현황',
            element: (
              <Loader
                route={{
                  label: 'StatsLogs',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/StatsLogs/UserStatus')),
                }}
              />
            ),
          },
          {
            path: 'ProSupportStatus',
            label: '사업지원현황',
            element: (
              <Loader
                route={{
                  label: 'StatsLogs',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/StatsLogs/ProSupportStatus')),
                }}
              />
            ),
          },
          {
            path: 'DemEquipmentUseStus',
            label: '실증장비이용현황',
            element: (
              <Loader
                route={{
                  label: 'StatsLogs',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/StatsLogs/DemEquipmentUseStus')),
                }}
              />
            ),
          },
          {
            path: 'LogStatus',
            label: '로그현황',
            element: (
              <Loader
                route={{
                  label: 'StatsLogs',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/OperationMgt/StatsLogs/LogStatus')),
                }}
              />
            ),
          }]
      },
    ]
  },
  {
    path: 'SystemMgt',
    label: '시스템관리',
    children: [
      {
        path: 'ManagerMgt',
        label: '관리자관리',
        children: [
          {
            path: 'AdministratorAccountMgt',
            label: '관리자계정관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/ManagerMgt/AdministratorAccountMgt')),
                }}
              />
            ),
          },
          {
            path: 'MenuMgt',
            label: '전자협약관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/ManagerMgt/MenuMgt')),
                }}
              />
            ),
          },
          {
            path: 'ProgramMgt',
            label: '프로그램관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/ManagerMgt/ProgramMgt')),
                }}
              />
            ),
          },
          {
            path: 'PermissionMgt',
            label: '권한관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/ManagerMgt/PermissionMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'BulletinBoardMgt',
        label: '게시판관리',
        children: [
          {
            path: 'BulletinBoardMgt',
            label: '게시판관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/BulletinBoardMgt/BulletinBoardMgt')),
                }}
              />
            ),
          },
          {
            path: 'InquiryBoardMgt',
            label: '문의게시판관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/BulletinBoardMgt/InquiryBoardMgt')),
                }}
              />
            ),
          }]
      },
      {
        path: 'CodeMgt',
        label: '코드관리',
        children: [
          {
            path: 'CommonCodeMgt',
            label: '공통코드관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/CodeMgt/CommonCodeMgt')),
                }}
              />
            ),
          },
          {
            path: 'HolidayMgt',
            label: '휴일관리',
            element: (
              <Loader
                route={{
                  label: 'SystemMgt',
                  layout: 'studio',
                  element: React.lazy(() => import('~/pages/SystemMgt/CodeMgt/HolidayMgt')),
                }}
              />
            ),
          }]
      },
    ]
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
          label: 'signin',
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
      route={middleware(
        {
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignIn/IdTrouver')),
        },
        ['auth']
      )}
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
      route={middleware(
        {
          label: 'home',
          layout: 'studio',
          element: React.lazy(() => import('~/pages/SignIn/Factor')),
        },
        ['auth']
      )}
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
  }
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
  {
    path: 'mypage',
    element: (
      <Loader
        route={middleware(
          {
            label: 'mypage',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/Mypage')),
          },
          ['auth', 'factor']
        )}
      />
    ),
  }
];

export const ReferenceRoutes: RouteType[] = [];

function Loader({ route }: { route: RouteType }) {
  const View = route.element;
  return (
    <Suspense fallback={<div>loading.... check your chrome DevTool console</div>}>
      <Layout name={route.layout!} label={route.label!} middleware={route.middleware}>
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
          route={middleware({
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/Home')),
          },['auth'])}

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

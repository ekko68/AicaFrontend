import {Loader, middleware, RouteType} from "shared/utils/RouteUtiles";
import React from "react";


export const MainRoutes: RouteType[] = [
  {
      path: '/tsp-admin',
    index: true,
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/Dashboard/Dashboard")),
          },
          ['auth']
        )}
      />
    ),
  }, {
    path: '/tsp-admin/EquipmentMgt/InfomationMgt/:id',
    label: '장비정보상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/EquipmentMgt/InfomationMgt/EquipmentInformationDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp-admin/EquipmentMgt/EquipmentRegist',
    label: '장비등록',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/EquipmentMgt/EquipmentRegist")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp-admin/UseMgt/ResourceMgt/ApplyMgt/:id',
    label: '실증자원신청상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ApplyResourceDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/ResourceMgt/ApplyMgt/ApplyResourceMgtDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp-admin/UseMgt/ResourceMgt/UseMgt/:id',
    label: '실증자원사용상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'UseResourceDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/ResourceMgt/UseMgt/UseResourceMgtDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp-admin/UseMgt/EquipmentMgt/EstimationMgt/:id',
    label: '견적 요청 관리 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'EstimationMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/EquipmentMgt/EstimationMgt/UseEquipmentEstimationDetail")),
          },
          []
        )}
      />
    )
  }, {
    path: '/tsp-admin/UseMgt/EquipmentMgt/UseMgt/:id',
    label: '장비 사용 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'EquipmentUseMgtDetail',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/EquipmentMgt/UseMgt/UseEquipmentMgtDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp-admin/UseMgt/EquipmentMgt/ApplyMgt/:id',
    label: '장비신청 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/EquipmentMgt/ApplyMgt/UseEquipmentApplyDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/tsp-admin/UseMgt/EquipmentMgt/PeriodExtendMgt/:id',
    label: '기간 연장 신청 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/EquipmentMgt/PeriodExtendMgt/UseEquipmentPeriodExtendDetail")),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/tsp-admin/UseMgt/EquipmentMgt/ReportMgt/:id',
    label: '결과보고서 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'adminLayout',
            element: React.lazy(() => import("../pages/UseMgt/EquipmentMgt/ReportMgt/UseEquipmentReportDetail")),
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
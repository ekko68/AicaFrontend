import React from "react";
import {Loader, middleware, RouteType} from "shared/utils/RouteUtiles";
import ApplyEstimationSelect from "../pages/Apply/Estimation/ApplyEstimationSelect";

export const MainRoutes: RouteType[] = [
  {
      index: true,
      path: '/tsp',
    element: (
      <Loader
        route={middleware(
          {
            label: 'Home',
            layout: 'basic',
            element: React.lazy(() => import('../pages/Home')),
          },
          []
        )}
      />
    ),
  },
  {
    path: '/tsp/Apply/Estimation/ApplyEstimation/:id',
    label: '장비견적신청',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Apply/Estimation/ApplyEstimation/ApplyEstimation")),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/tsp/Apply/Equipment/UseEquipmentApply/:id',
    label: '장비사용 신청',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Apply/Equipment/UseEquipmentApply/UseEquipmentApply")),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/tsp/About/Notice/:id',
    label: '',
    element: (
      <Loader
        route={middleware(
          {
            label: 'dashboard',
            layout: 'basic',
            element: React.lazy(() => import("../pages/About/Notice/AboutNoticeDetail/AboutNoticeDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp/Info/Equipment/:id',
    label: '실증장비소개',
    element: (
      <Loader
        route={middleware(
          {
            label: 'InfoEquipment',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Info/Equipment/EquipmentDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp/About/FAQ/:id',
    label: '자주묻는질문',
    element: (
      <Loader
        route={middleware(
          {
            label: 'AboutFAQDetail',
            layout: 'basic',
            element: React.lazy(() => import("../pages/About/FAQ/AboutFAQDetail")),
          },
          []
        )}
      />
    ),
  }, {
    path: '/tsp/Mypage/Estimation/MyPageEstimationDetail/:id',
    label: '견적요청상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'InfoEquipment',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Mypage/Estimation/MyPageEstimationDetail")),
          },
          ['auth']
        )}
      />
    ),
  }, {
    path: '/tsp/Apply/Estimation/:id',
    label: '견적신청장비상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ApplyEstimationDetail',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Apply/Estimation/ApplyEstimationSelect")),
          },
          ['auth']
        )}
      />
    )
  }, {
    path: '/tsp/Apply/Equipment/:id',
    label: '장비사용장비상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'ApplyEquipmentDetail',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Apply/Equipment/ApplyEquipmentSelect")),
          },
          ['auth']
        )}
      />
    ),
  }, {
    path: '/tsp/Mypage/Resource/MyPageResourceDetail/:id',
    label: '실증자원사용상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'InfoEquipment',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Mypage/Resource/MyPageResourceDetail")),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/tsp/Apply/Resource/ApplyResource',
    label: '실증자원사용상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'InfoEquipment',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Apply/Resource/ApplyResource")),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/tsp/Mypage/Equipment/:id',
    label: '마이페이지 장비사용 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'MyPageEquipmentDetail',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail")),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/tsp/Mypage/Equipment/ApplyPeriodExtension',
    label: '마이페이지 장비사용 상세 기간 연장 신청',
    element: (
      <Loader
        route={middleware(
          {
            label: 'MyPageEquipmentDetail',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Mypage/Equipment/ApplyPeriodExtension")),
          },
          ['auth']
        )}
      />
    ),
  },
  {
    path: '/Banner',
    label: 'Banner',
    element: (
      <Loader
        route={middleware(
          {
            label: 'Banner',
            layout: 'basic',
            element: React.lazy(() => import("../pages/Temp/BannerTemp")),
          },
          []
        )}
      />
    ),
  },
  // {
  //   path: '/Font',
  //   label: 'fontTest',
  //   element: (
  //     <Loader
  //       route={middleware(
  //         {
  //           label: 'fontTest',
  //           layout: 'empty',
  //           element: React.lazy(() => import("../pages/Home/Font")),
  //         },
  //         []
  //       )}
  //     />
  //   ),
  // },
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
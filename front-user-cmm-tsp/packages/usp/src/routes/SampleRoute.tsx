import React from 'react';
import { Loader } from '~/DynamicRouter';
import { RouteType } from '~/models/RouteType';

// 셈플 라우트
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
].map((route: Partial<RouteType>) => ({
  ...route,
  layout: 'space',
})) as RouteType[];
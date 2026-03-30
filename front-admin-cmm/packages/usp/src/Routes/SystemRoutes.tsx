import React from 'react';
import { RouteType } from '~/DynamicRouter';
import { Loader, middleware } from 'shared/utils/RouteUtiles';

export const SystemRoutes: RouteType[] = [
  {
    path: 'adminAdd',
    label: '관리자 추가',
    element: (
      <Loader
        route={middleware(
          {
            label: 'admin',
            layout: 'adminLayout',
            element: React.lazy(
              () => import('~/pages/SystemMgt/ManagerMgt/Administrator/Add')
            ),
          },
          []
        )}
      />
    ),
  },
  {
    path: 'adminDetail/:id',
    label: '관리자 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'admin',
            layout: 'adminLayout',
            element: React.lazy(
              () => import('~/pages/SystemMgt/ManagerMgt/Administrator/Detail')
            ),
          },
          []
        )}
      />
    ),
  },
  {
    path: 'bulletinAdd',
    label: '게시판 추가',
    element: (
      <Loader
        route={middleware(
          {
            label: 'board',
            layout: 'adminLayout',
            element: React.lazy(
              () => import('~/pages/SystemMgt/BulletinBoardMgt/Bulletin/Add')
            ),
          },
          []
        )}
      />
    ),
  },
  {
    path: 'bulletinDetail/:id',
    label: '게시판 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'board',
            layout: 'adminLayout',
            element: React.lazy(
              () => import('~/pages/SystemMgt/BulletinBoardMgt/Bulletin/Detail')
            ),
          },
          []
        )}
      />
    ),
  },
  {
    path: 'inquiryAdd',
    label: '문의게시판 추가',
    element: (
      <Loader
        route={middleware(
          {
            label: 'board',
            layout: 'adminLayout',
            element: React.lazy(
              () => import('~/pages/SystemMgt/BulletinBoardMgt/Inquiry/Add')
            ),
          },
          []
        )}
      />
    ),
  },
  {
    path: 'inquiryDetail/:id',
    label: '문의게시판 상세',
    element: (
      <Loader
        route={middleware(
          {
            label: 'board',
            layout: 'adminLayout',
            element: React.lazy(
              () => import('~/pages/SystemMgt/BulletinBoardMgt/Inquiry/Detail')
            ),
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

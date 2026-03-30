import React from "react";
import {RouteType} from "~/DynamicRouter";
import {Loader, middleware} from "shared/utils/RouteUtiles";

export const MainRoutes: RouteType[] = [
  {
    index: true,
    element: (
      <Loader
        route={middleware(
          {
            label: 'home',
            layout: 'adminLayout',
            element: React.lazy(() => import('~/pages/Home')),
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
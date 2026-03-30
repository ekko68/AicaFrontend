import React from "react";
import {RouteType} from "../../../shared/src/utils/RouteUtiles";
import {Loader, middleware} from "shared/utils/RouteUtiles";

export const MainRoutes: RouteType[] = [
  {
    index: true,
    element: (
      <Loader
        route={middleware(
          {
            label: 'home',
            layout: 'studio',
            element: React.lazy(() => import('~/pages/Home')),
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
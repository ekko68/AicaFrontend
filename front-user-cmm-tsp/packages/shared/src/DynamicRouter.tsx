import * as R from 'ramda';
import React, {Suspense, useEffect, useState} from 'react';
import {useRoutes, useLocation} from 'react-router-dom';
import NotFound from 'shared/NotFound';
import useSWR, {mutate} from 'swr';
import api from "./api";
import {Loader, middleware, RouteData, RouteType} from "./utils/RouteUtiles";
import {useRouteStore} from "./store/RouteConfigStore";
import {useQuery} from "react-query";
import {AxiosGet} from "./libs/axios";
import {reduce} from "ramda";
import {isTspPortal} from "./utils/validUtil";

type PortalType = "PORTAL_UAM" | "PORTAL_TSP" | "PORTAL_TAM";

interface IDynamicRouter {
  addRoutes?: RouteType[],
  portalType: PortalType,
}

interface Root {
  children: RouteData[]
}

export function DynamicRouter({addRoutes, portalType}: IDynamicRouter) {
  const [loading, setLoading] = useState(false)
  const routeStore = useRouteStore()
  const url = `/member/api/auth/menus/${portalType}/me`
  const memberUrl = process.env.REACT_APP_MODE == 'dev' ?
    `${process.env.REACT_APP_DOMAIN_MEMBER_DEV}` : `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}`

  const portal = useQuery('portal', () => AxiosGet(url, undefined, {
    baseURL: memberUrl
  }))
  useEffect(() => {
    if (!portal.isLoading && !portal.isFetching) {
      if (!!portal.data) {
        const data = process.env.REACT_APP_MODE == 'dev'? portal.data : portal.data.list
        const routes = hierarchy(data)
        routeStore.setRoutes(routes)
        setLoading(true)
      }
    }
  }, [portal.data, portal.isLoading, portal.isFetching])

  if (!loading) return <div/>
  // if (!data) return <div/>;
  // const routes = hierarchy(data);
  // console.log('hierarchy - ' + JSON.stringify(routes))
  // if (routes.length != routeStore.routes.length)
  //   routeStore.setRoutes(routes)
  // console.log('routeStore - ' + JSON.stringify(routeStore.routes))
  // mutate('route://service', routes);

  return <Routes addRoutes={addRoutes} routes={routeStore.routes}/>;
}

const flatten = (routes: any) => {
  const res = routes.reduce((a: any, b: any) => {
    const {children = []} = b;
    const c = R.omit(['children'])(b);

    const d = flatten(children);

    return [...a, c, ...d];
  }, []);
  return res;
};

const adaptor = (routes: any) => {
  return routes.map((route: any) => {
    const {label, path} = route;
    const config = useRouteStore();
    // console.log("[JJBAE] route ==> "+JSON.stringify(route))
    // console.log("[JJBAE] path ==> "+path)
    const rootPath = isTspPortal? '/tsp' : ''

    return {
      label,
      path: `${rootPath}${path}`,
      element: (
        <Loader
          route={middleware({
            layout: config.defaultLayout,
            //* path 컴포넌트
            element: React.lazy(() => import(`~/pages${path}`)),
          }, [])}
        />
      ),
    };
  });
};


function Routes({routes, addRoutes}: any) {
  const [menus, setMenus] = useState(R.pipe(flatten, adaptor)(routes))
  const nav = useRoutes([
    ...addRoutes,
    ...menus,
    {
      path: '*',
      element: <NotFound/>,
    },
  ]);

  return nav;
}

//* 1차원 배열을 계층 구조로 변환
function hierarchy(list: any) {

  //* 객체 복사
  const record: any[] = R.pipe(JSON.stringify, JSON.parse)(list);

  let map = record.reduce((a, b, i) => ({...a, [b.menuId]: i}), {});

  let root: Root = {children: []};

  //* 계층 생성
  record.forEach((item) => {
    item.path = `${item.url}`.replace(/\/\//g, '/');
    item.label = item.menuNm;
    if (item.parentMenuId === "ROOT") {
      root.children.push(item)
    } else if (!R.isNil(item.parentMenuId)) {
      // @ts-ignore
      const el = record[map[item.parentMenuId]];

      if (R.isNil(el.children)) el.children = [];

      el.children.push(item);
    }
  });

  return root.children;
}

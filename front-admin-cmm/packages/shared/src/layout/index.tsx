import React, {Fragment, lazy, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import authentication, {AuthenticationType} from 'shared/authentication';
import ExtendValidTime from 'shared/components/ExtendValidTime';
import dayjs from 'shared/libs/dayjs';
import useSWR from 'swr';
import fetchRefreshToken from '../fetches';
import AdminLayout from "./AdminLayout/AdminLayout";
import Studio from "./Studio";
import Space from "./Space";
import Empty from "./Empty";
import {useRouteStore} from "../Store/RouteConfig";

export type LayoutType = 'studio' | 'promotion' | 'space' | 'paper' | 'empty' | 'adminLayout';

const Layout: React.FC = props => {
  const navigate = useNavigate()
  // const {data} = useSWR<AuthenticationType>('authentication');
  const config = useRouteStore()

  //* 토근 갱신
  const handleRefresh = () => {
    fetchRefreshToken().then((res) => authentication.set(res.data));
  };

  //* 토큰 만료
  const handleExpired = () => {
    // window.location.href = '/signout';
  };

  const syncNavigate = () => {
    //* 마지막으로 업데이트 한 시간으로 부터 2초 이상 이면 갱신
    const data = authentication.get()
    if (!!data && dayjs().diff(data!.updateAt, 's') > 1) {
      handleRefresh();
    }
  };

  useEffect(syncNavigate, [navigate]);

  useEffect(() => {
    if (config.middleware.includes("auth") && !authentication.getToken()) {
      const path = `${process.env.REACT_APP_PROJECT}` == 'usp' ? '/' : '/tsp_admin/'
      navigate(`${path}signin?nextUrl=${window.btoa(window.location.href)}`)
    }
  }, [config.middleware]);


  if (config.middleware.includes('factor')) {
    const key = sessionStorage.getItem('__FACTOR_KEY__');
    if (!key) {
      // window.location.href = `/factor?nextUrl=${window.btoa(
      //   window.location.href
      // )}`;
      navigate(`/factor?nextUrl=${window.btoa(window.location.href)}`)
    }
  }

  const type = config.layout.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
  const Component: any = {Studio, Space, Empty, AdminLayout}[type];

  return <Fragment>
    <Component>{props.children}</Component>
    <ExtendValidTime onRefresh={handleRefresh} onExpired={handleExpired}/>
  </Fragment>
}

export default Layout;

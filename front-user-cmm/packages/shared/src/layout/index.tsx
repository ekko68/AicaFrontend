import React,{ Fragment, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authentication, { AuthenticationType } from 'shared/authentication';
import ExtendValidTime from 'shared/components/ExtendValidTime';
import dayjs from 'shared/libs/dayjs';
import Studio from "./Studio";
import Space from "./Space";
import Empty from "./Empty";
import Basic from "./Basic";
import { fetchRefreshToken } from '../fetches';
import {useRouteStore} from "../store/RouteConfigStore";

export type LayoutType = 'studio' | 'promotion' | 'space' | 'paper' | 'empty' | 'basic';

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
    navigate('signin/signout');
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
      // navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
      window.location.href = `http://125.6.37.87/signin?nextUrl=${window.btoa(window.location.href)}`
    }
  },[config.middleware])

  if (config.middleware.includes('factor')) {
    const key = sessionStorage.getItem('__FACTOR_KEY__');
    if (!key) {
      navigate(`signin/factor?nextUrl=${window.btoa( window.location.href)}`)
    }
  }

  const type = config.layout.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
  const Component: any = {Studio, Space, Empty, Basic}[type];

  return <Fragment>
    <Component>{props.children}</Component>
    <ExtendValidTime onRefresh={handleRefresh} onExpired={handleExpired}/>
  </Fragment>
}

export default Layout;

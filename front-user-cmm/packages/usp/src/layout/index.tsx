import React,{ Fragment, lazy, useEffect } from 'react';
// import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import authentication, { AuthenticationType } from 'shared/authentication';
import ExtendValidTime from 'shared/components/ExtendValidTime';
import dayjs from 'shared/libs/dayjs';
import useSWR from 'swr';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { fetchRefreshToken, fetchSignOut } from '~/fetches';
import { PropsType} from '~/models/RouteType';

const Studio = lazy(() => import('./Studio'));
const Space = lazy(() => import('./Space'));
const Empty = lazy(() => import('./Empty'));

export const ThemeContext = React.createContext({label:""});

function Layout({ name, label, middleware = [], children }: PropsType) {
  
  const navigate = useNavigate();
  const { data } = useSWR<AuthenticationType>('authentication');
  const type = name.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
  //* 토근 갱신
  const handleRefresh = () => {
    fetchRefreshToken().then((res) => authentication.set(res.data));
  };

  //* 토큰 만료
  const handleExpired = async () => {
    await fetchSignOut();
    authentication.remove();
    window.sessionStorage.removeItem('__FACTOR_KEY__');
    navigate('/');
  };

  const syncNavigate = () => {
    //* 마지막으로 업데이트 한 시간으로 부터 2초 이상 이면 갱신
    if (!!data && dayjs().diff(data!.updateAt, 's') > 1) {
      handleRefresh();
    }
    if (!window.location.pathname.includes('MemberInfoMdf')) {
      sessionStorage.removeItem('__FACTOR_KEY__')
    }
  };

  useEffect(syncNavigate, [navigate]);
  
  if (middleware.indexOf('auth') > -1 && !data?.accessToken) {
    window.location.href = `/signin?nextUrl=${window.btoa(window.location.href)}`
    return <div />;
  }

  if (middleware.indexOf('factor') > -1 && data?.accessToken) {
    // window.sessionStorage.removeItem('__FACTOR_KEY__');
    const key = sessionStorage.getItem('__FACTOR_KEY__');
    if (!key) {
      window.location.href = `/factor?nextUrl=${window.btoa( window.location.href)}`
    }
  }

  const Component: any = { Studio, Space, Empty }[type];
  return (
    <Fragment>
      <ThemeContext.Provider value={{label:label}}>
        <Component label={label} >{children}</Component>
      </ThemeContext.Provider>
      <ExtendValidTime onRefresh={handleRefresh} onExpired={handleExpired} />
    </Fragment>
  );
}

export default Layout;

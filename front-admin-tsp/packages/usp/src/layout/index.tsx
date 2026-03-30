import React,{ Fragment, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authentication, { AuthenticationType } from 'shared/authentication';
import ExtendValidTime from 'shared/components/ExtendValidTime';
import dayjs from 'shared/libs/dayjs';
import useSWR from 'swr';
import { fetchRefreshToken } from '~/fetches';
export type LayoutType = 'studio' | 'promotion' | 'space' | 'paper';

type PropsType = {
  name: LayoutType;
  label: string;
  middleware?: string[];
  children: any;
};

const Studio = lazy(() => import('./Studio'));
const Space = lazy(() => import('./Space'));

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
  const handleExpired = () => {
    window.location.href = '/signout';
  };

  const syncNavigate = () => {
    //* 마지막으로 업데이트 한 시간으로 부터 2초 이상 이면 갱신
    if (!!data && dayjs().diff(data!.updateAt, 's') > 1) {
      handleRefresh();
    }
  };

  useEffect(syncNavigate, [navigate]);

  if (middleware.indexOf('auth') > -1 && !data?.accessToken) {
    window.location.href = `/signin?nextUrl=${window.btoa(
      window.location.href
    )}`;
    return <div />;
  }

  if (middleware.indexOf('factor') > -1) {
    const key = sessionStorage.getItem('__FACTOR_KEY__');
    if (!key) {
      window.location.href = `/factor?nextUrl=${window.btoa(
        window.location.href
      )}`;
    }
  }

  const Component: any = { Studio, Space }[type];
  return (
    <Fragment>
      <ThemeContext.Provider value={{label:label}}>
        <Component>{children}</Component>
      </ThemeContext.Provider>
      <ExtendValidTime onRefresh={handleRefresh} onExpired={handleExpired} />
    </Fragment>
  );
}

export default Layout;

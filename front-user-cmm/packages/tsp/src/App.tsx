import {debounce, LinearProgress, ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from 'shared/ErrorBoundary';
import theme from 'shared/theme';
import {QueryClient, QueryClientProvider} from "react-query";
import {LicenseInfo} from "@mui/x-license-pro";
import React, {useEffect, Suspense, useState, useCallback} from "react";
import {DynamicRouter} from "shared/DynamicRouter";
import Layout from "shared/layout";
import {useRouteStore} from "shared/store/RouteConfigStore";
import {GlobalModals} from "shared/components/GlobalModals";
import {MainRoutes} from "~/routes/MainRoutes";
import {SignRoutes} from "~/routes/SignRoutes";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";

LicenseInfo.setLicenseKey('4710a3119913b38e70c5bdde0aad559eT1JERVI6NDMwNTgsRVhQSVJZPTE2ODMyNTE3MDAwMDAsS0VZVkVSU0lPTj0x');
//LicenseInfo.setLicenseKey(`${process.env.REACT_APP_X_LICENSE_PRO}`);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  }
});

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const App = () => {
  const routeStore = useRouteStore()
  const configStore = useGlobalConfigStore()

  const handlerResize = useCallback((e) => {
    configStore.setDevice(isMobileDevice()? 'mobile' : 'pc')
    const isDesktop = isMobileDevice()? window.screen.width> 768 : window.innerWidth > 768
    if (configStore.isDesktop != isDesktop)
      configStore.setScreenMode(isDesktop)
  }, [window.innerWidth])

  useEffect(() => {
    window.addEventListener("resize", handlerResize)
    return () => {
      window.removeEventListener("resize", handlerResize)
    }
  }, [handlerResize])

  useEffect(() => {

    configStore.setDevice(isMobileDevice()? 'mobile' : 'pc')
    routeStore.setMemberServer(`${process.env.REACT_APP_DOMAIN_MEMBER_DEV}`)
    routeStore.setLayout('basic')
    routeStore.setDefaultLayout('basic')
  }, [])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Layout>
                <DynamicRouter
                  portalType={"PORTAL_TSP"}
                  addRoutes={[
                    ...MainRoutes,
                    ...SignRoutes
                  ]}/>
              </Layout>
            </BrowserRouter>
          <GlobalModals/>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

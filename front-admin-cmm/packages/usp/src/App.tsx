import {ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from 'shared/ErrorBoundary';
import theme from 'shared/theme';
// import 'styles/admin.scss';
import {DynamicRouter} from 'shared/DynamicRouter';
import {UtilityRoutes} from '~/Routes/UtilityRoutes';
import {MainRoutes} from '~/Routes/MainRoutes';
import {LicenseInfo} from "@mui/x-license-pro";
import Layout from "shared/layout";
import {useRouteStore} from "shared/Store/RouteConfig";
import {useEffect} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {OperationMgtRoutes} from "~/Routes/OperationMgtRoutes";
import {SystemRoutes} from '~/Routes/SystemRoutes';
import {ConventionMgtRoutes} from "~/Routes/ConventionMgtRoutes";
import {GlobalModals} from "~/pages/GlobalModal";

LicenseInfo.setLicenseKey(`${process.env.REACT_APP_X_LICENSE_PRO}`);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  }
});

function App() {
  const config = useRouteStore();

  useEffect(() => {
    config.setLayout('adminLayout')
    config.setDefaultLayout('adminLayout')
  }, [])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout>
              <DynamicRouter
                portalType={'PORTAL_UAM'}
                addRoutes={[
                  ...MainRoutes,
                  ...UtilityRoutes,
                  ...OperationMgtRoutes,
                  ...SystemRoutes,
                  ...ConventionMgtRoutes
                ]}
              />
            </Layout>
          </BrowserRouter>
          <GlobalModals/>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

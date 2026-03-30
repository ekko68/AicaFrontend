import {ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from 'shared/ErrorBoundary';
import theme from 'shared/theme';
import 'styles/admin.scss';
import {DynamicRouter} from 'shared/DynamicRouter';
import {UtilityRoutes} from '~/Routes/UtilityRoutes';
import {MainRoutes} from '~/Routes/MainRoutes';
import {LicenseInfo} from "@mui/x-license-pro";
import Layout from "shared/layout";

LicenseInfo.setLicenseKey('4710a3119913b38e70c5bdde0aad559eT1JERVI6NDMwNTgsRVhQSVJZPTE2ODMyNTE3MDAwMDAsS0VZVkVSU0lPTj0x');

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <DynamicRouter
              portalType={'PORTAL_UAM'}
              addRoutes={[...MainRoutes, ...UtilityRoutes]}
            />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

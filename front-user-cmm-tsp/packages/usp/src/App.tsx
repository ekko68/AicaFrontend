import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import ErrorBoundary   from 'shared/ErrorBoundary';
import theme from 'shared/theme';
import DynamicRouter from './DynamicRouter';
import 'styles/index.scss';
import 'styles/community.scss';
import {LicenseInfo} from "@mui/x-license-pro";
import { GlobalModals } from "./pages/store/GlobalModals";
import { useGlobalModalStore } from './pages/store/GlobalModalStore';
LicenseInfo.setLicenseKey(`${process.env.REACT_APP_X_LICENSE_PRO}`);

// react query config default ..
const App = () => {
  const {addModal} = useGlobalModalStore();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retryOnMount:false,
        retry: false,
        // onError: (err: any) =>{
        //   console.log(err)
        // }
      }
    }
  });

  return (
   <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <DynamicRouter/>
          </BrowserRouter>
          <GlobalModals/>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

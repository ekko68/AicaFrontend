// 참여이벤트/ ->  자원정보공유 페이지
import React from "react"
// import * as styles from './styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline,Container} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const theme = createTheme();
function ResourceInfoSharing() {

  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <h1>자원정보공유</h1>
      </Container>
    </ThemeProvider>
  );
}

export default ResourceInfoSharing;

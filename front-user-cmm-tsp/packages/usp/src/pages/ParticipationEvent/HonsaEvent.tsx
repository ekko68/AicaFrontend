// 참여이벤트/ ->  행사/이벤트 페이지
import React from "react"
// import * as styles from './styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline,Container} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const theme = createTheme();
function HonsaEvent() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <h1>행사/이벤트</h1>
      </Container>
    </ThemeProvider>
  );
}

export default HonsaEvent;

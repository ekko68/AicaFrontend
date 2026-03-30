// 사업정보관리/ -> 사업현황관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function BusStatusMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>사업현황관리</h1>
      </Container>
  );
}

export default BusStatusMgt;

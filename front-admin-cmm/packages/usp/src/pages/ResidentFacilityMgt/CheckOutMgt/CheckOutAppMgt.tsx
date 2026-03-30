// 입퇴실관리/ ->  퇴실신청관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function CheckOutAppMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>퇴실신청관리</h1>
      </Container>
  );
}

export default CheckOutAppMgt;

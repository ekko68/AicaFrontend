// 운영관리/ ->  전문가관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function ExpertMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>회원관리</h1>
      </Container>
  );
}

export default ExpertMgt;
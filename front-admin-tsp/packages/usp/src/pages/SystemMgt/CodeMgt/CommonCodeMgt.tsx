// 코드관리/ ->  공통코드관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function CommonCodeMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>자원할당재고관리</h1>
      </Container>
  );
}

export default CommonCodeMgt;

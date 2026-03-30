// 고객지원관리/ ->  고객지원관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function CustomerSupportMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>고객지원관리</h1>
      </Container>
  );
}

export default CustomerSupportMgt;
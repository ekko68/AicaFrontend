// 코드관리/ ->  코드관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function CodeMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>코드관리</h1>
      </Container>
  );
}

export default CodeMgt;
// 시스템관리/ ->  프로그램관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function ProgramMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>프로그램관리</h1>
      </Container>
  );
}

export default ProgramMgt;

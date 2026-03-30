// 시스템관리/ ->  관리자관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function ManagerMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>관리자관리</h1>
      </Container>
  );
}

export default ManagerMgt;

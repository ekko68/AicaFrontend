// 시스템관리/ ->  권한관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function PermissionMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>권한관리</h1>
      </Container>
  );
}

export default PermissionMgt;

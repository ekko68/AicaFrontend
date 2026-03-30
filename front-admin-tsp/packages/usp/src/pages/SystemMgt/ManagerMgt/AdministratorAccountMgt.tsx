// 시스템관리/ ->  관리자계정관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function AdministratorAccountMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>관리자계정관리</h1>
      </Container>
  );
}

export default AdministratorAccountMgt;
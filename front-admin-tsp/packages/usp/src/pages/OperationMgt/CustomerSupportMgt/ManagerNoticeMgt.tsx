// 고객지원관리/ ->  관리자공지사항관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function ManagerNoticeMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>관리자공지사항관리</h1>
      </Container>
  );
}

export default ManagerNoticeMgt;
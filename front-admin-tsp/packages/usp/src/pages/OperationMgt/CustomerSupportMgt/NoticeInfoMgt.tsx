// 고객지원관리/ ->  공지사항관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function NoticeInfoMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>공지사항관리</h1>
      </Container>
  );
}

export default NoticeInfoMgt;
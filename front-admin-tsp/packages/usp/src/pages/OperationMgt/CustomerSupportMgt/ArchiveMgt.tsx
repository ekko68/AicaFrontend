// 고객지원관리/ ->  자료실관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function ArchiveMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>자료실관리</h1>
      </Container>
  );
}

export default ArchiveMgt;
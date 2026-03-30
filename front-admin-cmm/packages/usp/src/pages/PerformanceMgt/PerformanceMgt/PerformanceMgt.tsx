// 이용지원/ ->  자료실 페이지
import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function PerformanceMgt() {
  return (
      <Container component="main" maxWidth="xs"  css={styles.container}>
        <CssBaseline />
        <h1>자료실</h1>
      </Container>
  );
}

export default PerformanceMgt;

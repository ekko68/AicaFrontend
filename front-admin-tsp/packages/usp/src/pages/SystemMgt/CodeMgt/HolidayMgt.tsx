// 코드관리/ ->  휴일관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function HolidayMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>자원할당현황조회</h1>
      </Container>
  );
}

export default HolidayMgt;

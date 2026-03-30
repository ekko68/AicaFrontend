// 통계/로그/ ->  기업현황 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function CompanyStatus() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>기업현황</h1>
      </Container>
  );
}

export default CompanyStatus;
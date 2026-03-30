// 통계/로그/ ->  통계/로그 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function StatsLogs() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>통계/로그</h1>
      </Container>
  );
}

export default StatsLogs;
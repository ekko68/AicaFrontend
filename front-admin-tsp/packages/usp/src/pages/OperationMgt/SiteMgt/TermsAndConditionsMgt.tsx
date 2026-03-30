// 사이트관리/ ->  약관관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function TermsAndConditionsMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>약관관리</h1>
      </Container>
  );
}

export default TermsAndConditionsMgt;
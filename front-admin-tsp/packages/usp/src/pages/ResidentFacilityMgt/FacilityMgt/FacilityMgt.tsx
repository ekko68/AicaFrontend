// 입주시설관리/ ->  시설관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function FacilityMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>시설관리</h1>
      </Container>
  );
}

export default FacilityMgt;

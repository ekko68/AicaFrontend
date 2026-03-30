// 사이트관리/ ->  홈팝업창관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function HomePopUpWindowMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>홈팝업창관리</h1>
      </Container>
  );
}

export default HomePopUpWindowMgt;
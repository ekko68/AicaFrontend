// 사이트관리/ ->  홈배너관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function HomeBannerMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>홈배너관리</h1>
      </Container>
  );
}

export default HomeBannerMgt;
// 게시판관리/ ->  게시판관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function BulletinBoardMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>게시판관리</h1>
      </Container>
  );
}

export default BulletinBoardMgt;
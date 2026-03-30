// 이용지원/ ->  사용자메뉴얼 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function UserManual() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>사용자메뉴얼</h1>
      </Container>
  );
}

export default UserManual;

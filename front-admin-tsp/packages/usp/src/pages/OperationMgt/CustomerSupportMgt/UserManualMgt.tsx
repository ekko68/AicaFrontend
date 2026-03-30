// 고객지원관리/ ->  사용자 매뉴얼관리 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
function UserManualMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>사용자 매뉴얼관리</h1>
      </Container>
  );
}

export default UserManualMgt;
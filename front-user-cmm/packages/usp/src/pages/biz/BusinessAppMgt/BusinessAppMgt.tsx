// 사업신청관리/menu-PMS010000 -> 사업신청관리 root
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function BusinessAppMgt() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>사업신청관리(root) : menu-PMS010000 </h1>
      </Container>
  );
}

export default BusinessAppMgt;
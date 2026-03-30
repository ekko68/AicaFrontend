// 과제관리 -> 과제관리
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function TaskManagement() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>과제관리</h1>
      </Container>
  );
}

export default TaskManagement;
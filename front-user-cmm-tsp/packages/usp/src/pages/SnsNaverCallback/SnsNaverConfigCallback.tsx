/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// 네이버 설정  콜백페이지
const SnsNaverConfigCallback = () => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      let naver_id_login:any = new window.naver_id_login(`${process.env.REACT_APP_CLIENT_ID_NAVER_AICA}`, `${process.env.REACT_APP_NAVER_CONF_CALLBACK}`);
      window.opener.setNaver(naver_id_login.oauthParams.access_token);
      window.close();
    }
  }, []);
  return (
    <section>
      <Box sx={{ display: 'flex',mt:25,ml:18 }} component='span'>
        <CircularProgress />
      </Box>
    </section>
  );
}

export default SnsNaverConfigCallback;

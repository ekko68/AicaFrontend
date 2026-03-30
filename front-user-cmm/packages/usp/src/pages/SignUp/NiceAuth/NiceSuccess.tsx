import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';


/* 
회면ID    :   todo...
화면명    :   nice 인증 리다이렉트 성공 페이지
작성일    :   2022/06/15
화면/개발 :   navycui
*/

const NiceSuccess = () => {
	const url = new URL(window.location.href);
  const encodeData:any = url.searchParams.get("EncodeData");
  
  useEffect(() => {
    if (!!encodeData) {
      // 본인인증 서비스 결과 저장 호출
      window.opener.setEncodeData(encodeData);
      window.close();
    }
  }, []);

  return (
    <Box sx={{ display: 'flex',mt:25,ml:18 }} component='span'>
      <CircularProgress />
    </Box>
  );
}

export default NiceSuccess;
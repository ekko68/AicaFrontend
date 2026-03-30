// import * as styles from './styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline,Container} from '@mui/material';
import { useNiceStore } from '~/pages/MyPage/MemberInfoMmt/BusinessConversion';
// const {opener} = window;
/* 
회면ID    :   todo...
화면명    :   nice 인증 리다이렉트 실페 페이지
작성일    :   2022/06/15
화면/개발 :   navycui
*/
const NiceFail = () => {
  const theme = createTheme();
  const setEncodeData = useNiceStore((state:any) => state.setEncodeData)
  const url = new URL(window.location.href);
  console.log(url);
  let encodeData = url.searchParams.get("EncodeData");
  console.log("encodeData", encodeData);

  return (
    <ThemeProvider theme={theme}> 
      <Container component="main">
        <CssBaseline />
        <h1>인증 실페했습니다. 다시 시도하세요</h1>
      </Container>
    </ThemeProvider>
  );
}

export default NiceFail;
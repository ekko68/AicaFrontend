//.src/react-app-env.d.ts
// types/react-reveal/index.d.ts
/// <reference types="node" />
/// <reference types="react-scripts" />
interface Window {
    Kakao: any,
    gapi:any,
    naver_id_login:any,
    kakao: any,
}
declare global {
  function setAccessToken(encodeData: string) : void;
  function setEncodeData(encodeData: string) : void;
  function setNaver(tokenData: any) : void;
  
}

declare module 'react-block-ui';
declare module 'react-naver-login';
declare module 'react-kakao-login';
declare module 'react-full-page';
declare module 'react-kakao-maps-sdk';
declare module 'react-daum-postcode';
declare module 'react-reveal/Fade';
declare module 'react-reveal/Slide';
declare module 'react-copy-to-clipboard';

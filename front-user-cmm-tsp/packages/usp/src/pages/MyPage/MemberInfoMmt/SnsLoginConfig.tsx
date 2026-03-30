import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as styles from '~/styles/styles';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { Box, Button, FormControlLabel, Stack} from '@mui/material';
import BreadCrumb from "~/components/BreadCrumb";
import Switch from '@mui/material/Switch';
import { SnsConf, useGlobalModalStore, useGlobalSnsStore } from '~/pages/store/GlobalModalStore';
import authentication from '~/../../shared/src/authentication';
import { fetchGetSnsConfig, fetchSignInSnsSelf,fetchSignInSnsSelfDelete } from '~/fetches/fetchSignIn';
import { useQuery } from 'react-query';
const _global = (window /* browser */ || global /* node */) as any
/* 
  작성일    :   2022/06/05
  화면명    :   사용자지원 -> SNS로그인설정
  회면ID    :   UI-USP-FRN-0410101
  화면/개발 :   Seongeonjoo / navycui
*/

const SnsLoginConfig = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const originpath = window.location.origin;
  const {snsBox,setSns} = useGlobalSnsStore();
  const {addModal} = useGlobalModalStore();
  const kakaoRef = useRef<any>(null)
  const kakaoRef1 = useRef<any>(null)
  const naverRef = useRef<any>(null)
  const naverRef1 = useRef<any>(null)
  const googleRef = useRef<any>(null)
  const googleRef1 = useRef<any>(null)
  
  const [snsToken,setSnsToken] = useState<any>({
    naverToken: '',
    kakaoToken: '',
    googleToken: '',
  })

  const [changeSns,setChangeSns] = useState<SnsConf>({
    isNaver:false,
    isKakao:false,
    isGoogle:false,
  })
  console.log('changeSns',changeSns)
  // 질의응답 목록 조회
  const { 
    data:snsBoxVal,
    refetch,
  } = useQuery(["getSnsConfig",changeSns], async () => await fetchGetSnsConfig(),{
    onSuccess:(data:any)=> {
      kakaoRef1.current = data.data.kakao
      naverRef1.current = data.data.naver
      googleRef1.current = data.data.google
      setChangeSns((pre:any)=>({
        ...pre,
        isNaver:data.data.naver,
        isKakao:data.data.kakao,
        isGoogle:data.data.google,
      }))
    },
    onError: (err:any)=>{
    }
  });

  // 초기화 
  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
    const initClient = () => {
      gapi.client.init({
      clientId: `${process.env.REACT_APP_CLIENT_ID_GOOGLE_AICA}`,
      scope: 'email profile openid'
    });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    refetch()
  }, []);

  // switch 변경 이벤트
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name,checked} = event.target;
    // setChangeSns((pre:any)=>({...pre,[name]:checked}));
    if(name == 'isKakao'){
      kakaoRef1.current = checked
      kakaoRef.current.click()
    } else if(name == 'isNaver') {
      naverRef1.current = checked
      sessionStorage.setItem('__SNS_KEY__', checked.toString());
      naverRef.current.click()
    } else {
      googleRef1.current = checked
      googleRef.current.click()
    }
    console.log('handleChange',checked)
  }

  // // 팝업창 콜백 네이버 설정 
  _global.setEncodeData = async (tokenData:any)=>{
    let naverKey = sessionStorage.getItem('__SNS_KEY__');
    if(!!tokenData){
        if(naverKey=='true'){ // 설정
          await fetchSignInSnsSelf({accessToken: tokenData,uri:"sns/naver",}).then((ress)=>{
            setChangeSns((pre:any)=>({...pre,isNaver:true}));
          }).catch((err)=>{
            addModal({
              type:'normal',
              open: true,
              content: err.response.data.message
            })
          });

        } else {
          await fetchSignInSnsSelfDelete({accessToken: tokenData,uri:"sns/naver",}).then((ress)=>{
            setChangeSns((pre:any)=>({...pre,isNaver:false}));
          }).catch((err)=>{
            addModal({
              type:'normal',
              open: true,
              content: err.response.data.message
            })
          });

        }
    }
  }

  // 카카오 로그인
  const handleClickKakao = async (res:any) => {
    if(kakaoRef1.current){ // 설정
      await fetchSignInSnsSelf({accessToken: res.response.access_token,uri:"sns/kakao"}).then((res:any)=>{
        setChangeSns((pre:any)=>({...pre,isKakao:true}));
      }).catch((err)=>{
        addModal({
          type:'normal',
          open: true,
          content: err.response.data.message
        })
      });
    } else { // 해지
      await fetchSignInSnsSelfDelete({accessToken: res.response.access_token,uri:"sns/kakao"}).then((ress)=>{
        setChangeSns((pre:any)=>({...pre,isKakao:false}));
      }).catch((err)=>{
        addModal({
          type:'normal',
          open: true,
          content: err.response.data.message
        })
      })
    }
  };

  //  구글 로그인
  const handleClickGoogle = async (res:any) => {
    
    if(googleRef1.current){ // 설정
      await fetchSignInSnsSelf({accessToken: res.accessToken,uri:"sns/google"}).then((ress)=>{
        setChangeSns((pre:any)=>({...pre,isGoogle:true}));
      }).catch((err)=>{
        addModal({
          type:'normal',
          open: true,
          content: err.response.data.message
        })
      })
    } else { // 해지
      await fetchSignInSnsSelfDelete({accessToken: res.accessToken,uri:"sns/google"}).then((ress)=>{
        setChangeSns((pre:any)=>({...pre,isGoogle:false}));
      }).catch((err)=>{
        addModal({
          type:'normal',
          open: true,
          content: err.response.data.message
        })
      })
    }
  };

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">SNS로그인 설정</h2>
              <p>자주 이용하는 SNS 계정과 연결 설정을 하여 빠르고 간편하게 로그인하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02} component='form' >
        <div className="content nomal_cont">
          <Box css={styles.login_cont}>
            <Stack spacing={2} direction="column" css={styles.snsicon}>
                <Stack direction="row" css={styles.sns_switch} className={!changeSns.isKakao ? '': 'check_line'}>
                  <FormControlLabel
                    control={<Switch checked={changeSns.isKakao} onChange={handleChange} name='isKakao' color="primary" />}
                    label={
                    <>
                      <Stack spacing={3} alignItems="center" direction="row" >
                        <KakaoLogin
                          token={`${process.env.REACT_APP_ACCESS_TOKEN_AICA}`}
                          onSuccess={(res:any) => {
                            setSnsToken((prev:any)=>({...prev,kakaoToken:res.response.access_token}))
                            handleClickKakao(res)
                          }}
                          onFail={(err:any) => {
                            addModal({
                              type:'normal',
                              open: true,
                              content: err
                            })
                            console.log("KakaoLogin:=> onFail :: ", err)
                          }}
                          onLogout={() => {
                            fetchSignInSnsSelfDelete({accessToken: snsToken.kakaoToken,uri:"sns/kakao"}).then((res:any)=>{
                              setChangeSns((pre:any)=>({...pre,isKakao:false}));
                            }).catch((err)=>{
                              console.log(err.response.data)
                              addModal({
                                type:'normal',
                                open: true,
                                content: err.response.data.message
                              })
                            });
                          }}
                          render={ (renderProps:any) => (
                            <Button className="kakao" variant="text" id='kakao' type="button" ref={kakaoRef} onClick={renderProps.onClick}></Button>
                          )}
                        />
                        <div className="textbox">
                          <div>카카오톡 로그인<em>{!changeSns.isKakao ? '해지': '연결'}</em></div>
                        </div>
                      </Stack>
                    </>
                    }
                    labelPlacement="start"
                  />
                </Stack>
                <Stack direction="row" alignItems="center" css={styles.sns_switch} className={!changeSns.isNaver ? '': 'check_line'}>
                  <FormControlLabel
                    control={<Switch checked={changeSns.isNaver} onChange={handleChange} name='isNaver' color="primary"/>}
                    label={
                    <>
                      <Stack spacing={3} alignItems="center" direction="row" >
                        <NaverLogin
                          clientId={`${process.env.REACT_APP_CLIENT_ID_NAVER_AICA}`}
                          callbackUrl={`${process.env.REACT_APP_NAVER_CALLBACK}`}
                          render={ (renderProps:any) => 
                            <Button className="naver" variant="text" id='naver' ref={naverRef} type="button" onClick={renderProps.onClick}></Button>
                          }
                          onSuccess={(res:any) => {
                            console.log("NaverLogin:=> onSuccess :: ",res);
                          }}
                          onFailure={(err:any) => console.error("NaverLogin:=> onFailure :: ",err)}
                        />
                        <div className="textbox">
                          <div>네이버 로그인<em>{!changeSns.isNaver ? '해지': '연결'}</em></div>
                        </div>
                      </Stack>
                    </>
                    }
                    labelPlacement="start"
                  />
                </Stack>
                <Stack direction="row" css={styles.sns_switch} className={!changeSns.isGoogle ? '': 'check_line'}>
                  <FormControlLabel
                    control={<Switch checked={changeSns.isGoogle} onChange={handleChange} name='isGoogle' color="primary" />}
                    label={
                    <>
                      <Stack spacing={3} alignItems="center" direction="row" >
                        <GoogleLogin
                          clientId={`${process.env.REACT_APP_CLIENT_ID_GOOGLE_AICA}`}
                          render={(renderProps:any) =>(
                            <Button className="google" variant="text" id='google' ref={googleRef} type="button" onClick={renderProps.onClick}></Button>
                          )} 
                          onSuccess={(res:any) => {
                            handleClickGoogle(res)
                            console.log("GoogleLogin:=> onSuccess :: ",res);
                            console.log("changeSns.isGoogle:=> onSuccess :: ",changeSns);
                           
                          }}
                          onFailure={(err:any) => console.error("GoogleLogin:=> onFailure :: ", err)}
                          cookiePolicy={'single_host_origin'}
                        />
                        <div className="textbox">
                          <div>구글 로그인<em>{!changeSns.isGoogle ? '해지': '연결'}</em></div>
                        </div>
                      </Stack>
                    </>
                    }
                    labelPlacement="start"
                  />
                </Stack>
            </Stack>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default SnsLoginConfig;
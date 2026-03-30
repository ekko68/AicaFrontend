import {useEffect, useRef, useState} from 'react';
import * as styles from './styles';
import styled from '@emotion/styled';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';
import {useNavigate, useLocation, NavLink} from 'react-router-dom';
import authentication from 'shared/authentication';
import {fetchSignIn, fetchSignInSns} from '~/fetches';
import {Button, Stack, Box, TextField} from '@mui/material';
import {intialLoginValues, UserType} from '~/models/ModelSignin';
import {useGlobalModalStore} from '../store/GlobalModalStore';
import {ModalComponents} from '~/components/ModalComponents';

/* 
  작성일    :   2022/04/10
  화면명    :   공통 -> 로그인
  회면ID    :   UI-USP-FRN-0020101
  화면/개발 :   Seongeonjoo / navycui
*/
export type memType = {
  loginId: string;
}
const _global = (window /* browser */ || global /* node */) as any
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [sts, setSts] = useState(0);
  const originpath = window.location.origin;
  const {addModal} = useGlobalModalStore();
  const [formValues, setFormValues] = useState(intialLoginValues);

  // 로그인 입력 폼
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {value, name} = e.target;
    setFormValues({
      ...formValues,
      [name]: value, errorId: false, errorPw: false
    });
  }
  // 화면 초기 호출
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: `${process.env.REACT_APP_CLIENT_ID_GOOGLE_AICA}`,
        scope: 'email profile openid'
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  // 로그인
  const handleClickLogin = async () => {
    setFormValues(intialLoginValues);
    if (!validate(formValues)) {
      return;
    }
    ;
    await fetchSignIn(formValues).then((res) => {
      let {data} = res;

      //* Ref 페이지가 있는 경우.
      let qs = new URLSearchParams(location.search);
      let next = qs.get('nextUrl');
      sessionStorage.setItem('__LOG_KEY__', formValues.loginId);
      authentication.set(data);
      let boxuser = authentication.getMemberData();

      if (boxuser.memberSt.includes('DORMANT')) { // 휴면회원여부 체크
        if (boxuser.memberType.includes('INDIVIDUAL')) { // 개인
          navigate("/signup/dormancyCon")
        } else {  // 기업
          //..TODO.... 공인인증 솔루션 적용중...
          navigate("/signup/dormancyPro")
        }
      } else if (boxuser.memberSt.includes('LOCK')) { // 계정잠김여부 체크
        console.log('boxuser.memberSt', boxuser.memberSt);
        if (boxuser.memberType.includes('INDIVIDUAL')) {  // 개인
          navigate("/signup/dormancyLock")
        } else { // 기업
          //..TODO.... 공인인증 솔루션 적용중...
          navigate("/signup/dormancyLockPro")
        }
      } else {
        if (data.changePasswd) { // 비밀번호 60일 변경 체크
          navigate("/signin/dormancyPass", {
            state: {
              nextUrl: !!next ? window.atob(next).replace(originpath, '') : ''
            }
          })
          return;
        }
        if (next) {
          window.location.href = window.atob(next).replace(originpath, '')
          // navigate(`${window.atob(next).replace(originpath,'')}`)
        } else {
          navigate('/');
        }
      }
    }).catch((e) => {
      let {data: {message, status}} = e.response;
      console.log('status - ' + status)
      console.log('message - ' + message)
      setFormValues({
        ...formValues,
        isLock: true
      });
      setFormValues({
        ...formValues,
        loginId: "", passwd: "", errorId: false, errorPw: false, labelPw: "", isLock: false
      });
      // setOpen(true)
      setError(message)
      setSts(status)
      if (status == 400) {
        addModal({
          type: 'normal',
          open: true,
          content: message,
        })
      }
      if (status == 602 || status == 604) {
        // window.location.href = '/signup/dormancyLock';
        navigate("/signup/dormancyLock", {
          state: {
            isBzmn: status == 602? false : true
          }
        })
      } else if (status == 603 || status == 605) {
        // window.location.href = '/signup/dormancyCon';
        navigate("/signup/dormancyCon", {
          state: {
            isBzmn: status == 603? false : true
          }
        })
      }
      // addModal({
      //   type:'normal',
      //   open: true,
      //   title:status,
      //   content: message,
      //   onConfirm:()=> {
      //     if(status == 602 || status == 604 ){
      //       // window.location.href = '/signup/dormancyLock';
      //       navigate("/signup/dormancyLock")
      //     } else if(status == 603 || status == 605) {
      //       // window.location.href = '/signup/dormancyCon';
      //       navigate("/signup/dormancyCon")
      //     }
      //   },
      // })
    });
  };

  // login form validation check
  const validate = (values: UserType) => {
    // id 확인
    if (!values.loginId) {
      setFormValues({...formValues, errorId: true, labelId: "아이디 입력하세요"});
      return false;
    }
    //비밀번호  확인
    if (!values.passwd) {
      setFormValues({...formValues, errorPw: true, labelPw: "비밀번호 입력하세요"});
      return false;
      //비밀번호 길이 체크
    } else if (values.passwd.length < 4) {
      setFormValues({...formValues, errorPw: true, labelPw: "비밀번호는 4자리이상으로 입력하세요"});
      return false;
    }
    return true;
  };

  // 카카오 로그인
  const handleClickKakao = async (res: any) => {
    await fetchSignInSns({accessToken: res.response.access_token, uri: "sns/kakao",}).then((ress) => {
      authentication.set(ress.data);
      //* Ref 페이지가 있는 경우.
      const qs = new URLSearchParams(location.search);
      const next = qs.get('nextUrl');

      if (next) {
        navigate(`${window.atob(next).replace(originpath, '')}`)
      } else {
        navigate('/');
      }
    }).catch((err) => {
      addModal({
        open: true,
        content: err.response.data.message
      })
    });

  };
  //  구글 로그인
  const handleClickGoogle = async (res: any) => {
    await fetchSignInSns({accessToken: res.accessToken, uri: "sns/google",}).then((ress) => {

      authentication.set(ress.data);
      //* Ref 페이지가 있는 경우.
      const qs = new URLSearchParams(location.search);
      const next = qs.get('nextUrl');
      if (next) {
        navigate(`${window.atob(next).replace(originpath, '')}`)
      } else {
        navigate('/');
      }
    }).catch((err) => {
      addModal({
        type: 'normal',
        open: true,
        content: err.response.data.message
      })
    });
  };
  // 팝업창 콜백
  if (typeof window !== "undefined") {
    _global.setEncodeData = (encodeData: string) => {
      if (!!encodeData) {
        handleLoginNaver(encodeData)
      }
    }
  }

  //  네이버 로그인
  const handleLoginNaver = async (res: any) => {

    await fetchSignInSns({accessToken: res, uri: "sns/naver",}).then((ress) => {
      authentication.set(ress.data);
      //* Ref 페이지가 있는 경우.
      const qs = new URLSearchParams(location.search);
      const next = qs.get('nextUrl');

      if (next) {
        navigate(`${window.atob(next).replace(originpath, '')}`)
      } else {
        navigate('/');
      }
      // window.close();
    }).catch((err) => {
      addModal({
        type: 'normal',
        open: true,
        content: err.response.data.message
      })
    });
  };

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>AICA 로그인</h1>
          <p>로그인하고, 다양한 서비스를 이용하세요.</p>
        </div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          css={styles.signinput}
        >
          <SignTextField
            name="loginId"
            variant="filled"
            autoComplete="new-password"
            label="아이디"
            autoFocus
            fullWidth
            error={formValues.errorId}
            value={!!formValues.loginId ? formValues.loginId : ''}
            onChange={handleChange}
            helperText={formValues.errorId ? formValues.labelId : ""}
          />
          <SignTextField
            type="password"
            variant="filled"
            name='passwd'
            label="비밀번호"
            fullWidth
            error={formValues.errorPw}
            value={!!formValues.passwd ? formValues.passwd : ''}
            helperText={formValues.errorPw ? formValues.labelPw : ""}
            onChange={handleChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleClickLogin()
              }
            }}
          />
          {/*
          <Autocomplete
            multiple
            options={[]}
            onKeyDown={(event:any) => {
              if (event.key === 'Enter') {
                event.defaultMuiPrevented = true;
                handleClickLogin();
              }
            }}
            renderInput={(params) => (
              <SignTextField
                type="password"
                variant="filled"
                name='passwd'
                label="비밀번호"
                fullWidth
                error={formValues.errorPw}
                value={!!formValues.passwd ? formValues.passwd : ''}
                helperText={formValues.errorPw ? formValues.labelPw : ""}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
                onChange={handleChange}
              />
            )}
            /> */}
        </Box>
        {/* <Box css={styles.login_check}>
          <CustomCheckBoxs
            row
            checkbox={loginState}
            onClick={(s: string[]) => {
              if (s.length > 0) console.log(s);
              setLoginState(s);
            }}
            />
          <FormControlLabel control={<CustomCheckBoxs />} label="로그인유지" />
          <FormControlLabel control={<CustomCheckBoxs />} label="아이디저장" />
        </Box>  */}
        <Stack spacing={2} direction="row" css={styles.login_btn}>
          <Button fullWidth variant="contained" type="button" onClick={handleClickLogin}> 로그인 </Button>
        </Stack>
        <Box css={styles.linkbtn}>
          <NavLink to={'idtrouver'}>
            {'아이디 찾기'}
          </NavLink>
          <NavLink to={'/Signin/Factor'}>
            {'비밀번호 찾기'}
          </NavLink>
          <NavLink to={'/signup'}>
            {'회원가입'}
          </NavLink>
        </Box>
        <Stack spacing={5} direction="row" css={styles.snsicon}>
          {/* 카카오 로그인 */}
          <KakaoLogin
            token={`${process.env.REACT_APP_ACCESS_TOKEN_AICA}`}
            onSuccess={(res: any) => {
              handleClickKakao(res);
              console.log("KakaoLogin:=> onSuccess :: ", res)
            }}
            onFail={(err: any) => {
              console.log("KakaoLogin:=> onFail :: ", err)
            }}
            onLogout={() => {
              console.log("로그아웃")
            }}
            render={(renderProps: any) => (
              <Button className="kakao" variant="text" type="button" onClick={renderProps.onClick}></Button>
            )}
          />
          {/* 네이버 로그인 */}
          <NaverLogin
            clientId={`${process.env.REACT_APP_CLIENT_ID_NAVER_AICA}`}
            callbackUrl={`${process.env.REACT_APP_NAVER_CALLBACK}`}
            render={(renderProps: any) =>
              <div onClick={renderProps.onClick}>
                <Button className="naver" variant="text" type="button"></Button>
              </div>
            }
            onSuccess={(res: any) => {
              console.log("NaverLogin:NaverLogin=> onSuccess :: ", res);
            }}
            onFailure={(err: any) => console.error("NaverLogin:=> onFailure :: ", err)}
          />
          {/* 구글 로그인 */}
          <GoogleLogin
            responseType={"id_token"}
            clientId={`${process.env.REACT_APP_CLIENT_ID_GOOGLE_AICA}`}
            render={(renderProps: any) => (
              <div onClick={renderProps.onClick}>
                <Button className="google" variant="text" type="button"></Button>
              </div>
            )}
            scope='email profile openid https://www.googleapis.com/auth/user.birthday.read'
            onSuccess={(res: any) => {
              console.log("GoogleLogin:=> onSuccess :: ", res);
              handleClickGoogle(res);
            }}
            onFailure={(err: any) => {
              console.error("GoogleLogin:=> onFailure111 :: ", err)
            }}
            cookiePolicy={'single_host_origin'}
          />
        </Stack>
        {formValues.isLock ?
          <div css={styles.error}>
            <p>아이디 혹은 비밀번호를 5회 잘못 입력하였습니다.</p>
            <p>비밀번호 재 설정을 통해 비밀번호를 변경하신 후 이용가능합니다.</p>
          </div> : null}
      </div>
      <ModalComponents
        open={open}
        type={'confirm'}
        title={"" + ((sts == 400 && error.includes("7일")) ? '407' : sts)}
        content={error}
        onConfirm={(type: string) => {
          debugger;
          if (sts == 602 || sts == 604) {
            window.location.href = '/signup/dormancyLock';
            navigate("/signup/dormancyLock")
          } else if (sts == 603 || sts == 605) {
            window.location.href = '/signup/dormancyCon';
            navigate("/signup/dormancyCon")
          } else {
            navigate("/signup")
          }
        }}
        onClose={(type: string) => {
          setOpen(false)
        }}>
      </ModalComponents>
    </section>
  );
}
const SignTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    padding: 0,
    '& fieldset': {
      borderColor: '#707070',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
});

export default SignIn;
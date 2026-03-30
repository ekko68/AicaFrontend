/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authentication from 'shared/authentication';
import { fetchSignIn } from '~/fetches';
import { UserType } from '~/fetches/fetchSignIn';
import * as styles from './styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const SignTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fff',
  },
  '.MuiOutlinedInput-notchedOutline' :{
    height:'auto',
  },
  '& .MuiOutlinedInput-root': {
    color: '#707070',
    input: {
      '&::placeholder' : {
        color:'#707070',
      },
    },
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

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const intialValues:UserType = { loginId: "", passwd: ""};
  const [formValues, setFormValues] = useState(intialValues);

  // data 입력 바인딩
  const handleChange = (e:any) => {
    const { value, name } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const handleClickLogin = async (event:any) => {
    // event.preventDefault();
    // const data:any = new FormData(event.currentTarget);
    if(!validate(event,formValues)){
      return ;
    };
    try {
      const res = await fetchSignIn({ loginId:formValues.loginId, passwd:formValues.passwd });
      authentication.set(res.data);
  
      //* Ref 페이지가 있는 경우.
      const qs = new URLSearchParams(location.search);
      const next = qs.get('nextUrl');
      if (next) {
        window.location.href = window.atob(next);
      } else {
        navigate('/');
      }
    } catch (e: any) {
      if (!!e.response && !!e.response.data) alert(e.response?.data.message);
    }
  };

  useEffect(() => {}, []);

  // login form validation check
  const validate = (event:any,values:UserType) => {
    // id 확인
    if (!values.loginId) {
      // .. todo
      // values.loginMsg = "ID 입력하세요!";
      // values.isLogin = true;
      alert("로그인 id 입력하세요!");
      return false;
    }
    //비밀번호  확인
    if (!values.passwd) {
      // .. todo
      // values.pwMsg = "PASSWORD 입력하세요!";
      // values.isPasswd = true;
      alert("passwd 입력하세요!");
      return false;
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (values.passwd.length < 4) {
      alert("비밀번호는 4자리이상으로 입력하세요");
      // .. todo
      // values.pwMsg = "Password must be more than 4 characters";
      return false;
    }
    return true;
  };

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1><img src="/images/common/logo_signin.png" /></h1>
          <p>관리자 시스템 로그인</p>
        </div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { height: 60, mb: 1.6},
          }}
          noValidate
          autoComplete="off"
          css={styles.signinput}
        >
          <div>
            <SignTextField
              id="Signid"
              name="loginId" 
              variant="outlined"
              value={formValues.loginId}
              onChange={handleChange}
              placeholder="로그인"
              autoFocus
              fullWidth
              required
            />
          </div>
          <div>
            <SignTextField
              id="Password"
              name="passwd" 
              type="password"
              value={formValues.passwd}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="비밀번호"
              fullWidth
              required
            />
          </div>
        </Box>
        <Box css={styles.linkbtn} onClick={preventDefault}>
          <NavLink to={'/idtrouver'}>
            {'아이디 찾기'}
          </NavLink>
          <NavLink to={'/Factor'}>
            {'비밀번호 재설정'}
          </NavLink>
        </Box>
        <Stack spacing={2} direction="row" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button" onClick={handleClickLogin}>
            로그인
          </Button>
        </Stack>
        {/* <div css={styles.error}>
          <p>아이디 혹은 비밀번호를 5회 잘못 입력하였습니다.</p>
          <p>비밀번호 재 설정을 통해 비밀번호를 변경하신 후 이용가능합니다.</p>
        </div> */}
      </div>
    </section>
  );
}

export default SignIn;

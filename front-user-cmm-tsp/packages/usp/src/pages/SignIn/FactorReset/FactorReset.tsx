import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from '../styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useConfigStore } from "../Factor/Factor";
import {fetchFactorPwChange} from '~/fetches';
import {PwState,LableState,ErrorState} from '../../../models/ModelSignin';
import { TextField } from '@mui/material';

function Factor() {
  const navigate = useNavigate();
  // const receive:any = useLocation();
  const {key} = useConfigStore();

  const [values, setValues] = useState<PwState>({ amount: "", password: "", passOneRest:"", weight: "", weightRange: "", showPassword: false});
  const [passLable, setPassLable] = useState<LableState>({passwordLable:"비밀번호",passOneRestLable:"비밀번호 확인"});
  const [passError, setPassError] = useState<ErrorState>({passwordError:false,passOneRestError:false});

  const handleChange = (prop: keyof PwState) => (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.name === 'password'){
      setPassError({...passError,passwordError:false});
      setPassLable({...passLable,passwordLable:"비밀번호"});
    } else {
      setPassError({...passError,passOneRestError:false});
      setPassLable({...passLable,passOneRestLable:"비밀번호 확인"});
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // 다음 이벤트
  const handleSubmitClick = (event: React.MouseEvent<HTMLElement>) => {

    // 인증 번호 체크
    if(values.password === '') {
      setPassError({...passError,passwordError:true});
      setPassLable({...passLable,passwordLable:"비밀번호는 필수입니다"});
      return;
    }  
    if(values.passOneRest === '') {
      setPassError({...passError,passOneRestError:true});
      setPassLable({...passLable,passOneRestLable:"비밀번호 확인은 필수입니다."});
      return;
    }

    fetchFactorPwChange({ passwd1: values.password, passwd2: values.passOneRest, key:key}).then((res:any)=>{
      alert("비밀번호 재설정 되었습니다.");
      navigate('/signin',{
        state:{
          // loginId:loginId,
          stus:'pl'
        }
      })
    }).catch((err:any)=>{ alert("일치하는 회원정보가 없습니다." + err.message)});
  };

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>비밀번호 재설정</h1>
          <p>새로운 비밀번호를 입력해주세요. </p>
        </div>
        <Box component="form" noValidate autoComplete="off" >
          <FormControl variant="filled" fullWidth required css={styles.singTextbox}>
            <TextField
              id="password"
              name="password"
              variant="filled"
              error={passError.passwordError}
              value={values.password}
              type={values.showPassword ? "text" : "password"}
              onChange={handleChange("password")}
              label={passLable.passwordLable}
              required
            />
          </FormControl>
          <FormControl variant="filled" fullWidth required css={styles.singTextbox}>
            <TextField
              id="passOneRest"
              name="passOneRest"
              variant="filled"
              error={passError.passOneRestError}
              value={values.passOneRest}
              type={values.showPassword ? "text" : "password"}
              onChange={handleChange("passOneRest")}
              placeholder="8~16자 영문 대·소문자, 숫자, 특수문자"
              label={passLable.passOneRestLable}
              required
            />
          </FormControl>
        </Box>
        <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button" className="primary" onClick={handleSubmitClick}>확인</Button>
        </Stack>
      </div>
    </section>
  );
}

export default Factor;

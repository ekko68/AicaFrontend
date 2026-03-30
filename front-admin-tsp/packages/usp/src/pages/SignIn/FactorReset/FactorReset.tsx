import { fetchFactor} from '~/fetches';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type FormType = {
  password?: string;
};

function Factor() {
  const [form, setForm] = useState<FormType>({ password: '1234' });

  const navigate = useNavigate();
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // TODO: 비밀번호 확인
    if (form.password) {
      fetchFactor(form.password)
        .then((res) => {
          const { passwdCheckKey: key } = res;
          //* response 로 받은 키를 저장해 둔다.
          sessionStorage.setItem('__FACTOR_KEY__', key);

          //* 회원 정보 조회
          // me(key);

          navigate('/mypage');
        })
        .catch((e) => {
          if (e.response) {
            //* 비밀 번호가 맞지 않을 때.
            alert(e.response.data.message);
          } else {
            //* 오류
            alert('서비스를 이용 할 수 없습니다.');
          }
        });
    }
  };
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>비밀번호 재설정</h1>
          <p>새로운 비밀번호를 입력해주세요. </p>
        </div>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="password" 
            label="비밀번호" 
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="passwordreset" 
            label="비밀번호 확인" 
            variant="outlined"
            fullWidth
            placeholder="8~16자 영문 대소문자,숫자,특수문자"

          />
        </Box>
        <Stack spacing={2} direction="row" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button">
            <NavLink to={'/factorfind'}>
              {'다음'}
            </NavLink>
          </Button>
        </Stack>
      </div>
    </section>
  );
}

export default Factor;

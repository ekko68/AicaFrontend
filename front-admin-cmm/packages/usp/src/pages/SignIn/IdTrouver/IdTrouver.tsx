import * as styles from './styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function IdTrouver() {
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>아이디 찾기</h1>
          <p>가입 시 입력한 회원정보를 입력해 주세요.</p>
        </div>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="name" 
            variant="outlined"
            placeholder='이름'
            fullWidth
          />
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="id" 
            variant="outlined"
            fullWidth
            placeholder="(입력 예:20220101)"
          />
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="password" 
            variant="outlined"
            fullWidth
            placeholder="휴대폰번호('-'제외한 숫자만 입력)"
          />
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="email" 
            variant="outlined"
            fullWidth
            placeholder="인증 가능한 이메일 주소 입력"
          />
          <Button className='rbt'>메일인증</Button> 
        </Box>
        <Stack spacing={2} direction="row" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button">
            <NavLink to={'/IdTrouverFind'}>
              {'다음'}
            </NavLink>
          </Button>
        </Stack>
      </div>
    </section>
  )
}

export default IdTrouver;

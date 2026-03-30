import * as styles from './styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
// FRN-0011801_회원가입_정보입력 (개인)

const steps = [
  '약관동의/인증',
  '휴대폰 본인 인증',
  '가입정보 입력',
  '가입완료',
];

function ConsumerForm() {

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <NavLink to={'/consumer'} css={styles.backPass}>
          이전 화면으로 돌아가기
        </NavLink>
        <Stack>
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Stepper activeStep={2} alternativeLabel css={styles.step}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Box sx={{mb: 7}}>
          <div className="sub_tit">
            <h2>가입정보</h2>
            <p>AICA 회원가입에 필요한 정보를 입력해주세요.</p>
          </div>
        </Box> 
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="id" 
            label="아이디" 
            variant="outlined"
            fullWidth
            placeholder="4~12자 영문자 대소문자"
          />
          <Button className='rbt'>중복확인</Button> 
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="id" 
            label="비밀번호" 
            variant="outlined"
            fullWidth
            placeholder="8~16자 영문 대소문자,숫자,특수문자"

          />
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="password" 
            label="비밀번호 확인 " 
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
            id="email" 
            label="이메일" 
            variant="outlined"
            fullWidth
            placeholder="인증 가능한 이메일 주소 입력"
          />
          <Button className='rbt'>메일인증</Button> 
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="id" 
            label="인증번호" 
            variant="outlined"
            fullWidth
          />
          <span className='rbt'>10:00</span>
        </Box>
        <Stack spacing={2} direction="row" sx={{mt:8}} css={styles.btnGroup}>
          <Button variant="contained" type="button" >
            <NavLink to={'/complete'}>
              {'가입하기'}
            </NavLink>
          </Button>
        </Stack>
      </div>
    </section>
  );
}

export default ConsumerForm;

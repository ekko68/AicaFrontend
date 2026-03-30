import * as styles from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

function FactorFind() {
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>비밀번호 재설정</h1>
          <p>가입 시 입력한 회원정보를 입력해 주세요.</p>
        </div>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="휴대폰 인증" />
            <FormControlLabel value="male" control={<Radio />} label="이메일 인증" />
          </RadioGroup>
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="phon" 
            label="휴대폰 번호" 
            variant="outlined"
            fullWidth
            placeholder="010-0000-0000"
          />
          <Button className='rbt'>인증번호</Button> 
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <TextField
            required
            id="id" 
            label="인증번호 확인" 
            variant="outlined"
            fullWidth
          />
          <span className='rbt'>5:00</span>
        </Box>
        <Stack spacing={2} direction="row" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button">
            <NavLink to={'/factorreset'}>
              {'다음'}
            </NavLink>
          </Button>
        </Stack>
      </div>
    </section>
  )
}

export default FactorFind;

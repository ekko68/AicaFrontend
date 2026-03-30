/* eslint-disable jsx-a11y/alt-text */
import * as styles from './styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
// FRN-0010901_회원가입_보호자 휴대폰 인증 안내

const steps = [
  '약관동의/인증',
  '휴대폰 본인 인증',
  '가입정보 입력',
  '가입완료',
];

function Confirm() {
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <NavLink to={'/signup'} css={styles.backPass}>
          이전 화면으로 돌아가기
        </NavLink>
        <Stack>
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Stepper css={styles.step} activeStep={1} alternativeLabel sx={{ mt : 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Box sx={{mb: 7}}>
          <div className="confirm_tit">
            <img src="/images/common/icon_err.png"/>
            <p>만 14세 미만은 보호자(법적대리인)의 동의 및 인증 후 가입이 가능합니다.</p>
          </div>
            <Stack spacing={2} direction="row" css={styles.btnGroup} sx={{ mt: 3 }}>
              <Button variant="contained" type="button">
                <NavLink to={'/consumerform'}>
                  {'보호자 휴대폰 인증'}
                </NavLink>
              </Button>
            </Stack>
          </Box>
      </div>
    </section>
  );
}

export default Confirm;

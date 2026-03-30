import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink ,useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import authentication from '~/../../shared/src/authentication';
// FRN-0011701_가입완료 (개인)

const steps = [
  '약관동의/인증',
  '사업자 공동 인증',
  '가입정보 입력',
  '가입완료',
];

function CompleteConsumer() {
  const receive:any = useLocation();
  return (
    <section css={styles.container}>
      <Box css={styles.backPass}>
        <NavLink to={'/signup/consumerForm'}>
          이전 화면으로 돌아가기
        </NavLink>
      </Box>
      <div css={styles.content}>
        <Stack className="join_head">
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Box className="step_scroll">
            <Stepper activeStep={3} alternativeLabel css={styles.step} className="steplt">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
        <Box className="complet_cont">
          <div className="confirm_tit">
            <h2>AICA 회원가입이 완료되었습니다.</h2>
            <Box className="emsub_title">
              <em>{!!receive.state ? receive.state.username : ''}</em>님의 회원가입을 환영합니다.
              <Box className="txtbox">AICA 회원으로서 포털 내<br className="mo"/> 모든 서비스를 자유롭게 이용하시기 바랍니다.</Box>
            </Box>
          </div>
          <Stack spacing={2} justifyContent={'center'} direction="row" css={styles.signbtn} sx={{ mt: 3 }}>
            <NavLink to={'/'}>
              <Button variant="contained" type="button" className="linebtn" >
                  홈으로 이동
              </Button>
            </NavLink>
            <NavLink to={'/signin'}>
              <Button variant="contained" type="button" className="primary">
                로그인하기
              </Button>
            </NavLink>
          </Stack>
        </Box>
      </div>
    </section>
  );
}

export default CompleteConsumer;

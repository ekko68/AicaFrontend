import * as styles from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// FRN-0011701_가입완료 (사업자)

const steps = [
  '약관동의/인증',
  '사업자 공동 인증',
  '가입정보 입력',
  '가입완료',
];

function Complete() {
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <NavLink to={'/consumerForm'} css={styles.backPass}>
          이전 화면으로 돌아가기
        </NavLink>
        <Stack>
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Stepper activeStep={3} alternativeLabel css={styles.step}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Box sx={{mb: 7, maxWidth: 500, margin: '0 auto'}}>
          <div className="confirm_tit">
            <h2>AICA 회원가입이 완료되었습니다.</h2>
            <p>
              <em>(주)한국정보통신</em>님의 회원가입을 환영합니다. <br/>
              AICA 회원으로서 포털 내 모든 서비스를 자유롭게 이용하시기 바랍니다.
            </p>
          </div>
          <Box sx={{ flex: 1, marginTop: 4, marginBottom: 10, }} css={styles.box_ara}>
            <Card sx={{ borderRadius: '20px' }}>
              <CardContent>
                <div className='info_icon'>
                  기업 상세정보를 미리 입력해 두시면 나중에 사업신청 시 미리 
                  입력한 정보가 자동으로 출력되어 빠르고 간편하게 접수가 
                  가능합니다.
                </div>
                <NavLink to={'/'} css={styles.landing}>
                  기업 상세정보 지금 입력하기 &gt;
                </NavLink>
              </CardContent>
            </Card>
          </Box>
          <Stack spacing={2} direction="row" css={styles.btnGroup} sx={{ mt: 3 }}>
            <Button variant="contained" type="button" className="linebtn" >
              <NavLink to={'/'}>
                홈으로 이동
              </NavLink>
            </Button>
            <Button variant="contained" type="button">
              <NavLink to={'/signin'}>
                로그인하기
              </NavLink>
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  );
}

export default Complete;

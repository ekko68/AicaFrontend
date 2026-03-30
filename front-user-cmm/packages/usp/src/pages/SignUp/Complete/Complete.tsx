import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import authentication from '~/../../shared/src/authentication';

const steps = [
  '약관동의/인증',
  '사업자 공동 인증',
  '가입정보 입력',
  '가입완료',
];
/* 
  작성일    :   2022/05/30
  화면명    :   FRN-0011801_가입완료 (사업자)
  회면ID    :   UI-USP-FRN-0011801
  화면/개발 :   Seongeonjoo / navycui
*/
const Complete = () => {
  const nmval = authentication.getUserNm()
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
        <Box sx={{ maxWidth: 500, margin: '0 auto'}} className="complet_cont">
          <div className="confirm_tit">
            <h2>AICA 회원가입이 완료되었습니다.</h2>
            <Box className="emsub_title">
              <em>{!!nmval ? nmval : ''}</em>님의 회원가입을 환영합니다.
              <Box className="txtbox">AICA 회원으로서 포털 내<br className="mo"/> 모든 서비스를 자유롭게 이용하시기 바랍니다.</Box>
            </Box>
          </div>
          <Box css={styles.box_ara} className="cardstyle01">
            <Card>
              <CardContent>
                <div className='info_icon'>
                  기업 상세정보를 미리 입력해 두시면 나중에 사업신청 시 미리 
                  입력한 정보가 자동으로 출력되어 빠르고 간편하게 접수가 
                  가능합니다.
                </div>
                <NavLink to={'/'} css={styles.landing}>
                  기업 상세정보 지금 입력하기
                </NavLink>
              </CardContent>
            </Card>
          </Box>
          <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn} sx={{ mt: 3 }}>
            <Button variant="contained" type="button" className="linebtn" >
              <NavLink to={'/'}>
                홈으로 이동
              </NavLink>
            </Button>
            <Button variant="contained" type="button" className="primary">
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

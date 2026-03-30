/* eslint-disable jsx-a11y/alt-text */
import * as styles from './styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';

/* 
  작성일    :   2022/05/23
  화면명    :   회원가입_회원유형 선택
  회면ID    :   UI-USP-FRN-0010101
  화면/개발 :   Seongeonjoo / navycui
*/
const SignUp = () => {
  return (
    <section css={styles.container}>
      <Box css={styles.backPass}>
        <NavLink to={'/'}>
          이전 화면으로 돌아가기
        </NavLink>
      </Box>
      <div css={styles.content} className="w1100">
        <div css={styles.contflex}>
          <Box css={styles.singup_cont}>
            <div className="tit">
              <h1>AICA 회원가입</h1>
              <p>하나의 아이디로 안전하고 편리하게 AICA의 서비스를 <br className="mo"/>이용할수 있습니다.</p>
            </div>
            <Grid container className="singup_grid">
              <Grid item={true} >
                <div className='img'>
                  <img src='/images/common/signup_icon01.png'/>
                </div>
                <div className='cont'>
                  <div>사용자지원포털</div>
                  <p>AI 집적단지내의 사용자 <br className="pc"/>서비스 제공</p>
                </div>
              </Grid>
              <Grid item={true}>
                <div className='img'>
                  <img src='/images/common/signup_icon02.png'/>
                </div>
                <div className='cont'>
                  <div>실증지원포털</div>
                  <p>R&amp;D, 실증테스트 인프라 지원</p>
                </div>
              </Grid>
              <Grid item={true}>
                <div className='img'>
                  <img src='/images/common/signup_icon03.png'/>
                </div>
                <div className='cont'>
                  <div>데이터유통포털</div>
                  <p>데이터 활용 및 <br className="pc"/>확산 유통 환경 조성</p>
                </div>
              </Grid>
              <Grid item={true}>
                <div className='img'>
                  <img src='/images/common/signup_icon04.png'/>
                </div>
                <div className='cont'>
                  <div>안심구역포털</div>
                  <p>미개방 데이터 활용 <br className="pc"/>환경 이용</p>
                </div>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Card sx={{ mb: '1px', borderRadius: '20px 20px 0 0'  }}>
              <CardContent>
                <h3>개인</h3>
                <p>일반 사용자 및 예비 창업자, 학생, 강사</p>
              </CardContent>
                <NavLink to={'consumer'}>
                  <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.cardbtn}>
                    <Button variant="contained" type="button">
                        {'가입하기'}
                    </Button>
                  </Stack>
                </NavLink>
            </Card>
            <Card sx={{ borderRadius: '0 0 20px 20px' }}>
              <CardContent>
                <h3>사업자</h3>
                <p>개인 및 법인 사업자, 대학</p>
              </CardContent>
                <NavLink to={'producer'}>
                  <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.cardbtn}>
                  <Button variant="contained" type="button">
                        {'가입하기'}
                    </Button>
                  </Stack>
                </NavLink>
            </Card>
          </Box>
        </div>
      </div>
    </section>
  );
}

export default SignUp;

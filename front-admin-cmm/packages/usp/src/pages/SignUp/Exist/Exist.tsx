import * as styles from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// FRN-0011701_기 가입 안내 (사업자)

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
        </Stack>
        <Box sx={{mb: 7, maxWidth: 480, margin: '0 auto'}}>
          <div className="confirm_tit">
            <div><strong>(주) 한국정보통신</strong> 님</div>
            <p>이미 인증하신 사업자 등록번호로<br className="mo"/> 가입한 계정이 있습니다.</p>
          </div>
          <Box sx={{ flex: 1, marginTop: 4, marginBottom: 10, }} css={styles.box_ara}>
            <Card sx={{ mb: 0.2, borderRadius: '20px 20px 0 0' }}>
              <CardContent>
                <dl>
                  <dt>가입아이디</dt>
                  <dd>AI*****</dd>
                </dl>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '0 0 20px 20px' }}>
              <CardContent>
                <dl>
                  <dt>담당자</dt>
                  <dd>홍**</dd>
                </dl>
              </CardContent>
            </Card>
          </Box>
          <Stack spacing={2} direction="row" css={styles.btnGroup} sx={{ mt: 3 }}>
            <Button variant="contained" type="button" className="linebtn">아이디 찾기</Button>
            <Button variant="contained" type="button">로그인하기</Button>
          </Stack>
        </Box>
      </div>
    </section>
  );
}

export default Confirm;

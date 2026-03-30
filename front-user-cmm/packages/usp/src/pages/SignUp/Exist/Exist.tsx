import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import authentication from '~/../../shared/src/authentication';
// FRN-0011701_기 가입 안내 (사업자)

/* 
  작성일    :   2022/04/20
  화면명    :   공통 -> 기 가입 안내 (사업자)
  회면ID    :   UI-USP-FRN-0011601
  화면/개발 :   Seongeonjoo / navycui
*/

const Exist = () => {
  const navigate = useNavigate();
  const receive:any = useLocation();
  return (
    <section css={styles.container}>
      <Box css={styles.backPass}>
        <NavLink to={'/signup'}>
          이전 화면으로 돌아가기
        </NavLink>
      </Box>
      <div css={styles.content}>
        <Stack>
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
        </Stack>
        <Box css={styles.card_Box}>
          <div className="confirm_tit">
            <div><strong>{!!receive.state ? receive.state.loginId : ''}</strong> 님</div>
            <p>이미 인증하신 사업자 등록번호로<br className="mo"/> 가입한 계정이 있습니다.</p>
          </div>
          <Box sx={{ flex: 1 }} css={styles.box_ara02} className="cardflex">
            <Card>
              <CardContent>
                <dl>
                  <dt>가입아이디</dt>
                  <dd>{!!receive.state ? receive.state.loginId : ''}</dd>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <dl>
                  <dt>담당자</dt>
                  <dd>{!!receive.state ? receive.state.chargerNm : ''}</dd>
                </dl>
              </CardContent>
            </Card>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <Button variant="contained" type="button" className="primary" onClick={()=>navigate('/signin')}>로그인 하기</Button>
          </Stack>
        </Box>
      </div>
    </section>
  );
}

export default Exist;

import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import authentication from '~/../../shared/src/authentication';


/* 
  작성일    :   2022/06/20
  화면명    :   공통 -> 탈퇴회원 전환안내(사업자)
  회면ID    :   UI-USP-FRN-0011702
  화면/개발 :   Seongeonjoo / navycui
*/

function WithdrawPro() {
  const navigate = useNavigate();
  const {addModal} = useGlobalModalStore();
  const nmval = authentication.getUserNm()
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
            <div><strong>{!!nmval ? nmval : ''}</strong> 님</div>
            <p>최근 7일 이내에 탈퇴한 계정이 존재합니다.</p>
            <span className="mintit">아래 가입 아이디를 정상 계정으로 전환하거나 신규 계정으로 새로 가입하여 <br className="pc"/>포털 내 모든 서비스를 자유롭게 이용할 수 있습니다.</span>
          </div>
          <Box css={styles.box_ara02} className="cardflex">
            <Card>
              <CardContent>
                <dl>
                  <dt>가입아이디</dt>
                  <dd>AI*****</dd>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <dl>
                  <dt>담당자</dt>
                  <dd>홍**</dd>
                </dl>
              </CardContent>
            </Card>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <Button variant="contained" type="button" className="linebtn" onClick={()=>navigate('/signup/Exist')}>임시(기가입안내이동)</Button>
            <Button variant="contained" type="button" className="primary" onClick={()=>navigate('/signup/ProducerForm')}>임시(사업정보입력)</Button>
          </Stack>
        </Box>
      </div>
    </section>
  );
}

export default WithdrawPro;

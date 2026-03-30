import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomButton } from '~/components/ButtonComponents';

/*
  화면: 휴면회원해제 페이지
  작성자: Seongeonjoo / navycui
  작성일: 20220621
*/
function DormancyLift() {
  const navigate = useNavigate();
  const receive:any = useLocation();
  if(!!receive.state) return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          {!!receive.state ? <h1>휴면회원 해제안내</h1> : <h1>휴면회원 해제안내</h1>}
          <h1>휴면회원 해제안내</h1>
        </div>
        <Box css={styles.card_Box}>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_wake.png" />
          </Box>
          <Box className="confirm_tit mt20">
            <div><strong>회원</strong> 님</div>
            <p>휴면계정이 정상 해제되었습니다.</p>
            <span className="mintit">로그인을 진행하시어 포털의 다양한 서비스를 자유롭게 이용하시기 바랍니다. </span>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'}  css={styles.signbtn}>
            <CustomButton label={'로그인 하기'} type={'formbtn'} color={'primary'} onClick={()=>navigate("/signin")}/>
          </Stack>
        </Box>
      </div>
    </section>
  )
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>계정잠김 해제안내</h1>
        </div>
        <Box css={styles.card_Box}>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_wake.png" />
          </Box>
          <Box className="confirm_tit mt20">
            <div><strong>회원</strong> 님</div>
            <p>잠김계정이 정상 해제되었습니다.</p>
            <span className="mintit">로그인을 진행하시어 포털의 다양한 서비스를 자유롭게 이용하시기 바랍니다. </span>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <CustomButton label={'로그인 하기'} type={'formbtn'} color={'primary'} onClick={()=>navigate("/signin")}/>
          </Stack>
        </Box>
      </div>
    </section>
  )
}

export default DormancyLift;

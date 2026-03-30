import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/*
  화면: 계정잠김 페이지 기업
  작성자: Seongeonjoo / navycui
  작성일: 20220621
*/
function DormancyLockPro() {
  const navigate = useNavigate();
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>계정잠김 안내</h1>
        </div>
        <Box css={styles.card_Box}>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_wake.png" />
          </Box>
          <Box className="confirm_tit mt20">
            <div><strong>강환국</strong> 님</div>
            <p>계정에서 의심스러운 활동을 감지했으며 보안을 위해 계정을 일시적으로 잠갔습니다.</p>
            <span className="mintit">공동 인증서 인증 후 비밀번호 재설정을 수행하셔야 서비스를 이용할 수 있습니다. </span>
          </Box>
          <Box component="div" css={styles.singform} sx={{ mt:5 }}>
            <TextField
              required
              id="bizNum" 
              name="bizNum"
              variant="filled"
              placeholder="‘-’제외한 숫자만 입력"
              label="사업자등록번호" 
              fullWidth
            />
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <Button variant="contained" type="button" className="linebtn" onClick={()=>navigate("/")}>
              취소
            </Button>
            <Button variant="contained" type="button" className="primary"onClick={()=>alert('개발 진행중......')}>
              공동인증서 인증
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  )
}

export default DormancyLockPro;

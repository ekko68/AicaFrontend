import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import authentication from '~/../../shared/src/authentication';
import { useNavigate } from 'react-router-dom';
/*
  화면: 휴면회원안내(사업자) 페이지
  작성자: Seongeonjoo / navycui
  작성일: 20220621
*/
function DormancyPro() {
  const navigate = useNavigate();
  const nmval = authentication.getUserNm()
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>휴면회원 안내</h1>
        </div>
        <Box css={styles.card_Box}>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_sleep.png" />
          </Box>
          <Box className="confirm_tit mt20">
            <div><strong>{!!nmval ? nmval : ''}</strong> 님</div>
            <p>장기 미접속으로 인하여 <br className='mo'/>휴면계정으로 전환되었습니다.</p>
            <span className="mintit">공동인증서 인증을 수행하셔야 서비스를 이용할 수 있습니다.</span>
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
            <Button variant="contained" type="button" className="linebtn" onClick={()=>navigate('/')}>
              취소
            </Button>
            <Button variant="contained" type="button" className="primary" onClick={()=>alert('개발 진행중....')}>
              공동인증서 인증
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  )
}

export default DormancyPro;

import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
/*
  화면: 가입정보 없음 페이지
  작성자: Seongeonjoo / navycui
  작성일: 20220621
*/
function IdpassNone() {
  const navigate = useNavigate();
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>아이디/비밀번호 찾기</h1>
        </div>
        <Box>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_error.png" />
          </Box>
          <div className="confirm_tit mt40">
            <p>입력하신 정보와 <br className='mo'/>일치하는 가입 정보가 없습니다.</p>
          </div>
          <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn} sx={{ mt: 3 }}>
            <Button variant="contained" type="button" className="linebtn" onClick={()=> navigate('/signin/idTrouver')}>
              아이디 찾기
            </Button>
            <Button variant="contained" type="button" className="linebtn" onClick={()=> navigate('/signin/factor')}>
              비밀번호 찾기
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  )
}

export default IdpassNone;

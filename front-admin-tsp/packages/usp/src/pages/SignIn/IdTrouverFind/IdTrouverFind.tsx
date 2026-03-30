import * as styles from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function IdTrouverFind() {
  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>아이디 찾기</h1>
        </div>
        <Box sx={{mb: 7, maxWidth: 480, margin: '0 auto'}}>
          <div className="confirm_tit">
            <p>입력하신 정보와 <br className='mo'/>일치하는 아이디를 찾았습니다.</p>
          </div>
          <Box css={styles.box_ara}>
            <Card sx={{ borderRadius: '10px' }}>
              <CardContent>
                ab********
              </CardContent>
            </Card>
          </Box>
          <Stack spacing={2} direction="row" css={styles.btnGroup} sx={{ mt: 3 }}>
            <Button variant="contained" type="button" className="linebtn">
              <NavLink to={'/Factor'}>
                {'비밀번호 찾기'}
              </NavLink>
            </Button>
            <Button variant="contained" type="button">
              <NavLink to={'/singin'}>
                {'로그인하기'}
              </NavLink>
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  )
}

export default IdTrouverFind;

/* eslint-disable jsx-a11y/alt-text */
import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import authentication from 'shared/authentication';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangePasswordModal } from '~/pages/MyPage/MemberInfoMmt/view/ChangePasswordModal';
import { useEffect, useState } from 'react';
/*
  화면: 비밀번호 변경 페이지
  작성자: Seongeonjoo / navycui
  작성일: 20220621
*/
const DormancyPass = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const location:any = useLocation();
  const nmval = authentication.getUserNm()
  const [nextVal,setNextVal] = useState('')

  useEffect(() => {
    if(!!location.state){
      let {nextUrl} = location.state;
      if(!!nextUrl){
        setNextVal(nextUrl)
      }
    }
  }, []);

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>비밀번호 변경 안내</h1>
        </div>
        <Box css={styles.card_Box}>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_wake.png" />
          </Box>
          <Box className="confirm_tit mt20">
            <div><strong>{!!nmval ? nmval : ''}</strong> 님</div>
            <p>비밀번호 변경 안내 대상입니다.</p>
            <span className="mintit">회원님의 개인정보를 안전하게 보호하고, 개인정보도용으로 인한 피해를 예방하기 위해<br className="pc"/>
            60일 이상 비밀번호를 변경하지 않은 경우 비밀번호 변경을 안내하고 있습니다.</span>
            <span className="mintit">지금 비밀번호 변경을 원하지 않을 경우 <br className="pc"/>‘다음에 변경하기‘ 버튼을 클릭하여 다음 로그인 시에 비밀번호 변경을 할 수 있습니다.</span>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <Button variant="contained" type="button" onClick={()=>{
              if(!!nextVal){
                window.location.href = nextVal;
              } else {
                navigate('/')
              }
            }} className="linebtn">
              다음에 변경하기
            </Button>
            <ChangePasswordModal btnType='contained'/>
          </Stack>
        </Box>
        
      </div>
    </section>
  )
}

export default DormancyPass;

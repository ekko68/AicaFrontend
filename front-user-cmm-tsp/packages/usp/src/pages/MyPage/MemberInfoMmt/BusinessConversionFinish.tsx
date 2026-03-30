import * as styles from '~/styles/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { steps02 } from '~/models/Model';import BreadCrumb from "~/components/BreadCrumb";
import { CustomButton } from '~/components/ButtonComponents';
import { Card, CardContent } from '@mui/material';

/* 
  작성일    :   2022/06/16
  화면명    :   이페이지 -> 사업자전환완료
  회면ID    :   UI-USP-FRN-0070501
  화면/개발 :   Seongeonjoo / navycui
*/
const BusinessConversionFinish = () => {
  const navigate = useNavigate();
  const receive:any = useLocation();
  
if(!receive.state) navigate('/')
  return (
    <div css={styles.container} className="darkbg">
      <Box css={styles.sub_cont01}>
        <div className='benner'>
          <BreadCrumb />
          <div className='content'>
            <div className='txtbox'>
              <h2 className='tit'>사업자로 전환</h2>
              <Stepper activeStep={2} alternativeLabel css={styles.step}>
                {steps02.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
        <Box css={styles.sub_cont03}>
          <Box css={styles.sxform}>
            <div className="confirm_tit">
              <h2>AICA 사업자회원으로 전환이 완료되었습니다.</h2>
              <p>
                <em>홍길동 (블루레몬)</em>님의 사업자로 전환을 환영합니다. <br/>
                AICA 사업자회원으로써 포털 내 다양한 서비스를 자유롭게 이용하시기 바랍니다.
              </p>
            </div>
            <Card css={styles.card_box}>
              <CardContent className="tit">
                <span className="subtit">
                  기업 상세정보를 미리 입력해 두시면 나중에 사업신청 시 미리 입력한 정보가 
                  자동으로 출력되어 빠르고 간편하게 접수가 가능합니다.
                </span>
              </CardContent>
              <NavLink className="linkicon" to="/">기업 상세정보 지금 입력하기</NavLink>
            </Card>
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
            <CustomButton label={'홈으로 이동'} type={'formbtn'} color={'outlinedgwhite'} onClick={()=>navigate('/')}/>
            <CustomButton label={'기업정보 입력하기'} type={'formbtn'} color={'primary'} onClick={()=>navigate('/MyPage/MemberInfoMmt/CorporateInfoMmt')}/>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default BusinessConversionFinish;
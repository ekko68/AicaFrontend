// 이용지원/ ->  전문가신청 페이지
// import React from "react"
import { Box, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import BreadCrumb from '~/components/BreadCrumb';
import * as styles from '~/styles/styles';
import { steps03 } from '~/models/Model';
import { CustomButton } from '~/components/ButtonComponents';
import { useNavigate } from 'react-router-dom';

function ExpertApplicationDetail03() {
  const navigate = useNavigate();

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">전문가 신청</h2>
              <Stepper activeStep={3} alternativeLabel css={styles.step03}>
                {steps03.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className="content">
          <Stack direction="column" justifyContent="center" css={styles.Appli_cont}>
            <Box className="img_icon">
              <img src="/images/common/icon_complete.png"/>
            </Box>
            <Typography variant="h4" component="div">전문가 신청이 완료되었습니다.</Typography>
            <div className="complet_txt">
              담당자가 신청내용 확인 후 승인 여부를 통보해 드릴 예정입니다.<br/>
              궁금하신 내용은 해당 담당자 연락처로 문의바랍니다.
            </div>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
            <CustomButton label={'홈'} type={'listBack'} color={'primary'} onClick={()=> navigate('/')}/>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default ExpertApplicationDetail03;

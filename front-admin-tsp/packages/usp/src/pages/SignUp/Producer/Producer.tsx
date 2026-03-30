import * as styles from './styles';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
// FRN-0010201_회원가입_약관동의/인증 (사업자)

const steps = [
  '약관동의/인증',
  '사업자 공동 인증',
  '가입정보 입력',
  '가입완료',
];

function Producer() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <NavLink to={'/signup'} css={styles.backPass}>
          이전 화면으로 돌아가기
        </NavLink>
        <Stack>
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Stepper activeStep={0} alternativeLabel css={styles.step}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Box sx={{mb: 7}}>
          <div className="sub_tit">
            <h2>사업자 회원가입</h2>
            <p>AICA 회원가입을 위해 약관에 동의해주세요.</p>
          </div>
          <FormGroup sx={{ mb: 1 }}>
            <FormControlLabel control={<Checkbox />} label="모든 약관에 동의합니다." />
          </FormGroup>
          <FormGroup css={styles.listbox}>
            <Box>
              <div>
                <FormControlLabel control={<Checkbox defaultChecked />} label="AICA 이용약관" /><span className='gt blue' onClick={openModal}>(필수)</span>
              </div>
              <div css={styles.errbox}>AICA 이용약관에 동의해주세요</div>
            </Box>
            <Box>
              <div>
                <FormControlLabel control={<Checkbox defaultChecked />} label="AICA 개인정보 수집 및 이용동의" /><span className='gt blue'>(필수)</span>
              </div>
            </Box>
            <Box>
              <div>
                <FormControlLabel control={<Checkbox defaultChecked />} label="AICA  개인정보 제3자 제공 동의" /><span className='gt blue'>(필수)</span>
              </div>
            </Box>
            <Box>
              <div>
                <FormControlLabel control={<Checkbox />} label="마케팅 정보 수신동의" /><span className='gt gray'>(선택)</span>
              </div>
            </Box>
          </FormGroup>
        </Box>
        <Box component="form"
          noValidate
          autoComplete="off"
          css={styles.singTextbox}>
          <div className='inputtxt'>
            사업자 확인 
          </div>
          <TextField
            required
            id="id" 
            label="사업자등록번호" 
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack spacing={2} direction="row" css={styles.btnGroup}>
          <Button variant="contained" type="button" className="linebtn">
            <NavLink to={'/signup'}>
              이전
            </NavLink>
          </Button>
          <Button variant="contained" type="button" >
            <NavLink to={'/producerform'}>
              {'사업자 공동 인증'}
            </NavLink>
          </Button>
        </Stack>
        {/* 모달 팝업부분 */}
        <Modal
          keepMounted
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box css={styles.modalpop}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              AICA 이용약관
              <Button type="button" onClick={closeModal}><CloseIcon/></Button>
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              AICA 이용약관<br/><br/>
              제1조(목적)<br/>
              본 약관은 광주시 인공지능 사업단에서 운영하는 AI직접단지지원포탈(이하 AICA이라고 한다.) 에서 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차와 기타 필요한 사항을 규정함을 목적으로 한다. <br/><br/>
              제1조(목적)<br/>
              본 약관은 광주시 인공지능 사업단에서 운영하는 AI직접단지지원포탈(이하 AICA이라고 한다.) 에서 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차와 기타 필요한 사항을 규정함을 목적으로 한다. <br/><br/>
            </Typography>
            <Stack spacing={2} direction="row" css={styles.btnGroup} sx={{ mt: 3 }}>
              <Button variant="contained" type="button" onClick={closeModal}>확인</Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </section>
  );
}

export default Producer;

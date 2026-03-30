/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from 'react';
import * as styles from '../styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink, useNavigate } from 'react-router-dom';
import { steps } from '~/models/Model';
import { useMutation } from 'react-query';
import { FetchNiceIdPost, FetchNiceIdRes } from '~/fetches/fetchTerms';
import { useGlobalModalStore, useNiceStore } from '~/pages/store/GlobalModalStore';
const _global = (window /* browser */ || global /* node */) as any
/* 
  작성일    :   2022/05/25
  화면명    :   회원가입_보호자 휴대폰 인증 안내
  회면ID    :   UI-USP-FRN-0010901
  화면/개발 :   Seongeonjoo / navycui
*/

const Confirm = () => {
  const navigate = useNavigate();
  const formValues:any = useRef(null);
  const {addModal} = useGlobalModalStore();
  const [encodeData,setEncodeData] = useState('');
  const {setSesionId,sesionId,setJoinKey} = useNiceStore()
  const [encodeDataCallback,setEncodeDataCallback] = useState('');


  useEffect(() => {
    niceInit()
  }, []);

  // 본인인증 서비스 요청
  const {mutate:niceInit} = useMutation(async () => await FetchNiceIdPost({successUrl:`${process.env.REACT_APP_SUCCESS_NICE_URL}`,failUrl:`${process.env.REACT_APP_FAIL_NICE_URL}`}), {
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message
      })
    },
    onSuccess: (data) => {
      setEncodeData(data.encData);
    }
  });

    // 본인인증 서비스 결과 저장
    const {mutate:niceResSave}:any = useMutation(async () => await FetchNiceIdRes({encodeData: encodeDataCallback,sessionId: sesionId}), {
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message
      })
      window.location.href = '/';
    },
    onSuccess: (data) => {
      if (!!data.key) {
          setJoinKey(data.key)
          sessionStorage.setItem("__JOIN_KEY__", data.key);
      }

      if(data.childYn){
        // -> 3. 14미만 확인 이동
        navigate('/signup/confirm',({
          state: {
            niceRes:data
          }
        }))
      } else {
        // -> 3.1 개인정보입력
        navigate('/signup/ConsumerForm',({
          state: {
            loginId:''
          }
        }))
      }
    }
  });

  // 본인인증 서비스 팝업
  const fnPopup = () => {
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
    formValues.current.action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    formValues.current.target = "popupChk";
    formValues.current.submit();
  }
  // 팝업창 콜백
  _global.setEncodeData = (encodeData:string)=>{
    if(!!encodeData){
      setEncodeDataCallback(encodeData)
      niceResSave()
    }
  }


  return (
    <section css={styles.container}>
      <Box css={styles.backPass}>
        <NavLink to={'/signup'}>
          이전 화면으로 돌아가기
        </NavLink>
      </Box>
      <div css={styles.content}>
        <Stack className="join_head">
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Box className="step_scroll">
            <Stepper css={styles.step} activeStep={1} alternativeLabel className="steprt">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
        <Box sx={{mb: 7}}>
          <Box className="confirm_tit">
            <Box className="cli_img">
              <img src="/images/common/icon_err.png"/>
            </Box>
            <p>만 14세 미만은 보호자(법적대리인)의<br className="mo"/> 동의 및 인증 후 가입이 가능합니다.</p>
          </Box>
            <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary" onClick={()=>fnPopup()}>
                보호자 휴대폰 인증
              </Button>
            </Stack>
          </Box>
      </div>
    </section>
  );
}

export default Confirm;
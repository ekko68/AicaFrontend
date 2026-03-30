import React, { useState,useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as styles from '../styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { steps } from '~/models/Model';
import { TermsResponse } from '~/models/Model';
import { fetchTermsGet,fetchTermsImsi } from '~/fetches';
import { CustomCheckBoxs } from './CustomCheckBoxs';
import { ConsumerModal } from './ConsumerModal';
import { CustomButton } from '~/components/ButtonComponents';
import styled from '@emotion/styled';
import { Button, Input } from '@mui/material';
import { FetchNiceIdPost, FetchNiceIdRes } from '~/fetches/fetchTerms';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { useNiceStore } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/05/23
  화면명    :   FRN-0010201_회원가입_약관동의/인증 (개인)
  회면ID    :   UI-USP-FRN-0010201
  화면/개발 :   Seongeonjoo / navycui
*/
const _global = (window /* browser */ || global /* node */) as any

const Consumer = () => {
  const {addModal} = useGlobalModalStore();
  const {setSesionId,sesionId,setJoinKey} = useNiceStore()
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const formValues:any = useRef(null);
  const [encodeData,setEncodeData] = useState('');
  const [encodeDataCallback,setEncodeDataCallback] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [termsBox, setTermsBox] = useState<TermsResponse[]>([]);
  const [validationBox, setValidationBox] = useState<string[]>([]);
  const [ctx, setCtx] = useState<string>("");
  const [titx, setTitx] = useState<string>("");
  const returnedTarget:TermsResponse[] = [];
  
  // 약관 조회
  const getSearchCategory = async () => {
    const box = await Promise.all([ fetchTermsGet('TERMS_OF_USE'), fetchTermsGet('PRVC_CLCT_AGRE_MBR')])
    box.map((item,key)=>{
      if(!!item){
        item.list.map((mbox:any)=>{
          returnedTarget.push(mbox)
        })
      }
    })
    setTermsBox(returnedTarget)
  };
  
  useEffect(() => {
    getSearchCategory();
    niceInit()
  }, []);

  // 휴대폰 인증
  const handelCertification = () => {
    const boxvalue3:any = [];
    setIsValid(false)
    let boxvalue = termsBox.filter((m)=>{ return m.required == true})
    let boxvalue2 = validationBox.filter((m)=>{ return m.includes("false")})
    if(((validationBox.length) - (boxvalue2.length))< boxvalue.length){
      setIsValid(true)
      return;
    }
    termsBox.map((item,key)=>{
      let isItem = validationBox.filter((m)=>{ return m.includes(key+"")});
      if(isItem.length>0){
        boxvalue3.push({beginDay:item.beginDay,required:item.required,termsType:item.termsType,consentYn:true})
        // setTermsImsiBox(boxvalue3);
      }
    })

    //약관 동의 후 임시 저장
    fetchTermsImsi(boxvalue3).then((res)=>{
      setSesionId(res.key)
      fnPopup();

    }).catch((e)=>{
      addModal({
        type:'normal',
        open: true,
        content: e.response.data.message
      })
    });
  }

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
      /*
        -> 프로세스 정의
          1. 휴대폰 인증 결과에 따라 분기 처리 ( 기가입여부 확인 / 탈퇴여부 확인 / 14미만 확인 이동)
      */
      // 1. 휴대폰 인증 결과에 따라 분기 처리 회원가입-휴대폰 본인인증 PRG-COM-MBR-06 솔루션

      // -> 2. 기가입여부 확인
      if (typeof window !== "undefined") {

        if(data.duplicateYn){
          // -> 2.1.탈퇴여부 확인
            if(data.secessionYn){ // 탈퇴계정 전환안내(개인) UI-USP-FRN-0011602 호출
              navigate('/signup/WithdrawCon',({
                state: {
                  loginId: data.loginId
                }
              }))
            } else { // out 7 day // 기가입 안내 (개인) UI-USP-FRN-0011601 -> 로그인
              navigate('/signup/existConsumer',({
                state: {
                  loginId:data.loginId
                }
              }))
            } 
            window.close();
        } else {
          if(data.childYn){
            // -> 3. 14미만 확인 이동
            navigate('/signup/confirm',({
              state: {
                loginId:''
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
            <Stepper activeStep={0} alternativeLabel css={styles.step} className="steprt">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
        <Box className="sub_tit">
          <h2>개인 회원가입</h2>
          <p>AICA 회원가입을 위해 약관에 동의해주세요.</p>
        </Box>
        <Box>
          <FormGroup className="checklable" sx={{ mb: 2 }}>
            <FormControlLabel sx={{marginLeft: 0}} control={<CheckboxStyle checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
              setAllCheck(!allCheck)
            }}/>} label="모든 약관에 동의합니다." />
          </FormGroup>
          <FormGroup css={styles.listbox}>
            <CustomCheckBoxs
              checkbox={termsBox}
              isAll={allCheck}
              isValid={isValid}
              onClick={(s: string[]) => {
                setValidationBox(s)
                if(termsBox.length !== 0){
                  setAllCheck((s.length) === (termsBox.length))
                }
              }}
              modalOpen={(contents: string,titleText: string)=>{
                setCtx(contents)
                setTitx(titleText)
                setModalOpen(true);
              }}
            />
          </FormGroup>
        </Box>
        <Stack direction="row" justifyContent={'center'} spacing={2} css={styles.signbtn}>
            <CustomButton label={'이전'} type={'formbtn'} color={'outlinedgwhite'} onClick={()=>navigate('/signup')} />
            <CustomButton label={'휴대폰 본인인증'} type={'formbtn'} color={'primary'} onClick={handelCertification} />
        </Stack>
        {/* 모달 팝업부분 */}
        <ConsumerModal isOpen={modalOpen} modalClose={()=>{setModalOpen(false)}} ctx={ctx} titx={titx}/>
      </div>
      {/* <!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. --> */}
      <Box component='form' sx={{display:'none'}} name="form_chk" method="post" onSubmit={fnPopup} ref={formValues} style={{ textAlign: 'center'}}>
        <Input  type="hidden" name="m" value="checkplusService" />  {/* 필수 데이타로, 누락하시면 안됩니다. */}
        <Input  id="EncodeData" type="hidden" name="EncodeData" value={encodeData} />  {/* 위에서 업체정보를 암호화 한 데이타입니다. */}
        <Button id="btn-click" variant="contained" type="submit" className="linebtn" sx={{ mt:10 }}>안심본인인증 테스트</Button>
      </Box>
    </section>
  );
}

const CheckboxStyle = styled(Checkbox)`
  &.MuiCheckbox-root{
    padding: 0;
    margin-right: 10px;
  }
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 4px;
    path {
      display: none;
    }
  }
  .MuiFormControlLabel-root{
    margin-left: 0;
  }
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border-radius: 3px;
  }
  &.Mui-checked {
    &:before {
      border: none;
      background:  url('/images/common/checkbox_active.png');
    }
    .MuiSvgIcon-root{
      background: none;
    }
  }
`;

export default  Consumer;
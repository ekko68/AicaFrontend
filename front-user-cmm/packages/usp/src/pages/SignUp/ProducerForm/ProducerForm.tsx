import React, { useState,useRef,useEffect } from 'react';
import {useMutation} from "react-query";
import * as styles from '../styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { NavLink,useNavigate } from 'react-router-dom';
import { steps } from '~/models/Model';
import { CustomRadioButtons } from '~/components/ButtonComponents';
import { inithonBiz, joinBizErrorType,inithonBizErrors,emailReg, joinMemberType } from '~/models/ModelSignin';
import { fetchCheckUserId, fetchSignUp, fetchSignUpEmailRes,fetchSignUpPhoneRes,fetchSignUpPhoneCk, fetchSignUpEmailCk } from '~/fetches';
import { InputAdornment } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { useNiceStore } from '~/pages/store/GlobalModalStore';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/05/30
  화면명    :   회원가입_정보입력 (사업자)
  회면ID    :   UI-USP-FRN-0010601
  화면/개발 :   Seongeonjoo / navycui
*/
function ProducerForm() {
  const navigate = useNavigate();
  const {joinKey} = useNiceStore()
  const {addModal} = useGlobalModalStore();
  const ssid = sessionStorage.getItem("__BIZ_JOIN_KEY__");
  const formData = new FormData();
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const intervalRefEl: { current: NodeJS.Timeout | null } = useRef(null);

  const [bizForm, setBizForm] = useState<joinMemberType>(inithonBiz);
  const [bizNmValidation, setBizNmValidation] = useState<joinBizErrorType>(inithonBizErrors);
  const [minutes, setMinutes] = useState(10); // 분
  const [seconds, setSeconds] = useState(0); // 초
  const [minutesEl, setMinutesEl] = useState(10); // 분
  const [secondsEl, setSecondsEl] = useState(0); // 초

  const [count1, setCount1] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isPerson, setIsPerson] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [emailCertKey, setEmailCertKey] = useState<string>("");
  // 이메일 인증 요청
  formData.append('email',bizForm.email);
  const {mutate} = useMutation(async () => await fetchSignUpEmailRes(formData), {
    onError: (error, variable, context) => {
      // error
      console.log("error", variable);
    },
    onSuccess: (data) => {
      const {key} = data;
      if(!!key){
        addModal({
          open: true,
          content: '인증 번호 발송되었습니다'
        })
        setCount(1); setMinutes(9); setSeconds(59);
        setEmailCertKey(key) 
      }
    }
  });

  // 메일 타이머
  useEffect(() => {
    if(count>0) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            alert("인증이 만료 되었습니다.")
            clearInterval(intervalRef.current as NodeJS.Timeout);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      return ;
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [minutes, seconds]);

  // 핸드폰 타이머
  useEffect(() => {
    if(count1>0) {
      intervalRefEl.current = setInterval(() => {
        if (secondsEl > 0) {
          setSecondsEl(secondsEl - 1);
        }
        if (secondsEl === 0) {
          if (minutesEl === 0) {
            addModal({
              open: true,
              content: '인증이 만료 되었습니다'
            })
            setCount1(0);setMinutesEl(10);setSecondsEl(0);
            clearInterval(intervalRefEl.current as NodeJS.Timeout);
          } else {
            setMinutesEl(minutesEl - 1);
            setSecondsEl(59);
          }
        }
      }, 1000);
    } else {
      return ;
    }
    return () => clearInterval(intervalRefEl.current as NodeJS.Timeout);
  }, [minutesEl, secondsEl]);


  // 중복 확인
  const handelCheckId = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(!bizForm.loginId){
      setBizNmValidation({...bizNmValidation,loginId:true,idlabel:"아이디는 필수입니다",});
      // setLabels({...labels,labelsTextemail:"이메일 인증 진행하세요."});
      return false;
    }
    const form = new FormData();
    // 아이디 중복 확인 호출
    formData.append('loginId',bizForm.loginId)
    fetchCheckUserId(form).then((res:any)=>{
      if(res.data.duplicateYn){
        // addModal({
        //   type:'normal',
        //   open:true,
        //   content:'중복된 아이디입니다.'
        // })
        setBizNmValidation({...bizNmValidation,idlabel:"중복된 아이디입니다.."});

      }else { //helperTexts.helperTextloginId
        setBizForm({...bizForm,loginDisabled:true})
        setBizNmValidation({...bizNmValidation,idlabel:"사용가능한 아이디입니다."});
      }
    }).catch((e)=>{

    });
  }

  // 메일 인증 요청
  const handelOnCallMail = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(!bizForm.email) {
      setBizNmValidation({...bizNmValidation,email:true,mgrEmaillabel:"이메일 필수입니다..",});
      return false;
    }
    if(!emailReg.test(bizForm.email) ){
      setBizNmValidation({...bizNmValidation,email:true,mgrEmaillabel:"이메일 형식이 맞지않습니다.",});
      // setLabels({...labels,labelsTextemail:"이메일 형식이 맞지 않습니다."});
      return false;			
    }
    // // 이메일 인증 요청 실행
    mutate()
  }

  // 메일 인증 확인
  const handelOnCallMailCk = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if(!bizForm.certNo){
      setBizNmValidation({...bizNmValidation,certNo:true,certNolabel:"인증번호 입력하세요",});
      return false;
    }
    const formData = new FormData();
    //이메일 확인 실행  
    formData.append('emailCertKey',emailCertKey);
    formData.append('certNo',bizForm.certNo); 
    fetchSignUpEmailCk(formData).then((res:any)=>{
      setCount(0);setMinutes(10);setSeconds(0);
      setBizForm({...bizForm,ertNoDisabled:true,CertNoMaill:true})
      addModal({
        open: true,
        content: '인증 완료되었습니다.'
      })
        
    }).catch((e)=>{
      addModal({
        open: true,
        content: e.response.data.message
      })
    })
  }

  // 핸드폰 인증 요청
  const handelOnCallTel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(!bizForm.mobileNo) {
      setBizNmValidation({...bizNmValidation,mobileNo:true,mgrTellabel:"담당자휴대폰번호를 입력해주세요.",});
      return false;
    }

    const formData = new FormData();
    formData.append('mobileNo',bizForm.mobileNo);
    // 핸드폰 인증요청 실행
    fetchSignUpPhoneRes(formData).then((res:any)=>{
      if(res.data.duplicateYn){
        // addModal({
        //   type:'normal',
        //   open:true,
        //   content:''
        // })
        setBizNmValidation({...bizNmValidation,idlabel:"아이디입니다.."});

      }else { //helperTexts.helperTextloginId
        setBizForm({...bizForm,loginDisabled:true})
        setBizNmValidation({...bizNmValidation,idlabel:"아이디입니다."});
      }
    }).catch((e)=>{

    });
  }

  // 핸드폰 인증 확인
  const fetchSignUpTelCk = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if(!bizForm.certNoTel){
      setBizNmValidation({...bizNmValidation,idlabel:"인증번호 입력하세요."});
      return false;
    }
    const fmData = new FormData();
    //이메일 확인 실행  
    fmData.append('emailCertKey',emailCertKey);
    fmData.append('certNo',bizForm.certNoTel); 
    fetchSignUpPhoneCk(fmData).then((res:any)=>{
      setCount(0);setMinutes(10);setSeconds(0);
      setBizForm({...bizForm,ertNoDisabled:true,CertNoTel:true})
      addModal({
        open: true,
        content: '인증 완료되었습니다.'
      })
        
    }).catch((e)=>{
      addModal({
        open: true,
        content: e.response.data.message
      })
    })
  }

  // 화원 가입 호출
  const handelOnSubmitJoin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 
    if(!ckForm()) return 
    if(!ssid){
      addModal({
        open: true,
        content: '인증번호를 확인해 주세요'
      })
      return;
    }

    if(""){
      addModal({
        open: true,
        content: '이메일 인증을 완료해 주세요'
      })
      return;
    }

    if(""){
      addModal({
        open: true,
        content: '이메일 인증을 완료해 주세요'
      })
      return;
    }
    // setBizForm({ ...formValues, sessionId: ssid ? ssid : ''});

    // fetchSignUp({}).then((res)=>{
    //   navigate('/signup/CompleteConsumer')
    // }).catch((e)=>{
    //   addModal({
    //     open: true,
    //     content: e.response.data.message
    //   })
    // })
    
  }
  // form validation check
  const ckForm = ():boolean => {
    // if(ckForm)
    if(!bizForm.memberNm){
      setBizNmValidation({...bizNmValidation,memberNm:true,bizNmlabel:"사업자명은 필수입니다",});
      return false;
    }
    if(!bizForm.ceoNm){
      setBizNmValidation({...bizNmValidation,ceoNm:true,ceoNamelabel:"대표자명은 필수입니다",});
      return false;
    };
    if(isPerson){
      if(!bizForm.jurirno){
        setBizNmValidation({...bizNmValidation,jurirno:true,bizNolabel:"법인등록번호는 필수입니다",});
        return false;
      };
    }
    if(!bizForm.chargerNm) {
      setBizNmValidation({...bizNmValidation,chargerNm:true,mgrNmlabel:"담당자명은 필수입니다",});
      return false;
    }
    if(!bizForm.mobileNo) {
      setBizNmValidation({...bizNmValidation,mobileNo:true,mgrTellabel:"담당자 휴대폰번호는 필수입니다",});
      return false;
    }
    if(!emailReg.test(bizForm.email) ){
      setBizNmValidation({...bizNmValidation,email:true,mgrEmaillabel:"이메일 형식이 맞지않습니다.",});
      return false;			
    }
    if(!bizForm.certNo){
      setBizNmValidation({...bizNmValidation,certNo:true,certNolabel:"인증번호는 필수입니다",});
      return false;
    }
    if(!bizForm.loginId){
      setBizNmValidation({...bizNmValidation,loginId:true,idlabel:"아이디는 필수입니다",});
      return false;
    }
    if(!bizForm.passwd1){
      setBizNmValidation({...bizNmValidation,passwd1:true,passwordlabel:"비밀번호는 필수입니다",});
      return false;
    }
    if(!bizForm.passwd2){
      setBizNmValidation({...bizNmValidation,passwd2:true,password2label:"비밀번호 확인 필수입니다",});
      return false;
    }
    return true;
  };

  // 사업정보 입력
  const handelChangebizNm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBizForm({
      ...bizForm,
      [e.target.name]: e.target.value
    });
    setBizNmValidation({...bizNmValidation,[e.target.name]: false});
  }
  
  return (
    <section css={styles.container}>
      <Box css={styles.backPass}>
        <NavLink to={'/signup/producer'}>
          이전 화면으로 돌아가기
        </NavLink>
      </Box>
      <div css={styles.content} className="heightfull">
        <Stack className="join_head">
          <div className="tit">
            <h1>AICA 회원가입</h1>
          </div>
          <Box className="step_scroll">
            <Stepper activeStep={2} alternativeLabel css={styles.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
        <Box sx={{mb: 5}}>
          <div className="sub_tit">
            <h2>사업자 회원 가입</h2>
            <p>AICA 회원가입에 필요한 정보를 입력해주세요.</p>
          </div>
        </Box>
        <dl css={styles.input_group}>
          <dt className='star'>
              사업자 유형
          </dt>
          <dd>
            <Box component="form" noValidate autoComplete="off" className="input_radio" name="CustomRadioButtons">
              <CustomRadioButtons
                row
                data={[{code:'biz1',codeNm:'개인사업자'},{code:'biz2',codeNm:'법인사업자'},{code:'biz3',codeNm:'대학'}]}
                onClick={(selected) => {
                  if(selected == "biz1"){
                    setBizForm(inithonBiz)
                    setBizNmValidation(inithonBizErrors)
                    setIsPerson(false)
                  } else {
                    setBizForm(inithonBiz)
                    setBizNmValidation(inithonBizErrors)
                    setIsPerson(true)
                  }
                }}
              />
            </Box>
          </dd>
        </dl>
        <dl css={styles.input_group}>
          <dt>
              사업자 정보
              <span className="input_star">*필수</span>
          </dt>
          <dd>
            <Box component="form"
              noValidate
              autoComplete="off"
              css={styles.singform}>
              <TextField
                required
                name="memberNm"
                value={bizForm.memberNm} 
                label={bizNmValidation.memberNm ? bizNmValidation.bizNmlabel:"사업자명"}
                helperText={bizNmValidation.memberNm ? bizNmValidation.bizNmlabel : "" }
                error={bizNmValidation.memberNm}
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
              />
              <TextField
                required
                name="ceoNm"
                value={bizForm.ceoNm} 
                label={bizNmValidation.ceoNm ? bizNmValidation.ceoNamelabel : "대표자명"}
                error={bizNmValidation.ceoNm}
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
              />
            {isPerson ? 
              <TextField
                required
                name="jurirno"
                value={bizForm.jurirno}
                label={bizNmValidation.jurirno ? bizNmValidation.bizNolabel : "법인등록번호"}
                error={bizNmValidation.jurirno}
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
              />: null}
            </Box>
          </dd>
        </dl>
        <dl css={styles.input_group}>
          <dt>
              담당자 정보
          </dt>
          <dd>
            <Box component="form"
              noValidate
              autoComplete="off"
              css={styles.singform}>
              <TextField
                required
                name="chargerNm"
                value={bizForm.chargerNm}
                label={bizNmValidation.chargerNm ? bizNmValidation.mgrNmlabel : "담당자명"}
                error={bizNmValidation.chargerNm}
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
              />
              <TextField
                required
                name="mobileNo"
                value={bizForm.mobileNo} 
                label={bizNmValidation.mobileNo ? bizNmValidation.mgrTellabel : "담당자 휴대폰번호"}
                error={bizNmValidation.mobileNo} 
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
                placeholder="'-'을 제외한 숫자만 입력"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button className='rbt' disabled={bizForm.ertNoDisabled} onClick={handelOnCallTel}>휴대폰인증</Button>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="certNoTel"
                value={bizForm.certNoTel} 
                label={bizNmValidation.certNo ? bizNmValidation.certNolabel : "휴대폰 인증번호"}
                error={bizNmValidation.certNo}  
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
                placeholder="숫자만 입력"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <span className='rbt'>{minutesEl}:{secondsEl < 10 ? `0${secondsEl}` : secondsEl}</span>
                        <Button className='rbt block' disabled={bizForm.CertNoTel} onClick={fetchSignUpTelCk}>확인</Button>
                        {/* block class 들어가면 비활성 */}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="email" 
                value={bizForm.email}
                label={bizNmValidation.email ? bizNmValidation.mgrEmaillabel : "담당자 이메일"}
                error={bizNmValidation.email} 
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
                placeholder="인증 가능한 이메일 주소 입력"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button className='rbt' disabled={bizForm.emailDisabled} onClick={handelOnCallMail}>메일인증</Button>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="certNo"
                value={bizForm.certNo} 
                label={bizNmValidation.certNo ? bizNmValidation.certNolabel : "이메일 인증번호"}
                error={bizNmValidation.certNo}  
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
                placeholder="숫자만 입력"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className='rbt'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                      <Button className='rbt block' disabled={bizForm.CertNoMaill} onClick={handelOnCallMailCk}>확인</Button>
                      {/* block class 들어가면 비활성 */}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </dd>
        </dl>
        <dl css={styles.input_group}>
          <dt>
              아이디 정보
          </dt>
          <dd>
            <Box component="form"
              noValidate
              autoComplete="off"
              css={styles.singform}>
              <TextField
                required
                name="loginId"
                value={bizForm.loginId} 
                label={bizNmValidation.loginId ? bizNmValidation.idlabel : "아이디"}
                error={bizNmValidation.loginId}
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
                placeholder="4~12자 영문자 대소문자"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button className='rbt' onClick={handelCheckId}>중복확인</Button>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                name="passwd1"
                value={bizForm.passwd1}
                label={bizNmValidation.passwd1 ? bizNmValidation.passwordlabel : "비밀번호"}
                error={bizNmValidation.passwd1}  
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
                placeholder="8~16자 영문 대소문자,숫자,특수문자"
              />
              <TextField
                required
                name="passwd2"
                value={bizForm.passwd2} 
                label={bizNmValidation.passwd2 ? bizNmValidation.password2label : "비밀번호 확인"}
                error={bizNmValidation.passwd2}   
                variant="filled"
                onChange={handelChangebizNm}
                fullWidth
              />
            </Box>
          </dd>
        </dl>
        <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
          <CustomButton label={'가입하기'} type={'formbtn'} color={'primary'} onClick={handelOnSubmitJoin} />
        </Stack>
      </div>
    </section>
  );
}

export default ProducerForm;

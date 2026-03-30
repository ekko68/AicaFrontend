import React, { useState,useEffect, useRef } from 'react';
import * as styles from '../styles';
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CustomButton } from '~/components/ButtonComponents';
import { steps } from '~/models/Model';
import { 
  fetchCheckUserId,
  fetchSignUpEmailRes,
  fetchSignUpEmailCk,
  fetchSignUp, 
} from '~/fetches';
import { inithonMember } from '~/models/ModelSignin';
import { 
  emailReg,
  joinMemberhelperTextsType,
  joinMemberlabelsType,
  joinMembererrorsType,
  inithonMemberErrors,
  inithonMemberLabels,
  inithonMemberHelperTexts
} from '../../../models/ModelSignin';
import { InputAdornment } from '@mui/material';
import { useGlobalModalStore, useNiceStore } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/05/26
  화면명    :   회원가입_정보입력 (개인)
  회면ID    :   UI-USP-FRN-0010501
  화면/개발 :   Seongeonjoo / navycui
*/
const ConsumerForm = () => {
  const navigate = useNavigate();
  const {joinKey} = useNiceStore()
  const {addModal} = useGlobalModalStore();
  const ssid = sessionStorage.getItem("__JOIN_KEY__");
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [minutes, setMinutes] = useState(10); // 분
  const [seconds, setSeconds] = useState(0); // 초
  const [count, setCount] = useState<number>(0);
  const [formValues, setFormValues] = useState(inithonMember);
  const [emailCertKey, setEmailCertKey] = useState<string>("");
  const [loginDisabled,setLoginDisabled] = useState<boolean>(false);
  const [emailDisabled,setEmailDisabled] = useState<boolean>(false);
  const [ertNoDisabled,setCertNoDisabled] = useState<boolean>(false);
  const [joinDisabled,setJoinDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<joinMembererrorsType>(inithonMemberErrors);
  const [labels, setLabels] = useState<joinMemberlabelsType>(inithonMemberLabels);
  const [helperTexts, setHelperTexts] = useState<joinMemberhelperTextsType>(inithonMemberHelperTexts);
 console.log('ConsumerForm : => useEffect',ssid);
  // timeout
  useEffect(() => {
    if(count>0) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setHelperTexts({...helperTexts,helperTextcertNo:"인증이 만료 되었습니다."});
            setEmailCertKey("")
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

  useEffect(() => {
    if(ssid !== ''){
      setFormValues((prev:any)=>({...prev,sessionId: ssid}));
    }
  }, []);

  // 입력 이벤트
  const handelOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("inithonMemberErrors",e.target.name);
    setErrors(inithonMemberErrors);
    setLabels(inithonMemberLabels);
    setHelperTexts(inithonMemberHelperTexts)
    if(e.target.name == 'loginId'){
      setLoginDisabled(false)
    }
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // 중복 확인
  const handelCheckId = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(!formValues.loginId){
      setErrors({...errors,errorloginId:true});
      setLabels({...labels,labelsTextloginId:"아이디는 필수입니다."});
      return false;
    }
    const form = new FormData();
    // 아이디 중복 확인 호출
    form.append('loginId',formValues.loginId);
    fetchCheckUserId(form).then((res)=>{
      if(res.data.duplicateYn){
        // addModal({
        //   type:'normal',
        //   open:true,
        //   content:'중복된 아이디입니다.'
        // })
        setHelperTexts({...helperTexts,helperTextloginId:"중복된 아이디입니다.."});

      }else { //helperTexts.helperTextloginId
        setLoginDisabled(true)
        setHelperTexts({...helperTexts,helperTextloginId:"사용가능한 아이디입니다."});
      }
    }).catch((e)=>{
        addModal({
          type:'normal',
          open:true,
          content: e.response.data.message
        })
    });

  }

  // 메일 인증 요청
  const handelOnCallMail = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email',formValues.email)
    if(!formValues.email) {
      setErrors({...errors,erroremail:true});
      setLabels({...labels,labelsTextemail:"이메일 필수입니다."});
      return false;
    }
    if(!emailReg.test(formValues.email) ){
      setErrors({...errors,erroremail:true});
      setLabels({...labels,labelsTextemail:"이메일 형식이 맞지 않습니다."});
      return false;			
    }

    // 인증 호출 FetchSignUpEmailRes
    fetchSignUpEmailRes(formData).then((res)=>{
      const {key} = res;
      if(!!key){
        addModal({
          type:'normal',
          open: true,
          content: '인증 번호 발송되었습니다'
        })
        setCount(1); setMinutes(9); setSeconds(59);
        setEmailCertKey(key) 
      }
    }).catch((e)=>{
      alert("status:" + e.response + "원인:" + e.response.data.message);
    })
  }

  // 메일 인증 확인
  const handelOnCallCheck = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if(!formValues.certNo){
      setHelperTexts({...helperTexts,helperTextcertNo:"인증번호 입력하세요"});
      return false;
    }
    const formData = new FormData();
    //이메일 확인 실행  
    formData.append('emailCertKey',emailCertKey);
    formData.append('certNo',formValues.certNo); 
    fetchSignUpEmailCk(formData).then((res:any)=>{
      setCount(0);setMinutes(10);setSeconds(0);
      setEmailDisabled(true)
      setCertNoDisabled(true)
      addModal({
        type:'normal',
        open: true,
        content: '인증 완료되었습니다.',
        onConfirm:() => {
          setJoinDisabled(false)
        },
      })
        
    }).catch((e)=>{
      addModal({
        type:'normal',
        open: true,
        content: e.response.data.message
      })
    })
  }

  // 화원 가입 호출
  const handelOnSubmitJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if(!ckForm) return;

    if(!ssid){
      addModal({
        type:'normal',
        open: true,
        content: '본인인증을 먼저 수행하세요'
      })
      return;
    }

    if(!emailDisabled){
      addModal({
        type:'normal',
        open: true,
        content: '이메일 인증을 완료해 주세요'
      })
      return;
    }

    if(!ertNoDisabled){
      addModal({
        type:'normal',
        open: true,
        content: '이메일 인증 먼저 수행하세요'
      })
      return;
    }
    
    fetchSignUp(formValues).then((res)=>{
      navigate('/signup/CompleteConsumer',{
        state:{
          username: !!res.memberNm ? res.memberNm : 'haijun'
        }
      })
    }).catch((e)=>{
      addModal({
        type:'normal',
        open: true,
        content: e.response.data.message
      })
    })
    
  }
  // form validation check
  const ckForm = ():boolean => {
    // if(ckForm)
    if(!formValues.loginId){
      setErrors({...errors,errorloginId:true});
      setLabels({...labels,labelsTextloginId:"아이디는 필수입니다."});
      return false;
    }
    if(!formValues.passwd1){
      setErrors({...errors,errorpasswd1:true});
      setLabels({...labels,labelsTextpasswd1:"핸드폰 번호는 필수입니다."});
      return false;
    };
    if(!formValues.passwd2){
      setErrors({...errors,errorpasswd2:true});
      setLabels({...labels,labelsTextpasswd2:"핸드폰 번호는 필수입니다."});
      return false;
    };
    if(!formValues.email) {
      setErrors({...errors,erroremail:true});
      setLabels({...labels,labelsTextemail:"이메일 필수입니다."});
      return false;
    }
    if(!emailReg.test(formValues.email) ){
      setErrors({...errors,erroremail:true});
      setLabels({...labels,labelsTextemail:"이메일 형식이 맞지 않습니다."});
      return false;			
    }
    if(!formValues.certNo) {
      setErrors({...errors,errorcertNo:true});
      setLabels({...labels,labelsTextcertNo:"인증번호 입력하세요"});
      return false;
    }
    return true;
  };

  return (
    <Box component="form" id="signForm" onSubmit={handelOnSubmitJoin} noValidate autoComplete="off">
      <section css={styles.container}>
        <Box css={styles.backPass}>
          <NavLink to={'/signup/consumer'}>
            이전 화면으로 돌아가기
          </NavLink>
        </Box>
        <div css={styles.content}>
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
              <h2>가입정보</h2>
              <p>AICA 회원가입에 필요한 정보를 입력해주세요.</p>
            </div>
          </Box> 
          <Box component="div" css={styles.singform}>
            <Box component="div">
              <TextField
                name="loginId"
                variant="filled"
                required
                fullWidth
                error={errors.errorloginId}
                label={!errors.errorloginId ? "아이디" : "아이디는 필수입니다"}
                helperText={helperTexts.helperTextloginId}
                onChange={handelOnChangeInput}
                placeholder="4~12자 영문자 대소문자"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button className='rbt' name='loginId' disabled={loginDisabled} onClick={handelCheckId}>중복확인</Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box component="div">
              <TextField
                required
                name="passwd1" 
                type="password" 
                variant="filled"
                error={errors.errorpasswd1}
                label={labels.labelsTextpasswd1}
                helperText={helperTexts.helperTextpasswd1}
                fullWidth
                onChange={handelOnChangeInput}
                placeholder="8~16자 영문 대소문자,숫자,특수문자"
              />
            </Box>
            <Box component="div">
              <TextField
                required
                name="passwd2"
                type="password"  
                variant="filled"
                error={errors.errorpasswd2}
                label={labels.labelsTextpasswd2}
                helperText={helperTexts.helperTextpasswd2}
                fullWidth
                onChange={handelOnChangeInput}
              />
            </Box>
            <Box component="div">
              <TextField
                required
                name="email" 
                variant="filled"
                error={errors.erroremail}
                label={labels.labelsTextemail}
                helperText={helperTexts.helperTextemail}
                fullWidth
                onChange={handelOnChangeInput}
                placeholder="인증 가능한 이메일 주소 입력"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button className='rbt' disabled={emailDisabled} onClick={handelOnCallMail}>메일인증</Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box component="div">
              <TextField
                required
                name="certNo" 
                variant="filled"
                error={errors.errorcertNo}
                label={labels.labelsTextcertNo}
                helperText={helperTexts.helperTextcertNo}
                fullWidth
                onChange={handelOnChangeInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box className='rbtime'>
                        <span className='rbt'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                        <Button  disabled={ertNoDisabled} sx={{ display:!!emailCertKey ? '' : 'none'}} className={''} name='certNoEmail'  onClick={handelOnCallCheck}>확인</Button>
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <CustomButton label={'가입하기'} type={'formbtn'} actionType={true} color={'primary'} disabled={joinDisabled} />
          </Stack>
        </div>
      </section>
    </Box>
  );
}
export default ConsumerForm;
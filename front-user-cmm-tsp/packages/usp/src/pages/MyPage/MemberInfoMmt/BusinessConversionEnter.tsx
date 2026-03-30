import React, { useState,useRef,useEffect } from 'react';
import * as styles from '~/styles/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useLocation,useNavigate } from 'react-router-dom';
import { bzmnChangeType, steps02 ,bzmnChangeInitValue,bzmnChangeErrorType,bzmnChangeErrors } from '~/models/Model';
import { CustomRadioButtons } from '~/components/ButtonComponents';
import { emailReg } from '~/models/ModelSignin';
import BreadCrumb from "~/components/BreadCrumb";
import { CustomButton } from '~/components/ButtonComponents';
import { FormControl, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { fetchSelfEmailCertReq,FetchEmailCertReq ,FetchPhoneCertReq,FetchPhoneCertReqCheck,FetchSelfBzmnPhoneChange, FetchEmailCertReqCheck} from '~/fetches';
/* 
  작성일    :   2022/06/16
  화면명    :   이페이지 -> 사용자지원 -> 사업자전환 추가 정보입력
  회면ID    :   UI-USP-FRN-0070301
  화면/개발 :   Seongeonjoo / navycui
*/
function BusinessConversionEnter() {
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const receive:any = useLocation();
  const formData = new FormData();
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const intervalRefEl: { current: NodeJS.Timeout | null } = useRef(null);

  const [formBox, setFormBox] = useState<bzmnChangeType>(bzmnChangeInitValue);
  const [bizNmValidation, setBizNmValidation] = useState<bzmnChangeErrorType>(bzmnChangeErrors);

  const [mgrTel, setMgrTel] = useState<string>('');
  const [mgrEmail, setMgrEmail] = useState<string>('');

  const [minutesMo, setMinutesMo] = useState(10); // 분
  const [secondsMo, setSecondsMo] = useState(0); // 초
  const [minutesEl, setMinutesEl] = useState(10); // 분
  const [secondsEl, setSecondsEl] = useState(0); // 초

  const [count, setCount] = useState<number>(0);
  const [count1, setCount1] = useState<number>(0);
  const [isPerson, setIsPerson] = useState<boolean>(false);

  // test data : hgchoi@brainednet.com  ->  01098835877
  // if(!!receive.state.memberType){
  //   addModal({
  //     open: true,
  //     content: "잘못됨 접근입니다."
  //     // onConfirm:(() => void)
  //   })
  // }

  // 핸드폰 타이머
  useEffect(() => {
    if(count>0) {
      intervalRef.current = setInterval(() => {
        if (secondsMo > 0) {
          setSecondsMo(secondsMo - 1);
        }
        if (secondsMo === 0) {
          if (minutesMo === 0) {
            addModal({
              open: true,
              content: '인증이 만료 되었습니다'
            })
            setCount(0);setMinutesMo(10);setSecondsMo(0);
            clearInterval(intervalRef.current as NodeJS.Timeout);
          } else {
            setMinutesMo(minutesMo - 1);
            setSecondsMo(59);
          }
        }
      }, 1000);
    } else {
      return ;
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [minutesMo, secondsMo]);

  // 이메일 타이머
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

  // 인증 요청
  const handelOnSubmitCall = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let { name }:any =  event.target;

    if(name == 'mgrTel'){ // 핸드폰인증 요청 실행

      if(!mgrTel) { 
        setBizNmValidation({...bizNmValidation,mgrTel:true,mgrTellabel:"핸드폰 번호 필수입니다.",});
        return false;
      }
      //핸드폰인증 요청 실행
      formData.append('mobileNo',mgrTel)
      FetchPhoneCertReq(formData).then((res:any)=>{
        const {key} = res;
        if(!!key){
          setFormBox((pre)=>({...pre,mobileNoCertKey:res.key}))
          setCount(1);setMinutesMo(9);setSecondsMo(59);
          addModal({
            open: true,
            content: '인증 번호 발송되었습니다.'
          })
        }
      }).catch((e)=>{
        setCount(0);setMinutesMo(10);setSecondsMo(0);
        setFormBox((pre)=>({...pre,mobileNoCertKey:''}))
        setBizNmValidation({...bizNmValidation,mgrTel:true,mgrTellabel:e.response.data.message,});
        addModal({
          open: true,
          content: "status:" + e.response.status + e.response.data.message
        })
      })

    } else {

      if(!mgrEmail) {
        setBizNmValidation({...bizNmValidation,mgrEmail:true,mgrEmaillabel:"이메일 필수입니다.",});
        return false;
      }
      if(!emailReg.test(mgrEmail) ){
        setBizNmValidation({...bizNmValidation,mgrEmail:true,mgrEmaillabel:"이메일 형식이 맞지않습니다.",});
        // setLabels({...labels,labelsTextemail:"이메일 형식이 맞지 않습니다."});
        return false;			
      }

      setCount1(1);setMinutesEl(9);setSecondsEl(59);
      // 이메일 인증 요청
      formData.append('email',mgrEmail)
      FetchEmailCertReq(formData).then((res)=>{
        const {key} = res;
        if(!!key){
          setFormBox((pre)=>({...pre,emailCertKey:res.key}))
          addModal({
            open: true,
            content: '인증 번호 발송되었습니다.'
          })
        }
      }).catch((e)=>{
        addModal({
          open: true,
          content: "status:" + e.response.status + e.response.data.message
        })
      })
    }
  }

  // 인증 확인
  const handelOnCallCheck = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let { name }:any =  event.target;

    if(name == 'certNoTel'){  // 핸드폰 인증 확인

      if(!formBox.certNoTel){
        setBizNmValidation({...bizNmValidation,mobileNoCertKey:true,mobileNoCertKeylabel:"인증번호 확인 하세요",});
        return false;
      }

      //핸드폰인증 확인 실행 
      formData.append('mobileNoCertKey',formBox.mobileNoCertKey);
      formData.append('certNo',formBox.certNoTel); 
      FetchPhoneCertReqCheck(formData).then((res:any)=>{
        const {key} = res;
        if(!!key){
          setCount(0);setMinutesMo(10);setSecondsMo(0);
          addModal({
            open: true,
            content: '인증 완료되었습니다.'
          })
        }
      }).catch((e)=>{
        // setCount(0);setMinutesMo(10);setSecondsMo(0);
        setBizNmValidation({...bizNmValidation,mgrTel:true,mgrTellabel:e.response.data.message,});
        addModal({
          open: true,
          content: "status:" + e.response.status + e.response.data.message
        })
      })

    } else {

      if(!formBox.emailCertKey){
        setBizNmValidation({...bizNmValidation,emailCertKey:true,emailCertKeylabel:"인증번호 확인하하세요",});
        // setLabels({...labels,labelsTextemail:"이메일 인증 진행하세요."});
        return false;
      }

      //이메일 확인 실행  
      formData.append('emailCertKey',formBox.emailCertKey);
      formData.append('certNo',formBox.certNoEmail); 
      FetchEmailCertReqCheck(formData).then((res:any)=>{
        setCount1(0);setMinutesEl(10);setSecondsEl(0);
          addModal({
            open: true,
            content: '인증 완료되었습니다.'
          })
          
      }).catch((e)=>{
        // setCount(0);setMinutesMo(10);setSecondsMo(0);
        setBizNmValidation({...bizNmValidation,mgrEmail:true,mgrEmaillabel:e.response.data.message,});
        addModal({
          open: true,
          content: "status:" + e.response.status + e.response.data.message
        })
      })
    }
  }

  // 사업자 전환 진행
  const handelOnSubmitChange = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 
    // const formData = new FormData(event.currentTarget);
    if(!ckForm()) return;

    if(!formBox.certNoTel){
      setBizNmValidation({...bizNmValidation,mgrTel:true,mgrTellabel:"휴대폰 인증 진행해주세요",});
      // setLabels({...labels,labelsTextemail:"이메일 인증 진행하세요."});
      return false;
    }
    if(!formBox.certNoEmail){
      setBizNmValidation({...bizNmValidation,mgrEmail:true,mgrEmaillabel:"이메일 인증 진행해주세요",});
      // setLabels({...labels,labelsTextemail:"이메일 인증 진행하세요."});
      return false;
    }

    // 사업자 전환 호출
    FetchSelfBzmnPhoneChange(formBox).then((res:any)=>{
      navigate('/MyPage/MemberInfoMmt/BusinessConversionFinish')
    }).catch((err:any)=>{ 
        setBizNmValidation({...bizNmValidation,mgrEmail:true,mgrEmaillabel:err.response.data.message})

    })

  }
  // form validation check
  const ckForm = ():boolean => {
    // if(ckForm)
    if(!formBox.memberNm){
      setBizNmValidation({...bizNmValidation,memberNm:true,memberNmlabel:"사업자명은 필수입니다",});
      // setLabels({...labels,labelsTextloginId:"아이디는 필수입니다."});
      return false;
    }
    if(!formBox.ceoNm){
      setBizNmValidation({...bizNmValidation,ceoNm:true,ceoNmlabel:"대표자명은 필수입니다",});
      // setLabels({...labels,labelsTextpasswd1:"핸드폰 번호는 필수입니다."});
      return false;
    };
    if(isPerson){
      if(!formBox.jurirno){
        setBizNmValidation({...bizNmValidation,jurirno:true,jurirnolabel:"법인등록번호는 필수입니다",});
        // setLabels({...labels,labelsTextpasswd2:"핸드폰 번호는 필수입니다."});
        return false;
      };
    }
    if(!formBox.chargerNm) {
      setBizNmValidation({...bizNmValidation,chargerNm:true,chargerNmlabel:"담당자명은 필수입니다",});
      // setLabels({...labels,labelsTextemail:"이메일 필수입니다."});
      return false;
    }
    if(!mgrTel) {
      setBizNmValidation({...bizNmValidation,mgrTel:true,mgrTellabel:"담당자 휴대폰번호는 필수입니다",});
      // setLabels({...labels,labelsTextcertNo:"인증번호 입력하세요"});
      return false;
    }
    if(!mgrEmail) {
      setBizNmValidation({...bizNmValidation,mgrEmail:true,mgrEmaillabel:"담당자 이메일은 필수입니다",});
      // setLabels({...labels,labelsTextcertNo:"인증번호 입력하세요"});
      return false;
    }
    if(!formBox.mobileNoCertKey){
      setBizNmValidation({...bizNmValidation,mobileNoCertKey:true,mobileNoCertKeylabel:"인증번호 확인하하세요",});
      // setLabels({...labels,labelsTextemail:"이메일 인증 진행하세요."});
      return false;
    }
    if(!formBox.emailCertKey){
      setBizNmValidation({...bizNmValidation,emailCertKey:true,emailCertKeylabel:"인증번호 확인하하세요",});
      // setLabels({...labels,labelsTextemail:"이메일 인증 진행하세요."});
      return false;
    }

    return true;
  };

  // 입력 이벤트
  const handelChangebizNm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBox({
      ...formBox,
      [e.target.name]: e.target.value
    });
    setBizNmValidation({...bizNmValidation,[e.target.name]: false});
  }

  return (
    <div css={styles.container} className="darkbg">
      <Box css={styles.sub_cont01}>
        <div className='benner'>
          <BreadCrumb />
          <div className='content'>
            <div className='txtbox'>
              <h2 className='tit'>사업자로 전환</h2>
              <p>사업자로 전환하기 위해 법인회원 약관 동의하고<br className="mo"/> 공동인증서로 인증 후<br className="pc"/> 사업자 회원가입 <br className="mo"/>정보를 입력해 주세요.</p>
              <Stepper activeStep={1} alternativeLabel css={styles.step}>
                {steps02.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont03}>
        <Box css={styles.formBox}>
          <dl css={styles.input_group}>
            <dt className='star'>
                사업자 유형
            </dt>
            <dd>
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}
                >
                <CustomRadioButtons
                  row
                  data={!!receive.state ? ((receive.state.memberType == 'SOLE') ? [{code:'biz2',codeNm:'법인사업자'}] : [{code:'biz1',codeNm:'개인사업자'},{code:'biz2',codeNm:'법인사업자'}]) : [{code:'biz1',codeNm:'개인사업자'},{code:'biz2',codeNm:'법인사업자'}]}
                  onClick={(selected) => {
                    console.log(selected)
                    if(selected == "biz1"){ // SOLE   CORPORATION
                      setFormBox(bzmnChangeInitValue)
                      setBizNmValidation(bzmnChangeErrors)
                      setIsPerson(false)
                      setMgrTel('')
                      setMgrEmail('')
                    } else if(selected == "biz2") {
                      setFormBox(bzmnChangeInitValue)
                      setBizNmValidation(bzmnChangeErrors)
                      setIsPerson(true)
                      setMgrTel('')
                      setMgrEmail('')
                    } 
                  }}
                />
              </Box>
            </dd>
          </dl>
          <div className="em_right">* 필수</div>
          <dl css={styles.input_group}>
            <dt>
                사업자 정보
            </dt>
            <dd>
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="memberNm"
                  value={formBox.memberNm} 
                  label={bizNmValidation.memberNm ? bizNmValidation.memberNmlabel:"사업자명"}
                  error={bizNmValidation.memberNm}
                  variant="filled"
                  fullWidth
                  onChange={handelChangebizNm}
                />
              </Box>
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="ceoNm"
                  value={formBox.ceoNm} 
                  label={bizNmValidation.ceoNm ? bizNmValidation.ceoNmlabel : "대표자명"}
                  error={bizNmValidation.ceoNm}
                  variant="filled"
                  fullWidth
                  onChange={handelChangebizNm}
                />
              </Box>
              {isPerson ? 
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="jurirno"
                  value={formBox.jurirno}
                  label={bizNmValidation.jurirno ? bizNmValidation.jurirnolabel : "법인등록번호"}
                  error={bizNmValidation.jurirno}
                  variant="filled"
                  fullWidth
                  onChange={handelChangebizNm}
                />
              </Box>: null}
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
                css={styles.singTextbox}>
                <TextField
                  required
                  name="chargerNm"
                  value={formBox.chargerNm}
                  label={bizNmValidation.chargerNm ? bizNmValidation.chargerNmlabel : "담당자명"}
                  error={bizNmValidation.chargerNm}
                  variant="filled"
                  fullWidth
                  onChange={handelChangebizNm}
                />
              </Box>
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="mgrTel"
                  value={mgrTel} 
                  label={bizNmValidation.mgrTel ? bizNmValidation.mgrTellabel : "담당자 휴대폰번호"}
                  error={bizNmValidation.mgrTel} 
                  variant="filled"
                  fullWidth
                  onChange={(e)=> {setMgrTel(e.target.value);setBizNmValidation({...bizNmValidation,mgrTel:false,mgrTellabel:"담당자 휴대폰번호"})}}
                  placeholder="'-'을 제외한 숫자만입력"
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <Box className='rbtime'><Button disabled={false} name="mgrTel" onClick={handelOnSubmitCall}>휴대폰인증</Button></Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="certNoTel"
                  value={formBox.certNoTel} 
                  label={bizNmValidation.mobileNoCertKey ? bizNmValidation.mobileNoCertKeylabel : "인증번호"}
                  error={bizNmValidation.mobileNoCertKey}  
                  variant="filled"
                  fullWidth
                  onChange={handelChangebizNm}
                  placeholder="숫자만 입력"
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <Box className='rbtime'>
                          {minutesMo}:{secondsMo < 10 ? `0${secondsMo}` : secondsMo} 
                          <Button className={formBox.mobileNoCertKey ? "" :"none"} disabled={formBox.mobileNoCertKey ? false : true} name='certNoTel' onClick={handelOnCallCheck}>확인</Button>
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
                </Box>
              <Box component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="mgrEmail" 
                  value={mgrEmail}
                  label={bizNmValidation.mgrEmail ? bizNmValidation.mgrEmaillabel : "담당자 이메일"}
                  error={bizNmValidation.mgrEmail} 
                  variant="filled"
                  fullWidth
                  onChange={(e)=> {setMgrEmail(e.target.value);setBizNmValidation({...bizNmValidation,mgrEmail:false,mgrEmaillabel:"담당자 이메일"})}}
                  placeholder="인증 가능한 이메일 주소 입력"
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <Box className='rbtime'><Button name="mgrEmail" disabled={false} onClick={handelOnSubmitCall}>메일인증</Button></Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <FormControl variant="standard" component="form"
                noValidate
                autoComplete="off"
                css={styles.singTextbox}>
                <TextField
                  required
                  name="certNoEmail"
                  value={formBox.certNoEmail} 
                  label={bizNmValidation.emailCertKey ? bizNmValidation.emailCertKeylabel : "이메일인증번호"}
                  error={bizNmValidation.emailCertKey}  
                  variant="filled"
                  fullWidth
                  onChange={handelChangebizNm}
                  placeholder="숫자만 입력"
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <Box className='rbtime'>
                          {minutesEl}:{secondsEl < 10 ? `0${secondsEl}` : secondsEl} 
                          <Button className={formBox.emailCertKey ? "" :"none"} disabled={formBox.emailCertKey ? false : true} name='certNoEmail' onClick={handelOnCallCheck}>확인</Button> 
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </dd>
          </dl>
        </Box>
        <Box css={styles.card_box} className="cardmg">
          <Box className="tit">
            유의사항
          </Box>
          <List>
            <ListItem>
              <ListItemText
                primary="인증SMS와 인증메일의 인증번호는 최대 10분까지 유효합니다. 유효시간을 넘긴 경우 재인증 진행해주세요."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="인증메일을 받지 못하신 경우 스팸메일을 확인해주시거나 ‘인증메일 재발송’하여 다시 진행해주세요."
              />
            </ListItem>
          </List>
        </Box>
        <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
          <Button type='button' className="linebtn03 full" onClick={()=> navigate('/MyPage/MemberInfoMmt/BusinessConversionSpool')} >취소(실페페이지)</Button>
          <Button type='button' className="primary full" onClick={()=>{
            navigate('/MyPage/MemberInfoMmt/BusinessConversionFinish')
          }} >다음(성공페이지)</Button>
          {/* // navigate('/BusinessConversionFinish') */}
        </Stack>
      </Box>
    </div>
  );
}

export default BusinessConversionEnter;
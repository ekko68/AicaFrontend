import { useState,useRef, Fragment,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigStore } from "../Factor/Factor";
import * as styles from '../styles';
import { useTheme, useMediaQuery, Card, CardContent, Button, Stack, Box, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import {fetchFactorPhoneCertReq,fetchFactorPhoneCertCheck,fetchFactorEmailCertReq,fetchFactorEmailCertCheck} from '~/fetches';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { ModalComponents } from '~/components/ModalComponents';

/*
  화면: 비밀번호 찾기 인증 핸드폰/이메일
  작성자: Seongeonjoo / navycui
  작성일: 20220517
*/
type authType = {
  mobileReq:string
  certMobile:string
  emailReq:string
  certEmail:string
}
const FactorFind = () => {

  // const receive:any = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {addModal} = useGlobalModalStore();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const intervalRef1: { current: NodeJS.Timeout | null } = useRef(null);
  const {mobileNo:mobNo,email:emlVal,key} = useConfigStore();
  const [disTel,setDisTel] = useState(false)
  const [disEmail,setDisEmail] = useState(false)
  const intialValues = {mobileReq: !!mobNo ? mobNo : '', certMobile: '', emailReq: !!emlVal ? emlVal : '', certEmail: ''}

  const [minutes, setMinutes] = useState(5); // 분
  const [seconds, setSeconds] = useState(0); // 초
  const [minutes1, setMinutes1] = useState(5); // 분
  const [seconds1, setSeconds1] = useState(0); // 초

  const [radioType, setRadioType] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [count1, setCount1] = useState<number>(0);
  const [formValues, setFormValues] = useState<authType>(intialValues);

  // 라디오 이벤트
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {

    let valbox = (event.target as HTMLInputElement).value
    setFormValues(intialValues)
    if(valbox === 'tel'){
      setRadioType(true)
    } else {
      setRadioType(false)
    }
  };

  // 다음 이벤트
  const handleSubmitClick = (event: React.MouseEvent<HTMLElement>) => {
    // 인증 번호 체크
    
    if(radioType){
      debugger;
      if(!!!formValues.certMobile){
        setOpen(true);
        setError('휴대폰 인증 진행하세요')
      }
      // 휴대폰 인증 확인
      fetchFactorPhoneCertCheck({key:key,certNo:formValues.certMobile}).then((res:any)=>{
        // const {email,key,mobileNo} = res;
        // sessionStorage.setItem('__FACTOR_KEY__', key);
        navigate('/signin/factorreset',{
          state:{
            // loginId:loginId,
            stus:'pl'
          }
        })
      }).catch((err:any)=>{ 
        let {data:{message}} = err.response
        setOpen(true);
        setError(message)
      });
    } else {
      if(!!!formValues.certEmail){
        setOpen(true);
        setError('이메일 인증 진행하세요')
      }
      // 이메일 인증 확인
      fetchFactorEmailCertCheck({key:key,certNo:formValues.certEmail}).then((res:any)=>{
        const {loginId} = res;
        navigate('/signin/factorreset',{
          state:{ loginId:loginId, stus:'bl'}
        })
      }).catch((err:any)=>{
        let {data:{message}} = err.response
        setOpen(true);
        setError(message)
       });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'mobileReq'){
      setDisTel(false)
    } else {
      setDisEmail(false)
    }

    setFormValues((pre)=>({
      ...pre,[e.target.name]:e.target.value
    }))
  }

  // timeout tel
  useEffect(() => {
    if(count>0) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
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

  // timeout email
  useEffect(() => {
    if(count1>0) {
      intervalRef1.current = setInterval(() => {
        if (seconds1 > 0) {
          setSeconds1(seconds1 - 1);
        }
        if (seconds1 === 0) {
          if (minutes1 === 0) {
            clearInterval(intervalRef1.current as NodeJS.Timeout);
          } else {
            setMinutes(minutes1 - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      return ;
    }
    return () => clearInterval(intervalRef1.current as NodeJS.Timeout);
  }, [minutes1, seconds1]);


  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>비밀번호 재설정</h1>
          <p>본인확인 수단을 선택하고 인증을 진행해주세요.</p>
        </div>
        <Box component="form" noValidate autoComplete="off" css={styles.singTextbox} className={isMobile ? "btntype_radio":""}>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleChangeRadio} defaultValue={'tel'}>
            <FormControlLabel sx={{ marginRight: '60px'}} value='tel' control={<Radio />}  name='tel' label="휴대폰 인증" />
            <FormControlLabel value='mail' control={<Radio />} name='mail' label="이메일 인증" />
          </RadioGroup>
        </Box>
        { radioType ? 
        // 핸드폰 인증
        <Fragment>
          <Box component="form" noValidate autoComplete="off" css={styles.singTextbox}>
            <TextField required name='mobileReq' label="휴대폰 번호" value={formValues.mobileReq} variant="filled" fullWidth onChange={handleChangeInput}/>
            <Button className='rbt' style={{backgroundColor:disTel ? 'grey' : ''}} disabled={disTel} 
              onClick={()=>{
                setCount(1);
                setMinutes(4);
                setSeconds(59);
                  // 휴대폰 인증발송
                  fetchFactorPhoneCertReq({ key: key, mobileNo: formValues.mobileReq}).then((res:any)=>{
                    setDisTel(true)
                  }).catch((err:any)=>{ 
                    let {data:{message}} = err.response
                    setOpen(true);
                    setError(message)
                  })
              }}>인증번호</Button> 
          </Box>
          <Box component="form" noValidate autoComplete="off" css={styles.singTextbox}>
            <TextField required  name='certMobile'  label="인증번호 확인" value={formValues.certMobile} variant="filled" fullWidth  onChange={handleChangeInput}/>
            <span className='rbt'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </Box>
        </Fragment>
        :
        // 이메일 인증
        <Fragment>
          <Box component="form" noValidate autoComplete="off" css={styles.singTextbox}>
            <TextField required  name='emailReq' value={formValues.emailReq} label="이메일" variant="filled" fullWidth onChange={handleChangeInput}/>
            <Button className='rbt' style={{backgroundColor:disEmail ? 'grey' : ''}} disabled={disEmail} 
              onClick={()=>{
                setCount1(1);
                setMinutes1(4);
                setSeconds1(59);
                // 이메일 인증발송
                fetchFactorEmailCertReq({ key: key, email: formValues.emailReq}).then((res:any)=>{
                  setDisEmail(true)
                }).catch((err:any)=>{ 
                  let {data:{message}} = err.response
                  setOpen(true);
                  setError(message)
                });
            }}>인증메일</Button> 
          </Box>
          <Box component="form" noValidate autoComplete="off" css={styles.singTextbox}>
            <TextField required  name='certEmail' label="인증번호 확인" value={formValues.certEmail} variant="filled" fullWidth  onChange={handleChangeInput}/>
            <span className='rbt'>{minutes1}:{seconds1 < 10 ? `0${seconds1}` : seconds1}</span>
          </Box>
          <p css={styles.certify}>인증메일이 발송되었습니다.</p>
          <Box sx={{ flex: 1, marginTop: 4, marginBottom: 10, }} css={styles.box_aralist}>
            <Card sx={{ borderRadius: '10px' }}>
              <CardContent>
                <Box className='info_icon'>
                  유의사항
                </Box>
                <ul>
                  <li>인증메일은 최대 10분까지 유효합니다.</li>
                  <li>인증메일을 받지 못하신 경우 스팸메일함을 확인해 보세요.</li>
                  <li>인증메일의 유효시간이 지났거나 받지 못하신 경우 &lt;인증메일&gt; 버튼을 눌러 다시 받으세요. </li>
                </ul>
              </CardContent>
            </Card>
          </Box>
        </Fragment>
      }
        <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button" className="primary" onClick={handleSubmitClick}>다음</Button>
        </Stack>
      </div>
      <ModalComponents
          open={open}
          type={'normal'}
          title={''}
          content={error}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
          }}
        >
        </ModalComponents>
    </section>
  )
}

export default FactorFind;

export const phoneFomatter = (num:any,type?:number) => {
  var formatNum = '';
  if(num.length==11){
      if(type==0){
          formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
      }else{
          formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
  }
  return formatNum;
}
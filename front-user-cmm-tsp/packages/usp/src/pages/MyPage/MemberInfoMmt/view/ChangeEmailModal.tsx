import React, { useState,useEffect,useRef } from "react"
import * as styles from '~/styles/styles';
import { Box, Stack, TextField, InputAdornment, Link, Button } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { Modalfront } from '~/components/SharedModalComponents';
import { fetchSelfEmailCertReq ,fetchSelfEmailCertCheck } from '~/fetches';
import { fetchEmailChange } from "~/fetches/fetchQnaQuest";
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";
import { ModalComponents } from "~/components/ModalComponents";
import { useNavigate } from "react-router-dom";
/* 
  작성일    :   2022/06/05
  화면명    :   change email modal
  회면ID    :   UI-USP-FRN-0050501
  화면/개발 :   Seongeonjoo / navycui
*/
type modType = 'perModal' | 'bzModal';
export type optType = {
  helperText:string,
  certReq:boolean
};

export const ChangeEmailModal: React.FC<{
    children?:any,
    type:modType,
    email?: string,
    onClick: ()=> void
  }> = props => {

  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(10); // 분
  const [seconds, setSeconds] = useState(0); // 초
  const key:any = sessionStorage.getItem('__FACTOR_KEY__');
  const [ertNoDisabled,setCertNoDisabled] = useState<boolean>(false);
  const [options, setOptions] = useState<optType>({certReq:false,helperText:""});
  const [emailDisabled,setEmailDisabled] = useState<boolean>(false);
  const [emailCertKey, setEmailCertKey] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [error,setError] = useState('')
  const [email, setEmail] = useState<string>('');
  const [certNo, setCertNo] = useState<string>('');
  
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);

  const handlerModalOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // setMobileNo('')
    // setCertReq('')
    setCount(0);
    setMinutes(10);
    setSeconds(0);
  }, [open]);

  // 인증 발송
  const handleSubmitCert = (event: React.MouseEvent<HTMLElement>) => {
    setCount(1);
    setMinutes(9);
    setSeconds(59);
    
    // 이메일 인증발송
    fetchSelfEmailCertReq({ passwdCheckKey: key, email: email}).then((res:any)=>{
      setEmailCertKey(res.key);
    }).catch((err:any)=>{ 
      setOptions({...options, certReq:true,helperText:err.response.data.message});
      setCount(0);
      setMinutes(10);
      setSeconds(0);
    })
  };

  // 확인
  const handleSubmitClick = (event: React.MouseEvent<HTMLElement>) => {
    // 인증 번호 체크
    if(emailCertKey == "") {
      setOptions({...options, certReq:true,helperText:"이메일 인증 먼저 진행하세요."});
      return;
    };
    // 이메일 인증 확인
    fetchSelfEmailCertCheck({passwdCheckKey:key,certNo:certNo,emailCertKey:emailCertKey}).then((res:any)=>{
      setCount(0);setMinutes(10);setSeconds(0);
      setEmailDisabled(true)
      setCertNoDisabled(true)
      alert('인증 완료되었습니다')
    }).catch((err:any)=>{
      addModal({
        open: true,
        content: err.response.data.message,
        onConfirm: () => {
          setOpen(false);
        },
        onClose:() => {
          setOpen(false);
        },
      })
      setOptions({...options, certReq:true,helperText:err.response.data.message});
      setCount(0);
      setMinutes(10);
      setSeconds(0);
    });
  };

  // 인증 발송
  const handleSubmitSave = (event: React.MouseEvent<HTMLElement>) => {
    if(!ertNoDisabled){
      addModal({
        open: true,
        content: '이메일 인증 진행하세요'
      })
      return;
    }
    if(!emailDisabled){
      addModal({
        open: true,
        content: '이메일 인증 확인 진행하세요'
      })
      return;
    }
    fetchEmailChange(key,emailCertKey).then((res:any)=>{
      setEmailDisabled(true)
      setEmailCertKey('')
      alert('저장 되었습니다')
    }).catch((err:any)=>{
      addModal({
        open: true,
        content: err.response.data.message,
      })
    })
  };


  // timeout
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

  useEffect(() => {
    if(!!props.email){
      let ebox = props.email;
      setEmail(ebox)
    }
  }, []);

  // 입력 이벤트
  const handelChangeMail = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name == 'email'){
      setEmail(e.target.value)
    } else {
      setCertNo(e.target.value)
    }
  }

  return (
    <>
      <Stack flexDirection={'row'}>
        <Link className="blue" onClick={handlerModalOpen}>변경</Link>
      </Stack>
      <Modalfront
        open={open}
        type={'normal'}
        title={'이메일 변경'}
        content={'모달'}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          if (data) setData(false);
          
        }}
      >
        <Box css={styles.modal_Box}>
          <div className="tit_text">
            인증메일을 확인하여 이메일 인증을 진행해주세요.
          </div>
          <Box className="boxinput_mg">
            <Box css={styles.modal_inputBox}>
              <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} width={'100%'}>
                <TextField
                  name="email"
                  value={email}
                  variant="outlined"
                  fullWidth
                  onChange={handelChangeMail}
                />
                <CustomButton label={'인증'} type={'modalBtn2'} color={'outlined'} disabled={emailDisabled} onClick={handleSubmitCert}/>
              </Stack>
            </Box>
            <Box css={styles.modal_inputBox}>
              <TextField
                name="certReq"
                variant="outlined"
                fullWidth
                value={certNo}
                error={options.certReq ? options.certReq : false}
                placeholder="인증번호 입력"
                helperText={options.helperText ? options.helperText : ""}
                onChange={handelChangeMail}
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <Box className='rbtime'>
                        <span className='rbt'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                        <Button  disabled={ertNoDisabled} sx={{ display:!!emailCertKey ? '' : 'none'}} className={''} name='certNoEmail'  onClick={handleSubmitClick}>확인</Button>
                      </Box>
                    </InputAdornment>
                }}
              />
            </Box>
          </Box>
          <Box className="modal_Card">
            <div className="tit">
              유의사항
            </div>
            <ul>
              <li>인증메일은 최대 10분까지 유효합니다. </li>
              <li>인증메일을 받지 못하신 경우 스팸메일함을 확인해 보세요.</li>
              <li>인증메일의 유효시간이 지났거나 받지 못하신 경우 &lt;인증메일&gt; 버튼을 눌러 다시 받으세요. </li>
            </ul>
          </Box>
          <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} sx={{marginTop:"24px"}}>
            <CustomButton label={'취소'} type={'modalBtn'} color={'outlinedblack'} onClick={() => {
              setOpen(false)
              setCertNo('')
              setCertNoDisabled(false)
              setEmailDisabled(false)
              setEmailCertKey('')
            }}/>
            <CustomButton label={'저장'} type={'modalBtn'} color={'primary'} onClick={handleSubmitSave} />
          </Stack>
        </Box>
      </Modalfront>
      <ModalComponents 
        open={openAlert} 
        type={'normal'} 
        content={error} 
        onConfirm={() => { 
          setOpenAlert(false)
          navigate(-1)}} 
        onClose={() => { 
          setOpenAlert(false)
          navigate(-1)
          }}>
      </ModalComponents>
    </>
  );
};
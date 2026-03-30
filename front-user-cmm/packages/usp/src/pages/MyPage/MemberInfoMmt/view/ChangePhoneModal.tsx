import React, { useState,useRef,useEffect } from "react"
import * as styles from '~/styles/styles';
import { Box, Stack, TextField, InputAdornment, Button } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { Modalfront } from '~/components/SharedModalComponents';
// import {useQuery} from "react-query";
// import { NavLink,useNavigate,useLocation } from "react-router-dom";
import { fetchSelfPhoneCertCheck,fetchSelfPhoneCertReq} from '~/fetches';
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";
import { fetchPhoneChange } from "~/fetches/fetchQnaQuest";
import { ModalComponents } from "~/components/ModalComponents";
import { useNavigate } from "react-router-dom";

/* 
  작성일    :   2022/06/05
  화면명    :   change phone modal
  회면ID    :   UI-USP-FRN-0050502
  화면/개발 :   Seongeonjoo / navycui
*/
export type optType = {
  helperText:string
  certReq:boolean
  helperText1:string
  certReq1:boolean
};
type modType = 'perModal' | 'bzModal';

export const ChangePhoneModal: React.FC<{
    children?:any,
    type:modType,
    mobNo?: string,
    onSendRes?: ()=> void
  }> = props => {
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [minutes, setMinutes] = useState(10); // 분
  const [seconds, setSeconds] = useState(0); // 초
  const key:any = sessionStorage.getItem('__FACTOR_KEY__');
  const [options, setOptions] = useState<optType>({certReq:false,helperText:"",helperText1:"",certReq1:false});
  const [ertNoDisabled,setCertNoDisabled] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [certDisabled,setCertDisabled] = useState<boolean>(false);
  const [mobileNo, setMobileNo] = useState<string | undefined>(props.mobNo);
  const [certReq, setCertReq] = useState<string>('');
  const [phoneCertKey, setPhoneCertKey] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [error,setError] = useState('')
  const [data, setData] = useState(false);

  const handlerModalOpen = () => {
    setOpen(true);
  };

  // 인증 발송
  const handleSubmitCert = (event: React.MouseEvent<HTMLElement>) => {
    setCount(1);
    setMinutes(9);
    setSeconds(59);
    // 휴대폰 인증발송
    fetchSelfPhoneCertReq({ passwdCheckKey: key, mobileNo: mobileNo}).then((res:any)=>{
      setPhoneCertKey(res.key)
    }).catch((err:any)=>{
      setOptions({...options, certReq:true,helperText:err.response.data.message});
      setCount(0);
      setMinutes(10);
      setSeconds(0);
    })
  };

  useEffect(() => {
    setMobileNo('')
    setCertReq('')
    setCount(0);
    setMinutes(10);
    setSeconds(0);
  }, [open]);

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

  // 입력 이벤트
  const handelChangeTel = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name == 'mobNo'){
      setCertDisabled(false)
      setMobileNo(e.target.value)
      setOptions({...options, certReq:false,helperText:''});
    } else {
      setCertReq(e.target.value)
      setOptions({...options, certReq1:false,helperText1:''});
    }
  }

  // 변경 저장
  const handleSubmitSave = (event: React.MouseEvent<HTMLElement>) => {
    
    if(!ertNoDisabled){
      addModal({
        open: true,
        content: '휴대폰 인증 진행하세요'
      })
      return;
    }

    fetchPhoneChange(key,phoneCertKey).then((res:any)=>{
      setCertNoDisabled(false)
      setPhoneCertKey('')
      // setOpen(false)
      addModal({
        type:'normal',
        open: true,
        content: '저장 되었습니다'
      })
    }).catch((err:any)=>{
      addModal({
        open: true,
        content: err.response.data.message,
      })
    })
  };

  // 확인
  const handleSubmitClick = (event: React.MouseEvent<HTMLElement>) => {
    // 인증 번호 체크
    if(certReq == "") {
      setOptions({...options, certReq:true,helperText:"휴대폰 인증 먼저 진행하세요."});
      return;
    };
    // 폰 인증 확인
    fetchSelfPhoneCertCheck({passwdCheckKey:key,certNo:certReq,phoneCertKey:phoneCertKey}).then((res:any)=>{
      setCount(0);setMinutes(10);setSeconds(0);
      setCertNoDisabled(true)
      setCertDisabled(true)
      setOptions({...options, certReq1:false,helperText1:'인증 완료되었습니다'});
    }).catch((err:any)=>{
      alert(err.response.data.message)
      setOptions({...options, certReq:true,helperText:err.response.data.message});
      setCount(0);
      setMinutes(10);
      setSeconds(0);
    });
  }

  return (
    <>
      <Stack flexDirection={'row'}>
        <a className="blue" onClick={handlerModalOpen}>변경</a>
      </Stack>
      <Modalfront
        open={open}
        type="normal"
        title={'휴대폰번호 변경'}
        content={'휴대폰번호 모달'}
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
            인증을 확인하여 휴대폰 인증을 진행해주세요.
          </div>
          <Box className="boxinput_mg">
            <Box css={styles.modal_inputBox}>
              <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} width={'100%'}>
                <TextField
                  id="mobNo"
                  name="mobNo"
                  value={mobileNo} 
                  variant="outlined"
                  fullWidth
                  helperText={!!options.helperText ? options.helperText : ""}
                  onChange={handelChangeTel}
                />
                <CustomButton label={'인증'} style={{backgroundColor: certDisabled ? 'grey' : ''}} disabled={certDisabled} type={'modalBtn2'} color={'outlined'} onClick={handleSubmitCert}/>
              </Stack>
            </Box>
            <Box css={styles.modal_inputBox}>
              <TextField
                id="certReq" 
                variant="outlined"
                name="certReq"
                fullWidth
                value={certReq}
                error={options.certReq1}
                onChange={handelChangeTel}
                placeholder="인증번호 입력"
                helperText={!!options.helperText1 ? options.helperText1 : ""}
                InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">
                    <Box className='rbtime'>
                      <span className='rbt'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                      <Button  disabled={ertNoDisabled} sx={{ display:!!phoneCertKey ? '' : 'none'}} className={''} name='certNoEmail'  onClick={handleSubmitClick}>확인</Button>
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
              <li>인증 SMS는 최대 10분까지 유효합니다. </li>
              <li>인증 SMS의 유효시간이 지났거나 받지 못하신 경우 &lt;인증&gt; 버튼을 눌러 다시 받으세요.</li>
            </ul>
          </Box>
          <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} sx={{marginTop:"24px"}}>
            <CustomButton label={'취소'} type={'modalBtn'} color={'outlinedblack'} onClick={() => {
              setCertDisabled(false)
              setOpen(false)
              setCertReq('')
              setCertNoDisabled(false)
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
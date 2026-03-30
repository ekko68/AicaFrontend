import * as styles from '../styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Input } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalModalStore, useNiceStore } from '~/pages/store/GlobalModalStore';
import { useMutation } from 'react-query';
import {FetchBzmnNiceIdRes, FetchDormancyNiceIdRes, FetchNiceIdPost, FetchNiceIdRes} from '~/fetches/fetchTerms';
import { useEffect, useRef, useState } from 'react';
import { fetchAccountUndomant } from '~/fetches/fetchSignIn';
import { CustomButton } from '~/components/ButtonComponents';
/*
  화면: 휴면회원안내(개인) 페이지
  작성자: Seongeonjoo / navycui
  작성일: 20220621
*/
const _global = (window /* browser */ || global /* node */) as any
function DormancyCon() {
  const navigate = useNavigate();
  const receive:any = useLocation();
  const formValues:any = useRef(null);
  const {addModal} = useGlobalModalStore();
  const {setSesionId,sesionId,joinKey,setJoinKey} = useNiceStore()
  const [encodeData,setEncodeData] = useState('');
  const [encodeDataCallback,setEncodeDataCallback] = useState('');

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

  // 개인 본인인증 서비스 결과 저장
  const {mutate:niceResSave}:any = useMutation(async () => await FetchDormancyNiceIdRes({encodeData: encodeDataCallback}), {
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message
      })
      // window.location.href = '/';
    },
    onSuccess: (data) => {
      console.log('data - ' + JSON.stringify(data))
      if (!!data.key) {
          setJoinKey(data.key)
          AccountUndomant()
      }
    }
  });

  // 사업자 인증 서비스 결과 저장
  const {mutate:bzmnNiceResSave}:any = useMutation(async () => await FetchBzmnNiceIdRes({encodeData: encodeDataCallback}), {
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message
      })
      // window.location.href = '/';
    },
    onSuccess: (data) => {
      console.log('data - ' + JSON.stringify(data))
      if (!!data.key) {
        setJoinKey(data.key)
        AccountUndomant()
      }
    }
  });

  // 로그인 계정 잠금 해제
  const {mutate:AccountUndomant} = useMutation(async () => await fetchAccountUndomant(joinKey), {
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message
      })
    },
    onSuccess: (data) => {
      navigate('/signup/dormancyLift',{
        state:{
          type:'dormancyCon'
        }
      })
    }
  });

  useEffect(() => {
    niceInit()
  }, []);

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
      // niceResSave()
    }
  }

  useEffect(() => {
    if (encodeDataCallback.length > 0){
      if (receive.state.isbzmn){
        bzmnNiceResSave()
      }else {
        niceResSave()
      }
    }
  }, [encodeDataCallback])

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>휴면회원 안내</h1>
        </div>
        <Box css={styles.card_Box}>
          <Box className="icon_errBox">
            <img src="/images/subpage/icon_sleep.png" />
          </Box>
          <Box className="confirm_tit mt20">
            <div><strong>회원</strong> 님</div>
            <p>장기 미접속으로 인하여 <br className='mo'/>휴면계정으로 전환되었습니다.</p>
            <span className="mintit">휴대폰 본인인증을 수행하셔야 서비스를 이용할 수 있습니다.</span>
          </Box>
          <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
            <CustomButton label={'취소'} type={'formbtn'} color={'outlinedgdark'} onClick={()=>navigate('/')} />
            <CustomButton label={'휴대폰 인증'} type={'formbtn'} color={'primary'}  onClick={()=>fnPopup()} />
          </Stack>
        </Box>
      </div>
      {/* <!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. --> */}
      <Box component='form' sx={{display:'none'}} name="form_chk" method="post" onSubmit={fnPopup} ref={formValues} style={{ textAlign: 'center'}}>
        <Input  type="hidden" name="m" value="checkplusService" />  {/* 필수 데이타로, 누락하시면 안됩니다. */}
        <Input  id="EncodeData" type="hidden" name="EncodeData" value={encodeData} />  {/* 위에서 업체정보를 암호화 한 데이타입니다. */}
        <Button id="btn-click" variant="contained" type="submit" className="linebtn" sx={{ mt:10 }}></Button>
      </Box>
    </section>
  )
}

export default DormancyCon;

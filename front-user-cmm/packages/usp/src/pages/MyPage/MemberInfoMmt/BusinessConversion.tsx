import React, { useState,useEffect,Fragment, useRef } from 'react';
import * as styles from '~/styles/styles';
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
import { useNavigate } from 'react-router-dom';
import { initProducerType, ProducerType, steps02, TermsResponse } from '~/models/Model';
import { CustomCheckBoxs } from '../../SignUp/Consumer/CustomCheckBoxs';
import { ConsumerModal } from '../../SignUp/Consumer/ConsumerModal';
import { fetchTermsGet } from '~/fetches';
import { ModalComponents } from '~/components/ModalComponents';
import BreadCrumb from "~/components/BreadCrumb";
import { CommonService } from '~/service/CommonService';
import create from 'zustand';
import authentication from 'shared/authentication';
import { useGlobalScroll } from '~/pages/store/GlobalModalStore';
import styled from '@emotion/styled';
import { TermCdimsiType } from '~/models/ModelSignin';
import { fetchTermsImsiBizChange } from '~/fetches/fetchTerms';

/* 
  작성일    :   2022/06/14
  화면명    :   이페이지 -> 사용자지원 -> 사업자전환
  회면ID    :   UI-USP-FRN-0070101
  화면/개발 :   Seongeonjoo / navycui
  // 모바일 작업안됨 추후수정예정
*/
const  BusinessReservation = () => {
  const tokenBox =authentication.get('accessToken');
  const {scrollActive}:any = useGlobalScroll();
  const navigate = useNavigate();
  const formValues:any = useRef(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [termsBox, setTermsBox] = useState<TermsResponse[]>([]);
  const [validationBox, setValidationBox] = useState<string[]>([]);
  const [ctx, setCtx] = useState<string>("");
  const [titx, setTitx] = useState<string>("");
  const [isOk, setIsOk] = useState(true); // 휴대폰 솔루션 인증 결과 탈퇴여부 확인
  const [isSeven, setIsSeven] = useState(true); // \7일 이내 탈퇴여부 확인
  const [openSeven,setOpenSeven] = useState(false);
  const [bizNm, setBizNm] = useState<ProducerType>(initProducerType);
  const returnedTarget:TermsResponse[] = [];
  const [encodeData,setEncodeData] = useState('');

  // 약관 조회
  const getSearchCategory = async () => {
    const box = await Promise.all([ fetchTermsGet('TERMS_OF_USE'), fetchTermsGet('PRVC_CLCT_AGRE_MBR')])
    console.log('getSearchCategory',box)
    box.map((item,key)=>{
      if(!!item){
        item.list.map((mbox:any)=>{
          returnedTarget.push(mbox)
        })
      }
    })
    setTermsBox(returnedTarget)
  }; // todo...
  const [height, setHeight] = useState(0);
  const scrollref = useRef<HTMLElement>(null);
  useEffect(() => {
    if(!!scrollref.current){
      setHeight(scrollref.current.clientHeight);
    }
  },[scrollActive])
  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
    // 사업자 회원 체크
    if(!!tokenBox){
      if(typeof window != undefined){
        const res = tokenBox.split('.')[1];
        const resBox = JSON.parse(window.atob(res))
        if(resBox.principal.memberType != 'UNIVERSITY' && resBox.principal.memberType != 'INDIVIDUAL'){
          navigate('/MyPage/MemberInfoMmt/BusinessConversionSpool')
        } else {
          getSearchCategory();
        }
      }
    }
  }, []);

  // 상세 조회
  // const { data:memInfo, isError, error} = useQuery("getMemberInfo", async () => await fetchGetMemberInfo(key));
  


  // 본인인증 서비스 결과 저장  임시... 지우지 마세요
  // const {mutate:niceRes} = useMutation(async () => await CommonService.FetchNiceIdRes({encodeData:""}), {
  //   onError: (error:any) => {
  //     // error

  //   },
  //   onSuccess: (data, variables, context) => {
  //     // queryClient.invalidateQueries('getEnterprise')
  //     // setEncodeData(response.data.encData);
  //   }
  // });



  // 공동인증
  const handelProducerForm = () => {
    
    const boxvalue3:TermCdimsiType[] = [];
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
    // 사업자등록번호 확인
    if(!bizNm.bizNum) {
      setBizNm({ ...bizNm, error: true,label:"사업자등록번호 필수입니다."})
      return;
    }
    if(isNaN(Number(bizNm.bizNum))) { 
      setBizNm({ ...bizNm, error: true,label:"숫자만 입력하세요."})
      return;
    }
    //약관 동의 후 임시 저장 fetchTermsImsi
    fetchTermsImsiBizChange(boxvalue3).then((res)=>{
      // todo .....
      
    }).catch((e)=>{
      return (
          <Fragment>
            <ModalComponents open={open} type={'normal'} title={e.response.status} content={e.response.data.message} 
              onConfirm={() => { setOpen(false) }} 
              onClose={() => { setOpen(false)}}>
            </ModalComponents>
          </Fragment>
        )
    });
  }

  // 회원가입-탈퇴회원 정상전환
  const callFetchTermsJoin = () => {
    navigate('/signin')
    // todo ......
    // fetchTermsJoin("box").then((res)=>{
      
    // }).catch((e)=>{ console.log(e); })
    setOpenSeven(false);
  }

  // 사업 번호 입력
  const handelChangebizNm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBizNm({
      ...bizNm,
      [e.target.name]: e.target.value,error:false,label:"사업자등록번호"
    });
  }
  
  // 본인인증 서비스 팝업
  const fnPopup = (e:any) => {
    e.preventDefault();
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
    formValues.current.action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    formValues.current.target = "popupChk";
    formValues.current.submit();
  }

  return (
    <div css={styles.container} className="darkbg">
      <Box css={styles.sub_cont01} className={scrollActive ? "fixed scrollaction" : "fixed"}>
        <div className='benner'>
          <BreadCrumb />
          <div className='content'>
            <div className='txtbox'>
              <h2 className='tit'>사업자로 전환</h2>
              <p>사업자로 전환하기 위해 법인회원 약관 동의하고<br className="mo"/> 공동인증서로 인증 후<br className="pc"/> 사업자 회원가입 <br className="mo"/>정보를 입력해 주세요.</p>
              <Stepper activeStep={0} alternativeLabel css={styles.step}>
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
      <Box sx={{ marginTop:( scrollActive ? `${height + 300 }px` : `${height + 350}px`)}}>
        <Box css={styles.sub_cont03} >
          <Box css={styles.line_box} sx={{ mb: 5 }}>
            <span>사업자로 전환후에도 기존 정보는 모두 그대로 유지됩니다. </span>
          </Box>
          <Box sx={{ mb: 5 }}>
            <FormGroup sx={{ mb: 2 }}>
              <FormControlLabel sx={{ml: 0}} control={<CheckboxStyle checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
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
          <Box component="div"
            css={styles.singTextbox}>
            <div className='inputtxt'>
              사업자 확인 
            </div>
            <Box component="div" css={styles.singform} className="mgno lable_center">
              <TextField
                required
                id="bizNum" 
                name="bizNum"
                value={bizNm.bizNum}
                error={bizNm.error}
                label={bizNm.label} // "사업자등록번호" 
                variant="filled"
                fullWidth
                onChange={handelChangebizNm}
              />
            </Box>
          </Box>
          <Stack spacing={2} direction="row" css={styles.btnGroup}>
            <Button type='button' className="linebtn03 full" onClick={()=> navigate('/')} >취소</Button>
            <Button type='button' className="primary full" onClick={()=>setOpen1(true)} >사업자 공동 인증</Button>
          </Stack>
          {/* 모달 팝업부분 */}
          <ConsumerModal isOpen={modalOpen} modalClose={()=>{setModalOpen(false)}} ctx={ctx} titx={titx}/>
          <ModalComponents open={open} type={'normal'} title={"존재한정보"} content={"기가입 안내 (개인) UI-USP-FRN-001160"} 
                onConfirm={() => { setOpen(false) }} 
                onClose={() => { setOpen(false)}}>
          </ModalComponents>
          <ModalComponents open={openSeven} type={'sevendayBiz'} title={"사업자전환"} content={"공동인증 진행중..."} 
                onConfirm={(type:string) => {
                  navigate('/MyPage/MemberInfoMmt/BusinessConversionEnter',{
                    state:{
                      // loginId:loginId,
                      stus:'가입정보입력(사업자)'
                    }
                  })
                  setOpenSeven(false)
                }} 
                onClose={() => { 
                  // 1. 회원가입-탈퇴회원 정상전환 api 호출(미완) ${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/unsecesstion
                  callFetchTermsJoin();
                }}>
          </ModalComponents>
          {/* <!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. --> */}
          <form name="form_chk" method="post" onSubmit={fnPopup} ref={formValues} style={{ textAlign: 'center'}}>
            <input type="hidden" name="m" value="checkplusService" />  {/* 필수 데이타로, 누락하시면 안됩니다. */}
            <input id="EncodeData" type="hidden" name="EncodeData" value={encodeData} />  {/* 위에서 업체정보를 암호화 한 데이타입니다. */}
          
            {/* <Button id="btn-click" variant="contained" type="submit" className="linebtn" sx={{ mt:10 }}>안심본인인증 테스트</Button> */}
          </form>
        </Box>
      </Box>
      <ModalComponents open={open1} type={'normal'} title={"사업자 전환"} content={"공동인증 진행중..."} 
              onConfirm={() => { setOpen1(false) }} 
              onClose={() => { setOpen1(false)}}>
        </ModalComponents>
    </div>
  );
}
// 본인인증 서비스 결과 저장
export const useNiceStore = create((set) => ({
  fishies: '',
  setEncodeData: async (encodeData:any) => {
    const response = await  CommonService.FetchNiceIdRes({encodeData:""})
    set({ fishies: await response.json() })
  },
}));

export default BusinessReservation;

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
    background-color: #4063ec;
    background:  url('/images/common/checkbox_active.png');
  }
  .MuiSvgIcon-root{
    background: none;
  }
}
`;
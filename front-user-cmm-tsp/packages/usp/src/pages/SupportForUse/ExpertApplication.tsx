// import React from "react"
import { Box, Stack, Step, StepLabel, Stepper, Typography, useMediaQuery, useTheme } from '@mui/material';
import BreadCrumb from '~/components/BreadCrumb';
import * as styles from '~/styles/styles';
import { steps03, TermsResponse } from '~/models/Model';
import authentication from 'shared/authentication';
import { useNavigate } from 'react-router-dom';
import { CustomCheckBoxs, CustomButton } from '~/components/ButtonComponents';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { fetchTermsGet } from '~/fetches';
import { useGlobalScroll, useScroll } from '../store/GlobalModalStore';
import { ModalComponents } from '~/components/ModalComponents';

// 이용지원/ ->  전문가신청 페이지
function ExpertApplication() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const navigate = useNavigate();
  //개인정보 수집 동의 체크
  const [isValid, setIsValid] = useState(false);
  const {scrollY, direction} = useScroll();
  //약관내용
  const [termsBox, setTermsBox] = useState<TermsResponse[]>([]);
  const [validationBox, setValidationBox] = useState<string[]>([]);

  const returnedTarget:TermsResponse[] = [];
  const [checkBox, setCheckBox]:any = useState([]);
  const getSearchCategory = async () => {
    //개인회원
    let url = 'PRVC_CLCT_AGRE_EXP';
    let box = await Promise.all([fetchTermsGet(url)])

    box[0].list.map((item:any)=>{
          console.log(item)
          returnedTarget.push(item)
          console.log(box)
        })
    setCheckBox([{label:returnedTarget[0].termsTypeNm}])
    setTermsBox(returnedTarget)
  }; // todo...

  useEffect(()=>{
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
    getSearchCategory();
  },[])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const set = (s:string[]) =>{
    setValidationBox(s)
  }
  const goExpertApplicationDetail01 = () =>{
    if(!(Array.isArray(validationBox) && validationBox.length === 0)){
      const boxvalue:any = [];
      console.log(validationBox)
      termsBox.map((item,key)=>{
        console.log(item)
        let isItem = validationBox.filter((m)=>{ return m.includes(item.termsTypeNm)});
        if(isItem.length>0){
          boxvalue.push({beginDay:item.beginDay,required:item.required,termsType:item.termsType,consentYn:true})
          // setTermsImsiBox(boxvalue3);
        }
      })
      console.log(boxvalue)
      navigate(`/SupportForUse/ExpertApplicationDetail01`,{
        state : {validationBox:boxvalue}})
    }else{
      setIsValid(true);
      setOpen(true);
      setError("약관을 동의해주세요")
    }
  }

  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">전문가 신청</h2>
              <Stepper activeStep={0} alternativeLabel css={styles.step03}>
                {steps03.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className="content">
          <Stack
            component="div"
            spacing={6}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h5" component="div">
              약관동의
            </Typography>
          </Stack>
          {/* {termsBox.map((item:any)=>(
            <div> */}
            <Stack css={styles.clause_check} >
              <CustomCheckBoxs checkbox={checkBox} onClick={(s: string[]) =>  setValidationBox(s)}/>
              {termsBox[0]?.required?<em className="point_txt">&#40;필수&#41;</em>:null}
              {/* {isValid?<FormHelperText error={isValid}>"개인정보 수집 및 활용 동의해주세요."</FormHelperText>:null} */}

            </Stack>

            <Box css={styles.clause_Box}>
                <Box className="scroll">
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  {termsBox[0]?.termsCn ? 
                    termsBox[0]?.termsCn.split("\r\n").map((m:any,k:number)=>{
                      return (
                        <Fragment key={k}>
                          { k == 0 && <Box className="Box_tit" component='span'>{m}</Box> }
                          <Box className="popup_Box" component='span'>
                              {m.match(/[0-9]/) && !m.includes('-') && <Box className="popsub_tit">제{m.split('')[0]}조 ({m.slice(3)})</Box>}
                              {
                                !!m && m.includes('-') && 
                                // <Box className="popsub_text">
                                //     본 약관은 광주시 인공지능사업융합사업단에서 운영하는 AI직접단지지원포털(이하 AICA이라고 한다.)에서 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차와 기타 필요한 사항을 규정함을 목적으로 합니다.
                                // </Box>
                                <Box className="popsub_text">
                                    {/* 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. */}
                                    <ul>
                                        <li>&nbsp;&nbsp;{m}</li>
                                    </ul>
                                </Box>
                              }
                          </Box>
                        </Fragment>
                      )
                    } )
                    : null}
              </Typography>
              
                </Box>
            </Box>
            
            {/* </div>
          ))} */}
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
              <CustomButton label={'다음'} type={'listBack'} color={'primary'} onClick={()=> goExpertApplicationDetail01()}/>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default ExpertApplication;

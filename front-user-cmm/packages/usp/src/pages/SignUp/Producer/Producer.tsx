/* eslint-disable jsx-a11y/iframe-has-title */
import * as styles from '../styles';
import React, { useState,useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { initProducerType, ProducerType, steps, stepsbiz, TermsResponse } from '~/models/Model';
import { CustomCheckBoxs } from '../Consumer/CustomCheckBoxs';
import { fetchGetCommCode, fetchTermsGet, fetchTermsImsi } from '~/fetches';
import { CustomButton } from '~/components/ButtonComponents';
import styled from '@emotion/styled';
import { useMutation, useQueries, useQuery } from 'react-query';
import { FetchAccountCertBzmn, FetchNiceIdRes, FetchreactAppPkiCertInitUrl, FetchreactAppPkiCertResultUrl } from '~/fetches/fetchTerms';
import { useNiceStore } from '~/pages/store/GlobalModalStore';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { Stack, Button, Box, Stepper, Step, StepLabel, FormGroup, FormControlLabel, TextField, Input, Checkbox } from '@mui/material';
import { ConsumerModal } from '../Consumer/ConsumerModal';
import { useScript } from '~/api/hooklib';
import NoSsr from '@mui/material/NoSsr';
import $ from 'jquery'
import {MagiclineApi} from '../../../api/ML_Config'
/* 
작성일    :   2022/05/30
화면명    :   FRN-0010201_회원가입_약관동의/인증 (사업자)
회면ID    :   UI-USP-FRN-0010201
화면/개발 :   Seongeonjoo / navycui
*/
const Producer = () => {
  const status1 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/ext/jquery-1.10.2.js");
  const status2 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/ext/jquery-ui.min.js");
  const status3 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/ext/jquery.blockUI.js");
  const status4 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/ext/json2.js");
  const status5 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/ext/ML_Config.js");
  const status6 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/crypto/magicjs_1.2.1.0.min.js");
  const status7 = useScript("../../shared/src/libs/MagicLine4Web/ML4Web/js/magic_e2e.js");
  // const authbox = require("../../../../../shared/src/libs/MagicLine4Web/ML4Web/js/ext/ML_Config.js");

  
  const navigate = useNavigate();
  const formValues:any = useRef(null);
  const {addModal} = useGlobalModalStore();
  const {setSesionId,sesionId,setJoinKey} = useNiceStore()
  const [allCheck, setAllCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [encodeData] = useState('');
  const [setCon, setSetCon] = useState(false);
  
  const [authBizBox, setAuthBizBox] = useState<authBizType>();
  const [encodeDataCallback,setEncodeDataCallback] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [termsBox, setTermsBox] = useState<TermsResponse[]>([]);
  const [validationBox, setValidationBox] = useState<string[]>([]);
  const [ctx, setCtx] = useState<string>("");
  const [titx, setTitx] = useState<string>("");
  const [openSeven,setOpenSeven] = useState(false);
  const [bizNm, setBizNm] = useState<ProducerType>(initProducerType);
  const returnedTarget:TermsResponse[] = [];

  // 약관 조회
  const getSearchCategory = async () => {
    const box = await Promise.all([ fetchTermsGet('TERMS_OF_USE'), fetchTermsGet('PRVC_CLCT_AGRE_BIZ')])
    console.log(box)
    box.map((item,key)=>{
      if(!!item){
        item.list.map((mbox:any)=>{
          returnedTarget.push(mbox)
        })
      }
    })
    setTermsBox(returnedTarget)
  };
  // 
  const MagiclineApi = (src:string) =>{
    let callback:any="";
    let defaultOptions = {
        sign:{signType:"MakeSignData",msg:"",messageType:"",signOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO'], ds_pki_rsa:'rsa15', ds_pki_hash:'sha256',ds_msg_decode:"false",ds_pki_sign_type:"signeddata"}},
        signPdfOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO','OPT_USE_PKCS7','OPT_NO_CONTENT','OPT_HASHED_CONTENT'], ds_pki_rsa:'rsa15', ds_pki_hash:'sha256',ds_msg_decode:"true"},
        encOpt:{ds_pki_rsa:'rsa15'},
        signedenvOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO'], ds_pki_rsa:'rsa15', ds_pki_algo:'SEED-CBC'},
        // 추가
        idn : "",
        vidType : "",
        certOidfilter:"", //1.2.410.100001.2.2.1,1.2.410.200005.1.1.4
        certExpirefilter:true, //false:만료 인증서 보여주기, true:보여주지 않기
        //mrs2 옵션 설정
        saveStorageList : ["web","hdd"],
        exportStorageList : ["web", "hdd"],
        exportStorageSelect : "web",
        browser_notice_show	: false,
        //특허청 전자서명 옵션
        kipoSignOpt:{signType:"MakeSignData",msg:"",messageType:"",signOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO', 'OPT_HASHED_CONTENT'], ds_pki_rsa:'rsa15', ds_pki_hash:'sha256',ds_msg_decode:"hash",ds_pki_sign_type:"signeddata"}},
    }
    
  }


  useEffect(() => {
    setSetCon(false)
    if(status1 == 'loading'){
      // magicline.uiapi.ML_funProcInitCheck(function(code,data){
      //   if( code == 0 ){
      //     magicline.uiapi.completeInit();
      //     if(typeof(checkCallback) == "function"){
      //       magicline.uiapi.checkInstall(checkCallback);
      //     }
      //   }
      // });
      
      // magicline.uiapi.ML_checkInit();
    }
    getSearchCategory();
    let boxxx = MagiclineApi('loading')
  }, []);

  let objCert:any = {};

  // MagicLine JS 모듈 호출
  const doSignData = async () => {
    await FetchreactAppPkiCertInitUrl().then((res)=>{
      let uuid = res.uuid;
      let cert = res.cert;
      
      setAuthBizBox((pre:any)=>({...pre,uuid:uuid}))
      
      // 버튼 활성화
      if (cert != undefined && cert != "") {
        objCert = JSON.parse(cert);
        setAuthBizBox((pre:any)=>({...pre,idn:bizNm.bizNum,signOrigin:uuid}))
        if(!!window){
          // magicline.uiapi.MakeSignData(authBizBox, null, mlCallBack);
        }
      } else {
          alert("공동인증서 모듈 초기화에 실패하였습니다.");
      }
    }).catch((err)=>{
      
      if (err.code != "ERR_NETWORK") {
        console.log(err);
        alert("공동인증서 초기화 호출에 오류가 발생되었습니다.");
    }
    })
  }
  // MagicLine 결과값 수신 CallBack
  // code    : 전자서명 결과값
  // message : 전자서명 메시지
  const  mlCallBack = async (code:any, message:any) => {
    if(code==0){ // 정상
      // console.log(message);

      // ajax 전송 Parameter 정의
      var params = new URLSearchParams();
      params.append("signOrigin", !!authBizBox ? authBizBox.signOrigin : '');
      params.append("sign", encodeURIComponent( message.encMsg));
      params.append("vidRandom", "");
      params.append("encData", "");

      if(message.vidRandom != null){
          params.set("vidRandom", encodeURIComponent(message.vidRandom));
      }

      // 개인정보 암호화
      if(!!bizNm.bizNum){
          let ml = new (MagicE2E(objCert) as any);
          params.set("encData", encodeURIComponent( ml.Encrypt("encIdn=" + bizNm.bizNum) ))
      }
      else {
          alert("사업자등록번호를 입력하세요.");
          return false;
      }

      // console.log(params);
      await FetchreactAppPkiCertResultUrl(params).then(
        response => {
            // console.log(response.data);
            let data = response.data;
            if (data.code == "0") {
                pkiCert(data.key);
            }
            else {
                alert(data.message);
            }
        }
      );
    }else{ // 수신 오류
        alert("결과값 수신에 실패하였습니다.");
        return;
    }
  }

  // 사업자회원 계정 인증(PRG-COM-AST-02)
  const pkiCert = async (pkiCertSessionId:string) => {
    let jsonData = {
        pkiCertSessionId: pkiCertSessionId
    };
    await FetchAccountCertBzmn(jsonData).then(
      response => { 
          let res = JSON.stringify(response.data, null, 4);
          // $("#apiContent").find("div[rel='btn-res']").text(res);
          let data = response.data;
          if (data.key != undefined && data.key != null) {
              sessionStorage.setItem("account_key", data.key);
          }
        }
      );
    }

  // 사업자 공동 인증 호출
  const handelProducerForm = () => {
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
    // 사업자등록번호 확인
    if(!bizNm.bizNum) {
      setBizNm({ ...bizNm, error: true,label:"사업자등록번호 필수입니다."})
      return;
    }
    if(isNaN(Number(bizNm.bizNum))) { 
      setBizNm({ ...bizNm, error: true,label:"숫자만 입력하세요."})
      return;
    }
    //약관 동의 후 임시 저장
    // 본인인증 서비스 결과 저장  임시... 지우지 마세요

    fetchTermsImsi(boxvalue3).then((res)=>{
      doSignData()
      // setOpen(true)
      /*
        -> 프로세스 정의
          1. 휴대폰 인증 결과에 따라 분기 처리 ( 기가입여부 확인 / 탈퇴여부 확인 / 14미만 확인 이동)
      */
      // 1. 휴대폰 인증 결과에 따라 분기 처리 회원가입-휴대폰 본인인증 PRG-COM-MBR-06 솔루션

      // -> 2. 기가입여부 확인
        if('isOk'){
          // -> 2.1.탈퇴여부 확인
            if('isSeven'){ // 탈퇴계정 전환안내(개인) UI-USP-FRN-0011602 호출
              setOpenSeven(true)
              // navigate('signup/confirm',{ // TODO ......
              //   state:{
              //     // loginId:loginId,
              //     chargerNm:'UI-USP-FRN-0011602'
              //   }
              // })
            } else { // out 7 day // 기가입 안내 (개인) UI-USP-FRN-0011601 -> 로그인
              // return (
              //   <Fragment>
              //     <ModalComponents open={open} type={'normal'} title={"존재한정보"} content={"기가입 안내 (개인) UI-USP-FRN-001160"} 
              //       onConfirm={() => { setOpen(false) }} 
              //       onClose={() => { setOpen(false)}}>
              //     </ModalComponents>
              //   </Fragment>
              // )
              // navigate('signup/confirm',{
              //   state:{
              //     // loginId:loginId,
              //     chargerNm:'UI-USP-FRN-0011601'
              //   }
              // })
            } 

        } else {
          // -> 3. 14미만 확인 이동
          navigate('signup/confirm',{
            state:{
              // loginId:loginId,
              chargerNm:'14 미만이다'
            }
          })
        }
      
    }).catch((e)=>{
      console.log('catchcatchcatchcatchcatchcatch')
      // return (
      //   <Fragment>
      //     <ModalComponents open={open} type={'normal'} title={e.response.status} content={e.response.data.message} 
      //       onConfirm={() => { setOpen(false) }} 
      //       onClose={() => { setOpen(false)}}>
      //     </ModalComponents>
      //   </Fragment>
      // )
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

  return (
    <section css={styles.container}>
      <Box css={styles.backPass}>
        <NavLink to={'/signup'}>
          이전 화면으로 돌아가기
        </NavLink>
      </Box>
      <Box css={styles.content}>
        <Stack className="join_head">
          <Box className="tit">
            <h1>AICA 회원가입</h1>
          </Box>
          <Box className="step_scroll">
            <Stepper activeStep={0} alternativeLabel css={styles.step} className="steprt">
              {stepsbiz.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
        <Box sx={{mb: 6}}>
          <Box className="sub_tit">
            <h2>사업자 회원가입</h2>
            <p>AICA 회원가입을 위해 약관에 동의해주세요.</p>
          </Box>
          <FormGroup css={styles.listboxsup}>
            <FormControlLabel className="checklable" sx={{marginLeft: 0}} control={<CheckboxStyle checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
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
          <Box className='inputtxt'>
            사업자 확인 
          </Box>
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
        <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn} className="btncont2">
          <CustomButton label={'이전'} type={'formbtn'} color={'outlinedgwhite'} onClick={()=>navigate(-1)} />
                                                                                {/* onClick={handelProducerForm} */}
          <CustomButton label={'사업자 공동 인증'} type={'formbtn'} color={'primary'} onClick={handelProducerForm} />
        </Stack>
        {/* <Stack spacing={2} direction="row" justifyContent={'center'} css={styles.signbtn}>
          <Button variant="contained" type="button" className="linebtn" onClick={goInfo}>이전</Button>
          <Button variant="contained" type="button" onClick={handelProducerForm}>휴대폰 본인인증</Button>
        </Stack> */}
               {/* 모달 팝업부분 */}
        <ConsumerModal isOpen={modalOpen} modalClose={()=>{setModalOpen(false)}} ctx={ctx} titx={titx}/>
      </Box>

      {/* <!-- b : 공동인증서 연동 구현 필수 선언 태그 --> */}
      <Box component='form' sx={{display:'none'}} name="reqForm">
          <Input type="hidden" id='sign' name='sign'/>
          <Input type="hidden" id="signOrigin" name="signOrigin" />
          <Input type="hidden" id="vidRandom" name="vidRandom"/>
          <Input type="hidden" id="vidType" name="vidType" value="client"/>
          <Input type="hidden" id="encData" name="encData" value=""/>
          <Input type="hidden" id="signData" name="signData" value="" />
          <Input type="hidden" id="idn" name="idn" value=""/>
      </Box>

      <Box id="dscertContainer" component='div' sx={{display:'none'}}>
        <iframe id="dscert" name="dscert" src=""  width="100%" height="100%" 
          style={{ zIndex:'100010', top:'0px',left:'0px',width:'100%',height:'100%'}}>
        </iframe>
      </Box>
      {/* <!-- e : 공동인증서 연동 구현 필수 선언 태그 s --> */}
    </section>
  );
}

export default Producer;

function LargeTree(): any {
  return Array.from(new Array(5000)).map((_, index) => <span key={index}>.</span>);
}

type authBizType = {
  sign:string
  signOrigin:string
  vidRandom:string
  vidType:string
  encData:string
  signData:string
  idn:string
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


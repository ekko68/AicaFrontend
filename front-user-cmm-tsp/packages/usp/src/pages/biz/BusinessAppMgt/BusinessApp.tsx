// 사업신청/menu-PMS010100 -> 사업신청
import React, { useEffect } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack,Step, Stepper, StepLabel} from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomRadioButtons} from '~/components/ButtonComponents';
import { business_request } from '~/models/Model';
import fetchBusiness from "~/fetches/fetchBusiness";
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModalComponents } from '~/components/ModalComponents';

/* 
  작성일    :   2022/06/22
  화면명    :   사업신청
  회면ID    :   UI-USP-FRN-0130101 
  프로그램ID:   사업신청 필수확인사항 조회 (PRG-USP-SPA-01)
  화면/개발 :   Seongeonjoo / seok 
*/

function BusinessApp() {
  const navigate = useNavigate();
  const receive:any = useLocation();
  const {addModal} = useGlobalModalStore();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  //체크리스트 항목
  const [checkList, setCheckList]:any = useState([]);
  const [applyCheck, setApplyCheck] = useState(0);
  //내가 체크한 리스트
  const [chkList, setChkList]:any = useState([]);

  // 체크리스트 필수 항목 조회
  const getList = async () => {
      await fetchBusiness(receive.state.pblancId).then((res:any) => {
        setCheckList(Object.values(res.list))
      }).catch((e)=>{
        // setOpen(true);
        // setError(e.response.data.message)
        let {message,status} = e.response.data;
        addModal({
          type:'normal',
          open:true,
          content:message,
          onConfirm:() => {
            switch (status) {
              case 401:
                // navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
                navigate('/signin')
                break;         
              default:
                navigate(-1)
                break;
            }
          },
        })
        setApplyCheck(1);
      })
  }
  
  useEffect(() => {
    if(!!receive.state){
      getList();
    }
  },[])

  useEffect(()=>{
    let k:any = [];
    console.log(checkList)
    checkList.map((item:any)=>{
      k.push({chklstId:item.chklstId,ceckResultDivCd:'Y'})
    })
    setChkList(k);
  },[checkList])

  
  const updateChkList = (i:number,chk:any) => {
    setChkList(() => {
      const updated = chkList;
      updated[i] = chk;
      return Object.values(updated);
    })
  }
  if(Array.isArray(chkList) && chkList.length === 0){
  }

  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false);navigate(-1); }} 
        onClose={() => { setOpen(false);navigate(-1);}}>
      </ModalComponents>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업 신청</h2>
              {/* <p>입주기업은 물론 누구나 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p> */}
              <Stepper activeStep={0} alternativeLabel css={styles.step02}>
                {business_request.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom:0}}>
            <h1 className="sub_title_top">{!!receive.state ? receive.state.pblancNm : ''}</h1>
            <Box className="box_guide">
              <ul>
                <li>필수확인사항을 꼼꼼하게 확인한 후 해당 부분에 체크하시기 바랍니다.</li>
                <li>아니오 선택 시 심사 및 선정에 제한이 있을 수 있으며, 아래 사항을 제대로 검토하지 않음으로 발생하는 불이익에 대한 책임은 전적으로 지원자에게 있습니다. </li>
                <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
              </ul>
            </Box>
            {!(Array.isArray(chkList) && chkList.length === 0)?
            <>
            <h4 className="sub_title">필수확인사항 <span className="must">*</span></h4>
            <Box css={styles.table2}>
              <div className="detail_table"> 
                <dl className="header">
                  <dt className="num">번호</dt>
                  <dt className="tac">체크사항</dt>
                  <dt className="check">체크</dt>
                </dl>
                {checkList.map((item:any,i:number)=>(
                <dl key={i}>
                  <dd className="num">{i}</dd>
                  <dd className="cnt">
                    <p>{item.chklstCn}</p>
                    <dd className="check">
                      <CustomRadioButtons 
                      row data={[{codeNm:'예',code:'예'},{codeNm:'아니오',code:'아니오'}]}
                      defaultData={'예'}
                      onClick={(selected)=>{
                        if(selected==="아니오"){
                          chkList[i].ceckResultDivCd = "N";
                        }
                        updateChkList(i,chkList[i])
                      }} 
                    /></dd>
                  </dd>
                </dl>
                ))}
              </div>
            </Box>
              </>
            :null}
            <Stack direction="row" justifyContent="center" sx={{marginTop: '40px'}} css={styles.btn_next}>
              <NavLink to={`/biz/BusinessAppMgt/BusinessAppInfo/${!!receive.state ? receive.state.pblancId : ''}`} 
              state = {{chkList : chkList,pblancId:!!receive.state ? receive.state.pblancId : '',title:!!receive.state ? receive.state.pblancNm : ''}}
              >
                <CustomButton label={'다음'} type={'listBack'} color={'primary'}/>
              </NavLink>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default BusinessApp;
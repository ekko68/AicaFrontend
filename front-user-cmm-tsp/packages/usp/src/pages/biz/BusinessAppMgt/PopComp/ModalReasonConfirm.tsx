import dayjs from "~/../../shared/src/libs/dayjs";
import React,{ useEffect, useRef, useState } from "react";
import * as styles from '../styles';
import { useQueries } from "react-query";
import { Box, Button, Grid, Link, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";
import fetchDownload from "~/fetches/fetchDownload";
import { fetchReportSupplementGet } from "~/fetches/fetchReport";
import { fetchBusinessReason } from "~/fetches/biz/fetchBusinessAppMgt";
import { CustomButton} from "~/components/ButtonComponents";
import { Modalfront } from "~/components/SharedModalComponents";
import { FileUpload } from "~/pages/EventNews/FileUpload";
import {styled} from "@mui/material/styles";
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { QuestionIcon } from '~/components/IconComponents';
import { fetchPerformanceSupplementGet } from "~/fetches/fetchPerformanceMgt";
import { fetchUserResourceDetailGet } from "~/fetches/fetchResource";
import { fetchEvglRequest, fetchRejectReasonGet } from "~/fetches/fetchObjection";
import { colorType, modalType, TypeReason, viewType } from "~/models/ModelBiz";
import { intialErrorQuestion } from "~/models/ModelTreadmill";
import { fetchResnInfo, fetchTaxitmWct } from "~/fetches/biz/fetchContractMgt";
import { ModalComponents } from "~/components/ModalComponents";
import { UsptTaskTaxitmWct, UsptTaskTaxitmWctData, UsptTaskTaxitmWctPop } from "~/models/biz/ContractMgt";
import { TaskReqstWct, TaskReqstWctSum } from "~/models/ModelBizPlanMgt";
import { fetchReservationUserDetail } from "~/fetches/fetchMoveIn";

/*
  공통: 사유확인 모달
  작성자: navycui
*/
export const ModalReasonConfirm :React.FC<{
  applyId:string    // 신청id 전달 받아
  planPresentnSttusCd?:string
  viewNm: viewType
  title?:string
  variant?:"text" | "outlined" | "contained" | undefined
  label?:string
  type?: modalType
  color?:colorType
}> = (props) => {
  type modalType = 'normal' | 'confirm';
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<modalType>('normal');
  const [data, setData] = useState(false);
  const [resVal,setResVal]:any = useState()
  const [openErr, setOpenErr] = useState(false);
  const [errorMsg,setErrorMsg] = useState('');
  const [sumVal, setSumVal] = useState<TaskReqstWctSum>({ReqstWctSum1:{sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0},ReqstWctSum2:{sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0},ReqstWctSum3:{sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0}});
  const [TaskTaxitmWct,setTaskTaxitmWct] = useState<UsptTaskTaxitmWctPop[]>([])


  // 사유확인 모달 열기
  const handlerModalOpen = (type: modalType) => {
    setOpen(true);
    setType(type);
    // api 는 담당자 수정시 각자 맞는 내용추가 todo....
    if(props.viewNm == 'BusAppMgt'){ // 사업신청관리
      getBusinessReason()
    } else if(props.viewNm == 'PresentationDataMgt'){// 발표자료관리
      getBusinessReason()
    } 
    else if(props.viewNm == 'Objection'){// 이의신청목록 반려사유
      getRejectionReason()
    } 
    else if(props.viewNm == 'BusinessPlanMgt'){// 사업계획서 관리
      getResnInfo()
    } else if(props.viewNm == 'ElectronicAgtMgt'){// 전자협약 관리
      getBusinessReason()
    } else if(props.viewNm == 'AgreementChangeMgt'){// 협약변경 관리
      getBusinessReason()
    } else if(props.viewNm == 'ReportSubmission'){// 보고서 제출
      getReportSubmission()
    } else if(props.viewNm == 'PerformanceMgt'){// 성과 관리
      getPerformanceMgt()
    } else if(props.viewNm == 'ModalResAlloc'){// 시설예약 관리
      getModalResAlloc()
    } else if(props.viewNm == 'FacilityReservationMmt'){// 시설예약 관리
      getReservationReason()
    } else if(props.viewNm == 'ReportSubmissionDetail'){// 보고서 제출
      getBusinessReason()
    } else if(props.viewNm == 'AgreementChangeMgtDetail'){// 협약변경관리 상세
      getBusinessReason()
    } else if(props.viewNm == 'SubmissionMaterials'){// 발표자료관리상세
      getBusinessReason()
    } else if(props.viewNm == 'ElectronicAgtMgtDetail'){// 전자협약상세
      getBusinessReason()
    } else if(props.viewNm == 'BusinessPlanMgtDetail'){// 사업계획서 상세
      getFetchTaxitmWct()
    }
  };
  
  // 사유 조회
  const getBusinessReason = () => {
    fetchBusinessReason(props.applyId).then((res:TypeReason) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      setErrorMsg(message)
      setOpenErr(true)
    })
  }
  // 시설예약 관리
  const getReservationReason = () => {
    fetchReservationUserDetail(props.applyId).then((res:any) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      setErrorMsg(message)
      setOpenErr(true)
    })
  }

  // 사업계획서 사유조회
  const getResnInfo = () => {
    if(!!props.applyId){
      console.log('사업계획서 사유조회:=>',props.applyId)
    }
    if(!!props.planPresentnSttusCd){
      fetchResnInfo({bsnsPlanDocId:props.applyId,planPresentnSttusCd:props.planPresentnSttusCd} as any).then((res:TypeReason) => {
          if(!!res){
            setResVal(res)
          }
      }).catch((e:any)=>{
        let message = e.response.data.message;
        setErrorMsg(message)
        setOpenErr(true)
      })
    }
  }

  const getFetchTaxitmWct = () => {
      fetchTaxitmWct(props.applyId).then((res:TypeReason) => {
          if(!!res){
            setTaskTaxitmWct(UsptTaskTaxitmWctData)
          }
      }).catch((e:any)=>{
        let message = e.response.data.message;
        setErrorMsg(message)
        setOpenErr(true)
      })
  }


  // 반려사유 조회
  const getRejectionReason = () => {
    fetchRejectReasonGet(props.applyId).then((res:TypeReason) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      setErrorMsg(message)
      setOpenErr(true)
    })
  }
  // 사유 조회
  const getModalResAlloc = () => {
    fetchUserResourceDetailGet(props.applyId).then((res:TypeReason) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      setErrorMsg(message)
      setOpenErr(true)
    })
  }
  // 사유 조회
  const getReportSubmission = () => {
    fetchReportSupplementGet(props.applyId).then((res:any) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      setErrorMsg(message)
      setOpenErr(true)
    })
    }
  // 사유 조회
  const getPerformanceMgt = () => {
    fetchPerformanceSupplementGet(props.applyId).then((res:any) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      setErrorMsg(message)
      setOpenErr(true)
    })
    }
  
  //다운로드 
  const download = async (applyId:string,attachmentId:string) =>{ 
    let url = ``;
    //(보고서)
    if(props.viewNm === 'ReportSubmission'){
      url = `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${applyId}/makeup/atchmnfl/${attachmentId}`
    //(성과)
    }else if(props.viewNm === 'PerformanceMgt'){
      url = `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${applyId}/makeup/atchmnfl/${attachmentId}`
    }
      fetchDownload(url)
      .then()
      .catch((e)=>{
        let status = e.response.status;
        
        if(status === 400){
          setErrorMsg("파일이 없습니다.")
          setOpenErr(true)
        }
        });
  }
  //전체 다운로드 (보고서제출,성과)
  const downloadAll = () =>{
    
    if(resVal&&resVal.attachFileList){
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQueries(
        resVal.attachFileList.map((item:any) => {
          let url = ``;
          //(보고서)
          if(props.viewNm === 'ReportSubmission'){
            url = `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${props.applyId}/makeup/atchmnfl/${item.attachmentId}`
          //(성과)
          }else if(props.viewNm === 'PerformanceMgt'){
            url = `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${props.applyId}/makeup/atchmnfl/${item.attachmentId}`
          }

          return {
            queryKey: [item.attachmentId],
            queryFn: () => fetchDownload(url),
          }
        })
      )
    }
  }

  const objcReqstCnInput:any = useRef("");
  //파일첨부
  const [files, setFiles]:any= useState([]);
  const [reqstCn,setReqstCn] = useState("");
  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
        update.push(upfile[i]);
      }
    setFiles(update)
  }

  const changeObjcReqstCn = () => {
    setReqstCn(objcReqstCnInput.current.value);
  }

  //결과이의신청
  const evglRequest = () => {
    if(!validate()){
      return;
    };
    try{
      let param ={
        objcReqstCn : reqstCn
      }
      const form = new FormData();
      form.append("objcReqstCn", new Blob([JSON.stringify(param)], {type: "application/json"}));
      for(let i=0; i<files.length; i++){
        form.append("fileList",files[i])
      }
      
      fetchEvglRequest(props.applyId,form).then(()=>{
        //모달닫기 추가
      }).catch((e)=>{
        let message = e.response.data.message;
        setErrorMsg(message)
        setOpenErr(true)
      })
    } catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }
  }
  // useEffect(()=>{
  //   if(props.viewNm == 'EvaluationResultInquiry'){
  //     handlerModalOpen('normal');
  //   }
  // })

  const [questionError,setQuestionError] = useState(intialErrorQuestion);

  const validate = () => {
    let check = true;
    //이의신청 내용 확인
    if (reqstCn===""){
      setQuestionError({
        errorQuestion:true, helperQuestion:"문의내용을 입력하세요."
      })
      check = false;
    }else{
      setQuestionError({
        errorQuestion:false, helperQuestion:""
      })      
    }
    return check;
  }

  // 비목팝업 입력 변경
  const handelChangeTaskReqstWct = (e:React.ChangeEvent<HTMLInputElement>,item:UsptTaskTaxitmWctPop,idx:number) => {
    const { name, value } = e.currentTarget;
    let updated = [...TaskTaxitmWct];
    updated[idx] = {...item,[name]:value};
    setTaskTaxitmWct(updated)
  }

  const uncomma2 = (str:any) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  };

  const inputPriceFormat = (str:any) => {
    const comma = (str:any) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str:any) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };

  useEffect(() => {
    if(TaskTaxitmWct.length > 0){
      let box1 = 0
      let box2 = 0
      let box3 = 0
      let box4:number = 0
     TaskTaxitmWct.forEach((item:UsptTaskTaxitmWctPop,idx:number)=>{
       box1 =+ parseInt(uncomma2(item.sportBudget))
       box2 =+ parseInt(uncomma2(item.alotmCash))
       box3 =+ parseInt(uncomma2(item.alotmActhng))
       box4 =+ parseInt(uncomma2(item.wctTaxitmTot))
     })
     
     console.log(box1)
     console.log(box2)
     console.log(box3)
     console.log(box4)
     setSumVal((pre)=>({...pre,
       ReqstWctSum1:{sum1:box1,sum2:box2,sum3:box3,sum4:box4,sum5:0},
       ReqstWctSum2:{sum1:box1,sum2:box2,sum3:box3,sum4:box4,sum5:0},
       ReqstWctSum3:{sum1:box1,sum2:box2,sum3:box3,sum4:box4,sum5:0}
     }))
    }
 }, [TaskTaxitmWct]);
 console.log(sumVal)

  return (
    <>
      { (props.viewNm == 'SubmissionMaterials' || props.viewNm == 'BusinessPlanMgt'  || props.viewNm == 'ElectronicAgtMgtDetail' || props.viewNm == 'BusinessPlanMgtDetail' || props.viewNm == 'ObjectionApply' || props.viewNm == 'Objection' || props.viewNm == 'ReportSubmission')
        ? 
        props.variant == 'text' ?  <Link underline="hover" className="home" key="1" color="inherit" onClick={()=>{handlerModalOpen('normal')}}>{!!props.label ? props.label :'사유확인'}</Link>
        : <CustomButton variant='outlined' label={!!props.label ? props.label :'사유확인'} type={'modalBtn2'} color={'outlinedgray'} onClick={() => {handlerModalOpen('normal');}}/>
        // <CustomButton variant={!!props.variant ? props.variant : 'outlined'} label={!!props.label ? props.label : '사유 확인'} type={!!props.type ? props.type : 'modalBtn2'} color={!!props.color ? props.color : 'outlinedgray'} onClick={() => {handlerModalOpen('normal');}}/>
        : <CustomButton variant='outlined' label={'사유 확인'} type={'modalBtn2'} color={'outlinedgray'} onClick={() => {handlerModalOpen('normal');}}/>
      }
        <Modalfront
          open={open}
          type={type}
          title={!!props.title ? props.title : '사유'}
          content={type.toString() + ' 모달'}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
            if (data) setData(false);
          }}
        >
        {/* 사업신청관리 / 발표자료관리 / 발표자료관리상세 / 협약변경 관리 / 보고서 제출 / 성과관리 / 협약변경관리 상세 /*/} 
        {(props.viewNm == 'BusAppMgt' || props.viewNm == 'PresentationDataMgt'|| props.viewNm == 'SubmissionMaterials' || props.viewNm == 'AgreementChangeMgt'  || props.viewNm == 'FacilityReservationMmt' || props.viewNm == 'AgreementChangeMgtDetail' ) &&
          <Box css={styles.table05} style={{width:'732px'}}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
            >
              {'반려'}
            </Typography>
            <div className="detail_table"> 
              <dl>
                <dt>요청일시</dt>
                <dd>{(props.viewNm == 'FacilityReservationMmt') ? resVal?.mvnFcRsvt.rsvtReqDt : resVal?.reqDt}</dd>
              </dl>
              <dl>
                <dt>사유</dt>
                <dd>
                {(props.viewNm == 'FacilityReservationMmt') ? resVal?.mvnFcRsvt.rejectReasonCn : resVal?.reason} 
                </dd>
              </dl>
            </div>
            <Stack direction="row" justifyContent="center" spacing={2} sx={{paddingTop:'23.5px'}} css={styles.btn_next}>
              <CustomButton label={'확인'} type={'modalBtn'} color={'primary'} onClick={()=>setOpen(false)}/>
            </Stack>
          </Box>
        }
        {/* 결과이의신청 */}
        {props.viewNm == 'ObjectionApply' && 
          <Box css={styles.table05}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{width:'932px',marginBottom:0}}
            >
              {<>
              이의신청 내용<span className='must'>*</span>
              </>
              }
            </Typography>
            <TextField
              onChange={changeObjcReqstCn}
              inputRef = {objcReqstCnInput}
              id="outlined-multiline-static"
              error = {questionError.errorQuestion}
              helperText = {questionError.helperQuestion}
              multiline rows={4} 
              className="scrollBox" 
              inputProps={{
                maxLength: 1000,
              }}
            />
            <div className='tf_count'>{reqstCn.length}/1000</div>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{marginTop:'23.5px'}}
            >
              {'파일첨부'}
            </Typography>
            <Box css={styles.fileupload}>
              <FileUpload
                files={files}
                handleDelete={handleDelete}
                handleUpload={handleUpload}
              />
            </Box>
            <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '14px',paddingTop:'23.5px',borderTop:'1px solid #e0e0e0'}} css={styles.btn_next}>
              <CustomButton label={'취소'} type={'modalBtn'} color={'outlined'} onClick={()=>setOpen(false)}/>
              <CustomButton label={'저장'} type={'modalBtn'} color={'primary'} onClick={evglRequest}/>
            </Stack>
          </Box>
        }
        {/* 결과신청 목록 반려사유 */}
        {props.viewNm == 'Objection' && 
        <Box css={styles.table05}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {'반려'}
          </Typography>
          <div className="detail_table"> 
            <dl>
              <dt>요청일시</dt>
              <dd>{!!resVal ? resVal.rejectDate : null }</dd>
            </dl>
            <dl>
              <dt>사유</dt>
              <dd>
              {!!resVal ? resVal.rejectReasonCn : '데이터 없습니다.'} 
              </dd>
            </dl>
          </div>
          <Stack direction="row" justifyContent="center" spacing={2} sx={{paddingTop:'23.5px'}} css={styles.btn_next}>
            <CustomButton label={'확인'} type={'modalBtn'} color={'primary'} onClick={()=>setOpen(false)}/>
          </Stack>
        </Box>
        }
        {/* 사업계획서 관리 */}
        {(props.viewNm == 'BusinessPlanMgt' || props.viewNm == 'ReportSubmission' || props.viewNm == 'PerformanceMgt') && 
          <Box css={styles.table05}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{width:'932px',marginTop:'8px'}}
          >
            {'보완요청'}
          </Typography>
          <Box css={styles.table}>
            <div className="detail_table">
              <dl>
                <dt>요청일시</dt>
                <dd>{!!resVal  ? resVal.requestDt : 'no data'}</dd>
              </dl>
              <dl>
                <dt>사유</dt>
                <dd style={{flexDirection:'column',alignItems:'flex-start'}}>
                  {!!resVal  ? resVal.makeupReqCn : 'no data'}
                </dd>
              </dl>
            </div>
          </Box>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginBottom:'10px'}}>
            <h4>파일첨부</h4>
            <Stack css={styles.btnDown}>
              <Button onClick={() => downloadAll()}>
                <span>일괄다운로드</span>
              </Button>
            </Stack>
          </Stack>
          <Stack css={styles.attatchedFile}>
            {resVal?.attachFileList ? resVal?.attachFileList.map((item:any)=>(
            <Stack css={styles.btnDown}>
              <Button onClick={() => download(props.applyId,item.attachmentId)}>
                <span>{item.fileNm}</span>
              </Button>
            </Stack>
            ))
            :null}
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '14px',paddingTop:'23.5px',borderTop:'1px solid #e0e0e0'}} css={styles.btn_next}>
            <CustomButton label={'확인'} type={'modalBtn'} color={'primary'} onClick={()=>setOpen(false)}/>
          </Stack>
          </Box>
        }
        {/* 전자협약 관리 */}
        {props.viewNm == 'ElectronicAgtMgt' && 
          <>
            <div className="tableDefault_scroll vert" style={{height:'568px'}}>
              <Stack direction={'row'} justifyContent={'center'} alignItems={'flex-end'} sx={{marginTop:'4px'}}>
                <h2>협약서</h2>
              </Stack>
              <Box className="box_guide">
                <ul>
                  <li>사업명 : AI (시)제품/서비스 제작지원 사업</li>
                  <li>과제명 : 딥러닝 기반 버츄얼 휴면 인플루언서 개발</li>
                  <li>협약기간 : 2021-11-12 ~ 2022-12-12</li>
                </ul>
              </Box>
              <Typography className="tbl_title" variant="h4"></Typography>
              <h4 className="tbl_title">협약금액</h4>
              <table className="tableDefault type5">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th rowSpan={2}>지원금</th>
                    <th colSpan={3}>민간부담금</th>
                    <th rowSpan={2}>합계</th>
                  </tr>
                  <tr>
                    <th>현금</th>
                    <th>현물</th>
                    <th>소계</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                  </tr>
                </tbody>
              </table>
              <p className="p_desc">작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. </p>
              <h4 className="tbl_title">참여기업</h4>
              <table className="tableDefault type5">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>기업명</th>
                    <th>사업자등록번호</th>
                    <th>대표자명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>브레인드</td>
                    <td>111-111111-11</td>
                    <td>홍길동</td>
                  </tr>
                </tbody>
              </table>
              <Stack direction={'row'} justifyContent={'center'} alignItems={'flex-end'} sx={{marginTop:'60px'}}>
                <h4>2021-11-12</h4>
              </Stack>
              <Grid container spacing={2} className="stampSet">
                <Grid item xs={6}>
                  <ul>
                    <li className="corp">인공지능산업융합사업단</li>
                    <li className="corpNum">111-111111-1111</li>
                    <li className="name">김철수</li>
                    <li className="img_stamp"><img src="/images/subpage/temp_stamp.jpg" /></li>
                  </ul>
                </Grid>
                <Grid item xs={6}>
                  <ul>
                    <li className="corp">㈜블루레몬</li>
                    <li className="corpNum">111-111111-1111</li>
                    <li className="name">홍길동</li>
                    <li className="img_stamp"><img src="/images/subpage/temp_stamp.jpg" /></li>
                  </ul>
                </Grid>
              </Grid>
              <div className="img_original" style={{margin:'120px 0 50px'}}><img src="/images/subpage/temp_original.jpg" /></div>
            </div>
            <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary">다운로드</Button>
            </Stack>
          </>
        }
        {/* 전자협약 상세 */}
        {props.viewNm == 'ElectronicAgtMgtDetail' && 
          <>
            <div className="tableDefault_scroll vert eamd" style={{height:'568px'}}>
              <Stack direction={'row'} justifyContent={'center'} alignItems={'flex-end'} sx={{margin:'4px 0 24px'}}>
                <h2>협약서</h2>
              </Stack>
              <Box className="box_guide">
                <ul>
                  <li>사업명 : AI (시)제품/서비스 제작지원 사업</li>
                  <li>과제명 : 딥러닝 기반 버츄얼 휴면 인플루언서 개발</li>
                  <li>협약기간 : 2021-11-12 ~ 2022-12-12</li>
                </ul>
              </Box>
              <h4 className="tbl_title">협약금액</h4>
              <table className="tableDefault type5">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th rowSpan={2}>지원금</th>
                    <th colSpan={3}>민간부담금</th>
                    <th rowSpan={2}>합계</th>
                  </tr>
                  <tr>
                    <th>현금</th>
                    <th>현물</th>
                    <th>소계</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                    <td className='tar'>200,000</td>
                  </tr>
                </tbody>
              </table>
              <p className="p_desc">작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. </p>
              <h4 className="tbl_title">참여기업</h4>
              <table className="tableDefault type5">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>기업명</th>
                    <th>사업자등록번호</th>
                    <th>대표자명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>브레인드</td>
                    <td>111-111111-11</td>
                    <td>홍길동</td>
                  </tr>
                </tbody>
              </table>
              <Stack direction={'row'} justifyContent={'center'} alignItems={'flex-end'} sx={{marginTop:'60px'}}>
                <h4>2021-11-12</h4>
              </Stack>
              <Grid container spacing={2} className="stampSet">
                <Grid item xs={6}>
                  <ul>
                    <li className="corp">인공지능산업융합사업단</li>
                    <li className="corpNum">111-111111-1111</li>
                    <li className="name">김철수</li>
                    <li className="img_stamp"><img src="/images/subpage/temp_stamp.jpg" /></li>
                  </ul>
                </Grid>
                <Grid item xs={6}>
                  <ul>
                    <li className="corp">㈜블루레몬</li>
                    <li className="corpNum">111-111111-1111</li>
                    <li className="name">홍길동</li>
                    <li className="img_stamp"><img src="/images/subpage/temp_stamp.jpg" /></li>
                  </ul>
                </Grid>
              </Grid>
              <div className="img_original"><img src="/images/subpage/temp_original.jpg" /></div>
            </div>
            <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary">다운로드</Button>
            </Stack>
          </>
        }
        {/* 자원할당내역 */}
        {props.viewNm == 'ModalResAlloc' &&
          <>
            <Box css={styles.table05} sx={{ mt: 3 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{width:'932px'}}
              >
                {'기본정보'}
              </Typography>
              <div className="detail_table"> 
                <dl>
                  <dt>공고명</dt>
                  <dd>{resVal?.pblancNm}</dd>
                  <dt>접수번호</dt>
                  <dd>{resVal?.receiptNo}</dd>
                </dl>
                <dl>
                  <dt>이용상태</dt>
                  <dd>{resVal?.alsrcStNm}</dd>
                  <dt>이용기간</dt>
                  <dd>{resVal?.alrsrcBgngDay+" ~ "+resVal?.alrsrcEndDay}</dd>
                </dl>
              </div>
            </Box>
            <div className="tbl_title">할당자원</div>
            {/* 데이터 추가후 수정 */}
            {/* alrsrcDstbUserList: [
            {
            alrsrcId: String, 자원할당ID
            rsrcId: String,   자원ID
            rsrcGroupCd: String, 자원그룹코드
            rsrcGroupNm: String, 자원그룹명
            rsrcTypeNm: ‘String”, 자원유형명
            rsrcUseYn: boolean, 자원사용여부
            rsrcDstbQy: Long, 자원배분량
            rsrcDstbCn: String 자원배분내용
            },
            …
            ] */}

            {/* <Box css={styles.table05} sx={{ mt: 3 }}>
              <div className="detail_table mo"> 
                <dl>
                  <dt>가속기</dt>
                  <dd>A100 (8개)</dd>
                  <dt>스토리지</dt>
                  <dd>50 GB</dd>
                </dl>
                <dl>
                  <dt>Saas</dt>
                  <dd>사용 (음성인식(STT))</dd>
                  <dt>데이터레이크</dt>
                  <dd>사용안함</dd>
                </dl>
              </div>
            </Box> */}
            <table className="tableDefault type2 pc">
              <thead>
                <tr>
                  <th>가속기</th>
                  <th>스토리지</th>
                  <th>Saas</th>
                  <th>데이터레이크</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A100 (8개)</td>
                  <td>50 GB</td>
                  <td>사용 (음성인식(STT))</td>
                  <td>사용안함</td>
                </tr>
              </tbody>
            </table>
            <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary" onClick={()=>setOpen(false)}>확인</Button>
            </Stack>
          </>
        }
        {/* 자원할당내역 */}
        {props.viewNm == 'ReportSubmissionDetail' &&
          <>
            <Box css={styles.table05}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{width:'732px'}}
              >
                {'보완요청'}
              </Typography>
              <div className="detail_table"> 
                <dl>
                  <dt>요청일시</dt>
                  <dd>{resVal ? resVal.makeupReqDate : null }</dd>
                </dl>
                <dl>
                  <dt>사유</dt>
                  <dd style={{flexDirection:'column',alignItems:'flex-start'}}>
                    <p>{resVal? resVal.makeupReqCn : null}</p>
                  </dd>
                </dl>
              </div>
            </Box>
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginBottom:'10px'}}>
              <h4>첨부파일</h4>
              <Stack css={styles.btnDown}>
                <Button onClick={() => downloadAll()}>
                  <span>일괄다운로드</span>
                </Button>
              </Stack>
            </Stack>
            <Stack css={styles.attatchedFile}>
              {resVal&&resVal.attachFileList?resVal.attachFileList.map((item:any)=>(
              <Stack css={styles.btnDown}>
                <Button onClick={() => download(props.applyId,item.attachmentId)}>
                  <span>{item.fileNm}</span>
                </Button>
              </Stack>
              ))
              :null}
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary" onClick={()=>setOpen(false)}>확인</Button>
            </Stack>
          </>
        }
        {/* 사업계획서 상세 /비목별 사업비 구성 */}
        {props.viewNm == 'BusinessPlanMgtDetail' &&
          <>
            <Stack css={styles.title_set}>
              <h4 className="tbl_title">'2021년도 비목별 사업비 구성' <span className='unit'>(단위:천원)</span></h4>
              <div className='tbl_desc'>• 입력 후 등록버튼 클릭 시 연차별 요약정보가 산정됩니다.</div>
            </Stack>
            <div className="tableDefault_scroll vert bpmd">
              <table className="tableDefault type6">
                <colgroup>
                  <col style={{width:'7%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'27%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={2}>구분</th>
                    <th colSpan={4}>사업비 편성 내용</th>
                    <th rowSpan={3}>합계</th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>비목</th>
                    <th rowSpan={2}>세목</th>
                    <th rowSpan={2}>산출근거</th>
                    <th rowSpan={2}>지원예산</th>
                    <th colSpan={2}>민간부담금</th>
                  </tr>
                  <tr>
                    <th>현금</th>
                    <th>현물</th>
                  </tr>
                </thead>
              </table>
              <table className="tableDefault type7">
                <colgroup>
                <col style={{width:'7.1%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'26.9%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13.1%'}}/>
                </colgroup>
                <tbody>
                  {
                    TaskTaxitmWct.length > 0 ? TaskTaxitmWct.map((item:any,idx:number)=>{
                      
                      if(item.wctIoeNm  == '인건비')
                        return<>
                            { item.wctTaxitmNm == '보수' ? 
                              <tr>
                                <>
                                  <td rowSpan={4}>인건비</td>
                                    <td className="tal">
                                    <Stack style={{alignSelf:'end',paddingBottom:0}} flexDirection={'row'}  css={styles.tooltip}>
                                      {item.wctTaxitmNm}
                                      <HtmlTooltip
                                        title={
                                          <React.Fragment>
                                            {/* <Typography color="inherit">신청상태 안내</Typography> */}
                                            <ul className='tooltip_list'>
                                              추후 내용 추가 예정
                                              {/* <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                                              <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                              <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                              <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                                              <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                                              <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li> */}
                                            </ul>
                                          </React.Fragment>
                                        }
                                        placement="bottom-start"
                                      >
                                        <IconButton>
                                          <QuestionIcon />
                                        </IconButton>
                                      </HtmlTooltip>
                                    </Stack>
                                    </td> 
                                    <td><OutlinedInput size="small" name='computBasisCn' value={inputPriceFormat(item.computBasisCn)} className="ipt_tp01" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                    <td><OutlinedInput size="small" name='sportBudget' value={inputPriceFormat(item.sportBudget)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                    <td><OutlinedInput size="small" name='alotmCash' value={inputPriceFormat(item.alotmCash)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                    <td><OutlinedInput size="small" name='alotmActhng' value={inputPriceFormat(item.alotmActhng)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                    <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>       
                                </>
                              </tr>
                            : 
                            <>
                              <tr>
                                <td className="tal">{item.wctTaxitmNm}</td>
                                <td><OutlinedInput size="small" name='computBasisCn' value={inputPriceFormat(item.computBasisCn)} className="ipt_tp01" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                <td><OutlinedInput size="small" name='sportBudget' value={inputPriceFormat(item.sportBudget)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                <td><OutlinedInput size="small" name='alotmCash' value={inputPriceFormat(item.alotmCash)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                <td><OutlinedInput size="small" name='alotmActhng' value={inputPriceFormat(item.alotmActhng)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                                <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>
                              </tr>
                              </>
                            }

                            </>
                    }) : null
                  }
                  <tr>
                    <td className="tal sum">소계</td>
                    <td>-</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum1)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum2)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum3)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum4)}</td>
                  </tr>
                {                 
                  TaskTaxitmWct.length > 0 ? TaskTaxitmWct.map((item:any,idx:number)=>{
                    if(item.wctIoeNm  == '운영비')
                        return (
                          <>
                            {/* 운영비 */}
                          {
                            item.wctTaxitmNm == '일반수용비' ? 
                            <tr>
                              <td rowSpan={11}>운영비</td>
                              <td className="tal">일반수용비</td>
                              <td><OutlinedInput size="small" name='computBasisCn' value={inputPriceFormat(item.computBasisCn)} className="ipt_tp01" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td><OutlinedInput size="small" name='sportBudget' value={inputPriceFormat(item.sportBudget)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td><OutlinedInput size="small" name='alotmCash' value={inputPriceFormat(item.alotmCash)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td><OutlinedInput size="small" name='alotmActhng' value={inputPriceFormat(item.alotmActhng)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>
                            </tr>
                            : 
                            <tr>
                              <td className="tal">{item.wctTaxitmNm}</td>
                              <td><OutlinedInput size="small" name='computBasisCn' value={inputPriceFormat(item.computBasisCn)} className="ipt_tp01" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td><OutlinedInput size="small" name='sportBudget' value={inputPriceFormat(item.sportBudget)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td><OutlinedInput size="small" name='alotmCash' value={inputPriceFormat(item.alotmCash)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td><OutlinedInput size="small" name='alotmActhng' value={inputPriceFormat(item.alotmActhng)} className="ipt_tp01 tar" sx={{width:'100%'}} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}/></td>
                              <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>
                            </tr>
                          }
                        </>
                      )
                }): null
              }
                <>
                  <tr>
                    <td className="tal sum">소계</td>
                    <td>-</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum1)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum2)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum3)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum4)}</td>
                  </tr>
                  <tr className="total">
                    <td colSpan={2}>합계</td>
                    <td>-</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum1)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum2)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum3)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum4)}</td>
                  </tr>
                </>

                </tbody>
              </table>
            </div>  
            <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary" onClick={()=>setOpen(false)}>저장</Button>
            </Stack>
          </>
        }
        </Modalfront>
        <ModalComponents open={openErr} type={'normal'} content={errorMsg} 
          onConfirm={() => { setOpenErr(false) }} 
          onClose={() => { setOpenErr(false)}}>
        </ModalComponents>
    </>
  );
};
const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      borderRadius: '20px',
      border: '1px solid #dadde9',
      padding: '30px'
  },
}));
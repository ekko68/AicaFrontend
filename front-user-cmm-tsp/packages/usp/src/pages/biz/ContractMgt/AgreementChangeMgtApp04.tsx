import React, { useEffect } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Box,OutlinedInput, Stack,  TextField, Typography, TooltipProps, Tooltip, tooltipClasses, styled, Tab, Tabs} from '@mui/material';
import { CustomAgreementButtons, CustomButton } from '~/components/ButtonComponents';
import { FileUpload, FileUpload1 } from "../../EventNews/FileUpload";
import {CustomRadioButtons} from '~/components/ButtonComponents';
import { QuestionIcon } from '~/components/IconComponents';
import IconButton from '@material-ui/core/IconButton';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCnvnApplcntCancel, fetchCnvnApplcntPost, fetchTaskTaxitmGet } from "~/fetches/biz/fetchAgreementChangeMgt";
import { AgreementTaskTaxitmBeforeTable } from "./View/AgreementTaskTaxitmTable";


// 협약변경 관리 비목별사업비
function AgreementChangeMgtApp04() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [resnCnError,setResnCnError] = useState({resnCnError:false, resnCnHelper:""})
  const [usptTaskTaxitmWctHistAfterList,setUsptTaskTaxitmWctHistAfterList]:any = useState();
  const [data,setData]:any = useState();
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  //사업연도 리스트
  const [bsnsYear, setBsnsYear] = useState<string[]>([]);
  const [wctIoeNm, setWctIoeNm] = useState<string[]>([]);
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //resnCnError.errorTitle
  //resnCnError.helperTitle
  //변경사유
  // const resnCn:any = useRef("");
  const [resnCn, setResnCn] = useState("");

  const deleteAttach1 = (attachmentId:string,i:number) =>{
    const update = [...deleteAttachFileList]
    update.push({
      attachmentId : attachmentId
    })
    setDeleteAttachFileList(update);
    const update1 = [...attachmentFileList]
    update1.splice(i,1)
    setAttachmentFileList(update1);
  }

  //파일첨부 삭제
  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };

  const isDetail = true;
  const [files, setFiles]:any= useState([]);

  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
        update.push(upfile[i]);
      }
    setFiles(update)
  }

  const updateItem = (item:any,i:number) => {
    console.log(item)
    const updated = [...usptTaskTaxitmWctHistAfterList];
    updated[i] = item
    // updated[i] = {...item, alotmSum:(item.alotmCash+item.alotmActhng) , alotmSumTot:(item.alotmCash+item.alotmActhng+item.sportBudget)};
    console.log(item);
    setUsptTaskTaxitmWctHistAfterList(updated);
  };

  const submit = () =>{
    if(resnCn===""){
      setResnCnError({resnCnError:true, resnCnHelper:"변경사유를 입력하세요."})
      return
    }else {
      setResnCnError({resnCnError:false, resnCnHelper:""})
    }
    try{
      const form = new FormData();
      if(data){
        for(let i=0; i<files.length; i++){
          form.append("fileList",files[i])
        }
        const info = {
          usptCnvnChangeReq : {
            cnvnChangeReqId : data.usptCnvnChangeReq.cnvnChangeReqId,
            resnCn : resnCn,
            bsnsCnvnId : data.usptCnvnChangeReq.bsnsCnvnId
          },
          usptTaskTaxitmWctHistAfterList : usptTaskTaxitmWctHistAfterList,
          attachFileList : attachmentFileList,
          attachFileDeleteList : deleteAttachFileList,
          }
        
          form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
          fetchCnvnApplcntPost(form).then(()=>{
            navigate('/biz/ContractMgt/AgreementChangeMgt')

          }).catch((e: { response: { data: { message: any; }; }; })=>{
            setOpen(true);
            setError(e.response.data.message)
          })
        }
      } catch (e:any){
        if(!!e.response && e.response.data) return alert(e.response.data.message);
      }
      
    }
  
  const cancel = () => {
    if(resnCn===""){
      setResnCnError({resnCnError:true, resnCnHelper:"변경사유를 입력하세요."})
      return
    }else {
      setResnCnError({resnCnError:false, resnCnHelper:""})
    }
    fetchCnvnApplcntCancel({
          cnvnChangeReqId : data.usptCnvnChangeReq.cnvnChangeReqId,
          changeIemDivCd : data.usptCnvnChangeReq.changeIemDivCd
    }).then(()=>{
      navigate('/biz/ContractMgt/AgreementChangeMgt')
    })
  }
  const params = {
    cnvnChangeReqId : "",
    bsnsCnvnId : receive?.state?.bsnsCnvnId
  }
  //세목 칸
  const [count,setCount] = useState([]);

  const getData = () => {
    fetchTaskTaxitmGet(params).then((res:any)=>{
        setData(res);
        console.log(res);
        setUsptTaskTaxitmWctHistAfterList(res.usptTaskTaxitmWctHistAfterList)
        const a:any = [];
        const b:any = [];
        res.usptTaskTaxitmWctHistAfterList.map((item:any)=>{
          a.push(item.wctIoeNm)
          b.push(item.bsnsYear)
        })
        const objUnique:any = {}; // 중복없는 배열 요소만 담는 객체
        a.forEach((el: string | number) => { 
          objUnique[el] = true;
        });
        const arrUnique = Object.keys(objUnique); // 객체 키만 모아서 배열로 반환
        setWctIoeNm(arrUnique)
        const objUnique1:any = {}; // 중복없는 배열 요소만 담는 객체
        b.forEach((el: string | number) => { 
          objUnique1[el] = true;
        });
        const arrUnique1 = Object.keys(objUnique1); // 객체 키만 모아서 배열로 반환
        setBsnsYear(arrUnique1)
        let c:any = [];
        arrUnique.map((k:any)=>{
          let d = 1;
          res.usptTaskTaxitmWctHistAfterList.map((item:any)=>{ 
            if((k===item.wctIoeNm)&&(arrUnique1[0]===item.bsnsYear)){
              d ++ ;
            }
          })
          c.push(d);
        })
        setCount(c);
        
        setAttachmentFileList(res.attachFileList)
        setResnCn(res.usptCnvnChangeReq.resnCn?res.usptCnvnChangeReq.resnCn:"")
    })
  }
  useEffect(()=>{
    getData();
  },[])

  console.log(count)
  return (
    <div css={styles.container}>
    <Box css={styles.sub_cont01}>
      <div className="benner">
        <BreadCrumb />
        <div className="content">
          <div className="txtbox">
            <h2 className="tit">협약변경 신청</h2>
            <p className={isDetail?'nobtm':''}>변경신청 내역 작성 후 변경요청을 해주세요.</p>
          </div>
        </div>
      </div>
    </Box>
    <Box css={styles.sub_cont02}>
      <div className='content_body'>
        <div className="content">
          <Box className="box_guide">
            <ul>
              <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
            </ul>
          </Box>
          <Box css={styles.table}>
            <h4 className="tbl_title">기본정보</h4>
            <div className="detail_table"> 
              <dl>
                <dt>신청상태</dt>
                <dd>{data?.usptCnvnChangeReq?.cnvnChangeSttusNm}</dd>
                <dt>신청일</dt>
                <dd>{data?.usptCnvnChangeReq?.reqDe}</dd>
              </dl>
              <dl>
                <dt>접수번호</dt>
                <dd>{data?.usptCnvnChangeReq?.receiptNo}</dd>
                <dt>과제명</dt>
                <dd>{data?.usptCnvnChangeReq?.taskNmKo}</dd>
              </dl>
              <dl>
                <dt>변경유형</dt>
                <dd>
                <CustomAgreementButtons
                  row
                  defaultData={data?.usptCnvnChangeReq?.cnvnChangeTypeNm}
                  data={[{code:'승인',codeNm:'승인'}, {code:'통보',codeNm:'통보'}]}
                  onClick={(selected) => {
                    console.log(selected);
                  }}
                />
                </dd>
                <dt>변경항목</dt>
                <dd>과제정보</dd>
              </dl>
              <dl>
                <dt className="star">변경사유</dt>
                <dd>
                  <Box css={styles.inputBox}>
                    <TextField
                      id="outlined-multiline-static"
                      multiline rows={4} 
                      name='resnCn'
                      value={resnCn}
                      className="scrollBox" 
                      inputProps={{
                        maxLength: 1000,
                      }}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.currentTarget;
                        setResnCn(value);
                      }}
                      error = {resnCnError.resnCnError}
                      helperText = {resnCnError.resnCnHelper}
                    />
                    <span className="count"><em>{resnCn.length}</em>/1000</span>
                  </Box>
                </dd>
              </dl>
            </div>
          </Box>
          <Box css={styles.table}>
            <Typography variant="h6" component="div">
              변경 전 내용
            </Typography>
            <h4 className="tbl_title mt20">비목별 사업비 구성 <span className='unit'>(단위 : 천원)</span></h4>
            <h4 className="tbl_title mt20">신청예산 <span className='unit'>(단위 : 천원)</span></h4>
            <Box className="detailtab_02">
              <Box className='scrollTab' sx={{mb: '20px'}}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                  {bsnsYear.map((item:any, i:number)=>(
                    <Tab label={item+"년"} {...a11yProps(i)} />
                  ))}
                </Tabs>
              </Box>
            </Box>
            {bsnsYear.map((item:any, i:number)=>(
            <TabPanel value={value} index={i}>
            <div className="tableDefault_scroll">
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
              <div className="table_rowScroll">
                <table className="tableDefault type7">
                  <colgroup>
                    <col style={{width:'7%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'27%'}}/>
                    <col style={{width:'13%'}}/>
                    <col style={{width:'13%'}}/>
                    <col style={{width:'13%'}}/>
                    <col style={{width:'13%'}}/>
                  </colgroup>
                  <tbody>
                      {wctIoeNm.map((item:any)=>(
                        <></>
                      ))}
                      {usptTaskTaxitmWctHistAfterList.map((item:any)=>(
                        <></>
                      ))}
                    <tr>
                      <td rowSpan={4}>인건비</td>
                      <td className="tal">
                      <Stack style={{alignSelf:'end'}} flexDirection={'row'} css={styles.tooltip} className="pb0">
                        보수
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              {/* <Typography color="inherit">신청상태 안내</Typography> */}
                              <ul className='tooltip_list'>
                                <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                                <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                                <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                                <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li>
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
                      <td className="tal">산출근거가 출력됨</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">사용임금</td>
                      <td className="tal">산출근거가 출력됨</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">일용임금</td>
                      <td className="tal">산출근거가 출력됨</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal sum">소계</td>
                      <td>-</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td rowSpan={11}>운영비</td>
                      <td className="tal">일반수용비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">공공요금 및 제세</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">특근매식비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">임차료</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">시설장비유지비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">차량비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">재료비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">복리후생비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">일반용역비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal">관리용역비</td>
                      <td></td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr>
                      <td className="tal sum">소계</td>
                      <td>-</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                    <tr className="total">
                      <td colSpan={2}>합계</td>
                      <td>-</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                      <td className="tar">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </TabPanel>
            ))}

              <TabPanel value={value} index={1}>
                2021년
              </TabPanel>
              <TabPanel value={value} index={2}>
                2020년
              </TabPanel>
          </Box>
          <Box css={styles.table}>
            <Typography variant="h6" component="div">
              변경 후 내용
            </Typography>
            <h4 className="tbl_title mt20">신청예산 <span className='unit'>(단위 : 천원)</span></h4>
              <Box className="detailtab_02">
                <Box className='scrollTab' sx={{mb: '20px'}}>
                  <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                    {bsnsYear.map((item:any)=>(
                      <></>
                    ))}
                    <Tab label="2022년" {...a11yProps(0)} />
                    <Tab label="2021년" {...a11yProps(1)} />
                    <Tab label="2020년" {...a11yProps(2)} />
                  </Tabs>
                </Box>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="tableDefault_scroll">
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
                        <th colSpan={2} className="noline_left">구분</th>
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
                  <div className="table_rowScroll">
                    <table className="tableDefault type7 newType">
                      <colgroup>
                        <col style={{width:'7%'}}/>
                        <col style={{width:'14%'}}/>
                        <col style={{width:'27%'}}/>
                        <col style={{width:'13%'}}/>
                        <col style={{width:'13%'}}/>
                        <col style={{width:'13%'}}/>
                        <col style={{width:'13%'}}/>
                      </colgroup>
                      <tbody>
                        <tr>
                          <td rowSpan={4}>인건비</td>
                          <td className="tal">
                          <Stack style={{alignSelf:'end'}} flexDirection={'row'} css={styles.tooltip} className="pb0">
                            보수
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  {/* <Typography color="inherit">신청상태 안내</Typography> */}
                                  <ul className='tooltip_list'>
                                    <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                                    <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                    <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                    <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                                    <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                                    <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li>
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
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">사용임금</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">일용임금</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal sum">소계</td>
                          <td>-</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td rowSpan={11}>운영비</td>
                          <td className="tal">일반수용비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">공공요금 및 제세</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">특근매식비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">임차료</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">시설장비유지비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">차량비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">재료비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">복리후생비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">일반용역비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal">관리용역비</td>
                          <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td><OutlinedInput /></td>
                          <td className="tar">0</td>
                        </tr>
                        <tr>
                          <td className="tal sum">소계</td>
                          <td>-</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                        </tr>
                        <tr className="total">
                          <td colSpan={2}>합계</td>
                          <td>-</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                          <td className="tar">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} >2021년</TabPanel>
            <TabPanel value={value} index={2}>2020년</TabPanel>
          </Box>
          <Box css={styles.table}>
            <h4 className="tbl_title">증빙파일첨부</h4>
          </Box>
          <Box css={styles.fileupload}>
            <FileUpload1
                  files={files}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload} 
                  files1={attachmentFileList} 
                  handleDelete2={deleteAttach1}                        
            />
          </Box>
          {data?.usptCnvnChangeReq?.cnvnChangeSttusNm==="신청"?
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
            <CustomButton label={'신청 취소'} type={'listBack'} color={'primary'} onClick={cancel}/>
          </Stack>
          :null}
          {data?.usptCnvnChangeReq?.cnvnChangeSttusNm!=="신청"&&data?.usptCnvnChangeReq?.cnvnChangeSttusNm!=="승인"&&data?.usptCnvnChangeReq?.cnvnChangeSttusNm!=="반려"?
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
            <CustomButton label={'신청'} type={'listBack'} color={'primary'} onClick={submit}/>
          </Stack>
          :null}
        </div>
      </div>
    </Box>
    </div>
  );
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default AgreementChangeMgtApp04;


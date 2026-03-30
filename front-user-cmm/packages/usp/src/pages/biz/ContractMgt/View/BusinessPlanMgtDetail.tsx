import { useState,useEffect } from 'react';
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import { CustomButton } from '~/components/ButtonComponents';
import { ModalReasonConfirm } from '../../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGetCommCode } from '~/fetches';
import { useQuery } from 'react-query';
import { fetchBsnsPlanDocInfo, fetchModifyPlan, fetchModifyPlanTmp } from '~/fetches/biz/fetchContractMgt';
import { BsnsPlanDocInfo, BsnsPlanDocInfoData, sumType, TaskReqstWct } from '~/models/ModelBizPlanMgt';
import { ModalComponents } from '~/components/SharedModalComponents';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { UsptTaskPartcptsTodoList } from './UsptTaskPartcptsTodoList';
import { FileUpload1 } from '~/pages/EventNews/FileUpload';
import styled from '@emotion/styled';
import { SelectIcon } from '~/components/IconComponents';
import { SelectChangeEvent, Box, Tabs, Tab, Stack, OutlinedInput, FormControl, Select, FormControlLabel, Checkbox, FormGroup, MenuItem } from '@mui/material';

/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 협약관리 -> 사업계획서 관리 상세
  회면ID    :   (UI-USP-FRN-0170201)
  화면/개발 :   Seongeonjoo / navycui
*/

const BusinessPlanMgtDetail = () => {

  const navigate = useNavigate()
  const receive:any = useLocation();
  const [value, setValue] = useState(0);
  const [tabNum, setTabNum] = useState(0);
  const [open, setOpen] = useState(false);
  const {addModal} = useGlobalModalStore()
  const [openTab, setOpenTab] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [changeYn, setChangeYn] = useState(false);
  const [sumVal, setSumVal] = useState<sumType>({sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0});
  const [cmpnyTypebox, setCmpnyTypebox] = useState<any>();
  const [files, setFiles]:any= useState([]);
  const [PlanDocInfo, setPlanDocInfo] = useState<BsnsPlanDocInfo>(BsnsPlanDocInfoData);

  // 공통 코드 조회
  const {data:assign_box} = useQuery("TASK_TYPE", async () => await fetchGetCommCode("TASK_TYPE"));

  // 사업계획서상세 조회
  const { data:list=[],refetch } = useQuery(["fetchBsnsPlanDocInfo",receive.state.item.bsnsSlctnId], async () => 
    await fetchBsnsPlanDocInfo({bsnsPlanDocId:receive.state.item.bsnsPlanDocId,bsnsSlctnId:receive.state.item.bsnsSlctnId}),{
      enabled: !!receive.state,
      onError: (err:any)=>{
        setOpen(true)
      },
      onSuccess: (data) => {
        setPlanDocInfo(data)
      },
    });
  
  // 파일업로드
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
        update.push(upfile[i]);
      }
    setFiles(update)
  }

  // 입력 변경
  const handelChangeInfo = (e:React.ChangeEvent<HTMLInputElement>,type:string) => {
    const { name, value } = e.currentTarget;
    setPlanDocInfo((pre:any)=>({
      ...pre,[type]:{...pre[type],[name]:value}
    }))
  }

  // 신청예산 입력 변경
  const handelChangeTaskReqstWct = (e:React.ChangeEvent<HTMLInputElement>,item:TaskReqstWct,idx:number) => {
    const { name, value } = e.currentTarget;
    const updated:any = [...PlanDocInfo.usptTaskReqstWct];
    updated[idx] = {...item,[name]:value};
    setPlanDocInfo((pre:any)=>({
      ...pre,usptTaskReqstWct:updated
    }))
    console.log(item)
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    setCmpnyTypebox((state:any) => ({ ...state, [event.target.name as string]: event.target.value as string }));
  };
  // tab event
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if(value === 1) {
        setOpenTab(true)
        setTabNum(newValue)
    } else {
      // setOpenTab(true)
      setValue(newValue)
    }
  };

  useEffect(() => {
     if(PlanDocInfo.usptTaskReqstWct.length > 0){
      let box1:number,box2:number,box3:number,box4:number,box5:number = 0
      PlanDocInfo.usptTaskReqstWct.forEach((item:TaskReqstWct,idx:number)=>{
        box1 =+ parseInt(uncomma2(item.sportBudget))
        box2 =+ parseInt(uncomma2(item.alotmCash))
        box3 =+ parseInt(uncomma2(item.alotmActhng))
        box4 =+ parseInt(uncomma2(item.alotmSum))
        box5 =+ parseInt(uncomma2(item.alotmSumTot))
      })
      console.log("sumValsumValsumValsumValsumVal",sumVal)
      setSumVal((pre)=>({
        ...pre,sum1:box1,sum2:box2,sum3:box3,sum4:box4,sum5:box5
      }))
     }
  }, [PlanDocInfo.usptTaskReqstWct]);


  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };

  // 임시 저장
  const saveTemp = (step:string) => {
    const formData = new FormData();
    const json = JSON.stringify(PlanDocInfo);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('info',blob)
    
    for(let i=0; i<files.length; i++){
      formData.append("fileList",files[i])
    }
    fetchModifyPlanTmp(formData,PlanDocInfo.usptBsnsPlanDoc.planPresentnSttusCd = 'PLPR02').then((res)=>{
      setChangeYn(false)
      setValue(tabNum)
      setErrMsg('')
      addModal({
        type: 'normal',
        open: true,
        content: "임시저장 완료되었습니다.",
        onConfirm: () => {
          setValue(tabNum)
        },
      })
    }).catch((err)=>{
      let msg = err.response.data.message
      setErrMsg(msg)
      setOpenErr(true)
    })
  }
  // 저장
  const saveSend = (step:string) => {
    const formData = new FormData();
    const json = JSON.stringify(PlanDocInfo);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('info',blob)
    fetchModifyPlan(formData,PlanDocInfo.usptBsnsPlanDoc.planPresentnSttusCd = 'PLPR02').then((res)=>{
      setErrMsg('')
      setChangeYn(false)
      
      addModal({
        type: 'normal',
        open: true,
        content: "저장 되었습니다."
      })
    }).catch((err)=>{
      let msg = err.response.data.message
      setOpenErr(true)
      setErrMsg(msg)
    })
  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업계획서 상세</h2>
              <p>선정된 과제의 사업계획서 주요 정보를 입력하시고, 자료실 및 공고에서 해당 사업의 사업계획서 양식을 다운로드받아 함께 첨부해주시기 바랍니다. </p>
            </div>
            <div className='tab_wrap'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="일반현황" {...a11yProps(0)} />
                <Tab label="참여기업" {...a11yProps(1)} />
                <Tab label="참여인력" {...a11yProps(2)} />
                <Tab label="신청예산" {...a11yProps(3)} />
                <Tab label="첨부파일" {...a11yProps(4)} />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content">
            {/*  일반현황 */}
            <TabPanel value={value} index={0}>
              <Box className="box_guide">
                <ul>
                  <li>신청시 입력한 신청자 정보 및 과제정보, 과제책임자 정보를 확인하시고, 변경사항이 있으면 수정해주세요.</li>
                  <li>신청자정보는 마이페이지에서 수정할 수 있습니다.</li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} sx={{marginTop:'48px'}}>
                <h4 className="tbl_title">기본정보</h4>
                <CustomButton label={'회원정보 변경'} onClick={()=>navigate('/MyPage/MemberInfoMmt/MemberInfoMdf')} type={'modify'} color={'outlinedblack'} style={{marginBottom:'10px'}} />
              </Stack>
              <Box css={styles.table}>
                <div className="detail_table"> 
                  <dl>
                    <dt>제출일</dt>
                    <dd>{PlanDocInfo.usptBsnsPlanDoc?.bsnsBgnde}</dd>
                    <dt>제출상태</dt>
                    <dd className="withLink">
                      {receive.state.item.planPresentnSttusCd == 'PLPR01' && '미제출'}
                      {receive.state.item.planPresentnSttusCd == 'PLPR02' && '제출'}
                      {receive.state.item.planPresentnSttusCd == 'PLPR03' && '보완요청'}
                      {receive.state.item.planPresentnSttusCd == 'PLPR04' && '승인'}
                      {receive.state.item.planPresentnSttusCd == 'PLPR05' && '승인취소'}

                      {receive.state.item.planPresentnSttusCd == 'PLPR03' ? 
                        <ModalReasonConfirm 
                          applyId={receive.state.item.bsnsPlanDocId}
                          planPresentnSttusCd={receive.state.item.planPresentnSttusCd}
                          viewNm='BusinessPlanMgt' 
                          title='사업계획서 상세'
                          variant='text'
                          label='사유확인'
                          type='modify'
                          color='outlined'
                        /> : null
                      }
                    </dd>
                  </dl>
                  <dl>
                    <dt>사업명</dt>
                    <dd>{PlanDocInfo.usptBsnsPlanDoc?.bsnsNm}</dd>
                    <dt>사업연도</dt>
                    <dd>{PlanDocInfo.usptBsnsPlanDoc?.bsnsYear}</dd>
                  </dl>
                  <dl>
                    <dt>공고명</dt>
                    <dd>{PlanDocInfo.usptBsnsPlanDoc?.pblancNm}</dd>
                    <dt>접수번호</dt>
                    <dd>{PlanDocInfo.usptBsnsPlanDoc?.receiptNo}</dd>
                  </dl>
                </div>
              </Box>
              <h4 className="tbl_title">{/* css특성때문에 집어넣었어요. 삭제하지마세요. */}</h4>
              <h4 className="tbl_title">과제정보</h4>
              <Box css={styles.table}>
                <div className="detail_table">
                  <dl>
                    <dt>과제명 / 프로젝트명(국문) <span className='must'>*</span></dt>
                    <dd><OutlinedInput 
                      size="small" 
                      className="ipt_tp01" 
                      sx={{width:'100%'}} 
                      name="taskNmKo"
                      value={PlanDocInfo.usptBsnsPlanDoc?.taskNmKo} 
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptBsnsPlanDoc')}}/></dd>
                  </dl>
                  <dl>
                    <dt>과제명(영문)</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                      name="taskNmEn" 
                      value={PlanDocInfo.usptBsnsPlanDoc?.taskNmEn}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptBsnsPlanDoc')}}/></dd>
                  </dl>
                  <dl>
                    <dt>과제분야 <span className='must'>*</span></dt>
                    <dd>
                      <Box css={styles.inputBox}>
                        <FormControl fullWidth>
                          <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            name="applyField"
                            value={PlanDocInfo.usptBsnsPlanDoc?.applyField}
                            onChange={(event: SelectChangeEvent)=>{
                              console.log('PlanDocInfadsdasdasdaso')
                                console.log('PlanDocInfo')
                                setPlanDocInfo((pre:any)=>({
                                  ...pre,usptBsnsPlanDoc:{...pre.usptBsnsPlanDoc,applyField:event.target.value}
                                }))
                            }}
                            IconComponent = {SelectIcon}
                            MenuProps={MenuProps}
                          >
                            {
                              assign_box ? assign_box.list.map((option:any) => (
                                  <SelectItemStyle key={option.code} value={option.code||''}>
                                    {option.codeNm}
                                  </SelectItemStyle>
                                )) : []
                            }
                          </Select>
                        </FormControl>
                      </Box>
                    </dd>
                    <dt>사업기간</dt>
                    <dd>{PlanDocInfo.usptBsnsPlanDoc?.bsnsPd}</dd>
                  </dl>
                  <dl>
                    <dt>사업기간(전체)</dt>
                    <dd>
                      {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd}
                      ({PlanDocInfo.usptBsnsPlanDoc?.bsnsPdAll})
                    </dd>
                    <dt>사업기간(당해)</dt>
                    <dd>
                      {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd} 
                      ({PlanDocInfo.usptBsnsPlanDoc?.bsnsPdYw})
                    </dd>
                  </dl>
                </div>
              </Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} sx={{marginTop:'60px'}}>
                <h4 className="tbl_title">과제책임자</h4>
                <Box className='checkbox'>
                  <FormControlLabel control={<Checkbox defaultChecked onClick={()=>{console.log('신청자와 동일')}}/>} label="신청자와 동일" />
                </Box>
              </Stack>
              <Box css={styles.table}>
                <div className="detail_table"> 
                  <dl>
                    <dt>이름<span className='must'>*</span></dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name="rspnberNm"
                      value={PlanDocInfo.usptTaskRspnber?.rspnberNm}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                    <dt>생년월일</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name="encBrthdy"
                      value={PlanDocInfo.usptTaskRspnber?.encBrthdy}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                  </dl>
                  <dl>
                    <dt>휴대폰 번호<span className='must'>*</span></dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name="encMbtlnum"
                      value={PlanDocInfo.usptTaskRspnber?.encMbtlnum}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                    <dt>이메일<span className='must'>*</span></dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name="encEmail"
                      value={PlanDocInfo.usptTaskRspnber?.encEmail}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                  </dl>
                  <dl>
                    <dt>부서/학과</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name="deptNm"
                      value={PlanDocInfo.usptTaskRspnber?.deptNm}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                    <dt>직위/직급</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                      name="clsfNm"
                      value={PlanDocInfo.usptTaskRspnber?.clsfNm}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                  </dl>
                  <dl>
                    <dt>주소</dt>
                    <dd className='address'>
                      <Stack flexDirection={'row'} columnGap={1}>
                        <Stack direction='row' spacing={2} sx={{width: '100%'}}>
                          <OutlinedInput
                            size="small"
                            name='adres'
                            value={PlanDocInfo.usptTaskRspnber?.adres}
                            className="ipt_tp01"
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}
                          />
                          {/* <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={searchAdrr}/> */}
                        </Stack>
                      </Stack>
                      {/* <Stack flexDirection={'row'} columnGap={1} sx={{marginTop:'10px'}}>
                        <OutlinedInput
                          size="small"
                          name='adres'
                          value={PlanDocInfo.usptTaskRspnber?.adres} 
                          sx={{width:'38.5%'}}
                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}
                        />
                        <OutlinedInput
                          size="small"
                          sx={{width:'61.5%'}}
                          name='adresDetail' 
                          value={PlanDocInfo.usptTaskRspnber?.adres}
                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}
                        />
                      </Stack> */}
                    </dd>
                  </dl>
                  <dl>
                    <dt>유선번호</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='encTelno'
                      value={PlanDocInfo.usptTaskRspnber?.encTelno} 
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                    <dt>팩스번호</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='encFxnum'
                      value={PlanDocInfo.usptTaskRspnber?.encFxnum} 
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                  </dl>
                  <dl>
                    <dt>과학기술인 등록번호</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01 regNum" 
                      name='tlsyRegistNo'
                      value={PlanDocInfo.usptTaskRspnber?.tlsyRegistNo} 
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                  </dl>
                </div>
              </Box>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} 
                  onClick={()=>{saveTemp('01')}}/>
                <CustomButton label={'제출'} type={'listBack'} color={'primary'}
                  onClick={()=>{saveSend('01')}}/>
              </Stack>
            </TabPanel>
            {/*  참여기업 */}
            <TabPanel value={value} index={1}>
              <Box className="box_guide">
                <ul>
                  <li>공동참여기업(컨소시엄)이 있는 경우 참여기업 정보를 등록해주시기 바랍니다.</li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <Box css={styles.table}>
                <h4 className="tbl_title">참여기업 개요</h4>
                <div className="detail_table">
                  <dl>
                    <dt>참여업체 총수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='partcptnCompanyCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.partcptnCompanyCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptBsnsPlanDoc')}}
                    /></dd>
                    <dt>중소기업수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                      name='smlpzCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.smlpzCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptBsnsPlanDoc')}}
                    /></dd>
                  </dl>
                  <dl>
                    <dt>중견기업수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='mspzCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.mspzCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptBsnsPlanDoc')}}
                    /></dd>
                    <dt>기타</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='etcCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.etcCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptBsnsPlanDoc')}}
                    /></dd>
                  </dl>
                </div>
              </Box>
              <h4 className="tbl_title">{/* css특성때문에 집어넣었어요. 삭제하지마세요. */}</h4>
              <div className="mo">
                <FormGroup>
                  <FormControlLabel sx={{ml: 0, mb: 1}}
                    label={'전체 선택'}
                    control={
                      <CheckboxStyle
                        // checked={checkAll}
                        // onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        //   let update = [...selected];
                        //   if(checkAll===false){
                        //     for(let i =0; i<selected.length; i++){
                        //       update[i] = true;
                        //     }
                        //   }else if(checkAll===true){
                        //     for(let i =0; i<selected.length; i++){
                        //       update[i] = false;
                        //     }
                        //   }
                        //   setSelected(update);
                        //   setCheckAll(!checkAll);
                        // }}
                      />
                    }
                  />
                </FormGroup>
                <table className="tableDefault type5">
                  <colgroup>
                    <col style={{width:'9%'}}/>
                    <col style={{width:'27%'}}/>
                    <col style={{width:'64%'}}/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td rowSpan={7} className='chkbox'><CheckboxStyle /></td>
                      <th>업체명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>책임자명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>직위/직급<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>휴대전화<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>이메일<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>과학<br className='mo' />기술인<br className='mo' />등록번호</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <td rowSpan={7} className='chkbox'><Box className="checkbox"><Checkbox
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></Box></td>
                      <th>업체명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>책임자명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>직위/<br className='mo' />직급<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>휴대전화<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>이메일<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                    <tr>
                      <th>과학<br className='mo' />기술인<br className='mo' />등록번호</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                      /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <UsptTaskPartcptsTodoList
                dataList={PlanDocInfo.usptTaskPrtcmpny}
                type="usptTaskPrtcmpny"
                onChangeBox={(s: any[]) => {
                  if (s.length > 0){
                    let arrbox = [...s]
                    setPlanDocInfo((pre)=>({...pre,usptTaskPrtcmpny:arrbox}))
                  } 
                }}
                // children={<TableTest />}
              />
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} />
              </Stack>
            </TabPanel>
            
            {/*  참여인력 */}
            <TabPanel value={value} index={2}>
              <Box className="box_guide">
                <ul>
                  <li>과제책임자를 제외한 참여인원의 정보를 입력해주시기 바랍니다. </li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <h4 className="tbl_title">{/* css특성때문에 집어넣었어요. 삭제하지마세요. */}</h4>
                <UsptTaskPartcptsTodoList
                  dataList={PlanDocInfo.usptTaskPartcpts}
                  type='usptTaskPartcpts'
                  onChangeBox2={(s: any[]) => {
                    if (s.length > 0){
                      let arrbox = [...s]
                      setPlanDocInfo((pre)=>({...pre,usptTaskPartcpts:arrbox}))
                    } 
                  }}
                  // children={<TableTest />}
                />
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
              <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={()=>{saveTemp('01')}} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={()=>{saveSend('01')}}/>
              </Stack>
            </TabPanel>

            {/* 신청예산 */}
            <TabPanel value={value} index={3}>
              <Box className="box_guide">
                <ul>
                  <li>사업비 신청금액을 입력 해주세요.</li>
                  <li>심의를 통해 조정된 사업비가 있는 경우 조정된 사업비로 입력해 주셔야 합니다.</li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <Stack css={styles.title_set}>
                <h4 className="tbl_title">신청예산 <span className='unit'>(단위:천원)</span></h4>
                <div className='tbl_desc'>• 각 사업년도를 클릭하여 비목별 사업비 구성정보를 작성해주세요.</div>
              </Stack>
              <Box css={styles.table}>
                <div className="detail_table type2">
                  <dl>
                    <dt>총사업비</dt>
                    <dd><OutlinedInput size="small" value={PlanDocInfo.usptTaskReqstWct[0].tot_bsns_pd} disabled={true} className="ipt_tp01 tar" style={{width:'auto'}} /></dd>
                  </dl>
                  { PlanDocInfo.usptTaskReqstWct.length > 1 ? 
                      <dl className='horz'>
                        <dt>사업비</dt>
                        <dd>
                          <div className='tableDefault_scroll'>
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
                              {
                                  PlanDocInfo.usptTaskReqstWct.length > 0 ? PlanDocInfo.usptTaskReqstWct.map((item:TaskReqstWct,idx:number)=>{
                                    return (
                                      <tr>
                                        <td>
                                          <span style={{marginRight:'10px'}}>{item.bsnsYear}</span>
                                          <ModalReasonConfirm 
                                            applyId={'item.taskReqstWctId'} 
                                            viewNm='BusinessPlanMgtDetail' 
                                            title='사업계획서 상세'
                                            variant='outlined'
                                            label='등록'
                                            type='modify'
                                            color='outlined'
                                          />
                                        </td>
                                        <td><OutlinedInput size="small" type="number" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='sportBudget' 
                                          value={item.sportBudget}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmCash' 
                                          value={item.alotmCash}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmActhng' 
                                          value={item.alotmActhng}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmSum' 
                                          value={item.alotmSum}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmSumTot' 
                                          value={item.alotmSumTot}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                    </tr>
                                    )
                                  }) : null
                                }
                              </tbody>
                            </table>
                          </div>
                        </dd>
                      </dl> : 
                      <dl className='horz'>
                        <dt>사업비</dt>
                        <dd>
                          <div className='tableDefault_scroll'>
                            <table className="tableDefault type5">
                              <colgroup>
                                <col style={{width:'20%'}} />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th rowSpan={2}>사업연도</th>
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
                                {
                                  PlanDocInfo.usptTaskReqstWct.length > 0 ? PlanDocInfo.usptTaskReqstWct.map((item:TaskReqstWct,idx:number)=>{
                                    return (
                                      <tr>
                                        <td>
                                          <span style={{marginRight:'10px'}}>{item.bsnsYear}</span>
                                          <ModalReasonConfirm 
                                            applyId='item.taskReqstWctId' 
                                            viewNm='BusinessPlanMgtDetail' 
                                            title='사업계획서 상세'
                                            variant='outlined'
                                            label='등록'
                                            type='modify'
                                            color='outlined'
                                          />
                                        </td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='sportBudget' 
                                          value={inputPriceFormat(item.sportBudget)}
                                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        />
                                        </td>

                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmCash' 
                                          value={inputPriceFormat(item.alotmCash)}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmActhng' 
                                          value={inputPriceFormat(item.alotmActhng)}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmSum' 
                                          value={inputPriceFormat(item.alotmSum)}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                        <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                                          name='alotmSumTot' 
                                          value={inputPriceFormat(item.alotmSumTot)}
                                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeTaskReqstWct(e,item,idx)}}
                                        /></td>
                                    </tr>
                                    )
                                  }) : null
                                }
                                <tr className='total'>
                                  <td>합계</td>
                                  <td className='tar'>{inputPriceFormat(sumVal.sum1)}</td>
                                  <td className='tar'>{inputPriceFormat(sumVal.sum2)}</td>
                                  <td className='tar'>{inputPriceFormat(sumVal.sum3)}</td>
                                  <td className='tar'>{inputPriceFormat(sumVal.sum4)}</td>
                                  <td className='tar'>{inputPriceFormat(sumVal.sum5)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </dd>
                      </dl>
                  }
                  <dl>
                    <dt>비목별 사업비</dt>
                    <dd>
                      <ModalReasonConfirm 
                        applyId='item.taskReqstWctId'
                        viewNm='BusinessPlanMgtDetail' 
                        title='사업계획서 상세'
                        variant='outlined'
                        label='등록'
                        type='modify'
                        color='outlined'
                      />
                    </dd>
                  </dl>
                </div>
              </Box>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
              <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={()=>{saveTemp('01')}} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={()=>{saveSend('01')}}/>
              </Stack>
            </TabPanel>
            {/*  파일첨부 */}
            <TabPanel value={value} index={4}>
              <Box className="box_guide">
                <ul>
                  <li>공고 및 자료실에 업로드된 해당 사업의 사업계획서 양식을 다운로드 받아 첨부해주시기 바랍니다.</li>
                  <li>사업계획서 내용과 시스템에 입력한 정보는 모두 동일해야합니다.</li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <h4 className='tbl_title'>파일첨부</h4>
              <Box css={styles.fileupload}>
                <FileUpload1
                  files={files}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                />
              </Box>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={()=>{saveTemp('01')}} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={()=>{saveSend('01')}}/>
              </Stack>
            </TabPanel>
          </div>
        </div>
      </Box>
      <ModalComponents open={openTab} type={'confirm'} content={'변경된 정보를 저장하시겠습니까?'} 
        onConfirm={() => {
          setOpenTab(false)
          saveTemp('01')
         }} 
        onClose={() => {
          setOpenTab(false)
          setValue(tabNum)
        }}>
      </ModalComponents>
      <ModalComponents open={openErr} type={'normal'} content={errMsg} 
        onConfirm={() => { setOpenErr(false) }} 
        onClose={() => { setOpenErr(false)}}>
      </ModalComponents>
    </div>
  );
}

export default BusinessPlanMgtDetail;

export const uncomma2 = (str:any) => {
  str = String(str);
  return str.replace(/[^\d]+/g, "");
};

export const inputPriceFormat = (str:any) => {
  console.log("s", str);
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
      hidden={value !== index}
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
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MenuProps = {
  PaperProps: {
      style: {
          width: 'auto',
          marginTop: '4px',
          padding: '4px',
          boxShadow: 'none',
          border: '1px solid #ccc',
          borderRadius: '5px',
      },
  },
};

const SelectItemStyle = styled(MenuItem)`
  font-size: 16px;
  letter-spacing: -0.64px;
  font-family: Noto Sans CJK KR;
  padding: 0 12px;
  min-height: 40px !important;
  border-radius: 3px;
  margin-bottom: 4px;
  height:44px;
  line-height: 2.2;
  &:first-of-type{
      margin-top: -8px;
  }
  &:last-of-type{
      margin-bottom: -8px;
  }
  &.Mui-selected{
      background-color: #f5f5f5;
      &:hover,  &:focus-visible{
          background-color: #f5f5f5;
      }
  }
`;

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
  border: 1px solid #ccc;
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
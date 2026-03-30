import { useState,useEffect } from 'react';
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import  Box  from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CustomButton } from '~/components/ButtonComponents';
import { ModalReasonConfirm } from '../../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { fetchGetCommCode } from '~/fetches';
import { useQuery } from 'react-query';
import { fetchBsnsPlanDocInfo, fetchModifyPlan, fetchModifyPlanTmp } from '~/fetches/biz/fetchContractMgt';
import { BsnsPlanDocInfo, BsnsPlanDocInfoData } from '~/models/ModelBizPlanMgt';
import { ModalComponents } from '~/components/SharedModalComponents';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import {TrashIcon, PlusIcon} from '~/components/IconComponents';
import { CheckboxStyle } from '~/components/TableComponents';
import { UsptTaskPartcptsTodoList } from './UsptTaskPartcptsTodoList';
import { FileUpload } from '~/pages/EventNews/FileUpload';
import styled from '@emotion/styled';

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
  const [cmpnyTypebox, setCmpnyTypebox] = useState<any>();
  const [PlanDocInfo, setPlanDocInfo] = useState<BsnsPlanDocInfo>(BsnsPlanDocInfoData);
  const openPostcodePopup = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const [files, setFiles]:any= useState([]);


  // 공통 코드 조회
  const {data:assign_box} = useQuery("TASK_TYPE", async () => await fetchGetCommCode("TASK_TYPE"));

  // 사업계획서상세 조회
  const { data:list=[],refetch,isError,error } = useQuery("fetchBsnsPlanDocInfo", async () => 
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

  // Daum 우편번호 서비스
  const DaumPost = (data:any) => {
    setPlanDocInfo((pre:any)=>({
      ...pre,usptTaskRspnber:{...pre.usptTaskRspnber,adres:data.address}
    }))
    // setCmpnyTypebox((pre:any)=>({...pre,zip:data.zonecode,adres:data.address}))
  };
  // 주소 찾기 호출
  const searchAdrr = () => {
    openPostcodePopup({ onComplete: DaumPost });
  };

  //소속 및 대학정보 입력부분
  const handelChangeInfo = (e:React.ChangeEvent<HTMLInputElement>,type:string) => {
    const { name, value } = e.currentTarget;
    setPlanDocInfo((pre:any)=>({
      ...pre,[type]:{...pre[type],[name]:value}
    }))
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    setCmpnyTypebox((state:any) => ({ ...state, [event.target.name as string]: event.target.value as string }));
  };
  // tab event
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if(!!errMsg){
    //   setOpenErr(true)
    // } else {
    //   setOpenTab(true)
    //   setTabNum(newValue)
    // }
    setOpenTab(true)
    setTabNum(newValue)
  };

  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };

  useEffect(() => {
    setChangeYn(true)
  }, [PlanDocInfo]);

  // 임시 저장
  const saveTemp = (step:string) => {
    const formData = new FormData();
    const json = JSON.stringify(PlanDocInfo);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('info',blob)
    fetchModifyPlanTmp(formData,PlanDocInfo.usptBsnsPlanDoc.planPresentnSttusCd = 'PLPR02').then((res)=>{
      setChangeYn(false)
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
                          applyId='abc' 
                          viewNm='BusinessPlanMgt' 
                          title='사업계획서 상세'
                          variant='text'
                          label='사유확인'
                          type='modify'
                          color='outlined'
                        /> : null
                      }
                      {/* 임시 추후 제거*/}
                      <ModalReasonConfirm 
                        applyId='abc' 
                        viewNm='BusinessPlanMgt' 
                        title='사업계획서 상세'
                        variant='text'
                        label='사유확인'
                        type='modify'
                        color='outlined'
                      />
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
                          >
                            {
                              assign_box ? assign_box.list.map((option:any) => (
                                  <MenuItem key={option.code} value={option.code||''}>
                                    {option.codeNm}
                                  </MenuItem>
                                )) : []
                            }
                          </Select>
                        </FormControl>
                      </Box>
                    </dd>
                    <dt>사업기간</dt>
                    <dd>협약 체결일 ~ {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd}</dd>
                  </dl>
                  <dl>
                    <dt>사업기간(전체)</dt>
                    <dd>
                      {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd} ~ {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd} 
                      ({PlanDocInfo.usptBsnsPlanDoc?.bsnsPdAll}개월)
                    </dd>
                    <dt>사업기간(당해)</dt>
                    <dd>
                      {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd} ~ {PlanDocInfo.usptBsnsPlanDoc?.bsnsPd} 
                      ({PlanDocInfo.usptBsnsPlanDoc?.bsnsPdYw}월)
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
                    <dt>이름 <span className='must'>*</span></dt>
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
                    <dt>휴대폰 번호 <span className='must'>*</span></dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name="encMbtlnum"
                      value={PlanDocInfo.usptTaskRspnber?.encMbtlnum}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}/></dd>
                    <dt>이메일 <span className='must'>*</span></dt>
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
                            name='zip'
                            value={PlanDocInfo.usptTaskRspnber?.adres}
                            className="ipt_tp01"
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'usptTaskRspnber')}}
                          />
                          <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={searchAdrr}/>
                        </Stack>
                      </Stack>
                      <Stack flexDirection={'row'} columnGap={1} sx={{marginTop:'10px'}}>
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
                      </Stack>
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
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></dd>
                    <dt>중소기업수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                      name='smlpzCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.smlpzCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></dd>
                  </dl>
                  <dl>
                    <dt>중견기업수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='mspzCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.mspzCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></dd>
                    <dt>기타</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='etcCnt' 
                      value={PlanDocInfo.usptBsnsPlanDoc.etcCnt}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></dd>
                  </dl>
                </div>
              </Box>
              <h4 className="tbl_title">{/* css특성때문에 집어넣었어요. 삭제하지마세요. */}</h4>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="tbl_title">참여기업</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete">
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Stack>
              <div className="mo">
                <FormGroup>
                  <FormControlLabel 
                    label={'전체 선택'}
                    control={
                      <Checkbox
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
                      <td rowSpan={7} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
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
                      <th>직위/<br className='mo' />직급 <span className="must">*</span></th>
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
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col style={{width:'16%'}}/>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'12%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'14%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <Checkbox
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
                    </th>
                    <th>업체명<span className='must'>*</span></th>
                    <th>책임자명<span className='must'>*</span></th>
                    <th>직위/직급<span className='must'>*</span></th>
                    <th>연락처</th>
                    <th>휴대전화<span className='must'>*</span></th>
                    <th>이메일<span className='must'>*</span></th>
                    <th>국가연구자번호</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                    /></td>
                  </tr>
                </tbody>
              </table>
              {/* <UsptTaskPartcptsTodoList  
                dataList={["1","2","3"]}
                onChangeBox={(s: any[]) => {
                  if (s.length > 0) console.log(s);
                }}
                // children={<TableTest />}
              /> */}
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} />
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
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></dd>
                    <dt>중소기업수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></dd>
                  </dl>
                  <dl>
                    <dt>중견기업수</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></dd>
                    <dt>기타</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></dd>
                  </dl>
                </div>
              </Box>
              <h4 className="tbl_title">{/* css특성때문에 집어넣었어요. 삭제하지마세요. */}</h4>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="tbl_title">참여기업</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete">
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Stack>
              <div className="mo">
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
                </FormGroup>
                <table className="tableDefault type5">
                  <colgroup>
                    <col style={{width:'9%'}}/>
                    <col style={{width:'27%'}}/>
                    <col style={{width:'64%'}}/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td rowSpan={7} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>업체명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>책임자명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>직위/직급<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>휴대전화<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>이메일<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>과학<br className='mo' />기술인<br className='mo' />등록번호</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <td rowSpan={7} className='chkbox'><Box className="checkbox"><Checkbox
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></Box></td>
                      <th>업체명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>책임자명<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>직위/<br className='mo' />직급 <span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>휴대전화<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>이메일<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>과학<br className='mo' />기술인<br className='mo' />등록번호</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                        name='adresDetail' 
                        value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                        // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col style={{width:'16%'}}/>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'12%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'15%'}}/>
                  <col style={{width:'14%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </th>
                    <th>업체명<span className='must'>*</span></th>
                    <th>책임자명<span className='must'>*</span></th>
                    <th>직위/직급<span className='must'>*</span></th>
                    <th>연락처</th>
                    <th>휴대전화<span className='must'>*</span></th>
                    <th>이메일<span className='must'>*</span></th>
                    {/* <th>국가연구자번호</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    {/* <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td> */}
                  </tr>
                  <tr>
                    <td>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    {/* <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td> */}
                  </tr>
                </tbody>
              </table>
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
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="tbl_title">참여인력</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete">
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Stack>
              <div className="mo">
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
                </FormGroup>
                <table className="tableDefault type5">
                <colgroup>
                    <col style={{width:'9%'}}/>
                    <col style={{width:'27%'}}/>
                    <col style={{width:'64%'}}/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td rowSpan={5} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>이름<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>담당분야</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>휴대폰번호</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>생년월일</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>참여율(%)</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <td rowSpan={5} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>이름<span className="must">*</span></th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>담당분야</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>휴대폰번호</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>생년월일</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                    <tr>
                      <th>참여율(%)</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                      /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col style={{width:'19%'}}/>
                  <col style={{width:'19%'}}/>
                  <col style={{width:'19%'}}/>
                  <col style={{width:'19%'}}/>
                  <col style={{width:'18%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </th>
                    <th>이름</th>
                    <th>담당분야</th>
                    <th>휴대폰번호</th>
                    <th>생년월일</th>
                    <th>참여율(%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                  </tr>
                  <tr>
                    <td>
                      <Box className="checkbox">
                        <Checkbox />
                      </Box>
                    </td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                    /></td>
                  </tr>
                </tbody>
              </table>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} />
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
                    <dd><OutlinedInput size="small" className="ipt_tp01 tar" style={{width:'auto'}} /></dd>
                  </dl>
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
                            <tr>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </dd>
                  </dl>
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
                            <tr>
                              <td>
                                <span style={{marginRight:'10px'}}>2021년</span>
                                <ModalReasonConfirm 
                                  applyId='abc' 
                                  viewNm='BusinessPlanMgtDetail' 
                                  title='사업계획서 상세'
                                  variant='outlined'
                                  label='등록'
                                  type='modify'
                                  color='outlined'
                                />
                              </td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{marginRight:'10px'}}>2021년</span>
                                <ModalReasonConfirm 
                                  applyId='abc' 
                                  viewNm='BusinessPlanMgtDetail' 
                                  title='사업계획서 상세'
                                  variant='outlined'
                                  label='등록'
                                  type='modify'
                                  color='outlined'
                                />
                              </td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                              <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} 
                      name='adresDetail' 
                      value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                      // onChange={handelChangeInfo}
                              /></td>
                            </tr>
                            <tr className='total'>
                              <td>합계</td>
                              <td className='tar'>200,000</td>
                              <td className='tar'>200,000</td>
                              <td className='tar'>200,000</td>
                              <td className='tar'>200,000</td>
                              <td className='tar'>200,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </dd>
                  </dl>
                  <dl>
                    <dt>비목별 사업비</dt>
                    <dd>
                      <ModalReasonConfirm 
                        applyId='abc' 
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
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} />
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
                <FileUpload
                  files={files}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                />
              </Box>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} />
                <CustomButton label={'제출'} type={'listBack'} color={'primary'} />
              </Stack>
            </TabPanel>
          </div>
        </div>
      </Box>
      <ModalComponents open={openTab} type={'confirm'} content={'변경된 정보를 저장하시겠습니까?'} 
        onConfirm={() => {
          setOpenTab(false)
          setValue(tabNum)
          // saveTemp('01')
         }} 
        onClose={() => {setOpenTab(false)}}>
      </ModalComponents>
      <ModalComponents open={openErr} type={'normal'} content={errMsg} 
        onConfirm={() => { setOpenErr(false) }} 
        onClose={() => { setOpenErr(false)}}>
      </ModalComponents>
    </div>
  );
}

export default BusinessPlanMgtDetail;

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

import React, { useEffect } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack,Step, Stepper,Button, MenuItem, StepLabel, FormGroup,FormControl, FormControlLabel, Checkbox, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomRadioButtons} from '~/components/ButtonComponents';
import { applyTask, business_request, initApplyTask, initTaskPartcptsList, taskPartcptsList, TermsResponse } from '~/models/Model';
import { FileUpload, FileUploadbiz } from "../../EventNews/FileUpload";
import IconButton from '@mui/material/IconButton';
import {TrashIcon} from '~/components/IconComponents';
import {PlusIcon} from '~/components/IconComponents';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { fetchBusinessApplyData, fetchBusinessApplyDataSave, fetchBusinessApplyDataSubmit } from "~/fetches/fetchBusiness";
import { ConfirmInfoTable } from "./View/ConfirmInfoTable";
import { useQueries } from "react-query";
import fetchDownload from "~/fetches/fetchDownload";
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import { intialErrorConfirmInfo } from "~/models/ModelBiz";
import { fetchGetCommCode, fetchTermsGet, fetchTermsImsi } from "~/fetches";
import { CustomCheckBoxsBiz } from "./View/CustomCheckBoxsBiz";
import { ModalComponents } from '~/components/ModalComponents';
 // 사업신청/menu-PMS010100 -> 사업신청
const BusinessAppConfirmInfo = () => {
  const {addModal} = useGlobalModalStore();
  const receive:any = useLocation();
  const [files, setFiles]:any= useState([]);
  const [validationBox, setValidationBox] = useState<string[]>([]);
  //과제정보
  const [applyData, setApplyData]:any = useState();
  //참여인력
  const [taskPartcptsList, setTaskPartcptsList]:any = useState<taskPartcptsList[]>([initTaskPartcptsList]);
  //과제 책임자, 과제정보
  const [applyTask, setApplyTask] = useState<applyTask>(initApplyTask);
  //약관내용
  const [termsBox, setTermsBox] = useState<TermsResponse[]>([]);

  // 입력값오류
  const [errorValues, setErrorValues] = useState(intialErrorConfirmInfo);
  const [allCheck, setAllCheck] = useState(false);
  const [allCheck1,setAllCheck1] = useState(false);
  const [select, setSelect]:any = useState([false]);
  const [isValid, setIsValid] = useState(false);
  
  const navigate = useNavigate();
  //체크 값 변경
  const changeCheck = (i:number,k:boolean) => {
    let update = [...select];
    update[i] = k;
    setSelect(update); 
    if(k===false){
      setAllCheck(false)
    }
    let b = 0;
    for(let i =0; i<select.length; i++){
      if(update[i]===true){
        b++;
      }
    }
    if(b===select.length){
      setAllCheck(true)   
    }
  }
  // 전체 체크
  const changeAllCheck = () => {
    let update = [...select];
    if(allCheck===false){
      for(let i =0; i<select.length; i++){
        update[i] = true;
      }
    }else if(allCheck===true){
      for(let i =0; i<select.length; i++){
        update[i] = false;
      }
    }
    setSelect(update); 
    setAllCheck(!allCheck)
  }
  const updateItem = (item:taskPartcptsList,i:number) => {
    const updated = [...taskPartcptsList];
    updated[i] = item;
    setTaskPartcptsList(updated);
  };
  const deleteItem = () =>{
    if(allCheck===true){
      setTaskPartcptsList([initTaskPartcptsList])
      setAllCheck(false)
      setSelect([false])
    }else{
      const updated = [...taskPartcptsList];
      const updated1 = [...select];
      for(let i=taskPartcptsList.length-1; i>-1; i--){
        if(select[i]===true){
          updated.splice(i,1);
          setTaskPartcptsList(updated);
          updated1.splice(i,1);
          setSelect(updated1);
        }
      }
    }
    if(taskPartcptsList.length===0){
      addItem();
    }
  }
  // 추가
  const addItem = () =>{
    const updated = [...taskPartcptsList];
    const updated1 = [...select]
    updated.push(initTaskPartcptsList);
    updated1.push(false);
    setTaskPartcptsList(updated);
    setSelect(updated1)
    setAllCheck(false);
  }
  
  const getList = () => {
    fetchBusinessApplyData(receive.state.pblancId).then((res:any)=>{
      setApplyData(res)
      setApplyTask((state:any)=>({...state,taskTypeCd : res.taskTypeCd, applyRealmId : res.applyRealmList[0]?.applyRealmId}))
    }).catch((e)=>{
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }

  const validate = () => {
    let check = true;
    let update = {...errorValues};

    if(applyTask.taskNmKo===""){
      update = {...update,errorTaskNmKo:true , helperTaskNmKo:"과제명/프로젝트명(국문)을 입력하세요."}
      check = false;
    }else{
      update = {...update,errorTaskNmKo:false , helperTaskNmKo:""}
    }
    if(applyTask.rspnberNm===""){
      update = {...update,errorRspnberNm:true , helperRspnberNm:"이름을 입력하세요."}
      check = false;
    }else{
      update = {...update,errorRspnberNm:false , helperRspnberNm:""}
    }
    //학부 확인
    if (applyTask.mbtlnum===""){
      check = false;
      update = {...update,errorMbtlnum:true, helperMbtlnum:"휴대폰 번호를 입력하세요."}
    }else{
      update = {...update,errorMbtlnum:false, helperMbtlnum:""}
    }
    
    //학부 확인
    if (applyTask.email===""){
      check = false;
      update = {...update,errorEmail:true, helperEmail:"이메일을 입력하세요."}
    }else{
      update = {...update,errorEmail:false, helperEmail:""}
    }
    setErrorValues(update);
    
    return check;

  }
  
  // 공통코드 조회  참고:기업 회원 만 조회 가능 
  const userQueries = useQueries(
    [
      'HOPE_DTY',     // 희망직무코드
      'TASK_TYPE',   // 과제유형코드
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn: () => fetchGetCommCode(TermsType),
      }
    })
    )
  
  useEffect(() => {
    getSearchCategory();
    getList();
  },[])

  const handleDelete = (e:React.ChangeEvent<HTMLInputElement>,i:number) => {
    const update = [...files]
    update[i] = []
    setFiles(update);
  };
  
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>,idx:number) =>{
    console.log(1)
    let upfile:any = e.target.files;
    const update:any = [...files]
    update[idx] = upfile
    setFiles(update)
  }

  const ChangeTaskTypeCd = (selected:string) =>{
    if(selected==="지정과제"){
      setApplyData({...applyData,taskTypeCd:"APPN"});
      setApplyTask((state:any)=>({...state,taskTypeCd : "APPN"}))
    }else if(selected==="자유과제"){
      setApplyData({...applyData,taskTypeCd:"FREE"});
      setApplyTask((state:any)=>({...state,taskTypeCd : "FREE"}))
    }
  };

  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setApplyTask((state:any) => ({ ...state, [name]: value }));
  }

  const handleChange = (event: SelectChangeEvent) => {
    setApplyTask((state:any)=>({...state,[event.target.name as string] : event.target.value as string }))
  };
  

  const download = async (formatAttachmentId: any) =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${!!receive.state ? receive.state.pblancId : ''}/atchmnfl/${formatAttachmentId}`)
    .then()
    .catch((e)=>{
      let status = e.response.status;
    
        
      if(status === 400){
        addModal({
          type:'normal',
          open: true,
          title:status,
          content: '파일이 없습니다.'
        })
      }
      });
    }    
    const getSearchCategory = async () => {
      const returnedTarget:TermsResponse[] = [];
      let url = 'PRVC_CLCT_AGRE_BIZ';
      //기업/대학회원
      let box = await Promise.all([fetchTermsGet(url)])
      // eslint-disable-next-line array-callback-return
      box[0].list.map((item:any)=>{
            returnedTarget.push(item)
          })
  
      setTermsBox(returnedTarget)
    }; // todo...
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");
    const send = (event:any,i:number) =>{
      if(!validate()){
        let boxvalue = termsBox.filter((m)=>{ return m.required == true})
        let boxvalue2 = validationBox.filter((m)=>{ return m.includes("false")})
        if(((validationBox.length) - (boxvalue2.length))< boxvalue.length){
          setIsValid(true)
          return;
        }
      };
      try{
        const boxvalue3:any = receive.state.validationBox;
        termsBox.map((item,key)=>{
          let isItem = validationBox.filter((m)=>{ return m.includes(key+"")});
          if(isItem.length>0){
            boxvalue3.push({beginDay:item.beginDay,required:item.required,termsType:item.termsType,consentYn:true})
          }
        })
        //약관 동의 후 임시 저장
        fetchTermsImsi(boxvalue3).then((res)=>{
          // return res.key;
          const form = new FormData();
          
          let uploadFileList = [];
          for(let i=0; i<files.length; i++){
            uploadFileList.push({atchmnflSetupId:applyData.atchmnflList[i].atchmnflSetupId, fileOrder:i});
            form.append("fileList",files[i])
          }

          let k = 0;
          for(let i=0; i<taskPartcptsList.length; i++){
            // eslint-disable-next-line no-loop-func
            Object.values(taskPartcptsList[i]).map((item:any)=>{
              if(item!==""){
                k++;
              }
          })
          }
          let partcptsList = taskPartcptsList;
          if(k===0){
            partcptsList = [];
          }
          let params = {
            sessionId : res.key,
            chkList : receive.state.chkList,
            applyTask : applyTask,
            applcntEnt : receive.state.cmpnyTypebox,
            taskPartcptsList : partcptsList,
            uploadFileList : uploadFileList
          };

          addModal({
            type:'normal',
            open: true,
            content: '제출 도었습니다.',
          })


          form.append("info", new Blob([JSON.stringify(params)], {type: 'application/json'}));
          // if(i===0){
          //   fetchBusinessApplyDataSave(form,receive.state.pblancId).then(()=>{
          //     addModal({
          //       type:'normal',
          //       open: true,
          //       content: '임시저장 도었습니다.',
          //       onConfirm:()=> {
          //         navigate("../Notice/Notice")
                    
          //       },
          //     })
          //   }).catch((e)=>{
          //     let {data:{message,status}} = e.response;
          //     // setOpen(true);
          //     // setError(e.response.data.message)
          //     addModal({
          //       type:'normal',
          //       open: true,
          //       content: message
          //     })
          //   });
          // }else if(i===1){
          //   fetchBusinessApplyDataSubmit(form,receive.state.pblancId).then(()=>{
          //     addModal({
          //       type:'normal',
          //       open: true,
          //       content: '제출 도었습니다',
          //       onConfirm:()=> {
          //         navigate("../Notice/Notice")
          //       },
          //     })
          //   }).catch((e)=>{
          //     let {data:{message,status}} = e.response;
          //     // setOpen(true);
          //     // setError(e.response.data.message)
          //     addModal({
          //       type:'normal',
          //       open: true,
          //       content: message
          //     })
          //   });
          // }
        })
      } catch (e:any){
        if(!!e.response && e.response.data) return alert(e.response.data.message);
      }
    }
  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업 신청</h2>
              {/* <p>입주기업은 물론 누구나 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p> */}
              <Stepper activeStep={2} alternativeLabel css={styles.step02}>
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
            <h1 className="sub_title_top">{receive?.state.title}</h1>
            <Box className="box_guide">
              <ul>
                <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                <li>기업정보를 입력해 주세요. 상세하게 입력해 주실수록 접수 시 도움이 됩니다.</li>
                <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
              </ul>
            </Box>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">과제정보</h4>
            </Stack>
            <Box css={styles.table}>
              <div className="detail_table"> 
                { !!applyData ? 
                  applyData.taskTypeCd == 'All' ?
                    <dl>
                    {/* 과제유형이 ALL일때만 나옴 선택할수있게 */}
                    <dt>과제유형</dt>
                    <dd><CustomRadioButtons 
                      row data={[{codeNm:'자유과제',code:"APPN"},{codeNm:'지정과제',code:"FREE"}]}
                      defaultData={applyData?applyData.taskTypeCd:"APPN"}
                        onClick={(selected)=>{
                          ChangeTaskTypeCd(selected);
                        }} 
                    />
                    </dd>
                  </dl>
                  : '' : ''
                }
                <dl>
                  <dt>과제명/<br className="mo" />프로젝트명<br className="mo" />(국문) <span className="must">*</span></dt>
                  <dd><TextField
                  variant='outlined'
                  name="taskNmKo"
                  value={applyTask?.taskNmKo}
                  onChange={handelChangeInput}
                  fullWidth 
                  error={errorValues.errorTaskNmKo}
                  helperText={errorValues.helperTaskNmKo}
                  /></dd>
                </dl>
                <dl>
                  <dt>과제명(영문)</dt>
                  <dd><TextField
                  variant='outlined'
                  name="taskNmEn"
                  value={applyTask?.taskNmEn}
                  fullWidth
                  onChange={handelChangeInput}
                  /></dd>
                </dl>
                {applyData?
                <>
                <dl>
                  <dt>과제분야</dt>
                  <dd>
                    <FormControl fullWidth>
                      <Select 
                      labelId="" 
                      id="applyRealmList" 
                      name="applyRealmList"
                      sx={{ height: '48px'}}
                      value ={applyTask.applyRealmId}
                      onChange = {handleChange}
                      >
                        {(applyData.applyRealmList !==undefined)?    
                        applyData.applyRealmList.map((item:any)=>(                  
                          // value에 applyRealmNm로 수정
                          <MenuItem key={item.applyRealmId} value={item.applyRealmId}>{item.applyRealmId}</MenuItem>
                        ))
                        :null
                        }
                      </Select>
                    </FormControl>
                  </dd>
                  <dt>사업기간</dt>
                  <dd>{applyData.bsnsPd}</dd>
                </dl>
                <dl>
                  <dt>사업기간<br className="mo" />(전체)</dt>
                  <dd>{applyData.bsnsPdAll}</dd>
                  <dt>사업기간<br className="mo" />(당해)</dt>
                  <dd>{applyData.bsnsPdYw}</dd>
                </dl>
                </>
                :null}
              </div>
            </Box>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">과제책임자</h4>
            </Stack>
            <Box css={styles.table}>
              <div className="detail_table type2"> 
                <dl>
                  <dt>이름<span className="must">*</span></dt>
                  <dd><TextField
                  variant='outlined'
                  name="rspnberNm"
                  value={applyTask?.rspnberNm}
                  onChange={handelChangeInput}
                  fullWidth
                  error={errorValues.errorRspnberNm}
                  helperText={errorValues.helperRspnberNm}
                  />
                  </dd>
                  <dt>생년월일</dt>
                  <dd><TextField        variant='outlined'name="brthdy"
                  value={applyTask?.brthdy}
                  onChange={handelChangeInput}
                  fullWidth /></dd>
                </dl>
                <dl>
                  <dt>휴대폰번호<span className="must">*</span></dt>
                  <dd><TextField        variant='outlined'name="mbtlnum"
                  value={applyTask?.mbtlnum}
                  onChange={handelChangeInput}
                  fullWidth 
                  error={errorValues.errorMbtlnum}
                  helperText={errorValues.helperMbtlnum}
                  />
                  </dd>
                  <dt>이메일<span className="must">*</span></dt>
                  <dd><TextField        variant='outlined'name="email"
                  value={applyTask?.email}
                  onChange={handelChangeInput}                  
                  fullWidth 
                  error={errorValues.errorEmail}
                  helperText={errorValues.helperEmail}
                  />
                  </dd>
                </dl>
                <dl>
                  <dt>부서/학과</dt>
                  <dd><TextField        variant='outlined'name="deptNm"
                  value={applyTask?.deptNm}
                  onChange={handelChangeInput}  
                  fullWidth /></dd>
                  <dt>직위/직급</dt>
                  <dd><TextField        variant='outlined'name="ofcpsNm"
                  value={applyTask?.ofcpsNm}
                  onChange={handelChangeInput}  
                  fullWidth /></dd>
                </dl>
                <dl>
                  <dt>주소</dt>
                  <dd><TextField        variant='outlined'name="adres"
                  value={applyTask?.adres}
                  onChange={handelChangeInput}  
                  fullWidth /></dd>
                  <dt>유선번호</dt>
                  <dd><TextField        variant='outlined'name="telno"
                  value={applyTask?.telno}
                  onChange={handelChangeInput}  
                  fullWidth /></dd>
                </dl>
                <dl>
                  <dt>팩스번호</dt>
                  <dd><TextField        variant='outlined'name="fxnum"
                  value={applyTask?.fxnum}
                  onChange={handelChangeInput}  
                  fullWidth /></dd>
                  <dt>국가연구자번호</dt>
                  <dd><TextField
                  variant='outlined'
                  name="sctecrno"
                  value={applyTask?.sctecrno}
                  onChange={handelChangeInput}  
                  fullWidth /></dd>
                </dl>
              </div>
            </Box>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">참여인력</h4>
              <Box>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} onClick={deleteItem}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" onClick={addItem}>
                  <PlusIcon />
                </IconButton>
              </Box>
            </Stack>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'5%'}}/>
                <col style={{width:'19%'}}/>
                <col style={{width:'19%'}}/>
                <col style={{width:'19%'}}/>
                <col style={{width:'19%'}}/>
                <col style={{width:'19%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th><Box className="checkbox"><Checkbox checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
              changeAllCheck()
            }}/></Box></th>
                  <th>이름</th>
                  <th>담당분야</th>
                  <th>휴대폰번호</th>
                  <th>생년월일</th>
                  <th>참여율(%)</th>
                </tr>
              </thead>
              <tbody>
                <ConfirmInfoTable checkList={select} change={changeCheck} data={taskPartcptsList} updateItem={updateItem}/>
              </tbody>
            </table>
            
            {/* {applyData&&applyData.bsnsTypeNm==="교육사업"&&receive.state.cmpnyTypebox===null? */}
            <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">희망직무 및 거주지</h4>
            </Stack>
            <Box css={styles.table}>
              <div className="detail_table type2"> 
                <dl>
                  <dt>희망직무<span className="must">*</span></dt>
                  <dd>
                    <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                          id="hopeDtyCd"
                          name="hopeDtyCd"
                          value={applyTask.hopeDtyCd}
                          onChange={handleChange}
                        >
                          {
                            (userQueries[0].status === 'success') ?
                              userQueries[0].data.list.map((option:any) => (
                                <MenuItem key={option.code} value={option.code}>
                                  {option.codeNm}
                                </MenuItem>
                              ))
                            : null

                          }
                        </Select>
                    </FormControl>
                  </dd>
                  <dt>현 거주지</dt>
                  <dd><TextField        variant='outlined'id="nowAdres"
                  name="nowAdres"
                  value={applyTask.nowAdres}
                  onChange={(e:any)=>handleChange(e)}
                  fullWidth /></dd>
                </dl>
              </div>
            </Box>
            </>
            {/* :null} */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">파일첨부<span className="must">*</span> <span className="sub_title_desc">(최대 20MB 첨부 가능)</span></h4>
            </Stack>
            <div className="tableDefault_scroll">
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'15%'}} />
                  <col style={{width:'10%'}} />
                  <col style={{width:'15%'}} />
                  <col style={{width:'25%'}} />
                  <col style={{width:'40%'}} />
                </colgroup>
                <thead>
                  <tr>
                    <th>문서유형</th>
                    <th>필수여부</th>
                    <th>서식</th>
                    <th>파일명</th>
                    <th>파일첨부</th>
                  </tr>
                </thead>
                <tbody>
                  {!!applyData && (applyData.atchmnflList.length > 0) ? 
                    applyData.atchmnflList.map((item:any,idx:any)=>{
                      return (
                        <tr>
                          <td className="tal pl-20">{item.fileKndNm}</td>
                          <td>{item.essntl ? '필수' : '선택'}</td>
                          <td>
                            <Stack css={styles.btnDown}>
                              <Button onClick={()=>{download(item.formatAttachmentId)}}>
                                <span>다운로드</span>
                              </Button>
                            </Stack>
                          </td>
                          <td>{item.formatAttachmentNm}</td>
                          <td className='td_file'>
                            <Box css={styles.fileupload}>
                              <FileUploadbiz
                                files={files[idx]}
                                handleDelete={(e:any)=>{handleDelete(e,idx)}}
                                handleUpload={(e:any)=>{handleUpload(e,idx)}}
                                id={idx}
                              />
                            </Box>
                          </td>
                        </tr>
                      )                
                    })
                  : ''
                  }
                </tbody>
              </table>
            </div>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">개인정보 수집 동의 <span className="must">*</span></h4>
            </Stack>
            <Box css={styles.agreement}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={allCheck1} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                  setAllCheck1(!allCheck1)
                }}/>} label="개인정보 수집 및 이용 전체 동의 (창업캠프 입주신청)" className="checkbox h4"/>
              </FormGroup>
              <CustomCheckBoxsBiz
              checkbox={termsBox}
              isAll={allCheck1}
              isValid={isValid}
              onClick={(s: string[]) => {
                setValidationBox(s)
                if(termsBox.length !== 0){
                  setAllCheck1((s.length) === (termsBox.length))
                }
              }}
              setValidationBox={setValidationBox}
            />
            </Box>
            <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
              <NavLink to={`/biz/BusinessAppMgt/BusinessAppInfo/${!!receive.state  ? receive.state.pblancId : ''}`}
              state = {{chkList : receive.state.chkList ,pblancId:receive.state.pblancId}}
              >      
              <CustomButton label={'이전'} type={'listBack'} color={'outlinedblack'} />
              </NavLink>
              <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={(e:any)=>{send(e,0)}}/>
              <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={(e:any)=>{send(e,1)}}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default BusinessAppConfirmInfo;
import React, { useEffect, useRef } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, FormGroup, IconButton, OutlinedInput, Stack,  TextField,Typography} from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { FileUpload, FileUpload1 } from "../../EventNews/FileUpload";
import { CustomAgreementButtons } from '~/components/ButtonComponents';
import { initUsptTaskPrtcmpnyHistAfterList } from "~/models/Model";
import { intialErrorConfirmInfo } from "~/models/ModelBiz";
import { AgreementChangeTable, AgreementBeforeTable } from "./View/AgreementChangeTable";
import { TrashIcon, PlusIcon } from "~/components/IconComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCnvnPrtcmpnyCancel, fetchCnvnPrtcmpnyGet, fetchCnvnPrtcmpnyPost } from "~/fetches/biz/fetchAgreementChangeMgt";
import { ModalComponents } from "~/components/SharedModalComponents";
import { render } from "react-dom";


// 협약변경 관리 참여기업
function AgreementChangeMgtApp01() {
  // 입력값오류
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [resnCnError,setResnCnError] = useState({resnCnError:false, resnCnHelper:""})
  const [usptTaskPrtcmpnyHistAfterList,setUsptTaskPrtcmpnyHistAfterList]:any = useState([initUsptTaskPrtcmpnyHistAfterList]);
  const [usptTaskPrtcmpnyInfoHistAfterList,setUsptTaskPrtcmpnyInfoHistAfterList]:any = useState();
  const [data,setData]:any = useState();
  const [number,setNumber] = useState(0);
  const [errorValues, setErrorValues] = useState(intialErrorConfirmInfo);
  const [select, setSelect]:any = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  //변경사유
  // const resnCn:any = useRef("");
  const [resnCn, setResnCn] = useState("");
  
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
  
  const updateItem = (item:any,i:number) => {
    const updated = [...usptTaskPrtcmpnyHistAfterList];
    updated[i] = item;
    setUsptTaskPrtcmpnyHistAfterList(updated);
  };

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

  const isDetail = true;
  const [files, setFiles]:any= useState([]);
  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };

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

  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
        update.push(upfile[i]);
      }
    setFiles(update)
  }

  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUsptTaskPrtcmpnyHistAfterList((state:any) => ({ ...state, [name]: value }));
  }

  const deleteItem = () =>{
    if(allCheck===true){
      setUsptTaskPrtcmpnyHistAfterList([initUsptTaskPrtcmpnyHistAfterList])
      setAllCheck(false)
      setSelect([false])
    }else{
      const updated = [...usptTaskPrtcmpnyHistAfterList];
      const updated1 = [...select];
      for(let i=usptTaskPrtcmpnyHistAfterList.length-1; i>-1; i--){
        if(select[i]===true){
          updated.splice(i,1);
          setUsptTaskPrtcmpnyHistAfterList(updated);
          updated1.splice(i,1);
          setSelect(updated1);
        }
      }
    }
    if(usptTaskPrtcmpnyHistAfterList.length===0){
      addItem();
    }
  }

  const addItem = () =>{
    const updated = [...usptTaskPrtcmpnyHistAfterList];
    const updated1 = [...select]
    updated.push(initUsptTaskPrtcmpnyHistAfterList);
    updated1.push(false);
    setUsptTaskPrtcmpnyHistAfterList(updated);
    setSelect(updated1)
    setAllCheck(false);
  }

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
          usptTaskPrtcmpnyInfoHistAfterList : usptTaskPrtcmpnyInfoHistAfterList,
          usptTaskPrtcmpnyHistAfterList : usptTaskPrtcmpnyHistAfterList,
          attachFileList : attachmentFileList,
          attachFileDeleteList : deleteAttachFileList,
          }
        
          form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
          fetchCnvnPrtcmpnyPost(form).then(()=>{
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
    fetchCnvnPrtcmpnyCancel({
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

  const getData = () => {
    fetchCnvnPrtcmpnyGet(params).then((res:any)=>{
        setData(res);
        setUsptTaskPrtcmpnyHistAfterList(res.usptTaskPrtcmpnyHistAfterList)
        setUsptTaskPrtcmpnyInfoHistAfterList(res.usptTaskPrtcmpnyInfoHistAfterList)
        setAttachmentFileList(res.attachFileList)
        setResnCn(res.usptCnvnChangeReq.resnCn?res.usptCnvnChangeReq.resnCn:"")
        if(!!res.usptTaskPrtcmpnyHistAfterList){
          const updated1 = [...select]
          res.usptTaskPrtcmpnyHistAfterList.map(()=>{
            updated1.push(false);
          })
          setSelect(updated1)
        }
      })
  }
  useEffect(()=>{
    getData();
  },[])
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
                <dd className="radio_grup">
                  <CustomAgreementButtons
                    row
                    defaultData={data?.usptCnvnChangeReq?.cnvnChangeTypeNm}
                    data={[{code:'승인',codeNm:'승인'}, {code:'통보',codeNm:'통보'}]}
                    onClick={(selected) => {
                      const update = {...data}
                      console.log(update)
                      update.usptCnvnChangeReq.cnvnChangeTypeNm = selected
                      setData(update)
                    }}
                  />
                </dd>
                <dt>변경항목</dt>
                <dd>참여기업</dd>
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
            <h4 className="tbl_title mt20">참여기업 개요</h4>
            <div className="detail_table"> 
              <dl>
                <dt>참여업체 총수</dt>
                <dd>{data?.usptTaskPrtcmpnyInfoHistBeforeList?.partcptnCompanyCnt}</dd>
                <dt>중소기업수</dt>
                <dd>{data?.usptTaskPrtcmpnyInfoHistBeforeList?.smlpzCnt}</dd>
              </dl>
              <dl>
                <dt>중견기업수</dt>
                <dd>{data?.usptTaskPrtcmpnyInfoHistBeforeList?.mspzCnt}</dd>
                <dt>기타</dt>
                <dd>{data?.usptTaskPrtcmpnyInfoHistBeforeList?.etcCnt}</dd>
              </dl>
            </div>
            <h4 className="tbl_title mt40">참여기업</h4>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'5%'}}/>
                <col style={{width:'30%'}}/>
                <col style={{width:'10%'}}/>
                <col style={{width:'12%'}}/>
                <col style={{width:'14%'}}/>
                <col style={{width:'14%'}}/>
                <col style={{width:'15%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <Box className="checkbox"><Checkbox/></Box>
                  </th>
                  <th className="star">업체명</th>
                  <th className="star">책임자명</th>
                  <th className="star">직위/직급</th>
                  <th>연락처</th>
                  <th className="star">휴대전화</th>
                  <th className="star">이메일</th>
                </tr>
              </thead>
              <tbody>
                <AgreementBeforeTable data={data?.usptTaskPrtcmpnyHistBeforeList}/>
              </tbody>
            </table>
            <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'27%'}}/>
                  <col style={{width:'63%'}}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td rowSpan={6} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th className="star">업체명</th>
                    <td>참여 A기업</td>
                  </tr>
                  <tr>
                    <th className="star">책임자명</th>
                    <td>김원희</td>
                  </tr>
                  <tr>
                    <th className="star">직위/직급</th>
                    <td>부장</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td>000-0000-0000</td>
                  </tr>
                  <tr>
                    <th className="star">휴대전화</th>
                    <td>000-0000-0000</td>
                  </tr>
                  <tr>
                    <th className="star">이메일</th>
                    <td>abc@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
          <Box css={styles.table}>
            <Typography variant="h6" component="div">
              변경 후 내용
            </Typography>
            <h4 className="tbl_title mt20">참여기업 개요</h4>
            <div className="detail_table"> 
              <dl>
                <dt>참여업체 총수</dt>
                <dd>
                  <TextField
                    variant='outlined'
                    name="partcptnCompanyCnt"
                    value={usptTaskPrtcmpnyInfoHistAfterList?.partcptnCompanyCnt}
                    onChange={handelChangeInput}
                    fullWidth 
                    error={errorValues.errorTaskNmKo}
                    helperText={errorValues.helperTaskNmKo}
                  />
                </dd>
                <dt>중소기업수</dt>
                <dd>
                  <TextField
                    variant='outlined'
                    name="smlpzCnt"
                    value={usptTaskPrtcmpnyInfoHistAfterList?.smlpzCnt}
                    onChange={handelChangeInput}
                    fullWidth 
                    error={errorValues.errorTaskNmKo}
                    helperText={errorValues.helperTaskNmKo}
                  />
                </dd>
              </dl>
              <dl>
                <dt>중견기업수</dt>
                <dd>
                  <TextField
                    variant='outlined'
                    name="mspzCnt"
                    value={usptTaskPrtcmpnyInfoHistAfterList?.mspzCnt}
                    onChange={handelChangeInput}
                    fullWidth 
                    error={errorValues.errorTaskNmKo}
                    helperText={errorValues.helperTaskNmKo}
                  />
                </dd>
                <dt>기타</dt>
                <dd>
                  <TextField
                    variant='outlined'
                    name="etcCnt"
                    value={usptTaskPrtcmpnyInfoHistAfterList?.etcCnt}
                    onChange={handelChangeInput}
                    fullWidth 
                    error={errorValues.errorTaskNmKo}
                    helperText={errorValues.helperTaskNmKo}
                  />
                </dd>
              </dl>
            </div>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="tbl_title">참여기업</h4>
              <Box className="delete_icon">
                <CustomButton label={'기업선택'} onClick={()=> navigate('/')} type={'modify'} color={'outlinedblack'} style={{margin:'5px 18px'}} />
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1 }} onClick={deleteItem}>
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
                <col style={{width:'30%'}}/>
                <col style={{width:'10%'}}/>
                <col style={{width:'12%'}}/>
                <col style={{width:'14%'}}/>
                <col style={{width:'14%'}}/>
                <col style={{width:'15%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th><Box className="checkbox"><Checkbox checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
              changeAllCheck()
            }}/></Box></th>
                  <th className="star">업체명</th>
                  <th className="star">책임자명</th>
                  <th className="star">직위/직급</th>
                  <th>연락처</th>
                  <th className="star">휴대전화</th>
                  <th className="star">이메일</th>
                </tr>
              </thead>
              <tbody>
                <AgreementChangeTable checkList={select} change={changeCheck} data={usptTaskPrtcmpnyHistAfterList} updateItem={updateItem}/>
              </tbody>
            </table>
            <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'27%'}}/>
                  <col style={{width:'63%'}}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td rowSpan={6} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th className="star">업체명</th>
                    <td><OutlinedInput /></td>
                  </tr>
                  <tr>
                  <th className="star">책임자명</th>
                    <td><OutlinedInput /></td>
                  </tr>
                  <tr>
                  <th className="star">직위/직급</th>
                    <td><OutlinedInput /></td>
                  </tr>
                  <tr>
                  <th>연락처</th>
                    <td><OutlinedInput /></td>
                  </tr>
                  <tr>
                  <th className="star">휴대전화</th>
                    <td><OutlinedInput /></td>
                  </tr>
                  <tr>
                    <th className="star">이메일</th>
                    <td><OutlinedInput /></td>
                  </tr>
                </tbody>
              </table>
            </div>
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
    <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
    </ModalComponents>
    </div>
  );
}

export default AgreementChangeMgtApp01;
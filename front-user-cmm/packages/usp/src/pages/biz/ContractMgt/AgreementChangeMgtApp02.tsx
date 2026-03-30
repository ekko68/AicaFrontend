import React, { useEffect, useRef } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Checkbox, Box, FormControlLabel, FormGroup, IconButton, OutlinedInput, Stack,  TextField,Typography, FormControl} from '@mui/material';
import { CustomAgreementButtons, CustomButton } from '~/components/ButtonComponents';
import { FileUpload1 } from "../../EventNews/FileUpload";
import { initUsptTaskPartcptsHistBefore, initUsptTaskPrtcmpnyHistAfterList } from '~/models/Model';
import { AgreementChangeTable2, AgreementBeforeTable02 } from "./View/AgreementChangeTable";
import { TrashIcon, PlusIcon } from "~/components/IconComponents";
import { fetchTaskPartCancel, fetchTaskPartGet, fetchTaskPartPost } from "~/fetches/biz/fetchAgreementChangeMgt";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalComponents } from "~/components/SharedModalComponents";
import { CustomSelect } from "~/components/SelectBoxComponents";

// 협약변경 관리 참여인력
function AgreementChangeMgtApp02() {
  // 입력값오류
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [resnCnError,setResnCnError] = useState({resnCnError:false, resnCnHelper:""})
  const [usptTaskPartcptsHistAfter,setUsptTaskPartcptsHistAfter]:any = useState([initUsptTaskPartcptsHistBefore]);
  const [data,setData]:any = useState();
  const [select, setSelect]:any = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [histId, setHistId] = useState<string>();
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
    const updated = [...usptTaskPartcptsHistAfter];
    updated[i] = item;
    setUsptTaskPartcptsHistAfter(updated);
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
    setUsptTaskPartcptsHistAfter((state:any) => ({ ...state, [name]: value }));
  }

  const deleteItem = () =>{
    if(allCheck===true){
      setUsptTaskPartcptsHistAfter([initUsptTaskPrtcmpnyHistAfterList])
      setAllCheck(false)
      setSelect([false])
    }else{
      const updated = [...usptTaskPartcptsHistAfter];
      const updated1 = [...select];
      for(let i=usptTaskPartcptsHistAfter.length-1; i>-1; i--){
        if(select[i]===true){
          updated.splice(i,1);
          setUsptTaskPartcptsHistAfter(updated);
          updated1.splice(i,1);
          setSelect(updated1);
        }
      }
    }
    if(usptTaskPartcptsHistAfter.length===0){
      addItem();
    }
  }

  const addItem = () =>{
    const updated = [...usptTaskPartcptsHistAfter];
    const updated1 = [...select]
    updated.push(initUsptTaskPrtcmpnyHistAfterList);
    updated1.push(false);
    setUsptTaskPartcptsHistAfter(updated);
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
          usptTaskPartcptsHistAfter : usptTaskPartcptsHistAfter,
          attachFileList : attachmentFileList,
          attachFileDeleteList : deleteAttachFileList,
          }
        
          form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
          fetchTaskPartPost(form).then(()=>{
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
    fetchTaskPartCancel({
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
    fetchTaskPartGet(params).then((res:any)=>{
      console.log('res - ' + JSON.stringify(res))
      setData(res);
      setUsptTaskPartcptsHistAfter(res.usptTaskPartcptsHistAfter)
      setAttachmentFileList(res.attachFileList)
      setResnCn(res.usptCnvnChangeReq.resnCn?res.usptCnvnChangeReq.resnCn:"")
      if(!!res.usptTaskPartcptsHistAfter){
        const updated1 = [...select]
        res.usptTaskPartcptsHistAfter.map(()=>{
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
      <ModalComponents open={open} type={'normal'} content={error} 
          onConfirm={() => { setOpen(false) }} 
          onClose={() => { setOpen(false)}}>
      </ModalComponents>
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
            <h4 className="tbl_title mt20">참여인력</h4>
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
                    <Box className="checkbox"><Checkbox checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                      changeAllCheck() }}/></Box>
                  </th>
                  <th className="star">업체명</th>
                  <th>이름</th>
                  <th>담당분야</th>
                  <th>휴대폰번호</th>
                  <th>생년월일</th>
                  <th>참여율(%)</th>
                </tr>
              </thead>
              <tbody>
              <AgreementBeforeTable02 data={data?.usptTaskPartcptsHistAfter}/>
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
                    <th>이름</th>
                    <td>김원희</td>
                  </tr>
                  <tr>
                    <th>담당분야</th>
                    <td>부장</td>
                  </tr>
                  <tr>
                    <th>휴대폰번호</th>
                    <td>000-0000-0000</td>
                  </tr>
                  <tr>
                    <th>생년월일</th>
                    <td>000-0000-0000</td>
                  </tr>
                  <tr>
                    <th>참여율(%)</th>
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
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="tbl_title mt20">참여인력</h4>
              <Box className="delete_icon">
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
                  <th>이름</th>
                  <th>담당분야</th>
                  <th>휴대폰번호</th>
                  <th>생년월일</th>
                  <th>참여율(%)</th>
                </tr>
              </thead>
              <tbody>
                <AgreementChangeTable2 checkList={select} change={changeCheck} data={usptTaskPartcptsHistAfter} updateItem={updateItem}/>
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
                    <td>
                      <CustomSelect value={data?.entrpsNm} data={[{code:"01",codeNm:"01"}, {code:"02",codeNm:"02"}]} 
                        onClick={(selected) => {
                          setHistId(selected)
                        }}
                      />
                      </td>
                  </tr>
                  <tr>
                  <th>이름</th>
                    <td><OutlinedInput value={'김영희'}/></td>
                  </tr>
                  <tr>
                  <th>담당분야</th>
                    <td><OutlinedInput value={'부장'}/></td>
                  </tr>
                  <tr>
                  <th>휴대폰번호</th>
                    <td><OutlinedInput value={'000-0000-0000'}/></td>
                  </tr>
                  <tr>
                  <th>생년월일</th>
                    <td><OutlinedInput value={'1980-01-01'}/></td>
                  </tr>
                  <tr>
                    <th>참여율(%)</th>
                    <td><OutlinedInput value={'100'}/></td>
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
    </div>
  );
}

export default AgreementChangeMgtApp02;
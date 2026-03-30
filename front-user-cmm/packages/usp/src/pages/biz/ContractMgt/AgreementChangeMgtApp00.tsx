import React, { useRef } from "react"
import { useState, useEffect } from "react";
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack,  TextField,Typography } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomAgreementButtons} from '~/components/ButtonComponents';
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ModalComponents } from '~/components/ModalComponents';
import { fetchCnvnTaskInfoCancel, fetchCnvnSclpstGet, fetchCnvnTaskInfoPost, fetchCnvnTaskInfoGet } from "~/fetches/biz/fetchAgreementChangeMgt";
import { useNavigate } from "react-router-dom";
import { FileUpload1 } from "~/pages/EventNews/FileUpload";
import { fetchGetCommCode } from "~/fetches";
import { CustomSelect } from "~/components/SelectBoxComponents";

// 협약변경 관리
function AgreementChangeMgtApp00() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [resnCnError,setResnCnError] = useState({resnCnError:false, resnCnHelper:""})
  const [usptCnvnTaskInfoHistAfter,setUsptCnvnTaskInfoHistAfter]:any = useState();
  const [data,setData]:any = useState();
  const [usptCnvnSelect, setUsptCnvnSelect] = useState<string>();

  //resnCnError.errorTitle
  //resnCnError.helperTitle
  //변경사유
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
          usptCnvnTaskInfoHistAfter : usptCnvnTaskInfoHistAfter,
          attachFileList : attachmentFileList,
          attachFileDeleteList : deleteAttachFileList,
          }
        
          form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
          fetchCnvnTaskInfoPost(form).then(()=>{
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
    fetchCnvnTaskInfoCancel({
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
    fetchCnvnTaskInfoGet(params).then((res:any)=>{
      console.log('res - ' + JSON.stringify(res))
        setData(res);
        setUsptCnvnTaskInfoHistAfter(res.usptCnvnTaskInfoHistAfter)
        setAttachmentFileList(res.attachFileList)
        setResnCn(res.usptCnvnChangeReq.resnCn?res.usptCnvnChangeReq.resnCn:"")
    })
  }
  useEffect(()=>{
    getData();
  },[])
//   const {data} = useQuery("fetchCnvnTaskInfoGet", async () => await fetchCnvnTaskInfoGet(params),{
//     onSuccess: (res:any) => {
//       console.log(res)
//     }
//   })
  // 공통 코드 조회
  const {data:assign_box} = useQuery("TASK_TYPE", async () => await fetchGetCommCode("TASK_TYPE"));
 console.log('assign_box - ' + JSON.stringify(assign_box))
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
          <Typography variant="h6" component="div" style={{fontWeight:700}} mt={5}>
            변경 전 내용
          </Typography>
          <Box css={styles.table}>
            <h4 className="tbl_title">과제정보</h4>
            <div className="detail_table">
                  <dl>
                    <dt>과제명 / 프로젝트명(국문) <span className='must'>*</span></dt>
                    <dd>{data?.usptCnvnTaskInfoHistBefore?.taskNmKo}</dd>
                  </dl>
                  <dl>
                    <dt>과제명(영문)</dt>
                    <dd>{data?.usptCnvnTaskInfoHistBefore?.taskNmEn}</dd>
                  </dl>
                  <dl>
                    <dt>과제분야 <span className='must'>*</span></dt>
                    <dd>{data?.usptCnvnTaskInfoHistBefore?.applyField}</dd>
                    <dt>사업기간</dt>
                    <dd>{data?.usptCnvnTaskInfoHistBefore?.bsnsPd}</dd>
                  </dl>
                  <dl>
                    <dt>사업기간(전체)</dt>
                    <dd>{data?.usptCnvnTaskInfoHistBefore?.bsnsPdAll}</dd>
                    <dt>사업기간(당해)</dt>
                    <dd>{data?.usptCnvnTaskInfoHistBefore?.bsnsPdYw}</dd>
                  </dl>
                </div>
          </Box>
          <Typography variant="h6" component="div" style={{fontWeight:700}} mt={5}>
            변경 후 내용
          </Typography>
          <Box css={styles.table}>
            <h4 className="tbl_title">과제정보</h4>
            <div className="detail_table">
                  <dl>
                    <dt>과제명 / 프로젝트명(국문) <span className='must'>*</span></dt>
                    <dd><OutlinedInput 
                      size="small" 
                      className="ipt_tp01" 
                      sx={{width:'100%'}} 
                      name="taskNmKo"
                      value={usptCnvnTaskInfoHistAfter?.taskNmKo} 
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{                               
                        setUsptCnvnTaskInfoHistAfter((pre:any)=>({
                        ...pre,taskNmKo:e.target.value
                      }
                      ))}}/>
                    </dd>
                  </dl>
                  <dl>
                    <dt>과제명(영문)</dt>
                    <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                      name="taskNmEn" 
                      value={usptCnvnTaskInfoHistAfter?.taskNmEn}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{                               
                        setUsptCnvnTaskInfoHistAfter((pre:any)=>({
                        ...pre,taskNmEn:e.target.value
                      }
                      ))}}/>
                    </dd>
                  </dl>
                  <dl>
                    <dt>과제분야 <span className='must'>*</span></dt>
                    <dd>
                      <Box css={styles.inputBox}>
                        <FormControl fullWidth>
                          <CustomSelect
                            value={usptCnvnTaskInfoHistAfter?.applyField}
                            onClick={(selected) => {
                              setUsptCnvnTaskInfoHistAfter((pre:any)=>({
                                ...pre,applyField:selected
                              }))
                              setUsptCnvnSelect(selected)
                            }}
                            
                            // onChange={(event: SelectChangeEvent)=>{
                            //     console.log('PlanDocInfo')
                            //     setUsptCnvnTaskInfoHistAfter((pre:any)=>({
                            //       ...pre,applyField:event.target.value
                            //     }))
                            // }}
                            data={assign_box ? assign_box.list : []} />
                        </FormControl>
                      </Box>
                    </dd>
                    <dt>사업기간</dt>
                    <dd>{usptCnvnTaskInfoHistAfter?.bsnsPd}</dd>
                  </dl>
                  <dl>
                    <dt>사업기간(전체)</dt>
                    <dd>{usptCnvnTaskInfoHistAfter?.bsnsPdAll}</dd>
                    <dt>사업기간(당해)</dt>
                    <dd>{usptCnvnTaskInfoHistAfter?.bsnsPdYw}</dd>
                  </dl>
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

export default AgreementChangeMgtApp00;
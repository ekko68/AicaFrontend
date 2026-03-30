import React, { useEffect, useRef } from "react"
import { useState } from 'react';
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack,  TextField,Typography } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { FileUpload1 } from "../../../EventNews/FileUpload";
import { CustomAgreementButtons} from '~/components/ButtonComponents';
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ModalComponents } from '~/components/ModalComponents';
import { fetchCnvnSclpstCancel, fetchCnvnSclpstGet, fetchCnvnSclpstPost } from "~/fetches/biz/fetchAgreementChangeMgt";
import { useNavigate } from "react-router-dom";

// 협약변경 관리
function AgreementChangeMgtApp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [resnCnError,setResnCnError] = useState({resnCnError:false, resnCnHelper:""})
  const [data,setData]:any = useState();
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
          usptCnvnSclpstHistAfter : data.usptCnvnSclpstHistAfter,
          attachFileList : attachmentFileList,
          attachFileDeleteList : deleteAttachFileList,
          }
        
          form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
          fetchCnvnSclpstPost(form).then(()=>{
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
    fetchCnvnSclpstCancel({
          cnvnChangeReqId : data.usptCnvnChangeReq.cnvnChangeReqId,
          changeIemDivCd : data.usptCnvnChangeReq.changeIemDivCd
    }).then(()=>{
      navigate('/biz/ContractMgt/AgreementChangeMgt')
    })
  }

  const getData = () => {
    const params = {
      cnvnChangeReqId : "",
      bsnsCnvnId : receive?.state?.bsnsCnvnId
    }
    fetchCnvnSclpstGet(params).then((res:any)=>{
      console.log('res - ' + JSON.stringify(res))
      setAttachmentFileList(res.attachFileList)
      setData(res);
      setResnCn(res.usptCnvnChangeReq.resnCn?res.usptCnvnChangeReq.resnCn:"")
    })
  }

  useEffect(()=>{
    getData();
  },[])
  // const {data} = useQuery("fetchCnvnSclpstGet", async () => await fetchCnvnSclpstGet(params),{
  //   onSuccess: (res:any) => {
  //     console.log(res)
  //     setAttachmentFileList(res.attachFileList)
  //   }
  // })
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
                      update.usptCnvnChangeReq.cnvnChangeTypeNm = selected
                      setData(update)
                    }}
                  />
                </dd>
                <dt>변경항목</dt>
                <dd>수행기관신분(개인 → 사업자)</dd>
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
                      className="textfield_tp01" 
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
            <h4 className="tbl_title mt20">수행기관정보</h4>
            <div className="detail_table"> 
              <dl>
                <dt>이름</dt>
                <dd>{data?.usptBsnsPlanApplcntBefore?.applcntNm}</dd>
                <dt>생년월일</dt>
                <dd>{data?.usptBsnsPlanApplcntBefore?.brthdy}</dd>
              </dl>
              <dl>
                <dt>성별</dt>
                <dd>{data?.usptBsnsPlanApplcntBefore?.genderCd}</dd>
                <dt>내외국인</dt>
                <dd>{data?.usptBsnsPlanApplcntBefore?.nativeYn}</dd>
              </dl>
              <dl>
                <dt>휴대폰번호</dt>
                <dd>{data?.usptBsnsPlanApplcntBefore?.mbtlnum}</dd>
                <dt>이메일</dt>
                <dd>{data?.usptBsnsPlanApplcntBefore?.email}</dd>
              </dl>
            </div>
          </Box>
          <Typography variant="h6" component="div" style={{fontWeight:700}} mt={5}>
            변경 후 내용
          </Typography>
          <Box css={styles.table}>
            <h4 className="tbl_title mt20">수행기관정보</h4>
            <div className="detail_table"> 
              <dl>
                <dt>사업자명</dt>
                <dd>{data?.usptCnvnSclpstHistAfter?.bsnmNm}</dd>
                <dt>사업자등록번호</dt>
                <dd>{data?.usptCnvnSclpstHistAfter?.bizrno}</dd>
              </dl>
              <dl>
                <dt>대표자명</dt>
                <dd>{data?.usptCnvnSclpstHistAfter?.ceoNm}</dd>
                <dt>담당자명</dt>
                <dd>{data?.usptCnvnSclpstHistAfter?.chargerNm}</dd>
              </dl>
              <dl>
                <dt>담당자 휴대폰번호</dt>
                <dd>{data?.usptCnvnSclpstHistAfter?.chargerMbtlnum}</dd>
                <dt>담당자 이메일</dt>
                <dd>{data?.usptCnvnSclpstHistAfter?.chargerEmail}</dd>
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

export default AgreementChangeMgtApp;
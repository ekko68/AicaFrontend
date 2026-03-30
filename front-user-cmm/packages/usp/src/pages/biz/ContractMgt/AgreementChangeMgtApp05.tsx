import React, { useEffect } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Box,OutlinedInput, Stack,  TextField, Typography, TooltipProps, Tooltip, tooltipClasses, styled} from '@mui/material';
import { CustomAgreementButtons, CustomButton } from '~/components/ButtonComponents';
import { FileUpload, FileUpload1 } from "../../EventNews/FileUpload";
import {CustomRadioButtons} from '~/components/ButtonComponents';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCnvnApplcntGet, fetchTaskTaxitmCancel, fetchTaskTaxitmPost } from "~/fetches/biz/fetchAgreementChangeMgt";

// 협약변경 관리 신청자정보
function AgreementChangeMgtApp05() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [resnCnError,setResnCnError] = useState({resnCnError:false, resnCnHelper:""})
  const [usptCnvnApplcntHistAfter,setUsptCnvnApplcntHistAfter]:any = useState();
  const [data,setData]:any = useState();

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
          usptCnvnApplcntHistAfter : usptCnvnApplcntHistAfter,
          attachFileList : attachmentFileList,
          attachFileDeleteList : deleteAttachFileList,
          }
        
          form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
          fetchTaskTaxitmPost(form).then(()=>{
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
    fetchTaskTaxitmCancel({
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
    fetchCnvnApplcntGet(params).then((res:any)=>{
        setData(res);
        console.log('res - ' + JSON.stringify(res))
        setUsptCnvnApplcntHistAfter(res.usptCnvnApplcntHistAfter)
        setAttachmentFileList(res.attachFileList)
        setResnCn(res.usptCnvnChangeReq.resnCn?res.usptCnvnChangeReq.resnCn:"")
    })
  }
  useEffect(()=>{
    getData();
  },[])

  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUsptCnvnApplcntHistAfter((state:any) => ({ ...state, [name]: value }));
  }
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
          <Typography variant="h6" component="div">
            변경 전 내용
          </Typography>
          <Box css={styles.table}>
            {data?.usptCnvnApplcntHistBefore?.indvdlBsnmDivCd==="INDV02"?
            <>
            <h4 className="tbl_title mt20">신청자정보 <span className='unit'>(사업자)</span></h4>
            <div className="detail_table"> 
              <dl>
                <dt>사업자명</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.applcntNm}</dd>
                <dt>사업자등록번호</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.bizrno}</dd>
              </dl>
              <dl>
                <dt>대표자명</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.ceoNm}</dd>
                <dt>담당자명</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.chargerNm}</dd>
              </dl>
              <dl>
                <dt>담당자 휴대폰번호</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.encMbtlnum}</dd>
                <dt>담당자 이메일</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.encEmail}</dd>
              </dl>
            </div>
            </>
            :
            <>
            <h4 className="tbl_title">신청자정보 <span className='unit'>(개인)</span></h4>
            <div className="detail_table"> 
            <dl>
                <dt>이름</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.applcntNm}</dd>
                <dt>생년월일</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.brthdy}</dd>
              </dl>
              <dl>
                <dt>성별</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.genderCd}</dd>
                <dt>내외국인</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.nativeYn}</dd>
              </dl>
              <dl>
                <dt>휴대폰번호</dt>
                <dd>{data?.usptCnvnApplcntHistBefore?.encMbtlnum}</dd>
              </dl>
            </div>
            </>
            }
          </Box>
          <Typography variant="h6" component="div">
            변경 후 내용
          </Typography>
          <Box css={styles.table}>
            {usptCnvnApplcntHistAfter?.indvdlBsnmDivCd==="INDV02"?
            <>
            <h4 className="tbl_title mt20">신청자정보 <span className='unit'>(사업자)</span></h4>
            <div className="detail_table"> 
              <dl>
                <dt>사업자명</dt>
                <dd>
                <OutlinedInput 
                name="applcntNm" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.applcntNm:""}
                onChange={handelChangeInput}
                />
                </dd>
                <dt>사업자등록번호</dt>
                <dd>
                <OutlinedInput 
                name="bizrno" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.bizrno:""}
                onChange={handelChangeInput}
                />
                </dd>
              </dl>
              <dl>
                <dt>대표자명</dt>
                <dd>
                <OutlinedInput 
                name="ceoNm" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.ceoNm:""}
                onChange={handelChangeInput}
                />
                </dd>
                <dt>담당자명</dt>
                <dd>
                <OutlinedInput 
                name="chargerNm" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.chargerNm:""}
                onChange={handelChangeInput}
                />
                </dd>
              </dl>
              <dl>
                <dt>담당자 휴대폰번호</dt>
                <dd>
                <OutlinedInput 
                name="encMbtlnum" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.encMbtlnum:""}
                onChange={handelChangeInput}
                />
                </dd>
                <dt>담당자 이메일</dt>
                <dd>
                <OutlinedInput 
                name="encEmail" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.encEmail:""}
                onChange={handelChangeInput}
                />
                </dd>
              </dl>
            </div>
            </>
            :
            <>
            <h4 className="tbl_title">신청자정보 <span className='unit'>(개인)</span></h4>
            <div className="detail_table"> 
            <dl>
                <dt>이름</dt>
                <dd>
                <OutlinedInput 
                name="applcntNm" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.applcntNm:""}
                onChange={handelChangeInput}
                />
                </dd>
                <dt>생년월일</dt>
                <dd>
                <OutlinedInput 
                name="brthdy" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.brthdy:""}
                onChange={handelChangeInput}
                />
                </dd>
              </dl>
              <dl>
                <dt>성별</dt>
                <dd>
                <OutlinedInput 
                name="genderCd" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.genderCd:""}
                onChange={handelChangeInput}
                />
                </dd>
                <dt>내외국인</dt>
                <dd>
                <OutlinedInput 
                name="nativeYn" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.nativeYn:""}
                onChange={handelChangeInput}
                />
                </dd>
              </dl>
              <dl>
                <dt>휴대폰번호</dt>
                <dd>
                <OutlinedInput 
                name="encMbtlnum" 
                value={usptCnvnApplcntHistAfter?usptCnvnApplcntHistAfter.encMbtlnum:""}
                onChange={handelChangeInput}
                />
                </dd>
                <dt className="wh pc"></dt>
                <dd className="pc"></dd>
              </dl>
            </div>
            </>
            }
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

export default AgreementChangeMgtApp05;
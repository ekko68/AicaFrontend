import React from "react";
import { useState, useRef } from 'react';
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Box, TextField,Stack,} from '@mui/material';
import  Link  from '@mui/material/Link';
import { FileUpload } from "../../../EventNews/FileUpload";
import { CustomButton} from '~/components/ButtonComponents';
import { fetchReportDetailGet, fetchReportSubmit } from "~/fetches/fetchReport";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ModalReasonConfirm } from "../../BusinessAppMgt/PopComp/ModalReasonConfirm";
import { intialErrorQuestion } from "~/models/ModelTreadmill";


/* 
  작성일    :   2022/07/06
  화면명    :   사업관리 -> 평가관리 -> 발표자료 제출
  회면ID    :   UI-USP-FRN-0160301
  화면/개발 :   Seongeonjoo / navycui ...todo 대기 api 차주
*/
const ReportSubmissionDetail = () =>  {
  const navigate = useNavigate();
  const textInput:any = useRef("");
  const receive:any = useLocation();
  const [files, setFiles]:any= useState([]);
  const [textLength,setLength] = useState(0);
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
  const changeText = () => {
    setLength(textInput.current.value.length)
  }
  const {data:getData} = useQuery("fetchReportDetailGet", async () => await fetchReportDetailGet(receive.state.item.reprtId));
  console.log(getData);
  console.log(receive);

  const [questionError,setQuestionError] = useState(intialErrorQuestion);

  const validate = () => {
    let check = true;
    //이의신청 내용 확인
    if (textInput.current.value===""){
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

  const send = (event:any) =>{
    if(!validate()){
      return;
    };
    try{
      const info = {reprtSumryCn : textInput.current.value}
      const form = new FormData();
      form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
      for(let i=0; i<files.length; i++){
        form.append("fileList",files[i])
      }
    
      fetchReportSubmit(receive.state.item.reprtId,form).then(
        ()=>navigate('../biz/TaskManagement/ReportSubmission')
      ).catch((e)=>{
        addModal({
          open: true,
          content: e.response.data.message
        });
      })
    } catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }

  }
  return (
    <div css={styles.container}>
    <Box css={styles.sub_cont01}>
      <div className="benner">
        <BreadCrumb />
        <div className="content">
          <div className="txtbox">
            <h2 className="tit">보고서 제출</h2>
            <p>
              중간보고서 및 결과보고서 제출대상 과제를 조회하고, 제출할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className="content_body">
        <div className="content">
          <Box css={styles.box_graylist}>
            • <span className="must">*</span> 표시는 필수입력 항목입니다.
          </Box>
          <h4 className="tbl_title">기본정보</h4>
          {getData?
          <Box css={styles.table}>
            <div className="detail_table"> 
              <dl>
                <dt>공고명</dt>
                <dd>{getData.list.pblancNm}</dd>
              </dl>
              <dl>
                <dt>과제명</dt>
                <dd>{getData.list.taskNm}</dd>
                <dt>접수번호</dt>
                <dd>{getData.list.receiptNo}</dd>
              </dl>
              <dl>
                <dt>제출구분</dt>
                <dd>{getData.list.reprtType}</dd>
                <dt>제출상태</dt>
                <dd className="withLink">{getData.reprtSttus}
                  {getData.list.rceptSttus==='제출요청' || getData.list.rceptSttus==='보완요청' || getData.list.rceptSttus==='접수완료'?         
                    <ModalReasonConfirm applyId={receive.state.item.reprtId} viewNm="ReportSubmission" variant="text"/>
                  :null}
                    {/* <ModalReasonConfirm applyId={receive.state.item.reprtId} viewNm='ReportSubmissionDetail' title='보고서 제출'/> */}
                </dd>
              </dl>
              <dl>
                <dt>제출일</dt>
                <dd>{getData.presentnDate}</dd>
              </dl>
            </div>
          </Box>
          :null}
          <h4 className="tbl_title">보고서 요약</h4>
          <TextField
            id="outlined-multiline-static"
            onChange={changeText}
            inputRef={textInput}
            error = {questionError.errorQuestion}
            helperText = {questionError.helperQuestion}
            multiline rows={4} 
            className="textfield_tp01" 
            inputProps={{
              maxLength: 1000,
            }}
          />
          <div className='tf_count'>{textLength}/1000</div>
          <h4 className="tbl_title">파일첨부 <span className="must">*</span></h4>
          <Box css={styles.fileupload}>
            <FileUpload
              files={files}
              handleDelete={handleDelete}
              handleUpload={handleUpload}
            />
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
            <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={send}/>
          </Stack>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default ReportSubmissionDetail;

function addModal(arg0: { open: boolean; content: any; }) {
    throw new Error("Function not implemented.");
}

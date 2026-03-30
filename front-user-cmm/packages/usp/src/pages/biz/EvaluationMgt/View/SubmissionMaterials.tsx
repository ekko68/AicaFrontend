import React from "react";
import { useState } from 'react';
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Box, TextField,Stack,} from '@mui/material';
import { FileUpload } from "../../../EventNews/FileUpload";
import { CustomButton} from '~/components/ButtonComponents';
import { ModalReasonConfirm } from "../../BusinessAppMgt/PopComp/ModalReasonConfirm";

/* 
  작성일    :   2022/07/06
  화면명    :   사업관리 -> 평가관리 -> 발표자료 제출
  회면ID    :   UI-USP-FRN-0160301
  화면/개발 :   Seongeonjoo / navycui ...todo 대기 api 차주
*/
const SubmissionMaterials = () =>  {
  const isDetail = true;
  const [files, setFiles]:any= useState([]);
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
  return (
    <div css={styles.container}>
    <Box css={styles.sub_cont01}>
      <div className="benner">
        <BreadCrumb />
        <div className="content">
          <div className="txtbox">
            <h2 className="tit">발표자료 제출</h2>
            <p className={isDetail?'nobtm':''}>
              평가예정인 과제의 발표자료를 조회하고 제출할 수 있습니다.
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
          <Box css={styles.table}>
            <div className="detail_table"> 
              <dl>
                <dt>공고명</dt>
                <dd>2021 AI 제품·서비스 제작 지원사업</dd>
              </dl>
              <dl>
                <dt>평가예정일시</dt>
                <dd>2021-10-25 10:00</dd>
                <dt>과제명</dt>
                <dd>딥러닝 기반 버츄얼 휴면 인플루언서 개발</dd>
              </dl>
              <dl>
                <dt>제출일</dt>
                <dd>2021-10-12</dd>
                <dt>제출상태</dt>
                <dd className="withLink">보완요청
                  <ModalReasonConfirm applyId={'item.applyId'} viewNm='SubmissionMaterials' variant='text'/>
                  {/* <Link underline="hover" className="home" key="1" color="inherit" 
                    onClick={()=>{
                    console.log("openopen")
                  }}>사유확인</Link> */}
                </dd>
              </dl>
            </div>
          </Box>
          <h4 className="tbl_title">보고서 요약</h4>
          <Box css={styles.textfieldBox}>
            <TextField
              id="outlined-multiline-static"
              multiline rows={4} 
              className="scrollBox" 
              inputProps={{
                maxLength: 1000,
              }}
            />
            <div className='tf_count'>1/1000</div>
          </Box>
          <h4 className="tbl_title">파일첨부 <span className="must">*</span></h4>
          <Box css={styles.fileupload}>
            <FileUpload
              files={files}
              handleDelete={handleDelete}
              handleUpload={handleUpload}
            />
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
            <CustomButton label={'제출'} type={'listBack'} color={'primary'} />
          </Stack>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default SubmissionMaterials;
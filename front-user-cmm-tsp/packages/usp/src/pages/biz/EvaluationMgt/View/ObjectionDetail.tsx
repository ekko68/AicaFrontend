import React from "react";
import { useState, useEffect } from "react";
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Box, Button, Stack,FormControl,Select,MenuItem} from '@mui/material';
import  Link  from '@mui/material/Link';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { CustomButton} from '~/components/ButtonComponents';
import fetchDownload from '~/fetches/fetchDownload';
import { fetchObjectionCancel, fetchObjectionDetailGet } from "~/fetches/fetchObjection";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ModalReasonConfirm } from "../../BusinessAppMgt/PopComp/ModalReasonConfirm";

/* 
  작성일    :   2022/07/06
  화면명    :   사업관리 -> 평가관리 -> 결과 이의 신청 상세
  회면ID    :   UI-USP-FRN-0160901
  화면/개발 :   Seongeonjoo / navycui ...todo 대기 api 차주
*/
const ObjectionDetail = () =>  {
  const isDetail = true;
  const navigate = useNavigate();
  const receive:any = useLocation();
  const [data,setData]:any = useState();
  const getList = () => {
    console.log(1);
    fetchObjectionDetailGet(receive.state.item.objcReqstId)
    .then((res)=>{
      console.log(res);
      setData(res);
    })
    .catch((e)=>{
      console.log(e);
      let status = e.response.status;
      console.log(status);
      
      if(status === 400){
        // addModal({
        //   open: true,
        //   content: "파일이 없습니다."
        // })
      }      
    })
  }
  console.log(data)
  useEffect(()=>{
    getList();
  },[])
  //다운로드
  
  const {addModal} = useGlobalModalStore();

  //결과이의신청 첨부파일 일괄 다운로드
  const downloadAll = async () =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${data.objcReqstId}/objc/atchmnfl`)
    .then()
    .catch((e)=>{
      let status = e.response.status;
      console.log(status);
      
      if(status === 400){
        addModal({
          open: true,
          content: "파일이 없습니다."
        })
      }
      });
  }

  //심의결과 첨부파일 일괄 다운로드
  const downloadAll1 = async () =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${data.objcReqstId}/dlbrt/atchmnfl`)
    .then()
    .catch((e)=>{
      let status = e.response.status;
      console.log(status);
      
      if(status === 400){
        addModal({
          open: true,
          content: "파일이 없습니다."
        })
      }
      });
  }

  const applyCancel = () => {
    fetchObjectionCancel(data.objcReqstId)
    .then(()=>navigate('../biz/EvaluationMgt/Objection'))
    .catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    })
  }
  return (
    <div css={styles.container}>
    <Box css={styles.sub_cont01}>
      <div className="benner">
        <BreadCrumb />
        <div className="content">
          <div className="txtbox">
            <h2 className="tit">결과이의신청 상세</h2>
            <p className={isDetail?'nobtm':''}>
              이의신청 내용을 확인하고, 사업담당자가 확인하기 전 신청을 취소처리 할 수 있습니다.<br />
              신청이 접수되면 재심의가 진행되고 심의완료 후 결과가 전달됩니다.
            </p>
          </div>
        </div>
      </div>
      <div className="content_body">
        <div className="content">
          <h4 className="tbl_title">신청자정보</h4>
          <Box css={styles.table}>
            {data?
            <div className="detail_table"> 
              <dl>
                <dt>공고명</dt>
                <dd>{data.pblancNm}</dd>
              </dl>
              <dl>
                <dt>접수번호</dt>
                <dd>{data.receiptNo}</dd>
                <dt>과제명</dt>
                <dd>{data.taskNm}</dd>
              </dl>
              <dl>
                <dt>평가단계</dt>
                <dd>{data.evlStepNm}</dd>
                <dt>이의신청일시</dt>
                <dd>{data.objcReqstDate}</dd>
              </dl>
              <dl>
                <dt>신청상태</dt>
                <dd className="withLink">{data.lastSlctnObjcProcessSttus}
                {data.lastSlctnObjcProcessSttus==='반려'?
                <ModalReasonConfirm applyId={data.objcReqstId} viewNm="Objection" variant='text'/>
                :null}
                </dd>
              </dl>
            </div>:null}
          </Box>
          {data?
          <>
          <h4 className="tbl_title">이의신청 내용</h4>
          <div className="objection_content">
            {data.objcReqstCn}
          </div>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginBottom:'10px'}}>
            <h4>첨부파일</h4>
            <Stack css={styles.btnDown}>
              <Button onClick={() => downloadAll()}>
                <span>일괄다운로드</span>
              </Button>
            </Stack>
          </Stack>
          <Stack css={styles.attatchedFile}>
            {data.applcntAttachmentFileList ? data.applcntAttachmentFileList.map((item:any)=>(
            <Stack css={styles.btnDown}>
              <Button>
                <span>{item.fileNm}</span>
              </Button>
            </Stack>
            ))
            :null}
          </Stack>
          {data.lastSlctnObjcProcessSttus==='신청'?
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
            <CustomButton label={'신청취소'} type={'listBack'} color={'primary'} onClick={applyCancel}/>
          </Stack>
          :null}
          {data?
          <>
          <h3 className="fnt-20 mt-60">심의결과</h3>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginTop:'20px',marginBottom:'10px'}}>
            <h4>심의결과</h4>
            <span>심의일 : {data.dlbrtDe?dayjs(data.dlbrtDe).format('YYYY-MM-DD'):null}</span>
          </Stack>
          <div className="objection_content">
            {data.dlbrtCn}
          </div>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginBottom:'10px'}}>
            <h4>심의결과자료</h4>
            <Stack css={styles.btnDown}>
              <Button onClick={() => downloadAll1()}>
                <span>일괄다운로드</span>
              </Button>
            </Stack>
          </Stack>
          <Stack css={styles.attatchedFile}>
            {data.dlbrtAttachmentFileList ? data.dlbrtAttachmentFileList.map((item:any)=>(
            <Stack css={styles.btnDown}>
              <Button>
                <span>{item.fileNm}</span>
              </Button>
            </Stack>
            ))
            :null}
          </Stack>
          </>
          :null}
          </>
          :null}
        </div>
      </div>
    </Box>
    </div>
  );
}

export default ObjectionDetail;
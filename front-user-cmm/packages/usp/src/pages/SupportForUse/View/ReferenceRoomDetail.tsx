// 공고알림/ -> 자료실 상세페이지
// import React from "react"
import * as styles from '~/styles/styles';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import fetchDownload from '~/fetches/fetchDownload';
import { fetchReferenceRoomDetail } from '~/fetches';
import { useEffect } from "react";
import { CustomButton } from '~/components/ButtonComponents';
import BreadCrumb from '~/components/BreadCrumb';
import { fetchBoardPreNext } from "./../../../fetches/fetchBoard";
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import dayjs from 'dayjs';
import { ModalComponents } from '~/components/ModalComponents';

function ReferenceRoomDetail () {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const receive:any = useLocation();
  // 목록에서 받아온 값 저장
  const [articleId, setArticleId] = useState(receive?.state?.item?.articleId);
  const [data,setData]:any = useState([]);
  const [data1,setData1]:any = useState([]);
  const [boardId] = useState(receive?.state?.item?.boardId);
  const [title] = useState(receive?.state?.articleSrchWord)
  const params = {
    boardId : boardId,
    articleId : articleId,
    posting:true,
    title : title,
  }


  const detailParams = {
    boardId : boardId,
    articleId : articleId,
  }

  const getData = () => {
    fetchReferenceRoomDetail(detailParams).then((res:any) => {
      setData(res);
    }).catch((e)=>{
      setOpen(true);
      setError(e.response.data.message)
    });

  }

  const getPreNext = () => {
    fetchBoardPreNext(params).then((res:any)=>{
      setData1(res);
    }).catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    })
  }
  useEffect(() => {
    getPreNext();
    getData();
  },[articleId])
  
  const attachmentList = data.attachmentList;
  
  const download = async (attachmentId: any) =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${process.env.REACT_APP_REFERENCE_ROOM}/articles/${articleId}/attachments/${attachmentId}`)
    .then()
    .catch((e)=>{
      let status = e.response.status;
      if(status === 400){
        setOpen(true);
        setError("파일이 없습니다.")
        // addModal({
        //   open: true,
        //   content: "파일이 없습니다."
        // })
      }
      });
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
        <Box className="content">
          <Box className="txtbox">
            <h2 className="tit">자료실</h2>
            <p>
              AICA 회원가입 후 이용가능한 사업관리 기능과 실증지원 포털, 데이터 유통 포털  이용을 위한 사용자 매뉴얼을 모아 놓았습니다.<br />
              각 포털사이트에서 사용법을 참고하시면 AICA에서 제공하는 다양한 혜택을 누리실 수 있습니다.
            </p>
          </Box>
        </Box>
      </div>
    </Box>
    <Box css={styles.sub_cont02}>
      <Box className="content">
        {/* 상세 list 리스트 */}
        <div css={styles.detal_list}>
          {/* 텍스트 상단 */}
          <Box css={styles.detal_txtBox}>
            <Typography variant="h5" component="div">
              {data.title}
            </Typography>
            <div className="date">
              <span>조회 <em>{data.readCnt}</em></span>
              <span><em className="ml0">{dayjs(data.updatedDt).format('YYYY-MM-DD')}</em></span>
            </div>
          </Box>
          <Box css={styles.detal_img}>
            {/* {!!articleCnList? articleCnList.map((item:any, idx:number) => (        */}
            <Typography color="text.secondary" className="txt_box">
              {data?.article?.replace(/(?:\r\n|\r|\n)/g, '\r\n')	                        
                        .split('\r\n')
                          .map((item:any) => (
                            <p key={item}>
                              {item}
                            </p>
                  ))}
            </Typography>
            {/* )):null}  */}
          </Box>
          <Box css={styles.box_type}>
          <Stack direction="row" alignItems="center" flexWrap="wrap">
                <strong>첨부파일</strong>
                  {!!attachmentList
                    ? attachmentList.map((item: any,i: number) => (
                <Stack className="flexmo" css={styles.btnDown}>
                        <div key={i}>
                          <Button onClick={() => download(item.attachmentId)}>
                            <span>{item.fileNm}</span>
                          </Button>
                        </div>
                </Stack>
                      ))
                      :  (
                        <div className="filenone">첨부파일 없습니다.</div>
                      )}
              </Stack>
          </Box>
          <div css={styles.bottom_list}>
            {data1.prevArticleId?
            <NavLink to='' onClick={()=>setArticleId(data1.prevArticleId)}>
              <div className="txt01">
                <div className="prev">
                  이전글
                </div>
              </div>
              <div className="txt02">
              {data1.prevTitle}
              </div>
            </NavLink>
                : null}
            {data1.nextArticleId?
            <NavLink to='' onClick={()=>setArticleId(data1.nextArticleId)}>
              <div className="txt01">
                <div className="next">
                  다음글
                </div>
              </div>  
              <div className="txt02">
              {data1.nextTitle}
              </div>
            </NavLink>
                :null}
          </div>
          <Stack direction="row" justifyContent="center" css={styles.btnGroup}>
            <CustomButton label={'목록'} type={'listBack'} color={'outlined'} onClick={() => navigate(-1)}/>
          </Stack>
        </div>
      </Box>
    </Box>
  </div>
);
}


export default ReferenceRoomDetail;

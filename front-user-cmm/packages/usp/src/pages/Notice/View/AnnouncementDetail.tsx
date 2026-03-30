// 공고알림/ -> 공지사항 상세페이지
// import React from "react"
import * as styles from '~/styles/styles';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import dayjs from 'shared/libs/dayjs';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import fetchDownload from '~/fetches/fetchDownload';
import { fetchAnnouncementDetail } from '~/fetches';
import { useEffect } from "react";
import { CustomButton } from '~/components/ButtonComponents';
import { fetchBoardPreNext, fetchImageListGet } from "./../../../fetches/fetchBoard";
import { useGlobalModalStore } from "./../../store/GlobalModalStore";

function AnnouncementDetail () {
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const receive:any = useLocation();
    // 목록에서 받아온 값 저장
    const [articleId, setArticleId] = useState(receive?.state?.item?.articleId);
    const [data,setData]:any = useState([]);
    const [data1,setData1]:any = useState([]);
    const [boardId] = useState(receive?.state?.item?.boardId);
    const [title] = useState(receive?.state?.articleSrchWord)
    const [urlList, setUrl] = useState([]);
    const [attachmentList, setAttachmentList] = useState([]);
    const [articleCnList, setArticleCnList] = useState([]);
    const [imageList, setImageList] = useState([]);
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
      fetchAnnouncementDetail(detailParams).then((res:any) => {
        setData(res);
        setUrl(res.articleUrlList);
        setAttachmentList(res.attachmentList);
        setArticleCnList(res.articleCnList);
        setImageList(res.imageList);
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
      });
    }
    const getPreNext = () => {
      fetchBoardPreNext(params).then((res:any)=>{
        setData1(res);
      })
    }
    const getImageList = () => {
      fetchImageListGet(boardId,articleId).then((res:any) => {
        console.log(res.list)
      })
    }
    useEffect(() => {
      getPreNext();
      getData();
      getImageList();
    },[articleId])
    
            
    const download = async (attachmentId: any) =>{ 
      fetchDownload(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${process.env.REACT_APP_USP_NOTICE}/articles/${articleId}/attachments/${attachmentId}`)
      .then()
      .catch((e)=>{
        let status = e.response.status;
        console.log(status);
        
        if(status === 400){
          // addModal({
          //   open: true,
          //   content: "파일이 없습니다."
          // })
          setOpen(true);
          setError("파일이 없습니다.")
        }
        });
    }
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                공지사항
              </h2>
              <p>
                AICA에서 진행하는 채용공고, 운영과 관련한 안내사항 등을 확인하실
                수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className="content">
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
              {imageList?.map((item:any, i:number) => (
                <div className="img_box" key={i}>
                  <img src={`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${boardId}/articles/${articleId}/images/${item.attachmentId}`}></img>
                </div>
              ))}
              {!!articleCnList? articleCnList.map((item:any, i:number) => (       
              <Typography className="txt_box" key={i}>
                {item.header}
                <br/>
                {item.articleCn.replace(/(?:\r\n|\r|\n)/g, '\r\n')	                        
                      .split('\r\n')
                        .map((item:any) => (
                          <p key={item}>
                            {item}
                          </p>
                ))}
              </Typography>
              )):null} 
            </Box>
            <Box css={styles.box_type}>
              <Stack direction="row" alignItems="center" sx={{ mb: '20px' }}>
                <strong className="noline">관련 사이트 주소</strong>
                <Stack className="flexmo">
                  {!!urlList
                    ? urlList.map((item: any,i: number) => (
                        <div className="link_type" key={i}>
                          <a href={item.url}>{item.url}</a>
                        </div>
                      ))
                    : null}
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <strong>첨부파일</strong>
                  {!!attachmentList
                    ? attachmentList.map((item: any,i: number) => (
                <Stack className="flexmo" css={styles.btnDown} key={i}>
                        <div>
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
              <NavLink to='' onClick={()=>setArticleId(data1.prevArticleId)}>
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
              <CustomButton label={'목록'} type={'listBack'} color={'outlined'} onClick={() => {navigate(-1)}}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default AnnouncementDetail;

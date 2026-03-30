// 참여이벤트/ ->  자원정보공유상세 페이지
// import React from "react"
import * as styles from '~/styles/styles';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import dayjs from 'shared/libs/dayjs';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import fetchDownload from '~/fetches/fetchDownload';
import { fetchAnnouncement, fetchAnnouncementDetail } from '~/fetches';
import { CustomButton } from '~/components/ButtonComponents';
import { fetchBoardPreNext } from "./../../../fetches/fetchBoard";
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import { ModalComponents } from '~/components/ModalComponents';

function ResInfoSharingDetail () {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const receive:any = useLocation();
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
    fetchAnnouncementDetail(detailParams).then((res:any) => {
      setData(res);
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
  useEffect(() => {
    getPreNext();
    getData();
  },[articleId])
  
  // const urlList = data.articleUrlList; 
  const attachmentList = data.attachmentList;
  // const articleCnList = data.articleCnList;
   
    const download = async (attachmentId: any) =>{ 
      fetchDownload(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${process.env.REACT_APP_USP_NOTICE}/articles/${articleId}/attachments/${attachmentId}`)
      .then()
      .catch((e)=>{
        let status = e.response.status;
        console.log(status);
        
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
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                자원정보공유
              </h2>
              <p>
                AI 관련 사업에 대한 업계 소식이나 개선 및 보완이 필요한 부분에 대한 의견을 남겨주세요<br className="pc"/>
                사업이나 프로젝트를 진행하면서 필요한 도움이나 자원에 대한 의견을 남겨 주시면 참고하여 더 나은 사업을 준비하겠습니다
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        {/* 상세 list 리스트 */}
        <div className="content">
          <div css={styles.detal_list}>
            {/* 텍스트 상단 */}
            <Box css={styles.detal_txtBox}>
              <Typography variant="h5" component="div">
                {data.title}
              </Typography>
              <div className="date">
                <span>조회 <em>{data.readCnt}</em></span>
                <span><em className="ml0">{dayjs(data.updatedDt).format('YYYY-MM-DD')}</em></span>
                <span><em className="ml0">{data.updaterNm}</em></span>
                {/* 작성자영역추가 */}
              </div>
            </Box>
            <Box css={styles.detal_img}>
              {/* {!!articleCnList? articleCnList.map((item:any) => (        */}
                <Typography color="text.secondary" className="txt_box">
                  {/* {data.article} */}
                  {data?.article?.replace(/(?:\r\n|\r|\n)/g, '\r\n')	                        
                      .split('\r\n')
                        .map((item:any) => (
                          <p key={item}>
                            {item}
                          </p>
                ))}
                  {/* {item.articleCn} */}
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
            {/* 수정삭제버튼추가 */}
            <Stack direction="row" justifyContent="end" spacing={1} css={styles.fileBtn}>
              <CustomButton label={'삭제'} type={'modalBtn'} color={'outlinedblack'} onClick={() => {navigate(-1)}}/>
              <CustomButton label={'수정'} type={'modalBtn'} color={'outlined'} onClick={() => {navigate(-1)}}/>
            </Stack>
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
              <CustomButton label={'목록'} type={'listBack'} color={'outlined'} onClick={() => {navigate(-1)}}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ResInfoSharingDetail;

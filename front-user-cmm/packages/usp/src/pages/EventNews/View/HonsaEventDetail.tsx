// 참여이벤트/ ->  행사/이벤트상세 페이지
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
import {fetchEventGet } from '~/fetches';
import { CustomButton } from '~/components/ButtonComponents';
import { fetchEventPreNext, fetchGetAttachList } from '~/fetches/fetchEventView';
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import { ModalComponents } from '~/components/ModalComponents';
import {FacebookShareButton} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import kakao_icon from "../../../../public/images/common/kakao_icon_new_min.png";
import facebook_icon from "../../../../public/images/common/pace_icon_new_min.png";
import styled from '@emotion/styled';
const {Kakao} = window;
const currentUrl = window.location.href;
function HonsaEventDetail () {
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");
    const {addModal} = useGlobalModalStore();
    const navigate = useNavigate();
    const receive:any = useLocation();
    console.log(receive)
    const [eventId, setEventId] = useState(receive?.state?.eventId);
    const [platformType] = useState(receive?.state?.platformType)
    const [data,setData]:any = useState();
    const [data1,setData1]:any = useState([]);
    const [attachmentList,setAttachmentList]:any = useState();
    const params = {
      eventId : eventId,
      beginDay : receive?.state?.params?.beginDay || "null",
      endDay : receive?.state?.params?.endDay || "null",
      searchType : receive?.state?.params?.searchType || "null",
      searchCn : receive?.state?.params?.searchCn || "",
      sortType : receive?.state?.params?.sortType || "",
    }

    const getData = () => {
      fetchEventGet(eventId).then((res:any) => {
        setData(res);
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
      });
      fetchGetAttachList(eventId).then((res:any) =>{
        setAttachmentList(res.list);
      })
    }
    const handleKakaoButton = () => {
      Kakao.Link.sendScrap({
        requestUrl: currentUrl.split('?')[0],
      });
    };
    const getPreNext = () => {
      fetchEventPreNext(params).then((res:any)=>{
        setData1(res);
      })
    }
    useEffect(() => {
      getData();
      getPreNext();
    },[eventId])

    const eventCnList = data?.eventCnList;
    
    const download = async (attachmentId: any) =>{ 
      fetchDownload(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${eventId}/attachments/${attachmentId}`)
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
                행사/이벤트
              </h2>
              <p>
                AICA 및 연계기관들이 주관 및 주최하는 각종 행사와 캠페인 소식들을 확인하실 수 있습니다.
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
                {data?.eventNm}
              </Typography>
              <div className="date">
                <span>조회 <em>{data?.readCnt}</em></span>
                <span><em>{dayjs(data?.updatedDt).format('YYYY-MM-DD')}</em></span>
              </div>
            </Box>
            <Box css={styles.detal_img}>
              <div className="img_box" >
                <img src={` ${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${eventId}/image/${platformType}`}></img>
              </div>   
              {!!eventCnList? eventCnList.map((item:any) => (       
            <Typography color="text.secondary" className="txt_box" key={item.eventCnId}>
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
                        <div className="link_type">
                          <a href={data?.url}>{data?.url}</a>
                        </div>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <strong>첨부파일</strong>
                  {attachmentList
                    ? attachmentList.map((item: any,i: number) => (
                <Stack className="flexmo" css={styles.btnDown} key={i}>
                        <div >
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
                <Stack direction="row" justifyContent="end" css={styles.btnMinSns}>
                {/* <Button className="face"></Button> pace_icon_new_min.png */}
                <FacebookShareButton url={currentUrl.split('?')[0]}>
                  <KakaoIcon src={facebook_icon}></KakaoIcon>
                  {/* <FacebookIcon path={facebook_icon} ></FacebookIcon> */}
                </FacebookShareButton>
                {/* <Button className="kakao"></Button> */}
                <KakaoShareButton onClick={handleKakaoButton}>
                  <KakaoIcon src={kakao_icon}></KakaoIcon>
                </KakaoShareButton>
                {/* <Button className="nomal">URL복사</Button> */}
                <CopyToClipboard text={currentUrl.split('?')[0]}>
                  <Button className="nomal">URL복사</Button>
                </CopyToClipboard>
              </Stack>
            </Box>

            <div css={styles.bottom_list}>
              {data1?.prevEventId?
              <NavLink to='' onClick={()=>setEventId(data1?.prevEventId)}>
                <div className="txt01">
                  <div className="prev">
                    이전글
                  </div>
                </div>
                <div className="txt02">
                {data1?.prevEventNm}
                </div>
              </NavLink>
                  : null}
              {data1?.nextEventId?
              <NavLink to='' onClick={()=>setEventId(data1?.nextEventId)}>
                <div className="txt01">
                  <div className="next">
                    다음글
                  </div>
                </div>  
                <div className="txt02">
                {data1?.nextEventNm}
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
const KakaoShareButton = styled.a`
	cursor: pointer;
`;

const KakaoIcon = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 24px;
`;
export default HonsaEventDetail;

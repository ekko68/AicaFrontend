import * as styles from '~/styles/styles';
import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import dayjs from 'shared/libs/dayjs';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import fetchDownload from '~/fetches/fetchDownload';
import {  fetchOneByOneMmt, fetchOneByOneMmtDetail} from '~/fetches';
import { useEffect } from "react";
import { CustomButton } from '~/components/ButtonComponents';
import { Button, Chip } from '@mui/material';
import { useQuery } from 'react-query';
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import { fetchOneByOneFiles } from '~/fetches/fetchQnaQuest';

/* 
  작성일    :   2022/06/01
  화면명    :   마이페이지/ -> 디딤널관리 상세페이지
  회면ID    :   UI-USP-FRN-0360201
  화면/개발 :   Seongeonjoo / navycui
*/
export default function TreadmillMmtDetail () {
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const receive:any = useLocation();
  const [rowNum,setRowNum] = useState(0);
  const [questId, setQuestId] = useState('');
  const [lists,setLists] = useState([]);

  // 상세 조회
  const { data } = useQuery(
    ["getDetail",questId], async () => await fetchOneByOneMmtDetail(questId,'step-flat'));
  
  // 초기화
  useEffect(() => {
    if(!!receive.state){
      setRowNum(receive.state.item.rn)
      setQuestId(receive.state.item.questId)
      setLists(receive.state.lists)
    }
  }, []);
  
  //이전글
  function isPre(element:any){
    if(element.rn === rowNum-1){
      return true;
    }
  }
  const pre:any = lists ? lists.filter(isPre) : [];
  
  //다음글
  function isNext(element:any){
    if(element.rn === rowNum+1){
      return true;
    }
  }
  const next:any = lists ? lists.filter(isNext) : [];

  const download = async (attachmentId: any) =>{
    fetchDownload(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/step-flat/quests/${questId}/attachments/${attachmentId}`)
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
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                디딤널 상세
              </h2>
              <p>
                AICA에 전달하신 의견 및 제안 목록과 답변을 확인하실 수 있습니다.
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
              <Stack direction="row" className='mb10' spacing={1} component="span">
                {!!data ? 
                  <Chip label={
                    data.questSt == 'REQUEST' ? "문의요청" : 
                    data.questSt == 'RECEIPT' ? "문의접수" : 
                    data.questSt == 'ANSWER' ? "답변완료" : 
                    data.questSt == 'CONFIRM' ? "문의확인" : ""
                  } className='blue'/> : ''}
                {
                  data?.categoryCd == 'CATE-STEP-01' 
                  ? <Chip label="창업아이디어" className='wh'/> 
                  : data?.categoryCd == 'CATE-STEP-02' 
                  ? <Chip label="구인/구직" className='wh'/>
                  : <Chip label="제안/기타" className='wh'/>
                }
              </Stack>
              <Typography variant="h5" component="div">
                {data?.title}
              </Typography>
              <div className="date">
                <span><em>{dayjs(!!data ? data.updatedDt : new Date()).format('YYYY-MM-DD')}</em></span>
              </div>
            </Box>
            <Box css={styles.detal_img}>
              {data?.question.replace(/(?:\r\n|\r|\n)/g, '\r\n').split('\r\n').map((item:any) => ( <p>{item} </p>))}
            </Box>
            {/* 답변작성 */}
            <Fragment>
              <Box css={styles.box_type}>
                <Stack direction="row" alignItems="center" flexWrap="wrap">
                  <strong>첨부파일</strong>
                  <Stack className="flexmo" css={styles.btnDown}>
                    {
                      data?.questAttachmentList?.map((item: any,i: number) => (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <div key={i}>
                            <Button onClick={() => download(item.attachmentId)}>
                              <span>{item.fileNm}</span>
                            </Button>
                          </div>
                        ))
                      }
                  </Stack>
                </Stack>
              </Box>
            </Fragment>
            {data?.questSt == 'ANSWER' ? 
              <Box css={styles.qna_box}>
                <dl>
                  <dt>답변</dt>
                  <dd>
                    <div>{!!data ? !!data.answerer ? data.answerer.replace(/(?:\r\n|\r|\n)/g, '\r\n').split('\r\n').map((item:any) => ( <p>{item} </p>)) : '' : ''}</div>
                    <span className="date">
                      <span>{!!data ? !!data.answererNm ? data.answererNm : '' : ''}</span>
                      <span><em>{!!data ? !!data.answerUpdatedDt ? data.answerUpdatedDt : '' : ''}</em></span>
                    </span>
                  </dd>
                </dl>
              </Box>
            : ''}
             {/* 수정삭제버튼추가 */}
             <Stack direction="row" justifyContent="end" spacing={1} css={styles.fileBtn}>
              <CustomButton label={'삭제'} type={'modalBtn'} color={'outlinedblack'} onClick={() => {navigate(-1)}}/>
              <CustomButton label={'수정'} type={'modalBtn'} color={'outlined'} onClick={() => {navigate(-1)}}/>
            </Stack>
            <div css={styles.bottom_list}>
              {Object.keys(pre).length !==0?
              <NavLink to='' onClick={()=>{
                setQuestId(pre[0].questId);
                setRowNum(rowNum-1);
              }}>
                <div className="txt01">
                  <div className="prev">
                    다음글
                  </div>
                </div>
                <div className="txt02">
                {pre[0].title}
                </div>
              </NavLink>
                  : null}
              {Object.keys(next).length !==0?
              <NavLink to='' onClick={()=>{
                setQuestId(next[0].questId);
                setRowNum(rowNum+1);
              }}>
                <div className="txt01">
                  <div className="next">
                    이전글
                  </div>
                </div>  
                <div className="txt02">
                {next[0].title}
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

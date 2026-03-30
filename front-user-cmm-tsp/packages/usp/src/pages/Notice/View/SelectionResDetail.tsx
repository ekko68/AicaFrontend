/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as styles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import fetchDownload from '~/fetches/fetchDownload';
import api from '~/api';
import useSWR from 'swr';
import dayjs from 'shared/libs/dayjs';
import {CustomButton} from '~/components/ButtonComponents';
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
// import { NoticeDataResponse } from '~/models/Model';
/*
  작성일    :   2022/05/07
  화면명    :   공고알림 -> 선정결과공고 -> 공고상세
  화면/개발 :   Seongeonjoo / navycui
*/
function SelectionResDetail() {
  const {addModal} = useGlobalModalStore(); 
  const navigate = useNavigate();
  const receive: any = useLocation();
  // 목록에서 받아온 값 저장
  const boardId = receive.state.item.boardId;
  const [articleId, setArticleId] = useState(receive.state.item.articleId);
  const [rn, setRn] = useState(receive.state.item.rn);
  const { item, listItem } = receive.state;

  const list = receive.state.allList;

  //상세페이지 데이터 가져오기
  const fetcher = (url: string) =>
    api({
      method: 'get',
      url,
    });

  const { data } = useSWR(
    [`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${boardId}/articles/${articleId}`],
    fetcher
  );

  if (!data) return <div>loading...</div>;

  console.log(data, 'ddddddd');
  console.log(item, 'iiiiiii');

  const attachmentList = data.attachmentList;

  console.log(attachmentList);
  //이전글
  const goPre = () => {
    function isPre(element: any) {
      if (element.rn === rn - 1) {
        return true;
      }
    }
    const pre = list.filter(isPre);
    setArticleId(pre[0].articleId);
    setRn(rn - 1);
  };

  //다음글
  const goNext = () => {
    function isNext(element: any) {
      if (element.rn === rn + 1) {
        return true;
      }
    }
    const pre = list.filter(isNext);
    setArticleId(pre[0].articleId);
    setRn(rn + 1);
  };

  //다운로드
  const download = async (attachmentId: any) =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${boardId}/articles/${articleId}/attachments/${attachmentId}`)
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

  //다운로드 박스
  const DownloadBox = () => {
    return (
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
    );
  }
  // PageNation Boxlist
  const PageNation = () => {
    return (
      <div css={styles.bottom_list}>
        <a onClick={goPre}>
          <div className="txt01">
            {rn > 1 ? (
              <div className="prev" >
                이전글
              </div>
            ) : null}
          </div>
          <div className="txt02">2021년도 AI 융합대학 지원사업 공고</div>
        </a>
        <a onClick={goNext}>
          <div className="txt01">
            {receive.state.allList.length > rn ? (
              <div className="next" >
                다음글
              </div>
            ) : null}
          </div>
          <div className="txt02">
            2021년도 AI 펀드 투자지원 및 AI 파트너십 데이(IR) 참여기업 모집
            공고
          </div>
        </a>
      </div>
    );
  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">선정결과공고</h2>
              <p>지원하신 사업에 대한 선정결과를 확인하실 수 있습니다.</p>
            </div>
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            className="bottom_card"
          >
            <p>인공지능산업융합사업단 공고 제2021-50호</p>
            <Stack direction="row" className="tag" spacing={1}>
              {item.rn ? (
                <Chip label={'마감 D-' + item.rn} className="wh" />
              ) : (
                
                <Chip label={'공고종료'} className="blue" />
              )}
            </Stack>
          </Stack>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className="content">
          {/* 상세 list 리스트 */}
          <div css={styles.detal_list}>
            {/* 텍스트 상단 */}
            <Box css={styles.detal_txtBox}>
              <Typography variant="h5" component="div">
                2021년도 글로벌 AI 제품·서비스 고도화 지원 최종 선정업체
              </Typography>
              <div className="text01">
                금번 지원사업에 참여해주신 기업 관계자분들께 깊은 감사의 말씀을
                드리며 최종 선정기업을 아래와 같이 공지합니다.
              </div>
              <p>
                {' '}
                {dayjs(item.rceptEndde).format('YYYY년')}{' '}
                {dayjs(item.rceptEndde).format('MM월')}{' '}
                {dayjs(item.rceptEndde).format('DD일')}
              </p>
              <p className="bold">인공지능산업융합사업단장</p>
            </Box>
            <Box css={styles.table01}>
              <table>
                <colgroup></colgroup>
                <tbody>
                  <tr>
                    <th>관련 모집공고</th>
                    <td>2021년 글로벌 AI 제품·서비스 고도화 지원 사업 공고</td>
                  </tr>
                  <tr>
                    <th>담당부서</th>
                    <td>{'/'}</td>
                    <th>담당자</th>
                    <td>{'홍길덩'}</td>
                  </tr>
                </tbody>
              </table>
            </Box>
            <Box css={styles.text_list01}>
              <dl>
                <dt>{'선정업체'}</dt>
                <dd>
                  <Box css={styles.table_02}>
                    <table>
                      <tbody>
                        <tr>
                          <th>번호</th>
                          <th>접수번호</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>12345</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>12345</td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </dd>
              </dl>
              <dl>
                <dt>{'선정안내'}</dt>
                <dd>
                  {
                    '인공지능산업융합사업단에서는 2021년도 글로벌 AI 제품·서비스 고도화 지원 최종 선정내용을 위와 같이 공고합니다.'
                  }
                </dd>
              </dl>
              <dl>
                <dt>{'향후계획'}</dt>
                <dd>{'- 사업 수행계획 보완 및 협약체결 : 추후 개별안내'}</dd>
                <dd>{'- 이의신청 : 선정결과 통보일로부터 10일 이내'}</dd>
              </dl>
            </Box>
            <DownloadBox/>
            <PageNation/>
            <Stack direction="row" justifyContent="center" css={styles.btnGroup}>
              <CustomButton label={'목록'} type={'small'} onClick={()=>navigate(-1)}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}
export default SelectionResDetail;

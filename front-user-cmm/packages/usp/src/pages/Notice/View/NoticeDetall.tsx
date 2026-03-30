import React, {useState, useEffect, Fragment} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import * as styles from '~/styles/styles';
import dayjs from 'shared/libs/dayjs';
import BreadCrumb from '~/components/BreadCrumb';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {Typography} from '@mui/material';
import fetchFileDownLoad from '~/fetches/fetchDownload';
import {FacebookShareButton} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
import kakao_icon from "../../../../public/images/common/kakao_icon_new_min.png";
import facebook_icon from "../../../../public/images/common/pace_icon_new_min.png";
import styled from '@emotion/styled';
import {useGlobalModalStore} from '~/pages/store/GlobalModalStore';
import {useQuery} from 'react-query';
import {detailType} from '../NoticeModel';
import {fetchNoticeDetall} from '~/fetches';

/*
  작성일    :   2022/05/07
  화면명    :   공고알림 -> 모집공고 -> 공고상세
  화면/개발 :   Seongeonjoo / navycui
*/
const {Kakao} = window;
const currentUrl = window.location.href;

const NoticeDetall = () => {

  const navigate = useNavigate();
  const {addModal} = useGlobalModalStore();
  const [isView,setIsView] = useState(false);
  const [pblancId, setPblancId] = useState<string>(currentUrl.split('?')[0].split('/')[5]);

  const [params, setParams] = useState<detailType>({
    pblancId: pblancId,
    ordtmRcrit: true,
    pblancSttus: '',
    applyMberType: '',
    recomendCl: '',
    sortOrder: ''
  })

  const {
    data,
    refetch
  } = useQuery("fetchNoticeDetall", async () => await fetchNoticeDetall(params), {
    onError: (err: any) => {
      addModal({
        open: true,
        content: err.response.data.message,
        onConfirm: () => {
          navigate('/Notice/Notice')
        },
        onClose: () => {
          navigate('/Notice/Notice')
        }
      })
    }
  });

  //화면초기 렌드링 실행
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init('d8630bd87de60999c46bded08b4d6bd1');
    }
  }, []);

  useEffect(() => {
    refetch()
  }, [params]);

  const handleKakaoButton = () => {
    Kakao.Link.sendScrap({
      requestUrl: currentUrl.split('?')[0],
    });
  };

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">모집공고</h2>
              <p>
                AICA에서 진행하는 사업 공고를 확인하고 신청할 수 있습니다.
                <br/>
                사업 신청 전에 신청 대상, 사전준비자료, 사업안내서 등을 <br className="mo"/>충분히
                숙지하시고 신청을 진행하시기 바랍니다.
              </p>
            </div>
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            className="bottom_card"
          >
            <p>인공지능산업융합사업단 공고 제 {!!data ? data.data.pblancNo : ''} 호</p>
            <Stack direction="row" className="tag" spacing={1}>
              {!!data ? data.data.rmndrDay > 1 ?
                <Chip label={'모집중'} className="blue"/>
                : data.data.rmndrDay = 1 ? <Chip label={'오늘마감'} className="wh"/> :
                  <Chip label={'마감'} className="wh"/> : null
              }
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
                {!!data ? data.data.pblancNm : ''}
                <br/>
              </Typography>
              <div className="text01">
                {!!data ? data.data.pblancSumry : ''}
                <br/>
              </div>
              <p className="date_text">
                {!!data ? !!data.data.pblancDay ?
                  dayjs(data.data.pblancDay).format('YYYY년MM월DD일')
                  :
                  '' : ''
                }
              </p>
              <p className="company_text">인공지능산업융합사업단장</p>
            </Box>
            <Box css={styles.table01}>
              <table>
                <colgroup></colgroup>
                <tbody>
                  <tr>
                    <th>사업분야</th>
                    <td>
                      {!!data ? data.data.recomendCl.split('/')[0] : ''}
                    </td>
                    <th>모집유형</th>
                    <td>{!!data ?  data.data.ordtmRcrit ? '상시모집' : '상시모집' : '상시모집'}</td>
                  </tr>
                  <tr>
                    <th>사업기간</th>
                    <td>{!!data ? data.data.bsnsPd : ''}</td>
                    <th>사업규모</th>
                    <td>총 {!!data ?  data.data.bsnsScale : ''}백만원 </td>
                  </tr>
                  <tr>
                    <th>선정규모</th>
                    <td>{!!data ?  data.data.slctnScale : ''} 업체(명) 내외</td>
                    <th>모집대상</th>
                    <td>{!!data ?  data.data.applyMberType : ''}</td>
                  </tr>
                  <tr>
                    <th>접수기간</th>
                    <td className="blue">{!!data ? data.data.rceptPd : ''}</td>
                    <th>접수 마감시간</th>
                    <td className="blue">{!!data ? data.data.rceptClosingHm : ''}</td>
                  </tr>
                  <tr>
                    <th>담당부서</th>
                    <td className="blue">{!!data ? data.data.chrgDeptNm : ''}</td>
                    <th>담당자</th>
                    <td className="blue">
                      {' '}
                      {!!data ? data.data.memberNm : ''} {!!data ? data.data.positionNm : ''} {!!data ? data.data.email : ''} /{' '}
                      {!!data ? data.data.telNo : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
            <Box css={styles.text_list01}>
              {!!data ? data.data.detailList.map((item: any, i: number) => (
                <dl key={i}>
                  <dt>{item.sj}</dt>
                  <dd>
                    {item.detailCn.split("\r\n").map((m: string, k: number) => {
                      return (
                        <Fragment key={k}>
                          {m}<br/>
                        </Fragment>
                      )
                    })}
                  </dd>
                </dl>
              )) : null
              }
            </Box>
            <Box css={styles.box_type}>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <strong>첨부파일</strong>
                <Stack className="flexmo" css={styles.btnDown}>
                  {!!data ? data.data.fileList.length > 0 ?
                      data.data.fileList.map((fl: any, i: number) => (
                        <Button
                          key={i}
                          onClick={() =>
                            fetchFileDownLoad(
                              `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${data.data.pblancId}/atchmnfl/${fl.attachmentId}`
                            )
                          }
                        >
                          {fl.fileNm}
                        </Button>
                      ))
                      :
                      <div className="filenone">첨부파일 없습니다.</div>
                    : <div className="filenone">첨부파일 없습니다.</div>}
                </Stack>
              </Stack>
            </Box>
            <Stack direction="row" justifyContent="center" css={styles.btnGroup} className="mt20">
              <Button className={isView ? "blind" : "blue02"} disabled={isView} onClick={() => {
                navigate(`/biz/BusinessAppMgt/BusinessApp/${pblancId}`, {
                  state: {
                    pblancId: pblancId,
                    pblancNm: data.data.pblancNm
                  }
                });
              }}>
                사업 신청
              </Button>
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
            {!!data ? (
              <div css={styles.bottom_list}>
                {!!data.data.prePblancId ? (
                  <NavLink to='' onClick={() => setParams((pre) => ({...pre, pblancId: data.data.prePblancId}))}>
                    <div className="prev"></div>
                    <div className="txt01">이전글</div>
                    <div className="txt02"> {data.data.prePblancNm} </div>
                  </NavLink>
                ) : null}
                {!!data.data.nextPblancId ? (
                  <NavLink to='' onClick={() => setParams((pre) => ({...pre, pblancId: data.data.nextPblancId}))}>
                    <div className="next"></div>
                    <div className="txt01">다음글</div>
                    <div className="txt02"> {data.data.nextPblancNm}</div>
                  </NavLink>
                ) : null}
              </div>
            ) : null}
            <Stack direction="row" justifyContent="center" css={styles.btnGroup}>
              <Button className="linebtn mini" onClick={() => navigate('/Notice/Notice')}>
                목록
              </Button>
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
export default NoticeDetall;

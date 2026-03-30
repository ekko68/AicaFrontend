// 공고알림/ -> 공지사항 상세페이지
// import React from "react"
import * as styles from '~/styles/styles';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import dayjs from 'shared/libs/dayjs';
import {useNavigate, useLocation, NavLink } from 'react-router-dom';
import fetchDownload from '~/fetches/fetchDownload';
import { fetchAnnouncementSelectionResDetail } from '~/fetches';
import { useEffect } from "react";
import BreadCrumb from '~/components/BreadCrumb';
import {CustomButton} from '~/components/ButtonComponents';
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import { ModalComponents } from '~/components/ModalComponents';

function AnnouncementSelectionResDetail () {
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");
    const {addModal} = useGlobalModalStore(); 
    const navigate = useNavigate();
    const receive:any = useLocation();
    // 목록에서 받아온 값 저장
    const [pblancId, setPblancId] = useState(receive.state.slctnPblancId);
    const [data,setData]:any = useState([]);

    const getData = () => {
      fetchAnnouncementSelectionResDetail(pblancId).then((res:any) => {
        setData(res);
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
      });
      // .catch((e)=>{
      //   let message = e.response.data.message;
      //   addModal({
      //     open:true,
      //     content:message
      //   })
      // })
    }
    useEffect(() => {
      getData();
    },[pblancId])

    console.log(data)

    const fileList = data.fileList;
    const slctnList = data.slctnList;
    const detailList = data.detailList;

    const download = async (attachmentId: any) =>{ 
      fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-pblanc/${pblancId}/atchmnfl/${attachmentId}`)      
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
              {!(Array.isArray(fileList) && fileList.length === 0)
                ? fileList?.map((item: any) => (
                  <Stack className="flexmo" css={styles.btnDown}>
                    <div key={item.attachmentId}>
                      <Button onClick={() => download(item.attachmentId)}>
                        <span>{item.attachmentNm}</span>
                      </Button>
                    </div>
                  </Stack>
                  ))
                : (
                  <div className="filenone">첨부파일 없습니다.</div>
                )}
          </Stack>
        </Box>
    );
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
              <p>인공지능산업융합사업단 공고 제{data.slctnPblancNo}호</p>
            </Stack>
          </div>
        </Box>
        <Box css={styles.sub_cont02}>
          <Box className="content">
            {/* 상세 list 리스트 */}
            <div css={styles.detal_list}>
              {/* 텍스트 상단 */}
              <Box css={styles.detal_txtBox}>
                <Typography variant="h5" component="div">
                  {data.slctnPblancNm}
                </Typography>
                <div className="text01">
                {data.slctnPblancSumry}
                </div>
                <p>
                  {' '}
                  {dayjs(data.slctnPblancDay).format('YYYY년')}{' '}
                  {dayjs(data.slctnPblancDay).format('MM월')}{' '}
                  {dayjs(data.slctnPblancDay).format('DD일')}
                </p>
                <p className="mid">인공지능산업융합사업단장</p>
              </Box>
              <Box css={styles.table01}>
                <table>
                  <colgroup></colgroup>
                  <tbody>
                    <tr>
                      <th>관련 모집공고</th>
                      <td>{data.pblancNm}</td>
                    </tr>
                    <tr>
                      <th>담당부서</th>
                      <td>{data.chrgDeptNm}</td>
                      <th>담당자</th>
                      <td>{data.memberNm}{data.positionNm} {data.email} / {data.telNo}</td>
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
                          {!!slctnList?slctnList.map((item:any, i:number) => (
                          <tr key={i}>
                            <td>{item.rn}</td>
                            <td>{item.receiptNo}</td>
                          </tr>
                          )):null}
                        </tbody>
                      </table>
                    </Box>
                  </dd>
                </dl>
                {!!detailList?detailList.map((item:any, i:number) => (
                  <dl key={i}>
                    <dt>
                    {item.sj}
                    </dt>
                    <dd>
                    {item.detailCn}
                    </dd>
                  </dl>
                )):null}
              </Box>
              <DownloadBox/>
              <div css={styles.bottom_list}>
                {data.preSlctnPblancId!=null? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <NavLink to='' onClick={()=>setPblancId(data.preSlctnPblancId)}>
                  <div className="txt01">
                  <div className="prev">
                    이전글
                  </div>
                  </div>
                  <div className="txt02">{data.preSlctnPblancNm}</div>
                </NavLink>
                    ) : null}
                    {data.nextSlctnPblancId!=null ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <NavLink to='' onClick={()=>setPblancId(data.nextSlctnPblancId)}>
                  <div className="txt01">
                  <div className="next">
                    다음글
                  </div>
                  </div>
                  <div className="txt02">
                    {data.nextSlctnPblancNm}
                  </div>
                </NavLink>
                    ) : null}
              </div>
              <Stack direction="row" justifyContent="center" css={styles.btnGroup}>
                <CustomButton label={'목록'} type={'listBack'} color={'outlined'} onClick={()=>navigate(-1)}/>
              </Stack>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default AnnouncementSelectionResDetail;
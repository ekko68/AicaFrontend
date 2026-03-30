// 사업단소개/ ->  사업단소개 페이지
//import { useState } from 'react';
import React from "react"
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, Typography, Grid, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { fetchMvnFcDetail } from "~/fetches/fetchMvnFc";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ModalComponents } from "~/components/ModalComponents";

// const facilitiesSwiper = {
//   navigation : true,
//   spaceBetween: 10,
//   speed: 600, 
//   pagination : false,
//   observer: true,
//   observeParents: true
// }

function IntroductionBusGroupDetail() {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  const [data,setData]:any = useState();
  const mvnFcId:string = receive.state.item.mvnFcId;
  const getData = () => {
    fetchMvnFcDetail(mvnFcId).then((res:any)=>{
      setData(res);
    }).catch((e)=>{
      setOpen(true);
      setError(e.response.data.message)
    });
  }

  useEffect(()=>{
    getData();
  },[])
  // console.log(data);
  // console.log(receive.state.item);
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
              <h2 className="tit">시설 예약</h2>
              <p>입주기업은 물론 누구나<br className="mo" /> 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom:0}}>
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="h4">{data?.bnoNm+" "+data?.mvnFcNm}</Typography>
            </Stack>
            <Grid container columnSpacing={2.5} style={{marginTop:'-20px'}}>
            <Grid item xs={12} md={6}>
                <Box>
                {/* <Swiper {...facilitiesSwiper} css={styles.swiper}> */}
                    {/* <SwiperSlide>  */}
                      <img src={`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/facilities/${data?.mvnFcId}/image`} style={{width:620,height:428}} alt={data?.imageAltCn} />
                    {/* </SwiperSlide> */}
                    {/* <SwiperSlide>
                      <img src="/images/subpage/air_view.png" style={{width:620,height:428}} alt='회의실명1' />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/images/subpage/air_view.png" style={{width:620,height:428}} alt='회의실명3' />
                    </SwiperSlide> */}
                  {/* </Swiper> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={6} css={styles.facilityIntro}>
                <h4>시설소개</h4>
                <table className="tableDefault type4">
                    <colgroup>
                    <col style={{width:'30%'}} />
                    <col style={{width:'70%'}} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>위치</th>
                        <td>광주광역시 북구 첨단과기로 176번길 11 {data?.bnoNm+" "+data?.mvnFcNm}</td>
                      </tr>
                      <tr>
                        <th>예약유형</th>
                        <td>{data?.reserveTypeNm}</td>
                      </tr>
                      <tr>
                        <th>시설구분</th>
                        <td>{data?.mvnFcDtypeNm}</td>
                      </tr>
                      <tr>
                        <th>수용인원</th>
                        <td>최대{data?.mvnFcCapacity}명</td>
                      </tr>
                      <tr>
                        <th>이용가능시간</th>
                        <td>{data?.utztnBeginHh+"~"+data?.utztnEndHh}시</td>
                      </tr>
                      <tr>
                        <th>주요시설</th>
                        <td>{data?.mainFc}</td>
                      </tr><tr>
                        <th>문의</th>
                        <td>062-123-1234 (사업지원팀)</td>
                      </tr>
                    </tbody>
                  </table>
              </Grid>
            </Grid>
            <Stack justifyContent={'center'} direction={'row'} spacing={'10px'}>
              <NavLink to={`/Community/ReservationOne/${data?.mvnFcId}`} 
                state={{data:data}}
              >
              <Button variant="contained" className="search_btn">예약신청</Button>
              </NavLink>
            </Stack>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default IntroductionBusGroupDetail;

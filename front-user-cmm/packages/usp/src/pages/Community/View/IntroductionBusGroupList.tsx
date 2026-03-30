/* eslint-disable jsx-a11y/alt-text */
import * as styles from '../styles';
import React from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { NavLink } from 'react-router-dom';
import { CustomButton } from '~/components/ButtonComponents';
import { Stack, Typography, Grid, Box, List, Card, CardActionArea, CardContent, CardMedia, Chip } from '@mui/material';
import NoData from '~/components/Loading/NoData';
import { useState } from "react";
import { useEffect } from "react";
/*
    컴포넌트: IntroductionBusGroupList
    개발자  : seok
    작성실  : 202205255
*/
interface ListItemProps{
    img_url: any;
    title: string;
    alt : any;
    ongoing? : boolean;
  }
  
function ListItem(props: ListItemProps){
    const {title, alt, ongoing } = props;
    const [img_url,setUrl] = useState(props.img_url);
    const onErrorImg = () => {
      setUrl('/images/subpage/temp_facility_01.png')
    }
    return(
      <div>
        {ongoing ? <div className="ongoing">진행중</div> :''}
        <img src={img_url} alt={alt} onError={onErrorImg}/>
        <Typography variant="h6" component="p" fontWeight={600} mt={2.5} sx={{letterSpacing:-0.8}}>{title}</Typography>
      </div>
    )
}
export const IntroductionBusGroupList: React.FC<{
  value:number;
  list:never[];
  total:number;
  itemsPerPage: number;
  moreInfo:any;
}> = props => {
  const head = (value:number) =>{
    if(value===0){
      return "전체"
    }else if(value===1){
      return "회의실"
    }else if(value===2){
      return "강의실"
    }else if(value===3){
      return "헬스장"
    }else if(value===4){
      return "수면실"
    }else if(value===5){
      return "상담실"
    }else if(value===6){
      return "홈부스"
    }    
  }
    return ( 
            <Box >
              <Stack spacing={6} direction="column" className="sub_tit">
                <Typography variant="h4" component="div">
                  {head(props.value)}<span className='case'><span>{props.total}</span>건</span>
                </Typography>
              </Stack>
              <Grid container columnSpacing={2.5} rowSpacing={7.5}>
                {props.list.map((item:any, i:number) => (
                  <Grid item xs={3}>
                    <NavLink to={`/Community/IntroductionBusGroup/${item.mvnFcId}`}
                      key={i}
                      state={{ item:item}}>
                    <ListItem img_url={`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/facilities/${item.mvnFcId}/image`} alt={item.imageAltCn} title={item.bnoNm+" "+item.mvnFcNm} />
                    </NavLink>  
                  </Grid>
                    ))}
              </Grid>
              {(props.itemsPerPage)<props.total?
                <Stack css={styles.bottom_btn} style={{ margin: '60px 0 0' }}>
                  <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>props.moreInfo()}/>
                </Stack>
              : null}
            </Box>
    );
}
  // Swiper   //loop : true,

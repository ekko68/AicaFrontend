/* eslint-disable jsx-a11y/alt-text */
import * as styles from '~/styles/styles';
import React from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { NavLink } from 'react-router-dom';
import { CustomButton } from '~/components/ButtonComponents';
import NoData from '~/components/Loading/NoData';
import { Box, Stack, Typography, List, ListItem, ListItemText } from '@mui/material';
/*
    컴포넌트: FrequentlyAskedQuestionsList
    개발자  : seok
    작성실  : 202205255
*/
export const FrequentlyAskedQuestionsList: React.FC<{
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
      return "지원/신청"
    }else if(value===2){
      return "시설/운영"
    }else if(value===3){
      return "가입/변경"
    }else if(value===4){
      return "기타"
    }    
  }
  const checkCategoryCd = (categoryCd : string) =>{
    if(categoryCd==="CATE-QNA-01"){
      return "지원/신청"
    }else if(categoryCd==="CATE-QNA-02"){
      return "시설/운영"
    }else if(categoryCd==="CATE-QNA-03"){
      return "가입/변경"
    }else if(categoryCd==="CATE-QNA-04"){
      return "기타"
    }
  }
    return ( 
      <Box css={styles.sub_cont02}>
        <div className="content list">
          {/* 상세 list 리스트 */}
          <div css={styles.qna_list}>
            <Stack
              spacing={6}
              direction="row"
              className="sub_tit"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div">
                {head(props.value)}<span className='data'><em>{props.total}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {props.list.length > 0 ? props.list.map((item : any , i:number) => (
              <NavLink to={`/SupportForUse/FrequentlyAskedQuestions/${item.articleId}`} 
              key={i}
              state={{ item:item ,
              total:props.total}}>
                <ListItem style={item.notice?{backgroundColor:'#f5f5f5'}:{}}>
                  <ListItemText 
                    secondary={
                      <React.Fragment>
                        <Stack className="tit_body" component="span">
                          <Typography variant="body1" component="span">
                            {checkCategoryCd(item.categoryCd)}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >{item.title}
                            </Typography>
                          </Stack>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </NavLink>
            )): <NoData/>}
            </List>
            {(props.itemsPerPage)<props.total?
            // 더보기
            <Stack css={styles.bottom_btn}>
              <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>props.moreInfo()} />
            </Stack>
            :null}
          </div>      
        </div>
      </Box>
    );
}
  // Swiper   //loop : true,
  SwiperCore.use([Navigation,Autoplay,Pagination]);

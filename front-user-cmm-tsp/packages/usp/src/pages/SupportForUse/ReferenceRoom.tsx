import React, { useEffect, useState,useRef, useCallback  } from 'react';
import * as styles from '~/styles/styles';
import {fetchReferenceRoom} from '~/fetches';
import dayjs from 'shared/libs/dayjs';
import { NavLink } from 'react-router-dom';
import BreadCrumb from '~/components/BreadCrumb';
import { CustomButton } from '~/components/ButtonComponents';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import NoData from '~/components/Loading/NoData';
import { Box, Stack, Typography, List, ListItem, ListItemText, Chip, useTheme, useMediaQuery } from '@mui/material';
import { useGlobalScroll, useScroll } from '../store/GlobalModalStore';

/*
  // 이용지원/ ->  자료실 페이지
*/
function ReferenceRoom() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const today = new Date();
  today.setHours(today.getHours()-24);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [params, setParams] = useState({
    categoryCd : "",
    articleSrchCd : "",
    articleSrchWord : "",
    page : 1,
    itemsPerPage : 10,
  })
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [articleSrchCd, setArticleSrchCd] = useState("");
  const [articleSrchWord, setArticleSrchWord] = useState("");

  useEffect(() => {
    setArticleSrchCd(params.articleSrchCd)
    setArticleSrchWord(params.articleSrchWord)
  },[params.articleSrchCd,params.articleSrchWord])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  //처음 세팅
  const getList = () =>{
    fetchReferenceRoom(params).then((res:any) => {
      setList(res.list);
      setTotal(res.totalItems);
    })
  }

  useEffect(()=>{
    getList()
  },[params])

  const moreInfo = () =>{
    const itemsPerPage:any = params.itemsPerPage +10;
    setParams((state)=>({...state,itemsPerPage}));
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
  console.log(list)
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component='div' ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                자료실
              </h2>
              <p>
                AICA에서 진행하는 채용공고, 운영과 관련한 안내사항 등을 확인하실
                수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              selectData={[{codeNm:"전체" , code:""},{codeNm:"제목", code:"TITLE"},{codeNm:"내용",code:"CONTENT"}]}
              placehold='어떤 자료를 찾고 계신가요?'
              handleSearch={(searchInput:string,sel:string)=>{
                setParams((state) => ({ ...state, articleSrchCd:sel ,articleSrchWord:searchInput}))
              }}
            />
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className="content list">
          {/* 상세 list 리스트 */}
          <div css={styles.detal_list}>
            <Stack
              spacing={6}
              direction="row"
              className="sub_tit"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div">
                자료실
                <span className='data'><em>{total}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {list.length > 0 ? list.map((item : any , i:number) => (
              <NavLink to={`/SupportForUse/ReferenceRoom/${item.articleId}`} 
              key={i}
              state={{ item:item ,
              total:total,
              articleSrchCd:articleSrchCd,
              articleSrchWord:articleSrchWord}}>
                <ListItem style={item.notice?{backgroundColor:'#f5f5f5'}:{}}>
                  <ListItemText
                    secondary={
                    <React.Fragment>
                      <span className="tit_body">
                        {/* <Stack direction="row" className='tag' spacing={1} component="span">
                          <Chip label={checkCategoryCd(item.categoryCd)} className='item' sx={{mr: 1}} component="span"/>
                        </Stack> */}
                        <Typography variant="body1" component="span" className="mb0">
                          {item.title}
                        </Typography>
                        <Stack direction="row" className='tag' spacing={1} component="span">
                          {/* new아이콘 24시간 이내인 경우만 */}
                          {today<item.createdDt?<Chip label="NEW" className='new' sx={{ml: 1}} component="span"/>:null}
                        </Stack>
                        {/* <Stack direction="row" className='tag' spacing={1} component="span">
                          <Chip label={checkCategoryCd(item.categoryCd)} className='item' sx={{mr: 1}} component="span"/>
                        </Stack> */}
                      </span>
                        <span className="date">
                          <span>조회 <em>{item.readCnt}</em></span>
                          <span><em>{dayjs(item.createdDt).format('YYYY-MM-DD')}</em></span>
                        </span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </NavLink>
            )) : <NoData/>}
            </List>
            {(params.itemsPerPage)<total?
            // 더보기
            <Stack css={styles.bottom_btn} >
              <CustomButton label={'더보기'} type={'full'} color={'item'} style={{ margin: '10px 0' }} onClick={()=>moreInfo()} />
            </Stack>
                :null}
          </div>      
        </div>
      </Box>
    </div>

  );
}

export default ReferenceRoom;

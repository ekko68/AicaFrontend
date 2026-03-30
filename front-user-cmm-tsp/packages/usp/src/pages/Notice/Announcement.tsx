// 공고알림/ -> 공지사항 페이지
// import React from "react"
import * as styles from '~/styles/styles';
import React, { useEffect, useState, useCallback  } from 'react';
import dayjs from 'shared/libs/dayjs';
import { NavLink } from 'react-router-dom';
import { fetchAnnouncement} from '~/fetches';
import { CustomButton } from '~/components/ButtonComponents';
import BreadCrumb from '~/components/BreadCrumb';
import { useGlobalModalStore, useScroll } from '../store/GlobalModalStore';
import { SearchBar } from '~/components/BizCommon/SearchBar';
import { Box, Stack, Typography, List, ListItem, ListItemText, Chip, useMediaQuery, useTheme } from '@mui/material';
import NoData from '~/components/Loading/NoData';

function Announcement() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const {addModal} = useGlobalModalStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const today = new Date();
  today.setHours(today.getHours()-24);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [srchCd, setSrchCd] = useState("");
  const [srchWord, setSrchWord] = useState("")

  const [params, setParams] = useState({
    boardId : process.env.REACT_APP_USP_NOTICE ? process.env.REACT_APP_USP_NOTICE : '',
    posting : true,
    articleSrchCd : "",
    articleSrchWord : "",
    page : 1,
    itemsPerPage : 10,
  })

  
  useEffect(() => {
    setSrchCd(params.articleSrchCd)
    setSrchWord(params.articleSrchWord)
  },[params.articleSrchCd,params.articleSrchWord])
  //처음 세팅
  console.log(params.page, 'aaaaa');
  const getList = () => {
    fetchAnnouncement(params).then((res:any) => {
        setList(res.list);
        setTotal(res.totalItems);
      }).catch((e)=>{
        let message = e.response.data.message;
        addModal({
          open: true,
          content: message
        })
      })
    }

  useEffect(() => {
    getList();
  },[params])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);
  
  const moreInfo = () => {
    const itemsPerPage:any = params.itemsPerPage + 10;
    setParams((state) => ({ ...state, itemsPerPage }));
  }

  console.log(list)
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={scrollY ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">
                공지사항
              </h2>
              <p>
                AICA에서 진행하는 채용공고, 운영과 관련한 안내사항 등을 확인하실
                수 있습니다.
              </p>
            </div>
            <SearchBar
              placehold='어떤 공지사항을 찾고 계신가요?'
              handleSearch={(val:any)=>{
                setParams((state) => ({ ...state, articleSrchWord:val }))
            }}/>
            {/* <SelectSearchBar
              selectData={[{codeNm:"전체" , code:""},{codeNm:"제목", code:"TITLE"},{codeNm:"내용",code:"CONTENT"}]}
              placehold='어떤 공지사항을 찾고 계신가요?'
              handleSearch={(searchInput:string,sel:string)=>{
                setParams((state) => ({ ...state, articleSrchCd:sel ,articleSrchWord:searchInput}))
              }}
            /> */}
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
                공지사항
                <span className='data'><em>{total}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {list.length > 0 ? list.map((item : any , i:number) => (
              <>
              <NavLink to={`/AnnouncementDetail/${item.articleId}`} 
                key={i}
                state={{ item:item ,
                articleSrchCd:srchCd,
                articleSrchWord:srchWord}}>
                  {/* 공지글 일반글 나누는 코드 */}
                <ListItem style={item.notice?{backgroundColor:'#f5f5f5'}:{}}>
                  <ListItemText 
                    secondary={
                    <React.Fragment>
                      <span className="tit_body">
                        <Typography variant="body1" component="span">
                          {item.title}
                        </Typography>
                        <Stack direction="row" className='tag' spacing={1} component="span" >
                          {/* new아이콘 24시간 이내인 경우만 */}
                          {today<item.createdDt?<Chip label="NEW" className='new' sx={{ml: 1}}component="span"/>:null}
                        </Stack>
                      </span>
                      <Typography
                        component="span"
                        variant="body2"
                        className="body2 ellipsis"
                        color="text.primary"
                      >
                          {item.article}<br/>
                        </Typography>
                        <span className="date">
                          <span>조회 <em>{item.readCnt}</em></span>
                          <span><em className="ml0">{dayjs(item.createdDt).format('YYYY-MM-DD')}</em></span>
                        </span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </NavLink>
              </>
            )) : 
              <NoData/>
            }
            </List>
            {(params.itemsPerPage)<total?
            // 더보기
            <Stack css={styles.bottom_btn} >
              <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>moreInfo()} />
            </Stack>
            :null}
          </div>      
        </div>
      </Box>
    </div>
  );
}

export default Announcement;

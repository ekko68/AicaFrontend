import { Box, Stack, Typography, List, ListItem, ListItemText, Chip, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState,useRef, useCallback  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authentication from 'shared/authentication';
import * as styles from '~/styles/styles';
import { fetchAnnouncement } from '~/fetches';
import { CustomButton } from '~/components/ButtonComponents';
import BreadCrumb from '~/components/BreadCrumb';
import { useGlobalModalStore, useGlobalScroll, useScroll } from '../store/GlobalModalStore';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import NoData from '~/components/Loading/NoData';

/*
  참여이벤트/ ->  자원정보공유 페이지
*/
function ResInfoSharing() {
  const {scrollY, direction} = useScroll();
  const today = new Date();
  const theme = useTheme();
  const navigate = useNavigate();
  today.setHours(today.getHours()-24);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchInput:any = useRef("");
  const [params, setParams] = useState({
    boardId : "share-info",
    posting : true,
    articleSrchCd : "",
    articleSrchWord : "",
    page : 1,
    itemsPerPage : 10,
  })
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [srchCd, setSrchCd] = useState("");
  const [srchWord, setSrchWord] = useState("")
  
  useEffect(() => {
    setSrchCd(params.articleSrchCd)
    setSrchWord(params.articleSrchWord)
  },[params.articleSrchCd,params.articleSrchWord])
  //처음 세팅
  const getList = () => {
    fetchAnnouncement(params).then((res:any) => {
        setList(res.list);
        setTotal(res.totalItems);
      })
      // .catch((e)=>{
      //   let message = e.response.data.message;
      //   addModal({
      //     open: true,
      //     content: message
      //   })
      // })
    }
    
    useEffect(() => {
      getList();
    },[params])
   
    useEffect(() => {
      if(!!!authentication.getToken()){
          navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
      }
    }, []);

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
  const goInfo = (item: any) => {
    navigate('/ResourceInfoSharing', {
      state: {
        item: item,
      },
    });
  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                자원정보 공유
              </h2>
              <p>
                AI 관련 사업에 대한 업계 소식이나 개선 및 보완이 필요한 부분에 대한 의견을 남겨주세요<br />
                사업이나 프로젝트를 진행하면서 필요한 도움이나 자원에 대한 의견을 남겨 주시면 참고하여 더 나은 사업을 준비하겠습니다
              </p>
            </div>
            <SelectSearchBar
              selectData={[{codeNm:"전체" , code:""},{codeNm:"제목", code:"TITLE"},{codeNm:"내용",code:"CONTENT"}]}
              placehold='어떤 공지사항을 찾고 계신가요?'
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
                자원정보공유
                <span className='data'><em>{total}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {list.length > 0 ? list.map((item : any , i:number) => (
              <NavLink to={`/EventNews/ResInfoSharing/${item.articleId}`} 
              key={i}
              state={{ item:item ,
              articleSrchCd:srchCd,
              articleSrchWord:srchWord}}>
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
                          {today<item.createdDt?<Chip label="NEW" className='new' sx={{ml: 1}} component="span"/>:null}
                        </Stack>
                      </span>
                      <Typography
                        component="span"
                        variant="body2"
                        className="body2"
                        color="text.primary"
                      >
                        {/* 화면설계서 목록 내용가져오기 삭제 */}
                          {item.article}
                        </Typography>
                        <span className="date">
                          <span>조회 <em>{item.readCnt}</em></span>
                          <span><em className="ml0">{dayjs(item.createdDt).format('YYYY-MM-DD')}</em></span>
                          <span>작성자 <em className="noline">{item.updaterNm}</em></span>
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
              <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>moreInfo()} />
            </Stack>
            :null}
            <Stack direction="row" css={styles.btnGroup}>
              <CustomButton label={'자원 정보 공유 의견 등록'} type={'wauto'} color={'primary'} style={{ padding: '0 36px' }} onClick={goInfo} />
            </Stack>
          </div>      
        </div>
      </Box>
    </div>
  );
}

export default ResInfoSharing;

// 이용지원/ ->  사용자메뉴얼
import React, { useEffect, useState,useRef, useCallback  } from 'react';
import * as styles from '~/styles/styles';
import {Box,Typography,Stack,List,ListItem,ListItemText,Chip, useTheme, useMediaQuery} from '@mui/material';
import {fetchUserManual} from '~/fetches';
import dayjs from 'shared/libs/dayjs';
import { NavLink } from 'react-router-dom';
import BreadCrumb from '~/components/BreadCrumb';
import { CustomButton } from '~/components/ButtonComponents';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import NoData from '~/components/Loading/NoData';
import { useGlobalScroll, useScroll } from '../store/GlobalModalStore';

function UserManual() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const today = new Date();
  today.setHours(today.getHours()-24);
  const [params, setParams] = useState({
    categoryCd : "",
    articleSrchCd : "",
    articleSrchWord : "",
    page : 1,
    itemsPerPage : 5,
  })
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  //처음 세팅
  const getList = () =>{
    fetchUserManual(params).then((res:any) => {
      setList(res.list);
      setTotal(res.totalItems);
    })
  }

  useEffect(()=>{
    getList()
  },[params])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const moreInfo = () =>{
    const itemsPerPage:any = params.itemsPerPage +5;
    setParams((state)=>({...state,itemsPerPage}));
  }
  
  const checkCategoryCd = (categoryCd : string) =>{
    if(categoryCd==="CATE-DXP"){
      return "데이터유통"
    }else if(categoryCd==="CATE-TSP"){
      return "실증지원"
    }else if(categoryCd==="CATE-PMS"){
      return "사업관리"
    }
    // else if(categoryCd==="CATE-USP"){
    //   return "사용자지원"
    // }
  }
  console.log(list)
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                사용자 매뉴얼
              </h2>
              <p>
              AICA 회원가입 후 이용가능한 사업관리 기능과 실증지원 포털, <br className="mo"/>데이터 유통 포털  이용을 위한 사용자 매뉴얼을 모아 놓았습니다.<br/>
              각 포털사이트에서 사용법을 참고하시면 AICA에서 제공하는 <br className="mo"/>다양한 혜택을 누리실 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              selectData={[{codeNm:"전체" , code:""},{codeNm:"제목", code:"TITLE"},{codeNm:"내용",code:"CONTENT"}]}
              placehold='어떤 매뉴얼을 찾고 계신가요?'
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
                사용자 매뉴얼
                <span className='data'><em>{total}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {list.length > 0 ? list.map((item : any , i:number) => (
              <NavLink to={`/SupportForUse/UserManual/${item.articleId}`} 
                key={i}
                state={{ item:item ,
                total:total,
                articleSrchCd:params.articleSrchCd,
                articleSrchWord:params.articleSrchWord}}>
                <ListItem style={item.notice?{backgroundColor:'#f5f5f5'}:{}}>
                  <ListItemText
                    secondary={
                    <React.Fragment>
                      <span className="tit_body">
                        <Stack direction="row" className='tag' spacing={1} component="span">
                          <Chip label={checkCategoryCd(item.categoryCd)} className='item' sx={{mr: 1}} component="span"/>
                        </Stack>
                        <Typography variant="body1" component="span" className="mb0">
                          {item.title}
                        </Typography>
                        <Stack direction="row" className='tag' spacing={1} component="span">
                          {/* new아이콘 24시간 이내인 경우만 */}
                          {today<item.createdDt?<Chip label="NEW" className='new' sx={{ml: 1}} component="span"/>:null}
                        </Stack>
                      </span>
                        <span className="date manual">
                          <span>조회 <em>{item.readCnt}</em></span>
                          <span><em className="ml0">{dayjs(item.createdDt).format('YYYY-MM-DD')}</em></span>
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
          </div>      
        </div>
      </Box>
    </div>

  );
}

export default UserManual;

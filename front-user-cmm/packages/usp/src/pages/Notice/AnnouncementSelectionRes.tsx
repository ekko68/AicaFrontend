
import * as styles from '~/styles/styles';
/* eslint-disable jsx-a11y/alt-text */
import React,{ useEffect, useState, useRef, useCallback } from 'react';
import BreadCrumb from '~/components/BreadCrumb';
import { NavLink, useNavigate } from 'react-router-dom';
import fetchAnnouncementSelectionRes from '~/fetches/fetchAnnouncementSelectionRes';
import { useGlobalModalStore, useGlobalScroll, useScroll } from '../store/GlobalModalStore';
import { SearchBar } from '~/components/BizCommon/SearchBar';
import authentication from 'shared/authentication';
import { Box, Stack, Typography, List, ListItem, ListItemText, Chip, Button, useMediaQuery, useTheme } from '@mui/material';
import NoData from '~/components/Loading/NoData';

/*
  공고알림/ -> 선정 결과 공고 페이지
*/
const AnnouncementSelectionRes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {scrollY, direction} = useScroll();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    slctnPblancNm : "",
    page : 1,
    itemsPerPage : 10,
  })
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  //처음 세팅
  const getList = () => {
    fetchAnnouncementSelectionRes(params).then((res:any) => {
      setList(res.list);
      setTotal(res.totalItems);
    }).catch((e)=>{
      let message = e.response.data.message;
      // addModal({
      //   open: true,
      //   content: message
      // })
    })
  }

  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
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

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={scrollY ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">선정결과공고</h2>
              <p>지원하신 사업에 대한 선정결과를 확인하실 수 있습니다.</p>
            </div>
            <SearchBar
              placehold='어떤 선정 결과 공고를 찾고 계신가요?'
              handleSearch={(val:any)=>{
                setParams((state) => ({ ...state, slctnPblancNm:val }))
              }}/>
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{marginTop:( scrollY ? 
          (isMobile ? `${height - 180}px` : `${height - 100}px`) 
          :
          (isMobile ? `${height - 150}px` : `${height}px`))}} >
        <div className="content list">
          {/* 상세 list 리스트 */}
          <div css={styles.detal_list}>
            <Stack spacing={6} direction="row" className="sub_tit" justifyContent="space-between">
              <Typography variant="h4" component="div">
                선정 결과 공고
                <span className='data'><em>{total}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {list.length > 0 ? list.map((item : any , i:number) => (
              <NavLink to={`/Notice/AnnouncementSelectionRes/${item.slctnPblancId}`} 
              key={i}
              state={{ slctnPblancId:item.slctnPblancId ,
              }}>
                <ListItem >
                  <ListItemText
                    secondary={
                    <React.Fragment>
                      <span className="tit_body" >
                        <Typography variant="body1" component="span">
                          {item.slctnPblancNm}
                        </Typography>
                        <Stack direction="row" className='tag' spacing={1} component="span">
                          {item.isNew=="Y"?<Chip label="NEW" className='new' sx={{ml: 1}}/>:null}
                        </Stack>
                      </span>
                      <Typography
                        component="span"
                        variant="body2"
                        className="body2"
                        color="text.primary"
                      >
                          {item.slctnPblancSumry}<br/>
                        </Typography>
                        <span className="body3">관련 모집공고 <em>{item.pblancNm}</em></span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </NavLink>
            )): <NoData/>}
            </List>
            {(params.itemsPerPage)<total?
            <Button variant="contained" fullWidth className="bottom_btn"  onClick={()=>moreInfo()}>더보기</Button>
                :null}
          </div>      
        </div>
      </Box>
    </div>
  );
}

export default AnnouncementSelectionRes;

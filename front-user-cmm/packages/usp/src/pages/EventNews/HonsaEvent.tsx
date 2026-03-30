import * as styles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, useMediaQuery, Typography,useTheme, Button} from '@mui/material';
import { CodeType} from "../Notice/NoticeModel";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { CustomButton} from '~/components/ButtonComponents';
import { NavLink } from 'react-router-dom';
import { fetchEventView } from '~/fetches';
import { useGlobalModalStore, useScroll } from '../store/GlobalModalStore';
import DatePicker from '~/components/DatePicker';
import dayjs from '~/../../shared/src/libs/dayjs';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import NoData from '~/components/Loading/NoData';
import {FacebookShareButton} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import kakao_icon from "../../../public/images/common/kakao_icon_new_min.png";
import facebook_icon from "../../../public/images/common/pace_icon_new_min.png";
import styled from '@emotion/styled';
const {Kakao} = window;
const currentUrl = window.location.href;
// 참여이벤트/ ->  행사/이벤트 페이지
function HonsaEvent(){
  const theme = useTheme();
  const {direction} = useScroll();
  const {addModal} = useGlobalModalStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [platformType, setPlatFormType] = useState("");
  const [assign_box] = useState<CodeType[]>([]);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const today = new Date();  
  const beginDay = new Date();
  beginDay.setDate(beginDay.getDate()-15)
  const endDay = new Date();
  endDay.setDate(endDay.getDate()+15);
  const [height, setHeight] = useState(0);

  const platform = () => {
    if(isMobile){
      setPlatFormType("MOBILE")
    }else{
      setPlatFormType("PC")
    }
  }
  
  useEffect(()=>{
    platform()
  },[])
  

  const [params, setParams] = useState({
    beginDay : dayjs(beginDay).format('YYYYMMDD').toString(),
    endDay : dayjs(endDay).format('YYYYMMDD').toString(),
    searchType : "",
    searchCn : "",
    sortType : "created_dt",
    page : 1,
    itemsPerPage : 9,
  })

  const getList = () => {
    fetchEventView(params).then((res:any) => {
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


  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  useEffect(() => {
    getList();
  },[params])

  const moreInfo = () => {
    const itemsPerPage:any = params.itemsPerPage + 9;
    setParams((state) => ({ ...state, itemsPerPage }));
  }

  const handleImgError = (e:any) => {
    e.target.src = '/images/subpage/temp_facility_01.png';
  }

  const checkProceeding = (endDay : string) =>{
    if(today.getTime()<new Date(endDay).getTime()){
      return true
    }
    return false
  }
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <Box className="content">
            <div className="txtbox">
              <h2 className="tit">행사/이벤트</h2>
              <p>
                AICA 및 연계기관들이 주관 및 주최하는 각종 행사와 캠페인 소식들을 확인하실 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              selectData={[{codeNm:"전체" , code:""},{codeNm:"제목", code:"TITLE"},{codeNm:"내용",code:"CONTENTS"}]}
              placehold='어떤 행사/이벤트를 찾고 계신가요?'
              handleSearch={(searchInput:string,sel:string)=>{
                setParams((state) => ({ ...state, searchType:sel ,searchCn:searchInput}))
              }}
            />
            {isMobile ? (
              <Box style={{display:direction? 'none' : ''}}>
                <SearchModal
                  placehold='어떤 행사/이벤트를 찾고 계신가요?'
                  handleSearch={(s:string | undefined)=>{
                    console.log(s)
                  }}
                  assign_box={assign_box}
                />
              </Box>
            ) : (
            <Box css={styles.picker_card} style={{display:direction? 'none' : ''}}>
              <dl>
                <dt>검색 기간</dt>
                <dd>
                  <Box className="box_scroll">
                      <DatePicker 
                          pickerType='two' 
                          questBeginDay={!!params.beginDay ? dayjs(params.beginDay,'YYYYMMDD').toString() : dayjs(new Date(),'YYYYMMDD').toString()}
                          questEndDay={!!params.endDay ? dayjs(params.endDay,'YYYYMMDD').toString() : dayjs(new Date(),'YYYYMMDD').toString()}
                          changeStart={(startNewTime: Date | null)=>{
                            setParams({...params,beginDay:dayjs(startNewTime).format('YYYYMMDD')})
                        }}
                        changeEnd={(endNewTime: Date | null)=>{
                          setParams({...params,endDay:dayjs(endNewTime).format('YYYYMMDD')})
                        }}
                      />
                  </Box>
                </dd>
              </dl>
            </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* sx={{transform: scrollActive ? 'translate(0px, -336px)' : ''}} */}
      <Box sx={{ marginTop:( direction ? (isMobile ? `${height - 260 }px` : `${height - 230}px`) : (isMobile ? `${height - 120}px` : `${height}px`))}}>
        <Box css={styles.sub_cont02}>
            <Box className="content list" >
              <Stack
                component="div"
                spacing={6}
                direction="row"
                justifyContent="space-between"
                className="sub_tit"
              >
                <Typography variant="h5" component="div">
                행사/이벤트
                <span className="data">
                  <em>{total}</em> 건
                </span>
                </Typography>
              </Stack>
              {/* list 리스트 */}
              <div css={styles.event_list} id="scroll-to-element">
                {list.length > 0 ? list.map((item:any, keys) => (
                  <>
                  <NavLink key={keys} to={`/EventNews/HonsaEvent/${item.eventId}`} 
                  state={{eventId : item.eventId, platformType:platformType, params : params}} >
                      <Card className="tag2">
                        <CardActionArea>
                        <Stack direction="row" className="tag" spacing={1}>
                          {checkProceeding(item.fmtEndDay)?
                          <Chip label={'진행중'} className="blue"/>
                          :null}
                        </Stack>
                        <CardMedia
                          component="img"
                          height="200"
                          src={`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${item.eventId}/thumbnail/${platformType}`}
                          onError = {(e: any)=>handleImgError(e)}
                          // src={`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${item.eventId}/thumbnail/${platformType}`}
                          // image={`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${item.eventId}/thumbnail/${platformType}`}
                          alt="green iguana"
                        />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.eventNm}
                            </Typography>
                            <div className="date">
                              <span>진행기간 <em>{item.fmtBeginDay+"~"+item.fmtEndDay}</em></span>
                            </div>
                            <div className="date">
                              <span>조회 <em>{item.readCnt}</em></span>
                              <span>작성일 <em>{item.fmtCreatedDay}</em></span>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </NavLink>
                  </>
                  )) : <NoData />}
                </div>  
                {(params.itemsPerPage)<total? 
                <Stack css={styles.bottom_btn} >
                  <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>moreInfo()}/>
                </Stack>
                : null}
            </Box>
        </Box>
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
export default HonsaEvent;

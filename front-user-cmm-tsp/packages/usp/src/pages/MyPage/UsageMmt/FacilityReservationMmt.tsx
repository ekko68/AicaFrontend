import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as styles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, useMediaQuery, List, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomRadioButtons} from '~/components/NoticeCustomCheckBoxs';
import { NavLink } from 'react-router-dom';
import { fetchGetCommCode } from '~/fetches';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import DatePicker from '~/components/DatePicker';
import { ModalReasonConfirm } from '~/pages/biz/BusinessAppMgt/PopComp/ModalReasonConfirm';
import NoData from '~/components/Loading/NoData';
import RceptStus from '~/pages/biz/BusinessAppMgt/PopComp/RceptStus';
import { fetchReservationUser } from '~/fetches/fetchMoveIn';
import { useQuery } from 'react-query';
import { ModalComponents } from '~/components/ModalComponents';
import { SearchBar } from '~/components/BizCommon/SearchBar';
import { useNavigate } from 'react-router-dom';
import authentication from 'shared/authentication';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';
/* 
  작성일    :   2022/06/09
  화면명    :   이페이지 -> 사용자지원 -> 시설예약관리 (사유 파업 UI-USP-FRN-0290102)
  회면ID    :   UI-USP-FRN-0290101
  화면/개발 :   Seongeonjoo / navycui
*/
const  FacilityReservationMmt = () => {
  const today = new Date();
  const navigate = useNavigate();
  today.setHours(today.getHours()-24);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [quests, setQuests] = useState({
    mvnFcNm : "",
    srchBeginDay:dayjs(today).format('YYYYMMDD'),
    srchEndDay:dayjs(today).add(1, "M").format('YYYYMMDD'),
    reserveSt : "",
    page : 1,
    itemsPerPage : 5,
  })

   // 공통 코드 조회
 const {data:assign_box} = useQuery("RESERVE_ST", async () => await fetchGetCommCode("RESERVE_ST"));

  // 목록 조회
  const { 
    data:list,
    refetch,
    error
   } = useQuery(["fetchOneByOneMmt",quests], async () => await fetchReservationUser(quests),{
     onError: (err:any)=>{
      //  setOpen(true)
     }
   });

  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
    refetch();
  },[])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const moreInfo = () => {
    const itemsPerPage:any = quests.itemsPerPage + 5;
    setQuests((state) => ({ ...state, itemsPerPage }));
  }
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component='div' ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">시설예약 관리</h2>
              <p>
                신청한 시설예약 목록을 조회하고, 현재 예약 상태를 확인할 수 있습니다.
              </p>
            </div>
            <SearchBar
              placehold='시설예약 조회해보세요!'
              handleSearch={(val:any)=>{
                setQuests((state) => ({ ...state, mvnFcNm:val }))
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='시설예약 조회해보세요!'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                  if(!!s){
                    setQuests((state) => ({ ...state, mvnFcNm:s }))
                  }
                }}
                assign_box={assign_box}
              />
            ) : (
            <Box css={styles.picker_card} style={{display:direction ? 'none' : ''}}>
              <dl>
                <dt>신청일</dt>
                <dd>
                <Box className="box_scroll">
                  <DatePicker 
                        pickerType='two' 
                        questBeginDay={dayjs(quests.srchBeginDay,'YYYYMMDD').toString()}
                        questEndDay={dayjs(quests.srchEndDay,'YYYYMMDD').toString()}
                        changeStart={(startNewTime: Date | null)=>{
                          setQuests((prevState)=>({...prevState,srchBeginDay:dayjs(startNewTime).format('YYYYMMDD').toString()}))
                      }}
                      changeEnd={(endNewTime: Date | null)=>{
                        setQuests((prevState)=>({...prevState,srchEndDay:dayjs(endNewTime).format('YYYYMMDD').toString()}))
                      }}
                    />
                  </Box>
                </dd>
              </dl>
              <dl>
                <dt>예약상태</dt>
                <dd>
                  <Box className="box_scroll">
                    <CustomRadioButtons
                      row
                      data={!!assign_box ? assign_box.list : []}
                      onClick={(s: string) => {
                        if (s.length > 0) {
                          if(s=='all'){
                            setQuests({...quests,reserveSt:''})
                          } else {
                            setQuests({...quests,reserveSt:s})
                          }
                        }
                      }}
                    />
                  </Box>
                </dd>
              </dl>
            </Box>
            )}
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( direction ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className="content list">
          {/* className="list02" 클래스는 사유확인버튼이 있을시에만 추가 */}
          <div css={styles.detal_list} className="list02">
            <Stack
              spacing={6}
              direction="row"
              className="sub_tit"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div">
                시설예약
                <span className='data'><em>{list?.totalItems}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {!!list  ? list.list.map((item : any , i:number) => (
              <div className="btn_cont" key={i}>
                  <ListItem>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                        <Stack className="listflex" direction={'row'} spacing={2} justifyContent={'space-between'} component="span">
                          <NavLink to={`/MyPage/UsageMmt/${item.reserveId}`}
                              state={{ item:item , lists: list.list,
                              total:list?.totalItems}}>
                              <Box className="listflex01" component="span">
                                <span className="tit_body">
                                  <Typography variant="body1" component="span">
                                    {item.mvnFcNm}
                                  </Typography>
                                </span>
                                <Box className="dateBoxto" component="span">
                                  <span className="date">
                                    <span>예약일시 <em>{dayjs(item.rsvtDay).format('YYYY-MM-DD')}</em></span>
                                  </span>
                                  <span className="date">
                                    <span>예약인원수 <em>{item.rsvtNope + '명'}</em></span>
                                    <span>신청일시 <em>{dayjs(item.rsvtReqDt).format('YYYY-MM-DD')}</em></span>
                                  </span>
                                </Box>
                              </Box>
                            </NavLink>
                          <Stack className="listflex02" direction={'row'} component="span">
                            <RceptStus stus={!!item.reserveStNm ? item.reserveStNm : ''}/>
                            <div className="right_btn">
                                {(item.reserveSt == 'RJCT') ? 
                                  <ModalReasonConfirm applyId={item.reserveId} viewNm="FacilityReservationMmt"/>
                                  : null  
                                }
                            </div>
                          </Stack>
                        </Stack>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
              </div>
            )) : <NoData/>}
            </List>
            {(quests.itemsPerPage) < list?.totalItems ?
            // 더보기
            <Stack css={styles.bottom_btn} >
              <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>moreInfo()} />
            </Stack>
            :null}
          </div>
        </div>
      </Box>
      <ModalComponents open={open} type={'normal'} content={!!error ? error.message : ''} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
    </div>
  );
}

export default FacilityReservationMmt;


import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import * as styles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Chip, Stack, useMediaQuery, List, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { fetchGetCommCode, fetchOneByOneMmt } from '~/fetches';
import { questsType } from '~/fetches/fetchQnaQuest';
import { CustomRadioButtons } from '~/components/NoticeCustomCheckBoxs';
import DatePicker from '~/components/DatePicker';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { SearchBar } from '~/components/BizCommon/SearchBar';
import { useGlobalModalStore, useGlobalScroll, useScroll } from "../../store/GlobalModalStore";
import NoData from '~/components/Loading/NoData';
import { useNavigate, NavLink} from 'react-router-dom';
import authentication from 'shared/authentication';
/* 
  작성일    :   2022/06/01
  화면명    :   마이페이지 -> 사용자지원 -> 디딤널관리
  회면ID    :   UI-USP-FRN-0360101
  화면/개발 :   Seongeonjoo / navycui
*/
const  TreadmillMmt = () => {
  const beginDay = new Date();
  const endDay = new Date();
  endDay.setDate(endDay.getDate()+15);
  const theme = useTheme();
  const navigate = useNavigate();
  beginDay.setDate(beginDay.getDate()-15)
  const {addModal} = useGlobalModalStore();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [quests, setQuests] = useState<questsType>({
    title : "",
    qnaId : 'step-flat',
    questId:"",
    questBeginDay:dayjs(beginDay).format('YYYYMMDD').toString(),
    questEndDay:dayjs(endDay).format('YYYYMMDD').toString(),
    questStatus : "",
    memberNm:"",
    page : 1,
    itemsPerPage : 5,
  })

 // 공통 코드 조회
 const {data:assign_box} = useQuery("QUEST_STATUS", async () => await fetchGetCommCode("QUEST_STATUS"));

 // 디딤널관리 목록 조회
 const { 
   data:list,
   refetch
  } = useQuery(["getTreadmillMmt",quests], async () => await fetchOneByOneMmt(quests,'step-flat'),{
    onError: (err:any)=>{
      addModal({
        open:true,
        content:err.response.data.message
      })
    }
  });

  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
    refetch();
  }, []);

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

  const questSt = (item:string) => {
    if(item==="REQUEST"){
      return "요청"
    }else if(item==="RECEIPT"){
      return "접수"
    }else if(item==="ANSWER"){
      return "답변"
    }else if(item==="CONFIRM"){
      return "확인"
    }
  }

  const categoryCd = (item:string) => {
    if(item==="CATE-STEP-01"){
      return "창업아이디어"
    }else if(item==="CATE-STEP-02"){
      return "구인/구직"
    }else if(item==="CATE-STEP-03"){
      return "제안/기타"
    }
  } 
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">디딤널 관리</h2>
              <p>
              AICA에 전달하신 의견 및 제안 목록과 답변을 확인하실 수 있습니다.
              </p>
            </div>
              <SearchBar 
                placehold='디딤널 조회해보세요!'
                handleSearch={(val:any)=>{
                  console.log('디딤널 조회 value: ',val)
                  if(!!val){
                    setQuests((state) => ({ ...state, title:val }))
                  }
                }}
              />
            {isMobile ? (
              <SearchModal
                placehold='디딤널 조회해보세요!'
                handleSearch={(searchInput:string | undefined,sdt:string,edt:string)=>{
                  console.log('디딤널 조회 value date: ',sdt,edt)
                  setQuests((state) => ({ ...state, questStatus:searchInput ? searchInput : '',questBeginDay:dayjs(sdt).format('YYYYMMDD').toString(),questEndDay:dayjs(edt).format('YYYYMMDD').toString() }))
                }}
                assign_box={assign_box ? assign_box.list : []}
              />
            ) : (
            <Box css={styles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>접수일</dt>
                <dd>
                  <Box className="box_scroll">
                    <DatePicker 
                        pickerType='two' 
                        questBeginDay={dayjs(quests.questBeginDay,'YYYYMMDD').toString()}
                        questEndDay={dayjs(quests.questEndDay,'YYYYMMDD').toString()}
                        changeStart={(startNewTime: Date | null)=>{
                          setQuests((prevState)=>({...prevState,questBeginDay:dayjs(startNewTime).format('YYYYMMDD').toString()}))
                      }}
                      changeEnd={(endNewTime: Date | null)=>{
                        setQuests((prevState)=>({...prevState,questEndDay:dayjs(endNewTime).format('YYYYMMDD').toString()}))
                      }}
                    />
                  </Box>
                </dd>
              </dl>
              <dl>
                <dt>상태</dt>
                <dd>
                  <Box className="box_scroll">
                    <CustomRadioButtons
                    data={assign_box ? assign_box.list : []}
                    onClick={(s) => {
                      if(s=='all'){
                        setQuests({...quests,questStatus:''})
                      } else {
                        setQuests({...quests,questStatus:s})
                      }
                    }}/>
                  </Box>
                </dd>
              </dl>
            </Box>
            )}
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( direction ? (isMobile ? `${height  - 30 }px` : `${height - 190}px`) : `${height }px`)}}>
        <div className="content list">
          <div css={styles.detal_list}>
            <Stack
              spacing={6}
              direction="row"
              className="sub_tit"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div">
                디딤널 관리
                <span className='data'><em>{list?list.list.length:0}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {!!list ? list.list.length > 0 ? list.list.map((item : any , i:number) => (
              <NavLink to={`/MyPage/UsageMmt/${item.questId}`} 
              key={i}
              state={{ item:item,lists:list.list}}>
                <ListItem>
                  <ListItemText 
                    secondary={
                    <React.Fragment>
                      <span className="tit_body">
                        <Stack direction="row" className='tag' spacing={1} component="span">
                          <Chip label={categoryCd(item.categoryCd)} className='item' sx={{mr: 1}}/>
                        </Stack>
                        <Typography variant="body1" component="span">
                          {item.title}
                        </Typography>
                      </span>
                      <span className="date">
                        <span>접수일 <em>{dayjs(item.questStDt).format('YYYY-MM-DD')}</em></span>
                      </span>
                      <span className="right_tag">
                        <em>{questSt(item.questSt)}</em>
                      </span>
                    </React.Fragment>
                    }
                  />
                </ListItem>
              </NavLink>
            )): <NoData/> : <NoData/>}
            </List>
            {(quests.itemsPerPage)<(!!list?list.list.length:0)?
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

export default TreadmillMmt;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import * as comstyles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, useMediaQuery, List, ListItem, ListItemText, TooltipProps, Tooltip, tooltipClasses } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomRadioButtons} from '~/components/NoticeCustomCheckBoxs';
import { NavLink } from 'react-router-dom';
import { fetchGetCommCode } from '~/fetches';
import dayjs from 'dayjs';
import { questsType } from '~/fetches/fetchQnaQuest';
import { reqReserveType } from '~/service/Model';
import { styled } from '@mui/material/styles';
import {useQuery} from "react-query";
import IconButton from '@material-ui/core/IconButton';
import {QuestionIcon} from '~/components/IconComponents';
import { fetchPlanList } from '~/fetches/biz/fetchContractMgt';
import DatePicker from "~/components/DatePicker";
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import NoData from '~/components/Loading/NoData';
import RceptStus from '../BusinessAppMgt/PopComp/RceptStus';
import { initPlanInput, planInput } from '~/models/ModelBizPlanMgt';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 협약관리 -> 전자협약 관리
  회면ID    :   UI-USP-FRN-0170701
  화면/개발 :   Seongeonjoo / navycui
*/
const  ElectronicAgtMgt = () => {
  const today = new Date();
  const theme = useTheme();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [questBeginDay, setQuestBeginDay] = React.useState<Date | null>(today);
  const [questEndDay, setQuestEndDay] = React.useState<Date | null>(today);
  const [reqReserve, setReqReserve] = useState<reqReserveType>({questBeginDay:dayjs(questBeginDay).format('YYYY-MM-DD'), questEndDay:dayjs(questEndDay).format('YYYY-MM-DD'), reserveSt: "",  page: 1, itemsPerPage: 10})
  const [quests, setQuests] = useState<questsType>({
    title : "",
    qnaId : process.env.REACT_APP_USP_PERSNAL,
    questId:"",
    questBeginDay:questBeginDay,
    questEndDay:questEndDay,
    questStatus : "",
    memberNm:"",
    page : 1,
    itemsPerPage : 10,
  })
  const [input, setInput] = useState<planInput>(initPlanInput)
  //Tooltip Open
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
  setOpen(true);
  }

 // 공통 코드 조회
 const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("PLAN_PRESENTN_STTUS"));

 // 수행계획서 목록 조회  
  const getList = () => {
    fetchPlanList(input).then((res:any)=>{
      setList(res)
    }).catch((e)=>{
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const moreInfo = () => {
    const itemsPerPage:any = quests.itemsPerPage + 10;
    setQuests((state) => ({ ...state, itemsPerPage }));
  }
  
  useEffect(() => {
    getList()
  }, []);

  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">전자협약 관리</h2>
              <p>
              사업계획서 접수가 완료된 과제의 협약을 진행하고 협약서를 조회 및 다운로드 받을 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              placehold='전자협약서를 조회해보세요!'
              handleSearch={(val:any)=>{
                setQuests((state) => ({ ...state, keyword:val }))
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='전자협약서를 조회해보세요!'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box.list}
              />
            ) : (
            <Box css={comstyles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>제출일</dt>
                <dd>
                  <Box className="box_scroll">
                    <DatePicker
                      pickerType='two' 
                      questBeginDay={questBeginDay?.toString()}
                      questEndDay={questEndDay?.toString()}
                      changeStart={(startNewTime: Date | null)=>{
                        setQuestBeginDay(startNewTime)
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                      setQuestEndDay(endNewTime)
                    }}
                    />
                  </Box>
                </dd>
              </dl>
              <dl>
                <dt>제출상태</dt>
                <dd>
                  <Box className="box_scroll">
                    <CustomRadioButtons
                      row
                      data={assign_box ? assign_box.list : []}
                      onClick={(s: string) => {
                        setReqReserve({...reqReserve, reserveSt:s.toString()});
                        if (s.length > 0) console.log(s);
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
      <Box css={comstyles.sub_cont02} sx={{ marginTop:( direction ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className="content">
          {/* className="list02" 클래스는 사유확인버튼이 있을시에만 추가 */}
          <div css={styles.detal_list} className="list02">
            <Stack
              spacing={6}
              direction="row"
              className="sub_tit"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div">
                전자협약서
                <span className='data'><em>{list ? list.totalItems : 0}</em> 건</span>
              </Typography>
              <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                <Typography>제출상태 안내</Typography>
                <HtmlTooltip
                  open={open}
                  onClose={handleTooltipClose}
                  leaveTouchDelay = {30000}
                  title={
                    <React.Fragment>
                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                      <ul className='tooltip_list'>
                        <li><span className='clr03'>서명요청</span> 담당자가 서명을 요청한 상태</li>
                        <li><span className='clr02'>서명완료</span> 사업단에서 서명을 진행중인 상태</li>
                        <li><span className='clr05'>협약완료</span> 서명이 완료되어 협약이 체결된 상태</li>
                        <li><span className='clr06'>협약해지</span> 협약이 해지된 상태</li>
                      </ul>
                    </React.Fragment>
                  }
                  placement="bottom"
                >
                  <IconButton onClick={handleTooltipOpen}>
                    <QuestionIcon />
                  </IconButton>
                </HtmlTooltip>
              </Stack>
            </Stack>
            <List>
            {!!list ? list.list.length > 0 ? list.list.map((item : any , i:number) => (
              <div className="btn_cont" key={i}>
                <NavLink to={`/biz/ContractMgt/ElectronicAgtMgtDetail/${item.pblancId}`}
                  state={{ item:item ,
                  total:total}}>
                  <ListItem>
                    <ListItemText 
                      secondary={
                      <React.Fragment>
                        <span className="tit_body">
                          <Typography variant="body1" component="span">
                            {item.taskNmKo}
                          </Typography>
                        </span>
                        <span className="date">
                          <span>예약일시 <em>{dayjs(item.createdDt).format('YYYY-MM-DD')}</em></span>
                        </span>
                        <span className="date">
                          <span>예약인원수 <em>5명</em></span>
                          <span>신청일시 <em>{dayjs(item.createdDt).format('YYYY-MM-DD')}</em></span>
                        </span>
                        <RceptStus stus={!!item.rceptSttus ? item.rceptSttus : '접수상태'}/> 
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                <div className="right_btn">
                  <ModalReasonConfirm applyId={item.applyId} viewNm="ElectronicAgtMgt" title='협약서 다운로드'/>
                  {/* {(item.rceptSttus == 'REJECT' || item.rceptSttus == 'MAKEUP') ? 
                    : null  
                  } */}
                </div>
              </div>
            )): <NoData /> : ''}
            </List>
            {(quests.itemsPerPage)<total?
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

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default ElectronicAgtMgt;
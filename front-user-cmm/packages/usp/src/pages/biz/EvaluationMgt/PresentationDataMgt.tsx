
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
import { styled } from '@mui/material/styles';
import {useQuery} from "react-query";
import IconButton from '@material-ui/core/IconButton';
import {QuestionIcon} from '~/components/IconComponents';
import DatePicker from '~/components/DatePicker';
import { fetchBusinessList} from '~/fetches/biz/fetchBusinessAppMgt';
import { TypeReqMgnt } from '~/models/biz/BusinessAppMgt';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import RceptStus from '../BusinessAppMgt/PopComp/RceptStus';
import NoData from '~/components/Loading/NoData';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';
/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 평가관리 -> 발표자료관리
  회면ID    :   (UI-USP-FRN-0160101) /(UI-USP-FRN-0160102) 
  화면/개발 :   Seongeonjoo / navycui
*/
const  PresentationDataMgt = () => {
  const today = new Date();
  today.setHours(today.getHours()-24);
  const {scrollY, direction} = useScroll();
  const theme = useTheme();
  const [total, setTotal] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [list, setList] = useState<any>();
  const [quests, setQuests] = useState<TypeReqMgnt>({
    rceptDtStart:	 '',
    rceptDtEnd:	   '',
    rceptSttusCd:	 '',
    keywordDiv:	   '',
    keyword:	     '',
    page:	            1,
    itemsPerPage:	    10
  })

  //Tooltip Open
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
  setOpen(true);
  }

  // 공통 코드 조회
  const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("RCEPT_STTUS"));
  // 사업신청관리 목록 조회

  const getList = () => {
    fetchBusinessList(quests).then((res:any)=>{
      setList(res)
    }).catch((e)=>{
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }

  // 더보기
  const moreInfo = () => {
    const itemsPerPage:any = quests.itemsPerPage + 10;
    setQuests((state) => ({ ...state, itemsPerPage }));
  }

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  useEffect(() => {
    getList()
  }, [quests.keyword]);

  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">발표자료 관리</h2>
              <p>
                평가예정인 과제의 발표자료를 조회하고 제출할 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              placehold='어떤 발표 자료를 찾고 계신가요?' 
              handleSearch={(val:any)=>{
                setQuests((state) => ({ ...state, keyword:val }))
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='어떤 발표 자료를 찾고 계신가요?'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box.list}
              />
            ) : (
            <Box css={styles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>제출일</dt>
                <dd>
                  <Box className="box_scroll">
                    <DatePicker 
                      pickerType='two' 
                      questBeginDay={!!quests.rceptDtStart ? dayjs(quests.rceptDtStart,'YYYYMMDD').toString() : dayjs(new Date(),'YYYYMMDD').toString()}
                      questEndDay={!!quests.rceptDtEnd ? dayjs(quests.rceptDtEnd,'YYYYMMDD').toString() : dayjs(new Date(),'YYYYMMDD').toString()}
                      changeStart={(startNewTime: Date | null)=>{
                        setQuests({...quests,rceptDtStart:dayjs(startNewTime).format('YYYYMMDD')})
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                      setQuests({...quests,rceptDtEnd:dayjs(endNewTime).format('YYYYMMDD')})
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
                    data={assign_box ? assign_box.list : []}
                    onClick={(s) => {
                      setQuests({...quests,rceptSttusCd:s})
                    }}/>
                  </Box>
                </dd>
              </dl>
            </Box>
            )}
          </div>
        </Box>
      </Box>
      <Box css={comstyles.sub_cont02} sx={{ marginTop:( direction ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
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
                발표자료
                <span className='data'><em>{list ? list.totalItems : 0}</em> 건</span>
              </Typography>
              <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                <Typography> 제출상태 안내</Typography>
                <HtmlTooltip
                  open={open}
                  onClose={handleTooltipClose}
                  leaveTouchDelay = {30000}
                  title={
                    <React.Fragment>
                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                      <ul className='tooltip_list'>
                        <li><span className='clr02'>제출요청</span> 제출요청인증메일은 최대 10분까지 유효합니다. </li>
                        <li><span className='clr01'>제출</span> 발표자료가 제출된 상태</li>
                        <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                        <li><span className='clr05'>접수완료</span> 사업담당자가 발표자료에 대해 접수완료 처리한 상태</li>
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
                <NavLink to={`/biz/EvaluationMgt/SubmissionMaterials/${item.applyId}`}
                  state={{ item:item ,
                  total:total}}>
                  <ListItem>
                    <ListItemText 
                      secondary={
                      <React.Fragment>
                        <span className="tit_body">
                          <Typography variant="body1" component="span">
                           {item.pblancNm}
                          </Typography>
                        </span>
                        <span className="date">
                          <span>평가예정일시<em>{dayjs(item.rceptBgnde).format('YYYY-MM-DD')}</em> ~ <em>{dayjs(item.rceptEndde).format('YYYY-MM-DD')}</em></span>
                          <span>제출일<em>{dayjs(item.rceptEndde).format('YYYY-MM-DD')}</em></span>
                        </span>
                        <RceptStus stus={!!item.rceptSttus ? item.rceptSttus : '접수상태'}/>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                <div className="right_btn">
                  <ModalReasonConfirm applyId={item.applyId} viewNm="PresentationDataMgt"/>
                  {/* {(item.rceptSttus == 'REJECT' || item.rceptSttus == 'MAKEUP') ? 
                    : null  
                  } */}
                </div>
              </div>
            )): <NoData/> : ''}
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

export default PresentationDataMgt;
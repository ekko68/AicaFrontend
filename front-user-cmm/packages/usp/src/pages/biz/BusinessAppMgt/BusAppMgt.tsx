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
import { NavLink, useNavigate} from 'react-router-dom';
import { fetchGetCommCode } from '~/fetches';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import {useQuery} from "react-query";
import IconButton from '@material-ui/core/IconButton';
import {QuestionIcon} from '~/components/IconComponents';
import DatePicker from '~/components/DatePicker';
import { fetchBusinessList } from '~/fetches/biz/fetchBusinessAppMgt';
import { TypeReqMgnt } from '~/models/biz/BusinessAppMgt';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { ModalReasonConfirm } from './PopComp/ModalReasonConfirm';
import RceptStus from './PopComp/RceptStus';
import NoData from '~/components/Loading/NoData';
import authentication from 'shared/authentication';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';
/* 
  작성일    :   2022/07/01
  화면명    :   사업신청관리 -> 사업신청관리
  회면ID    :   UI-USP-FRN-0140101
  화면/개발 :   Seongeonjoo / navycui
*/

const  BusAppMgt = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [params, setParams] = useState({
    posting : true,
    articleSrchCd : "ALL",
    articleSrchWord : "",
    page : 1,
    itemsPerPage : 10,
    categoryCd : "",
  })  
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

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

 // 공통 코드 조회
 const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("RCEPT_STTUS"));

 // 사업신청관리 목록 조회
 const { 
   data:list ,
   status,
   refetch
  } = useQuery("getDetail", async () => await fetchBusinessList(quests),{ // fetchBusiness
    onSuccess: (res:any) => {
      return  res.list.map((item:any,key:number) => {
        Object.assign(item,{rowNum:key}); 
      })
    }
  });

  // 더보기
  const moreInfo = () => {
    const itemsPerPage:any = quests.itemsPerPage + 10;
    setQuests((state) => ({ ...state, itemsPerPage }));
  }
    
  useEffect(() => {
    if(!!!authentication.getToken()){
        navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
  }, []);

  useEffect(() => {
    refetch()
  }, [quests]);

  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업신청 관리</h2>
              <p>
                지원하는 사업의 신청정보를 조회 및 수정하고,<br className='mo' /> 현재 신청상태를 확인할 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              placehold='현재 상태를 확인해보세요!'
              selectData={[{code:'01',codeNm:'과제명'},{code:'02',codeNm:'공고명'}]}
              curr={'01'}
              handleSearch={(val:any,sel:any)=>{
                if(!!sel){
                  if(sel == '00'){
                    setQuests((state) => ({ ...state, keyword:val,keywordDiv:''}))
                  } else if(sel == '01') {
                    setQuests((state) => ({ ...state, keyword:val,keywordDiv:'taskNm'}))
                  } else {
                    setQuests((state) => ({ ...state, keyword:val,keywordDiv:'pblancNm'}))
                  }
                }
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='현재 상태를 확인해보세요!'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box ? assign_box.list : []}
              />
            ) : (
            <Box css={styles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>신청일</dt>
                <dd>
                  <Box className="box_scroll">
                    <DatePicker 
                      pickerType='two' 
                      questBeginDay={!!quests.rceptDtStart ? dayjs(quests.rceptDtStart,'YYYYMMDD').toString() : ''}
                      questEndDay={!!quests.rceptDtEnd ? dayjs(quests.rceptDtEnd,'YYYYMMDD').toString() : ''}
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
                <dt>신청상태</dt>
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
          <div css={styles.detail_list} className="list02">
            <Stack
              spacing={6}
              direction="row"
              className="sub_tit"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div">
                수행계획서
                <span className='data'><em>{list ? list.totalItems : 0}</em> 건</span>
              </Typography>
              <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                <Typography> 신청상태 안내</Typography>
                <HtmlTooltip
                  open={open}
                  onClose={handleTooltipClose}
                  leaveTouchDelay = {30000}
                  title={
                    <React.Fragment>
                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                      <ul className='tooltip_list'>
                        <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                        <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                        <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                        <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                        <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                        <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li>
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
            {(status == 'success') ? list.list.map((item : any , i:number) => (
              <div className="btn_cont" key={i}>
                <NavLink to={`/biz/BusinessAppMgt/BusAppMgtDetail/${item.applyId}`}
                  state={{ item:item,
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
                        <div className='subject'>
                          <span>과제명</span><em><strong>딥러닝</strong> {item.taskNmKo}</em>
                        </div>
                        <span className="date">
                          <span>접수기간<em>{dayjs(item.rceptBgnde).format('YYYY-MM-DD')}</em> ~ <em>{dayjs(item.rceptEndde).format('YYYY-MM-DD')}</em></span>
                          {!!item.rceptDt ? 
                            <span>신청일시<em>{dayjs(item.rceptDt).format('YYYY-MM-DD')}</em></span>
                          : ''
                          }
                        </span>
                        <RceptStus stus={!!item.rceptSttus ? item.rceptSttus : '접수상태'}/>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                <div className="right_btn">
                  {(item.rceptSttusCd == 'REJECT' || item.rceptSttusCd == 'MAKEUP') ? 
                      <ModalReasonConfirm 
                        applyId={item.applyId} 
                        viewNm='BusAppMgt' 
                        title='사유확인'
                        variant='text'
                        label='사유 확인'
                        type='modalBtn2'
                        color='outlinedgray'
                      />
                    : null  
                  }
                </div>
              </div>
            )): <NoData/>}
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

export default BusAppMgt;
import * as styles from './styles';
import * as comstyles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, useMediaQuery, List, ListItem, ListItemText, TooltipProps, Tooltip, tooltipClasses } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { NavLink } from 'react-router-dom';
import { fetchGetCommCode } from '~/fetches';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import {useQuery} from "react-query";
import IconButton from '@material-ui/core/IconButton';
import {QuestionIcon} from '~/components/IconComponents';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import DatePicker from '~/components/DatePicker';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { CustomRadioButtons } from '~/components/ButtonComponents';
import { initObjectionInput, objectionInput } from '~/models/ModelObjection';
import { fetchObjectionGet } from '~/fetches/fetchObjection';
import NoData from '~/components/Loading/NoData';
import RceptStus from '../BusinessAppMgt/PopComp/RceptStus';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 평가관리 -> 결과 이의 신청
  회면ID    :   UI-USP-FRN-0160701
  화면/개발 :   Seongeonjoo / navycui
*/
const  Objection = () => {
  const today = new Date();
  const theme = useTheme();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [questBeginDay, setQuestBeginDay] = React.useState<Date | null>(today);
  const [questEndDay, setQuestEndDay] = React.useState<Date | null>(today);
  const [lastSlctnObjcProcessSttusCd, setLastSlctnObjcProcessSttusCd] = useState<string>("");
  const [input, setInput] = useState<objectionInput>(initObjectionInput)

  //Tooltip Open
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
  setOpen(true);
  }

 // 공통 코드 조회
 const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("LAST_SLCTN_OBJC_PROCESS_STTUS"));

 // 수행계획서 목록 조회
  const getList = () => {
    // 목록 조회 TODO >.....fetchObjectionGet
    fetchObjectionGet(input).then((res:any) => {
      setList(res.list);
      setTotal(res.totalItems);
    })
  }

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const moreInfo = () => {
    const itemsPerPage:any = input.itemsPerPage + 10;
    setInput((state) => ({ ...state, itemsPerPage }));
  }

  useEffect(() => {
    getList()
  }, [input]);
  
  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">결과 이의 신청</h2>
              <p>
                이의신청한 내역을 조회하고 신청한 내역에 대해서 취소 처리를 할 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              placehold='이의 신청 결과를 확인 해보세요!'
              handleSearch={(val:any)=>{
                const update = {...input,keyword:val,objcReqstStartDate:dayjs(questBeginDay).format('YYYY-MM-DD'),objcReqstEndDate:dayjs(questEndDay).format('YYYY-MM-DD'),lastSlctnObjcProcessSttusCd:lastSlctnObjcProcessSttusCd};
                setInput(update);
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='이의 신청 결과를 확인 해보세요!'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box?assign_box.list:null}
            />
            ) : (
            <Box css={comstyles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>이의신청일</dt>
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
                <dt>신청상태</dt>
                <dd>
                  <Box className="box_scroll">
                    <CustomRadioButtons
                      row
                      data={assign_box ? assign_box.list : []}
                      onClick={(s: string) => {
                        setLastSlctnObjcProcessSttusCd(s);
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
                이의 신청
                <span className='data'><em>{total ? total : 0}</em> 건</span>
              </Typography>
              <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                <Typography style={{ fontSize:'16px'}}>제출상태 안내</Typography>
                <HtmlTooltip
                  open={open}
                  onClose={handleTooltipClose}
                  leaveTouchDelay = {30000}
                  title={
                    <React.Fragment>
                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                      <ul className='tooltip_list'>
                        <li><span className='clr01'>신청</span> 신청자가 이의 신청을 한 상태</li>
                        <li><span className='clr02'>접수완료</span> 담당자가 이의 신청을 받아들여 심의가 예정된 상태</li>
                        <li><span className='clr03'>반려</span> 담당자가 이의 신청을 반려한 상태</li>
                        <li><span className='clr05'>심의완료</span> 심의가 완료되어 심의결과가 입력된 상태</li>
                        <li><span className='clr06'>신청취소</span> 신청자가 신청을 취소한 상태</li>
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
            {list ? list?.length > 0 ? list.map((item : any , i:number) => (
              <div className="btn_cont" key={i}>
                <NavLink to={`/biz/EvaluationMgt/ObjectionDetail/${item.objcReqstId}`}
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
                          <Typography component="span" variant="body2" className="body2" color="text.primary">
                            <span>과제명 : <em>{item.taskNm}</em></span>
                          </Typography>
                          <br/>
                          <Typography component="span" variant="body2" className="body2" color="text.primary">
                            <span>평가단계 : <em>{item.evlStepNm}</em></span>
                          </Typography>
                          <br/>
                          <Typography component="span" variant="body2" className="body2" color="text.primary">
                            <span>이의신청일시 : <em>{item.objcReqstDate}</em></span>
                          </Typography>
                          <RceptStus stus={item.lastSlctnObjcProcessSttus}/>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                {item.lastSlctnObjcProcessSttus==="반려"?
                <div className="right_btn">
                <ModalReasonConfirm applyId={item.objcReqstId} viewNm="Objection"/>
                {/* EvaluationResultInquiry */}
                </div>
                :null}
              </div>
            )): <NoData /> : <NoData />}
            </List>
            {(input.itemsPerPage)<total?
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

export default Objection;
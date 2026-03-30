import React, { useState,useEffect, useRef, useCallback } from 'react';
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
import { fetchPlanList } from '~/fetches/biz/fetchContractMgt';
import DatePicker from "~/components/DatePicker";
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { initPlanInput, planInput } from '~/models/ModelBizPlanMgt';
import RceptStus from '../BusinessAppMgt/PopComp/RceptStus';
import NoData from '~/components/Loading/NoData';
import { ModalComponents } from '~/components/ModalComponents';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';
import { allCkCode } from '~/models/Model';

/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 협약관리 -> 사업계획서 관리
  회면ID    :   (UI-USP-FRN-0160101)
  화면/개발 :   Seongeonjoo / navycui
*/
const  BusinessPlanMgt = () => {
const today = new Date();
const theme = useTheme();
const codeBox = useRef<any>(null);
const [total, setTotal] = useState(0);
const {scrollY, direction} = useScroll();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const [input, setInput] = useState<planInput>(initPlanInput)
const [openErr, setOpenErr] = React.useState(false);
const [open, setOpen] = React.useState(false);

// 공통 코드 조회
const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("PLAN_PRESENTN_STTUS"));

// 사업계획서 목록 조회
const { 
  data:list,
  isError,
  error,
  refetch
  } = useQuery("fetchPlanList" + input.pblancNm + input.taskNmKo, async () => await fetchPlanList(input),{
    onError: (err:any)=>{
      setOpen(true)
    }
  });

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);
  

  useEffect(() => {
    refetch()
  }, [input]);

  const moreInfo = () => {
    const itemsPerPage:any = input.itemsPerPage + 10;
    setInput((state) => ({ ...state, itemsPerPage }));
  }

  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업계획서 관리</h2>
              <p>
                선정된 사업의 수행계획서를 작성 및 제출하고, 현재 접수상태를 확인할 수 있습니다. 
              </p>
            </div>
            <SelectSearchBar
              placehold='제출한 사업 계획서를 조회해보세요!'
              selectData={[{code:'',codeNm:'전체'},{code:'01',codeNm:'과제명'},{code:'02',codeNm:'공고명'}]}
              handleSearch={(val:string,sel:string)=>{
                if(!!sel){
                  if(sel == ''){
                    setInput(()=>({
                      ...input,pblancNm:'',taskNmKo:''
                    }))
                  } else if(sel == '01') {
                    setInput(()=>({
                      ...input,pblancNm:val
                    }))
                  } else {
                    setInput(()=>({
                      ...input,taskNmKo:val
                    }))
                  }
                }
                refetch()
              }}
              />
            {isMobile ? (
              <SearchModal
                placehold='제출한 사업 계획서를 조회해보세요!'
                handleSearch={(s:string | undefined,sdt:string,edt:string)=>{
                  setInput(()=>({
                    ...input,presentnDtStart:dayjs(sdt).format('YYYY-MM-DD'),presentnDtEnd:dayjs(edt).format('YYYY-MM-DD')
                  }))
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
                      questBeginDay={input.presentnDtStart}
                      questEndDay={input.presentnDtEnd}
                      changeStart={(startNewTime: Date | null)=>{
                        setInput(()=>({
                          ...input,presentnDtStart:dayjs(startNewTime).format('YYYY-MM-DD')
                        }))
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                      setInput(()=>({
                        ...input,presentnDtEnd:dayjs(endNewTime).format('YYYY-MM-DD')
                      }))
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
                      data={!!assign_box ? assign_box.list : []}
                      onClick={(s: string) => {
                        setInput(()=>({
                          ...input,planPresentnSttusCd:s
                        }))
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
                사업계획서
                <span className='data'><em>{list ? list.totalItems : 0}</em> 건</span>
              </Typography>
              <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                <Typography>제출상태 안내</Typography>
                <HtmlTooltip
                  open={open}
                  onClose={()=>setOpen(false)}
                  leaveTouchDelay = {30000}
                  title={
                    <React.Fragment>
                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                      <ul className='tooltip_list'>
                        <li><span className='clr01'>미제출</span> 사업계획서를 제출하지 않은 상태</li>
                        <li><span className='clr05'>제출</span> 사업계획서를 제출한 상태</li>
                        <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                        <li><span className='clr02'>승인</span> 담당자가 사업계획서에 대해 승인을 처리한 상태</li>
                      </ul>
                    </React.Fragment>
                  }
                  placement="bottom"
                >
                  <IconButton onClick={()=>setOpen(true)}>
                    <QuestionIcon />
                  </IconButton>
                </HtmlTooltip>
              </Stack>
            </Stack>
            <List>
            {!!list ? list.list.length > 0 ? list.list.map((item : any , i:number) => (
              <div className="btn_cont" key={i}>
                <NavLink to={`/biz/ContractMgt/BusinessPlanMgtDetail/${item.bsnsPlanDocId}`}
                  state={{item:item,total:total}}>
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
                        <RceptStus stus={!!item.planPresentnSttusNm ? item.planPresentnSttusNm : '접수상태'}/>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                <div className="right_btn">
                  {item.planPresentnSttusCd == 'PLPR03' ? 
                      <ModalReasonConfirm 
                        applyId={item.bsnsPlanDocId}
                        planPresentnSttusCd={item.planPresentnSttusCd}
                        viewNm='BusinessPlanMgt' 
                        title='사업계획서 상세'
                        variant='outlined'
                        label='사유확인'
                        type='modify'
                        color='outlined'
                    /> : null
                  }
                </div>
              </div>
            )): <NoData /> :  <NoData />}
            </List>
            {(input.itemsPerPage)<(!!list ? list.totalItems : 0)?
            // 더보기
            <Stack css={styles.bottom_btn} >
              <CustomButton label={'더보기'} type={'full'} color={'item'} style={{ margin: '10px 0' }} onClick={()=>moreInfo()} />
            </Stack>
            :null}
          </div>
        </div>
      </Box>
      <ModalComponents open={openErr} type={'normal'} content={isError ? error.response.data.message : ''} 
        onConfirm={() => { setOpenErr(false) }} 
        onClose={() => { setOpenErr(false)}}>
      </ModalComponents>
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

export default BusinessPlanMgt;
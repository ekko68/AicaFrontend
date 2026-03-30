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
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import DatePicker from '~/components/DatePicker';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { CustomRadioButtons } from '~/components/ButtonComponents';
import { fetchReportListGet } from '~/fetches/fetchReport';
import { reportListInput } from '~/models/ModelReport';
import RceptStus from '../BusinessAppMgt/PopComp/RceptStus';
import NoData from '~/components/Loading/NoData';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 평가관리 -> 평가결과조회
  회면ID    :   UI-USP-FRN-0160501
  화면/개발 :   Seongeonjoo / navycui
*/
const  ReportSubmission = () => {
  const today = new Date();
  const begin = new Date();
  begin.setDate(begin.getDate()-30)
  const theme = useTheme();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [questBeginDay, setQuestBeginDay] = React.useState<Date | null>(begin);
  const [questEndDay, setQuestEndDay] = React.useState<Date | null>(today);
  const [reprtSttusCd, setReprtSttusCd] = useState<string>("");

  const [input, setInput] = useState<reportListInput>({    
    presentnStartDate: dayjs(begin).format('YYYYMMDD').toString(),
    presentnEndDate: dayjs(today).format('YYYYMMDD').toString(),
    reprtTypeCd: null,
    reprtSttusCd: "",
    keyword: null,
    keywordDiv: null,
    page: 1,
    itemsPerPage: 10
  })
  console.log(questBeginDay)
  // 공통 코드 조회
  const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("REPRT_STTUS"));

  // 보고서 제출 목록 조회
  const getList = () => {
    fetchReportListGet(input).then((res:any) => {
      setList(res.list);
      setTotal(res.totalItems);
    })
  }
  const moreInfo = () => {
    const itemsPerPage:any = input.itemsPerPage + 10;
    setInput((state) => ({ ...state, itemsPerPage }));
  }
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  useEffect(() => {
    getList()
  }, [input]);
  console.log(list);
  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">보고서 제출</h2>
              <p>
                중간보고서 및 결과보고서 제출대상 과제를 조회하고, 제출할 수 있습니다.
              </p>
            </div>
            {/* 검색누르면 들어감*/}
            <SelectSearchBar
              placehold='보고서를 찾고 계신가요?'
              handleSearch={(val:any)=>{
                const update = {...input,keyword:val,presentnStartDate:dayjs(questBeginDay).format('YYYY-MM-DD'),presentnEndDate:dayjs(questEndDay).format('YYYY-MM-DD'),reprtSttusCd:reprtSttusCd};
                setInput(update);
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='보고서를 찾고 계신가요?'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box?assign_box.list:null}
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
                        if(startNewTime&&questEndDay&&(startNewTime>questEndDay)){
                          setQuestBeginDay(questEndDay)
                        }else{
                          setQuestBeginDay(startNewTime)
                        }
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
                        if (s.length > 0) console.log(s);
                        setReprtSttusCd(s);
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
                보고서
                <span className='data'><em>{total ? total : 0}</em> 건</span>
              </Typography>
              <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                <Typography style={{ fontSize:'16px'}}>제출상태 안내</Typography>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                      <ul className='tooltip_list'>
                        <li><span className='clr02'>제출요청</span> 사업담당자가 보고서 제출을 요청한 상태</li>
                        <li><span className='clr01'>제출</span> 보고서가 제출된 상태</li>
                        <li><span className='clr03'>보완요청</span> 사업담당자가 보고서 보완을 요청한 상태</li>
                        <li><span className='clr05'>접수완료</span> 사업담당자가 보고서에 대해 접수완료 처리한 상태</li>
                      </ul>
                    </React.Fragment>
                  }
                  placement="bottom-start"
                >
                  <IconButton>
                    <QuestionIcon />
                  </IconButton>
                </HtmlTooltip>
              </Stack>
            </Stack>
            <List>
            {list ? list.length > 0 ? list.map((item : any , i:number) => (
              <div className="btn_cont" key={i}>
                <NavLink to={`/biz/TaskManagement/ReportSubmissionDetail/${item.reprtId}`}
                  state={{ item:item ,
                  total:total}}>
                  <ListItem>
                    <ListItemText 
                      secondary={
                      <React.Fragment>
                        <span className="tit_body">
                          <Typography variant="body1" component="span">
                            {item.taskNm}
                          </Typography>
                        </span>
                        <Typography component="span" variant="body2" className="body2" color="text.primary">
                          <span>공고명 <em>{item.pblancNm}</em></span>
                        </Typography>
                        <span className="date">
                          <br/>
                          <span>과제책임자 <em>{item.rspnberNm}</em></span>
                          <br/>
                          {item.presentnDate?
                          <span>제출일시 <em>{(item.presentnDate)}</em></span>
                          :null}
                        </span>
                        <RceptStus stus={!!item.rceptSttus ? item.rceptSttus : '접수상태'}/>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                {item.rceptSttus==='제출요청' || item.rceptSttus==='보완요청' || item.rceptSttus==='접수완료'?
                <div className="right_btn">
                <ModalReasonConfirm applyId={item.reprtId} viewNm="ReportSubmission"/>
                </div>
                :null}
              </div>
            )):  <NoData /> : ''}
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

export default ReportSubmission;
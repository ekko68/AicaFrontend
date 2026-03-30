import * as styles from './styles';
import * as comstyles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, useMediaQuery, List, ListItem, ListItemText, Link } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomRadioButtons} from '~/components/NoticeCustomCheckBoxs';
import dayjs from 'dayjs';
import {useQuery} from "react-query";
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';
import DatePicker from '~/components/DatePicker';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { fetchEvlResultChk, fetchEvlResultListGet } from '~/fetches/fetchEvlResult';
import { useEffect } from "react";
import { Modalfront } from '~/components/SharedModalComponents';
import { useGlobalModalStore, useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';
import NoData from '~/components/Loading/NoData';
// import {modalType} from "~/models/ModelBiz";

/* 
  작성일    :   2022/06/26
  화면명    :   사업관리 -> 평가관리 -> 평가결과조회
  회면ID    :   UI-USP-FRN-0160501
  화면/개발 :   Seongeonjoo / navycui
*/
const  EvaluationResultInquiry = () => {
  const today = new Date();
  const begin = new Date();
  const theme = useTheme();
  begin.setDate(begin.getDate()-30)
  const [total, setTotal] = useState(0);
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [questBeginDay, setQuestBeginDay] = React.useState<Date | null>(begin);
  const [questEndDay, setQuestEndDay] = React.useState<Date | null>(today);

  const [input, setInput] = useState({
    // slctnBgnde : dayjs(questBeginDay).format('YYYY-MM-DD'),
    // slctnEndde : dayjs(questEndDay).format('YYYY-MM-DD'),
    slctnResult : "",
    keyword : "",
    keywordDiv : "",
    page : 1,
    itemsPerPage : 10,
  })
 
 const assign_box = [{code:"Y", codeNm:"선정"},{code:"N", codeNm:"탈락"}]
 // 수행계획서 목록 조회
 const { 
   data:list ,
   status,
   refetch : reSearchList
  } = useQuery("fetchEvlResultListGet", async () => await fetchEvlResultListGet(input),{
    onSuccess: (res:any) => {
      setTotal(res.totalItems)
    }
  });
  useEffect(()=>{
    reSearchList();
  },[input])

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

  const checkSlctnAt = (slctnAt : string) => {
    if(slctnAt==="Y"){
      return "선정"
    }else if(slctnAt==="N"){
      return "탈락"
    }
  }
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'normal' | 'confirm'>('normal');
  const [data, setData] = useState(false);
  const [resVal,setResVal]:any = useState()
  const {addModal} = useGlobalModalStore();
  const [applyId,setApplyId] = useState("");
  const reasonConfirm = (id : string) =>{
    setOpen(true);
    setType(type);
    fetchEvlResultChk(id).then((res:any) => {
            setApplyId(id);
            setResVal(res)
      }).catch((e)=>{
        let message = e.response.data.message;
        addModal({
          open:true,
          content:message
        })
      })
  }
  return (
  <>
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" ref={measuredRef} component={'div'} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">평가결과조회</h2>
              <p>
                평가가 완료된 과제의 평가결과와 의견을 조회할 수 있습니다.
              </p>
            </div>
            <SelectSearchBar
              placehold='평가결과를 조회해보세요!'
              handleSearch={(val:any)=>{
                setInput((state) => ({ ...state, keyword:val }))
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='평가결과를 조회해보세요!'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box ? assign_box : []}
              />
            ) : (
            <Box css={comstyles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>평가일</dt>
                <dd>
                <Box className="box_scroll">
                  <DatePicker
                      pickerType='two' 
                      questBeginDay={questBeginDay?.toString()}
                      questEndDay={questEndDay?.toString()}
                      changeStart={(startNewTime: Date | null)=>{
                        setQuestBeginDay(startNewTime)
                        setInput((state) => ({ ...state, slctnBgnde : dayjs(startNewTime).format('YYYY-MM-DD') }));
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                      setQuestEndDay(endNewTime)
                      setInput((state) => ({ ...state, slctnEndde : dayjs(endNewTime).format('YYYY-MM-DD') }));
                    }}
                    />
                  </Box>
                </dd>
              </dl>
              <dl>
                <dt>평가결과</dt>
                <dd>
                <Box className="box_scroll">
                  <CustomRadioButtons
                    row
                    data={assign_box ? assign_box : []}
                    onClick={(s: string) => {
                      console.log(s);
                      if(s==="all"){
                        setInput((state) => ({ ...state, slctnResult:"" }));
                      }
                      if (s.length > 0) console.log(s);
                      setInput((state) => ({ ...state, slctnResult:s}));
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
                평가결과
                <span className='data'><em>{list ? list.totalItems : 0}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {(status == 'success') ? list.list.map((item : any , i:number) => (
                <div className="btn_cont" key={i}>
                <Link onClick={()=>reasonConfirm(item.evlTrgetId)} underline="none">
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
                          <span>평가단계<em>{item.evlStepNm}</em></span>
                          <span>평가일<em>{item.evlDe?dayjs(item.evlDe).format('YYYY-MM-DD'):null}</em></span>
                        </span>
                        <div className="right_tag">
                          <em>{checkSlctnAt(item.slctnAt)}</em>
                        </div>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
                  {item.objcReqstAt==="Y"?
                  <div className="right_btn">
                    <ModalReasonConfirm applyId={item.evlTrgetId} viewNm="ObjectionApply" title='결과이의신청' label='이의신청'>
                    </ModalReasonConfirm>
                    {/* Objection */}
                  </div>
                  :null}
                </div>
            )): <NoData/>}
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
    <Modalfront
          open={open}
          type={type}
          title={'평가의견 확인'}
          content={type.toString() + ' 모달'}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
            if (data) setData(false);
          }}
        >
          <Box css={styles.table} style={{width:'932px', marginTop: '24px'}}>
            <div className="detail_table"> 
              <dl>
                <dt>공고명</dt>
                <dd>{resVal?.pblancNm}</dd>
              </dl>
              <dl>
                <dt>과제명</dt>
                <dd>{resVal?.taskNmKo}</dd>
              </dl>
              <dl>
                <dt>접수번호</dt>
                <dd>{resVal?.receiptNo}</dd>
                <dt>처리상태</dt>
                <dd className="withLink">{resVal?.slctnAt==='Y'?'선정':'탈락'}
                   <ModalReasonConfirm applyId={applyId} viewNm="ObjectionApply" title='결과이의신청' label='이의신청' variant='text'/>
                </dd>
              </dl>
            </div>
          </Box>
          <Typography gutterBottom variant="h6" className="pop_title" component="div" sx={{marginTop:'25px'}}>{'평가위원 의견'}</Typography>
          <Box css={styles.table}>
            <div className="detail_table"> 
              {resVal?.evlOpinionList?.map((item:any)=>(
                    <dl>
                      <dt>{item.expertNm}</dt>
                      <dd>{item.evlOpinion}</dd>
                    </dl>
              ))}
            </div>
          </Box>
          <Stack direction="row" css={styles.btn_next} justifyContent="center" spacing={2} sx={{marginTop: '14px',paddingTop:'24px',borderTop:'1px solid #e0e0e0'}}>
            <CustomButton label={'확인'} type={'modalBtn'} color={'primary'} onClick={()=>setOpen(false)}/>
          </Stack>
      </Modalfront>
  </>
  );
}

export default EvaluationResultInquiry;
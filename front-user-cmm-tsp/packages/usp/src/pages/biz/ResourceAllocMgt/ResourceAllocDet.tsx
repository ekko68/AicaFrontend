import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import * as comstyles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, useMediaQuery, List, ListItem, ListItemText, TooltipProps, Tooltip, tooltipClasses, Input } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomRadioButtons} from '~/components/NoticeCustomCheckBoxs';
import { NavLink } from 'react-router-dom';
import { fetchGetCommCode } from '~/fetches';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import {useQuery} from "react-query";
import DatePicker from "~/components/DatePicker";
import { SearchBar } from '~/components/BizCommon/SearchBar';
import { ModalReasonConfirm } from '../BusinessAppMgt/PopComp/ModalReasonConfirm';
import { SearchModal } from '~/components/BizCommon/SearchModal';
import { initPlanInput, planInput } from '~/models/ModelBizPlanMgt';
import { fetechUserResourceGet } from '~/fetches/fetchResource';
import NoData from '~/components/Loading/NoData';
import RceptStus from '../BusinessAppMgt/PopComp/RceptStus';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/07/21
  화면명    :   사업관리 -> 자원 할당 관리 -> 자원할당내역
  회면ID    :   (UI-USP-FRN-0260101)
  화면/개발 :   YongheeKim / navycui
*/
const  ResourceAllocDet = () => {
  const today = new Date();
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));   

  const [questBeginDay, setQuestBeginDay] = React.useState<Date | null>(today);
  const [questEndDay, setQuestEndDay] = React.useState<Date | null>(today);
  const [planPresentnSttusCd, setPlanPresentnSttusCd] = useState<string>("");
  const [input, setInput] = useState<planInput>(initPlanInput)

  // 공통 코드 조회
  const {data:assign_box} = useQuery("getCode", async () => await fetchGetCommCode("ALRSRC_ST"));
  const {data:list} = useQuery("fetechUserResourceGet", async () => await fetechUserResourceGet());

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

  function modalClick(){
    let myInput:any = document.getElementById("modalHidden");
    myInput.click();
  }
  return (
    <div css={comstyles.container}>
      <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">자원할당내역</h2>
              <p>
              자원할당 사업을 통해 할당받은 자원을 조회할 수 있습니다.
              </p>
            </div>
            <SearchBar
              placehold='할당 받은 자원을 조회해보세요!' 
              handleSearch={(val:any)=>{
                const update = {...input,keyword:val,objcReqstStartDate:dayjs(questBeginDay).format('YYYY-MM-DD'),objcReqstEndDate:dayjs(questEndDay).format('YYYY-MM-DD'),planPresentnSttusCd:planPresentnSttusCd};
                setInput(update);
              }}
            />
            {isMobile ? (
              <SearchModal
                placehold='할당 받은 자원을 조회해보세요!'
                handleSearch={(s:string | undefined)=>{
                  console.log(s)
                }}
                assign_box={assign_box?.list}
              />
            ) : (
            <Box css={comstyles.picker_card} style={{display: direction ? "none" : ""}}>
              <dl>
                <dt>이용시작일</dt>
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
                <dt>이용상태</dt>
                <dd>
                  <Box className="box_scroll">
                    <CustomRadioButtons
                      row
                      data={assign_box ? assign_box.list : []}
                      onClick={(s: string) => {
                        setPlanPresentnSttusCd(s);
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
      <Box css={comstyles.sub_cont02}sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
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
                자원할당내역
                <span className='data'><em>{list ? list.totalItems : 0}</em> 건</span>
              </Typography>
            </Stack>
            <List>
            {!!list ? list.list.length > 0 ? list.list.map((item : any , i:number) => (
              <div className="btn_cont" key={i} onClick={modalClick}>
                <NavLink to={''}>
                  <ListItem>
                    <ListItemText 
                      secondary={
                      <React.Fragment>
                        <span className="tit_body">
                          <Typography variant="body1" component="span">
                            {item.bsnsNm}
                          </Typography>
                        </span>
                        <br/>
                        <span className="date">
                          <span>이용기간 : <em>{dayjs(item.alrscsBgngDay).format('YYYY-MM-DD')+" ~ "+dayjs(item.alrscsEndDay).format('YYYY-MM-DD')}</em></span>
                        </span>
                        <RceptStus stus={!!item.rceptSttus ? item.rceptSttus : '접수상태'}/>
                      </React.Fragment>
                      }
                    />
                  </ListItem>
                </NavLink>
                  <div className="right_btn" hidden id="modalHidden">
                      <ModalReasonConfirm applyId={item.alrsrcId} viewNm="ModalResAlloc"/>
                  </div>
              </div>
            )):  <NoData /> : <NoData />}
            </List>
            {(input.itemsPerPage)<list?.totalItems?
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

export default ResourceAllocDet;
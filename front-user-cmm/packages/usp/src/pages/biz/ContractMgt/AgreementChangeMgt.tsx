import React, { useCallback, useEffect, useRef } from "react"
import { useState } from 'react';
import * as styles from './styles';
import * as comstyles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Tabs, Tab, Stack, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CustomButton } from '~/components/ButtonComponents';
import { CustomSelect} from '~/components/SelectBoxComponents';
import { ModalReasonConfirm } from "../BusinessAppMgt/PopComp/ModalReasonConfirm";
import fetchAgreementChangeMgt, { fetchBsnsYearGet, fetchCnvnChangeGet, fetchTaskNmGet } from "~/fetches/biz/fetchAgreementChangeMgt";
import { ModalComponents } from '~/components/ModalComponents';
import { useGlobalScroll, useScroll } from "~/pages/store/GlobalModalStore";
import { useNavigate } from 'react-router-dom';


// 협약변경관리
function AgreementChangeMgt() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [data,setData]:any = useState();
  const [value1,setValue1] = useState("");
  const [value2,setValue2] = useState("");

  const [taskNm,setTaskNm] = useState([]);
  const [bsnsYear,setBsnsYear] = useState([]);
  const getData = (bsnsYear:string , taskNm:string) => {
    const params = {
      bsnsYear : bsnsYear,
      taskNmKo : taskNm
    }
    fetchAgreementChangeMgt(params).then((res:any)=>{
      setData(res);
    }).catch((e:any)=>{
      setOpen(true);
      setError(e.response.data.message)
      // addModal({
      //   open: true,
      //   content: e.response.data.message,
      //   type: 'normal'
      // });
    })
  }

  const getSnsYear = () => {
    fetchBsnsYearGet().then((res:any)=>{  
        setValue1(res.list[0])
  
        let taskBox:any = [];
        let yearBox:any = [];
        res.list.map((item:any , i:number)=>{
          yearBox.push({code : item, codeNm : item})
          const params = {
            bsnsYear : item
          }
          fetchTaskNmGet(params).then((taskNm:any)=>{
            taskNm.list.map((task:any)=>{
              taskBox.push({code : task, codeNm : task});
            })
            if(i===0){
              setValue2(taskNm.list[0])
              getData(res.list[0],taskNm.list[0])
            }
          })
        
        })
        setBsnsYear(yearBox);
        setTaskNm(taskBox);
    }).catch((e:any)=>{
      setOpen(true);
      setError(e.response.data.message)
      // addModal({
      //   open: true,
      //   content: e.response.data.message,
      //   type: 'normal'
      // });
    })
  }

  const [params, setParams] = useState({
    page : 1,
    itemsPerPage : 10,
  })
  const [total, setTotal] = useState(0);
  const [applyList,setApplyList] = useState([]);
  const getApplyList = () => {
    fetchCnvnChangeGet(params).then((res:any)=>{
      setApplyList(res.list)
      setTotal(res.totalItems);
    }).catch((e:any)=>{
      setOpen(true);
      setError(e.response.data.message)
      // addModal({
      //   open: true,
      //   content: e.response.data.message,
      //   type: 'normal'
      // });
    })
  }
  const moreInfo = () => {
    const itemsPerPage:any = params.itemsPerPage + 10;
    setParams((state) => ({ ...state, itemsPerPage }));
  }

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  useEffect(()=>{
    getSnsYear()
  },[])
  useEffect(()=>{
    getApplyList()
  },[params])

  const check = (a : string) => {
    if(a==="신청"){
      return "right_tag"
    }else if(a==="반려"){
      return "right_tag green"
    }else if(a==="승인"){
      return "right_tag blue"
    }else{
      return "right_tag"
    }
  }


  const checkList = (a : string) => {
    let b = false
    data?.cmmtCode?.map((item:any)=>{
      if(a===item.codeNm){
        b = true
      }
    } 
    )
    return b
  }

  return (
    <div css={comstyles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false);navigate(-1); }} 
        onClose={() => { setOpen(false);navigate(-1);}}>
      </ModalComponents>
    <Box css={comstyles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
      <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
        <BreadCrumb />
        <div className="content">
          <div className="txtbox">
            <h2 className="tit">협약변경 관리</h2>
            <p>협약내용 변경 신청을 하고 신청처리 내역을 조회할 수 있습니다. </p>
          </div>
          <div className='tab_wrap double'>
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
              <Tab label="변경요청" {...a11yProps(0)} />
              <Tab label="신청요청" {...a11yProps(1)} />
            </Tabs>
          </div>
        </div>
      </Box>
    </Box>
    <Box css={comstyles.sub_cont02} sx={{ marginTop:( direction ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
      <div className='content_body'>
        <div className="content">
          <TabPanel value={value} index={0}>
            <Stack direction={'row'} justifyContent={''} alignItems={'flex-start'} css={styles.selectBox}>
              <div className='item1'>
                <h4 className="tbl_title">사업년도</h4>
                <CustomSelect 
                value={value1} 
                data={bsnsYear} 
                onClick={(selected) => {
                  setValue1(selected)
                }}
                />
              </div>
              <div className='item2'>
                <h4 className="tbl_title">과제명</h4>
                <CustomSelect
                value={value2} 
                data={taskNm} 
                onClick={(selected) => {
                  setValue2(selected)
                }}
                />
              </div>
              <CustomButton label={'선택'} type={'modalBtn'} color={'primary'} onClick={()=>(getData(value1 , value2))}/>
            </Stack>
            {data?
            <Box css={styles.table}>
              <h4 className="tbl_title">기본정보</h4>
              <div className="detail_table"> 
                <dl>
                  <dt>사업명</dt>
                  <dd>{data?.bsnsNm}</dd>
                  <dt>과제명</dt>
                  <dd>{data?.taskNmKo}</dd>
                </dl>
                <dl>
                  <dt>협약기간</dt>
                  <dd>{data?.cnvnDePdAll}</dd>
                  <dt>접수번호</dt>
                  <dd>{data?.receiptNo}</dd>
                </dl>
              </div>
            </Box>
            :null}
            {data?.cmmtCode ?
            <Box css={styles.table}>
              <h4 className="tbl_title">승인정보</h4>
              <div className="detail_table type3 tbl_01"> 
                <dl>
                  {checkList("수행기관신분")?
                  <>
                  <dt>수행기관신분(개인 → 사업자)</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                  {checkList("과제정보")?
                  <>
                  <dt>과제정보</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp00/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                </dl>
                <dl>
                  {checkList("참여기업")?
                  <>
                  <dt>참여기업</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp01/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                  {checkList("참여인력")?
                  <>
                  <dt>참여인력</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp02/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
              </dl>
                <dl>
                  {checkList("사업비")?
                  <>
                  <dt>사업비</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp03/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                  {checkList("비목별사업비")?
                  <>
                  <dt>비목별사업비</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp04/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                </dl>
              </div>
            </Box>
            :null}
            {data?.cmmtCode ?
            <Box css={styles.table}>
              <h4 className="tbl_title">통보정보</h4>
              <div className="detail_table type3 tbl_01"> 
                <dl>
                  {checkList("신청자정보")?
                  <>
                  <dt>신청자정보</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp05/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                  {checkList("과제책임자")?
                  <>
                  <dt>과제책임자</dt>
                  <dd>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp06/${data?.bsnsCnvnId}`}
                  state={data}
                  >
                    <CustomButton label={'변경신청'} type={'modalBtn2'} color={'outlined'} />
                  </NavLink>
                  </dd>
                  </>
                  :null}
                </dl>
              </div>
            </Box>
            :null}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div css={styles.detal_list} className="list02">
              <Stack
                spacing={6}
                direction="row"
                className="sub_tit"
                justifyContent="space-between"
              >
                <Typography variant="h4" component="div">
                  신청내역서
                  <span className='data'><em>{total}</em> 건</span>
                </Typography>
              </Stack>
              <List>
              {applyList.map((item:any, i:number)=>(
                <div className="btn_cont" key={i}>
                  <NavLink to={`/biz/ContractMgt/AgreementChangeMgtApp${item.bsnsCnvnId}이런식으로 쓰기/${item.bsnsCnvnId}`}
                  state={item}
                  >
                    <ListItem>
                      <ListItemText 
                        secondary={<React.Fragment>
                          <span className="tit_body">
                            <Typography variant="body1" component="span">
                              변경항목 : {item.changeIemDivNm}
                            </Typography>
                          </span>
                          <div className="sub_cnt">
                              <span>과제명</span><em>[K13432] {item.taskNmKo}</em>
                          </div>
                          <div className="sub_cnt">
                              <span>변경사유</span><em>{item.resnCn}</em>
                          </div>
                          <div className="sub_cnt">
                              <span>신청일</span><em>{item.reqDe}</em>
                          </div>
                          <div className={check(item.cnvnChangeSttusNm)}>
                            <em>{item.cnvnChangeSttusNm}</em>
                          </div>
                        </React.Fragment>
                        }
                      />
                    </ListItem>
                  </NavLink>
                  <div className="right_btn">
                    <ModalReasonConfirm applyId='idtest' viewNm="AgreementChangeMgtDetail" title="사업계획서 상세"/>
                  </div>
                </div>
              ))}
              </List>
              {(params.itemsPerPage)<total?
              // 더보기
              <Stack css={styles.bottom_btn} >
                <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={()=>moreInfo()} />
              </Stack>
              :null}
            </div>
          </TabPanel>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default AgreementChangeMgt;


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
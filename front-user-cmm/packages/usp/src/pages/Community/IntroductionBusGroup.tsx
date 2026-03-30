import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import { fetchMvnFc } from "~/fetches";
import { IntroductionBusGroupList } from "./View/IntroductionBusGroupList";
import { useGlobalScroll, useScroll } from "../store/GlobalModalStore";


function IntroductionBusGroup() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [params, setParams] = useState({
    mvnFcDtype : "",
    page : 1,
    itemsPerPage : 8,
  })

  const [list0, setList0] = useState([]);
  const [total0, setTotal0] = useState(0);
  const [list1, setList1] = useState([]);
  const [total1, setTotal1] = useState(0);
  const [list2, setList2] = useState([]);
  const [total2, setTotal2] = useState(0);
  const [list3, setList3] = useState([]);
  const [total3, setTotal3] = useState(0);
  const [list4, setList4] = useState([]);
  const [total4, setTotal4] = useState(0);
  const [list5, setList5] = useState([]);
  const [total5, setTotal5] = useState(0);
  const [list6, setList6] = useState([]);
  const [total6, setTotal6] = useState(0);

  //목록 가져오기
  const getList = async () => {
    let param1 = ({...params,mvnFcDtype : "MEETING"})
    let param2 = ({...params,mvnFcDtype : "LECTURE"})
    let param3 = ({...params,mvnFcDtype : "FITNESS"})
    let param4 = ({...params,mvnFcDtype : "SLEEP"})
    let param5 = ({...params,mvnFcDtype : "COUNSEL"})
    let param6 = ({...params,mvnFcDtype : "BOOTH"})
    const box = await Promise.all([fetchMvnFc(params),fetchMvnFc(param1),fetchMvnFc(param2),fetchMvnFc(param3),fetchMvnFc(param4),fetchMvnFc(param5),fetchMvnFc(param6)])
    setList0(box[0].list)
    setTotal0(box[0].totalItems)
    setList1(box[1].list)
    setTotal1(box[1].totalItems)
    setList2(box[2].list)
    setTotal2(box[2].totalItems)
    setList3(box[3].list)
    setTotal3(box[3].totalItems)
    setList4(box[4].list)
    setTotal4(box[4].totalItems)
    setList5(box[5].list)
    setTotal5(box[5].totalItems)
    setList6(box[6].list)
    setTotal6(box[6].totalItems)
  }

  //최초 데이터 세팅
  useEffect(() => {
    getList();
  },[])
  useEffect(() => {
    if(params.itemsPerPage!==8){
      fetchMvnFc(params).then((res:any) => {
        if(params.mvnFcDtype === ""){
          setList0(res.list)
        }else if(params.mvnFcDtype === "MEETING"){
          setList1(res.list)
        }else if(params.mvnFcDtype === "LECTURE"){
          setList2(res.list)
        }else if(params.mvnFcDtype === "FITNESS"){
          setList3(res.list)
        }else if(params.mvnFcDtype === "SLEEP"){
          setList4(res.list)
        }else if(params.mvnFcDtype === "COUNSEL"){
          setList5(res.list)
        }else if(params.mvnFcDtype === "BOOTH"){
          setList6(res.list)
        }
      })
    }
  },[params])  

  const moreInfo = () => {
    const itemsPerPage:number = params.itemsPerPage + 8;
    setParams((state) => ({...state, itemsPerPage}));
  }

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
    if(newValue===0){
      setParams({...params,mvnFcDtype : "",itemsPerPage : 8})
    }else if(newValue === 1){
      setParams({...params,mvnFcDtype : "MEETING",itemsPerPage : 8})
    }else if(newValue === 2){
      setParams({...params,mvnFcDtype : "LECTURE",itemsPerPage : 8})
    }else if(newValue === 3){
      setParams({...params,mvnFcDtype : "FITNESS",itemsPerPage : 8})
    }else if(newValue === 4){
      setParams({...params,mvnFcDtype : "SLEEP",itemsPerPage : 8})
    }else if(newValue === 5){
      setParams({...params,mvnFcDtype : "COUNSEL",itemsPerPage : 8})
    }else if(newValue === 6){
      setParams({...params,mvnFcDtype : "BOOTH",itemsPerPage : 8})
    }
  };
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={scrollY ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -11px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">시설 예약</h2>
              <p>입주기업은 물론 누구나 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p>
            </div>
            <div className='tab_wrap'>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={
                  <>
                    <span>{'전체'}</span>
                    <em>{total0}</em>
                  </>
                } {...a11yProps(0)} />
                <Tab 
                label={
                  <>
                    <span>{'회의실'}</span>
                    <em>{total1}</em>
                  </>
                }
                {...a11yProps(1)} />
                <Tab 
                label={
                  <>
                    <span>{'강의실'}</span>
                    <em>{total2}</em>
                  </>
                }
                {...a11yProps(2)} />
                <Tab 
                label={
                  <>
                    <span>{'헬스장'}</span>
                    <em>{total3}</em>
                  </>
                }
                {...a11yProps(3)} />
                <Tab 
                label={
                  <>
                    <span>{'수면실'}</span>
                    <em>{total4}</em>
                  </>
                }
                {...a11yProps(4)} />
                <Tab 
                label={
                  <>
                    <span>{'상담실'}</span>
                    <em>{total5}</em>
                  </>
                }
                {...a11yProps(5)} />
                <Tab 
                label={
                  <>
                    <span>{'홈부스'}</span>
                    <em>{total6}</em>
                  </>
                }
                {...a11yProps(6)} />
              </Tabs>
            </div>
          </div>
        </Box>
      </Box>
      <Box sx={{ marginTop:( scrollY ? `${height + 139}px` : `${height}px` )}}>
        <div className='content_body'>
          <div className="content" style={{paddingBottom:0}}>
          <TabPanel value={value} index={0}>
            <IntroductionBusGroupList
              value={value}
              list={list0}
              total={total0}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>  
            <IntroductionBusGroupList
              value={value}
              list={list1}
              total={total1}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>        
            <IntroductionBusGroupList
              value={value}
              list={list2}
              total={total2}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>        
            <IntroductionBusGroupList
              value={value}
              list={list3}
              total={total3}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>        
            <IntroductionBusGroupList
              value={value}
              list={list4}
              total={total4}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
          <TabPanel value={value} index={5}>     
            <IntroductionBusGroupList
              value={value}
              list={list5}
              total={total5}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
          <TabPanel value={value} index={6}>       
            <IntroductionBusGroupList
              value={value}
              list={list6}
              total={total6}
              itemsPerPage={params.itemsPerPage}
              moreInfo={moreInfo}
            />
          </TabPanel>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default IntroductionBusGroup;


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
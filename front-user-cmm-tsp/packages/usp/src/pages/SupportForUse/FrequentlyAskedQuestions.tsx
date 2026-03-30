import * as styles from '~/styles/styles';
import React, { useEffect, useState,useRef, useCallback} from 'react';
import {fetchFrequentlyAskedQuestions} from '~/fetches';
import BreadCrumb from '~/components/BreadCrumb';
import {Tab, Tabs, Typography, Box, useTheme, useMediaQuery} from '@mui/material';
import { FrequentlyAskedQuestionsList } from './View/FrequentlyAskedQuestionsList';
import { useGlobalModalStore, useGlobalScroll, useScroll } from '../store/GlobalModalStore';
import { SelectSearchBar } from '~/components/BizCommon/SearchBar';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// 이용지원/ ->  자주묻는질문 페이지
function FrequentlyAskedQuestions() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const {addModal} = useGlobalModalStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchInput:any = useRef("");
  const [params, setParams] = useState({
    posting : true,
    articleSrchCd : "",
    articleSrchWord : "",
    page : 1,
    itemsPerPage : 10,
    categoryCd : "",
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
  const [value, setValue] = useState(0);
  const [age, setAge] = React.useState('');
  
  //카테고리별 목록 가져오기
  const getList = async () => {
  let param1 = ({...params,categoryCd : "CATE-QNA-01"});
  let param2 = ({...params,categoryCd : "CATE-QNA-02"});
  let param3 = ({...params,categoryCd : "CATE-QNA-03"});
  let param4 = ({...params,categoryCd : "CATE-QNA-04"});
  const box = await Promise.all([
    fetchFrequentlyAskedQuestions(params)
    .then()
    .catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    }),fetchFrequentlyAskedQuestions(param1)
    .then()
    .catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    }),fetchFrequentlyAskedQuestions(param2)
    .then()
    .catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    }),fetchFrequentlyAskedQuestions(param3)
    .then()
    .catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    }),
    fetchFrequentlyAskedQuestions(param4)
    .then()
    .catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    })])
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
  }

  //최초 데이터 세팅
  useEffect(() => {
    getList();
  },[params])

  useEffect(() => {
    if(params.itemsPerPage!==10){
      fetchFrequentlyAskedQuestions(params).then((res:any) => {
        if(params.categoryCd === ""){
          setList0(res.list)
        }else if(params.categoryCd === "CATE-QNA-01"){
          setList1(res.list)
        }else if(params.categoryCd === "CATE-QNA-02"){
          setList2(res.list)
        }else if(params.categoryCd === "CATE-QNA-03"){
          setList3(res.list)
        }else if(params.categoryCd === "CATE-QNA-04"){
          setList4(res.list)
        } 
      })
      .catch((e)=>{
        let message = e.response.data.message;
        addModal({
          open: true,
          content: message
        })
      })
    }
  },[params])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const moreInfo = () => {
    const itemsPerPage:number = params.itemsPerPage + 10;
    setParams((state) => ({ ...state, itemsPerPage }));
  }
  
  // 탭 변경
  const handleChangeTap = (event: React.SyntheticEvent, newValue: number) => {
      event.preventDefault();
      setValue(newValue);
      if(newValue===0){
        setParams({...params,categoryCd : "",itemsPerPage : 10})
      }else if(newValue === 1){
        setParams({...params,categoryCd : "CATE-QNA-01",itemsPerPage : 10})
      }else if(newValue === 2){
        setParams({...params,categoryCd : "CATE-QNA-02",itemsPerPage : 10})
      }else if(newValue === 3){
        setParams({...params,categoryCd : "CATE-QNA-03",itemsPerPage : 10})
      }else if(newValue === 4){
        setParams({...params,categoryCd : "CATE-QNA-04",itemsPerPage : 10})
      }
  };
    
  // 검색 버튼
  const handleClickSearch = () => {
      Search();
  } 
    
  const onKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      Search();
    }
  };  
    
  const Search = () =>{
    const inputValue = searchInput.current.value;
      if(inputValue !== ""){
        setParams({...params,itemsPerPage:10, articleSrchWord : inputValue});
      }else{
        setParams({...params,itemsPerPage:10, articleSrchWord : ""});
      }
  }

        return (
          <div css={styles.container}>
            <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
              <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
                <BreadCrumb />
                <div className="content">
                  <div className="txtbox">
                    <h2 className="tit">
                      자주묻는질문
                    </h2>
                    <p>
                      AICA에 반복적으로 문의되는 질문들을 모아 놓았습니다.<br/>
                      자주묻는질문에서 궁금하신 점을 먼저 찾아보시면 궁금한 점을 바로 해결하실 수 있습니다. 
                    </p>
                  </div>
                  <SelectSearchBar
                    selectData={[{codeNm:"전체" , code:""},{codeNm:"제목", code:"TITLE"},{codeNm:"내용",code:"CONTENT"}]}
                    placehold='어떤 공지사항을 찾고 계신가요?'
                    handleSearch={(searchInput:string,sel:string)=>{
                      setParams((state) => ({ ...state, articleSrchCd:sel ,articleSrchWord:searchInput}))
                    }}
                  />
                </div>
                <Box css={styles.detal_tab}>
                  <Tabs
                    value={value}
                    onChange={handleChangeTap}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label={
                        <>
                          <span>{'전체'}</span>
                        </>
                      }
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={
                        <>
                          <span>{'자원/신청'}</span>
                        </>
                      }
                      {...a11yProps(1)}
                    />
                    <Tab
                      label={
                        <>
                          <span>{'시설/운영'}</span>
                        </>
                      }
                      {...a11yProps(2)}
                    />
                    <Tab
                      label={
                        <>
                          <span>{'가입/변경'}</span>
                        </>
                      }
                      {...a11yProps(3)}
                    />
                    <Tab
                      label={
                        <>
                          <span>{'기타'}</span>
                        </>
                      }
                      {...a11yProps(4)}
                    />
                  </Tabs>
                </Box>
              </Box>
            </Box>
            {/* 탭 영역 시작*/}
            <Box sx={{ width: '100%',marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
              <TabPanel value={value} index={0}>
                {/* <div>전체</div> */}
                <FrequentlyAskedQuestionsList
                  value={value}
                  list={list0}
                  total={total0}
                  itemsPerPage={params.itemsPerPage}
                  moreInfo={moreInfo}
                />
              </TabPanel>  
              <TabPanel value={value} index={1}>
                {/* <div>자원/신청</div> */}
                <FrequentlyAskedQuestionsList
                  value={value}
                  list={list1}
                  total={total1}
                  itemsPerPage={params.itemsPerPage}
                  moreInfo={moreInfo}
                />
              </TabPanel>  
              <TabPanel value={value} index={2}>
                {/* <div>시설/운영</div> */}
                <FrequentlyAskedQuestionsList
                  value={value}
                  list={list2}
                  total={total2}
                  itemsPerPage={params.itemsPerPage}
                  moreInfo={moreInfo}
                />
              </TabPanel>  
              <TabPanel value={value} index={3}>
                {/* <div>가입/변경</div> */}
                <FrequentlyAskedQuestionsList
                  value={value}
                  list={list3}
                  total={total3}
                  itemsPerPage={params.itemsPerPage}
                  moreInfo={moreInfo}
                />
              </TabPanel>  
              <TabPanel value={value} index={4}>
                {/* <div>기타</div> */}
                <FrequentlyAskedQuestionsList
                  value={value}
                  list={list4}
                  total={total4}
                  itemsPerPage={params.itemsPerPage}
                  moreInfo={moreInfo}
                />
              </TabPanel>  
            </Box>
            </div>
          );
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
        <Box sx={{ p: 2 }}>
          <Typography component="div">{children}</Typography>
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

export default FrequentlyAskedQuestions;
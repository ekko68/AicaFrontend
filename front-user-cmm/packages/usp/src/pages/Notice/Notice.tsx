/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect, useRef, useCallback} from 'react'
import {
  TabPanelProps,
  swiperParams,
  alwaysCurrencies,
  Noticeitems,
  groupId,
  paramsType,
  SttusType
} from "./NoticeModel";
import * as styles from '~/styles/styles';
import {
  useTheme,
  Tab,
  Tabs,
  Button,
  Typography,
  Box,
  Paper,
  useMediaQuery,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  Chip,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import {fetchNotice, fetchNoticeCloseing, fetchGetCommCode} from '~/fetches';
import BreadCrumb from '~/components/BreadCrumb';
import {CustomCheckBoxs, CustomRadioButtons} from '~/components/NoticeCustomCheckBoxs';
import {useGlobalModalStore, useScroll} from "../store/GlobalModalStore";
import {NoticeModalMobile} from './NoticeModalMobile';
import {useQueries} from 'react-query';
import {SearchBar} from '~/components/BizCommon/SearchBar';
import {SelectIcon} from '~/components/IconComponents';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Autoplay, Pagination} from 'swiper';
import {NavLink} from 'react-router-dom';
import NoData from '~/components/Loading/NoData';
import {CustomButton} from '~/components/ButtonComponents';
import dayjs from 'shared/libs/dayjs';
import * as common from '../../CommonFunction'
/* 
  작성일    :   2022/04/21
  화면명    :   공고알림 -> 모집공고
  화면/개발 :   Seongeonjoo / navycui
  : //true:상시모집 / false:정시모집
*/

const Notice = () => {
  const theme = useTheme();
  const {addModal} = useGlobalModalStore();
  // const {scrollActive, setScroll}:any = useGlobalScroll();
  const {scrollY, direction, isContraction} = useScroll();
  const [value, setValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalItems1, setTotalItems1] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [normalData, setNormalData] = useState<Noticeitems[]>([]);
  const [normalDataOntime, setNormalDataOntime] = useState<Noticeitems[]>([]);
  const [closeingData, setCloseingData] = useState<Noticeitems[]>([]);
  const [closeingDataOntime, setCloseingDataOntime] = useState<Noticeitems[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [height, setHeight] = useState(0);
  const scrollref = useRef<HTMLElement>(null);

  const [params, setParams] = useState<paramsType>({
    pblancNm: '',
    ordtmRcrit: false,
    pblancSttus: '',
    applyMberType: '',
    recomendCl: '',
    sortOrder: 'pblancDay',
    page: 1,
    itemsPerPage: 2
  });
  const [params1, setParams1] = useState<paramsType>({
    pblancNm: '',
    ordtmRcrit: true,
    pblancSttus: '',
    applyMberType: '',
    recomendCl: '',
    sortOrder: 'pblancDay',
    page: 1,
    itemsPerPage: 2
  });

  // 공통코드 조회  참고:기업 회원 만 조회 가능
  const userQueries = useQueries(
    groupId.map(groupType => {
      return {
        queryKey: [groupType],
        queryFn: () => fetchGetCommCode(groupType),
      }
    })
  )

  // 주요공고 정시
  const getNoticeCloseingList = async (params: paramsType) => {
    await fetchNoticeCloseing(params).then((res) => {
      setCloseingData(res.data.list);
    }).catch((e) => {
      addModal({
        open: true,
        type: 'normal',
        content: e.response.data.message,
      })
    });
    // 주요공고 상시
    await fetchNoticeCloseing(params1).then((res) => {
      setCloseingDataOntime(res.data.list);
    }).catch((e) => {
      addModal({
        open: true,
        type: 'normal',
        content: e.response.data.message,
      })
    });
    await fetchNotice(params).then((res) => {
      const {data: {list, totalItems}} = res;
      setNormalData(list);
      setTotalItems(totalItems);
    }).catch((e) => {
      addModal({
        open: true,
        type: 'normal',
        content: e.response.data.message,
      })
    });
    await fetchNotice(params1).then((res) => {
      const {data: {list, totalItems}} = res;
      setNormalDataOntime(list);
      setTotalItems1(totalItems);
    }).catch((e) => {
      addModal({
        open: true,
        type: 'normal',
        content: e.response.data.message,
      })
    });
  };

  // 탭 변경
  const handleChangeTap = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // 화면 초기 렌드링 실행;
  useEffect(() => {
    handleClickSearch();
  }, []);

  // 검색 버튼
  const handleClickSearch = () => {
    console.log('params - ' + JSON.stringify(params))
    getNoticeCloseingList(params);
  };

  useEffect(() => {
    setParams1((pre) => ({
      ...pre,
      pblancSttus: params.pblancSttus, recomendCl: params.recomendCl, applyMberType: params.applyMberType
    }))
  }, [params]);

  // 조회 조건 변경시
  useEffect(handleClickSearch, [params]);

  useEffect(() => {
    if (scrollref && scrollref.current) {
      setHeight(scrollref.current.offsetHeight)
    }
  }, [scrollref])

  useEffect(() => {
    const additionValue = isContraction ? 110 : -20
    const timer = setInterval(() => {
      if (!!scrollref && scrollref.current) {
        setHeight(scrollref.current.offsetHeight + additionValue)
      }
    })
    setTimeout(() => {
      clearInterval(timer)
    }, 500)
  }, [isContraction])

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}
           ref={scrollref}
           className={scrollY ? 'fixed scrollaction ' : 'fixed'}
           sx={{transform: direction && !isMobile ? 'translate(0, -81px)' : 'translate(0, -20px)'}}>
        <Box className="benner">
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              {isMobile ? (scrollY ? '' :
                    <h2 className="tit">
                      모집공고
                    </h2>
                ) :
                <h2 className="tit">
                  모집공고
                </h2>
              }
              <p>
                AICA에서 진행하는 사업 공고를 확인하고 신청할 수 있습니다.
                <br/> 사업 신청 전에 신청 대상, 사전준비자료, 사업안내서 등을
                <br className="mo"/> 충분히 숙지하시고 신청을 진행하시기 바랍니다.
              </p>
            </div>
            {scrollY ? '' :
              <>
                <SearchBar
                  placehold='어떤 공고를 찾고 계신가요?'
                  val={params.pblancNm}
                  handleSearch={(val: any) => {
                    handleClickSearch()
                  }}
                  handleChangeSelect={(val: any) => {
                    setParams((state) => ({...state, pblancNm: val}))
                    // setParams1((state) => ({...state, pblancNm: val}))
                  }}
                />
                {isMobile ? (
                  <Box css={styles.detal_btn}>
                    <Button type="button" onClick={() => {
                      setModalOpen(true)
                    }}>
                      상세조건 열기
                    </Button>
                  </Box>
                ) : (
                  <Box css={styles.teble_detal}>
                    <Box component={Paper} css={styles.table02}>
                      <dl>
                        <dt>모집상태</dt>
                        <dd>
                          <Box className="box_scroll">
                            <CustomRadioButtons
                              row
                              val={params.pblancSttus}
                              data={(userQueries[1].status == 'success') ? userQueries[1].data.list : []}
                              onClick={(s: string) => {
                                setParams((pre) => ({
                                  ...pre,
                                  pblancSttus: s.toString()
                                }))
                              }}
                              // onClick={(s: string[]) => {
                              //   setParams((pre)=>({
                              //     ...pre,
                              //     pblancSttus: s.toString()
                              //   }))
                              // }}
                            />
                          </Box>
                        </dd>
                      </dl>
                      <dl aria-label="simple table">
                        <dt>모집대상</dt>
                        <dd>
                          <Box className="box_scroll">
                            <CustomRadioButtons
                              row
                              val={params.applyMberType}
                              data={(userQueries[0].status == 'success') ? userQueries[0].data.list.filter((f: any) => f.codeType == "PORTAL") : []}
                              onClick={(s: string) => {
                                setParams((pre) => ({
                                  ...pre,
                                  applyMberType: s.toString()
                                }))
                              }}
                              // onClick={(s: string[]) => {
                              //   setParams((pre)=>({
                              //     ...pre,
                              //     applyMberType: s.toString()
                              //   })
                              //   )
                              // }}
                            />
                          </Box>
                        </dd>
                      </dl>
                      <dl aria-label="simple table">
                        <dt>사업분야</dt>
                        <dd>
                          <Box className="box_scroll">
                            <CustomRadioButtons
                              row
                              val={params.recomendCl}
                              data={(userQueries[2].status == 'success') ? userQueries[2].data.list.filter((val: any) => val.codeType === 'BSR') : []}
                              onClick={(s: string) => {
                                setParams((pre) => ({
                                  ...pre,
                                  recomendCl: s.toString()
                                }))
                              }}
                              // onClick={(s: string[]) => {
                              //   setParams((pre)=>({
                              //     ...pre,
                              //     recomendCl: s.toString()
                              //   })
                              //   )
                              // }}
                            />
                          </Box>
                        </dd>
                      </dl>
                    </Box>
                  </Box>
                )}
              </>
            }
            {/* 상세조건 mobile 인경우 모달 팝업 */}
            {modalOpen ?
              <NoticeModalMobile
                open={modalOpen}
                setModalOpen={(ck: boolean) => {
                  setModalOpen(ck)
                }}
                handlerSearch={(sttus: SttusType) => {
                  setParams((pre) => ({
                    ...pre,
                    pblancSttus: sttus.pblancSttus, applyMberType: sttus.applyMberType, recomendCl: sttus.recomendCl
                  }))
                }}
              />
              : null}
          </div>
          <Box css={styles.detal_tab}>
            <Tabs
              value={value}
              onChange={handleChangeTap}
              aria-label="모집공고 구분"
            >
              <Tab
                label={
                  <>
                    <span>{'정시 모집'}</span>
                    <em>{'(' + (totalItems ? totalItems : 0) + ')'}</em>
                  </>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <>
                    <span>{'상시 모집'}</span>
                    <em>{'(' + (totalItems1 ? totalItems1 : 0) + ')'}</em>
                  </>
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
        </Box>
      </Box>
      {/* 정시모집 */}
      <Box css={styles.sub_cont02} sx={{marginTop: (`${height}px`)}}>
        <Box className="content">
          <TabPanel value={value} index={0}>
            <Stack
              component="div"
              spacing={6}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="h5" component="div">
                주요공고
                <span className="data">
                      <em>{closeingData.length ? closeingData.length : 0}</em> 건
                  </span>
              </Typography>
              {/* <FormControl className="selectBox" sx={{ m: 1, minWidth: 134 }}>
                    <CustomSelect 
                      value={params.sortOrder} 
                      data={[{code:"CATE-PERSNAL-01", codeNm:"공고일순"},{code:"CATE-PERSNAL-02", codeNm:"마감일순"},{code:"CATE-PERSNAL-03", codeNm:"조회순"}]} 
                      onClick={(selected) => {
                        setParams((pre)=>({
                          ...pre,
                          sortOrder: selected
                        }))  
                      }}
                    />
                  </FormControl>  */}
              {/* 셀렉트박스 컴포넌트화  */}
              <FormControl className="selectBox" sx={{m: 1, minWidth: 134}}>
                <Select
                  value={params.sortOrder}
                  onChange={(e) => {
                    setParams((pre) => ({
                      ...pre,
                      sortOrder: e.target.value
                    }))
                  }}
                  displayEmpty
                  inputProps={{'aria-label': '전체'}}
                  IconComponent={SelectIcon}
                  MenuProps={MenuProps}
                >
                  {alwaysCurrencies.map((option, key) => (
                    <SelectItemStyle key={key} value={option.value}>
                      {option.label}
                    </SelectItemStyle>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            {/* 슬라이드 */}
            {closeingData.length > 0 ?
              <Swiper {...swiperParams} css={styles.slide_cont02}>
                {/* <Box className="blind"></Box> */}
                {closeingData.map((item, key) => (
                  <SwiperSlide key={key}>
                    <NavLink to={`/Notice/Notice/${item.pblancId}`} state={{item: item,}}>
                      <Card css={styles.hotslide} className="tag2">
                        <CardActionArea>
                          <Stack direction="row" className="tag" spacing={1}>
                            {!!item.recomendCl.split(',')[0] ?
                              <Chip label={item.recomendCl.split(',')[0]} className="blue"/> : null}
                            <Chip label={item.rmndrDay ? '마감 D-' + item.rmndrDay : '공고종료'} variant="outlined"
                                  className="wh"/>
                          </Stack>
                          <CardMedia
                            component="img"
                            height="200"
                            //todo.... -> `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`;
                            image={`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`}
                            onError={(e: any) => common.handleImgError(e)}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.pblancNm}
                            </Typography>
                            <p className="sub_txt">접수기간</p>
                            <p className="sub_txt">{item.rceptPd}({item.pblancSttus})</p>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </NavLink>
                  </SwiperSlide>
                ))}
              </Swiper> : <NoData/>}
            {closeingData.length > 0 ? <hr className="m20"/> : null}
            {/* list 리스트 */}
            <div css={styles.sub_list}>
              <Stack
                spacing={6}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="h5" component="div">
                  일반 공고
                  <span className="data">
                      <em>{totalItems}</em> 건
                      </span>
                </Typography>
              </Stack>
              {normalData.length > 0 ?
                <List>
                  {normalData.map((item, keys) => (
                    <NavLink key={keys} to={`/Notice/Notice/${item.pblancId}`} state={{item: item}}>
                      <ListItem className="noticelist">
                        <ListItemAvatar sx={{mr: 3}}>
                          {/* todo.... -> `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`*/}
                          <img
                            src={`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`}
                            onError={(e: any) => common.handleImgError(e)}/>
                        </ListItemAvatar>
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Stack direction="row" className='tag' spacing={1} component="span">
                                {item.isNew !== "N" ? <Chip component="span" label={"NEW"} className='new'/> : ""}
                                {item.recomendCl ?
                                  <Chip component="span" label={item.recomendCl.split(",")[0]} className='blue'/> : ""}
                                {item.rmndrDay ?
                                  <Chip component="span" label={"마감 D-" + item.rmndrDay} variant="outlined"/> :
                                  <Chip component="span" label={"공고종료"} variant="outlined"/>}
                              </Stack>
                              <Typography variant="body1" className="body1" component="span">
                                {item.pblancNm}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                className="body2 ellipsis"
                                color="#707070"
                              >
                                {item.pblancSumry}<br/>
                              </Typography>
                              <Box className="date" component="span">
                                <span>{item.pblancSttus} <em>{dayjs(item.rceptEndde).format("YYYY-MM-DD")} </em></span>
                                <span>{"조회"} <em>{item.rdcnt}</em></span>
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </NavLink>
                  ))}
                </List>
                : <NoData/>
              }
              {(normalData.length < totalItems)
                ?
                <Stack css={styles.bottom_btn} className="mg0">
                  <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={() => {
                    const itemsPerPage: any = params.itemsPerPage + 5;
                    setParams((state) => ({...state, itemsPerPage}));
                  }}/>
                </Stack>
                : ""}
            </div>
          </TabPanel>
          {/* 상시모집 */}
          <TabPanel value={value} index={1}>
            <Stack
              component="div"
              spacing={6}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="h5" component="div">
                주요공고
                <span className="data">
                        <em>{closeingDataOntime.length ? closeingDataOntime.length : 0}</em> 건
                    </span>
              </Typography>
              {/* <CustomSelectSm/> */}
              <FormControl className="selectBox" sx={{m: 1, minWidth: 134}}>
                <Select
                  value={params.sortOrder}
                  onChange={(e) => {
                    setParams((pre) => ({
                      ...pre,
                      sortOrder: e.target.value
                    }))
                  }}
                  displayEmpty
                  inputProps={{'aria-label': '전체'}}
                  IconComponent={SelectIcon}
                  MenuProps={MenuProps}
                >
                  {alwaysCurrencies.map((option, key) => (
                    <SelectItemStyle key={key} value={option.value}>
                      {option.label}
                    </SelectItemStyle>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            {/* 슬라이드 */}
            {closeingDataOntime.length > 0 ?
              <Swiper {...swiperParams}>
                {closeingDataOntime.map((item) => (
                  <SwiperSlide key={item.rdcnt}>
                    <NavLink to={`/Notice/Notice/${item.pblancId}`} state={{item: item}}>
                      <Card css={styles.hotslide}>
                        <CardActionArea>
                          <Stack direction="row" className="tag" spacing={1}>
                            {!!item.recomendCl.split(',')[0] ?
                              <Chip label={item.recomendCl.split(',')[0]} className="blue"/> : null}
                            <Chip label={item.rmndrDay ? '마감 D-' + item.rmndrDay : '공고종료'} variant="outlined"
                                  className="wh"/>
                          </Stack>
                          <CardMedia
                            component="img"
                            height="200"
                            //todo.... -> `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`
                            image={'/images/main/list_img01.png'}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.pblancNm}
                            </Typography>
                            <p className="sub_txt">접수기간</p>
                            <p className="sub_txt">
                              {item.rceptPd}({item.pblancSttus})
                            </p>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </NavLink>
                  </SwiperSlide>
                ))}
              </Swiper> : <NoData/>
            }
            {closeingDataOntime.length > 0 ? <hr className="m20"/> : null}
            {/* list 리스트 */}
            <Box css={styles.sub_list}>
              <Stack
                spacing={6}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="h5" component="div">
                  일반 공고
                  <span className="data">
                    <em>{totalItems1}</em> 건
                    </span>
                </Typography>
              </Stack>
              {normalDataOntime.length > 0 ?
                <List>
                  {normalDataOntime.map((item, keys) => (
                    <NavLink key={keys} to={`/Notice/Notice/${item.pblancId}`} state={{item: item, params1: params1}}>
                      <ListItem className="noticelist">
                        <ListItemAvatar sx={{mr: 3}}>
                          <img
                            src={`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`}
                            onError={(e: any) => common.handleImgError(e)}/>
                        </ListItemAvatar>
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Stack direction="row" className='tag' spacing={1} component="span">
                                {item.isNew !== "N" ? <Chip label={"NEW"} className='new' component="span"/> : ""}
                                {item.recomendCl ?
                                  <Chip label={item.recomendCl.split(",")[0]} className='blue' component="span"/> : ""}
                                {item.rmndrDay ?
                                  <Chip label={"마감 D-" + item.rmndrDay} variant="outlined" component="span"/> :
                                  <Chip label={"공고종료"} variant="outlined" component="span"/>}
                              </Stack>
                              <Typography variant="body1" className="body1" component="span">
                                {item.pblancNm}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                className="body2 ellipsis"
                                color="#707070"
                              >
                                {item.pblancSumry}<br/>
                              </Typography>
                              <Box className="date" component="span">
                                <span>{item.pblancSttus} <em>{dayjs(item.rceptEndde).format("YYYY-MM-DD")} </em></span>
                                <span>{"조회"} <em>{item.rdcnt}</em></span>
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </NavLink>
                  ))}
                </List> : <NoData/>
              }
              {(normalDataOntime.length < totalItems1)
                ?
                <Stack css={styles.bottom_btn} className="mg0">
                  <CustomButton label={'더보기'} type={'full'} color={'item'} onClick={() => {
                    const itemsPerPage: any = params.itemsPerPage + 5;
                    setParams((state) => ({...state, itemsPerPage}));
                  }}/>
                </Stack>
                : ""}
            </Box>
          </TabPanel>
        </Box>
      </Box>
      {/* 탭 영역 종료*/}
    </div>
  );
}
// Swiper   //loop : true,
SwiperCore.use([Navigation, Autoplay, Pagination]);

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 2}}>
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

const MenuProps = {
  PaperProps: {
    style: {
      width: 'auto',
      marginTop: '4px',
      padding: '4px',
      boxShadow: 'none',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
  },
};

const SelectItemStyle = styled(MenuItem)`
  font-size: 16px;
  letter-spacing: -0.64px;
  font-family: Noto Sans CJK KR;
  padding: 0 12px;
  min-height: 40px !important;
  border-radius: 3px;
  margin-bottom: 4px;
  height: 44px;
  line-height: 2.2;

  &:first-of-type {
    margin-top: -8px;
  }

  &:last-of-type {
    margin-bottom: -8px;
  }

  &.Mui-selected {
    background-color: #f5f5f5;

    &:hover, &:focus-visible {
      background-color: #f5f5f5;
    }
  }
`;

export default Notice;

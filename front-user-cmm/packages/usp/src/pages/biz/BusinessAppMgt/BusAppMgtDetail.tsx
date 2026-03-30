import React, {useEffect, useState} from 'react';
import * as styles from './styles';
// import dayjs from 'dayjs';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import {
  Tabs,
  Tab,
  Button,
  MenuItem,
  OutlinedInput,
  Stack,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  useMediaQuery,
  TextField,
  FormHelperText
} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useTheme} from '@mui/material';
import {CustomButton} from '~/components/ButtonComponents';
import {CustomRadioButtons} from '~/components/ButtonComponents';
import {FileUpload, FileUploadbiz} from "../../EventNews/FileUpload";
import IconButton from '@mui/material/IconButton';
import {DateIcon, TrashIcon} from '~/components/IconComponents';
import {PlusIcon} from '~/components/IconComponents';
import {useGlobalModalStore} from '~/pages/store/GlobalModalStore';
import {
  fetchBusinessApplicantConfirm,
  fetchBusinessApplyConfirm,
  fetchBusinessCancel,
  fetchBusinessChklst,
  fetchBusinessMgntSave,
  fetchBusinessTmpSave
} from '~/fetches/biz/fetchBusinessAppMgt';
import {useDaumPostcodePopup} from 'react-daum-postcode';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {initApplyTask, initTaskPartcptsList, taskPartcptsList, applyTask} from '~/models/Model';
import {useQueries} from 'react-query';
import {TabPanelProps} from '~/models/biz/BusinessAppMgt';
import {ConfirmInfoTable} from './View/ConfirmInfoTable';
import {intialErrorConfirmInfo} from '~/models/ModelBiz';
import fetchDownload from '~/fetches/fetchDownload';
import {fetchGetCommCode} from '~/fetches';
import {CustomSelect} from '~/components/SelectBoxComponents';
import DatePicker from '~/components/DatePicker';
import dayjs from 'dayjs';
import authentication from '~/../../shared/src/authentication';

/* 
  작성일    :   2022/07/03
  화면명    :   사업신청관리 -> 사업신청관리 상세
  회면ID    :   UI-USP-FRN-0140101
  화면/개발 :   Seongeonjoo / navycui
*/
const BusAppMgtDetail = () => {
  const today = new Date();
  const theme = useTheme();
  const receive: any = useLocation();
  const navigator = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {addModal} = useGlobalModalStore();
  today.setHours(today.getHours() - 24);
  const [value, setValue] = useState(0);
  // const [chkList, setChkList]: any = useState([]);//체크 박스 리스트
  const [checkList, setCheckList] = useState<any[]>([]);//체크리스트 항목
  const boxuser = authentication.getUser();
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  //기업정보
  const [cmpnyTypebox, setCmpnyTypebox] = useState<any>();
  const [applcntEnt, setApplcntEnt] = useState<any>();
  //과제정보
  const [applyData, setApplyData]: any = useState();
  //참여인력
  const [taskPartcptsList, setTaskPartcptsList]: any = useState<taskPartcptsList[]>([initTaskPartcptsList]);
  //과제 책임자, 과제정보
  const [applyTask, setApplyTask] = useState<applyTask>(initApplyTask);

  // 입력값오류
  const [errorValues, setErrorValues] = useState(intialErrorConfirmInfo);
  const [allCheck, setAllCheck] = useState(false);
  const [select, setSelect]: any = useState([false]);

  const validate = () => {
    let check = true;
    let update = {...errorValues};
    if (applyTask.rspnberNm === "") {
      update = {...update, errorRspnberNm: true, helperRspnberNm: "이름을 입력하세요."}
      check = false;
    } else {
      update = {...update, errorRspnberNm: false, helperRspnberNm: ""}
    }
    //학부 확인
    if (applyTask.mbtlnum === "") {
      check = false;
      update = {...update, errorMbtlnum: true, helperMbtlnum: "휴대폰 번호를 입력하세요."}
    } else {
      update = {...update, errorMbtlnum: false, helperMbtlnum: ""}
    }

    //학부 확인
    if (applyTask.email === "") {
      check = false;
      update = {...update, errorEmail: true, helperEmail: "이메일을 입력하세요."}
    } else {
      update = {...update, errorEmail: false, helperEmail: ""}
    }
    setErrorValues(update);

    return check;

  }

  const ChangeTaskTypeCd = (selected: string) => {
    if (selected === "지정과제") {
      setApplyData({...applyData, taskTypeCd: "APPN"});
      setApplyTask((state: any) => ({...state, taskTypeCd: "APPN"}))
    } else if (selected === "자유과제") {
      setApplyData({...applyData, taskTypeCd: "FREE"});
      setApplyTask((state: any) => ({...state, taskTypeCd: "FREE"}))
    }
  };

  const handelChangeInputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setApplyTask((state: any) => ({...state, [name]: value}));
  }

  const handleChangeInfo = (event: SelectChangeEvent) => {
    setApplyTask((state: any) => ({...state, [event.target.name as string]: event.target.value as string}))
  };

  const download = async (formatAttachmentId: any) => {
    fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${!!receive.state ? receive.state.item.pblancId : ''}/atchmnfl/${formatAttachmentId}`)
      .then()
      .catch((e) => {
        let status = e.response.status;
        // console.log(status);

        // if(status === 400){
        //   addModal({
        //     open: true,
        //     content: "파일이 없습니다."
        //   })
        // }
      });
  }

  // 공통코드 조회  참고:기업 회원 만 조회 가능 
  const userQueries: any = useQueries(
    [
      'BSNS_TYPE',     // 사업유형코드
      'INDUST_REALM',   // 산업분야
      'NEW_FNTN_PLAN',  // 신규 창업 계획
      'FOND_PLAN',       // 이전 및 설립계획
      'HOPE_DTY',       // 희망직무코드
      'CMPNY_TYPE',     // 사업유형코드
      'TASK_TYPE',      // 과제유형코드
      'GENDER',
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn: () => fetchGetCommCode(TermsType),
      }
    })
  )

  // 필수확인사항 조회 
  const getChklst = () => {
    fetchBusinessChklst(!!receive.state ? receive.state.item.applyId : '').then((res: any) => {
      if (checkList.length == 0)
        setCheckList(res.list)
    }).catch((e) => {
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }
  // 신청자정보조회 
  const getApplicantConfirm = () => {
    fetchBusinessApplicantConfirm(!!receive.state ? receive.state.item.applyId : '').then((res: any) => {
      setApplcntEnt(res.cmmtMember)
      if (!!res.cmmtEnt) {
        setCmpnyTypebox(res.cmmtEnt)
      } else {
        setCmpnyTypebox(res.applcntEnt)
      }
    }).catch((e) => {
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }
  // 신청정보조회
  const getApplyConfirm = () => {
    fetchBusinessApplyConfirm(!!receive.state ? receive.state.item.applyId : '').then((res: any) => {
      setApplyData(res)

      if (res.partcptslist.length > 0) {
        let partBox = res.partcptslist
        for (const key in res.partcptslist) {
          partBox[key].flag = 'U'
        }
        setTaskPartcptsList(partBox)
      }
      setApplyTask(res.taskInfo)
    }).catch((e) => {
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }

  // change event
  const handelChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setCmpnyTypebox((state: any) => ({...state, [name]: value}));
  }

  // Daum 우편번호 서비스
  const DaumPost = (data: any) => {
    setCmpnyTypebox((pre: any) => ({...pre, zip: data.zonecode, adres: data.address}))
  };

  // 주소 찾기 호출
  const handleClick = () => {
    open({onComplete: DaumPost});
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    setCmpnyTypebox((state: any) => ({...state, [event.target.name as string]: event.target.value as string}));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [files, setFiles]: any = useState([]);

  const handleDelete = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const update = [...files]
    update.splice(i, 1)
    setFiles(update);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    let upfile: any = e.target.files;
    const update: any = [...files]
    update[idx] = upfile
    setFiles(update)
  }

  // 취소
  const handelBizCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    fetchBusinessCancel(!!receive.state ? receive.state.item.applyId : '').then((res: any) => {
      addModal({
        open: true,
        content: '최소 되었습니다.',
        onConfirm: () => {
          navigator('/biz/BusinessAppMgt/BusAppMgt')
        },
        onClose: () => {
          navigator('/biz/BusinessAppMgt/BusAppMgt')
        }
      })
    }).catch((e) => {
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })

  };

  // 임시저장 / 제출
  const handelBizSend = (e: React.MouseEvent<HTMLElement, MouseEvent>, type: boolean, division: string) => {

    if (division == '03') {
      if (!validate()) {
        return;
      }
    }

    try {
      const form = new FormData();
      let uploadFileList = [];
      for (let i = 0; i < files.length; i++) {
        uploadFileList.push({atchmnflSetupId: applyData.atchmnflList[i].atchmnflSetupId, fileOrder: i});
        form.append("fileList", files[i][0])
      }
      let params
      params = {
        chkList: checkList,
        applyTask: applyTask,
        applcntEnt: cmpnyTypebox,
        taskPartcptsList: taskPartcptsList,
        uploadFileList: uploadFileList
      };

      form.append("info", new Blob([JSON.stringify(params)], {type: 'application/json'}));

      // 임시저장
      if (!type) {
        fetchBusinessTmpSave(form, !!receive.state ? receive.state.item.applyId : '').then((res: any) => {
          addModal({
            open: true,
            content: '임시저장되었습니다.'
          })
        }).catch((e) => {
          let message = e.response.data.message;
          // addModal({
          //   open:true,
          //   content:message
          // })
        })
      } else if (type) { // 체출
        fetchBusinessMgntSave(form, !!receive.state ? receive.state.item.applyId : '').then((res: any) => {
          addModal({
            open: true,
            content: '제출 되었습니다.',
            onConfirm: () => {
              navigator('/biz/BusinessAppMgt/BusAppMgt')
            },
            onClose: () => {
              navigator('/biz/BusinessAppMgt/BusAppMgt')
            }
          })
        }).catch((e) => {
          let message = e.response.data.message;
          // addModal({
          //   open:true,
          //   content:message
          // })
        })
      }
    } catch (e: any) {
      if (!!e.response && e.response.data) return alert(e.response.data.message);
    }

  };
  // 최초조회
  useEffect(() => {
    getChklst();
    getApplicantConfirm()
    getApplyConfirm()
  }, [])

  useEffect(() => {
    let selectBox: boolean[] = [...select];
    if (!!taskPartcptsList) {
      for (let i = select.length; i < taskPartcptsList.length; i++) {
        selectBox = selectBox.concat(false);
      }
      setSelect(selectBox)
    }
  }, [taskPartcptsList]);


  const addItem = () => {
    const updated = [...taskPartcptsList];
    const updated1 = [...select]
    updated.push(initTaskPartcptsList);
    updated1.push(false);
    setTaskPartcptsList(updated);
    setSelect(updated1)
    setAllCheck(false);
  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업신청 관리</h2>
              <p>
                지원하는 사업의 신청정보를 조회 및 수정하고,<br className='mo'/> 현재 신청상태를 확인할 수 있습니다.
              </p>
            </div>
            <div className='tab_wrap triple'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto"
                    aria-label="basic tabs example">
                <Tab label="필수확인사항" {...a11yProps(0)} />
                <Tab label="신청자정보" {...a11yProps(1)} />
                <Tab label="신청정보" {...a11yProps(2)} />
              </Tabs>
            </div>
          </div>
        </div>
      </Box>
      <div className='content_body'>
        <Box css={styles.sub_cont02}>
          <div className="content">
            {/* className="list02" 클래스는 사유확인버튼이 있을시에만 추가 */}
            {/* 필수확인사항 */}
            <TabPanel value={value} index={0}>
              <Box className="box_guide">
                <ul>
                  <li>필수확인사항을 꼼꼼하게 확인한 후 해당 부분에 체크하시기 바랍니다.</li>
                  <li>아니오 선택 시 심사 및 선정에 제한이 있을 수 있으며, 아래 사항을 제대로 검토하지 않음으로 발생하는 불이익에 대한 책임은 전적으로 지원자에게 있습니다.</li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <h4 className="sub_title">필수확인사항 <span className="must">*</span></h4>
              <Box css={styles.table2}>
                <div className="detail_table">
                  <dl className="header">
                    <dt className="num">번호</dt>
                    <dt className='tac'>체크사항</dt>
                    <dt className="check">체크</dt>
                  </dl>
                  {(checkList.length != 0) ? checkList.map((item: any, i: number) => {
                    return <dl key={i}>
                      <dd className="num">{i + 1}</dd>
                      <dd className="cnt">
                        <p>{item.chklstCn}</p>
                        <dd className="check">
                          <CustomRadioButtons
                            row
                            defaultData={item.ceckResultDivCd}
                            data={[{codeNm: '예', code: 'Y'}, {codeNm: '아니오', code: 'N'}]}
                            onClick={(selected) => {
                              setCheckList(checkList.map((m, j) => {
                                const result = i == j ? selected : m.ceckResultDivCd
                                return {
                                  ...m,
                                  ceckResultDivCd: result
                                }
                              }))
                            }}
                          /></dd>
                      </dd>
                    </dl>
                  }) : null}
                </div>
              </Box>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'신청취소'} type={'listBack'} color={'outlinedblack'} onClick={handelBizCancel}/>
                {(!!receive.state ? (receive.state.item.rceptSttusCd == 'MAKEUP' || receive.state.item.rceptSttusCd == 'TEMP') : false)
                  ?
                  <>
                    <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={(e) => {
                      handelBizSend(e, false, '01')
                    }}/>
                    <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={(e) => {
                      handelBizSend(e, true, '01')
                    }}/>
                  </>
                  : null
                }

              </Stack>
            </TabPanel>
            {/* 신청자 정보 */}
            <TabPanel value={value} index={1}>

              {/* [s] 개인회원 */}
              <h1 className="sub_title_top">{!!receive.state ? receive.state.item.pblancNm : ''}</h1>
              {boxuser == 'INDIVIDUAL' ? !!applcntEnt ?
                <>
                  <Box className="box_guide">
                    <ul>
                      <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                      <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                    </ul>
                  </Box>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                    <h4 className="sub_title">신청자정보</h4>
                    <NavLink to="/MyPage/MemberInfoMmt/MemberInfoMdf">
                      <CustomButton label={'회원정보 변경'} type={'modify'} color={'outlinedblack'}
                                    style={{marginBottom: '10px'}}/>
                    </NavLink>
                  </Stack>
                  <Box css={styles.table}>
                    <div className="detail_table">
                      <dl>
                        <dt>이름</dt>
                        <dd>{applcntEnt?.memberNm}</dd>
                        <dt>생년월일</dt>
                        <dd>{applcntEnt?.birthDay}</dd>
                      </dl>
                      <dl>
                        <dt>성별</dt>
                        <dd>{
                          (!!applcntEnt && userQueries[7].data?.list) ?
                            userQueries[7].data?.list.find((f: any) => f.code == applcntEnt.gender)?.codeNm : ''
                        }</dd>
                        {/* <dt>내외국인</dt>
                    <dd>{memberData}</dd> */}
                      </dl>
                      <dl>
                        <dt>휴대폰번호</dt>
                        <dd>{applcntEnt?.mobileNo}</dd>
                        <dt>이메일</dt>
                        <dd>{applcntEnt?.email}</dd>
                      </dl>
                    </div>
                  </Box>
                  <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}}
                         css={styles.btn_next}>
                    <CustomButton label={'신청취소'} type={'listBack'} color={'outlinedblack'} onClick={handelBizCancel}/>
                    {(!!receive.state ? (receive.state.item.rceptSttusCd == 'MAKEUP' || receive.state.item.rceptSttusCd == 'TEMP') : false)
                      ?
                      <>
                        <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={(e) => {
                          handelBizSend(e, false, '02')
                        }}/>
                        <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={(e) => {
                          handelBizSend(e, true, '02')
                        }}/>
                      </>
                      : null
                    }
                  </Stack>
                </>
                : null : null}
              {/* [s] 기업&대학회원 */}
              {(boxuser != 'INDIVIDUAL') ?
                <>
                  <Box className="box_guide">
                    <ul>
                      <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                      <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                    </ul>
                  </Box>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                    <h4 className="sub_title">신청자정보</h4>
                    <NavLink to="/MyPage/MemberInfoMmt/MemberInfoMdf">
                      <CustomButton label={'회원정보 변경'} type={'modify'} color={'outlinedblack'}
                                    style={{marginBottom: '10px'}}/>
                    </NavLink>
                  </Stack>
                  <Box css={styles.table}>
                    <div className="detail_table">
                      <dl>
                        <dt>사업자명/이름</dt>
                        <dd>{!!applcntEnt ? applcntEnt.memberNm : ''}</dd>
                        <dt>사업자등록번호</dt>
                        <dd>{!!applcntEnt ? applcntEnt.bizrno : ''}</dd>
                      </dl>
                      <dl>
                        <dt>대표자명</dt>
                        <dd>{!!applcntEnt ? applcntEnt.ceoNm : ''}</dd>
                        <dt>담당자명</dt>
                        <dd>{!!applcntEnt ? applcntEnt.chargerNm : ''}</dd>
                      </dl>
                      <dl>
                        <dt>담당자 휴대폰번호</dt>
                        <dd>{!!applcntEnt ? applcntEnt.mobileNo : ''}</dd>
                        <dt>담당자 이메일</dt>
                        <dd>{!!applcntEnt ? applcntEnt.email : ''}</dd>
                      </dl>
                    </div>
                  </Box>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                    <h4 className="sub_title">기업정보</h4>
                  </Stack>
                  <Box css={styles.table}>
                    <div className="detail_table">
                      <dl>
                        <dt>산업분야</dt>
                        <dd>
                          <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                              // labelId="demo-simple-select-label"
                              id="industRealmCd"
                              name="industRealmCd"
                              value={!!cmpnyTypebox ? cmpnyTypebox.industRealmCd : ''}
                              // label="Age"
                              onChange={handleChangeSelect}
                            >
                              {
                                (userQueries[1].status === 'success') ?
                                  userQueries[1].data.list.map((option: any) => (
                                    <MenuItem key={option.code} value={option.code}>
                                      {option.codeNm}
                                    </MenuItem>
                                  ))
                                  : null

                              }
                            </Select>
                          </FormControl>
                        </dd>
                        <dt>기업/기관유형</dt>
                        <dd>
                          <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                              // labelId="demo-simple-select-label"
                              id="cmpnyTypeCd"
                              name="cmpnyTypeCd"
                              value={!!cmpnyTypebox ? cmpnyTypebox.cmpnyTypeCd : ''}
                              // label="Age"
                              onChange={handleChangeSelect}
                            >
                              {
                                (userQueries[5].status === 'success') ?
                                  userQueries[5].data.list.map((option: any) => (
                                    <MenuItem key={option.code} value={option.code}>
                                      {option.codeNm}
                                    </MenuItem>
                                  ))
                                  : null

                              }
                            </Select>
                          </FormControl>
                        </dd>
                      </dl>
                      <dl>
                        <dt>설립일</dt>
                        <dd>
                          <div className="ipt_datepicker">
                            <DatePicker
                              pickerType='one'
                              questDay={dayjs((!!cmpnyTypebox ? cmpnyTypebox.fondDay : ''), 'yyyy-MM-dd').toString()}
                              changeNowDate={(newTime: Date | null) => {
                                // setData({...data,
                                //   acqdt: dayjs(newTime).format('YYYYMMDD')
                                // })
                              }}
                            />
                          </div>
                        </dd>
                        <dt>종사자수</dt>
                        <dd>
                          <FormControl fullWidth>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                              <TextField
                                id='emplyCnt'
                                name='emplyCnt'
                                variant='outlined'
                                fullWidth sx={{margin: '0px'}}
                                value={!!cmpnyTypebox ? cmpnyTypebox.emplyCnt : ''}
                                onChange={handelChangeInput}
                              />
                              <Box style={{marginLeft: '16px'}}>명</Box>
                            </Stack>
                          </FormControl>
                        </dd>
                      </dl>
                      <dl>
                        <dt>상주인원</dt>
                        <dd>
                          <FormControl fullWidth>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                              <TextField
                                id='resdngNmpr'
                                name='resdngNmpr'
                                variant='outlined'
                                fullWidth sx={{margin: '0px'}}
                                value={!!cmpnyTypebox ? cmpnyTypebox.resdngNmpr : ''}
                                onChange={handelChangeInput}
                              />
                              <Box style={{marginLeft: '16px'}}>명</Box>
                            </Stack>
                          </FormControl>
                        </dd>
                        <dt>채용예정인력</dt>
                        <dd>
                          <FormControl fullWidth>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                              <TextField
                                id='empmnPrearngeNmpr'
                                name='empmnPrearngeNmpr'
                                variant='outlined'
                                fullWidth sx={{margin: '0px'}}
                                value={!!cmpnyTypebox ? cmpnyTypebox.empmnPrearngeNmpr : ''}
                                onChange={handelChangeInput}
                              />
                              <Box style={{marginLeft: '16px'}}>명</Box>
                            </Stack>
                          </FormControl>
                        </dd>
                      </dl>
                      <dl>
                        <dt>업종</dt>
                        <dd>
                          <TextField
                            id='induty'
                            name='induty'
                            variant='outlined'
                            value={!!cmpnyTypebox ? cmpnyTypebox.induty : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                        <dt>주 업종</dt>
                        <dd>
                          <TextField
                            id='mainInduty'
                            name='mainInduty'
                            variant='outlined'
                            value={!!cmpnyTypebox ? cmpnyTypebox.mainInduty : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                      </dl>
                      <dl>
                        <dt>주요기술 및 생산품</dt>
                        <dd>
                          <TextField
                            id='mainTchnlgyProduct'
                            name='mainTchnlgyProduct'
                            variant='outlined'
                            value={!!cmpnyTypebox ? cmpnyTypebox.mainTchnlgyProduct : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                      </dl>
                      <dl>
                        <dt>주소</dt>
                        <dd>
                          <Stack spacing={1} sx={{width: '100%'}}>
                            <Stack flexDirection={'row'} columnGap={1}>
                              <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100%'}}>
                                <TextField
                                  id='zip'
                                  name='zip'
                                  variant='outlined'
                                  value={!!cmpnyTypebox ? cmpnyTypebox.zip : ''}
                                  onChange={handelChangeInput}
                                  fullWidth
                                />
                                <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'}
                                              onClick={handleClick}/>
                              </Stack>
                            </Stack>
                            <Stack direction={'row'} spacing={'40px'}>
                              <TextField
                                id='adres'
                                name='adres'
                                variant='outlined'
                                value={!!cmpnyTypebox ? cmpnyTypebox.adres : ''}
                                onChange={handelChangeInput}
                                fullWidth
                              />
                              <TextField
                                id='adresDetail'
                                name='adresDetail'
                                variant='outlined'
                                value={!!cmpnyTypebox ? cmpnyTypebox.adres : ''}
                                onChange={handelChangeInput}
                                fullWidth
                              />
                            </Stack>
                          </Stack>
                        </dd>
                      </dl>
                      <dl>
                        <dt>대표전화</dt>
                        <dd>
                          <TextField
                            id='reprsntTelno'
                            name='reprsntTelno'
                            variant='outlined'
                            value={!!cmpnyTypebox ? applcntEnt.reprsntTelno : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                        <dt>팩스</dt>
                        <dd>
                          <TextField
                            id='fxnum'
                            name='fxnum'
                            variant='outlined'
                            value={!!cmpnyTypebox ? cmpnyTypebox.fxnum : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                      </dl>
                      <dl>
                        <dt>대표자 연락처</dt>
                        <dd>
                          <TextField
                            id='ceoTelno'
                            name='ceoTelno'
                            variant='outlined'
                            value={!!cmpnyTypebox ? cmpnyTypebox.ceoTelno : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                        <dt>대표자 이메일</dt>
                        <dd>
                          <TextField
                            id='ceoEmail'
                            name='ceoEmail'
                            type="email"
                            variant='outlined'
                            value={!!cmpnyTypebox ? cmpnyTypebox.ceoEmail : ''}
                            onChange={handelChangeInput}
                            fullWidth
                          />
                        </dd>
                      </dl>
                      <dl>
                        <dt>신규창업계획</dt>
                        <dd>
                          <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                              // labelId="demo-simple-select-label"
                              id="newFntnPlanCd"
                              name="newFntnPlanCd"
                              value={!!cmpnyTypebox ? cmpnyTypebox?.newFntnPlanCd : ''}
                              // label="Age"
                              onChange={handleChangeSelect}
                            >
                              {
                                (userQueries[2].status === 'success') ?
                                  userQueries[2].data.list.map((option: any) => (
                                    <MenuItem key={option.code} value={option.code || ''}>
                                      {option.codeNm}
                                    </MenuItem>
                                  ))
                                  : null

                              }
                            </Select>
                          </FormControl>
                        </dd>
                        <dt>이전 및 설립계획</dt>
                        <dd>
                          <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                              // labelId="demo-simple-select-label"
                              id="fondPlanCd"
                              name="fondPlanCd"
                              value={!!cmpnyTypebox ? cmpnyTypebox.fondPlanCd : ''}
                              // label="Age"
                              onChange={handleChangeSelect}
                            >
                              {
                                (userQueries[3].status === 'success') ?
                                  userQueries[3].data.list.map((option: any) => (
                                    <MenuItem key={option.code} value={option.code || ''}>
                                      {option.codeNm}
                                    </MenuItem>
                                  ))
                                  : null

                              }
                            </Select>
                          </FormControl>
                        </dd>
                      </dl>
                    </div>
                  </Box>
                  <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}}
                         css={styles.btn_next}>
                    <CustomButton label={'신청취소'} type={'listBack'} color={'outlinedblack'} onClick={handelBizCancel}/>
                    {(!!receive.state ? (receive.state.item.rceptSttusCd == 'MAKEUP' || receive.state.item.rceptSttusCd == 'TEMP') : false)
                      ?
                      <>
                        <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={(e) => {
                          handelBizSend(e, false, '02')
                        }}/>
                        <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={(e) => {
                          handelBizSend(e, true, '02')
                        }}/>
                      </>
                      : null
                    }
                  </Stack>
                </>
                : null}
            </TabPanel>
            {/* 신청정보 */}
            <TabPanel value={value} index={2}>
              <Box className="box_guide">
                <ul>
                  <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                  <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                </ul>
              </Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">과제정보</h4>
              </Stack>
              <Box css={styles.table}>
                <div className="detail_table">
                  {!!applyData ?
                    applyData.taskTypeCd == 'All' ?
                      <dl>
                        {/* 과제유형이 ALL일때만 나옴 선택할수있게 */}
                        <dt>과제유형</dt>
                        <dd><CustomRadioButtons
                          row data={[{codeNm: '자유과제', code: "APPN"}, {codeNm: '지정과제', code: "FREE"}]}
                          defaultData={applyData ? applyData.taskTypeCd : "APPN"}
                          onClick={(selected) => {
                            ChangeTaskTypeCd(selected);
                          }}
                        />
                        </dd>
                      </dl>
                      : '' : ''
                  }

                  <dl>
                    <dt>
                      과제명/<br className="mo"/>프로젝트명<br className="mo"/>(국문) <span className="must">*</span>
                    </dt>
                    <dd><OutlinedInput
                      name="taskNmKo"
                      value={!!applyTask ? applyTask.taskNmKo : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                  </dl>
                  <dl>
                    <dt>과제명(영문)</dt>
                    <dd><OutlinedInput
                      name="taskNmEn"
                      value={!!applyTask ? applyTask.taskNmEn : ''}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}
                      onChange={handelChangeInputInfo}
                    /></dd>
                  </dl>
                  <>
                    <dl>
                      <dt>과제분야</dt>
                      <dd>
                        <FormControl fullWidth>
                          <Select
                            labelId=""
                            id="applyRealmId"
                            name="applyRealmId"
                            sx={{height: '48px'}}
                            value={applyData?.applyRealmList?.find((f: any) => f.applyRealmId == applyTask?.applyRealmId)?.applyRealmNm || ''}
                            onChange={(e) => {
                              const {name, value} = e.target;
                              const applyRealmId = applyData?.applyRealmList?.find((f: any) => f.applyRealmNm == value)?.applyRealmId || ''

                              setApplyTask((state: any) => ({...state, [name]: applyRealmId}));
                            }}
                          >
                            {(applyData?.applyRealmList !== undefined) ?
                              applyData.applyRealmList.map((item: any) => (
                                <MenuItem key={item.applyRealmId}
                                          value={item.applyRealmNm}>{item.applyRealmNm}</MenuItem>
                              ))
                              : null
                            }
                          </Select>
                        </FormControl>
                      </dd>
                      <dt>사업기간</dt>
                      <dd>{!!applyData ? applyData.bsnsPd : ''}</dd>
                    </dl>
                    <dl>
                      <dt>사업기간<br className="mo"/>(전체)</dt>
                      <dd>{!!applyData ? applyData.bsnsPdAll : ''}</dd>
                      <dt>사업기간<br className="mo"/>(당해)</dt>
                      <dd>{!!applyData ? applyData.bsnsPdYw : ''}</dd>
                    </dl>
                  </>
                </div>
              </Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">과제책임자</h4>
              </Stack>
              <Box css={styles.table}>
                <div className="detail_table type2">
                  <dl>
                    <dt>이름<span className="must">*</span></dt>
                    <dd className='helper'><OutlinedInput
                      error={errorValues.errorRspnberNm}
                      name="rspnberNm"
                      value={!!applyTask ? applyTask.rspnberNm : ''}
                      onChange={handelChangeInputInfo}
                      size="small"
                      className="ipt_tp01" sx={{width: '100%'}}
                    />
                      <FormHelperText error={errorValues.errorRspnberNm}>{errorValues.helperRspnberNm}</FormHelperText>
                    </dd>
                    <dt>생년월일</dt>
                    <dd><OutlinedInput
                      name="brthdy"
                      value={!!applyTask ? applyTask.brthdy : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                  </dl>
                  <dl>
                    <dt>휴대폰번호<span className="must">*</span></dt>
                    <dd className='helper'><OutlinedInput
                      error={errorValues.errorMbtlnum}
                      name="mbtlnum"
                      value={!!applyTask ? applyTask.mbtlnum : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}
                    />
                      <FormHelperText error={errorValues.errorMbtlnum}>{errorValues.helperMbtlnum}</FormHelperText>
                    </dd>
                    <dt>이메일<span className="must">*</span></dt>
                    <dd className='helper'><OutlinedInput
                      error={errorValues.errorEmail}
                      name="email"
                      value={!!applyTask ? applyTask.email : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}
                    />
                      <FormHelperText error={errorValues.errorEmail}>{errorValues.helperEmail}</FormHelperText>
                    </dd>
                  </dl>
                  <dl>
                    <dt>부서/학과</dt>
                    <dd><OutlinedInput
                      name="deptNm"
                      value={!!applyTask ? applyTask.deptNm : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                    <dt>직위/직급</dt>
                    <dd><OutlinedInput
                      name="ofcpsNm"
                      value={!!applyTask ? applyTask.ofcpsNm : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                  </dl>
                  <dl>
                    <dt>주소</dt>
                    <dd><OutlinedInput
                      name="adres"
                      value={!!applyTask ? applyTask.adres : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                    <dt>유선번호</dt>
                    <dd><OutlinedInput
                      name="telno"
                      value={!!applyTask ? applyTask.telno : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                  </dl>
                  <dl>
                    <dt>팩스번호</dt>
                    <dd><OutlinedInput
                      name="fxnum"
                      value={!!applyTask ? applyTask.fxnum : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                    <dt>과학기술인<br className="mo"/>등록번호</dt>
                    <dd><OutlinedInput
                      name="sctecrno"
                      value={!!applyTask ? applyTask.sctecrno : ''}
                      onChange={handelChangeInputInfo}
                      size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                  </dl>
                </div>
              </Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">참여인력</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                              onClick={() => {
                                if (allCheck === true) {
                                  setTaskPartcptsList([initTaskPartcptsList])
                                  setAllCheck(false)
                                  setSelect([false])
                                } else {
                                  const updated = [...taskPartcptsList];
                                  const updated1 = [...select];
                                  for (let i = taskPartcptsList.length - 1; i > -1; i--) {
                                    if (select[i] === true) {
                                      updated.splice(i, 1);
                                      setTaskPartcptsList(updated);
                                      updated1.splice(i, 1);
                                      setSelect(updated1);
                                    }
                                  }
                                }
                                if (taskPartcptsList.length === 0) {
                                  addItem();
                                }
                              }}>
                    <TrashIcon/>
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" onClick={addItem}>
                    <PlusIcon/>
                  </IconButton>
                </Box>
              </Stack>
              <div className="mo">
                <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="전체선택" className="checkbox"/>
                </FormGroup>
                <table className="tableDefault type5">
                  <colgroup>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '27%'}}/>
                    <col style={{width: '63%'}}/>
                  </colgroup>
                  <tbody>
                  <tr>
                    <td rowSpan={5} className='chkbox'><Box className="checkbox"><Checkbox/></Box></td>
                    <th>이름<span className="must">*</span></th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>담당분야</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>휴대폰<br/>번호</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>생년월일</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>참여율(%)</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <td rowSpan={5} className='chkbox'><Box className="checkbox"><Checkbox/></Box></td>
                    <th>이름<span className="must">*</span></th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>담당분야</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>휴대폰<br/>번호</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>생년월일</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  <tr>
                    <th>참여율(%)</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}/></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width: '5%'}}/>
                  <col style={{width: '19%'}}/>
                  <col style={{width: '19%'}}/>
                  <col style={{width: '19%'}}/>
                  <col style={{width: '19%'}}/>
                  <col style={{width: '19%'}}/>
                </colgroup>
                <thead>
                <tr>
                  <th>
                    <Box className="checkbox">
                      <Checkbox checked={allCheck} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        let update = [...select];
                        if (allCheck === false) {
                          for (let i = 0; i < select.length; i++) {
                            update[i] = true;
                          }
                        } else if (allCheck === true) {
                          for (let i = 0; i < select.length; i++) {
                            update[i] = false;
                          }
                        }
                        setSelect(update);
                        setAllCheck(!allCheck)
                      }}/>
                    </Box>
                  </th>
                  <th>이름</th>
                  <th>담당분야</th>
                  <th>휴대폰번호</th>
                  <th>생년월일</th>
                  <th>참여율(%)</th>
                </tr>
                </thead>
                <tbody>
                <ConfirmInfoTable checkList={select}
                                  change={(i: number, k: boolean) => {
                                    let update = [...select];
                                    update[i] = k;
                                    setSelect(update);
                                    if (k === false) {
                                      setAllCheck(false)
                                    }
                                    let b = 0;
                                    for (let i = 0; i < select.length; i++) {
                                      if (update[i] === true) {
                                        b++;
                                      }
                                    }
                                    if (b === select.length) {
                                      setAllCheck(true)
                                    }
                                  }}
                                  data={taskPartcptsList}
                                  updateItem={(item: taskPartcptsList, i: number) => {
                                    const updated = [...taskPartcptsList];
                                    updated[i] = item;
                                    setTaskPartcptsList(updated);
                                  }}/>
                </tbody>
              </table>
              {/*  && !!receive.state ? receive.state.cmpnyTypebox ===null ? */}
              {(!!applyData && applyData.bsnsTypeCd === "EDC" && boxuser == 'INDIVIDUAL') ?
                <>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                    <h4 className="sub_title">희망직무 및 거주지</h4>
                  </Stack>
                  <Box css={styles.table}>
                    <div className="detail_table type2">
                      <dl>
                        <dt>희망직무<span className="must">*</span></dt>
                        <dd>
                          <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                              id="hopeDtyCd"
                              name="hopeDtyCd"
                              value={applyTask.hopeDtyCd}
                              onChange={handleChangeInfo}
                            >
                              {
                                (userQueries[4].status === 'success') ?
                                  userQueries[4].data.list.map((option: any) => (
                                    <MenuItem key={option.code} value={option.code}>
                                      {option.codeNm}
                                    </MenuItem>
                                  ))
                                  : null

                              }
                            </Select>
                          </FormControl>
                        </dd>
                        <dt>현 거주지</dt>
                        <dd><OutlinedInput
                          id="nowAdres"
                          name="nowAdres"
                          value={applyTask.nowAdres}
                          onChange={(e: any) => handleChangeInfo(e)}
                          size="small" className="ipt_tp01" sx={{width: '100%'}}/></dd>
                      </dl>
                    </div>
                  </Box>
                </>
                : null}
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">첨부파일 <span className="must">*</span> <span className="sub_title_desc">(최대 20MB 첨부 가능)</span>
                </h4>
              </Stack>
              <div className="tableDefault_scroll">
                <table className="tableDefault type5">
                  <colgroup>
                    <col style={{width: '15%'}}/>
                    <col style={{width: '10%'}}/>
                    <col style={{width: '15%'}}/>
                    <col style={{width: '25%'}}/>
                    <col style={{width: '40%'}}/>
                  </colgroup>
                  <thead>
                  <tr>
                    <th>문서유형</th>
                    <th>필수여부</th>
                    <th>서식</th>
                    <th>파일명</th>
                    <th>파일첨부</th>
                  </tr>
                  </thead>
                  <tbody>
                  {!!applyData && (applyData.atchmnflList.length > 0) ?
                    applyData.atchmnflList.map((item: any, idx: any) => {
                      return (
                        <tr>
                          <td className="tal pl-20">{item.fileKndNm}</td>
                          <td>{item.essntl ? '필수' : '선택'}</td>
                          <td>
                            <Stack css={styles.btnDown}>
                              <Button onClick={() => {
                                download(item.formatAttachmentId)
                              }}>
                                <span>다운로드</span>
                              </Button>
                            </Stack>
                          </td>
                          <td>{item.attachmentNm}</td>
                          <td className='td_file'>
                            <Box css={styles.fileupload}>
                              <FileUploadbiz
                                files={files[idx]}
                                handleDelete={(e: any) => {
                                  handleDelete(e, idx)
                                }}
                                handleUpload={(e: any) => {
                                  handleUpload(e, idx)
                                }}
                                id={idx}
                              />
                            </Box>
                          </td>
                        </tr>
                      )
                    })
                    : ''
                  }
                  </tbody>
                </table>
              </div>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'신청취소'} type={'listBack'} color={'outlinedblack'} onClick={handelBizCancel}/>
                {(!!receive.state ? (receive.state.item.rceptSttusCd == 'MAKEUP' || receive.state.item.rceptSttusCd == 'TEMP') : false)
                  ?
                  <>
                    <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={(e) => {
                      handelBizSend(e, false, '03')
                    }}/>
                    <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={(e) => {
                      handelBizSend(e, true, '03')
                    }}/>
                  </>
                  : null
                }
              </Stack>
            </TabPanel>
          </div>
        </Box>
      </div>
    </div>
  );
}

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
        <Box sx={{p: 3}}>
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

export default BusAppMgtDetail;
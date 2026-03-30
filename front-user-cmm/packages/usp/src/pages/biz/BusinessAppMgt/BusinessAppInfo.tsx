import React, {useEffect} from "react"
import {useState} from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import {
  Stack,
  FormControl,
  MenuItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Step,
  Stepper,
  StepLabel
} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {CustomButton} from '~/components/ButtonComponents';
import {business_request, reqEnterpriseType, TermsResponse} from '~/models/Model';
import {useGlobalModalStore} from "~/pages/store/GlobalModalStore";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {fetchBusinessMyData} from "~/fetches/fetchBusiness";
import {useDaumPostcodePopup} from 'react-daum-postcode';
import {useQueries} from "react-query";
import {fetchGetCommCode, fetchTermsGet} from "~/fetches";
import DatePicker from '~/components/DatePicker';
import dayjs from "~/../../shared/src/libs/dayjs";
import {CustomCheckBoxsBiz} from "./View/CustomCheckBoxsBiz";
import authentication from "~/../../shared/src/authentication";

// 사업신청/menu-PMS010100 -> 사업신청
const BusinessAppInfo = () => {
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const receive: any = useLocation();
  const boxuser = authentication.getUser();
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  //개인정보 수집 동의 체크
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(false);
  //약관내용
  const [termsBox, setTermsBox] = useState<TermsResponse[]>([]);
  const [validationBox, setValidationBox] = useState<string[]>([]);
  const [memberData, setMember]: any = useState();
  //기업정보
  const [cmpnyTypebox, setCmpnyTypebox] = useState<reqEnterpriseType>();

  const getList = () => {
    fetchBusinessMyData(!!receive.state ? receive.state.pblancId : '').then((res: any) => {
      setMember(res.cmmtMember)
      if (!!receive.state.cmpnyTypebox) {
        setCmpnyTypebox(receive.state.cmpnyTypebox)
      } else {
        setCmpnyTypebox(res.cmmtEnt)
      }
    }).catch((e) => {
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    })
  }
  const returnedTarget: TermsResponse[] = [];

  const getSearchCategory = async () => {
    //개인회원
    let url = 'PRVC_CLCT_AGRE_PMSIND';
    //기업/대학회원
    if (cmpnyTypebox) {
      url = 'PRVC_CLCT_AGRE_PMSBIZ';
    }
    let box = await Promise.all([fetchTermsGet(url)])
    // eslint-disable-next-line array-callback-return
    box[0].list.map((item: any) => {
      returnedTarget.push(item)
    })

    setTermsBox(returnedTarget)
  }; // todo...

  useEffect(() => {
    getList();
  }, [])

  useEffect(() => {
    getSearchCategory();
  }, [cmpnyTypebox])

  // 공통코드 조회  참고:기업 회원 만 조회 가능 
  const userQueries: any = useQueries(
    [
      'CMPNY_TYPE',     // 기업유형
      'INDUST_REALM',   // 산업분야
      'NEW_FNTN_PLAN',  // 신규 창업 계획
      'FOND_PLAN',       // 이전 및 설립계획
      'GENDER'
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn: () => fetchGetCommCode(TermsType),
      }
    })
  )
  // // 상태에 따라 셋팅
  // useEffect(() => {
  //   if(!!memInfo) setCmpnyTypebox(memInfo);
  // }, [memInfo]);
  // change event
  const handelChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setCmpnyTypebox((state: any) => ({...state, [name]: value}));
  }
  const handelChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setCmpnyTypebox((state: any) => ({...state, [name]: value.replace(/[^0-9]/g, '')}));
  }

  // Daum 우편번호 서비스
  const DaumPost = (data: any) => {
    setCmpnyTypebox((pre: any) => ({...pre, zip: data.zonecode, adres: data.address}))
  };

  // 주소 찾기 호출
  const handleClick = () => {
    open({onComplete: DaumPost});
  };

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    setCmpnyTypebox((state: any) => ({...state, [event.target.name as string]: event.target.value as string}));
  };

  const goBusinessAppConfirmInfo = () => {
    if (allCheck) {
      const boxvalue: any = [];
      termsBox.map((item, key) => {
        let isItem = validationBox.filter((m) => {
          return m.includes(key + "")
        });
        if (isItem.length > 0) {
          boxvalue.push({beginDay: item.beginDay, required: item.required, termsType: item.termsType, consentYn: true})
          // setTermsImsiBox(boxvalue3);
        }
      })
      if (!!receive.state) {
        navigate(`/biz/BusinessAppMgt/BusinessAppConfirmInfo/${receive.state.pblancId}`, {
          state: {
            ...receive.state,
            chkList: receive.state.chkList,
            cmpnyTypebox: cmpnyTypebox,
            pblancId: receive.state.pblancId,
            validationBox: boxvalue,
            title: receive.state.title
          }
        })
      }
    } else {
      setIsValid(true);
    }
  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업 신청</h2>
              {/* <p>입주기업은 물론 누구나 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p> */}
              <Stepper activeStep={1} alternativeLabel css={styles.step02}>
                {business_request.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom: 0}}>
            {/* [s] 기업&대학회원 */}
            {boxuser != 'INDIVIDUAL' &&
              <>
                <h1 className="sub_title_top">{!!receive.state ? receive.state.title : ''}</h1>
                <Box className="box_guide">
                  <ul>
                    <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                    <li>기업정보를 입력해 주세요. 상세하게 입력해 주실수록 접수 시 도움이 됩니다.</li>
                    <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                  </ul>
                </Box>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                  <h4 className="sub_title">신청자정보</h4>
                  <NavLink to="/MyPage/MemberInfoMmt/MemberInfoMdf"
                  >
                    <CustomButton label={'회원정보 변경'} type={'modify'} color={'outlinedblack'}
                                  style={{marginBottom: '10px'}}/>
                  </NavLink>
                </Stack>
                <Box css={styles.table}>
                  <div className="detail_table">
                    <dl>
                      <dt>사업자명/이름</dt>
                      <dd>{!!memberData ? memberData.memberNm : ''}</dd>
                      <dt>사업자등록번호</dt>
                      <dd>{!!memberData ? memberData.bizrno : ''}</dd>
                    </dl>
                    <dl>
                      <dt>대표자명</dt>
                      <dd>{!!memberData ? memberData.ceoNm : ''}</dd>
                      <dt>담당자명</dt>
                      <dd>{!!memberData ? memberData.chargerNm : ''}</dd>
                    </dl>
                    <dl>
                      <dt>담당자 휴대폰번호</dt>
                      <dd>{!!memberData ? memberData.mobileNo : ''}</dd>
                      <dt>담당자 이메일</dt>
                      <dd>{!!memberData ? memberData.email : ''}</dd>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                          >
                            {
                              (userQueries[0].status === 'success') ?
                                userQueries[0].data.list.map((option: any) => (
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
                            changeNowDate={(startNewTime: Date | null) => {
                              setCmpnyTypebox((state: any) => ({
                                ...state,
                                fondDay: dayjs(startNewTime).format('YYYYMMDD')
                              }));
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
                              onChange={handelChangeNumber}
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
                              onChange={handelChangeNumber}
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
                              onChange={handelChangeNumber}
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
                        <Stack spacing={'10px'} sx={{width: '100%'}}>
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
                              <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={handleClick}/>
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
                          value={!!cmpnyTypebox ? cmpnyTypebox.reprsntTelno : ''}
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
                            value={!!cmpnyTypebox ? cmpnyTypebox.newFntnPlanCd : ''}
                            // label="Age"
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                  <h4 className="sub_title">개인정보 수집 동의 <span className="must">*</span></h4>
                </Stack>
                <Box css={styles.agreement}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={allCheck} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setAllCheck(!allCheck)
                      }}/>} label="개인정보 수집 및 이용 전체 동의 (기업&대학회원)" className="checkbox h4"/>
                  </FormGroup>
                  <CustomCheckBoxsBiz
                    checkbox={termsBox}
                    isAll={allCheck}
                    isValid={isValid}
                    onClick={(s: string[]) => {
                      setValidationBox(s)
                      if (termsBox.length !== 0) {
                        setAllCheck((s.length) === (termsBox.length))
                      }
                    }}
                    setValidationBox={setValidationBox}
                  />
                </Box>
                <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}}
                       css={styles.btn_next}>
                  <NavLink
                    to={`/biz/BusinessAppMgt/BusinessApp/${!!receive.state ? receive.state.pblancId : ''}`}
                    state={{
                      ...receive.state,
                      chkList: receive.state.chkList,
                      pblancId: receive.state.pblancId,
                      title: receive.state.title
                    }}
                  >
                    <CustomButton label={'이전'} type={'listBack'} color={'outlinedblack'}/>
                  </NavLink>
                  <CustomButton label={'다음'} type={'listBack'} color={'primary'}
                                onClick={() => goBusinessAppConfirmInfo()}/>
                </Stack>
              </>
            }
            {/* [e] 기업&대학회원 */}

            {/* [s] 개인회원 */}
            {boxuser == 'INDIVIDUAL' &&
              <>
                <h1 className="sub_title_top">{!!receive.state ? receive.state.title : ''}</h1>
                <Box className="box_guide">
                  <ul>
                    <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                    <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                  </ul>
                </Box>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                  <h4 className="sub_title">신청자정보</h4>
                  <NavLink to="/MyPage/MemberInfoMmt/MemberInfoMdf"
                  >
                    <CustomButton label={'회원정보 변경'} type={'modify'} color={'outlinedblack'}
                                  style={{marginBottom: '10px'}}/>
                  </NavLink>
                </Stack>
                <Box css={styles.table}>
                  <div className="detail_table">
                    <dl>
                      <dt>이름</dt>
                      <dd>{!!memberData ? memberData.memberNm : ''}</dd>
                      <dt>생년월일</dt>
                      <dd>{!!memberData ? memberData.birthDay : ''}</dd>
                    </dl>
                    <dl>
                      <dt>성별</dt>
                      <dd>
                        {
                          (!!memberData && userQueries[4].data?.list )?
                            userQueries[4].data?.list.find((f: any) => f.code == memberData.gender)?.codeNm : ''
                        }</dd>
                      {/* <dt>내외국인</dt>
                      <dd>{memberData}</dd> */}
                    </dl>
                    <dl>
                      <dt>휴대폰번호</dt>
                      <dd>{!!memberData ? memberData.mobileNo : ''}</dd>
                      <dt>이메일</dt>
                      <dd>{!!memberData ? memberData.email : ''}</dd>
                    </dl>
                  </div>
                </Box>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                  <h4 className="sub_title">개인정보 수집 동의 <span className="must">*</span></h4>
                </Stack>
                <Box css={styles.agreement}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={allCheck} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setAllCheck(!allCheck)
                      }}/>} label="개인정보 수집 및 이용 전체 동의 (개인회원)"/>
                  </FormGroup>
                  <CustomCheckBoxsBiz
                    checkbox={termsBox}
                    isAll={allCheck}
                    isValid={isValid}
                    onClick={(s: string[]) => {
                      setValidationBox(s)
                      if (termsBox.length !== 0) {
                        setAllCheck((s.length) === (termsBox.length))
                      }
                    }}
                    setValidationBox={setValidationBox}
                  />
                </Box>
                <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}}
                       css={styles.btn_next}>
                  <NavLink
                    to={`/biz/BusinessAppMgt/BusinessApp/${!!receive.state ? receive.state.pblancId : ''}`}
                    state={{
                      ...receive.state,
                      chkList: receive.state.chkList,
                      pblancId: receive.state.pblancId,
                      title: receive.state.title
                    }}>
                    <CustomButton label={'이전'} type={'listBack'} color={'outlinedblack'}/>
                  </NavLink>
                  <CustomButton label={'다음'} type={'listBack'} color={'primary'}
                                onClick={() => goBusinessAppConfirmInfo()}/>
                </Stack>
              </>
            }
            {/* [e] 개인회원 */}
          </div>
        </div>
      </Box>
    </div>
  );
}
export default BusinessAppInfo;


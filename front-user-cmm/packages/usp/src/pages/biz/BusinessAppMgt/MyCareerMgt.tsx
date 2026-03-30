import React, {useEffect, useState} from "react"
import {useQueries, useQuery} from "react-query";
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import {Box, Stack, IconButton, Checkbox, OutlinedInput} from '@mui/material';
import {fetchCareerInfo, fetchCareerInfoModify} from "~/fetches/biz/fetchBusinessAppMgt";
import {PlusIcon, TrashIcon} from "~/components/IconComponents";
import {
  UsptAcdmcr,
  UsptCrqfc,
  UsptMsvc,
  UsptEtcCareer,
  UsptJobCareer,
  UsptProgrm,
  UsptWnpz
} from "~/models/biz/BusinessAppMgt";
import {CustomEtcCareerPrjcList} from "./View/CustomEtcCareerPrjcList";
import {CustomEtcCareerActList} from "./View/CustomEtcCareerActList";
import {CustomEtcCareerEdcList} from "./View/CustomEtcCareerEdcList";
import {CustomWnpzList} from "./View/CustomWnpzList";
import {CustomProgrmList} from "./View/CustomProgrmList";
import {CustomJobCareerList} from "./View/CustomJobCareerList";
import {CustomRadioButtons} from "~/components/NoticeCustomCheckBoxs";
import DatePicker from '~/components/DatePicker';
import dayjs from "~/../../shared/src/libs/dayjs";
import {CustomAcdmcrList} from "./View/CustomAcdmcrList";
import {CustomCrqfcList} from "./View/CustomCrqfcList";
import {useGlobalModalStore} from "./../../store/GlobalModalStore";
import {CustomButton, CustomLoadingButton, DefaultCheckBoxProps} from "~/components/ButtonComponents";
import {fetchGetCommCode} from "~/fetches";
import {ModalComponents} from "shared/components/ModalComponents";

/* 
  작성일    :   2022/06/25
  화면명    :   사업신청관리 / 나의경력관리 -> 나의경력관리
  회면ID    :   UI-USP-FRN-0150101
  화면/개발 :   yhkim2 / navycui
*/
const MyCareerMgt = () => {
  const today = new Date();
  const {addModal} = useGlobalModalStore();
  // const [dataSet, setDataSet] = useState<careerType>();
  const [acdmcrList, setAcdmcrList] = useState<UsptAcdmcr[]>([]);
  const [msvcInfo, setMsvcInfo] = useState<UsptMsvc>();
  const [crqfcList, setCrqfcList] = useState<UsptCrqfc[]>([]);
  const [jobCareerList, setJobCareerList] = useState<UsptJobCareer[]>([]);
  const [etcCareerActList, setEtcCareerActList] = useState<UsptEtcCareer[]>([]);
  const [etcCareerEdcList, setEtcCareerEdcList] = useState<UsptEtcCareer[]>([]);
  const [etcCareerPrjctList, setEtcCareerPrjctList] = useState<UsptEtcCareer[]>([]);

  const [wnpzList, setWnpzList] = useState<UsptWnpz[]>([]);
  const [progrmList, setProgrmList] = useState<UsptProgrm[]>([]);

  const [selectAcdmcrList, setSelectAcdmcrList] = useState<number[]>([]);
  const [select, setSelect] = useState<number[]>([]);
  const [selectJobCareerList, setSelectJobCareerList] = useState<number[]>([]);
  const [selectEtcCareerActList, setSelectEtcCareerActList] = useState<number[]>([]);
  const [selectEtcCareerEdcList, setSelectEtcCareerEdcList] = useState<number[]>([]);
  const [selectEtcCareerPrjctList, setSelectEtcCareerPrjctList] = useState<number[]>([]);
  const [selectWnpzList, setSelectWnpzList] = useState<number[]>([]);
  const [selectProgrmList, setSelectProgrmList] = useState<number[]>([]);

  const [message, setMessage] = useState('')

  // 공통코드 조회
  const userQueries: any = useQueries(
    [
      'GRDTN_DIV',    // 졸업구분코드
      'MSVC_TYPE',    // 군복무유형코드
      'CAREER_TYPE',  // 경력유형코드
      'PROGRM_TYPE',  // 프로그램유형코드
      'GRAD_TYPE'     // 등급유형코드
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn: () => fetchGetCommCode(TermsType),
      }
    })
  )
  // 경력정보 조회
  const {data, isLoading, isFetching, refetch}: any = useQuery("getSiteMap", async () => await fetchCareerInfo())

  useEffect(() => {
    if (!isLoading && !isFetching && !!data) {
      console.log('data - ' + JSON.stringify(data))
      setAcdmcrList((data.acdmcrList.length > 0) ? data.acdmcrList.map((m: any) => {
        return {...m, flag: 'U'}
      }) : [{
        acdmcrId: "",
        bgnde: "",
        endde: "",
        flag: 'temp',
        grdtnDivCd: "",
        major: "",
        schulNm: "",
        rn: 1
      }])

      setCrqfcList((data.crqfcList.length > 0) ? data.crqfcList.map((m: any) => {
        return {...m, flag: 'U'}
      }) : [{
        crqfcId: '',
        crqfcNm: '',
        grad: '',
        acqdt: '',
        athrzInstt: '',
        flag: 'temp',
        rn: 1
      }])

      setMsvcInfo(data.msvcInfo)

      setJobCareerList((data.jobCareerList.length > 0) ? data.jobCareerList.map((m: any) => {
        return {...m, flag: 'U'}
      }) : [{
        jobCareerId: '',
        wrkplc: '',
        bgnde: '',
        endde: '',
        job: '',
        retireResn: '',
        flag: 'temp',
        rn: 1
      }])
      setProgrmList(data.progrmList.length > 0 ? data.progrmList.map((m: any) => {
        return {...m, flag: 'U'}
      }) : [{
        progrmId: '',
        progrmTypeCd: '',
        progrmTypeInput: '',
        gradTypeCd: '',
        flag: 'temp',
        rn: 1
      }])
      setWnpzList(data.wnpzList.length > 0 ? data.wnpzList.map((m: any) => {
        return {...m, flag: 'U'}
      }) : [{
        wnpzId: '',
        wnpzNm: '',
        acqdt: '',
        isuInstt: '',
        flag: 'temp',
        rn: 1
      }])

      if (!!data) {
        let {etcCareerList} = data;
        let act = etcCareerList.filter((el: any) => el.careerTypeCd == 'ACT')
        let prjct = etcCareerList.filter((el: any) => el.careerTypeCd == 'PRJCT')
        let edc = etcCareerList.filter((el: any) => el.careerTypeCd == 'EDC')
        setEtcCareerActList(act.length > 0 ? act.map((m: any) => {
          return {...m, flag: 'U'}
        }) : [{
          etcCareerId: '',
          careerNm: '',
          careerTypeCd: '',
          bgnde: '',
          endde: '',
          cn: '',
          instt: '',
          flag: 'temp',
          rn: 1
        }])
        setEtcCareerEdcList(edc.length > 0 ? edc.map((m: any) => {
          return {...m, flag: 'U'}
        }) : [{
          etcCareerId: '',
          careerNm: '',
          careerTypeCd: '',
          bgnde: '',
          endde: '',
          cn: '',
          instt: '',
          flag: 'temp',
          rn: 1
        }])
        setEtcCareerPrjctList(prjct.lenient > 0 ? prjct.map((m: any) => {
          return {...m, flag: 'U'}
        }) : [{
          etcCareerId: '',
          careerNm: '',
          careerTypeCd: '',
          bgnde: '',
          endde: '',
          cn: '',
          instt: '',
          flag: 'temp',
          rn: 1
        }])
      }
    }
  }, [data])


// 저장 실행
  const handleSave = async () => {
    let newMessage = ""

    acdmcrList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      if (m.bgnde == "") newMessage = '학력에 기간을 입력해주세요.'
    })

    crqfcList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      if (m.crqfcNm == "") newMessage = '자격증에 자격명칭을 입력해주세요.'
    })

    jobCareerList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      console.log('job - ' + JSON.stringify(m))
      if (m.wrkplc == "") newMessage = '경력에 근무처를 입력해주세요.'
    })

    wnpzList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      if (m.wnpzNm == "") newMessage = '수상에 종류를 입력해주세요.'
    })

    etcCareerActList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      if (m.careerNm == "") newMessage = '대외활동에 활동명을 입력해주세요.'
    })

    etcCareerEdcList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      if (m.careerNm == "") newMessage = '외부교육에 활동명을 입력해주세요.'
    })

    etcCareerPrjctList.filter(f => f.flag != null && f.flag != 'temp' && f.flag != 'D').map(m => {
      if (m.careerNm == "") newMessage = '프로젝트에 활동명을 입력해주세요.'
    })

    if (newMessage != "") {
      setMessage(newMessage)
      // addModal({
      //   open: true,
      //   content: message,
      // })
    } else {
      let params = {
        acdmcrList: acdmcrList.filter(f => f.flag == null || f.flag != 'temp'),
        crqfcList: crqfcList.filter(f => f.flag == null || f.flag != 'temp'),
        msvcInfo: msvcInfo,
        jobCareerList: jobCareerList.filter(f => f.flag == null || f.flag != 'temp'),
        progrmList: progrmList.filter(f => f.flag == null || f.flag != 'temp'),
        wnpzList: wnpzList.filter(f => f.flag == null || f.flag != 'temp'),
        etcCareerList: [
          ...etcCareerActList.filter(f => f.flag == null || f.flag != 'temp'),
          ...etcCareerEdcList.filter(f => f.flag == null || f.flag != 'temp'),
          ...etcCareerPrjctList.filter(f => f.flag == null || f.flag != 'temp')
        ]
      }

      console.log('params - ' + JSON.stringify(params))
      await fetchCareerInfoModify(params).then(() => {
        setMessage('저장 되었습니다')
        refetch()
      }).catch((e) => {
        addModal({
          open: true,
          content: e.response.data.message
        });
      })
    }

  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">나의경력관리</h2>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom: 0}}>
            <Box className="box_guide">
              <ul>
                <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
              </ul>
            </Box>
            {/* 학력 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">학력</h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = acdmcrList.filter(f => {
                      if (selectAcdmcrList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setAcdmcrList(update.map(m => {
                      return {
                        ...m,
                        flag: selectAcdmcrList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectAcdmcrList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!acdmcrList) {
                      const list = acdmcrList.flatMap(m => m.rn).sort()

                      setAcdmcrList(acdmcrList.concat({
                        acdmcrId: "",
                        bgnde: "",
                        endde: "",
                        flag: 'temp',
                        grdtnDivCd: "",
                        major: "",
                        schulNm: "",
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            {/* mobile 학력  */}
            {/* <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'60%'}}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th>기간</th>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questBeginDay}
                            onChange={handleChangeStart}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                          <div>~</div>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questEndDay}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </td>
                  </tr>
                  <tr>
                    <th>학교명</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>전공</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>졸업구분</th>
                    <td>
                      <FormControl fullWidth>
                        <Select labelId="" id="" sx={{ height: '48px'}}>
                          <MenuItem>AI 분석 전문가</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th>기간</th>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questBeginDay}
                            onChange={handleChangeStart}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                          <div>~</div>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questEndDay}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </td>
                  </tr>
                  <tr>
                    <th>학교명</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>전공</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>졸업구분</th>
                    <td>
                      <FormControl fullWidth>
                        <Select labelId="" id="" sx={{ height: '48px'}}>
                          <MenuItem>AI 분석 전문가</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            {/* mobile 학력 끝  */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '30.7%'}}/>
                <col style={{width: '21.4%'}}/>
                <col style={{width: '21.4%'}}/>
                <col style={{width: '21.4%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th>
                  <Box className="checkbox">
                    <Checkbox
                      checked={selectAcdmcrList.length == acdmcrList.filter(f => f.flag == null || f.flag != 'D').length}
                      onClick={(e) => {
                        if (selectAcdmcrList.length == acdmcrList.filter(f => f.flag == null || f.flag != 'D').length) {
                          setSelectAcdmcrList([])
                        } else {
                          setSelectAcdmcrList(acdmcrList.flatMap(m => m.rn))
                        }
                      }}/>
                  </Box></th>
                <th>기간</th>
                <th>학교명</th>
                <th>전공</th>
                <th>졸업구분</th>
              </tr>
              </thead>
              <tbody>
              {
                acdmcrList.filter((f: any) => f.flag == null || f.flag !== 'D').map(
                  (item: UsptAcdmcr, key: number) => (
                    <CustomAcdmcrList
                      key={key}
                      data={item}
                      checkList={selectAcdmcrList}
                      setSelected={(rn) => {
                        if (selectAcdmcrList.includes(rn)) {
                          setSelectAcdmcrList(selectAcdmcrList.filter(f => f != rn))
                        } else {
                          setSelectAcdmcrList(selectAcdmcrList.concat(rn))
                        }
                      }}
                      codeList={(userQueries[0].status === 'success') ? userQueries[0].data.list : []}
                      setData={(data: UsptAcdmcr) => {
                        let empty = false
                        if (data.grdtnDivCd == "" && data.major == "" && data.schulNm == "") {
                          empty = true
                        }

                        setAcdmcrList(acdmcrList.map(m => {
                          const result = (m.rn == data.rn) ? data : m
                          const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.acdmcrId == "" ? "I" : "U" : m.flag
                          return {
                            ...result,
                            flag: newFlag
                          }
                        }))
                        // }
                      }}/>
                  ))
              }
              </tbody>
            </table>
            {/* //학력 end*/}
            {/* 병역 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">병역</h4>
            </Stack>
            <Box css={styles.table}>
              <div className="detail_table type2">
                <dl>
                  <dt>군필여부</dt>
                  <dd><CustomRadioButtons row
                                          data={(userQueries[1].status === 'success') ? userQueries[1].data.list : []}
                                          val={!!msvcInfo ? msvcInfo.msvcTypeCd : ''}
                                          viewId="군필여부"
                                          onClick={(s: string) =>
                                            setMsvcInfo((preState: any) => ({
                                              ...preState, msvcTypeCd: s
                                            }))
                                          }/></dd>
                  <dt>복무기간</dt>
                  <dd>
                    <div className="datepicker">
                      <DatePicker
                        pickerType='two'
                        questBeginDay={msvcInfo ? dayjs(msvcInfo.msvcBgnde, 'yyyy-MM-dd').toString() : ''}
                        questEndDay={msvcInfo ? dayjs(msvcInfo.msvcEndde, 'yyyy-MM-dd').toString() : ''}
                        changeStart={(newTime: Date | null) => {
                          setMsvcInfo((preState: any) => ({
                            ...preState, msvcBgnde: dayjs(newTime).format('YYYYMMDD')
                          }))
                        }}
                        changeEnd={(newTime: Date | null) => {
                          setMsvcInfo((preState: any) => ({
                            ...preState, msvcEndde: dayjs(newTime).format('YYYYMMDD')
                          }))
                        }}
                      />
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>미필 및 면제 사유</dt>
                  <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width: '100%'}}
                                     name='msvcExemptReason'
                                     value={msvcInfo ? msvcInfo.msvcExemptReason : ''}
                                     onChange={(e: any) => {
                                       setMsvcInfo((preState: any) => ({
                                         ...preState, msvcExemptReason: e.target.value
                                       }))
                                     }}/></dd>
                </dl>
              </div>
            </Box>
            {/* //병역  end*/}

            {/* 자격증 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">자격증</h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = crqfcList.filter(f => {
                      if (select.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setCrqfcList(update.map(m => {
                      return {
                        ...m,
                        flag: select.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelect([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!crqfcList) {
                      const list = crqfcList.flatMap(m => m.rn).sort()

                      setCrqfcList(crqfcList.concat({
                        crqfcId: '',
                        crqfcNm: '',
                        grad: '',
                        acqdt: '',
                        athrzInstt: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            {/* mobile 자격증  */}
            {/* <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'60%'}}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th>자격명칭</th>
                    <td>
                      <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                    </td>
                  </tr>
                  <tr>
                    <th>등급</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>취득일</th>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat={"yyyy-MM-dd"}
                          mask={"____-__-__"}
                          value={questBeginDay}
                          onChange={handleChangeStart}
                          renderInput={(params) => <TextField {...params} />}
                          components={{
                            OpenPickerIcon: DateIcon
                          }}
                        />
                      </LocalizationProvider>
                    </td>
                  </tr>
                  <tr>
                    <th>검정기관</th>
                    <td>
                      <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div> */}
            {/* mobile 자격증  */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '26%'}}/>
                <col style={{width: '26%'}}/>
                <col style={{width: '14%'}}/>
                <col style={{width: '28%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th><Box className="checkbox">
                  <Checkbox
                    checked={select.length == crqfcList.filter(f => f.flag == null || f.flag != 'D').length}
                    onClick={(e) => {
                      if (select.length == crqfcList.filter(f => f.flag == null || f.flag != 'D').length) {
                        setSelect([])
                      } else {
                        setSelect(crqfcList.flatMap(m => m.rn))
                      }
                    }}/>
                </Box></th>
                <th>자격명칭</th>
                <th>등급</th>
                <th>취득일</th>
                <th>검정기관</th>
              </tr>
              </thead>
              <tbody>
              {/* <CustomCrqfc/> */}
              {
                crqfcList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptCrqfc, key: number) => (
                  <CustomCrqfcList
                    key={key}
                    data={item}
                    checkList={select}
                    setSelected={(rn) => {
                      if (select.includes(rn)) {
                        setSelect(select.filter(f => f != rn))
                      } else {
                        setSelect(select.concat(rn))
                      }
                    }}
                    setData={(data: UsptCrqfc) => {
                      let empty = false
                      if (data.crqfcNm == "" && data.acqdt == "" && data.athrzInstt == "" && data.grad == "") {
                        empty = true
                      }

                      setCrqfcList(crqfcList.map(m => {
                        const result = (m.rn == data.rn) ? data : m
                        const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.crqfcId == "" ? "I" : "U" : m.flag
                        return {
                          ...result,
                          flag: newFlag
                        }
                      }))
                    }}
                  />
                ))}
              </tbody>
            </table>
            {/* //자격증 */}

            {/* 경력 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">경력</h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = jobCareerList.filter(f => {
                      if (selectJobCareerList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setJobCareerList(update.map(m => {
                      return {
                        ...m,
                        flag: selectJobCareerList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectJobCareerList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!jobCareerList) {
                      const list = jobCareerList.flatMap(m => m.rn).sort()

                      setJobCareerList(jobCareerList.concat({
                        jobCareerId: '',
                        wrkplc: '',
                        bgnde: '',
                        endde: '',
                        job: '',
                        retireResn: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            {/* <div className="mo">
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
                </FormGroup>
                <table className="tableDefault type5">
                  <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'30%'}}/>
                    <col style={{width:'60%'}}/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>근무처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>근무기간</th>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questBeginDay}
                              onChange={handleChangeStart}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                            <div>~</div>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questEndDay}
                              onChange={handleChangeEnd}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </td>
                    </tr>
                    <tr>
                      <th>담당업무</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>퇴사사유</th>
                      <td>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>근무처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>근무기간</th>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questBeginDay}
                              onChange={handleChangeStart}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                            <div>~</div>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questEndDay}
                              onChange={handleChangeEnd}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </td>
                    </tr>
                    <tr>
                      <th>담당업무</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>퇴사사유</th>
                      <td>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */
            }
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '30%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '22%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th><Box className="checkbox">
                  <Checkbox
                    checked={selectJobCareerList.length == jobCareerList.filter(f => f.flag == null || f.flag != 'D').length}
                    onClick={(e) => {
                      if (selectJobCareerList.length == jobCareerList.filter(f => f.flag == null || f.flag != 'D').length) {
                        setSelectJobCareerList([])
                      } else {
                        setSelectJobCareerList(jobCareerList.flatMap(m => m.rn))
                      }
                    }}/>
                </Box></th>
                <th>근무처</th>
                <th>근무기간</th>
                <th>담당업무</th>
                <th>퇴사사유</th>
              </tr>
              </thead>
              <tbody>
              {/* CustomJobCareerList */}
              {
                jobCareerList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptJobCareer, key: number) => (
                  <CustomJobCareerList
                    key={key}
                    data={item}
                    checkList={selectJobCareerList}
                    setSelected={(rn) => {
                      if (selectJobCareerList.includes(rn)) {
                        setSelectJobCareerList(selectJobCareerList.filter(f => f != rn))
                      } else {
                        setSelectJobCareerList(selectJobCareerList.concat(rn))
                      }
                    }}
                    setData={(data: UsptJobCareer) => {
                      let empty = false
                      if (data.job == "" && data.wrkplc == "" && data.retireResn == "") {
                        empty = true
                      }
                      console.log('data - ' + JSON.stringify(data))
                      console.log('empty - ' + JSON.stringify(empty))
                      setJobCareerList(jobCareerList.map(m => {
                        const result = (m.rn == data.rn) ? data : m
                        const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.jobCareerId == "" ? "I" : "U" : m.flag

                        return {
                          ...result,
                          flag: newFlag
                        }
                      }))
                    }}/>
                ))}
              </tbody>
            </table>
            {/* //경력 */
            }

            {/* 대외활동 */
            }
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">대외활동</h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = etcCareerActList.filter(f => {
                      if (selectEtcCareerActList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setEtcCareerActList(update.map(m => {
                      return {
                        ...m,
                        flag: selectEtcCareerActList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectEtcCareerActList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!etcCareerActList) {
                      const list = etcCareerActList.flatMap(m => m.rn).sort()

                      setEtcCareerActList(etcCareerActList.concat({
                        etcCareerId: '',
                        careerNm: '',
                        careerTypeCd: '',
                        bgnde: '',
                        endde: '',
                        cn: '',
                        instt: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '30%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '22%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th>
                  <Box className="checkbox">
                    <Checkbox
                      checked={selectEtcCareerActList.length == etcCareerActList.filter(f => f.flag == null || f.flag != 'D').length}
                      onClick={(e) => {
                        if (selectEtcCareerActList.length == etcCareerActList.filter(f => f.flag == null || f.flag != 'D').length) {
                          setSelectEtcCareerActList([])
                        } else {
                          setSelectEtcCareerActList(etcCareerActList.flatMap(m => m.rn))
                        }
                      }}/>
                  </Box>
                </th>
                <th>활동명</th>
                <th>활동기간</th>
                <th>활동내용</th>
                <th>활동기간</th>
              </tr>
              </thead>
              <tbody>
              {etcCareerActList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptEtcCareer, key: number) => (
                <CustomEtcCareerActList
                  key={key}
                  data={item}
                  checkList={selectEtcCareerActList}
                  setSelected={(rn) => {
                    if (selectEtcCareerActList.includes(rn)) {
                      setSelectEtcCareerActList(selectEtcCareerActList.filter(f => f != rn))
                    } else {
                      setSelectEtcCareerActList(selectEtcCareerActList.concat(rn))
                    }
                  }}
                  setData={(data: UsptEtcCareer) => {
                    let empty = false
                    if (data.careerNm == "" && data.instt == "" && data.cn == "") {
                      empty = true
                    }

                    setEtcCareerActList(etcCareerActList.map(m => {
                      const result = (m.rn == data.rn) ? data : m
                      const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.etcCareerId == "" ? "I" : "U" : m.flag
                      return {
                        ...result,
                        flag: newFlag
                      }
                    }))
                  }}/>
              ))}
              </tbody>
            </table>
            {/* //대외활동 */
            }

            {/* 외부교육 */
            }
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">외부교육</h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = etcCareerEdcList.filter(f => {
                      if (selectEtcCareerEdcList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setEtcCareerEdcList(update.map(m => {
                      return {
                        ...m,
                        flag: selectEtcCareerEdcList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectEtcCareerEdcList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!etcCareerEdcList) {
                      const list = etcCareerEdcList.flatMap(m => m.rn).sort()

                      setEtcCareerEdcList(etcCareerEdcList.concat({
                        etcCareerId: '',
                        careerNm: '',
                        careerTypeCd: '',
                        bgnde: '',
                        endde: '',
                        cn: '',
                        instt: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '30%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '22%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th>
                  <Box className="checkbox">
                    <Checkbox
                      checked={selectEtcCareerEdcList.length == etcCareerEdcList.filter(f => f.flag == null || f.flag != 'D').length}
                      onClick={(e) => {
                        if (selectEtcCareerEdcList.length == etcCareerEdcList.filter(f => f.flag == null || f.flag != 'D').length) {
                          setSelectEtcCareerEdcList([])
                        } else {
                          setSelectEtcCareerEdcList(etcCareerEdcList.flatMap(m => m.rn))
                        }
                      }}/>
                  </Box>
                </th>
                <th>활동명</th>
                <th>활동기간</th>
                <th>활동내용</th>
                <th>활동기간</th>
              </tr>
              </thead>
              <tbody>
              {
                etcCareerEdcList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptEtcCareer, key: number) => (
                  <CustomEtcCareerEdcList
                    key={key}
                    data={item}
                    checkList={selectEtcCareerEdcList}
                    setSelected={(rn) => {
                      if (selectEtcCareerEdcList.includes(rn)) {
                        setSelectEtcCareerEdcList(selectEtcCareerEdcList.filter(f => f != rn))
                      } else {
                        setSelectEtcCareerEdcList(selectEtcCareerEdcList.concat(rn))
                      }
                    }}
                    setData={(data: UsptEtcCareer) => {
                      let empty = false
                      if (data.careerNm == "" && data.instt == "" && data.cn == "") {
                        empty = true
                      }

                      setEtcCareerEdcList(etcCareerEdcList.map(m => {
                        const result = (m.rn == data.rn) ? data : m
                        const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.etcCareerId == "" ? "I" : "U" : m.flag
                        return {
                          ...result,
                          flag: newFlag
                        }
                      }))
                    }}/>
                ))}
              </tbody>
            </table>
            {/* //외부교육 */
            }

            {/* 프로젝트 */
            }
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">프로젝트</h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = etcCareerPrjctList.filter(f => {
                      if (selectEtcCareerPrjctList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setEtcCareerPrjctList(update.map(m => {
                      return {
                        ...m,
                        flag: selectEtcCareerPrjctList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectEtcCareerPrjctList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!etcCareerPrjctList) {
                      const list = etcCareerPrjctList.flatMap(m => m.rn).sort()

                      setEtcCareerPrjctList(etcCareerPrjctList.concat({
                        etcCareerId: '',
                        careerNm: '',
                        careerTypeCd: '',
                        bgnde: '',
                        endde: '',
                        cn: '',
                        instt: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '30%'}}/>
                <col style={{width: '22%'}}/>
                <col style={{width: '22%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th>
                  <Box className="checkbox">
                    <Checkbox
                      checked={selectEtcCareerPrjctList.length == etcCareerPrjctList.filter(f => f.flag == null || f.flag != 'D').length}
                      onClick={(e) => {
                        if (selectEtcCareerPrjctList.length == etcCareerPrjctList.filter(f => f.flag == null || f.flag != 'D').length) {
                          setSelectEtcCareerPrjctList([])
                        } else {
                          setSelectEtcCareerPrjctList(etcCareerPrjctList.flatMap(m => m.rn))
                        }
                      }}/>
                  </Box>
                </th>
                <th>활동명</th>
                <th>활동기간</th>
                <th>활동내용</th>
                <th>활동기간</th>
              </tr>
              </thead>
              <tbody>
              {
                etcCareerPrjctList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptEtcCareer, key: number) => (
                  <CustomEtcCareerPrjcList
                    key={key}
                    data={item}
                    checkList={selectEtcCareerPrjctList}
                    setSelected={(rn) => {
                      if (selectEtcCareerPrjctList.includes(rn)) {
                        setSelectEtcCareerActList(selectEtcCareerPrjctList.filter(f => f != rn))
                      } else {
                        setSelectEtcCareerActList(selectEtcCareerPrjctList.concat(rn))
                      }
                    }}
                    setData={(data: UsptEtcCareer) => {
                      let empty = false
                      if (data.careerNm == "" && data.instt == "" && data.cn == "") {
                        empty = true
                      }

                      setEtcCareerPrjctList(etcCareerPrjctList.map(m => {
                        const result = (m.rn == data.rn) ? data : m
                        const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.etcCareerId == "" ? "I" : "U" : m.flag
                        return {
                          ...result,
                          flag: newFlag
                        }
                      }))
                    }}/>
                ))}
              </tbody>
            </table>
            {/* //프로젝트 */
            }

            {/* 수상 */
            }
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">수상 <span className="must">*</span></h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = wnpzList.filter(f => {
                      if (selectWnpzList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setWnpzList(update.map(m => {
                      return {
                        ...m,
                        flag: selectWnpzList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectWnpzList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!wnpzList) {
                      const list = wnpzList.flatMap(m => m.rn).sort()

                      setWnpzList(wnpzList.concat({
                        wnpzId: '',
                        wnpzNm: '',
                        acqdt: '',
                        isuInstt: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>

            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '39%'}}/>
                <col style={{width: '16%'}}/>
                <col style={{width: '42%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th>
                  <Box className="checkbox">
                    <Checkbox
                      checked={selectWnpzList.length == wnpzList.filter(f => f.flag == null || f.flag != 'D').length}
                      onClick={(e) => {
                        if (selectWnpzList.length == wnpzList.filter(f => f.flag == null || f.flag != 'D').length) {
                          setSelectWnpzList([])
                        } else {
                          setSelectWnpzList(wnpzList.flatMap(m => m.rn))
                        }
                      }}/>
                  </Box>
                </th>
                <th>종류</th>
                <th>취득일</th>
                <th>발행기관</th>
              </tr>
              </thead>
              <tbody>
              {
                wnpzList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptWnpz, key: number) => (
                  <CustomWnpzList
                    key={key}
                    data={item}
                    checkList={selectWnpzList}
                    setSelected={(rn) => {
                      if (selectWnpzList.includes(rn)) {
                        setSelectWnpzList(selectWnpzList.filter(f => f != rn))
                      } else {
                        setSelectWnpzList(selectWnpzList.concat(rn))
                      }
                    }}
                    setData={(data: UsptWnpz) => {
                      let empty = false
                      if (data.isuInstt == "" && data.wnpzNm == "" && data.acqdt == "") {
                        empty = true
                      }

                      setWnpzList(wnpzList.map(m => {
                        const result = (m.rn == data.rn) ? data : m
                        const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.wnpzId == "" ? "I" : "U" : m.flag
                        return {
                          ...result,
                          flag: newFlag
                        }
                      }))
                    }}/>
                ))}
              </tbody>
            </table>
            {/* //수상 */
            }

            {/* 프로그램명 */
            }
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">프로그램 <span className="must">*</span></h4>
              <Box>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete" sx={{mr: 1.5}}
                  onClick={(e) => {
                    const update = progrmList.filter(f => {
                      if (selectProgrmList.includes(f.rn) && f.flag == 'I') {
                        return false
                      }
                      return true
                    })

                    setProgrmList(update.map(m => {
                      return {
                        ...m,
                        flag: selectProgrmList.includes(m.rn) ? "D" : m.flag
                      }
                    }))

                    setSelectProgrmList([])
                  }}>
                  <TrashIcon/>
                </IconButton>
                <IconButton
                  size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e) => {
                    if (!!progrmList) {
                      const list = progrmList.flatMap(m => m.rn).sort()

                      setProgrmList(progrmList.concat({
                        progrmId: '',
                        progrmTypeCd: '',
                        progrmTypeInput: '',
                        gradTypeCd: '',
                        flag: 'temp',
                        rn: list[list.length - 1] + 1
                      }))
                    }
                  }}>
                  <PlusIcon/>
                </IconButton>
              </Box>
            </Stack>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width: '4%'}}/>
                <col style={{width: '63%'}}/>
                <col style={{width: '33%'}}/>
              </colgroup>
              <thead>
              <tr>
                <th className="checkbox">
                  <Checkbox
                    checked={selectProgrmList.length == progrmList.filter(f => f.flag == null || f.flag != 'D').length} //selectProgrmList.length == progrmList.filter(f => f.flag == null || f.flag != 'D').length
                    onClick={(e) => {
                      if (selectProgrmList.length == progrmList.filter(f => f.flag == null || f.flag != 'D').length) {
                        setSelectProgrmList([])
                      } else {
                        setSelectProgrmList(progrmList.flatMap(m => m.rn))
                      }
                    }}/>
                </th>
                <th>프로그램명</th>
                <th>프로그램 능력</th>
              </tr>
              </thead>
              <tbody>
              {
                progrmList.filter((f: any) => f.flag == null || f.flag !== 'D').map((item: UsptProgrm, key: number) => (
                  <CustomProgrmList
                    key={key}
                    data={item}
                    GradCodeList={(userQueries[3].status === 'success') ? userQueries[3].data.list : []}
                    ProgrmCodeList={(userQueries[4].status === 'success') ? userQueries[4].data.list : []}
                    checkList={selectProgrmList}
                    setSelected={(rn) => {
                      if (selectProgrmList.includes(rn)) {
                        setSelectProgrmList(selectProgrmList.filter(f => f != rn))
                      } else {
                        setSelectProgrmList(selectProgrmList.concat(rn))
                      }
                    }}
                    setData={(data: UsptProgrm) => {
                      let empty = false
                      if (data.progrmTypeCd == "" && data.progrmTypeInput == "" && data.gradTypeCd == "") {
                        empty = true
                      }

                      setProgrmList(progrmList.map(m => {
                        const result = (m.rn == data.rn) ? data : m
                        const newFlag = (m.rn == data.rn) ? empty ? 'temp' : result.progrmId == "" ? "I" : "U" : m.flag
                        return {
                          ...result,
                          flag: newFlag
                        }
                      }))
                    }}/>
                ))
              }
              </tbody>
            </table>

            {/* <CustomProgrmListTodo
              GradCodeList={(userQueries[3].status === 'success') ? userQueries[3].data.list : []} 
              ProgrmCodeList={(userQueries[4].status === 'success') ? userQueries[4].data.list : []} 
              dataList={progrmList}
              onChangeBox={(usptdata: UsptProgrm[]) => {
                let demobox = [...usptdata]
                setProgrmList(demobox)
                if (usptdata.length > 0) console.log(usptdata);
              }}
              // children={<Box>todo list</Box>}
            /> */
            }

            {/* <table className="tableDefault type5 mo">
              <colgroup>
                <col style={{width:'4%'}}/>
                <col style={{width:'63%'}}/>
                <col style={{width:'33%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th className="checkbox">
                    <Checkbox />
                  </th>
                  <th>프로그램명</th>
                  <th>프로그램 능력</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="checkbox"><Checkbox /></td>
                  <td>
                    <Box css={styles.inputBox}>
                      <FormControl>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'50%'}} />
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">업아이디창어</MenuItem>
                          <MenuItem value="CATE-STEP-02">구인/구직</MenuItem>
                          <MenuItem value="CATE-STEP-03">제안/기타</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td className="vat">
                    <Box css={styles.inputBox}>
                      <FormControl sx={{ width: '100%'}}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">상</MenuItem>
                          <MenuItem value="CATE-STEP-02">중</MenuItem>
                          <MenuItem value="CATE-STEP-03">하</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox"><Checkbox /></td>
                  <td>
                    <Box css={styles.inputBox}>
                      <FormControl>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'50%'}} />
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">업아이디창어</MenuItem>
                          <MenuItem value="CATE-STEP-02">구인/구직</MenuItem>
                          <MenuItem value="CATE-STEP-03">제안/기타</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td className="vat">
                    <Box css={styles.inputBox}>
                      <FormControl sx={{ width: '100%'}}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">상</MenuItem>
                          <MenuItem value="CATE-STEP-02">중</MenuItem>
                          <MenuItem value="CATE-STEP-03">하</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                </tr>
              </tbody>
            </table> */
            }
            {/* //프로그램명 */
            }

            <Stack direction="row" justifyContent="center" sx={{marginTop: '40px'}} css={styles.btn_next}>
              <CustomLoadingButton label={'저장'} type={'listBack'} color={'primary'} onClick={handleSave}/>
            </Stack>
          </div>
        </div>
      </Box>

      {
        <ModalComponents
          isDist open={message != ""}
          content={message}
          onClose={() => {
            setMessage("")
            window.scrollTo(0, 5);
          }}
          onConfirm={() => {
            setMessage("")
            window.scrollTo(0, 5);
          }}/>
      }
    </div>
  )
    ;
}

export default MyCareerMgt;

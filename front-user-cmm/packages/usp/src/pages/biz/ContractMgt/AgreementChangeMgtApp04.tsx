import React, {ChangeEvent, useEffect} from "react"
import {useState} from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import {
  Box,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  TooltipProps,
  Tooltip,
  tooltipClasses,
  styled,
  Tab,
  Tabs
} from '@mui/material';
import {CustomAgreementButtons, CustomButton} from '~/components/ButtonComponents';
import {FileUpload, FileUpload1} from "../../EventNews/FileUpload";
import {CustomRadioButtons} from '~/components/ButtonComponents';
import {QuestionIcon} from '~/components/IconComponents';
import IconButton from '@material-ui/core/IconButton';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchCnvnApplcntCancel, fetchCnvnApplcntPost, fetchTaskTaxitmGet} from "~/fetches/biz/fetchAgreementChangeMgt";
import {AgreementTaskTaxitmBeforeTable} from "./View/AgreementTaskTaxitmTable";


// 협약변경 관리 비목별사업비
function AgreementChangeMgtApp04() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const receive: any = useLocation();
  const [attachmentFileList, setAttachmentFileList]: any = useState([]);
  const [deleteAttachFileList, setDeleteAttachFileList]: any = useState([]);
  const [resnCnError, setResnCnError] = useState({resnCnError: false, resnCnHelper: ""})
  const [usptTaskTaxitmWctHistBeforeList, setUsptTaskTaxitmWctHistBeforeList] = useState<any[]>([]);
  const [usptTaskTaxitmWctHistAfterList, setUsptTaskTaxitmWctHistAfterList] = useState<any[]>([]);
  const [data, setData]: any = useState();
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeAfter = (event: React.SyntheticEvent, newValue: number) => {
    setValue1(newValue);
  };

  const handlerAfterList = (e: React.ChangeEvent<HTMLInputElement>, curAfterList: any, data: any, wctTaxitmNm: string, div: '인건비' | '운영비') => {
    const {name, value} = e.target
    const key = Object.keys(curAfterList)[0]
    const newValue = name == 'computBasisCn' ? value : e.target.value.replace(/[^0-9]/g, '')

    if (data) {
      setUsptTaskTaxitmWctHistAfterList(
        usptTaskTaxitmWctHistAfterList.map((n: any) => {
          return {
            ...n,
            [key.toString()]: Object.values(n).flatMap(m => m).map((item: any) => {
              const result = item.wctTaxitmNm == wctTaxitmNm ? newValue : item[name]
              return {
                ...item,
                [name.toString()]: result
              }
            })
          }
        }))
    } else {
      setUsptTaskTaxitmWctHistAfterList(usptTaskTaxitmWctHistAfterList.map((n: any) => {
        if (key == Object.keys(n)[0]) {
          return {
           [key]: Object.values(n).flatMap(m => m).concat({
              taskTaxitmWctHistId: '',
              cnvnChangeReqId: '',
              confmTaskTaxitmWctHistId: '',
              wctTaxitmId: '',
              wctTaxitmNm: wctTaxitmNm,
              computBasisCn: name == 'computBasisCn' ? newValue : '',
              sportBudget: name == 'sportBudget' ? newValue : 0,
              alotmCash: name == 'alotmCash' ? newValue : 0,
              alotmActhng: name == 'alotmActhng' ? newValue : 0,
              alotmSumTot: 0,
              wctIoeId: '',
              wctIoeNm: div,
              bsnsYear: key,
              changeDe: null
            })
          }
        }
        return n
      }))
    }
  }
  const [resnCn, setResnCn] = useState("");

  const deleteAttach1 = (attachmentId: string, i: number) => {
    const update = [...deleteAttachFileList]
    update.push({
      attachmentId: attachmentId
    })
    setDeleteAttachFileList(update);
    const update1 = [...attachmentFileList]
    update1.splice(i, 1)
    setAttachmentFileList(update1);
  }

  //파일첨부 삭제
  const handleDelete = (i: number) => {
    const update = [...files]
    update.splice(i, 1)
    setFiles(update);
  };

  const isDetail = true;
  const [files, setFiles]: any = useState([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upfile: any = e.target.files;
    const update = [...files]
    for (var i = 0; i < upfile.length; i++) {
      update.push(upfile[i]);
    }
    setFiles(update)
  }

  const submit = () => {

    if (resnCn === "") {
      setResnCnError({resnCnError: true, resnCnHelper: "변경사유를 입력하세요."})
      return
    } else {
      setResnCnError({resnCnError: false, resnCnHelper: ""})
    }
    try {
      const form = new FormData();
      if (data) {
        for (let i = 0; i < files.length; i++) {
          form.append("fileList", files[i])
        }

        let afterList: any[] = []
        usptTaskTaxitmWctHistAfterList.forEach(value => {
          afterList = afterList.concat(Object.values(value)[0])
        })

        const info = {
          usptCnvnChangeReq: {
            cnvnChangeReqId: data.usptCnvnChangeReq.cnvnChangeReqId,
            resnCn: resnCn,
            bsnsCnvnId: data.usptCnvnChangeReq.bsnsCnvnId
          },
          usptTaskTaxitmWctHistAfterList: afterList,
          attachFileList: attachmentFileList,
          attachFileDeleteList: deleteAttachFileList,
        }

        form.append("info", new Blob([JSON.stringify(info)], {type: "application/json"}));
        fetchCnvnApplcntPost(form).then(() => {
          navigate('/biz/ContractMgt/AgreementChangeMgt')

        }).catch((e: { response: { data: { message: any; }; }; }) => {
          setOpen(true);
          setError(e.response.data.message)
        })
      }
    } catch (e: any) {
      if (!!e.response && e.response.data) return alert(e.response.data.message);
    }

  }

  const cancel = () => {
    if (resnCn === "") {
      setResnCnError({resnCnError: true, resnCnHelper: "변경사유를 입력하세요."})
      return
    } else {
      setResnCnError({resnCnError: false, resnCnHelper: ""})
    }
    fetchCnvnApplcntCancel({
      cnvnChangeReqId: data.usptCnvnChangeReq.cnvnChangeReqId,
      changeIemDivCd: data.usptCnvnChangeReq.changeIemDivCd
    }).then(() => {
      navigate('/biz/ContractMgt/AgreementChangeMgt')
    })
  }
  const params = {
    cnvnChangeReqId: "",
    bsnsCnvnId: receive?.state?.bsnsCnvnId
  }

  const getRecord = (data: any) => {
    const bsnsYear: any = []

    data.map((item: any) => {
      bsnsYear.push(item.bsnsYear)
    })
    const yearKey = bsnsYear.filter((f: number, i: number) => {
      return bsnsYear.indexOf(f) === i;
    });

    const record: any[] = []
    yearKey.forEach((key: any) => {
      const values = data.filter((f: any) => f.bsnsYear == key)
      record.push({[key.toString()]: values})
    })

    return record
  }

  const getData = () => {
    fetchTaskTaxitmGet(params).then((res: any) => {
      setData(res);
      console.log('res - ' + JSON.stringify(res));

      setUsptTaskTaxitmWctHistBeforeList(getRecord(res.usptTaskTaxitmWctHistBeforeList))
      setUsptTaskTaxitmWctHistAfterList(getRecord(res.usptTaskTaxitmWctHistAfterList))

      setAttachmentFileList(res.attachFileList)
    })
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb/>
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">협약변경 신청</h2>
              <p className={isDetail ? 'nobtm' : ''}>변경신청 내역 작성 후 변경요청을 해주세요.</p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className='content_body'>
          <div className="content">
            <Box className="box_guide">
              <ul>
                <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
              </ul>
            </Box>
            <Box css={styles.table}>
              <h4 className="tbl_title">기본정보</h4>
              <div className="detail_table">
                <dl>
                  <dt>신청상태</dt>
                  <dd>{data?.usptCnvnChangeReq?.cnvnChangeSttusNm}</dd>
                  <dt>신청일</dt>
                  <dd>{data?.usptCnvnChangeReq?.reqDe}</dd>
                </dl>
                <dl>
                  <dt>접수번호</dt>
                  <dd>{data?.usptCnvnChangeReq?.receiptNo}</dd>
                  <dt>과제명</dt>
                  <dd>{data?.usptCnvnChangeReq?.taskNmKo}</dd>
                </dl>
                <dl>
                  <dt>변경유형</dt>
                  <dd>
                    <CustomAgreementButtons
                      row
                      defaultData={data?.usptCnvnChangeReq?.cnvnChangeTypeNm}
                      data={[{code: '승인', codeNm: '승인'}, {code: '통보', codeNm: '통보'}]}
                      onClick={(selected) => {
                        console.log(selected);
                      }}
                    />
                  </dd>
                  <dt>변경항목</dt>
                  <dd>과제정보</dd>
                </dl>
                <dl>
                  <dt className="star">변경사유</dt>
                  <dd>
                    <Box css={styles.inputBox}>
                      <TextField
                        id="outlined-multiline-static"
                        multiline rows={4}
                        name='resnCn'
                        value={resnCn}
                        className="scrollBox"
                        inputProps={{
                          maxLength: 1000,
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const {value} = e.currentTarget;
                          setResnCn(value);
                        }}
                        error={resnCnError.resnCnError}
                        helperText={resnCnError.resnCnHelper}
                      />
                      <span className="count"><em>{resnCn.length}</em>/1000</span>
                    </Box>
                  </dd>
                </dl>
              </div>
            </Box>
            <Box css={styles.table}>
              <Typography variant="h6" component="div">
                변경 전 내용
              </Typography>
              <h4 className="tbl_title mt20">비목별 사업비 구성 <span className='unit'>(단위 : 천원)</span></h4>
              <h4 className="tbl_title mt20">신청예산 <span className='unit'>(단위 : 천원)</span></h4>
              <Box className="detailtab_02">
                <Box className='scrollTab' sx={{mb: '20px'}}>
                  <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto"
                        aria-label="basic tabs example">
                    {
                      usptTaskTaxitmWctHistBeforeList.map((m: any, i: number) => {
                        const key = Object.keys(m)[0]
                        return <Tab label={key + "년"}  {...a11yProps(i)} />
                      })
                    }
                  </Tabs>
                </Box>
              </Box>
              {
                usptTaskTaxitmWctHistBeforeList.map((m: any, i: number) => {
                  const obj = Object.values(m).flatMap(m => m)
                  const pay: any = obj.find((f: any) => f.wctTaxitmNm == '보수')
                  const useWage: any = obj.find((f: any) => f.wctTaxitmNm == '상용임금')
                  const dailyWage: any = obj.find((f: any) => f.wctTaxitmNm == '일용임금')
                  const payTotal = {
                    sportBudget: (pay?.sportBudget || 0) + (useWage?.sportBudget || 0) + (dailyWage?.sportBudget || 0),
                    alotmCash: (pay?.alotmCash || 0) + (useWage?.alotmCash || 0) + (dailyWage?.alotmCash || 0),
                    alotmActhng: (pay?.alotmActhng || 0) + (useWage?.alotmActhng || 0) + (dailyWage?.alotmActhng || 0),
                    alotmSumTot: (pay?.alotmSumTot || 0) + (useWage?.alotmSumTot || 0) + (dailyWage?.alotmSumTot || 0),
                  }
                  const costOperation1: any = obj.find((f: any) => f.wctTaxitmNm == '일반수용비')
                  const costOperation2: any = obj.find((f: any) => f.wctTaxitmNm == '공공요금')
                  const costOperation3: any = obj.find((f: any) => f.wctTaxitmNm == '특근매식비')
                  const costOperation4: any = obj.find((f: any) => f.wctTaxitmNm == '임차료')
                  const costOperation5: any = obj.find((f: any) => f.wctTaxitmNm == '시설장비유지비')
                  const costOperation6: any = obj.find((f: any) => f.wctTaxitmNm == '차량비')
                  const costOperation7: any = obj.find((f: any) => f.wctTaxitmNm == '재료비')
                  const costOperation8: any = obj.find((f: any) => f.wctTaxitmNm == '복리후생비')
                  const costOperation9: any = obj.find((f: any) => f.wctTaxitmNm == '일반용역비')
                  const costOperation10: any = obj.find((f: any) => f.wctTaxitmNm == '관리용역비')
                  const operationTotal = {
                    sportBudget: (costOperation1?.sportBudget || 0) + (costOperation2?.sportBudget || 0) + (costOperation3?.sportBudget || 0)
                      + (costOperation4?.sportBudget || 0) + (costOperation5?.sportBudget || 0) + (costOperation6?.sportBudget || 0)
                      + (costOperation7?.sportBudget || 0) + (costOperation8?.sportBudget || 0) + (costOperation9?.sportBudget || 0)
                      + (costOperation10?.sportBudget || 0),
                    alotmCash: (costOperation1?.alotmCash || 0) + (costOperation2?.alotmCash || 0) + (costOperation3?.alotmCash || 0)
                      + (costOperation4?.alotmCash || 0) + (costOperation5?.alotmCash || 0) + (costOperation6?.alotmCash || 0)
                      + (costOperation7?.alotmCash || 0) + (costOperation8?.alotmCash || 0) + (costOperation9?.alotmCash || 0)
                      + (costOperation10?.alotmCash || 0),
                    alotmActhng: (costOperation1?.alotmActhng || 0) + (costOperation2?.alotmActhng || 0) + (costOperation3?.alotmActhng || 0)
                      + (costOperation4?.alotmActhng || 0) + (costOperation5?.alotmActhng || 0) + (costOperation6?.alotmActhng || 0)
                      + (costOperation7?.alotmActhng || 0) + (costOperation8?.alotmActhng || 0) + (costOperation9?.alotmActhng || 0)
                      + (costOperation10?.alotmActhng || 0),
                    alotmSumTot: (costOperation1?.alotmSumTot || 0) + (costOperation2?.alotmSumTot || 0) + (costOperation3?.alotmSumTot || 0)
                      + (costOperation4?.alotmSumTot || 0) + (costOperation5?.alotmSumTot || 0) + (costOperation6?.alotmSumTot || 0)
                      + (costOperation7?.alotmSumTot || 0) + (costOperation8?.alotmSumTot || 0) + (costOperation9?.alotmSumTot || 0)
                      + (costOperation10?.alotmSumTot || 0),
                  }
                  const total = {
                    sportBudget: (payTotal?.sportBudget || 0) + (operationTotal?.sportBudget || 0),
                    alotmCash: (payTotal?.alotmCash || 0) + (operationTotal?.alotmCash || 0),
                    alotmActhng: (payTotal?.alotmActhng || 0) + (operationTotal?.alotmActhng || 0),
                    alotmSumTot: (payTotal?.alotmSumTot || 0) + (operationTotal?.alotmSumTot || 0)
                  }

                  return <TabPanel value={value} index={i}>
                    <div className="tableDefault_scroll">
                      <table className="tableDefault type6">
                        <colgroup>
                          <col style={{width: '7%'}}/>
                          <col style={{width: '14%'}}/>
                          <col style={{width: '27%'}}/>
                          <col style={{width: '13%'}}/>
                          <col style={{width: '13%'}}/>
                          <col style={{width: '13%'}}/>
                          <col style={{width: '13%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                          <th colSpan={2}>구분</th>
                          <th colSpan={4}>사업비 편성 내용</th>
                          <th rowSpan={3}>합계</th>
                        </tr>
                        <tr>
                          <th rowSpan={2}>비목</th>
                          <th rowSpan={2}>세목</th>
                          <th rowSpan={2}>산출근거</th>
                          <th rowSpan={2}>지원예산</th>
                          <th colSpan={2}>민간부담금</th>
                        </tr>
                        <tr>
                          <th>현금</th>
                          <th>현물</th>
                        </tr>
                        </thead>
                      </table>
                      <div className="table_rowScroll">
                        <table className="tableDefault type7">
                          <colgroup>
                            <col style={{width: '7%'}}/>
                            <col style={{width: '14%'}}/>
                            <col style={{width: '27%'}}/>
                            <col style={{width: '13%'}}/>
                            <col style={{width: '13%'}}/>
                            <col style={{width: '13%'}}/>
                            <col style={{width: '13%'}}/>
                          </colgroup>
                          <tbody>
                          <tr>
                            <td rowSpan={4}>인건비</td>
                            <td className="tal">
                              <Stack style={{alignSelf: 'end'}} flexDirection={'row'} css={styles.tooltip}
                                     className="pb0">
                                {'보수'}
                                <HtmlTooltip
                                  title={
                                    <React.Fragment>
                                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                                      <ul className='tooltip_list'>
                                        <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                                        <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                        <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                        <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                                        <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                                        <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li>
                                      </ul>
                                    </React.Fragment>
                                  }
                                  placement="bottom-start"
                                >
                                  <IconButton>
                                    <QuestionIcon/>
                                  </IconButton>
                                </HtmlTooltip>
                              </Stack>
                            </td>
                            <td className="tal">{pay?.computBasisCn}</td>
                            <td className="tar">{pay?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{pay?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{pay?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{pay?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">{'사용임금'}</td>
                            <td className="tal">{useWage?.computBasisCn.toLocaleString('ko-KR')}</td>
                            <td className="tar">{useWage?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{useWage?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{useWage?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{useWage?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">{'일용임금'}</td>
                            <td className="tal">{dailyWage?.computBasisCn.toLocaleString('ko-KR')}</td>
                            <td className="tar">{dailyWage?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{dailyWage?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{dailyWage?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{dailyWage?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal sum">소계</td>
                            <td>-</td>
                            <td className="tar">{payTotal?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{payTotal?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{payTotal?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{payTotal?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td rowSpan={11}>운영비</td>
                            <td className="tal">일반수용비</td>
                            <td className="tal">{costOperation1?.computBasisCn}</td>
                            <td className="tar">{costOperation1?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation1?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation1?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation1?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">공공요금 및 제세</td>
                            <td className="tal">{costOperation2?.computBasisCn}</td>
                            <td className="tar">{costOperation2?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation2?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation2?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation2?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">특근매식비</td>
                            <td className="tal">{costOperation3?.computBasisCn}</td>
                            <td className="tar">{costOperation3?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation3?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation3?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation3?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">임차료</td>
                            <td className="tal">{costOperation4?.computBasisCn}</td>
                            <td className="tar">{costOperation4?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation4?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation4?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation4?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">시설장비유지비</td>
                            <td className="tal">{costOperation5?.computBasisCn}</td>
                            <td className="tar">{costOperation5?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation5?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation5?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation5?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">차량비</td>
                            <td className="tal">{costOperation6?.computBasisCn}</td>
                            <td className="tar">{costOperation6?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation6?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation6?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation6?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">재료비</td>
                            <td className="tal">{costOperation7?.computBasisCn}</td>
                            <td className="tar">{costOperation7?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation7?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation7?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation7?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">복리후생비</td>
                            <td className="tal">{costOperation8?.computBasisCn}</td>
                            <td className="tar">{costOperation8?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation8?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation8?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation8?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">일반용역비</td>
                            <td className="tal">{costOperation9?.computBasisCn}</td>
                            <td className="tar">{costOperation9?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation9?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation9?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation9?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal">관리용역비</td>
                            <td className="tal">{costOperation10?.computBasisCn}</td>
                            <td className="tar">{costOperation10?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation10?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation10?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{costOperation10?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td className="tal sum">소계</td>
                            <td>-</td>
                            <td className="tar">{operationTotal?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{operationTotal?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{operationTotal?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{operationTotal?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr className="total">
                            <td colSpan={2}>합계</td>
                            <td>-</td>
                            <td className="tar">{total?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{total?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{total?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">{total?.alotmSumTot.toLocaleString('ko-KR')}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPanel>
                })
              }
            </Box>

            <Box css={styles.table}>
              <Typography variant="h6" component="div">
                변경 후 내용
              </Typography>
              <h4 className="tbl_title mt20">신청예산 <span className='unit'>(단위 : 천원)</span></h4>
              <Box className="detailtab_02">
                <Box className='scrollTab' sx={{mb: '20px'}}>
                  <Tabs value={value1} onChange={handleChangeAfter} variant="scrollable" scrollButtons="auto"
                        aria-label="basic tabs example">
                    {
                      usptTaskTaxitmWctHistAfterList.map((m: any, i: number) => {
                        const key = Object.keys(m)[0]
                        return <Tab label={key + "년"}  {...a11yProps(i)} />
                      })
                    }
                  </Tabs>
                </Box>
              </Box>


              {
                usptTaskTaxitmWctHistAfterList.map((m: any, i: number) => {
                  const key = Object.keys(m)[0]
                  const obj = Object.values(m).flatMap(m => m)
                  const pay: any = obj.find((f: any) => f.wctTaxitmNm == '보수')
                  const useWage: any = obj.find((f: any) => f.wctTaxitmNm == '상용임금')
                  const dailyWage: any = obj.find((f: any) => f.wctTaxitmNm == '일용임금')
                  const payTotal = {
                    sportBudget: Number(pay?.sportBudget || 0) + Number(useWage?.sportBudget || 0) + Number(dailyWage?.sportBudget || 0),
                    alotmCash: Number(pay?.alotmCash || 0) + Number(useWage?.alotmCash || 0) + Number(dailyWage?.alotmCash || 0),
                    alotmActhng: Number(pay?.alotmActhng || 0) + Number(useWage?.alotmActhng || 0) + Number(dailyWage?.alotmActhng || 0),
                  }
                  const costOperation1: any = obj.find((f: any) => f.wctTaxitmNm == '일반수용비')
                  const costOperation2: any = obj.find((f: any) => f.wctTaxitmNm == '공공요금 및 제세')
                  const costOperation3: any = obj.find((f: any) => f.wctTaxitmNm == '특근매식비')
                  const costOperation4: any = obj.find((f: any) => f.wctTaxitmNm == '임차료')
                  const costOperation5: any = obj.find((f: any) => f.wctTaxitmNm == '시설장비유지비')
                  const costOperation6: any = obj.find((f: any) => f.wctTaxitmNm == '차량비')
                  const costOperation7: any = obj.find((f: any) => f.wctTaxitmNm == '재료비')
                  const costOperation8: any = obj.find((f: any) => f.wctTaxitmNm == '복리후생비')
                  const costOperation9: any = obj.find((f: any) => f.wctTaxitmNm == '일반용역비')
                  const costOperation10: any = obj.find((f: any) => f.wctTaxitmNm == '관리용역비')
                  const operationTotal = {
                    sportBudget: Number(costOperation1?.sportBudget || 0) + Number(costOperation2?.sportBudget || 0) + Number(costOperation3?.sportBudget || 0)
                      + Number(costOperation4?.sportBudget || 0) + Number(costOperation5?.sportBudget || 0) + Number(costOperation6?.sportBudget || 0)
                      + Number(costOperation7?.sportBudget || 0) + Number(costOperation8?.sportBudget || 0) + Number(costOperation9?.sportBudget || 0)
                      + Number(costOperation10?.sportBudget || 0),
                    alotmCash: Number(costOperation1?.alotmCash || 0) + Number(costOperation2?.alotmCash || 0) + Number(costOperation3?.alotmCash || 0)
                      + Number(costOperation4?.alotmCash || 0) + Number(costOperation5?.alotmCash || 0) + Number(costOperation6?.alotmCash || 0)
                      + Number(costOperation7?.alotmCash || 0) + Number(costOperation8?.alotmCash || 0) + Number(costOperation9?.alotmCash || 0)
                      + Number(costOperation10?.alotmCash || 0),
                    alotmActhng: Number(costOperation1?.alotmActhng || 0) + Number(costOperation2?.alotmActhng || 0) + Number(costOperation3?.alotmActhng || 0)
                      + Number(costOperation4?.alotmActhng || 0) + Number(costOperation5?.alotmActhng || 0) + Number(costOperation6?.alotmActhng || 0)
                      + Number(costOperation7?.alotmActhng || 0) + Number(costOperation8?.alotmActhng || 0) + Number(costOperation9?.alotmActhng || 0)
                      + Number(costOperation10?.alotmActhng || 0),
                  }
                  const total = {
                    sportBudget: Number(payTotal?.sportBudget || 0) + Number(operationTotal?.sportBudget || 0),
                    alotmCash: Number(payTotal?.alotmCash || 0) + Number(operationTotal?.alotmCash || 0),
                    alotmActhng: Number(payTotal?.alotmActhng || 0) + Number(operationTotal?.alotmActhng || 0),
                    // alotmSumTot: (payTotal?.alotmSumTot || 0) + (operationTotal?.alotmSumTot || 0)
                  }

                  return <TabPanel value={value1} index={i}>
                    <div className="tableDefault_scroll">
                      <table className="tableDefault type6">
                        <colgroup>
                          <col style={{width: '7%'}}/>
                          <col style={{width: '14%'}}/>
                          <col style={{width: '27%'}}/>
                          <col style={{width: '13%'}}/>
                          <col style={{width: '13%'}}/>
                          <col style={{width: '13%'}}/>
                          <col style={{width: '13%'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                          <th colSpan={2} className="noline_left">구분</th>
                          <th colSpan={4}>사업비 편성 내용</th>
                          <th rowSpan={3}>합계</th>
                        </tr>
                        <tr>
                          <th rowSpan={2}>비목</th>
                          <th rowSpan={2}>세목</th>
                          <th rowSpan={2}>산출근거</th>
                          <th rowSpan={2}>지원예산</th>
                          <th colSpan={2}>민간부담금</th>
                        </tr>
                        <tr>
                          <th>현금</th>
                          <th>현물</th>
                        </tr>
                        </thead>
                      </table>
                      <div className="table_rowScroll">
                        <table className="tableDefault type7 newType">
                          <colgroup>
                            <col style={{width: '7%'}}/>
                            <col style={{width: '14%'}}/>
                            <col style={{width: '27%'}}/>
                            <col style={{width: '13%'}}/>
                            <col style={{width: '13%'}}/>
                            <col style={{width: '13%'}}/>
                            <col style={{width: '13%'}}/>
                          </colgroup>
                          <tbody>
                          <tr>
                            <td rowSpan={4}>인건비</td>
                            <td className="tal">
                              <Stack style={{alignSelf: 'end'}} flexDirection={'row'} css={styles.tooltip}
                                     className="pb0">
                                보수
                                <HtmlTooltip
                                  title={
                                    <React.Fragment>
                                      {/* <Typography color="inherit">신청상태 안내</Typography> */}
                                      <ul className='tooltip_list'>
                                        <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                                        <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                        <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                        <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                                        <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                                        <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li>
                                      </ul>
                                    </React.Fragment>
                                  }
                                  placement="bottom-start"
                                >
                                  <IconButton>
                                    <QuestionIcon/>
                                  </IconButton>
                                </HtmlTooltip>
                              </Stack>
                            </td>
                            <td>
                              <OutlinedInput
                                value={pay?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, pay, '보수', '인건비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={pay?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, pay, '보수', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={pay?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, pay, '보수', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={pay?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, pay, '보수', '인건비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(pay?.sportBudget) + Number(pay?.alotmCash) + Number(pay?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">상용임금</td>
                            <td>
                              <OutlinedInput
                                value={useWage?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, useWage, '상용임금', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={useWage?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, useWage, '상용임금', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={useWage?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, useWage, '상용임금', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={useWage?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, useWage, '상용임금', '인건비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(useWage?.sportBudget) + Number(useWage?.alotmCash) + Number(useWage?.alotmActhng)).toLocaleString('ko-KR') || 0}

                            </td>
                          </tr>
                          <tr>
                            <td className="tal">일용임금</td>
                            <td>
                              <OutlinedInput
                                value={dailyWage?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, dailyWage, '일용임금', '인건비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={dailyWage?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, dailyWage, '일용임금', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={dailyWage?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, dailyWage, '일용임금', '인건비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={dailyWage?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, dailyWage, '일용임금', '인건비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(dailyWage?.sportBudget) + Number(dailyWage?.alotmCash) + Number(dailyWage?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal sum">소계</td>
                            <td>-</td>
                            <td className="tar">{payTotal?.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{payTotal?.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{payTotal?.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td
                              className="tar">{(payTotal?.sportBudget + payTotal?.alotmCash + payTotal?.alotmActhng).toLocaleString('ko-KR')}</td>
                          </tr>
                          <tr>
                            <td rowSpan={11}>운영비</td>
                            <td className="tal">일반수용비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation1?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation1, '일반수용비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation1?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation1, '일반수용비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation1?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation1, '일반수용비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation1?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation1, '일반수용비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation1?.sportBudget) + Number(costOperation1?.alotmCash) + Number(costOperation1?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">공공요금 및 제세</td>
                            <td>
                              <OutlinedInput
                                value={costOperation2?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation2, '공공요금 및 제세', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation2?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation2, '공공요금 및 제세', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation2?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation2, '공공요금 및 제세', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation2?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation2, '공공요금 및 제세', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation2?.sportBudget) + Number(costOperation2?.alotmCash) + Number(costOperation2?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">특근매식비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation3?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation3, '특근매식비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation3?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation3, '특근매식비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation3?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation3, '특근매식비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation3?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation3, '특근매식비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation3?.sportBudget) + Number(costOperation3?.alotmCash) + Number(costOperation3?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">임차료</td>
                            <td>
                              <OutlinedInput
                                value={costOperation4?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation4, '임차료', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation4?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation4, '임차료', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation4?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation4, '임차료', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation4?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation4, '임차료', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation4?.sportBudget) + Number(costOperation4?.alotmCash) + Number(costOperation4?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">시설장비유지비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation5?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation5, '시설장비유지비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation5?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation5, '시설장비유지비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation5?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation5, '시설장비유지비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation5?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation5, '시설장비유지비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation5?.sportBudget) + Number(costOperation5?.alotmCash) + Number(costOperation5?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">차량비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation6?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation6, '차량비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation6?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation6, '차량비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation6?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation6, '차량비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation6?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation6, '차량비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation6?.sportBudget) + Number(costOperation6?.alotmCash) + Number(costOperation6?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">재료비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation7?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation7, '재료비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation7?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation7, '재료비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation7?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation7, '재료비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation7?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation7, '재료비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation7?.sportBudget) + Number(costOperation7?.alotmCash) + Number(costOperation7?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">복리후생비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation8?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation8, '복리후생비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation8?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation8, '복리후생비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation8?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation8, '복리후생비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation8?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation8, '복리후생비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation8?.sportBudget) + Number(costOperation8?.alotmCash) + Number(costOperation8?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">일반용역비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation9?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation9, '일반용역비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation9?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation9, '일반용역비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation9?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation9, '일반용역비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation9?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation9, '일반용역비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation9?.sportBudget) + Number(costOperation9?.alotmCash) + Number(costOperation9?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal">관리용역비</td>
                            <td>
                              <OutlinedInput
                                value={costOperation10?.computBasisCn || ''}
                                name={'computBasisCn'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation10, '관리용역비', '운영비')
                                }}
                              />
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation10?.sportBudget || 0}
                                name={'sportBudget'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation10, '관리용역비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation10?.alotmCash || 0}
                                name={'alotmCash'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation10, '관리용역비', '운영비')
                                }}/>
                            </td>
                            <td>
                              <OutlinedInput
                                value={costOperation10?.alotmActhng || 0}
                                name={'alotmActhng'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handlerAfterList(e, m, costOperation10, '관리용역비', '운영비')
                                }}/>
                            </td>
                            <td className="tar">
                              {(Number(costOperation10?.sportBudget) + Number(costOperation10?.alotmCash) + Number(costOperation10?.alotmActhng)).toLocaleString('ko-KR') || 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="tal sum">소계</td>
                            <td>-</td>
                            <td className="tar">{operationTotal.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{operationTotal.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{operationTotal.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">
                              {(operationTotal.sportBudget + operationTotal.alotmCash + operationTotal.alotmActhng).toLocaleString('ko-KR')}
                            </td>
                          </tr>
                          <tr className="total">
                            <td colSpan={2}>합계</td>
                            <td>-</td>
                            <td className="tar">{total.sportBudget.toLocaleString('ko-KR')}</td>
                            <td className="tar">{total.alotmCash.toLocaleString('ko-KR')}</td>
                            <td className="tar">{total.alotmActhng.toLocaleString('ko-KR')}</td>
                            <td className="tar">
                              {(total.sportBudget + total.alotmCash + total.alotmActhng).toLocaleString('ko-KR')}
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPanel>
                })
              }
            </Box>
            <Box css={styles.table}>
              <h4 className="tbl_title">증빙파일첨부</h4>
            </Box>
            <Box css={styles.fileupload}>
              <FileUpload1
                files={files}
                handleDelete={handleDelete}
                handleUpload={handleUpload}
                files1={attachmentFileList}
                handleDelete2={deleteAttach1}
              />
            </Box>
            {data?.usptCnvnChangeReq?.cnvnChangeSttusNm === "신청" ?
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'신청 취소'} type={'listBack'} color={'primary'} onClick={cancel}/>
              </Stack>
              : null}
            {data?.usptCnvnChangeReq?.cnvnChangeSttusNm !== "신청" && data?.usptCnvnChangeReq?.cnvnChangeSttusNm !== "승인" && data?.usptCnvnChangeReq?.cnvnChangeSttusNm !== "반려" ?
              <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                <CustomButton label={'신청'} type={'listBack'} color={'primary'} onClick={submit}/>
              </Stack>
              : null}
          </div>
        </div>
      </Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;
  return (
    <div
      role="tabpanel"
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

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default AgreementChangeMgtApp04;


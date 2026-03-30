import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {
  FormControl,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, TextField
} from "@mui/material";
import {HorizontalInterval, LoadingProgress, SubContents} from "shared/components/LayoutComponents";
import {
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell
} from "shared/components/TableComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import React from "react";
import {ModalComponents} from "shared/components/ModalComponents";
import {Color} from "shared/components/StyleUtils";
import {PeriodExtendService} from "~/service/UseMgt/PeriodExtend/PeriodExtendService";
import {EqpmnEstmtDetailData, EqpmnExtndDetail, PaymentState, StatusState} from "~/service/Model";
import {dayFormat, phoneNumberFormat, toTimeFormat} from "shared/utils/stringUtils";
import {EstimationService} from "~/service/UseMgt/Estimation/EstimationService";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const UseEquipmentPeriodExtendInfo = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST"])
  const [completeOpen, setcompleteOpen] = useState(false)
  const [carryOpen, setcarryOpen] = useState(false)
  const {addModal} = useGlobalModalStore()
  const information = PeriodExtendService.getExtndDetailInfo(id!.toString())
  const [state, setState] = useState<EqpmnExtndDetail>()
  const [dscntId, setDscntId] = useState<string | any>('');
  const [depositOpen, setDepositOpen] = useState(false)

  useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        setState(information.data);
      }
    }
  }, [information.data, information.isLoading, information.isFetching])

  useEffect(() => {
    if (state != null && state.dscntId) {
      const findIndex = state.detailDscntParam.findIndex(({dscntId}) => dscntId === state.dscntId);
      const updateDscnt = {
        ...state,
        dscntResn: state.detailDscntParam[findIndex].dscntResn,
        dscntRate: state.detailDscntParam[findIndex].dscntRate
      };
      setState(updateDscnt)
    }
  }, [dscntId])

  if (information.isLoading || !state) return <LoadingProgress/>

  return <Stack spacing={"40px"}>
    <SubContents title={"신청정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"접수번호"} label={state.rceptNo}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"신청일시"} label={dayFormat(state.creatDt)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"신청상태"} label={toCommtCodeName(commtCode, 'EQPMN_REQST_ST', state.reqstSttus)}
                thWidth={"13%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={"입금안내 발송일"} label={dayFormat(state.rcpmnyGdccDt) || '0'}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"납부상태"} label={<Span onClick={() => {
                addModal({open: true, content: state?.npyResn ? state.npyResn : '미납사유', isDist: true, type: 'normal'})
              }
              }>{state.npyResn ? '미납사유확인' : ''}</Span>}
                thWidth={"13%"} tdWidth={"21%"}
                // onClick={async () => {
                //         // const result = await EquipmentInformationService.putEquipmentMgtInfo(id!, req!)
                //         // if (result.success) {
                //         addModal({
                //             open: true,
                //             content: "확인 완료."
                //          })
                //      }}
              />
              <TableTextCell
                title={"신청내역"} label={<Span onClick={() => {
                navigate('/tsp_admin/UseMgt/EquipmentMgt/ApplyMgt/' + state?.reqstId)
              }
              }>신청내역 상세보기</Span>}
                thWidth={"13%"}
                onClick={() => {
                  //navigate('/UseMgt/EquipmentMgt/UseMgt/' + );
                }}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={"신청자정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"구분"} label={state.mberDiv}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"사업자명/이름"} label={state.userNm}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"직위"} label={state.ofcps}
                thWidth={"13%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"연락처"} label={phoneNumberFormat(state.cttpc)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"이메일"} label={state.email}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell title={"AI 집적단지 사업참여 여부"} label={state.partcptnAt === 't' ? '참여' : '미참여'} thWidth={"13%"}/>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"기간연장정보"}
      rightContent={
        <CustomButton
          label={"사용금액 재설정"} type={"small"} color={"list"}
          onClick={() => {
            setState({
              ...state,
              dscntId: dscntId,
              rntfee: (state.rntfeeHour * state.usgtm) - ((state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100),
              usgtm: state.usgtm
            })
            addModal({open: true, isDist: true, content: '재설정되었습니다.'})
          }}/>
      }>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"기존 사용기간"}
                label={`${toTimeFormat(state.oldUseBeginDt)} ~ ${toTimeFormat(state.oldUseEndDt)}`}
                thWidth={"13%"}/>
              <TableTextCell
                division title={"연장 신청기간"} label={`${toTimeFormat(state.useBeginDt)} ~ ${toTimeFormat(state.useEndDt)}`}
                thWidth={"13%"}/>
              <TableTextDoubleFieldCell
                hourlabel={"사용시간"} defaultLabel={`${state.usgtm || 0}`}
                minitelabel={"사용시간"} seconddefaultLabel={"0"}
                firstText={"시간"} secondText={"분"}
                thWidth={"13%"} tdWidth={"21%"}
                onChange={text => {
                  const updateUsgtm = {...state, usgtm: Number(text)};
                  setState(updateUsgtm);
                }
                }
              />
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={"1시간 사용료"} label={`${state.rntfeeHour || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                division title={"사용금액"} label={`${state.rntfeeHour * state.usgtm || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                title={"지불방법"} label={state.pymntMth}
                thWidth={"13%"} tdWidth={"21"}/>
            </TableRow>
            <TableRow>
              <TableSelectCell
                label={"할인사유"} selectLabel={state.detailDscntParam.map(m => {
                return m.dscntResn
              })}
                defaultLabel={state.dscntResn}
                thWidth={"13%"} tdSpan={5}
                onClick={(selectValue) => {
                  const findIndex = state?.detailDscntParam.findIndex(({dscntResn}) => dscntResn === selectValue);
                  const updateDscntRate = {...state, dscntRate: state?.detailDscntParam[findIndex].dscntRate};
                  setState(updateDscntRate)
                  setDscntId(state?.detailDscntParam[findIndex].dscntId)
                }}
              />
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"할인금액"}
                label={`${(state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100 || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                title={"할인적용금액"}
                label={`${(state.rntfeeHour * state.usgtm) - ((state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100) || 0}원`}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate('/tsp_admin/UseMgt/EquipmentMgt/PeriodExtendMgt');
        }}
      />
      <Stack flexDirection={"row"}>
        {
          (state.reqstSttus === StatusState.SPM_REQUEST || state.reqstSttus === StatusState.APPLY) && <>
                <CustomButton
                    label={"보완"}
                    type={"largeList"}
                    onClick={() => {
                      setcompleteOpen(!completeOpen)
                      window.scrollTo(0, 0)
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"반려"}
                    type={"largeList"}
                    onClick={async () => {
                      await PeriodExtendService.putExtndDetailProcess(id!.toString(), {reqstSttus: StatusState.REJECT})
                      setState({...state, reqstSttus: StatusState.REJECT})
                      addModal({open: true, isDist: true, content: '반려되었습니다.'})
                      navigate(-1)
                    }}
                />
                <HorizontalInterval size={"10px"}/>

                <CustomButton
                    label={"승인"}
                    onClick={async () => {
                      const result = await PeriodExtendService.putExtndDetailProcess(id!.toString(), {
                        ...state,
                        dscntId: dscntId,
                        reqstSttus: StatusState.APPROVE
                      })
                      setState({...state, reqstSttus: StatusState.APPROVE})
                      if (result.success) {
                        addModal({
                          open: true,
                          isDist: true,
                          content: "저장되었습니다."
                        })
                      }
                    }}
                /></>}
        {
          (state.reqstSttus === StatusState.APPROVE) && <>
            {state.pymntMth === PaymentState.PRE_PAYMENT && <>
                <CustomButton
                    label={"미납처리"}
                    type={"largeList"}
                    onClick={() => {
                      setcompleteOpen(!completeOpen)
                    }}
                />

                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"입금안내"}
                    type={"largeList"}
                    onClick={() => {
                      setDepositOpen(!depositOpen)
                    }}
                />
                <HorizontalInterval size={"10px"}/>

              {
                state.useBeginDt < new Date().getTime() &&
                <CustomButton
                    label={"신청취소"}
                    onClick={async () => {
                      await PeriodExtendService.putExtndDetailProcess(id!.toString(), {reqstSttus: StatusState.CANCEL})
                      addModal({open: true, isDist: true, content: '신청취소 되었습니다.'})
                      navigate(-1)
                    }}
                />
              }
            </>}
            </>}
      </Stack>
    </Stack>

    <ComplementModal open={completeOpen} setOpen={setcompleteOpen} state={state} setState={setState} dscntId={dscntId}/>
    <DepositModal open={depositOpen} setOpen={setDepositOpen} isDist={false}/>
    {/*<CarryModal open={carryOpen} setOpen={setcarryOpen}/>*/}
  </Stack>
}

export const TableTextDoubleFieldCell: React.FC<{
  hourlabel: string
  minitelabel: string
  defaultLabel?: string
  seconddefaultLabel?: string
  firstText?: string
  secondText?: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  multiline?: boolean
  onChange?: (text: string) => void
}> = props => {
  const [value, setValue] = useState(props.defaultLabel)
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])
  const [secondvalue, setsecondValue] = useState(props.seconddefaultLabel)
  useLayoutEffect(() => {
    if (!!props.seconddefaultLabel) {
      setsecondValue(props.seconddefaultLabel)
    }
  }, [props.seconddefaultLabel])
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.hourlabel}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined, padding: "15px"}}
    >
      <Stack flexDirection={"row"} alignItems={"center"}>
        <FormControl>
          <TextField
            value={value}
            variant={"outlined"}
            size={"small"}
            type={"number"}
            multiline={props.multiline}
            onChange={(e) => {
              if (props.onChange) props.onChange(e.target.value)
              setValue(e.target.value)
            }}/>
        </FormControl>
        {props.firstText && <span style={{paddingLeft: "10px", whiteSpace: "nowrap"}}>{props.firstText}</span>}
        {/*<FormControl>
          <TextField style={{marginLeft: "10px"}}
                     value={secondvalue}
                     variant={"outlined"}
                     size={"small"}
                     type={"number"}
                     multiline={props.multiline}
                     onChange={(w) => {
                       if (props.onChange) props.onChange(w.target.value)
                       setsecondValue(w.target.value)
                     }}/>
        </FormControl>
        {props.secondText && <span style={{paddingLeft: "10px", whiteSpace: "nowrap"}}>{props.secondText}</span>}*/}
      </Stack>
    </TableBodyCell>
  </>
}


const ComplementModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  state: EqpmnExtndDetail
  setState: Dispatch<SetStateAction<any>>
  dscntId: string | any
}> = props => {
  const {id} = useParams()
  const [details, setDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={props.open}
    type={"save"} title={"보완요청"}
    onConfirm={async () => {
      await PeriodExtendService.putExtndDetailProcess(id!.toString(), {
        rsndqf: details,
        reqstSttus: StatusState.SPM_REQUEST,
        dscntId: props.dscntId
      })
      props.setState({...props.state, reqstSttus: StatusState.SPM_REQUEST})
      addModal({open: true, isDist: true, content: '보완요청 되었습니다.'})
      // const endCheck = await EquipmentInformationService.putEquipmentsEndCheck(id!, correctData)
      // mgtInfoData.setModalOpen("checkFinish",false);
      // mgtInfoData.setMgtInfoData({
      //   ...mgtInfoData.mgtInfoData!,
      //   available: endCheck.eqpmntStateInfo!.available,
      //   eqpmnSt: endCheck.eqpmntStateInfo!.eqpmnSt,
      //   inspectSt: "0",
      //   checkParam: null
      // })
      props.setOpen(false)
      window.scrollTo(0, 0)
    }}
    onClose={() => {
      // mgtInfoData.setModalOpen("checkFinish",false);
      props.setOpen(false)
    }}>
    <TableContainer style={{borderTop: "1px solid #d7dae6", width: "650px"}}>
      <Table>
        <TableBody>
          <TableRowTextField>
            <TableTextFieldCell
              label={"사유"} multiline defaultLabel={details}
              onChange={(text: string) => {
                setDetails(text)
              }}/>
          </TableRowTextField>
        </TableBody>
      </Table>
    </TableContainer>
  </ModalComponents>
}


const DepositModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDist: boolean

}> = props => {
  const {id} = useParams()
  const [details, setDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={props.open}
    isDist={props.isDist}
    type={"transmit"} title={"입금안내"}
    onConfirm={async () => {
      await PeriodExtendService.putExtndDetailProcess(id!.toString(), {
        rcpmnyGdcc: details,
        reqstSttus: StatusState.APPROVE
      })
      //await EquipmentService.putUseRcpmnyGdcc({reqstId: id!.toString(), rcpmnyGdcc: details})
      addModal({open: true, isDist: true, content: '입금안내문이 발송되었습니다.'})
      // alert('입금안내문이 발송되었습니다.')
      // const endCheck = await EquipmentInformationService.putEquipmentsEndCheck(id!, correctData)
      // mgtInfoData.setModalOpen("checkFinish",false);
      // mgtInfoData.setMgtInfoData({
      //   ...mgtInfoData.mgtInfoData!,
      //   available: endCheck.eqpmntStateInfo!.available,
      //   eqpmnSt: endCheck.eqpmntStateInfo!.eqpmnSt,
      //   inspectSt: "0",
      //   checkParam: null
      // })
      props.setOpen(false)
      window.scrollTo(0, 0)
    }}
    onClose={() => {
      // mgtInfoData.setModalOpen("checkFinish",false);
      props.setOpen(false)
    }}>
    <TableContainer style={{borderTop: "1px solid #d7dae6", width: "650px"}}>
      <Table>
        <TableBody>
          <TableRowTextField>
            <TableTextFieldCell
              label={"내용"} multiline defaultLabel={details}
              onChange={(text: string) => {
                setDetails(text)
              }}/>
          </TableRowTextField>
        </TableBody>
      </Table>
    </TableContainer>
  </ModalComponents>
}


const TableRowTextField = styled(TableRow)`
  .MuiInputBase-root {
    height: 150px;
    align-items: baseline;
  }

  .MuiTableCell-root {
    padding-top: 15px;
    padding-bottom: 15px;
  }
`
const TableHeaderCell = styled(TableCell)`
  height: 56px;
  color: #222;
  font-weight: 600;
`
const TableBodyCell = styled(TableCell)`
  padding: 0 10px;
  align-items: center;
  align-content: center;
  color: ${Color.brownishGrey}
`

//
// const Fontwordbreak = styled(TableCell)`
//     word-break: break-all;
//     padding: 0 10px;
//     align-items: center;
//     align-content: center;
// `

const Span = styled('span')`
  &:hover {
    cursor: pointer
  }
;
  color: #4063ec;
  border-bottom: 1px solid #4063ec;
`
/*const CarryModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}> = props => {
  const [details, setDetails] = useState("")

  return <ModalComponents
    open={props.open}
    type={"save"} title={"반출신청"}
    onConfirm={async () => {
      // const endCheck = await EquipmentInformationService.putEquipmentsEndCheck(id!, correctData)
      // mgtInfoData.setModalOpen("checkFinish",false);
      // mgtInfoData.setMgtInfoData({
      //   ...mgtInfoData.mgtInfoData!,
      //   available: endCheck.eqpmntStateInfo!.available,
      //   eqpmnSt: endCheck.eqpmntStateInfo!.eqpmnSt,
      //   inspectSt: "0",
      //   checkParam: null
      // })
      props.setOpen(false)
      window.scrollTo(0, 0)
    }}
    onClose={() => {
      // mgtInfoData.setModalOpen("checkFinish",false);
      props.setOpen(false)
    }}>
    <TableContainer style={{borderTop: "1px solid #d7dae6", width: "650px"}}>
      <Table>
        <TableBody>
          <TableRowTextField>
            <TableTextFieldCell
              label={"사유"} multiline defaultLabel={details}
              onChange={(text: string) => {
                setDetails(text)
              }}/>
          </TableRowTextField>
        </TableBody>
      </Table>
    </TableContainer>
  </ModalComponents>
}*/

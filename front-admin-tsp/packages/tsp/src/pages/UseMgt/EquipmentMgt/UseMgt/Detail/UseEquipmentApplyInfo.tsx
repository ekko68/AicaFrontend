import react, {Dispatch, Fragment, SetStateAction, useEffect, useLayoutEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {
  Button,
  Modal,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  HorizontalInterval,
  LoadingProgress,
  SubAttachFileContents,
  SubContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {TableComponents, TableSelectCell, TableTextCell, TableTextFieldCell} from "shared/components/TableComponents";
import {CustomButton, CustomLoadingButton} from "shared/components/ButtonComponents";
import React from "react";
import {ModalComponents} from "shared/components/ModalComponents";
import {Color} from "shared/components/StyleUtils";
import Box from "@mui/material/Box";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {EqpmnUseDetail, PaymentState, StatusState} from "~/service/Model";
import {dayFormat, phoneNumberFormat, toTimeFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const UseEquipmentApplyInfo: React.FC<{
  setState: Dispatch<SetStateAction<EqpmnUseDetail | undefined>>
}> = props => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {commtCode} = useCommtCode(["EQPMN_USAGE_ST", 'EQPMN_PAYMENT', 'MEMBER_TYPE'])
  const [defaultOpen, setdefaultOpen] = useState(false)
  const [depositOpen, setdepositOpen] = useState(false)
  const [addOpen, setaddOpen] = useState(false)
  const [modalType, setmodalType] = useState(false)
  const {addModal} = useGlobalModalStore()
  const information = EquipmentService.getEquipUseDetail(id!.toString())
  const [state, setState] = useState<EqpmnUseDetail>();
  const [state2, setState2] = useState<EqpmnUseDetail>();
  const [dscntId, setDscntId] = useState<string | any>('');
  const [usgtm, setUsgtm] = useState(0);

  useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        setState(information.data);
        setState2(information.data)
      }
    }
  }, [information.data, information.isLoading, information.isFetching])

  console.log(state?.useSttus)

  useEffect(() => {
    props.setState(state)
  }, [state, state2])

  useEffect(() => {
    if (state != null && state.dscntId) {
      const findIndex = state.dscntList.findIndex(({dscntId}) => dscntId === state.dscntId);
      const updateDscnt = {
        ...state,
        dscntResn: state.dscntList[findIndex].dscntResn,
        dscntRate: state.dscntList[findIndex].dscntRate,
      };
      setState(updateDscnt)
    }
  }, [dscntId])

  if (information.isLoading || !state || !state2) return <LoadingProgress/>

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
                title={"사용상태"} label={toCommtCodeName(commtCode, 'EQPMN_USAGE_ST', state.useSttus)}
                thWidth={"13%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={"입금안내 발송일"} label={dayFormat(state.rcpmnyGdccDt || Date.now())}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"미납상태"} label={state.npyResn ? '미납' : '납부완료'}
                thWidth={"13%"} tdSpan={5}
                // onClick={async () => {
                //         // const result = await EquipmentInformationService.putEquipmentMgtInfo(id!, req!)
                //         // if (result.success) {
                //         addModal({
                //             open: true,
                //             content: "확인 완료."
                //          })
                //      }}
              />
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
                division title={"구분"} label={toCommtCodeName(commtCode, 'MEMBER_TYPE', state.mberDiv)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"사업자명/이름"} label={state.entrprsNm}
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

              <TableTextCell title={"AI 집적단지 사업참여 여부"} label={state.partcptnAt ? '참여' : "참여안함"} thWidth={"13%"}/>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={"신청장비"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"장비명(국문)"} label={state.eqpmnNmKorean}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"장비명(영문)"} label={state.eqpmnNmEngl}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"모델명"} label={state.modelNm}
                thWidth={"13%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"자산번호"} label={state.assetsNo}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={"활용목적"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                title={"활용목적"}
                label={state.useprps}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>


    <SubContents title={"반출신청"}>

      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"반출여부"} label={state.tkoutAt ? '반출' : '미반출'}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={"반출지 주소"} label={state.tkoutAdres}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"사유(용도)"}
                label={state.tkoutResn}
                thWidth={"13%"} tdSpan={5}/>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={"사용기간"}>

      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"시작일"} label={toTimeFormat(state.useBeginDt)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"종료일"} label={toTimeFormat(state.useEndDt)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"사용시간"} label={`${state.expectUsgtm || 0}시간`}
                thWidth={"13%"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"사용금액"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"1시간 사용료"}
                label={`${state.rntfeeHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                thWidth={"13%"}/>
              <TableTextCell
                division title={"1일 가용시간"} label={`${state.usefulHour || 0}시간`}
                thWidth={"13%"}/>
              <TableTextCell
                title={"예상 사용금액"}
                label={''}//`${state.expectRntfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                thWidth={"13%"}/>

            </TableRow>
            <TableRow>
              <TableTextCell title={'할인사유'} label={state.dscntResn || '할인사유'} tdSpan={5}/>
              {/*<TableSelectCell
                disable label={"할인사유"} selectLabel={state.dscntList.map((m, i) => {
                return m.dscntResn
              })} defaultLabel={state.dscntResn}

                onClick={(selectValue) => {
                  const findIndex = state?.dscntList.findIndex(({dscntResn}) => dscntResn === selectValue);
                  const updateDscntRate = {...state, dscntRate: state?.dscntList[findIndex].dscntRate};
                  setState(updateDscntRate)
                  setDscntId(state?.dscntList[findIndex].dscntId)
                }}
                thWidth={"13%"} tdSpan={5}/>*/}
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"지불방법"} label={toCommtCodeName(commtCode, 'EQPMN_PAYMENT', state.pymntMth)}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                division title={"할인금액"}
                label={`${Math.floor(((state.rntfeeHour * state.expectRntfee) * Number(state.dscntRate) / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                title={"할인적용금액"}
                label={`${Math.floor(((state.rntfeeHour * state.expectRntfee) - ((state.rntfeeHour * state.expectRntfee) * Number(state.dscntRate) / 100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    {
      state.pymntMth === PaymentState.AFTER_PAYMENT && <>
            <SubContents
                title={"실 사용금액"}
                rightContent={
                  <CustomLoadingButton
                    label={"사용금액 재설정"} type={"small"} color={"list"}
                    onClick={async () => {
                      await EquipmentService.putUseDscnt({
                        ...state2,
                        dscntId: dscntId,
                        reqstId: id!.toString(),
                        usgtm: usgtm
                      })
                      setState2({
                        ...state2,
                        dscntId: dscntId,
                        rntfee: (state.rntfeeHour * usgtm) - ((state.rntfeeHour * usgtm) * Number(state2.dscntRate) / 100),
                        usgtm: usgtm,
                        expectRntfee: state?.rntfeeHour * usgtm,
                      })
                      props.setState(state2)
                      addModal({open: true, isDist: true, content: '재설정되었습니다.'})
                    }}/>
                }>
                <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableTextCell
                                    division title={"시작일"} label={toTimeFormat(state.useBeginDt)}
                                    thWidth={"13%"} tdWidth={"21%"}/>

                                <TableTextCell
                                    title={"종료일"} label={toTimeFormat(state.useEndDt)}
                                    thWidth={"13%"} tdWidth={"21%"}/>
                            </TableRow>

                            <TableRow>
                                <TableTextFieldCell
                                    division label={'실 사용시간'}//"1시간 사용료"}
                                    defaultLabel={`${state2.usgtm || 0}`}
                                    additionDirection={'row'}
                                    additionContent={<Fragment>
                                      <HorizontalInterval size={'15px'}/>
                                      <Box width={'50px'}>{'시간'}</Box>
                                    </Fragment>}
                                    thWidth={"13%"} tdWidth={"21%"}
                                    onChange={(text: string) => {
                                      setUsgtm(Number(text))
                                    }}
                                />
                                <TableTextCell
                                    title={"사용금액"}
                                    label={`${(state.rntfeeHour * usgtm).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                                    thWidth={"13%"} tdSpan={5}/>
                            </TableRow>
                            <TableRow>
                                <TableSelectCell
                                    label={"할인사유"} selectLabel={state2.dscntList.map((m, i) => {
                                  return `${m.dscntResn} (${m.dscntRate}%)`
                                })} defaultLabel={`${state.dscntResn} (${state.dscntRate}%)`}
                                    onClick={(selectValue) => {
                                      const findIndex = state2?.dscntList.findIndex(({dscntResn}) => selectValue.includes(dscntResn));
                                      const updateDscnt = {
                                        ...state2,
                                        dscntRate: state2?.dscntList[findIndex].dscntRate,
                                        dscntResn: state2?.dscntList[findIndex].dscntResn,
                                      };
                                      setState2(updateDscnt)
                                      setDscntId(state2?.dscntList[findIndex].dscntId)
                                    }}
                                    thWidth={"13%"} tdSpan={5}/>
                            </TableRow>

                            <TableRow>
                                <TableTextCell
                                    division title={"할인금액"}
                                    label={`${Math.floor((state.rntfeeHour * usgtm) * Number(state2.dscntRate) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                                    thWidth={"13%"} tdWidth={"21"}/>
                                <TableTextCell
                                    title={"할인적용금액"}
                                    label={`${Math.floor((state.rntfeeHour * usgtm) - ((state.rntfeeHour * usgtm) * Number(state2.dscntRate) / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                                    thWidth={"13%"} tdSpan={5}/>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </SubContents>
        </>
    }

    <SubContents
      title={"추가금액"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                title={"추가금액"} label={`${state.aditRntfee || 0}원`}
                thWidth={"20%"} tdSpan={5}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                title={"청구사유"}
                label={state.rqestResn || '사유가 출력됩니다.'}
                thWidth={"20%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>


    <SubAttachFileContents atchmnflGroupId={state.atchmnflGroupId} atchmnfl={[]} onDownload={() => {
    }} onAllDownload={() => {
    }}/>

    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1);
        }}
      />
      <Stack flexDirection={"row"}>
        {
          state.useSttus === StatusState.END_USE && <>
                <CustomButton
                    label={"미납처리"}
                    type={"largeList"}
                    onClick={() => {
                      setdefaultOpen(!defaultOpen)
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"입금안내"}
                    type={"largeList"}
                    onClick={() => {
                      setdepositOpen(!depositOpen)
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"추가금액 등록"}
                    onClick={async () => {
                      setaddOpen(!addOpen)
                    }}
                />
            </>}
        {
          state.useSttus === StatusState.USE && <>
            {
              !state.tkoutAt &&
                <CustomLoadingButton
                    label={"사용종료"}
                    type={"largeList"}
                    onClick={async () => {
                      await EquipmentService.putUseReqstProcess({reqstId: id!.toString(), reqstSttus: StatusState.END_USE}) // 사용종료
                      setState({...state, reqstSttus: StatusState.END_USE})
                      addModal({open: true, isDist: true, content: '사용종료 처리되었습니다.'})
                    }}
                />
            }
            {
              state.tkoutAt && <>
                    <HorizontalInterval size={"10px"}/>
                    <CustomLoadingButton
                        label={"반입완료"
                    }
                        type={"largeList"}
                        onClick={async () => {
                          await EquipmentService.putUseTkin(id!.toString())
                          addModal({open: true, isDist: true, content: '반입되었습니다.'})
                        }}/>
                </>
            }
            </>}
        {/*{
          state.useSttus === StatusState.WAITING && <><CustomButton
                label={"신청취소"}
                type={"largeList"}
                onClick={async () => {
                  await EquipmentService.putUseReqstProcess({reqstId: id!.toString(), reqstSttus: StatusState.END_USE}) // 사용종료
                  setState({...state, reqstSttus: StatusState.END_USE})
                  addModal({open:true, isDist:true, content:'신청취소 되었습니다.'})
                }}/>
            </>
        }*/}
      </Stack>
    </Stack>
    <DefaultModal open={defaultOpen} setOpen={setdefaultOpen} isDist={true} state={state}
                  setState={setState}/>
    <DepositModal open={depositOpen} setOpen={setdepositOpen} isDist={false}/>
    <AddModal open={addOpen} setOpen={setaddOpen} isDist={false}/>
  </Stack>
}

const DefaultModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDist: boolean
  state: EqpmnUseDetail
  setState: Dispatch<SetStateAction<any>>
}> = props => {
  const {id} = useParams()
  const [details, setDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={props.open}
    isDist={props.isDist}
    type={"save"} title={"미납처리"}
    onConfirm={async () => {
      await EquipmentService.putUseNpyProcess({reqstId: id!.toString(), npyResn: details})
      props.setState({...props.state, npyResn: details})
      addModal({open: true, isDist: true, content: '미납처리되었습니다.'})
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
      await EquipmentService.putUseRcpmnyGdcc({reqstId: id!.toString(), rcpmnyGdcc: details})
      addModal({open: true, isDist: true, content: '입금안내문이 발송되었습니다.'})
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

const AddModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDist: boolean

}> = props => {
  const {id} = useParams()
  const [details, setDetails] = useState("")
  const [seconddetails, setsecondDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={props.open}
    isDist={props.isDist}
    type={"save"} title={"추가금액 등록"}
    onConfirm={async () => {
      await EquipmentService.putUseAditRntfee({
        aditRntfee: Number(details),
        rqestResn: seconddetails,
        reqstId: id!.toString()
      })
      addModal({open: true, isDist: true, content: '추가금액등록이 완료되었습니다.'})
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
          <AddmoneyTableRowTextField>
            <TableRow>
              <TableTextFieldCell tdWidth={"86%"}
                                  label={"추가금액"} multiline defaultLabel={details}
                                  additionDirection={'row'}
                                  additionContent={<Fragment>
                                    <HorizontalInterval size={'15px'}/>
                                    <Box width={'50px'}>{'원'}</Box>
                                  </Fragment>}
                                  onChange={(text: string) => {
                                    setDetails(text)
                                  }}/>
            </TableRow>
          </AddmoneyTableRowTextField>
          <TableRowTextField>
            <TableRow>
              <TableTextFieldCell tdWidth={"86%"}
                                  label={"청구사유"} multiline defaultLabel={seconddetails}
                                  onChange={(text: string) => {
                                    setsecondDetails(text)
                                  }}/>
            </TableRow>
          </TableRowTextField>
        </TableBody>
      </Table>
    </TableContainer>
  </ModalComponents>
}

const AddmoneyTableRowTextField = styled(TableRow)`
  .MuiInputBase-root {
    height: 50px;
    align-items: baseline;
  }

  .MuiTableCell-root {
    padding-top: 15px;
    padding-bottom: 15px;
  }
`

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

const ModalBoxContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '480px',
  backgroundColor: 'white',
  borderRadius: '20px',
  margin: '18px 220px 18px 0',
  padding: '40px 40px 60px',
})
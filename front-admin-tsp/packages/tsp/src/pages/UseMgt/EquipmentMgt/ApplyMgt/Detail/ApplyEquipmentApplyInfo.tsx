import {Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {CustomButton, CustomLoadingButton} from "~/../../shared/src/components/ButtonComponents";
import {
  HorizontalInterval,
  LoadingProgress,
  SubAttachFileContents,
  SubContents
} from "~/../../shared/src/components/LayoutComponents";
import {ModalComponents} from "~/../../shared/src/components/ModalComponents";
import {TableSelectCell, TableTextCell, TableTextFieldCell} from "~/../../shared/src/components/TableComponents";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {EqpmnUseReqstDetail, StatusState} from "~/service/Model";
import {dayFormat, phoneNumberFormat, toTimeFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const ApplyEquipmentApplyInfo = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST", 'EQPMN_PAYMENT', 'MEMBER_TYPE'])
  const [completeOpen, setcompleteOpen] = useState(false)
  const [carryOpen, setcarryOpen] = useState(false)
  const {addModal} = useGlobalModalStore()
  const list = EquipmentService.getUseEquipListApplyInfo(id!.toString())
  const [state, setState] = useState<EqpmnUseReqstDetail>();
  const [dscntId, setDscntId] = useState<string | any>('')

  useEffect(() => {
    if (!list.isLoading && !list.isFetching) {
      if (!!list.data) {
        setState(list.data);
      }
    }
  }, [list.data, list.isLoading, list.isFetching])

  // useEffect(() => {
  //   if (state != null && state.dscntId) {
  //     const findIndex = state.dscntList.findIndex(({dscntId}) => dscntId === state.dscntId);
  //     const updateDscnt = {
  //       ...state,
  //       dscntResn: state.dscntList[findIndex].dscntResn,
  //       dscntRate: state.dscntList[findIndex].dscntRate
  //     };
  //     setState(updateDscnt)
  //   }
  // }, [dscnt])

  if (list.isLoading || !state) return <LoadingProgress/>

  return <Stack spacing={"40px"}>
    <SubContents title={"신청정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"신청상태"} label={toCommtCodeName(commtCode, 'EQPMN_REQST_ST', state.reqstSttus)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"신청일"} label={dayFormat(state.creatDt)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"접수번호"} label={state.rceptNo}
                thWidth={"13%"}/>

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

              <TableTextCell title={"AI 집적단지 사업참여 여부"} label={state.partcptnAt ? '참여함' : '참여안함'} thWidth={"13%"}/>

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


    <SubContents title={"반출신청"}
                 rightContent={<>
                   {/*상태가 신청이고, 반출심의결과가 승인일때*/}
                   {state.tkoutAt && <>
                     {state.reqstSttus === StatusState.APPLY && state.tkoutDlbrtResult === StatusState.APPROVE &&
                         <CustomButton
                             label={"반출불가"} type={"small"} color={"list"}
                             onClick={() => {
                               setcarryOpen(!carryOpen)
                             }}/>}
                     {/*상태가 승인이 아니고, 반출심의결과가 반출불가일때*/}
                     {state.reqstSttus !== StatusState.APPROVE && state.tkoutDlbrtResult !== StatusState.APPROVE &&
                         <CustomButton
                             label={"반출불가취소"} type={"small"} color={"list"}
                             onClick={() => {
                               addModal({
                                 open: true, content: '취소하시겠습니까?', onConfirm: async () => {
                                   await EquipmentService.putUseReqstTkout({
                                     reqstId: id!.toString(),
                                     tkoutDlbrtResult: StatusState.APPROVE
                                   })
                                   setState({...state, tkoutDlbrtResult: StatusState.APPROVE})
                                 }
                               })
                             }}/>}</>}
                 </>}
    >

      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"반출여부"} label={state.tkoutAt ? '반출' : '미반출'}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={"반출지 주소"} label={state.tkoutAt ? state.tkoutAdres : ''}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={"반출심의결과"} label={state.tkoutAt ? state.tkoutDlbrtResult === 'T' ? '반출가능' : '반출불가' : ''}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"사유(용도)"}
                label={state.tkoutAt ? state.tkoutResn : ''}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"서약서"}
                label={state.tkoutAt ? "서약서_홍길동.jpg" : ''} // state.tkoutAt ? state.tkoutResn : ''
                thWidth={"13%"} tdSpan={5}
                rightContent={
                  state.tkoutAt && <CustomButton style={{marginLeft: "10px"}}
                                                 label={"다운로드"} type={"small"} color={"list"}
                                                 onClick={() => {
                                                   addModal({open: true, isDist: true, content: '구현중입니다.'})
                                                 }}/>
                }
              />
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"반출심의 내용"}
                label={state.tkoutAt ? state.tkoutDlbrtCn : ''}
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
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"사용금액"}
      // 신청상태가 반려일때 버튼이 나오지않음
      rightContent={state.reqstSttus === StatusState.REJECT ? '' :
        <CustomLoadingButton
          label={"할인적용"} type={"small"} color={"list"}
          onClick={async () => {
            await EquipmentService.putUseReqstDscnt({
              dscntId: dscntId,
              reqstId: id!.toString(),
              usgtm: state.usgtm
            })
            addModal({open: true, isDist: true, content: '할인이 적용되었습니다.'})
          }}/>
      }>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"1시간 사용료"} label={`${state.rntfeeHour || 0}원`}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={"1일 가용시간"} label={`${state.usefulHour < 0 ? state.usefulHour * -1 : state.usefulHour || 0}시간`}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={"예상 사용금액"}
                label={`${state.expectRntfee || 0}원`}
                thWidth={"13%"} tdWidth={"21%"}/>

            </TableRow>
            <TableRow>
              <TableSelectCell
                label={"할인사유"} selectLabel={state.dscntList.map((m, i) => {
                return `${m.dscntResn} (${m.dscntRate}%)`
              })}
                defaultLabel={`${state.dscntResn} (${state.dscntRate}%)`}
                disable={state.reqstSttus === StatusState.REJECT}
                thWidth={"13%"} tdSpan={5} onClick={(selectValue) => {
                const findIndex = state.dscntList.findIndex(({dscntResn}) => selectValue.includes(dscntResn));
                const updateDscnt = {
                  ...state,
                  dscntRate: state?.dscntList[findIndex].dscntRate,
                  dscntResn: state?.dscntList[findIndex].dscntResn
                };
                setState(updateDscnt)
                setDscntId(state?.dscntList[findIndex].dscntId)
              }}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"지불방법"} label={toCommtCodeName(commtCode, 'EQPMN_PAYMENT', state.pymntMth)}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                division title={"할인금액"}
                label={`${Math.floor((state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                title={"할인적용금액"}
                label={`${Math.floor(((state.rntfeeHour * state.usgtm) - ((state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubAttachFileContents atchmnflGroupId={state.atchmnflGroupId} atchmnfl={[]} onAllDownload={() => {
    }} onDownload={() => {
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
          (state.reqstSttus === StatusState.APPROVE || state.reqstSttus === StatusState.SPM_REQUEST || state.reqstSttus === StatusState.APPLY) && <>
            <CustomLoadingButton
                label={"신청취소"}
                type={"largeList"}
                onClick={async () => {
                  await EquipmentService.putUseEquipEstmtCheck({reqstId: id!.toString(), reqstSttus: StatusState.CANCEL}) // 사용종료
                  setState({...state, reqstSttus: StatusState.CANCEL})
                  addModal({open: true, isDist: true, content: '종료 되었습니다.'})
                }}/>
                <HorizontalInterval size={"10px"}/>
            </>
        }
        {
          (state.reqstSttus === StatusState.APPLY || state.reqstSttus === StatusState.SPM_REQUEST) && <>
                <CustomButton
                    label={"보완"}
                    type={"largeList"}
                    onClick={() => {
                      setcompleteOpen(!completeOpen)
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomLoadingButton
                    label={"반려"}
                    type={"largeList"}
                    onClick={async () => {
                      await EquipmentService.putUseEquipEstmtCheck({
                        reqstSttus: StatusState.REJECT,
                        reqstId: id!.toString()
                      })
                      setState({...state, reqstSttus: StatusState.REJECT})
                      addModal({open: true, isDist: true, content: '반려 처리되었습니다.'})
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomLoadingButton
                    label={"승인"}
                    onClick={async () => {
                      await EquipmentService.putUseReqstConsent(id!.toString())
                      setState({...state, reqstSttus: StatusState.APPROVE})
                      addModal({open: true,isDist: true, content: "저장 완료되었습니다.",})
                    }}
                /></>}
      </Stack>
    </Stack>

    <ComplementModal open={completeOpen} setOpen={setcompleteOpen} id={id!.toString()} state={state}
                     setState={setState}/>
    <CarryModal open={carryOpen} setOpen={setcarryOpen} id={id!.toString()} state={state}
                setState={setState}/>
  </Stack>
}

const ComplementModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  id: string
  state: EqpmnUseReqstDetail
  setState: Dispatch<SetStateAction<any>>
}> = props => {
  const {addModal} = useGlobalModalStore()
  const [details, setDetails] = useState("")

  return <ModalComponents
    open={props.open}
    type={"save"} title={'보완요청'}
    onConfirm={async () => {
      await EquipmentService.putUseEquipEstmtCheck({
        rsndqf: details,
        reqstId: props.id,
        reqstSttus: StatusState.SPM_REQUEST
      })
      props.setState({...props.state, reqstSttus: StatusState.SPM_REQUEST})
      // const endCheck = await EquipmentInformationService.putEquipmentsEndCheck(id!, correctData)
      // mgtInfoData.setModalOpen("checkFinish",false);
      // mgtInfoData.setMgtInfoData({
      //   ...mgtInfoData.mgtInfoData!,
      //   available: endCheck.eqpmntStateInfo!.available,
      //   eqpmnSt: endCheck.eqpmntStateInfo!.eqpmnSt,
      //   inspectSt: "0",
      //   checkParam: null
      // })
      addModal({open: true, isDist: true, content: '보완요청 처리되었습니다.'})
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

const CarryModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  id: string
  state: EqpmnUseReqstDetail
  setState: Dispatch<SetStateAction<any>>
}> = props => {
  const {addModal} = useGlobalModalStore()
  const [details, setDetails] = useState("")

  return <ModalComponents
    open={props.open}
    type={"save"} title={"반출불가사유"}
    onConfirm={async () => {
      await EquipmentService.putUseReqstTkout({reqstId: props.id, tkoutDlbrtCn: details, tkoutDlbrtResult: '반출불가'})
      props.setState({...props.state, tkoutDlbrtResult: '불가', tkoutDlbrtCn: details})
      addModal({open: true, isDist: true, content: '반출불가 처리되었습니다.'})
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
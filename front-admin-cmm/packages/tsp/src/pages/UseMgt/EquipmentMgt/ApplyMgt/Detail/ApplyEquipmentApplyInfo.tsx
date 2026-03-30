import {Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {CustomButton} from "~/../../shared/src/components/ButtonComponents";
import {HorizontalInterval, LoadingProgress, SubContents} from "~/../../shared/src/components/LayoutComponents";
import {ModalComponents} from "~/../../shared/src/components/ModalComponents";
import {TableSelectCell, TableTextCell, TableTextFieldCell} from "~/../../shared/src/components/TableComponents";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {EqpmnUseReqstDetail, StatusState} from "~/service/Model";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";
import {CommonService} from "~/service/CommonService";

export const ApplyEquipmentApplyInfo = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST",'EQPMN_PAYMENT'])
  const [completeOpen, setcompleteOpen] = useState(false)
  const [carryOpen, setcarryOpen] = useState(false)
  const {addModal} = useGlobalModalStore()
  const list = EquipmentService.getUseEquipListApplyInfo(id!.toString())
  const [state, setState] = useState<EqpmnUseReqstDetail>();
  const [dscnt, setDscnt] = useState<string | any>('')

  useEffect(() => {
    if (!list.isLoading && !list.isFetching) {
      if (!!list.data) {
        setState(list.data);
      }
    }
  }, [list.data, list.isLoading, list.isFetching])

  useEffect(() => {
    if (state != null && state.dscntId) {
      const findIndex = state.dscntList.findIndex(({dscntId}) => dscntId === state.dscntId);
      const updateDscnt = {
        ...state,
        dscntResn: state.dscntList[findIndex].dscntResn,
        dscntRate: state.dscntList[findIndex].dscntRate
      };
      setState(updateDscnt)
    }
  }, [dscnt])

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
                division title={"구분"} label={state.mberDiv}
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
                division title={"연락처"} label={state.cttpc} // phoneNumberFormat
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
                 rightContent={
                   state.tkoutDlbrtResult === StatusState.APPROVE ? <CustomButton
                         label={"반출불가"} type={"small"} color={"list"}
                         onClick={() => {
                           setcarryOpen(!carryOpen)
                         }}/> : <CustomButton
                     label={"반출불가취소"} type={"small"} color={"list"}
                     onClick={() => {
                       addModal({open:true, content:'취소하시겠습니까?', onConfirm: async () => {
                           await EquipmentService.putUseReqstTkout({reqstId: id!.toString(), tkoutDlbrtResult: StatusState.APPROVE})
                           setState({...state, tkoutDlbrtResult:StatusState.APPROVE})
                         }})
                     }}/>
                 }>

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
                title={"반출심의결과"} label={state.tkoutAt ? state.tkoutDlbrtResult : ''}
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
                label={"서약서_홍길동.jpg"}
                thWidth={"13%"} tdSpan={5}
                rightContent={

                  <CustomButton style={{marginLeft: "10px"}}
                                label={"다운로드"} type={"small"} color={"list"}
                                onClick={() => {
                                }}/>

                }/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"반출심의 내용"}
                label={state.tkoutDlbrtCn}
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
                title={"사용시간"} label={`${state.usgtm || 0}시간`}
                thWidth={"13%"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"사용금액"}
      rightContent={
        <CustomButton
          label={"할인적용"} type={"small"} color={"list"}
          onClick={async () => {
            if (!dscnt) {
              return;
            }
            await EquipmentService.putUseReqstDscnt(id!.toString(), dscnt)
          }}/>
      }>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"1시간 사용료"} label={`${state.rntfeeHour || 0}원`}
                thWidth={"13%"}/>
              <TableTextCell
                division title={"1일 가용시간"} label={`${state.usefulHourDay || 0}시간`}
                thWidth={"13%"}/>
              <TableTextCell
                title={"예상 사용금액"} label={`${state.rntfeeHour * state.usefulHourDay || 0}원`} // (1시간 사용료 * 1일 가용시간) * 사용시간(일수)
                thWidth={"13%"}/>

            </TableRow>
            <TableRow>
              <TableSelectCell
                label={"할인사유"} selectLabel={state.dscntList.map((m, i) => {
                return m.dscntResn
              })}
                defaultLabel={state.dscntResn}
                thWidth={"13%"} tdSpan={5} onClick={(selectValue) => {
                const findIndex = state.dscntList.findIndex(({dscntResn}) => dscntResn === selectValue);
                const updateDscntRate = {...state, dscntRate: state?.dscntList[findIndex].dscntRate};
                setDscnt(state.dscntList[findIndex].dscntId);
                setState(updateDscntRate)
              }}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"지불방법"} label={toCommtCodeName(commtCode, 'EQPMN_PAYMENT', state.pymntMth)}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                division title={"할인금액"}
                label={`${(state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100 || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
              <TableTextCell
                title={"할인적용금액"}
                label={`${(state.rntfeeHour * state.usgtm) - ((state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100) || 0}원`}
                thWidth={"13%"} tdWidth={"21"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"첨부파일"}
      rightContent={
        <CustomButton
          label={"일괄다운로드"} type={"small"} color={"list"}
          onClick={async () => {
            await CommonService.AttachmentGroupFile(state?.atchmnflGroupId).then((res) => {
              const blob = new Blob([res]);
              const fileObjectUrl = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = fileObjectUrl;
              link.setAttribute(
                "download",
                `첨부파일_리스트.zip`
              );
              document.body.appendChild(link);
              link.click();
            });
          }}/>
      }>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align={"center"} width={"70px"}>번호</TableCell>
            <TableCell align={"center"}>파일명</TableCell>
            <TableCell align={"center"} width={"150px"}>용량</TableCell>
            <TableCell align={"center"} width={"150px"}>다운로드</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align={"center"}>1</TableCell>
            <TableCell align={"center"}>"파일명"</TableCell>
            <TableCell align={"center"}>"용량"</TableCell>
            <TableCell align={"center"}>
              <CustomButton
                type={"small"}
                color={"list"}
                label={"다운로드"}
                onClick={async () => {
                  await CommonService.AttachmentFile('att-ed1fe6dd2cca4d5f864fac18c8f89492').then((res) => {
                    const blob = new Blob([res]);
                    console.log(blob)
                    const fileObjectUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = fileObjectUrl;
                    link.setAttribute(
                      "download",
                      `첨부파일.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();
                  });
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </SubContents>


    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1);
        }}
      />
      {/*<CustomButton
        label={"신청"}
        type={"largeList"}
        onClick={async () => {
          await EquipmentService.putUseEquipEstmtCheck({
            reqstSttus: '신청',
            reqstId: id!.toString()
          })
          setState({...state, reqstSttus: '신청'})
          alert('신청완료')
        }}
      />*/}
      <Stack flexDirection={"row"}>
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
                <CustomButton
                    label={"반려"}
                    type={"largeList"}
                    onClick={async () => {
                      await EquipmentService.putUseEquipEstmtCheck({
                        reqstSttus: StatusState.REJECT,
                        reqstId: id!.toString()
                      })
                      setState({...state, reqstSttus: StatusState.REJECT})
                      addModal({open:true, isDist:true, content:'반려되었습니다.'})
                      navigate(-1)
                    }}
                />
            {/*<HorizontalInterval size={"10px"}/>
        <CustomButton
          label={"견적서 발급"}
          type={"largeList"}
          onClick={() => {
          }}
        />*/}
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"승인"}
                    onClick={async () => {
                      const result = await EquipmentService.putUseReqstConsent(id!.toString())
                      setState({...state, reqstSttus: StatusState.APPROVE})
                      //const result = await EquipmentInformationService.putEquipmentMgtInfo(id!, req!)
                      if (result.success) {
                        addModal({
                          open: true,
                          content: "저장 완료.",
                        })
                      }
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
      props.setState({...props.state, reqstSttus:StatusState.SPM_REQUEST})
      // const endCheck = await EquipmentInformationService.putEquipmentsEndCheck(id!, correctData)
      // mgtInfoData.setModalOpen("checkFinish",false);
      // mgtInfoData.setMgtInfoData({
      //   ...mgtInfoData.mgtInfoData!,
      //   available: endCheck.eqpmntStateInfo!.available,
      //   eqpmnSt: endCheck.eqpmntStateInfo!.eqpmnSt,
      //   inspectSt: "0",
      //   checkParam: null
      // })
      addModal({open:true, isDist: true, content:'보완요청 처리되었습니다.'})
      props.setOpen(false)
      window.scrollTo(0,0)
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
      props.setState({...props.state, tkoutDlbrtResult:'불가', tkoutDlbrtCn: details})
      addModal({open:true, isDist:true, content:'반출불가 처리되었습니다.'})
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
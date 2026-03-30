import React, {Dispatch, SetStateAction, useEffect, useState, useRef} from 'react'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {HorizontalInterval, LoadingProgress, SubContents} from "shared/components/LayoutComponents";
import {
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell
} from "shared/components/TableComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {ModalComponents} from "shared/components/ModalComponents";
import styled from "@emotion/styled";
import {EstimationService} from "~/service/UseMgt/Estimation/EstimationService";
import {dayFormat, phoneNumberFormat, toTimeFormat} from "shared/utils/stringUtils";
import {EqpmnEstmtDetailData, StatusState} from "~/service/Model";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const EstimationApplyInfo = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST",'EQPMN_PAYMENT'])
  const [open, setOpen] = useState(false);
  const {addModal} = useGlobalModalStore()
  const information = EstimationService.getUseEquipEstmtMgtInfo(id!.toString());
  const [state, setState] = useState<EqpmnEstmtDetailData>();
  const [dscntId, setDscntId] = useState<string | any>('');

  useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        setState(information.data);
      }
    }
  }, [information.data, information.isLoading, information.isFetching])

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
  }, [dscntId])

  if (information.isLoading || !state) return <LoadingProgress/>

  return <Stack spacing={"40px"} component={'form'} id={'Estimateinfo'}>
    <SubContents title={"신청정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"신청상태"} label={toCommtCodeName(commtCode, 'EQPMN_REQST_ST', state.reqstSttus)}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"접수번호"} label={`${state.rceptNo || '접수번호'}`}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"신청일"} label={dayFormat(state.creatDt)}
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
                division title={"직위"} label={state.ofcps}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"사업자명/이름"} label={state.entrprsNm}
                thWidth={"13%"}/>

            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"연락처"} label={`${phoneNumberFormat(state.cttpc)}`}
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
                division title={"자산번호"} label={state.assetsNo}
                thWidth={"13%"} tdSpan={5}/>
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
                title={"반출지 주소"} label={`${state.tkoutAdres || '반출지주소'}`}
                thWidth={"13%"} tdSpan={3}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"사유(용도)"}
                label={`${state.tkoutResn || '사유(용도)'}`}
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
                title={"사용시간"} label={`사용시간`}
                thWidth={"13%"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={"신청 사용금액"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"1시간 사용료"} label={`${state.rntfeeHour || 0}원`}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"1일 가용시간"} label={`${state.usefulHourDay || 0}시간`}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"지불방법"} label={toCommtCodeName(commtCode, 'EQPMN_PAYMENT', state.pymntMth)}
                thWidth={"13%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"예상 사용금액"} label={`${state.rntfeeHour * state.usefulHourDay || 0}원`}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"조정 사용금액"}
      rightContent={
        <CustomButton
          disabled={state.reqstSttus === StatusState.SPM_REQUEST}
          label={"사용금액 재설정"} type={"small"} color={"list"}
          onClick={async () => {
            console.log(state.usgtm)
            await EstimationService.putEstmtModifyPrice(id!.toString(), {
              dscntId: dscntId,
              estmtId: id!.toString(),
              usgtm: state.usgtm,
            })
            addModal({open: true, content: '사용금액 재설정이 완료되었습니다.', type: 'normal', isDist: true})
          }}/>
      }>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextFieldCell
                disabled={state.reqstSttus === StatusState.SPM_REQUEST}
                division label={"조정 사용시간"} defaultLabel={`${state.usgtm || 0}`}
                endText={"시간"} thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
                const updateUsgtm = {...state, usgtm: Number(text)};
                setState(updateUsgtm);
              }}/>

              <TableTextCell
                title={"사용금액"} label={`${state.rntfeeHour * state.usgtm || 0}원`}
                thWidth={"13%"} tdSpan={3}/>
            </TableRow>

            <TableRow>
              <TableSelectCell
                label={"할인사유"} defaultLabel={state.dscntResn} selectLabel={state.dscntList.map((m, i) => {
                return m.dscntResn
              })}
                disable={state.reqstSttus === StatusState.SPM_REQUEST}
                thWidth={"13%"} tdSpan={5} required onClick={(selectValue) => {
                const findIndex = state.dscntList.findIndex(({dscntResn}) => dscntResn === selectValue);
                const updateDscntRate = {...state, dscntRate: state?.dscntList[findIndex].dscntRate};
                setState(updateDscntRate)
                setDscntId(state?.dscntList[findIndex].dscntId)
              }}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={"할인금액"} label={`${(state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100 || 0}원`}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"할인적용금액"}
                label={`${(state.rntfeeHour * state.usgtm) - ((state.rntfeeHour * state.usgtm) * Number(state.dscntRate) / 100) || 0}원`}
                thWidth={"13%"} tdSpan={3}/>
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
          onClick={() => {
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
                label={"다운로드"}/>
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
        }}/>

      <Stack flexDirection={"row"}>
        {
          (state.reqstSttus === StatusState.APPLY || state.reqstSttus === StatusState.SPM_REQUEST) && <>
                <CustomButton
                    label={"보완"}
                    type={"largeList"}
                    onClick={() => {
                      setOpen(!open)
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"반려"}
                    type={"largeList"}
                    onClick={async () => {
                      await EstimationService.putUseEquipEstmtCheck({
                        reqstSttus: StatusState.REJECT,
                        estmtId: id!.toString()
                      })
                      setState({...state, reqstSttus: StatusState.REJECT})
                      addModal({open:true, isDist:true, content:'반려되었습니다.'})
                      navigate(-1)
                    }}
                />
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"견적서 발급"}
                    type={"largeList"}
                    onClick={() => {
                    }}
                />
            </>}
        {
          (state.reqstSttus === StatusState.EST_APPROVE) && <CustomButton // 견적서 발급
                label={"견적서 다운로드"}
                type={"largeList"}
                onClick={() => {

                  addModal({open: true, content: '견적서다운로드', isDist: true})
                }}
            />
        }
        {/*<HorizontalInterval size={"10px"}/>*/}
        {/*<CustomButton
          label={"저장"}
          onClick={async () => {
         const result = await EquipmentInformationService.putEquipmentMgtInfo(id!, req!)
         if (result.success) {
            addModal({
              open: true,
              content: "저장 완료."
            })
          }}
          }
        />*/}
      </Stack>
    </Stack>

    <ComplementModal open={open} setOpen={setOpen} state={state} setState={setState}/>
  </Stack>
}

const ComplementModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  state: EqpmnEstmtDetailData
  setState: Dispatch<SetStateAction<any>>
}> = props => {
  const {id} = useParams()
  const [details, setDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={(props.open)}
    type={"save"} title={'보완요청'}
    onConfirm={async () => {
      await EstimationService.putUseEquipEstmtCheck({
        rsndqf: details,
        reqstSttus: StatusState.SPM_REQUEST,
        estmtId: id!.toString()
      })
      props.setState({...props.state, reqstSttus: StatusState.SPM_REQUEST})
      addModal({open:true, isDist:true, content:'보완이 완료되었습니다.'})
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
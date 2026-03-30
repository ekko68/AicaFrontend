import {HorizontalInterval, SubContents} from "shared/components/LayoutComponents";
import {
  Box, Checkbox,
  Stack,
  Table,
  TableBody,
  styled,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {TableDateTermCell, TableTextCell, TableTextFieldCell} from "shared/components/TableComponents";
import React, {Dispatch, SetStateAction, useState} from "react";
import {toTimeFormat} from "shared/utils/stringUtils";
import {회원상세정보} from "~/pages/OperationMgt/MemberMgt/Model";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {ModalComponents} from "shared/components/SharedModalComponents";

export const MemberInfo = () => {
  const [state, setState] = useState<회원상세정보>(tempData)
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [removeOpen, setRemoveOpen] = useState(false)
  return <Stack spacing={'40px'}>
    <SubContents title={'관리정보'}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"가입일시"} label={toTimeFormat(Date.now())}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"회원유형"} label={tempData.회원유형}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"강사여부"} label={
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}
                     alignItems={'center'}>{state.강사여부}
                  <CustomButton label={state.강사여부 === '강사' ? '강사안함' : '강사'}
                                type={'small'} color={"outlined_del"}
                                onClick={() => {
                                  if (state.강사여부 === '강사')
                                    setState({...state, 강사여부: '강사안함'})
                                  else
                                    setState({...state, 강사여부: '강사'})
                                }}/>
                </Box>}
                thWidth={"13%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={'회원상태'} label={state.회원상태}
                thWidth={"13%"} tdWidth={"21%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={'회원가입정보'}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"아이디"} label={tempData.아이디}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                division title={"이름"} label={tempData.이름}
                thWidth={"13%"} tdWidth={"21%"}/>

              <TableTextCell
                title={"생년월일"} label={`${tempData.생년월일}`}
                thWidth={"13%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={"성별"} label={tempData.성별}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={"휴대폰번호"} label={`${tempData.휴대폰번호}`}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={"이메일"} label={tempData.이메일}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={"마케팅 수신 여부"} label={tempData.마케팅수신여부}
                thWidth={"13%"} tdWidth={"21%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1);
        }}
      />
      <Stack flexDirection={"row"}>
        <CustomButton
          label={"비밀번호 초기화"}
          type={"largeList"}
          onClick={() => {
            addModal({open: true, isDist: true, content: '임시 비밀번호가 저장된 이메일로 발송되었습니다.'})
          }}
        />
        {
          state.회원상태 === '정상' &&  <>
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"불량회원 등록"}
                    type={"largeList"}
                    onClick={() => {
                      setDefaultOpen(!defaultOpen)
                    }}
                />
            </>
        }
        {
          state.회원상태 === '불량회원' &&  <>
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"불량회원 해제"}
                    type={"largeList"}
                    onClick={() => {
                      setRemoveOpen(!removeOpen)
                    }}
                />
            </>
        }
      </Stack>
    </Stack>
    <DefaultModal open={defaultOpen} setOpen={setDefaultOpen} state={state} setState={setState}/>
    <DefectRemove open={removeOpen} setOpen={setRemoveOpen} state={state} setState={setState}/>
  </Stack>
}

export const DefaultModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDist?: boolean
  state?: any
  setState?: Dispatch<SetStateAction<any>>
}> = props => {
  const [details, setDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={props.open}
    style={{maxHeight:'600px', overflow:"auto", width:'800px'}}
    isDist={props.isDist}
    type={"save"} title={"불량회원 등록"}
    onConfirm={async () => {
      /*await EquipmentService.putUseNpyProcess({reqstId: id!.toString(), npyResn: details})
      props.setState({...props.state, npyResn: details})*/
      addModal({open: true, isDist: true, content: '불량회원 등록되었습니다.'})
      if(props.setState) {
        props.setState({...props.state, 불량회원여부: '불량회원', 회원상태: '불량회원'})
      }
        //props.setState('불량회원')

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
    <SubContents title={'기본정보'}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={"아이디"} label={tempData.아이디}
                thWidth={"12%"} tdWidth={"38%"}/>

              <TableTextCell
                division title={"이름"} label={tempData.이름}
                thWidth={"12%"} tdWidth={"38%"}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={'등록사유'} required maxHeight={'100%'}>
      <TableContainer sx={{borderTop: "1px solid #4063ec", width: "100%"}}>
        <Table sx={{minWidth: 700}}>
          <TableHead>
            <TableRow>
              <StyledTableCell><span>구분</span></StyledTableCell>
              <StyledTableCell><span>내용</span></StyledTableCell>
              <TableCell align={'center'} sx={{fontWeight: 'bold'}}>
                <span>체크</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell><span>회원</span></StyledTableCell>
              <StyledTableCell><span>타인의 정보로 가입하여 서비스를 이용</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell rowSpan={2}><span>사업</span></StyledTableCell>
              <StyledTableCell><span>사업을 제대로 수행하지 않음 (보고서 미제출, 평가 미참석, 연락거부 등)</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><span>과제를 불법적으로 복제하여 제출함.</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell rowSpan={2}><span>이용</span></StyledTableCell>
              <StyledTableCell><span>커뮤니티에서 같은 문장과 단어, 유사한 내용을 반복적으로 사용</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><span>문의 담당자에게 지속적으로 욕설을 사용함.</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell rowSpan={2}><span>장비</span></StyledTableCell>
              <StyledTableCell><span>장비 이용 후 6개월 이상 사유없이 이용료 미지급함.</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><span>장비를 지속적으로 훼손함.</span></StyledTableCell>
              <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Checkbox/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={'블랙리스트 설정'}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableDateTermCell
                label={"이용제한 기간"} required
                thWidth={"12%"}
                onChange={(beginTime, endTime) => {
                }}/>
            </TableRow>
            <TableRow>
              <TableTextFieldCell label={'상세사유'} multiline wordCount={1000}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>
  </ModalComponents>
}

export const DefectRemove: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDist?: boolean
  state?: any
  setState?: Dispatch<SetStateAction<any>>
}> = props => {
  const {id} = useParams()
  const [details, setDetails] = useState("")
  const {addModal} = useGlobalModalStore()

  return <ModalComponents
    open={props.open}
    isDist={props.isDist}
    type={"save"} title={"불량회원 해제"}
    onConfirm={async () => {
      /*await EquipmentService.putUseNpyProcess({reqstId: id!.toString(), npyResn: details})
      props.setState({...props.state, npyResn: details})*/
      addModal({open: true, isDist: true, content: '불량회원 해제처리되었습니다.'})
      if(props.setState)
        props.setState({...props.state, 불량회원여부:'정상',회원상태:'정상'})
        //props.setState('정상')

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


const tempData: 회원상세정보 = {
  가입일시: Date.now(),
  회원유형: '개인회원',
  강사여부: '강사',
  회원상태: '정상',
  아이디: 'abc123',
  이름: '홍길동',
  생년월일: Date.now(),
  성별: '남성',
  휴대폰번호: 55556666,
  이메일: 'abi123@naver.com',
  마케팅수신여부: '수신',
}

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: '#f5f5f5',
    borderRight: '1px solid #d7dae6',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  [`&.${tableCellClasses.body}`]: {
    borderRight: '1px solid #d7dae6',
    textAlign: 'center'
  },
}));

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
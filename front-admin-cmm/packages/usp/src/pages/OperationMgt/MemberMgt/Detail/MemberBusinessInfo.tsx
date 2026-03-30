import {HorizontalInterval, SubContents} from "shared/components/LayoutComponents";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow
} from "@mui/material";
import {TableTextCell} from "shared/components/TableComponents";
import React, {useState} from "react";
import {toTimeFormat} from "shared/utils/stringUtils";
import {회원기업회원상세정보,} from "~/pages/OperationMgt/MemberMgt/Model";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate, useParams} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {DefaultModal, DefectRemove} from "./MemberInfo";

export const MemberBusinessInfo: React.FC<{ value?: string, member?: string }> = props => {
  const [state, setState] = useState<회원기업회원상세정보>(tempData)
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
                division title={'불량회원여부'} label={state.불량회원여부}
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
                division title={"사업자등록번호"} label={tempData.사업자등록번호}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'사업자명'} label={tempData.사업자명}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'법인등록번호'} label={`${tempData.법인등록번호}`}
                thWidth={"13%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={'대표자명'} label={tempData.대표자명}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'담당자명'} label={`${tempData.담당자명}`}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title='담당자 휴대폰번호' label={`${tempData.담당자휴대폰번호}`}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                division title={'담당자 이메일'} label={tempData.담당자이메일}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'아이디'} label={tempData.아이디}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'휴대폰 번호'} label={tempData.휴대폰번호}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>
            <TableRow>
              <TableTextCell
                title={'마케팅수신여부'} label={tempData.마케팅수신여부}
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
          state.불량회원여부 === '정상' &&  <>
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
          state.불량회원여부 === '불량회원' &&  <>
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
    <DefaultModal open={defaultOpen} setOpen={setDefaultOpen} isDist state={state} setState={setState}/>
    <DefectRemove open={removeOpen} setOpen={setRemoveOpen} isDist state={state} setState={setState}/>
  </Stack>
}

const tempData: 회원기업회원상세정보 = {
  가입일시: Date.now(),
  회원유형: '개인회원',
  강사여부: '강사',
  불량회원여부: '정상',
  사업자등록번호: 6548765134,
  사업자명: '블루레몬',
  법인등록번호: 68768684654,
  대표자명: '홍길동',
  담당자명: '김철수',
  담당자휴대폰번호: 88885555,
  담당자이메일: 'abcd1234@abcd.com',
  아이디: 'abc123',
  휴대폰번호: 77775555,
  마케팅수신여부: '미수신',
}


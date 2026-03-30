import {HorizontalInterval, SubContents} from "shared/components/LayoutComponents";
import {Stack, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TableTextCell} from "shared/components/TableComponents";
import {toTimeFormat} from "shared/utils/stringUtils";
import React, {Dispatch, SetStateAction, useState} from "react";
import {회원기업상세정보} from "~/pages/OperationMgt/MemberMgt/Model";
import {CustomButton} from "shared/components/ButtonComponents";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {useNavigate} from "react-router-dom";
import {DefaultModal, DefectRemove} from "~/pages/OperationMgt/MemberMgt/Detail/MemberInfo";

export const MemberBusinessDetailInfo:React.FC<{member: string}> = props => {
  // const [member, setMember] = useState(props.member)
  const {addModal} = useGlobalModalStore()
  const navigate = useNavigate()
  // const [defaultOpen, setDefaultOpen] = useState(false)
  // const [removeOpen, setRemoveOpen] = useState(false)
  return <Stack spacing={'40px'}>
    <SubContents title={'기본정보'} maxHeight={'100%'}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={'산업분야'} label={tempData.산업분야}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'기업/기관유형'} label={tempData.기업기관유형}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'설립일'} label={toTimeFormat(tempData.설립일)}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={'종사자수'} label={tempData.종사자수}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'상주인원'} label={tempData.상주인원}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'채용예정인력'} label={tempData.채용예정인력}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={'업종'} label={tempData.업종}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'주 업종'} label={tempData.주업종}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'주요기술 및 생산품'} label={tempData.주요기술및생산품}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={'주소'} label={tempData.주소}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'대표전화'} label={`${tempData.대표전화}`}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'팩스'} label={`${tempData.팩스}`}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                division title={'대표자 연락처'} label={`${tempData.대표자연락처}`}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'대표자 이메일'} label={tempData.대표자이메일}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'신규창업계획'} label={tempData.신규창업계획}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={'이전 및 설립계획'} label={tempData.이전및설립계획}
                thWidth={"13%"} tdSpan={5}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents title={'매출정보'}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                division title={'기준년도'} label={tempData.기준년도}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                division title={'전년도 매출액'} label={tempData.전년도매출액}
                thWidth={"13%"} tdWidth={"21%"}/>
              <TableTextCell
                title={'전전년도 매출액'} label={tempData.전전년도매출액}
                thWidth={"13%"} tdWidth={"21%"}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={'3년전 매출액'} label={tempData.전전전년도매출액}
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
       {/* {
          member === '정상' &&  <>
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
          member === '불량회원' &&  <>
                <HorizontalInterval size={"10px"}/>
                <CustomButton
                    label={"불량회원 해제"}
                    type={"largeList"}
                    onClick={() => {
                      setRemoveOpen(!removeOpen)
                    }}
                />
            </>
        }*/}
      </Stack>
    </Stack>
    {/*<DefaultModal open={defaultOpen} setOpen={setDefaultOpen} isDist state={member} setState={setMember}/>
    <DefectRemove open={removeOpen} setOpen={setRemoveOpen} isDist state={member} setState={setMember}/>*/}
  </Stack>
}

const tempData: 회원기업상세정보 = {
  산업분야: '자동차',
  기업기관유형: '벤쳐',
  설립일: Date.now(),
  종사자수: '2명',
  상주인원: '2명',
  채용예정인력: '2명',
  업종: 'AI 헬스케어',
  주업종: 'AI 헬스케어 기기 생산',
  주요기술및생산품: 'AI 헬스케어 기기',
  주소: '(32156) 서울시 중구 정동길 35 A빌딩 2021호',
  대표전화: 55556666,
  팩스: 44445555,
  대표자연락처: 33334444,
  대표자이메일: 'abc123@abcd.com',
  신규창업계획: '신규창업',
  이전및설립계획: '본사이전',
  기준년도: 2021,
  전년도매출액: 1000000,
  전전년도매출액: 1000000,
  전전전년도매출액: 1000000
}
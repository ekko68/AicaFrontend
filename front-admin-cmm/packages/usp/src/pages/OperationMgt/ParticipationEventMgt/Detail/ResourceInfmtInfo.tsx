import {Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {SimpleTextField, SubAttachFileContents, SubContents} from "shared/components/LayoutComponents";
import {TableTextCell} from "shared/components/TableComponents";
import React, {useState} from "react";
import {디딤널상세조회, 자원정보공유상세조회} from "~/pages/OperationMgt/ParticipationEventMgt/Model";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {dayFormat, phoneNumberFormat} from "shared/utils/stringUtils";

export const ResourceInfmtInfo = () => {
  const [state, setState] = useState<자원정보공유상세조회>(tempData);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  return <>
    <Stack spacing={'40px'}>
      <SubContents title={'기본정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"등록일"} label={`${dayFormat(tempData.등록일)}`}
                  thWidth={"13%"} tdWidth={"37%"}/>

                <TableTextCell
                  title={"전시상태"} label={state.전시상태}
                  thWidth={"13%"} tdWidth={"37%"}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={'작성자정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"회원유형"} label={tempData.회원유형}
                  thWidth={"13%"} tdWidth={"21%"}/>

                <TableTextCell
                  division title={"사업자명/이름"} label={tempData.사업자명}
                  thWidth={"13%"} tdWidth={"21%"}/>

                <TableTextCell
                  title={"담당자명"} label={tempData.담당자명}
                  thWidth={"13%"}/>

              </TableRow>

              <TableRow>
                <TableTextCell
                  division title={"직급"} label={tempData.직급}
                  thWidth={"13%"} tdWidth={"21%"}/>

                <TableTextCell
                  division title={"휴대폰 번호"} label={`${phoneNumberFormat(tempData.휴대폰번호)}`}
                  thWidth={"13%"} tdWidth={"21%"}/>

                <TableTextCell
                  title={"이메일"} label={tempData.이메일}
                  thWidth={"13%"}/>

              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"회원ID"} label={tempData.회원ID} tdSpan={5}
                  thWidth={"13%"} tdWidth={"21%"}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={'상세내용'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"제목"} label={tempData.제목}
                  thWidth={"13%"}/>
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"내용"} label={tempData.내용}
                  thWidth={"13%"}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubAttachFileContents
        onAllDownload={() => {
        }}
        onDownload={() => {
        }}
        atchmnflGroupId={''}
        atchmnfl={tempData.첨부파일}>
      </SubAttachFileContents>

      <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
        <CustomButton
          label={"목록"} type={"largeList"} color={"outlined"}
          onClick={() => {
            navigate(-1);
          }}
        />
        <CustomButton
          label={state.전시상태 === '전시' ? '전시안함' : '전시'} type={"largeList"}
          onClick={() => {
            if (state.전시상태 === '전시') {
              setState({...state, 전시상태: '전시안함'});
              addModal({open: true, content: '전시 취소되었습니다.'})
            } else {
              setState({...state, 전시상태: '전시'})
              addModal({open: true, content: '전시되었습니다.'})
            }}}
        />
      </Stack>
    </Stack>
  </>
}

const tempData: 자원정보공유상세조회 = {
  등록일: Date.now(),
  전시상태: '전시',
  회원유형: '회원유형',
  사업자명: '사업자명/이름',
  담당자명: '담당자명',
  직급: '직급',
  휴대폰번호: 22233334444,
  이메일: 'brain@brainednet.com',
  회원ID: '회원ID',
  문의구분: '문의구분',
  제목: '제목',
  내용: '내용내용내용',
  첨부파일: [{fileNm: '파일이름', fileSize: 20, attachmentId: 'aaaaa', fileType: 'zip'}]
}
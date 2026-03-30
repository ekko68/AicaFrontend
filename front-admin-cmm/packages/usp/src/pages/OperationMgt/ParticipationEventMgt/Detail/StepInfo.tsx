import {Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {SimpleTextField, SubAttachFileContents, SubContents} from "shared/components/LayoutComponents";
import {TableTextCell} from "shared/components/TableComponents";
import React, {useState} from "react";
import {디딤널상세조회} from "~/pages/OperationMgt/ParticipationEventMgt/Model";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {dayFormat, phoneNumberFormat} from "shared/utils/stringUtils";
import {checkValidity} from "shared/utils/validUtil";

export const StepInfo = () => {
  //const [state, setState] = useState<StepDetailInfo>();
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  return <>
    <Stack spacing={'40px'} component={'form'} id={'stepInfo'}>
      <SubContents title={'기본정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"접수일"} label={`${dayFormat(tempData.접수일)}`}
                  thWidth={"13%"} tdWidth={"21%"}/>

                <TableTextCell
                  division title={"처리상태"} label={tempData.처리상태}
                  thWidth={"13%"} tdWidth={"21%"}/>

                <TableTextCell
                  title={"담당자"} label={tempData.담당자}
                  thWidth={"13%"}/>

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

      <SubContents title={'문의내용'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"문의구분"} label={tempData.문의구분}
                  thWidth={"13%"}/>
              </TableRow>
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

      <SubContents title={'답변'} required rightContent={
        <CustomButton
          label={"답변등록"} type={"small"} color={"list"} style={{margin: 0}}
          onClick={() => {
            if(checkValidity('stepInfo'))
              addModal({open:true, isDist:true, content:'등록되었습니다.'})
          }}/>}>
        <Box sx={{paddingX: '10px'}}>
          <SimpleTextField label={'내용'} multiline row={6} required wordCount={1000} fullWidth onChange={() => {
          }}/>
        </Box>
      </SubContents>
    </Stack>

    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1);
        }}
      />
    </Stack>
  </>
}

const tempData: 디딤널상세조회 = {
  접수일: Date.now(),
  처리상태: '처리상태',
  담당자: '담당자',
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
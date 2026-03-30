import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { SubContents } from "shared/components/LayoutComponents";
import { Stack, Table, TableBody, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { TableTextCell,  TableTextFieldCell } from "shared/components/TableComponents";
import { dayFormat } from "shared/utils/stringUtils";
import { CustomButton } from "~/components/ButtonComponents";
import { useNavigate } from "react-router-dom";
import { BusPlanReceptionMgtService } from "~/pages/Convention/MgtOfContractSigning/BusPlanReceptionMgt/Service/BusPlanReceptionMgtService";

export const AgtChangeMgtInfo = () => {
  const {id} = useParams();
  // const history = BusPlanReceptionMgtService.getDetailInfo(id!.toString());

  const navigate = useNavigate()
  return <Fragment>
    <Stack spacing={"40px"}>
      <SubContents title={"관리정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"신청일"} label={dayFormat(1660815022610)}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"처리상태"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"접수번호"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"과제명"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"변경유형"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"변경항목"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"사업자명/이름"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"과제책임자명"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"휴대폰번호"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"이메일"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"변경전: 과제정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"과제명/프로젝트명(국문)"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  division title={"과제명(영문)"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  division title={"과제분야"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  division title={"사업시간"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  division title={"사업기간(전체)"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  division title={"사업기간(당해)"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"변경후:과제정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                 <TableTextCell
                  title={"과제명/프로젝트명(국문)"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"과제명(영문)"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"과제분야"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업시간"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"사업기간(전체)"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업기간(당해)"} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      
      <SubContents title={"증빙자료"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"이름"} label={'이름'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"생년월일"} label={'생년월일'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"과제정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"과제명/프로젝트명(국문)"} label={'과제명/프로젝트명(국문)'}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"과제명/프로젝트명(영문)"} label={'과제명/프로젝트명(영문)'}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"과제분야"} label={'과제분야'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업시간"} label={'사업시간'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"사업시간(전체)"} label={'사업시간(전체)'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업기간(당해)"} label={'사업기간(당해)'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"과제책임자"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"이름"} label={'이름'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"생년월일"} label={'생년월일'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"휴대폰번호"} label={'휴대폰번호'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"이메일"} label={'이메일'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"부서/학과"} label={'부서/학과'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"직위/직급"} label={'직위/직급'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"주소"} label={'주소'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"유선번호"} label={'유선번호'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"팩스번호"} label={'팩스번호'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"과학기술인등록번호"} label={'과학기술인등록번호'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"참여기업개요"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"참여업체총수"} label={'참여업체총수'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"중소기업수"} label={'중소기업수'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"중견기업수"} label={'중견기업수'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"기타"} label={'기타'}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"참여기업"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  division label={"참여업체총수"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  division label={"중소기업수"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
              </TableRow>

              <TableRow>
                <TableTextFieldCell
                  division label={"중견기업수"} defaultLabel={''}
                  required thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  label={"기타"} defaultLabel={''}
                  thWidth={"13%"} tdSpan={3}
                  onChange={(text) => {}}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"참여인력"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  division label={"참여업체총수"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  division label={"중소기업수"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
              </TableRow>

              <TableRow>
                <TableTextFieldCell
                  division label={"중견기업수"} defaultLabel={''}
                  required thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  label={"기타"} defaultLabel={''}
                  thWidth={"13%"} tdSpan={3}
                  onChange={(text) => {}}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"신청예산 (단위: 천원)"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  division label={"총사업비"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  division label={"중소기업수"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
              </TableRow>

              <TableRow>
                <TableTextFieldCell
                  division label={"중견기업수"} defaultLabel={''}
                  required thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  label={"기타"} defaultLabel={''}
                  thWidth={"13%"} tdSpan={3}
                  onChange={(text) => {}}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"파일첨부"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
        <CustomButton type={"small"} color={"list"} label={"일괄 다운로드"} onClick={() => {
        }}/>
      </Stack>
      }>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  division label={"총사업비"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  division label={"중소기업수"} defaultLabel={''}
                  thWidth={"12%"} tdWidth={"38%"}
                  onChange={(text) => {}}
                />
              </TableRow>

              <TableRow>
                <TableTextFieldCell
                  division label={"중견기업수"} defaultLabel={''}
                  required thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {}}
                />
                <TableTextFieldCell
                  label={"기타"} defaultLabel={''}
                  thWidth={"13%"} tdSpan={3}
                  onChange={(text) => {}}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
    </Stack>

    <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1)
        }}
      />
      <Stack flexDirection={"row"} spacing={'30px'}>
        <CustomButton
          label={"반려"}
          onClick={async () => {
          }}
        />
         <CustomButton
          label={"보완요청"}
          onClick={async () => {
          }}
        />
        <CustomButton
          label={"승인"}
          onClick={async () => {
          }}
        />
      </Stack>
    </Stack>
  </Fragment>
}

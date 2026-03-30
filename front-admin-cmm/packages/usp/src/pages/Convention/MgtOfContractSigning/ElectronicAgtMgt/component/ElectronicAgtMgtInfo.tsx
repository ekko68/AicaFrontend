import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { SubContents } from "shared/components/LayoutComponents";
import { Stack, Table, TableBody, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { TableTextCell,  TableTextFieldCell, TableDateTermCell } from "shared/components/TableComponents";
import { CustomButton } from "~/components/ButtonComponents";
import { useNavigate } from "react-router-dom";
import { ElectronicAgtMgtService } from "~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt/Service/ElectronicAgtMgtService";

const ElectronicAgtMgtInfo = () => {
  const {id} = useParams();
 // const history = ElectronicAgtMgtService.getDetailInfo(id!.toString());

  const navigate = useNavigate()
  return <Fragment>
    <Stack spacing={"40px"}>
      <SubContents title={"협약상태"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"협약상태"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"협약서 정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"과제명"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableDateTermCell
                division label={"협약일자"}
                disableEndTime= {true}
                thWidth={"12%"} tdWidth={"38%"}
                onChange={(beginTime, endTime) => {
                  
                }}/>
                <TableTextCell
                  division title={""} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
              <TableRow>
                <TableDateTermCell
                division label={"협약기간"}
                thWidth={"12%"} tdWidth={"38%"}
                onChange={(beginTime, endTime) => {
                  
                }}/>
                <TableTextCell
                  division title={""} label={''}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  division title={"협약금액 (천원)"} label={''}
                  thWidth={"12%"}  tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  division title={"협약주제"} label={''}
                  thWidth={"12%"}  tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  division title={"참여기업"} label={''}
                  thWidth={"12%"}  tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  division title={"협약서 본문"} label={''}
                  thWidth={"12%"}  tdSpan={3}
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
      <SubContents title={"해지/환수정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"해지일"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"해지사유"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"상세내용"} label={''}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"환수대상금액"} label={''}
                  thWidth={"12%"} tdWidth={"21%"}
                />
                <TableTextCell
                  title={"환수완료액"} label={''}
                  thWidth={"12%"} tdWidth={"21%"}
                />
                <TableTextCell
                  title={"환수일자"} label={''}
                  thWidth={"12%"} tdWidth={"21%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"첨부파일"} rightContent={
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
    </Stack>
  </Fragment>
}

export default ElectronicAgtMgtInfo;
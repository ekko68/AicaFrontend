// 통계/로그/ ->  사용자현황 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {SubContents, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {
  dummyUserList,
  SearchParam,
  사용자현황,
} from "~/pages/OperationMgt/StatsLogs/Model/Model";
import {Box, Stack, Table, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents, TableDateTermCell, TableRadioCell,
  TableSelectCell, TableTextCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {
  SimpleTableComponents,
} from "~/pages/OperationMgt/StatsLogs/CompanyStatus";

function UserStatus() {

  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"사용자 현황"}>
    <VerticalInterval size={"40px"}/>
    <RealTimeList/>
    <VerticalInterval size={"40px"}/>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"40px"}/>
    <UserListView/>
  </TitleContents>
}

const RealTimeList = () => {

  return <Stack>
            <SubContents title={"현재 사용자 현황"}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextCell
                        division title={"총 회원"} label={"100"}
                        thWidth={"13%"}/>
                      <TableTextCell
                        division title={"일반 회원"} label={"72"}
                        thWidth={"13%"}/>
                      <TableTextCell
                        title={"불량 회원"} label={"5"}
                        thWidth={"13%"}/>
                    </TableRow>
                    <TableRow>
                      <TableTextCell
                        division title={"휴면 회원"} label={"3"}
                        thWidth={"13%"}/>
                      <TableTextCell
                        title={"탈퇴 회원"} label={"20"}
                        thWidth={"13%"} tdSpan={3}/>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SubContents>
  </Stack>
}


const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  const [search, setSearch] = useState(false)

  useEffect(() => {
    if (search) {
      props.setSearch(searchParam!)
      // if (props.onClick) props.onClick(searchParam!)
      setSearch(false)
    }
  }, [search])

  return <Stack>
    <SubContents title={'현황 조회'}>
    <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableDateTermCell
              division label={"기간"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작일: beginTime.getTime(), 종료일: endTime.getTime()})
              }}/>
            <TableRadioCell
              label={"조회기준"} radioLabel={["일", "월"]} row
              thWidth={"13%"} tdWidth={"36%"}/>
          </TableRow>
          <TableRow>
            <TableRadioCell
              label={"회원유형"} radioLabel={["전체", "개인", "개인사업자", "법인사업자", "대학"]} row
              thWidth={"13%"} tdSpan={5}/>
          </TableRow>
          <TableRow>
            <TableCell style={{textAlign: "center", borderBottom: "none"}} colSpan={4}>
              <CustomButton label={"검색"} onClick={() => {
                // if (searchKeyword == "분류") {
                //   setSearchParam({...searchParam, 이름: searchText})
                // }
                // // props.onClick(searchParam!)
                // setSearch(true);
              }}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </SearchTable>
    </TableContainer>
  </SubContents>
</Stack>
}

const UserListView: React.FC<{
  searchParam?: SearchParam

}> = props => {

  const [rowList, setRowList] = useState<WithCustomRowData<사용자현황>[]>(dummyUserList);

  return <SimpleTableComponents<사용자현황>
    // isLoading={dummyUserList.isLoading || dummyUserList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', margin: 0}}
        onClick={() => {

        }}/>
    </Stack>}

    headCells={headCells}
    bodyRows={rowList}
    tableCell={(data:WithCustomRowData<사용자현황>,i) => {
      return <Fragment>
        <TableCell key={"집게일-" + data.key} sx={{paddingLeft: "30px"}}>{data.집계일}</TableCell>
        <TableCell key={"누적회원수-" + data.key}>{data.누적회원수}</TableCell>
        <TableCell key={"신규회원수-" + data.key}>{data.신규회원수}</TableCell>
        <TableCell key={"탈퇴회원수-" + data.key}>{data.탈퇴회원수}</TableCell>
        <TableCell key={"휴면회원수-" + data.key}>{data.휴면회원수}</TableCell>
        <TableCell key={"정상회원수-" + data.key}>{data.정상회원수}</TableCell>
      </Fragment>
    }}
  />
}


const headCells: CustomHeadCell<사용자현황>[] = [
  {
    id: '집계일',
    align: "center",
    label: '집계일(일)',
  },
  {
    id: '누적회원수',
    align: "center",
    label: '누적 회원수(명)',
  },
  {
    id: '신규회원수',
    align: "center",
    label: '신규 회원수',
  },
  {
    id: '탈퇴회원수',
    align: "center",
    label: '탈퇴 회원수',
  },
  {
    id: '휴면회원수',
    align: "center",
    label: '휴면 회원수',
  },
  {
    id: '정상회원수',
    align: "center",
    label: '정상 회원수',
  },
];

export default UserStatus;
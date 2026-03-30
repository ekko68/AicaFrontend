// 통계/로그/ ->  사용자현황 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {dummyDemEquipUseList, SearchParam, 실증장비사용현황} from "~/pages/OperationMgt/StatsLogs/Model/Model";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents, TableDateTermCell, TableRadioCell,
  TableSelectCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {SimpleTableComponents} from "~/pages/OperationMgt/StatsLogs/CompanyStatus";

function UserStatus() {

  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"실증장비사용 현황"}>

    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"40px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
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

  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
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
  </Box>
}

const ListView: React.FC<{
  searchParam?: SearchParam
}> = props => {

  const [rowList, setRowList] = useState<WithCustomRowData<실증장비사용현황>[]>(dummyDemEquipUseList);

  return <SimpleTableComponents<실증장비사용현황>
    // isLoading={dummyDemEquipUseList.isLoading || dummyDemEquipUseList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', margin: 0}}
        onClick={() => {

        }}/>
    </Stack>}

    headCells={headCells}
    bodyRows={rowList}
    tableCell={(data:WithCustomRowData<실증장비사용현황>,i) => {
      return <Fragment>
        <TableCell key={"집게일-" + data.key} sx={{paddingLeft: "30px"}}>{data.집계일}</TableCell>
        <TableCell key={"견적신청-" + data.key}>{data.견적신청}</TableCell>
        <TableCell key={"사용신청-" + data.key}>{data.사용신청}</TableCell>
        <TableCell key={"승인-" + data.key}>{data.승인}</TableCell>
        <TableCell key={"사용중-" + data.key}>{data.사용중}</TableCell>
        <TableCell key={"사용종료-" + data.key}>{data.사용종료}</TableCell>
        <TableCell key={"사용장비수-" + data.key}>{data.사용장비수}</TableCell>
        <TableCell key={"반출장비수-" + data.key}>{data.반출장비수}</TableCell>
        <TableCell key={"반입장비수-" + data.key}>{data.반입장비수}</TableCell>
        <TableCell key={"사용총액-" + data.key}>{data.사용총액}</TableCell>
        <TableCell key={"미수금-" + data.key}>{data.미수금}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<실증장비사용현황 & {count: number}>[] = [
  {
    id: '집계일',
    align: "center",
    label: '집계일(일)',
  },
  {
    id: '견적신청',
    align: "center",
    label: '견적신청',
  },
  {
    id: '사용신청',
    align: "center",
    label: '사용신청',
  },
  {
    id: '승인',
    align: "center",
    label: '승인',
  },
  {
    id: '사용중',
    align: "center",
    label: '사용중',
  },
  {
    id: '사용종료',
    align: "center",
    label: '사용종료',
  },
  {
    id: '사용장비수',
    align: "center",
    label: '사용장비수',
  },
  {
    id: '반출장비수',
    align: "center",
    label: '반출장비수',
  },
  {
    id: '반입장비수',
    align: "center",
    label: '반입장비수',
  },
  {
    id: '사용총액',
    align: "center",
    label: '사용총액',
  },
  {
    id: '미수금',
    align: "center",
    label: '미수금',
  },
];

export default UserStatus;
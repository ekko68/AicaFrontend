// 통계/로그/ -> 사업지원현황 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {dummyCorpSupportList, SearchParam, 사업지원현황} from "~/pages/OperationMgt/StatsLogs/Model/Model";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents,
  TableSelectCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {SimpleTableComponents} from "~/pages/OperationMgt/StatsLogs/CompanyStatus";

function ProSupportStatus() {


  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"사업지원 현황"}>

    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [businessYear, setBusinessYear] = useState(["전체","2022"])
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
            <TableSelectCell
              division medium label={"사업연도"}
              thWidth={"12%"} tdWidth={"70%"}
              selectLabel={businessYear}
              defaultLabel={"2022"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 사업연도: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                // if (searchKeyword == "사업연도") {
                //   setSearchParam({...searchParam, 이름: searchText})
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
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<사업지원현황>[]>(dummyCorpSupportList);

  return <SimpleTableComponents<사업지원현황>
    // isLoading={dummyCorpSupprotList.isLoading || dummyCorpSupprotList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', margin: 0}}
        onClick={() => {

        }}/>
    </Stack>}

    headCells={headCells}
    bodyRows={rowList}
    tableCell={(data:WithCustomRowData<사업지원현황>,i) => {
      return <Fragment>
        <TableCell key={"유형-" + data.key} sx={{paddingLeft: "30px"}}>{data.유형}</TableCell>
        <TableCell key={"과제수-" + data.key}>{data.과제수}</TableCell>
        <TableCell key={"정부지원금-" + data.key}>{data.정부지원금}</TableCell>
        <TableCell key={"자가부담금-" + data.key}>{data.자가부담금}</TableCell>
        <TableCell key={"협약합계-" + data.key}>{data.협약합계}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<사업지원현황 & {count: number}>[] = [
  {
    id: '유형',
    align: "center",
    label: '유형',
  },
  {
    id: '과제수',
    align: "center",
    label: '과제수',
  },
  {
    id: '정부지원금',
    align: "center",
    label: '정부지원금',
  },
  {
    id: '자가부담금',
    align: "center",
    label: '자가부담금',
  },
  {
    id: '협약합계',
    align: "center",
    label: '협약 합계(정부지원금+자가부담금)',
  },
];

export default ProSupportStatus;
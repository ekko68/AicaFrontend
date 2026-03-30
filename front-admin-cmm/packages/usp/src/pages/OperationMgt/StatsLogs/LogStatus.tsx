// 통계/로그/ ->  로그현황 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {SubContents, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {
  dummyLogList,
  SearchParam, 로그현황,
} from "~/pages/OperationMgt/StatsLogs/Model/Model";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents, TableDateTermCell, TableRadioCell,
  TableSelectCell, TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {ResponsiveLine} from '@nivo/line'

function LogStatus() {

  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"로그 현황"}>

    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"30px"}/>
    <Loggraph/>
    <VerticalInterval size={"30px"}/>
    <SecondSearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"30px"}/>
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
            <TableRadioCell
              label={"회원유형"} radioLabel={["전체로그", "로그인로그", "에러로그"]} row
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
  </Box>
}




const Loggraph = () => {

  const line = [{
    "id": "connectCount",
    "data": [
      {
        "x": '2022-01',
        "y": 1000
      }, {
        "x": '2022-02',
        "y": 2000
      }, {
        "x": '2022-03',
        "y": 2100
      }, {
        "x": '2022-04',
        "y": 2400
      }, {
        "x": '2022-05',
        "y": 2100
      }, {
        "x": '2022-06',
        "y": 5000
      }, {
        "x": '2022-07',
        "y": 5500
      }, {
        "x": '2022-08',
        "y": 5400
      }, {
        "x": '2022-09',
        "y": 6000
      }, {
        "x": '2022-10',
        "y": 6500
      }, {
        "x": '2022-11',
        "y": 6200
      }, {
        "x": '2022-12',
        "y": 7000
      },
    ]
  }]


  return <Stack style={{alignItems:"center",  border: "1px solid #d7dae6",
    borderRadius: "20px", paddingTop:'30px'}}>
    <Stack style={{fontSize:"20px"}}>접속수</Stack>
    <Stack sx={{width: '100%', height: '280px'}}>
      {// @ts-ignore
        <ResponsiveLine
          data={line}
          margin={{top: 40, right: 80, bottom: 40, left: 80}}
        />}
    </Stack>
  </Stack>
}



const SecondSearchBox: React.FC<{
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

  return <SubContents title={"개인정보 로그"}>
  <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableDateTermCell
              division label={"조회기간"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작일: beginTime.getTime(), 종료일: endTime.getTime()})
              }}/>
            <TableTextFieldCell
              label={"작업자ID"} defaultLabel={""}
              thWidth={"12%"} tdWidth={"38%"} onChange={(text) => {
            }}
            />
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
  </SubContents>
}

const ListView: React.FC<{
  searchParam?: SearchParam
}> = props => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<로그현황>[]>(dummyLogList);

  return <TableComponents<로그현황>
    showTotal
    // isLoading={dummyLogList.isLoading || dummyLogList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', margin: 0}}
        onClick={() => {

        }}/>
    </Stack>}

    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data:WithCustomRowData<로그현황>,i) => {
      return <Fragment>
        <TableCell key={"시간-" + data.key} sx={{paddingLeft: "30px"}}>{data.시간}</TableCell>
        <TableCell key={"작업자-" + data.key}>{data.작업자}</TableCell>
        <TableCell key={"접속IP-" + data.key}>{data.접속IP}</TableCell>
        <TableCell key={"작업유형-" + data.key}>{data.작업유형}</TableCell>
        <TableCell key={"작업내용-" + data.key}>{data.작업내용}</TableCell>
        <TableCell key={"처리대상자-" + data.key}>{data.처리대상자}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<로그현황>[] = [
  {
    id: '시간',
    align: "center",
    label: '시간',
  },
  {
    id: '작업자',
    align: "center",
    label: '작업자',
  },
  {
    id: '접속IP',
    align: "center",
    label: '접속IP',
  },
  {
    id: '작업유형',
    align: "center",
    label: '작업유형',
  },
  {
    id: '작업내용',
    align: "center",
    label: '작업내용',
  },
  {
    id: '처리대상자',
    align: "center",
    label: '처리대상자',
  },
];

export default LogStatus;
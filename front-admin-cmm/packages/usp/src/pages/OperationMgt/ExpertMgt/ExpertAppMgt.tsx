// 전문가관리/ ->  전문가신청관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {HorizontalInterval, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable, TableComponents,
  TableDateTermCell,
  TableSelectCell,
  TableSelectTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {dayFormat} from "shared/utils/stringUtils";
import {dummyExpertList, SearchParam, 전문가신청리스트} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {ExpertMgtService} from "~/pages/OperationMgt/ExpertMgt/Service/ExpertMgtService";

function ExpertAppMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"전문가신청관리"}>
    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [eqpmnStatus, setEqpmnStatus] = useState(["전체", "신청", "반려", "승인"]);
  const [searchParam, setSearchParam] = useState<SearchParam>()
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchText, setSearchText] = useState("")
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
              division medium label={"처리 상태"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 처리상태: selected})
              }}/>
            <TableDateTermCell
              label={"신청일"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작일: beginTime.getTime(), 종료일: endTime.getTime()})
              }}/>
          </TableRow>
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={["자산번호", "모델명"]}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                setSearchKeyword(selected)
                setSearchText("")
                setSearchParam({...searchParam, 이름: "", 직장명: ""})
              }}
              onChange={(text: string) => {
                setSearchText(text)
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                if (searchKeyword == "이름") {
                  setSearchParam({...searchParam, 이름: searchText})
                } else if (searchKeyword == "직장명") {
                  setSearchParam({...searchParam, 직장명: searchText})
                }
                // props.onClick(searchParam!)
                // searchParam을 검색시 적용하기 떄문에 useEffect에서 검색되도록 함.
                setSearch(true);
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
  const [rowList, setRowList] = useState<WithCustomRowData<전문가신청리스트>[]>(dummyExpertList);
  const navigation = useNavigate();
  // const experList = ExpertMgtService.getList({...pagination, ...props.searchParam});
  // useEffect(() => {
  //   if (!experList.isLoading || !experList.isFetching) {
  //     if (!!experList.data) {
  //       setRowList(experList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: information.data.totalItems}))
  //     }
  //   }
  // }, [information.data, information.isLoading, information.isFetching])

  return <TableComponents<전문가신청리스트>
    showTotal
    // isLoading={experList.isLoading || experList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={() => {
          // const res = await ExpertMgtService.getExpertReqExcelDownload()
          // const blob = new Blob([res]);
          // const fileObjectUrl = window.URL.createObjectURL(blob);
          // const link = document.createElement("a");
          // link.href = fileObjectUrl;
          // link.setAttribute(
          //   "download",
          //   `전문가신청관리.xlsx`
          // );
          // document.body.appendChild(link);
          // link.click();
        }}/>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/OperationMgt/ExpertMgt/ExpertAppMgt/' + key);
    }}
    tableCell={(data: WithCustomRowData<전문가신청리스트>, i) => {
      return <Fragment>
        <TableCell key={"번호-" + data.key} sx={{paddingLeft: "30px"}}>{i + 1}</TableCell>
        <TableCell key={"처리상태-" + data.key} sx={{paddingLeft: "30px"}}>{data.처리상태}</TableCell>
        <TableCell key={"이름-" + data.key}>{data.이름}</TableCell>
        <TableCell key={"직장명-" + data.key}>{data.직장명}</TableCell>
        <TableCell key={"직위-" + data.key}>{data.직위}</TableCell>
        <TableCell key={"신청일-" + data.key}>{dayFormat(data.신청일)}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<전문가신청리스트 & { count: number }>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: '처리상태',
    align: "center",
    label: '처리상태',
  },
  {
    id: '이름',
    align: "center",
    label: '이름',
  },
  {
    id: '직장명',
    align: "center",
    label: '직장명',
  },
  {
    id: '직위',
    align: "center",
    label: '직위',
  },
  {
    id: '신청일',
    align: "center",
    label: '신청일',
  },
];
export default ExpertAppMgt;
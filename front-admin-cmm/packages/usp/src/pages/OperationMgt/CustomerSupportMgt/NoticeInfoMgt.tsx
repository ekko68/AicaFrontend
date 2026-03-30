import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {HorizontalInterval, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable, TableComponents,
  TableDateTermCell,
  TableSelectCell,
  TableSelectTextFieldCell, TableTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {dummyNoticeList, SearchParam, 공지사항} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";



function NoticeInfoMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"공지사항 관리"}>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"40px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [exhibition, setExhibition] = useState(["전체","전시","전시안함"])
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
              division medium label={"전시여부"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={exhibition}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 전시여부: selected})
              }}/>
            <TableDateTermCell
              division label={"등록일"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작일: beginTime.getTime(), 종료일: endTime.getTime()})
              }}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell
              label={"제목"} defaultLabel={""} tdSpan={3}
              thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
            }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                // if (searchKeyword == "분류") {
                //   setSearchParam({...searchParam, 이름: searchText})
                // } else if (searchKeyword == "전시여부") {
                //   setSearchParam({...searchParam, 직장명: searchText})
                // } else if (searchKeyword == "제목명") {
                //   setSearchParam({...searchParam, 직장명: searchText})
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
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<공지사항>[]>(dummyNoticeList);
  const navigation = useNavigate();
  // const NoticeList = NoticeInfoMgtService.getList({...pagination, ...props.searchParam});
  // useEffect(() => {
  //   if (!NoticeList.isLoading || !NoticeList.isFetching) {
  //     if (!!NoticeList.data) {
  //       setRowList(NoticeList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: information.data.totalItems}))
  //     }
  //   }
  // }, [information.data, information.isLoading, information.isFetching])

  return <TableComponents<공지사항>
    showTotal
    // isLoading={NoticeList.isLoading || NoticeList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomButton
        label={"등록"}
        type={"small"}
        color={"list"}
        onClick={async () => {
          navigation('/OperationMgt/CustomerSupportMgt/NoticeInfoMgt/NoticeInfoMgtRegi')
        }}
      />
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={() => {
      navigation('/OperationMgt/CustomerSupportMgt/NoticeInfoMgt/NoticeInfoMgtDetail');
    }}
    tableCell={(data:WithCustomRowData<공지사항>,i) => {
      return <Fragment>
        <TableCell key={"번호-" + data.key} sx={{paddingLeft: "30px"}}>{i+1}</TableCell>
        <TableCell key={"전시여부-" + data.key} sx={{paddingLeft: "30px"}}>{data.전시여부}</TableCell>
        <TableCell key={"제목-" + data.key}>{data.제목}</TableCell>
        <TableCell key={"고정여부-" + data.key}>{data.고정여부}</TableCell>
        <TableCell key={"등록일-" + data.key}>{data.등록일}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<공지사항 & {count: number}>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: '전시여부',
    align: "center",
    label: '전시여부',
  },
  {
    id: '제목',
    align: "center",
    label: '제목',
  },
  {
    id: '고정여부',
    align: "center",
    label: '고정여부',
  },
  {
    id: '등록일',
    align: "center",
    label: '등록일',
  },
];
export default NoticeInfoMgt;
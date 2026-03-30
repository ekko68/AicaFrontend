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
import {SearchParam, 자료실,
  dummyArchiveList
} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";



function ArchiveMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"자료실 관리"}>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"40px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [classify, setClassify] = useState(["전체","미전체"]);
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
              division medium label={"분류"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={classify}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 분류: selected})
              }}/>
            <TableSelectCell
              medium label={"전시여부"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={exhibition}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 전시여부: selected})
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
  const [rowList, setRowList] = useState<WithCustomRowData<자료실>[]>(dummyArchiveList);
  const navigation = useNavigate();
  // const ArchiveList = ArchiveMgtService.getList({...pagination, ...props.searchParam});
  // useEffect(() => {
  //   if (!ArchiveList.isLoading || !ArchiveList.isFetching) {
  //     if (!!ArchiveList.data) {
  //       setRowList(ArchiveList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: information.data.totalItems}))
  //     }
  //   }
  // }, [information.data, information.isLoading, information.isFetching])

  return <TableComponents<자료실>
    showTotal
    // isLoading={ArchiveList.isLoading || ArchiveList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomButton
        label={"등록"}
        type={"small"}
        color={"list"}
        onClick={async () => {
          navigation('/OperationMgt/CustomerSupportMgt/ArchiveMgt/ArchiveMgtRegi')
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
      navigation('/OperationMgt/CustomerSupportMgt/ArchiveMgt/ArchiveMgtDetail');
    }}
    tableCell={(data:WithCustomRowData<자료실>,i) => {
      return <Fragment>
        <TableCell key={"번호-" + data.key} sx={{paddingLeft: "30px"}}>{i+1}</TableCell>
        <TableCell key={"분류-" + data.key} sx={{paddingLeft: "30px"}}>{data.분류}</TableCell>
        <TableCell key={"제목-" + data.key}>{data.제목}</TableCell>
        <TableCell key={"전시여부-" + data.key}>{data.전시여부}</TableCell>
        <TableCell key={"등록일-" + data.key}>{data.등록일}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<자료실 & {count: number}>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: '분류',
    align: "center",
    label: '분류',
  },
  {
    id: '제목',
    align: "center",
    label: '제목',
  },
  {
    id: '전시여부',
    align: "center",
    label: '전시여부',
  },
  {
    id: '등록일',
    align: "center",
    label: '등록일',
  },
];
export default ArchiveMgt;
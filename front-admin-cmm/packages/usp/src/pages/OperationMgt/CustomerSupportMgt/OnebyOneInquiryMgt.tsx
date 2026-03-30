import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents,
  TableSelectCell,
  TableSelectTextFieldCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {
  SearchParam, OneByOne문의, dummyOneByOneList
} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

function OnebyOneInquiryMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"1:1문의 관리"}>
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
              medium label={"처리상태"} division
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={exhibition}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 처리상태: selected})
              }}/>
            <TableSelectCell
              medium label={"문의구분"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={classify}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 문의구분: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={["전체", "제목","회원명"]}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                // setSearchKeyword(selected)
                // setSearchText("")
                // setSearchParam({...searchParam, assetsNo: '', modelNm: ''})
              }}
              onChange={(text: string) => {
                setSearchText(text)
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                // if (searchKeyword == "제목") {
                //   setSearchParam({...searchParam, 이름: searchText})
                // } else if (searchKeyword == "회원명") {
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
  const [rowList, setRowList] = useState<WithCustomRowData<OneByOne문의>[]>(dummyOneByOneList);
  const navigation = useNavigate();
  // const OnebyOneInquiryList = OnebyOneInquiryService.getList({...pagination, ...props.searchParam});
  // useEffect(() => {
  //   if (!OnebyOneInquiryList.isLoading || !OnebyOneInquiryList.isFetching) {
  //     if (!!OnebyOneInquiryList.data) {
  //       setRowList(OnebyOneInquiryList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: information.data.totalItems}))
  //     }
  //   }
  // }, [information.data, information.isLoading, information.isFetching])

  return <TableComponents<OneByOne문의>
    showTotal
    // isLoading={OnebyOneInquiryList.isLoading || OnebyOneInquiryList.isFetching}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={() => {
      navigation('/OperationMgt/CustomerSupportMgt/OnebyOneInquiryMgt/OnebyOneInquiryMgtDetail');
    }}
    tableCell={(data:WithCustomRowData<OneByOne문의>,i) => {
      return <Fragment>
        <TableCell key={"번호-" + data.key} sx={{paddingLeft: "30px"}}>{i+1}</TableCell>
        <TableCell key={"처리상태-" + data.key} sx={{paddingLeft: "30px"}}>{data.처리상태}</TableCell>
        <TableCell key={"문의구분-" + data.key}>{data.문의구분}</TableCell>
        <TableCell key={"제목-" + data.key}>{data.제목}</TableCell>
        <TableCell key={"회원명-" + data.key}>{data.회원명}</TableCell>
        <TableCell key={"담당자-" + data.key}>{data.담당자}</TableCell>
        <TableCell key={"접수일-" + data.key}>{data.접수일}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<OneByOne문의 & {count: number}>[] = [
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
    id: '문의구분',
    align: "center",
    label: '문의구분',
  },
  {
    id: '제목',
    align: "center",
    label: '제목',
  },
  {
    id: '회원명',
    align: "center",
    label: '회원명',
  },
  {
    id: '담당자',
    align: "center",
    label: '담당자',
  },
  {
    id: '접수일',
    align: "center",
    label: '접수일',
  },
];
export default OnebyOneInquiryMgt;
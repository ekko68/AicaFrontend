// 만족도조사관리/ ->  만족도조사관리 페이지
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
import {dayFormat} from "shared/utils/stringUtils";
import {dummySurveyList, SearchParam, 만족도조사리스트, 진행상태, 포털구분} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";

function SatisfaSurveyMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={'만족도조사관리'}>
    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [portal, setPortal] = useState(["전체"].concat(포털구분))
  const [processStatus, setProcessStatus] = useState(["전체"].concat(진행상태))

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
              division medium label={"포털구분"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={portal}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 포털구분: selected})
              }}/>
            <TableSelectCell
              division medium label={"진행상태"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={processStatus}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 진행상태: selected})
              }}/>
          </TableRow>

          <TableRow>
            <TableDateTermCell
              division label={"신청일"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작일: beginTime.getTime(), 종료일: endTime.getTime()})
              }}/>
            <TableTextFieldCell
              label={"설문지명"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(text: string) => {
                setSearchParam({...searchParam, 설문자명: text})
              }}/>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
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
  const [rowList, setRowList] = useState<WithCustomRowData<만족도조사리스트>[]>(dummySurveyList);
  const navigation = useNavigate();
  // const surveyList = SatisfaSurveyMgtService.getList({...pagination, ...props.searchParam});
  // useEffect(() => {
  //   if (!surveyList.isLoading || !surveyList.isFetching) {
  //     if (!!surveyList.data) {
  //       setRowList(surveyList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: information.data.totalItems}))
  //     }
  //   }
  // }, [surveyList.data, surveyList.isLoading, surveyList.isFetching])

  return <TableComponents<만족도조사리스트>
    showTotal
    // isLoading={experList.isLoading || experList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomButton
        label={"등록"} type={"small"} color={"list"}
        onClick={() => {
          navigation('/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt/SurveyRegister')
        }}
      />
      <HorizontalInterval size={'10px'}/>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={() => {

        }}/>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt/' + key)
    }}
    tableCell={(data:WithCustomRowData<만족도조사리스트>,i) => {
      return <Fragment>
        <TableCell key={"번호-" + data.key} sx={{textAlign: 'center'}}>{i+1}</TableCell>
        <TableCell key={"진행상태-" + data.key} sx={{textAlign: 'center'}}>{data.진행상태}</TableCell>
        <TableCell key={"설문지명-" + data.key} sx={{textAlign: 'center'}}>{data.설문지명}</TableCell>
        <TableCell key={"포털구분-" + data.key} sx={{textAlign: 'center'}}>{data.포털구분}</TableCell>
        <TableCell key={"시작일-" + data.key} sx={{textAlign: 'center'}}>{dayFormat(data.시작일)}</TableCell>
        <TableCell key={"종료일-" + data.key} sx={{textAlign: 'center'}}>{dayFormat(data.종료일)}</TableCell>
        <TableCell key={"사용-" + data.key} sx={{textAlign: 'center'}}>{data.사용? '사용':'미사용'}</TableCell>
        <TableCell key={"중복응답-" + data.key} sx={{textAlign: 'center'}}>{data.중복응답? '허용':'불가'}</TableCell>
        <TableCell key={"등록일-" + data.key} sx={{textAlign: 'center'}}>{dayFormat(data.등록일)}</TableCell>
      </Fragment>
    }}
  />
}

const headCells: CustomHeadCell<만족도조사리스트 & {count: number}>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: '진행상태',
    align: "center",
    label: '진행상태',
  },
  {
    id: '설문지명',
    align: "center",
    label: '설문지명',
  },
  {
    id: '포털구분',
    align: "center",
    label: '포털구분',
  },
  {
    id: '시작일',
    align: "center",
    label: '시작일',
  },
  {
    id: '종료일',
    align: "center",
    label: '종료일',
  },
  {
    id: '사용',
    align: "center",
    label: '사용',
  },
  {
    id: '중복응답',
    align: "center",
    label: '중복응답',
  },
  {
    id: '등록일',
    align: "center",
    label: '등록일',
  },
];

export default SatisfaSurveyMgt;
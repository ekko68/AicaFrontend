// 사이트관리/ ->  홈배너관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {HorizontalInterval, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {검색파라미터, 홈배너목록조회, 홈팝업창목록조회} from "~/pages/OperationMgt/SiteMgt/Model";
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {
  CustomHeadCell,
  SearchTable, TableComponents,
  TableDateTermCell,
  TableSelectCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {dayFormat} from "shared/utils/stringUtils";

function HomeBannerMgt() {
  const [searchParam, setSearchParam] = useState<검색파라미터>()
  return <TitleContents title={'홈배너관리'}>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}
const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<검색파라미터 | undefined>>
}> = props => {
  //const {commtCode} = useCommtCode(["EQPMN_REQST_ST"])
  const [eqpmnStatus, setEqpmnStatus] = useState(['전체']);
  const [searchParam, setSearchParam] = useState<검색파라미터>()
  const [search, setSearch] = useState(false)

  useEffect(() => {
    if (search) {
      props.setSearch(searchParam!)
      setSearch(false)
    }
  }, [search])

  /*useEffect(() => {
    if (!!commtCode){
      const state = CommtCodeNms(commtCode, 'EQPMN_REQST_ST')
      if (state.length > 0) setEqpmnStatus(['전체'].concat(state))
    }
  }, [commtCode])*/


  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableSelectCell
              division label={"전시여부"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 전시여부: selected})
              }}/>
            <TableDateTermCell
              label={'전시기간'}
              thWidth={'12%'} tdWidth={'38%'}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 전시시작일: beginTime.getTime(), 전시종료일: endTime.getTime()})
              }}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell thWidth={"12%"} tdWidth={"38%"} tdSpan={3} label={'배너명'} onChange={(text: string) => {
              setSearchParam({...searchParam, 배너명: text})
            }}/>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                setSearch(true)
              }}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </SearchTable>
    </TableContainer>
  </Box>
}

const ListView: React.FC<{
  searchParam?: 검색파라미터
}> = props => {
  //const {commtCode} = useCommtCode(["EQPMN_REQST_ST",'EQPMN_PAYMENT'])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<홈배너목록조회>[]>(tempData);
  //const information = EquipmentService.getEquipApplyList({...pagination, ...props.searchParam});
  const navigation = useNavigate();

  /*useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        setRowList(information.data.list.map((m) => {
          return {
            key: m.reqstID,
            ...m
          }
        }));
        setPagination((state) => ({...state, rowCount: information.data.totalItems}))
      }
    }
  }, [information.data, information.isLoading, information.isFetching])*/

  return <TableComponents<홈배너목록조회>
    showTotal
    //isLoading={information.isLoading || information.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomButton label={'등록'} type={"small"} color={'list'} onClick={() => {
        navigation('/OperationMgt/SiteMgt/HomeBannerMgt/Apply')
      }}/>
      <HorizontalInterval size={'20px'}/>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          /*const res = await EquipmentService.getApplyEquipExcelDownload()
          const blob = new Blob([res]);
          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.setAttribute(
            "download",
            `장비신청관리_리스트.xlsx`
          );
          document.body.appendChild(link);
          link.click();*/
        }}/>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/OperationMgt/SiteMgt/HomeBannerMgt/' + key);
    }}
    tableCell={(data) => {
      /*let reqstSttus = ''
      let pymntMth = ''
      if (commtCode && data) {
        reqstSttus = toCommtCodeName(commtCode, "EQPMN_REQST_ST", data.reqstSttus)
        pymntMth = toCommtCodeName(commtCode, "EQPMN_PAYMENT", data.pymntMth)
      }*/

      return (
        <Fragment>
          <TableCell sx={{textAlign: 'center'}} key={"배너명-" + data.key}>{data.배너명}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"전시시작일-" + data.key}>{dayFormat(data.전시시작일)}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"전시종료일-" + data.key}>{dayFormat(data.전시종료일)}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"전시여부-" + data.key}>{data.전시여부}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"등록일-" + data.key}>{dayFormat(data.등록일)}</TableCell>
        </Fragment>
      )
    }}
  />
}

const headCells: CustomHeadCell<홈배너목록조회>[] = [
  {
    id: '배너명',
    align: 'center',
    label: '배너명',
  },
  {
    id: '전시시작일',
    align: "center",
    label: '전시시작일',
  },
  {
    id: '전시종료일',
    align: "center",
    label: '전시종료일',
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

const tempData: WithCustomRowData<홈배너목록조회>[] =
  [{
    key: 'id-1234',
    배너명: '배너명 출력',
    전시시작일: Date.now(),
    전시종료일: Date.now(),
    전시여부: '홍길동',
    등록일: Date.now()
  }, {
    key: 'id-1235',
    배너명: '배너명 출력',
    전시시작일: Date.now(),
    전시종료일: Date.now(),
    전시여부: '홍길동',
    등록일: Date.now()
  }]

export default HomeBannerMgt;
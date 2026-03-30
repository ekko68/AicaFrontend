// 참여/이벤트관리/ ->  자원정보공유관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {디딤널목록조회, SearchParam, 자원정보공유목록조회} from "~/pages/OperationMgt/ParticipationEventMgt/Model";
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents, TableDateTermCell,
  TableSelectCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {dayFormat} from "shared/utils/stringUtils";

function ResourceInfmtSharMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return <TitleContents title={'자원정보공유 관리'}>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  //const {commtCode} = useCommtCode(["EQPMN_REQST_ST"])
  const [eqpmnStatus, setEqpmnStatus] = useState(['전체']);
  const [searchParam, setSearchParam] = useState<SearchParam>()
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
                setSearchParam({...searchParam, 처리상태: selected})
              }}/>
            <TableDateTermCell
              label={"등록일"} tdSpan={3}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작시간: beginTime.getTime(), 종료시간: endTime.getTime()})
              }}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell division thWidth={"12%"} tdWidth={"38%"} label={'제목'} onChange={(text: string) => {
              setSearchParam({...searchParam, 제목: text})
            }}/>
            <TableTextFieldCell thWidth={"12%"} tdWidth={"38%"} label={'이름,사업자명'} onChange={(text: string) => {
              setSearchParam({...searchParam, 회원명: text})
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
  searchParam?: SearchParam
}> = props => {
  //const {commtCode} = useCommtCode(["EQPMN_REQST_ST",'EQPMN_PAYMENT'])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<자원정보공유목록조회>[]>(tempData);
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

  return <TableComponents<자원정보공유목록조회>
    showTotal
    //isLoading={information.isLoading || information.isFetching}
    rightContent={<Stack flexDirection={"row"}>
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
      navigation('/OperationMgt/ParticipationEventMgt/ResourceInfmtSharMgt/' + key);
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
          <TableCell sx={{textAlign: 'center'}} key={"문의구분-" + data.key}>{data.전시여부}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"제목-" + data.key}>{data.제목}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"회원명-" + data.key}>{data.회원명}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"접수일-" + data.key}>{dayFormat(data.등록일)}</TableCell>
        </Fragment>
      )
    }}
  />
}

const headCells: CustomHeadCell<자원정보공유목록조회>[] = [
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
    id: '회원명',
    align: "center",
    label: '회원명',
  },
  {
    id: '등록일',
    align: "center",
    label: '등록일',
  },
];

const tempData: WithCustomRowData<자원정보공유목록조회>[] =
  [{
    key: 'id-1234',
    전시여부: '전시',
    제목: 'AI 기반의 헬스케어 웨어러블 기기 관련',
    회원명: '홍길동',
    등록일: Date.now()
  }, {
    key: 'id-1235',
    전시여부: '전시안함',
    제목: '00 프로젝트에 참여할 인력 필요',
    회원명: '(주)블루레몬',
    등록일: Date.now()
  }]


export default ResourceInfmtSharMgt;
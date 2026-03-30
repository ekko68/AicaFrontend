// 참여/이벤트관리/ ->  디딤널관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {
  CustomHeadCell,
  SearchTable,
  TableComponents,
  TableSelectCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {useNavigate} from "react-router-dom";
import {dayFormat} from "shared/utils/stringUtils";
import {디딤널목록조회, SearchParam} from "~/pages/OperationMgt/ParticipationEventMgt/Model";

function StepMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return (
    <TitleContents title={'디딤널 관리'}>
      <SearchBox setSearch={setSearchParam}/>
      <VerticalInterval size={"30px"}/>
      <ListView searchParam={searchParam}/>
    </TitleContents>
  );
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
              division label={"처리 상태"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 처리상태: selected})
              }}/>
            <TableSelectCell
              label={"문의 구분"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 문의구분: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell division thWidth={"12%"} tdWidth={"38%"} label={'제목'} onChange={(text: string) => {
              setSearchParam({...searchParam, 제목: text})
            }}/>
            <TableTextFieldCell thWidth={"12%"} tdWidth={"38%"} label={'회원명'} onChange={(text: string) => {
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
  const [rowList, setRowList] = useState<WithCustomRowData<디딤널목록조회>[]>(tempData);
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

  return <TableComponents<디딤널목록조회>
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
      navigation('/OperationMgt/ParticipationEventMgt/StepMgt/' + key);
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
          <TableCell sx={{textAlign: 'center'}} key={"처리상태-" + data.key}>{data.처리상태}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"문의구분-" + data.key}>{data.문의구분}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"제목-" + data.key}>{data.제목}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"회원명-" + data.key}>{data.회원명}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"담당자-" + data.key}>{data.담당자}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"접수일-" + data.key}>{dayFormat(data.접수일)}</TableCell>
        </Fragment>
      )
    }}
  />
}

const headCells: CustomHeadCell<디딤널목록조회>[] = [
  {
    id: '처리상태',
    align: 'center',
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

const tempData: WithCustomRowData<디딤널목록조회>[] =
  [{
    key: 'id-1234',
    처리상태: '접수',
    문의구분: '창업아이디어',
    제목: 'AI 기반의 헬스케어 웨어러블 기기 관련',
    회원명: '홍길동',
    담당자: '김원희',
    접수일: Date.now()
  }, {
    key: 'id-1235',
    처리상태: '답변완료',
    문의구분: '구인/구직',
    제목: '00 프로젝트에 참여할 인력 필요',
    회원명: '(주)블루레몬',
    담당자: '김원희',
    접수일: Date.now()
  }]


export default StepMgt;
// 회원관리/ ->  회원관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {SearchParam, 행사이벤트관리목록조회} from "~/pages/OperationMgt/ParticipationEventMgt/Model";
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {
  CustomHeadCell,
  SearchTable, TableComponents, TableDateCell,
  TableDateTermCell, TableRadioCell,
  TableSelectCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {회원관리검색목록, 회원관리목록조회} from "~/pages/OperationMgt/MemberMgt/Model";
import {dayFormat} from "shared/utils/stringUtils";

function MemberMgt() {
  const [searchParam, setSearchParam] = useState<회원관리검색목록>()
  return <TitleContents title={'회원관리'}>
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
  const [searchParam, setSearchParam] = useState<회원관리검색목록>()
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
              division label={"회원유형"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 회원유형: selected})
              }}/>
            <TableDateCell label={'가입일'} thWidth={'12%'} tdWidth={'38%'}
                           onChange={date => setSearchParam({...searchParam, 가입일: date.getTime()})}
            />
            {/*<TableDateTermCell
              label={'가입일'} tdSpan={3}
              thWidth={'12%'} tdWidth={'38%'}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, 시작시간: beginTime.getTime(), 종료시간: endTime.getTime()})
              }}/>*/}
          </TableRow>
          <TableRow>
            <TableRadioCell
              row division label={"회원상태"} radioLabel={['전체', '정상', '불량회원']}
              thWidth={"12%"} tdWidth={"38%"} defaultLabel={"전체"}
              onClick={(selected) => {
                setSearchParam({...searchParam, 회원상태: selected})
              }}/>
            <TableRadioCell
              row label={"강사여부"} radioLabel={['전체', '강사아님', '강사']}
              thWidth={"12%"} tdWidth={"38%"} defaultLabel={"전체"}
              onClick={(selected) => {
                setSearchParam({...searchParam, 강사여부: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell division label={'아이디'} thWidth={"12%"} tdWidth={"38%"}
            onChange={text => setSearchParam({...searchParam, 아이디:text})}/>
            <TableTextFieldCell label={'회원명'} thWidth={"12%"} tdWidth={"38%"}
                                onChange={text => setSearchParam({...searchParam, 회원명:text})}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell label={'사업자등록번호'} thWidth={"12%"} tdWidth={"38%"} tdSpan={3}
                                onChange={text => setSearchParam({...searchParam, 사업자등록번호:text})}/>
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
  const [rowList, setRowList] = useState<WithCustomRowData<회원관리목록조회>[]>(tempData);
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

  return <TableComponents<회원관리목록조회>
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
      navigation('/OperationMgt/MemberMgt/MemberMgt/' + key);
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
          <TableCell sx={{textAlign: 'center'}} key={"아이디-" + data.key}>{data.아이디}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"회원명-" + data.key}>{data.회원명}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"회원유형-" + data.key}>{data.회원유형}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"대표자명-" + data.key}>{data.대표자명}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"사업자등록번호-" + data.key}>{data.사업자등록번호}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"강사여부-" + data.key}>{data.강사여부}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"회원상태-" + data.key}>{data.회원상태}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"가입일시-" + data.key}>{dayFormat(data.가입일시)}</TableCell>
        </Fragment>
      )
    }}
  />
}

const headCells: CustomHeadCell<회원관리목록조회>[] = [
  {
    id: '아이디',
    align: 'center',
    label: '아이디',
  },
  {
    id: '회원명',
    align: "center",
    label: '회원명',
  },
  {
    id: '회원유형',
    align: "center",
    label: '회원유형',
  },
  {
    id: '대표자명',
    align: "center",
    label: '대표자명',
  },
  {
    id: '사업자등록번호',
    align: "center",
    label: '사업자등록번호',
  },
  {
    id: '강사여부',
    align: "center",
    label: '강사여부',
  },
  {
    id: '회원상태',
    align: "center",
    label: '회원상태',
  },
  {
    id: '가입일시',
    align: "center",
    label: '가입일시',
  },
];

const tempData: WithCustomRowData<회원관리목록조회>[] =
  [{
    key: 'id-1234',
    아이디: 'ab1234',
    회원명: '홍길동',
    회원유형: '개인',
    대표자명: '-',
    사업자등록번호: '-',
    강사여부: '강사아님',
    회원상태: '정상',
    가입일시: Date.now()
  }, {
    key: 'id-1235',
    아이디: 'ab1235',
    회원명: '홍홍길동',
    회원유형: '개인사업자',
    대표자명: '김*동',
    사업자등록번호: '111-11-111111',
    강사여부: '강사',
    회원상태: '정상',
    가입일시: Date.now()
  }]

export default MemberMgt;
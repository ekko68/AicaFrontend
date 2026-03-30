import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react'
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {EqpmnUseList, SearchParam} from "~/service/Model";
import {
  CustomHeadCell,
  SearchTable, TableComponents,
  TableDateTermCell, TableRadioCell,
  TableSelectCell,
  TableSelectTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {dayFormat} from "shared/utils/stringUtils";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {useCommtCode} from "~/utils/useCommtCode";
import {CommtCodeNms, toCommtCodeName} from "~/utils/CommtCodeUtil";

/* 장비 사용 관리 */
const UseEquipmentMgt = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"장비 사용 관리"}>
    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>

  </TitleContents>
}
const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const {commtCode} = useCommtCode(["EQPMN_USAGE_ST"])
  const [eqpmnStatus, setEqpmnStatus] = useState(["전체"]);
  const [searchParam, setSearchParam] = useState<SearchParam>()
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchText, setSearchText] = useState("")
  const [search, setSearch] = useState(false)

  useEffect(() => {
    if (search) {
      props.setSearch(searchParam!)
      setSearch(false)
    }
  }, [search])

  useEffect(() => {
    if (!!commtCode) {
      const state = CommtCodeNms(commtCode, 'EQPMN_USAGE_ST')
      if (state.length > 0) setEqpmnStatus(['전체'].concat(state))
    }
  }, [commtCode])

  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableSelectCell
              label={"사용상태"}
              thWidth={"12%"} tdWidth={"38%"} tdSpan={3}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                setSearchParam({...searchParam, eqpmnSttus: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableDateTermCell
              division type={"Date"} label={"사용일"} thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, useBeginDt: beginTime.getTime(), useEndDt: endTime.getTime()})
              }}
            />
            <TableRadioCell
              row label={"반출여부"} radioLabel={["전체", "반출", "미반출"]}
              thWidth={"12%"} tdWidth={"38%"} defaultLabel={"전체"}
              onClick={(selected) => {
                let tkout: boolean | undefined;
                if (selected === "반출") tkout = true
                else if (selected === "미반출") tkout = false
                else tkout = undefined
                setSearchParam({...searchParam, tkoutAt: tkout})
              }}/>
          </TableRow>
          <TableRow>
            <TableRadioCell
              division row label={"반입여부"} radioLabel={["전체", "반입전", "반입완료"]}
              thWidth={"12%"} tdWidth={"38%"} defaultLabel={"전체"}
              onClick={(selected) => {
                let tkin: boolean | undefined = undefined;
                if (selected === "반입전") tkin = true
                else if (selected === "반입완료") tkin = false
                else tkin = undefined
                setSearchParam({...searchParam, tkinAt: tkin})
              }}/>
            <TableRadioCell
              row label={"지불방법"} radioLabel={["전체", "후납", "선납"]}
              thWidth={"12%"} tdWidth={"38%"} defaultLabel={"전체"}
              onClick={(selected) => {
                setSearchParam({...searchParam, pymntMth: selected})
              }}/>
          </TableRow>

          {/*<TableDateTermCell
                type={"Date"} label={"사용종료일"} thWidth={"12%"} tdWidth={"38%"}
                onChange={(beginTime, endTime) => {
                }}
            />*/}
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={['자산번호', '사업자명/이름', '접수번호', '장비명']}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                setSearchKeyword(selected)
                setSearchText("")
                setSearchParam({...searchParam, assetsNo: "", modelNm: ""})
              }}
              onChange={(text: string) => {
                setSearchText(text)
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                switch (searchKeyword) {
                  case "자산번호":
                    setSearchParam({...searchParam, assetsNo: searchText})
                    break;
                  case "사업자명/이름":
                    setSearchParam({...searchParam, entrprsNm: searchText})
                    break;
                  case "접수번호":
                    setSearchParam({...searchParam, rceptNo: searchText})
                    break;
                  case "장비명":
                    setSearchParam({...searchParam, eqpmnNmKorean: searchText})
                    break;
                }
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
  const {commtCode} = useCommtCode(["EQPMN_USAGE_ST",'EQPMN_PAYMENT'])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<EqpmnUseList>[]>([]);

  // const clone = {...props.searchParam};
  // const {tkoutAt, ...rest} = clone;
  // const queries = {...rest, ...tkoutAt !== undefined && {tkoutAt}};

  const information = EquipmentService.getEquipUseList({...pagination, ...props.searchParam});
  const navigation = useNavigate();

  useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        console.log('information - ' + JSON.stringify(information.data))
        setRowList(information.data.list.map((m) => {
          return {
            key: m.reqstID,
            ...m
          }
        }));
        setPagination((state) => ({...state, rowCount: information.data.totalItems}))
      }
    }
  }, [information.data, information.isLoading, information.isFetching])
//
  return <TableComponents<EqpmnUseList>
    showTotal
    isLoading={information.isLoading || information.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          const res = await EquipmentService.getUseExcelDownload();
          const blob = new Blob([res]);
          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.setAttribute(
            "download",
            `장비사용관리_리스트.xlsx`
          );
          document.body.appendChild(link);
          link.click();
        }}/>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/tsp_admin/UseMgt/EquipmentMgt/UseMgt/' + key);
    }}
    tableCell={(data) => {
      let reqstSttus = ''
      let pymntMth = ''
      if (commtCode && data) {
        reqstSttus = toCommtCodeName(commtCode, "EQPMN_USAGE_ST", data.reqstSttus)
        pymntMth = toCommtCodeName(commtCode, "EQPMN_PAYMENT", data.pymntMth)
      }

      return (
        <Fragment>
          <TableCell sx={{textAlign: 'center'}} key={"reqstSttus-" + data.key}>{reqstSttus}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"mberDiv-" + data.key}>{data?.mberDiv}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"entrprsNm-" + data.key}>{data?.entrprsNm}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"assetsNo-" + data.key}>{data?.assetsNo}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"eqpmnNmKorean-" + data.key}>{data?.eqpmnNmKorean}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"useBeginDt-" + data.key}>{dayFormat(data?.useBeginDt)}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"useEndDt-" + data.key}>{dayFormat(data?.useEndDt)}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"tkoutAt-" + data.key}>{data?.tkoutAt}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"tkinAt-" + data.key}>{data?.tkinAt}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"pymntMth-" + data.key}>{pymntMth}</TableCell>
          <TableCell sx={{textAlign: 'center'}} key={"rceptNo-" + data.key}>{data?.rceptNo}</TableCell>
        </Fragment>
      )
    }}
  />
}

const headCells: CustomHeadCell<EqpmnUseList>[] = [
  {
    id: 'reqstSttus',
    align: 'center',
    label: '사용상태',
  },
  {
    id: 'mberDiv',
    align: "center",
    label: '구분',
  },
  {
    id: 'entrprsNm',
    align: "center",
    label: '사업자명/이름',
  },
  {
    id: 'assetsNo',
    align: "center",
    label: '자산번호',
  },
  {
    id: 'eqpmnNmKorean',
    align: "center",
    label: '장비명',
  },
  {
    id: 'useBeginDt',
    align: "center",
    label: '사용시작일',
  },
  {
    id: 'useEndDt',
    align: "center",
    label: '사용종료일',
  },
  {
    id: 'tkoutAt',
    align: "center",
    label: '반출여부',
  },
  {
    id: 'tkinAt',
    align: "center",
    label: '반입여부',
  },
  {
    id: 'pymntMth',
    align: "center",
    label: '지불방법',
  },
  {
    id: 'rceptNo',
    align: "center",
    label: '접수번호',
  }
];

export default UseEquipmentMgt;
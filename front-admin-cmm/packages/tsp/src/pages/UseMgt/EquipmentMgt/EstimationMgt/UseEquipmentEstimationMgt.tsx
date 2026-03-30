import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react'
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {EqpmnEstmtListData, SearchParam} from "~/service/Model";
import {
  CustomHeadCell,
  SearchTable, TableComponents, TableDateTermCell,
  TableSelectCell,
  TableSelectTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {EstimationService} from "~/service/UseMgt/Estimation/EstimationService";
import {dayFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {CommtCodeNms, toCommtCodeName} from "~/utils/CommtCodeUtil";

/* 견적 요청 관리 */
const UseEquipmentEstimationMgt = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"견적 요청 관리"}>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}


const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  // const common = CommonService.CommonCode(["EQPMN_RENTAL_ST"])
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST"])
  const [eqpmnStatus, setEqpmnStatus] = useState(['전체']);
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

  useEffect(() => {
    if (!!commtCode){
      const state = CommtCodeNms(commtCode, 'EQPMN_REQST_ST')
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
              division label={"신청상태"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                setSearchParam({...searchParam, eqpmnSttus: selected})
              }}/>
            <TableDateTermCell
              label={"신청일"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, creatBeginDt: beginTime.getTime(), creatEndDt:endTime.getTime()})
              }}/>
          </TableRow>
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={["자산번호", "사업자명/이름","접수번호",'장비명']}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                setSearchKeyword(selected)
                setSearchText("")
                setSearchParam({...searchParam, assetsNo: '', modelNm: ''})
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
                  case '장비명':
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
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST",'EQPMN_PAYMENT'])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<EqpmnEstmtListData>[]>([]);
  const information = EstimationService.getList({...pagination, ...props.searchParam});
  const navigation = useNavigate();

  useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        setRowList(information.data.list.map((m) => {
          return {
            key: m.estmtID,
            ...m
          }
        }));
        setPagination((state) => ({...state, rowCount: information.data.totalItems}))
      }
    }
  }, [information.data, information.isLoading, information.isFetching])

  return <TableComponents<EqpmnEstmtListData>
    showTotal
    isLoading={information.isLoading || information.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          const res = await EstimationService.getUseEquipListExcelDownload();
          const blob = new Blob([res]);
          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.setAttribute(
            "download",
            `견적요청관리_리스트.xlsx`
          );
          document.body.appendChild(link);
          link.click();
          // await EquipmentInformationService.getEquipmentListExcelDownload().then((res) => {
          //   const blob = new Blob([res]);
          //   const fileObjectUrl = window.URL.createObjectURL(blob);
          //   const link = document.createElement("a");
          //   link.href = fileObjectUrl;
          //   link.setAttribute(
          //     "download",
          //     `장비정보관리_리스트.xlsx`
          //   );
          //   document.body.appendChild(link);
          //   link.click();
          // });
        }}/>
      {/*<HorizontalInterval size={"10px"}/>*/}
      {/*<CustomButton*/}
      {/*  type={"small"} color={"list"} label={"등록"}*/}
      {/*  onClick={() => {*/}
      {/*    navigation('/EquipmentMgt/EquipmentRegist')*/}
      {/*  }}/>*/}
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/tsp_admin/UseMgt/EquipmentMgt/EstimationMgt/' + key);
    }}
    tableCell={(data) => {
      let reqstSttus = ''
      let pymntMth = ''
      if (commtCode && data) {
        reqstSttus = toCommtCodeName(commtCode, "EQPMN_REQST_ST", data.reqstSttus)
        pymntMth = toCommtCodeName(commtCode, "EQPMN_PAYMENT", data.pymntMth)
      }

      return (
        <Fragment>
          <TableCell sx={{textAlign:'center'}} key={"reqstSttus-" + data.key}>{reqstSttus}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"mberDiv-" + data.key}>{data?.mberDiv}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"entrprsNm-" + data.key}>{data?.entrprsNm}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"assetsNo-" + data.key}>{data?.assetsNo}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"eqpmnNmKorean-" + data.key}>{data?.eqpmnNmKorean}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"useBeginDt-" + data.key}>{dayFormat(data?.useBeginDt)}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"useEndDt-" + data.key}>{dayFormat(data?.useEndDt)}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"pymntMth-" + data.key}>{pymntMth}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"rceptNo-" + data.key}>{data?.rceptNo}</TableCell>
          <TableCell sx={{textAlign:'center'}} key={"creatDt-" + data.key}>{dayFormat(data?.creatDt)}</TableCell>
        </Fragment>
      )
    }}
  />
}

const headCells: CustomHeadCell<EqpmnEstmtListData>[] = [
  {
    id: 'reqstSttus',
    align: 'center',
    label: '신청상태',
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
    id: 'pymntMth',
    align: "center",
    label: '지불방법',
  },
  {
    id: 'rceptNo',
    align: "center",
    label: '접수번호',
  },
  {
    id: 'creatDt',
    align: "center",
    label: '신청일시',
  },
];


export default UseEquipmentEstimationMgt;
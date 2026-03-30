import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react'
import {Box, TableBody, TableCell, TableContainer, TableRow, Stack} from "@mui/material";
import { TitleContents, VerticalInterval } from '~/../../shared/src/components/LayoutComponents';
import {
  CustomHeadCell,
  SearchTable,
  TableComponents,
  TableDateTermCell,
  TableSelectCell,
  TableSelectTextFieldCell,
  TableTextFieldCell,
  WithCustomRowData
} from '~/../../shared/src/components/TableComponents';
import {todayEndTime, todayTime, toStringFullDayFormat} from '~/../../shared/src/utils/stringUtils';
import {ApplyResourceMgtData, ApplyResourceSearchParam, SearchParam} from '~/service/Model';
import { Icons } from '~/../../shared/src/components/IconContainer';
import {useNavigate} from "react-router-dom";
import {dayFormat} from "shared/utils/stringUtils";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {ApplyResourceService} from "~/service/UseMgt/Resource/ApplyResourceService";
import {useCommtCode} from "~/utils/useCommtCode";
import {CommtCodeNms, toCommtCode, toCommtCodeName} from "~/utils/CommtCodeUtil";


/* 실증 자원 신청 관리 */
const ApplyResourceMgt = () => {
  const [applyResourceSearchParam, setApplyResourceSearchParam] = useState<ApplyResourceSearchParam>()

  return <TitleContents
    title={"실증자원신청 관리"}>
    <Stack>
      <SearchBox setSearch={setApplyResourceSearchParam}/>
      <VerticalInterval size={"30px"}/>
      <ListView applyResourceSearchParam={applyResourceSearchParam}/>
    </Stack>
  </TitleContents>
}

const SearchBox:React.FC<{
  setSearch: Dispatch<SetStateAction<ApplyResourceSearchParam | undefined>>
}> = props => {

  const {commtCode} = useCommtCode(["EQPMN_RESOURCE_REQST_ST"])
  const [rescStatus, setRescStatus] = useState(['전체']);
  const [applyResourceSearchParam, setApplyResourceSearchParam] = useState<ApplyResourceSearchParam>()
  const [search, setSearch] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    if (search) {
      props.setSearch(applyResourceSearchParam!)
      // if (props.onClick) props.onClick(searchParam!)
      setSearch(false)
    }
  }, [search])

  useEffect(() => {
    if (!!commtCode) {
      const state = CommtCodeNms(commtCode, 'EQPMN_RESOURCE_REQST_ST')
      if (state.length > 0) setRescStatus(['전체'].concat(state))
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
              division label={"신청 상태"}
              thWidth={"12%"} tdSpan={3}
              selectLabel={rescStatus}
              defaultLabel={"전체"}
              medium
              onClick={(selected: string) => {
                const sttus = toCommtCode(commtCode, 'EQPMN_RESOURCE_REQST_ST', selected)
                setApplyResourceSearchParam({...applyResourceSearchParam, reqstSttus: sttus})
              }}/>
          </TableRow>
          <TableRow>
            <TableDateTermCell
              division type={"Date"} label={"신청일"} thWidth={"12%"}
              onChange={(beginTime, endTime) => {
                setApplyResourceSearchParam({...applyResourceSearchParam, creatBeginDt: todayTime(beginTime), creatEndDt: todayEndTime(endTime)})
              }}/>

            <TableDateTermCell
              division type={"Date"} label={"사용일"} thWidth={"12%"} tdSpan={3}
              onChange={(beginTime, endTime) => {
                setApplyResourceSearchParam({...applyResourceSearchParam, useBeginDt: todayTime(beginTime), useEndDt: todayEndTime(endTime)})
              }}/>
          </TableRow>
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={["사업자명","이름","접수번호"]}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                setSearchKeyword(selected)
                setSearchText("")
                setApplyResourceSearchParam({...applyResourceSearchParam, entrprsNm: "", userNm: "", rceptNo: ""})
              }}
              onChange={(text: string) => {
                setSearchText(text)
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                if (searchKeyword == "사업자명") {
                  setApplyResourceSearchParam({...applyResourceSearchParam, entrprsNm: searchText})
                }
                else if (searchKeyword == "이름") {
                  setApplyResourceSearchParam({...applyResourceSearchParam, userNm: searchText})
                }
                else if (searchKeyword == "접수번호") {
                  setApplyResourceSearchParam({...applyResourceSearchParam, rceptNo: searchText})
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


const ListView:React.FC<{
  applyResourceSearchParam?: ApplyResourceSearchParam
}
  > = props => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0
  });
  const [rowList, setRowList] = useState<WithCustomRowData<ApplyResourceMgtData>[]>([]);
  const information = ApplyResourceService.getList({...pagination, ...props.applyResourceSearchParam});
  const navigation = useNavigate();
  const {commtCode} = useCommtCode(["EQPMN_RESOURCE_REQST_ST", "MEMBER_TYPE"])

  useEffect(() => {
    if (!!information.data) {
      setRowList(information.data.list.map((m:ApplyResourceMgtData) => {
        return {
          key: m.reqstId,
          ...m,
        }
      }));
      setPagination((state) => ({...state, rowCount: information.data.totalItems}))
    }
  }, [information.data])

  return <TableComponents<ApplyResourceMgtData>
    showTotal
    isLoading={information.isLoading || information.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          const res = await ApplyResourceService.getApplyResourceHistInfoExcelDownload({...props.applyResourceSearchParam})
          const blob = new Blob([res]);
          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.setAttribute(
            "download",
            `실증자원신청_리스트.xlsx`
          );
          document.body.appendChild(link);
          link.click();
          ;
        }}/>
    </Stack>}

    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/tsp-admin/UseMgt/ResourceMgt/ApplyMgt/' + key);
    }}
    tableCell={(data) => {
      let reqstSttus = ''
      let mberDiv = ''
      if (commtCode && data)
        reqstSttus = toCommtCodeName(commtCode,"EQPMN_RESOURCE_REQST_ST",data.reqstSttus)
        mberDiv = toCommtCodeName(commtCode,"MEMBER_TYPE",data.mberDiv)

      return (
        data ? <Fragment>
          <TableCell key={"reqstSttus"} sx={{paddingLeft: "30px"}}>{reqstSttus}</TableCell>
          <TableCell key={"mberDiv"}>{mberDiv}</TableCell>
          <TableCell key={"entrprsNm"}>{data.entrprsNm}</TableCell>
          <TableCell key={"userNm"}>{data.userNm}</TableCell>
          <TableCell key={"useBeginDt"}>{dayFormat(data.useBeginDt)}</TableCell>
          <TableCell key={"useEndDt"}>{dayFormat(data.useEndDt)}</TableCell>
          <TableCell key={"rceptNo"}>{data.rceptNo}</TableCell>
          <TableCell key={"creatDt"}>{dayFormat(data.creatDt)}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

const headCells: CustomHeadCell<ApplyResourceMgtData>[] = [
  {
    id: 'reqstSttus',
    align: "center",
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
    label: '사업자명',
  },
  {
    id: 'userNm',
    align: "center",
    label: '이름',
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
    id: 'rceptNo',
    align: "center",
    label: '접수번호',
  },
  {
    id: 'creatDt',
    align: 'center',
    label: '신청일시',
  },

];


export default ApplyResourceMgt;
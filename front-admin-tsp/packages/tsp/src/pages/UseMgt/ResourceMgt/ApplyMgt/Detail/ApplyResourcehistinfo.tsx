import {useParams} from "react-router-dom";
import { Stack, TableCell } from "@mui/material";
import React, {Fragment, useEffect, useState} from "react";
import { CustomHeadCell, TableComponents, WithCustomRowData } from "~/../../shared/src/components/TableComponents";
import {ApplyResourceDetailData, ApplyResourceHistData, ApplyResourceSearchParam, SearchParam} from "~/service/Model";
import {SubContents} from "~/../../shared/src/components/LayoutComponents";
import {ApplyResourceService} from "~/service/UseMgt/Resource/ApplyResourceService";
import {toDayAndTimeFormat, toTimeFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const ApplyResourcehistinfo = () => {
  return <SubContents title={"처리이력 조회"} maxHeight={"100%"}>
    <ListView/>
  </SubContents>
}

const ListView = () => {
  const {id} = useParams();
  const {commtCode} = useCommtCode(["EQPMN_RESOURCE_REQST_ST"])
  const [applyResourceSearchParam, setApplyResourceSearchParam] = useState<ApplyResourceSearchParam>()
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<ApplyResourceHistData>[]>([]);
  const history = ApplyResourceService.getProcessHistoryList(id!.toString(),{...pagination, ...applyResourceSearchParam});

  useEffect(() => {
    if (!!history.data) {
      setRowList(history.data.list.map((m:ApplyResourceHistData) => {
        return {
          key: m.histId,
          ...m
        }
      }));
      setPagination((state) => ({...state, rowCount: history.data.totalItems}))
    }
  }, [history.data])

  console.log(history)


  return <TableComponents<ApplyResourceHistData>
    isLoading={history.isLoading || history.isFetching}
    showTotal
    rightContent={<Stack flexDirection={"row"}>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data) => {
      let processKnd = ''
      if (commtCode && data)
        processKnd = toCommtCodeName(commtCode,"EQPMN_RESOURCE_REQST_ST", data.processKnd)
      
      return (
        data ? <Fragment>
          <TableCell key={"creatDt-" + data.key} sx={{paddingLeft: "30px"}}>{toTimeFormat(data.creatDt)}</TableCell>
          <TableCell key={"processKnd-" + data.key}>{processKnd}</TableCell>
          <TableCell key={"processResn-" + data.key}>{data.processResn}</TableCell>
          <TableCell key={"memberNm-" + data.key}>{data.memberNm}</TableCell>
          <TableCell key={"opetrId-" + data.key}>{data.opetrId}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}


export const headCells: CustomHeadCell<ApplyResourceDetailData>[] = [
  {
    id: 'creatDt',
    align: "center",
    label: '처리일시',
  },
  {
    id: 'processKnd',
    align: "center",
    label: '처리구분',
  },
  {
    id: 'processResn',
    align: "center",
    label: '사유',
  },
  {
    id: 'memberNm',
    align: "center",
    label: '처리자명',
  },
  {
    id: 'opetrId',
    align: "center",
    label: '처리자ID',
  },
];


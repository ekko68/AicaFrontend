import {useNavigate, useParams} from "react-router-dom";
import {Stack, TableCell} from "@mui/material";
import React, {Fragment, useEffect, useState} from "react";
import { CustomHeadCell, TableComponents, WithCustomRowData } from "~/../../shared/src/components/TableComponents";
import { UseResourceHistData } from "~/service/Model";
import {LoadingProgress, SubContents} from "~/../../shared/src/components/LayoutComponents";
import {UseResourceService} from "~/service/UseMgt/Resource/UseResourceService";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";

export const UseResourcehistinfo = () => {
  return <SubContents title={"처리이력 조회"} maxHeight={"100%"}>
    <ListView/>
  </SubContents>
}

const ListView = () => {
  const {id} = useParams();
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<UseResourceHistData>[]>([]);
  const history = UseResourceService.getProcessHistoryList(id!, pagination);

  useEffect(() => {
    if (!!history.data) {
      setRowList(history.data.list.map((m,) => {
        return {
          key: m.histId,
          ...m
        }
      }));
      setPagination((state) => ({...state, rowCount: history.data.totalItems}))
    }
  }, [history.data])

  return <TableComponents<UseResourceHistData>
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

      return (
        data ? <Fragment>
          <TableCell key={data.creatDt} sx={{paddingLeft: "30px"}}>{toTimeFormat(data.creatDt)}</TableCell>
          <TableCell key={data.processKnd}>{data.processKnd}</TableCell>
          <TableCell key={data.processResn}>{data.processResn}</TableCell>
          <TableCell key={data.memberNm}>{data.memberNm}</TableCell>
          <TableCell key={data.opetrId}>{data.opetrId}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

export const headCells: CustomHeadCell<UseResourceHistData>[] = [
  {
    id: 'creatDt',
    align: "center",
    label: '처리일시',
  },
  {
    id: 'processKnd',
    align: "center",
    label: '구분',
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


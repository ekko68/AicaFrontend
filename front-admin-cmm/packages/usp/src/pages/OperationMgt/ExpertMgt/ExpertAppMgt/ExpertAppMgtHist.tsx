import {SubContents} from "shared/components/LayoutComponents";
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {ExpertMgtService} from "~/pages/OperationMgt/ExpertMgt/Service/ExpertMgtService";
import {dummyExpertHistList, 전문가신청처리이력} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {TableCell} from "@mui/material";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";

export const ExpertAppMgtHist = () => {
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
  const [rowList, setRowList] = useState<WithCustomRowData<전문가신청처리이력>[]>(dummyExpertHistList);
  // const history = ExpertMgtService.getHistInfo(id!.toString(), pagination);

  // useEffect(() => {
  //   if (!history.isLoading && !history.isFetching) {
  //     if (!!history.data) {
  //       setRowList(history.data.list.map((m,) => {
  //         return {
  //           key: m.histId,
  //           ...m
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: history.data.totalItems}))
  //     }
  //   }
  // }, [history.data, history.isLoading, history.isFetching])

  return <TableComponents<전문가신청처리이력>
    showTotal
    // isLoading={history.isLoading || history.isFetching}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data,i) => {

      return (
        data ? <Fragment>
          <TableCell key={"번호-" + data.key}>{i + 1}</TableCell>
          <TableCell key={"처리일시-" + data.key} sx={{paddingLeft: "30px"}}>{toTimeFormat(data.처리일시)}</TableCell>
          <TableCell key={"구분-" + data.key}>{data.구분}</TableCell>
          <TableCell key={"사유-" + data.key}>{data.사유}</TableCell>
          <TableCell key={"처리자명-" + data.key}>{data.처리자명}</TableCell>
          <TableCell key={"처리자ID-" + data.key}>{data.처리자ID}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

const headCells: CustomHeadCell<전문가신청처리이력 & {count: number}>[] = [
  {
    id: 'count',
    align: "center",
    label: '번호',
  },
  {
    id: '처리일시',
    align: 'center',
    label: '처리일시',
  },
  {
    id: '구분',
    align: "center",
    label: '구분',
  },
  {
    id: '사유',
    align: "center",
    label: '사유',
  },
  {
    id: '처리자명',
    align: "center",
    label: '처리자명',
  },
  {
    id: '처리자ID',
    align: "center",
    label: '처리자ID',
  }
];
import react, {Fragment, useEffect, useState} from 'react'
import {SubContents} from "shared/components/LayoutComponents";
import {useParams} from "react-router-dom";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {Stack, TableCell} from "@mui/material";
import React from "react";
import {toTimeFormat} from "shared/utils/stringUtils";
import {EqpmnUseHistlist} from "~/service/Model";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const UseEquipmentHistory = () => {
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
  const [rowList, setRowList] = useState<WithCustomRowData<EqpmnUseHistlist>[]>([]);
  const history = EquipmentService.getUseHistlist(id!.toString(), pagination);
  const {commtCode} = useCommtCode(["EQPMN_USE_HIST", 'EQPMN_EXTEND_ST'])

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

  return <TableComponents<EqpmnUseHistlist>
    showTotal
    /*rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          await EquipmentInformationService.getEquipmentsHistInfoExcelDownload(id!.toString()).then((res) => {
            const blob = new Blob([res]);
            const fileObjectUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileObjectUrl;
            link.setAttribute(
              "download",
              `처리이력_리스트.xlsx`
            );
            document.body.appendChild(link);
            link.click();
          });
        }}/>
    </Stack>}*/
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data) => {
      let processKnd = ''
      let processknd2 = ''
      if (commtCode && data) {
        processKnd = toCommtCodeName(commtCode, "EQPMN_USE_HIST", data.processKnd)
        processknd2 = toCommtCodeName(commtCode, "EQPMN_EXTEND_ST", data.processKnd)
      }
      console.log(data.processKnd)
      return (
        data ? <Fragment>
          <TableCell sx={{textAlign:'center', width:'300px'}} key={"creatDt-" + data.key}>{toTimeFormat(data.creatDt)}</TableCell>
          <TableCell sx={{textAlign:'center', width:'130px'}} key={"processKnd-" + data.key}>{processKnd ? processKnd : processknd2}</TableCell>
          <TableCell sx={{textAlign:'center', width:'400px'}} key={"processResn-" + data.key}>{data.processResn}</TableCell>
          <TableCell sx={{textAlign:'center', width:'150px'}} key={"memberNm-" + data.key}>{data.memberNm}</TableCell>
          <TableCell sx={{textAlign:'center', width:'200px'}} key={"opetrId-" + data.key}>{data.opetrId}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

const headCells: CustomHeadCell<EqpmnUseHistlist>[] = [
  {
    id: 'creatDt',
    align: 'center',
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
  }
];
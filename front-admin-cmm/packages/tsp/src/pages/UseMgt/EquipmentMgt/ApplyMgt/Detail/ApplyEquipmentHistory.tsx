import { Stack, TableCell } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CustomIconButton } from "~/../../shared/src/components/ButtonComponents";
import { Icons } from "~/../../shared/src/components/IconContainer";
import { SubContents } from "~/../../shared/src/components/LayoutComponents";
import { CustomHeadCell, TableComponents, WithCustomRowData } from "~/../../shared/src/components/TableComponents";
import { EquipmentInformationService } from "~/service/EquipmentMgt/EquipmentInformationService";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {EqpmnUseReqstHistList} from "~/service/Model";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const ApplyEquipmentHistory = () => {
    return <SubContents title={"처리이력 조회"} maxHeight={"100%"}>
    <ListView/>
  </SubContents>
}

const ListView = () => {
  const {id} = useParams();
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST"])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<EqpmnUseReqstHistList>[]>([]);
  const history = EquipmentService.getApplyEquipDetailHistList(pagination);

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

  return <TableComponents<EqpmnUseReqstHistList>
    showTotal
    rightContent={<Stack flexDirection={"row"}>
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
        processKnd = toCommtCodeName(commtCode,"EQPMN_REQST_ST", data.processKnd)
      console.log(data.processKnd)

      return (
        data ? <Fragment>
          <TableCell sx={{textAlign:'center', width:'300px'}} key={"creatDt-" + data.key}>{toTimeFormat(data.creatDt)}</TableCell>
          <TableCell sx={{textAlign:'center', width:'130px'}} key={"processKnd-" + data.key}>{processKnd}</TableCell>
          <TableCell sx={{textAlign:'center', width:'400px'}} key={"processResn-" + data.key}>{data.processResn}</TableCell>
          <TableCell sx={{textAlign:'center', width:'150px'}} key={"memberNm-" + data.key}>{data.memberNm}</TableCell>
          <TableCell sx={{textAlign:'center', width:'200px'}} key={"opetrId-" + data.key}>{data.opetrId}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

const headCells: CustomHeadCell<EqpmnUseReqstHistList>[] = [
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
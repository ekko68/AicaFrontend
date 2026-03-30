import react, {Fragment, useEffect, useState} from 'react'
import {SubContents} from "shared/components/LayoutComponents";
import {useParams} from "react-router-dom";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {EquipmentInformationService} from "~/service/EquipmentMgt/EquipmentInformationService";
import {Stack, TableCell} from "@mui/material";
import React from "react";
import {CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {toTimeFormat} from "shared/utils/stringUtils";

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
  const [rowList, setRowList] = useState<WithCustomRowData<HistData>[]>([]);
  const history = EquipmentInformationService.getEquipmentsHistInfo("eqpmn-4bf571a10ad34bb0ab763fb179ca960b", pagination);

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

  return <TableComponents<HistData>
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
      return (
        data ? <Fragment>
          <TableCell sx={{textAlign:'center', width:'300px'}} key={"creatDt-" + data.key}>{toTimeFormat(data.creatDt)}</TableCell>
          <TableCell sx={{textAlign:'center', width:'130px'}} key={"processKnd-" + data.key}>{data.processKnd}</TableCell>
          <TableCell sx={{textAlign:'center', width:'400px'}} key={"processResn-" + data.key}>{data.processResn}</TableCell>
         {/* <TableCell sx={{textAlign:'center', width:'150px'}} key={"memberNm-" + data.key}>{data.memberNm}</TableCell>*/}
          <TableCell sx={{textAlign:'center', width:'200px'}} key={"opetrId-" + data.key}>{data.opetrId}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

interface HistData {
  creatDt: number /*생성일시*/
  processKnd: string /*처리구분*/
  /*menberNm: string /!*처리자명*!/*/
  processResn: string /*처리사유*/
  opetrId: string /*처리자ID*/
}

const headCells: CustomHeadCell<HistData>[] = [
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
  /*{
    id: 'menberNm',
    align: "center",
    label: '처리자명',
  },*/
  {
    id: 'opetrId',
    align: "center",
    label: '처리자ID',
  }
];
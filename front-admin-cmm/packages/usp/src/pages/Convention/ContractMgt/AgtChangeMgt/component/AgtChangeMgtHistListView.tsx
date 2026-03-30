import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";
import { TableCell } from "@mui/material";
import { toTimeFormat } from "shared/utils/stringUtils";
import { histListViewHeadCells as headCells } from "~/pages/Convention/ContractMgt/AgtChangeMgt/helper"
import { BsnsPlanProcessHist } from "~/pages/Convention/ContractMgt/AgtChangeMgt/Model";
import { AgtChangeMgtService } from "~/pages/Convention/ContractMgt/AgtChangeMgt/Service/AgtChangeMgtService";


export const AgtChangeMgtHistListView = () => {
    const {id} = useParams();
    const [pagination, setPagination] = useState({
      page: 0,
      rowsPerPage: 5,
      rowCount: 0,
    });
    console.log('### ID = ' + id)
    const [rowList, setRowList] = useState<WithCustomRowData<BsnsPlanProcessHist>[]>([]);
    const history = AgtChangeMgtService.getHistInfo(id!.toString(), pagination);
  
    useEffect(() => {
      if (!history.isLoading && !history.isFetching) {
        if (!!history.data) {
          console.log('########################')
          console.log(history)
          setRowList(history.data.list.map((m,) => {
            return {
              key: m.rn,
              ...m
            }
          }));
          setPagination((state) => ({...state, rowCount: history.data.totalItems}))
        }
      }
    }, [history.data, history.isLoading, history.isFetching])
  
    return <TableComponents<BsnsPlanProcessHist>
      showTotal
      // isLoading={history.isLoading || history.isFetching}
      headCells={headCells}
      bodyRows={rowList}
      {...pagination}
      onChangePagination={(page, rowPerPage) => {
        setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
      }}
      tableCell={(data,index) => {
        return (
          data ? <Fragment>
            <TableCell key={"rn-" + data.key} width={"150px"}>{data.rn}</TableCell>
            <TableCell key={"dt-" + data.key} width={"150px"} sx={{paddingLeft: "10px"}}>{toTimeFormat(data.createdDt)}</TableCell>
            <TableCell key={"pl-" + data.key} width={"150px"}>{data.planPresentnSttusCd}</TableCell>
            <TableCell key={"re" + data.key}>{data.resnCn}</TableCell>
            <TableCell key={"nm-" + data.key} width={"150px"}>{data.name}</TableCell>
            <TableCell key={"cid-" + data.key} width={"150px"}>{data.creatorId}</TableCell>
          </Fragment> : <></>
        )
      }}
    />
  }
  
  
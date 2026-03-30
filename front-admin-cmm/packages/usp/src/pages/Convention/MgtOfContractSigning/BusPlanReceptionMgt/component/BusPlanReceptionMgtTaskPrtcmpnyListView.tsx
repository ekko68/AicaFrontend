// 협약 -> 협약체결관리 -> 사업계획서 상세-> 참여기업 리스트
/*
    Date Created          :   2022/08/26
    Screen Name           :   파일 첨부 리스트
    Screen ID             :   UI-USP-ADM-0220201
    Developer Name        :   jhan
*/
import { Fragment, useEffect, useState } from "react";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";
import { TableCell } from "@mui/material";
import { toTimeFormat } from "shared/utils/stringUtils";
import { UsptTaskPrtcmpny as TEntity} from "../Model";
import { TaskPrtCmpnyListViewHeadCells as THeadCells } from "../helper"


const BusPlanReceptionMgtTaskPrtcmpnyListView = ({rowList}) => {
    const [pagination, setPagination] = useState({
      page: 0,
      rowsPerPage: 5,
      rowCount: 0,
    });
    const [itemList, setItemList] = useState<WithCustomRowData<TEntity>[]>([]);  
    useEffect(() => {
        console.log(rowList)
        if (!!rowList && rowList.length > 0) {
          setItemList(rowList.map((m,index) => {
            return {
              key: index,
              ...m
            }
          }));
          setPagination((state) => ({...state, rowCount: itemList.length}))
      }
    }, [rowList]);

    return <TableComponents<TEntity>
      hidePagination={true}
      headCells={THeadCells}
      bodyRows={itemList}
      {...pagination}
      tableCell={(data,index) => {
        return (
          data ? <Fragment>
            <TableCell key={"rn-" + data.key} width={"150px"}>{data.entrpsNm}</TableCell>
            <TableCell key={"dt-" + data.key} width={"150px"} sx={{paddingLeft: "10px"}}>{data.entrpsNm}</TableCell>
            <TableCell key={"pl-" + data.key} width={"150px"}>{data.clsfNm}</TableCell>
            <TableCell key={"re" + data.key} width={"150px"}  align={'center'}>{data.telno}</TableCell>
            <TableCell key={"nm-" + data.key} width={"150px"} align={'center'}>{data.mbtlnum}</TableCell>
            <TableCell key={"cid-" + data.key} width={"150px"}>{data.email}</TableCell>
            <TableCell key={"cid-" + data.key} width={"150px"} align={'center'}>{data.tlsyRegistNo}</TableCell>
          </Fragment> : <></>
        )
      }}
    />
  }
  
  export default BusPlanReceptionMgtTaskPrtcmpnyListView;
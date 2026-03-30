// 협약 -> 협약체결관리 -> 사업계획서 상세 
/*
    Date Created          :   2022/08/26
    Screen Name           :   파일 첨부 리스트
    Screen ID             :   UI-USP-ADM-0220201
    Developer Name        :   jhan
*/
import { Fragment, useEffect, useState } from "react";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";
import { TableCell } from "@mui/material";
import { CmmtAttachment as TEntity} from "../Model";
import { AttachFileListViewHeadCells as THeadCells } from "../helper"


const BusPlanReceptionMgtAttachmentListView = ({rowList}) => {

    // parameter setting
    const [pagination, setPagination] = useState({
      page: 0,
      rowsPerPage: 5,
      rowCount: 0,
    });
    const [itemList, setItemList] = useState<WithCustomRowData<TEntity>[]>([]);  

    // init item list by props rowlist
    useEffect(() => {
      console.log(rowList)
      if (!!rowList && rowList.length > 0) {
        setItemList(rowList.map((m,index) => {
          return {
            key: index,
            rn: index,
            ...m
          }
        }));
        setPagination((state) => ({...state, rowCount: itemList.length}))
      }
    }, [rowList]);


    const handleSelectedKey= (key: string[]) => {
      console.log(key)
    }

    return <TableComponents<TEntity>
      isCheckBox
      hidePagination={true}
      headCells={THeadCells}
      bodyRows={itemList}
      onSelectedKey={handleSelectedKey}
      {...pagination}
      tableCell={(data,index) => {
        return (
          data ? <Fragment>
            <TableCell key={"rn-" + data.key} width={"150px"}>{data.rn}</TableCell>
            <TableCell key={"dt-" + data.key} width={"150px"} sx={{paddingLeft: "10px"}}>{data.fileNm}</TableCell>
            <TableCell key={"pl-" + data.key} width={"150px"}>{data.fileSize}</TableCell>
            <TableCell key={"re" + data.key} width={"150px"}  align={'center'}>{data.attachmentId}</TableCell>
          </Fragment> : <></>
        )
      }}
    />
  }
  
  export default BusPlanReceptionMgtAttachmentListView;
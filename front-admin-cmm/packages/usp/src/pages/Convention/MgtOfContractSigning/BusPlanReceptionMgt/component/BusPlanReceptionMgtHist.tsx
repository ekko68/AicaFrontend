// 협약 -> 협약체결관리 -> 사업계획서 상세-> 처리 이력
/*
    Date Created          :   2022/08/26
    Screen Name           :   파일 첨부 리스트
    Screen ID             :   UI-USP-ADM-0220401
    Developer Name        :   jhan
*/
import { Fragment, useEffect, useState } from "react";
import { SubContents } from "shared/components/LayoutComponents";
import { Stack } from "@mui/material";
import { CustomButton } from "~/components/ButtonComponents";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";
import { TableCell } from "@mui/material";
import { toTimeFormat } from "shared/utils/stringUtils";
import { BsnsPlanProcessHist as TEntity} from "../Model";
import { busPlanHistListViewHeadCells as THeadCells } from "../helper"
import { BusPlanReceptionMgtService as TService } from "../Service/BusPlanReceptionMgtService";


const BusPlanReceptionMgtHist = () => {

  // parameter setting
  const navigate = useNavigate()
  const { bsnsPlanDocId } = useParams();
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  
  const [itemList, setItemList] = useState<WithCustomRowData<TEntity>[]>([]);

  // get list 
  const rowList = TService.getHistInfo(bsnsPlanDocId!.toString(), pagination);
  useEffect(() => {
    if (!rowList.isLoading && !rowList.isFetching) {
      if (!!rowList.data) {
        setItemList(rowList.data.list.map((m,) => {
          return {
            key: m.rn+'',
            ...m
          }
        }));
        setPagination((state) => ({...state, rowCount: rowList.data.totalItems}))
      }
    }
  }, [rowList.data, rowList.isLoading, rowList.isFetching])


  return <SubContents title={"처리이력 조회"} maxHeight={"100%"}>
    <TableComponents<TEntity>
      hidePagination
      headCells={THeadCells}
      bodyRows={itemList}
      {...pagination}
      onChangePagination={(page, rowPerPage) => {
        setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
      }}
      tableCell={(data,index) => {
        return (
          data ? <Fragment>
            <TableCell key={"rn-" + data.key} align={'center'} width={"120px"}>{data.rn}</TableCell>
            <TableCell key={"dt-" + data.key} align={'center'} width={"250px"} sx={{paddingLeft: "10px"}}>{toTimeFormat(data.createdDt)}</TableCell>
            <TableCell key={"pl-" + data.key} width={"150px"}>{data.planPresentnSttusNm}</TableCell>
            <TableCell key={"re" + data.key}>{data.resnCn}</TableCell>
            <TableCell key={"nm-" + data.key} width={"150px"}>{data.creatorNm}</TableCell>
            <TableCell key={"cid-" + data.key} align={'center'} width={"150px"}>{data.creatorId}</TableCell>
          </Fragment> : <></>
        )
      }}
    />
    <Stack>
      <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
        <CustomButton
          label={"목록"} type={"largeList"} color={"outlined"}
          onClick={() => {
            navigate(-1)
          }}
        />
        <Stack flexDirection={"row"} spacing={'30px'}>
          <CustomButton
            label={"보완"}
            onClick={async () => {
            }}
          />
          <CustomButton
            label={"승인"}
            onClick={async () => {
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  </SubContents>
}

export default BusPlanReceptionMgtHist;
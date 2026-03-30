// 협약 -> 협약체결관리 -> 사업계획서접수관리 페이지
/*
    Date Created          :   2022/08/26
    Screen Name           :   사업계획서접수 리스트뷰
    Screen ID             :   UI-USP-ADM-0220101
    Developer Name        :   jhan
*/
import React, {Fragment, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import { Stack, TableCell} from "@mui/material";
import { Icons } from "shared/components/IconContainer";
import { dayFormat } from "shared/utils/stringUtils";
import { CustomIconButton } from "shared/components/ButtonComponents";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";
import { SearchParam , UspBsnsPlan as TEntity } from "../Model";
import { BusPlanReceptionMgtService as TService } from "../Service/BusPlanReceptionMgtService";
import { busPlanListViewHeadCells as THeadCells } from "../helper"
import { fetchDownload } from '~/fetches';

const BusPlanListView: React.FC<{ searchParam?: SearchParam}> = props => {
    const navigation = useNavigate();
    const [pagination, setPagination] = useState({
      page: 0,
      rowsPerPage: 5,
      rowCount: 0,
    });
    // get busplan list 
    const rowList = TService.getList({...pagination, ...props.searchParam});

    // parameter setting
    const [itemList, setItemList] = useState<WithCustomRowData<TEntity>[]>([]);    


    // init item list
    useEffect(() => {
      if (!rowList.isLoading || !rowList.isFetching) {
        if (!!rowList.data) {
          setItemList(rowList.data.list.map((m) => {
            return {
              key: m.rn.toString(),
              ...m,
            }
          }));
          setPagination((state) => ({...state, rowCount: rowList.data.totalItems}))
        }
      }
    }, [rowList.data, rowList.isLoading, rowList.isFetching])
  
    // excel download
    const exportExcel = async () => {
        fetchDownload("/pms/api/bsns-plan/excel-dwld?bsnsYear=2022&bsnsNm=&planPresentnSttusCd=PLPR01&pblancNm=&memberNm=")
    };
  
    return <TableComponents<TEntity>
      showTotal
      rightContent={
        <Stack flexDirection={"row"}>
            <Stack>
                <CustomIconButton
                startText={'첨부파일 다운로드'}  icon={Icons.FileDownload}
                style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
                onClick={() => {
                    exportExcel()
                }}/>
            </Stack>
            <Stack>
                <CustomIconButton
                startText={'엑셀저장'} icon={Icons.FileDownload}
                style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
                onClick={() => {
                    exportExcel()
                }}/>
            </Stack>
        </Stack>
      }
      headCells={THeadCells}
      bodyRows={itemList}
      {...pagination}
      onChangePagination={(page, rowPerPage) => {
        setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
      }}
      handleClick={(key: string) => {
        console.log(key)
        const items = itemList.filter((item)=>{
          if(item.rn.toString() === key) return item
        })
        if(!!items && items.length > 0){
          const entity = items[0];
          navigation('/Convention/MgtOfContractSigning/BusPlanReceptionMgt/'+entity.bsnsPlanDocId+'/'+entity.bsnsSlctnId);
        }
      }}
      tableCell={(data:WithCustomRowData<TEntity>,index) => {
        return (
            <Fragment>
                <TableCell key={'rn_'+index} sx={{paddingLeft: "30px"}}>{data.rn}</TableCell>
                <TableCell key={'pl'+index} sx={{paddingLeft: "30px"}}>{data.planPresentnSttusCd}</TableCell>
                <TableCell key={'re_'+index}>{data.receiptNo}</TableCell>
                <TableCell key={'ta_'+index}>{data.taskNmKo}</TableCell>
                <TableCell key={'bs_'+index}>{data.bsnsYear}</TableCell>
                <TableCell key={'bn_'+index}>{data.bsnsNm}</TableCell>
                <TableCell key={'pb_'+index}>{data.pblancNm}</TableCell>
                <TableCell key={'me_'+index}>{data.memberNm}</TableCell>
                <TableCell key={'pr'+index}>{dayFormat(data.presentnDy)}</TableCell>
            </Fragment>
        )
      }}
    />
  }

  export default BusPlanListView;
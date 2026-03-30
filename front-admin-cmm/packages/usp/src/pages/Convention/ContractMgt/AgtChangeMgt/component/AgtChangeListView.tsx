import React, {Fragment, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import { Stack, TableCell} from "@mui/material";
import { Icons } from "shared/components/IconContainer";
import { dayFormat } from "shared/utils/stringUtils";
import { CustomIconButton } from "shared/components/ButtonComponents";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";

import { SearchParam , CnvnChange } from "~/pages/Convention/ContractMgt/AgtChangeMgt/Model";
import { AgtChangeListViewHeadCells as headCells } from "~/pages/Convention/ContractMgt/AgtChangeMgt/helper"
import { AgtChangeMgtService } from "~/pages/Convention/ContractMgt/AgtChangeMgt/Service/AgtChangeMgtService";
import { fetchDownload } from '~/fetches';

export const AgtChangeListView: React.FC<{ searchParam?: SearchParam}> = props => {
    const navigation = useNavigate();
    const [pagination, setPagination] = useState({
      page: 0,
      rowsPerPage: 5,
      rowCount: 0,
    });
    const [rowList, setRowList] = useState<WithCustomRowData<CnvnChange>[]>([]);    
    const dataSource = AgtChangeMgtService.getList({...pagination, ...props.searchParam});
    useEffect(() => {
      if (!dataSource.isLoading || !dataSource.isFetching) {
        if (!!dataSource.data) {
        console.log(dataSource);
          setRowList(dataSource.data.list.map((m) => {
            return {
              key: m.changeIemDivCd + '|'+ m.cnvnChangeReqId,
              ...m,
            }
          }));
          setPagination((state) => ({...state, rowCount: dataSource.data.totalItems}))
        }
      }
    }, [dataSource.data, dataSource.isLoading, dataSource.isFetching])
  
    const exportExcel = async () => {
        fetchDownload("/pms/api/bsns-plan/all-file-dwln")
    };
  
    return <TableComponents<CnvnChange>
      showTotal
      rightContent={
        <Stack flexDirection={"row"}>
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
      headCells={headCells}
      bodyRows={rowList}
      {...pagination}
      onChangePagination={(page, rowPerPage) => {
        setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
      }}
      handleClick={(key: string) => {
        console.log('######################################################################88')
        console.log(key)
        navigation('/Convention/ContractMgt/AgtChangeMgt/'+key);
      }}
      tableCell={(data:WithCustomRowData<CnvnChange>,index) => {
        return (
            <Fragment>
                <TableCell key={'rn_'+index} sx={{paddingLeft: "30px"}}>{data.rn}</TableCell>
                <TableCell key={'pl'+index} sx={{paddingLeft: "30px"}}>{data.cnvnChangeSttusCd}</TableCell>
                <TableCell key={'re_'+index}>{data.receiptNo}</TableCell>
                <TableCell key={'ta_'+index}>{data.taskNmKo}</TableCell>
                <TableCell key={'bs_'+index}>{data.cnvnChangeTypeCd}</TableCell>
                <TableCell key={'bn_'+index}>{data.changeIemDivCd}</TableCell>
                <TableCell key={'me_'+index}>{data.memberNm}</TableCell>
                <TableCell key={'pr'+index}>{dayFormat(data.reqDe)}</TableCell>
            </Fragment>
        )
      }}
    />
  }

  
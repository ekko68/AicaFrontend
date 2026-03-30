import React, {Fragment, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import { Stack, TableCell} from "@mui/material";
import { Icons } from "shared/components/IconContainer";
import { dayFormat } from "shared/utils/stringUtils";
import { CustomIconButton } from "shared/components/ButtonComponents";
import { TableComponents, WithCustomRowData } from "shared/components/TableComponents";

import { SearchParam , CnvnTrmnat as TEntity } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/Model";
import { AgtChangeListViewHeadCells as THeadCells } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/helper"
import { AgtTerminationMgtService as TService } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/Service/AgtTerminationMgtService";
import { fetchDownload } from '~/fetches';

export const AgtTerminationListView: React.FC<{ searchParam?: SearchParam}> = props => {
    const navigation = useNavigate();
    const [pagination, setPagination] = useState({
      page: 0,
      rowsPerPage: 5,
      rowCount: 0,
    });
    const [rowList, setRowList] = useState<WithCustomRowData<TEntity>[]>([]);    
    const dataSource = TService.getList({...pagination, ...props.searchParam});
    useEffect(() => {
      if (!dataSource.isLoading || !dataSource.isFetching) {
        if (!!dataSource.data) {
        console.log(dataSource);
          setRowList(dataSource.data.list.map((m) => {
            return {
              key: m.applyId + '|'+ m.bsnsCnvnId,
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
  
    return <TableComponents<TEntity>
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
      headCells={THeadCells}
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
      tableCell={(data:WithCustomRowData<TEntity>,index) => {
        return (
            <Fragment>
                <TableCell key={'rn_'+index} sx={{paddingLeft: "30px"}}>{data.rn}</TableCell>
                <TableCell key={'re_'+index}>{data.receiptNo}</TableCell>
                <TableCell key={'ta_'+index}>{data.taskNmKo}</TableCell>
                <TableCell key={'bs_'+index}>{data.bsnsYear}</TableCell>
                <TableCell key={'bn_'+index}>{data.bsnsNm}</TableCell>
                <TableCell key={'me_'+index}>{data.memberNm}</TableCell>
                <TableCell key={'pr'+index}>{ data.cnvnTrmnatDeStart}</TableCell>
                <TableCell key={'pr'+index}>{ data.cnvnTrmnatDeEnd}</TableCell>
                <TableCell key={'pr'+index}>{ data.resnCn}</TableCell>
                <TableCell key={'pr'+index}>{ data.cnvnTrmnatDe}</TableCell>
            </Fragment>
        )
      }}
    />
  }

  
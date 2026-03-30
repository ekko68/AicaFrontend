import {HorizontalInterval, SubContents} from "shared/components/LayoutComponents";
import {useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {ExpertMgtService} from "~/pages/OperationMgt/ExpertMgt/Service/ExpertMgtService";
import {
  dummyExpertHistList,
  dummyExpertInformationHistList,
  전문가매칭이력,
  전문가신청처리이력
} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {MenuItem, Select, Stack, TableCell} from "@mui/material";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";
import {CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {SelectChangeEvent} from "@mui/material/Select";

export const ExpertInformationMgtHist = () => {
  return <SubContents title={"매칭이력 조회"} maxHeight={"100%"}>
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
  const [rowList, setRowList] = useState<WithCustomRowData<전문가매칭이력>[]>(dummyExpertInformationHistList);
  // const history = ExpertMgtService.getHistInfo(id!.toString(), pagination);

  // useEffect(() => {
  //   if (!history.isLoading && !history.isFetching) {
  //     if (!!history.data) {
  //       setRowList(history.data.list.map((m,) => {
  //         return {
  //           key: m.histId,
  //           ...m
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: history.data.totalItems}))
  //     }
  //   }
  // }, [history.data, history.isLoading, history.isFetching])

  return <TableComponents<전문가매칭이력>
    showTotal
    // isLoading={history.isLoading || history.isFetching}
    rightContent={<Stack flexDirection={"row"} alignItems={'center'}>
      <Select value={'2021'} size={'small'}
              onChange={(event: SelectChangeEvent) => {
              }}>
        {
          ['2021', '2022'].map((m, i) => {
            return <MenuItem key={i} value={m}>{m}</MenuItem>
          })
        }
      </Select>
      <HorizontalInterval size={'10px'}/>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', margin: 0}}
        onClick={() => {

        }}/>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data,i) => {

      return (
        data ? <Fragment>
          <TableCell key={"번호-" + data.key} sx={{textAlign: 'center'}}>{i + 1}</TableCell>
          <TableCell key={"매칭일-" + data.key} sx={{textAlign: 'center', width: '10%'}}>{dayFormat(data.매칭일)}</TableCell>
          <TableCell key={"사업년도-" + data.key} sx={{textAlign: 'center', width: '10%'}}>{data.사업년도}</TableCell>
          <TableCell key={"사업명-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.사업명}</TableCell>
          <TableCell key={"공고번호-" + data.key} sx={{textAlign: 'center', width: '10%'}}>{data.공고번호}</TableCell>
          <TableCell key={"공고명-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.공고명}</TableCell>
          <TableCell key={"활동분야-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.활동분야}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

const headCells: CustomHeadCell<전문가매칭이력 & {count: number}>[] = [
  {
    id: 'count',
    align: "center",
    label: '번호',
  },
  {
    id: '매칭일',
    align: 'center',
    label: '매칭일',
  },
  {
    id: '사업년도',
    align: "center",
    label: '사업년도',
  },
  {
    id: '사업명',
    align: "center",
    label: '사업명',
  },
  {
    id: '공고번호',
    align: "center",
    label: '공고번호',
  },
  {
    id: '공고명',
    align: "center",
    label: '공고명',
  },
  {
    id: '활동분야',
    align: "center",
    label: '활동분야',
  }
];
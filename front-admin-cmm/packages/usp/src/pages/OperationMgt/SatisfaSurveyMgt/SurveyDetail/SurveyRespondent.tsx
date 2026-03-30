import {Stack, TableCell} from "@mui/material";
import {CustomButton} from "~/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import React, {Fragment, useEffect, useState} from "react";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {useNavigate} from "react-router-dom";
import {dummyExpertInfoList, 전문가정보리스트} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {dummyRespondentList, 응답자} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";
import {SubContents} from "shared/components/LayoutComponents";
import {SatisfaSurveyMgtService} from "~/pages/OperationMgt/SatisfaSurveyMgt/Service/SatisfaSurveyMgtService";

export const SurveyRespondent = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<응답자>[]>(dummyRespondentList);
  const navigate = useNavigate();
  const {addModal} = useGlobalModalStore()

  // const respondentList = SatisfaSurveyMgtService.getRespondentList({...pagination});
  // useEffect(() => {
  //   if (!respondentList.isLoading || !respondentList.isFetching) {
  //     if (!!respondentList.data) {
  //       setRowList(respondentList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: respondentList.data.totalItems}))
  //     }
  //   }
  // }, [respondentList.data, respondentList.isLoading, respondentList.isFetching])

  return <Stack spacing={'20px'}>
    <SubContents title={'설문응답자'} maxHeight={'100%'}>
      <TableComponents<응답자>
        showTotal
        // isLoading={respondentList.isLoading || respondentList.isFetching}
        headCells={headCells}
        bodyRows={rowList}
        {...pagination}
        onChangePagination={(page, rowPerPage) => {
          setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
        }}
        tableCell={(data: WithCustomRowData<응답자>, i) => {
          return <Fragment>
            <TableCell key={"번호-" + data.key} sx={{textAlign: 'center'}}>{i + 1}</TableCell>
            <TableCell key={"회원유형-" + data.key} sx={{textAlign: 'center'}}>{data.회원유형}</TableCell>
            <TableCell key={"이름-" + data.key} sx={{textAlign: 'center'}}>{data.이름}</TableCell>
            <TableCell key={"아이디-" + data.key} sx={{textAlign: 'center'}}>{data.아이디}</TableCell>
          </Fragment>
        }}
      />
    </SubContents>

    <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate('/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt')
        }}
      />

      <CustomButton
        label={"진행종료"}
        onClick={async () => {
          addModal({open: true, isDist: true, content: '진행 종료 되었습니다.'})
        }}
      />
    </Stack>
  </Stack>
}

const headCells: CustomHeadCell<응답자 & { count: number }>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: '회원유형',
    align: "center",
    label: '회원유형',
  },
  {
    id: '이름',
    align: "center",
    label: '이름',
  },
  {
    id: '아이디',
    align: "center",
    label: '아이디',
  },
];
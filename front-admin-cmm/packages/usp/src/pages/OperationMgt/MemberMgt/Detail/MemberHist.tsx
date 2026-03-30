import {HorizontalInterval, SubContents} from "shared/components/LayoutComponents";
import {회원처리이력조회} from "~/pages/OperationMgt/MemberMgt/Model";
import React, {Fragment, useEffect, useState} from "react";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {Stack, TableCell} from "@mui/material";
import {toTimeFormat} from "shared/utils/stringUtils";
import {CustomButton} from "shared/components/ButtonComponents";
import {DefaultModal} from "~/pages/OperationMgt/MemberMgt/Detail/MemberInfo";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";

export const MemberHist = () => {
  return <SubContents title={'처리이력 조회'} maxHeight={'100%'}>
    <ListView/>
  </SubContents>
}

const ListView = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  // const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const [rowList, setRowList] = useState<WithCustomRowData<회원처리이력조회>[]>(tempData);

  /*useEffect(() => {
    if (!!history.data) {
      setRowList(history.data.list.map((m,) => {
        return {
          key: m.histId,
          ...m
        }
      }));
      setPagination((state) => ({...state, rowCount: history.data.totalItems}))
    }
  }, [history.data])*/

  return <Stack spacing={'40px'}>
  <TableComponents<회원처리이력조회>
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data) => {
      /*      let processKnd = ''
            if (commtCode && data)
              processKnd = toCommtCodeName(commtCode,"EQPMN_REQST_ST", data.processKnd)
            console.log(data.processKnd)*/

      return (
        data ? <Fragment>
          <TableCell sx={{textAlign: 'center', width: '230px'}}
                     key={"처리일시-" + data.key}>{toTimeFormat(data.처리일시)}</TableCell>
          <TableCell sx={{textAlign: 'center', width: '150px'}} key={"구분-" + data.key}>{data.구분}</TableCell>
          <TableCell sx={{textAlign: 'center', width: '400px'}} key={"사유-" + data.key}>{data.사유}</TableCell>
          <TableCell sx={{textAlign: 'center', width: '150px'}} key={"처리자명-" + data.key}>{data.처리자명}</TableCell>
          <TableCell sx={{textAlign: 'center', width: '200px'}} key={"처리자ID-" + data.key}>{data.처리자ID}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
      <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
        <CustomButton
          label={"목록"} type={"largeList"} color={"outlined"}
          onClick={() => {
            navigate(-1);
          }}
        />
        <Stack flexDirection={"row"}>
          <CustomButton
            label={"비밀번호 초기화"}
            type={"largeList"}
            onClick={() => {
              addModal({open: true, isDist: true, content: '임시 비밀번호가 저장된 이메일로 발송되었습니다.'})
            }}
          />
          {/*<HorizontalInterval size={"10px"}/>
          <CustomButton
            label={"불량회원 등록"}
            type={"largeList"}
            onClick={() => {
              setOpen(!open)
            }}
          />*/}
        </Stack>
      </Stack>
      {/*<DefaultModal open={open} setOpen={setOpen} isDist={false}/>*/}
  </Stack>
}

const headCells: CustomHeadCell<회원처리이력조회>[] = [
  {
    id: '처리일시',
    align: 'center',
    label: '처리일시',
  },
  {
    id: '구분',
    align: "center",
    label: '구분',
  },
  {
    id: '사유',
    align: "center",
    label: '사유',
  },
  {
    id: '처리자명',
    align: "center",
    label: '처리자명',
  },
  {
    id: '처리자ID',
    align: "center",
    label: '처리자ID',
  }
];

const tempData: WithCustomRowData<회원처리이력조회>[] = [
  {
    key: 'id-1234',
    처리일시: Date.now(),
    구분: '비밀번호 초기화',
    사유: '비밀번호 초기화 처리되었습니다.',
    처리자명: '강하늘',
    처리자ID: 'ABC'
  }, {
    key: 'id-1235',
    처리일시: Date.now(),
    구분: '불량회원 등록',
    사유: '불량회원 등록 처리되었습니다.',
    처리자명: '강하늘',
    처리자ID: 'ABC'
  },
]
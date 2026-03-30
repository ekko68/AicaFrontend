// // 시스템관리/ ->  관리자계정관리 페이지
import { GetQuery } from '~/../../shared/src/libs/axios';

import React, { useState, useCallback, useEffect } from 'react';
import { TitleContents } from 'shared/components/LayoutComponents';
import {
  AdminSearchQuery,
  AdminMemberData,
} from '~/service/system/admin/Service';
import { useGetAuthonrity } from '~/../../shared/src/utils/hooks/useGetAuthonrity';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import { Box, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { CustomIconButton } from 'shared/components/ButtonComponents';
import { Icons } from 'shared/components/IconContainer';
import {
  SearchTable,
  TableSelectCell,
  TableTextFieldCell,
  TableHeaderCell,
  TableBodyCell,
  TableComponents, WithCustomRowData,
} from 'shared/components/TableComponents';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { CustomButton } from '~/components/ButtonComponents';
import { VerticalInterval } from 'shared/components/LayoutComponents';
import { useNavigate } from 'react-router-dom';

interface GetMemberResponse {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  list: AdminMemberData[];
}

interface Pagination {
  page: number;
  rowsPerPage: number;
  rowCount: number;
}

const SearchBox = ({ onSubmitHandler }) => {
  const { authorityIds, authorityNames } = useGetAuthonrity();
  const [query, setQuery] = useState<Partial<AdminSearchQuery>>({});
  const deptCode: CodeType[] = useGetGlobalCode('DEPT_CD');
  const deptNames = deptCode.map(({ codeNm }) => codeNm);
  const statusCode: CodeType[] = useGetGlobalCode('MEMBER_ST');
  const statusNames = statusCode
    .filter(({ codeNm }) => ['정상', '중지'].includes(codeNm))
    .map(({ codeNm }) => codeNm);

  const onSubmit = useCallback(() => {
    const clone = { ...query };

    if (clone.authorityId === '전체') {
      delete clone.authorityId;
    } else if (!!clone.authorityId) {
      clone.authorityId = authorityIds[clone.authorityId];
    }

    if (clone.deptNm === '전체') {
      delete clone.deptNm;
    } else if (!!clone.deptNm) {
      const findDeptCode = deptCode.find(
        (codes: CodeType) => codes.codeNm === clone.deptNm
      )!.code;

      clone.deptNm = findDeptCode;
    }

    if (clone.memberSt === '전체') {
      delete clone.memberSt;
    } else if (!!clone.memberSt) {
      const findStatusCode = statusCode.find(
        (codes: CodeType) => codes.codeNm === clone.memberSt
      )!.code;

      clone.memberSt = findStatusCode;
    }

    onSubmitHandler(clone);
  }, [onSubmitHandler, query]);

  const onChangeHandler = useCallback(
    (name, value) => {
      setQuery({ ...query, [name]: value });
    },
    [query]
  );

  return (
    <Box
      sx={{
        border: '1px solid #d7dae6',
        borderRadius: '20px',
      }}
    >
      <TableContainer>
        <SearchTable>
          <TableBody>
            <TableRow>
              <TableTextFieldCell
                division
                label={'아이디'}
                thWidth={'12%'}
                tdWidth={'38%'}
                onChange={(selected: string) => {
                  onChangeHandler('loginId', selected);
                }}
              />
              <TableTextFieldCell
                label={'이름'}
                thWidth={'12%'}
                tdWidth={'38%'}
                onChange={(selected: string) => {
                  onChangeHandler('memberNm', selected);
                }}
              />
            </TableRow>
            <TableRow>
              <TableSelectCell
                division
                label={'상태'}
                thWidth={'12%'}
                tdWidth={'38%'}
                selectLabel={['전체', ...statusNames]}
                onClick={(selected: string) => {
                  onChangeHandler('memberSt', selected);
                }}
              />
              <TableSelectCell
                label={'권한'}
                thWidth={'12%'}
                tdWidth={'38%'}
                selectLabel={['전체', ...authorityNames]}
                onClick={(selected: string) => {
                  onChangeHandler('authorityId', selected);
                }}
              />
            </TableRow>
            <TableRow>
              <TableSelectCell
                label={'부서명'}
                thWidth={'12%'}
                tdWidth={'38%'}
                selectLabel={['전체', ...deptNames]}
                onClick={(selected: string) => {
                  onChangeHandler('deptNm', selected);
                }}
              />
              <TableHeaderCell width={'12%'} />
              <TableBodyCell width={'30$'} />
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={4}
                style={{ textAlign: 'center', borderBottom: 'none' }}
              >
                <CustomButton label={'검색'} onClick={onSubmit} />
              </TableCell>
            </TableRow>
          </TableBody>
        </SearchTable>
      </TableContainer>
    </Box>
  );
};

type DataListProps = {
  pagination: Pagination;
  list: WithCustomRowData<AdminMemberData>[];
  onChangePaginationHandler?: (page: number, rowPerPage: number) => void;
};

const headCells = [
  {
    id: 'no',
    label: '번호',
  },
  {
    id: 'status',
    label: '상태',
  },
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'deptName',
    label: '부서명',
  },
  {
    id: 'name',
    label: '이름',
  },
  {
    id: 'rank',
    label: '직급',
  },
  {
    id: 'authority',
    label: '권한',
  },
];

const DataList = ({
  pagination,
  list,
  onChangePaginationHandler,
}: DataListProps) => {
  const navigate = useNavigate();

  const moveCreateAdmin = useCallback(() => {
    navigate('/adminAdd');
  }, [navigate]);

  return (
    <div>
      <TableComponents<AdminMemberData>
        onChangePagination={onChangePaginationHandler}
        {...pagination}
        headCells={headCells}
        bodyRows={list}
        showTotal={true}
        tableCell={(data, index: number) => {
          // const data = list.at(index) as any;
          return (
            <>
              {data ? (
                <>
                  <TableCell>{data.rn}</TableCell>
                  <TableCell>{data.memberStNm}</TableCell>
                  <TableCell>{data.loginId}</TableCell>
                  <TableCell>{data.deptNm}</TableCell>
                  <TableCell
                    style={{ color: 'skyblue', cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/adminDetail/${data.memberId}`);
                    }}
                  >
                    {data.memberNm}
                  </TableCell>
                  <TableCell>{data.postionNm}</TableCell>
                  <TableCell>{data.authorityNm}</TableCell>
                </>
              ) : (
                <></>
              )}
            </>
          );
        }}
        rightContent={
          <div>
            <CustomButton label="등록" type="small" onClick={moveCreateAdmin} />
            <CustomIconButton
              icon={Icons.FileDownload}
              startText={'엑셀저장'}
              style={{
                height: '40px',
                marginRight: '10px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            />
          </div>
        }
      />
    </div>
  );
};

const AdministratorAccountMgt = () => {
  const [list, setList] = useState<WithCustomRowData<AdminMemberData>[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    rowsPerPage: 15,
    rowCount: 0,
  });
  const [queries, setQueries] = useState({});

  const onChangePaginationHandler = (page: number, rowsPerPage: number) => {
    setPagination({ ...pagination, page, rowsPerPage });
  };

  const onSubmitHandler = useCallback(
    async (data: Partial<AdminSearchQuery> = {}) => {
      setQueries(data);
    },
    []
  );

  const clonePagination = { ...pagination };

  const paginationData = {
    page: clonePagination.page + 1,
    itemsPerPage: clonePagination.rowsPerPage,
  };

  const { data } = GetQuery('/member/api/insiders', {
    ...queries,
    ...paginationData,
  });
  useEffect(() => {
    if (!!data) {
      const { totalItems, list } = data;
      const addKeyList = list.map((l) => ({
        ...l,
        key: l.memberId,
      }));

      setList(addKeyList);
      setPagination({
        ...pagination,
        rowCount: totalItems,
      });
    }
  }, [data]);

  return (
    <TitleContents title={'관리자계정관리'}>
      <SearchBox onSubmitHandler={onSubmitHandler} />
      <VerticalInterval size={'60px'} />
      <DataList
        pagination={pagination}
        list={list}
        onChangePaginationHandler={onChangePaginationHandler}
      />
    </TitleContents>
  );
};

export default AdministratorAccountMgt;

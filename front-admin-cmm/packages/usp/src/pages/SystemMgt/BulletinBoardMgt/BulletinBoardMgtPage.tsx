// 게시판관리/ ->  게시판관리 페이지
import React, { useState } from 'react';
import { TitleContents } from 'shared/components/LayoutComponents';
import { Box, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { CustomButton } from 'shared/components/ButtonComponents';
import {
  SearchTable,
  TableSelectCell,
  TableTextFieldCell,
  TableComponents, WithCustomRowData,
} from 'shared/components/TableComponents';

import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { VerticalInterval } from 'shared/components/LayoutComponents';
import {
  BoardQuery,
  BoardItem,
} from '~/service/manager/bulletionBoard/service';
import Checkbox from '@mui/material/Checkbox';

import { AxiosGet } from '~/../../shared/src/libs/axios';
import { useNavigate } from 'react-router-dom';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';

const tabelHeads = [
  {
    id: 'no',
    label: '번호',
  },
  {
    id: 'boardId',
    label: '게시판 ID',
  },
  {
    id: 'boardNm',
    label: '게시판명',
  },
  {
    id: 'articleCnt',
    label: '게시글수',
  },
  {
    id: 'enabled',
    label: '사용여부',
  },
  {
    id: 'noticeAvailable',
    label: '고정공지사용여부',
  },
  {
    id: 'commentable',
    label: '댓글사용여부',
  },
  {
    id: 'category',
    label: '카테고리사용여부',
  },
  {
    id: 'attachable',
    label: '첨부가능',
  },
];

const BulletinBoardMgtPage = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState<Partial<BoardQuery>>({});
  const [list, setList] = useState<WithCustomRowData<BoardItem>[]>([]);

  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemNames: string[] = systemCodes.map((s: CodeType) => s.codeNm);

  const onSubmit = async () => {
    const query = { ...queries };
    if (!query.systemId) {
      return;
    }

    const findSystemId = systemCodes.find(
      (s: CodeType) => s.codeNm === query.systemId
    )!.code;

    query.systemId = findSystemId;

    try {
      const res = await AxiosGet('/common/api/boards', query);
      const addKeyList = res.list.map((l) => ({
        ...l,
        key: l.boardId,
      }));

      setList(addKeyList);
    } catch (error: any) {
      console.error(error);
    }
  };

  const onChangeHandler = (name, value) => {
    const clone = { ...queries };

    switch (name) {
      case 'enabled':
        if (value === '전체') {
          delete clone[name];
        } else {
          clone[name] = value === '사용';
        }
        break;
      default:
        clone[name] = value;
    }

    setQueries(clone);
  };

  const moveBoardDetail = (boardId) => {
    navigate(`/bulletInDetail/${boardId}`);
  };

  const moveAddBoard = () => {
    navigate('/bulletInAdd');
  };

  return (
    <TitleContents title="게시판 관리">
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
                <TableSelectCell
                  division
                  label={'포털구분'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  selectLabel={systemNames}
                  onClick={(selected: string) => {
                    onChangeHandler('systemId', selected);
                  }}
                />
                <TableSelectCell
                  label={'사용여부'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  selectLabel={['전체', '사용', '사용안함']}
                  onClick={(selected: string) => {
                    onChangeHandler('enabled', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  division
                  label={'게시판 ID'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('boardId', selected);
                  }}
                />
                <TableTextFieldCell
                  label={'게시판명'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('boardNm', selected);
                  }}
                />
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
      <VerticalInterval size={'60px'} />
      <TableComponents<BoardItem>
        page={0}
        rowsPerPage={list.length}
        rowCount={list.length}
        hidePagination={true}
        hideRowPerPage={true}
        headCells={tabelHeads}
        bodyRows={list}
        showTotal={true}
        tableCell={(data:WithCustomRowData<BoardItem>,index: number) => {
          // const data = list.at(index) as any;
          const checkboxCell = [
            'noticeAvailable',
            'commentable',
            'category',
            'attachable',
          ].map((key, i) => (
            <TableCell key={`${key}-${index}-${i}`}>
              <Checkbox disabled={true} checked={data[key]} size="small" />
            </TableCell>
          ));

          return (
            <>
              {data ? (
                <>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    style={{ color: 'skyblue', cursor: 'pointer' }}
                    onClick={moveBoardDetail.bind(this, data.boardId)}
                  >
                    {data.boardId}
                  </TableCell>
                  <TableCell>{data.boardNm}</TableCell>
                  <TableCell>{data.articleCnt}</TableCell>
                  <TableCell>{data.enabled ? '사용' : '사용안함'}</TableCell>
                  {checkboxCell}
                </>
              ) : (
                <></>
              )}
            </>
          );
        }}
        rightContent={
          <CustomButton label="등록" type="small" onClick={moveAddBoard} />
        }
      />
    </TitleContents>
  );
};

export default BulletinBoardMgtPage;

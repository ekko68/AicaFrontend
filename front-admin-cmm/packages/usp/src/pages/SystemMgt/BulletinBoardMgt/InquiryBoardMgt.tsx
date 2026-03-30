// 게시판관리/ ->  문의게시판관리 페이지
// import React from "react"
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
import { BoardQuery, BoardItem } from '~/service/manager/inquiry/service';
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
    id: 'qnaId',
    label: '게시판 ID',
  },
  {
    id: 'qnaNm',
    label: '게시판명',
  },
  {
    id: 'enabled',
    label: '사용여부',
  },
  {
    id: 'attachable',
    label: '첨부가능',
  },
];

const InquiryBoardMgt = () => {
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
      const res = await AxiosGet('/common/api/qna', query);
      const addKeyList = res.list.map((l: BoardItem) => ({
        ...l,
        key: l.qnaId,
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

  const moveBoardDetail = (qnaId) => {
    navigate(`/InquiryDetail/${qnaId}`);
  };

  const moveAddBoard = () => {
    navigate('/InquiryAdd');
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
                  defaultLabel={'전체'}
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
                    onChangeHandler('qnaId', selected);
                  }}
                />
                <TableTextFieldCell
                  label={'게시판명'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('qnaNm', selected);
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
        tableCell={(data: WithCustomRowData<BoardItem>,index: number) => {
          // const data = list.at(index) as any;
          return (
            <>
              {data ? (
                <>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    style={{ color: 'skyblue', cursor: 'pointer' }}
                    onClick={moveBoardDetail.bind(this, data.qnaId)}
                  >
                    {data.qnaId}
                  </TableCell>
                  <TableCell>{data.qnaNm}</TableCell>
                  <TableCell>{data.enabled ? '사용' : '사용안함'}</TableCell>
                  <TableCell>
                    <Checkbox
                      disabled={true}
                      checked={data.attachable}
                      size="small"
                    />
                  </TableCell>
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

export default InquiryBoardMgt;

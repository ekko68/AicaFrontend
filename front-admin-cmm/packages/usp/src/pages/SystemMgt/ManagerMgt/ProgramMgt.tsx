// 시스템관리/ ->  프로그램관리 페이지
import React, { useState, useEffect, useReducer } from 'react';
import { TitleContents, SubContents } from 'shared/components/LayoutComponents';

import { Box, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {
  SearchTable,
  TableSelectCell,
  TableComponents,
  TableTextFieldCell,
  TableTextCell,
  TableCheckboxCell, WithCustomRowData,
} from 'shared/components/TableComponents';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { CustomButton } from '~/components/ButtonComponents';
import { VerticalInterval } from 'shared/components/LayoutComponents';
import { Role, ProgramInfomation } from '~/service/system/program/Service';
import { ModalComponents } from '~/../../shared/src/components/ModalComponents';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import {
  AxiosGet,
  AxiosPost,
  AxiosDelete,
  AxiosPut,
} from '~/../../shared/src/libs/axios';
import Checkbox from '@mui/material/Checkbox';

interface ReducerInitialState {
  isShowing: boolean;
  data: Partial<ProgramInfomation>;
  programId?: string;
}

const initialState: ReducerInitialState = {
  isShowing: false,
  data: {},
  programId: '',
};

const reducerFn = (state, action) => {
  const clone = { ...state };
  const type = action.type;

  switch (type) {
    case 'ADD':
    case 'DETAIL': {
      clone.isShowing = true;
      clone.data = {};
      clone.data.systemId = action.systemId;

      if (type === 'DETAIL' && !!action.programId) {
        clone.programId = action.programId;
      }

      return clone;
    }

    case 'INPUT': {
      const { name, value } = action;
      clone.data[name] = value;

      return clone;
    }

    case 'OVERWRITE': {
      clone.data = { ...action.data };
      return clone;
    }

    case 'CLOSE': {
      return initialState;
    }
  }

  return initialState;
};

const INIT_TABELHEAD = [
  {
    id: 'no',
    label: '번호',
  },
  {
    id: 'programNm',
    label: '프로그램명',
  },
  {
    id: 'httpMethod',
    label: 'http Method',
  },
  {
    id: 'urlPattern',
    label: 'URL Pattern',
  },
];

const ProgramMgt = () => {
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemNamesMap = systemCodes.reduce((acc, cur: CodeType) => {
    acc[cur.codeNm] = cur.code;
    return acc;
  }, {});
  const systemNames: string[] = Object.keys(systemNamesMap);

  const [modalState, modalDispatch] = useReducer(reducerFn, initialState);
  const [roles, setRoles] = useState<Role[]>([]);
  const [tableHeadCells, setTableHeadCells] = useState([...INIT_TABELHEAD]);
  const [list, setList] = useState<WithCustomRowData<ProgramInfomation>[]>([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 0,
    rowCount: 0,
  });

  const onSubmit = async () => {
    const systemId = systemNamesMap[selectedOption];

    if (!systemId) {
      return;
    }

    try {
      const res = await AxiosGet('/member/api/auth/programs', {
        systemId,
      });

      const addKeyList = res.list.map((l) => ({
        ...l,
        key: l.programId,
      }));

      setList(addKeyList);
      setPagination({
        ...pagination,
        rowsPerPage: addKeyList.length,
        rowCount: addKeyList.length,
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  const openProgramAdd = () => {
    modalDispatch({ type: 'ADD', systemId: selectedOption });
  };

  const openProgramDetail = (programId) => {
    modalDispatch({
      type: 'DETAIL',
      programId,
      systemId: systemNamesMap[selectedOption],
    });
  };

  const closeModal = () => {
    modalDispatch({ type: 'CLOSE' });
  };

  const onChangeHandler = (name, value) => {
    modalDispatch({ type: 'INPUT', name, value });
  };

  const rolesToMap = (key) => {
    return [...roles].reduce((acc, { roleId, roleNm }) => {
      if (key === 'name') {
        acc[roleNm] = roleId;
      } else if (key === 'id') {
        acc[roleId] = roleNm;
      }
      return acc;
    }, {});
  };

  const isFullFill = (data): boolean => {
    const REQUIRED_KEYS = [
      'programNm',
      'systemId',
      'httpMethod',
      'urlPattern',
      'checkOrder',
      'roles',
    ];

    const isFull = REQUIRED_KEYS.every((key) => {
      if (key === 'roles') {
        return !!data[key].length;
      } else {
        return !!data[key];
      }
    });

    return isFull;
  };

  const requestAddProgram = async () => {
    const body = { ...modalState.data };
    body.systemId = systemNamesMap[body.systemId];

    const rolesMap = rolesToMap('name');

    if (!!body.roles) {
      body.roles = body.roles.map((v) => rolesMap[v]);
    }

    if (!isFullFill(body)) {
      return;
    }

    try {
      await AxiosPost('/member/api/auth/programs', body);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const requestModifyProgram = async () => {
    const programId = modalState.programId;
    if (!programId) {
      return;
    }
    const clone = { ...modalState.data };
    clone.systemId = systemNamesMap[clone.systemId];
    const rolesMap = rolesToMap('name');
    if (!!clone.roles) {
      clone.roles = clone.roles.map((v) => rolesMap[v]);
    }

    if (!isFullFill(clone)) {
      return;
    }

    try {
      await AxiosPut(`/member/api/auth/programs/${programId}`, clone);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const requestDeleteProgram = async () => {
    const programId = modalState.programId;
    if (!programId) {
      return;
    }

    try {
      await AxiosDelete(`/member/api/auth/programs/${programId}`);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const modalFooterButtonPressed = () => {
    if (!!modalState.programId) {
      requestModifyProgram();
    } else {
      requestAddProgram();
    }
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await AxiosGet('/member/api/auth/roles');

        setRoles(res.list);

        const reNameRoles = res.list.map((r) => ({
          id: r.roleId,
          label: r.roleNm,
        }));
        setTableHeadCells([...INIT_TABELHEAD, ...reNameRoles]);
      } catch (error: any) {
        console.error(error);
      }
    };

    getRoles();
  }, []);

  useEffect(() => {
    const programId = modalState.programId;

    const getProgramDetail = async () => {
      try {
        const res = await AxiosGet(`/member/api/auth/programs/${programId}`);

        const systemIdKr = systemCodes.find(
          (system: CodeType) => system.code === res.systemId
        )!.codeNm;

        res.systemId = systemIdKr;

        res.roles = [...roles]
          .filter((r) => res.roles.includes(r.roleId))
          .map((r) => r.roleNm);

        modalDispatch({ type: 'OVERWRITE', data: res });
      } catch (error: any) {
        console.error(error);
      }
    };

    if (!!programId) {
      getProgramDetail();
    }
  }, [modalState.programId]);

  useEffect(() => {
    if (!modalState.isShowing) {
      onSubmit();
    }
  }, [modalState.isShowing]);

  return (
    <>
      <ModalComponents
        type={modalState.type}
        open={modalState.isShowing}
        onClose={closeModal}
        onConfirm={modalFooterButtonPressed}
        isDist
      >
        <SubContents
          title={`프로그램 ${!!modalState.programId ? '상세' : '추가'}`}
          maxHeight="100%"
          rightContent={
            <>
              {!!modalState.programId && (
                <CustomButton
                  label="삭제"
                  type="small"
                  onClick={requestDeleteProgram}
                />
              )}
            </>
          }
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableTextCell
                    title={'포털구분'}
                    label={modalState.data.systemId}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                  />
                </TableRow>
                <TableRow>
                  <TableTextFieldCell
                    required={true}
                    label={'프로그램명'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    defaultLabel={modalState.data.programNm}
                    onChange={(selected: string) => {
                      onChangeHandler('programNm', selected);
                    }}
                  />
                </TableRow>
                <TableRow>
                  <TableTextFieldCell
                    required={true}
                    label={'검사순서'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    defaultLabel={modalState.data.checkOrder}
                    onChange={(selected: string) => {
                      onChangeHandler('checkOrder', selected);
                    }}
                  />
                </TableRow>
                <TableRow>
                  <TableSelectCell
                    required={true}
                    label={'Http Method'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    selectLabel={['GET', 'POST', 'PUT', 'DELETE']}
                    defaultLabel={modalState.data.httpMethod}
                    onClick={(selected: string) => {
                      onChangeHandler('httpMethod', selected);
                    }}
                  />
                </TableRow>
                <TableRow>
                  <TableTextFieldCell
                    required={true}
                    label={'URL Pattern'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    defaultLabel={modalState.data.urlPattern}
                    onChange={(selected: string) => {
                      onChangeHandler('urlPattern', selected);
                    }}
                  />
                </TableRow>
                <TableRow>
                  <TableCheckboxCell
                    required
                    label="역할 매핑"
                    checkboxs={roles.map((v) => v.roleNm)}
                    row={true}
                    defaultSelected={modalState.data.roles}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    onClick={(selected: string[]) => {
                      onChangeHandler('roles', selected);
                    }}
                  />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SubContents>
      </ModalComponents>
      <TitleContents title="프로그램 관리">
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
                    label={'포털구분'}
                    thWidth={'20%'}
                    tdWidth={'80%'}
                    selectLabel={systemNames}
                    defaultLabel={selectedOption}
                    onClick={(selected: string) => {
                      setSelectedOption(selected);
                    }}
                  />
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    style={{ textAlign: 'center', borderBottom: 'none' }}
                  >
                    <CustomButton label={'검색'} onClick={onSubmit} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </SearchTable>
          </TableContainer>
        </Box>
        <VerticalInterval size="60px" />
        <TableComponents<ProgramInfomation>
          {...pagination}
          headCells={tableHeadCells}
          bodyRows={list}
          showTotal={true}
          hidePagination={true}
          tableCell={(data, index: number) => {
            // const data = list.at(index) as any;

            const rolesCell = roles.map((r, i) => (
              <TableCell key={`${r.roleId}-${index}-${i}`}>
                <Checkbox
                  disabled={true}
                  checked={data.roles.includes(r.roleId)}
                  size="small"
                />
              </TableCell>
            ));

            return (
              <>
                {data ? (
                  <>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      style={{ color: 'skyblue', cursor: 'pointer' }}
                      onClick={openProgramDetail.bind(null, data.programId)}
                    >
                      {data.programNm}
                    </TableCell>
                    <TableCell>{data.httpMethod}</TableCell>
                    <TableCell>{data.urlPattern}</TableCell>
                    {rolesCell}
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          }}
          rightContent={
            <div>
              <CustomButton
                label="프로그램 추가"
                type="small"
                onClick={openProgramAdd}
              />
            </div>
          }
        />
      </TitleContents>
    </>
  );
};

export default ProgramMgt;

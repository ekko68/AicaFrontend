// 시스템관리/ ->  권한관리 페이지
import React, { useState, useEffect, useReducer } from 'react';

import { TableCell } from '@mui/material';
import { TitleContents, SubContents } from 'shared/components/LayoutComponents';
import {
  TableComponents,
  SearchTable,
  TableTextFieldCell,
  TableTextCell,
  TableCheckboxCell, WithCustomRowData,
} from 'shared/components/TableComponents';
import { CustomButton } from '~/components/ButtonComponents';
import { ModalComponents } from '~/../../shared/src/components/ModalComponents';
import Checkbox from '@mui/material/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import {
  AxiosGet,
  AxiosPut,
  AxiosDelete,
  AxiosPost,
} from '~/../../shared/src/libs/axios';

import { Role, AuthorityData } from '~/service/system/permission/Service';

interface ReducerInitialState {
  isShowing: boolean;
  data: Partial<AuthorityData>;
  authorityId?: string;
}

const initialState: ReducerInitialState = {
  isShowing: false,
  data: {},
  authorityId: '',
};

const reducerFn = (state, action) => {
  const clone = { ...state };
  const type = action.type;

  switch (type) {
    case 'ADD':
    case 'DETAIL': {
      clone.isShowing = true;
      clone.data = {};

      if (type === 'DETAIL' && !!action.authorityId) {
        clone.authorityId = action.authorityId;
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
    id: 'authorityId',
    label: '권한ID',
  },
  {
    id: 'authorityNm',
    label: '권한명',
  },
];

const PermissionMgt = () => {
  const [modalState, modalDispatch] = useReducer(reducerFn, initialState);
  const [tableHeadCells, setTableHeadCells] = useState([...INIT_TABELHEAD]);
  const [list, setList] = useState<WithCustomRowData<AuthorityData>[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

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

  const openPermissionAdd = () => {
    modalDispatch({ type: 'ADD' });
  };

  const openPermissionDetail = (authorityId) => {
    modalDispatch({ type: 'DETAIL', authorityId });
  };

  const closeModal = () => {
    modalDispatch({ type: 'CLOSE' });
  };

  const onChangeHandler = (name, value) => {
    modalDispatch({ type: 'INPUT', name, value });
  };

  const isFullFill = (type, data): boolean => {
    const requriedKeys = ['authorityNm', 'roleId'];

    if (type === 'add') {
      requriedKeys.push('authorityId');
    }

    const isFull = requriedKeys.every((key) => {
      if (key === 'roleId') {
        return !!data[key].length;
      } else {
        return !!data[key];
      }
    });

    return isFull;
  };

  const requestPermissionList = async () => {
    try {
      const res = await AxiosGet('/member/api/auth/authorities');

      const addKeyList = res.list.map((l) => ({
        ...l,
        key: l.authorityId,
      }));
      setList(addKeyList);
    } catch (error: any) {
      console.error(error);
    }
  };

  const requestDeletePermission = async () => {
    const authorityId = modalState.authorityId;
    if (!authorityId) {
      return;
    }

    try {
      await AxiosDelete(`/member/api/auth/authorities/${authorityId}`);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const requestAddPermission = async () => {
    const clone = { ...modalState.data };
    const rolesMap = rolesToMap('name');
    clone.roleId = clone.roles.map((v) => rolesMap[v]);

    delete clone.roles;

    if (!isFullFill('add', clone)) {
      return;
    }

    try {
      await AxiosPost('/member/api/auth/authorities', clone);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const requestModifyPermission = async () => {
    const authorityId = modalState.authorityId;
    if (!authorityId) {
      return;
    }

    const clone = { ...modalState.data };
    const { authorityNm, roles } = clone;

    const rolesToMapName = rolesToMap('name');

    const body: {
      authorityNm: string;
      roleId?: string[];
    } = {
      authorityNm,
    };

    if (!!roles) {
      body.roleId = roles.map((v) => rolesToMapName[v]);
    }

    if (!isFullFill('modify', body)) {
      return;
    }

    try {
      await AxiosPut(`/member/api/auth/authorities/${authorityId}`, body);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const modalFooterButtonPressed = () => {
    if (!!modalState.authorityId) {
      requestModifyPermission();
    } else {
      requestAddPermission();
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
    const authorityId = modalState.authorityId;

    const getPemissionDetail = async () => {
      try {
        const res = await AxiosGet(
          `/member/api/auth/authorities/${authorityId}`
        );

        const rolesMap = rolesToMap('id');
        res.roles = res.roles.map((v) => rolesMap[v]);

        modalDispatch({ type: 'OVERWRITE', data: res });
      } catch (error: any) {
        console.error(error);
      }
    };

    if (!!authorityId) {
      getPemissionDetail();
    }
  }, [modalState.authorityId]);

  useEffect(() => {
    if (!modalState.isShowing) {
      requestPermissionList();
    }
  }, [modalState.isShowing]);

  return (
    <>
      <ModalComponents
        type="save"
        open={modalState.isShowing}
        onClose={closeModal}
        onConfirm={modalFooterButtonPressed}
        isDist
      >
        <SubContents
          title={`권한${!!modalState.authorityId ? '상세' : '추가'}`}
          maxHeight="100%"
          hideDivision={true}
          rightContent={
            <>
              {!!modalState.authorityId && (
                <CustomButton
                  label="삭제"
                  type="small"
                  onClick={requestDeletePermission}
                />
              )}
            </>
          }
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {!!modalState.authorityId ? (
                    <TableTextCell
                      title={'권한 ID'}
                      label={modalState.data.authorityId}
                      thWidth={'12%'}
                      tdWidth={'38%'}
                    />
                  ) : (
                    <TableTextFieldCell
                      required={true}
                      label={'권한 ID'}
                      thWidth={'12%'}
                      tdWidth={'38%'}
                      defaultLabel={modalState.data.authorityId}
                      onChange={(selected: string) => {
                        onChangeHandler('authorityId', selected);
                      }}
                    />
                  )}
                </TableRow>
                <TableRow>
                  <TableTextFieldCell
                    required={true}
                    label={'권한명'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    defaultLabel={modalState.data.authorityNm}
                    onChange={(selected: string) => {
                      onChangeHandler('authorityNm', selected);
                    }}
                  />
                </TableRow>
                {/* <TableRow>
                  <TableCheckboxCell
                    label="관리자 여부"
                    checkboxs={['관리자']}
                    row={true}
                    // defaultSelected={modalState.data.roles}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                  />
                </TableRow> */}
                <TableRow>
                  <TableCheckboxCell
                    label="역할 매핑"
                    required={true}
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
      <TitleContents title="권한관리">
        <TableComponents<AuthorityData>
          page={0}
          rowsPerPage={list.length}
          rowCount={list.length}
          hidePagination={true}
          hideRowPerPage={true}
          headCells={tableHeadCells}
          bodyRows={list}
          showTotal={true}
          tableCell={(data, index: number) => {
            // const data = list.at(index) as any;

            const roleList = roles.map((r, i) => (
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
                      onClick={openPermissionDetail.bind(
                        this,
                        data.authorityId
                      )}
                    >
                      {data.authorityId}
                    </TableCell>
                    <TableCell>{data.authorityNm}</TableCell>
                    {roleList}
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          }}
          rightContent={
            <CustomButton
              label="권한 추가"
              type="small"
              onClick={openPermissionAdd}
            />
          }
        />
      </TitleContents>
    </>
  );
};

export default PermissionMgt;

/*
  시스템관리/ -> 역할관리
*/
import React, {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  useState,
  useEffect,
} from 'react';
import { TitleContents, SubContents } from 'shared/components/LayoutComponents';
import { CustomButton } from '~/components/ButtonComponents';
import styled from '@emotion/styled';
import {
  AxiosGet,
  AxiosPost,
  AxiosDelete,
  AxiosPut,
} from '~/../../shared/src/libs/axios';
import {
  TableCell,
  Stack,
  MenuItem,
  TextField,
  Select,
  Checkbox,
} from '@mui/material';
import {
  TableTextCell,
  TableTextFieldCell,
  TableComponents,
  WithCustomRowData,
} from 'shared/components/TableComponents';
import { SelectChangeEvent } from '@mui/material/Select';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import {
  RoleInformation,
  RoleData,
  MenuData,
} from '~/service/system/feature/service';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import { VerticalInterval } from 'shared/components/LayoutComponents';
import { ModalComponents } from '~/../../shared/src/components/ModalComponents';

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface Modal {
  isShowing: boolean;
  modalType?: string;
  id?: string;
}

interface State {
  roleInformation: RoleInformation;
  modal: Modal;
}

type Action =
  | { type: 'SET_ROLEINFO'; name: string; code: string }
  | { type: 'REMOVE_ROLEINFO' }
  | { type: 'OPEN'; modalType?: string; id?: string }
  | { type: 'CLOSE' };
type DispatchType = Dispatch<Action>;

const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<DispatchType | null>(null);

const reducer = (state: State, action: Action): State => {
  const clone = { ...state };

  switch (action.type) {
    case 'SET_ROLEINFO': {
      const { name, code } = action;
      clone.roleInformation = { name, code };
      return clone;
    }

    case 'REMOVE_ROLEINFO': {
      clone.roleInformation = { name: '', code: '' };
      return clone;
    }

    case 'OPEN': {
      clone.modal.isShowing = true;
      clone.modal.modalType = action.modalType;
      clone.modal.id = action.id;
      return clone;
    }

    case 'CLOSE': {
      clone.modal.isShowing = false;
      return clone;
    }

    default: {
      return clone;
    }
  }
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    roleInformation: {
      code: '',
      name: '',
    },
    modal: {
      isShowing: false,
    },
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useContextState = () => {
  const state = useContext(StateContext);
  if (!state) throw new Error('Cannot find Provider'); // 유효하지 않을땐 에러를 발생
  return state;
};

const useContextDispatch = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('Cannot find Provider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
};

const ModalWrap = () => {
  const {
    roleInformation: { code },
  } = useContextState();
  const [inputsData, setInputsData] = useState<Partial<RoleData>>({});
  const {
    modal: { isShowing, modalType, id },
  } = useContextState();
  const dispatch = useContextDispatch();

  const title = `역할 ${modalType === 'add' ? '추가' : '상세'}`;

  const isFullFill = (data) => ['roleId', 'roleNm'].every((key) => !!data[key]);

  const onCloseModal = () => {
    dispatch({ type: 'CLOSE' });
  };

  const onSaveHandler = async () => {
    const body = { ...inputsData };

    if (!isFullFill(body)) {
      return;
    }

    const frm = new FormData();

    Object.entries(body).forEach(([k, v]) => {
      frm.append(k, v);
    });

    try {
      await AxiosPost('/member/api/auth/roles', frm, {
        contentType: 'formData',
      });
      onCloseModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onModifyHandler = async () => {
    if (!id) {
      return;
    }

    const body = { ...inputsData };

    if (!isFullFill(body)) {
      return;
    }

    const { roleId, roleNm } = body;

    const frm = new FormData();
    frm.append('roleNm', roleNm as string);

    try {
      await AxiosPut(`/member/api/auth/roles/${roleId}`, frm, {
        contentType: 'formData',
      });
      onCloseModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onDeleteHandler = async () => {
    if (!id) {
      return;
    }

    try {
      await AxiosDelete(`/member/api/auth/roles/${id}`);
      onCloseModal();

      if (id === code) {
        dispatch({ type: 'REMOVE_ROLEINFO' });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const onConfirmHandler = () => {
    if (modalType === 'add') {
      onSaveHandler();
    } else {
      onModifyHandler();
    }
  };

  const onChangeHandler = (name: string, value: string) => {
    setInputsData({ ...inputsData, [name]: value });
  };

  useEffect(() => {
    if (!isShowing) {
      setInputsData({});
    }
  }, [isShowing]);

  useEffect(() => {
    const getRoleDetail = async () => {
      try {
        const { roleId, roleNm } = await AxiosGet(
          `/member/api/auth/roles/${id}`
        );
        setInputsData({ roleId, roleNm });
      } catch (error: any) {
        console.error(error);
      }
    };

    if (!!id) {
      getRoleDetail();
    }
  }, [id]);

  return (
    <ModalComponents
      open={isShowing}
      onClose={onCloseModal}
      onConfirm={onConfirmHandler}
      isDist
      type="save"
    >
      <SubContents
        title={title}
        maxHeight="100%"
        hideDivision
        rightContent={
          <>
            {modalType === 'modify' && (
              <CustomButton
                type="small"
                label="삭제"
                onClick={onDeleteHandler}
              />
            )}
          </>
        }
      >
        <TableContainer sx={{ borderTop: '1px solid #d7dae6' }}>
          <Table>
            <TableBody>
              <TableRow>
                {modalType === 'add' ? (
                  <TableTextFieldCell
                    required
                    label="역할ID"
                    thWidth={'13%'}
                    tdWidth={'21%'}
                    additionContent={
                      <span>역할 ID는 “ROLE_”로 시작해야 합니다.</span>
                    }
                    onChange={(text: string) => {
                      onChangeHandler('roleId', text);
                    }}
                  />
                ) : (
                  <TableTextCell
                    title="역할ID"
                    label={inputsData.roleId}
                    thWidth={'13%'}
                    tdWidth={'21%'}
                  />
                )}
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  required
                  label="역할명"
                  thWidth={'13%'}
                  tdWidth={'21%'}
                  defaultLabel={inputsData.roleNm}
                  onChange={(text: string) => {
                    onChangeHandler('roleNm', text);
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
    </ModalComponents>
  );
};

const RoleTableHeadCells = [
  {
    id: 'no',
    label: '번호',
  },
  {
    id: 'roleId',
    label: '역할코드',
  },
  {
    id: 'roleNm',
    label: '역할명',
  },
  {
    id: 'button',
    label: '메뉴 조회',
  },
];

const RoleTable = () => {
  const {
    modal: { isShowing },
  } = useContextState();
  const dispatch = useContextDispatch();
  const [list, setList] = useState<WithCustomRowData<RoleData>[]>([]);
  const openDetailRoleModal = (id) => {
    dispatch({ type: 'OPEN', modalType: 'modify', id });
  };

  const requestRoleList = async () => {
    try {
      const res = await AxiosGet('/member/api/auth/roles');
      const addKeyList = res.list.map((r) => ({
        ...r,
        key: r.roleId,
      }));

      setList(addKeyList);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isShowing) {
      requestRoleList();
    }
  }, [isShowing]);

  return (
    <TableComponents<RoleData>
      page={0}
      rowsPerPage={list.length}
      rowCount={list.length}
      hidePagination={true}
      hideRowPerPage={true}
      headCells={RoleTableHeadCells}
      bodyRows={list}
      tableCell={(data, index: number) => {
        return (
          <>
            {data ? (
              <>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  style={{ color: 'skyblue', cursor: 'pointer' }}
                  onClick={openDetailRoleModal.bind(this, data.roleId)}
                >
                  {data.roleId}
                </TableCell>
                <TableCell>{data.roleNm}</TableCell>
                <TableCell>
                  <CustomButton
                    type="small"
                    label="메뉴조회"
                    onClick={() => {
                      dispatch({
                        type: 'SET_ROLEINFO',
                        name: data.roleNm,
                        code: data.roleId,
                      });
                    }}
                  />
                </TableCell>
              </>
            ) : (
              <></>
            )}
          </>
        );
      }}
    />
  );
};

const MenuTableHeadCells = [
  {
    id: 'no',
    label: '번호',
  },
  {
    id: 'parentMenuId',
    label: '상위메뉴',
  },
  {
    id: 'menuNm',
    label: '메뉴명',
  },
  {
    id: 'remark',
    label: '설명',
  },
  {
    id: 'enabled',
    label: '사용여부',
  },
];

const MenuTable = () => {
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const { roleInformation } = useContextState();
  const [selectedSystemId, setSelectedSystemId] = useState<string>('');
  const [list, setList] = useState<WithCustomRowData<MenuData>[]>([]);

  const onSaveHandler = async () => {
    const clone: WithCustomRowData<MenuData>[] = [...list];
    const exceptNotEnabledMenuIds = clone
      .filter((item: MenuData) => item.enabled)
      .map((item: MenuData) => item.menuId);

    const frm = new FormData();

    exceptNotEnabledMenuIds.forEach((id) => {
      frm.append('menuId', id);
    });

    try {
      const res = await AxiosPut(
        `/member/api/auth/menu-roles/${selectedSystemId}/${roleInformation.code}`,
        frm,
        {
          contentType: 'formData',
        }
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  const onCheckBoxClickHandler = (id: string, checked: boolean) => {
    const clone: WithCustomRowData<MenuData>[] = [...list];
    const findIndex = clone.findIndex((item: MenuData) => item.menuId === id);

    if (findIndex !== -1) {
      clone[findIndex].enabled = checked;
      setList(clone);
    }
  };

  const onSubmitHandler = async () => {
    if (!selectedSystemId || !roleInformation.code) {
      return;
    }

    try {
      const res = await AxiosGet(
        `/member/api/auth/menu-roles/${selectedSystemId}/${roleInformation.code}`
      );
      const addKeyList = res.list.map((l) => ({
        ...l,
        key: l.menuId,
      }));

      setList(addKeyList);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!!selectedSystemId && !!roleInformation.code) {
      onSubmitHandler();
    } else {
      setList([]);
    }
  }, [selectedSystemId, roleInformation.code]);

  return (
    <Stack direction="column">
      <Stack alignItems="center" justifyContent="space-between" direction="row">
        <Stack alignItems="center" direction="row" spacing={3}>
          <Stack alignItems="center" direction="row">
            포털구분
            <Select
              sx={{ minWidth: '200px' }}
              size={'small'}
              value={selectedSystemId}
              onChange={(event: SelectChangeEvent) => {
                setSelectedSystemId(event.target.value);
              }}
            >
              {systemCodes.map((system) => (
                <MenuItem key={system.code} value={system.code}>
                  {system.codeNm}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack alignItems="center" direction="row">
            역할코드
            <TextField
              disabled={true}
              value={roleInformation.code}
              sx={{ minWidth: '200px' }}
              variant={'outlined'}
              size={'small'}
            />
          </Stack>
          <Stack alignItems="center" direction="row">
            역할명
            <TextField
              disabled={true}
              value={roleInformation.name}
              sx={{ minWidth: '200px' }}
              variant={'outlined'}
              size={'small'}
            />
          </Stack>
        </Stack>
        <Stack>
          <CustomButton type="small" label="저장" onClick={onSaveHandler} />
        </Stack>
      </Stack>
      <VerticalInterval size="60px" />
      <SubContents title="메뉴 목록" maxHeight="100%">
        <TableComponents<MenuData>
          page={0}
          rowsPerPage={list.length}
          rowCount={list.length}
          hidePagination={true}
          hideRowPerPage={true}
          headCells={MenuTableHeadCells}
          bodyRows={list}
          tableCell={(data, index: number) => {
            return (
              <>
                {data ? (
                  <>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.parentMenuId}</TableCell>
                    <TableCell>{data.menuNm}</TableCell>
                    <TableCell>{data.remark}</TableCell>
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={data.enabled}
                        onClick={onCheckBoxClickHandler.bind(
                          this,
                          data.menuId,
                          !data.enabled
                        )}
                      />
                    </TableCell>
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          }}
        />
      </SubContents>
    </Stack>
  );
};

const Inner = () => {
  const dispatch = useContextDispatch();

  const openAddRoleModal = () => {
    dispatch({ type: 'OPEN', modalType: 'add' });
  };

  return (
    <>
      <ModalWrap />
      <TitleContents title="역할관리">
        <Head>
          <CustomButton
            type="small"
            label="역할추가"
            onClick={openAddRoleModal}
          />
        </Head>
        <VerticalInterval size="30px" />
        <RoleTable />
        <VerticalInterval size="60px" />
        <MenuTable />
      </TitleContents>
    </>
  );
};

const FeatureManagement = () => {
  return (
    <Provider>
      <Inner />
    </Provider>
  );
};

export default FeatureManagement;

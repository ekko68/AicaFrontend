// // 시스템관리/ ->  메뉴관리 페이지
import React, { useState, useReducer, useEffect } from 'react';
import { TitleContents, SubContents } from 'shared/components/LayoutComponents';

import { Box, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {
  SearchTable,
  TableSelectCell,
  TableComponents,
  TableTextFieldCell,
  TableRadioCell,
  TableTextCell,
  WithCustomRowData,
} from 'shared/components/TableComponents';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { CustomButton } from '~/components/ButtonComponents';
import { VerticalInterval } from 'shared/components/LayoutComponents';
import Radio from '@mui/material/Radio';
import { ModalComponents } from '~/../../shared/src/components/ModalComponents';
import { MenuItem, AddMenuData } from '~/service/system/menu/Service';
import {
  AxiosGet,
  AxiosPost,
  AxiosDelete,
  AxiosPut,
} from '~/../../shared/src/libs/axios';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';

interface ModalState {
  isShowing: boolean;
  type?: string;
  id?: string | null;
  systemId?: string;
}

interface ModalWrapProps extends ModalState {
  closeModal: () => void;
}

const ModalWrap = ({
  isShowing,
  id,
  type,
  closeModal,
  systemId,
}: ModalWrapProps) => {
  const title = `메뉴 ${type === 'add' ? '추가' : '상세'}`;
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemNames: string[] = systemCodes.map(
    (system: CodeType) => system.codeNm
  );

  const [inputsData, setInputsData] = useState<Partial<AddMenuData>>({});

  const onChangeHandler = (name, value) => {
    setInputsData({ ...inputsData, [name]: value });
  };

  useEffect(() => {
    const getMenuDetail = async () => {
      if (!systemId) {
        return;
      }

      try {
        const res = await AxiosGet(`/member/api/auth/menus/${systemId}/${id}`);
        res.systemId = systemCodes.find(
          (system: CodeType) => system.code === res.systemId
        )!.codeNm;
        setInputsData(res);
      } catch (error: any) {
        console.log(error);
      }
    };

    if (type === 'add') {
      setInputsData({
        systemId,
        parentMenuId: id,
        newWindow: true,
      });
    } else {
      getMenuDetail();
    }
  }, [type]);

  const onAddHandler = async () => {
    const clone = { ...inputsData };

    if (!!clone.parentMenuId) {
      clone.baseMenuId = clone.parentMenuId;
      delete clone.parentMenuId;
    }

    if (!!clone.systemId) {
      clone.systemId = systemCodes.find(
        (system: CodeType) => system.codeNm === clone.systemId
      )!.code;
    }

    clone.relation = 'CHILD';

    const { systemId: sysId, ...body } = clone;

    const frm = new FormData();

    [
      'baseMenuId',
      'relation',
      'menuId',
      'menuNm',
      'url',
      'newWindow',
      'remark',
    ].forEach((key) => {
      if (body.hasOwnProperty(key)) {
        frm.append(key, body[key]);
      }
    });

    try {
      await AxiosPost(`/member/api/auth/menus/${sysId}`, frm, {
        contentType: 'formData',
      });

      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onModifyHandler = async () => {
    if (!systemId || !id) {
      return;
    }

    const clone = { ...inputsData };

    if (!!clone.systemId) {
      clone.systemId = systemCodes.find(
        (system: CodeType) => system.codeNm === clone.systemId
      )!.code;
    }

    if (!clone.remark) {
      delete clone.remark;
    }

    const frm = new FormData();

    ['menuNm', 'url', 'newWindow', 'remark'].forEach((key) => {
      if (clone.hasOwnProperty(key)) {
        frm.append(key, clone[key]);
      }
    });

    try {
      await AxiosPut(`/member/api/auth/menus/${systemId}/${id}`, frm, {
        contentType: 'formData',
      });
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onConfirmHandler = () => {
    if (type === 'add') {
      onAddHandler();
    } else {
      onModifyHandler();
    }
  };

  const onDeleteHandler = async () => {
    if (!id || !systemId) {
      return;
    }

    try {
      await AxiosDelete(`/member/api/auth/menus/${systemId}/${id}`);
      closeModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <ModalComponents
      isDist
      type="save"
      open={isShowing}
      onClose={closeModal}
      onConfirm={onConfirmHandler}
    >
      <SubContents
        title={title}
        maxHeight="100%"
        hideDivision={isShowing}
        rightContent={
          <>
            {type === 'detail' && (
              <CustomButton
                label="삭제"
                type="small"
                onClick={onDeleteHandler}
              />
            )}
          </>
        }
      >
        <TableContainer
          sx={{ borderTop: '1px solid #d7dae6', width: 'max-content' }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={'포털구분'}
                  division
                  label={inputsData.systemId || ''}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                />
                <TableTextCell
                  title={'부모메뉴ID'}
                  label={inputsData.parentMenuId || ''}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                />
              </TableRow>
              <TableRow>
                {type === 'add' ? (
                  <TableTextFieldCell
                    required={true}
                    label={'메뉴 ID'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    defaultLabel={inputsData.menuId}
                    onChange={(selected: string) => {
                      onChangeHandler('menuId', selected);
                    }}
                    division
                  />
                ) : (
                  <TableTextCell
                    title={'메뉴 ID'}
                    division
                    label={inputsData.menuId || ''}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                  />
                )}
                <TableTextFieldCell
                  required={true}
                  label={'메뉴명'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  defaultLabel={inputsData.menuNm}
                  onChange={(selected: string) => {
                    onChangeHandler('menuNm', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableRadioCell
                  required={true}
                  division
                  radioLabel={['예', '아니오']}
                  label={'새창여부'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  defaultLabel={inputsData.newWindow ? '예' : '아니오'}
                  onClick={(selected: string) => {
                    onChangeHandler('newWindow', selected === '예');
                  }}
                  row={true}
                />
                <TableTextFieldCell
                  required={true}
                  label={'URL'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  defaultLabel={inputsData.url}
                  onChange={(selected: string) => {
                    onChangeHandler('url', selected);
                  }}
                />
              </TableRow>
              {/* <TableRow>
                <TableTextFieldCell
                  label={'정렬순서'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {}}
                  tdSpan={4}
                />
              </TableRow> */}
              <TableRow>
                <TableTextFieldCell
                  label={'설명'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  tdSpan={4}
                  defaultLabel={inputsData.remark || ''}
                  onChange={(selected: string) => {
                    onChangeHandler('remark', selected);
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

const SearchForm = ({ onSubmitHandler }) => {
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemNames: string[] = systemCodes.map(
    (system: CodeType) => system.codeNm
  );

  const [selectedOption, setSelectedOption] = useState<string>('');

  const onChangeHandler = (option: string) => {
    setSelectedOption(option);
  };

  const onSubmit = () => {
    if (!selectedOption) {
      return;
    }

    const findSystemCode = systemCodes.find(
      (system: CodeType) => system.codeNm === selectedOption
    ) as CodeType;

    const systemId: string = findSystemCode.code;

    onSubmitHandler(systemId);
  };

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
              <TableSelectCell
                label={'포털구분'}
                thWidth={'20%'}
                tdWidth={'80%'}
                selectLabel={systemNames}
                onClick={(selected: string) => {
                  onChangeHandler(selected);
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
  );
};

const headCells = [
  {
    id: 'check',
    label: '',
  },
  {
    id: 'order',
    label: '정렬순서',
  },
  {
    id: 'parentId',
    label: '상위메뉴ID',
  },
  {
    id: 'menuId',
    label: '메뉴ID',
  },
  {
    id: 'name',
    label: '메뉴명',
  },
  {
    id: 'newPage',
    label: '새창여부',
  },
  {
    id: 'url',
    label: 'URL',
  },
  {
    id: 'Explanation',
    label: '설명',
  },
];

const MenuList = ({ list, openModalHandler }) => {
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');

  const onChangeHandler = (event) => {
    setSelectedMenuId(event.target.value);
  };

  useEffect(() => {
    setSelectedMenuId('');
  }, [list]);

  return (
    <div>
      <TableComponents<MenuItem>
        page={0}
        rowsPerPage={list.length}
        rowCount={list.length}
        hidePagination={true}
        hideRowPerPage={true}
        headCells={headCells}
        bodyRows={list}
        showTotal={true}
        tableCell={(data) => {
          // const data = list.at(index) as any;
          return (
            <>
              {data ? (
                <>
                  <TableCell>
                    <Radio
                      size="small"
                      onClick={onChangeHandler}
                      checked={selectedMenuId === data.menuId}
                      value={data.menuId}
                      name="radio"
                    />
                  </TableCell>
                  <TableCell>{data.sortOrder}</TableCell>
                  <TableCell>{data.parentMenuId}</TableCell>
                  <TableCell
                    style={{ color: 'skyblue', cursor: 'pointer' }}
                    onClick={() => {
                      openModalHandler({
                        type: 'detail',
                        id: data.menuId,
                        systemId: data.systemId,
                      });
                    }}
                  >
                    {data.menuId}
                  </TableCell>
                  <TableCell>{data.menuNm}</TableCell>
                  <TableCell>{data.newWindow ? '예' : '아니오'}</TableCell>
                  <TableCell>{data.url}</TableCell>
                  <TableCell>{data.remark}</TableCell>
                </>
              ) : (
                <></>
              )}
            </>
          );
        }}
        rightContent={
          <div>
            메뉴를 추가할 위치의 메뉴를 선택한 후 추가 버튼을 눌러주세요.
            <CustomButton
              label="메뉴 추가"
              type="small"
              disabled={!selectedMenuId}
              onClick={() => {
                const findSelectedMenu = list.find(
                  (l: MenuItem) => l.menuId === selectedMenuId
                ) as MenuItem;

                const findSystemName = systemCodes.find(
                  (system: CodeType) =>
                    system.code === findSelectedMenu.systemId
                )!.codeNm;

                openModalHandler({
                  type: 'add',
                  id: findSelectedMenu.parentMenuId || findSelectedMenu.menuId, //parentMenuId가 없다면 ROOT라는 뜻 루트의 경우 부모아이디가 없으므로 자기 ID 사용
                  systemId: findSystemName,
                });
              }}
            />
          </div>
        }
      />
    </div>
  );
};

const MenuMgt = () => {
  const [list, setList] = useState<WithCustomRowData<MenuItem>[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    isShowing: false,
  });
  const [prevOption, setPrevOption] = useState<string>('');

  const onSubmitHandler = async (systemId: string) => {
    try {
      const res = await AxiosGet(`/member/api/auth/menus/${systemId}`);

      const addKeyList = res.list.map((l: MenuItem) => ({
        ...l,
        key: l.menuId,
      }));

      setList(addKeyList);
      setPrevOption(systemId);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!modalState.isShowing) {
      if (!!prevOption) {
        onSubmitHandler(prevOption);
      }
    }
  }, [modalState.isShowing]);

  const openModalHandler = ({
    type,
    id,
    systemId,
  }: {
    type: string;
    id: string | null;
    systemId?: string;
  }) => {
    setModalState({ isShowing: true, type, id, systemId });
  };

  const closeModal = () => {
    setModalState({ isShowing: false });
  };

  return (
    <>
      <ModalWrap {...modalState} closeModal={closeModal} />
      <TitleContents title="메뉴관리">
        <SearchForm onSubmitHandler={onSubmitHandler} />
        <VerticalInterval size="60px" />
        <MenuList list={list} openModalHandler={openModalHandler} />
      </TitleContents>
    </>
  );
};

export default MenuMgt;

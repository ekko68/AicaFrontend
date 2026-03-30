// 코드관리/ ->  공통코드관리 페이지
import React, {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  useState,
  useEffect,
} from 'react';

import { TitleContents, SubContents } from 'shared/components/LayoutComponents';
import { Box, TableCell } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {
  SearchTable,
  TableComponents,
  TableTextFieldCell,
  TableDateCell,
  TableTextCell, WithCustomRowData,
} from 'shared/components/TableComponents';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { CustomButton } from '~/components/ButtonComponents';
import {
  HolidaysQuery,
  Summary,
  Holiday,
  ExclHoliday,
} from '~/service/code/holiday/service';
import {
  AxiosGet,
  AxiosPost,
  AxiosPut,
  AxiosDelete,
} from '~/../../shared/src/libs/axios';
import dayjs from '~/../../shared/src/libs/dayjs';
import styled from '@emotion/styled';
import {
  VerticalInterval,
  HorizontalInterval,
} from 'shared/components/LayoutComponents';
import { ModalComponents } from '~/../../shared/src/components/ModalComponents';

const Bottom = styled.div`
  display: flex;

  & > article {
    flex: 1;
  }
`;

const SummaryTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface List {
  summary: WithCustomRowData<Summary>[];
  holidays: WithCustomRowData<Holiday>[];
  exclHolidays: WithCustomRowData<ExclHoliday>[];
}

type ModalType = 'holiday' | 'exceptHoliday';

interface Modal {
  isShowing: boolean;
  type?: ModalType;
  id?: string;
}

interface State {
  list: List;
  modal: Modal;
}

type Action =
  | {
      type: 'SET_LIST';
      summary: WithCustomRowData<Summary>[];
      holidays: WithCustomRowData<Holiday>[];
      exclHolidays: WithCustomRowData<ExclHoliday>[];
    }
  | { type: 'OPEN'; modalType: ModalType; id?: string }
  | { type: 'CLOSE' };

type DispatchType = Dispatch<Action>;

const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<DispatchType | null>(null);

const reducer = (state: State, action: Action): State => {
  const clone = { ...state };

  switch (action.type) {
    case 'SET_LIST': {
      clone.list.summary = action.summary;
      clone.list.holidays = action.holidays;
      clone.list.exclHolidays = action.exclHolidays;

      return clone;
    }

    case 'OPEN': {
      clone.modal.isShowing = true;
      clone.modal.type = action.modalType;

      if (!!action.id) {
        clone.modal.id = action.id;
      }

      return clone;
    }

    case 'CLOSE': {
      delete clone.modal.type;
      delete clone.modal.id;
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
    list: {
      summary: [],
      holidays: [],
      exclHolidays: [],
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

const SearchForm = () => {
  const dispatch = useContextDispatch();
  const [queries, setQueries] = useState<Partial<HolidaysQuery>>({});
  const {
    modal: { isShowing },
  } = useContextState();

  useEffect(() => {
    if (!isShowing) {
      onSubmitHandler();
    }
  }, [isShowing]);

  const onSubmitHandler = async () => {
    const query = { ...queries };

    if (!query.year) {
      return;
    }

    try {
      const res = await AxiosGet('/common/api/holidays', query);
      const { exclHolidays, holidays, summary } = res;
      dispatch({ type: 'SET_LIST', exclHolidays, holidays, summary });
    } catch (error: any) {
      console.error(error);
    }
  };

  const onChangeHandler = (name: string, value: string) => {
    setQueries({ ...queries, [name]: value });
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
              <TableTextFieldCell
                division
                label="연도"
                thWidth="12%"
                tdWidth="38%"
                onChange={(text: string) => {
                  onChangeHandler('year', text);
                }}
              />
              <TableTextFieldCell
                label="날짜명"
                thWidth="12%"
                tdWidth="38%"
                onChange={(text: string) => {
                  onChangeHandler('ymdNm', text);
                }}
              />
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={4}
                style={{ textAlign: 'center', borderBottom: 'none' }}
              >
                <CustomButton label={'검색'} onClick={onSubmitHandler} />
              </TableCell>
            </TableRow>
          </TableBody>
        </SearchTable>
      </TableContainer>
    </Box>
  );
};

const summaryTableHeads = [
  {
    id: 'ym',
    label: '월구분',
  },
  {
    id: 'totalCnt',
    label: '총일수',
  },
  {
    id: 'saturdayCnt',
    label: '토요일',
  },
  {
    id: 'sundayCnt',
    label: '일요일',
  },
  {
    id: 'holidayCnt',
    label: '공휴일/대체휴일',
  },
  {
    id: 'dsgnHolidayCnt',
    label: '사용자지정휴일',
  },
  {
    id: 'exclHolidayCnt',
    label: '휴일제외등록일',
  },
  {
    id: 'workingDayCnt',
    label: '워킹 데이수',
  },
];

const SummaryTable = () => {
  const dispatch = useContextDispatch();
  const {
    list: { summary },
  } = useContextState();

  const tableChildren = summary.map((s) => ({
    ...s,
    key: s.ym,
  }));

  const addModalOpen = (modalType) => {
    dispatch({ type: 'OPEN', modalType });
  };

  return (
    <article>
      <SummaryTableHead>
        <CustomButton
          label="휴일제외등록"
          type="small"
          onClick={addModalOpen.bind(this, 'exceptHoliday')}
        />
        <CustomButton
          label="휴일등록"
          type="small"
          onClick={addModalOpen.bind(this, 'holiday')}
        />
      </SummaryTableHead>
      <VerticalInterval size="40px" />
      <TableComponents<Summary>
        page={0}
        rowsPerPage={tableChildren.length}
        rowCount={tableChildren.length}
        hidePagination={true}
        hideRowPerPage={true}
        headCells={summaryTableHeads}
        bodyRows={tableChildren}
        tableCell={(data: WithCustomRowData<Summary>,index: number) => {
          // const data = tableChildren.at(index) as any;

          const tableCells = summaryTableHeads
            .map(({ id }) => id)
            .map((id) => (
              <TableCell key={`${id}-${index}`}>
                {id === 'ym' ? dayjs(data.ym).format('M월') : data[id]}
              </TableCell>
            ));

          return <>{data ? <>{tableCells}</> : <></>}</>;
        }}
      />
    </article>
  );
};

const HolidayTableHeads = [
  {
    id: 'ymd',
    label: '날짜',
  },
  {
    id: 'ymdNm',
    label: '날짜명',
  },
  {
    id: 'userDsgn',
    label: '휴일구분',
  },
];

const HolidayTable = () => {
  const {
    list: { holidays },
  } = useContextState();
  const dispatch = useContextDispatch();

  const tableChildren = holidays.map((s) => ({
    ...s,
    key: s.ymd,
  }));

  return (
    <article>
      <SubContents title="휴일정보" maxHeight="100%">
        <TableComponents<Holiday>
          page={0}
          rowsPerPage={tableChildren.length}
          rowCount={tableChildren.length}
          hidePagination={true}
          hideRowPerPage={true}
          headCells={HolidayTableHeads}
          bodyRows={tableChildren}
          tableCell={(data: WithCustomRowData<Holiday>,index: number) => {
            // const data = tableChildren.at(index) as any;

            return (
              <>
                {data ? (
                  <>
                    <TableCell>
                      {dayjs(data.ymd).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell
                      style={{ color: 'skyblue', cursor: 'pointer' }}
                      onClick={() => {
                        dispatch({
                          type: 'OPEN',
                          modalType: 'holiday',
                          id: data.ymd,
                        });
                      }}
                    >
                      {data.ymdNm}
                    </TableCell>
                    <TableCell>
                      {data.userDsgn ? '사용자지정공휴일' : '공휴일/대체휴일'}
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
    </article>
  );
};

const ExclHolidayTableHeads = [
  {
    id: 'ymd',
    label: '날짜',
  },
  {
    id: 'ymdNm',
    label: '날짜명',
  },
  {
    id: 'exclReason',
    label: '휴일제외사유',
  },
];

const ExclHolidayTable = () => {
  const {
    list: { exclHolidays },
  } = useContextState();
  const dispatch = useContextDispatch();

  const tableChildren = exclHolidays.map((s) => ({
    ...s,
    key: s.ymd,
  }));

  return (
    <article>
      <SubContents title="휴일제외정보" maxHeight="100%">
        <TableComponents<ExclHoliday>
          page={0}
          rowsPerPage={tableChildren.length}
          rowCount={tableChildren.length}
          hidePagination={true}
          hideRowPerPage={true}
          headCells={ExclHolidayTableHeads}
          bodyRows={tableChildren}
          tableCell={(data: WithCustomRowData<ExclHoliday>, index: number) => {
            // const data = tableChildren.at(index) as any;

            return (
              <>
                {data ? (
                  <>
                    <TableCell>
                      {dayjs(data.ymd).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell
                      style={{ color: 'skyblue', cursor: 'pointer' }}
                      onClick={() => {
                        dispatch({
                          type: 'OPEN',
                          modalType: 'exceptHoliday',
                          id: data.ymd,
                        });
                      }}
                    >
                      {data.ymdNm}
                    </TableCell>
                    <TableCell>{data.exclReason}</TableCell>
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          }}
        />
      </SubContents>
    </article>
  );
};

type ModalInputData = ExclHoliday & Holiday;

const ModalWrap = () => {
  const dispatch = useContextDispatch();
  const { modal }: { modal: Modal } = useContextState();
  const { id, type, isShowing } = modal;
  const title = `${
    { holiday: '휴일', exceptHoliday: '휴일제외' }[type || '']
  } ${!!id ? '상세' : '등록'}`;
  const baseURL = `/common/api/${
    type === 'exceptHoliday' ? 'except-' : ''
  }holidays`;
  const [modalInputData, setModalInputData] = useState<Partial<ModalInputData>>(
    { ymd: dayjs().format('YYYYMMDD') }
  );

  const onCloseHandler = () => {
    dispatch({ type: 'CLOSE' });
  };

  const onAddHandler = async () => {
    const body = { ...modalInputData };

    const isFullFill = ['ymd', 'ymdNm'].every((k) => !!body[k]);

    if (!isFullFill) {
      return;
    }

    try {
      await AxiosPost(baseURL, body);
      onCloseHandler();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onModifyHandler = async () => {
    if (!id) {
      return;
    }

    const { ymdNm, exclReason } = { ...modalInputData };

    if (!ymdNm) {
      return;
    }

    const body = {
      ymdNm,
      ...(type === 'exceptHoliday' &&
        !!exclReason && {
          exclReason,
        }),
    };

    try {
      await AxiosPut(`${baseURL}/${id}`, body);
      onCloseHandler();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onConfirmHandler = () => {
    if (!!id) {
      onModifyHandler();
    } else {
      onAddHandler();
    }
  };

  const onDeleteHandler = async () => {
    if (!id) {
      return;
    }

    try {
      await AxiosDelete(`${baseURL}/${id}`);
      onCloseHandler();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onChangeHandler = (name: string, value: string) => {
    setModalInputData({ ...modalInputData, [name]: value });
  };

  useEffect(() => {
    if (!isShowing) {
      setModalInputData({
        ymd: dayjs().format('YYYYMMDD'),
      });
    }
  }, [isShowing]);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await AxiosGet(`${baseURL}/${id}`);
        setModalInputData(res);
      } catch (error: any) {
        console.error(error);
      }
    };

    if (!!id) {
      getDetail();
    }
  }, [id]);

  return (
    <ModalComponents
      type="save"
      open={isShowing}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      isDist
    >
      <SubContents
        title={title}
        maxHeight="100%"
        hideDivision={true}
        rightContent={
          <>
            {!!id && (
              <CustomButton
                label="삭제"
                type="small"
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
                {!!id ? (
                  <TableTextCell
                    label={dayjs(modalInputData.ymd).format('YYYY-MM-DD')}
                    title="날짜"
                    thWidth={'12%'}
                    tdWidth={'38%'}
                  />
                ) : (
                  <TableDateCell
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    label="날짜"
                    onChange={(date: Date) => {
                      const dateString = dayjs(date).format('YYYYMMDD');
                      onChangeHandler('ymd', dateString);
                    }}
                  />
                )}
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  required={true}
                  label={'날짜명'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  defaultLabel={modalInputData.ymdNm}
                  onChange={(text: string) => {
                    onChangeHandler('ymdNm', text);
                  }}
                />
              </TableRow>
              {type === 'exceptHoliday' && (
                <TableRow>
                  <TableTextFieldCell
                    label={'제외사유'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    defaultLabel={modalInputData.exclReason}
                    onChange={(text: string) => {
                      onChangeHandler('exclReason', text);
                    }}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
    </ModalComponents>
  );
};

const Inner = () => {
  return (
    <>
      <ModalWrap />
      <TitleContents title="휴일 관리">
        <SearchForm />
        <VerticalInterval size="100px" />
        <SummaryTable />
        <VerticalInterval size="100px" />
        <Bottom>
          <HolidayTable />
          <HorizontalInterval size="30px" />
          <ExclHolidayTable />
        </Bottom>
      </TitleContents>
    </>
  );
};

const HolidayMgt = () => {
  return (
    <Provider>
      <Inner />
    </Provider>
  );
};

export default HolidayMgt;

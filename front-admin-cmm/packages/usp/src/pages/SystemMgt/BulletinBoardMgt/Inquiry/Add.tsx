import React, {
  useState,
  useEffect,
  createContext,
  Dispatch,
  useReducer,
  useContext,
} from 'react';
import {TableCell} from '@mui/material';
import {TitleContents, SubContents} from 'shared/components/LayoutComponents';
import TableContainer from '@mui/material/TableContainer';
import {
  SearchTable,
  TableSelectCell,
  TableTextFieldCell,
  TableTextCell,
  TableCheckboxCell,
  TableComponents, WithCustomRowData,
} from 'shared/components/TableComponents';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import {CustomButton} from '~/components/ButtonComponents';

import {ModalComponents} from '~/../../shared/src/components/ModalComponents';

import {VerticalInterval} from 'shared/components/LayoutComponents';
import {AxiosPost, AxiosGet} from '~/../../shared/src/libs/axios';
import {
  AnswerQuery,
  AnswerResult,
  Qna,
} from '~/service/manager/inquiry/service';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import {useNavigate} from 'react-router-dom';
import styled from '@emotion/styled';

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

type State = {
  list: WithCustomRowData<AnswerResult>[];
  isModalShowing: boolean;
};

type Action =
  | { type: 'SET'; arr: AnswerResult[] }
  | { type: 'REMOVE'; keys: string[] }
  | { type: 'OPEN' }
  | { type: 'CLOSE' };

type DispatchType = Dispatch<Action>;

export const StateContext = createContext<State | null>(null);
export const DispatchContext = createContext<DispatchType | null>(null);

export const reducer = (state: State, action: Action): State => {
  const clone = {...state};

  switch (action.type) {
    case 'SET':
      clone.list = [...action.arr];
      return clone;

    case 'REMOVE':
      clone.list = clone.list.filter(({key}) => !action.keys.includes(key));
      return clone;

    case 'OPEN':
      clone.isModalShowing = true;
      return clone;

    case 'CLOSE':
      clone.isModalShowing = false;
      return clone;
  }
};

const ContextProvider = ({children}: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    list: [],
    isModalShowing: false,
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
  if (!state) throw new Error('TodosProvider not found!');
  return state;
};

const useContextDispatch = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
};

export const Form = ({
                       formType,
                       saveHandler,
                       deleteHandler,
                       initValue = {},
                     }) => {
  const [data, setData] = useState<Partial<Qna>>({...initValue});
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemNames: string[] = systemCodes.map((s: CodeType) => s.codeNm);

  const navigate = useNavigate();

  const onClickHandler = (type) => {
    switch (type) {
      case 'delete':
        if (!!deleteHandler) {
          deleteHandler();
        }
        break;
      case 'save':
        saveHandler({...data});
        break;
      case 'list':
        navigate('/SystemMgt/BulletinBoardMgt/InquiryBoardMgt');
        break;
    }
  };

  const onChangeHandler = (name, value) => {
    const clone = {...data};
    setData({...clone, [name]: value});
  };

  return (
    <div>
      <Top>
        {formType === 'modify' && (
          <CustomButton
            label="삭제"
            type="small"
            onClick={onClickHandler.bind(this, 'delete')}
          />
        )}
        <CustomButton
          label="저장"
          type="small"
          onClick={onClickHandler.bind(this, 'save')}
        />
        <CustomButton
          label="목록"
          type="small"
          onClick={onClickHandler.bind(this, 'list')}
        />
      </Top>
      <VerticalInterval size="30px"/>
      <SubContents title="기본정보" maxHeight="100%">
        <TableContainer sx={{borderTop: '1px solid #d7dae6'}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableSelectCell
                  label={'포털구분'}
                  tdSpan={3}
                  thWidth={'20%'}
                  tdWidth={'80%'}
                  selectLabel={systemNames}
                  defaultLabel={data.systemId}
                  onClick={(selected: string) => {
                    onChangeHandler('systemId', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                {formType === 'add' ? (
                  <TableTextFieldCell
                    label={'게시판ID'}
                    required={true}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    division
                    additionContent={<span>{"게시판 ID는 ‘영문/숫자/-’ 만 사용가능하며 소문자로 입력해야합니다."}</span>}
                    defaultLabel={data.qnaId}
                    onChange={(selected: string) => {
                      onChangeHandler('qnaId', selected);
                    }}
                  />
                ) : (
                  <TableTextCell
                    label={data.qnaId || ''}
                    title="계시판ID"
                    division
                    thWidth={'12%'}
                    tdWidth={'38%'}
                  />
                )}

                <TableTextFieldCell
                  required={true}
                  label={'게시판 명'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  defaultLabel={data.qnaNm}
                  onChange={(selected: string) => {
                    onChangeHandler('qnaNm', selected);
                  }}
                />
              </TableRow>
              {/* <TableRow>
                <TableTextCell
                  // label={data.url || '게시판 저장 후 자동 생성됩니다.' API 스펙에 URL이 존재하지 않음
                  label={'게시판 저장 후 자동 생성됩니다.'}
                  title="계시판 URL"
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  tdSpan={3}
                />
              </TableRow> */}
              <TableRow>
                <TableCheckboxCell
                  tdSpan={3}
                  row
                  label="게시판 옵션"
                  defaultSelected={data.options}
                  checkboxs={['첨부가능', '카테고리 사용여부']}
                  onClick={(selected) => {
                    onChangeHandler('options', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  label={'카테고리 코드그룹'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  division
                  additionContent={<span>{"공통코드의 코드그룹을 입력해주세요."}</span>}
                  defaultLabel={data.categoryCodeGroup}
                  onChange={(selected: string) => {
                    onChangeHandler('categoryCodeGroup', selected);
                  }}
                />
                <TableTextFieldCell
                  label={'첨부파일크기제한(MB)'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  defaultLabel={String(data.attachmentSize || '')}
                  additionContent={<span>{"무제한으로 설정하려면 '0'을 입력해주세요."}</span>}
                  onChange={(selected: string) => {
                    onChangeHandler('attachmentSize', Number(selected || ''));
                  }}
                />
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  label={'첨부파일확장자'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  tdSpan={3}
                  defaultLabel={data.attachmentExt}
                  additionContent={
                    <span>{"확장자는 대소문자를 구분하지 않습니다. 확장자와 확장자 사이에 ‘/’ 를 입력하여 복수 등록 가능합니다."}</span>
                  }
                  onChange={(selected: string) => {
                    onChangeHandler('attachmentExt', selected);
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <VerticalInterval size="30px"/>
    </div>
  );
};

const modalTabelHeads = [
  {
    id: 'no',
    label: '번호',
  },
  {
    id: 'memberId',
    label: '아이디',
  },
  {
    id: 'deptNm',
    label: '부서명',
  },
  {
    id: 'memberNm',
    label: '이름',
  },
  {
    id: 'positionNm',
    label: '직급',
  },
  {
    id: 'authorityNm',
    label: '권한',
  },
];

export const AddAnswerModal = ({modalShowing}) => {
  const dispatch = useContextDispatch();
  const {list: existingList} = useContextState();

  const [query, setQuery] = useState<Partial<AnswerQuery>>({});
  const [list, setList] = useState<WithCustomRowData<AnswerResult>[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onChangeHandler = (name, value) => {
    setQuery({...query, [name]: value});
  };

  const onConfirmHandler = () => {
    const cloneSelectedIds = [...selectedIds];
    const selectedUsersList = [...list].filter(({key}) =>
      cloneSelectedIds.includes(key)
    );

    dispatch({type: 'SET', arr: [...existingList, ...selectedUsersList]});
    dispatch({type: 'CLOSE'});
    setSelectedIds([]);
  };

  const onSearchHandler = async () => {
    const queries = {...query};

    try {
      const res = await AxiosGet('/member/api/insiders/pic', queries);
      const addKeyList = res.list.map((r: AnswerResult) => ({
        ...r,
        key: r.memberId,
      }));

      setList(addKeyList);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (modalShowing) {
      setQuery({});
      setList([]);
    }
  }, [modalShowing]);

  return (
    <>
      <ModalComponents
        open={modalShowing}
        onClose={() => {
          dispatch({type: 'CLOSE'});
        }}
        onConfirm={onConfirmHandler}
        isDist
        type="save"
      >
        <SubContents title="답변자 추가" maxHeight="400px" hideDivision={true}>
          <TableContainer style={{width: 'max-content'}}>
            <SearchTable>
              <TableBody>
                <TableRow>
                  <TableTextFieldCell
                    label={'부서명'}
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    tdSpan={3}
                    onChange={(selected: string) => {
                      onChangeHandler('deptNm', selected);
                    }}
                  />
                </TableRow>
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
                  <TableCell
                    colSpan={4}
                    style={{textAlign: 'center', borderBottom: 'none'}}
                  >
                    <CustomButton
                      label={'검색'}
                      onClick={onSearchHandler}
                      type="small"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </SearchTable>
          </TableContainer>
          <TableComponents<AnswerResult>
            page={0}
            isCheckBox={true}
            rowsPerPage={list.length}
            rowCount={list.length}
            hidePagination={true}
            hideRowPerPage={true}
            headCells={modalTabelHeads}
            bodyRows={list}
            onSelectedKey={(keys: string[]) => {
              setSelectedIds(keys);
            }}
            tableCell={(data: WithCustomRowData<AnswerResult>, index: number) => {
              return (
                <>
                  {data ? (
                    <>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.loginId}</TableCell>
                      <TableCell>{data.deptNm}</TableCell>
                      <TableCell>{data.memberNm}</TableCell>
                      <TableCell>{data.positionNm}</TableCell>
                      <TableCell>{data.authorityNm}</TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            }}
          />
        </SubContents>
      </ModalComponents>
    </>
  );
};

const tabelHeads = [
  {
    id: 'memberId',
    label: '아이디',
  },
  {
    id: 'memberNm',
    label: '이름',
  },
  {
    id: 'deptNm',
    label: '부서명',
  },
  {
    id: 'positionNm',
    label: '직급',
  },
];

export const ListAnswers = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {list} = useContextState();
  const dispatch = useContextDispatch();

  const openModal = () => {
    dispatch({type: 'OPEN'});
  };

  const onDelete = () => {
    dispatch({type: 'REMOVE', keys: [...selectedIds]});
  };

  return (
    <SubContents
      title="답변자 목록"
      maxHeight="100%"
      rightContent={
        <div>
          <CustomButton label="삭제" type="small" onClick={onDelete}/>
          <CustomButton label="추가" type="small" onClick={openModal}/>
        </div>
      }
    >
      <TableComponents<AnswerResult>
        page={0}
        isCheckBox={true}
        rowsPerPage={list.length}
        rowCount={list.length}
        hidePagination={true}
        hideRowPerPage={true}
        headCells={tabelHeads}
        bodyRows={list}
        onSelectedKey={(keys: string[]) => {
          setSelectedIds(keys);
        }}
        tableCell={(data, index: number) => {
          // const data = list.at(index) as any;
          return (
            <>
              {data ? (
                <>
                  <TableCell>{data.memberId}</TableCell>
                  <TableCell>{data.memberNm}</TableCell>
                  <TableCell>{data.deptNm}</TableCell>
                  <TableCell>{data.positionNm}</TableCell>
                </>
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
    </SubContents>
  );
};

const Inner = () => {
  const navigate = useNavigate();
  const {isModalShowing, list} = useContextState();
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemIdsMap = systemCodes.reduce((acc, cur: CodeType) => {
    acc[cur.codeNm] = cur.code;
    return acc;
  }, {});

  const onSaveHandler = async (data) => {
    const cloneList = [...list].map((l) => l.memberId);
    const clone = {...data};
    clone.systemId = systemIdsMap[clone.systemId];

    const OPTION_MAP = {
      첨부가능: 'attachable',
      '카테고리 사용여부': 'category',
    };

    Object.keys(OPTION_MAP).forEach((key) => {
      const optionValue = clone.options.includes(key);
      clone[OPTION_MAP[key]] = optionValue;
    });

    delete clone.options;

    const body = {
      qna: {...clone},
      answererList: cloneList,
    };

    try {
      const res = await AxiosPost('/common/api/qna', body);
      navigate(`/InquiryDetail/${res.qnaId}`);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <TitleContents title="문의 게시판 추가">
      <AddAnswerModal modalShowing={isModalShowing}/>
      <Form
        formType="add"
        saveHandler={onSaveHandler}
        deleteHandler={() => {
        }}
      />
      <ListAnswers/>
    </TitleContents>
  );
};

const Add = () => {
  return (
    <ContextProvider>
      <Inner/>
    </ContextProvider>
  );
};

export default Add;

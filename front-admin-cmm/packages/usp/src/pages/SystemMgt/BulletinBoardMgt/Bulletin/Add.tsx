import React, {useState, useEffect} from 'react';
import {TitleContents, SubContents} from 'shared/components/LayoutComponents';
import TableContainer from '@mui/material/TableContainer';
import {
  TableSelectCell,
  TableTextFieldCell,
  TableTextCell,
  TableCheckboxCell,
  TableRadioCell,
} from 'shared/components/TableComponents';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import {CustomButton} from '~/components/ButtonComponents';

import {useNavigate} from 'react-router-dom';
import {VerticalInterval} from 'shared/components/LayoutComponents';
import {AxiosPost} from '~/../../shared/src/libs/axios';
import {BoradInfomation} from '~/service/manager/bulletionBoard/service';
import {useGetAuthonrity} from '~/../../shared/src/utils/hooks/useGetAuthonrity';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import styled from '@emotion/styled';

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OPTIONS = [
  '고정공지사용여부',
  '댓글사용여부',
  '카테고리 사용여부',
  '첨부가능',
];

type ReduceReturnType = {
  [key: string]: string;
};

export const getOptionsMap = (key) => {
  const map = {
    ko: OPTIONS,
    id: ['noticeAvailable', 'commentable', 'category', 'attachable'],
  };

  const result = map.ko.reduce((acc, _, index) => {
    const [k, v] = key === 'ko' ? ['ko', 'id'] : ['id', 'ko'];
    acc[map[k][index]] = map[v][index];
    return acc;
  }, {});

  return result;
};

export const Form = ({
                       formType,
                       saveHandler,
                       deleteHandler,
                       initValue = {},
                     }) => {
  const [data, setData] = useState<Partial<BoradInfomation>>({...initValue});
  const {authorityIds} = useGetAuthonrity();
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
        navigate('/SystemMgt/BulletinBoardMgt/BulletinBoardMgtPage');
        break;
    }
  };

  const authorityChangeHandler = (key, value) => {
    const obj = {...(data.authority || {}), [key]: value};
    onChangeHandler('authority', obj);
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
                  required
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
                    defaultLabel={data.boardId}
                    additionContent={<span>{"게시판 ID는 ‘영문/숫자/-’ 만 사용가능하며 소문자로 입력해야합니다."}</span>}
                    onChange={(selected: string) => {
                      onChangeHandler('boardId', selected);
                    }}
                  />
                ) : (
                  <TableTextCell
                    label={data.boardId || ''}
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
                  defaultLabel={data.boardNm}
                  onChange={(selected: string) => {
                    onChangeHandler('boardNm', selected);
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
              {formType === 'modify' && (
                <TableRow>
                  <TableRadioCell
                    thWidth={'12%'}
                    tdWidth={'38%'}
                    label="사용여부"
                    radioLabel={['사용', '사용안함']}
                    defaultLabel={data.enabled}
                    tdSpan={3}
                    row
                    onClick={(selected) => {
                      onChangeHandler('enabled', selected);
                    }}
                  />
                </TableRow>
              )}

              <TableRow>
                <TableCheckboxCell
                  tdSpan={3}
                  row
                  label="게시판 옵션"
                  defaultSelected={data.options}
                  checkboxs={OPTIONS}
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
                  division
                  defaultLabel={String(data.attachmentSize || '')}
                  additionContent={<span>{"무제한으로 설정하려면 '0'을 입력해주세요."}</span>}
                  onChange={(selected: string) => {
                    onChangeHandler('attachmentSize', selected);
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
              <TableRow>
                <TableRadioCell
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  division
                  label="Thumbnail 사용"
                  radioLabel={['예', '아니오']}
                  defaultLabel={data.useThumbnail}
                  row
                  onClick={(selected) => {
                    onChangeHandler('useThumbnail', selected);
                  }}
                />
                <TableRadioCell
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  label="양식 사용"
                  radioLabel={['예', '아니오']}
                  defaultLabel={data.useForm}
                  row
                  onClick={(selected) => {
                    onChangeHandler('useForm', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableRadioCell
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  label="공유 URL 사용"
                  radioLabel={['예', '아니오']}
                  defaultLabel={data.useSharedUrl}
                  row
                  onClick={(selected) => {
                    onChangeHandler('useSharedUrl', selected);
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <VerticalInterval size="30px"/>
      <SubContents title={'권한매핑'} maxHeight="100%">
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableRadioCell
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  label="모든 사용자 조회가능 여부"
                  radioLabel={['조회가능', '조회불가']}
                  tdSpan={3}
                  defaultLabel={data.allReadable}
                  row
                  onClick={(selected) => {
                    onChangeHandler('allReadable', selected);
                  }}
                />
              </TableRow>
              {Object.keys(authorityIds).map((name) => {
                const id = authorityIds[name];
                const findValue = (data.authority || {})[id];

                return (
                  <TableRow key={id}>
                    <TableRadioCell
                      thWidth={'12%'}
                      tdWidth={'38%'}
                      label={name}
                      radioLabel={['조회권한', '쓰기권한', '관리자권한']}
                      tdSpan={3}
                      defaultLabel={findValue}
                      row
                      onClick={(selected) => {
                        authorityChangeHandler(id, selected);
                      }}
                    />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
    </div>
  );
};

const Add = () => {
  const navigate = useNavigate();
  const boardAuthorityCodes: CodeType[] = useGetGlobalCode('BOARD_AUTHORITY');
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemIdsMap = systemCodes.reduce((acc, cur: CodeType) => {
    acc[cur.codeNm] = cur.code;
    return acc;
  }, {});
  const [init, setInit] = useState({
    allReadable: '조회가능',
    useThumbnail: '예',
    useForm: '예',
    useSharedUrl: '예',
  });

  const {authorityIds} = useGetAuthonrity();
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);

  useEffect(() => {
    if ('{}' !== JSON.stringify(authorityIds)) {
      const authorityInit = Object.values(
        authorityIds
      ).reduce<ReduceReturnType>((acc, cur) => {
        const key: string = cur as string;
        acc[key] = '조회권한';
        return acc;
      }, {});

      setInit({...init, ...{authority: authorityInit}});
      setIsRequestCompleted(true);
    }
  }, [authorityIds]);

  const processData = (data) => {
    try {
      const clone = {...data};

      clone.systemId = systemIdsMap[clone.systemId];

      ['useForm', 'useSharedUrl', 'useThumbnail'].forEach((key) => {
        clone[key] = clone[key] === '예';
      });

      clone.allReadable = clone.allReadable === '조회가능';

      clone.attachmentSize = Number(clone.attachmentSize);

      clone.enabled = true;

      const optionsMap = getOptionsMap('ko');
      Object.keys(optionsMap).forEach((k) => {
        clone[optionsMap[k]] = clone.options.includes(k);
      });
      delete clone.options;

      const {authority, ...board} = clone;

      return {
        board,
        authority,
      };
    } catch (error: any) {
      console.error('Not FullFill');
    }
  };

  const isFullFill = (data) => {
    const {authority, board} = data;

    if (JSON.stringify(authority) === '{}') {
      return false;
    }

    const requriedKeys = ['boardId', 'boardNm', 'systemId'];
    const isFull = requriedKeys.every((key) => board.hasOwnProperty(key));
    return isFull;
  };

  const onSubmit = async (data) => {
    const body = processData(data);

    if (!isFullFill(body)) {
      return;
    }

    try {
      const res = await AxiosPost('/common/api/boards', body);
      navigate(`/bulletInDetail/${res.boardId}`);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <TitleContents title="게시판 추가">
      {isRequestCompleted && (
        <Form
          formType="add"
          saveHandler={onSubmit}
          deleteHandler={() => {
          }}
          initValue={init}
        />
      )}
    </TitleContents>
  );
};

export default Add;

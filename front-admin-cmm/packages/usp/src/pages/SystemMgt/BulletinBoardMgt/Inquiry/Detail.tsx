import React, { useState, useEffect, useReducer, useContext } from 'react';
import { AxiosGet, AxiosPut, AxiosDelete } from '~/../../shared/src/libs/axios';
import { useParams } from 'react-router-dom';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import { Qna } from '~/service/manager/inquiry/service';

import { StateContext, DispatchContext, reducer } from './Add';
import { TitleContents } from '~/../../shared/src/components/LayoutComponents';
import { Form, AddAnswerModal, ListAnswers } from './Add';
import { useNavigate } from 'react-router-dom';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
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

const Inner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const [initValues, setInitValues] = useState<Partial<Qna>>({});
  const [isRequestCompleted, setIsRequestCompleted] = useState<boolean>(false);
  const dispatch = useContextDispatch();
  const { isModalShowing, list } = useContextState();

  useEffect(() => {
    const getBoardDetail = async () => {
      try {
        const res = await AxiosGet(`/common/api/qna/${id}`);

        const findSystemId = systemCodes.find(
          (system: CodeType) => system.code === res.systemId
        )!.codeNm;

        res.systemId = findSystemId;

        const OPTION_MAP = {
          attachable: '첨부가능',
          category: '카테고리 사용여부',
        };

        res.options = [];

        Object.keys(OPTION_MAP).forEach((key) => {
          const optionValue = res[key];

          if (optionValue) {
            res.options.push(OPTION_MAP[key]);
          }
        });

        const { answererList, ...rest } = res;
        const addKeyAnswererList = answererList.map((l) => ({
          ...l,
          key: l.memberId,
        }));

        setInitValues(rest);
        dispatch({ type: 'SET', arr: addKeyAnswererList });
        setIsRequestCompleted(true);
      } catch (error: any) {
        console.error(error);
      }
    };

    if (!!id && !!systemCodes.length) {
      getBoardDetail();
    }
  }, [id, systemCodes]);

  const onModifyHandler = async (data) => {
    const cloneList = [...list].map((l) => l.memberId);
    const clone = { ...data };

    const findSystemId = systemCodes.find(
      (system: CodeType) => clone.systemId === system.codeNm
    )!.code;

    clone.systemId = findSystemId;

    const OPTION_MAP = {
      첨부가능: 'attachable',
      '카테고리 사용여부': 'category',
    };

    Object.keys(OPTION_MAP).forEach((key) => {
      const optionValue = clone.options.includes(key);
      clone[OPTION_MAP[key]] = optionValue;
    });

    delete clone.options;

    const { qnaId, ...rest } = clone;

    const body = {
      qna: { ...rest },
      answererList: cloneList,
    };

    try {
      const res = await AxiosPut(`/common/api/qna/${qnaId}`, body);
    } catch (error: any) {
      console.error(error);
    }
  };

  const onDeleteHandler = async () => {
    if (!id) {
      return;
    }

    try {
      await AxiosDelete(`/common/api/qna/${id}`);
      navigate('/SystemMgt/BulletinBoardMgt/InquiryBoardMgt');
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <TitleContents title="문의 게시판 상세">
      {isRequestCompleted && (
        <>
          <AddAnswerModal modalShowing={isModalShowing} />
          <Form
            formType="modify"
            saveHandler={onModifyHandler}
            deleteHandler={onDeleteHandler}
            initValue={initValues}
          />
          <ListAnswers />
        </>
      )}
    </TitleContents>
  );
};

const Detail = () => {
  return (
    <ContextProvider>
      <Inner />
    </ContextProvider>
  );
};

export default Detail;

import React, { useState, useEffect } from 'react';
import { Form } from './Add';
import { TitleContents } from 'shared/components/LayoutComponents';
import { useParams } from 'react-router-dom';
import { AxiosGet, AxiosDelete, AxiosPut } from '~/../../shared/src/libs/axios';
import { BoradInfomation } from '~/service/manager/bulletionBoard/service';
import { getOptionsMap } from './Add';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const [initValues, setInitValues] = useState<Partial<BoradInfomation>>();
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const systemCodes: CodeType[] = useGetGlobalCode('SYSTEM_ID');
  const systemIdsMap = systemCodes.reduce((acc, cur: CodeType) => {
    acc[cur.codeNm] = cur.code;
    return acc;
  }, {});
  const { id } = useParams();
  const boardAuthorityCodes: CodeType[] = useGetGlobalCode('BOARD_AUTHORITY');

  const processData = (data) => {
    try {
      const clone = { ...data };

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

      const { authority, ...board } = clone;

      return {
        board,
        authority,
      };
    } catch (error: any) {
      console.error('Not FullFill');
    }
  };

  const isFullFill = (data) => {
    const { authority, board } = data;

    if (JSON.stringify(authority) === '{}') {
      return false;
    }

    const requriedKeys = ['boardId', 'boardNm', 'systemId'];
    const isFull = requriedKeys.every((key) => board.hasOwnProperty(key));
    return isFull;
  };

  const onSubmitHandler = async (data) => {
    const body = processData(data);

    if (!isFullFill(body)) {
      return;
    }

    try {
      await AxiosPut(`/common/api/boards/${id}`, body);
    } catch (error: any) {
      console.error(error);
    }
  };

  const onDeleteHandler = async () => {
    try {
      await AxiosDelete(`/common/api/boards/${id}`);
      navigate('/SystemMgt/BulletinBoardMgt/BulletinBoardMgtPage');
    } catch (error: any) {
      console.error(error);
    }
  };

  const extractData = (data) => {
    const clone = { ...data };

    const findSystemId = systemCodes.find(
      (system: CodeType) => system.code === clone.systemId
    )!.codeNm;

    clone.systemId = findSystemId;

    clone.enabled = clone.enabled ? '사용' : '사용안함';

    clone.allReadable = clone.allReadable ? '조회가능' : '조회불가';

    clone.options = [];

    const optionsMap = getOptionsMap('id');
    Object.keys(optionsMap).forEach((key) => {
      if (clone[key]) {
        clone.options.push(optionsMap[key]);
      }
      delete clone[key];
    });

    clone.authority = clone.authorityList.reduce((acc, cur) => {
      acc[cur.authorityId] = cur.boardAuthority;
      return acc;
    }, {});

    delete clone.authorityList;

    ['useForm', 'useSharedUrl', 'useThumbnail'].forEach((key) => {
      clone[key] = clone[key] ? '예' : '아니오';
    });

    return clone;
  };

  useEffect(() => {
    const getBoardDetail = async () => {
      const res = await AxiosGet(`/common/api/boards/${id}`);

      setInitValues(extractData(res));
      setIsRequestCompleted(true);
      try {
      } catch (error: any) {
        console.error(error);
      }
    };

    if (!!id && !!systemCodes.length && !!boardAuthorityCodes.length) {
      getBoardDetail();
    }
  }, [id, systemCodes, boardAuthorityCodes]);

  return (
    <TitleContents title="게시판 상세">
      {isRequestCompleted && (
        <Form
          initValue={initValues}
          formType="modify"
          saveHandler={onSubmitHandler}
          deleteHandler={onDeleteHandler}
        />
      )}
    </TitleContents>
  );
};

export default Detail;

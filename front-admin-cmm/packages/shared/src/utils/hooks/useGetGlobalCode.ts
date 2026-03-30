import React, { useState, useEffect } from 'react';
import { AxiosGet } from '~/../../shared/src/libs/axios';

export interface CodeType {
  code: string;
  codeNm: string;
  remark: string | null;
  codeType: string;
  enabled: boolean;
  sortOrder: number;
}

export const useGetGlobalCode = (code) => {
  const [globalCode, setGlobalCode] = useState([]);

  useEffect(() => {
    const getCodes = async () => {
      try {
        const { list } = await AxiosGet(`/member/api/codegroups/${code}/codes`);
        setGlobalCode(list);
      } catch (error: any) {
        console.error('Faild request useGetGlobalCode');
      }
    };

    if (!!code) {
      getCodes();
    }
  }, [code]);

  return globalCode;
};

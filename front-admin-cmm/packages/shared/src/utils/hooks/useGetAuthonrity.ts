import React, { useState, useEffect } from 'react';
import { AxiosGet } from '~/../../shared/src/libs/axios';

/*

authorityIds : { name : id } 형태의 object => name을 key값으로 사용하여 id를 추출
authorityNames : [name]이 담긴 string[]

*/

export const useGetAuthonrity = () => {
  const [authorityIds, setAuthorityIds] = useState({});
  const [authorityNames, setAuthorityNames] = useState<string[]>([]);

  useEffect(() => {
    const getAuthonrity = async () => {
      try {
        const res = await AxiosGet('/member/api/auth/authorities');

        const { names, ids } = res.list.reduce(
          (acc, cur) => {
            acc.names.push(cur.authorityNm);
            acc.ids[cur.authorityNm] = cur.authorityId;
            return acc;
          },
          { names: [], ids: {} }
        );

        setAuthorityIds(ids);
        setAuthorityNames(names);
      } catch (error: any) {
        console.error(error);
      }
    };

    getAuthonrity();
  }, []);

  return { authorityIds, authorityNames };
};

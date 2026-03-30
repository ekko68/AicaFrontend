import { fetchMe } from '~/fetches';
import { useEffect } from 'react';
import useSWR from 'swr';
const fetcher = (key: string) => fetchMe(key);

const FACTOR_KEY = '__FACTOR_KEY__';
function Mypage() {
  const factor = sessionStorage.getItem(FACTOR_KEY);
  const { data, error } = useSWR(() => (factor ? factor : null), fetcher);

  const init = () => {
    (async () => {})();
  };
  useEffect(init, []);

  if (!factor || !!error) {
    sessionStorage.removeItem(FACTOR_KEY);
    window.location.href = '/factor';
    return <div />;
  }

  if (!data) return <div />;
  return <div style={{ marginTop: 120 }}>이메일 : {data.email}</div>;
}

export default Mypage;

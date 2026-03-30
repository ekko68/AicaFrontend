import { useEffect } from 'react';
import { fetchSignOut } from '~/fetches';
import authentication from 'shared/authentication';
import { useNavigate } from 'react-router-dom';
/* 
  작성일    :   2022/06/10
  화면명    :   공통 -> 로그아웃
  회면ID    :   UI-USP-FRN-0020101
  화면/개발 :   Seongeonjoo / navycui  
  임시:    추후 삭제 가능
*/
const SignOut = () => {
  const navigate = useNavigate();
  const init = () => {
    (async () => {
      await fetchSignOut();
      authentication.remove();
      window.sessionStorage.removeItem('__FACTOR_KEY__');
      navigate('/')
    })();
  };
  useEffect(init, []);

  return <div />;
}

export default SignOut;

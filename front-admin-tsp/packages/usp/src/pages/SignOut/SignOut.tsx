import { useEffect } from 'react';

import { fetchSignOut } from '~/fetches';
import authentication from 'shared/authentication';
function SignOut() {
  const init = () => {
    (async () => {
      await fetchSignOut();
      authentication.remove();
      window.sessionStorage.removeItem('__FACTOR_KEY__');
      window.location.href = '/';
    })();
  };
  useEffect(init, []);

  return <div />;
}

export default SignOut;

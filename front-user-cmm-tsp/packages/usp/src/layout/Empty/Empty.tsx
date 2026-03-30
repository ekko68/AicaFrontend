import { useEffect } from 'react';

type PropsType = {
  children?: any;
};

function Empty({ children }: PropsType) {
  const init = () => {
  };
  useEffect(init, []);

  return children;
}

export default Empty;

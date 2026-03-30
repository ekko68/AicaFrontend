import { memo, MouseEvent, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import * as styles from './styles';
import dom from '../../utils/dom';
import zIndex from '@mui/material/styles/zIndex';

function Top() {
  const [isVisible, setVisible] = useState(false);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const scroll = () => {
    setVisible(() => dom.scrollY() > 0);
  };
  const init = () => {
    window.addEventListener('scroll', scroll);
    scroll();
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  };
  useEffect(init, []);

  return (
    <CSSTransition in={isVisible} timeout={800} style={{zIndex:'2'}} unmountOnExit>
      <button type="button" css={styles.container} onClick={handleClick}></button>
    </CSSTransition>
  );
}

export default memo(Top);

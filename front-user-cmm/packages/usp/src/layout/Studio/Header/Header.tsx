// import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Desktop from './Desktop';
import Mobile from './Mobile';
import { useEffect, useState, useCallback } from 'react';
import * as styles from '../styles';
import clsx from 'clsx';
import { useHeaderCssEvent, useScroll } from '~/pages/store/GlobalModalStore';
import {useScrollStore} from '~/pages/store/ScrollStore';
import { useRoutesStore } from '~/DynamicRouter';

const Header: React.FC<{
  children?: React.ReactNode;
  isSub?: string;
  isHome?: string;
}> = (props) => {
  // const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:1200px)');
  const { cssVars } = useHeaderCssEvent();
  const {direction} = useScroll();
  const { type } = useRoutesStore();
  const init = () => {
    return () => {};
  };
  
  useEffect(init, []);

  //* 1280 미만 모바일 버전
  return (
    <header
      className={clsx(
        !!props.isSub && 'subpage',
        props.isHome && `home__header ${cssVars}`,
        type === 'PORTAL_PMS' && 'is-biz',
        direction && 'is-scroll'
      )}
      css={props.isSub && direction ? styles.scrolleve : ''}
    >
      {isMobile ? <Mobile /> : <Desktop />}
    </header>
  );
};

export default Header;

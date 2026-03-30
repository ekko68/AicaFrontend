import Toolbar from './Toolbar';
import Menubar from './Menubar';
import { Fragment } from 'react';
import { ThemeContext } from 'usp/src/layout/index';
import { useContext } from 'react';
import { useHeaderCssEvent, useScroll } from '~/pages/store/GlobalModalStore';
import {useScrollStore} from '~/pages/store/ScrollStore';
import { Box } from '@mui/material';

function Desktop() {
  const theme = useContext(ThemeContext);
  return (
    <Fragment>
      {
        theme.label === 'sign' || theme.label === 'searchResult'
          ? '' 
          : 
        <Toolbar/>
      }
      <Menubar />
    </Fragment>
  );
}
export default Desktop;

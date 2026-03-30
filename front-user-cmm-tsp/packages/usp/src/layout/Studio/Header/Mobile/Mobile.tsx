import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'usp/src/layout/index';

import Menubar from './Menubar';
import MenubarSearchResult from './MenubarSearchResult';

function Mobile() {
  const theme = useContext(ThemeContext);

  return (
    <Fragment>
      {theme.label === 'searchResult' ? <MenubarSearchResult /> : <Menubar />}
    </Fragment>
  );
}
export default Mobile;

import Toolbar from './Toolbar';

import { Fragment } from 'react';
import Lnbnavbar from './Lnbnavbar';
function Desktop() {
  return (
    <Fragment>
      <header>
        <Toolbar />
      </header>
      <Lnbnavbar />
    </Fragment>
  );
}
export default Desktop;

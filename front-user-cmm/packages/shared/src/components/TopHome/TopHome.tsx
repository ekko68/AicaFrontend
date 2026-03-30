import { memo, MouseEvent, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import * as styles from './styles';

function TopHome(props: any) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.topVisible);
  });

  return (
    <CSSTransition
      in={isVisible}
      timeout={800}
      style={{ zIndex: '2' }}
      unmountOnExit
    >
      <button
        type="button"
        css={styles.container}
        onClick={props.onTopMove}
      ></button>
    </CSSTransition>
  );
}

export default memo(TopHome);

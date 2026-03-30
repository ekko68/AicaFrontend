/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';

export default function SearchFooter() {
  const footerCss = css`
    width: 100%;
    height: 19px;
    margin-top: auto;
    font-size: 13px;
    font-weight: 400;
    color: ${Color.gray};
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.52px;

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 12px;
      line-height: 18px;
    }
  `;

  return (
    <footer css={footerCss}>
      ©2022 인공지능산업융합사업단. ALL RIGHTS RESERVED
    </footer>
  );
}

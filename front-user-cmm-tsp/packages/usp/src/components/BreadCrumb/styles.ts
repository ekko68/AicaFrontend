import { css } from '@emotion/react';
export const bread = css`
  position: relative;
  max-width: 1290px;
  margin: 0 auto;
  z-index: 1;
  .MuiBreadcrumbs-li{
    color: #e0e0e0;
    font-weight: 300;
    letter-spacing: -0.56px;
    font-size: 14px;
  }
  .MuiBreadcrumbs-separator {
    color: #707070;
  }
  ol {
    position: absolute;
    top: 30px;
    right: 15px;
    justify-content: flex-end;
  }
  .home {
    display: block;
    width: 15px;
    height: 14px;
    background: url('/images/common/home.png') no-repeat;
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    display: none;
  }
`;

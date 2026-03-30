import { css } from '@emotion/react';
export const bread = css`
  position: relative;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  z-index: 1;
  .css-1wuw8dw-MuiBreadcrumbs-separator {
    color: #707070;
  }
  li {
    margin: 0;
    a {
      font-size: 14px;
    }
  }
  ol {
    right: 0;
    justify-content: flex-end;
  }
  .home {
    //display: block;
    //width: 15px;
    //height: 15px;
    background: url('/images/common/icon_home.png') no-repeat;
    object-fit: cover;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    display: none;
  }
`;

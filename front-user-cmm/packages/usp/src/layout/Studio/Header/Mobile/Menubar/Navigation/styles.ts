import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  max-width: 550px;
  font-size: 18px;
  letter-spacing: -0.2px;
  z-index: 999;
  flex: 0 0 60%;
`;

export const menu = css`
  display: flex;
  li {
    position: relative;
    line-height: 2;
    flex: 1;
    text-align: center;
    button {
      font-weight: 700;
      color: #fff;
      background-color: rgba(0,0,0,0);
      border: 0;
    }
    &.active{
      > ul {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        height: auto;
        justify-content: center;
        width: 125px;
        border-radius: 15px;
        padding: 5px 0;
        > li {
          line-height: 1.6;
          margin: 5px;
          flex: initial;
          a.active {
            border-bottom: 2px solid #fff;
          }
        }
      }
      button {
        border-bottom: 2px solid #fff;
      }
    }
    > ul {
      display: none;
    }
  }
`;
export const navsub = css`

`;

import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';

export const toolbarContainer = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 40px;
  z-index: 1000;

  > ul {
    display: flex;
    align-items: center;
    height: 100%;

    a {
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 20px;
      letter-spacing: -0.56px;
      text-align: left;
    }

    &.utility {
      justify-content: flex-end;
      width: 30%;
      min-width: 230px;
      background: ${Color.bg_grey};

      > li {
        margin-right: 20px;
      }
      > li a {
        display: block;
        color: #222;
      }
    }

    &.portal {
      width: 70%;
      background: ${Color.bg_grey};
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 512px,
        ${Color.bg_grey} 512px
      );

      > li {
        flex-shrink: 0;
        width: 128px;
        height: 100%;

        > a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: ${Color.bg_grey};
          color: ${Color.warm_grey};

          &.active {
            background: ${Color.white};
          }
        }
      }
    }
  }

  .sideon {
    display: flex;
    flex: 1;
    min-width: 280px;
    font-family: NotoSansCJKKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    text-align: left;
    color: #707070;
    p {
      margin-right: 10px;
    }
    em {
      font-style: normal;
      margin-right: 10px;
      color: #222;
      &.on {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: #2dc11c;
        border-radius: 10px;
        margin-top: 3px;
      }
    }
  }
`;

export const container = css`
  position: relative;
  display: flex;
  padding: 10px 0;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  justify-content: space-between;
  z-index: 999;
  font-size: 14px;
  .utility {
    display: flex;
    flex: 1;
    justify-content: end;
    min-width: 230px;
    > li {
      margin-right: 20px;
    }
    > li a {
      font-family: NotoSansCJKKR;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.56px;
      text-align: left;
      color: #fff;
    }
  }
  .portal {
    display: flex;
    flex: 1;
    justify-content: start;
    > li {
      margin: 0 20px;
    }
    > li a {
      opacity: 0.6;
      font-family: NotoSansCJKKR;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.56px;
      text-align: left;
      color: #fff;
    }
  }
  .sideon {
    display: flex;
    flex: 1;
    min-width: 280px;
    font-family: NotoSansCJKKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    text-align: left;
    color: #fff;
    p {
      margin-right: 10px;
      opacity: 0.8;
    }
    em {
      font-style: normal;
      margin-right: 10px;
      &.on {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: #2dc11c;
        border-radius: 10px;
        margin-top: 3px;
      }
    }
  }
`;

export const containerSign = css`
  display: none;
`;

export const bgColor = css``;

export const containerFactor = css`
  position: relative;
  display: flex;
  padding: 10px 0;
  background-color: #f5f5f5;
  justify-content: space-between;
  z-index: 999;
  font-size: 14px;
  .utility {
    display: flex;
    flex: 1;
    justify-content: end;
    min-width: 230px;
    > li {
      margin-right: 20px;
    }
    > li a {
      font-family: NotoSansCJKKR;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.56px;
      text-align: left;
      color: #222;
    }
  }
  .portal {
    display: flex;
    flex: 1;
    justify-content: start;
    > li {
      margin: 0 20px;
    }
    > li a {
      font-family: NotoSansCJKKR;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.56px;
      text-align: left;
      color: #707070;
    }
  }
  .sideon {
    display: flex;
    flex: 1;
    min-width: 280px;
    font-family: NotoSansCJKKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    text-align: left;
    color: #707070;
    p {
      margin-right: 10px;
    }
    em {
      font-style: normal;
      margin-right: 10px;
      color: #222;
      &.on {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: #2dc11c;
        border-radius: 10px;
        margin-top: 3px;
      }
    }
  }
`;

export const space = css`
  flex: 1;
`;
export const item = css`
  flex: 1;
`;

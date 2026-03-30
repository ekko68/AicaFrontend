import { css } from '@emotion/react';

export const container = css`
  position: relative;
  height: 60px;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;

  .--type-white & {
    background: #fff;
  }
`;

export const containerFactor = css`
  position: relative;
  height: 60px;
  background-color: #fff;
  z-index: 999;
`;
export const containerSign = css`
  position: relative;
  height: 60px;
  background-color: #1f2437;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;
`;

export const whiteIcon = css`
  font-size: 30px;
  color: #fff;

  .--type-white & {
    color: #000;
  }
`;
export const blackIcon = css`
  font-size: 30px;
  color: #000;
`;

export const sidemenu = css`
  position: relative;
  height: 100%;

  > button {
    position: absolute;
    top: 18px;
    left: 30px;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    border-radius: 0;

    &:hover {
      background: transparent;
    }

    > svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    @media (min-width: 768px) and (max-width: 1200px) {
      top: 18px;
    }
    @media (max-width: 767px) {
      left: 15px;
    }
  }

  h1 {
    position: absolute;

    @media (max-width: 767px) {
      top: 13px;
      left: 50%;
      transform: translateX(-50%);
    }

    @media (min-width: 768px) and (max-width: 1200px) {
      top: 18px;
      left: 84px;
    }

    .is-biz & {
      display: flex;
      align-items: center;

      a {
        &.loc_tit {
          margin-left: 16px;
          font-size: 19px;
          font-weight: 700;
          color: #222;
          line-height: 28px;
          letter-spacing: -0.06em;

          @media (max-width: 767px) {
            display: none;
          }
        }
      }
    }

    a {
      color: #fff;

      .logoMo,
      .logoMo02 {
        width: 90px;
        height: 34px;
        background: no-repeat center / contain;

        @media (min-width: 768px) and (max-width: 1200px) {
          width: 240px;
          height: 24px;
        }
      }
      .logoMo {
        background-image: url('/images/logo04.png');

        @media (min-width: 768px) and (max-width: 1200px) {
          background-image: url('/images/logo01.png');
        }
      }
      .logoMo02 {
        background-image: url('/images/logo03.png');

        @media (min-width: 768px) and (max-width: 1200px) {
          background-image: url('/images/logo02.png');
        }
      }
    }
  }

  .--type-white & {
    h1 {
      a {
        .logoMo {
          background-image: url('/images/logo03.png');

          @media (min-width: 768px) and (max-width: 1200px) {
            background-image: url('/images/logo02.png');
          }
        }
      }
    }
  }
`;

export const searchbox = css``;

export const search = css`
  position: absolute;
  top: 0;
  right: 0;
  padding: 25px;
  width: 80px;
  height: 80px;
  background-color: #1ccdcc;
  @media (min-width: 320px) and (max-width: 1200px) {
    width: 60px;
    height: 60px;
    padding: 15px;
  }
`;

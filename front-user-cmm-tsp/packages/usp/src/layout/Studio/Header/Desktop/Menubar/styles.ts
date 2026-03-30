import { css } from '@emotion/react';

export const headerContainer = css`
  @keyframes menuBounce {
    0% {
      opacity: 0;
      top: 15px;
    }
    50% {
      top: 0px;
    }
    70% {
      opacity: 1;
      top: 10px;
    }
    100% {
      top: 5px;
    }
  }

  @keyframes ul_ani {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  nav {
    height: 100%;
  }
  .menu {
    display: flex;
    justify-content: center;
    height: 100%;

    > li {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;

      > p {
        position: relative;
        margin: 0 20px;
        padding: 10px 0;
        font-size: 18px;
        font-weight: 500;
        color: #000;
        line-height: 28px;
        letter-spacing: -0.06em;
        cursor: default;
      }

      &:hover {
        > p {
          cursor: pointer;
          color: #4063ec;
          &::after {
            content: '';
            position: absolute;
            top: 5px;
            left: calc((100% - 5px) / 2);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #4063ec;
            animation: menuBounce 0.3s;
          }
        }
      }

      > ul {
        display: none;
        position: absolute;
        top: 58px;
        left: 50%;
        width: 160px;
        margin-left: -80px;
        padding: 20px 0;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
        animation: ul_ani 0.5s;

        &.is-scroll {
          top: 48px !important;
        }

        > li {
          text-align: center;

          a {
            position: relative;
            font-size: 16px;
            font-weight: 400;
            color: #222;
            line-height: 24px;
            letter-spacing: -0.06em;

            &:hover {
              font-weight: 500;
              color: #4063ec;

              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: #4063ec;
              }
            }
          }

          & + li {
            margin-top: 10px;
          }
        }
      }

      &:hover {
        ul {
          display: block;
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .menu {
      display: none;
    }
  }

  .is-biz & {
    .menu {
      justify-content: flex-end;
      padding-right: 90px;

      > li {
        > p {
          letter-spacing: -0.36px;
        }
      }
    }
  }

  .is-biz.is-scroll & {
    .menu {
      padding-right: 70px;
    }
  }
`;

export const isCom = css`
  display: none !important;
`;

export const bgColor = css``;

export const whiteIcon = css`
  font-size: 30px;
  color: #fff;
`;
export const blackIcon = css`
  font-size: 30px;
  color: #000;
`;

export const subLog = css`
  background: url('/images/logo02.png') no-repeat;
  display: block;
  width: 240px;
  height: 23px;
`;
export const mainLog = css`
  background: url('/images/logo01.png') no-repeat;
  display: block;
  width: 240px;
  height: 23px;

  .--type-white & {
    background-image: url('/images/logo02.png');
  }
`;

export const headerQuieckGroup = css`
  position: absolute;
  top: 50%;
  right: 110px;
  display: flex;
  transform: translateY(-50%);

  &.is-scroll {
    right: 90px;
  }

  > a {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #707070;
    line-height: 24px;
    letter-spacing: -0.06em;

    &::after {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background: url('/images/main/ico_new-window_grey.svg') no-repeat center /
        contain;
    }

    & + a {
      margin-left: 20px;
    }
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

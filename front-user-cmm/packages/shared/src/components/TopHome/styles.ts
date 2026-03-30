import { css } from '@emotion/react';

export const container = css`
  position: fixed;
  width: 80px;
  height: 80px;
  right: 0;
  bottom: 0;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 80px;
    background: #fff url('/images/common/top_icon.png') no-repeat center;
    transition: opacity 0.3s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 80px;
    background-color: #1f2437;
    filter: blur(8px);
    opacity: 0.1;
    z-index: -1;
  }
  &.enter,
  &.exit-active {
    opacity: 0;
    transition: 0.3s;
  }

  &.enter-active,
  &.enter-done {
    opacity: 1;
  }
  @media (min-width: 320px) and (max-width: 850px) {
    width: 62px;
    height: 62px;
    &:before {
      width: 62px;
      height: 62px;
    }
    &:after {
      width: 62px;
      height: 62px;
    }
  }
`;

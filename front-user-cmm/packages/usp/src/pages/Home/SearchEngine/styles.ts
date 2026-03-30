import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../styles/styleCommon';
import { style } from '@mui/system';

export const screenOut = css`
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  text-indent: -9999px;
`;
export const SearchKeywordContainer = css`
  .--keyword-absolute & {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: ${Color.white};
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.16);
    z-index: 100;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;

      @media (min-width: 768px) and (hover: hover) {
        &:hover {
          background: ${Color.bg_grey};
        }
      }

      @media (max-width: ${breakpoint.mobile}) {
        height: 40px;
      }
    }

    @media (max-width: ${breakpoint.mobile}) {
      top: 52px;

      .is-focus & {
        top: 40px;
        height: calc(100vh - 70px);
        height: calc((var(--vh, 1vh) * 100) - 70px);
        padding-top: 10px;
        background: ${Color.darkbg};
        border-radius: 0;
        box-shadow: none;
        overflow: hidden;
        touch-action:none;
      }
    }
  }

  .is-focus .search-result.--keyword-absolute & {
    @media (max-width: ${breakpoint.mobile}) {
      top: 52px;
      height: auto;
      background: ${Color.white};
      border-radius: 0 0 10px 10px;
    }
  }

  .is-focus .search-result.--keyword-absolute .is-keyword:not(.is-typing) + & {
    padding-bottom: 10px;
  }

  .--keyword-flex & {
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 780px;
      height: 36px;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;

      @media (max-width: 820px) {
        width: calc(100% - 40px);
      }
      @media (max-width: ${breakpoint.mobile}) {
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    li {
      flex-shrink: 0;
      height: 100%;

      &:not(:last-of-type) {
        margin-right: 6px;
      }

      &:nth-of-type(n + 5) {
        /* display: none; */
      }

      @media (max-width: ${breakpoint.mobile}) {
        &:first-of-type {
          padding-left: 15px;
        }
        &:last-of-type {
          padding-right: 15px;
        }
      }
    }
  }
`;
export const SearchResultHashTag = css`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: 400;
  letter-spacing: -0.06em;

  .--keyword-absolute & {
    width: 100%;
    padding-right: 24px;
    background: transparent;
    font-size: 16px;
    color: ${Color.black};
    line-height: 24px;
    cursor: pointer;

    &.--new {
      padding-left: 30px;
    }
    &.--relation {
      padding-left: 60px;
    }

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 14px;
      color: ${Color.gray};
      line-height: 20px;

      &.--new,
      &.--relation {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }

  .--keyword-flex & {
    padding: 0 16px;
    border: 1px solid #c5c7cf;
    border-radius: 20px;
    font-size: 14px;
    color: ${Color.white};

    &::before {
      content: '#';
      margin-right: 3px;
    }
  }

  .search-result.--keyword-absolute & {
    @media (max-width: ${breakpoint.mobile}) {
      &.--new,
      &.--relation {
        padding-left: 30px;
        color: ${Color.black};
      }
    }
  }
`;
export const SearchMainHashTag = css`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  border: 1px solid #c5c7cf;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 400;
  color: ${Color.black};
  line-height: 20px;
  transition: 0.3s;

  &::before {
    content: '#';
    margin-right: 3px;
  }

  @media (min-width: 768px) and (hover: hover) {
    &:hover {
      background: ${Color.azul};
      border-color: ${Color.azul};
      color: ${Color.white};
      box-shadow: 0 3px 6px 0 rgba(64, 99, 236, 0.5);
    }
  }

  .is-focus & {
    color: ${Color.gray};

    @media (min-width: 768px) and (hover: hover) {
      &:hover {
        background: transparent;
        border-color: ${Color.topaz};
        color: ${Color.white};
        box-shadow: none;
      }
    }
  }
`;
export const SearchResultMsgContainer = css`
  display: flex;
  justify-content: center;
  padding: 60px 0;

  h3,
  b {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  b,
  span {
    flex-shrink: 0;
  }

  span {
    font-size: 20px;
    font-weight: 400;
    color: ${Color.white};
    line-height: 29px;
    letter-spacing: -0.06em;
  }

  b {
    &:last-of-type {
      margin-left: 4px;

      span {
        &:first-of-type {
          margin-right: 4px;
        }
      }
    }

    span {
      &:first-of-type {
        max-width: 100%;
        font-weight: 700;
        color: ${Color.topaz};
        text-align: center;
      }
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    padding: 48px 15px;

    h3 {
      flex-direction: column;
    }

    b {
      &:last-of-type {
        margin: 4px 0 0;
      }
    }
  }
`;
export const SearchResultNotMsgContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 60px 0 76px;
  text-align: center;
  word-break: keep-all;

  @media (max-width: ${breakpoint.mobile}) {
    padding: 48px 15px;
  }

  h3,
  p,
  span {
    font-weight: 400;
    letter-spacing: -0.06em;
  }

  h3 {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 20px;
    color: ${Color.white};
    line-height: 29px;

    &:first-of-type {
      font-weight: 700;
      color: ${Color.topaz};
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    span {
      font-size: 18px;
      line-height: 27px;
    }
  }

  p {
    margin-top: 24px;
    font-size: 16px;
    color: ${Color.gray};
    line-height: 28px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 20px;
      font-size: 14px;
      color: ${Color.white};
      line-height: 26px;
    }
  }
`;
export const searchRdoContainer = css`
  label {
    flex-basis: calc((100% - 15px) / 2) !important;
    width: calc((100% - 15px) / 2) !important;

    &:nth-of-type(even) {
      margin-left: 15px !important;
    }

    .MuiFormControlLabel-label {
      font-weight: 400 !important;
      color: ${Color.black};
    }
    .MuiRadio-root.Mui-checked + span {
      font-weight: 500 !important;
    }
    .MuiTouchRipple-root {
      display: none;
    }
  }

  .rdoTotalForm {
    > div {
      flex-direction: column !important;

      .totalGroup {
        margin-top: 16px;

        > label {
          margin-top: 0 !important;
        }
      }

      .rdolistGroup {
        display: flex;
        flex-wrap: wrap;

        > li {
          width: calc((100% - 15px) / 2);
          margin-top: 15px;

          &:nth-of-type(even) {
            margin-left: 15px;
          }

          label {
            width: 100% !important;
            margin: 0 !important;
          }
        }
      }
    }
  }
`;
export const searchCkboxContainer = css`
  margin-top: 16px;

  .labelTotal,
  .labelChild {
    flex-basis: calc((100% - 15px) / 2) !important;
    width: calc((100% - 15px) / 2) !important;
  }

  .labelTotal {
    margin: 0 !important;
  }

  .childBox {
    display: flex;
    flex-wrap: wrap;

    .labelChild {
      margin: 15px 0 0 !important;

      &:nth-of-type(even) {
        margin-left: 15px !important;
      }
    }
  }
`;
export const searchMoreBtn = css`
  @media (max-width: ${breakpoint.mobile}) {
    padding: 0 15px;
  }

  > button {
    color: ${Color.black} !important;
    letter-spacing: -0.06em !important;

    span {
      position: static;
      display: block;
      width: 12px;
      height: 8px;
      margin-left: 16px;
      background: url('/images/search/ico_search_arrow_down.svg') no-repeat
        center / contain;
    }
  }
`;

export const CommonInner = styled('div')`
  width: 100%;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
`;
export const SearchQuickBanGroup = styled('div')`
  margin-top: 60px;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: ${Color.black};
    line-height: 41px;
    letter-spacing: -0.06em;

    @media (max-width: 1260px) {
      padding-left: 15px;
      font-size: 22px;
      line-height: 33px;
    }
  }
`;
export const SearchQuickBanList = styled('ul')`
  display: flex;
  margin-top: 20px;
  padding-bottom: 120px;

  @media (max-width: 1260px) {
    flex-direction: column;
    border-top: 8px solid ${Color.bg_grey};
    padding-bottom: 50px;
  }
`;
export const SearchQuickBanItem = styled('li')`
  width: calc((100% - 60px) / 3);
  border: 1px solid ${Color.line};
  border-radius: 10px;

  @media (max-width: 1260px) {
    width: 100%;
    border-width: 0;
    border-radius: 0;

    &:not(:last-of-type) {
      border-bottom-width: 1px;
    }
  }

  &:nth-of-type(1) {
    figure {
      background-image: url('/images/biz/biz_ico_procedure01.png');
    }
  }
  &:nth-of-type(2) {
    margin: 0 30px;

    figure {
      background-image: url('/images/biz/biz_ico_procedure02.png');
    }

    @media (max-width: 1260px) {
      margin: 0;
    }
  }
  &:nth-of-type(3) {
    figure {
      background-image: url('/images/biz/biz_ico_procedure03.png');
    }
  }

  a {
    display: flex;
    align-items: center;
    padding: 30px 24px 30px 40px;

    @media (max-width: 1260px) {
      padding-left: 30px;
      padding-right: 20px;
    }
  }

  figure {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    margin: 0;
    padding: 0;
    background: no-repeat center / contain;
  }

  .txtGroup {
    flex-grow: 1;
    padding-right: 10px;

    h3,
    p {
      letter-spacing: -0.06em;
    }

    h3 {
      font-size: 20px;
      font-weight: 700;
      color: ${Color.black};
      line-height: 29px;

      @media (max-width: 1260px) {
        font-size: 22px;
        line-height: 26px;
      }
    }
    p {
      margin-top: 12px;
      font-size: 16px;
      font-weight: 400;
      color: ${Color.warm_gray};
      line-height: 28px;

      @media (max-width: 1260px) {
        margin-top: 10px;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
`;

export const TabPanelGroup = styled('div')`
  & + & {
    margin-top: 60px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 40px;
    }
  }
`;
export const TabPanelTitle = styled('h3')`
  display: flex;
  align-items: center;

  @media (min-width: 768px) and (max-width: ${breakpoint.desk1280}) {
    padding-left: 20px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding-left: 15px;
  }

  a {
    display: flex;
    align-items: center;
    padding: 7px 0 6px;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;

    &::after {
      content: '';
      flex-shrink: 0;
      width: 11px;
      height: 18px;
      margin-left: 10px;
      background: url('/images/search/ico_search_arrow_right.svg') no-repeat
        center / contain;
    }

    @media (max-width: ${breakpoint.mobile}) {
      padding: 6px 0 5px;
      font-size: 22px;

      &::after {
        width: 10px;
        height: 16px;
      }
    }
  }

  p {
    padding: 4px 0 0 10px;
    font-size: 16px;
    font-weight: 400;
    color: ${Color.black};
    line-height: 1;
    letter-spacing: -0.06em;

    .point {
      font-weight: 700;
      color: ${Color.azul};
    }

    @media (max-width: ${breakpoint.mobile}) {
      padding: 2px 0 0 8px;
    }
  }
`;
export const TabPanelConts = styled('div')`
  margin-top: 20px;

  .--type-list {
    border-top: 1px solid ${Color.darkbg};
  }
`;

export const SearchResultNoticeSection = styled('div')`
  ul,
  li {
    padding: 0;
  }
  li {
    &:not(:last-of-type) {
      border-bottom: 1px solid ${Color.line};
    }

    > a {
      display: block;
      width: 100%;
      padding: 30px;
      overflow: hidden;

      @media (max-width: ${breakpoint.mobile}) {
        padding: 24px 15px;
      }
    }
  }
`;
export const SearchResultQnaSection = styled('div')`
  ul {
    padding: 0;
  }
  li {
    display: flex;
    align-items: flex-start;
    padding: 30px 0;

    @media (max-width: ${breakpoint.mobile}) {
      flex-direction: column;
      padding: 24px 0;
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid ${Color.line};
    }
  }
`;
export const SearchResultEventSection = styled('div')`
  ul {
    display: flex;
    padding: 0;

    @media (min-width: 768px) and (max-width: ${breakpoint.desk1280}) {
      padding: 0 20px;
    }
    @media (max-width: ${breakpoint.mobile}) {
      flex-direction: column;
      padding: 0 15px;
    }
  }

  li {
    width: 380px;
    padding: 0;

    @media (min-width: 768px) and (max-width: 1260px) {
      width: 32%;
    }
    @media (max-width: ${breakpoint.mobile}) {
      width: 100%;
    }

    &:nth-of-type(2n) {
      margin: 0 60px;

      @media (min-width: 768px) and (max-width: 1260px) {
        margin: 0 2%;
      }

      @media (max-width: ${breakpoint.mobile}) {
        margin: 40px 0;
      }
    }

    > a {
      display: block;
      width: 100%;
      overflow: hidden;
    }
  }
`;

export const SearchIconNew = styled('i')`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 32px;
  margin-left: 10px;
  background: ${Color.topaz};
  border-radius: 5px;

  @media (max-width: ${breakpoint.mobile}) {
    width: 45px;
    height: 30px;
    margin-left: 4px;
  }

  &::after {
    content: 'NEW';
    font-size: 14px;
    font-weight: 400;
    color: ${Color.white};
    letter-spacing: -0.06em;
  }
`;
export const searchThumbIcon = css`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;
export const SearchIconEventIng = styled('i')`
  right: 0;
  width: 58px;
  background: ${Color.azul};
  border-radius: 0 10px 0 10px;

  &::before {
    content: '진행중';
    color: ${Color.white};
  }
`;
export const SearchIconRecruit01 = styled('i')`
  left: 0;
  padding: 0 10px;
  background: ${Color.azul};
  border-radius: 10px 0 10px 0;
  color: ${Color.white};
`;
export const SearchIconRecruit02 = styled('i')`
  right: 0;
  padding: 0 10px;
  background: ${Color.white};
  border: 1px solid ${Color.gray};
  border-radius: 0 10px 0 10px;
`;

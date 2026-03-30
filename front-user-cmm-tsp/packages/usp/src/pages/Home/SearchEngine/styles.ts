import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../styles/styleCommon';

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
        height: calc(100vh - 40px);
        height: calc((var(--vh, 1vh) * 100) - 40px);
        padding-top: 10px;
        background: ${Color.darkbg};
        border-radius: 0;
        overflow-y: auto;
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

export const CommonInner = styled('div')`
  width: 100%;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
`;

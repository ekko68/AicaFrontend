/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint } from '../../styles/styleCommon';
import { screenOut, SearchKeywordContainer } from '../styles';
import { Color } from '~/components/StyleUtils';

import { searchKeywordsNew } from '../Data/dataSearch';

import SearchKeywordItemBtn from './SearchKeywordItemBtn';

export default function SearchKeywordNew() {
  return (
    <Box css={SearchKeywordContainer}>
      <KeywordItemList>
        {searchKeywordsNew.map((item, i) => (
          <li key={i}>
            <SearchKeywordItemBtn
              type={'new'}
              itemTxt={item}
              evtClick={() => {}}
            />
            <SearchKeywordItemDel itemTxt={item} evtClick={() => {}} />
          </li>
        ))}
      </KeywordItemList>
      <KeywordNewControllGroup>
        <KeywordNewControllBtn txt="전체삭제" />
        <KeywordNewControllBtn txt="검색어저장 끄기" />
      </KeywordNewControllGroup>
    </Box>
  );
}

function SearchKeywordItemDel(props: any) {
  const delCss = css`
    display: none;
    position: absolute;
    top: 50%;
    right: 24px;
    width: 20px;
    height: 20px;
    background: url('/images/search/ico_search_delete.svg') no-repeat center /
      contain;
    transform: translateY(-50%);
    z-index: 10;

    @media (max-width: ${breakpoint.mobile}) {
      display: block;
      right: 15px;
      background-image: url('/images/search/ico_search_delete_line.svg');
    }
  `;

  return (
    <button type="button" css={delCss} onClick={props.evtClick}>
      <span css={screenOut}>{props.itemTxt} 삭제</span>
    </button>
  );
}

function KeywordNewControllBtn(props: any) {
  const defaultCss = css`
    margin: -12px;
    padding: 12px;
    font-size: 14px;
    font-weight: 400;
    color: ${Color.warm_gray};
    line-height: 20px;
    letter-spacing: -0.06em;
  `;

  return (
    <button type="button" css={defaultCss}>
      {props.txt}
    </button>
  );
}

const KeywordItemList = styled('ul')`
  li {
    position: relative;

    &:hover {
      button {
        &:nth-of-type(2) {
          display: block;
        }
      }
    }
  }
`;
const KeywordNewControllGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 24px 0 30px;
  border-top: 1px solid ${Color.line};

  @media (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

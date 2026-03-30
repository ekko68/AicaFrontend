/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { CommonInner } from '../styles';

import SearchKeywordItemBtn from './SearchKeywordItemBtn';

import { searchKeywordsPopular } from '../Data/dataSearch';

export default function SearchResultNotConts(props: any) {
  const containerCss = css`
    padding: 60px 0 120px;
    text-align: center;
  `;
  const notContsTit = css`
    font-size: 18px;
    font-weight: 500;
    color: ${Color.black};
    line-height: 27px;
    letter-spacing: -0.06em;
  `;

  return (
    <>
      <CommonInner css={containerCss}>
        <Typography component={'h2'} css={notContsTit}>
          인기검색어로 더 찾아보시겠어요?
        </Typography>
        <NotContsTagGroup>
          <ul>
            {searchKeywordsPopular.map((item, i) => (
              <NotContsTagItem key={i}>
                <SearchKeywordItemBtn
                  type={'main'}
                  itemTxt={item}
                  evtClick={props.evtHashClick}
                />
              </NotContsTagItem>
            ))}
          </ul>
        </NotContsTagGroup>
      </CommonInner>
    </>
  );
}

const NotContsTagGroup = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  ul {
    display: flex;
    margin: -3px;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: ${breakpoint.mobile}) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;
const NotContsTagItem = styled('li')`
  flex-shrink: 0;
  margin: 3px;

  button {
    height: 36px;

    &::before {
      margin-right: 4px;
    }
  }
`;

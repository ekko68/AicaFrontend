/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { CommonInner } from '../styles';

import { searchKeywordsRelation, searchResultInfo } from '../Data/dataSearch';

import SearchBar from '../Components/SearchBar';
import SearchKeywordRelation from './SearchKeywordRelation';
import SearchResultMsg from './SearchResultMsg';
import SearchResultNotMsg from './SearchResultNotMsg';
import SearchResultTab from './SearchResultTab';
import SearchResultCondition from './SearchResultCondition';

export default function SearchResultHeader(props: any) {
  const headerCss = css`
    padding-top: 80px;
    background: ${Color.darkbg};

    @media (max-width: ${breakpoint.desk1200}) {
      padding-top: 60px;
    }
  `;
  return (
    <Box css={headerCss}>
      <CommonInner>
        <SearchResultForm className="search-result --keyword-absolute">
          <SearchBar
            iptFocus={props.iptFocus}
            setIptFocus={props.setIptFocus}
            searchValue={props.searchValue}
            setSearchValue={props.setSearchValue}
            iptDisabled={props.iptDisabled}
          />
        </SearchResultForm>

        <SearchResultKeywordRelation className="--keyword-flex">
          {searchKeywordsRelation.length !== 0 && (
            <SearchKeywordRelation evtHashClick={props.evtHashClick} />
          )}
        </SearchResultKeywordRelation>

        {/* 검색결과 메세지 */}
        {searchResultInfo.total !== 0 ? (
          <SearchResultMsg />
        ) : (
          <SearchResultNotMsg />
        )}

        {/* 검색결과 관련 탭메뉴 */}
        {searchResultInfo.total !== 0 && (
          <SearchResultTab
            tabsIdx={props.tabsIdx}
            evtTabsChange={props.evtTabsChange}
          />
        )}
      </CommonInner>

      {/* 검색조건 */}
      {searchResultInfo.total !== 0 && <SearchResultCondition />}
    </Box>
  );
}

const SearchResultForm = styled('form')`
  position: relative;
  width: 780px;
  margin: 60px auto 0;

  @media (min-width: 768px) and (max-width: 820px) {
    width: calc(100% - 40px);
  }
  @media (max-width: ${breakpoint.mobile}) {
    width: calc(100% - 30px);
    margin-top: 30px;
  }
`;
const SearchResultKeywordRelation = styled('div')`
  margin-top: 30px;

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 16px;
  }
`;

/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { screenOut } from '../styles';

import { searchResultInfo } from '../Data/dataSearch';

import SearchResultHeader from '../Components/SearchResultHeader';
import SearchBar from '../Components/SearchBar';
import SearchResultTabPanel from '../Components/SearchResultTabPanel';
import SearchResultNotConts from '../Components/SearchResultNotConts';
import SearchQuickBanner from '../Components/SearchQuickBanner';
import SearchFooter from '../Components/SearchFooter';

export default function SearchResult() {
  let windowInnerHeight = 0;
  let vh = 0;

  const isMobileCheck = /iPhone|iPad|iPod|Android/i.test(
    window.navigator.userAgent
  );

  const [iptFocus, setIptFocus] = useState<boolean>(false);
  const [iptDisabled, setIptDisabled] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tabsIdx, setTabsidx] = useState<number>(0);

  // 모바일 100vh 적용 관련
  const handleResize = () => {
    const currentInnerHeight = window.innerHeight;
    // console.log(`${currentInnerHeight}/${windowInnerHeight}`);
    if (currentInnerHeight !== windowInnerHeight) {
      windowInnerHeight = currentInnerHeight;
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  // 탭 변경
  const handleTabsChange = (evt: React.SyntheticEvent, currIdx: number) => {
    setTabsidx(currIdx);
  };

  const handleHashTagClick = (e: any) => {
    console.dir(e.target.textContent);
  };

  handleResize();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <SearchResultSection className={iptFocus ? 'is-focus' : ''}>
      <SearchResultHeader
        iptFocus={iptFocus}
        setIptFocus={setIptFocus}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        iptDisabled={iptDisabled}
        tabsIdx={tabsIdx}
        evtTabsChange={handleTabsChange}
        evtHashClick={handleHashTagClick}
      />
      <SearchResultConts>
        {searchResultInfo.total > 0 ? (
          <SearchResultTabPanel tabsIdx={tabsIdx} />
        ) : (
          <SearchResultNotConts evtHashClick={handleHashTagClick} />
        )}
      </SearchResultConts>
      <SearchQuickBanner />
      <SearchFooter />
    </SearchResultSection>
  );
}

// 메인
const SearchResultSection = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  letter-spacing: -0.06em;
  word-break: keep-all;

  footer {
    display: flex;
    align-items: center;
    height: 60px;
    border-top: 1px solid #d7dae6;
    color: ${Color.warm_gray};

    @media (min-width: 1201px) {
      justify-content: flex-end;
      padding-right: 20px;
      font-size: 14px;
    }
    @media (max-width: ${breakpoint.desk1200}) {
      justify-content: flex-start;
      padding-left: 15px;
    }
  }
`;
const SearchResultConts = styled('div')``;

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
import SearchFooter from '../Components/SearchFooter';

export default function SearchResult(props: any) {
  const isMobileCheck = /iPhone|iPad|iPod|Android/i.test(
    window.navigator.userAgent
  );

  const [iptFocus, setIptFocus] = useState<boolean>(false);
  const [iptDisabled, setIptDisabled] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tabsIdx, setTabsidx] = useState<number>(0);

  // 탭 변경
  const handleTabsChange = (evt: React.SyntheticEvent, currIdx: number) => {
    setTabsidx(currIdx);
  };

  const handleHashTagClick = (e: any) => {
    console.dir(e.target.textContent);
  };

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
      <SearchFooter />
    </SearchResultSection>
  );
}

// 메인
const SearchResultSection = styled('div')`
  display: flex;
  flex-direction: column;
  letter-spacing: -0.06em;
`;
const SearchResultConts = styled('div')``;

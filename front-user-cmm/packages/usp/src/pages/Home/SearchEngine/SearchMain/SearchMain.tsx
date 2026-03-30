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

import { mainKeyword } from '../Data/dataSearch';

import SearchBar from '../Components/SearchBar';
import SearchKeywordItemBtn from '../Components/SearchKeywordItemBtn';
import SearchFooter from '../Components/SearchFooter';

export default function SearchMain() {
  let windowInnerHeight = 0;
  let vh = 0;

  const isMobileCheck = /iPhone|iPad|iPod|Android/i.test(
    window.navigator.userAgent
  );

  const [iptFocus, setIptFocus] = useState<boolean>(false);
  const [iptDisabled, setIptDisabled] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

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

  useEffect(() => {
    console.log(window.getComputedStyle);
    
  })

  return (
    <SearchMainSection className={iptFocus ? 'is-focus' : ''}>
      <SearchMainArea>
        <SearchMainForm
          action="/search/result"
          className="search-main --keyword-absolute"
        >
          <SearchMainLogo>
            <NavLink to={'/'}>
              <span css={screenOut}>AICA 메인이동</span>
            </NavLink>
          </SearchMainLogo>
          <SearchBar
            iptFocus={iptFocus}
            setIptFocus={setIptFocus}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            iptDisabled={iptDisabled}
          />
          {mainKeyword.map((data, i) => (
            <SearchMainKeyword key={i}>
              <h3>{data.id === 0 ? '인기 검색어' : '추천 검색어'}</h3>
              <ul key={i}>
                {data.keyword.map((tag: any, idx: number) => (
                  <li key={idx}>
                    <SearchKeywordItemBtn
                      type={'main'}
                      itemTxt={tag}
                      evtClick={handleHashTagClick}
                    />
                  </li>
                ))}
              </ul>
            </SearchMainKeyword>
          ))}
        </SearchMainForm>
      </SearchMainArea>

      <SearchFooter />
    </SearchMainSection>
  );
}

// 메인
const SearchMainSection = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  padding: 200px 0 30px;
  letter-spacing: -0.06em;

  &.is-focus {
    background: ${Color.darkBg};
    overflow: hidden;
    touch-action:none;
  }

  @media (min-width: 768px) {
    transition: background 0.3s;
  }
  @media (max-width: ${breakpoint.mobile}) {
    padding: 64px 15px 12px;

    &.is-focus {
      padding-top: 15px;
    }
  }
`;
const SearchMainArea = styled('div')`
  display: flex;
  justify-content: center;
`;
const SearchMainForm = styled('form')`
  width: 620px;

  @media (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;
const SearchMainLogo = styled('h2')`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  a {
    display: block;
    width: 200px;
    height: 45px;
    background: url('/images/logo-symbol.svg') no-repeat center / contain;

    @media (max-width: ${breakpoint.mobile}) {
      width: 134px;
      height: 30px;
    }
  }

  .is-focus & {
    a {
      background-image: url('/images/logo-symbol-topaz.svg');
    }
    @media (max-width: ${breakpoint.mobile}) {
      margin-bottom: 0;

      a {
        display: none;
      }
    }
  }
`;
const SearchMainKeyword = styled('div')`
  margin-top: 60px;
  padding-left: 10px;

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 56px;
    padding-left: 5px;
  }

  & + & {
    margin-top: 31px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 40px;
    }
  }

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 700;
    color: ${Color.black};
    line-height: 27px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    max-height: 50px;
    margin: -5px -3px;
    overflow: hidden;

    @media (max-width: ${breakpoint.mobile}) {
      max-height: 92px;
    }
  }

  li {
    height: 36px;
    margin: 5px 3px;
  }

  .is-focus & {
    h3 {
      color: ${Color.line};
    }
  }
`;

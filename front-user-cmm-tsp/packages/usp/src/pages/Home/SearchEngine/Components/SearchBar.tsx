/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint } from '../../styles/styleCommon';
import { screenOut } from '../styles';
import { Color } from '~/components/StyleUtils';

import { searchKeywordsNew, searchKeywordsRelation } from '../Data/dataSearch';

import SearchKeywordNew from './SearchKeywordNew';
import SearchKeywordRelation from './SearchKeywordRelation';
import SearchBarRescan from './SearchBarRescan';

export default function SearchBar(props: any) {
  const refIptSearch = useRef<any>();

  const [searchClassName, setSearchClassName] = useState<string>('');
  const [ckIsNew, setCkIsNew] = useState<boolean>(false);
  const [ckIsRelation, setCkIsRelation] = useState<boolean>(false);

  const handleValueReset = (e: any) => {
    e.stopPropagation();
    props.setSearchValue('');
    refIptSearch.current.focus();
  };

  const handleKeyDown = (e: any) => {
    const { keyCode } = e;

    // 아래화살표
    if (keyCode === 40) {
      console.log(keyCode);
    }

    // 위화살표
    if (keyCode === 38) {
      console.log(keyCode);
    }
  };

  useEffect(() => {
    if (props.iptFocus) {
      if (props.searchValue.length > 0) {
        setCkIsNew(false);
        setSearchClassName('is-keyword is-typing');

        if (searchKeywordsRelation.length > 0) {
          setCkIsRelation(true);
        }
      } else if (props.searchValue.length === 0) {
        setCkIsRelation(false);
        setSearchClassName('');

        if (searchKeywordsNew.length !== 0) {
          setCkIsNew(true);
          setSearchClassName('is-keyword');
        }
      } else {
        setSearchClassName('is-keyword');
      }

      if (props.searchValue.length === 0 && searchKeywordsNew.length !== 0) {
        setCkIsNew(true);
        setCkIsRelation(false);
      }
    } else {
      props.searchValue.length > 0
        ? setSearchClassName('is-typing')
        : setSearchClassName('');
      setCkIsNew(false);
      setCkIsRelation(false);
    }
  }, [props.iptFocus, props.searchValue]);

  return (
    <SearchBarSection>
      <SearchBarGroup className={searchClassName}>
        <SearchBarIptGroup>
          <input
            type="search"
            name="sch01"
            id="sch01"
            placeholder="검색어를 입력하세요"
            spellCheck={false}
            autoComplete={'off'}
            value={props.searchValue}
            onFocus={() => props.setIptFocus(true)}
            onBlur={() => props.setIptFocus(false)}
            onChange={(e) => props.setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={refIptSearch}
          />
        </SearchBarIptGroup>

        <SearchBarControllGroup>
          <SearchBarBtnGroup>
            <SearchBarBtnDelete onValueReset={handleValueReset} />
          </SearchBarBtnGroup>
          <SearchBarRescan iptDisabled={props.iptDisabled} />
        </SearchBarControllGroup>
      </SearchBarGroup>

      {/* 
          [D] 최신 검색어
          => 최대 5개
        */}
      {props.iptFocus && ckIsNew && <SearchKeywordNew />}

      {/* 
          [D] 연관 검색어
          => 최대 5개
        */}
      {props.iptFocus && ckIsRelation && <SearchKeywordRelation />}
    </SearchBarSection>
  );
}

function SearchBarBtnDelete(props: any) {
  const deleteBtnCss = css`
    display: block;
    width: 20px;
    height: 20px;
    background: url('/images/search/ico_search_delete.svg') no-repeat center /
      contain;
    cursor: pointer;

    @media (max-width: ${breakpoint.mobile}) {
      .is-focus & {
        background-image: url('/images/search/ico_search_delete_black.svg');
      }
      .is-focus .search-result & {
        background-image: url('/images/search/ico_search_delete.svg');
      }
    }
  `;
  return (
    <button
      type="button"
      css={deleteBtnCss}
      onTouchStart={props.onValueReset}
      onClick={props.onValueReset}
    >
      <span css={screenOut}>검색어 삭제</span>
    </button>
  );
}

const SearchBarSection = styled('div')`
  position: relative;
`;
const SearchBarGroup = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  background: ${Color.bg_grey} url('/images/search/ico_search_grey.svg')
    no-repeat 17px / 30px;
  border-radius: 30px;
  z-index: 101;

  @media (max-width: ${breakpoint.mobile}) {
    height: 52px;
    background-position: 15px 11px;
  }

  .is-focus & {
    background-color: ${Color.white};
    background-image: url('/images/search/ico_search_darkbg.svg');

    @media (max-width: ${breakpoint.mobile}) {
      height: 40px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &.is-keyword {
    border-radius: 10px 10px 0 0;

    @media (max-width: ${breakpoint.mobile}) {
      background-image: url('/images/search/ico_search_line.svg');
      background-position: 15px 5px;
      border-radius: 20px;
    }
  }

  .is-focus .search-result &.is-keyword {
    @media (max-width: ${breakpoint.mobile}) {
      height: 52px;
      background: ${Color.white} url('/images/search/ico_search_darkbg.svg')
        no-repeat 15px 11px / 30px;
      border-radius: 10px 10px 0 0;
    }
  }
`;
const SearchBarIptGroup = styled('div')`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input[type='search'] {
    // 초기화
    &::-ms-clear,
    &::-ms-reveal {
      display: none;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }

    &::placeholder,
    &::-webkit-input-placeholder,
    &:-ms-input-placeholder {
      font-weight: 300;
      color: ${Color.warm_gray};

      @media (max-width: ${breakpoint.mobile}) {
        .is-focus & {
          color: ${Color.white};
        }
      }
    }

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 60px;
    font-size: 20px;
    font-weight: 700;
    color: ${Color.black};
    line-height: 30px;
    letter-spacing: -0.06em;
    outline: 0;

    @media (max-width: ${breakpoint.mobile}) {
      padding: 0 15px 0 53px;
      font-size: 16px;

      .is-focus & {
        font-size: 14px;
        font-weight: 500;
        color: ${Color.white};
      }
      .is-focus .search-result.--keyword-absolute & {
        font-size: 16px;
        color: ${Color.black};
      }
    }
  }
`;
const SearchBarControllGroup = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  padding-left: 8px;
`;
const SearchBarBtnGroup = styled('div')`
  display: none;
  margin-right: 20px;

  .search-result & {
    margin-right: 0;
  }

  @media (max-width: ${breakpoint.mobile}) {
    margin-right: 15px;
  }

  .is-typing & {
    display: block;
  }
`;

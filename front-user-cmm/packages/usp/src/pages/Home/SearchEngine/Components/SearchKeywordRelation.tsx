/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { SearchKeywordContainer } from '../styles';

import SearchKeywordItemBtn from './SearchKeywordItemBtn';

import { searchKeywordsRelation } from '../Data/dataSearch';

export default function SearchKeywordRelation(props: any) {
  return (
    <Box css={SearchKeywordContainer}>
      <KeywordItemList>
        {searchKeywordsRelation.map((item, i) => (
          <li key={i}>
            <SearchKeywordItemBtn
              type={'relation'}
              itemTxt={item}
              evtClick={props.evtHashClick}
            />
          </li>
        ))}
      </KeywordItemList>
    </Box>
  );
}

const KeywordItemList = styled('ul')`
  .--keyword-absolute & {
    padding-bottom: 10px;
  }
`;

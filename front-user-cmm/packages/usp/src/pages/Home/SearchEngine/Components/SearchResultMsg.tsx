/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

import { Box, Typography } from '@mui/material';
import { SearchResultMsgContainer } from '../styles';

import { searchResultInfo } from '../Data/dataSearch';

export default function SearchResultMsg() {
  return (
    <Box css={SearchResultMsgContainer}>
      <Typography component="h3">
        <Typography component="b">
          <Typography component="span">
            {searchResultInfo.keyword.join(', ')}
          </Typography>
          <Typography component="span">에 대한 검색 결과는 </Typography>
        </Typography>
        <Typography component="b">
          <Typography component="span">
            총 {searchResultInfo.total}건
          </Typography>
          <Typography component="span"> 입니다.</Typography>
        </Typography>
      </Typography>
    </Box>
  );
}

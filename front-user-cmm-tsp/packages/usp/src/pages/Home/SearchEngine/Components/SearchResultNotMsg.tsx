/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

import { Box, Typography } from '@mui/material';
import { SearchResultNotMsgContainer } from '../styles';

import { searchResultInfo } from '../Data/dataSearch';

export default function SearchResultNotMsg() {
  return (
    <Box css={SearchResultNotMsgContainer}>
      <Typography component="h3">
        <Typography component="span">
          {searchResultInfo.keyword.join(', ')}
        </Typography>
        <Typography component="span">에 대한 검색 결과가 없습니다.</Typography>
      </Typography>
      <Typography component="p">
        단어의 철자 및 띄어쓰기가 정확한지 확인해 보세요.
        <br />
        한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.
      </Typography>
    </Box>
  );
}

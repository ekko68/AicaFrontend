import * as React from 'react';
import { NavLink } from 'react-router-dom';

import {
  CommonInner,
  SearchQuickBanGroup,
  SearchQuickBanList,
  SearchQuickBanItem,
} from '../styles';

import { Box, Typography, Button, Modal } from '@mui/material';

export default function SearchQuickBanner() {
  return (
    <SearchQuickBanGroup>
      <CommonInner>
        <Typography component={'h2'}>
          찾으시는 검색 결과가 없으신가요?
        </Typography>
        <SearchQuickBanList>
          <SearchQuickBanItem>
            <NavLink to={'/'}>
              <Box className="txtGroup">
                <Typography component={'h3'}>사용자 매뉴얼</Typography>
                <Typography component={'p'}>
                  포털 이용을 위한 사용자 매뉴얼을 <br />
                  확인할 수 있습니다.
                </Typography>
              </Box>
              <figure></figure>
            </NavLink>
          </SearchQuickBanItem>
          <SearchQuickBanItem>
            <NavLink to={'/'}>
              <Box className="txtGroup">
                <Typography component={'h3'}>1:1 문의</Typography>
                <Typography component={'p'}>
                  시스템을 이용하며 발생한 사항을 <br />
                  문의하실 수 있습니다.
                </Typography>
              </Box>
              <figure></figure>
            </NavLink>
          </SearchQuickBanItem>
          <SearchQuickBanItem>
            <NavLink to={'/'}>
              <Box className="txtGroup">
                <Typography component={'h3'}>자주묻는 질문</Typography>
                <Typography component={'p'}>
                  AICA에 반복적으로 문의되는 <br />
                  질문들을 모아 놓았습니다.
                </Typography>
              </Box>
              <figure></figure>
            </NavLink>
          </SearchQuickBanItem>
        </SearchQuickBanList>
      </CommonInner>
    </SearchQuickBanGroup>
  );
}

import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export default function MenubarSearchResult() {
  const containerCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border: 1px solid rgba(204, 204, 204, 0.2);
  `;
  return (
    <Box css={containerCss}>
      <Logo>
        <span>AICA 인공지능산업융합사업단</span>
      </Logo>
    </Box>
  );
}

const Logo = styled('h1')`
  position: relative;
  width: 90px;
  height: 34px;
  background: url('/images/logo-wathermark-white.svg') no-repeat center /
    contain;

  span {
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    overflow: hidden;
    text-indent: -9999px;
  }
`;

/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { CommonInner } from '../styles';

import { searchTabsData } from '../Data/dataSearch';
import SearchA11yProps from './SearchA11yProps';

export default function SearchResultTab(props: any) {
  const [dataTabs, setDataTabs] = useState<any>([0, 0, 0, 0, 0]);

  const resultTabsCss = css`
    position: relative;
    width: 100%;
    min-height: auto;
    overflow: hidden;

    button {
      min-width: auto;
      max-width: none;
      height: auto;
      min-height: auto;
      padding: 0;
      font-size: 0;

      @media (max-width: ${breakpoint.desk1280}) {
        &:first-of-type {
          padding-left: 20px;
        }
        &:last-of-type {
          padding-right: 20px;
        }
      }
      @media (max-width: ${breakpoint.mobile}) {
        &:first-of-type {
          padding-left: 15px;
        }
        &:last-of-type {
          padding-right: 15px;
        }
      }
    }
    .MuiTabs-indicator {
      display: none;
    }
  `;
  const resultTabBtnCss = css`
    > b {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      padding: 0 32px;
      background: ${Color.line};
      border-radius: 10px 10px 0 0;

      .name,
      .total {
        font-weight: 400;
        color: ${Color.warm_gray};
        letter-spacing: -0.06em;
      }
      .name {
        font-size: 16px;
        line-height: 24px;
      }
      .total {
        margin-left: 4px;
        font-size: 14px;
        line-height: 17px;
      }

      @media (max-width: ${breakpoint.mobile}) {
        height: 40px;
        padding: 0 24px;

        .name {
          font-size: 14px;
          line-height: 20px;
        }
        .total {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }

    .MuiTouchRipple-root {
      display: none;
    }

    &.Mui-selected {
      color: transparent;

      > b {
        background: ${Color.white};

        .name,
        .total {
          font-weight: 500;
        }
        .name {
          color: ${Color.black};
        }
        .total {
          color: ${Color.azul};
        }
      }
    }

    & + button {
      margin-left: 1px;
    }
  `;

  return (
    <Box>
      <Tabs
        value={props.tabsIdx}
        onChange={props.evtTabsChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="검색 구분"
        css={resultTabsCss}
      >
        {searchTabsData.map((data, i) => {
          return (
            <Tab
              key={i}
              css={resultTabBtnCss}
              wrapped={true}
              label={
                <b>
                  <span className={'name'}>{data.name}</span>
                  <span className={'total'}>({data.total})</span>
                </b>
              }
              {...SearchA11yProps(i)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

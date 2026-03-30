/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import {
  CommonInner,
  TabPanelGroup,
  TabPanelTitle,
  TabPanelConts,
} from '../styles';

import { TabPanelProps, searchResultData } from '../Data/dataSearch';
import SearchResultRecruit from './SearchResultRecruit';
import SearchResultEvent from './SearchResultEvent';
import SearchResultQna from './SearchResultQna';
import SearchResultNotice from './SearchResultNotice';

export default function SearchResultTabPanel(props: any) {
  return (
    <Box css={containerCss}>
      <TabPanel value={props.tabsIdx} index={0}>
        {searchResultData.map((data, i) => (
          <React.Fragment key={i}>
            {data.result?.length > 0 && (
              <TabPanelGroup key={i}>
                <CommonInner>
                  <TabPanelTitle>
                    <NavLink to={'/'}>{data.name}</NavLink>
                    <Typography component={'p'}>
                      <span className="point">{data.result?.length}</span>
                      <span>건</span>
                    </Typography>
                  </TabPanelTitle>
                </CommonInner>
                <TabPanelConts>
                  {data.cate === 'recruit' && (
                    <SearchResultRecruit result={data.result} />
                  )}
                  {data.cate === 'event' && (
                    <SearchResultEvent result={data.result} />
                  )}
                  {data.cate === 'qna' && (
                    <SearchResultQna result={data.result} />
                  )}
                  {data.cate === 'notice' && (
                    <SearchResultNotice result={data.result} />
                  )}
                </TabPanelConts>
              </TabPanelGroup>
            )}
          </React.Fragment>
        ))}
      </TabPanel>
      <TabPanel value={props.tabsIdx} index={1}>
        11111
      </TabPanel>
      <TabPanel value={props.tabsIdx} index={2}>
        22222
      </TabPanel>
      <TabPanel value={props.tabsIdx} index={3}>
        33333
      </TabPanel>
      <TabPanel value={props.tabsIdx} index={4}>
        44444
      </TabPanel>
    </Box>
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`searchResult-tabpanel-${index}`}
      aria-labelledby={`searchResult-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

const containerCss = css`
  margin-top: 60px;

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 40px;
  }
`;

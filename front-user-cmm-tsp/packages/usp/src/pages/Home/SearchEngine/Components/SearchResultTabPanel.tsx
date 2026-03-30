/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { CommonInner } from '../styles';

import { searchResultInfo, TabPanelProps } from '../Data/dataSearch';
import SearchA11yProps from './SearchA11yProps';

export default function SearchResultTabPanel(props: any) {
  return (
    <Box>
      <div className="content">
        <TabPanel value={props.tabsIdx} index={0}>
          111111
        </TabPanel>
        <TabPanel value={props.tabsIdx} index={1}>
          22222
        </TabPanel>
      </div>
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

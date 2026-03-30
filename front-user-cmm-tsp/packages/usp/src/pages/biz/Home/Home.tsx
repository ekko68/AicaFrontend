/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { HomeSection, HomeArea } from './styles';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BizVisual from './BizVisual';
import BizAnnouncement from './BizAnnouncement';
import BizBoard from './BizBoard';
import BizProcedure from './BizProcedure';
import './Home.scss';

export default function Home() {
  return (
    <HomeSection>
      <HomeArea>
        <BizVisual />
        <BizAnnouncement />
        <BizBoard />
        <BizProcedure />
      </HomeArea>
    </HomeSection>
  );
}

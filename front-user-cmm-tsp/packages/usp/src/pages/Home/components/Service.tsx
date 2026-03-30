// import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { common } from '../styles/styleCommon';
import { SlideContainer } from '../styles/styleHomeElem';

import SwiperService from './SwiperService';

import { swiperData02 } from '~/models/Model';

export default function Service(props: any) {
  const containerCss = css`
    padding-top: 0;
    background: ${common.azul};
  `;
  return (
    <SlideContainer css={containerCss}>
      <SwiperService
        swiperData={swiperData02}
        currActiveIdx={props.currActiveIdx}
        onResultSearch={props.onResultSearch}
      />
    </SlideContainer>
  );
}

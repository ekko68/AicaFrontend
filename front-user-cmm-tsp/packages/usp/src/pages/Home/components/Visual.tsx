// import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint, common } from '../styles/styleCommon';
// import {} from '../styles/styleHomeElem';

import SwiperVisual from './SwiperVisual';

import { mainHeadSwiper } from '~/models/Model';

export default function Visual() {
  return (
    <VisualContainer>
      <VisualTitleGroup>
        <VisualTitle>
          <span>
            인공지능 <br />
            혁신거점
          </span>
          <span className="bold">
            AI 인공지능 <br />
            직접단지
          </span>
        </VisualTitle>
        <VisualDesc>
          인공지능 강국 대한민국을 열어갈 수 있도록 <br />
          최고 수준의 인공지능산업융합 생태계를 조성하겠습니다.
        </VisualDesc>
      </VisualTitleGroup>
      <SwiperVisual swiperOption={mainHeadSwiper} />
    </VisualContainer>
  );
}

const VisualContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: ${common.cursor_drag};
`;

const VisualTitleGroup = styled('div')`
  position: absolute;
  top: 50%;
  left: calc((100% - 1084px) / 2);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  width: calc(100% - 340px);
  max-width: 1084px;
  transform: translateY(-50%);
  z-index: 100;
  pointer-events: none;

  @media (min-width: ${breakpoint.desk1920}) {
    left: calc((100% - 1380px) / 2);
    width: calc(100% - 270px);
    max-width: 1380px;
  }

  @media (max-width: 1423px) {
    left: 170px;
  }

  @media (max-width: ${breakpoint.mobile}) {
    left: 15px;
    flex-direction: column;
    align-items: flex-start;
    width: calc(100% - 30px);
  }
`;
const VisualTitle = styled('h2')`
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span {
    font-size: ${common.sz80};
    font-weight: 100;
    color: ${common.white};
    line-height: ${common.sz90};
    letter-spacing: -0.06em;

    &.bold {
      font-weight: 700;
    }

    @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
      font-size: ${common.sz60};
      line-height: ${common.sz68};
    }

    @media (max-width: ${breakpoint.mobile}) {
      font-size: ${common.sz50};
      line-height: ${common.sz60};
    }
  }
`;
const VisualDesc = styled('p')`
  margin: ${common.sz20} 0;
  font-size: ${common.sz20};
  font-weight: 400;
  color: ${common.white};
  line-height: ${common.sz36};
  letter-spacing: -0.06em;

  @media (max-width: ${breakpoint.mobile}) {
    font-size: ${common.sz16};
    line-height: 26px;
  }
`;

// import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint, common } from '../styles/styleCommon';
import { SlideContainer, SlideContents } from '../styles/styleHomeElem';

import SwiperPerViewNoauto from './SwiperPerViewNoauto';

// resultData 테스트 데이터 전달 함.
import { swiperData2 } from '~/models/Model';

export const ResultCorp: React.FC<{
  resultData: any;
}> = (props) => {
  const containerBg = css`
    align-items: flex-start;
    background: ${common.bg_grey};
  `;
  const SlideContentsCss = css`
    padding-top: 30vw !important;
    padding-bottom: 30vw !important;

    @media (min-aspect-ratio: 9/16) {
      padding-top: 15vw !important;
      padding-bottom: 15vw !important;
    }
  `;

  console.log(props.resultData);
  console.log(props.resultData.length);

  return (
    <SlideContainer css={containerBg}>
      <SlideContents css={SlideContentsCss}>
        <ResultCorpTitleGroup>
          <ResultCorpTitle>검색된 사업</ResultCorpTitle>
          <ResultCorpTitleNum>
            {/* 모바일은 최대 4건 */}
            <span>{props.resultData.length}</span>
            <span>건</span>
          </ResultCorpTitleNum>
        </ResultCorpTitleGroup>
        <SlidesPerViewSection className="resultcorp">
          <SwiperPerViewNoauto
            swiperData={props.resultData}
            swiperPdxClass={'--ver1'}
            swiperTypeColor={'--result --black'}
          />
        </SlidesPerViewSection>
      </SlideContents>
    </SlideContainer>
  );
};

const ResultCorpTitleGroup = styled('div')`
  display: flex;
  align-items: flex-end;
  padding-left: ${common.pdxM};

  @media (min-width: ${breakpoint.desk1920}) {
    padding-left: ${common.pdxL};
  }

  @media (max-width: ${breakpoint.desk1200}) {
    padding-left: ${common.pdxSM};
  }

  @media (max-width: ${breakpoint.mobile}) {
    padding-left: ${common.sz15};

    & + .resultcorp {
      .swiper-perview__section {
        padding-bottom: 110px !important;
      }
    }
  }
`;
const ResultCorpTitle = styled('h2')`
  font-size: ${common.sz24};
  font-weight: 700;
  line-height: ${common.sz36};

  @media (max-width: ${breakpoint.mobile}) {
    font-size: ${common.sz20};
    line-height: ${common.sz30};
  }
`;
const ResultCorpTitleNum = styled('p')`
  margin-left: ${common.sz10};
  padding-bottom: 0.65vh;

  > span {
    font-size: ${common.sz16};

    &:first-of-type {
      font-weight: 700;
      color: ${common.azul};
    }
    &:last-of-type {
      font-weight: 400;
      color: ${common.black};
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    > span {
      font-size: ${common.sz16};
    }
  }
`;

export const SlidesPerViewSection = styled('div')`
  margin-top: ${common.sz30};

  @media (max-width: ${breakpoint.mobile}) {
    flex-grow: 1;
    margin-top: ${common.sz24};
  }
`;

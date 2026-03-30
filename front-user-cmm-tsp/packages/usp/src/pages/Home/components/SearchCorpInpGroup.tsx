import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { breakpoint, common } from '../styles/styleCommon';

import { searchCorpIptStep1, searchCorpIptStep2 } from '~/models/Model';
import { SearchCorpInpItem } from './SearchCorpInpItem';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectFade,
  Mousewheel,
} from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-cube/effect-cube.scss';


export const SearchCorpInpGroup: React.FC<{
  FNTN: any;
  BSR: any;
  onCheckedCkbox: any;
  onCheckedRdobox: any;
}> = (props) => {

  return (
    <SearchCorpStepList>
      <SearchCorpStepListItem>
        <SearchCorpInpTitStep1 />
        <SearchCorpInpTitStep1Opt
          FNTN = {props.FNTN}
          onCheckedCkbox={props.onCheckedCkbox}
          onCheckedRdobox={props.onCheckedRdobox}
        />
      </SearchCorpStepListItem>
      <SearchCorpStepListItemLine />
      <SearchCorpStepListItem>
        <SearchCorpInpTitStep2 />
        <SearchCorpInpTitStep2Opt
          BSR = {props.BSR}
          onCheckedCkbox={props.onCheckedCkbox}
          onCheckedRdobox={props.onCheckedRdobox}
        />
      </SearchCorpStepListItem>
    </SearchCorpStepList>
  );
};

export const SwiperSearchCorpInpGroup: React.FC<{
  FNTN: any;
  BSR: any;
  onCheckedCkbox: any;
  onCheckedRdobox: any;
  checkedRdobox?: any;
}> = (props) => {
  const [swiper, setSwiper] = useState<any | null>(null);
  const [touchState, setTouchState] = useState<boolean>(false);

  const controllerCss = css`
    left: auto !important;
    bottom: auto !important;
    right: 15px;
    top: 28px;

    .swiper-pagination {
      &-search {
        display: flex;
      }
      &-bullet {
        flex-shrink: 0;
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;

        &:not(:last-of-type) {
          margin-right: ${common.sz8} !important;
        }
        &:last-of-type {
          margin-right: 0 !important;
        }
      }
    }
  `;

  useEffect(() => {
    props.checkedRdobox.length > 0 ? setTouchState(true) : setTouchState(false);
  }, [props.checkedRdobox]);

  useEffect(() => {
    if (swiper && touchState) {
      swiper.slideTo(1, 500);
    }
  }, [touchState]);

  return (
    <Swiper
      allowSlidePrev={touchState}
      allowSlideNext={touchState}
      pagination={{
        el: '.swiper-pagination-search',
        clickable: false,
        type: 'bullets',
      }}
      onSwiper={(swiper) => setSwiper(swiper)}
      preventClicks={false}
      preventClicksPropagation={false}
    >
      <SwiperSlide>
        <SearchCorpStepListItem>
          <SearchCorpInpTitStep1 />
          <SearchCorpInpTitStep1Opt
            FNTN = {props.FNTN}
            onCheckedCkbox={props.onCheckedCkbox}
            onCheckedRdobox={props.onCheckedRdobox}
          />
        </SearchCorpStepListItem>
      </SwiperSlide>
      <SwiperSlide>
        <SearchCorpStepListItem>
          <SearchCorpInpTitStep2 />
          <SearchCorpInpTitStep2Opt
            BSR = {props.BSR}
            onCheckedCkbox={props.onCheckedCkbox}
            onCheckedRdobox={props.onCheckedRdobox}
          />
        </SearchCorpStepListItem>
      </SwiperSlide>

      <div css={controllerCss} className="swiper__controller__group">
        <div className="swiper-pagination-search"></div>
      </div>
    </Swiper>
  );
};

SwiperCore.use([EffectFade, Navigation, Autoplay, Pagination, Mousewheel]);

const SearchCorpInpTitStep1 = () => {
  return (
    <SearchCorpInpTitGroup>
      <small>step 1</small>
      <strong>창업단계</strong>
    </SearchCorpInpTitGroup>
  );
};

const SearchCorpInpTitStep1Opt: React.FC<{
  FNTN : any;
  onCheckedCkbox: any;
  onCheckedRdobox: any;
}> = (props) => {
  return (
    <SearchCorpInpItemGroup>
      <SearchCorpInpItem
        searchCate={props.FNTN}
        inpType={'radio'}
        inpName={'rado0'}
        onCheckedRdobox={props.onCheckedRdobox}
        onCheckedCkbox={props.onCheckedCkbox}
      />
    </SearchCorpInpItemGroup>
  );
};
const SearchCorpInpTitStep2 = () => {
  return (
    <SearchCorpInpTitGroup>
      <small>step 2</small>
      <strong>관심사업</strong>
    </SearchCorpInpTitGroup>
  );
};
const SearchCorpInpTitStep2Opt: React.FC<{
  BSR : any;
  onCheckedCkbox: any;
  onCheckedRdobox: any;
}> = (props) => {
  return (
    <SearchCorpInpItemGroup>
      <SearchCorpInpItem
        searchCate={props.BSR}
        inpType={'checkbox'}
        inpName={'ckbx0'}
        onCheckedRdobox={props.onCheckedRdobox}
        onCheckedCkbox={props.onCheckedCkbox}
      />
    </SearchCorpInpItemGroup>
  );
};

const SearchCorpStepList = styled('div')``;
const SearchCorpStepListItem = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;
const SearchCorpStepListItemLine = styled('div')`
  width: ${common.sz24};
  height: ${common.sz24};
  margin: ${common.sz30} auto;
  background: url('/images/main/main_ico_down_arrow.svg') no-repeat center /
    contain;

  @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
    margin-top: ${common.sz20};
    margin-bottom: ${common.sz20};
  }
`;
const SearchCorpInpTitGroup = styled('h2')`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: ${common.sz80};
  letter-spacing: -0.06em;

  @media (max-width: 1400px) {
    margin-right: ${common.sz40};
  }

  small {
    font-size: ${common.sz13};
    font-weight: 400;
    color: ${common.azul};
    line-height: ${common.sz19};
    text-transform: uppercase;
  }
  strong {
    font-size: ${common.sz22};
    font-weight: 700;
    color: ${common.black};
    line-height: ${common.sz33};
  }

  @media (max-width: ${breakpoint.mobile}) {
    width: 100%;
    margin-right: 0;

    small {
      font-size: ${common.sz13};
      line-height: ${common.sz20};
    }
    strong {
      font-size: ${common.sz20};
      line-height: ${common.sz30};
    }
  }
`;
const SearchCorpInpItemGroup = styled('div')`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;

  @media (max-width: ${breakpoint.mobile}) {
    width: 100%;
    margin-top: ${common.sz16};
  }
`;

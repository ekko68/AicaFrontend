import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint, common } from '../styles/styleCommon';
import {
  SlideContainer,
  SlideContents,
  SlideTitleGroup,
  SlideTitle,
  ButtonOutline,
} from '../styles/styleHomeElem';

import SwiperPerView from './SwiperPerView';

import { swiperData, mainNotificationSwiper } from '~/models/Model';
import { fetchPopularPblanc } from '~/fetches/fetchNotice';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function Notification(props: any) {
  const containerBg = css`
    background: ${common.darkbg};
  `;
  const slideTitle = css`
    display: block;
    color: ${common.white};
    line-height: ${common.sz119} !important;

    @media (max-width: ${breakpoint.desk1200}) {
      line-height: ${common.sz90} !important;
    }
    @media (max-width: ${breakpoint.mobile}) {
      line-height: ${common.sz54} !important;
    }

  `;
  const titleIcon = css`
    top: ${common.sz20};
    right: -94px;
    background-image: url('/images/main/ico_notification_title.png');

    @media (max-width: ${breakpoint.desk1200}) {
      top: 10px;
      right: -80px;
    }
    @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
      top: 0;
    }
    @media (max-width: ${breakpoint.mobile}) {
      top: 0;
      right: -53px;
    }
  `;
  const ButtonOutlineCss = css`
    margin-top: ${common.sz45};
    letter-spacing: -0.06em;
    cursor: ${common.cursor_click};

    @media (max-width: ${breakpoint.desk1200}) {
      margin-top: ${common.sz22};
    }

    @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
      margin-top: 19px;
    }

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: ${common.sz8};
    }
  `;

  const [data,setData]:any = useState();
  const getData = () => {
    fetchPopularPblanc().then((res:any)=>{
      setData(res.list);
    })
  }
  useEffect(()=>{
    getData();
  },[])
  const navigate = useNavigate();
  return (
    <SlideContainer css={containerBg}>
      <SlideContents>
        <SlideTitleGroup>
          <SlideTitle>
            <span css={slideTitle}>인기 공고</span>
            <span className="ico aniTitIconMove" css={titleIcon}></span>
          </SlideTitle>
          <ButtonOutline css={ButtonOutlineCss} onClick={()=>{
            navigate('/Notice/Notice')
          }}>더보기</ButtonOutline>
        </SlideTitleGroup>
        <SlidesPerViewSection>
          <SwiperPerView
            swiperOption={mainNotificationSwiper}
            swiperData={data}
            swiperPdxClass={'--ver1'}
            swiperTypeColor={'--notification'}
            currActiveIdx={props.currActiveIdx}
          />
        </SlidesPerViewSection>
      </SlideContents>
    </SlideContainer>
  );
}

const SlidesPerViewSection = styled('div')`
  margin-top: ${common.sz40};

  @media (max-width: ${breakpoint.mobile}) {
    flex-grow: 1;
    margin-top: 9.44vw;
    padding-top: 9.44vw;

    @media (min-aspect-ratio: 9/16) {
      padding-top: 0;
    }
  }
`;

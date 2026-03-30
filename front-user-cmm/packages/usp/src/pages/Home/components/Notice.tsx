// import React, { useEffect, useRef, useState } from 'react';
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

import { Box } from '@mui/material';

import SwiperNotice from './SwiperNotice';
import { swiperData03 } from '~/models/Model';
import { NavLink } from 'react-router-dom';
import { useQuery } from "react-query";
import { fetchAnnouncement, fetchEventView } from "~/fetches";
import { useState } from 'react';

export default function Notice(props: any) {
  const containerBg = css`
    background: ${common.darkbg};
  `;
  const contentsCss = css`
    @media (max-width: ${breakpoint.mobile}) {
      @media (min-aspect-ratio: 9/16) {
        padding-bottom: 5vw;
      }
    }
  `;
  const slideTitleGroup = css`
    > div {
      width: 50%;
    }
    @media (max-width: 1400px) {
      flex-wrap: wrap;
      > div {
        width: 100%;
      }
    }
  `;
  const slideTitle = css`
    color: #6e7384;

    b {
      color: ${common.white};
    }
  `;
  const titleIcon = css`
    top: 0;
    right: -42px;
    background-image: url('/images/main/ico_notice_title.png');

    @media (max-width: ${breakpoint.mobile}) {
      top: -${common.sz10};
      right: -32px;
    }
  `;
  const slideDescGroup = css`
    display: flex;
    flex-direction: column;
    padding: ${common.sz24} 0 ${common.sz20};

    @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
      padding-top: 0;
    }
    @media (max-width: ${breakpoint.mobile}) {
      padding: ${common.sz10} 0 0;
    }
  `;
  const buttonWrap = css`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

    > a {
      cursor: ${common.cursor_click};
    }

    @media (max-width: 1400px) {
      justify-content: flex-start;
      margin-top: ${common.sz20};
    }

    @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
      margin-top: ${common.sz24};
    }

    @media (max-width: ${breakpoint.desk1200}) {
    }
    @media (max-width: ${breakpoint.mobile}) {
      justify-content: space-between;
      width: 100%;
      margin-top: 0;

      > a {
        width: calc((100% - 15px) / 2);
        &:not(:first-of-type) {
          margin-left: ${common.sz15};
        }
      }
    }
  `;

const params = {
  boardId : process.env.REACT_APP_USP_NOTICE ? process.env.REACT_APP_USP_NOTICE : '',
  posting : true,
  articleSrchCd : "",
  articleSrchWord : "",
  page : 1,
  itemsPerPage : 2,
}
const params1 = {
  // beginDay : dayjs(begin).format('YYYYMMDD').toString(),
  // endDay : dayjs(today).format('YYYYMMDD').toString(),
  searchType : "",
  searchCn : "",
  sortType : "created_dt",
  page : 1,
  itemsPerPage : 1,
}
const {data:announcement} = useQuery("homeAnnouncement", async () => await fetchAnnouncement(params))
const {data:event} = useQuery("homeEvent", async () => await fetchEventView(params1))


  return (
    <SlideContainer css={containerBg}>
      <SlideContents css={contentsCss}>
        <SlideTitleGroup css={slideTitleGroup}>
          <Box style={{ display: 'flex' }}>
            <SlideTitle>
              <span css={slideTitle}>
                <b>최신 소식</b>을 <br />
                전해 드립니다
              </span>
              <span className="ico aniTitIconMove" css={titleIcon}></span>
            </SlideTitle>
          </Box>
          <Box css={slideDescGroup}>
            <SlideTitleDesc>
              빠르게 전해드리는 AICA의 최신 소식을 <br />
              지금 바로 확인해 보세요.
            </SlideTitleDesc>
            <Box css={buttonWrap}>
              <NavLink to={'/Notice/Announcement'}>
                <ButtonOutline>공지사항</ButtonOutline>
              </NavLink>
              <NavLink to={'/EventNews/HonsaEvent'}>
                <ButtonOutline>행사/이벤트</ButtonOutline>
              </NavLink>           
            </Box>
          </Box>
        </SlideTitleGroup>
        <SlidesPerViewSection>
          <SwiperNotice
            announcement = {announcement?.list}
            event = {event?.list}
            swiperData={swiperData03}
            currActiveIdx={props.currActiveIdx}
            onResultSearch={props.onResultSearch}
          />
        </SlidesPerViewSection>
      </SlideContents>
    </SlideContainer>
  );
}

const SlidesPerViewSection = styled('div')`
  margin-top: ${common.sz30};

  @media (max-width: ${breakpoint.mobile}) {
    flex-grow: 1;
    margin-top: ${common.sz40};
  }
`;

const SlideTitleDesc = styled('p')`
  font-size: ${common.sz20};
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: ${common.sz34};
  letter-spacing: -0.06em;

  @media (max-width: ${breakpoint.mobile}) {
    margin-bottom: ${common.sz20};
    font-size: ${common.sz16};
    line-height: 1.5;
  }
`;

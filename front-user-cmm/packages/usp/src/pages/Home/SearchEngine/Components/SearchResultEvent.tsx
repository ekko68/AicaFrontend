/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Typography, List, ListItem } from '@mui/material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import {
  CommonInner,
  SearchResultEventSection,
  SearchIconEventIng,
  searchThumbIcon,
} from '../styles';

export default function SearchResultEvent(props: any) {
  const { result } = props;

  return (
    <CommonInner>
      <SearchResultEventSection>
        {/* max 3개 노출 */}
        <List>
          {result.map((item: any, i: number) => (
            <ListItem key={i}>
              <NavLink to={item.eventLink}>
                <EventThumb>
                  <figure
                    style={{
                      backgroundImage: `url(${item.eventImg})`,
                    }}
                  ></figure>

                  {/* 진행중일 경우에만 아이콘 노출 */}
                  <SearchIconEventIng css={searchThumbIcon} />
                </EventThumb>

                {/* 검색 단어있을 경우 포인트 컬러 적용해야함. */}
                <EventTitle>{item.eventNm}</EventTitle>
                <EventInfo>
                  <Typography component={'p'}>
                    <span>진행기간</span>
                    <span className="point">
                      {item.fmtBeginDay} ~ {item.fmtEndDay}
                    </span>
                  </Typography>
                </EventInfo>
                <EventInfo>
                  <Typography component={'p'}>
                    <span>조회</span>
                    <span className="point">{item.readCnt}</span>
                  </Typography>
                  <Typography component={'p'}>
                    <span>작성일</span>
                    <span className="point">{item.fmtCreatedDay}</span>
                  </Typography>
                </EventInfo>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </SearchResultEventSection>
    </CommonInner>
  );
}

const EventThumb = styled('div')`
  position: relative;

  figure {
    height: 200px;
    margin: 0;
    padding: 0;
    background: no-repeat center / cover;
    border-radius: 15px 15px 10px 10px;

    @media (max-width: 1260px) {
      height: 0;
      padding-bottom: 66.66%;
    }
  }
`;
const EventTitle = styled('h3')`
  height: 64px;
  margin: 20px 0 15px;
  font-size: 20px;
  font-weight: 700;
  color: ${Color.black};
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: ${breakpoint.mobile}) {
    height: 60px;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 30px;
  }
`;
const EventInfo = styled('div')`
  display: flex;
  align-items: center;

  > p {
    display: flex;
    align-items: center;

    &:not(:first-of-type) {
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 12px;
        margin: 0 8px;
        background: ${Color.gray};
      }
    }

    span {
      font-size: 14px;
      font-weight: 400;
      color: ${Color.warm_gray};
      line-height: 20px;
      letter-spacing: -0.06em;

      &.point {
        color: ${Color.black};
      }

      &:not(:only-child):first-of-type {
        margin-right: 6px;
      }
    }
  }

  & + & {
    margin-top: 5px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 4px;
    }
  }
`;

/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import * as styles from '~/styles/styles';
import { NavLink } from 'react-router-dom';

import { Stack, Typography, List, ListItem } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import {
  CommonInner,
  SearchResultNoticeSection,
  SearchIconNew,
  searchMoreBtn,
} from '../styles';

export default function SearchResultNotice(props: any) {
  const { result } = props;
  const moreInfo = () => {
    console.log('더보기 버튼');
  };

  return (
    <CommonInner>
      <SearchResultNoticeSection className="--type-list">
        {/* 기본 3개 노출 */}
        <List>
          {result.map((item: any, i: number) => (
            <ListItem key={i}>
              <NavLink to={item.link}>
                <NoticeTitle>
                  <Typography component={'p'}>{item.title}</Typography>
                  {/* 24시간 기준 아이콘 유무? */}
                  <SearchIconNew />
                </NoticeTitle>
                <NoticeArticle>{item.article}</NoticeArticle>
                <NoticeInfoGroup>
                  <Typography component={'p'}>
                    <span>조회</span>
                    <span className="point">{item.readCnt}</span>
                  </Typography>
                  <Typography component={'p'}>
                    <span className="point">{item.date}</span>
                  </Typography>
                  <Typography component={'p'}>
                    <span>작성자</span>
                    <span className="point">{item.write}</span>
                  </Typography>
                </NoticeInfoGroup>
              </NavLink>
            </ListItem>
          ))}
        </List>

        {/* 
          1. 4개 이상일 때 더보기 버튼 노출 
          2. 더 보여줘야 할 정보 없을 때는 미노출
         */}
        <Stack css={(styles.bottom_btn, searchMoreBtn)}>
          <CustomButton
            label={'더보기'}
            type={'full'}
            color={'item'}
            onClick={() => moreInfo()}
          />
        </Stack>
      </SearchResultNoticeSection>
    </CommonInner>
  );
}

const NoticeTitle = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: ${breakpoint.mobile}) {
    margin-bottom: 12px;
  }

  p {
    max-width: 100%;
    font-size: 20px;
    font-weight: 700;
    color: ${Color.black};
    line-height: 1.5;
    letter-spacing: -0.06em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 16px;
    }
  }
`;
const NoticeArticle = styled('p')`
  max-height: 56px;
  font-size: 16px;
  font-weight: 400;
  color: ${Color.warm_gray};
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: ${breakpoint.mobile}) {
    font-size: 14px;
  }
`;
const NoticeInfoGroup = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 20px;

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 16px;
  }

  p {
    display: flex;
    align-items: center;
    letter-spacing: -0.06em;

    &:not(:last-of-type) {
      &::after {
        content: '';
        width: 1px;
        height: 12px;
        margin: 0 8px;
        background: ${Color.gray};
      }
    }
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: ${Color.warm_gray};
    line-height: 1;

    &:not(:only-of-type):first-of-type {
      margin-right: 6px;
    }

    &.point {
      color: ${Color.black};
    }
  }
`;

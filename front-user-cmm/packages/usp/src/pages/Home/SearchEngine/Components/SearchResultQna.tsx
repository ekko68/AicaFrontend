/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import * as styles from '~/styles/styles';
import { NavLink } from 'react-router-dom';

import { Stack, Typography, List, ListItem } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';

import styled from '@emotion/styled';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { CommonInner, SearchResultQnaSection, searchMoreBtn } from '../styles';

export default function SearchResultQna(props: any) {
  const { result } = props;
  const moreInfo = () => {
    console.log('더보기 버튼');
  };

  return (
    <CommonInner>
      <SearchResultQnaSection className="--type-list">
        {/* 기본 3개 노출 */}
        <List>
          {result.map((item: any, i: number) => (
            <ListItem key={i}>
              <QnaCate>
                <Typography component={'p'}>{item.categoryCd}</Typography>
              </QnaCate>
              <QnaTitle>
                {/* 포인트 문구 컬러값 변경해야 함. */}
                <Typography component={'p'}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </Typography>
              </QnaTitle>
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
      </SearchResultQnaSection>
    </CommonInner>
  );
}

const QnaCate = styled('div')`
  flex-shrink: 0;
  width: 20%;
  min-width: 130px;
  padding: 3px 0 0 30px;

  @media (max-width: ${breakpoint.mobile}) {
    width: 100%;
    min-width: auto;
    padding: 0 0 0 15px;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: ${Color.black};
    letter-spacing: -0.06em;

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
const QnaTitle = styled('div')`
  padding-right: 30px;

  @media (max-width: ${breakpoint.mobile}) {
    padding: 12px 15px 0;
  }

  p {
    display: flex;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.06em;

    a {
      max-height: 60px;
      font-size: 18px;
      color: ${Color.black};
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      @media (max-width: ${breakpoint.mobile}) {
        font-size: 16px;
      }
    }

    &::before {
      content: 'Q';
      flex-shrink: 0;
      display: block;
      width: 25px;
      font-size: 22px;
      color: ${Color.azul};

      @media (max-width: ${breakpoint.mobile}) {
        width: 20px;
        padding-top: 2px;
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
`;

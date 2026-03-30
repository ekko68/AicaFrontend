/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from 'react';
import * as styles from '~/styles/styles';
import dayjs from 'dayjs';

import { Box, useMediaQuery, List, ListItem } from '@mui/material';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { CommonInner } from '../styles';

import { paramsType, SttusType } from '~/pages/Notice/NoticeModel';

import SearchResultConditionPc from './SearchResultConditionPc';
import { SearchResultModalMobile } from './SearchResultModalMobile';

export default function SearchResultCondition() {
  const isMobile = useMediaQuery('(max-width:1200px)');
  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useState<paramsType>({
    pblancNm: '',
    ordtmRcrit: false,
    pblancSttus: '',
    applyMberType: '',
    recomendCl: '',
    sortOrder: 'pblancDay',
    page: 1,
    itemsPerPage: 5,
  });

  const [filterKeyword1, setFilterKeyword1] = useState<string>('filter1-2');
  const [filterKeyword2, setFilterKeyword2] = useState<string>('filter2-1');
  const [filterKeyword3, setFilterKeyword3] = useState<string>('filter3-1');

  const today = new Date();
  today.setHours(today.getHours() - 24);

  const [quests, setQuests] = useState({
    mvnFcNm: '',
    srchBeginDay: dayjs(today).format('YYYYMMDD'),
    srchEndDay: dayjs(today).add(1, 'M').format('YYYYMMDD'),
    reserveSt: '',
    page: 1,
    itemsPerPage: 5,
  });

  const handleReset = () => {
    console.log('초기화 버튼');
  };
  const handleDetailModal = () => {
    setModalOpen(true);
  };

  const containerCss = css`
    height: 70px;
    background: ${Color.white};
    border-bottom: 1px solid ${Color.line};

    @media (max-width: ${breakpoint.desk1200}) {
      height: 44px;
    }
  `;
  const commonInnerCss = css`
    display: flex;
    justify-content: flex-end;
    height: 100%;

    @media (min-width: 1201px) and (max-width: ${breakpoint.desk1280}) {
      padding: 0 20px;
    }
    @media (max-width: ${breakpoint.desk1200}) {
      padding-right: 16px;
    }
  `;
  const listCss = css`
    display: flex;
    padding: 0;

    @media (max-width: ${breakpoint.desk1200}) {
      flex-direction: row-reverse;
    }

    > li {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: auto;

      @media (min-width: 1201px) {
        &:not(:first-of-type) {
          &::before {
            content: '';
            width: 1px;
            height: 38px;
            margin: 0 12px;
            background: ${Color.line};
          }
        }
      }

      @media (max-width: ${breakpoint.desk1200}) {
        &:first-of-type {
          &::before {
            content: '';
            width: 1px;
            height: 10px;
            margin: 0 10px;
            background: ${Color.line};
          }
        }
      }
    }
  `;
  const listItemCss = css`
    padding: 0;
  `;

  return (
    <Box css={containerCss}>
      <CommonInner css={commonInnerCss}>
        <List css={listCss}>
          <ListItem css={listItemCss}>
            {isMobile ? (
              <BtnDetailView
                label={'상세 검색'}
                onDetailView={handleDetailModal}
              />
            ) : (
              <SearchResultConditionPc
                filterKeyword1={filterKeyword1}
                filterKeyword2={filterKeyword2}
                filterKeyword3={filterKeyword3}
                setFilterKeyword1={setFilterKeyword1}
                setFilterKeyword2={setFilterKeyword2}
                setFilterKeyword3={setFilterKeyword3}
                quests={quests}
                setQuests={setQuests}
              />
            )}
          </ListItem>
          <ListItem css={listItemCss}>
            <BtnReset label={'초기화'} onReset={handleReset} />
          </ListItem>
        </List>
      </CommonInner>

      {/* 상세조건 mobile 인경우 모달 팝업 */}
      {modalOpen && isMobile ? (
        <SearchResultModalMobile
          open={modalOpen}
          quests={quests}
          setQuests={setQuests}
          setModalOpen={(ck: boolean) => {
            setModalOpen(ck);
          }}
          handlerSearch={(sttus: SttusType) => {
            setParams((pre) => ({
              ...pre,
              pblancSttus: sttus.pblancSttus,
              applyMberType: sttus.applyMberType,
              recomendCl: sttus.recomendCl,
            }));
          }}
        />
      ) : null}
    </Box>
  );
}

function BtnReset(props: any) {
  const { label, onReset } = props;

  const btnResetCss = css`
    display: flex;
    align-items: center;
    letter-spacing: -0.06em;

    .ico {
      width: 28px;
      height: 28px;
      margin-right: 6px;
      background: url('/images/search/ico_search_refresh.svg') no-repeat center /
        contain;
    }

    .txt {
      font-size: 14px;
      font-weight: 400;
      color: ${Color.brownish_gray};
      line-height: 20px;

      @media (max-width: ${breakpoint.desk1200}) {
        font-weight: 500;
      }
    }
  `;

  return (
    <button type="button" onClick={onReset} css={btnResetCss}>
      <span className="ico"></span>
      <span className="txt">{label}</span>
    </button>
  );
}

function BtnDetailView(props: any) {
  const { label, onDetailView } = props;

  const btnDetailViewCss = css`
    display: flex;
    align-items: center;
    letter-spacing: -0.06em;

    .txt {
      font-size: 14px;
      font-weight: 500;
      color: ${Color.black};
      line-height: 20px;
    }
    .ico {
      width: 8px;
      height: 16px;
      margin-left: 8px;
      background: url('/images/search/ico_search_arrow_right.svg') no-repeat
        center / contain;
    }
  `;

  return (
    <button type="button" onClick={onDetailView} css={btnDetailViewCss}>
      <span className="txt">{label}</span>
      <span className="ico"></span>
    </button>
  );
}

/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import dayjs from 'shared/libs/dayjs';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAnnouncement, fetchReferenceRoom } from '~/fetches';
import { useGlobalModalStore } from '../../store/GlobalModalStore';
import { BoardGroup, CommonInner } from './styles';
import { css } from '@emotion/react';
import { breakpoint, color } from './styleCommon';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export default function BizBoard() {
  const { addModal } = useGlobalModalStore();
  const [paramsNotice, setParamsNotice] = useState({
    boardId: process.env.REACT_APP_USP_NOTICE
      ? process.env.REACT_APP_USP_NOTICE
      : '',
    posting: true,
    articleSrchCd: '',
    articleSrchWord: '',
    page: 1,
    itemsPerPage: 10,
  });

  const [paramsData, setParamsData] = useState({
    categoryCd: '',
    articleSrchCd: '',
    articleSrchWord: '',
    page: 1,
    itemsPerPage: 10,
  });

  const [listNotice, setListNotice] = useState([]);
  const [listData, setListData] = useState([]);
  const [srchCd, setSrchCd] = useState('');
  const [srchWord, setSrchWord] = useState('');
  const [articleSrchCd, setArticleSrchCd] = useState('');
  const [articleSrchWord, setArticleSrchWord] = useState('');

  const getList = () => {
    // 공지사항
    fetchAnnouncement(paramsNotice)
      .then((res: any) => {
        setListNotice(res.list);
      })
      .catch((e) => {
        let message = e.response.data.message;
        addModal({
          open: true,
          content: message,
        });
      });

    // 자료실
    fetchReferenceRoom(paramsData).then((res: any) => {
      setListData(res.list);
    });
  };

  useEffect(() => {
    getList();
  }, [paramsNotice, paramsData]);

  const boardIconCss = css`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 32px;
    margin-right: 20px;
    background: ${color.topaz};
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
    color: ${color.white};
    line-height: 20px;
  `;

  const boardTextCss = css`
    flex-grow: 1;
    overflow: hidden;
  `;

  const boardDateCss = css`
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 400;
    color: ${color.warm_grey};
    line-height: 17px;
    letter-spacing: -0.06em;
  `;

  return (
    <BoardGroup>
      <CommonInner>
        <BoardTypeGroup>
          <BoardTypeList>
            <BoardTypeTitle>
              <NavLink to={'/Notice/Announcement'}>공지사항</NavLink>
            </BoardTypeTitle>
            <BoardPostGroup>
              {listNotice.length > 0 ? (
                <ul>
                  {listNotice.map((item: any, i: number) => {
                    return (
                      <BoardPostList key={i}>
                        {i === 0 && <Box css={boardIconCss}>NEW</Box>}
                        <Box
                          css={boardTextCss}
                          className={i === 0 ? '' : 'not-first'}
                        >
                          <NavLink
                            to={`/Notice/Announcement/${item.articleId}`}
                            state={{
                              item: item,
                              articleSrchCd: srchCd,
                              articleSrchWord: srchWord,
                            }}
                          >
                            {item.title}
                          </NavLink>
                          <Typography component="p" css={boardDateCss}>
                            {dayjs(item.createdDt).format('YYYY-MM-DD')}
                          </Typography>
                        </Box>
                      </BoardPostList>
                    );
                  })}
                </ul>
              ) : (
                <BoardPostNone />
              )}
            </BoardPostGroup>
          </BoardTypeList>
          <BoardTypeList>
            <BoardTypeTitle>
              <NavLink to={'/SupportForUse/ReferenceRoom'}>자료실</NavLink>
            </BoardTypeTitle>
            <BoardPostGroup>
              {listData.length > 0 ? (
                <ul>
                  {listData.map((item: any, i: number) => {
                    return (
                      <BoardPostList key={i}>
                        {i === 0 && <Box css={boardIconCss}>NEW</Box>}
                        <Box
                          css={boardTextCss}
                          className={i === 0 ? '' : 'not-first'}
                        >
                          <NavLink
                            to={`/SupportForUse/ReferenceRoom/${item.articleId}`}
                            key={i}
                            state={{
                              item: item,
                              articleSrchCd: articleSrchCd,
                              articleSrchWord: articleSrchWord,
                            }}
                          >
                            {item.title}
                          </NavLink>
                          <Typography component="p" css={boardDateCss}>
                            {dayjs(item.createdDt).format('YYYY-MM-DD')}
                          </Typography>
                        </Box>
                      </BoardPostList>
                    );
                  })}
                </ul>
              ) : (
                <BoardPostNone />
              )}
            </BoardPostGroup>
          </BoardTypeList>
        </BoardTypeGroup>
      </CommonInner>
    </BoardGroup>
  );
}

function BoardPostNone() {
  const containerCss = css`
    display: flex;
    justify-content: center;
    height: 100%;
    padding-top: 50px;

    > figure {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0;
      padding: 0;

      figcaption {
        padding-top: 20px;
        font-size: 18px;
        font-weight: 400;
        color: #222;
        line-height: 1.56;
      }
    }
  `;
  return (
    <Box css={containerCss}>
      <figure>
        <img
          src="/images/subpage/icon_error_gray.png"
          alt="게시물이 없습니다."
        />
        <figcaption>게시물이 없습니다.</figcaption>
      </figure>
    </Box>
  );
}

const BoardTypeGroup = styled('ul')`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoint.desk1280}) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const BoardTypeList = styled('li')`
  flex-shrink: 0;
  width: calc((100% - 60px) / 2);

  @media (max-width: ${breakpoint.desk1280}) {
    width: 100%;

    & + li {
      margin-top: 40px;
    }
  }
`;
const BoardTypeTitle = styled('h3')`
  a {
    display: flex;
    align-items: center;
    font-size: 36px;
    font-weight: 700;
    color: ${color.dim};
    line-height: 54px;

    &::after {
      content: '';
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      margin-left: 10px;
      background: url(/images/biz/biz_ico_arrow_right_black.svg) no-repeat
        center/contain;
    }

    @media (max-width: ${breakpoint.desk1280}) {
      font-size: 24px;
      line-height: 36px;

      &::after {
        width: 22px;
        height: 22px;
        margin-left: 4px;
      }
    }
  }
`;
const BoardPostGroup = styled('div')`
  height: calc(100% - 70px); /* 54 + 16 */
  margin-top: 16px;
  border-top: 1px solid ${color.black};
`;
const BoardPostList = styled('li')`
  a {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: ${color.dim};
    line-height: 20px;
    overflow: hidden;

    @media (min-width: 768px) {
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (max-width: ${breakpoint.mobile}) {
      max-height: 56px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      /* autoprefixer: off */
    }

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 16px;
      line-height: 28px;
    }
  }

  &:first-of-type {
    display: flex;
    padding-top: 22px;

    a {
      margin-bottom: 16px;

      @media (max-width: ${breakpoint.mobile}) {
        margin-bottom: 10px;
        -webkit-line-clamp: 2;
      }
    }
  }

  &:nth-of-type(2) {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid ${color.line};

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 20px;
      padding-top: 20px;
    }
  }
  &:not(:first-of-type):not(:nth-of-type(2)) {
    margin-top: 20px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 16px;
    }
  }
  &:nth-of-type(n + 5) {
    display: none;
  }

  .not-first {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      flex-grow: 1;
      padding-right: 20px;
      font-size: 16px;
      font-weight: 400;
      color: ${color.brownish_gray};
      line-height: 24px;
    }

    @media (max-width: ${breakpoint.mobile}) {
      a {
        padding-right: 0;
      }
      p {
        display: none;
      }
    }
  }
`;

/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Announcement,
  CommonInner,
  multiEllipsisHelp,
  screenOut,
} from './styles';
import { breakpoint, color } from './styleCommon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';

import { popularPblanc, swiperData } from '~/models/Model';
import { useEffect, useState } from 'react';
import { fetchPopularPblanc } from '~/fetches/fetchNotice';

export default function BizAnnouncement() {
  const [data, setData] = useState<popularPblanc[]>();
  const getData = () => {
    fetchPopularPblanc().then((res: any) => {
      setData(res.list);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Announcement>
      <CommonInner>
        <AnnouncementTitle>
          <NavLink to={'../Notice/Notice'}>모집공고</NavLink>
        </AnnouncementTitle>
      </CommonInner>
      {data ? (
        <AnnouncementSwiper>
          <SwiperContent
            slidesPerView={'auto'}
            spaceBetween={20}
            slidesPerGroup={1}
            loop={true}
            speed={500}
            observer={true}
            autoplay={false}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              1340: {
                slidesPerGroup: 4,
              },
            }}
          >
            {data.map((item: any, i: any) => {
              const recomendMax = item.recomendCl.split(',').length - 1;

              return (
                <SwiperSlide key={i}>
                  <NavLink to={`/Notice/Notice/${item.pblancId}`}>
                    <AnnouncementSwiperThumb
                      // {/* todo.... -> `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`*/}
                      style={{
                        backgroundImage: `url('${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail'),url('/images/main/cont02_02.png')`,
                      }}
                    >
                      <AnnouncementThumbIconGroup>
                        <i>
                          {item.recomendCl.split(',')[0]}
                          {recomendMax !== 0 && (
                            <RecomendMaxElem max={recomendMax} />
                          )}
                        </i>
                        <i>{'마감-' + item.rmndrDay}</i>
                      </AnnouncementThumbIconGroup>
                    </AnnouncementSwiperThumb>
                    <Box>
                      <AnnouncementSwiperTitle css={multiEllipsisHelp}>
                        {item.pblancNm}
                      </AnnouncementSwiperTitle>
                      <AnnouncementSwiperDate>
                        {item.rceptPd}
                      </AnnouncementSwiperDate>
                    </Box>
                  </NavLink>
                </SwiperSlide>
              );
            })}
            <SwiperController>
              <SwiperBtnPrev className="swiper-button-prev">
                <span css={screenOut}>이전</span>
              </SwiperBtnPrev>
              <SwiperBtnNext className="swiper-button-next">
                <span css={screenOut}>다음</span>
              </SwiperBtnNext>
            </SwiperController>
          </SwiperContent>
        </AnnouncementSwiper>
      ) : null}
    </Announcement>
  );
}

function RecomendMaxElem(props: any) {
  const numCss = css`
    font-weight: 300;
  `;
  return <b css={numCss}>&nbsp;외&nbsp;{props.max}</b>;
}

const AnnouncementTitle = styled('h2')`
  a {
    display: flex;
    align-items: center;
    font-size: 36px;
    font-weight: 700;
    color: #000;
    line-height: 54px;

    &::after {
      content: '';
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      margin-left: 10px;
      background: url('/images/biz/biz_ico_arrow_right_black.svg') no-repeat
        center / contain;
    }

    @media (max-width: ${breakpoint.mobile}) {
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

const AnnouncementSwiper = styled('div')`
  margin: 30px auto 0;

  @media (min-width: 1341px) {
    width: 1316px;
  }
  @media (min-width: 1281px) and (max-width: 1340px) {
    width: 1260px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 14px;
  }
`;
const SwiperContent = styled(Swiper)`
  position: relative;

  @media (min-width: 1341px) {
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 28px;
      height: 100%;
      background: ${color.white};
      z-index: 10;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }

  .swiper {
    &-wrapper {
      padding: 0 28px;

      @media (min-width: 1281px) and (max-width: 1340px) {
        padding: 0;
      }
      @media (max-width: ${breakpoint.desk1280}) {
        padding: 0 20px;
      }
    }
    &-slide {
      width: 300px;
      a {
        display: block;
      }
    }
  }
`;
const SwiperController = styled('div')`
  > button {
    position: absolute;
    top: 0;
    width: 60px;
    height: 60px;
    margin-top: 88px;
    background: ${color.white};
    border: 1px solid ${color.black};
    border-radius: 50%;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    z-index: 20;

    &::after {
      content: '';
      width: 10px;
      height: 10px;
      border: 2px solid ${color.black};
      border-top: transparent;
      border-right: transparent;
    }

    @media (max-width: 1340px) {
      display: none;
    }
  }
`;
const SwiperBtnPrev = styled('button')`
  left: 0 !important;

  &::after {
    transform: translateX(2px) rotate(45deg);
  }
`;
const SwiperBtnNext = styled('button')`
  right: 0 !important;

  &::after {
    transform: translateX(-2px) rotate(-135deg);
  }
`;

const AnnouncementSwiperThumb = styled('figure')`
  position: relative;
  height: 200px;
  margin: 0;
  padding: 0;
  background: no-repeat center / cover;
  border-radius: 15px 15px 10px 10px;
`;

const AnnouncementThumbIconGroup = styled('div')`
  i {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;

    &:first-of-type {
      left: 0;
      background: ${color.azul};
      border-radius: 10px 0 10px 0;
      color: ${color.white};
    }
    &:last-of-type {
      right: 0;
      background: ${color.white};
      border-radius: 0 10px 0 10px;
      border: 1px solid ${color.pinkish_grey};
      color: ${color.warm_grey};
    }
  }
`;
const AnnouncementSwiperTitle = styled('h3')`
  margin: 20px 0 16px;
  font-size: 20px;
  font-weight: 700;
  color: ${color.black};
  line-height: 28px;
  height: 56px;

  @media (max-width: ${breakpoint.mobile}) {
    margin: 22px 0 8px;
    font-size: 18px;
  }
`;
const AnnouncementSwiperDate = styled('p')`
  font-size: 14px;
  font-weight: 400;
  color: ${color.black};
  line-height: 20px;

  &::before {
    content: '접수기간';
    display: block;
    margin-bottom: 5px;
    color: #999;
  }
`;

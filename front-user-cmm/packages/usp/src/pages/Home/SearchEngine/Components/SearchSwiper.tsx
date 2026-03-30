/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import styled from '@emotion/styled';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import {
  searchThumbIcon,
  SearchIconRecruit01,
  SearchIconRecruit02,
} from '../styles';

export default function SearchSwiper(props: any) {
  const { data } = props;
  const [swiper, setSwiper] = useState<any | null>(null);
  const [slidesOffset, setSlidesOffset] = useState<number>(0);

  const handleSlidesOffset = () => {
    const offset = (window.innerWidth - 1260) / 2;
    window.innerWidth < 1260 ? setSlidesOffset(0) : setSlidesOffset(offset);

    if (swiper) swiper.updateSlides();
  };

  useEffect(() => {
    handleSlidesOffset();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleSlidesOffset);
    return () => {
      window.removeEventListener('resize', handleSlidesOffset);
    };
  });

  return (
    <SwiperSection
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      }}
      slidesPerView={'auto'}
      slidesPerGroup={1}
      spaceBetween={15}
      breakpoints={{
        1281: {
          slidesPerGroup: 4,
          spaceBetween: 20,
        },
      }}
      slidesOffsetBefore={slidesOffset}
      slidesOffsetAfter={slidesOffset}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {data.map((item: any, i: number) => (
        <SwiperSlide key={i}>
          <NavLink to={item.link}>
            <SwiperThumb>
              <figure
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              ></figure>
              <SearchIconRecruit01 css={searchThumbIcon}>
                {item.recomendCl[0]}
              </SearchIconRecruit01>
              <SearchIconRecruit02 css={searchThumbIcon}>
                마감 D-{item.rmndrDay}
              </SearchIconRecruit02>
            </SwiperThumb>
            {/* 관련 검색어 있을 경우, 포인트 컬러 적용 */}
            <SlideContsTitle>{item.pblancNm}</SlideContsTitle>
            <SlideContsDate>
              <Typography component={'p'}>접수기간</Typography>
              <Typography component={'p'}>
                {item.rceptPd}({item.pblancSttus})
              </Typography>
            </SlideContsDate>
          </NavLink>
        </SwiperSlide>
      ))}
      <SwiperControllerGroup>
        <div className="swiper-pagination"></div>
      </SwiperControllerGroup>
    </SwiperSection>
  );
}
const SwiperSection = styled(Swiper)`
  .swiper {
    @media (max-width: ${breakpoint.desk1280}) {
      &-wrapper {
        padding: 0 15px;
      }
    }
    &-slide {
      width: 300px;

      @media (max-width: ${breakpoint.desk1280}) {
        width: 285px;
      }

      a {
        display: block;
        width: 100%;
      }

      @media (min-width: 1281px) {
        opacity: 0.4;

        &-active,
        &-next {
          opacity: 1;
        }
        &-next {
          & + .swiper-slide {
            opacity: 1;
            & + .swiper-slide {
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;

const SwiperThumb = styled('div')`
  figure {
    width: 100%;
    height: 200px;
    margin: 0;
    padding: 0;
    background: no-repeat center / cover;
    border-radius: 15px 15px 10px 10px;
  }
`;
const SlideContsTitle = styled('h3')`
  height: 60px;
  margin: 20px 0 16px;
  font-size: 20px;
  font-weight: 700;
  color: ${Color.black};
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: ${breakpoint.desk1280}) {
    margin: 12px 0 6px;
    font-size: 18px;
  }
`;
const SlideContsDate = styled('div')`
  p {
    font-size: 14px;
    font-weight: 400;
    color: ${Color.warm_gray};
    line-height: 20px;
    letter-spacing: -0.06em;

    & + p {
      margin-top: 5px;
    }
  }
`;
const SwiperControllerGroup = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 44px 0 61px;

  .swiper-pagination {
    position: static;
    display: flex;

    &-bullet {
      display: block;
      width: 60px;
      height: 2px;
      margin: 0 5px;
      background: ${Color.gray};
      border-radius: 0;
      opacity: 1;

      &-active {
        background: ${Color.topaz};
      }
    }

    @media (max-width: ${breakpoint.desk1280}) {
      display: none;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 1260px;
    height: 1px;
    background: ${Color.line};
    transform: translateX(-50%);
  }

  @media (max-width: ${breakpoint.desk1280}) {
    padding: 0 0 41px;

    &::after {
      left: 15px;
      width: calc(100vw - 30px);
      transform: translateX(0);
    }
  }
`;

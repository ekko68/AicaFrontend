/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCube,
} from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
import '../styles/swiper-custom.scss';
import { breakpoint, common } from '../styles/styleCommon';
import dayjs from 'dayjs';

export default function SwiperNotice(props: any) {
  const [swiper, setSwiper] = useState<any | null>(null);
  const [activeSwiper, setActiveSwiper] = useState<number | null>(null);
  const [palyClassName, setPalyClassName] = useState('');

  const handlePlay = () => {
    swiper.autoplay.start();
    setPalyClassName('');
  };
  const handleStop = () => {
    swiper.autoplay.stop();
    setPalyClassName('is-stop');
  };

  useEffect(() => {
    if (!palyClassName) {
      props.onResultSearch
        ? Number(props.currActiveIdx) === 5 && swiper.autoplay.start()
        : Number(props.currActiveIdx) === 4 && swiper.autoplay.start();
    }
  });
  console.log(props.event)
  console.log(props.announcement)
  return (
    <Box className="swiper-notice__section">
      <Box
        className={`swiper-notice__left --idx${activeSwiper}  ${palyClassName}`}
      >
        {props.event?.map((item: any, i: any) => (
          <Box className="swiper-notice__left__item" key={i}>
            <NavLink to={`../HonsaEventDetail/${item.eventId}`} >
              <NoticeTitle>{item.eventNm}</NoticeTitle>
            </NavLink>
            {/* <NavLink to={`../HonsaEventDetail/${item.eventId}`} >
              <NoticeDesc></NoticeDesc>
            </NavLink>
            <NavLink to={`../HonsaEventDetail/${item.eventId}`} >
              <NoticeDate></NoticeDate>
            </NavLink> */}
          </Box>
        ))}
        {props.announcement?.map((item: any, i: any) => (
          ((!item.notice&&i<4)?
          <Box className="swiper-notice__left__item" key={i}>
            <NavLink to={`/Notice/Announcement/${item.articleId}`}
            state={{item:item}}>
              <NoticeTitle>{item.title}</NoticeTitle>
            </NavLink>
            <NavLink to={`/Notice/Announcement/${item.articleId}`}
            state={{item:item}}>
              <NoticeDesc>{item.article}</NoticeDesc>
            </NavLink>
            <NavLink to={`/Notice/Announcement/${item.articleId}`}
            state={{item:item}}>
              <NoticeDate>{dayjs(item.createdDt).format('YYYY-MM-DD')}</NoticeDate>
            </NavLink>
          </Box>
          :null)
        ))}
      </Box>
      <Box className="swiper-notice__right">
        <Swiper
          className={`swiper-notice__area`}
          slidesPerGroup={1}
          loop={true}
          speed={500}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
          }}
          breakpoints={{
            1: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 1.4,
              spaceBetween: 100,
            },
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
          onAfterInit={(swiper) => swiper.autoplay.stop()}
          onSlideChange={(swiper) => setActiveSwiper(swiper.realIndex + 1)}
        >
          {props.event?.map((item: any, i: any) => (
            <SwiperSlide className="swiper-notice__group" key={i}>
              <NavLink to={`../HonsaEventDetail/${item.eventId}`} className="swiper-notice__item">
                <figure
                  className="swiper-notice__thumbnail"
                  style={{ backgroundImage: `url('${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${item.eventId}/thumbnail/PC/thumbnail'),url('/images/main/cont02_01.png')` }}
                >
                  <figcaption>{item.tit}</figcaption>
                </figure>
              </NavLink>
            </SwiperSlide>
          ))}
          {props.announcement?.map((item: any, i: any) => (
            ((!item.notice&&i<4)?
            <SwiperSlide className="swiper-notice__group" key={i}>
              <NavLink to={`/Notice/Announcement/${item.articleId}`} state={{item:item}} className="swiper-notice__item">
                <figure
                  className="swiper-notice__thumbnail"
                  style={{ backgroundImage: `url('${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${process.env.REACT_APP_USP_NOTICE}/articles/${item.articleId}/attachments/${item.attachmentId}'),url('/images/main/cont02_01.png')` }}
                >
                  <figcaption>{item.tit}</figcaption>
                </figure>
              </NavLink>
            </SwiperSlide>
            :null)
          ))}

        </Swiper>
      </Box>
      <div className="swiper__controller__group">
        <div className={`swiper-pagination --idx${activeSwiper}`}>
          {props.swiperData.map((item: any, i: any) => (
            <span className="swiper-pagination-bullet" key={i}></span>
          ))}
        </div>
        <div className="swiper__autoplay__group">
          <button type="button" className="play" onClick={handlePlay}>
            <span>play</span>
          </button>
          <button type="button" className="stop" onClick={handleStop}>
            <span>stop</span>
          </button>
        </div>
      </div>
    </Box>
  );
}

// Swiper
SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination]);

function setSwiper(swiperInstance: any) {
  throw new Error('Function not implemented.');
}

const NoticeTitle = styled('h2')`
  margin: ${common.sz20} 0 ${common.sz30};
  font-size: ${common.sz40};
  font-weight: 700;
  line-height: ${common.sz59};
  letter-spacing: -0.06em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 1400px) {
    margin-bottom: ${common.sz20};
  }

  @media (max-width: ${breakpoint.mobile}) {
    margin: 0 0 ${common.sz10};
    font-size: ${common.sz20};
    line-height: 29px;
  }
`;
const NoticeDesc = styled('p')`
  font-size: ${common.sz20};
  font-weight: 400;
  line-height: ${common.sz40};
  max-height: ${common.sz120};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* autoprefixer: off */

  @media (max-width: 1400px) {
    max-height: ${common.sz80};
    -webkit-line-clamp: 2;
  }
  @media (max-width: ${breakpoint.desk1200}) {
    max-height: ${common.sz40};
    -webkit-line-clamp: 1;
  }
`;
const NoticeDate = styled('p')`
  margin-top: ${common.sz40};
  font-size: ${common.sz16};
  font-weight: 400;
  line-height: ${common.sz19};
  opacity: 0.5;

  @media (max-width: 1400px) {
    margin-top: ${common.sz30};
  }

  @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
    margin-top: ${common.sz24};
  }
  @media (max-width: ${breakpoint.desk1200}) {
    margin-top: ${common.sz20};
  }
`;

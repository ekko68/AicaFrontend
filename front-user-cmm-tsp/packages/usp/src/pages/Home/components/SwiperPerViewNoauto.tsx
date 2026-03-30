/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

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

export default function SwiperPerViewNoauto(props: any) {
  const [swiper, setSwiper] = useState<any | null>(null);
  const [palyClassName, setPalyClassName] = useState('');
  const [actionClassName, setActionClassName] = useState('');

  useEffect(() => {
    setPalyClassName('is-ani');
    const actionTimeout = setTimeout(() => {
      setActionClassName('action');
    }, 100);
    return () => {
      clearTimeout(actionTimeout);
    };
  }, []);
  console.log(props.swiperData)
  return (
    <>
      <Swiper
        className={`swiper-perview__section --no-auto
          ${props.swiperPdxClass} ${props.swiperTypeColor} ${palyClassName} ${actionClassName}
          `}
        loop={false}
        speed={500}
        watchSlidesVisibility={true}
        breakpoints={{
          1: {
            slidesPerView: 1.2,
            slidesPerGroup: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.6,
            slidesPerGroup: 2,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3.6,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {props.swiperData.map((item: any, i: any) => (
          <SwiperSlide className="swiper-perview__group" key={i}>
            <NavLink to={`/Notice/Notice/${item.pblancId}`} className="swiper-perview__item">
              <figure
                className="swiper-perview__thumbnail"
                // {/* todo.... -> `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`*/}
                style={{ backgroundImage: `url('${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail'),url('/images/main/cont02_01.png')` }}
              >
                <figcaption>{item.title}</figcaption>
              </figure>
              {item.recomendCl || item.rmndrDay ? (
                <div className="swiper-perview__ico">
                  {item.recomendCl ? <div>{item.recomendCl.split(",")[0]}</div> : null}
                  {item.rmndrDay ? <div>{"마감 D-"+item.rmndrDay}</div> : null}
                </div>
              ) : null}
              <div className="swiper-perview__info__group">
                <p className="swiper-perview__info__title">{item.pblancNm}</p>
                <p className="swiper-perview__info__date">
                  <span>접수기간</span>
                  <span>{item.rceptPd}</span>
                </p>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}

        <div className="swiper__controller__group">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </>
  );
}

// Swiper
SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination]);

function setSwiper(swiperInstance: any) {
  throw new Error('Function not implemented.');
}

/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
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
  const [lastClassName, setLastClassName] = useState('');

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
      Number(props.currActiveIdx) === 1 && swiper.autoplay.start();
    }
  });

  return (
    <>
      <Swiper
        className={`swiper-perview__section 
          ${props.swiperPdxClass} ${props.swiperTypeColor} ${palyClassName} ${lastClassName}
          `}
        {...props.swiperOption}
        watchSlidesVisibility={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        onAfterInit={(swiper) => swiper.autoplay.stop()}
      >
        {props.swiperData?.map((item: any, i: any) => {
          const recomendMax = item.recomendCl.split(',').length - 1;

          return (
            <SwiperSlide className="swiper-perview__group" key={i}>
              <NavLink
                to={`/Notice/Notice/${item.pblancId}`}
                className="swiper-perview__item"
              >
                <figure
                  className="swiper-perview__thumbnail"
                  // {/* todo.... -> `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail`*/}
                  style={{
                    backgroundImage: `url('${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${item.pblancId}/thumbnail'),url('/images/main/cont02_01.png')`,
                  }}
                >
                  <figcaption>{item.title}</figcaption>
                </figure>
                {item.recomendCl || item.rmndrDay ? (
                  <div className="swiper-perview__ico">
                    {item.recomendCl ? (
                      <div>
                        {item.recomendCl.split(',')[0]}
                        {recomendMax !== 0 && (
                          <RecomendMaxElem max={recomendMax} />
                        )}
                      </div>
                    ) : null}
                    {item.rmndrDay ? (
                      <div>{'마감 D-' + item.rmndrDay}</div>
                    ) : null}
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
          );
        })}

        <div className="swiper__controller__group">
          <div className="swiper-pagination"></div>
          <div className="swiper__autoplay__group">
            <button type="button" className="play" onClick={handlePlay}>
              <span>play</span>
            </button>
            <button type="button" className="stop" onClick={handleStop}>
              <span>stop</span>
            </button>
          </div>
        </div>
      </Swiper>
    </>
  );
}

// Swiper
SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination]);

function RecomendMaxElem(props: any) {
  const numCss = css`
    font-weight: 300;
  `;
  return <b css={numCss}>&nbsp;외&nbsp;{props.max}</b>;
}

function setSwiper(swiperInstance: any) {
  throw new Error('Function not implemented.');
}

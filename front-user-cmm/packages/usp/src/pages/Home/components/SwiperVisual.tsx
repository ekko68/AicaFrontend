/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from 'react';

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
import { fetchBannerList } from '~/fetches/fetchCommon';
import { useQuery } from 'react-query';

export default function SwiperPerView(props: any) {
  const [swiper, setSwiper] = useState<any | null>(null);
  const [palyClassName, setPalyClassName] = useState('');

  const handlePlay = () => {
    swiper.autoplay.start();
    setPalyClassName('');
  };
  const handleStop = () => {
    swiper.autoplay.stop();
    setPalyClassName('is-stop');
  };

  //배너
  const {data} = useQuery("banner", async () => await fetchBannerList());

  return (
    <>
      <Swiper
        className={`swiper-visual__section ${palyClassName}`}
        {...props.swiperOption}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide>
          <div
            className="swiper-visual__group"
            style={{
              backgroundImage: `url('/images/main/main_bg_visual_01.jpg')`,
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="swiper-visual__group"
            style={{
              backgroundImage: `url('/images/main/main_bg_visual_02.jpg')`,
            }}
          ></div>
        </SwiperSlide>

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

function setSwiper(swiperInstance: any) {
  throw new Error('Function not implemented.');
}

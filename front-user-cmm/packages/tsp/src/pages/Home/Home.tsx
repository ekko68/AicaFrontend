import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { useGlobalConfigStore } from 'shared/store/GlobalConfigStore';
import { HomeApplyPage } from '~/pages/Home/HomeApplyPage';
import { SubstantiateFieldPage } from '~/pages/Home/SubstantiateFieldPage';
import { EquipmentPage } from '~/pages/Home/EquipmentPage';
import { EtcPage } from '~/pages/Home/EtcPage';
import Footer from 'shared/layout/Basic/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCube,
  Mousewheel,
} from 'swiper';

import './Home.scss';

const Home = () => {
  let windowInnerHeight = 0;
  let vh = 0;

  const { setTopOpacity, isDesktop, device } = useGlobalConfigStore();
  const [viewPosition, setViewPosition] = useState(0);

  const [swiper, setSwiper] = useState<any | null>(null);
  const [height, setHeight] = useState<number>(0);

  const [currActiveIdx, setCurrActiveIdx] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [headerOpacity, setHeaderOpacity] = useState<boolean>(false);

  // 모바일 100vh 적용 관련
  const handleResize = () => {
    const currentInnerHeight = window.innerHeight;
    // console.log(`${currentInnerHeight}/${windowInnerHeight}`);
    if (currentInnerHeight !== windowInnerHeight) {
      windowInnerHeight = currentInnerHeight;
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };
  const handleHeight = () => {
    window.innerWidth < 1281 ? setHeight(480) : setHeight(486);
  };

  useEffect(() => {
    currActiveIdx >= 2 || (currActiveIdx === 3 && isEnd)
      ? setHeaderOpacity(true)
      : setHeaderOpacity(false);
  }, [currActiveIdx, isEnd]);

  useEffect(() => {
    switch (headerOpacity) {
      case true:
        setTopOpacity(false);
        break;
      case false:
        setTopOpacity(true);
        break;
      default:
        setTopOpacity(false);
    }
  }, [headerOpacity]);

  useEffect(() => {
    handleResize();
    handleHeight();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleHeight);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleHeight);
    };
  });

  useEffect(() => {
    const onScroll = (e: any) => {
      if (!isDesktop) {
        const cur = Math.floor(window.scrollY / window.innerHeight);
        if (viewPosition != cur) {
          setViewPosition(cur);
          handlerPageChange({ from: viewPosition, to: cur });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [viewPosition]);

  const handlerPageChange = (nav: { from: number; to: number }) => {
    switch (nav.to) {
      case 0:
      case 1:
        // case 4:
        setTopOpacity(true);
        break;
      default:
        setTopOpacity(false);
    }
  };

  return (
    <HomeContent isDesktop={isDesktop} device={device}>
      <Swiper
        direction={'vertical'}
        spaceBetween={0}
        mousewheel={true}
        pagination={false}
        slidesPerView={'auto'}
        observer={true}
        observeParents={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        className={'home__swiper-full'}
        onRealIndexChange={(swiper) => setCurrActiveIdx(swiper.activeIndex)}
        onFromEdge={() => setIsEnd(false)}
        onReachEnd={() => setIsEnd(true)}
      >
        <SwiperSlide>
          <HomeApplyPage />
        </SwiperSlide>
        <SwiperSlide>
          <SubstantiateFieldPage />
        </SwiperSlide>
        <SwiperSlide>
          <EquipmentPage />
        </SwiperSlide>
        <SwiperSlide>
          <EtcPage />
        </SwiperSlide>
        <SwiperSlide style={{ height: `${height}px` }}>
          <Footer />
        </SwiperSlide>
      </Swiper>
    </HomeContent>
  );
};

// Swiper
SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination, Mousewheel]);

const HomeContent = styled(Box)<{
  isDesktop: boolean;
  device: 'pc' | 'mobile';
}>`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  .swiper {
    width: 100%;
    height: 100%;
  }
`;

export default Home;

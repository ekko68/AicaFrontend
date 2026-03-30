/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHeaderCssEvent } from '../store/GlobalModalStore';

import create from 'zustand';

import * as styles from './styles';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint, common } from './styles/styleCommon';

import Visual from './components/Visual';
import Notification from './components/Notification';
import Service from './components/Service';
import Notice from './components/Notice';
import Footer from '~/layout/Studio/Footer';
import { SearchCorp } from './components/SearchCorp';
import { ResultCorp } from './components/ResultCorp';
import TopHome from 'shared/components/TopHome';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCube,
  Mousewheel,
} from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
import './Home.scss';
import BusiEduModal from '../Notice/View/BusiEduModal';
import { HomeModal } from './HomeModal';
import { fetchPopupList } from '~/fetches/fetchCommon';
import { useQuery } from "react-query";

/* 
  작성일    :   2022/05/03
  화면명    :   홈 - 사용자지원 홈
  회면ID    :   (UI-USP-FRN-0370101) 
  화면/개발 :   Seongeonjoo / navycui
*/
export default function Home() {
  let windowInnerHeight = 0;
  let vh = 0;

  const isMobileCheck = /iPhone|iPad|iPod|Android/i.test(
    window.navigator.userAgent
  );
  const [ctx, setCtx] = useState<string>('');
  const [titx, setTitx] = useState<string>('');
  const { changeCss } = useHeaderCssEvent();
  const [topVisible, setTopVisible] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<any | null>(null);
  const [resultSearchData, setResultSearchData] = useState([]);
  const [onResultSearch, setOnResultSearch] = useState(false);
  const [height, setHeight] = useState<number>(0);
  const [currActiveIdx, setCurrActiveIdx] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [colorMint, setColorMint] = useState(false);
  const [homeSwiperList, setHomeSwiperList] = useState([
    { sec: '비쥬얼', isActive: true, mint: false, view: true },
    { sec: '인기 공고', isActive: false, mint: false, view: true },
    { sec: '사업 찾기', isActive: false, mint: true, view: true },
    { sec: '서비스', isActive: false, mint: false, view: true },
    { sec: '공지사항', isActive: false, mint: false, view: true },
    { sec: '검색 결과', isActive: false, mint: true, view: false },
  ]);

  const changeHeaderBg = (idx: number) => {
    idx === 2 || idx === 3 || idx === 5
      ? changeCss('--type-white')
      : changeCss('');
  };

  // 모바일 100vh 적용 관련
  const handleResize = () => {
    const currentInnerHeight = window.innerHeight;
    if (currentInnerHeight !== windowInnerHeight) {
      windowInnerHeight = currentInnerHeight;
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  const handleHeight = () => {
    window.innerWidth < 1281 ? setHeight(426) : setHeight(538);
  };

  const handleTopMove = () => swiper.slideTo(0, 500);

  const handleSlideTo = (idx: number) => {
    if (onResultSearch) {
      if (idx >= 3) idx += 1;
    }
    swiper.slideTo(idx, 500);
  };

  const handleScroll = (swiper: any) => {
    swiper.activeIndex > 0 ? setTopVisible(true) : setTopVisible(false);
  };

  const handlePageOn = (i: number) => {
    const copyList = [...homeSwiperList];

    copyList.forEach((obj, idx) => {
      i === idx ? (obj.isActive = true) : (obj.isActive = false);
      i === idx && changeHeaderBg(idx);
      if (i === idx) {
        obj.mint ? setColorMint(true) : setColorMint(false);
      }
    });
    setHomeSwiperList(copyList);
  };

  const handleHeaderBgType = () => {
    if (onResultSearch) {
      if (currActiveIdx === 3) {
        handlePageOn(2);
      } else if (currActiveIdx > 3) {
        handlePageOn(currActiveIdx - 1);
      } else {
        handlePageOn(currActiveIdx);
      }
    } else {
      handlePageOn(currActiveIdx);
    }
  };

  handleResize();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleHeight);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleHeight);
    };
  });

  useEffect(() => {
    handleHeaderBgType();
  }, [currActiveIdx]);

  useEffect(() => {
    isEnd ? changeCss('--type-white') : changeCss('');
  }, [isEnd]);

  // const getPopupList = () => {
  //   //systemId 아직 안정해짐
  //   fetchPopupList().then((res: any) => {
  //     console.log(res);
  //   });
  // };

  // useEffect(() => {
  //   getPopupList();
  // }, []);

  const {data:popupList} = useQuery("popupGet", async ()=> await fetchPopupList())

  const [showModal, setShowModal] = useState(false);
  const HAS_VISITED_BEFORE:any = localStorage.getItem('hasVisitedBefore');

  useEffect(() => {
    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }
      
      if (!HAS_VISITED_BEFORE) {
        setShowModal(true);
      }
    };

    window.setTimeout(handleShowModal, 2000);
  }, [HAS_VISITED_BEFORE]);


 function closeWin(){
   let expires:any = new Date();
   expires = expires.setHours(expires.getHours() + 24);
   localStorage.setItem('hasVisitedBefore', expires);
   window.close();
   setShowModal(false);
  }

  return (
    <Box>
      {/* 모달 팝업부분 */}
      <BusiEduModal />
      {popupList?popupList.list.map((item:any, i:number)=>(
      <HomeModal isOpen={showModal} item={item} modalClose={() => { setShowModal(false); } } closeWin={closeWin}/>
      )):null}
      <HomeSection className="home">
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
          onInit={(swiper) => {
            window.innerWidth < 1281 ? setHeight(426) : setHeight(538);
            swiper.update();
          }}
          onRealIndexChange={(swiper) => setCurrActiveIdx(swiper.activeIndex)}
          onFromEdge={() => setIsEnd(false)}
          onReachEnd={() => setIsEnd(true)}
          onScroll={handleScroll}
        >
          <SwiperSlide>
            <Visual />
          </SwiperSlide>
          <SwiperSlide>
            <Notification currActiveIdx={currActiveIdx} />
          </SwiperSlide>
          <SwiperSlide>
            <SearchCorp
              swiper={swiper}
              propOnResultSearch={setOnResultSearch}
              propSearchData={setResultSearchData}
            />
          </SwiperSlide>

          {onResultSearch ? (
            <SwiperSlide>
              <ResultCorp resultData={resultSearchData} />
            </SwiperSlide>
          ) : null}

          <SwiperSlide>
            <Service
              currActiveIdx={currActiveIdx}
              onResultSearch={onResultSearch}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Notice
              currActiveIdx={currActiveIdx}
              onResultSearch={onResultSearch}
            />
          </SwiperSlide>
          <SwiperSlide style={{ height: `${height}px` }}>
            <Footer />
          </SwiperSlide>
          <HomePaginationGroup
            colorMint={colorMint}
            homeSwiperList={homeSwiperList}
            onSlideTo={handleSlideTo}
            onPageOn={handlePageOn}
          />
        </Swiper>
        {isMobileCheck || currActiveIdx === 0 ? null : (
          <TopHome topVisible={topVisible} onTopMove={handleTopMove} />
        )}
      </HomeSection>
    </Box>
  );
}

export type cotype = {
  bgcolorType: string;
};

export const useConfigStore = create<cotype>(() => ({ bgcolorType: '' }));

// Swiper
SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination, Mousewheel]);

function setSwiper(swiperInstance: any) {
  throw new Error('Function not implemented.');
}

const HomePaginationGroup: React.FC<{
  colorMint: boolean;
  homeSwiperList: any;
  onSlideTo: Function;
  onPageOn: Function;
}> = (props) => {
  const HomePaginationGroup = css`
    position: fixed;
    top: 50%;
    left: ${common.sz30};
    display: flex;
    flex-direction: column;
    transform: translate(0, -50%);
    z-index: 10000;
    cursor: ${common.cursor_drag};

    > button {
      position: relative;
      width: ${common.sz20};
      height: ${common.sz20};
      cursor: ${common.cursor_click};

      & + button {
        margin-top: 32px;
      }

      &::after {
        content: '';
        position: absolute;
        top: ${common.sz8};
        left: ${common.sz8};
        width: 4px;
        height: 4px;
        background: ${common.white};
        border-radius: 50%;
        opacity: 0.5;
      }

      &.is-active {
        box-shadow: inset 0 0 0 1px ${common.white};
        border-radius: 50%;

        &::after {
          opacity: 1;
        }
      }
      > span {
        position: absolute;
        width: 0;
        height: 0;
        line-height: 0;
        overflow: hidden;
        text-indent: -9999px;
      }
    }

    &.--mint {
      > button {
        &::after {
          background: ${common.pinkish_grey};
        }

        &.is-active {
          box-shadow: inset 0 0 0 1px ${common.topaz};

          &::after {
            background: ${common.topaz};
          }
        }
      }
    }

    @media (max-width: ${breakpoint.mobile}) {
      display: none;
    }
  `;

  return (
    <Box css={HomePaginationGroup} className={props.colorMint ? '--mint' : ''}>
      {props.homeSwiperList.map((item: any, i: number) => {
        return (
          item.view && (
            <button
              className={item.isActive ? 'is-active' : ''}
              onClick={() => {
                props.onSlideTo(i);
                props.onPageOn(i);
              }}
              key={i}
            >
              <span>{`${item.sec} (으)로 이동`}</span>
            </button>
          )
        );
      })}
    </Box>
  );
};

const HomeSection = styled('div')`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

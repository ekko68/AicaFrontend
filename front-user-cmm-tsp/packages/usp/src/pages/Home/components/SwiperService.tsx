/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { breakpoint, common } from '../styles/styleCommon';
import {
  SlideTitleGroup,
  SlideTitle,
  SlideTitleDesc,
} from '../styles/styleHomeElem';

import { Box } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectFade,
} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import '../styles/swiper-custom.scss';

export default function SwiperService(props: any) {
  const [swiper, setSwiper] = useState<any | null>(null);
  const [activeSwiper, setActiveSwiper] = useState<number | null>(null);
  const [indexbg, setIndexbg] = useState<any | null>(null);
  const [palyClassName, setPalyClassName] = useState('');

  const [slidePageNum, setSlidePageNum] = useState<number>(1);

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
        ? Number(props.currActiveIdx) === 4 && swiper.autoplay.start()
        : Number(props.currActiveIdx) === 3 && swiper.autoplay.start();
    }
  });

  useEffect(() => {
    activeSwiper ? setSlidePageNum(activeSwiper + 1) : setSlidePageNum(1);
    switch (activeSwiper) {
      case 0:
        setIndexbg('4fdfc5');
        break;
      case 1:
        setIndexbg('8875ff');
        break;
      case 2:
        setIndexbg('6e58ff');
        break;
      case 3:
        setIndexbg('66effa');
        break;
      case 4:
        setIndexbg('5861d2');
        break;
      default:
        break;
    }
  }, [activeSwiper]);

  const boxLeft = css`
    padding-left: ${common.pdxM};
    padding-right: 76px;

    @media (min-width: ${breakpoint.desk1920}) {
      padding-left: ${common.pdxL};
      padding-right: ${common.sz90};
    }
    @media (max-width: ${breakpoint.desk1200}) {
      padding-left: ${common.sz100};
      padding-right: ${common.sz100};
    }
    @media (max-width: ${breakpoint.mobile}) {
      padding-left: ${common.sz15};
      padding-right: ${common.sz15};
    }
  `;
  const boxRight = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `;

  const slideTitleGroup = css`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0 !important;

    @media (max-width: ${breakpoint.desk1200}) {
      br {
        display: none;
      }
    }
  `;
  const slideTitle = css`
    color: ${common.white};

    @media (max-width: ${breakpoint.desk1200}) {
      > span {
        &:first-of-type {
          font-size: ${common.sz36};
          line-height: ${common.sz54};
        }
      }
    }
  `;
  const titleIcon = css`
    bottom: 0;
    right: -105px;
    background-image: url('/images/main/ico_service_title.png');

    @media (max-width: ${breakpoint.desk1200}) {
      right: -68px;
      width: ${common.sz68} !important;
      height: ${common.sz68} !important;
    }
  `;
  const SlideTitleDescCss = css`
    @media (max-width: ${breakpoint.desk1200}) {
      br {
        display: none;
      }
    }
  `;

  return (
    <SwiperServiceSection>
      <Swiper
        className={`swiper-service__section ${palyClassName}`}
        slidesPerView={1}
        loop={true}
        effect={'fade'}
        speed={0}
        // autoplay={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-next-button',
          prevEl: '.swiper-prev-button',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        onAfterInit={(swiper) => swiper.autoplay.stop()}
        onSlideChange={(swiper) => setActiveSwiper(swiper.realIndex)}
      >
        {props.swiperData.map((item: any, i: any) => (
          <SwiperSlide
            className="swiper-service__group"
            style={{
              background: `linear-gradient(90deg, ${common.azul} 50%, #${indexbg} 50%)`,
            }}
            key={i}
          >
            <SwiperInnerGroup>
              <Box css={boxLeft}>
                <Box>
                  <SlideTitleGroup css={slideTitleGroup}>
                    <SlideTitle css={slideTitle}>
                      <span>
                        다양한&nbsp;
                        <br />
                        서비스
                      </span>
                      <span
                        className="ico aniTitIconMove"
                        css={titleIcon}
                      ></span>
                    </SlideTitle>
                    <SlideTitleDesc css={SlideTitleDescCss}>
                      지원사업과 더불어 AI 교육, 입주/시설 제공, 실증지원
                      등&nbsp;
                      <br />
                      다양한 서비스를 제공하고 있습니다.
                    </SlideTitleDesc>
                  </SlideTitleGroup>
                </Box>
                <SwiperContsGroup>
                  <NavLink to={'/'} className={'action-txt'}>
                    {item.tit}
                  </NavLink>
                  <SwiperContsDescGroup className={'action-txt'}>
                    <p>
                      {item.desc.split('\n').map((line: string, i: number) => {
                        return (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        );
                      })}
                    </p>
                    {item.notice ? <p>{item.notice}</p> : null}
                  </SwiperContsDescGroup>
                </SwiperContsGroup>
              </Box>
              <Box
                className={'action-box'}
                css={boxRight}
                style={{ backgroundColor: `#${indexbg}` }}
              >
                <Box
                  className={'action-box-img'}
                  style={{
                    backgroundImage: `url(${item.img})`,
                  }}
                ></Box>
              </Box>
            </SwiperInnerGroup>
          </SwiperSlide>
        ))}
        <div className="swiper__controller__group">
          <Box className="swiper__controller__left">
            <div className="swiper-pagination"></div>
            <div className="swiper__autoplay__group">
              <button type="button" className="play" onClick={handlePlay}>
                <span>play</span>
              </button>
              <button type="button" className="stop" onClick={handleStop}>
                <span>stop</span>
              </button>
            </div>
          </Box>

          <Box className="swiper__controller__right">
            <div className="total-page">
              <p className="curr">
                <span>현재</span>0{slidePageNum}
              </p>
              <p className="total">
                <span>전체</span>0{props.swiperData.length}
              </p>
            </div>
            <div className="button-wrapper">
              <button
                type="button"
                className="swiper-button swiper-prev-button"
              >
                <span>이전</span>
              </button>
              <button
                type="button"
                className="swiper-button swiper-next-button"
              >
                <span>다음</span>
              </button>
            </div>
          </Box>
        </div>
      </Swiper>
    </SwiperServiceSection>
  );
}

// Swiper
SwiperCore.use([EffectFade, Navigation, Autoplay, Pagination]);

function setSwiper(swiperInstance: any) {
  throw new Error('Function not implemented.');
}

const SwiperServiceSection = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${common.azul};

  .swiper-container {
    height: 100%;
  }
`;
const SwiperInnerGroup = styled('div')`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  padding-top: ${common.header_pc};
  cursor: ${common.cursor_drag};

  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    height: 100%;

    @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
      padding-top: ${common.sz30};
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    padding-top: 0;

    > div {
      width: 100%;
      &:first-of-type {
        justify-content: flex-start;
        height: 63.32%;
        padding-top: 15vw;
      }
      &:last-of-type {
        height: 36.68%;
      }
    }
  }
`;
const SwiperContsGroup = styled('div')`
  padding-top: 60px;
  height: 390px;

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 32px;
    padding-top: 0;
    height: auto;
  }

  > a {
    display: inline-flex;
    align-items: center;
    font-size: ${common.sz40};
    font-weight: 700;
    color: ${common.white};
    line-height: ${common.sz60};
    letter-spacing: -0.06em;
    cursor: ${common.cursor_click};

    &::after {
      content: '';
      display: block;
      width: 3.33vh;
      height: 3.33vh;
      margin-left: 1.42vh;
      background: url('/images/main/main_ico_right_arrow.svg') no-repeat center /
        contain;
    }

    @media (max-width: ${breakpoint.desk1200}) {
      font-size: 20px;
      line-height: 29px;

      &::after {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
const SwiperContsDescGroup = styled('div')`
  margin-top: 20px;

  @media (max-width: ${breakpoint.desk1200}) {
    margin-top: 10px;
  }

  p {
    font-size: ${common.sz18};
    font-weight: 400;
    color: ${common.white};
    line-height: ${common.sz30};
    letter-spacing: -0.06em;

    &:not(:only-of-type):last-of-type {
      margin-top: 1.42vh;
      font-size: ${common.sz14};
      color: rgba(255, 255, 255, 0.5);
      line-height: ${common.sz20};

      @media (max-width: ${breakpoint.mobile}) {
        display: none;
      }
    }

    @media (max-width: ${breakpoint.desk1200}) {
      font-size: 14px;
      line-height: 24px;

      > span {
        br {
          display: none;
        }
      }
    }
  }
`;

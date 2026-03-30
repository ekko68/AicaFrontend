import { Stack } from '@mui/material';
import {
  Color,
  Header,
  Breakpoint,
  Cursor,
} from 'shared/components/StyleUtils';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

export const SubstantiateFieldPage = () => {
  const dataField = [
    {
      tit: '헬스케어',
      desc: 'AI 기반 "예측 진단 치료" 서비스 개발',
      img: '/tsp/images/main/bg_main_field01.png',
      link: '#!',
      type: '',
    },
    {
      tit: '에너지',
      desc: 'AI에너지 모니터링 관리 서비스 개발',
      img: '/tsp/images/main/bg_main_field02.png',
      link: '#!',
      type: '',
    },
    {
      tit: '자동차',
      desc: '미래 자동차 환경을 대비한 AI융합 서비스 개발',
      img: '/tsp/images/main/bg_main_field03.png',
      link: '#!',
      type: 'white',
    },
  ];

  const StackCss = css`
    position: relative;
    width: 100%;
    padding: 0 140px;

    @media (max-width: 1600px) {
      padding: 0;
    }
    @media (max-width: ${Breakpoint.mobile}) {
      padding: 40px 0;
    }
  `;

  return (
    <HomeFieldSection>
      <HomeFieldArea>
        <Stack css={StackCss}>
          <HomeFieldTitle>
            특화 <br />
            실증지원 분야
          </HomeFieldTitle>
          <SwiperContent
            loopFillGroupWithBlank={true}
            spaceBetween={0}
            slidesPerView={'auto'}
            pagination={{
              type: 'progressbar',
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {dataField.map((data, i) => {
              return (
                <SwiperSlide key={i}>
                  <SlideItem className={data.type}>
                    <SlideItemBG url={data.img} />
                    <h3>{data.tit}</h3>
                    <p>{data.desc}</p>
                  </SlideItem>
                </SwiperSlide>
              );
            })}
          </SwiperContent>
        </Stack>
      </HomeFieldArea>
    </HomeFieldSection>
  );
};

const HomeFieldSection = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: ${Header.pc};
  background: #142645;

  @media (max-width: ${Breakpoint.mobile}) {
    align-items: flex-start;
    padding-top: ${Header.mo};
  }
`;
const HomeFieldArea = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${Breakpoint.mobile}) {
    height: 100%;
  }
`;
const HomeFieldTitle = styled('h2')`
  margin-bottom: 60px;
  font-size: 40px;
  font-weight: 700;
  color: ${Color.white};
  line-height: 59px;
  letter-spacing: -0.06em;
  text-align: center;

  @media (min-width: ${Breakpoint.desk1920}) {
    margin-bottom: 7.14vh;
    font-size: 4.76vh;
    line-height: 1;
  }

  @media (min-width: 768px) {
    br {
      display: none;
    }
  }
  @media (max-width: ${Breakpoint.mobile}) {
    margin-bottom: 40px;
    font-size: 32px;
    line-height: 42px;
  }
`;
const SwiperContent = styled(Swiper)`
  width: 100%;

  @media (max-width: 1290px) {
    padding: 0 30px 82px;
  }

  @media (max-width: ${Breakpoint.mobile}) {
    flex-grow: 1;
    padding: 0 15px;
  }

  .swiper-wrapper {
    justify-content: center;

    @media (max-width: 1290px) {
      justify-content: flex-start;
    }
  }
  .swiper-slide {
    width: 25vw;
    height: 25vw;

    @media (min-width: ${Breakpoint.desk1920}) {
      margin: 0 1.78vh;
    }

    @media (max-width: 1919px) {
      min-width: 400px;
      max-width: 460px;
      min-height: 400px;
      max-height: 460px;
      margin: 0 15px;
    }

    .white {
      h3,
      p {
        color: ${Color.white};
      }
    }

    @media (max-width: 1740px) {
      width: 400px;
    }
    @media (max-width: 1290px) {
      margin-left: 0;

      &:last-of-type {
        margin-right: 0;
      }
    }
    @media (max-width: ${Breakpoint.mobile}) {
      width: 76vw;
      min-width: auto;
      max-width: none;
      height: 76vw;
      min-height: auto;
      max-height: none;
      opacity: 0.5;
      transition: opacity 0.5s;

      &-active {
        opacity: 1;
      }
    }
  }
  .swiper-pagination {
    top: auto;
    left: 30px;
    bottom: 0;
    width: calc(100% - 60px);
    height: 2px;
    background: ${Color.gray};
    border-radius: 2px;
    overflow: hidden;

    .swiper-pagination-progressbar-fill {
      background: ${Color.navy_light};
      height: calc(100% + 10px);
    }

    @media (max-width: ${Breakpoint.mobile}) {
      left: 15px;
      width: calc(100% - 30px);
    }
  }
`;
const SlideItem = styled('a')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  color: ${Color.black};
  letter-spacing: -0.06em;
  overflow: hidden;
  cursor: url(${Cursor.click}) ${Cursor.size}, ${Cursor.auto};

  @media (max-width: 1288px) {
    cursor: url(${Cursor.drag}) ${Cursor.size}, ${Cursor.auto};
  }

  h3,
  p {
    position: relative;
    z-index: 1;
  }

  h3 {
    font-size: 28px;
    font-weight: 700;
    line-height: 41px;
  }
  p {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  @media (min-width: ${Breakpoint.desk1920}) {
    h3 {
      font-size: 3.33vh;
      line-height: 4.88vh;
    }
    p {
      margin-top: 1.19vh;
      font-size: 1.9vh;
      line-height: 2.85vh;
    }
  }

  @media (min-width: 768px) {
    &:hover {
      > figure {
        transform: scale(1.2);
      }
    }
  }
  @media (max-width: ${Breakpoint.mobile}) {
    h3 {
      font-size: 24px;
      line-height: 36px;
    }
    p {
      margin-top: 7px;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
const SlideItemBG = styled('figure')<{ url: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: all 0.5s;
`;

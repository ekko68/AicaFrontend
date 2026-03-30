import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from '@emotion/styled';
import {
  Color,
  Header,
  Breakpoint,
  Cursor,
} from 'shared/components/StyleUtils';
import { NavLink } from 'react-router-dom';

export const EquipmentPage = () => {
  return (
    <EquipmentSection>
      <EquipmentArea>
        <EquipmentTitle>
          <NavLink to="#!">장비소개</NavLink>
        </EquipmentTitle>
        <SwiperContent
          loop={true}
          loopedSlides={3}
          slidesPerView={'auto'}
          spaceBetween={15}
          slidesPerGroup={1}
          navigation={true}
          observer={true}
          watchSlidesProgress={true}
          pagination={{
            type: 'progressbar',
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            768: {
              spaceBetween: 40,
              slidesPerGroup: 2,
            },
            980: {
              spaceBetween: 20,
              slidesPerGroup: 3,
            },
            1021: {
              spaceBetween: 40,
              slidesPerGroup: 3,
            },
            1200: {
              spaceBetween: 80,
              slidesPerGroup: 3,
            },
          }}
        >
          {itemList.map((m, i) => {
            return (
              <SwiperSlide key={i.toString() + m.title}>
                <NavLink to={`/tsp/Info/Equipment/${i}`}>
                  <EquipmentSwiperThumbnail url={m.url} />
                  <EquipmentSwiperInfoGroup>
                    <EquipmentSwiperInfoCate>
                      {m.navString.map((nav: string, idx: number) => {
                        return <span key={idx}>{nav}</span>;
                      })}
                    </EquipmentSwiperInfoCate>
                    <EquipmentSwiperInfoTit>{m.title}</EquipmentSwiperInfoTit>
                    <EquipmentSwiperInfoDesc>
                      {m.content}
                    </EquipmentSwiperInfoDesc>
                  </EquipmentSwiperInfoGroup>
                </NavLink>
              </SwiperSlide>
            );
          })}
        </SwiperContent>
      </EquipmentArea>
    </EquipmentSection>
  );
};

interface item {
  url: string;
  navString: any;
  title: string;
  content: string;
}

const itemList: item[] = [
  {
    url: '/tsp/images/img/home_equipment_datasystem.png',
    navString: ['헬스케어', '측정시스템'],
    title: '인지평가 및 훈련시스템',
    content:
      '인지기능 검사 및 관련 데이터 수집, 인지기능을 4가지 카테고리로 검사',
  },
  {
    url: '/tsp/images/img/home_equipment_car.png',
    navString: ['자동차', '측정시스템'],
    title: '운전자, 탑승자 모니터링 센서시스템',
    content: '차량 및 주행환경의 데이터 수집, 자율주행 알고리즘 성능 검증/개발',
  },
  {
    url: '/tsp/images/img/home_equipment_system.png',
    navString: ['에너지', '측정시스템'],
    title: '에너지 커뮤니티 내 스마트 프로슈머 운영관리 시스템',
    content:
      '특별히 설계된 특수 하드웨어를 기반으로 전자기 과도현상 실시간 계산에 활용',
  },
  {
    url: '/tsp/images/img/home_equipment_datasystem.png',
    navString: ['헬스케어', '측정시스템'],
    title: '인지평가 및 훈련시스템',
    content:
      '인지기능 검사 및 관련 데이터 수집, 인지기능을 4가지 카테고리로 검사',
  },
  {
    url: '/tsp/images/img/home_equipment_car.png',
    navString: ['자동차', '측정시스템'],
    title:
      '운전자, 탑승자 모니터링 센서시스템 탑승자 모니터링 센서시스템 모니터링 센서시스템',
    content:
      '차량 및 주행환경의 데이터 수집, 자율주행 알고리즘 성능 검증/개발 차량 및 주행환경의 데이터 수집, 자율주행 알고리즘 성능 검증/개발',
  },
  {
    url: '/tsp/images/img/home_equipment_system.png',
    navString: ['에너지', '측정시스템'],
    title: '에너지 커뮤니티 내 스마트 프로슈머 운영관리 시스템',
    content:
      '특별히 설계된 특수 하드웨어를 기반으로 전자기 과도현상 실시간 계산에 활용',
  },
  {
    url: '/tsp/images/img/home_equipment_datasystem.png',
    navString: ['헬스케어', '측정시스템'],
    title: '인지평가 및 훈련시스템',
    content:
      '인지기능 검사 및 관련 데이터 수집, 인지기능을 4가지 카테고리로 검사',
  },
  {
    url: '/tsp/images/img/home_equipment_car.png',
    navString: ['헬스케어', '측정시스템'],
    title: '인지평가 및 훈련시스템',
    content:
      '인지기능 검사 및 관련 데이터 수집, 인지기능을 4가지 카테고리로 검사',
  },
  {
    url: '/tsp/images/img/home_equipment_system.png',
    navString: ['헬스케어', '측정시스템'],
    title: '인지평가 및 훈련시스템',
    content:
      '인지기능 검사 및 관련 데이터 수집, 인지기능을 4가지 카테고리로 검사',
  },
];

const EquipmentSection = styled('div')`
  width: 100%;
  height: 100%;
  padding-top: ${Header.pc};
  background: ${Color.light_gray02};

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    padding-top: ${Header.mo};
  }
`;
const EquipmentArea = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    height: auto;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    height: 100%;
    padding: 40px 0;
  }
`;
const EquipmentTitle = styled('h2')`
  display: flex;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    font-size: 40px;
    font-weight: 700;
    color: #000;
    line-height: 59px;
    letter-spacing: -0.06em;
    cursor: url(${Cursor.click}) ${Cursor.size}, ${Cursor.auto};

    &::after {
      content: '';
      display: block;
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      margin-left: 10px;
      background: url('/tsp/images/main/ico_main_arrow_right_black.svg')
        no-repeat center / contain;
    }

    @media (min-width: ${Breakpoint.desk1920}) {
      font-size: 4.76vh;
      line-height: 7.02vh;

      &::after {
        width: 3.33vh;
        height: 3.33vh;
        margin-left: 1.19vh;
      }
    }
    @media (max-width: ${Breakpoint.mobile}) {
      font-size: 32px;
      line-height: 47px;

      &::after {
        margin-left: 4px;
      }
    }
  }
`;
const SwiperContent = styled(Swiper)`
  flex-grow: 1;
  width: 100%;
  max-width: 1260px;
  height: auto !important;
  padding: 0 100px;
  cursor: url(${Cursor.drag}) ${Cursor.size}, ${Cursor.auto};

  @media (min-width: ${Breakpoint.desk1920}) {
    max-width: calc(107.13vh + 360px);

    &::after,
    &::before {
      height: calc(100% - 2px) !important;
    }
  }

  @media (min-width: 768px) {
    padding-bottom: 92px;
  }
  @media (min-width: ${Breakpoint.desk1280}) {
    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 100px;
      height: 500px;
      background: ${Color.light_gray02};
      z-index: 10;
    }
    &::after {
      right: 0;
      background: linear-gradient(
        270deg,
        rgba(245, 245, 245, 1) 50%,
        rgba(245, 245, 245, 0) 100%
      );
    }
    &::before {
      left: 0;
      background: linear-gradient(
        90deg,
        rgba(245, 245, 245, 1) 50%,
        rgba(245, 245, 245, 0) 100%
      );
    }
  }

  @media (max-width: ${Breakpoint.desk1280}) {
    max-width: 1100px;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: ${Breakpoint.desk1200}) {
    max-width: 1020px;
  }
  @media (max-width: 1020px) {
    max-width: 980px;
  }
  @media (max-width: 980px) {
    width: 100%;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    padding-left: 15px;
    padding-right: 15px;
  }

  .swiper {
    &-wrapper {
      height: auto;
    }
    &-slide {
      display: flex;
      justify-content: center;
      width: 300px;
      word-break: keep-all;

      @media (min-width: ${Breakpoint.desk1920}) {
        width: 35.71vh;
      }

      @media (max-width: ${Breakpoint.mobile}) {
        width: 75vw;
      }

      a {
        display: block;
        width: 100%;
        padding-top: 20px;
        cursor: url(${Cursor.drag}) ${Cursor.size}, ${Cursor.auto};

        @media (min-width: ${Breakpoint.desk1920}) {
          padding-top: 2.38vh;
        }
        @media (min-width: 768px) {
          &:hover {
            > figure {
              box-shadow: inset 0 0 0 3px ${Color.navy_light};
              filter: drop-shadow(0 6px 10px rgba(110, 88, 255, 0.3));
            }

            h3 {
              color: ${Color.navy_light};
            }
          }
        }
      }

      @media (min-width: 768px) and (max-width: 980px) {
        opacity: 0.5;

        &-visible {
          &.swiper-slide-active,
          &.swiper-slide-next {
            opacity: 1;
          }
        }
      }

      @media (max-width: ${Breakpoint.mobile}) {
        &-visible {
          &.swiper-slide-next {
            opacity: 0.5;
          }
        }
        &-active {
          a {
            > figure {
              box-shadow: inset 0 0 0 3px ${Color.navy_light};
              filter: drop-shadow(0 6px 10px rgba(110, 88, 255, 0.3));
            }

            h3 {
              color: ${Color.navy_light};
            }
          }
        }
      }
    }
    &-button {
      &-next,
      &-prev {
        top: 20px;
        width: 50px;
        height: 50px;
        margin-top: 125px;
        z-index: 20;
        background: no-repeat center / contain;
        cursor: url(${Cursor.click}) ${Cursor.size}, ${Cursor.auto};

        @media (min-width: ${Breakpoint.desk1920}) {
          margin-top: 17.855vh;
        }

        &::after {
          display: none;
        }

        @media (max-width: ${Breakpoint.desk1280}) {
          display: none;
        }
      }
      &-next {
        right: 0;
        background-image: url('/tsp/images/main/ico_main_arrowThin_right.svg');
      }
      &-prev {
        left: 0;
        background-image: url('/tsp/images/main/ico_main_arrowThin_left.svg');
      }
    }
    &-pagination {
      top: auto;
      bottom: 0;
      height: 2px;
      background: ${Color.gray};

      &-progressbar-fill {
        background: ${Color.black};
      }

      @media (max-width: ${Breakpoint.desk1280}) {
        left: 20px;
        width: calc(100% - 40px);
      }
    }
  }
`;
const EquipmentSwiperThumbnail = styled('figure')<{ url: string }>`
  width: 100%;
  margin: 0;
  padding: 0 0 100%;
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  transition: 0.3s;
`;
const EquipmentSwiperInfoGroup = styled('div')`
  margin-top: 30px;
  color: ${Color.black};
  letter-spacing: -0.06em;

  @media (min-width: ${Breakpoint.desk1920}) {
    margin-top: 3.57vh;
  }
`;
const EquipmentSwiperInfoCate = styled('div')`
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

    &:not(:last-of-type) {
      &::after {
        content: '';
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin: 0 4px;
        background: url('/tsp/images/main/ico_main_arrow_right_grey.svg')
          no-repeat center / contain;
      }
    }

    @media (min-width: ${Breakpoint.desk1920}) {
      font-size: 1.66vh;
      line-height: 2.38vh;

      &:not(:last-of-type) {
        &::after {
          width: 2.38vh;
          height: 2.38vh;
          margin: 0 0.47vh;
        }
      }
    }
  }
`;
const EquipmentSwiperInfoTit = styled('h3')`
  margin: 16px 0 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.3s;

  @media (min-width: ${Breakpoint.desk1920}) {
    margin: 1.9vh 0 1.19vh;
    font-size: 2.38vh;
    line-height: 3.57vh;
    max-height: 7.14vh;
  }

  @media (max-width: ${Breakpoint.mobile}) {
    margin: 12px 0 5px;
  }
  @media (max-width: ${Breakpoint.mobile}) and (max-height: 700px) {
    max-height: 30px;
    -webkit-line-clamp: 1;
  }
`;
const EquipmentSwiperInfoDesc = styled('p')`
  font-size: 14px;
  font-weight: 400;
  color: ${Color.warm_gray};
  line-height: 22px;
  max-height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: ${Breakpoint.desk1920}) {
    font-size: 1.66vh;
    line-height: 2.61vh;
    max-height: 5.22vh;
  }
  @media (max-width: ${Breakpoint.mobile}) and (max-height: 700px) {
    max-height: 22px;
    -webkit-line-clamp: 1;
  }
`;

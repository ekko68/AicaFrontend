import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Color,
  Header,
  Breakpoint,
  Cursor,
} from 'shared/components/StyleUtils';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGlobalConfigStore } from 'shared/store/GlobalConfigStore';

export const EtcPage = () => {
  const { isDesktop } = useGlobalConfigStore();
  const [loopedSlides, setLoopedSlides] = useState<boolean>(false);

  const infoBoxCss = css`
    display: flex;
    flex-direction: column;

    @media (max-width: 1100px) {
      margin-right: 10px;
    }
    @media (max-width: ${Breakpoint.mobile}) {
      margin-right: 20px;
    }
  `;

  useEffect(() => {
    window.addEventListener('resize', (e: any) => {
      window.innerWidth >= 1200
        ? setLoopedSlides(true)
        : setLoopedSlides(false);
    });
  });

  return (
    <NoticeSection>
      <NoticeArea>
        <NoticeGroup>
          <NoticeTitle>
            <NavLink to="#!">공지사항</NavLink>
          </NoticeTitle>

          {isDesktop ? (
            <SwiperContent
              loop={true}
              slidesPerView={4}
              slidesPerGroup={4}
              spaceBetween={80}
              observer={true}
              watchSlidesProgress={true}
              pagination={{
                type: 'progressbar',
                clickable: true,
              }}
              modules={[Pagination]}
              breakpoints={{
                768: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1021: {
                  spaceBetween: 40,
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1200: {
                  spaceBetween: 60,
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                1401: {
                  spaceBetween: 80,
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
              }}
            >
              {itemList.map((m, i) => {
                return (
                  <SwiperSlide key={i.toString() + m.title}>
                    <NavLink to={`/tsp/About/Notice/${i}`}>
                      <NoticeSwiperTit>{m.title}</NoticeSwiperTit>
                      <NoticeSwiperDesc>{m.content}</NoticeSwiperDesc>
                      <NoticeSwiperDate>{m.createDate}</NoticeSwiperDate>
                    </NavLink>
                  </SwiperSlide>
                );
              })}
            </SwiperContent>
          ) : (
            <NoticeListGroup>
              {itemList.map((m, i) => {
                return (
                  <NavLink to={`/tsp/About/Notice/${i}`}>
                    <NoticeSwiperTit>{m.title}</NoticeSwiperTit>
                  </NavLink>
                );
              })}
            </NoticeListGroup>
          )}
        </NoticeGroup>

        <NoticeBanGroup>
          <NoticeBanItem>
            <NavLink to={'#!'} target={'_blank'}>
              <Box css={infoBoxCss}>
                <NoticeBanTitle>사용자지원 포털</NoticeBanTitle>
                <NoticeBanDesc>
                  인공지능산업융합사업단의 다양한 사업 공고를 <br />
                  확인하고 나에게 맞는 사업을 추천 받을 수 있습니다.
                </NoticeBanDesc>
              </Box>
              <Box>
                <NoticeBanImg
                  style={{
                    backgroundImage: `url(/tsp/images/common/icon_portal.png)`,
                  }}
                />
              </Box>
            </NavLink>
          </NoticeBanItem>
          <NoticeBanItem>
            <NavLink to={'#!'} target={'_blank'}>
              <Box css={infoBoxCss}>
                <NoticeBanTitle>안심구역 포털</NoticeBanTitle>
                <NoticeBanDesc>
                  AICA에서 제공하는 미개방 데이터를 이용하실 수 있는 <br />
                  분석환경 및 연구 장소를 제공합니다.
                </NoticeBanDesc>
              </Box>
              <Box>
                <NoticeBanImg
                  style={{
                    backgroundImage: `url(/tsp/images/common/icon_portal_safezone.png)`,
                  }}
                />
              </Box>
            </NavLink>
          </NoticeBanItem>
        </NoticeBanGroup>
      </NoticeArea>
    </NoticeSection>
  );
};

interface item {
  title: string;
  content: string;
  createDate: string;
}

const itemList: item[] = [
  {
    title:
      '11 2021년도 광주‧전남OpenLAB 조성사업 기업지 2021년도 광주‧전남OpenLAB 조성사업 기업지',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title:
      '22 광주 국가혁신클러스터 지원사업(비R&D) 수혜기업 모집 200 광주 국가혁신클러스터 지원사업(비R&D) 수혜기업 모집 200',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title: '33 2021년「지역혁신 선도 기업」모집 공고',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title: '44 2021년도 명품강소기업 추가모집 공고',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title:
      '55 2021년도 광주 전남 OPENLAB조성사업 기업자 광주 전남 OPENLAB조성사업 기업자 광주 전남 OPENLAB조성사업 기업자',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title: '66 2021년도 광주 전남 OPENLAB조성사업 기업자',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title:
      '77 2021년도 광주 전남 OPENLAB조성사업 기업자 광주 전남 OPENLAB조성사업 기업자',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
  {
    title: '88 2021년도 광주 전남 OPENLAB조성사업 기업자',
    content:
      '과학기술정보통신부와 한국지능정보 사회진흥원(NIA)은 2022년도 인공지능 어쩌구저쩌구',
    createDate: '2021-10-02',
  },
];

const NoticeSection = styled('div')`
  width: 100%;
  height: 100%;
  padding-top: ${Header.pc};
  background: ${Color.white};

  @media (max-width: ${Breakpoint.mobile}) {
    padding-top: ${Header.mo};
  }
`;
const NoticeArea = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const NoticeGroup = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-grow: 1;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    justify-content: flex-start;
    padding: 40px 15px 0;
  }
`;
const NoticeTitle = styled('h2')`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;

  @media (min-width: ${Breakpoint.desk1920}) {
    margin-bottom: 7.14vh;
  }

  @media (max-width: ${Breakpoint.mobile}) {
    margin-bottom: 20px;
  }

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
  width: 100%;
  height: auto !important;
  padding: 0 170px 92px;
  cursor: url(${Cursor.drag}) ${Cursor.size}, ${Cursor.auto};

  @media (min-width: ${Breakpoint.desk1920}) {
    padding: 0 20.23vh 10.95vh;
  }

  @media (max-width: 1400px) {
    padding-left: 100px;
    padding-right: 100px;
  }
  @media (max-width: ${Breakpoint.desk1200}) {
    padding-left: 70px;
    padding-right: 70px;
  }
  @media (max-width: 1000px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  .swiper {
    &-slide {
      opacity: 0.4;

      &-visible {
        opacity: 1;
      }

      a {
        display: block;
        color: ${Color.warm_gray};
        letter-spacing: -0.06em;
        cursor: url(${Cursor.drag}) ${Cursor.size}, ${Cursor.auto};
      }
    }
    &-pagination {
      top: auto;
      bottom: 0;
      left: 170px;
      width: calc(100% - 340px);
      height: 2px;
      background: ${Color.gray};

      @media (min-width: ${Breakpoint.desk1920}) {
        left: 20.23vh;
        width: calc(100% - (20.23vh * 2));
      }
      @media (max-width: 1400px) {
        left: 100px;
        width: calc(100% - 200px);
      }
      @media (max-width: ${Breakpoint.desk1200}) {
        left: 70px;
        width: calc(100% - 140px);
      }
      @media (max-width: 1000px) {
        left: 30px;
        width: calc(100% - 60px);
      }

      &-progressbar-fill {
        background: ${Color.black};
      }
    }
  }
`;
const NoticeSwiperTit = styled('h3')`
  height: 60px;
  font-size: 20px;
  font-weight: 700;
  color: ${Color.black};
  line-height: 30px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: ${Breakpoint.desk1920}) {
    height: 7.14vh;
    font-size: 2.38vh;
    line-height: 3.57vh;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    height: 24px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    -webkit-line-clamp: 1;
  }
`;
const NoticeSwiperDesc = styled('p')`
  margin: 24px 0 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  height: 52px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: ${Breakpoint.desk1920}) {
    margin: 2.85vh 0 2.38vh;
    font-size: 1.9vh;
    line-height: 3.09vh;
    height: 6.18vh;
  }
`;
const NoticeSwiperDate = styled('p')`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;

  @media (min-width: ${Breakpoint.desk1920}) {
    font-size: 1.66vh;
    line-height: 2.02vh;
  }
`;
const NoticeListGroup = styled('div')`
  > a {
    display: block;

    & + a {
      margin-top: 16px;
    }

    &:nth-of-type(n + 5) {
      display: none;
    }

    @media (max-width: ${Breakpoint.mobile}) and (max-height: 700px) {
      &:nth-of-type(n + 4) {
        display: none;
      }
    }
  }
`;
const NoticeBanGroup = styled('ul')`
  display: flex;
  flex-direction: row;

  @media (max-width: ${Breakpoint.mobile}) {
    flex-direction: column;
    margin-top: auto;
  }
`;
const NoticeBanItem = styled('li')`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 180px;
  padding-top: 40px;
  padding-bottom: 40px;

  @media (min-width: ${Breakpoint.desk1920}) {
    height: 21.42vh;
    padding-top: 4.76vh;
    padding-bottom: 4.76vh;
  }

  &:first-of-type {
    justify-content: flex-end;
    padding-left: 170px;
    padding-right: 70px;
    background: ${Color.primary};

    @media (min-width: ${Breakpoint.desk1920}) {
      padding-left: 20.23vh;
      padding-right: 8.33vh;
    }
  }
  &:last-of-type {
    padding-left: 70px;
    padding-right: 170px;
    background: #142645;

    @media (min-width: ${Breakpoint.desk1920}) {
      padding-left: 8.33vh;
      padding-right: 20.23vh;
    }
  }

  @media (max-width: 1400px) {
    &:first-of-type {
      padding-left: 100px;
    }
    &:last-of-type {
      padding-right: 100px;
    }
  }
  @media (max-width: 1200px) {
    &:first-of-type {
      padding-left: 70px;
    }
    &:last-of-type {
      padding-right: 70px;
    }
  }
  @media (max-width: 1000px) {
    &:first-of-type,
    &:last-of-type {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  @media (max-width: ${Breakpoint.mobile}) {
    &:first-of-type,
    &:last-of-type {
      width: 100%;
      padding: 30px 15px;
    }
  }

  a {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: ${Color.white};
    letter-spacing: -0.06em;
    word-break: keep-all;
    cursor: url(${Cursor.click}) ${Cursor.size}, ${Cursor.auto};

    @media (min-width: 1601px) and (max-width: 1919px) {
      max-width: 600px;
    }
  }
`;
const NoticeBanTitle = styled('h3')`
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: 700;
  line-height: 38px;

  &::after {
    content: '';
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    margin-left: 4px;
    background: url('/tsp/images/main/ico_main_arrow_right_white.svg') no-repeat
      center / contain;
  }

  @media (min-width: ${Breakpoint.desk1920}) {
    font-size: 3.09vh;
    line-height: 4.52vh;

    &::after {
      width: 3.33;
      height: 3.33;
      margin-left: 0.47vh;
    }
  }
`;
const NoticeBanDesc = styled('p')`
  margin-top: auto;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;

  @media (min-width: ${Breakpoint.desk1920}) {
    font-size: 1.66vh;
    line-height: 2.85vh;
  }

  @media (max-width: 1100px) {
    margin-top: 10px;

    br {
      display: none;
    }
  }
  @media (max-width: ${Breakpoint.mobile}) {
    margin-top: 14px;
  }
`;
const NoticeBanImg = styled('figure')`
  width: 100px;
  height: 100px;
  margin: 0;
  padding: 0;
  background: no-repeat center / contain;

  @media (min-width: ${Breakpoint.desk1920}) {
    width: 11.9vh;
    height: 11.9vh;
  }
`;

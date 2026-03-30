import styled from '@emotion/styled';
import {
  Color,
  Header,
  Breakpoint,
  Cursor,
} from 'shared/components/StyleUtils';
import { NavLink } from 'react-router-dom';

export const HomeApplyPage = () => {
  const dataVisualQuick = [
    {
      tit: '장비사용 \n견적요청',
      desc: '사용하실 장비 견적을 요청하여 비용을 확인할 수 있습니다. \n견적서 요청은 회원만 가능합니다.',
      link: '#!',
    },
    {
      tit: '장비\n사용신청',
      desc: '1대의 장비를 사용 신청할 수 있습니다. \n장비 사용기간은 연속적으로 선택 가능합니다.',
      link: '#!',
    },
    {
      tit: '실증\n자원신청',
      desc: '실증자원을 사용 신청할 수 있습니다. \n실증자원 신청은 회원만 가능하며 담당자 승인후 안내드립니다.',
      link: '#!',
    },
  ];

  return (
    <VisualSection>
      <VisualIconGroup>
        <VisualIcon01 />
        <VisualIcon02 />
        <VisualIcon03 />
        <VisualIcon04 />
      </VisualIconGroup>
      <VisualBgLight />
      <VisualTitleGroup>
        <VisualTitle>
          <small>AICA 인공지능 중심</small>
          <strong>산업융합 집적단지</strong>
        </VisualTitle>
        <VisualDesc>
          인공지능 융합 산업을 촉진하는 혁신 거점으로의 도약, <br />
          실증기반 인공지능산업 중심도시가 됩니다.
        </VisualDesc>
      </VisualTitleGroup>
      <VisualQuickGroup>
        {dataVisualQuick.map((data, i) => {
          return (
            <VisualQuickItem key={i}>
              <NavLink to={data.link}>
                <VisualQuickItemTitle>
                  {data.tit.split('\n').map((tit: string, i: number) => {
                    return <span key={i}>{tit}</span>;
                  })}
                </VisualQuickItemTitle>
                <VisualQuickItemDesc>
                  {data.desc.split('\n').map((desc: string, i: number) => {
                    return (
                      <span key={i}>
                        {desc}
                        <br />
                      </span>
                    );
                  })}
                </VisualQuickItemDesc>
              </NavLink>
            </VisualQuickItem>
          );
        })}
      </VisualQuickGroup>
    </VisualSection>
  );
};

const VisualSection = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: ${Header.pc};
  background: url('/tsp/images/main/bg_main_visual.png') no-repeat center /
    cover;
  overflow: hidden;

  @media (max-width: ${Breakpoint.mobile}) {
    padding-top: ${Header.mo};
  }
`;
const VisualTitleGroup = styled('div')`
  position: relative;
  padding-top: 76px;
  color: ${Color.white};
  letter-spacing: -0.06em;
  z-index: 10;

  @media (min-width: ${Breakpoint.desk1920}) {
    padding-top: 9.04vh;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    padding-top: 98px;
  }
`;
const VisualTitle = styled('h2')`
  display: flex;
  align-items: center;
  flex-direction: column;

  small {
    font-size: 40px;
    font-weight: 100;
    line-height: 59px;
  }
  strong {
    font-size: 60px;
    font-weight: 700;
    line-height: 89px;
  }

  @media (min-width: ${Breakpoint.desk1920}) {
    small {
      font-size: 4.76vh;
      line-height: 7.02vh;
    }
    strong {
      font-size: 7.14vh;
      line-height: 10.59vh;
    }
  }

  @media (max-width: ${Breakpoint.mobile}) {
    small {
      font-size: 32px;
      line-height: 47px;
    }
    strong {
      font-size: 40px;
      line-height: 59px;
    }
  }
`;
const VisualDesc = styled('p')`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  text-align: center;

  @media (min-width: ${Breakpoint.desk1920}) {
    margin-top: 1.9vh;
    font-size: 2.38vh;
    line-height: 3.8vh;
  }

  @media (max-width: ${Breakpoint.mobile}) {
    padding: 0 20px;
    font-size: 16px;
    line-height: 26px;
  }
`;
const VisualIconGroup = styled('div')`
  @keyframes VisualIconMove {
    0% {
      transform: translateY(-3vh);
    }
    100% {
      transform: translateY(3vh);
    }
  }

  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);

  > div {
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    animation-name: VisualIconMove;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-direction: alternate-reverse;
    z-index: 5;
  }
`;
const VisualIcon01 = styled('div')`
  top: 18.54vh;
  left: 13.625vw;
  width: 38.8vh;
  height: 14.76vh;
  background-image: url('/tsp/images/main/ico_main_visual01.png');
  animation-duration: 2.4s;
  animation-timing-function: cubic-bezier(0.8, 0, 1, 1);

  @media (max-width: ${Breakpoint.desk1600}) {
    top: 259px;
    left: 218px;
    width: 326px;
    height: 124px;
  }
  @media (max-width: ${Breakpoint.desk1200}) {
    top: 129px;
    left: 10px;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    top: 69px;
    width: 167px;
    height: 63px;
  }
`;
const VisualIcon02 = styled('div')`
  left: 6.75vw;
  bottom: 9.04vh;
  width: 20.35vh;
  height: 18.45vh;
  background-image: url('/tsp/images/main/ico_main_visual02.png');
  animation-duration: 2.2s;
  animation-fill-mode: backwards;

  @media (max-width: ${Breakpoint.desk1600}) {
    left: 108px;
    bottom: 76px;
    width: 171px;
    height: 155px;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    left: -42px;
    bottom: 107px;
    width: 127px;
    height: 116px;
  }
`;
const VisualIcon03 = styled('div')`
  right: 23.31vw;
  bottom: 27.02vh;
  width: 9.88vh;
  height: 11.66vh;
  background-image: url('/tsp/images/main/ico_main_visual03.png');
  animation-duration: 2.8s;

  @media (max-width: ${Breakpoint.desk1600}) {
    right: 383px;
    bottom: 272px;
    width: 83px;
    height: 98px;
  }
  @media (max-width: ${Breakpoint.desk1200}) {
    right: 10px;
    bottom: 287px;
  }
  @media (max-width: ${Breakpoint.mobile}) {
    width: 47px;
    height: 56px;
  }
`;
const VisualIcon04 = styled('div')`
  top: -11.78vh;
  right: -2.26vh;
  width: 95.59vh;
  height: 88.57vh;
  background-image: url('/tsp/images/main/ico_main_visual04.png');
  animation-duration: 2.4s;
  animation-timing-function: linear;

  @media (max-width: ${Breakpoint.desk1600}) {
    top: -99px;
    right: -19px;
    width: 803px;
    height: 744px;
  }

  @media (max-width: ${Breakpoint.desk1200}) {
    display: none;
  }
`;
const VisualBgLight = styled('div')`
  @keyframes bglight {
    0% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/tsp/images/main/bg_main_visual_light.png') no-repeat center /
    cover;
  animation: bglight 1s cubic-bezier(0.215, 0.61, 0.355, 1) infinite
    alternate-reverse;
`;
const VisualQuickGroup = styled('ul')`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  color: ${Color.white};
  z-index: 30;
`;
const VisualQuickItem = styled('li')`
  flex-shrink: 0;
  width: 33.33%;

  a {
    display: block;
    height: 240px;
    padding: 34px 40px 0;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    box-shadow: inset 0 1px 0 1px rgba(255, 255, 255, 0.05);
    letter-spacing: -0.06em;
    word-break: keep-all;
    transform: translateY(142px);
    transition: transform 0.5s ease-in-out;
    cursor: url(${Cursor.click}) ${Cursor.size}, ${Cursor.auto};

    @media (min-width: ${Breakpoint.desk1920}) {
      height: 28.57vh;
      padding: 4.04vh 4.76vh 0;
      backdrop-filter: blur(2.38vh);
      transform: translateY(16.9vh);
    }

    @media (min-width: 768px) {
      &:hover {
        padding-top: 40px;
        transform: translateY(0);

        > p {
          padding-top: 26px;
        }
      }
    }

    @media (max-width: ${Breakpoint.desk1200}) {
      padding-left: 20px;
      transform: translateY(146px);
    }
    @media (max-width: ${Breakpoint.mobile}) {
      height: 80px;
      padding: 14px 0 0 15px;
      transform: translateY(0);
    }
  }
`;
const VisualQuickItemTitle = styled('h3')`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;

  @media (min-width: ${Breakpoint.desk1920}) {
    font-size: 2.85vh;
    line-height: 4.28vh;
  }

  span {
    display: flex;
    align-items: center;

    &:nth-of-type(2) {
      &::after {
        content: '';
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        margin-left: 2px;
        background: url('/tsp/images/main/ico_main_arrow_right_white.svg')
          no-repeat center/contain;

        @media (min-width: ${Breakpoint.desk1920}) {
          width: 2.85vh;
          height: 2.85vh;
        }
      }
    }
  }

  @media (max-width: ${Breakpoint.desk1200}) {
    font-size: 20px;
    line-height: 32px;
  }

  @media (max-width: ${Breakpoint.mobile}) {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    font-size: 16px;
    line-height: 24px;
  }
`;
const VisualQuickItemDesc = styled('p')`
  padding-top: 28px;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  transition: 0.5s ease-in-out;

  @media (min-width: ${Breakpoint.desk1920}) {
    padding-top: 3.33vh;
    font-size: 1.9vh;
    line-height: 3.57vh;
  }

  @media (max-width: ${Breakpoint.desk1200}) {
    font-size: 14px;
    line-height: 26px;

    br {
      display: none;
    }
  }

  @media (max-width: ${Breakpoint.mobile}) {
    display: none;
  }
`;

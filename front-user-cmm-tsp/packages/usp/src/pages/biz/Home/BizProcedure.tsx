/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Procedure, CommonInner } from './styles';
import { breakpoint, color } from './styleCommon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, Typography } from '@mui/material';

export default function BizProcedure() {
  const stepListArr = [
    [
      { img: '/images/biz/biz_ico_procedure_step01.svg', txt: '사업신청' },
      { img: '/images/biz/biz_ico_procedure_step02.svg', txt: '평가 · 선정' },
      { img: '/images/biz/biz_ico_procedure_step03.svg', txt: '협약' },
    ],
    [
      { img: '/images/biz/biz_ico_procedure_step04.svg', txt: '진도점검' },
      { img: '/images/biz/biz_ico_procedure_step05.svg', txt: '사업종료' },
      { img: '/images/biz/biz_ico_procedure_step06.svg', txt: '성과' },
    ],
  ];
  const quickBanArr = [
    {
      img: '/images/biz/biz_ico_procedure01.png',
      tit: '사용자 매뉴얼',
      desc: 'AICA 포털 이용을 위한 \n사용자 매뉴얼을 확인할 수 있습니다.',
      link: '/SupportForUse/UserManual',
    },
    {
      img: '/images/biz/biz_ico_procedure02.png',
      tit: '1:1 문의',
      desc: '시스템을 이용하며 발생한 \n사항을 문의하실 수 있습니다.',
      link: '/SupportForUse/OneByOneInquiry',
    },
    {
      img: '/images/biz/biz_ico_procedure03.png',
      tit: '디딤널',
      desc: '창업아이디어 및 사업제안, \n구인/구직 등을 접수할 수 있습니다.',
      link: '/EventNews/Treadmill',
    },
  ];

  const stepBoxCss = css`
    display: flex;
    align-items: center;
    flex-direction: column;

    i {
      display: block;
      width: 120px;
      height: 120px;
      background: ${color.darkbg} no-repeat center / 48px;
      border-radius: 50%;

      @media (max-width: ${breakpoint.mobile}) {
        width: calc((84 / 375) * 100vw);
        height: calc((84 / 375) * 100vw);
      }
    }
    p {
      padding-top: 20px;
      font-size: 20px;
      font-weight: 500;
      color: ${color.dim};
      line-height: 28px;
      letter-spacing: -0.06em;

      @media (max-width: ${breakpoint.mobile}) {
        padding-top: 10px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  `;

  return (
    <Procedure>
      <CommonInner>
        <ProcedureGroup>
          <ProcedureStepTitle>
            <Typography component="h2">사업절차</Typography>
            <Typography component="p">
              사업에 따라 생략되는 절차가 있습니다. <br />
              자세한 사항은 공고를 확인해주시기 바랍니다.
            </Typography>
          </ProcedureStepTitle>
          <ProcedureStepSection>
            {stepListArr.map((group, i) => {
              return (
                <ProcedureStepGroup key={i}>
                  {group.map((item, idx) => {
                    return (
                      <ProcedureStepItem key={idx}>
                        <Box css={stepBoxCss}>
                          <i
                            style={{
                              backgroundImage: `url(${item.img})`,
                            }}
                          ></i>
                          <Typography component="p">{item.txt}</Typography>
                        </Box>
                      </ProcedureStepItem>
                    );
                  })}
                </ProcedureStepGroup>
              );
            })}
          </ProcedureStepSection>
        </ProcedureGroup>
        <ProcedureQuickGroup>
          {quickBanArr.map((item, i) => {
            return (
              <ProcedureQuickItem key={i}>
                <NavLink to={item.link}>
                  <ProcedureQuickItemInfo>
                    <Typography component="h3">{item.tit}</Typography>
                    <Typography component="p">
                      {item.desc.split('\n').map((tit: string, i: number) => {
                        return (
                          <span key={i}>
                            {tit}
                            <br />
                          </span>
                        );
                      })}
                    </Typography>
                  </ProcedureQuickItemInfo>
                  <ProcedureQuickItemImg
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  />
                </NavLink>
              </ProcedureQuickItem>
            );
          })}
        </ProcedureQuickGroup>
      </CommonInner>
    </Procedure>
  );
}

const ProcedureGroup = styled('div')`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoint.desk1280}) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const ProcedureStepTitle = styled('div')`
  h2,
  p {
    letter-spacing: -0.06em;
  }

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: ${color.dim};
    line-height: 54px;

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 24px;
      line-height: 36px;
    }
  }
  p {
    margin-top: 28px;
    font-size: 16px;
    font-weight: 400;
    color: ${color.warm_grey};
    line-height: 28px;

    @media (max-width: ${breakpoint.desk1280}) {
      margin-top: 10px;
    }
    @media (max-width: ${breakpoint.mobile}) {
      font-size: 14px;
      line-height: 26px;
    }
  }
`;
const ProcedureStepSection = styled('div')`
  display: flex;
  padding: 47px 0 80px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: ${breakpoint.mobile}) {
    align-items: center;
    padding: 20px 0 40px;
  }
`;
const ProcedureStepGroup = styled('ul')`
  display: flex;

  &:nth-of-type(2) {
    li {
      &:last-of-type {
        i {
          background-color: ${color.azul};
        }
        p {
          color: ${color.azul};
        }

        &::after {
          display: none;
        }
      }
    }

    @media (max-width: 1000px) {
      flex-direction: row-reverse;

      li {
        &::after {
          display: none;
        }

        &:not(:last-of-type) {
          &::before {
            content: '';
            width: 24px;
            height: 24px;
            margin: 48px 10px 0;
            background: url('/images/biz/biz_ico_arrow_right_grey.svg')
              no-repeat center/contain;
            transform: rotate(-180deg);
          }
        }
      }
    }
    @media (max-width: ${breakpoint.mobile}) {
      li {
        &:not(:last-of-type) {
          &::before {
            width: calc((16 / 375) * 100vw);
            height: calc((16 / 375) * 100vw);
            margin: calc((35 / 375) * 100vw) calc((13 / 375) * 100vw) 0;
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    &:first-of-type {
      li {
        &:last-of-type {
          flex-direction: column;

          &::after {
            margin: 10px auto;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
`;
const ProcedureStepItem = styled('li')`
  display: flex;

  &::after {
    content: '';
    width: 24px;
    height: 24px;
    margin: 48px 10px 0;
    background: url('/images/biz/biz_ico_arrow_right_grey.svg') no-repeat center /
      contain;

    @media (max-width: ${breakpoint.mobile}) {
      width: calc((16 / 375) * 100vw);
      height: calc((16 / 375) * 100vw);
      margin: calc((35 / 375) * 100vw) calc((13 / 375) * 100vw) 0;
    }
  }
`;

const ProcedureQuickGroup = styled('ul')`
  display: flex;

  @media (max-width: ${breakpoint.desk1280}) {
    flex-direction: column;
    border-top: 8px solid ${color.bg_grey};
  }
  @media (min-width: 768px) and (max-width: ${breakpoint.desk1280}) {
    width: calc(100% + 40px);
    margin-left: -20px;
  }
  @media (max-width: ${breakpoint.mobile}) {
    width: calc(100% + 30px);
    margin-left: -15px;
  }
`;
const ProcedureQuickItem = styled('li')`
  width: 400px;

  & + li {
    margin-left: 30px;
  }

  @media (max-width: ${breakpoint.desk1280}) {
    width: 100%;

    & + li {
      margin-left: 0;
    }
  }

  a {
    display: flex;
    align-items: center;
    height: 180px;
    padding: 0 20px 0 40px;
    border: 1px solid ${color.line};
    border-radius: 10px;

    @media (max-width: ${breakpoint.desk1280}) {
      height: auto;
      padding: 30px 20px 30px 30px;
      border-radius: 0;
    }
  }

  @media (max-width: ${breakpoint.desk1280}) {
    &:last-of-type {
      a {
        border: 0;
      }
    }
    &:not(:last-of-type) {
      a {
        border-width: 0 0 1px;
      }
    }
  }
`;
const ProcedureQuickItemInfo = styled('div')`
  flex-grow: 1;

  h3,
  p {
    letter-spacing: -0.06em;
  }
  h3 {
    font-size: 28px;
    font-weight: 700;
    color: ${color.dim};
    line-height: 41px;

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 22px;
      line-height: 33px;
    }
  }
  p {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
    color: ${color.warm_grey};
    line-height: 28px;

    @media (min-width: 768px) and (max-width: ${breakpoint.desk1280}) {
      span {
        br {
          display: none;
        }
      }
    }
    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 10px;
      font-size: 14px;
      line-height: 24px;
    }
  }
`;
const ProcedureQuickItemImg = styled('figure')`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  margin: 0 0 0 10px;
  padding: 0;
  background: no-repeat center / contain;
`;

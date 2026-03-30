/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  VisualGroup,
  Visual,
  CommonInner,
  innerCss,
  screenOut,
  ellipsis,
} from './styles';
import { breakpoint, color } from './styleCommon';
import styled from '@emotion/styled';

import { bizVisualToastArr } from '~/models/Model';
import { useQuery } from 'react-query';
import { bizInfoNotiList } from '~/fetches/fetchBusinessInfoNoti';

export default function BizVisual() {
  const VisualQuickArr = [
    [
      {
        ico: '/images/biz/biz_ico_visual01.png',
        txt: '사업신청관리',
        link: '/biz/BusinessAppMgt/BusAppMgt',
      },
      {
        ico: '/images/biz/biz_ico_visual02.png',
        txt: '사업계획서관리',
        link: '/biz/ContractMgt/BusinessPlanMgt',
      },
      {
        ico: '/images/biz/biz_ico_visual03.png',
        txt: '전자협약',
        link: '/biz/ContractMgt/ElectronicAgtMgt',
      },
    ],
    [
      {
        ico: '/images/biz/biz_ico_visual04.png',
        txt: '협약변경',
        link: '/biz/ContractMgt/AgreementChangeMgt',
      },
      {
        ico: '/images/biz/biz_ico_visual05.png',
        txt: '보고서제출',
        link: '/biz/TaskManagement/ReportSubmission',
      },
      {
        ico: '/images/biz/biz_ico_visual06.png',
        txt: '성과관리',
        link: '/biz/TaskManagement/PerformanceMgt',
      },
    ],
  ];

  const handleDelete = (e: any) => {
    e.preventDefault();
    console.log(e.target);
  };

  const checkSttus = (sttusNm:string) => {
    if(sttusNm==="임시저장"){
      return "step01"
    }else if(sttusNm==="신청"){
      return "step02"
    }else if(sttusNm==="보완요청"){
      return "step03"
    }else if(sttusNm==="반려"){
      return "step04"
    }else if(sttusNm==="신청취소"){
      return "step06"
    }
    return "step01"
  }
  const {data:list} = useQuery("bizInfoNotiList", async () => await bizInfoNotiList())
  console.log(list)
  return (
    /*
     * [D] toast 알림 건수에 따른 클래스 적용
     * => import { bizVisualToastArr } from '~/models/Model'; 참고
     * => import { useQuery } from "react-query";
toast 알림이 없을 때 "no-toast" 클래스 적용
     * => toast 알림이 있을 때 "is-toast" 클래스 적용
     */
    <VisualGroup
      className={bizVisualToastArr.length !== 0 ? 'is-toast' : 'no-toast'}
    >
      <Visual>
        <CommonInner>
          <VisualTitle>
            <small>project management system</small>
            <strong>
              <span className="img"></span>
              <span className="txt">사업관리 시스템</span>
            </strong>
          </VisualTitle>
          <VisualQuickSection>
            {VisualQuickArr.map((group, i) => {
              return (
                <VisualQuickGroup key={`ui${i}`}>
                  {group.map((item, idx) => {
                    return (
                      <VisualQuickItem key={`item${idx}`}>
                        <NavLink to={item.link}>
                          <figure
                            style={{
                              backgroundImage: `url(${item.ico})`,
                            }}
                          >
                            <figcaption>{item.txt}</figcaption>
                          </figure>
                        </NavLink>
                      </VisualQuickItem>
                    );
                  })}
                </VisualQuickGroup>
              );
            })}
          </VisualQuickSection>
        </CommonInner>
      </Visual>
      {list?.list.length !== 0 && (
        <VisualToastGroup css={innerCss}>
          <h3>나의 사업 관리 알림</h3>
          <VisualToastList>
            {list?.list.map((item:any, i:number) => {
              return (
                <VisualToastItem key={i}>
                  {/* <NavLink to={"/"}> */}
                  <div>
                    <i className={checkSttus(item.sttusNm)}>{item.sttusNm}</i>
                    <div>
                      <p css={ellipsis}>{"["+item.jobNm+"] "+item.pblancNm}</p>
                      <button type="button" onClick={handleDelete}>
                        <span css={screenOut}>{"["+item.jobNm+"]"+item.pblancNm} 알림 삭제</span>
                      </button>
                    </div>
                  </div>
                  {/* </NavLink> */}
                </VisualToastItem>
              );
            })}
          </VisualToastList>
        </VisualToastGroup>
      )}
    </VisualGroup>
  );
}

const VisualTitle = styled('h2')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  color: ${color.white};
  letter-spacing: normal;

  small {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-transform: capitalize;
    opacity: 0.5;
  }
  strong {
    display: flex;
    align-items: center;
    margin-top: 26px;

    .img {
      width: 244px;
      height: 56px;
      margin-right: 18px;
      background: url('/images/common/logo_aica_white_244x56.svg') no-repeat
        center / contain;
    }
    .txt {
      font-size: 60px;
      font-weight: 700;
      line-height: 1;
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    padding-top: 70px;

    small {
      font-size: 16px;
      line-height: 19px;
    }

    strong {
      justify-content: center;
      flex-direction: column;
      margin-top: 16px;

      .img {
        width: 148px;
        height: 33px;
        margin: 0 0 4px;
      }
      .txt {
        font-size: 40px;
        line-height: 59px;
      }
    }
  }
`;
const VisualQuickSection = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 51px;

  @media (max-width: ${breakpoint.desk1280}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: 40px;
  }
`;
const VisualQuickGroup = styled('ul')`
  display: flex;

  & + ul {
    @media (max-width: ${breakpoint.desk1280}) {
      margin-top: 20px;
    }
    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 10px;
    }
  }
`;
const VisualQuickItem = styled('li')`
  width: 140px;
  height: 140px;
  margin: 0 10px;
  padding-top: 16px;
  background: ${color.white};
  border-radius: 20px;
  box-shadow: 3px 10px 20px 0 rgba(0, 0, 0, 0.1);

  figure {
    margin: 0;
    padding: 0;
    background: no-repeat top center / auto 80px;
    text-align: center;

    figcaption {
      padding-top: 83px;
      font-size: 16px;
      font-weight: 700;
      color: ${color.darkbg};
      line-height: 24px;
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    width: 17.79vh;
    max-width: 108px;
    height: 17.79vh;
    max-height: 108px;
    margin: 0 5px;

    figure {
      background-size: auto 64px;

      figcaption {
        padding-top: 65px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
`;
const VisualToastGroup = styled('div')`
  margin-top: -88px;
  padding: 32px 60px 30px;
  background: ${color.darkbg};
  border-radius: 20px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  color: ${color.white};

  h3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: -60px;
    padding: 30px;

    h3 {
      font-size: 22px;
      line-height: 33px;
    }
  }
`;
const VisualToastList = styled('ul')`
  margin-top: 20px;
`;
const VisualToastItem = styled('li')`
  & + li {
    margin-top: 10px;

    @media (max-width: ${breakpoint.mobile}) {
      margin-top: 20px;
    }
  }

  a {
    display: flex;
    align-items: center;

    @media (max-width: ${breakpoint.mobile}) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  i {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 90px;
    height: 30px;
    border-radius: 15px;
    font-size: 15px;
    font-weight: 400;
    line-height: 1;

    &.step01 {
      background: ${color.purple};
    }
    &.step02 {
      background: ${color.azul};
    }
    &.step03 {
      background: ${color.topaz};
    }
    &.step04 {
      background: ${color.red};
    }
    &.step05 {
      background: ${color.black};
    }
    &.step06 {
      background: ${color.warm_grey};
    }

    @media (max-width: ${breakpoint.mobile}) {
      max-width: 70px;
      height: 25px;
      margin-bottom: 10px;
      font-size: 13px;
    }
  }

  div {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding-left: 14px;
    overflow: hidden;

    @media (max-width: ${breakpoint.mobile}) {
      max-width: 100%;
      padding-left: 0;
    }
  }
  p {
    font-size: 16px;
    font-weight: 400;

    @media (max-width: ${breakpoint.mobile}) {
      font-size: 14px;
      line-height: 20px;
    }
  }
  button {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-left: 10px;
    background: url('/images/biz/biz_ico_visual_close.svg') no-repeat center /
      contain;

    @media (max-width: ${breakpoint.mobile}) {
      margin-left: 8px;
    }
  }
`;

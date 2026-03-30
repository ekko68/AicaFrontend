import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoint, color } from './styleCommon';
import Swiper from 'swiper';

export const innerCss = css`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1281px) {
    max-width: 1260px;
  }
  @media (max-width: ${breakpoint.desk1280}) {
    width: calc(100% - 40px);
  }
  @media (max-width: ${breakpoint.desk1200}) {
    width: calc(100% - 30px);
  }
`;
export const screenOut = css`
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  text-indent: -9999px;
`;
export const ellipsis = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const multiEllipsisHelp = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* autoprefixer: off */
`;

export const HomeSection = styled('div')`
  padding-top: 120px;
  letter-spacing: -0.06em;
  word-break: keep-all;

  @media (max-width: ${breakpoint.desk1200}) {
    padding-top: 60px;
  }
`;

export const HomeArea = styled('div')``;

export const CommonInner = styled('div')`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1281px) {
    max-width: 1260px;
  }
  @media (max-width: ${breakpoint.desk1280}) {
    width: calc(100% - 40px);
  }
  @media (max-width: ${breakpoint.desk1200}) {
    width: calc(100% - 30px);
  }
`;

export const VisualGroup = styled('div')``;
export const Visual = styled('div')`
  background: url('/images/biz/biz_bg_main_visual.png') no-repeat center / cover;

  .no-toast & {
    height: 500px;

    @media (max-width: ${breakpoint.mobile}) {
      height: 550px;
    }
  }
  .is-toast & {
    height: 600px;

    @media (max-width: ${breakpoint.desk1280}) {
      height: 750px;
    }
    @media (max-width: ${breakpoint.mobile}) {
      height: 607px;
    }
  }
`;

export const Announcement = styled('div')`
  padding: 60px 0 110px;
`;

export const BoardGroup = styled('div')`
  padding: 80px 0;
  background: ${color.bg_grey};

  @media (max-width: ${breakpoint.desk1280}) {
    padding: 40px 0;
  }
`;

export const Procedure = styled('div')`
  padding: 80px 0 120px;

  @media (max-width: ${breakpoint.desk1280}) {
    padding: 40px 0 56px;
  }
`;

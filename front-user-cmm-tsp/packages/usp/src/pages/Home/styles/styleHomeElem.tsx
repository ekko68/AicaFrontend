import styled from '@emotion/styled';
import { breakpoint, common } from './styleCommon';

export const SlideContainer = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: ${common.header_pc};
  word-break: keep-all;

  @media (max-width: ${breakpoint.mobile}) {
    align-items: flex-start;
    padding-top: ${common.header_mo};
  }
`;

export const SlideContents = styled('div')`
  width: 100%;

  @media (max-width: ${breakpoint.mobile}) {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 15vw 0;
  }
`;

export const SlideTitleGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding-left: ${common.pdxM};
  padding-right: ${common.pdxM};

  @media (min-width: ${breakpoint.desk1920}) {
    padding-left: ${common.pdxL};
    padding-right: ${common.pdxL};
  }
  @media (max-width: ${breakpoint.desk1200}) {
    padding-left: ${common.pdxSM};
    padding-right: ${common.pdxSM};
  }

  @media (max-width: ${breakpoint.mobile}) {
    padding-left: ${common.pdxS};
    padding-right: ${common.pdxS};
  }
`;
export const SlideTitle = styled('h2')`
  position: relative;

  > span {
    font-size: ${common.sz80};
    line-height: ${common.lineH_title};
    letter-spacing: -0.06em;
  }
  .ico {
    position: absolute;
    width: ${common.sz120};
    height: ${common.sz120};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  @media (max-width: ${breakpoint.desk1200}) {
    > span {
      font-size: ${common.sz60};
    }
    .ico {
      width: ${common.sz100};
      height: ${common.sz100};
    }
  }

  @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
    > span {
      font-size: ${common.sz60};
      line-height: 1.25 !important;
    }
  }

  @media (max-width: ${breakpoint.mobile}) {
    > span {
      font-size: ${common.sz36};
    }
    .ico {
      width: ${common.sz68};
      height: ${common.sz68};
    }
  }
`;
export const SlideTitleDesc = styled('p')`
  margin-top: ${common.sz30};
  font-size: ${common.sz20};
  color: rgba(255, 255, 255, 0.7);
  line-height: ${common.sz34};
  letter-spacing: -0.06em;

  @media (max-width: ${breakpoint.mobile}) {
    margin-top: ${common.sz10};
    font-size: ${common.sz16};
    line-height: ${common.sz24};
  }
`;

export const ButtonOutline = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 56px;
  border: 1px solid ${common.white};
  font-size: ${common.sz16};
  font-weight: 400;
  color: ${common.white};
  line-height: ${common.sz24};
  letter-spacing: -0.06em;

  & + & {
    margin-left: ${common.sz10};
  }

  @media (max-width: ${breakpoint.desk1200}) {
    width: ${common.sz120};
    height: ${common.sz50};
    font-size: ${common.sz16};
    line-height: ${common.sz24};
  }

  @media (max-width: ${breakpoint.mobile}) {
    width: 105px;
    height: ${common.sz40};
    font-size: ${common.sz14};
    line-height: ${common.sz20};
  }
`;

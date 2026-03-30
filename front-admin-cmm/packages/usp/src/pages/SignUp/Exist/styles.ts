import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
`;

export const backPass = css`
position: absolute;
top: 40px;
left: 0;
  &:before{
    content:'';
    display: inline-block;
    background: url('/images/common/pass_left.png');
    width: 7px;
    height: 14px;
    margin-right: 16.5px;
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    display: none;
  }
`;
export const content = css`
  position: relative;
  color: #fff;
  background-color: #1f2437;
  padding: 100px 160px;
  max-width: 1260px;
  margin: 0 auto;
  .tit {
    h1 {
    font-size: 43px;
    letter-spacing: -1.2px;
    }
  }
  .confirm_tit {
    margin: 60px auto 0;
    text-align: center;
    div {
      margin-bottom: 20px;
      font-size: 30px;
      strong{
        color: #1CCDCC;
      }
    }
    p {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 40px;
      letter-spacing: -0.6px;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    padding: 20px 15px 60px;
    .confirm_tit {
      margin: 40px auto 0;
      p {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }
    .tit {
      h1 {
      font-size: 28px;
      }
    }
    .confirm_tit {
      div {
        margin-bottom: 15px;
        font-size: 24px;
      }
      p {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }
  }
`;

export const box_ara = css`
  dl{
    display: flex;
    padding: 15px 80px 10px;
    line-height: 30px;
    dt{
      font-size: 18px;
      flex: 0 0 50%;
    }
    dd{
      font-size: 24px;
      font-weight: bold;
      flex: 0 0 50%;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    .MuiCardContent-root:last-child{
      padding-bottom: 10px;
      padding: 8px;
    }
    dl{
      padding: 15px 30px 10px;
      line-height: 30px;
      dt{
        font-size: 14px;
      }
      dd{
        font-size: 16px;
      }
    }
  }
`;

export const btnGroup = css`
  justify-content: center;
  > button{
    height: 60px;
    border-radius: 40px;
    width: 220px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5; 
    background-color: #4063EC;
    &.linebtn {
      border: 1px solid #fff;
      background-color: #1f2437;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    > button{
      font-size: 16px;
    }
  }
`;
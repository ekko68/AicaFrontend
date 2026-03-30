import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
  height: 100%;
`;
export const content = css`
  position: relative;
  background-color: #1f2437;
  color: #fff;
  text-align: center;
  padding: 100px 20px;
  max-width: 505px;
  margin: 0 auto;
  height: 100%;
  .tit {
    h1 {
    font-size: 43px;
    letter-spacing: -1.2px;
    }
    p{
      font-size: 14px;
      color: #8f929b;
      line-height: 30px;
      margin-bottom: 40px;
      letter-spacing: -0.6px;
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
  flex: 1; 
  margin-top: 40px;
  margin-bottom: 50px;
  .MuiCardContent-root{
    padding: 35px;
    font-size: 24px;
    font-weight: bold;
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    .MuiCardContent-root{
      padding: 30px;
      font-size: 16px;
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
      position: absolute;
      width: calc(100% - 30px);
      bottom: 20px;
    > button{
      font-size: 16px;
    }
  }
`;

export const error = css`
  color: #fedc00;
  line-height: 16px;
  letter-spacing: -1.2px; 
`
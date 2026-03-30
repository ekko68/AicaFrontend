import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
  height: 100%;
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
  @media (min-width: 320px) and (max-width: 820px) {
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
  letter-spacing: -1.4px;
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
      letter-spacing: -1.4px;
      em {
        color: #1CCDCC;
        font-style: normal;
        font-weight: bold;
        margin: 0 5px;
      }
    }
  }
  .css-nen11g-MuiStack-root{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  @media (min-width: 320px) and (max-width: 820px) {
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
      h2 {
        margin-bottom: 15px;
        font-size: 24px;
      }
      p {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }
    .css-nen11g-MuiStack-root{
      display: flex;
      flex-direction: column;
    }
  }
`;

export const step = css`
max-width: 420px;
margin-top: 20px;
align-items: center;
.MuiStepLabel-label{
  letter-spacing: -1.4px;
}
.MuiStep-root{
  padding: 0;
  width: 110px;
  .Mui-active{
    color: #1CCDCC;
    border: none;
  }
  .Mui-completed{
    color: #707070;
    border: none;
    .MuiStepConnector-line{
      border-color: #000;
    }
  }
  .Mui-disabled{
    color: #ccc;
    .MuiStepIcon-root{
      border: 1px solid #fff;
      border-radius: 50px;
    }
  }
}
.MuiStepConnector-root{
  left: calc(-50% + 11px);
  right: calc(50% + 11px);
}
.MuiStepIcon-root{
  &.Mui-completed{
    color: #000;
  }
  &.Mui-active{
    color: #1CCDCC;
  }
}
.MuiStepIcon-text{
  font-weight: bold;
  letter-spacing: -2px;
}
@media (min-width: 320px) and (max-width: 820px) {
  max-width: 100%;
  .css-nen11g-MuiStack-root{
    flex-direction: column;
  }
}
`;

export const landing = css`
  display: block;
  margin-top: 16px;
  font-weight: bold;
`

export const box_ara = css`
  .MuiCardContent-root{
    padding: 32px 32px 32px 69px;
    line-height: 28px;
    .info_icon{
      &:before{
        content:'';
        position: absolute;
        display: inline-block;
        background: url('/images/common/icon_info.png');
        width: 27px;
        height: 27px;
        margin-left: -40px;
      }
    }
  }
  
  @media (min-width: 320px) and (max-width: 820px) {
    .MuiCardContent-root{
      padding: 30px 30px 30px 67px;
      line-height: 28px;
      .info_icon{
        &:before{
          content:'';
          position: absolute;
          display: inline-block;
          background: url('/images/common/icon_info.png');
          width: 27px;
          height: 27px;
          margin-left: -40px;
        }
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
  @media (min-width: 320px) and (max-width: 820px) {
    > button{
      font-size: 16px;
    }
  }
`;
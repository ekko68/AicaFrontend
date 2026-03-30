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
  .sub_tit {
    h2 {
    font-size: 32px;
    letter-spacing: -1.2px;
    }
    p{
      font-size: 14px;
      color: #8f929b;
      line-height: 30px;
      margin-bottom: 30px;
      letter-spacing: -0.6px;
    }
  }
  
  .MuiFormGroup-root{
    display: block;
    position: relative;
    > div{
      flex: 0 0 50%;
      border-bottom: 1px solid #515668;
      padding: 10px 0;
    }
    span.gt{
      &:after{
        content:'';
        display: inline-block;
        background: url('/images/common/pass_right.png') no-repeat;
        width: 5px;
        height: 12px;
        margin-left: 10px;
        padding-right: 15px;
      }
      &.blue {
        color: #1CCDCC;
      }
      &.gray {
        color: #707070;
      }
    }
  }
  .MuiCheckbox-root, .MuiInputLabel-root, .MuiFormControlLabel-root{
    color: #fff;
  }
  .css-nen11g-MuiStack-root{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  .Mui-checked{
    color: #fff;
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    padding: 20px 15px 60px;
    .tit {
      h1 {
      font-size: 28px;
      }
    }
    .css-nen11g-MuiStack-root{
      display: flex;
      flex-direction: column;
    }
    .sub_tit {
      h2 {
      font-size: 20px;
      }
      p{
        font-size: 14px;
        margin-bottom: 30px;
      }
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
@media (min-width: 320px) and (max-width: 1000px) {
  max-width: 100%;
  .css-nen11g-MuiStack-root{
    flex-direction: column;
  }
}
`;

export const listbox = css`
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;

export const errbox = css`
  position: absolute;
  text-align: right;
  color: #fedc00;
  right: 0;
  top: 0; 
  padding-top: 22px;
`;

export const singTextbox = css`
  position: relative;
  display: flex;
  margin-bottom: 16px;
  .inputtxt{
    margin-top: 20px;
    width: 160px;
  }
  label{
    &.Mui-focused {
      color: #fff;
    }
  }
  .MuiOutlinedInput-root {
    color: #fff;
    fieldset {
      border-color: #707070;
    }
    &:hover{
      fieldset {
        border-color: #fff;
      }
    }
  }
  .MuiFormLabel-asterisk{
    color: #1CCDCC;
  }
  button.rbt{
    position: absolute;
    top: 7.5px;
    right: 7.5px;
    width: 100px;
    height: 40px;
    background-color: #4063EC;
    color: #fff;
  }
  span.rbt{
    position: absolute;
    top: 18px;
    right: 18px;
    color: #1CCDCC;
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
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    > button{
      font-size: 16px;
    }
  }
`;
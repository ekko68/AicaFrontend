import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
  height: 100%;
`;
export const content = css`
  position: absolute;
  top:50%;
  left: 50%;
  background-color: #fff;
  color: #fff;
  text-align: center;
  padding: 70px 100px;
  width: 580px;
  margin: 0 auto;
  transform: translate(-50%,-50%);
  border-radius:20px;
  .MuiOutlinedInput-notchedOutline{
    height:auto;
  }
  .tit {
    h1 {
    margin:10px 0 0;
    font-size: 2rem;
    letter-spacing: -1.2px;
    color: #000;
    }
    p{
      font-size: 1.3rem;
      color: #222;
      line-height: 30px;
      margin-bottom: 30px;
      font-weight: bold;
      letter-spacing: -0.6px;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    padding: 20px 15px 60px;
    .tit {
      h1 {
      font-size: 28px;
      }
    }
  }
`;
export const singTextbox = css`
  position: relative;
  display: flex;
  margin-bottom: 16px;
  input{color:#707070;}
  .inputtxt{
    margin-top: 20px;
    width: 160px;
  }
  label{
    color: #fff;
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
  @media (min-width: 320px) and (max-width: 1000px) {
    label{
      font-size: 14px;
    }
    input {
      padding: 15px 14px;
    }
  }
`;

export const signbtn = css`
  height: 60px;
  margin-top: 40px;
  button{
    font-size: 16px;
    line-height: 1;
    border-radius: 50px;
    background-color: #4063ec;
    max-width: 220px;
    margin: 0 auto;
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    position: absolute;
    width: calc(100% - 30px);
    bottom: 20px;
    button{
      max-width: 100%;
    }
  }
`

export const error = css`
  color: #fedc00;
  line-height: 16px;
  letter-spacing: -1.2px; 
`
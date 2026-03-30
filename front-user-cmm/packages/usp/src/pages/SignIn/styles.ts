import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
  font-weight: 400;
  padding-top: 80px;
  .MuiFormControlLabel-root{
    margin-left: 0;
  }
  /* filled type input */
  .MuiFilledInput-root{
    border-radius: 5px;
    color: #fff;
    height: 60px;
    font-family: Noto Sans CJK KR;
    padding-right: 0;
    /* input icon, button */
    .MuiInputAdornment-root{
      position: absolute;
      right: 12px;
    }
    /* input */
    &::before, &::after{
      display: none;
    }
    &.Mui-error{
      .MuiFilledInput-input{
        border: 1px solid #fedc00;
      }
    }
    &.Mui-focused{
      .MuiFilledInput-input{
        border-color: #fff;
        color: #fff;
      }
    }
    .MuiFilledInput-input{
      height: 25px;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #707070;
      font-family: Noto Sans CJK KR;
      /* &:valid {    
        border: 1px solid #1ccdcc;
        border-radius: 4px;
      } */
      &:hover{
        border-color: #fff;
      }
      
      &:hover:not(.Mui-disabled):before{
        border: none;
      }
      &.Mui-disabled{
        color: #707070;
        border-color: #707070;
        background: none;
        opacity: 1;
        -webkit-text-fill-color: #707070;
        &::before{
          display: none;
        }
      }
      &:-webkit-autofill{
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0) !important;
        opacity: 0.3;
        color: #fff !important;
      }
    }
  }
  
  input{
    padding-left: 18px;
    font-weight: 300;
    &:valid {    
      border: 1px solid #1ccdcc;
      border-radius: 4px;
    }
    &:-webkit-autofill{
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0) !important;
      opacity: 0.3;
      color: #fff !important;
    }
    &.Mui-disabled{
      color: #707070;
      opacity: 1;
      -webkit-text-fill-color: #707070;
    }
  }
  .inputtxt{
    margin-top: 20px;
    width: 160px;
  }
  /* 전체적인 input label */
  .MuiInputLabel-root{
    font-family: Noto Sans CJK KR;
    font-weight: 300;
    padding-left: 6px;
    letter-spacing: -0.56px;
    color: #fff;
    font-size: 16px;
    line-height: 28px;
    &.Mui-focused{
      color: #fff;
      border-color: #1ccdcc;
    }
    &.Mui-error{
      color: #fedc00;
      span.Mui-error{
        color: #fedc00;
      }
    }
    &.Mui-disabled{
      color: #707070;
      border: none;
      .MuiFormLabel-asterisk{
        opacity: 0.5;
      }
    }
  }
  
  .MuiRadio-root{
    color: #fff;
    .MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 100%;
      path {
        display: none;
      }
    }
    &.Mui-checked {
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        margin: -5px 0 0 -5px;
        border-radius: 100%;
        background-color: #4063ec;
      }
      .MuiSvgIcon-root {
        position: relative;
        border-color: #4063ec;
        &[data-testid='RadioButtonCheckedIcon'] {
          display: none;
        }
      }
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
  .MuiFormHelperText-root{
    color: #fedc00;
    font-size: 16px;
    line-height: 1.75;
    letter-spacing: -0.64px;
    margin: 8px auto 0 0;
    &.Mui-error{
      color: #fedc00;
    }
  }

  @media (min-width: 320px) and (max-width: 768px) {
    .MuiInputLabel-root{
      font-size: 14px;
    }
    input{
      &::placeholder{
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
`;
export const content = css`
  position: relative;
  background-color: #1f2437;
  color: #fff;
  text-align: center;
  padding: 104px 0 120px;
  max-width: 550px;
  /* 505 */
  margin: 0 auto;
  height: calc( 100vh - 80px );
  .tit {
    h1 {
      font-size: 48px;
      line-height: 1.42;
      margin-bottom: 15px;
    }
    p{
      margin-top: 0;
      font-size: 16px;
      color: #fff;
      line-height: 1;
      margin-bottom: 40px;
      letter-spacing: -0.64px;
      opacity: 0.5;
    }
  }
  .confirm_tit {
    margin: 60px auto 0;
    text-align: center;
    &.mt20{
      margin-top: 20px;
    }
    &.mt40{
      margin-top: 40px;
    }
    .mintit{
      font-weight: 300;
      line-height: 1.75;
      letter-spacing: -0.64px;
      text-align: center;
      color: #ccc;
    }
    .mintit + .mintit{
      display: inline-block;
      margin-top: 18px;
    }
    div {
      margin-bottom: 10px;
      font-size: 30px;
      strong{
        color: #1CCDCC;
      }
    }
    p {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 18px;
      letter-spacing: -0.6px;
    }
    
  }
  .icon_errBox{
    margin-top: 60px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 40px 15px 100px;
    height: calc( 100vh - 60px );
    overflow: auto;
    .confirm_tit {
      margin: 40px auto 0;
      div {
        margin-bottom: 15px;
        font-size: 24px;
      }
      p {
        font-size: 16px;
        margin-bottom: 30px;
        line-height: 26px;
      }
      .mintit{
        font-size: 14px;
      }
    }
    .tit {
      h1 {
      font-size: 28px;
      letter-spacing: -1.12px;
      }
      p{
        font-size: 14px;
        letter-spacing: -0.56px;
      }
    }
  }
`;

export const login_check = css`
  margin: 20px auto 40px;
  max-width: 460px;
  .MuiFormControl-root{
    width: 100%;
  }
  .MuiFormControlLabel-root{
    flex: 1;
  }
`;

export const card_Box = css`
  .confirm_tit {
    div {
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 15px;
      margin-top: 0;
    }
  }
`;

export const singTextbox = css`
  position: relative;
  display: flex;
  margin-bottom: 16px;
  justify-content: center;
  &.btntype_radio{
    position: relative;
    margin-bottom: 30px;
    width: 100%;
    .MuiFormGroup-root{
      display: flex;
      width: 100%;
    }
    .MuiRadio-root{
      width: 100%;
      background-color: none;
      height: 48px;
      border-radius: 5px;
      border: 1px solid #707070;
      &.Mui-checked{
        background-color: #4063ec;
        border: none;
        .MuiSvgIcon-root{
          display: none;
        }
      }
      .MuiSvgIcon-root{
        display: none;
      }
    }
    .MuiFormControlLabel-label{
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .MuiFormControlLabel-root{
      &:first-of-type{
        margin-right: 15px;
      }
      position: relative;
      margin-right: 0;
      flex: 1;
      text-align: center;
    }
  }
  button.rbt{
    position: absolute;
    top: 10px;
    right: 12px;
    width: 100px;
    height: 40px;
    background-color: #4063EC;
    color: #fff;
    line-height: 1;
    font-weight: 300;
  }
  span.rbt{
    position: absolute;
    top: 20px;
    right: 18px;
    color: #1CCDCC;
    font-size: 14px;
    font-weight: 300;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    label{
      font-size: 14px;
      .MuiFormControlLabel-label{
        font-size: 14px;
      }
    }
  }
`;


export const singform = css`
    width: 100%;
  .MuiTextField-root{
    margin-bottom: 16px;
  }
  .MuiFilledInput-root{
    border-radius: 5px;
    color: #fff;
    border: 1px solid #707070;
    height: 60px;
    &:before, &:after{
      border: none;
    }
    &:hover:not(.Mui-disabled):before{
      border: none;
    }
  }
  input{
    color: #fff;
    &:-webkit-autofill{
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0) !important;
      opacity: 0.3;
      color: #fff !important;
    }
  }
  .inputtxt{
    margin-top: 20px;
    width: 160px;
  }
  .MuiRadio-root{
    color: #fff;
    .MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 100%;
      path {
        display: none;
      }
    }
    &.Mui-checked {
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        margin: -5px 0 0 -5px;
        border-radius: 100%;
        background-color: #4063ec;
      }
      .MuiSvgIcon-root {
        position: relative;
        border-color: #4063ec;
        &[data-testid='RadioButtonCheckedIcon'] {
          display: none;
        }
      }
    }
  }
  .MuiInputLabel-root{
    color: #fff;
    &.Mui-focused {
      color: #fff;
    }
  }
  .MuiFilledInput-root{
    &.Mui-focused {
      color: #fff;
      border: 1px solid #fff;
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
    top: 8px;
    right: 8px;
    width: 100px;
    height: 40px;
    background-color: #4063EC;
    color: #fff;
    border-radius: 5px;
    line-height: 2.13;
    letter-spacing: -0.6px;
  }
  span.rbt{
    position: absolute;
    top: 17px;
    right: 18px;
    color: #1CCDCC;
    border-radius: 5px;
    letter-spacing: -0.64px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiInputLabel-root{
      font-size: 14px;
      line-height: 1.8;
      margin-left: 4px
    }
    input{
      font-size: 14px;
      &::placeholder{
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
`;

export const btnemail = css`
    position: relative;
    top: -64.5px;
    right: -174.5px;
    width: 100px;
    height: 40px;
    background-color: #4063EC;
    color: #fff;
`;
export const box_aralist = css`
  .MuiCardContent-root{
    padding: 30px;
    line-height: 28px;
    text-align: left;
    &:last-child{
      padding: 30px;
    }
    .info_icon{
      font-weight: 700;
      margin-left: 32px;
      font-size: 18px;
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
    ul{
      margin-top: 10px;
      letter-spacing: -0.56;
      line-height: 26px;
      li{
        &:before{
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          margin: 6px 8px 4px 0;
          background-color: #707070;
          border-radius: 10px;
        }
      }   
    }
  }
  
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiCardContent-root{
      padding: 30px;
      line-height: 28px;
      font-size: 16px;
      .info_icon{
        &:before{
          content:'';
          position: absolute;
          display: inline-block;
          background: url('/images/common/icon_info.png');
          background-size: 100%;
          width: 24px;
          height: 24px;
          margin-left: -32px;
          margin-top: 3px;
        }
      }
      ul{
        li{
          font-size: 14px;
        }   
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
    font-weight: 700;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiCardContent-root{
      padding: 30px;
      font-size: 16px;
    }
  }
`;

export const signinput = css`
  max-width: 460px;
  margin: 0 auto;
  .MuiInputLabel-root {
    color: #fff;
    .Mui-focused{
      color: #fff;
    }
  }
  .MuiTextField-root{
    margin-bottom: 16px;
    &+.MuiTextField-root{
      margin-bottom: 0;
    }
  }
`
export const linkbtn = css`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: 32px auto 30px;
> a {
  color: #ccc;
  font-size: 16px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.64px;
  border-right: 1px solid #707070;
  padding-right: 20px;
  margin-left: 20px;
  &:last-child{
    border-right: none;
  }
}
@media (min-width: 320px) and (max-width: 768px) {
  margin: 40px auto 48px;
  font-size: 14px;
}
`

export const btnGroup = css`
  justify-content: center;
  > button{
    height: 60px;
    border-radius: 40px;
    width: 220px;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5; 
    background-color: #4063EC;
    &:hover{
      box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
    } 
    &.primary{
      background-color: #4063ec;
    }
    &.linebtn {
      border: 1px solid #fff;
      background-color: #1f2437;
      &:hover{
        box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
      position: absolute;
      width: calc(100% - 30px);
      bottom: 20px;
    > button{
      font-size: 16px;
    }
  }
`;

export const signbtn = css`
  height: 60px;
  margin: 60px auto 0;
  &.btncont2{
      button{
        &:first-of-type{
        background-color: none;
        &:hover{
          box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
        }
      }
    }
  }
  button{
    font-size: 18px;
    line-height: 1;
    border-radius: 50px;
    width: 220px;
    font-weight: 400;
    box-shadow: none;
    letter-spacing: -0.72px;
    &.primary{
      background-color: #4063ec;
      &:hover{
        box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
      }
    }
    &.linebtn {
      border: 1px solid #fff;
      background-color: #1f2437;
      &:hover{
        box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 0;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #1f2437;
    z-index: 2;
    padding: 20px 15px;
    height: 100px;
    button{
      font-size: 16px !important;
      height: 60px;
      width: 100%;
      max-width: 460px;
    }
  }
`

export const login_btn = css`
  height: 60px;
  margin: 20px auto 0;
  justify-content: center;
  button{
    font-size: 18px;
    max-width: 460px;
    line-height: 1;
    border-radius: 50px;
    font-weight: 300;
    box-shadow: none;
    letter-spacing: -0.72px;
    background-color: #4063ec;
    &:hover{
      background-color: #4063ec;
      box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    button{
      font-size: 18px;
      height: 60px;
      width: 100%;
    }
  }
`

export const snsicon = css`
  margin: 30px auto 40px;
  width: max-content;
  button{
    min-width:50px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    &.kakao{background: url('/images/common/kakao.svg') no-repeat;}
    &.naver{background: url('/images/common/naver.svg') no-repeat;}
    &.google{background: url('/images/common/google.svg') no-repeat;}
  }
`

export const error = css`
  color: #fedc00;
  line-height: 16px;
  letter-spacing: -1.2px; 
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 14px;
    line-height: 14px;
  }
`
export const certify = css`
  color: #1CCDCC;
  line-height: 16px;
  letter-spacing: -1.2px; 
  text-align: left;
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 14px;
    line-height: 14px;
    letter-spacing: -0.56;
  }
`
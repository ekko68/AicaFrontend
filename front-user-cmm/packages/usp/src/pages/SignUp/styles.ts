import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
  height: 100%;
  padding-top: 60px;
  .complet_cont{
    margin-top:130px;
  }
  /* filled type input */
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
      &:valid {    
        border: 1px solid #1ccdcc;
        border-radius: 4px;
      }
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
          border-bottom-style: hidden !important;
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
  /* 전체적인 input label */
  .MuiInputLabel-root{
    font-family: Noto Sans CJK KR;
    padding-left: 6px;
    &.Mui-focused{
      color: #fff;
    }
    &.Mui-error{
      color: #fedc00;
      span.Mui-error{
        color: #fedc00;
      }
    }
  }
  button{
    font-weight: 400;
    &:hover{
      box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
    }
  }
  .MuiFormHelperText-root{
    color: #fedc00;
    font-size: 16px;
    margin: 8px auto 0 0;
    line-height: 1.8;
    &.Mui-error{
      color: #fedc00;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .complet_cont{
      margin-top: 64px;
    }
    .MuiFormHelperText-root{
      font-size: 14px;
    }
  }
`;

export const backPass = css`
  max-width: 1340px;
  height: 30px;
  position: relative;
  margin: 40px auto 0;
  padding-left: 40px;
> a {
  font-size: 16px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.64px;
  color: #fff;
    &:before{
      content:'';
      display: inline-block;
      background: url('/images/common/pass_left.png');
      width: 7px;
      height: 14px;
      margin-right: 16.5px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    display: none;
  }
`;


export const singup_cont = css`
  .singup_grid{
    .MuiGrid-item{
      margin-top: 50px; 
      padding-right: 30px;
      &:nth-of-type(-n+2){
        margin-top:0
      }
    }
  }
  @media (min-width: 320px) and (max-width: 1200px) {
    .singup_grid{
      margin: 0 15px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .singup_grid{
      .MuiGrid-item{
        margin-top: 30px; 
        padding-right: 0;
        &:nth-of-type(-n+2){
          margin-top: 30px;
        }
        &:first-of-type{
          margin-top: 0;
        }
      }
    }
  }
`;

export const step = css`
  max-width: 456px;
  margin-left: auto;
  align-items: center;
  .MuiStepLabel-label{
    letter-spacing: -1.4px;
    font-weight: 300;
    font-family: "Noto Sans CJK KR", "Roboto";
    margin-top: 10px;
  }
  .MuiStep-root{
    padding: 0;
    width: 120px;
    .Mui-active{
      color: #1CCDCC;
      border: none;
      font-weight: 300;
      .MuiStepConnector-line{
        border-color: #000;
      }
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
      .MuiStepConnector-line{
        opacity: 0.5;
      }
      .MuiStepIcon-root{
        border: 1px solid #fff;
        border-radius: 50px;
        color: rgba(0, 0, 0, 0);
      }
    }
  }
  .MuiStepConnector-root{
    left: calc(-50% + 17px);
    right: calc(50% + 17px);
    top: 17px;
  }
  .MuiStepIcon-root{
    width: 34px;
    height: 34px;
    &.Mui-completed{
      color: #000;
    }
    &.Mui-active{
      color: #1CCDCC;
    }
  }
  .MuiStepIcon-text{
    font-size: 0.6rem;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    width: 460px;
    /* &.steprt{
      margin-left: -15px;
    } */
    &.steplt{
      float: right;
      margin-right: -30px;
    }
    .MuiStep-root{
      width: 115px;
    }
    .join_head{
      flex-direction: column;
    }
    .MuiStepLabel-label{
      font-size: 13px;
      letter-spacing: -0.52px;
      margin-top: 10px;
    }
  }
`;

export const contflex = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  > div {
    flex: 0 0 64.45%;
  }
  > div + div {
    flex: 0 0 34.1%;
  }
  .MuiCardContent-root{
    padding: 0;
    margin-bottom: 15px;
  }
  .MuiCard-root{
    padding: 40px;
    text-align: center;
    letter-spacing: -1.2px;
    h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-top: 0;
      letter-spacing: -0.96px;
    }
    p {
      margin: 0;
      color: #444;
      letter-spacing: -0.64px;
    }
  }
  .MuiGrid-item{
    display: flex;
    padding-left: 0;
    flex: 0 0 50%;
    align-items: center;
    .img {
      img{
        width:100px;
        height: 100px;
      }
      margin-right: 20px;
    }
    .cont {
      > div {
        font-size: 20px;
        font-weight: 400;
        line-height: 1.6;
        letter-spacing: -0.8px;
      }
      > p {
        font-weight: 300;
        margin-bottom: 0;
        margin-top: 8px;
        line-height: 1.5;
        letter-spacing: -0.64px;
        font-weight: 300;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 1200px) {
    > div + div {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
    position: relative;
    top: 0;
    transform: translateY(0);
    > div {
      flex: 0 0 100%;
    }
    > div + div {
      flex: 0 0 100%;
      margin-top: 40px;
    }
    .MuiCard-root{
      max-width: 100%;
      h3 {
        font-size: 24px;
      }
    }
    .MuiGrid-item{
      max-width: 100%;
      margin-bottom: 0;
      .img {
        img{
          width:100px;
          height: 100px;
        }
        margin-right: 20px;
      }
      .cont {
        margin-top: 0px;
        > div {
          font-size: 18px;
          font-weight: 400;
        }
        > p {
          letter-spacing: -0.56px;
          margin-top: 8px;
          font-weight: 300;
        }
      }
    }
    .css-blhwk4-MuiGrid-root{
      flex-direction: column;
    }
    .MuiGrid-item{
      flex: 0 0 100%;
      .cont {
        > div {
          font-size: 20px;
        }
        > p {
          font-size: 14px;
        }
      }
    }
  }
`;

export const content = css`
  position: relative;
  flex-wrap: wrap;
  background-color: #1f2437;
  color: #fff;
  padding: 110px 0;
  max-width: 940px;
  margin: 0 auto;
  height: calc(100vh - 140px);
  overflow: auto;
  & .center{
    text-align: center;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
  &.heightfull{
    height: 100%;
  }
  &.w1100{
    max-width: 1130px;
    padding: 0 15px;
  }
  .tit {
    h1 {
    font-size: 48px;
    letter-spacing: -1.92px;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
    margin-bottom: 20px;
    }
    p{
      font-size: 16px;
      color: #8f929b;
      line-height: 24px;
      margin-bottom: 70px;
      letter-spacing: -0.64px;
    }
  }
  .sub_tit {
    h2 {
    font-size: 30px;
    letter-spacing: -1.2px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 16px;
    }
    p{
      font-size: 16px;
      color: #8f929b;
      line-height: 1.6;
      margin-bottom: 30px;
      letter-spacing: -0.64px;
    }
  }
  .checklable{
    .MuiFormControlLabel-label{
      font-weight: 300;
      letter-spacing: -0.64px;
    }
  }
  .confirm_tit {
    margin: 47px auto 0;
    text-align: center;
    h2 {
      font-size: 30px;
      margin-bottom: 20px;
    }
    .emsub_title{
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 40px;
      letter-spacing: -0.72px;

      .txtbox {
        font-size: 18px;
        line-height: 32px;
        color: #fff;
        margin-top: 4px;
        font-weight: 300;
        width: max-content;
        margin: 0 auto;
      }
      > em {
        color: #1CCDCC;
        font-style: normal;
        font-weight: 700;
        margin: 0 5px;
      }
    }
    div {
      margin-bottom: 10px;
      font-size: 30px;
      strong{
        color: #1CCDCC;
      }
    }
    .cli_img {
      margin-bottom: 55px;
      padding-top: 60px;
    }
    p {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 40px;
      letter-spacing: -0.56px;
      margin-top: 0;
      em {
        color: #1CCDCC;
        font-style: normal;
        font-weight: 700;
        margin: 0 5px;
      }
    }
  }
  .MuiInputLabel-root, .MuiFormControlLabel-root{
    color: #fff;
    margin-right: 0;
  }
  .MuiCheckbox-root{
    margin-right: 10px;
  }
  .join_head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
  }
  .Mui-checked{
    color: #fff;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 40px 0 100px;
    height: calc( 100vh - 60px );
    .checklable{
      margin-left: 15px;
      margin-right: 15px;
      .MuiFormControlLabel-label{
        font-size: 14px;
      }
    }
    &.heightfull{
      height: calc( 100vh - 60px );
    }
    &.w1100{
      padding: 40px 0;
    }
    .tit {
      margin: 0 15px;
      h1 {
        font-size: 28px;
        letter-spacing: -1.12px;
        margin-bottom: 13px;
      }
      p{
        font-size: 14px;
        margin-bottom: 40px;
      }
    }
    .join_head{
      display: flex;
      flex-direction: column;
      align-items: baseline;
      margin-bottom: 40px;
    }
    .sub_tit {
      h2 {
      font-size: 20px;
      margin-bottom: 12px;
      }
      p{
        font-size: 14px;
        margin-bottom: 30px;
        margin-top: 12px;
      }
    }
    
    .confirm_tit {
      margin: 40px auto 0;
      padding: 0 15px;
      h2 {
        font-size: 24px;
        margin-bottom: 35px;
      }
      .emsub_title{
        font-size: 16px;
        line-height: 30px;
        margin-bottom: 50px;
        letter-spacing: -0.56px;
        margin-top: 0;
        .txtbox {
          font-size: 14px;
          line-height: 26px;
          color: #fff;
          opacity: 0.5;
          margin-top: 10px;
        }
        > em {
          color: #1CCDCC;
          font-style: normal;
          font-weight: 700;
          margin: 0 5px;
        }
      }
      .cli_img{
        padding-top: 40px;
        margin-bottom: 20px;
      }
      .tit {
        h1 {
        font-size: 28px;
        margin-bottom: 20px;
        }
      }
      div {
        margin-bottom: 15px;
        font-size: 24px;
      }
      p {
        font-size: 15px;
        margin-bottom: 30px;
        line-height: 28px;
        letter-spacing: -0.6px;
      }
    }
    .step_scroll{
      margin-top: 7px;
      padding-bottom: 5px;
      overflow: scroll;
      width: 100%;
    }
  }
`;

export const card_Box = css`
  margin-bottom: 60px;
  max-width: 480px;
  margin: 0 auto;
  /* .MuiCardContent-root:last-child{
    padding: 30px 30px 30px 80px;
  } */
  
  .confirm_tit {
    margin: 47px auto 0;
    text-align: center;
    h2 {
      font-size: 30px;
      margin-bottom: 20px;
    }
    .emsub_title{
      text-align: center;
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 40px;
      letter-spacing: -0.72px;
      margin-top: 0;
      .txtbox {
        font-size: 18px;
        line-height: 32px;
        color: #fff;
        margin-top: 5px;
      }
      > em {
        color: #1CCDCC;
        font-style: normal;
        font-weight: 700;
        margin: 0 5px;
      }
    }
    div {
      margin-bottom: 10px;
      font-size: 30px;
      strong{
        color: #1CCDCC;
      }
    }
    img {
      margin-bottom: 55px;
    }
    p {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 18px;
      letter-spacing: -0.56px;
      margin-top: 0;
      em {
        color: #1CCDCC;
        font-style: normal;
        font-weight: 700;
        margin: 0 5px;
      }
    }
    .mintit{
      opacity: 0.5;
      font-weight: 300;
      line-height: 1.75;
      letter-spacing: -0.64px;
      text-align: center;
      color: #fff;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .confirm_tit {
      margin: 40px auto 0;
      h2 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .emsub_title{
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 35px;
        .txtbox {
          font-size: 16px;
        }
      }
      div {
        font-size: 24px;
      }
      p {
        font-size:16px;
      }
      .mintit{
        font-size: 14px;
      }
    }
  }
`;

export const box_ara = css`
  margin-bottom: 20px;
  .MuiCardContent-root{
    padding: 30px 30px 30px 80px;
    line-height: 28px;
    
    &:last-child{
      padding-bottom: 32px;
    }
  }
  &.cardstyle01{
    .MuiCard-root{
      border-radius: 20px;
    }
    .MuiCardContent-root:last-child{
      padding: 30px 30px 30px 69px;
      border-radius: 20px;
    }
    .MuiCardContent-root{
      padding: 30px 30px 30px 80px;
      line-height: 28px;
      &:last-child{
        padding-bottom: 32px;
      }
      .info_icon{
        letter-spacing: -0.56px;
        line-height: 26px;
        &:before{
          content:'';
          position: absolute;
          display: inline-block;
          background: url('/images/common/icon_info.png');
          width: 27px;
          height: 27px;
          margin-left: -40px;
          margin-top: 3px;
        }
      }
    }
  }
  dl{
    display: flex;
    line-height: 30px;
    dt{
      font-size: 18px;
      flex: 0 0 50%;
    }
    dd{
      font-size: 24px;
      font-weight: 700;
      flex: 0 0 50%;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
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
    .MuiCardContent-root{
      padding: 30px 30px 30px 67px;
      line-height: 26px;
      font-size: 14px;
    }
    &.cardstyle01{
      .MuiCard-root{
        border-radius: 10px;
      }
    }
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
`;
// 카드 박스 (계정정보카드)
export const box_ara02 = css`
  margin-bottom: 60px;
  margin-top: 40px;
  &.cardflex{
    .MuiCard-root{
      &:first-of-type{
        margin-bottom: 1px;
        border-radius: 20px 20px 0 0;
      }
      &:last-of-type{
        border-radius: 0 0 20px 20px;
      }
    }
  }
  .MuiCard-root{
    border-radius: 20px;
    .MuiCardContent-root{
      padding: 30px 30px 30px 80px;
      line-height: 1.6;
    }
  }
  
  dl{
    display: flex;
    line-height: 30px;
    dt{
      font-size: 18px;
      flex: 0 0 50%;
      color: #222;
    }
    dd{
      font-size: 24px;
      font-weight: 700;
      flex: 0 0 50%;
      margin-left: 0;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 0 15px;
    margin-bottom: 0;
    .MuiCard-root{
      border-radius: 10px;
      .MuiCardContent-root{
        padding-bottom: 10px;
        padding: 24px 24px 24px 45px;
      }
    }
    &.cardflex{
      .MuiCard-root{
        &:first-of-type{
          border-radius: 10px 10px 0 0;
        }
        &:last-of-type{
          border-radius: 0 0 10px 10px;
        }
      }
    }
    dl{
      /* padding: 15px 30px 10px; */
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

export const listboxsup = css`
  margin-bottom: 16px;
  .MuiFormControlLabel-label{
    letter-spacing: -0.56px;
    font-weight: 400;
  }
  @media (min-width: 320px) and (max-width: 768px) {
  }
`;

export const listbox = css`
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  display: block;
  position: relative;
  margin-bottom: 60px;
  .controllabel{
    letter-spacing: -0.56px;
    font-weight: 300;
    font-size: 16px;
  }
  .MuiFormControlLabel-label{
    display: none;
  }
  > div{
    flex: 0 0 50%;
    border-bottom: 1px solid #515668;
    padding: 20px 0;
    > div{
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
  span.gt{
    position:relative;
    display: inline-block;
    font-size: 14px;
    line-height: 1.4;
    margin-left: 4px;
    padding-right: 20px;
    &:after{
      content:'';
      display: inline-block;
      position: absolute;
      bottom: 3px;
      background: url('/images/common/pass_right.png') no-repeat;
      height: 13px;
      margin-left: 10px;
      padding-right: 10px;
    }
    &.blue {
      color: #1CCDCC;
    }
    &.gray {
      color: #707070;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin: 0 15px 20px;
    .controllabel{
      font-size: 14px;
    }
    .MuiFormGroup-root{
      font-size: 14px;
      > div{
        flex: 0 0 50%;
        padding: 8px 0;
      }
      .MuiFormControlLabel-label{
        font-size: 14px;
      }
    }
  }
`;

export const errbox = css`
  position: absolute;
  text-align: right;
  color: #fedc00;
  font-weight: 300;
  right: 0;
  top: 0; 
  padding-top: 25px;
  font-weight: 300;
  @media (min-width: 320px) and (max-width: 768px) {
    
  }
`;

export const modalpop = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 780px;
  background-color: #fff;
  box-shadow: 24;
  padding: 24px;
  border-radius: 20px;
  h2 {
    font-size: 20px; 
    font-weight: 700;
    font-family: Noto Sans CJK KR;
    svg{
      display: none;
    }
    > button{
      color: #707070;
      position: absolute;
      right: 24px;
      padding: 0;
      min-width: 24px;
      height: 24px;
      background: url('/images/common/icon_Xx.png') no-repeat;
      background-size: 100%;
      box-shadow: none;
    }
  }
  .scroll{
    overflow: auto;
    height: 400px;
    padding: 8px;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d7dae6;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 10px;
    }
  }
  p{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
  }
  .Box_tit{
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 16px;
    display: block;
  }
  .popup_Box{
    font-size: 14px;
    margin-bottom: 16px;
    .popsub_tit{
      margin-bottom: 8px;
    }
    .popsub_text{
      color: #707070;
      margin-bottom: 16px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    border-radius: 20px 20px 0 0;
    transform: translate(-50%, 0);
    top: auto;
    bottom: 0;
    padding: 24px 15px 20px;
    p{
      max-height: 480px;
      border-radius: 20px
    }
    h2 {
      > button{
        right: 15px;
        min-width: 24px;
        width: 24px;
      }
    }
  }
`;

export const modalbtn = css`
  height: 48px;
  margin-top: 24px;
  justify-content: center;
  button{
    font-family: Noto Sans CJK KR;
    font-size: 14px;
    line-height: 1;
    border-radius: 50px;
    width: 140px;
    height: 48px;
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
  }
`

export const singform = css`
  width: 100%;
  &.mgno{
    .MuiTextField-root{
      margin-bottom: 0;
    }
    &.lable_center{
      .MuiInputLabel-root{
        margin-top: 2px;
        margin-left: 5px;
      }
    }
  }
  .MuiTextField-root{
    margin-bottom: 16px;
    line-height: 1.8;
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
    background-color: #4063ec;
    width: 100px;
    height: 40px;
    margin-left: 12px;
    font-size: 15px;
    letter-spacing: -0.6px;
    color: #fff;
    font-weight: 300;
    border-radius: 5px;
    margin-right: -3px;
    &.block{
      background-color: #0e142a;
      color: rgba(255, 255, 255, 0.3);
      &:hover{
        box-shadow: none;
      }
    }
  }
  span.rbt{
    color: #1ccdcc;
    letter-spacing: -0.64px;
    margin-right: 6px;
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
    button.rbt{
      width: 90px;
      font-size: 14px;
    }
    span.rbt{
      font-size: 14px;
    }
  }
`;

export const singTextbox = css`
  display: flex;
  margin-bottom: 60px;
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
  @media (min-width: 320px) and (max-width: 768px) {
    display: block;
    margin: 0 15px 20px; 
    .inputtxt{
      margin-top: 0;
      margin-bottom: 20px;
    }
    .MuiInputLabel-root{
      font-size: 14px;
      padding-left: 5px;
    }
    input{
      &::placeholder{
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
`;
export const btnGroup = css`
  justify-content: center;
  margin-top: 60px;
  > button{
    height: 60px;
    border-radius: 40px;
    width: 220px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1; 
    background-color: #4063EC;
    box-shadow: none;
    &.linebtn {
      border: 1px solid #fff;
      background-color: #1f2437;
      &:hover{
        box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    > button{
      font-size: 16px !important;
      height: 52px !important;
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
    font-weight: 300;
    box-shadow: none;
    letter-spacing: -0.72px;
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
      width: 100% !important; 
      min-width: auto !important;
    }
  }
`

export const cardbtn = css`
  height: 60px;
  margin: 0 auto;
  button{
    font-size: 18px;
    line-height: 1;
    border-radius: 50px;
    width: 220px;
    font-weight: 400;
    box-shadow: none;
    letter-spacing: -0.72px;
    background-color: #4063ec;
    &:hover{
      background-color: #4063ec;
      box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
    }
  }

  @media (min-width: 320px) and (max-width: 768px) {
    button{
      font-size: 16px;
      height: 60px;
    }
  }
`

export const input_group = css`
  display: flex;
  margin-bottom: 50px;
  position: relative;
  .input_radio{
    .MuiFormControlLabel-root{
      margin-right: 60px;
      margin-left: 0;
      &:last-of-type{
        margin-right: 0;
      }
      .MuiFormControlLabel-label{
        font-weight: 300;
      }
    }
    .MuiRadio-root{
      color: #ccc;
    }
  }
  > dt {
    width: 160px;
    padding: 15px 0;
    line-height: 1;
    .input_star{
      position: absolute;
      right: 0;
      top: -32px;
      float: right;
      color: #1ccdcc;
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    &.star{
      &:after{
        content:'*';
        display: inline-block;
        width: 5px;
        height: 5px;
        margin-left: 5px;
        color: #1CCDCC;
      }
    }
  }
  > dd {
    width: 100%;
    display: flex;
    align-items: center;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    display: block;
    margin: 0 15px 40px;
    &:last-of-type{
      margin-bottom: 0;
    }
    > dt {
      padding: 0 0 15px;
      .input_star{
        top: 0;
        font-size: 12px;
      }
    }
    > dd {
      margin-left: 0;
    }
    .input_radio{
      .MuiFormControlLabel-root{
        margin-right: 40px;
      }
    }
  }
`;

export const landing = css`
  display: block;
  margin-top: 13px;
  font-weight: 700;
  letter-spacing: -0.56px;
  &:after{
    content: '';
    display: inline-block;
    background: url('/images/common/link_gt.png') 0 4px no-repeat;
    min-width: 20px;
    min-height: 20px;
    margin-left: 4px;
  }
`




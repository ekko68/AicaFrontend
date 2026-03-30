import { css } from '@emotion/react';

export const container = css`
  .full-page-controls {
    display: none;
  }
  .blue {
    color: #4063ec;
  }
  .MuiTypography-root {
    font-weight: 700;
    letter-spacing: -0.64px;
    font-family: Noto Sans CJK KR;
  }
  .MuiTypography-h2 {
    font-size: 80px;
    font-weight: 700;
    letter-spacing: -3.2px;
    line-height: 1.25;
  }
  .content {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 180px 0px 80px;
  }
  .MuiTypography-h5 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .data {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
    > em {
      font-style: normal;
      font-weight: 400;
      color: #4063ec;
    }
  }
  hr {
    margin-top: 60px;
    margin-bottom: 60px;
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    &.mt0{
      margin-top: 0;
    }
  }
  .md_btn {
    color: #fff;
    border: 1px solid #fff;
    width: 220px;
    height: 55px;
    border-radius: 0;
    margin-top: 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  .content {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .content {
      padding: 0 15px;
      width: 100%;
    }
    hr {
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .MuiTypography-h2 {
      font-size: 36px;
      line-height: 48px;
      letter-spacing: -1.44px;
    }
    .md_btn {
      display: none;
    }
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
  padding: 0;
  border-radius: 20px;
  overflow: hidden;
  outline:none;
  h2 {
    font-size: 20px; 
    font-weight: 700;
    > button{
      color: #707070;
      position: absolute;
      right: 24px;
      top: 24px;
      min-width: 24px;
      padding: 0;
    }
  }
  p{
    border-radius: 20px;
    padding: 16px;
    height: 400px;
    overflow: auto;
  }
  button {
    letter-spacing: -0.56px;
  }
  .img{
    max-width: 780px;
    height: 347px;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 340px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    /* height: calc(100% - 20px); */
    border-radius: 20px 20px 0 0;
    transform: translate(-50%, 0);
    top: auto;
    bottom: 0;
    p{
      height: calc(100% - 150px);
    }
  }
`;

export const maincont01 = css`
  position: relative;
  overflow: hidden;
  display: block;
  color: #fff;
  height: 100vh;
  /* 슬라이드 */
  .swiper-container{
    height: 100%;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets{
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 1080px;
  }
  .swiper-pagination-bullets {
    position: absolute;
    z-index: 9;
    width: auto;
    height: 20px;
    text-align: left;
    &:after {
      content: '';
      margin-left: 3px;
      padding-right: 13px;
      background: url('/images/common/stop.png') bottom no-repeat;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #fff;
      margin-right: 10px;
      opacity: 1;
      border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      background-color: #1ccdcc;
    }
  }
  /* 슬라이드 end*/
  .main_benner {
    position: relative;
    text-align: center;
    background-color: #000;
    height: 100%;
    width: 100%;
    overflow: hidden;
    > img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
    }
  }
  .main_txtbox {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    max-width: 1080px;
    width: 100%;
    display: flex;
    .main_tit {
      flex: 1;
      font-size: 80px;
      font-weight: 100;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.13;
      letter-spacing: -3.2px;
      strong {
        font-weight: 700;
      }
    }
    p {
      flex: 1;
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1.8;
      font-size: 20px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      margin-bottom: 0;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .main_txtbox {
      padding: 0 15px;
      text-align: left;
      flex-direction: column;
      .main_tit {
        font-size: 50px;
        line-height: 60px;
        margin-bottom: 40px;
        letter-spacing: -2px;
      }
      p {
        position: relative;
        line-height: 26px;
        margin-top: 0;
        font-size: 16px;
        letter-spacing: -0.64px;
        font-weight: 300;
      }
    }
    .swiper-pagination-bullets {
      text-align: left;
      bottom: 0;
      &:after {
        display: none;
      }
      .swiper-pagination-bullet {
        width: 45px;
        margin-right: 15px;
      }
    }
  }
`;

export const maincont02 = css`
  position: relative;
  height: 100vh;
  background-color: #1f2437;
  color: #fff;
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
  .MuiTypography-h2 {
    margin-bottom: 93px;
    position: relative;
    .title_icon {
      position: absolute;
      top: 15px;
      right: -79px;
      width: 83px;
      height: 100px;
      background: url('/images/main/main_titleicon01.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .content{
      padding-right: 0;
    }
    .MuiTypography-h2 {
      margin-bottom: 68px;
      position: relative;
      .title_icon {
        position: absolute;
        top: 0px;
        right: -43px;
        width: 43px;
        height: 53px;
        background: url('/images/main/main_titleicon01.png') no-repeat;
        background-size: 100%;
      }
    }
  }
`;

export const slide_cont = css`
  position: relative;
  width: 1430px;
  .swiper-slide{
    &:nth-of-type(3n+4){
      opacity: 0.5;
    }
    &.swiper-slide-active{
      opacity: 1;
    }
    &.swiper-slide-next{
      opacity: 1;
    }
  }
  .swiper-container {
    padding: 0 0 80px;
  }
  .MuiCardContent-root {
    height: 145px;
    padding: 15px 0;
  }
  .swiper-pagination-bullets {
    position: absolute;
    bottom: 0;
    display: block;
    z-index: 99;
    width: auto;
    height: 20px;
    text-align: left;
    &:after {
      content: '';
      margin-left: 3px;
      padding-right: 13px;
      background: url('/images/common/stop.png') bottom no-repeat;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #fff;
      margin-right: 10px;
      opacity: 1;
      border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      background-color: #1ccdcc;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .swiper-pagination-bullets {
      text-align: left;
      bottom: 0;
      &:after {
        display: none;
      }
      .swiper-pagination-bullet {
        width: 45px;
        margin-right: 15px;
      }
    }
    .swiper-container {
      padding: 0 0 20px;
    }
  }
`;
export const slide_cont02 = css`
  position: relative;
  .swiper-slide{
    &:nth-of-type(3n+4){
      opacity: 0.5;
    }
    &.swiper-slide-active{
      opacity: 1;
    }
    &.swiper-slide-next{
      opacity: 1;
    }
  }
  .swiper-container {
    padding: 0 5px 50px;
  }
  .swiper-pagination-bullets {
    position: absolute;
    bottom: 0;
    display: block;
    z-index: 99;
    width: auto;
    height: 20px;
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #ccc;
      margin-right: 10px;
      opacity: 1;
      border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      background-color: #1ccdcc;
    }
  }
  .MuiCard-root-hotslide .MuiTypography-root {
    color: #000;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
  }
`;
export const slide_cont03 = css`
  position: relative;
  width: 1430px;
  .swiper-slide{
    &:nth-of-type(3n+5){
      opacity: 0.5;
    }
    &.swiper-slide-active{
      opacity: 1;
    }
    &.swiper-slide-next{
      opacity: 1;
    }
  }
  .swiper-container {
    padding: 0 5px 50px;
  }
  .swiper-pagination-bullets {
    position: absolute;
    bottom: 0;
    text-align: left;
    display: block;
    z-index: 99;
    width: auto;
    height: 20px;
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #ccc;
      margin-right: 10px;
      opacity: 1;
      border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      background-color: #1ccdcc;
    }
  }
  .MuiCard-root-hotslide .MuiTypography-root {
    color: #000;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
  }
`;
export const hotslide = css`
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 15px;
  color: #fff;
  max-width: 380px;
  box-shadow: none;
  .black {
    color: #222;
  }
  .sub_txt {
    color: #8f929b;
    line-height: 1;
    font-size: 14px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    margin: 7px 0;
    &.sub2{
      color: #fff;
    }
  }
  .MuiTypography-root {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -1.2px;
  }
  .tag {
    position: absolute;
    top: 0;
    z-index: 2;
    justify-content: space-between;
    width: 100%;
    .wh {
      background-color: #fff;
      color: #333;
      border-radius: 0 15px 0 10px;
    }
    .blue {
      background-color: #4063ec;
      color: #fff;
      border-radius: 15px 0 10px 0;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h5 {
      font-size: 22px;
    }
    .MuiSelect-select {
      font-size: 14px;
    }
    .MuiTypography-root {
      font-size: 16px;
      letter-spacing: -0.64px;
    }
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
    .sub_txt {
      margin-top: 8px;
      margin-bottom: 0;
      font-weight: 300;
      &.sub2{
        margin-top: 2px;
      }
    }
  }
`;

export const maincont03 = css`
  position: relative;
  height: 100vh;
  background-color: #f5f5f5;
  .MuiTypography-h2 {
    padding-bottom: 430px;
  }
  img.char01 {
    position: absolute;
    top: 260px;
  }
  .hotslide {
    .MuiTypography-root {
      color: #333;
    }
  }
  .MuiCardMedia-root{
    height: 200px;
    border-radius: 15px;
    border: 1px solid #ccc;
  }
  .off{
    display: none;
  }
  .comfuny_table{
    
  }
  @media (min-width: 320px) and (max-width: 768px) {
    height: 1395px;
    .content{
      margin-top: 38px;
    }
    img.char01 {
      display: none;
    }
    .MuiTypography-h2 {
      padding-bottom: 0;
    }
  }
`;

export const stack = css`
  justify-content: space-between;
  flex-direction: row;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const radioBox = css`
  .txt {
    margin-top: 0;
    font-size: 20px;
    color: #666;
    margin-bottom: 55px;
    line-height: 1.7;
    letter-spacing: -0.8px;
    font-weight: 400;
  }
  dl {
    display: flex;
    padding-bottom: 60px;
    position: relative;
    &.arrow {
      padding-bottom:90px;
      &:after {
        content: '';
        position: absolute;
        width: 40px;
        height: 20px;
        left: 257px;
        bottom: 40px;
        background: url(/images/common/row.png) bottom no-repeat;
      }
    }
    dt {
      span {
        display: block;
        font-size: 13px;
        color: #4063ec;
        margin-bottom: 5px;
        font-weight: 300;
      }
      strong {
        font-size: 22px;
      }
    }
    dd {
      max-width: 480px;
      .MuiFormControlLabel-root {
        &:nth-of-type(n+4){
          margin-top: 20px;
        }
      }
      &.center {
        .MuiFormControlLabel-label {
          padding: 25px 0;
        }
      }
    }
  }
  .MuiFormGroup-root {
    flex-direction: row;
    .MuiButtonBase-root {
      display: none;
    }
  }
  .MuiFormControlLabel-label {
    margin-left: 15px;
    text-align: center;
    width: 140px;
    height: 80px;
    line-height: 1.6;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    padding: 13px 0;
    font-weight: 400;
    letter-spacing: -0.64px;
    > div {
      span {
        display: block;
        font-size: 14px;
        color: #707070;
        font-weight: 300;
        letter-spacing: -0.56px;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 0;
    .txt {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 40px;
      margin-top: 0;
      letter-spacing: -0.64px;
    }
    dl {
      flex-direction: column;
      padding-bottom: 15px;
      &.arrow {
        padding-bottom: 70px;
        &:after {
          width: 22px;
          height: 12px;
          left: 50%;
          transform: translateX(-50%);
          bottom: 30px;
        }
      }
      dt {
        strong {
          font-size: 20px;
        }
      }
      dd {
        margin-top: 15px;
        margin-left: 0;
        .MuiFormControlLabel-label {
          padding: 12px 0;
          font-size: 14px;
          line-height: 1.2;
          height: 60px;
          width: 100%;
          margin-left: 0;
        }
        .MuiFormControlLabel-root {
          margin-bottom: 15px;
          margin-left: 0;
          width: 47.4%;
          &:nth-of-type(n+4){
            margin-top: 0;
          }
          &:nth-of-type(2n){
            margin-right: 0;
          }
        }
        &.center {
          .MuiFormControlLabel-label {
            padding: 20px 0;
          }
        }
      }
    }
  }
`;

export const maincont04 = css`
  position: relative;
  overflow: hidden;
  display: flex;
  height: 100vh;
  background-color: #4063ec;
  color: #fff;
  > div {
    position: relative;
    flex: 0 0 50%;
    img {
      height: 100%;
    }
    &:first-of-type {
      position: relative;
    }
    .content {
      max-width: 630px;
      left: auto;
      right: 0;
      transform: translateY(-50%);
    }
  }
  .sub_txt01 {
    color: #c6d0f9;
    font-size: 20px;
    line-height: 34px;
    margin-bottom: 95px;
    letter-spacing: -0.8px;
    font-weight: 400;
  }
  .sub_txt02 {
    color: #fff;
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 75px;
    letter-spacing: -0.8px;
    font-weight: 400;
    .em {
      color: #a0b1f6;
      display: block;
      font-size: 14px;
    }
  }
  .count {
    color: #c6d0f9;
    b {
      color: #fff;
    }
  }
  .MuiTypography-h4 {
    font-size: 40px;
    display: flex;
    > div {
      width: 160px;
      margin: 30px 0 10px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -1.6px;
      &:after {
        content: '';
        padding-right: 15px;
        margin-left: 13px;
        background: url('/images/main/main_gt.png') 0 54% no-repeat;
      }
    }
  }
  hr {
    border-top: 1px solid #4fdfc5;
    margin-top: 60px;
    margin-bottom: 20px;
    margin-left: 39px;
  }
  .MuiTypography-h2 {
    position: relative;
    margin-bottom: 20px;
    .title_icon {
      position: absolute;
      top: 104px;
      left: 212px;
      width: 113px;
      height: 91px;
      background: url('/images/main/main_titleicon02.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
    height: 832px;
    > div {
      flex: 0 0 40%;
      height: 100%;
      &:first-of-type {
        flex: 0 0 60%;
        padding-top: 50px;
      }
      .content {
        max-width: 100%;
      }
      img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: auto;
      }
    }
    .sub_txt01 {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 50px;
    }
    .sub_txt02 {
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 50px;
      .em {
        font-size: 13px;
      }
    }
    .count {
      margin-bottom: 0;
    }
    .MuiTypography-h4 {
      font-size: 28px;
      display: flex;
      > div {
        width: 150px;
        margin: 24px 0 34px;
      }
    }
    hr {
      display: none;
    }
    .MuiTypography-h2 {
      position: relative;
      .title_icon {
        top: 3px;
        left: 202px;
        width: 54.5px;
        height: 44.1px;
        background-size: 100%;
      }
    }
  }
`;

export const back_slide = css`
  .swiper-container {
    position: absolute;
    height: 100vh;
    width: 100vh;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    position: absolute;
    bottom: 7%;
    left: -635px;
    display: block;
    z-index: 99;
    width: auto;
    height: 20px;
    &:after {
      content: '';
      padding-right: 13px;
      margin-left: 3px;
      background: url('/images/common/stop.png') bottom no-repeat;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #fff;
      margin-right: 10px;
      margin-left: 0;
      opacity: 1;
      border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      background-color: #1ccdcc;
    }
  }
  // 슬라이드 화살표 영역
  .swiper-button-next:after,
  .swiper-button-prev:after {
    display: none;
  }
  .swiper-button-next {
    left: -80px;
    bottom: 7%;
    top: auto;
    background: url('/images/common/next01.png') no-repeat;
    width: 8px;
    height: 13px;
  }
  .swiper-button-prev {
    left: -105px;
    bottom: 7%;
    top: auto;
    background: url('/images/common/prev01.png') no-repeat;
    width: 8px;
    height: 13px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .swiper-container {
      height: 100%;
      width: 100%;
      text-align: center;
      .swiper-slide {
        overflow: hidden;
      }
    }
    .swiper-container-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-custom,
    .swiper-pagination-fraction {
      bottom: 110%;
      left: 20px;
      width: auto;
      height: 20px;
      .swiper-pagination-bullet {
        width: 45px;
        margin-right: 10px;
        border-radius: 0;
      }
    }
  }
`;

export const maincont05 = css`
  position: relative;
  height: 100vh;
  background-color: #1f2437;
  color: #fff;
  .MuiTypography-h2 {
    position: relative;
    margin-bottom: 0;
    > span {
      color: #6e7384;
    }
    .title_icon {
      position: absolute;
      top: 0;
      right: -46px;
      width: 130px;
      height: 140px;
      background: url('/images/main/main_titleicon03.png') no-repeat;
    }
  }
  .right_cont {
    width: 50%;
    .btn {
      justify-content: end;
      > button {
        display: block;
        height: 56px;
        width: 220px;
        border-radius: 0;
        line-height: 1.5;
        color: #fff;
        border: 1px solid #fff;
        background-color: #1f2437;
      }
    }
  }
  .MuiTypography-h4 {
    font-size: 40px;
    display: flex;
    margin-top: 100px;
    margin-bottom: 40px;
    font-weight: 700;
    letter-spacing: -1.6px;
  }
  .sub_txt01 {
    font-size: 20px;
    opacity: 0.7;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.8px;
    text-align: left;
    color: #fff;
    margin-bottom: 55px;
    margin-top: 10px;
  }
  .sub_txt02 {
    font-size: 20px;
    color: #fff;
    margin-bottom: 55px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: -0.8px;
    padding-right: 100px;
  }
  .em {
    opacity: 0.5;
    font-size: 16px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: -0.64px;
    text-align: left;
    color: #fff;
  }
  .txt_box {
    flex: 0 0 50%;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h2 {
      margin-right: 0;
      .title_icon {
        top: -8px;
        right: -30px;
        width: 65px;
        height: 65px;
        background-size: 100%;
      }
    }
    .right_cont {
      width: 100%;
      .btn {
        justify-content: start;
        > button {
          height: 48px;
          width: 165px;
          line-height: 1.5;
          font-size: 15px;
        }
      }
    }
    .MuiTypography-h4 {
      margin-top: 60px;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .sub_txt01 {
      font-size: 16px;
      line-height: 26px;
      margin-bottom: 24px;
      padding-left: 0;
    }
    .sub_txt02 {
      font-size: 14px;
      line-height: 26px;
      margin-bottom: 12px;
      letter-spacing: -0.56px;
    }
    .em {
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    .txt_box {
      flex: 0 0 100%;
    }
  }
`;

export const main05_slide = css`
  flex: 0 0 50%;
  position: relative;
  margin-top: 80px;
  .swiper-container {
    width: 790px;
    height: 360px;
    margin-right: -170px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    opacity: 0.5;
    &.swiper-slide-active{
      opacity: 1;
    }
    .MuiCard-root{
      border-radius: 20px;
      background-color: none;
    }
    img {
      height: 100%;
    }
  }
  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    position: absolute;
    bottom: 5%;
    left: -665px;
    display: block;
    z-index: 99;
    width: auto;
    height: 20px;
    &:after {
      content: '';
      padding-right: 13px;
      margin-left: 3px;
      background: url('/images/common/stop.png') bottom no-repeat;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #fff;
      margin-right: 10px;
      border-radius: 0;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background-color: #1ccdcc;
    }
  }
  // 슬라이드 화살표 영역
  .swiper-button-next:after,
  .swiper-button-prev:after {
    display: none;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex: 0 0 100%;
    margin-top: 0;
    .swiper-container {
      height: 196px;
      width: 300px;
      margin: 0;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-custom,
    .swiper-pagination-fraction {
      bottom: -10%;
      left: 0;
      width: 100%;
      height: 20px;
      text-align: left;
      .swiper-pagination-bullet {
        display: inline-block;
        width: 40px;
        height: 2px;
        background-color: #fff;
        margin-right: 10px;
        border-radius: 0;
      }
      .swiper-pagination-bullet-active {
        background-color: #1ccdcc;
      }
    }
    // 슬라이드 화살표 영역
    .swiper-button-next:after,
    .swiper-button-prev:after {
      display: none;
    }
  }
`;

export const btnstyle = css`
  button {
    border-radius: 0;
    font-weight: 700;
    font-size: 16px;
    padding: 16px 36px;
    letter-spacing: -0.4px;
  }
  button.lg {
    min-width: 200px;
  }
  button.md {
    border-radius: 4px;
    font-weight: 300;
    padding: 8px 16px;
  }
  .blue {
    background-color: #4063ec;
  }
  .gray {
    background-color: #adaeb2;
  }
  .gray:hover {
    background-color: #9b9b9b;
  }
  .sky {
    background-color: #ebeffd;
    color: #4063ec;
  }
  .sky:hover {
    background-color: #d4deff;
  }
`;
export const link = css`
  a {
    color: blue;
  }
`;

export const btnGroup = css`
  justify-content: center;
  &.btnpop_group{
    padding: 24.5px;
  }
  > button {
    display: block;
    height: 60px;
    border-radius: 40px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    background-color: #4063ec;
    &.linebtn {
      border: 1px solid #fff;
      background-color: #1f2437;
    }
    &.linebtnpop {
      border: 1px solid #4063ec;
      background-color: #fff;
    }
    &.green {
      background-color: #1ccdcc;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    > button {
      font-size: 18px;
    }
  }
`;

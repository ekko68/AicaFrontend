import { css } from '@emotion/react';
export const container = css`
  padding-top: 120px;
  padding-bottom: 120px;
  .content {
    position: relative;
    max-width: 1260px;
    width: 100%;
    min-height: 239px;
    margin: 0 auto;
  }
  .txtblue {
    color: #4063ec;
  }
  .grid_list{
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    .MuiGrid-root{
      min-width: 320px;
    }
  }
  .ai_startup{
    .sub_tit{
      &.mt60{
        margin-top: 60px;
      }
      .MuiTypography-root{
        
      }
    }
    .biz_list{
      margin-bottom: 60px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    padding-top: 60px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 0;
    padding-top: 60px;
    padding-bottom: 80px;
    .sub_tit{
      padding: 0;
    }
  }
`;
export const swiper = css`
  img {width:100%}
  margin-top:47px;
  .swiper-button-next,.swiper-button-prev{
    &:after{color:#fff;font-size:25px;}
  }
  
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 20px;
    .swiper-button-next,.swiper-button-prev{
    &:after{font-size:20px;}
  }
  }
`;
export const facilityIntro = css`
  h4{margin-top:10px;}
  @media (min-width: 320px) and (max-width: 768px) {
    h4{margin-top:40px;}
    .tableDefault{
      th,td{padding-top:20px;padding-bottom:20px;font-size:14px;line-height:28px;}
    }
  }
`;

export const thumb_list = css`
  margin-top: 54px;
  .MuiGrid-item {
    position:relative;
    width:100%;
    flex-basis: 23.81%;
    margin-bottom: 40px;
    margin-left: 20px;
    &:nth-of-type(4n+1){margin-left:0;}
    img{display:block;width:100%;}
    .MuiTypography-h6{
      font-size: 18px;
    }
  }
  .ongoing{
    position: absolute;
    right:0;
    top:0;
    width:52px;
    height:29px;
    line-height:26px;
    font-size: 12px;
    color:#fff;
    text-align: center;
    background-color: #4063ec;
    border-radius: 0 10px 0 10px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiGrid-item {
      flex-basis: 100%;
      margin-left: 0;
    }
  }
`;
// 더보기 버튼 컴포넌트랑 같이
export const bottom_btn = css`
  button{
    margin-top: 0;
    &:after {
      content: '';
      background: url('/images/common/arr_row.png') no-repeat;
      width: 12px;
      height: 6px;
      margin-left: 16px;
      background-size: 100%;
    }
  }
  @media (min-width: 320px) and (max-width: 780px) {
    margin: 0 15px;
    &.mg0{
      margin: 0;
    }
    button{
      font-size: 13px !important;
      &:after {
        width: 10px;
        height: 5px;
      }
    }
  }
`;


export const sub_cont01 = css`
  position: relative;
  display: block;
  color: #fff;
  transition: 0.5s;
  &.fixed{
    position: fixed;
    width: 100%;
    z-index: 3;
    &.scrollaction{
      transform: translate(0, -61px);
      .content{
        min-height: 150px;
        padding: 20px 0 0;
      }
      .txtbox {
        .tit{
          font-size: 40px;
        }
        p{
          display: none;
        }
      }
      .input_w{
        display: none;
      }
    }
  }
  .detailtab_02{
    width: 100%;
    background-color: #fff;
    height: 80px;
    width: 100%;
    position: relative;
    .scrollTab{
      &.pc{
        margin: 0 auto;
      }
      max-width: 1260px;
      
    }
  }
  .sub_tit .case > span{
    color: #4063ec;
    font-weight: 500;
    margin-right: 2px;
  }
  .tab_wrap .MuiButtonBase-root em{
    font-weight: 500;
    margin-left: 4px;
  }
  .benner {
    text-align: center;
    background-color: #1f2437;
    width: 100%;
    overflow: hidden;
    height: 100%;
    transition: transform 0.5s;
  }
  .txtbox {
    margin: 0 auto;
    max-width: 1080px;
    width: 100%;
    .tit {
      transition: 0.5s;
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-top: 8px;
    }
    p {
      line-height: 1.8;
    }
  }

  .bottom_card {
    height: 60px;
    max-width: 1260px;
    width: 100%;
    padding: 14px 18px 14px 20px;
    margin: 0 auto;
    border-radius: 15px 15px 0 0;
    background-color: #f5f5f5;
    > p {
      line-height: 1.75;
      font-family: Noto Sans CJK KR;
      margin: 4px 0;
      font-weight: 700;
      color: #222;
      letter-spacing: -0.64px;
    }
    .tag {
      .MuiChip-root {
        border-radius: 5px;
        font-size: 14px;
        &.blue {
          background-color: #4063ec;
          color: #fff;
        }
        &.wh {
          background-color: #fff;
          color: #707070;
          border: 1px solid #ccc;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    &.fixed{
      .benner{
        top:60px;
        min-height: 60px;
        .content{
          min-height:auto;
          height:53px;
          .txtbox{
            display: none;
          }
        }
      }
      .content_body{
        .scrollTab{
          top:120px;
          left:0;
          right:0;
          width:auto;
          button{
            margin: 0 15px;
          }
        }
      }
    }
    .benner {
      .content{min-height:177px;padding: 48px 0 0;}
    }
    .tab_wrap {
      width:100%;
      .MuiTabs-root{
        min-height: 40px;
      }
      .MuiButtonBase-root{
        min-width: 73px;
        min-height: 40px;
        padding: 0 24px;
        font-size: 14px;
        font-weight: 300;
        letter-spacing: -0.56px;
        /* &:first-of-type{margin-left:15px;} */
      }
    }
    .txtbox {
      .tit {
        font-size: 28px;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        line-height: 2;
      }
    }
    .bottom_card {
      height: 48px;
      padding: 9px 15px 9px 15px;
      > p {
        margin: 4px 0;
        letter-spacing: -0.56px;
        font-size: 14px;
        line-height: 1.5;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 10px;
      }
      .tag {
        .MuiChip-root {
          font-size: 12px;
          height: 30px;
        }
      }
    }
    .sub_tit {
      .MuiTypography-root{
        font-size: 24px;
        margin-bottom:20px;
      }
    }
  }
`;
export const step02 = css`
  max-width: 342px;
  margin: 30px auto 0;
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
    }
    &.Mui-completed{
      &+.MuiStep-root{
        .MuiStepConnector-line{
          border-color: #0c101e;
        }
      }
    }
    .Mui-disabled{
      color: #ccc;
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
      color: #0c101e;
    }
    &.Mui-active{
      color: #1CCDCC;
    }
  }
  .MuiStepIcon-text{
    font-size: 0.6rem;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
    .css-nen11g-MuiStack-root{
      flex-direction: column;
    }
  }
`;

export const box_reserve_guide = css`
  padding:30px;
  background-color: #f5f5f5;
  li{
    margin-top: 6px;
    letter-spacing: -0.56px;
    &:first-of-type{margin-top:0;}
    &:before{
      content: "• ";
      color: #707070;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 15px;
    li{font-size:14px;text-indent: -10px;padding-left: 10px;line-height: 26px;}
  }
`;

export const table = css`
  max-width: 100%;
  letter-spacing: -0.64px;
  .MuiTypography-h6{
    font-size: 18px;
    margin-bottom: 15px;
  }
  .detail_table{
    border-top: 1px solid #1f2437;
    margin-bottom: 40px;
  }
  dl {
    display: flex;
    border-spacing: 0;
    width: 100%;
    & .noline{
      border-bottom: none;
    }
    dt {
      display: flex;
      align-items: center;
      flex: 0 0 220px;
      padding: 20px 20px;
      text-align: left;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      &.wh{
        background-color: #fff;
      }
    }
    dd {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 18px 20px;
      line-height: 1.75;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      margin-left: 0;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h6{
      font-size: 16px;
      margin-bottom: 10px;
    }
    .detail_table{
      margin-bottom: 30px;
    }
    dl {
      flex-wrap: wrap;
      dt {
        flex: 0 0 35%;
        padding: 15px 18px;
      }
      dd {
        flex: 0 0 65%;
        padding: 15px 18px;
      }
      &.horz{
        flex-direction: column;
        dt{
          border-bottom: 0;
          justify-content: center;
        }
        dd{
          padding:0 8px;
        }
      }
    }
  }
`;

export const datepicker = css`
  padding: 0 20px;
  .MuiPickerStaticWrapper-content{
    >div{
      >div{
        width:100%;
        max-height: 480px !important;
      }
    }
    .MuiCalendarPicker-root {
      position: relative;
      width:100%;
      max-height: 100% !important;
      >div{
        &:first-of-type{
          padding-left: 180px;
          padding-right: 184px;
        }
      }
      [role="presentation"]{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        font-size: 24px;
        font-weight: 700;
      }
      .MuiPickersArrowSwitcher-root{
        width:100%;
        justify-content: space-between;
      }
      .MuiTypography-caption{
        width:14.2%;
        font-size: 14px;
      }
      .PrivatePickersSlideTransition-root{
        [role='cell']{
          width:14.2%;
          height: 60px;
          text-align: center;
          .MuiPickersDay-root{
            width:60px;
          }
          button{
            &.disabled{
              opacity:.2;
            }
            &.selected{
              color:#1ccdcc;
            }
          }
          &:first-of-type{
            button{
              color: #ee1a1a;
            }
          }
          &:last-child{
            button{
              color: #4063ec;
            }
          }
        }
        .MuiPickersDay-root{
          width: 100%;
          height: 100%;
          font-size: 16px;
          font-weight: 700;
          &.Mui-selected{
            color: #fff !important;
          }
          &.MuiPickersDay-today{
            border:0;
            color:#1ccdcc;
          }
        }
      }
      .PrivatePickersSlideTransition-root{
        min-height: 380px;
      }
    }
  }
  .legend {
    padding-top: 20px;
    border-top:1px solid #e0e0e0;
    span {
      margin-right: 20px;
      &:before{
        content: "";
        display: inline-block;
        width:20px;
        height:20px;
        margin-right: 8px;
        vertical-align: middle;
        border-radius: 100%;
      }
      &.closed{
        &:before{
          background-color:#e0e0e0;
        }
      }
      &.selected{
        &:before{
          background-color:#4063ec;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 0;
    width: 100%;
    .MuiPickerStaticWrapper-content{
      .MuiCalendarPicker-root {
          >div{
          &:first-of-type{
            padding-left: 60px;
            padding-right: 60px;
          }
        }
        .PrivatePickersSlideTransition-root{
          min-height: auto;
          [role='cell']{
            height: 40px;
            text-align: center;
            .MuiPickersDay-root{
              width:40px;
            }
          }
        }
      }
    }
    .legend {
      margin-top:20px;
      margin-bottom: 60px;
    }
  }
`;
export const datepicker_desc = css`
  .title{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid #e0e0e0;
    span {
      color: #4063ec;
      margin-right: 20px;
    }
  }
  .title_sub {
    font-size: 18px;
    font-weight: 700;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .title{
      font-size: 16px;
      span{
        font-size: 24px;
      }
    }
    .MuiButton-root{
      width:100% !important;
      font-weight: normal !important;
      font-size: 14px !important;
    }
    .title_sub {
      font-size: 16px;
    }
  }
`;
export const btn_next = css`
  button{
    font-weight: normal !important;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    button{
      font-size: 16px !important;
      width: 100% !important;
      height: 52px !important;
    }
  }
`;
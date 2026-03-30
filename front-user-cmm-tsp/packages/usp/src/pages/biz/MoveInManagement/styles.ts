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
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 0;
    padding-top: 60px;
    padding-bottom: 80px;
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
export const fileupload = css`
  >div{
    flex-wrap: wrap;
    justify-content: left;
    .MuiButton-root:first-of-type {
      margin-right: 10px;
    }
  }
  
`;

export const signbtn = css`
  margin: 40px auto 0;
  padding-top: 40px;
  border-top: 1px solid #e0e0e0;
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
    width: 140px;
    height: 60px;
    font-weight: 300;
    box-shadow: none;
    letter-spacing: -0.72px;
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
    margin-top: 0%;
    border-top: 0;
    button{width:100%;height:52px;}
  }
`
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
    margin: 50px 0 0;
    &:after {
      content: '';
      background: url('/images/common/arr_row.png') no-repeat;
      width: 12px;
      height: 8px;
      margin-left: 10px;
    }
    @media (min-width: 320px) and (max-width: 768px) {
      margin-top: 0;
    }
  }
`;
export const sub_cont01 = css`
  position: relative;
  display: block;
  color: #fff;
  &.fixed{
    .benner{
      width: 100%;
      position: fixed;
      z-index: 2;
      height: 149px;
      overflow: hidden;
      top: 80px;
      .content{
        min-height: 149px;
        padding: 30px 0;
      }
      .txtbox {
        .tit{
          font-size: 40px;
        }
        p{
          margin-top: 100px;
        }
      }
    }
    .content_body{
      .scrollTab{
        position:fixed;
        top:229px;
        width:1260px;
        margin-top: 0;
        background-color: #fff;
        z-index:10;
      }
      .sub_tit{margin-top:40px;}
    }
  }
  .benner {
    text-align: center;
    background-color: #1f2437;
    width: 100%;
    .content{min-height:239px;}
  }
  .txtbox {
    margin: 0 auto;
    max-width: 1080px;
    width: 100%;
    .tit {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    p {
      line-height: 1.8;
      font-weight: 300;
    }
  }
  .textfield_tp01 {margin-top:0 !important;}
  .datepicker {
    &>div{margin:0;}
  }
  .fileupload {
    &>div{flex-wrap: wrap;padding:0;
    }
    .MuiButton-root {
      min-width:98px !important;
      height:48px !important;
      margin-left: 0 !important;
      margin-right:10px;
      border-radius: 40px !important;
    }
    .MuiButtonBase-root{
      margin-bottom: 10px;
      min-width:98px !important;
      height:48px !important;
      margin-left: 0;
      margin-right:10px;
      border-radius: 40px !important;
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
    .fileupload{
      .MuiButton-textPrimary {margin-right:100%;}
    }
    &.fixed{
      .benner{
        top:60px;
        height: 53px;
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
          top:113px;
          left:15px;
          right:15px;
          width:auto;
        }
      }
    }
    .benner {
      .content{min-height:177px;padding: 48px 0 79px;}
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
        &:first-of-type{margin-left:15px;}
      }
      &.triple {
        .MuiButtonBase-root{
          min-width:31%;
        }
      }
    }
    .txtbox {
      .tit {
        font-size: 28px;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        line-height: 26px;
        padding:0 15px;
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
export const btn_plus = css`
  .MuiButtonBase-root{position:relative;bottom:10px;right:-10px;}
  @media (min-width: 320px) and (max-width: 768px) {
    align-items: flex-end;
    .MuiButtonBase-root{bottom:0;}
  }
`;

export const textfieldBox = css`
  width: 100%;
  .MuiTextField-root{
    width: 100%;
    &.scrollBox{
      .MuiOutlinedInput-root{
        padding: 6px;
        textarea{
          font-family: "Noto Sans CJK KR", "Roboto";
          padding: 9px;
        }
      }
    }
  }
  textarea{
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
    > div {
      margin-bottom: 10px;
    }
    .MuiRadio-root {
      padding: 5px;
    }
    .MuiFormControlLabel-root{
      margin-right: 0;
      margin-bottom: 10px;
      padding-left: 5px;
    }
  }
  .count{
    margin-top: 8px;
    text-align: right;
    font-size: 16px;
    color: #666;
    font-weight: normal;
    letter-spacing: normal;
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
      font-weight: 400;
      &.wh{
        background-color: #fff;
      }
    }
    dd {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 6px 20px;
      line-height: 1.75;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      margin-left: 0;
      font-weight: 400;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
      .textfield_tp01 .MuiInputBase-root {min-height:120px}
    }
    .withLink{
      justify-content: flex-start;
      a {margin-left:10px;padding-right:15px;color:#4063ec;font-weight:400;background:url(/images/common/gt_blue.png) no-repeat right center;}
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h6{
      font-size: 16px;
      margin-bottom: 10px;
    }
    .detail_table{
      margin-bottom: 30px;
      &.status {
        dd{
          &.withLink{
            &>div{
              flex-direction: column;
              align-items: flex-start;
              .MuiButton-root{margin-top:10px;}
            }
          }
        }
      }
    }
    dl {
      flex-wrap: wrap;
      dt {
        height:60px;
        flex: 0 0 35%;
        padding: 15px 18px;
        font-size: 14px;
      }
      dd {
        flex: 0 0 65%;
        padding:6px 20px;
        font-size: 14px;
      }
      &.horz{
        flex-direction: column;
        dt{
          border-bottom: 0;
          justify-content: center;
        }
        dd{
          padding:8px;
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

export const inputBox = css`
  position: relative;
  display: flex;
  flex-direction: row;
  .inputtxt{
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.67;
    letter-spacing: -0.72px;
    font-weight: 700;
    & em{
      color: #1ccdcc;
      margin-left: 4px;
    }
  }
  label{
    color: #222;
    &.Mui-focused {
      color: #222;
    }
  }
  .MuiFormControl-root {margin-left:8px;}
  .MuiSelect-select {padding-top: 13px;padding-bottom: 12px;}
  .MuiOutlinedInput-root {
    color: #222;
    fieldset {
      border-color: #ccc;
    }
    &:hover{
      fieldset {
        border-color: #1976d2;
      }
    }
  }
  .MuiFormLabel-asterisk{
    color: #1CCDCC;
  }
  textarea{
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d7dae6;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 10px;
    }
    > div {
      margin-bottom: 10px;
    }
    .MuiRadio-root {
      padding: 5px;
    }
    .MuiFormControlLabel-root{
      margin-right: 0;
      margin-bottom: 10px;
      padding-left: 5px;
    }
  }
  .count{
    margin-top: 8px;
    text-align: right;
    font-size: 14px;
    color: #666;
  }
  Button{
    margin: 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    width:50%;
    &:first-of-type{margin-right:10px;}
    .MuiFormControl-root {
      width:100%;
      margin-left:0;
      .MuiOutlinedInput-root{
        width:100%;
        &:nth-of-type(2){margin-top:8px;}
      }
    }
    label{
      font-size: 14px;
    }
    input {
      padding: 15px 14px;
    }
    .inputtxt{
      font-size: 16px;
    }
    .css-7gyhhp-MuiStack-root-deletTag>:not(style)+:not(style) {
        margin-left: 0;
    }
    
  }
`;

export const selectBox = css`
  border:1px solid #e0e0e0;
  border-radius: 5px;
  padding:30px;
  .tbl_title {margin-bottom:10px;}
  .item1{
    width:18%;
  }
  .item2{
    width:18%;
    margin:0 1.6%;
    .MuiSelect-select {height:31px;}
  }
  .MuiButton-root{
    align-self: flex-end;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 20px;
    flex-direction: row;
    .item1{width:100%;}
    .item2{width:100%;margin:0 3%;}
    .MuiButton-root {align-self:flex-end;min-width:85px;}
  }
`;

// 파일 다운로드 버튼
export const btnDown = css`
  justify-content: center;
  flex-direction: row;
  gap:10px;
  button {
    min-width: 124px;
    height: 48px;
    border-radius: 24px;
    padding: 14px 20px;
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    border: solid 1px #ccc;
    color: #333;
    letter-spacing: -0.56px;
    font-weight: 400;
    > span {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:before {
      content: '';
      width: 20px;
      height: 20px;
      margin-right: 6px;
      background: url('/images/common/icon_download.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
    padding:10px 0;
    gap:10px;
    button {
      > span {
        max-width: 200px;
      }
    }
  }
`;

export const attatchedFile = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding:24px 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  >div{
    &:first-of-type{padding-left:0;}
    padding-left:6px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin:0 -15px;
    padding:20px 15px;
    border-radius: 0;
    >div{
      flex-wrap: wrap;
      justify-content: left;
      padding-left:0;
    }
  }
`
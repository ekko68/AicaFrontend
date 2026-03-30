import { css } from '@emotion/react';
export const container = css`
  padding-top: 120px;
  padding-bottom: 120px;
  .content {
    position: relative;
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
  }
  .txtblue {
    color: #4063ec;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    padding-top: 60px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 0;
    padding-top: 60px;
    padding-bottom: 80px;
  }
`;

export const tagstyle = css`
  position: relative;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  .MuiChip-root {
    margin-left: 10px;
    border-radius: 5px;
    &:first-of-type {
      margin-left: 0;
    }
  }
  .wh {
    background-color: #fff;
    color: #333;
  }
  .blue {
    background-color: #4063ec;
    color: #fff;
  }
  .green {
    background-color: #1ccdcc;
    color: #fff;
  }
`;

export const qna_list = css`
  margin: 0 auto;
  max-width: 1260px;
  .sub_tit {
    .MuiTypography-root {
      font-size: 28px;
      font-weight: 700;
      font-stretch: normal;
      line-height: 1.71;
      letter-spacing: -1.12px;
    }
  }
  .MuiList-root {
    //margin-top: 20px;
    padding-top: 0;
    border-top: 1px solid #1f2437;
    .MuiListItem-root {
      padding: 30px 20px;
      border-bottom: 1px solid #e0e0e0;
      // &:last-child {
      //   border: none;
      // }
    }
  }
  .tit_body {
    display: flex;
    flex-direction: row;
    align-items: center;
    .MuiTypography-body1 {
      letter-spacing: -0.64px;
      font-size: 16px;
      color: #222;
      flex: 1;
    }
    .MuiTypography-body2 {
      font-weight: 700;
      font-size: 20px;
      color: #222;
      display: block;
      flex: 3;
      &:before {
        content: 'Q';
        width: 15px;
        margin-right: 10px;
        display: inline-block;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.88px;
        color: #4063ec;
      }
    }
  }
  .MuiButton-root:hover {
    background-color: #ccc;
  }
  .MuiListItem-root {
    padding: 10px 0;
  }
  .MuiListItemText-root {
    padding-right: 80px;
  }
  
  @media (min-width: 320px) and (max-width: 768px) {
    .sub_tit {
      .MuiTypography-root {
        font-size: 22px;
        line-height: 1;
        letter-spacing: -0.96px;
      }
    }
    .MuiList-root {
      .MuiListItem-root {
        flex-wrap: wrap;
        padding: 15px 0;
      }
      .MuiListItemText-root {
        flex: 0 0 100%;
      }
      .MuiListItemAvatar-root {
        flex: 0 0 100%;
        margin: 0 auto 10px;
        text-align: center;
        img {
          height: 230px;
        }
      }
    }
    .tit_body {
      display: flex;
      align-items: baseline;
      .MuiTypography-body1 {
        font-size: 14px;
        > span {
          margin-bottom: 10px;
        }
      }
      .MuiTypography-body2 {
        font-size: 16px;
        padding-top: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:before {
          content: 'Q';
          width: 15px;
          margin-right: 6px;
          display: inline-block;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.88px;
          color: #4063ec;
        }
      }
    }
  }
`;

export const detal_list = css`
  margin: 0 auto;
  max-width: 1260px;

  &.taglist{
    .MuiListItemText-root{
      padding-right: 80px;
    }
  }
  &.list02{
    .right_tag{
      right: 190px;
    }
    .btn_cont{
      position: relative;
    }
    .right_btn{
      position:absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      color: #222;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.64px;
      button{
        letter-spacing: -0.56px;
        z-index: 999;
      }
    }
  }
  .mb10{
    margin-bottom: 10px;
  }
  .modalbtn{
    background-color:#ccc;
  }
  .date{
    display:flex;
    margin-top: 5px;
    letter-spacing: -0.56px;
    span {
      position: relative;
      display: inline-block;
      color:#707070;
      font-weight: 400;
      /* &+span{
        margin-left: 6px;
        padding-left: 6px;
        &:before{
          content:'';
          position: absolute;
          left:0;
          top:5px;
          width:1px;
          height: 12px;
          background-color: #ccc;
        }
      } */
      em{
        font-style:normal;color: #222;font-weight:400;
        &:first-of-type{
          margin-left:6px;
        }
      }
    }
  }
  .right_tag{
    position:absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: #222;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.64px;
    em {font-style:normal;font-weight:400;}
    &.blue{
      color: #4063ec !important;
      background-color: transparent !important;
    }
    &.green{
      color: #1ccdcc;
      background-color: transparent;
    }
    &.gray{
      color: #707070;
      background-color: transparent;
    }
  }
  .sub_tit {
    .MuiTypography-root {
      font-size: 28px;
      font-weight: 700;
      font-stretch: normal;
      line-height: 1.71;
      letter-spacing: -1.12px;
    }
  }
  .MuiList-root {
    //margin-top: 20px;
    padding-top: 0;
    border-top: 1px solid #1f2437;
    width:100%;
    .MuiListItem-root {
      padding: 30px 20px;
      border-bottom: 1px solid #e0e0e0;
      // &:last-child {
      //   border: none;
      // }
    }
    
    .sub_cnt {
      margin-top: 5px;
      letter-spacing: -0.56px;
      em{margin-left:6px;font-style:normal;color:#222;}
    }

    .MuiChip-root {
      border-radius: 5px;
      .MuiChip-label {
        padding: 6px 10px;
      }
    }
    .new {
      background-color: #1ccdcc;
      color: #fff;
    }
    .blue {
      background-color: #4063ec;
      color: #fff;
    }
    .item{
      background-color: #f5f5f5;
    }
    .wh{
      background-color: #fff;
      border: 1px solid #ccc;
    }
  }
  .tit_body {
    display: flex;

    .MuiTypography-body1 {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 5px;
      color: #333;
      display: block;
      letter-spacing: -0.8px;
    }
  }
  .body2 {
    line-height: 1.75;
    letter-spacing: -0.64px;
    font-size: 16px;
    color: #707070;
    margin-bottom: 15px;
  }
  .body3{
    display: inline-block;
    margin-top: 20px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    text-align: left;
    color: #707070;
    em{
      color: #222222;
    }
  }
  .MuiButton-root:hover {
    background-color: #ccc;
  }
  .MuiListItem-root {
    padding: 10px 0;
  }
  .Check_listbox {
    .MuiFormControl-root{
      width: 100%;
      .MuiFormGroup-root {
        .MuiFormControlLabel-root {
          flex: 0 0 12.1%;
          margin-left: 0;
          margin-right: 5px;
          height: 50px;
         align-items: flex-start;
        }
        .MuiCheckbox-root {
          padding: 5px 15px 0 0;
        }
        .MuiTypography-root {
          letter-spacing: -0.64px;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .date{
      flex-direction: column;
      span{
        &+span{
          margin-left: 0;
          padding-left: 0;
          &:before{
            display:none;
          }
        }
      }
    }
    .btn_cont:last-child{
      .MuiListItem-root{
        border-bottom:0;
      }
    }
    .MuiListItem-root {
      padding-bottom:64px !important;
      
    }
    .sub_cnt{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
    .right_btn {top:auto !important;right:15px !important;bottom:0;}
    .right_tag{
      top:auto;
      right: auto;
      left:15px;
      bottom:8px;
      font-size: 16px;
    }
    .sub_tit {
      .MuiTypography-root {
        font-size: 24px;
        line-height: 1.6;
        letter-spacing: -0.96px;
      }
    }
    .MuiChip-root {
      .MuiChip-label {
        padding: 6px 10px;
      }
    }
    .MuiList-root {
      .MuiListItem-root {
        flex-wrap: wrap;
        padding: 23px 0;
      }
      .MuiListItemText-root {
        flex: 0 0 100%;
        padding: 0 15px;
      }
      .MuiListItemAvatar-root {
        flex: 0 0 100%;
        margin: 0 auto 10px;
        text-align: center;
        img {
          height: 230px;
        }
      }
    }
    .tit_body {
      display: flex;
      align-items: baseline;
      .MuiTypography-body1 {
        font-size: 16px;
        margin-bottom: 12px;
        padding-top: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
      }
    }
    .body2 {
      font-size: 14px;
    }
    .body3{
      margin-top: 16px;
    }
    .Check_listbox {
      .MuiFormControl-root{
        .MuiFormGroup-root {
          .MuiFormControlLabel-root {
            flex: 0 0 48%;
            height: 40px;
          }
          .MuiCheckbox-root {
            padding: 3px 10px 0 0;
          }
          .MuiTypography-root {
            letter-spacing: -0.56px;
            font-size: 14px;
            line-height: 1.8;
          }
        }
      }
    }
  }
`;

export const login_cont = css`
  max-width: 460px;
  margin: 0 auto;
  .mt40{
    margin-top: 40px;
  }
  .input_form{
    dl{
      display: flex;
      height: 48px;
      margin-top: 100px;
      margin-bottom: 10px;
      align-items: center;
      max-width: 100%;
      dt{
        flex: 0 0 30%;
      }
      dd{
        flex: 0 0 60%;
        margin: 0;
        .MuiOutlinedInput-root{
          height: 48px;
          min-width: 100%;
        }
      }
    }
  }
  .txt_line{
    display: flex;
    color: #e0e0e0;
    margin: 40px 0;
    hr{
      border-top: 1px solid #e0e0e0;
      flex: 1;
      border-bottom: 0;
    }
    span{
      display: inline-block;
      margin: 0 10px;
      height: 24px;
      width: 32px;
      letter-spacing: -0.64px;
    }
  }
`;

export const step03 = css`
  max-width: 400px;
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
      .MuiStepConnector-line{
        border-color: #000;
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
    max-width: 100%;
    .css-nen11g-MuiStack-root{
      flex-direction: column;
    }
  }
`;

export const input_w = css`
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  padding-top: 40px;
  .select_plus{
    .MuiTextField-root {
      .MuiOutlinedInput-root{
        padding: 7.5px 4px 7.5px 110px;
      }
    }
  }
  .input_select{
    position: absolute;
    z-index: 2;
    margin: 2px;
    .MuiOutlinedInput-root{
      height: 56px;
      border: none;
    }
    .MuiOutlinedInput-notchedOutline{
      border: none;
    }
  }
  .MuiOutlinedInput-root {
    background-color: #fff;
    border-radius: 30px;
    height: 60px;
    width: 100%;
  }
  .MuiInputLabel-root {
    line-height: 1.8em;
    padding-left: 30px;
    color: #707070;
  }
  .Mui-ficused {
    display: none;
    .MuiInputLabel-root {
      display: none;
      font-size: 0;
    }
    .MuiOutlinedInput-root {
      font-size: 0;
    }
  }
  .MuiAutocomplete-root {
    width: 100%;
  }
  .css-16awh2u-MuiAutocomplete-root
    .MuiOutlinedInput-root
    .MuiAutocomplete-input {
    padding: 7.5px 4px 7.5px 30px;
    font-family: Noto Sans CJK KR;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 32px 0 0;
    .MuiOutlinedInput-root {
      height: 50px;
    }
    .css-16awh2u-MuiAutocomplete-root
      .MuiOutlinedInput-root
      .MuiAutocomplete-input {
      padding: 5px 4px 8px 15px;
      font-size: 14px;
    }
  }
`;
export const detal_btn = css`
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  button {
    margin-top: 20px;
    background-color: rgba(0 0 0 /0);
    color: #fff;
    border: none;
    font-size: 14px;
    border-radius: 0;
    line-height: 1;
    text-decoration: underline;
    font-weight: 400;
  }
`;

export const teble_detal = css`
  text-align: right;
  max-width: 780px;
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
`;

export const table02 = css`
  display: flex;
  height: 210px;
  border-radius: 15px;
  overflow: hidden;
  .MuiTableCell-root {
    border: 0;
    padding: 0;
  }
  dl {
    flex: 1;
    &:first-of-type {
      dd, dt {
        border-left: none;
      }
    }
    dt {
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.72px;
      padding: 12px;
      font-size: 18px;
      line-height: 1.4;
      text-align: center;
      border-bottom: 1px solid #e0e0e0;
      border-left: 1px solid #e0e0e0;
    }
    dd {
      margin-left: 0;
      text-align: left;
      border-left: 1px solid #e0e0e0;
      letter-spacing: -0.64px;
      padding: 6px;
      .box_scroll{
        padding: 14px;
        height: 166px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 5px;
          padding: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #d7dae6;
          border-radius: 10px;
          width: 3px;
        }
        &::-webkit-scrollbar-track {
          background-color: #fff;
          border-radius: 10px;
          width: 10px;
        }
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
        padding-left: 10px;
      }
      .MuiFormGroup-root{
        flex-direction: column;
      }
    }
  }
  .MuiCheckbox-root {
    padding: 0;
    margin-right: 10px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .table_form {
      th {
        font-size: 14px;
      }
      td {
        padding: 10px;
      }
    }
    .MuiTableCell-root {
      padding: 8px;
    }
  }
`;

export const bread = css`
  position: relative;
  max-width: 1260px;
  margin: 0 auto;
  .css-1wuw8dw-MuiBreadcrumbs-separator {
    color: #707070;
  }
  ol {
    position: absolute;
    top: 30px;
    right: 0;
    justify-content: flex-end;
  }
  .home {
    display: block;
    width: 15px;
    height: 15px;
    background: url('/images/common/home.png') no-repeat;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    display: none;
  }
`;

export const detal_tab = css`
  background-color: #1f2437;
  width: 100%;
  &.fixed{
    position: relative;
    top: 335px;
    .back{
      background-color: #1f2437;
      width:100%;
      position: fixed;
      top: 217px;
      z-index: 2;
    }
  }
  .back{
    top: 250px;
    transition: 0.5s;
  }
  .MuiTabs-indicator{
    display: none;
  }
  .MuiBox-root {
    padding: 0;
  }
  .MuiTabs-root {
    max-width: 1260px;
    margin: 0 auto;
  }
  .MuiTabs-flexContainer {
    .MuiButtonBase-root {
      display: flex;
      padding: 11px 32px 15px;
      font-family: Noto Sans CJK KR;
      line-height: 1;
      border-radius: 10px 10px 0 0;
      color: #707070;
      background-color: #e0e0e0;
      border-right: 1px solid #000;
      flex-direction: row;
      letter-spacing: -0.64px;
      font-weight: 700;
      align-items: flex-end;
      >span{
        font-size: 16px;
      }
      > em{
        margin-left: 4px;
        font-size: 13px;
      }
    }
    .Mui-selected {
      color: #222;
      background-color: #fff;
      > em{
        color: #4063ec;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTabs-flexContainer {
      padding: 0 15px;
      > button {
        flex: 1;
        font-size: 16px;
      }
    }
    .MuiTabs-flexContainer {
    .MuiButtonBase-root {
      font-size: 14px;
    }}
    .MuiTabs-root {
      min-height: 40px;
    }
    &.fixed{
    top: 250px;
    .back{
      top: 80px;
    }
  }
  }
`;

export const sub_cont02 = css`
  min-height: 840px;
  background-color: #fff;
  color: #333;
  .MuiTypography-h5 {
    height: auto;
    font-size: 28px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: -1.12px;
    margin-bottom: 20px;
  }
  .MuiTypography-h6{
    font-size: 20px;
    letter-spacing: -0.8px;
    font-weight: 700;
    margin-top: 40px;
  }
  .md_btn {
    color: #333;
    border: 1px solid #333;
    width: 220px;
    height: 55px;
    border-radius: 0;
    margin-top: 10px;
  }
  .data {
    height: 24px;
    font-size: 16px;
    font-style: normal;
    line-height: 3;
    letter-spacing: -4px;
    margin-left: 10px;
    display: inline-block;
    > em {
      height: 19px;
      font-size: 16px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.64px;
      color: #4063ec;
    }
  }
  .MuiSelect-select {
    padding: 8px 40px 8px 20px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    min-height: auto;
    .MuiTypography-h5 {
      font-size: 22px;
      margin-bottom: 10px;
    }
    .MuiSelect-select {
      font-size: 14px;
    }
    .MuiTypography-h6{
      font-size: 18px;
      letter-spacing: -0.64px;
    }
  }
`;

export const clause_check = css`
  font-size: 16px;
  letter-spacing: -0.64px;
  flex-direction: row;
  align-items: center;
  .point_txt{
    font-size: 14px;
    line-height: 2;
    letter-spacing: -0.56px;
    color: #1ccdcc;
    
  }
  .MuiFormControlLabel-root{
    margin-left: -10px;
    margin-right: 2px;
    .MuiFormControlLabel-label{
      font-weight: 700;
    }
  }
`;
// 약관박스
export const clause_Box = css`
  height: 401px;
  margin: 0 0 3px;
  padding: 16px 6px 25px 16px;
  border-radius: 20px;
  border: solid 1px #ccc;
  margin-top: 2px; 
  overflow: hidden;
  .scroll{
    overflow: auto;
    height: 400px;
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
  .MuiTypography-h6 {
    font-size: 16px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: -0.64px;
    margin-bottom: 16px;
  }
  p{
    font-size: 14px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: -0.56px;
    text-align: left;
    color: #222;
    margin-bottom: 8px;
    margin-top: 35px;
    &.fisttit{
      margin-top: 16px;
    }
  }
  .text_box{
    color: #707070;
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: -0.14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    ul{
      li{
        margin-left: 20px;
      }
    }
  }
`;

export const sub_list = css`
  margin-top: 60px;
  .css-w4z10b-MuiStack-root {
    .MuiChip-root {
      border-radius: 5px;
      .MuiChip-label {
        padding: 6px 10px;
      }
    }
    .new {
      background-color: #1ccdcc;
      color: #fff;
    }
    .blue {
      background-color: #4063ec;
      color: #fff;
    }
  }
  .MuiList-root {
    width: 100%;
    height: 100%;
    .MuiListItemText-root {
      position: relative;
      flex: 0 0 70%;
      margin: 0;
    }
  }
  .MuiTypography-body1 {
    display: block;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 5px;
    padding-top: 10px;
    color: #333;
  }
  .MuiTypography-body2 {
    .body2 {
      font-family: Noto Sans CJK KR;
      line-height: 1.75;
      letter-spacing: -0.64px;
      font-size: 16px;
      display: block;
      color: #707070;
      margin-bottom: 15px;
    }
    .MuiTypography-root{
      display: block;
      margin-bottom: 15px;
    }
  }
  .MuiButton-root:hover {
    background-color: #ccc;
  }
  .MuiListItem-root {
    padding: 10px 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 40px;
    .MuiChip-root {
      margin-top: 10px;
      .MuiChip-label {
        padding: 6px 10px;
      }
    }
    .MuiList-root {
      .MuiListItem-root {
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .MuiListItemText-root {
        flex: 0 0 100%;
      }
      .MuiListItemAvatar-root {
        flex: 0 0 100%;
        margin: 0 auto 10px;
        img {
          height: 230px;
        }
      }
    }
    .MuiTypography-body1 {
      font-size: 18px;
      margin-bottom: 12px;
      padding-top: 20px;
    }
    .MuiTypography-body2 {
      font-size: 14px;
      > span {
        margin-bottom: 0;
      }
    }
  }
  .css-11k5jid-MuiStack-root > :not(style) + :not(style) {
    margin: 0;
  }
`;
export const slide_cont02 = css`
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  .swiper-container {
    padding: 10px 0 50px;
  }
  .swiper-pagination-bullets {
    position: absolute;
    bottom: 0;
    display: block;
    z-index: 99;
    width: 100%;
    text-align: center;
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
      display: none;
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
  // box-shadow: 0px 2px 3px 1px rgb(0, 0, 0, 0.3);
  .black {
    color: #222;
  }
  .MuiCardContent-root {
    padding: 16px 3px;
  }
  .sub_txt {
    color: #8f929b;
    line-height: 1;
    font-size: 14px;
    margin: 7px 0;
  }
  .MuiTypography-root {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -1.2px;
    color: #333;
    margin-bottom: 16px;
  }
  .tag {
    position: absolute;
    top: 0;
    z-index: 2;
    justify-content: space-between;
    width: 100%;
    border: solid 1px var(--pinkish-grey);
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
  .MuiCardActionArea-root {
    > img {
      border-radius: 15px;
      border: solid 1px rgba(204, 204, 204, 0.35);
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
    }
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
  }
`;
// 모달부분
export const modalCard = css`
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 15px;
  color: #fff;
  max-width: 100%;
  box-shadow: none;
  .black {
    color: #222;
  }
  .MuiCardContent-root {
    padding: 16px 3px;
  }
  .sub_txt {
    color: #222;
    line-height: 1;
    font-size: 14px;
    margin: 7px 0;
    &.icon01 {
      &:before {
        content: '';
        width: 16px;
        height: 16px;
        margin-right: 10px;
        display: inline-block;
        background: url('/images/common/card_icon01.png') center bottom
          no-repeat;
      }
    }
    &.icon02 {
      &:before {
        content: '';
        width: 16px;
        height: 16px;
        margin-right: 10px;
        display: inline-block;
        background: url('/images/common/card_icon02.png') center center
          no-repeat;
      }
    }
    &.icon03 {
      &:before {
        content: '';
        width: 16px;
        height: 16px;
        margin-right: 10px;
        display: inline-block;
        background: url('/images/common/card_icon03.png') center center
          no-repeat;
      }
    }
  }
  .MuiTypography-root {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -1.2px;
    color: #333;
    margin-bottom: 16px;
  }
  .tag {
    position: absolute;
    top: 0;
    z-index: 2;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
    .MuiChip-root {
      margin-left: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-left: 0;
      }
    }
    .wh {
      background-color: #fff;
      color: #333;
    }
    .blue {
      background-color: #4063ec;
      color: #fff;
    }
    .green {
      background-color: #1ccdcc;
      color: #fff;
    }
  }
  .MuiCardActionArea-root {
    > img {
      border-radius: 15px;
      border: solid 1px rgba(204, 204, 204, 0.35);
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
    }
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
  }
`;

export const detal_txtBox = css`
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  line-height: 1.89;
  .MuiTypography-h5 {
    line-height: 1.71;
    font-size: 28px;
  }
  .text01 {
    margin-top: 32px;
    margin-bottom: 50px;
  }
  > p {
    font-size: 18px;
    margin: 0;
  }
  .bold {
    font-weight: 700;
  }
  .q_icon{
    color: #4063ec;
    font-size: 28px;
    font-family: Roboto;
    line-height: 1.71;
    letter-spacing: -1.12px;
    text-align: center;
    font-weight: 700;
    height: 34px;
    margin-bottom: 5px;
  }
  
  @media (min-width: 320px) and (max-width: 768px) {
    padding-bottom: 30px;
    margin-bottom: 30px;
    .MuiTypography-h5 {
      line-height: 1.5;
      font-size: 20px;
    }
    .text01 {
      margin-top: 24px;
      margin-bottom: 30px;
      font-size: 14px;
    }
    > p {
      font-size: 14px;
    }
  }
`;

export const box_gray = css`
  padding: 30px;
  border-radius: 5px;
  background-color: #f5f5f5;
  .MuiTypography-h3{
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.8px;
  }
  ul{
    li{
      padding: 0;
      margin-top: 5px;
      .MuiTypography-body2 {
        margin-top: 8px;
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
`;

export const table01 = css`
  margin-top: 60px;
  margin-bottom: 63px;
  letter-spacing: -0.64px;
  table {
    border-top: 1px solid #222;
    width: 100%;
    border-spacing: 0;
    tr {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
    }
    th {
      padding: 20px 20px;
      text-align: left;
      width: 20%;
      background-color: #f5f5f5;
    }
    td {
      width: 30%;
      padding: 18px 20px;
      &.table_input{
        padding: 6px 8px;
        .MuiInputBase-root{
          height: 48px;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    overflow: scroll;
    margin-bottom: 40px;
    table {
      width: 200%;
      margin-bottom: 15px;
    }
  }
`;
export const table_02 = css`
  margin-top: 12px;
  table {
    border-top: 1px solid #1f2437;
    max-width: 540px;
    width: 100%;
    border-spacing: 0;
    text-align: center;
    tr {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
    }
    th {
      padding: 18px 20px;
      background-color: #f5f5f5;
      width: 70%;
      text-align: center;
      &:first-of-type {
        width: 30%;
        border-right: 1px solid #e0e0e0;
      }
    }
    td {
      padding: 18px 20px;
      width: 70%;
      &:first-of-type {
        width: 30%;
        border-right: 1px solid #e0e0e0;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    overflow: scroll;
    margin-bottom: 40px;
    table {
      width: 200%;
      margin-bottom: 15px;
    }
  }
`;

export const table05 = css`
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
        flex: 0 0 30%;
        padding: 15px 18px;
      }
      dd {
        flex: 0 0 70%;
        padding: 15px 18px;
      }
    }
  }
`;

export const table04 = css`
  max-width: 100%;
  letter-spacing: -0.64px;
  .MuiTypography-h6{
    font-size: 18px;
    margin-bottom: 15px;
  }
  table, dl {
    border-top: 1px solid #222;
    border-spacing: 0;
    margin-bottom: 40px;
    width: 100%;
    & .noline{
      border-bottom: none;
    }
    & .table_input{
      padding: 6px 8px;
      .MuiInputBase-root{
        height: 48px;
      }
    }
    th, dt {
      height: 60px;
      padding: 20px 20px;
      text-align: left;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      &.wh{
        background-color: #fff;
      }
      &.table_input{
        padding: 6px 8px 6px 0;
        .MuiInputBase-root{
          height: 48px;
        }
      }
    }
    td, dd {
      height: 60px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      line-height: 3.5;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      margin-left: 0;
      .blue{
        color:#4063ec;
        &:after {
          content: '';
          width: 8px;
          height: 11px;
          margin-left: 9px;
          display: inline-block;
          background: url('/images/common/gt_blue.png') no-repeat;
        }
      }
      .MuiFormGroup-root{
        width: 250px;
        justify-content: space-between;
      }
      .ml8{
       margin-left: 8px; 
      }
    }
  }
  .blue{
    color:#4063ec;
    &:after {
      content: '';
      width: 8px;
      height: 11px;
      margin-left: 9px;
      display: inline-block;
      background: url('/images/common/gt_blue.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    table {
      th {
      
      }
      td {
        
      }
    }
  }
`;

export const table03 = css`
  max-width: 940px;
  margin: 0 auto;
  letter-spacing: -0.64px;
  .MuiTypography-h6{
    font-size: 18px;
    margin-bottom: 15px;
  }
  table {
    border-top: 1px solid #222;
    width: 100%;
    border-spacing: 0;
    margin-bottom: 40px;
    tr {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
    }
    th {
      padding: 20px 20px;
      text-align: left;
      width: 20%;
      background-color: #f5f5f5;
    }
    td {
      display: flex;
      justify-content: space-between;
      width: 80%;
      padding: 0 20px;
      line-height: 3.5;
      align-items: center;
      &.table_input{
        padding: 6px 8px;
        .MuiInputBase-root{
          height: 48px;
        }
      }
      .blue{
        color:#4063ec;
        &:after {
          content: '';
          width: 8px;
          height: 11px;
          margin-left: 9px;
          display: inline-block;
          background: url('/images/common/gt_blue.png') no-repeat;
        }
      }
      .MuiFormGroup-root{
        width: 250px;
        justify-content: space-between;
      }
    }
  }
  .blue{
    color:#4063ec;
    &:after {
      content: '';
      width: 8px;
      height: 11px;
      margin-left: 9px;
      display: inline-block;
      background: url('/images/common/gt_blue.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 40px;
    table {
      margin-bottom: 15px;
      th {
      width: 40%;
      }
      td {
        width: 60%;
        &.table_input{
          padding: 6px 8px;
          .MuiInputBase-root{
            height: 48px;
          }
        }
      }
    }
  }
`;
export const memout = css`
  margin-top: 40px;
  text-align: right;
  a {
    &:after {
      content: '';
      width: 8px;
      height: 11px;
      color: #707070;
      margin-left: 9px;
      display: inline-block;
      background: url('/images/common/gt_gray.png') no-repeat;
    }
  }
`;

export const table06 = css`
  .MuiTableContainer-root{
    box-shadow: none;
    border-top: 1px solid #1f2437;
    border-radius: 0;
    th, td{
      border-right: 1px solid #e0e0e0;
      &:last-child{
        border-right: none;
      }
    }
    th{
      background-color: #f5f5f5;
      font-weight: 700;
    }
    td{
      padding: 20px;
    }
  }

`;
export const text_list01 = css`
  margin-bottom: 60px;
  dl {
    margin-bottom: 40px;
    dt {
      line-height: 1.67;
      letter-spacing: -0.72px;
      font-weight: 700;
      margin-bottom: 8px;
      font-size: 18px;
      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 3px 10px 3px 0;
        border-radius: 100%;
        background-color: #707070;
      }
    }
    dd {
      margin-inline-start: 15px;
      line-height: 1.75;
      margin-left: 0;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 40px;
    dl {
      dt {
        letter-spacing: -0.64px;
        margin-bottom: 8px;
        font-size: 16px;
        &:before {
          background-color: rgba(28, 205, 204);
        }
      }
      dd {
        font-size: 14px;
        line-height: 26px;
      }
    }
  }
`;

export const detal_img = css`
  margin-top: 20px;
  .img_box {
    width: 100%;
    min-height: 200px;
    height: auto;
    margin-bottom: 16px;
    background-color: #ccc;
    // back 색깔 임시
  }
  .txt_box {
    margin-top: 30px;
    margin-bottom: 60px;
    line-height: 1.63;
    letter-spacing: -0.64px;
  }
`;

//sns icon
export const snsicon = css`
  margin: 0 auto;
  width: max-content;
  button{
    border-radius: 50px;
    min-width:50px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    &.kakao{background: url('/images/common/kakao_icon.png')}
    &.naver{background: url('/images/common/naver_icon.png')}
    &.google{background: url('/images/common/google_icon.png'); border: 1px solid #e0e0e0;}
  }
`;

//답변박스
export const qna_box = css`
  background-color: #f2f3f8;
  padding: 30px 40px;
  border-top: 1px solid #1f2437;
  dl{
    display: flex;
    &+ dl {
      margin-top: 10px;
    }
    dt {
      min-width: 62px;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: -0.72px;
      &:before {
        content: '';
        width: 20px;
        height: 20px;
        margin-right: 6px;
        display: inline-block;
        background: url('/images/common/icon_gna.png') no-repeat;
      }
    }
    dd{
      margin-left: 62px;
      line-height: 1.75;
      letter-spacing: -0.64px;
      .date{
        margin-top: 33px;
      }
    }
  }
  
`;

export const sns_switch = css`
  border: 1px solid #e0e0e0;
  padding: 20px 33px 20px 20px;
  height: 90px;
  border-radius: 10px;
  width: 460px;
  .textbox{
    font-weight: 700;
    color: #222;
    line-height: 1.75;
    letter-spacing: -0.64px;
    
    em, span{
      color: #707070;
      font-weight: 300;
    }
    em{margin-left: 4px;}
  }
  .MuiFormControlLabel-root{
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
  .MuiSwitch-root{
    box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    width: 42px;
    height: 24px;
    padding: 0;
    border-radius: 12px;
    display: flex;
    &:active {
      & .MuiSwitch-thumb {
        width: 12px;
      }
      & .MuiSwitch-switchBase.Mui-checked {
        transform: translateX(18px);
      }
    }
    & .MuiSwitch-switchBase {
      padding: 6px;
      &.Mui-checked {
        transform: translateX(18px);
        color: #fff;
        & + .MuiSwitch-track {
          opacity: 1;
          background-color: #4063ec;
        }
      }
    }
    & .MuiSwitch-thumb {
      box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
      width: 12px;
      height: 12px;
      border-radius: 12px;
    }
    & .MuiSwitch-track {
      border-radius: 16px;
      opacity: 1;
      background-color: #ccc;
      box-sizing: border-box;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    width: 350px;
    padding: 15px;
    .textbox{
      margin-right: 20px;
    }
  }
`;

// 이전 다음 리스트 페이지네이션 버튼
export const bottom_list = css`
  margin-bottom: 40px;
  padding-top: 0;
  border-top: 1px solid #ccc;
  > a, .pagelist{
    display: flex;
    align-items: center;
    padding: 28px 20px;
    border-bottom: 1px solid #e0e0e0;
    .txt01 {
      margin-right: 48px;
    }
    .txt02 {
      margin: 0;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      color: rgba(0, 0, 0, 0.6);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .next {
    &:before {
      content: '';
      width: 15px;
      height: 10px;
      margin-right: 18px;
      display: inline-block;
      background: url('/images/common/arrow_next.png') no-repeat;
    }
  }
  .prev {
    &:before {
      content: '';
      width: 15px;
      height: 10px;
      margin-right: 18px;
      display: inline-block;
      background: url('/images/common/arrow_prev.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    border-top: 1px solid #e0e0e0;
    > a, .pagelist{
      padding: 28px 15px;
      .txt01 {
        margin-right: 20px;
        min-width: 85px;
        font-size: 14px;
      }
      .txt02 {
        margin-right: 20px;
        min-width: 85px;
        font-size: 14px;
      }
    }
    button {
      min-width: 14px;
      height: 8px;
      margin-right: 15px;
      padding: 0;
    }
    .next, .prev {
      font-size: 14px;
    }
  }
`;

//sns 아이콘버튼
export const btnMinSns = css`
  justify-content: end;
  margin-top: 40px;
  > button {
    height: 40px;
    border-radius: 40px;
    min-width: 40px;
    &.face {
      background: url('/images/common/pace_icon_min.png') no-repeat;
    }
    &.kakao {
      background: url('/images/common/kakao_icon_min.png') no-repeat;
    }
    &.insta {
      background: url('/images/common/insta_icon_min.png') no-repeat;
    }
    &.nomal {
      padding: 11px 26px 10px;
      border-radius: 20px;
      border: 1px solid #ccc;
      font-size: 13px;
      font-weight: normal;
      line-height: 2;
      letter-spacing: -0.52px;
      color: #707070;
    }
    & + button {
      margin-left: 10px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
    > button {
      font-size: 16px;
    }
  }
`;

// 버튼속성그룹
export const btnGroup = css`
  justify-content: center;
  margin-top: 60px;
  > button {
    height: 60px;
    border-radius: 40px;
    width: 220px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    background-color: #fff;
    padding: 17px 36px;
    &.blue {
      background-color: #4063ec;
      width: 100%;
      color: #fff;
    }
    &.linebtn {
      border: 1px solid #4063ec;
      background-color: #fff;
      &.mini {
        width: 140px;
      }
    }
    &.linebtn02 {
      border: 1px solid #222;
      color: #222;
      background-color: #fff;
    }
    &.blue02 {
      background-color: #4063ec;
      color: #fff;
      min-width: 140px;
      width: auto;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    > button {
      font-size: 16px !important; 
      &.blue02 {
        width: 100%;
        height: 52px;
      }
    }
  }
`;
//사업정보관리 모달부분
export const modalCustom = css`
  .MuiTabs-indicator{
    background-color: #000;
  }
  .css-1itvg3i-stylesFactory{
    border-color: #000;
  }
  .css-1980fso-MuiButtonBase-root-MuiTab-root-TabContainer{
    color: #707070;
    border: none;
    &.Mui-selected{
      color: #fff;
    }
  }
  .MuiTypography-h6{
    font-size: 18px;
    font-weight: 700;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h6{
      font-size: 16px;
      line-height: 28px;
    }
    .modal_text{
      font-size: 14px;
      line-height: 26px;
    }
  }
`;

export const modalpop = css`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 780px;
  background-color: #fff;
  box-shadow: 24;
  padding: 24px 15px 20px;
  border-radius: 20px 20px 0 0;
  h2 {
    font-size: 20px;
    font-weight: 700;
    > button {
      color: #707070;
      position: absolute;
      min-width: auto;
      right: 20px;
      margin-top: -1px;
      .MuiSvgIcon-root{font-size:1.9rem;}
    }
  }
  h3 {
    font-size: 16px;
    font-weight: 700;
  }
  .MuiTabs-indicator{
    background-color: #000;
  }
  .css-275fjj-stylesFactory {
    position: relative;
    max-width: 470px;
    margin: 30px auto 0;
    .MuiFormControlLabel-root {
      right: 0;
      top: 0;
      position: absolute;
    }
    .MuiCheckbox-root {
      padding: 0 5px 0 0;
    }
  }
`;

// 더보기 버튼 컴포넌트랑 같이
export const bottom_btn = css`
  button{
    &:after {
      content: '';
      background: url('/images/common/arr_row.png') no-repeat;
      background-size: cover;
      width: 12px;
      height: 8px;
      margin-left: 10px;
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
    font-weight: normal;
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

// 이벤트부분
export const event_list = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  > a {
    margin-bottom: 44px;
    margin-right: 60px;
    max-width: 380px;
    &:nth-of-type(3n){
      margin-right: 0;
    }
  }
  .MuiCard-root{
    background-color: rgba(0, 0, 0, 0);
    border-radius: 15px;
    color: #fff;
    box-shadow: none;
  }
  .MuiCardContent-root {
    padding: 16px 0px;
    .date {
    font-weight: 400;
    color: #8f929b;
    line-height: 1;
    font-size: 14px;
    letter-spacing: -0.56px;
    margin: 7px 0;
    display: block;
    &.noline{
      > em{
        border: none;
      }
    }
    > em {
      color: #333;
      margin-left: 5px;
    }
  }
  }
  .MuiTypography-root {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -1.3px;
    color: #333;
    margin-bottom: 16px;
  }
  .tag {
    position: absolute;
    top: 1px;
    right: 1px;
    z-index: 1;
    justify-content: end;
    width: 100%;
    .blue {
      background-color: #4063ec;
      color: #fff;
      border-radius: 0 15px 0 10px;
    }
  }
  .MuiCardActionArea-root {
    > img {
      border-radius: 15px;
      border: solid 1px rgba(204, 204, 204, 0.35);
    }
  }
  @media (min-width: 720px) and (max-width: 1200px) {
    > a {
      margin-right: 0;
      &:nth-of-type(even){
        margin-left: 30px;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 720px) {
    > a {
      margin-bottom: 40px;
      margin-right: 0;
      margin-left: 0;
    }
    .tag {
      font-size: 12px;
    }
    .MuiTypography-h5 {
      font-size: 22px;
    }
    .MuiSelect-select {
      font-size: 14px;
    }
    .MuiTypography-root {
      font-size: 16px;
    }
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
  }
`;

export const picker_card = css`
  display: flex;
  max-width: 780px;
  margin: 20px auto 0;
  background-color: #fff;
  border-radius: 10px;
  border: solid 1px #e0e0e0;
  color: #333;
  text-align: center;
  dl {
    border-right: 1px solid #e0e0e0;
    width: 100%;
    &:last-of-type{
      border: none;
      dd{
        .MuiFormGroup-root{
          margin-bottom: -10px;
        }
      }
    }
    dt{
      border-bottom: 1px solid #e0e0e0;
      font-size: 18px;
      padding: 14px 0;
      font-weight: 700;
      letter-spacing: -0.72px;
    }
    dd{
      text-align: center;
      margin-left: 0;
      display: inline-block;
      padding: 6px;
      width: 100%;
      .box_scroll{
        padding: 14px;
        max-height: 120px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 5px;
          padding: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #d7dae6;
          border-radius: 10px;
          width: 3px;
        }
        &::-webkit-scrollbar-track {
          background-color: #fff;
          border-radius: 10px;
          width: 10px;
        }
      }
      .MuiFormControl-root{
        width: 100%;
        .MuiFormControlLabel-root{
          flex: 0 0 48%;
          margin: 0;
          margin-bottom: 10px;
          &:nth-of-type(2n){padding-left:20px;}
          /* &:nth-last-of-type(-n + 2){
            margin-bottom: 0;
          } */
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    border: none;
    flex-direction: column;
    .MuiInputBase-root{
      height: 46px;
    }
    dl {
      border: none;
      dt{
        border-bottom: none;
        font-size: 16px;
        padding: 10px 0;
        text-align: left;
      }
      dd{
        padding: 16px 0 0 !important;
        margin-bottom: 16px;
      }
    }
  }
`;


export const inputBox = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width:100%;
  .MuiTextField-root{
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
  .count{
    margin-top: 8px;
    text-align: right;
    font-size: 14px;
    letter-spacing:normal;
    color: #666;
    font-weight: 300;
    line-height: normal;
    margin-right: -11px;
    em{
      font-style: normal;
    }
  }
  .inputtxt{
    font-family: Noto Sans CJK KR;
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
  Button{
    margin: 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
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
    .count{
      margin-top: 5px;
      font-size: 12px;
      margin-right: 0;
    }
  }
`;
export const modal_Box = css`
  width: 560px;
  padding: 30px 50px 0;
  .tit_text{
    text-align: center;
    letter-spacing: -0.64px;
    margin-bottom: 30px;
  }
  .modal_Card{
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 32px 30px 30px;
    .tit{
      letter-spacing: -0.64px;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      &:before{
        content: '';
        display: inline-block;
        background: url('/images/common/icon_info.png') no-repeat;
        width: 24px;
        height: 24px;
        margin-right: 10px;
        background-size: 100%;
      }
    }
    > ul{
        li{
          font-size: 14px;
          letter-spacing: -0.56px;
          line-height: 1.86;
          margin-bottom: 6px;
          &:before{
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            margin: 5px 8px 4px 0;
            background-color: #707070;
            border-radius: 10px;
          }
        }
      }
  }
`;
export const modal_inputBox = css`
  position: relative;
  display: flex;
  margin: 0 auto 10px;
  .inputtxt{
    flex: 1;
    font-size: 16px;
    line-height: 1.67;
    letter-spacing: -0.72px;
    font-weight: 700;
    & em{
      color: #1ccdcc;
      margin-left: 4px;
    }
  }
  .MuiTextField-root{
    flex: 1;
    .MuiInputBase-root{
      height: 48px;
      .MuiTypography-root{
        color: #1ccdcc;
      }
      .MuiInputBase-input:-webkit-autofill{
        padding: 12px 14px;
      }
    }
    .MuiFormHelperText-root{
      color: #1ccdcc;
      font-size: 14px;
    }
  }

  label{
    height: 48px;
    color: #222;
    &.Mui-focused {
      color: #222;
    }
  }
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
    label{
      font-size: 14px;
    }
    input {
      padding: 15px 14px;
    }
  }
`;

export const deletTag = css`
  Button{
    padding: 0 15px;
  }
  .MuiChip-root{
    height: 50px;
    border-radius: 30px;
    padding: 0 15px;
    margin: 4px 0;
  }
  .MuiChip-label{
    margin-top: 2px;
    padding-right: 10px;
  }
`;
export const tooltip = css`
  padding-bottom: 20px;
  &.pb0{
    padding-bottom: 0;
  }
  .MuiTypography-body1{font-size:16px !important;}
  @media (min-width: 320px) and (max-width: 768px) { 
    .MuiTypography-body1{font-size:14px !important;}
  }
  .MuiTypography-root{
    margin: 0;
    padding-bottom: 0;
    font-weight: 400 !important;
  }
  .MuiIconButton-root{
    margin:0 0 0 1px;
    padding:0 0 0 5px;
    .icon_question{
      width:18px;
      height: 18px;
      background: url('/images/common/icon_question_off.png') no-repeat center;
    }
    &:hover{
      .icon_question{
        background-image: url('/images/common/icon_question_on.png');
      }
    }
  }
`;

export const sub_cont01 = css`
  position: relative;
  display: block;
  color: #fff;
  .benner {
    text-align: center;
    background-color: #1f2437;
    width: 100%;
  }
  .txtbox {
    margin: 0 auto;
    max-width: 1080px;
    width: 100%;
    .tit {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 10px;
      margin-top: 0;
    }
    p {
      line-height: 1.8;
    }
  }
  .search_btn {
    position: absolute;
    right:0;
    top:0;
    width: 140px;
    height: 60px;
    border-radius: 30px;
    background-color: #4063ec;
    font-size: 18px;
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
  .objection_content{line-height: 1.88;padding:20px;border-top:1px solid #1f2437;border-bottom:1px solid #e0e0e0;font-weight:300;}
  @media (min-width: 320px) and (max-width: 768px) {
    .tab_wrap {
      width:calc(100% - 15px);
      .MuiTabs-root{
        min-height: 40px;
      }
      .MuiButtonBase-root{
        min-height: 40px;
        padding: 0 17px;
      }
    }
    .txtbox {
      .tit {
        font-size: 28px;
      }
      p {
        font-size: 14px;
        line-height: 2;
        padding: 10px 0 0;
        letter-spacing: -0.56px;
      }
    }
    .search_btn {
      top:auto;
      width: 80px;
      height: 50px;
      margin-top: 30px;
      font-size: 16px;
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
export const btn_next = css`
  button{
    font-weight: normal !important;
    &+button{
      margin-left:20px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    button,a{
      font-size: 16px !important;
      width: 100% !important;
      height: 52px !important;
      min-width: 104px;
      &+button{
      margin-left:10px;
    }
    }
  }
  
`;

export const title_set = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction:column;
    .tbl_desc {margin-bottom:10px;}
  }
`;

export const table = css`
  max-width: 100%;
  letter-spacing: -0.64px;
  & .star{
    &:after{
      content:'*';
      display: inline-block;
      width: 5px;
      height: 5px;
      margin-left: 5px;
      margin-bottom: 15px;
      color: #1CCDCC;
    }
  }
  &:first-of-type{
    margin-top: 48px;
  }
  .tbl_title{
    margin-top: 40px;
    &.mt20{
      margin-top: 20px;
    }
  }
  .delete_icon{
    margin-bottom: 5px;
  }
  .detailtab_02{
    .scrollTab {
      button{
        padding-bottom: 26px;
        color: #707070;
        font-size: 16px;
        letter-spacing: -0.64px;
        &.Mui-selected{
          color: #1f2437;
          font-weight: 700 !important;
        }
      }
    }
  }
  .detail_table{
    border-top: 1px solid #1f2437;
    &.type2{
      dt{
        background-color: #fff;
      }
      dd{
        .MuiOutlinedInput-root,.MuiButton-root {margin:-15px 0;}
      }
    }
    &.type3{
      dt{min-height:60px;padding: 6px 20px;letter-spacing: -1.5px;}
      dd{min-height:60px;padding: 6px 20px;}
      .MuiFormControlLabel-root{
        margin-right:100px;
      }
    }
    @media (min-width: 320px) and (max-width: 768px) {
      dd{padding-left:20px;padding-right:20px;}
      &.tbl_01{
        dt {flex:0 0 59%;}
        dd {flex:0 0 40%;}
      }
    }
  }
  .tableDefault_scroll{width:100%;}
  .MuiInputBase-root{width:100%; min-height: 48px;}
  .MuiOutlinedInput-input {font-weight:400;font-size:16px;padding: 12.5px 14px; letter-spacing: -0.64px;}
  .MuiOutlinedInput-notchedOutline {
    border-radius: 5px;
    border-color: #ccc;
  }

  dl {
    display: flex;
    border-spacing: 0;
    width: 100%;
    min-height: 65px;
    &.noline{
      border-bottom: none;
    }
    dt {
      display: flex;
      align-items: center;
      flex: 0 0 220px;
      padding: 15px 20px;
      text-align: left;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      font-weight: 500;
      &.wh{
        background-color: #fff;
      }
    }
    dd {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 8px 20px;
      line-height: 1.75;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      margin-left: 0;
      font-weight: 400;
      &.address{
        flex-direction: column;
        align-items: flex-start;
        >div{
          width:100%;
        }
        .MuiOutlinedInput-root{
          /* width:90%; */
          &+.MuiOutlinedInput-root{
            margin-left: 0;
          }
        }
        .MuiOutlinedInput-input{height:48px;padding: 0 14px;}
      }
      &.radio_grup{
        .MuiFormControlLabel-root{
          margin-left: 0;
        }
        .MuiFormControlLabel-root{
          margin-right: 60px;
          &:last-of-type{
            margin-right: 0;
          }
        }
      }
      .regNum {width:38.5%;}
      .MuiButton-outlinedPrimary {width:auto !important;min-width:73px !important;}
      .tableDefault_scroll{margin: 14px 0;}
      .tableDefault{
        .MuiOutlinedInput-root{width:100%;}
      }
      .MuiOutlinedInput-root{margin-left:-12px; margin-right:-12px; width: calc(100% + 24px); min-height:48px;}
    }
    .withLink{
      justify-content: flex-start;
      a {color:#4063ec;margin-left:10px;padding-right:15px;color:#4063ec;font-weight:400;background:url(/images/common/gt_blue.png) no-repeat right center;}
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .detailtab_02{
      .scrollTab {
        button{
          padding-bottom: 16px;
          font-size: 14px;
          letter-spacing: -0.56px;
        }
      }
    }
    .table_rowScroll{
      max-height: 510px;
      overflow-y: auto;
      overflow-x: hidden;
      min-width: 750px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #d7dae6;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
      }
    }
    .tableDefault_scroll{
      padding-right: 0;
      .tableDefault{
        min-width: 750px;
      }
    }
    .MuiTypography-h6{
      font-size: 16px;
    }
    .detail_table{
      margin-bottom: 30px;
      .MuiOutlinedInput-root{min-height:48px}
      dd{padding-left:20px; padding-right:6px;}
    }
    .delete_icon{
      margin-bottom: 0;
      height: 43px;
    }
    .MuiFormControl-root{width:100%;}
    /* .MuiFormGroup-root{justify-content: space-around;}
    .MuiFormControlLabel-root{margin-right:0;} */
    dl {
      flex-wrap: wrap;
      font-size: 14px;
      min-height: 60px;
      dt {
        flex: 0 0 35%;
        line-height: 26px;
        padding: 16px 10px 16px 20px;
        word-break: keep-all;
      }
      dd {
        flex: 0 0 65%;
        padding: 6px 0 6px 6px;
        word-break: keep-all;
        &.address{
          .MuiButton-root {line-height:1;}
          >div{
            &:nth-of-type(2){
              flex-direction:column;
              .MuiOutlinedInput-root{
                width:100%;
                &:first-of-type{margin-bottom:10px;}
              }
            }
          }
        }
        .regNum {width:100%;}
        .MuiOutlinedInput-root{margin-left:-12px; width: calc(100% + 12px);}
        &.radio_grup{
          .MuiFormGroup-root{
            justify-content: flex-start;
          }
          .MuiFormControlLabel-root{
            margin-right: 20px;
          }
        }
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
    .type7{
      td{
        font-size: 14px;
      }
    }
    .type6{
      th{
        font-size: 14px;
        &.lfnoline{
          border-left: 0;
        }
      }
    }
    .type2{
      dl{
        &.horz{
          flex-wrap: nowrap;
          dt{
            justify-content: left;
            padding-bottom: 0;
          }
          dd{
            padding-bottom: 20px;
            .tableDefault_scroll{
            margin-right: -23px;
          }
          }
        }
      }
    }
  }
`;

export const agreement = css`
  .checkbox{
    margin-right: 0;
    &.h4{
      padding-bottom: 20px;
      border-bottom: 1px solid #000;
    }
  }
  .agree{
    padding-top: 20px;
  }
  .agreeBox{
    height: 120px;
    padding:15px 6px 25px 16px;
    border:1px solid #ccc;
    border-radius: 5px;
    .inner{
      height: 88px;
      line-height: 28px;
      overflow-y:auto;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #d7dae6;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
      }
    }
    
  }
  @media (min-width: 320px) and (max-width: 850px) {
    .checkbox{
      &.h4{
        padding-bottom: 10px;
      }
    }
    .agree{
      padding-top: 10px;
    }
    .agreeBox{font-size:14px;}
  }
`;
export const table2 = css`
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
      line-height: 1.75;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      margin-left: 0;
      p{padding:0 20px;}
      &.num{
        flex : 0 0 6.2%;
        border-right: 1px solid #e0e0e0;
        justify-content: center;
      }
      &.check{
          flex: 0 0 19%;
          border-left: 1px solid #e0e0e0;
          border-bottom: 0;
          justify-content: center;
          align-self: stretch;
          .MuiFormControlLabel-root{
            &:last-child{
              margin-left:14px;
              margin-right: 0;
            }
          }
        }
    }
    &.header{
      dt{
        flex : 0 0 33.3%;
        &.num{
          flex : 0 0 6.2%;
          justify-content: center;
          border-right: 1px solid #e0e0e0;
          &+dt{
            flex: 1;
          }
        }
        &.check{
          flex: 0 0 17.8%;
          justify-content: center;
          border-left: 1px solid #e0e0e0;
        }
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
      border-bottom: 1px solid #e0e0e0;
      &.header{
        display:flex;
        border-bottom: 0;
        dt{
          &.num{flex: 0 0 38px;padding:0;}
          &.check{display:none}
        }
      }
      dt {
        flex: 0 0 30%;
        padding: 15px 18px;
      }
      dd {
        flex: 0 0 89.5%;
        padding: 14px 20px;
        p{padding:0;margin:0;}
        &.num{
          padding:0;
          flex: 0 0 38px;
          border-bottom: 0;
          align-self: stretch;
          &.long{
            height: 201px;
          }
          &.middle{
            height: 176px;
          }
          &.short{
            height: 127px;
          }
        }
        &.cnt{
          flex:1;
          display: block;
          padding-bottom: 5px;
          font-size: 14px;
          border-bottom: 0;
        }
        &.check{
          justify-content: flex-start;
          margin: 10px 0;
          padding:0;
          border-left: 0;
          .MuiFormControlLabel-label{font-size: 14px;}
        }
      }
    }
  }
`;

export const box_type = css`
  width: 100%;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin-bottom: 40px;
  padding: 24px 40px;
  font-size: 18px;
  line-height: 1.67;
  letter-spacing: -0.72px;
  .MuiStack-root {
    flex-wrap: wrap;
  }
  strong {
    height: 20px;
    min-width: 120px;
    margin-right: 40px;
    padding-right: 40px;
    border-right: 1px solid #ccc;
    line-height: 1;
    &.noline{
      border-right: none;
      padding-right: 0;
      margin-right: 30px;
    }
  }
  .flexmo {
    flex-direction: row;
  }
  .link_type {
    display: flex;
    align-items: end;
    &:before {
      content: '';
      width: 24px;
      height: 24px;
      margin-right: 18px;
      display: inline-block;
      background: url('/images/common/icon_link.png') no-repeat;
    }
    a {
      text-decoration: underline;
      margin-right: 30px;
    }
  }
  .snsbox{
    text-align: center;
    .MuiTypography-h6{
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.8px;
    }
    > p{
      line-height: 1.75;
      letter-spacing: -0.64px;
      font-size: 16px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiStack-root {
      display: block;
      flex-wrap: wrap;
    }
    .flexmo {
      flex-direction: column;
    }
    margin-bottom: 40px;
    padding: 20px 15px;
    font-size: 16px;
    letter-spacing: -0.64px;
    strong {
      font-size: 16px;
      height: 20px;
      margin-right: 0;
      padding-right: 0;
      border-right: none;
      margin-bottom: 15px;
      width: 100%;
    }
    .link_type {
      margin-left: 20px;
    }
  }
`;

// 파일 다운로드 버튼
export const btnDown = css`
  justify-content: center;
  flex-direction: row;
  button {
    min-width: 124px;
    height: 48px;
    border-radius: 24px;
    padding: 14px 10px;
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    border: solid 1px #ccc;
    color: #333;
    letter-spacing: -0.56px;
    font-weight: 300;
    &.btnAgreement{
      min-width: 214px;
      height:61px;
      border-radius: 31px;
      border: 1px solid #4063ec;
      font-size: 18px;
      color: #4063ec;
    }
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
    button {
      margin-bottom: 10px;
      > span {
        max-width: 200px;
      }
    }
  }
`;
export const fileupload = css`
  padding-bottom:40px;
  border-bottom:1px solid #e0e0e0;
  >div{
    justify-content: left;
    flex-wrap: wrap;
  }
`;
export const blackIcon = css`
  font-size: 30px; 
  color: #000;
`;
export const datepicker = css`
  @media (min-width: 320px) and (max-width: 768px) {
    >div{
      flex-direction: column !important;
    }
    .MuiFormControl-root:last-child{
      margin-left: 0;
    }
  }
  
`;

export const signbtn = css`
  margin: 0 -24px;
  padding-top:24px;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.08);
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
    height: 48px;
    font-weight: 300;
    box-shadow: none;
    letter-spacing: -0.72px;
    color:#fff;
    font-size: 14px;
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
    margin-top: 40px;
    border-top: 0;
    button{width:100%;height:52px;}
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
    flex-direction: column;
    margin:0 -15px;
    padding:20px 15px;
    border-radius: 0;
    >div{
      padding-left:0;
      button{
        margin-top:10px;
      }
      &:first-of-type{
        button{margin-top:0;}
      }
    }
  }
`
export const selectBox = css`
  border:1px solid #e0e0e0;
  border-radius: 5px;
  padding:30px;
  .tbl_title {margin-bottom:10px;}
  .item1{
    width:18%;
  }
  .item2{
    width:66%;
    margin:0 1.6%;
  }
  .MuiButton-root{
    align-self: flex-end;
  }
  .MuiSelect-select {
    min-height: auto;
    font-family:'Noto Sans CJK KR','Roboto';
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
    .item1{width:100%;}
    .item2{width:100%;margin:10px 0;}
    .MuiButton-root {align-self:center;max-width:75px;}
  }
`;
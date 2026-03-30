import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';

export const container = css`
  padding: 120px 0 60px;
  /* background-color: ${Color.darkBg}; */
  display: flex;
  flex-direction: column;
  &.darkbg{
    background-color: ${Color.darkBg};
  }
  .content {
    max-width: 1330px;
    width: 100%;
    margin: 0 auto;
    padding: 60px 20px;
    transition: 0.5s;
    &.nomal_cont{
      padding: 100px 15px 120px;
    }
    /* &.tab{
      margin: 60px auto;
      padding: 0;
    } */
  }
  .MuiSelect-select{
    font-family: Noto Sans CJK KR;
    color: #666;
    height: 24px;
  }
  .select{
    color: ${Color.warm_gray};
    &.Mui-focused{
      display: none;
    }
  }
  textarea{
    &.MuiOutlinedInput-input{
      padding: 0;
    }
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d7dae6;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: ${Color.white};
      border-radius: 10px;
    }
    > div {
      margin-bottom: 10px;
    }
    .MuiRadio-root {
      padding: 0 5px;
    }
    .MuiFormControlLabel-root{
      margin-right: 0;
      margin-bottom: 10px;
      padding-left: 5px;
    }
  }
  
  .MuiFormHelperText-root{
    font-size: 14px;
    letter-spacing: -0.56px;
    margin-left: 0; 
  }
  .MuiFilledInput-root{
    border-radius: 5px;
    color: ${Color.white};
    border: 1px solid ${Color.warm_gray};
    height: 60px;
    font-family: Noto Sans CJK KR;
    &.Mui-error{
      border: 1px solid #fedc00;
    }
    &:before, &:after{
      border: none;
    }
    &:hover{
      border-color: ${Color.white};
    }
    &.Mui-focused{
      border-color: ${Color.topaz};
      color: ${Color.white};
    }
    &:hover:not(.Mui-disabled):before{
      border: none;
    }
  }
  .MuiButton-root{
    line-height: 1;
    font-weight: 400;
  }
  .txtblue {
    color: ${Color.azul};
  }
  em {
    font-style: normal;
  }
  .date {
    color: #707070;
    line-height: 1;
    font-size: 14px;
    letter-spacing: -0.56px;
    display: block;
    font-weight: 400;
    span{
      display: inline-block;
      height: 14px;
      &::after{
        content: '';
        display: inline-block;
        border-right: 1px solid ${Color.gray};
        height: 12px;
        width: 1px;
        margin-right: 7px;
        padding-right: 8px;
      }
      &:last-child{
        border-right: none; 
        &::after{
          display: none;
        }
      }
      em {
        margin-left: 3px;
        height: 14px;
        display: inline-block;
        color: ${Color.black};
        font-weight: 400;
        &.ml0{
          margin-left: 0;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 1200px) {
    padding: 60px 0 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .content {
      padding: 48px 15px 40px;
      &.list{
        padding: 40px 0;
        .sub_tit{
          padding-left: 15px;
        }
      }
    }
    .date {
      span{
        display: block;
        & + span{
          margin-top: 5px;
        }
        &::after{
          display: none;
        }
      }
      
    }
  }
`;

export const sub_cont01 = css`
  position: relative;
  display: block;
  color: ${Color.white};
  transition: 0.5s;
  &.fixed{
    position: fixed;
    width: 100%;
    z-index: 3;
    &.bennrttop{
      transform: translate(0, -61px);
    }
    &.scrollaction{
      .benner{
        min-height: 110px;
      }
      .content{
        &.tab{
          margin: 0 auto;
          padding: 20px 0 0;
        }
      }
      .content{
        padding: 20px 0 0;
      }
      .txtbox {
        .tit{
          font-size: 40px;
          padding-bottom: 10px
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
  .benner {
    position: relative;
    text-align: center;
    background-color: #1f2437;
    padding-top: 20px;
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
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -1.92px;
      text-align: center;
      margin-bottom: 10px;
      margin-top: 0;
      line-height: 1.6;
    }
    p {
      font-size: 16px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.88;
      letter-spacing: -0.64px;
      margin: 0;
      padding: 0;
    }
    & + div{
      margin-top: 40px; 
    }
  }
  .bottom_card {
    height: 60px;
    max-width: 1260px;
    width: 100%;
    padding: 14px 18px 14px 20px;
    margin: 0 auto;
    border-radius: 15px 15px 0 0;
    background-color: ${Color.light_gray02};
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
        letter-spacing: -0.56px;
        &.blue {
          background-color: ${Color.azul};
          color: ${Color.white};
        }
        &.wh {
          background-color: ${Color.white};
          color: ${Color.warm_gray};
          border: 1px solid ${Color.gray};
        }
      }
    }
  }
  .input_w{
    position: relative;
    max-width: 780px;
    margin: 0 auto;
    padding-top: 40px;
    &.Mui-focused {
      border: none;
    }
    .MuiOutlinedInput-root {
      background-color: ${Color.white};
      border-radius: 30px;
      height: 60px;
      width: 100%;
      &:hover{
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
      }
      &.Mui-focused {
        border: none;
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
      }
    }
    .MuiInputLabel-root {
      line-height: 1.8em;
      padding-left: 30px;
      color: ${Color.warm_gray};
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
      .MuiOutlinedInput-root{
        .MuiAutocomplete-input {
          padding: 7.5px 4px 7.5px 30px;
          font-weight: 400;
          letter-spacing: -0.56px;
          color: ${Color.warm_gray};
          font-family: 'Noto Sans CJK KR';
        }
      }
    }
    @media (min-width: 320px) and (max-width: 768px) {
      padding: 30px 0 0;
      .MuiAutocomplete-root {
        width: 100%;
        .MuiOutlinedInput-root{
          height: 50px;
          .MuiAutocomplete-input {
            padding: 5px 4px 5px 20px;
            font-size: 14px;
            letter-spacing: -0.56px;
          }
        }
      }
    }
  }
  
  @media (min-width: 320px) and (max-width: 768px) {
    .txtbox {
      .tit {
        font-size: 28px;
        margin-bottom: 10px;
        letter-spacing: -1.12px;
      }
      p {
        font-size: 14px;
        line-height: 1.88;
        letter-spacing: -0.56px;
      }
    }
    .search_btn {
      width: 80px;
      height: 50px;
      font-size: 16px;
      letter-spacing: -0.64px;
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
    &.fixed{
      &.scrollaction{
        padding-top: 0;
        .benner{
          min-height: 57px;
        }
        .content{
          padding: 0;
        }
        .txtbox {
          .tit{
            padding-top: 12px;
            font-size: 24px;
          }
        }
      }
    }
  }
`;

export const sub_cont02 = css`
  background-color: ${Color.white};
  color: ${Color.black};
  transition: 0.5s;
  &.cont_mgt{
    margin-top: 800px;
  }
  .MuiTypography-h5 {
    height: auto;
    font-size: 28px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: -1.12px;
    margin-bottom: 20px;
  }
  .md_btn {
    color: ${Color.black};
    border: 1px solid ${Color.black};
    width: 220px;
    height: 55px;
    border-radius: 0;
    margin-top: 10px;
  }
  .data {
    height: 24px;
    font-size: 16px;
    letter-spacing: -0.64px;
    line-height: 3;
    font-weight: 400;
    letter-spacing: -4px;
    margin-left: 10px;
    display: inline-block;
    > em {
      height: 19px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.64px;
      color: ${Color.azul};
    }
  }
  .selectBox{
    position: relative;
    .MuiSelect-iconOutlined{
      background: none;
    }
    .MuiInputBase-root{
      .MuiOutlinedInput-root{
        border: none;
        .MuiSelect-root{
          height: 40px;
        }
        .MuiSelect-select{
          min-height: 40px;
        }
        &:hover{
          border: none;
        }
      }
    }
    .MuiSelect-select{
      padding: 10px 40px 10px 16px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .content{
      padding-top: 40px;
      padding-bottom: 20px;
    } 
    .MuiTypography-h5 {
      font-size: 24px;
      line-height: 1.3;
      letter-spacing: -0.96px,
    }
    .selectBox{
      .MuiInputBase-root{
        .MuiOutlinedInput-root{
          .MuiSelect-root{
            height: 40px;
          }
          .MuiSelect-select{
            min-height: 40px;
            font-size: 14px;
            letter-spacing: -0.56px;
          }
        }
      }
      .MuiSelect-select{
        padding: 10px 40px 10px 16px;
        font-size: 14px;
        letter-spacing: -0.56px;
        line-height: 20px;
      }
    }
  }
`;


export const detal_tab = css`
  background-color: #1f2437;
  position: relative;
  width: 100%;
  &.teb_black {
    width: 100%;
    bottom: 0;
    &.fixed{
      /*  transform: translate(0, -100px);
      top: 273px;
      z-index: 3; */
    }
  }
  /* .black{background-color: #1f2437;} */
  .MuiTabs-indicator{
    display: none;
  }
  .MuiTabs-root {
    max-width: 1290px;
    margin: 0 auto;
    min-height: 40px;
  }
  .MuiTabs-flexContainer {
    .MuiButtonBase-root {
      display: flex;
      padding: 15px 32px;
      line-height: 1;
      min-height: 40px;
      border-radius: 10px 10px 0 0;
      color: ${Color.warm_gray};
      background-color: ${Color.line};
      border-right: 1px solid #000;
      flex-direction: row;
      letter-spacing: -0.64px;
      font-weight: 300;
      align-items: center;
      > span{
        font-size: 16px;
        letter-spacing: -0.64px;
      }
      > em{
        margin-left: 4px;
        font-size: 14px;
      }
    }
    .Mui-selected {
      color: #222;
      background-color: ${Color.white};
      font-weight: 500;
      > em{
        color: ${Color.azul};
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTabs-flexContainer {
      padding: 15px 15px 0;
      > button {
        flex: 1;
        font-size: 16px;
        letter-spacing: -0.64px;
      }
    }
    .MuiTabs-flexContainer {
      overflow-x: scroll;
      .MuiButtonBase-root {
        padding: 10.7px 24px 9.3px;
        letter-spacing: -0.56px;
        font-weight: 400;
        min-height: 40px;
        line-height: 1.6;
        flex: none;
        font-size: 14px;
        letter-spacing: -0.56px;
        > span{
          font-size: 14px;
          letter-spacing: -0.56px;
        }
        > em{
          margin-left: 4px;
          font-size: 12px;
        }
      }
      .Mui-selected {
        color: #222;
        background-color: ${Color.white};
        > em{
          color: ${Color.azul};
        }
      }
    }
    .MuiTabs-root {
      min-height: 40px;
    }
    &.fixed{
      top: 250px;
      .back{
        top: 60px;
      }
    }
  .back{
    top: 100px;
  }
  }
`;

export const step03 = css`
  max-width: 464px;
  margin: 30px auto 0;
  align-items: center;
  .MuiStepLabel-label{
    letter-spacing: -1.4px;
    &.MuiStepLabel-alternativeLabel{
      margin-top: 10px;
    }
  }
  .MuiStep-root{
    padding: 0;
    width: 110px;
    .Mui-active{
      color: ${Color.topaz};
      border: none;
      .MuiStepConnector-line{
        border-color: #000;
      }
    }
    .Mui-completed{
      color: ${Color.warm_gray};
      border: none;
      .MuiStepConnector-line{
        border-color: #000;
      }
    }
    .Mui-disabled{
      color: ${Color.gray};
      .MuiStepConnector-line{
        opacity: 0.5;
      }
      .MuiStepIcon-root{
        border: 1px solid ${Color.white};
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
      color: ${Color.topaz};
    }
  }
  .MuiStepIcon-text{
    font-size: 0.6rem;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
    .MuiStack-root{
      flex-direction: column;
    }
  }
`;

export const input_w = css`
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  padding-top: 40px;
  .select_new{
    .MuiInputAdornment-root{
      margin-right: 0;
    }
  }
  .select_plus{
    width: 135px;
    margin-left: -9px;
    .MuiSelect-select{
      color: #707070;
    }
    .MuiOutlinedInput-notchedOutline{
      border: none;
    }
    .MuiSelect-icon{
      right: 0;
    }
  }
  .MuiOutlinedInput-root {
    background-color: ${Color.white};
    border-radius: 30px;
    height: 60px;
    width: 100%;
  }
  .MuiInputLabel-root {
    line-height: 1.8em;
    padding-left: 30px;
    color: ${Color.warm_gray};
    &.Mui-focused{
      display: none;
    }
  }
  .Mui-ficused {
    display: none;
    border: none;
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
    &.Mui-focused {
      border: none;
    }
    .MuiOutlinedInput-root{
      &:hover{
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
      }
      &.Mui-focused {
        border: none;
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
      }
      .MuiAutocomplete-input {
        padding: 7.5px 4px 7.5px 30px;
        font-weight: 400;
        letter-spacing: -0.64px;
        color: ${Color.warm_gray};
        font-family: 'Noto Sans CJK KR';
      }
    }
  }
  
  
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 30px 0 0;
    .MuiAutocomplete-root {
      width: 100%;
      .MuiOutlinedInput-root{
        height: 50px;
        .MuiAutocomplete-input {
          padding: 5px 4px 5px 20px;
          font-size: 14px;
          letter-spacing: -0.56px;
        }
      }
    }
  }
`;


export const tagstyle = css`
  position: relative;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  .MuiChip-root {
    margin-left: 6px;
    border-radius: 5px;
    letter-spacing: -0.56px;
    line-height: 1;
    font-size: 14px;
    font-family: Noto Sans CJK KR;
    font-weight: 300;
    &:first-of-type {
      margin-left: 0;
    }
  }
  .wh {
    background-color: ${Color.white};
    color: ${Color.black};
  }
  .blue {
    background-color: ${Color.azul};
    color: ${Color.white};
  }
  .green {
    background-color: ${Color.topaz};
    color: ${Color.white};
  }
`;

export const qna_list = css`
  margin: 0 auto;
  max-width: 1260px;

  .sub_tit {
    .MuiTypography-root {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 28px;
      font-weight: 700;
      font-stretch: normal;
      line-height: 1.71;
      letter-spacing: -1.12px;
    }
  }
  .MuiList-root {
    //margin-top: 20px;
    padding: 0;
    border-top: 1px solid #1f2437;
    a{
      &:last-of-type{
        .MuiListItem-root{
          border-bottom: none;
        }
      }
    }
    .MuiListItem-root {
      padding: 30px;
      border-bottom: 1px solid ${Color.line};
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
        color: ${Color.azul};
      }
    }
  }
  .MuiButton-root:hover {
    background-color: ${Color.gray};
  }
  .MuiListItem-root {
    padding: 10px 0;
  }
  .MuiListItemText-root {
    padding-right: 80px;
    margin: 0;
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
        padding: 24px 15px;
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
      /* flex-direction: column; */
      .MuiTypography-body1 {
        font-size: 14px;
        letter-spacing: -0.56px;
        margin-bottom: 12px;
      }
      .MuiTypography-body2 {
        font-size: 16px;
        letter-spacing: -0.64px;
        padding-top: 0;
        margin-left: 20px;
        &:before {
          content: 'Q';
          width: 15px;
          margin-right: 6px;
          margin-left: -20px;
          font-size: 16px;
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
    .listflex{
      display: flex;
      justify-content: space-between;
      flex-direction: row; 
    }
    .listflex01{
      flex: 0 0 60%;
      width: 60%;
    }
    .listflex02{
      flex: 0 0 40%;
      justify-content: flex-end;
    }
    .btn_cont{
      position: relative;
      border-bottom: 1px solid ${Color.line}
    }
    .right_tag{
      right: 190px;
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
        z-index: 99;
      }
    }
    .dateBoxto{
      .date{
        margin-top:0;
      }
      > .date + .date{
        margin-top: 10px;
      }
    }
  }
  .mb10{
    margin-bottom: 10px;
  }
  .modalbtn{
    background-color:${Color.gray};
  }
  .date{
    margin: 15px 0 0;
  }
  .right_tag{
    position:absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: #222;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
    em {font-style:normal;font-weight:400;}
    & .blue{
      color: ${Color.azul};
    }
    & .green{
      color: ${Color.topaz};
    }
    & .gray{
      color: ${Color.warm_gray};
    }
  }
  .sub_tit {
    .MuiTypography-root {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 28px;
      font-weight: 700;
      font-stretch: normal;
      line-height: 1.71;
      letter-spacing: -1.12px;
    }
  }
  .MuiList-root {
    //margin-top: 20px;
    padding: 0;
    border-top: 1px solid #1f2437;
    a{
      &:last-of-type{
        .MuiListItem-root{
          border-bottom: none;
        }
      }
    }
    .MuiListItem-root {
      padding: 30px;
      border-bottom: 1px solid ${Color.line};
      &.content_none{
        padding: 86px 30px;
        text-align: center;
        .MuiTypography-root{
          font-size: 16px;
          line-height: 1.75;
          letter-spacing: -0.64px;
          color: #707070;
          font-weight: 400;
        }
      }
      .MuiListItemText-root{
        margin: 0;
      }
    }
  }
  .css-w4z10b-MuiStack-root {
    display: inline-block;
    .MuiChip-root {
      border-radius: 5px;
      margin-left: 12px;
      .MuiChip-label {
        padding: 6px 10px;
        letter-spacing: -0.56px;
        line-height: normal;
        font-size: 14px;
      }
    }
    .new {
      background-color: ${Color.topaz};
      color: ${Color.white};
    }
    .blue {
      background-color: ${Color.azul};
      color: ${Color.white};
    }
    .item{
      background-color: ${Color.light_gray02};
    }
    .wh{
      background-color: ${Color.white};
      border: 1px solid ${Color.gray};
    }
  }
  .tit_body {
    display: flex;
    .MuiTypography-body1 {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 10px;
      color: ${Color.black};
      display: block;
      letter-spacing: -0.8px;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: normal;
      &.mb0{
        margin-bottom: 0;
      }
    }
  }
  .body2 {
    line-height: 1.75;
    letter-spacing: -0.64px;
    font-size: 16px;
    color: ${Color.warm_gray};
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .body3{
    display: inline-block;
    /* margin-top: 20px; */
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    text-align: left;
    color: ${Color.warm_gray};
    em{
      color: #222222;
    }
  }
  .MuiListItem-root {
    padding: 10px 0;
  }
  .Check_listbox {
    .MuiFormControl-root{
      margin-top: 10px;
      width: 100%;
      .MuiFormGroup-root {
        .MuiFormControlLabel-root {
          flex: 0 0 12.1%;
          margin-left: 0;
          margin-right: 5px;
          height: auto;
          align-items: center;
          margin-bottom: 14px;
        }
        .MuiCheckbox-root {
          padding: 0;
          margin-left: 0;
        }
        .MuiTypography-root {
          letter-spacing: -0.64px;
          line-height: 1;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    &.list02{
      .listflex{
        justify-content: space-between;
        flex-direction: column; 
      }
      .listflex01{
        flex: 0 0 100%;
        width: 100%;
      }
      .listflex02{
        flex: 0 0 100%;
        justify-content: space-between;
        margin-left: 0;
        align-items: flex-end;
      }
      .btn_cont{
        position: relative;
        border-bottom: 1px solid ${Color.line}
      }
      .right_tag{
        position:relative;
        right: auto;
        left: 0;
        top: 0;
        transform: translateY(0);
      }
      .right_btn{
        position:relative;
        right: auto;
        left: 0;
        top: 0;
        transform: translateY(0);
        color: #222;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.64px;
        button{
          letter-spacing: -0.56px;
          z-index: 99;
        }
      }
      .dateBoxto{
        .date{
          margin-top:0;
        }
        > .date + .date{
          margin-top: 10px;
        }
      }
    }
    .right_tag{
      right: 15px;
      letter-spacing: -0.56px;
    }
    .sub_tit {
      .MuiTypography-root {
        font-size: 24px;
        line-height: 1.6;
        letter-spacing: -0.96px;
      }
    }
    .date{
      &.manual{
        margin: 12px 0 0;
      }
    }
    .MuiChip-root {
      margin-bottom: 16px;
    }
    .MuiList-root {
      .MuiListItem-root {
        flex-wrap: wrap;
        padding: 24px 0;
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
      flex-direction: column;
      .MuiTypography-body1 {
        font-size: 16px;
        letter-spacing: -0.64px;
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
      letter-spacing: -0.56px;
    }
    .body3{
      margin-top: 16px;
    }
    .Check_listbox {
      .MuiFormControl-root{
        .MuiFormGroup-root {
          .MuiFormControlLabel-root {
            flex: 0 0 48%;
            height: auto;
            align-items: center;
            margin-bottom: 24px;
          }
          .MuiCheckbox-root {
            padding: 0 10px 0 0;
          }
          .MuiTypography-root {
            letter-spacing: -0.56px;
            font-size: 14px;
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
    font-weight: 400;
    dl{
      display: flex;
      height: 48px;
      margin-bottom: 10px;
      align-items: center;
      max-width: 100%;
      dt{
        flex: 0 0 35%;
      }
      dd{
        flex: 0 0 65%;
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
    color: ${Color.line};
    margin: 40px 0;
    hr{
      border-top: 1px solid ${Color.line};
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
  @media (min-width: 320px) and (max-width: 768px) {
    .input_form{
      margin: 40px 15px 0;
    }
  }
`;

export const detal_btn = css`
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  .MuiButton-root {
    margin-top: 20px;
    background-color: rgba(0 0 0 /0);
    color: ${Color.white};
    border: none;
    font-size: 14px;
    letter-spacing: -0.56px;
    border-radius: 0;
    line-height: 1.2;
    font-weight: 400;
    border-bottom: 1px solid ${Color.white};
    padding: 0;
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
  height: 181px;
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
      border-bottom: 1px solid ${Color.line};
      border-left: 1px solid ${Color.line};
    }
    dd {
      margin-left: 0;
      text-align: left;
      border-left: 1px solid ${Color.line};
      letter-spacing: -0.64px;
      padding: 6px;
      .box_scroll{
        padding: 12px 14px 0 14px;
        height: 120px;
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
          background-color: ${Color.white};
          border-radius: 10px;
          width: 10px;
        }
      }
      > div {
        margin-bottom: 10px;
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
  @media (min-width: 320px) and (max-width: 768px) {
    .table_form {
      th {
        font-size: 14px;
        letter-spacing: -0.56px;
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

export const table = css`
  display: flex;
  height: 280px;
  border-radius: 15px;
  .MuiTableHead-root {
    th {
      font-size: 18px;
      font-weight: 700;
      padding: 12px;
    }
    td {
      padding: 20px;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
    }
  }
  tbody {
    overflow: auto;
  }
  .MuiCheckbox-root {
    padding: 0;
    margin-right: 10px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTableHead-root {
      th {
        font-size: 14px;
        letter-spacing: -0.56px;
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

export const clause_check = css`
  font-size: 16px;
  letter-spacing: -0.64px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  .point_txt{
    font-size: 14px;
    line-height: 2;
    letter-spacing: -0.56px;
    color: ${Color.topaz};
  }
  .MuiFormControlLabel-root{
    margin-left: -10px;
    margin-right: 2px;
    .MuiFormControlLabel-label{
      font-weight: 400;
    }
  }
`;
// 약관박스
export const clause_Box = css`
  height: 401px;
  margin: 0 0 3px;
  padding: 16px 6px 0 16px;
  border-radius: 20px;
  border: solid 1px ${Color.gray};
  margin-top: 2px; 
  overflow: hidden;
  .scroll{
    overflow: auto;
    height: 382px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d7dae6;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: ${Color.white};
      border-radius: 10px;
    }
  }
  .MuiRadio-root {
    padding: 0 5px;
  }
  .MuiFormControlLabel-root{
    margin-right: 0;
    margin-bottom: 10px;
    padding-left: 5px;
  }
  .MuiTypography-h6 {
    font-size: 16px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: -0.64px;
    margin-bottom: 16px;
  }
  p{
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: -0.56px;
    text-align: left;
    color: #222;
    margin-bottom: 8px;
    margin-top: 35px;
    &:first-of-type{
      margin-top: 16px;
    }
    &.fisttit{
      margin-top: 16px;
    }
  }
  .text_box{
    color: ${Color.warm_gray};
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: -0.56px;
    font-weight: 300;
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
  .tag{
    .MuiChip-root {
      border-radius: 5px;
      color: ${Color.warm_gray};
      .MuiChip-label {
        padding: 6px 10px;
        line-height: 1;
        letter-spacing: -0.56px;
        font-size: 14px;
      }
    }
    .new {
      background-color: ${Color.topaz};
      color: ${Color.white};
    }
    .blue {
      background-color: ${Color.azul};
      color: ${Color.white};
    }
  }
  .noticelist{
    padding:0;
    margin-bottom: 40px;
    .MuiListItem-root{
      padding: 0;
    }
  }
  .MuiList-root {
    width: 100%;
    height: 100%;
    padding: 0;
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
    color: ${Color.black};
    margin-bottom: 12px;
    letter-spacing: -0.8px;
  }
  .MuiTypography-body2 {
    .body2 {
      line-height: 1.75;
      letter-spacing: -0.64px;
      font-size: 16px;
      display: -webkit-box;
      color: ${Color.warm_gray};
      margin-bottom: 25px;
      min-height: 52px;
      font-weight: 400;
    }
  }
  .MuiButton-root:hover {
    background-color: ${Color.gray};
  }
  .MuiListItem-root {
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 40px;
    .MuiChip-root {
      margin-top: 15px;
      .MuiChip-label {
        padding: 6px 10px;
        font-size: 12px;
        letter-spacing: -0.48px;
        line-height: 1.5;
      }
    }
    .MuiList-root {
      .MuiListItem-root {
        flex-wrap: wrap;
      }
      .MuiListItemText-root {
        flex: 0 0 100%;
      }
      .MuiListItemAvatar-root {
        flex: 0 0 100%;
        img {
          height: 230px;
        }
      }
    }
    .MuiTypography-body1 {
      font-size: 18px;
      margin-bottom: 10px;
      padding-top: 15px;
    }
    .MuiTypography-body2 {
      .body2 {
        font-size: 14px;
        margin-bottom: 20px;
        letter-spacing: -0.56px;
      }
    }
  }
  .css-11k5jid-MuiStack-root > :not(style) + :not(style) {
    margin: 0;
  }
`;
export const slide_cont02 = css`
  position: relative;
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  &.swiper-container {
    padding-bottom: 48px;
    margin-bottom: 60px;
    margin-right: -160px;
  }
  .blind{
    width: 150px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .swiper-pagination-bullets {
    position: absolute;
    bottom: 0 !important;
    display: block;
    z-index: 9;
    width: 100%;
    text-align: center;
    height: 20px;
    .swiper-pagination-bullet {
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: ${Color.gray};
      margin-right: 10px;
      opacity: 1;
      border-radius: 0;

    }
    .swiper-pagination-bullet-active {
      background-color: ${Color.topaz};
    }
  }
  @media (min-width: 768px) and (max-width: 1400px) {
    &.swiper-container {
      margin-right: -15px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .swiper-pagination-bullets {
      display: none;
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
    &.swiper-container {
      padding-bottom: 0;
      margin-bottom: 0;
      margin-right: -15px;
    }    
  }
`;
export const hotslide = css`
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  color: ${Color.white};
  max-width: 380px;
  box-shadow: none;
  // box-shadow: 0px 2px 3px 1px rgb(0, 0, 0, 0.3);
  .black {
    color: #222;
  }
  .MuiCardContent-root {
    padding: 20px 0 0;
  }
  .sub_txt {
    color: #8f929b;
    line-height: 1;
    font-size: 14px;
    margin: 7px 0;
    letter-spacing: -0.56px;

  }
  .fw_rg{
    font-weight: 300;
  }
  .MuiTypography-h6 {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.8px;
    color: ${Color.black};
    margin-bottom: 16px;
    height: 64px;
  }
  .fw_3{
    font-weight: 300;
  }
  .tag {
    position: absolute;
    top: 0;
    justify-content: start;
    width: 100%;
    border: solid 1px var(--pinkish-grey);
    letter-spacing: -0.56px;
    font-size: 14px;
    .MuiChip-label{
      line-height: 1.4;
      border-radius: 5px;
    }
    .wh {
      background-color: ${Color.white};
      color: ${Color.warm_gray};
      border-radius: 0 10px 0 10px;
      margin-left: auto;
    }
    .blue {
      background-color: ${Color.azul};
      color: ${Color.white};
      border-radius: 10px 0 10px 0;
    }
    &+.MuiChip-root{
      justify-content: space-between;
    }
  }
  .MuiCardActionArea-root {
    > img {
      border-radius: 15px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h5 {
      font-size: 22px;
    }
    .MuiSelect-select {
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    .MuiTypography-h6{
      height: 48px;
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
    .tag {
      .MuiChip-root{
        font-size: 12px;
        letter-spacing: -0.48px;
        line-height: 1.2;
      }
      .wh {
        background-color: ${Color.white};
        color: ${Color.warm_gray};
        border-radius: 0 10px 0 10px;
      }
      .blue {
        background-color: ${Color.azul};
        color: ${Color.white};
        border-radius: 10px 0 10px 0;
      }
    }
  }
`;
// 모달부분
export const modalCard = css`
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 15px;
  color: ${Color.white};
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
    letter-spacing: -0.56px;
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
    color: ${Color.black};
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
      background-color: ${Color.white};
      color: ${Color.black};
    }
    .blue {
      background-color: ${Color.azul};
      color: ${Color.white};
    }
    .green {
      background-color: ${Color.topaz};
      color: ${Color.white};
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
      letter-spacing: -0.56px;
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
  }
`;

export const detal_txtBox = css`
  padding-bottom: 30px;
  border-bottom: 1px solid ${Color.line};
  text-align: center;
  
  .MuiTypography-h5 {
    line-height: 1.71;
    letter-spacing: -1.12px;
    font-size: 28px;
    margin-bottom: 15px;
    &.mb0{
      margin-bottom: 0;
    }
  }
  .text01 {
    margin-top: 32px;
    margin-bottom: 50px;
    line-height: 1.89;
    letter-spacing: -0.72px;
    font-size: 18px;
    font-weight: 400;
  }
  .date{
    margin-top: 15px;
    span{
      &::after{
        margin-right: 16px;
        padding-right: 16px;
      }
    }
  }

  .detail_chip{
    margin-bottom: 10px;
  }
  > p {
    font-size: 18px;
    margin: 0;
    line-height: 1.67;
    letter-spacing: -0.72px;
    &.date_text{
      margin-bottom: 8px;
    }
    &.company_text{
      font-weight: 400;
    }
  }
  .bold {
    font-weight: 700;
  }
  .mid {
    font-weight: 500;
  }
  
  .q_icon{
    color: ${Color.azul};
    font-size: 28px;
    line-height: 1;
    letter-spacing: -1.12px;
    text-align: center;
    font-weight: 700;
    height: 34px;
    margin-bottom: 5px;
  }
  
  @media (min-width: 320px) and (max-width: 768px) {
    padding-bottom: 30px;
    margin-bottom: 20px;
    .MuiTypography-h5 {
      line-height: 1.5;
      letter-spacing: -0.8px;
      font-size: 20px;
    }
    .text01 {
      margin-top: 24px;
      margin-bottom: 30px;
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    > p {
      font-size: 14px;
      letter-spacing: -0.56px;
      &.company_text{
        margin-bottom: 0;
      }
    }
    .q_icon{
      font-size: 24px;
      height: 29px;
      margin-bottom: 10px;
    }
    .detail_chip{
      .MuiChip-root{
        margin-bottom: 0;
      }
    }
  }
`;

export const box_graylist = css`
  padding: 30px;
  border-radius: 5px;
  background-color: ${Color.light_gray02};
  margin-bottom: 48px;
  ul{
    li{
      padding: 0;
      margin-top: 5px;
      letter-spacing: -0.56px;
      line-height: 1.75;
      &:first-of-type{
        margin-top: 0;
      }
      &:before{
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        margin: 6px 8px 4px 0;
        background-color: ${Color.warm_gray};
        border-radius: 10px;
      }
      em{
        color: ${Color.topaz};
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 15px;
    margin-bottom: 40px;
    ul{
      li{
        padding: 0;
        margin-top: 5px;
        font-size: 14px;
        letter-spacing: -0.56px;
        line-height: 1.6;
        &:before{
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          margin: 6px 8px 4px 0;
          background-color: ${Color.warm_gray};
          border-radius: 10px;
        }
        em{
          color: ${Color.topaz};
        }
      }
    }
  }
`;

export const box_gray = css`
  padding: 30px;
  border-radius: 5px;
  background-color: ${Color.light_gray02};
  .MuiTypography-h3{
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.8px;
  }
  .MuiTypography-root{
    letter-spacing: -0.64px;
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
          background-color: ${Color.warm_gray};
          border-radius: 10px;
        }
      }
    }
  }
`;

export const table01 = css`
  margin-top: 60px;
  margin-bottom: 40px;
  letter-spacing: -0.64px;
  table {
    border-top: 1px solid #222;
    width: 100%;
    border-spacing: 0;
    tr {
      display: flex;
      border-bottom: 1px solid ${Color.line};
    }
    th {
      padding: 20px 20px;
      text-align: left;
      width: 20%;
      background-color: ${Color.light_gray02};
      font-weight: 500;
    }
    td {
      width: 30%;
      padding: 16px 20px;
      line-height: 1.75;
      font-weight: 400;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
      &.blue{
        color: ${Color.azul};
        font-weight: 400;
      }
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
    margin-top: 30px;
    table {
      width: 200%;
      margin-bottom: 15px;
      tr{
        font-size: 14px;
      }
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
      border-bottom: 1px solid ${Color.line};
    }
    th {
      padding: 11px 20px;
      background-color: ${Color.light_gray02};
      width: 70%;
      text-align: center;
      font-weight: 500;
      &:first-of-type {
        width: 30%;
        border-right: 1px solid ${Color.line};
      }
    }
    td {
      padding: 11px 20px;
      width: 70%;
      &:first-of-type {
        width: 30%;
        border-right: 1px solid ${Color.line};
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
  .MuiOutlinedInput-root{
    height: 48px;
  }
  .tableDefault thead th{
    height: 60px;
  }
  .table_tit{
    align-items: center;
    button{
      margin-bottom: 10px;
      letter-spacing: -0.56px;
    }
    .MuiIconButton-root{
      margin-bottom: 0;
    }
  }
  .MuiTypography-h6{
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1.67;
    margin-bottom: 20px;
    letter-spacing: -0.72px;
    font-weight: 400;
    em{
      color: ${Color.topaz};
    }
    span{
      font-size: 14px;
      letter-spacing: -0.56px;
      font-weight: 300;
      color: ${Color.warm_gray};
    }
  }
  .detail_table{
    border-top: 1px solid #1f2437;
    margin-bottom: 40px;
  }
  .table_input{
    padding: 6px 8px;
    .MuiOutlinedInput-input{
      padding: 12.5px 16px;
    }
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
      padding: 15.5px 20px;
      text-align: left;
      background-color: ${Color.light_gray02};
      border-bottom: 1px solid ${Color.line};
      font-weight: 400;
      letter-spacing: -0.72px;
      line-height: 1.75;
      &.wh{
        background-color: ${Color.white};
      }
      em{
        color: ${Color.topaz};
        margin-left: 4px;
      }
    }
    dd {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 15.5px 20px;
      line-height: 1.75;
      align-items: center;
      border-bottom: 1px solid ${Color.line};
      margin-left: 0;
      font-weight: 400;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h6{
      font-size: 16px;
      letter-spacing: -0.64px;
      margin-bottom: 10px;
    }
    .tableDefault{
      border-top: 1px solid #1f2437;
    }
    .tableDefault tbody th{
      text-align: center;
      height: 52px;
      border-bottom: none;
      border-top: none;
    }
    .tableDefault tbody td{
      border:none;
    }
    .table_tit{
      align-items: center;
      button{
        height: 44px !important;
        font-size: 14px !important;
        margin-bottom: 6px;
      }
      .MuiIconButton-root{
        margin-bottom: 0;
      }
    }
    .detail_table{
      margin-bottom: 30px;
    }
    dl {
      flex-wrap: wrap;
      dt {
        flex: 0 0 30%;
        padding: 14px 18px;
        font-size: 14px;
        letter-spacing: -0.56px;
        height: auto;
      }
      dd {
        flex: 0 0 70%;
        padding: 14px 18px;
        font-size: 14px;
        letter-spacing: -0.56px;
        height: auto;
      }
    }
  }
`;

export const table04 = css`
  max-width: 100%;
  letter-spacing: -0.64px;
  .MuiTypography-h6{
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 400;
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
      .MuiOutlinedInput-input{
        font-size: 16px;
        letter-spacing: -0.64px;
        font-weight: 400;
        padding: 11.5px 14px;
        color: #222;
        font-family: "Noto Sans CJK KR", "Roboto";
      }
      &.pt0{
        padding-top: 0;
      }
      &.datepick{
        .MuiOutlinedInput-input{
          letter-spacing: -0.64px;
          padding-right: 0; 
        }
      }
      &.alignr{
        text-align: right;
        .MuiOutlinedInput-input{
          text-align: right;
        }
      }
      .MuiInputBase-root{
        height: 48px;
      }
    }
    th, dt {
      height: auto;
      padding: 20px 20px;
      text-align: left;
      background-color: ${Color.light_gray02};
      border-bottom: 1px solid ${Color.line};
      font-weight: 500;
      vertical-align: middle;
      &.wh{
        background-color: ${Color.white};
      }
      &.table_input{
        padding-left: 0;
        &.pt0{
          padding-top: 0;
        }
        .MuiInputBase-root{
          height: 48px;
        }
      }
      em{
        color: ${Color.topaz};
        margin-left: 4px;
      }
    }
    td, dd {
      height: auto;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      line-height: 1.6;
      align-items: center;
      border-bottom: 1px solid ${Color.line};
      margin-left: 0;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
      .blue{
        color:${Color.azul};
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
    color:${Color.azul};
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
    .MuiTypography-h6{
      font-size: 16px;
      letter-spacing: -0.64px;
      margin-bottom: 10px;
    }
    table {
      letter-spacing: -0.56px;
      th {
        font-size: 14px;
      }
      td {
        font-size: 14px;
      }
      .MuiOutlinedInput-input{
        font-size: 14px;
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
    font-weight: 400;
  }
  table {
    border-top: 1px solid #222;
    width: 100%;
    border-spacing: 0;
    margin-bottom: 40px;
    tr {
      display: flex;
      border-bottom: 1px solid ${Color.line};
      font-size: 16px;
      letter-spacing: -0.64px;
    }
    th {
      padding: 20px 20px;
      text-align: left;
      width: 20%;
      background-color: ${Color.light_gray02};
      font-weight: 500;
    }
    td {
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      width: 80%;
      padding: 0 20px;
      line-height: 3.5;
      align-items: center;
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
      }
      &.table_input{
        padding: 6px 8px;
        .MuiInputBase-root{
          height: 48px;
        }
      }
      .blue{
        color:${Color.azul};
        font-size: 16px;
        letter-spacing: -0.64px;
        font-weight: 400;
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
      &.modal_pad{
        button{
          padding: 0;
          font-size: 16px;
          color:${Color.azul};
          letter-spacing: -0.64px;
          font-weight: 400;
          &:after {
            content: '';
            width: 8px;
            height: 11px;
            margin-left: 9px;
            display: inline-block;
            background: url('/images/common/gt_blue.png') no-repeat;
          }
        }
      }
    }
  }
  
  .blue{
    color:${Color.azul};
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
      color: ${Color.warm_gray};
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
    letter-spacing: normal;
    th, td{
      border-right: 1px solid ${Color.line};
      letter-spacing: normal;
      &:last-child{
        border-right: none;
      }
    }
    th{
      background-color: ${Color.light_gray02};
      font-weight: 400;
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
      font-weight: 400;
      margin-bottom: 8px;
      font-size: 18px;
      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 3px 10px 3px 0;
        border-radius: 100%;
        background-color: ${Color.warm_gray};
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
        letter-spacing: -0.56px;
      }
    }
  }
`;

export const detal_img = css`
  margin-top: 20px;
  padding-bottom: 60px;
  .img_box {
    width: 100%;
    min-height: 200px;
    height: auto;
    margin-bottom: 16px;
    text-align: center;
    /* background-color: ${Color.gray}; */
    // back 색깔 임시
  }
  .txt_box {
    margin-bottom: 16px;
    line-height: 1.63;
    letter-spacing: -0.64px;
    font-weight: 400;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .txt_box {
      letter-spacing: -0.56px;
      font-size: 14px;
    }
  }
`;

export const box_type = css`
  width: 100%;
  border-radius: 10px;
  background-color: ${Color.light_gray02};
  margin-bottom: 20px;
  padding: 24px 40px;
  font-size: 18px;
  line-height: 1.67;
  letter-spacing: -0.72px;
  .MuiStack-root {
    flex-wrap: wrap;
  }
  strong {
    height: 20px;
    min-width: max-content;
    margin-right: 40px;
    padding-right: 40px;
    border-right: 2px solid ${Color.gray};
    line-height: 1;
    font-weight: 400;
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
      margin-right: 8px;
      display: inline-block;
      background: url('/images/common/icon_link.png') no-repeat;
    }
    a {
      text-decoration: underline;
      margin-right: 30px;
      font-size: 14px;
      letter-spacing: -0.56px;
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
  .filenone{
    font-size: 14px;
    color: #222;
    letter-spacing: -0.56px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 20px;
    padding: 20px 15px;
    font-size: 16px;
    letter-spacing: -0.64px;
    .MuiStack-root {
      display: block;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    .flexmo {
      flex-direction: column;
    }
    strong {
      font-size: 16px;
      height: 20px;
      margin-right: 0;
      padding-right: 0;
      border-right: none;
      margin-bottom: 15px;
      width: 100%;
      &.noline{
        border-right: none;
        padding-right: 0;
        margin-right: 0;
        margin-bottom: 0;
        width: 108px;
      }
    }
    .link_type {
      margin-left: 20px;
      margin-bottom: 15px;
      &:last-of-type{
        margin-bottom: 0;
      }
    }
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
    background-color: ${Color.white};
    &.kakao{background: url('/images/common/kakao_50_new_min.png')}
    &.naver{background: url('/images/common/naver_icon.png')}
    &.google{background: url('/images/common/google_icon.png'); border: 1px solid ${Color.line};}
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
      margin-left: 60px;
      line-height: 1.75;
      letter-spacing: -0.64px;
      .date{
        margin-top: 30px;
        span{
          &::after{
            margin-right: 16px;
            padding-right: 16px;
          }
          em{
            margin-left: 0;
          }
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    dl{
      flex-direction: column;
      dt {
        font-size: 16px;
        letter-spacing: -0.64px;
      }
      dd{
        margin-left: 0;
        margin-top: 15px;
        .date{
          margin-top: 20px;
        }
      }
    }
  }
`;

export const sns_switch = css`
  box-shadow: inset 0 0 0 1px ${Color.line};
  padding: 20px 33px 20px 20px;
  height: 90px;
  border-radius: 10px;
  width: 460px;
  &.check_line{
    box-shadow: inset 0 0 0 2px ${Color.primary};
    .textbox{
      em{
        color: ${Color.primary};
      }
    }
  }
  .textbox{
    font-weight: 400;
    color: #222;
    line-height: 1.75;
    letter-spacing: -0.64px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span{
      color: ${Color.warm_gray};
      font-weight: 300;
      font-size: 14px;
      line-height: 1;
      letter-spacing: -0.64px;
    }
    em{
      margin-left: 4px;
      letter-spacing: -0.56px;
      color: ${Color.warm_gray};
    }
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
        transform: translateX(-15px);
      }
    }
    & .MuiSwitch-switchBase {
      padding: 6px;
      right: 0;
      width: 56px;
      &.Mui-checked {
        transform: translateX(-15px);
        color: ${Color.white};
        & + .MuiSwitch-track {
          opacity: 1;
          background-color: ${Color.azul};
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
      background-color: ${Color.gray};
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
  border-top: 1px solid ${Color.gray};
  > a, .pagelist{
    display: flex;
    align-items: center;
    padding: 28px 40px;
    border-bottom: 1px solid ${Color.line};
    font-size: 16px;
    letter-spacing: -0.64px;
    .txt01 {
      margin-right: 53px;
      font-weight: 400;
    }
    .txt02 {
      margin: 0;
      font-weight: 400;
      line-height: 1.43;
      color: ${Color.warm_gray};
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
      margin-right: 8px;
      display: inline-block;
      background: url('/images/common/arrow_next.png') no-repeat;
    }
  }
  .prev {
    &:before {
      content: '';
      width: 15px;
      height: 10px;
      margin-right: 8px;
      display: inline-block;
      background: url('/images/common/arrow_prev.png') no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    border-top: 1px solid ${Color.line};
    > a, .pagelist{
      padding: 28px 15px;
      .txt01 {
        margin-right: 20px;
        min-width: 85px;
        font-size: 14px;
        letter-spacing: -0.56px;
      }
      .txt02 {
        margin-right: 20px;
        min-width: 85px;
        font-size: 14px;
        letter-spacing: -0.56px;
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
      &:before {
        margin-right: 15px;
      }
    }
  }
`;

//sns 아이콘버튼
export const btnMinSns = css`
  justify-content: end;
  margin-top: 60px;
  margin-bottom: 20px;
  > button, a {
    height: 40px;
    border-radius: 40px;
    min-width: 40px;
    margin-right: 10px;
    &.face {
      background: url('/images/common/pace_icon_min.png') no-repeat;
    }
    &.newface {
      background: url('/images/common/pace_icon_new_min.png') no-repeat;
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
      border: 1px solid ${Color.gray};
      font-size: 13px;
      font-weight: 300;
      line-height: 2;
      letter-spacing: -0.52px;
      color: ${Color.warm_gray};
      margin-right: 0;
    }

  }
  @media (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
    margin-top: 40px;
    > button {
      font-size: 16px;
    }
  }
`;

// 파일 다운로드 버튼
export const btnDown = css`
  justify-content: left;
  flex-direction: column;
  margin: 4px 0;
  button {
    height: 48px;
    border-radius: 24px;
    padding: 14px 24px;
    font-size: 14px;
    line-height: 1.5;
    background-color: ${Color.white};
    border: solid 1px ${Color.gray};
    color: ${Color.black};
    letter-spacing: -0.56px;
    font-weight: 700;
    margin-right: 6px;
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
      &+button{
        margin-top: 10px;
      }
      > span {
        max-width: 200px;
      }
    }
  }
`;

export const primary = css`
  :hover{
    box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
  } 
`
export const line = css`
  :hover{
    box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
  } 
`

// 버튼속성그룹
export const btnGroup = css`
  justify-content: center;
  margin-top: 40px;
  &.mt20{
    margin-top: 20px;
  }
  > button, .MuiButton-root{
    height: 60px;
    border-radius: 40px;
    width: 220px;
    font-size: 18px;
    letter-spacing: -0.72px;
    font-weight: 400;
    line-height: 1.5;
    padding: 17px 36px;
    box-shadow: none;
    &.primary{
      background-color: ${Color.azul};
      color: ${Color.white};
      &:hover{
        box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
      } 
    }
    &.linebtn {
      border: 1px solid ${Color.azul};
      background-color: ${Color.white};
      &.mini {
        width: 140px;
      }
      &:hover{
        box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
      }
    }
    &.linebtn03 {
      border: 1px solid ${Color.white};
      color: ${Color.white};
      background-color: none;
      &:hover{
        box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 10%);
      }
    }
    &.blue {
      background-color: ${Color.azul};
      width: 100%;
      color: ${Color.white};
    }
    &.linebtn02 {
      border: 1px solid #222;
      color: #222;
      background-color: ${Color.white};
    }
    &.blue02 {
      background-color: ${Color.azul};
      color: ${Color.white};
      min-width: 140px;
      width: auto;
    }
    &.blind {
      background-color: ${Color.line};
      color: ${Color.warm_gray};
      min-width: 140px;
      width: auto;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin: 40px 0 0;
    > button {
      font-size: 16px !important; 
      height: 52px !important;
      &.full{
        width: 100% !important;
      }
      &.blue02 {
        width: 100% !important;
      }
    }
  }
`;
export const fileBtn = css`
  justify-content: end;
  margin-bottom: 40px;
  @media (min-width: 320px) and (max-width: 768px) {
    > button {
      font-size: 14px !important; 
      width: 73px !important;
      min-width: 73px !important;
    }
  }
`;
//사업정보관리 모달부분
export const modalCustom = css`
  position: relative;
  &.home_tabpop{
    margin-top: 22px;
    min-width: 500px;
    min-height: 300px;
  }
  .MuiTabs-flexContainer{
    width: 100%;
    border-bottom: 1px solid #1f2437;
  }
  .MuiTabs-root{
    min-height: 40px;
    border:none;
  }
  .MuiTabs-indicator{
    height: 1px;
    background-color: #1f2437;
  }
  .MuiTypography-h6{
    font-size: 18px;
    line-height: 1.67;
    letter-spacing: -0.72px;
    font-weight: 400;
  }
  .modal_text{
    font-size: 15px;
    line-height: 1.87;
    letter-spacing: -0.6px;
  }
  .popup_listbtn{
    display: flex;
    width: 58px;
    position: absolute;
    top: -46px;
    right: 44px;
    height: 24px;
    .blind{
      opacity: 0.3;
    }
    .next{
      background: url('/images/common/pop_next.png') no-repeat;
      width: 24px;
      height: 24px;
      position: absolute;
      right: 0;
    }
    .prev{
      background: url('/images/common/pop_prev.png') no-repeat;
      width: 24px;
      height: 24px;
      position: absolute;
      left: 0;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    &.home_tabpop{
      min-width: auto;
      min-height: auto;
    }
    .MuiTypography-h6{
      font-size: 16px;
      letter-spacing: -0.64px;
      line-height: 28px;
    }
    .modal_text{
      font-size: 14px;
      line-height: 26px;
      letter-spacing: -0.56px;
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
  background-color: ${Color.white};
  box-shadow: 24;
  padding: 24px 15px 20px;
  border-radius: 20px 20px 0 0;
  h2 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.64px;
    > button {
      color: ${Color.warm_gray};
      position: absolute;
      right: 20px;
    }
  }
  h3 {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
  }
  .MuiTabs-indicator{
    background-color: #000;
  }
  .stylesFactory {
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
  &.btntype_radio{
    width: 100%;
    height: calc(100% - 20px);

    &.--search {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      height: auto;
      max-height: calc(100% - constant(safe-area-inset-bottom) - 20px);
      max-height: calc(100% - env(safe-area-inset-bottom) - 20px);
    }

    .scrollpop{
      overflow: scroll;
      height: 100%;
      padding-bottom: 20px;
    }
    .MuiFormGroup-root{
      display: flex;
      width: 100%;
      flex-direction: row;
      &:first-of-type{
        .MuiFormControlLabel-root{
          margin-left: 0;
        }
      }
    }
    .MuiRadio-root, .MuiCheckbox-root{
      width: 100%;
      background-color: none;
      height: 48px;
      border-radius: 5px;
      border: 1px solid ${Color.warm_gray};
      &.Mui-checked{
        background-color: ${Color.azul};
        border: none;
        color: ${Color.white};
        &+span{
          color: ${Color.white};
        }
        .MuiSvgIcon-root{
          display: none;
        }
        &::before,&::after{
          display: none;
        }
      }
      .MuiSvgIcon-root{
        display: none;
      }
      &::before,&::after{
        display: none;
      }
    }
    .MuiFormControlLabel-label{
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      letter-spacing: -0.56px;
      font-size: 14px;
      font-weight: 300;
    }
    .MuiFormControlLabel-root{
      margin-left: 15px;
      margin-top: 15px;
      position: relative;
      margin-right: 0;
      flex: 0 0 47%;
      text-align: center;
      width: 47%;

      &:nth-last-of-type(2n){
        margin-left: 0;
      }
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
    background-color: ${Color.azul};
  }
  .gray {
    background-color: #adaeb2;
  }
  .gray:hover {
    background-color: #9b9b9b;
  }
  .sky {
    background-color: #ebeffd;
    color: ${Color.azul};
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
    width: 380px;
    &:nth-of-type(3n){
      margin-right: 0;
    }
  }
  .MuiCard-root{
    background-color: rgba(0, 0, 0, 0);
    border-radius: 15px;
    color: ${Color.white};
    box-shadow: none;
  }
  .MuiCardContent-root {
    padding: 20px 0 0;
    .date {
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
        color: ${Color.black};
        margin-left: 5px;
      }
    }
  }
  .MuiTypography-root {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -1.3px;
    color: ${Color.black};
    margin-bottom: 17px;
  }
  .tag {
    position: absolute;
    top: 1px;
    right: 1px;
    z-index: 1;
    justify-content: end;
    width: 100%;
    letter-spacing: -0.56px;
    .MuiChip-label{
      padding-left: 10px;
      padding-right: 10px;
    }
    .MuiChip-root{
      font-size: 12px;
    }
    .blue {
      background-color: ${Color.azul};
      color: ${Color.white};
      border-radius: 0 10px 0 10px;
    }
  }
  .MuiCardActionArea-root {
    > img {
      border-radius: 15px;
      border: solid 1px rgba(204, 204, 204, 0.35);
      height: 200px;
    }
  }
  @media (min-width: 780px) and (max-width: 1200px) {
    > a {
      margin-right: 0;
      &:nth-of-type(even){
        margin-left: 30px;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 780px) {
    margin: 15px;
    > a {
      margin-bottom: 40px;
      margin-right: 0;
      margin-left: 0;
      width: 340px; 
      &:nth-of-type(even){
        margin-left: 0;
      }
      &:nth-of-type(3n){
        margin-left: 0;
      }
    }
    .tag {
      font-size: 12px;
    }
    .MuiTypography-h5 {
      font-size: 22px;
      line-height: 1.4;
    }
    .MuiSelect-select {
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    .MuiTypography-root {
      font-size: 18px;
      letter-spacing: -0.72px;
      line-height: 1.2;
    }
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px;
      }
    }
    .MuiCardActionArea-root {
      > img {
        height: 230px;
      }
    }
  }
`;

export const picker_card = css`
  display: flex;
  max-width: 780px;
  margin: 20px auto 0;
  background-color: ${Color.white};
  border-radius: 10px;
  border: solid 1px ${Color.line};
  color: ${Color.black};
  text-align: center;
  dl {
    border-right: 1px solid ${Color.line};
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
      border-bottom: 1px solid ${Color.line};
      font-size: 18px;
      padding: 13.2px 0;
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
          background-color: ${Color.white};
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
        padding-bottom: 16px;
        text-align: left;
        font-weight: 400;
      }
      dd{
        padding: 0;
        margin-bottom: 32px;
      }
    }
  }
`;


export const inputBox = css`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  /* .MuiTextField-root{
    .MuiOutlinedInput-root{
      padding: 15px 6px 15px 16px;
    }
  } */
  .selbox{width:220px;}
  .MuiOutlinedInput-input{
    padding: 12px 16px 13px;
  }
  .MuiTextField-root{
    &.scrollBox{
      .MuiOutlinedInput-root{
        padding: 6px;
        textarea{
          padding: 9px;
        }
      }
    }
  }
  .MuiOutlinedInput-root{
    border-color: #ccc;
    .MuiOutlinedInput-notchedOutline{
      border-color: #ccc;
      border-width: 1px;
    }
    &.Mui-focused, &:hover {
      .MuiOutlinedInput-notchedOutline{
        border-color: #ccc;
        border-width: 1px;
      }
    }
  }
  .inputtxt{
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.67;
    letter-spacing: -0.72px;
    font-weight: 500;
    em{
      color: ${Color.topaz};
      margin-left: 4px;
    }
  }
  .count{
    margin-top: 8px;
    text-align: right;
    font-size: 14px;
    letter-spacing: normal;
    color: #666;
    font-weight: 300;
  }
  Button{
    margin: 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 25px;
    label{
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    input {
      padding: 15px 14px;
    }
    .inputtxt{
      font-size: 16px;
      letter-spacing: -0.64px;
    }
    .MuiStack-root-deletTag>:not(style)+:not(style) {
        margin-left: 0;
    }
  }
`;
export const modal_Box = css`
  width: 560px;
  padding: 24px 50px 0;
  &.pass_popinput{
    .inputtxt{
      flex: 0 0 30%;
    }
  }
  .boxinput_mg{
    margin-bottom: 30px;
  }
  .tit_text{
    text-align: center;
    letter-spacing: -0.64px;
    line-height: 1.6;
    margin-bottom: 30px;
    font-weight: 400;
  }
  .modal_Card{
    border: 1px solid ${Color.line};
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
          padding-left: 12px;
          &:before{
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            margin: 5px 8px 4px -12px;
            background-color: ${Color.warm_gray};
            border-radius: 10px;
          }
          &:last-of-type{
            margin-bottom: 0;
          }
        }
      }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    padding: 24px 0;
  }
`;
export const modal_inputBox = css`
  position: relative;
  display: flex;
  margin: 0 auto 10px;
  align-items: center;
  &:last-of-type{
    margin-bottom: 30px;
  }
  .inputtxt{
    flex: 1;
    font-size: 16px;
    line-height: 1.67;
    letter-spacing: -0.72px;
    font-weight: 400;
    & em{
      color: ${Color.topaz};
      margin-left: 4px;
    }
  }
  .MuiTextField-root{
    flex: 1;
    .MuiInputBase-root{
      height: 48px;
      .MuiTypography-root{
        color: ${Color.topaz};
      }
      .MuiInputBase-input:-webkit-autofill{
        padding: 12px 14px;
      }
    }
    .MuiFormHelperText-root{
      color: ${Color.topaz};
      font-size: 14px;
      letter-spacing: -0.56px;
      margin: 6px 0 0 0;
      &.Mui-error{
        color: #fedc00;
      }
    }
  }
  .MuiInputAdornment-root{
    color: ${Color.topaz};
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
      border-color: ${Color.gray};
    }
    &.mui-focused{
      border: none;
    }
    &:hover{
      fieldset {
        border-color: #1976d2;
      }
    }
  }
  .MuiFormLabel-asterisk{
    color: ${Color.topaz};
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
      background-color: ${Color.white};
      border-radius: 10px;
    }
    > div {
      margin-bottom: 10px;
    }
    .MuiRadio-root {
      padding: 0 5px;
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
    letter-spacing: -0.56px;
    color: #666;
  }
  Button{
    margin: 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    label{
      font-size: 14px;
      letter-spacing: -0.56px;
    }
    input {
      padding: 15px 14px;
    }
  }
`;

export const deletTag = css`
  Button{
    padding: 0 15px;
    &:first-of-type{
      margin-left: 0;
    }
  }
  .MuiChip-root{
    height: 48px;
    border-radius: 30px;
    padding: 0 15px;
    border: 1px solid #ccc;
  }
  .MuiChip-label{
    padding-right: 16px;
    line-height: 1;
    font-size: 14px;
    height: 17px;
  }
  .css-1e6alsu-MuiButtonBase-root-MuiChip-root .MuiChip-deleteIcon{
    margin-top: 2px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
    Button{
      &:first-of-type{
        margin-left: 0;
        display: block;
        margin-right: 70%;
      }
    }
    .MuiChip-root{
      height: 50px;
      border-radius: 30px;
      padding: 0 15px;
      &:first-of-type{
        margin-left: 0;
      }
    }
    .MuiChip-label{
      padding-right: 10px;
    }
  }
`;

export const Appli_cont = css`
  text-align: center;
  .MuiTypography-h4{
    margin-top: 30px;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.71;
    letter-spacing: -1.12px;
  }
  .complet_txt{
    margin-top: 20px;
    line-height: 1.67;
    font-size: 18px;
    letter-spacing: -0.72px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .MuiTypography-h4{
      font-size: 24px;
      letter-spacing: -0.96px;
    }
    .complet_txt{
      font-size: 14px;
      letter-spacing: -0.56px;
    }
  }
`

// 사업자전환
export const step = css`
max-width: 348px;
margin: 24px auto 0;
align-items: center;
.MuiStepLabel-label{
  letter-spacing: -0.56px;
  font-weight: 300;
  &.MuiStepLabel-alternativeLabel{
    margin-top: 10px;
    font-family: 'Noto Sans CJK KR';
  }
}
.MuiStep-root{
  padding: 0;
  width: 120px;
  .Mui-active{
    color: #1CCDCC;
    border: none;
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
  margin: 20px auto 0;
  .css-nen11g-MuiStack-root{
    flex-direction: column;
  }
  .MuiStepLabel-label{
    font-size: 13px;
    letter-spacing: -0.52px;
    margin-top: 10px;
  }
}
`;

export const listbox = css`
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  display: block;
  position: relative;
  .MuiFormControlLabel-label{
    letter-spacing: -0.56px;
    font-weight: 300;
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
    font-size: 14px;
    line-height: 1.4;
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
  @media (min-width: 320px) and (max-width: 768px) {
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

export const line_box = css`
  padding: 30px;
  border: solid 1px #515668;
  border-radius: 5px;
  > span {
    font-weight: 300;
    line-height: 1.75;
    letter-spacing: -0.64px;
    &::before{
      content: '';
      height: 4px;
      width: 4px;
      border-radius: 4px;
      display: inline-block;
      margin: 3px 8px 3px 0;
      background-color: #707070;
    }
  }
`;

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
        color: ${Color.white};
      }
    }
  }
  .MuiTextField-root{
    margin-bottom: 16px;
  }
  .inputtxt{
    margin-top: 20px;
    width: 160px;
    font-weight: 500;
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
  margin-bottom: 16px;
  .inputtxt{
    margin-top: 20px;
    width: 160px;
  }
  label{
    color: #fff;
    font-weight: 300;
    line-height: 1.75;
    letter-spacing: -0.64px;
    font-size: 16px;
    &.Mui-focused {
      color: #fff;
    }
    &.Mui-error{
      color: #fedc00;
    }
  }
  .MuiOutlinedInput-input{
    padding: 18.5px 14px;
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
    &.Mui-error{
      color: #fedc00;
    }
  }
  .rbtime{
    color: #1CCDCC;
    > button{
      width: 100px;
      height: 40px;
      line-height: 1.5;
      margin-left: 18px;
      background-color: #4063EC;
      color: #fff;
      &.none{
        color: #fff;
        background-color: #000;
        opacity: 0.3;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    display: block;
    margin-bottom: 20px;
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

export const sub_cont03 = css`
  max-width: 970px;
  width: 100%;
  padding: 0 15px;
  margin: 20px auto 0;
  color: ${Color.white};
  .MuiFormControlLabel-label{
    line-height: 1.75;
    letter-spacing: -0.64px;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const card_box = css`
  border-radius: 20px;
  padding: 29px;
  margin-bottom: 60px;
  background-color: #fff;
  color: #222;
  &.cardmg{
    margin-left: 130px;
  }
  .tit{
    letter-spacing: -0.72px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    padding: 0;
    &:before{
      content: '';
      display: inline-block;
      background: url('/images/common/icon_info.png') no-repeat;
      min-width: 24px;
      min-height: 24px;
      margin-right: 10px;
      margin-top: 3px;
      background-size: 100%;
    }
    .subtit{
      line-height: 1.75;
      letter-spacing: -0.64px;
      font-size: 16px;
      font-weight: normal;
    }
  }
  a {
    display: block;
    margin-top: 16px;
    font-weight: 700;
    margin-left: 35px;
    line-height: 1.75;
    letter-spacing: -0.64px;
    &.linkicon{
      &:after{
        content: '';
        display: inline-block;
        background: url('/images/common/link_gt.png') 0 4px no-repeat;
        min-width: 20px;
        min-height: 20px;
        margin-left: 4px;
      }
    }
  }
  /* list 리스트형 */
  > ul{
      li{
        font-size: 16px;
        line-height: 1.75;
        letter-spacing: -0.64px;
        padding: 0;
        align-items: start;
        &:before{
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          margin: 13px 8px 4px 0;
          background-color: #707070;
          border-radius: 10px;
        }
      }
    }
    @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 40px;
    &.cardmg{
      margin-left: 0;
    }
  }
`;

export const input_group = css`
  display: flex;
  height: 100%;
  margin-bottom: 40px;
  .MuiRadio-root{
    color: #ccc;
  }
  > dt {
    width: 150px;
    padding: 15px 0;
    line-height: 1;
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
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 10px;
    flex-direction: column;
  }
`;

export const formBox = css`
  position: relative;
  .em_right{
    color: #1ccdcc;
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.56px;
    margin-bottom: 15px;
    top: 68px;
    position: absolute;
    right: 0;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .em_right{
      top: 130px;
    }
  }
`;

export const sxform = css`
  max-width: 620px;
  margin: 0 auto;
  .confirm_tit {
    margin: 0 auto;
    text-align: center;
    line-height: 1.07;
    letter-spacing: -1.2px;
    font-weight: 400;
    em {
      color: #1CCDCC;
      font-style: normal;
      font-weight: 700;
      margin: 0 5px;
    }
    .icon_Box {
      margin-bottom: 25px;
    }
    p {
      font-size: 18px;
      margin-bottom: 40px;
      line-height: 1.78;
      letter-spacing: -0.72px;
      font-weight: 300;
    }
    h2, .MuiTypography-h3{
      font-size: 30px;
      margin-bottom: 20px;
      font-weight: 400;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .confirm_tit {
      p {
        font-size: 16px;
        margin-bottom: 30px;
      }
      h2, .MuiTypography-h3 {
        margin-bottom: 15px;
        font-size: 24px;
      }
    }
    .tit {
      h1 {
      font-size: 28px;
      }
    }
    .css-nen11g-MuiStack-root{
      display: flex;
      flex-direction: column;
    }
  }
`;


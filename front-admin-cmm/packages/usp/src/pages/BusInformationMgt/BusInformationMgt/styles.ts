import { css } from '@emotion/react';
export const container = css`
  float:left;
  margin-top: 120px;
  .blue{
    color: #4063EC;
  }
  .content{
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 60px 0px;
  }
  .swiper-container-pointer-events{
    padding: 10px;
  }
  .swiper-container{
    padding-bottom: 10px;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .content{
      padding: 60px 15px;
    }
    margin-top: 60px;
  }
`;
export const sub_cont01 = css`
  position: relative;
  display: block;
  color: #fff;
  .benner{
    text-align: center;
    background-color: #1F2437;
    min-height: 460px;
    width: 100%;
  }
  .txtbox{
    margin: 0 auto;
    max-width: 1080px;
    width: 100%;
    .tit{
      font-size: 48px;
      letter-spacing: -4px;
      font-weight: 800;
      margin-bottom: 23px;
    }
    p {
      line-height: 1.8;
    }
  }
  .search_btn{
    position: absolute;
    right: 0;
    border-radius: 30px;
    width: 140px;
    height: 60px;
    background-color: #4063EC;
    font-size: 18px;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .txtbox{
      .tit{
        font-size: 28px;
        margin-bottom: 19px;
      }
      p {
        font-size: 14px;
        line-height: 2;
      }
    }
    .search_btn{
      width: 80px;
      height: 50px;
      font-size: 16px;
    }
    .benner{
      min-height: 420px;
    }
  }
`;
export const input_w = css`
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  padding-top: 20px;
  .MuiOutlinedInput-root{
    background-color: #fff;
    border-radius: 30px;
    height: 60px;
    width: 100%;
  }
  .MuiInputLabel-root{
    line-height: 1.8em;
    padding-left: 30px;
    color: #707070;
    
  }
  .Mui-ficused{
    display: none;
    .MuiInputLabel-root{
      display: none;
      font-size: 0;
    }
    .MuiOutlinedInput-root{
      font-size: 0;
    }
  }
  .MuiAutocomplete-root{
    width: 100%;
  }
  .css-16awh2u-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input{
    padding: 7.5px 4px 7.5px 30px;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    padding-top: 20px;
    .MuiOutlinedInput-root{
      height: 50px;
    }
    .css-16awh2u-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input{
      padding: 5px 4px 8px 15px;
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
    font-size: 15px;
    border-bottom: 1px solid #fff;
    border-radius: 0;
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
export const table = css`
display: flex;
height: 200px;
  border-radius: 15px;
  .MuiTableHead-root{
    th{
      font-size: 18px;
      font-weight: 800;
      padding: 12px;
    }
    td{
      padding: 20px;
    }
  }
  tbody{
    overflow: auto;
  }
  .MuiCheckbox-root{
    padding: 0;
    margin-right: 10px;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .MuiTableHead-root{
      th{
        font-size: 14px;
      }
      td{
        padding: 10px;
      }
    }
    .MuiTableCell-root{
      padding: 8px;
    }
  }
`;

export const bread = css`
  padding-top: 50px;
  max-width: 1260px;
  margin: 0 auto;
  ol {
    justify-content: flex-end;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    display: none;
  }
  .css-1wuw8dw-MuiBreadcrumbs-separator{
    color: #fff;
  }
`;

export const detal_tab = css`
  background-color: #1F2437;
  .MuiBox-root{
    padding: 0;
  }
  .MuiTabs-root{
    max-width: 1260px;
    margin: 0 auto;
  }
  .MuiTabs-flexContainer{
    > button{
      padding: 11px 32px;
      font-size: 18px;
      border-radius: 10px 10px 0 0;
      color: #707070;
      background-color: #E0E0E0;
      border-right: 1px solid #000;
    }
    .Mui-selected {
      color: #1976d2;
      background-color: #fff;
    }
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .MuiTabs-flexContainer{
      padding: 0 15px;
      > button{
        flex: 1;
        font-size: 16px;
      }
    }
  }
`;

export const sub_cont02 = css`
  min-height: 840px;
  background-color: #fff;
  color: #333;
  .MuiTypography-h5 {
    font-size: 24px; 
    font-weight: 800;
  }
  .md_btn{
    color: #333;
    border: 1px solid #333;
    width: 220px;
    height: 55px;
    border-radius: 0;
    margin-top: 10px;
  }
  .data{
    margin-left: 10px;
    font-size: 16px;
    > em {
      font-style: normal;
      font-weight: bold;
      color: #4063EC;
    }
  }
  .MuiSelect-select{
    padding: 8px 40px 8px 20px;
    margin-right: 10px;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .MuiTypography-h5 {
      font-size: 22px; 
    }
    .MuiSelect-select{
      font-size: 14px;
    }
  }
`;

export const sub_list = css`
.tag{
  position: absolute;
  top: 0;
}
.css-w4z10b-MuiStack-root{
    .MuiChip-root{
      border-radius: 5px;
    }
    .new{ background-color:#1CCDCC; color: #fff;}
    .blue{ background-color:#4063EC; color: #fff;}
  }
  .MuiList-root{
    width: 100%;
    height: 100%;
    .MuiListItemText-root{
      position: relative;
      flex: 0 0 70%;
      margin: 0;
    }
  }
  .MuiTypography-body1{
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 12px;
    padding-top: 40px;
  }
  .MuiTypography-body2{
    font-size: 16px;
    color: #707070;
    > span {
      display: inline-block;
      margin-bottom: 25px;
    }
  }
  .bottom_btn{
    margin-top: 20px;
    border-radius: 20px;
    background-color: #F5F5F5;
    color: #222;
    &:after{
      content:'';
      background: url('/images/common/arr_row.png') no-repeat;
      width: 12px;
      height: 8px;
      margin-left: 10px;
    } 
  }
  .MuiButton-root:hover{
    background-color: #ccc;
  }
  .MuiListItem-root{
    padding: 10px 0;
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .MuiList-root{
      .MuiListItem-root{
        margin-bottom: 40px;
        flex-wrap: wrap;
      }
      .MuiListItemText-root{
        flex: 0 0 100%;
      }
      .MuiListItemAvatar-root{
        flex: 0 0 100%;
        margin: 0 auto 10px;
        text-align: center;
        img{
          height: 230px;
        }
      }
    }
    .MuiTypography-body1{
      font-size: 18px;
      margin-bottom: 12px;
      padding-top: 50px;
    }
    .MuiTypography-body2{
      font-size: 14px;
      > span {
        margin-bottom: 10px;
      }
    }
    .bottom_btn{
      margin-top: 10px;
      border-radius: 20px;
      background-color: #F5F5F5;
      color: #222;
      &:after{
        content:'';
        background: url('/images/common/arr_row.png') no-repeat;
        width: 12px;
        height: 8px;
        margin-left: 10px;
      } 
    }
  }
  .css-11k5jid-MuiStack-root>:not(style)+:not(style){
    margin: 0;
  }
`;

export const hotslide = css`
  display: flex;
  background-color: rgba(0,0,0,0);
  border-radius: 15px;
  color: #333;
  max-width: 300px;
  box-shadow: 0px 2px 3px 1px rgb(0, 0, 0, 0.3);
  img{
    height: 200px;
  }
  .sub_txt{
    color: #707070;
    line-height:1;
    font-size: 14px;
    margin: 7px 0;
  }
  .MuiTypography-root{
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -1.2px; 
  }
  .tag{
    position: absolute;
    top:0;
    z-index: 2;
    justify-content: space-between;
    width: 100%;
    .wh{ background-color:#fff; color: #333; border-radius: 0 15px 0 10px;}
    .blue{ background-color:#4063EC; color: #fff; border-radius: 15px 0 10px 0; }
  }
  @media (min-width: 320px) and (max-width: 820px) {
    .MuiTypography-h5 {
      font-size: 22px; 
    }
    .MuiSelect-select{
      font-size: 14px;
    }
    .MuiTypography-root{
      font-size: 16px;
    }
  }
`;

export const btnGroup = css`
  justify-content: flex-start;
  > button{
    height: 60px;
    border-radius: 40px;
    width: 220px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5; 
    background-color: #fff;
    &.blue{
      background-color: #4063EC;
      width: 100%;
    }
    &.linebtn {
      border: 1px solid #4063EC;
      background-color: #fff;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    > button{
      font-size: 16px;
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
  box-shadow: 24;
  padding: 24px 15px 20px;
  border-radius: 20px;
  h2 {
    font-size: 20px; 
    font-weight: bold;
    > button{
      color: #707070;
      position: absolute;
      right: 20px;
    }
  }
  h3 {
    font-size: 16px; 
    font-weight: 500;
  }
  .css-275fjj-stylesFactory{
    position: relative;
    max-width: 470px;
    margin: 30px auto 0;
    .MuiFormControlLabel-root{
      right: 0;
      top: 0;
      position: absolute;
    }
    .MuiCheckbox-root{
      padding: 0 5px 0 0;
    }
  }
`;

export const btnstyle = css`
button{
  border-radius: 0;
  font-weight: Bold;
  font-size: 16px;
  padding: 16px 36px;
  letter-spacing: -0.4px;
}
button.lg{
  min-width: 200px;
}
button.md{
  border-radius: 4px;
  font-weight: normal;
  padding: 8px 16px;
}
.blue{
  background-color: #4063EC;
}
.gray{
  background-color: #ADAEB2;
}
.gray:hover{
  background-color: #9B9B9B;
}
.sky{
  background-color: #EBEFFD;
  color: #4063EC;
}
.sky:hover{
  background-color: #d4deff
}
`;
export const link = css`
  a{
    color: blue;
  }
`;

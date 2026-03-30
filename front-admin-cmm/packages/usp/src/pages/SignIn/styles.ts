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
  .tit {
    h1 {
    margin:10px 0 0;
    font-size: 43px;
    letter-spacing: -1.2px;
    }
    p{
      font-size: 2rem;
      color: #222;
      line-height: 30px;
      margin-bottom: 70px;
      font-weight: bold;
      letter-spacing: -0.6px;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    padding: 20px 15px 60px;
    .tit {
      h1 {
      font-size: 32px;
      }
    }
  }
`;
export const LoginSet =css`
  input {
    width:100%;
    height:56px;
    padding-left: 15px;
    border:1px solid #ccc;
    color:#707070;
    &::placeholder{
      color:#707070 !important;
    }
    &:first-child{
      margin-bottom: 10px;
    }
  }
`;
export const signinput = css`
  & .MuiInputLabel-root {
    color: #fff;
    .Mui-focused{
      color: #fff;
    }
  }
`
export const linkbtn = css`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin: 10px auto 25px;
> a {
  color: #4063ec;
  line-height: 1;
  font-size: 14px;
  &:last-child{
    border-right: none;
  }
}
`

export const signbtn = css`
  height: 56px;
  button{
    font-size: 16px;
    line-height: 1;
    border-radius: 50px;
    background-color: #4063ec;
  }
`

export const snsicon = css`
  margin: 0 auto 65px;
  width: max-content;
  button{
    border-radius: 50px;
    min-width:50px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    &.kakao{background: url('/images/common/kakao_icon.png')}
    &.naver{background: url('/images/common/naver_icon.png')}
    &.google{background: url('/images/common/google_icon.png')}
  }
`

export const error = css`
  color: #fedc00;
  line-height: 16px;
  letter-spacing: -1.2px; 
`
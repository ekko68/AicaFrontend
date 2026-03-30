import { css } from '@emotion/react';

export const container = css`
  position: relative;
  background-color: #1f2437;
  height: 100vh;
`;
export const backPass = css`
position: absolute;
top: 40px;
left: 0;
  &:before{
    content:'';
    display: inline-block;
    background: url('/images/common/pass_left.png');
    width: 7px;
    height: 14px;
    margin-right: 16.5px;
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    display: none;
  }
`;
export const singup_cont = css`
  
`;

export const contflex = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  > div {
    flex: 0 0 70%;
  }
  > div + div {
    flex: 0 0 30%;
  }
  .MuiCard-root{
    padding: 10px 20px 40px;
    text-align: center;
    max-width: 380px;
    letter-spacing: -1.2px;
    h3 {
      font-size: 20px;
      margin-bottom: 12px;
    }
    p {
      margin: 0;
    }
  }
  .MuiGrid-root{
    margin-left: 0;
  }
  .MuiGrid-item{
    display: flex;
    padding-left: 0;
    margin-bottom: 20px;
    flex: 0 0 50%;
    .img {
      img{
        width:100px;
        height: 100px;
      }
      margin-right: 20px;
    }
    .cont {
      margin-top: 22px;
      > div {
        font-size: 18px;
        font-weight: bold;
      }
      > p {
        letter-spacing: -0.4px;
      }
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    flex-direction: column;
    > div {
      flex: 0 0 100%;
    }
    > div + div {
      flex: 0 0 100%;
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
        margin-top: 22px;
        > div {
          font-size: 18px;
          font-weight: bold;
        }
        > p {
          letter-spacing: -0.4px;
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
  padding: 200px 80px;
  max-width: 1260px;
  margin: 0 auto;
  .tit {
    h1 {
    font-size: 43px;
    letter-spacing: -1.2px;
    }
    p{
      font-size: 14px;
      color: #8f929b;
      line-height: 30px;
      margin-bottom: 70px;
      letter-spacing: -0.6px;
    }
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    padding: 20px 15px 60px;
    .tit {
      h1 {
      font-size: 28px;
      }
      p{
        margin-bottom: 41px;
      }
    }
  }
`;
export const signbtn = css`
  height: 60px;
  button{
    font-size: 16px;
    line-height: 1;
    border-radius: 50px;
    background-color: #4063ec;
    width: 220px;
    font-weight: bold;
    margin: 0 auto;
  }
`

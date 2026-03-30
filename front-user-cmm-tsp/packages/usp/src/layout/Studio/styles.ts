import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  height: 100%;
  position: relative;

  .others {
    margin-top: 60px;
    font-size: 14px;
    &.mover{
      display: none;
    }
    &.pcver{
      display: block;
    }
    ul {
      display: flex;
      li {
        margin-right: 30px;
        color: #707070;
        font-weight: 400;
        &:first-of-type {
          color: #222;
          font-weight: 700;
        }
      }
    }
  }

  .footer {
    width: 100%;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .cont2 {
      width: 1260px;
      margin: 0 auto;
      @media (min-width: 320px) and (max-width: 1280px) {
        width: auto;
        > div {
          flex-direction: column;
        }
      }
    }
    @media (min-width: 320px) and (max-width: 1280px) {
      [role='navigation'] {
        &.pc {
          display: none !important;
        }
      }
      .others {
        position: relative;
        top: 0;
        margin-top: 30px;
        &.mover{
          display: block;
        }
        &.pcver{
          display: none;
        }
        ul {
          display: block;
          li {
            position: relative;
            display: inline-block;
            margin-right: 15px;
            margin-bottom: 9px;
            padding-right: 15px;
            color: #222;
            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 3px;
              width: 1px;
              height: 12px;
              background-color: #ccc;
            }
            &:last-child:after,
            &:nth-of-type(3):after {
              display: none;
            }
          }
        }
      }
    }
  }
  .content {
    position: relative;
    max-width: 1260px;
    margin: 0 auto;
    padding: 60px 0;
  }
`;

export const scrolleve = css`
  transform: translate(0, -41px);
  @media (min-width: 320px) and (max-width: 1280px) {
    transform: translate(0, 0);
  }
`;

export const isSub = css`
  nav {
    border: 1px solid red;
  }
`;

export const slide_cont = css`
  height: 80px;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  .swiper-container {
    width: 1260px;
    height: 44px;
    margin: 0 auto;
    padding: 12px 50px;
    .swiper-button-prev {
      left: 0;
      top: 50%;
      margin-top: -15px;
      background-color: #fff;
    }
    .swiper-button-prev:after {
      color: #999;
      font-size: 15px;
      padding-top: 0;
      font-weight: bold;
    }
    .swiper-button-next {
      right: 0;
      top: 50%;
      margin-top: -15px;
      background-color: #fff;
    }
    .swiper-button-next:after {
      color: #999;
      font-size: 15px;
      padding-top: 0;
      font-weight: bold;
    }
    .swiper-wrapper {
      padding: 0;
    }
    @media (min-width: 320px) and (max-width: 1280px) {
      width: auto;
      padding-left: 15px;
      .swiper-button-prev {
        left: auto;
        right: 45px;
        top: 50%;
        background-color: transparent;
      }
      .swiper-button-next {
        background-color: transparent;
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 10px;
        width: 110px;
        height: 35px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 30%
        );
        z-index: 1;
      }
    }
  }
`;

export const box01 = css`
  padding: 40px 80px 80px 0;
  border-right: 1px solid #e0e0e0;
  nav {
    > ul {
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      > li {
        width: 140px;
        margin-right: 20px;
        margin-bottom: 20px;
        padding-top: 20px;
        button{
          margin-bottom: 15px;
          padding: 0;
          font-size: 15px;
          font-weight: 500 !important;
        }
        > ul {
          > li {
            margin: 12px 0;
            font-weight: 400;
            a {
              font-size: 14px;
              color: #707070;
            }
          }
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 1280px) {
    display: none;
  }
`;
export const box02 = css`
  padding: 60px 0 80px 100px;
  font-size: 14px;
  color: #707070;
  font-weight: 400;
  flex: 0 0 30%;
  .address {
    margin-top: 15px;
    line-height: 2;
    letter-spacing: -0.56px;
    span {
      margin-left: 12px;
    }
  }
  .copyright {
    margin-top: 20px;
    font-size: 13px;
    letter-spacing: -0.52px;
  }
  .sns_icon {
    position: absolute;
    bottom: 0;
    padding-bottom: 80px;
    li {
      float: left;
      &.facebook {
        a {
          background-image: url(/images/common/icon_footer_facebook.png);
        }
      }
      &.twitter {
        a {
          background-image: url(/images/common/icon_footer_twitter.png);
        }
      }
      &.instagram {
        a {
          background-image: url(/images/common/icon_footer_instagram.png);
        }
      }
    }
    a {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 8px;
      text-indent: -9999px;
      background-repeat: no-repeat;
    }
  }
  @media (min-width: 320px) and (max-width: 1280px) {
    margin: 0 15px;
    padding: 30px 0 50px;
    .logo {
      position: relative;
      top: 0;
    }
    .sns_icon {
      position: relative;
      margin-top: 20px;
    }
  }
`;

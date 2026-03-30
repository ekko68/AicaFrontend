import { Fragment, useEffect, useState } from 'react';
import Portal from 'shared/components/Portal';
import Top from 'shared/components/Top';
import Footer from './Footer';
import Header from './Header';
import { useGlobalScroll } from '~/pages/store/GlobalModalStore';
/* 
  작성일    :   2022/05/10
  화면명    :   사용자지원포털 공통 레이아웃
  회면ID    :   공통
  화면/개발 :   Seongeonjoo / navycui
*/
const Studio: React.FC<{
  children: React.ReactNode;
  label: string;
}> = (props) => {
  const isMobileCheck = /iPhone|iPad|iPod|Android/i.test(
    window.navigator.userAgent
  );

  return (
    <Fragment>
      {props.label === 'home' ? (
        <Header isHome="home__header" />
      ) : props.label === 'search' ? null : (
        <Header isSub="subpage" />
      )}
      <main>{props.children}</main>
      {props.label === 'home' || props.label === 'sign' ||
      props.label === 'search'|| props.label === 'searchResult' ? null : (
        <Footer />
      )}
      <Portal>
        {props.label === 'home' && isMobileCheck ? null : <Top />}
      </Portal>
    </Fragment>
  );
};
export default Studio;

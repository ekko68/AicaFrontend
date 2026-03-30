import { useState, useEffect } from 'react';

/* 
작성일    :   2022/06/23
화면명    :   주승언
회면ID    :   UI-USP-FRN-0420501
화면/개발 :   seongeonjoo
*/

export function scroll(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ScrollY, setScrollY] = useState(0); 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ScrollActive, setScrollActive] = useState(false);

  const { pageYOffset } = window;
  const deltaY = pageYOffset - ScrollY;
  function handleScroll() {
    if (ScrollY !== 1 && deltaY >= 1) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setScrollActive(false);
    }; //  window 에서 스크롤을 감시를 종료
  }, [setScrollY]);
  useEffect(() => { 
    window.onbeforeunload = function pushRefresh() {
        window.scrollTo(0, 0);
      };
    }, []);
  return {
    scrollY,
    ScrollActive,
  }
}




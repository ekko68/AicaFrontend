import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import Footer from "./Footer";
import {Stack} from "@mui/material";
import Top from "../../components/Top/Top";
import Portal from "../../components/Portal";
import {Header} from "./Header";
import {useLocation} from "react-router-dom";
import {useGlobalConfigStore} from "../../store/GlobalConfigStore";
import {useScroll} from "../../components/useScroll";
import {useScrollStore} from "../../store/ScrollStore";
import {isTspPortal} from "../../utils/validUtil";

const Basic: React.FC<{}> = props => {
  const location = useLocation()
  const configStore = useGlobalConfigStore()
  const scrollStore = useScrollStore()
  const [isShowFooter, setIsShowFooter] = useState(false);
  const {isContraction, scrollY} = useScroll()
  const [touchClientY, setTouchClientY] = useState(0)
  const [touchDirection,setTouchDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    if (!scrollStore.isLocking) {
      if (scrollStore.isContraction != isContraction) {
        scrollStore.setContraction(isContraction)
      }
    }
  }, [isContraction])

  const init = () => {
    document.querySelector('body')!.classList.add('layout--basic');
    return () => {
      document.querySelector('body')!.classList.remove('layout--basic');
    };
  };
  useEffect(init, []);

  useEffect(() => {
    const rootPath = isTspPortal? '/tsp' : '/'
    if (location.pathname == rootPath) {
      setIsShowFooter(false)
    } else {
      configStore.setTopOpacity(false)
      setIsShowFooter(true)
    }
    window.scrollTo(0, 0);
  }, [location])

  const TouchMove = useCallback((e) => {
    const clientY = e.changedTouches[0].clientY
    if (!configStore.isDesktop) {
      if (touchClientY < clientY) {
        setTouchDirection("up")
      } else {
        setTouchDirection("down")
      }
      setTouchClientY(clientY)
    }
  }, [touchClientY])

  return <Stack
    justifyContent={"space-between"}
    style={{
      display: "flex",
      width: "100%",
      minHeight: "100vh"
    }}
    onWheel={(e) => {
      // console.log(e.deltaY)
      if (!scrollStore.isLocking)
        scrollStore.setScrollDirection(e.deltaY > 0 ? "down" : "up")
    }}
    onTouchMove={TouchMove}
    onTouchEnd={() => {
      scrollStore.setScrollDirection(touchDirection)
    }}
  >
    <Stack>
      <Header/>
      {props.children}
    </Stack>

    {isShowFooter && <Footer/>}

    <Portal>
      <Top/>
    </Portal>
  </Stack>
}

export default Basic;

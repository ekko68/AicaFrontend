import {useGlobalConfigStore} from "../../store/GlobalConfigStore";
import Toolbar from "./Toolbar";
import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {TopNavigationBar} from "./TopNavigationBar";
import {debounce, Stack} from "@mui/material";
import dom from "../../utils/dom";
import styled from "@emotion/styled";
import {useScroll} from "../../components/useScroll";
import {useLocation} from "react-router-dom";
import {useScrollStore} from "../../store/ScrollStore";
import {isTspPortal} from "../../utils/validUtil";

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const Header = () => {
  const location = useLocation()
  const navContentRef = useRef<HTMLElement>(null)
  const [isSmallMode, setIsSmallMode] = useState<boolean>(false)
  const [isLeftDrawer, setIsLeftDrawer] = useState(false)
  const {scrollDirection, isContraction} = useScrollStore()
  const {isDesktop, device} = useGlobalConfigStore()
  const {scrollY} = useScroll()

  const rootPath = isTspPortal? '/tsp' : ''
  let isValidInteraction = false
  if (isDesktop){
    isValidInteraction = isDesktop || (location.pathname == rootPath && !isLeftDrawer)
  }else {
    isValidInteraction = false
  }

  return <HeaderStyle isUpper={isValidInteraction} mobileDevice={device == 'mobile'}
    style={{zIndex: !isDesktop && scrollDirection == 'down'? 1 : 5}}>
    <Toolbar
      isDesktop={isDesktop}
      scrollDirection={(!isDesktop && location.pathname == rootPath)? 'up' : scrollDirection}
      scrollY={scrollY}
    />
    <TopNavigationBar
      navContentRef={navContentRef}
      isDesktop={isDesktop}
      isSmallMode={isSmallMode}
      isLeftDrawer={isLeftDrawer}
      setIsLeftDrawer={setIsLeftDrawer}
      isShortBar={(isContraction && location.pathname != rootPath )|| isLeftDrawer}
      scrollDirection={(!isDesktop && location.pathname == rootPath)? 'up' : scrollDirection}
      scrollY={scrollY}
    />
  </HeaderStyle>
}

const HeaderStyle = styled('header')<{isUpper: boolean, mobileDevice: boolean}>`
  top: ${props => props.isUpper ? 0 : -40}px;
  transition: 0.3s;
  width: ${props => props.mobileDevice? `${window.screen.width}px` : '100%'};
`
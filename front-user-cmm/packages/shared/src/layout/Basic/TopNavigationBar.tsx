import styled from '@emotion/styled';
import useSWR from 'swr';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { RouteData, RouteType } from '../../utils/RouteUtiles';
import {
  Box,
  Button,
  Collapse,
  debounce,
  Drawer,
  keyframes,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import { useGlobalConfigStore } from '../../store/GlobalConfigStore';
import MenuIcon from '@mui/icons-material/Menu';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Body2, Body3, Body4 } from '../../components/TextComponents';
import { Icons } from '../../components/IconContainer';
import {
  HorizontalInterval,
  VerticalInterval,
} from '../../components/LayoutComponents';
import { Color } from '../../components/StyleUtils';
import { useScrollStore } from '../../store/ScrollStore';
import { useRouteStore } from '../../store/RouteConfigStore';
import {isTspPortal} from "../../utils/validUtil";

export const TopNavigationBar: React.FC<{
  isDesktop: boolean;
  isShortBar: boolean;
  isLeftDrawer: boolean;
  isSmallMode: boolean;
  setIsLeftDrawer: Dispatch<SetStateAction<boolean>>;
  navContentRef: React.Ref<HTMLElement>;
  scrollDirection: 'down' | 'up';
  scrollY: number;
}> = React.forwardRef((props) => {
  const { isTopOpacity } = useGlobalConfigStore();
  const scrollStore = useScrollStore();
  // const {data: routes = []} = useSWR('route://service')
  const { routes } = useRouteStore();
  const header = document.querySelector('header');
  const html = document.querySelector('html');
  const opacity = props.isLeftDrawer ? false : isTopOpacity;

  const handlerMenuButton = () => {
    const isActive = !props.isLeftDrawer;

    scrollStore.setScrollDirection(isActive ? 'down' : 'up');
    scrollStore.setContraction(
      isActive ? true : props.scrollY == 0 ? false : true
    );
    scrollStore.setLocking(isActive);
    if (header)
      header.style['zIndex'] = isActive && props.isDesktop ? '1300' : '5';
    if (html) html.style['overflow'] = isActive ? 'hidden' : 'auto';
    props.setIsLeftDrawer(isActive);
  };

  if (routes.length == 0) return <div></div>;

  return (
    <NavigationBarContainer
      ref={props.navContentRef}
      opacity={opacity}
      isDesktop={props.isDesktop}
      isShortBar={props.isShortBar}
      scrollDirection={props.scrollDirection}
      scrollY={props.isLeftDrawer ? 1 : props.scrollY}
      isLeftDrawer={props.isLeftDrawer}
    >
      {props.isDesktop ? (
        <DesktopNavigationBar
          {...props}
          routes={routes}
          isTopOpacity={opacity}
          isLeftDrawer={props.isLeftDrawer}
          handlerMenuButton={handlerMenuButton}
        />
      ) : (
        <MobileNavigationBar
          isTopOpacity={opacity}
          isLeftDrawer={props.isLeftDrawer}
          handlerMenuButton={handlerMenuButton}
        />
      )}
      <LeftDrawer
        open={props.isLeftDrawer}
        isDesktop={props.isDesktop}
        routes={routes}
        onClose={handlerMenuButton}
      />
    </NavigationBarContainer>
  );
});

const MobileNavigationBar = (props: {
  isTopOpacity: boolean;
  isLeftDrawer: boolean;
  handlerMenuButton: () => void;
}) => {
  return (
    <Fragment>
      <Button sx={{ position: 'absolute' }} onClick={props.handlerMenuButton}>
        {props.isLeftDrawer ? (
          <Icons.LeftArrow />
        ) : (
          <Icons.Menu white={props.isTopOpacity} />
        )}
      </Button>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <NavLink to="/tsp">
          <img
            src={
              props.isTopOpacity
                ? '/tsp/images/img/white_mobile_logo.png'
                : '/tsp/images/img/mobile_logo.png'
            }
          />
        </NavLink>
      </Box>

      <SearchBox size={60}>
        <SearchIcon sx={{ fontSize: 35, color: '#fff' }} />
      </SearchBox>
    </Fragment>
  );
};

const DesktopNavigationBar = (props: {
  isSmallMode: boolean;
  isShortBar: boolean;
  isTopOpacity: boolean;
  isLeftDrawer: boolean;
  routes: RouteData[];
  handlerMenuButton: () => void;
  scrollDirection: 'up' | 'down';
}) => {
  const location = useLocation();
  const slice = isTspPortal? 4 : 0
  const items = getActivateRoutes(location.pathname.substring(slice), props.routes);
  let activeLabel = '';
  if (items && items.length > 0) {
    activeLabel = items[0].label;
  }
  const rootPath = isTspPortal? '/tsp' : ''

  return (
    <Fragment>
      {
        <Box className="sidemenu">
          <Button className={'menu-icon'} onClick={props.handlerMenuButton}>
            {props.isLeftDrawer ? (
              <Icons.LeftArrow />
            ) : (
              <Icons.Menu white={props.isTopOpacity} />
            )}
          </Button>
          <h1>
            <NavLink to="/tsp">
              <Logo
                url={
                  props.isTopOpacity
                    ? `${rootPath}/images/img/white_logo.png`
                    : `${rootPath}/images/img/color_logo.png`
                }
              />
            </NavLink>
            <span className="loc_tit">{'실증지원포털'}</span>
          </h1>
        </Box>
      }
      {props.isSmallMode && (
        <NavLink
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          to="/"
        >
          <Logo
            url={
              props.isTopOpacity
                ? `${rootPath}/images/img/white_logo.png`
                : `${rootPath}/images/img/color_logo.png`
            }
          />
        </NavLink>
      )}
      {props.isSmallMode || <Box sx={{ display: 'flex', flex: 1 }} />}

      {props.isSmallMode || (
        <Box className="menu">
          {props.routes.filter(f => f.readYn).map((m: RouteType, i: number) => {
            const active = activeLabel == m.label;
            return (
              <li key={i}>
                <Button type={'button'} className={active ? 'active' : ''}>
                  <Body2 weight={500}>{m.label}</Body2>
                </Button>
                {props.routes.length - 1 > i && (
                  <HorizontalInterval size={'26px'} />
                )}
                <ul>
                  {(m.children || []).filter(f => f.readYn).map((depth2: RouteType, j: number) => {
                    return (
                      <li key={j}>
                        <NavLink to={`${rootPath}${depth2.path}`}>
                          {depth2.label}
                        </NavLink>
                        {(depth2.children || []).map(
                          (depth3: RouteType, k: number) => {
                            return (
                              <NavLink key={k} to={`${depth3.path}`}>
                                {depth3.label}
                              </NavLink>
                            );
                          }
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </Box>
      )}

      {props.isSmallMode || <Box sx={{ display: 'flex', flex: 2 }} />}
      <SearchBox
        size={props.isShortBar && props.scrollDirection == 'down' ? 60 : 80}
      >
        <SearchIcon sx={{ fontSize: 35, color: '#fff' }} />
      </SearchBox>
    </Fragment>
  );
};

function getActivateRoutes(
  pathname: string,
  items: RouteType[],
  selected = []
): any {
  return items.reduce((a: any, b: RouteType) => {
    const regexp = new RegExp(`^${b.path!}`)
    if (regexp.test(pathname)) a.push(b)
    return getActivateRoutes(pathname, b.children || [], a)
  }, selected);
}

const PortalBlock = (props: {
  icon: JSX.Element;
  OnClick: () => void;
  label: string;
}) => {
  return (
    <Stack onClick={props.OnClick}>
      {props.icon}
      <Body4 center preLine>
        {props.label}
      </Body4>
    </Stack>
  );
};

const LeftDrawer = (props: {
  open?: boolean;
  isDesktop: boolean;
  routes: RouteData[];
  onClose: () => void;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  const topGap = props.isDesktop ? '60px' : '0px';
  const rootPath = isTspPortal? '/tsp' : ''
  const isLogin = false;

  const handlerCheck = (label: string) => {
    const selectedIndex = selected.indexOf(label);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, label);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const FindNavList = (selectedLabel: string) => {
    const route = props.routes.find((f) => f.menuNm == selectedLabel);
    if (route && route?.children) {
      return route.children.filter(f => f.readYn).map((m) => {
        return { menuNm: m.menuNm, path: m.path };
      });
    }

    return [];
  };

  return (
    <Drawer
      sx={{
        overflow: 'auto',
        '.MuiBackdrop-root': {
          top: topGap,
        },
      }}
      PaperProps={{
        sx: {
          width: props.isDesktop ? '375px' : '100%',
          minWidth: '375px',
          top: topGap,
          height: `calc(100% - ${topGap})`,
          boxShadow: 'none',
        },
      }}
      anchor={'left'}
      open={props.open}
      onClose={props.onClose}
    >
      {!props.isDesktop && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '16px',
          }}
        >
          <Box
            sx={{ position: 'absolute', left: '15px' }}
            onClick={props.onClose}
          >
            <Icons.LeftArrow />
          </Box>
          <Stack alignItems={'center'}>
            {isLogin && (
              <Fragment>
                <Box sx={{ fontSize: '12px', color: Color.warm_gray }}>
                  실증지원포털
                </Box>
                <Box>
                  <Body3 bold>아이디</Body3>
                  <Body3> 님 안녕하세요</Body3>
                </Box>
              </Fragment>
            )}
            {isLogin || <Body2 bold>{'실증지원포털'}</Body2>}
          </Stack>
        </Box>
      )}
      <Stack
        direction={'row'}
        padding={'40px 0 30px'}
        justifyContent={'space-around'}
      >
        <PortalBlock
          icon={<Icons.USPPortal />}
          label={'사용자\n지원포털'}
          OnClick={() => {}}
        />
        <PortalBlock
          icon={<Icons.TSPPortal />}
          label={'실증\n지원포털'}
          OnClick={() => {}}
        />
        <PortalBlock
          icon={<Icons.DXPPortal />}
          label={'데이터\n유통포털'}
          OnClick={() => {}}
        />
        <PortalBlock
          icon={<Icons.SAZPortal />}
          label={'안심구역\n지원포털'}
          OnClick={() => {}}
        />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          height: '8px',
          width: '100%',
          backgroundColor: Color.light_gray02,
        }}
      />
      <List sx={{ width: '100%', padding: 0 }}>
        {props.routes &&
          props.routes.filter(f => f.readYn).map((m, i) => {
            const route = FindNavList(m.menuNm);
            const isActive = selected.includes(m.menuNm);
            return (
              <Stack>
                <ListItemButton
                  key={i}
                  sx={{ padding: '18px 25px' }}
                  onClick={() => {
                    handlerCheck(m.menuNm);
                  }}
                >
                  <ListItemText primary={m.menuNm} />
                  <Box
                    sx={{
                      transform: isActive ? 'rotate(180deg)' : 'rotate(0)',
                      transition: '0.5s',
                    }}
                  >
                    <Icons.UpArrow />
                  </Box>
                </ListItemButton>
                {
                  <Collapse
                    in={isActive}
                    key={`Collapse-${i}`}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        rowGap: '15px',
                        marginX: '15px',
                        padding: '24px',
                        backgroundColor: '#edeff6',
                        borderRadius: '10px',
                      }}
                    >
                      {route.map((nav, j) => {
                        return (
                          <Button
                            key={j}
                            sx={{
                              justifyContent: 'flex-start',
                              '&:hover': {
                                backgroundColor: '#edeff6',
                                '> span': {
                                  textDecoration: 'underline',
                                },
                              },
                            }}
                            onClick={() => {
                              navigate(`${rootPath}${nav.path}`);
                              setSelected([]);
                              props.onClose();
                            }}
                          >
                            <Body3>{nav.menuNm}</Body3>
                          </Button>
                        );
                      })}
                    </Box>
                  </Collapse>
                }
              </Stack>
            );
          })}
      </List>

      <VerticalInterval size={'30px'} />
      <Stack
        direction={'row'}
        justifyContent={'space-around'}
        alignItems={'center'}
        sx={{
          marginX: '15px',
          paddingX: '24px',
          minHeight: '68px',
          backgroundColor: Color.light_gray02,
          borderRadius: '10px',
        }}
      >
        {isLogin && (
          <Fragment>
            <Box>
              <Body4 weight={500}>{'아이디'}</Body4>
              <Body4>{' 안녕하세요'}</Body4>
            </Box>
            <Box
              sx={{
                fontSize: '12px',
                color: Color.warm_gray,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              component={'button'}
            >
              {'로그아웃'}
            </Box>
          </Fragment>
        )}
        {isLogin || (
          <Fragment>
            <Button>
              <Body3>로그인</Body3>
            </Button>
            <Box sx={{ border: `1px solid ${Color.gray}`, height: '14px' }} />
            <Button>
              <Body3>회원가입</Body3>
            </Button>
          </Fragment>
        )}
      </Stack>
    </Drawer>
  );
};

export const Logo = styled('div')<{ url: string }>`
  background: url(${(props) => props.url}) no-repeat;
  display: block;
  width: 240px;
  height: 23px;
`;

const menuAni = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const menuBounce = keyframes`
  0% {
    opacity: 0;
    top: 20px;
  }
  50% {
    top: -5px;
  }
  70% {
    opacity: 1;
    top: 10px;
  }
  100% {
    top: 0;
  }
`;

const NavigationBarContainer = styled('section')<{
  opacity: boolean;
  isDesktop: boolean;
  isShortBar: boolean;
  scrollDirection: 'down' | 'up';
  scrollY: number;
  isLeftDrawer: boolean;
}>`
  position: relative;
  display: flex;
  width: 100%;
  top: ${(props) =>
    props.scrollDirection == 'up' || props.scrollY == 0
      ? 0
      : !props.isDesktop
      ? -60
      : props.isShortBar || props.isLeftDrawer
      ? -40
      : 0}px;
  height: ${(props) =>
    props.isDesktop && (!props.isShortBar || props.scrollDirection == 'up')
      ? 80
      : 60}px;
  align-items: center;
  /* border-bottom: 1px solid ${(props) =>
    props.opacity ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}; */
  background-color: ${(props) => (props.opacity ? 'none' : '#fff')};
  box-shadow: ${(props) =>
    props.opacity
      ? 'inset 0 -1px 0 0 rgba(204, 204, 204, 0.1)'
      : '0 3px 6px 0 rgba(0, 0, 0, 0.2)'};
  z-index: ${(props) => (props.isLeftDrawer ? 1300 : 999)};
  transition: 0.3s;

  @media screen and (max-width: 767px) {
    box-shadow: ${(props) =>
      props.opacity
        ? 'inset 0 -1px 0 0 rgba(204, 204, 204, 0.1)'
        : 'inset 0 -1px 0 0 rgba(204, 204, 204, 0.2)'};
  }
  //justify-content: space-between;
  //padding: 22px 40px;

  .sidemenu {
    position: absolute;
    display: flex;
    flex-shrink: 0;
    margin-left: 10px;
    height: 100%;
    align-items: center;
    color: ${(props) => (props.opacity ? '#fff' : '#000000')};

    > button {
      margin-right: 10px;
      padding: 0;
      width: 24px;
    }

    h1 {
      display: flex;
      margin: 0;

      a {
        display: inline-block;
        vertical-align: middle;
        vertical-align: top;
      }

      .loc_tit {
        white-space: nowrap;
        margin-left: 8px;
        font-size: 19px;
        vertical-align: top;
        letter-spacing: -0.38px;
      }
    }

    .menu-icon {
      display: none;
      @media screen and (max-width: 1200px) {
        display: flex;
      }
    }
  }

  .nav {
    width: 100%;
    max-width: 750px;
    font-size: 18px;
    letter-spacing: -0.2px;
    z-index: 999;
    flex: 0 0 50%;
  }

  .menu {
    //position: absolute;
    //left: 50%;
    //transform: translate(-50%, 0);
    display: flex;
    flex-shrink: 0;
    width: 100%;
    justify-content: center;
    //justify-content: center;

    li {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: left;

      .MuiButton-root {
        padding: 10px 7px;
        font-size: 18px;
        font-family: Noto Sans CJK KR;
        white-space: nowrap;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.36px;
        background-color: rgba(0, 0, 0, 0);
        text-align: center;
        box-shadow: none;
        //margin-right: 26px;

        > span {
          color: ${(props) => (props.opacity ? '#fff' : '#000000')};

          &:hover {
            color: ${(props) => (props.opacity ? '#fff' : '#4063ec')};
          }
        }
      }

      .active:not(:hover) {
        > span {
          color: #4063ec;

          &:after {
            content: '';
            width: 5px;
            height: 5px;
            display: block;
            background-color: #4063ec;
            border-radius: 5px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -2px;
          }
        }
      }

      > ul {
        display: none;

        li {
          flex-direction: column;
          text-align: center;
          font-weight: 500;
        }
      }

      &:hover {
        .MuiButton-root {
          color: #4063ec;
          //font-weight: bold;
          &:after {
            content: '';
            width: 5px;
            height: 5px;
            display: block;
            background-color: ${(props) =>
              props.opacity ? '#fff' : '#4063ec'};
            border-radius: 5px;
            position: absolute;
            top: -2px;
            left: 50%;
            margin-left: -2px;
            animation: ${menuBounce} 0.7s linear forwards;
          }
        }

        > ul {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #fff;
          height: auto;
          justify-content: center;
          width: 140px;
          border-radius: 10px;
          padding: 10px 0;
          font-size: 16px;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
          animation: ${menuAni} 0.5s;
          //opacity: 1;

          > li {
            line-height: 1.6;
            margin: 5px;
            flex: initial;

            &:hover {
              color: #4063ec;
              text-decoration: underline;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
`;

const SearchBox = styled(Box)<{ size: number }>`
  position: absolute;
  right: 0;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  min-width: ${(props) => props.size}px;
  align-items: center;
  justify-content: center;
  background-color: #6e58ff;
  background-color: alpha(#fff, 0.15);
  transition: 0.3s;

  &:hover {
    background-color: alpha(#fff, 0.25);
  }
`;

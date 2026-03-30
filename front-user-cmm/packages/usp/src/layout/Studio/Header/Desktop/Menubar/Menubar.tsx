/* eslint-disable jsx-a11y/alt-text */
import { useContext } from 'react';
import Navigation from './Navigation';
import { NavLink, useNavigate } from 'react-router-dom';
import * as styles from './styles';
import { styled } from '@mui/material/styles';
import { ThemeContext } from 'usp/src/layout/index';
import { Box, Typography } from '@mui/material';
import { useConfigStore } from '~/pages/Home/Home';
import { useRoutesStore } from '~/DynamicRouter';
import { Color } from '~/components/StyleUtils';
import { Button } from '@mui/material';
import { GNB_searchIcon } from '~/components/IconComponents';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/05/15
  화면명    :   공통 메뉴바
  회면ID    :   
  화면/개발 :   Seongeonjoo/navycui
*/
const Menubar = () => {
  const theme = useContext(ThemeContext);
  const {scrollY,direction} = useScroll()
  const { type } = useRoutesStore();
  const navigate = useNavigate();
  // home bg 상태
  const { bgcolorType } = useConfigStore();
  // GNB 영역 컴포넌트화

  function GNBNomal() {
    return (
      <CustomHeader
        css={styles.headerContainer}
        className={
          (theme.label === 'home'
            ? 'home_header'
            : '' || (theme.label === 'sign' || theme.label === 'searchResult')
            ? 'sign_header'
            : '') || (direction ? 'scrollheader' : '')
        }
      >
        <Box className="sidemenu">
          <Typography variant="h1" component="h1">
            <NavLink to="/">
              <Box
                css={
                  theme.label === 'home' || theme.label === 'sign' || theme.label === 'searchResult'
                    ? styles.mainLog
                    : styles.subLog
                }
              />
            </NavLink>

            {/* 
              [D] 2022-08-19 
              1. 사용자지원포털 경우, 삭제 => 추후 추가될 수 있음.
                 {type === 'PORTAL_USP' ? '사용자지원포털' : '사업관리'} 
            */}
            <NavLink
              to={type === 'PORTAL_USP' ? '/' : '/biz'}
              className="loc_tit"
            >
              {type === 'PORTAL_USP' ? '' : '사업관리'}
            </NavLink>
          </Typography>
        </Box>
        {!(theme.label === 'sign' || theme.label === 'searchResult') ? <Navigation /> : ''}

        {!(theme.label === 'sign' || theme.label === 'searchResult') ? (
          <Box
            css={styles.headerQuieckGroup}
            className={`quieckLink ${direction ? 'is-scroll' : ''}`}
          >
            {type === 'PORTAL_USP' ? (
              <NavLink to="/biz">
                <span>사업관리</span>
              </NavLink>
            ) : (
              ''
            )}
            {type === 'PORTAL_USP' ? (
              <NavLink to="#!">
                <span>AI교육</span>
              </NavLink>
            ) : (
              ''
            )}
          </Box>
        ) : (
          ''
        )}

        {!(theme.label === 'sign' || theme.label === 'searchResult') ? (
          <Button className="searchbtn" onClick={() => navigate('/search')}>
            <GNB_searchIcon />
          </Button>
        ) : (
          ''
        )}
      </CustomHeader>
    );
  }

  // 메인쪽 스위치 이벤트 영역
  function GNBCustom() {
    return (
      <CustomHeader css={styles.headerContainer}>
        <Box className="sidemenu">
          <Typography variant="h1" component="h1">
            <NavLink to="/">
              <Box css={styles.subLog} />
            </NavLink>
            <Box className="loc_tit">
              {type === 'PORTAL_USP' ? '사용자지원포털' : '사업관리'}
            </Box>
          </Typography>
        </Box>
        <Navigation />
        <Button className="searchbtn">
          <GNB_searchIcon />
        </Button>
      </CustomHeader>
    );
  }

  if (bgcolorType == '1') {
    return <GNBNomal />;
  } else if (bgcolorType == '2') {
    return <GNBCustom />;
  } else if (bgcolorType == '3') {
    return <GNBCustom />;
  } else if (bgcolorType == '4') {
    return <GNBNomal />;
  } else {
    return <GNBNomal />;
  }
};
// 메인쪽 스위치 이벤트 end

const CustomHeader = styled(Box)`
  position: relative;
  height: 80px;
  background-color: ${Color.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  z-index: 999;
  transition: height 0.5s, transform 0.5s;

  &.scrollheader {
    height: 60px;

    .searchbtn {
      padding: 15px;
      width: 60px;
      height: 60px;
    }
    .menu {
      li {
        button {
          padding: 0;
        }
      }
    }
  }
  &.home_header {
    background-color: rgba(0, 0, 0, 0);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: none;
    .MuiTypography-h1 {
      .loc_tit {
        color: ${Color.white};
      }
    }
  }
  &.sign_header {
    background-color: rgba(0, 0, 0, 0);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: none;
    .MuiTypography-h1 {
      .loc_tit {
        display: none;
      }
    }
  }
  // logo + title
  .MuiTypography-h1 {
    height: 100%;
    display: flex;
    align-items: center;
    .loc_tit {
      margin-left: 16px;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.38px;
    }
  }
  .sidemenu {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
  .searchbtn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 25px;
    background-color: ${Color.topaz};
    border-radius: 0;
    transition: transform 0.5s;
    &:hover {
      background-color: ${Color.topaz};
    }
  }

  .--type-white & {
    background: ${Color.white};
    border-bottom: 0;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);

    &.home_header {
      .MuiTypography-h1 {
        .loc_tit {
          color: ${Color.black};
        }
      }
    }
    .menu {
      li {
        button {
          color: ${Color.black};
        }
      }
    }
  }
`;

export default Menubar;

import useSWR from "swr";
import {AuthenticationType} from "../../authentication";
import {NavLink, useNavigate} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import styled from '@emotion/styled';
import {useGlobalConfigStore} from "../../store/GlobalConfigStore";
import {Box, InputLabel, Select} from "@mui/material";
import {getBaseUrl, setup} from "../../libs/axios";
import FormControl from "@mui/material/FormControl";
import {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {isTspPortal} from "../../utils/validUtil";

const Toolbar = (props: { isDesktop: boolean, scrollDirection: 'down' | 'up', scrollY: number }) => {
  const {data} = useSWR<AuthenticationType>('authentication');
  const {isTopOpacity} = useGlobalConfigStore()
  const navigator = useNavigate()
  const rootPath = isTspPortal? '/tsp' : ''
  const LogOut = () => {
    navigator(`${rootPath}/signout`)
  }

  return (
    <ToolbarContainer
      isDesktop={props.isDesktop}
      scrollDirection={props.scrollDirection}
      opacity={isTopOpacity}
      scrollY={props.scrollY}>
      <ul className="portal">
        <li>
          <NavLink to="#">사용자지원포털</NavLink>
        </li>
        <li className={'active'}>
          <NavLink to="#">실증지원포털</NavLink>
        </li>
        <li>
          <NavLink to="#">데이터유통포털</NavLink>
        </li>
        <li>
          <NavLink to="#">안심구역포털</NavLink>
        </li>
      </ul>
      <Box sx={{display: 'flex', height: '100%', width: '100%', backgroundColor: isTopOpacity ? 'rgb(0,0,0,0.7)' : '#f5f5f5'}}/>
      <ul className="utility">
        <ServerConfig/>
        {data?.accessToken ? (
          <Fragment>
            <li>
              <NavLink to={`${rootPath}/signout`}>로그아웃</NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              {/*<a href={`http://125.6.37.87/signin?nextUrl=${window.btoa(window.location.href)}`}>로그인</a>*/}
              <NavLink to={`${rootPath}/signin`}>로그인</NavLink>
            </li>
            <li>
              <NavLink to={`/signup`}>회원가입</NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </ToolbarContainer>
  );
}

const ServerConfig = () => {
  const [server, SetServer] = useState<string>("")
  const list = Object.keys(Config)

  // 새로고침 하거나 에러 페이지 값이 초기화 되면 기존 베이스 url값 기준으로 셋팅
  if (server == "") {
    const find = list.filter(f => {
      const data = Config[f as keyof typeof Config];
      if (data.url == getBaseUrl()) return f;
    });
    if (find.length > 0)
      SetServer(Config[find.at(0) as keyof typeof Config].name)
  }

  return <Box style={{paddingRight: "2rem"}}>
    <FormControl sx={{m: 1, width: "120px"}}>
      {/*<InputLabel>{"서버"}</InputLabel>*/}
      <Select
        size={'small'}
        name={"서버"} value={server} style={{color: "black"}}
        onChange={(event: SelectChangeEvent) => {
          SetServer(event.target.value as string)
          const config = Config[event.target.value as keyof typeof Config];
          localStorage.setItem("serverConfig", JSON.stringify(config))
          setup({baseURL: config.url});
        }}>
        {list.map((name) => (
          <MenuItem key={name} value={name}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
}

const Config = {
  tspDev: {
    name: "tspDev",
    url: 'http://3.38.179.210:8083/tsp/api/admin'
  },
  이종결: {
    name: "이종결",
    url: 'http://172.30.1.85:8083/tsp/api/admin'
  },
  이충혁: {
    name: "이충혁",
    url: 'http://172.30.1.86:8083/tsp/api/admin'
  },
  윤여택: {
    name: "윤여택",
    url: 'http://172.30.1.10:8083/tsp/api/admin'
  },
  전원준: {
    name: "전원준",
    url: 'http://172.30.1.34:8083/tsp/api/admin'
  },
  김영현: {
    name: "김영현",
    url: 'http://172.30.1.124:8083/tsp/api/admin'
  },
  로컬: {
    name: "로컬",
    url: 'http://localhost:8083/tsp/api/admin'
  },
  개발서버: {
    name: "개발서버",
    url: "http://125.6.36.170/tsp/api/admin"
  }
}

const ToolbarContainer = styled("section")<{
  opacity: boolean,
  isDesktop: boolean,
  scrollDirection: 'down' | 'up',
  scrollY: number
}>`
  position: relative;
  display: flex;
  //display: ${props => !props.isDesktop && (props.scrollDirection == 'down') && props.scrollY != 0 ? 'none' : 'flex'};
  height: 40px;
  //padding: 17px 40px;
  color: ${props => props.opacity ? '#fff' : 'rgb(0,0,0,0.7)'};
  background-color: ${props => props.opacity ? "transparent" : '#f5f5f5'};
    // border-bottom: 1px solid ${props => props.opacity ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"};
  align-items: center;
  z-index: 2;
  font-size: 14px;
  transition: 0.5s;
    // background-color: ${props => props.opacity && '#000000'};

  .utility {
    position: absolute;
    right: 10px;
    display: flex;
    //flex: 1;
    justify-content: flex-end;
    height: 100%;
    align-items: center;

    > li {
      padding: 0 10px;
      height: 100%;
      display: flex;
      align-items: center;
    }

    > li a {
      font-family: NotoSansCJKKR;
      white-space: nowrap;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.56px;
      text-align: left;
      ${props => props.opacity ? '#fff' : '#000000'};
    }
  }

  .portal {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;

    > li {
      display: flex;
      height: 100%;
      padding: 0 20px;
      align-items: center;
      background-color: ${props => props.opacity && 'rgb(0,0,0,0.7)'};

      > a {
        opacity: 0.6;
        font-family: NotoSansCJKKR;
        white-space: nowrap;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.56px;
        text-align: left;
      }

      &.active {
        background-color: ${props => props.opacity ? 'transparent' : 'white'};

        > a {
          color: ${props => props.opacity && 'white'};
          opacity: 1;
        }
      }
    }
  }

  .sideon {
    display: flex;
    font-family: NotoSansCJKKR;
    white-space: nowrap;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.56px;
    text-align: left;

    ${props => props.opacity ? '#fff' : '#000000'};

    p {
      margin-right: 10px;
      opacity: 0.8;
    }

    em {
      font-style: normal;
      margin-right: 10px;

      //&.on {
      //  display: inline-block;
      //  width: 12px;
      //  height: 12px;
      //  background-color: #2DC11C;
      //  border-radius: 10px;
      //  margin-top: 3px;
      //}
    }
  }
`


export default Toolbar;
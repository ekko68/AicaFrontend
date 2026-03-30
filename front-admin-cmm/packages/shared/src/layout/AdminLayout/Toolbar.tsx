import useSWR from "swr";
import {AuthenticationType} from "../../authentication";
import {NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, {Fragment, useState} from "react";
import {Color} from "../../components/StyleUtils";
import {Box, FormControl, InputLabel, makeStyles, Select, Stack} from "@mui/material";
import {HorizontalInterval} from "../../components/LayoutComponents";
import {SelectChangeEvent} from "@mui/material/Select";
import {CustomButton} from "../../components/ButtonComponents";
import MenuItem from "@mui/material/MenuItem";
import styled from '@emotion/styled';
import {getBaseUrl, setup} from "../../libs/axios";

function Toolbar() {
  const {data} = useSWR<AuthenticationType>('authentication');
  const isTsp = window.location.href.includes('tsp_admin')

  return (
    <section style={{backgroundColor: "#1f2437"}}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingX={"40px"}
        sx={{height: '80px'}}>

        <Stack flexDirection={"row"} alignItems={"center"} sx={{pl: "30px"}}>
          <NavLink to={isTsp? "/tsp_admin" : "/"}>
            <img src={`${isTsp? '/tsp_admin/' : '/'}images/logo01.png`}/>
          </NavLink>

          <HorizontalInterval size={"24px"}/>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            className="top_title"
            color="white"
          >
            {isTsp ? '실증지원포털' : '사용지원포털'}
          </Typography>
        </Stack>

        <Stack flexDirection={"row"} alignItems={"center"} sx={{color: "white"}}>
          <ServerConfig/>
          <span>관리자</span>
          <HorizontalInterval size={"10px"}/>
          <NavLink to={`${process.env.REACT_APP_PROJECT}` == 'usp' ? '/signout' : '/tsp_admin/signout'}>로그아웃</NavLink>
        </Stack>
      </Stack>

      {/*<ul className="login_info">*/}
      {/*  {data?.accessToken ? (*/}
      {/*    <Fragment>*/}
      {/*      <li>*/}
      {/*        <NavLink to={'/#'}> 홍길동님 (anvycui)</NavLink>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <NavLink to={'/signout'}>로그아웃</NavLink>*/}
      {/*      </li>*/}
      {/*    </Fragment>*/}
      {/*  ) : (*/}
      {/*    <Fragment>*/}
      {/*      <li>*/}
      {/*        <NavLink to={'/signin'}>로그인</NavLink>*/}
      {/*      </li>*/}
      {/*    </Fragment>*/}
      {/*  )}*/}
      {/*</ul>*/}
    </section>
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
      <InputLabel>{"서버"}</InputLabel>
      <Select
        label={"서버"} value={server} style={{color: "white"}}
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
export default Toolbar;
import * as styles from './styles';
import {useLocation, useNavigate} from 'react-router-dom';
import React from 'react';
import useSWR from 'swr';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {RouteType} from "../../utils/RouteUtiles";
import {Icons} from "../../components/IconContainer";
import {Box} from "@mui/material";
import {useRouteStore} from "../../store/RouteConfigStore";
import {Body4} from "../../components/TextComponents";
import {Color} from "../../components/StyleUtils";
import {isTspPortal} from "../../utils/validUtil";

function getActivateRoutes(
  pathname: string,
  items: RouteType[],
  selected = []
): any {
  return items.reduce((a: any, b: RouteType) => {
    const regexp = new RegExp(`^${b.path!}`);
    if (regexp.test(pathname)) a.push(b);
    return getActivateRoutes(pathname, b.children || [], a);
  }, selected);
}

function BreadCrumb() {
  const location = useLocation();
  const navigate = useNavigate()
  // const { data: routes } = useSWR('route://service');
  const {routes} = useRouteStore()

  if (!routes) return <div />;

  function handleClick(path: string) {
    const splitString = path.split('/')
    if (splitString.length == 3){
      navigate(path)
    }
  }
  const slice = isTspPortal? 4 : 0
  const items = getActivateRoutes(location.pathname.substring(slice), routes);
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={{color:'#707070'}}/>}
      css={styles.bread}
    >
      <Link href="/" color="#fff">
        <Icons.Home/>
      </Link>
      {items.map((route: RouteType) => (
        <Link
          underline="hover"
          key={route.path}
          color="#fff"
          // href={route.path!}
          onClick={() => handleClick(route.path!)}
        >
          <Body4 color={Color.line}>{route.label}</Body4>
          {/*{route.label}*/}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default BreadCrumb;

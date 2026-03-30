import * as R from 'ramda';
import useSWR from 'swr';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteType } from '../../../../../utils/RouteUtiles';
import TreeView from '@mui/lab/TreeView';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import {useRouteStore} from "../../../../../store/RouteConfigStore";
// import { ServiceRoutes } from '~/Router';
// import Drawer from '@mui/material/Drawer';

function LNB() {
  const location = useLocation();
  const navigate = useNavigate();
  // tobe ...
  // const [expanded, setExpanded] = useState<string[]>([]);
  // const [selected, setSelected] = useState<string[]>([]);
  // const { data:routes } = useSWR(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/auth/menus/PORTAL_UAM/me`, fetcher);
  // const { data: routes = [] } = useSWR('route://service');
  const {routes} = useRouteStore()
  const nav = R.find((v: RouteType) =>
    new RegExp(`^${v.path}`).test(location.pathname)
  )(routes);

  const handleClick = (url: string) => {
    navigate(url);
  };

  // tobe ...
  // const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
  //   setExpanded(nodeIds);
  // };

  // // tobe ...
  // const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
  //   setSelected(nodeIds);
  // };

  //* 메뉴 아이템에 active class 추가
  return routes ? (
    <Box className="leftMenu">
      <div className="m_tit">교육관리</div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>사업정보관리</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<RemoveIcon />}
            defaultExpandIcon={<AddIcon />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem nodeId="1" label="사업정보관리">
              <TreeItem nodeId="2" label="사업정보관리" />
              <TreeItem nodeId="3" label="기준사업관리" />
              <TreeItem nodeId="4" label="기준사업정보관리" />
              <TreeItem nodeId="5" label="기준사업분류관리" />
              <TreeItem nodeId="6" label="사업비비모관리" />
            </TreeItem>
            <TreeItem nodeId="7" label="사업현황관리">
              <TreeItem nodeId="8" label="업체현황조회" />
            </TreeItem>
          </TreeView>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>사업현황관리</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<RemoveIcon />}
            defaultExpandIcon={<AddIcon />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem nodeId="1" label="업체현황조회"></TreeItem>
          </TreeView>
        </AccordionDetails>
      </Accordion>
      {/*<TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // tobe ... start
        defaultExpanded={['menu-ADM010000', 'menu-ADM010100', 'menu-ADM010101']}
        defaultSelected={['menu-ADM010101']}
        // expanded={expanded}
        // selected={selected}
        // onNodeToggle={handleToggle}
        // onNodeSelect={handleSelect}
        // tobe ... end
      >
        {routes.map((item: RouteType, i: number) => {
          return (
            <TreeItem
              key={item.path}
              nodeId={item.menuId}
              label={item.label}
              className={clsx(nav?.path === item.path && 'active')}
              sx={{ mt: 1 }}
            >
              {(item.children || []).map((item1: RouteType, k: number) => {
                return (
                  <TreeItem
                    key={item1.path}
                    nodeId={item1.menuId}
                    label={item1.label}
                    className={clsx(nav?.path === item1.path && 'active')}
                  >
                    {(item1.children || []).map(
                      (item2: RouteType, y: number) => {
                        return (
                          <TreeItem
                            key={item2.path}
                            nodeId={item2.menuId}
                            label={item2.label}
                            className={clsx(
                              location?.pathname === item2.path && 'active'
                            )}
                            onClick={handleClick.bind(null, item2.path!)}
                          ></TreeItem>
                        );
                      }
                    )}
                  </TreeItem>
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
      */}
    </Box>
  ) : null;
}

export default LNB;

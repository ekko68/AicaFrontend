/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRoutesStore } from '~/DynamicRouter';
import * as styles from './styles';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { ThemeContext } from 'usp/src/layout/index';
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useQuery } from 'react-query';
import { GridRemoveIcon } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
export interface RouteData {
  systemId: string;
  menuId: string;
  menuNm: string;
  url: string;
  newWindow?: boolean;
  parentMenuId?: string;
  sortOrder?: number;
  creatorId?: string;
  createdDt?: number;
  updaterId?: string;
  updatedDt?: number;
  path?: string;
  label?: string;
  children?: RouteData[];
}

const Search = styled('button')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  width: '100%',
}));

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

/*
  모바일 메뉴바 (햄버거 버튼)
*/
const Menubar = () => {
  const theme = useContext(ThemeContext);
  const { type } = useRoutesStore();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const { data: routes = [] }: any = useQuery('route://service');

  // 메뉴 조회
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const renderTree1 = (nodes: RouteData) => {
    if (nodes.label == '사업신청') {
      return;
    }
    return (
      <TreeItem key={nodes.menuId} nodeId={nodes.menuId} label={nodes.menuNm}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree1(node))
          : null}
      </TreeItem>
    );
  };

  const potals = () => (
    <Box role="presentation" sx={{ width: 350 }}>
      <ListItemButton onClick={handleClick} sx={{ mt: 1 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="사용자지원포털" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <ListItemButton onClick={handleClick} sx={{ mt: 1 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="실증지원포털" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <ListItemButton onClick={handleClick} sx={{ mt: 1 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="데이터유통포털" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <ListItemButton onClick={handleClick} sx={{ mt: 1 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="사업관리" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <ListItemButton onClick={handleClick} sx={{ mt: 1 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="안심구역포털" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>

      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<GridRemoveIcon />}
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
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<GridRemoveIcon />}
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
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<GridRemoveIcon />}
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

      {/* <NavLink to="/" >사용자지원포털</NavLink>
      <NavLink to="/">실증지원포털</NavLink>
      <NavLink to="/">데이터유통포털</NavLink>
      <NavLink to="/biz/BusinessAppMgt">사업관리</NavLink>
      <NavLink to="/">안심구역포털</NavLink> */}
      {/* <Box className="leftMenu">
        <div className="m_tit">Controlled accordion</div>
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
              defaultCollapseIcon={<GridRemoveIcon />}
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
      </Box> */}
      {/* Nested List */}
      {/* <ListItemButton onClick={handleClick} sx={{mt:3}}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        // {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </Box>
  );

  const list = (anchor: Anchor) => (
    <Box
      sx={{ height: 350, flexGrow: 1, maxWidth: 400, overflowY: 'auto', mt: 5 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!!routes ? (
        routes.length > 0 ? (
          routes.map((nodes: RouteData, idx: number) => {
            return (
              <TreeView
                key={idx}
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                // defaultExpanded={['menu-FRN010000']}
                defaultExpandIcon={<ChevronRightIcon />}
                // sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                {renderTree1(nodes)}
              </TreeView>
            );
          })
        ) : (
          <div />
        )
      ) : (
        <div />
      )}
    </Box>
  );

  return (
    <section
      css={
        theme.label === 'home'
          ? styles.container
          : theme.label === 'sign'
          ? styles.containerSign
          : styles.containerFactor
      }
    >
      <div css={styles.sidemenu}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          component="button"
          onClick={toggleDrawer('left', true)}
          css={
            theme.label === 'home' || theme.label === 'sign'
              ? styles.whiteIcon
              : styles.blackIcon
          }
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <h1>
          {/** 이미지 base64 코드로 임시삽입 */}
          <NavLink to="/">
            <Box
              className={
                theme.label === 'home' || theme.label === 'sign'
                  ? 'logoMo'
                  : 'logoMo02'
              }
            ></Box>
          </NavLink>
          {type === 'PORTAL_PMS' && (
            <NavLink to={'/biz'} className="loc_tit">
              사업관리
            </NavLink>
          )}
        </h1>
      </div>
      <div css={styles.searchbox}>
        <Search css={styles.search} onClick={() => navigate('/search')}>
          <SearchIcon sx={{ fontSize: 35, color: '#fff' }} />
        </Search>
      </div>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {potals()}
        {list('left')}
      </Drawer>
    </section>
  );
};

export default Menubar;

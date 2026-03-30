import React from 'react';
import { NavLink } from 'react-router-dom';
import { RouteType } from '~/models/RouteType';
import { Button, MenuItem } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
// import HoverMenu from 'material-ui-popup-state/HoverMenu';
// import { usePopupState, bindHover, bindFocus, bindMenu} from 'material-ui-popup-state/hooks'
import { makeStyles } from '@material-ui/core/styles';

/* 
  작성일    :   2022/06/01
  화면명    :   공통 GNB 컴포넌터 영역 추가
  화면/개발 :   Seongeonjoo / navycui
*/

const useCascadingMenuStyles:any = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
    submenu: {
      marginTop: theme.spacing(-1),
    },
    title: {
      flexGrow: 1,
    },
    moreArrow: {
      marginRight: theme.spacing(-1),
    },
  }))
  
  const CascadingContext = React.createContext({
    parentPopupState: null,
    rootPopupState: null,
  })
  
  const CascadingMenuItem:React.FC<{  
      [x: string]: any;
      onClick: any;
      }> = props =>{
    const { rootPopupState }:any = React.useContext(CascadingContext)
    if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
    const handleClick = React.useCallback(
      (event:any) => {
        rootPopupState.close(event)
        if (props.onClick) props.onClick(event)
      },
      [rootPopupState, props.onClick]
    )
    return <MenuItem {...props} onClick={handleClick} />
  }
  // const CascadingSubmenu:React.FC<{  
  //   [x: string]: any;
  //   title: any;
  //   popupId: any;
  //   }> = props =>{
  //   const classes = useCascadingMenuStyles()
  //   const { parentPopupState } = React.useContext(CascadingContext)
  //   const popupState = usePopupState({
  //     popupId:props.popupId,
  //     variant: 'popover',
  //     parentPopupState,
  //   })
  //   return (
  //     <React.Fragment>
  //       <MenuItem {...bindHover(popupState)} {...bindFocus(popupState)}>
  //         <span className={classes.title}>{props.title}</span>
  //         <ChevronRight className={classes.moreArrow} />
  //       </MenuItem>
  //       <CascadingMenu
  //         {...props}
  //         classes={{ ...props.classes, paper: classes.submenu }}
  //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  //         popupState={popupState}
  //       />
  //     </React.Fragment>
  //   )
  // }
  
  // const CascadingMenu:React.FC<{  
  //   [x: string]: any;
  //   popupState: any;
  // }> = props =>{
  //   const { rootPopupState } = React.useContext(CascadingContext)
  //   const context = React.useMemo(
  //     () => ({
  //       rootPopupState: rootPopupState || props.popupState,
  //       parentPopupState: props.popupState,
  //     }),
  //     [rootPopupState, props.popupState]
  //   )
  
  //   return (
  //     <CascadingContext.Provider value={context}>
  //       <HoverMenu {...props} {...bindMenu(props.popupState)} />
  //     </CascadingContext.Provider>
  //   )
  // }
  
export const CascadingHoverMenus: React.FC<{row: RouteType}> = props => {
    // const popupState = usePopupState({
    //   popupId: 'demoMenu',
    //   variant: 'popover',
    // })
    return (
      <div>
        {/* <Button
          variant="contained"
          {...bindHover(popupState)}
          {...bindFocus(popupState)}
        >
          {props.row.label}
        </Button>
        <CascadingMenu
          popupState={popupState}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {(props.row.children || []).map((col: RouteType, k: number) => {
            return (
              <React.Fragment>
                {(col.children) 
                ? 
                <CascadingSubmenu
                  popupId="moreChoicesCascadingMenu"
                  title={col.label}
                >
                {(col.children || []).map((col1: RouteType, k1: number) => {
                  return (
                    <>
                      <NavLink to={`${col1.path}`}>
                        <CascadingMenuItem onClick={undefined}>{col1.label}</CascadingMenuItem>
                      </NavLink>
                    </>
                  );
                })}
                </CascadingSubmenu>
                :
                <NavLink to={`${col.path}`}>
                  <CascadingMenuItem onClick={undefined}>{col.label}</CascadingMenuItem>
                </NavLink>}
              </React.Fragment>
            );
          })}
        </CascadingMenu> */}
      </div>
    )
  }


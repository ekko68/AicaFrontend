import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteType } from '~/models/RouteType';
import * as styles from '../styles';
import authentication from '~/../../shared/src/authentication';
import { useQuery } from 'react-query';
import { useGlobalScroll, useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/05/10
  화면명    :   공통 -> 
  
  화면/개발 :   Seongeonjoo / navycui
*/
const Navigation = (args: any) => {
  const tokBox = authentication.getUser();
  const {direction} = useScroll();
  const { data: routes }: any = useQuery('route://service');
  const { scrollActive }: any = useGlobalScroll();

  return (
    <nav role="navigation" {...args}>
      <ul className="menu">
        {!!routes
          ? routes.map((row: RouteType, i: number) => {
              return (
                <li key={i}>
                  <p>{row.label}</p>
                  {/* <button type="button">
                {row.label}
              </button> */}
                  <ul className={direction ? 'is-scroll' : ''}>
                    {(row.children || []).map((col: RouteType, k: number) => {
                      if (!!col.path) {
                        if (
                          col.path.indexOf('CorporateInfoMmt') > -1 &&
                          ((tokBox != 'SOLE' && tokBox != 'CORPORATION') ||
                            tokBox == undefined)
                        )
                          return (
                            <li key={k} style={{ display: 'none' }}>
                              <NavLink to={`${col.path}`}>{col.label}</NavLink>
                              {(col.children || []).map(
                                (col1: RouteType, k1: number) => {
                                  return (
                                    <Fragment key={k1}>
                                      <NavLink to={`${col1.path}`}>
                                        {col1.label}
                                      </NavLink>
                                    </Fragment>
                                  );
                                }
                              )}
                            </li>
                          );
                      }
                      return (
                        <li
                          key={k}
                          css={col.label == '사업신청' ? styles.isCom : ''}
                        >
                          <NavLink to={`${col.path}`}>{col.label}</NavLink>
                          {(col.children || []).map(
                            (col1: RouteType, k1: number) => {
                              return (
                                <Fragment key={k1}>
                                  <NavLink to={`${col1.path}`}>
                                    {col1.label}
                                  </NavLink>
                                </Fragment>
                              );
                            }
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })
          : null}
      </ul>
    </nav>
  );
};

export default Navigation;

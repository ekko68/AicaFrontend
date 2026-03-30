import { Fragment, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthenticationType } from 'shared/authentication';
import useSWR from 'swr';
import { ThemeContext } from 'usp/src/layout/index';
import * as styles from './styles';
import { useConfigStore } from '~/pages/Home/Home';
import { fetchSignOut } from '~/fetches';
import authentication from 'shared/authentication';
import { css } from '@emotion/react';

/* 
  작성일    :   2022/05/15
  화면명    :   공통 GNB 툴바
  회면ID    :   
  화면/개발 :   navycui
*/
const Toolbar = () => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data } = useSWR<AuthenticationType>('authentication');
  const logOut = async () => {
    await fetchSignOut();
    authentication.remove();
    window.sessionStorage.removeItem('__FACTOR_KEY__');
    navigate('/');
    // window.location.href = '/';
  };

  const userNameCss = css`
    display: flex;
    align-items: center;

    b {
      margin-right: 2px;
      font-weight: 500;
    }
  `;

  // GNB 영역 컴포넌트화
  const GNBNomal = () => {
    return (
      <section css={styles.toolbarContainer}>
        <ul className="portal">
          <li>
            <NavLink to="/" className={'active'}>
              사용자지원포털
            </NavLink>
          </li>
          <li>
            <a href="http://dev-portal.atops.or.kr/tsp" target="_blank">
              실증지원포털
            </a>
          </li>
          <li>
            <a href="http://dev-portal.atops.or.kr/dxp" target="_blank">
              데이터유통포털
            </a>
          </li>
          <li>
            <a href="http://dev-portal.atops.or.kr/saz" target="_blank">
              안심구역포털
            </a>
          </li>
          {/* <li>
            <NavLink to="/biz/BusinessAppMgt">사업관리</NavLink>
          </li> */}
        </ul>
        <ul className="utility">
          {data?.accessToken ? (
            <Fragment>
              <li>
                <NavLink to={''} css={userNameCss}>
                  <b>{authentication.getUserNm()}</b>
                  <span>님, 안녕하세요</span>
                </NavLink>
              </li>
              <li>
                {/* onClick={logOut} */}
                <NavLink to={''} onClick={logOut}>
                  로그아웃
                </NavLink>
              </li>
              {/* <li>
                <NavLink to={'/MyPage'}>마이페이지</NavLink>
              </li> */}
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <NavLink to={'/signin'}>로그인</NavLink>
              </li>
              <li>
                <NavLink to={'/signup'}>회원가입</NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </section>
    );
  };
  // function GNBCustom() {
  //   return(
  //     <section css={styles.containerFactor}>
  //       <ul className="portal">
  //         <li>
  //             <NavLink to="#">사용자지원포털</NavLink>
  //           </li>
  //           <li>
  //             <NavLink to="#">실증지원포털</NavLink>
  //           </li>
  //           <li>
  //             <NavLink to="#">안심구역포털</NavLink>
  //           </li>
  //           <li>
  //             <NavLink to="/biz/BusinessAppMgt">사업관리</NavLink>
  //           </li>
  //           <li>
  //             <NavLink to="#">안심구역포털</NavLink>
  //           </li>
  //         </ul>
  //       <ul className="utility">
  //         {data?.accessToken ? (
  //           <Fragment>
  //             <li>
  //               <NavLink to={''} onClick={logOut}>로그아웃</NavLink>
  //             </li>
  //             {/* <li>
  //               <NavLink to={'/MyPage'}>마이페이지</NavLink>
  //             </li> */}
  //           </Fragment>
  //         ) : (
  //           <Fragment>
  //             <li>
  //               <NavLink to={'/signin'}>로그인</NavLink>
  //             </li>
  //             <li>
  //               <NavLink to={'/signup'}>회원가입</NavLink>
  //             </li>
  //           </Fragment>
  //         )}
  //       </ul>
  //     </section>
  //   );
  // }

  // if (bgcolorType == '1') {
  //   return <GNBNomal />;
  // } else if (bgcolorType == '2') {
  //   return <GNBCustom />;
  // } else if (bgcolorType == '3') {
  //   return <GNBCustom />;
  // } else if (bgcolorType == '4') {
  //   return <GNBNomal />;
  // } else {
  //   return <GNBNomal />;
  // }

  return <GNBNomal />;
};
export default Toolbar;

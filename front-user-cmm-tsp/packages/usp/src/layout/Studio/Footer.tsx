/* eslint-disable jsx-a11y/alt-text */
import * as styles from './styles';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RouteType } from '~/models/RouteType';
import { useQuery } from 'react-query';

const footerSwiper = {
  navigation : true,
  slidesPerView: 1.6,
  spaceBetween: 0,
  speed: 600, 
  pagination : false,
  observer: true,
  observeParents: true,
  breakpoints: {
    1280: {
      slidesPerView: 5,
      spaceBetween: 20,
    }
  }
}
function Footer(args: any) {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const {data:routes}:any = useQuery('route://service');
  
  const syncLocation = () => {
    setSelected(() => location.pathname);
  };

  //* location 시 변경 selected 초기화
  useEffect(syncLocation, [location]);

  const handleClick = (route: any) => {
    setSelected(route.path);
  };
  return (
    <div css={styles.container}>
      <div className="footer">
        <div>
          <Box css={styles.slide_cont}>
            <Swiper {...footerSwiper}>
              <SwiperSlide>
                <a href="https://www.nipa.kr/" target={'_blank'}><img src="/images/common/othergroup_01.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="http://www.kopti.re.kr" target={'_blank'}><img src="/images/common/othergroup_02.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="http://www.gjtp.or.kr" target={'_blank'}><img src="/images/common/othergroup_03.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="https://www.gigca.or.kr/" target={'_blank'}><img src="/images/common/othergroup_04.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="https://www.gmcc.co.kr/" target={'_blank'}><img src="/images/common/othergroup_05.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="https://www.gmcc.co.kr/" target={'_blank'}><img src="/images/common/othergroup_05.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="https://www.gmcc.co.kr/" target={'_blank'}><img src="/images/common/othergroup_05.png" /></a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="https://www.gmcc.co.kr/" target={'_blank'}><img src="/images/common/othergroup_05.png" /></a>
              </SwiperSlide>
            </Swiper>
          </Box>
          <Box className="cont2">
            <Stack direction="row" justifyContent="flex-start" >
              <Box css={styles.box01}>
                <nav role="navigation" {...args}  className="pc">
                  <ul>
                    {routes.map((row: RouteType, i: number) => {
                      const isActive = selected.indexOf(row.path!) > -1;
                      return (
                        <li key={i} className={clsx([!!isActive && 'active'])}>
                          <button type="button" onClick={handleClick.bind(null, row)}>
                            {row.label}
                          </button>
                          <ul>
                            {(row.children || []).map((col: RouteType, k: number) => {
                              return (
                                <li key={k}>
                                  <NavLink to={`${col.path}`} replace>
                                    {col.label}
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className='others pcver'>
                  <ul>
                    <li>
                      <NavLink to={`/`} >
                        개인정보처리방침
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        이용약관
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        FAQ
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        사용자 매뉴얼
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        자료실
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Box>
              <Box css={styles.box02}>
                <img className='logo' src="/images/common/logo_footer.png"/>
                <div className='others mover'>
                  <ul>
                    <li>
                      <NavLink to={`/`} >
                        개인정보처리방침
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        이용약관
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        FAQ
                      </NavLink>
                    </li>
                    <br/>
                    <li>
                      <NavLink to={`/`} >
                        사용자 매뉴얼
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/`} >
                        자료실
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className='address'>
                  광주광역시 북구 첨단과기로 176번길 11 3층<br />
                  TEL. 062-610-3910<span>FAX. 062-974-1943</span>
                </div> 
                <p className='copyright'>©2021 인공지능산업융합사업단. ALL RIGHTS RESERVED</p>
                <div className="sns_icon">
                    <ul>
                      <li className='facebook'><NavLink target={'_blank'} to="http://www.facebook.com">facebook</NavLink></li>
                      <li className='twitter'><NavLink target={'_blank'} to="http://www.twitter.com">twitter</NavLink></li>
                      <li className='instagram'><NavLink target={'_blank'} to="http://www.instagram.com">instagram</NavLink></li>
                    </ul>
                </div>
              </Box>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
}
export default Footer;
// Swiper
SwiperCore.use([Navigation]);
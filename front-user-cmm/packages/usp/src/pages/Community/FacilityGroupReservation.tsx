import { useState, useRef, useEffect, useCallback } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Tabs, Tab, Stack, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import {KakaoMaps} from '~/components/KaKaoMaps';
import {Link} from 'react-scroll'
import { Map } from 'react-kakao-maps-sdk';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useGlobalScroll, useScroll } from '../store/GlobalModalStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
/* 
작성일    :   2022/06/14
화면명    :   사업단소개/ ->  사업단소개 페이지
회면ID    :   UI-USP-FRN-0420501
화면/개발 :   yhkim20 / navycui
// 모바일 작업안됨 추후수정예정
*/
const  FacilityGroupReservation = () =>  {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const loaded = useRef(false); 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={scrollY ? "fixed scrollaction" : "fixed"}>
        <Box 
          className="benner" 
          ref={measuredRef} 
          sx={{transform: direction ? 'translate(0, -11px)' : 
          'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업단소개</h2>
            </div>
            <div className='tab_wrap'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="인사말" {...a11yProps(0)} />
                <Tab label="연혁" {...a11yProps(1)} />
                <Tab label="비전" {...a11yProps(2)} />
                <Tab label="조직도" {...a11yProps(3)} />
                <Tab label="오시는길" {...a11yProps(4)} />
              </Tabs>
            </div>
          </div>
        </Box>
      </Box>
      <Box sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className='content_body'>
          <div className="content">
          <TabPanel value={value} index={0}>
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="div">
                인사말
              </Typography>
            </Stack>
            <div className='mo_wrap'>
            <Grid container>
              <Grid item xs={12} md={4.4}>
                <img className='grid_img pc' src='/images/subpage/temp_introduce.png' alt='temp introduce' />
                <img className='grid_img mo' src='/images/subpage/temp_introduce_mo.png' alt='temp introduce' />
              </Grid>
              <Grid item xs md={7.6}>
                <div className='intro-text'>
                  <div className='text-title'>
                  인공지능 강국<br className='mo' /> 대한민국을 열어갈 수 있도록<br />
                  세계 최고 수준의 <br className='pc'/>
                  인공지능산업융합 <br className='mo' />생태계를 조성하겠습니다.
                  </div>
                  <p>
                    오늘날 세계는 인공지능(AI)을 중심으로 한 4차산업혁명 시대를 선도하기 위해 치열한 경쟁을 하고 있습니다.<br />
                    우리나라에서도 AI 국가전략을 마련하여 새로운 시대에 대비하고 있습니다.
                  </p>
                  <p>
                    AI 국가전략의 일환으로 과학기술정보통신부와 광주광역시가 함께 <br className='pc' />
                    광주광역시 첨단 3지구에 AI 산업융합 집적단지를 조성하고 있습니다.
                  </p>
                  <p>
                  인공지능산업융합사업단은 사업 추진조직으로<br className='pc' />
                  데이터 중심의 AI 데이터센터 및 실증센터 구축, AI 창업 및 기업 지원, AI 인재 양성 등<br className='pc' />
                  AI 산업융합 생태계 조성에 필요한 집적단지 조성사업을 추진하고 있습니다.
                  </p>
                  <p>
                  우리 사업단은 세계 최고 수준의 인공지능산업융합 생태계 조성을 통해 <br className='pc' />
                  AI 강국 대한민국을 열어가는 초석을 다지는데 최선을 다 하겠습니다.<br />
                  </p>
                  <p className='name'>
                    단장<strong>임차식</strong>
                    <img src='/images/subpage/temp_introduce_sign02.png' width={92} alt='temp_introduce_sign' />
                  </p>
                </div>
              </Grid>
            </Grid>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="div">
                연혁
              </Typography>
            </Stack>
            <div className='history'>
              <ul>
                <li>
                  <dl>
                    <dt>2021</dt>
                    <dd><span>12</span>인공지능 특화산업(헬스케어·자동차·에너지) 실증센터 개소</dd>
                    <dd className='ti'><span>11</span>국가 인공지능 집적단지 착공식</dd>
                    <dd className='ti'><span>11</span>광주AI창업캠프 2호 개관(광주 동구 금남로 193-12)</dd>
                    <dd className='ti'><span>02</span>'국가 AI 데이터센터' 착수식(광주광역시 첨단3지구 '국가 인공지능 융복합단지' 내 구축)<br />
                    <p className='blt'>문재인 대통령 영상축사</p>
                    </dd>
                    <dd>
                      <div className='movieBox'>
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/cpjk4tzTrOw" title="국민 모두를 위한 인공지능 시대로 ㅣ국가 인공지능 데이터센터 투자협약 및 착수식 문재인 대통령 영상축사" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>2020</dt>
                    <dd><span>11</span>광주 AI창업캠프 1호 개관(광주광역시 동구 금남로 193-22)</dd>
                    <dd><span>11</span>광주 AI투자펀드 조성(1,098억원)</dd>
                    <dd><span>04</span>사업단-참여기관 간 사업수행 협약 체결</dd>
                    <dd><span>03</span>수행계획 수립 및 NIPA-광주광역시-사업단 간 사업 협약 체결</dd>
                    <dd><span>01</span>인공지능산업융합사업단 설립</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>2019</dt>
                    <dd><span>11</span>적정성 검토 완료(KDI, KISTEP), 총 사업비 3,939억원(非R&D 3431, R&D 508)</dd>
                    <dd><span>02</span>인공지능 중심 산업 융합 집적단지 조성 최종보고서 제출</dd>
                    <dd><span>01</span>인공지능 중심 산업융합 집적단지 조성 예비타당성 조사 면제사업 확정</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>2018</dt>
                    <dd><span>11</span>국가균형발전 기반 구축 사업 신청 (광주광역시)</dd>
                    <dd><span>07</span>인공지능 기반 집적단지 조성 예비타당성 조사 사전 기획 연구용역 개시</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>2017</dt>
                    <dd><span>07</span>인공지능 기반 집적단지 조성을 문재인 정부 국정운영 5개년 계획 반영</dd>
                  </dl>
                </li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="div">
                비전
              </Typography>
            </Stack>
            <div className='mo_wrap'>
              <div className='vision'>
                <div className='slogan_txt'>국가 인공지능 융복합단지가<br />대한민국의 새로운 변화와 미래를 열어가겠습니다.</div>
                <ul>
                  <li>
                    <dl>
                      <dt>비전</dt>
                      <dd>
                        <div className='vision_txt'>세계적인 인공지능 기업을 육성하여<br className='mo'/> AI 4대 강국 도약</div>
                      </dd>
                    </dl>
                  </li>
                  <li>
                    <dl>
                      <dt>목표</dt>
                      <dd><div className='objective'>新혁신동력 확보를 위한<br className='mo' /> AI 산업융합 생태계 조성</div></dd>
                    </dl>
                  </li>
                  <li className='strategy'>
                    <dl>
                      <dt>전략</dt>
                      <dd>
                        <div className='box'>
                          <ul>
                            <li>
                              <div className='sg_tit'>AI 산업융합<br />인프라 조성</div>
                            </li>
                            <li>
                              <div className='sg_tit'>AI 특화 창업<br className='mo' /> 및<br className='pc'/>기업<br className='mo' /> 성장 지원</div>
                            </li>
                            <li>
                              <div className='sg_tit'>AI 융합<br className='mo' />인재 양성</div>
                            </li>
                            <li>
                              <div className='sg_tit'>AI+산업융합형<br />연구개발(R&D)</div>
                            </li>
                          </ul>
                        </div>
                      </dd>
                    </dl>
                  </li>
                  <li className='promowork'>
                    <dl>
                      <dt>추진과제</dt>
                      <dd>
                        <div className='box'>
                          <ul>
                            <li>
                              <ul>
                                <li>공간건축</li>
                                <li>AI 특화 데이터센터 구축</li>
                                <li>
                                  3대 분야* 실증장비 구축
                                  <p>* 자동차, 에너지, 헬스케어</p>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <ul>
                                <li>STAND UP
                                  <p>수요 연계형 예비창업 지원</p>
                                </li>
                                <li>START UP
                                  <p>투자 연계형 AI 창업 지원</p>
                                </li>
                                <li>
                                  SCALE UP
                                  <p>판로 개척형 AI 기업성장 지원</p>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <ul>
                                <li>대학 AI 인력양성</li>
                                <li>재직자 AI 교육</li>
                              </ul>
                            </li>
                            <li>
                              <ul>
                                <li>
                                  자동차, 에너지, 헬스케어<br />
                                  <div className="inp">AI 플랫폼 기술개발</div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="div">
                조직도
              </Typography>
            </Stack>
            <div className='organization'>
              <div className='chart'>
                <Link to="team1" className="team1" spy={true} smooth={true} offset={-80}>전략기획팀</Link>
                <Link to="team2" className="team2" spy={true} smooth={true} offset={-80}>데이터센터</Link>
                <Link to="team3" className="team3" spy={true} smooth={true} offset={-80}>실증기반센터</Link>
                <Link to="team4" className="team4" spy={true} smooth={true} offset={-80}>창업지원팀</Link>
                <Link to="team5" className="team5" spy={true} smooth={true} offset={-80}>인재양성팀</Link>
                <Link to="team6" className="team6" spy={true} smooth={true} offset={-80}>인공지능종합지원센터</Link>
                <Link to="team7" className="team7" spy={true} smooth={true} offset={-80}>사업지원팀</Link>
              </div>
              <ul>
                <li>
                  <dl>
                    <dt>인공지능산업융합사업단</dt>
                    <dd>
                      <ul className='nameCard'>
                        <li className='name'>임차식 단장</li>
                        <li className='dept'>사업단 총괄</li>
                        <li className='phone'><a href="tel:062-610-3991">062-610-3991</a></li>
                      </ul>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>사업 본부</dt>
                    <dd>
                      <ul className='nameCard'>
                        <li className='name'>곽재도 본부장</li>
                        <li className='dept'>사업본부 총괄</li>
                        <li className='phone'><a href="tel:062-610-3992">062-610-3992</a></li>
                      </ul>
                    </dd>
                  </dl>
                </li>
                <li id='team1'>
                  <dl>
                    <dt>전략기획팀</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>박현호 팀장</li>
                          <li className='dept'>전략기획팀 총괄</li>
                          <li className='phone'><a href="tel:062-610-3910">062-610-3910</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>박수진 차석</li>
                          <li className='dept'>대외협력, 홍보, 언론대응</li>
                          <li className='phone'><a href="tel:062-610-3914">062-610-3914</a></li>
                        </ul>
                      </div>
                      <div>
                      <ul className='nameCard'>
                          <li className='name'>박지현 책임</li>
                          <li className='dept'>2단계 기획, 예산</li>
                          <li className='phone'><a href="tel:062-610-3911">062-610-3911</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>정소원 책임</li>
                          <li className='dept'>메타버스, 예산, 홍보</li>
                          <li className='phone'><a href="tel:062-610-3912">062-610-3912</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>최은석 책임</li>
                          <li className='dept'>1단계 사업관리</li>
                          <li className='phone'><a href="tel:062-610-3915">062-610-3915</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>류성은 선임</li>
                          <li className='dept'>법인화</li>
                          <li className='phone'><a href="tel:062-610-3913">062-610-3913</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li id="team2">
                  <dl>
                    <dt>데이터센터</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>오병두 센터장</li>
                          <li className='dept'>데이터센터 총괄</li>
                          <li className='phone'><a href="tel:062-610-3920">062-610-3920</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>박창현 차석</li>
                          <li className='dept'>데이터융합서비스</li>
                          <li className='phone'><a href="tel:062-610-3924">062-610-3924</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>심용석 차석</li>
                          <li className='dept'>컴퓨팅자원서비스</li>
                          <li className='phone'><a href="tel:062-610-3925">062-610-3925</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>김성완 차석</li>
                          <li className='dept'>AI반도체 실증</li>
                          <li className='phone'><a href="tel:062-610-3926">062-610-3926</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>박종선 책임</li>
                          <li className='dept'>클라우드 임차용역</li>
                          <li className='phone'><a href="tel:062-610-3922">062-610-3922</a></li>
                        </ul>
                      </div>
                      <div>
                      <ul className='nameCard'>
                          <li className='name'>김홍근 책임</li>
                          <li className='dept'>헬스·에너지 데이터활용</li>
                          <li className='phone'><a href="tel:062-610-3923">062-610-3923</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>윤지훈 선임</li>
                          <li className='dept'>사용자·실증 포털</li>
                          <li className='phone'><a href="tel:062-610-3971">062-610-3971</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>민지연 선임</li>
                          <li className='dept'>자동차·콘텐츠<br className='pc'/>데이터활용</li>
                          <li className='phone'><a href="tel:062-610-3972">062-610-3972</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>오세희 선임</li>
                          <li className='dept'>안심존·유통 포털</li>
                          <li className='phone'><a href="tel:062-610-3973">062-610-3973</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>김예은 선임</li>
                          <li className='dept'>데이터센터 서비스</li>
                          <li className='phone'><a href="tel:062-610-3974">062-610-3974</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li id="team3">
                  <dl>
                    <dt>실증기반센터</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>오세갑 센터장</li>
                          <li className='dept'>실증기반센터 총괄</li>
                          <li className='phone'><a href="tel:062-610-3930">062-610-3930</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>이진호 책임</li>
                          <li className='dept'>헬스케어분야</li>
                          <li className='phone'><a href="tel:062-610-3934">062-610-3934</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>김한울 책임</li>
                          <li className='dept'>에너지분야</li>
                          <li className='phone'><a href="tel:062-610-3932">062-610-3932</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>선문성 책임</li>
                          <li className='dept'>자동차분야</li>
                          <li className='phone'><a href="tel:062-610-3933">062-610-3933</a></li>
                        </ul>
                      </div>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>하새롬 선임</li>
                          <li className='dept'>에너지분야</li>
                          <li className='phone'><a href="tel:062-610-3934">062-610-3934</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>문지수 선임</li>
                          <li className='dept'>헬스케어분야</li>
                          <li className='phone'><a href="tel:062-610-3935">062-610-3935</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>양하늘 선임</li>
                          <li className='dept'>자동차분야</li>
                          <li className='phone'><a href="tel:062-610-3936">062-610-3936</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li id="team4">
                  <dl>
                    <dt>창업지원팀</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>용승현 팀장</li>
                          <li className='dept'>창업지원팀 총괄</li>
                          <li className='phone'><a href="tel:062-610-3930">062-610-3940</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>정자형 책임</li>
                          <li className='dept'>AI (시)제품‧서비스 <br className='pc'/>제작 지원</li>
                          <li className='phone'><a href="tel:062-610-3941">062-610-3941</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>정선미 책임</li>
                          <li className='dept'>AI 창업 지원</li>
                          <li className='phone'><a href="tel:062-610-3943">062-610-3943</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>임주희 책임</li>
                          <li className='dept'>투자유치 지원</li>
                          <li className='phone'><a href="tel:062-610-3944">062-610-3944</a></li>
                        </ul>
                      </div>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>김보람 책임</li>
                          <li className='dept'>AI 제품‧서비스<br className='pc' />고도화 지원</li>
                          <li className='phone'><a href="tel:062-610-3942">062-610-3942</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>이지은 선임</li>
                          <li className='dept'>글로벌 진출 지원</li>
                          <li className='phone'><a href="tel:062-610-3945">062-610-3945</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>이재요 선임</li>
                          <li className='dept'>AI 창업캠프 입주 지원</li>
                          <li className='phone'><a href="tel:062-610-3946">062-610-3946</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li id="team5">
                  <dl>
                    <dt>인재양성팀</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>오여진 팀장</li>
                          <li className='dept'>인재양성팀 총괄</li>
                          <li className='phone'><a href="tel:062-610-3950">062-610-3950</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>이은정 책임</li>
                          <li className='dept'>AI 융합대학 지원</li>
                          <li className='phone'><a href="tel:062-610-3951">062-610-3951</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>김혜인 책임</li>
                          <li className='dept'>AI 직무전환 교육</li>
                          <li className='phone'><a href="tel:062-610-3952">062-610-3952</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li id="team6">
                  <dl>
                    <dt>인공지능종합지원센터</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>김형수 센터장</li>
                          <li className='dept'>AI종합지원센터 총괄</li>
                          <li className='phone'><a href="tel:062-610-3980">062-610-3980</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>김건오 책임</li>
                          <li className='dept'>입주기업지원</li>
                          <li className='phone'><a href="tel:062-610-3982">062-610-3982</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>박주미 책임</li>
                          <li className='dept'>유치기업지원</li>
                          <li className='phone'><a href="tel:062-610-3983">062-610-3983</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li id='team7'>
                  <dl>
                    <dt>사업지원팀</dt>
                    <dd>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>김상숙 팀장</li>
                          <li className='dept'>AI종합지원센터 총괄</li>
                          <li className='phone'><a href="tel:062-610-3960">062-610-3960</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>김보화 책임</li>
                          <li className='dept'>제규정, 계약, 예산</li>
                          <li className='phone'><a href="tel:062-610-3961">062-610-3961</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>차원석 책임</li>
                          <li className='dept'>공간건축물 관리</li>
                          <li className='phone'><a href="tel:062-610-3962">062-610-3962</a></li>
                        </ul>
                      </div>
                      <div>
                        <ul className='nameCard'>
                          <li className='name'>한상원 책임</li>
                          <li className='dept'>인사, 조직문화, 직제</li>
                          <li className='phone'><a href="tel:062-610-3963">062-610-3963</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>박진선 책임</li>
                          <li className='dept'>회계관리</li>
                          <li className='phone'><a href="tel:062-610-3964">062-610-3964</a></li>
                        </ul>
                        <ul className='nameCard'>
                          <li className='name'>권하나 선임</li>
                          <li className='dept'>직원복지, 급여</li>
                          <li className='phone'><a href="tel:062-610-3965">062-610-3965</a></li>
                        </ul>
                      </div>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="div">
                오시는 길
              </Typography>
            </Stack>
            <div className='location'>
              <h3 className='mt-0'>ETRI 호남권연구센터</h3>
              <div className='address'>
                <ul>
                  <li>
                    <div className='tit'>주소</div>
                    <div className='text'>광주광역시 북구 첨단과기로 176번길 11 3층</div>
                  </li>
                  <li>
                    <div className='tit'>대표 연락처</div>
                    <div className='text'>TEL : 062-610-3910   /   FAX : 062-974-1943</div>
                  </li>
                </ul>
              </div>
              <div className='map'>
                <KakaoMaps url={{lat:35.2249865,lng:126.8463226}}/>
              </div>
              <h4>자가용 이용 시</h4>
              <div className='routeBox byCar'>
                <div className='tit'>광산IC에서 오는 경우</div>
                <div className='route'>
                  광산IC 출발<span></span>호남고속도로 이후 약 1분소요<span></span>광산교차로에서 '첨단단지, 과학기술원'방면으로 우측방향<span></span>첨단과기로를 따라 84M 이동<span></span><br className="pc" />
                  비아지하보차도 진입후 첨단 과기로를 따라 1.91Km 이동 <span></span>'디자인센터, 광주식약청, TBN 교통방송' 방면으로 우회전<span></span>첨단과기로 176번길 따라 244m 이동 <span></span>좌회전<span></span>14m 이동<span></span><br className='pc'/>
                  인공지능산업융합사업단 도착
                </div>
              </div>
              <h4>광주권 시내버스 이용 시 (사업단 도착 시내버스)</h4>
              <div className='routeBox byBus'>
                <div className='tit'>사업단 도착 시내버스</div>
                <table className='tableDefault'>
                  <colgroup>
                    <col style={{width:'30%'}} />
                    <col style={{width:'20%'}} />
                    <col style={{width:'50%'}} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>하차 정류장</th>
                      <th colSpan={2}>버스번호</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th rowSpan={2}>광통 신<br className='mo' />연구 센터</th>
                      <td className='tac'>바로노선</td>
                      <td>[간선] 풍암 16, <br className='mo' />[간선] 첨단 30</td>
                    </tr>
                    <tr>
                      <td className='tac'>바로노선</td>
                      <td>[지선] 운림 51, <br className='mo' />[간선] 풍암 16, <br className='mo' />[지선] 첨단 193, <br className='mo' />[간선] 첨단 30</td>
                    </tr>
                    <tr>
                      <th rowSpan={2}>광주 디자인 센터 / 광주 교통 방송</th>
                      <td className='tac'>바로노선</td>
                      <td>[간선] 송정 33, <br className='mo' />[간선] 봉선 27, <br className='mo' />[간선] 문흥 39, <br className='mo' />[간선] 첨단 40</td>
                    </tr>
                    <tr>
                      <td className='tac'>바로노선</td>
                      <td>[간선] 첨단 40, <br className='mo' />[간선] 문흥 39, <br className='mo' />[간선] 봉선 27, <br className='mo' />[지선] 금호 46</td>
                    </tr>
                    <tr>
                      <th rowSpan={2}>정부 광주 지방 합동 청사</th>
                      <td className='tac'>바로노선</td>
                      <td>[간선] 봉선 27, <br className='mo' />[간선] 문흥 39</td>
                    </tr>
                    <tr>
                      <td className='tac'>바로노선</td>
                      <td>[간선] 문흥 39, <br className='mo' />[간선] 봉선 27, <br className='mo' />[간선] 첨단 30, <br className='mo' />[지선] 금호 46</td>
                    </tr>
                  </tbody>
                </table>
                <div className='tbl_caption'>&#x2022; 버스검색 - 광주광역시 버스운행정보에서 버스검색 을 하시면 상세경로를 확인하실 수 있습니다.</div>
              </div>
              <h3>AI 자동차 실증센터</h3>
              <div className='address'>
                <ul>
                  <li>
                    <div className='tit'>주소</div>
                    <div className='text'>광주그린카진흥원 기술지원동 (주소 : 광주광역시 광산구 삼거동 509)</div>
                  </li>
                </ul>
              </div>
              <div className='map' id="aiVehicleDemonstrationCenter">
                {/* 카카오 등 지도 API 연동 */}
                <KakaoMaps url={{lat:35.1687131,lng:126.6763621}}/>
              </div>
              <h3>AI 에너지 실증센터</h3>
              <div className='address'>
                <ul>
                  <li>
                    <div className='tit'>주소</div>
                    <div className='text'>한국광기술원 연구동, 실험동 (주소 : 광주광역시 북구 월출동 971-35)</div>
                  </li>
                </ul>
              </div>
              <div className='map' id="aiEnergyDemonstrationCenter">
                {/* 카카오 등 지도 API 연동 */}
                <KakaoMaps url={{lat:35.231853563,lng:126.860182619}}/>
              </div>
              <h3>AI 헬스케어 실증센터</h3>
              <div className='address'>
                <ul>
                  <li>
                    <div className='tit'>주소</div>
                    <div className='text'>빛고을노인건강타운 복지관 (주소 : 광주광역시 남구 덕남길 7)</div>
                  </li>
                </ul>
              </div>
              <div className='map' id="aiHealthcareDemonstrationCenter">
                {/* 카카오 등 지도 API 연동 */}
                <KakaoMaps url={{lat:35.0994196,lng:126.8959145}}/>
              </div>
              <h3>AI창업캠프</h3>
              <div className='address'>
                <ul>
                  <li>
                    <div className='tit'>AI창업캠프 1호점</div>
                    <div className='text'>광주광역시 동구 금남로 193-22</div>
                  </li>
                  <li>
                    <div className='tit'>AI창업캠프 2호점</div>
                    <div className='text'>광주광역시 동구 금남로 193-12</div>
                  </li>
                </ul>
              </div>
              <div className='map'>
                {/* <KakaoMaps url={{lat:35.2249865,lng:126.8463226}} urls={[{ lat: 33.450705, lng: 126.570677 },{ lat: 33.450936, lng: 126.569477 }]}/> */}
                <Map
                  center={{
                    // 지도의 중심좌표
                    lat: 35.1516,
                    lng: 126.9148,
                  }}
                  draggable={true}
                  zoomable={true}
                  style={{ width: "100%", height: "405px" }}
                  level={2}
                >
                  <CustomOverlayMap           
                    position={{ lat: 35.1516, lng: 126.9148 }}>
                    <div className="label" style={{color: "#000"}}>
                      <span className="left"></span>
                      <span className="center">AI창업캠프 1호점</span>
                      <span className="right"></span>
                    </div>
                  </CustomOverlayMap>
                  <CustomOverlayMap           
                    position={{ lat: 35.1518, lng: 126.9152 }}>
                    <div className="label" style={{color: "#000"}}>
                      <span className="left"></span>
                      <span className="center">AI창업캠프 2호점</span>
                      <span className="right"></span>
                    </div>
                  </CustomOverlayMap>
                  {/* <MapMarker position={props.url}></MapMarker> */}
                  {
                    [{ lat: 35.1516, lng: 126.9148 },{ lat: 35.1518, lng: 126.9152 }].map((position, index) => (
                        <MapMarker 
                          key={index}
                          position={position}
                          // image={{
                          //   src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                          //   size: {
                          //     width: 24,
                          //     height: 35
                          //   }, // 마커이미지의 크기입니다
                          // }}
                          title={'aica'} 
                        ></MapMarker>
                        // <MapMarker
                        //   key={`${position.title}-${position.latlng}`}
                        //   position={position.latlng} // 마커를 표시할 위치
                        //   image={{
                        //     src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                        //     size: {
                        //       width: 24,
                        //       height: 35
                        //     }, // 마커이미지의 크기입니다
                        //   }}
                        //   title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        // />
                      ))
                  }
                </Map>
              </div>

            </div>
          </TabPanel>
          </div>
        </div>
      </Box>
    </div>
  );
  function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
      return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
}
export default FacilityGroupReservation;

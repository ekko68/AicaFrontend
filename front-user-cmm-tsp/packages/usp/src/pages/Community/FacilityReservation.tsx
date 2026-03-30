import React, { useCallback } from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Tabs, Tab, Stack, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import {Link} from 'react-scroll'
import { useScroll} from "~/pages/store/GlobalModalStore";

// 커뮤니티/ ->  시설예약 페이지
function OneByOneInquiry() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setValue2(0);
    setValue3(0);
    setValue4(0);
    window.scrollTo({top:0, left:0, behavior: 'smooth'});
  };
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const handleChange1 = (event: React.SyntheticEvent, newValue1: number) => {
    setValue1(newValue1);
  };
  const handleChange2 = (event: React.SyntheticEvent, newValue1: number) => {
    setValue2(newValue1);
  };
  const handleChange3 = (event: React.SyntheticEvent, newValue1: number) => {
    setValue3(newValue1);
  };
  const handleChange4 = (event: React.SyntheticEvent, newValue1: number) => {
    setValue4(newValue1);
  };

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);


  return (
    <>
    <div id="tab1"></div>
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={scrollY ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'}  ref={measuredRef} sx={{transform: direction ? 'translate(0, -11px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업 소개</h2>
            </div>
            <div className='tab_wrap'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="AI 창업·기업지원" {...a11yProps(0)} />
                <Tab label="AI 융합인력양성" {...a11yProps(1)} />
                <Tab label="실증기반" {...a11yProps(2)} />
                <Tab label="데이터 센터" {...a11yProps(3)} />
                <Tab label="공간건축" {...a11yProps(4)} />
              </Tabs>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <Box className="detailtab_02">
              <div className='scrollTab pc'>
                <Tabs value={value1} selectionFollowsFocus onChange={handleChange1} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>사업개요</span>
                  </Link>
                  } aria-selected="true" />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={ scrollY ? -380 : -640}>
                    <span>AI예비창업지원</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={ scrollY ? -360 : -640}>
                    <span>AI스타트업지원</span>
                  </Link>
                  } />
                  <Tab label={<Link to="tab4" spy={true} smooth={true} offset={ scrollY ? -360 : -640}>
                    <span>AI기업성장지원</span>
                  </Link>} />
                </Tabs>
              </div>
              <div className='scrollTab mo'>
                <Tabs value={value1} selectionFollowsFocus onChange={handleChange1} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>사업개요</span>
                  </Link>
                  } aria-selected="true" />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={ scrollY ? -210 : -425}>
                    <span>AI예비창업지원</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={ scrollY ? -210 : -425}>
                    <span>AI스타트업지원</span>
                  </Link>
                  } />
                  <Tab label={<Link to="tab4" spy={true} smooth={true} offset={ scrollY ? -210 : -425}>
                    <span>AI기업성장지원</span>
                  </Link>} />
                </Tabs>
              </div>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className="detailtab_02">
              <div className='scrollTab pc'>
                <Tabs value={value2} selectionFollowsFocus onChange={handleChange2} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>사업개요</span>
                  </Link>
                  } aria-selected="true" />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={scrollY ? -330 : -570}>
                    <span>AI융합대학</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={scrollY ? -330 : -530}>
                    <span>공용인프라구축</span>
                  </Link>
                  } />
                  <Tab label={<Link to="tab4" spy={true} smooth={true} offset={scrollY ? -330 : -490}>
                    <span>AI직무전환교육</span>
                  </Link>} />
                </Tabs>
              </div>
              <div className='scrollTab mo'>
                <Tabs value={value2} selectionFollowsFocus onChange={handleChange2} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>사업개요</span>
                  </Link>
                  } aria-selected="true" />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={scrollY ? -190 : -360}>
                    <span>AI융합대학</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={scrollY ? -190 : -320}>
                    <span>공용인프라구축</span>
                  </Link>
                  } />
                  <Tab label={<Link to="tab4" spy={true} smooth={true} offset={scrollY ? -190 : -280}>
                    <span>AI직무전환교육</span>
                  </Link>} />
                </Tabs>
              </div>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box className="detailtab_02">
              <div className='scrollTab pc'>
                <Tabs value={value3} selectionFollowsFocus onChange={handleChange3} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>사업개요</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={scrollY ? -320 : -560}>
                    <span>자동차분야</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={scrollY ? -320 : -520}>
                    <span>에너지분야</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab4" spy={true} smooth={true} offset={scrollY ? -320 : -490}>
                    <span>헬스케어분야</span>
                  </Link>
                  } />
                </Tabs>
              </div>
              <div className='scrollTab mo'>
                <Tabs value={value3} selectionFollowsFocus onChange={handleChange3} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>사업개요</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={scrollY ? -195 : -360}>
                    <span>자동차분야</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={scrollY ? -195 : -330}>
                    <span>에너지분야</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab4" spy={true} smooth={true} offset={scrollY ? -195 : -290}>
                    <span>헬스케어분야</span>
                  </Link>
                  } />
                </Tabs>
              </div>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box className="detailtab_02">
              <div className='scrollTab pc'>
                <Tabs value={value4} selectionFollowsFocus onChange={handleChange4} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>서비스개요</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={scrollY ? -320 : -570}>
                    <span>운영 및 추진계획</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={scrollY ? -320 : -530}>
                    <span>지원 사양</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab4" spy={true} smooth={true} offset={scrollY ? -320 : -490}>
                    <span>서비스 운영</span>
                  </Link>
                  } />
                </Tabs>
              </div>
              <div className='scrollTab mo'>
                <Tabs value={value4} selectionFollowsFocus onChange={handleChange4} variant="scrollable" scrollButtons={false} allowScrollButtonsMobile aria-label="basic tabs2">
                  <Tab label={
                    <Link to="tab1" spy={true} smooth={true}>
                    <span>서비스개요</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab2" spy={true} smooth={true} offset={scrollY ? -205 : -360}>
                    <span>운영 및 추진계획</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab3" spy={true} smooth={true} offset={scrollY ? -205 : -330}>
                    <span>지원 사양</span>
                  </Link>
                  } />
                  <Tab label={
                    <Link to="tab4" spy={true} smooth={true} offset={scrollY ? -205 : -290}>
                    <span>서비스 운영</span>
                  </Link>
                  } />
                </Tabs>
              </div>
            </Box>
          </TabPanel>
        </Box>
      </Box>
      <Box sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className='content_body'>
          <div className="content">
            <div className="ai_startup">
              <TabPanel value={value} index={0}>
                <Stack spacing={6} direction="column" className="sub_tit">
                  <Typography variant="h4" component="div">
                    사업개요
                  </Typography>
                </Stack>
                <div className="biz_list">
                  <dl>
                    <dt><span>01</span>사업목표</dt>
                    <dd>AI 특화 창업 및 기업 육성 체계 구축‧운영을 통한<br className="mo" />AI 창업 생태계 조성</dd>
                  </dl>
                  <dl>
                    <dt><span>02</span>사업내용</dt>
                    <dd className="group">
                      <dl>
                        <dt>AI 예비창업 지원</dt>
                        <dd>AI 창업 경진대회</dd>
                        <dd>창업 교육 프로그램 운영</dd>
                        <dd>창업‧사업화(BM) 컨설팅 지원</dd>
                      </dl>
                      <dl>
                        <dt>AI 스타트업 지원</dt>
                        <dd>AI 시제품 개발 지원</dd>
                        <dd>광주AI창업캠프 운영</dd>
                        <dd>AI 스타트업 펀드 조성 및 투자지원</dd>
                      </dl>
                      <dl>
                        <dt>AI 기업 성장 지원</dt>
                        <dd>AI 규제 해소 컨설팅 지원</dd>
                        <dd>AI 품질 향상 컨설팅 지원</dd>
                        <dd>글로벌 AI 제품‧서비스 고도화 지원</dd>
                        <dd>글로벌 네트워크 구축 및 국내외 마케팅 지원</dd>
                        <dd>글로벌 AI 컨퍼런스 개최</dd>
                      </dl>
                    </dd>
                  </dl>
                  <dl>
                    <dt><span>03</span>사업기간</dt>
                    <dd>’20년~24년(5개년)</dd>
                  </dl>
                  <dl>
                    <dt><span>04</span>사업예산</dt>
                    <dd>총556억 원 / (’21년) 8,455백만 원
                    </dd>
                    <img className='ai_startup_company' src="/images/subpage/img_ai_startup_company.png" alt="AI창업 기업 육성 지원 500개사" />
                  </dl>
                </div>
                <div id="tab2" >
                  <div className="banner ai_pre_foundation_support">AI 예비 창업 지원</div>
                  <div className="biz_list">
                    <div className="def_title">AI 창업 경진대회</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>다양한 사업 아이템에 대한 산업 AI 수요를 매칭하여<br className="mo" />창업과 사업화 지원 추진</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 창업 경진대회 개최, 참가자의 AI 교육, 컨설팅<br className="mo" />및 멘토링 지원</dt>
                          <dd>지원대상 :  AI 예비창업자(팀)</dd>
                          <dd>주요내용 :  참가자 모집 → 개막식 → 본선 → 결선 → 시상 → 시제품 제작 지원</dd>
                          <dd>산업 AI수요조사 : 경진대회 참가팀의 사업 아이템에 대한 시장 조사와 관련 수요를 조사하여, 비즈니스모델 개선과 수요-공급 매칭 지원</dd>
                          <dd>시제품제작지원 : 과제수 10개내외 창업지원<br className="mo" />총 500백만원 지원</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">창업 교육 프로그램 운영</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 창업에 필요한 사업아이템 구체화 등을 위한 교육 추진</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 창업 교육 프로그램 운영</dt>
                          <dd>교육대상 : 경진대회 참가자, 예비창업자, AI 스타트업 등</dd>
                          <dd>교육내용 : 기업가정신, 사업계획 및 BM 발굴‧구축, 경영, 창업지도, 비즈니스, 마케팅, 자금확보, 법률, 세무, 특허 등 교육 프로그램 운영 등</dd>
                          <dd>교육인원 : 80명</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">창업‧사업화(BM) 컨설팅 지원</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 창업 멘토링 및 사업화 컨설팅 지원을 통한<br className="mo" />비즈니스 역량 강화</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 수요-사업 아이템 매칭, 예비창업자 팀빌딩,<br className="mo" />BM 분석 및 창업 컨설팅 지원</dt>
                          <dd>지원대상 : 경진대회 참가자, 예비창업자, AI 스타트업 등</dd>
                          <dd>지원내용 : 창업 BM 구축, 솔루션 기획, 액셀러레이팅 등의<br className="mo" />멘토링 및 컨설팅</dd>
                          <dd>지원방식 : 상시 선정 및 상시 멘토링‧컨설팅</dd>
                        </dl>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div id="tab3">
                  <div className="banner ai_startup_support">AI 스타트업 지원</div>
                  <div className="biz_list">
                    <div className="def_title">AI 시제품제작 지원</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 스타트업의 아이템 및 시제품 개발을 통한 AI 창업 활성화</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 스타트업의 아이템 및 시제품 개발을 통한<br className="mo" />AI 창업 활성화</dt>
                          <dd>지원대상 : 예비창업자, 창업 7년 미만의 AI 스타트업</dd>
                          <dd>지원내용 : AI (시)제품 제작 비용 과제당<br className="mo" />5천만 원~최대 1억5천만 원 지원</dd>
                          <dd>본사이전 및 분사, 지사 설립을 통한 광주시 이전 시 선정 우대</dd>
                          <dd>지원금의 20%를 선정기업에서 민간부담(민간부담금의 현금 비율은 10%)</dd>
                          <dd>선정규모 : 35개 내외</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">광주 AI창업캠프 운영</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 스타트업의 집적화 및 창업 활성화</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 관련 예비창업자와 스타트업의 입주를 통한<br className="mo" />창업 공간 지원</dt>
                          <dd>지원대상 : 예비창업자, 창업 7년 미만의 AI 스타트업</dd>
                          <dd>공간위치 : 광주광역시 동구 금남로 193-22</dd>
                          <dd>지원내용 : 최대 입주기간 3년(1년 단위로 연장)의 무상 지원</dd>
                          <dd>지원규모 : 독립형 입주공간 35개사 ( 예비창업자 대상 공유오피스는 상시모집)</dd>
                          <dd>공용시설 : 공유오피스, 1인데스크, 교육실, 세미나실, 회의실, 헬스장, 수면실 등</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">AI 스타트업 펀드 조성 및 투자지원</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 스타트업의 사업화 및 성장을 위한 펀드 조성 및 투자 활성화</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 투자펀드 조성과 AI 스타트업에 대한 투자 지원</dt>
                          <dd>투자대상 : 창업 7년 미만의 지역 AI 스타트업(이전 예정 포함)</dd>
                          <dd>펀드 및 투자 규모 : AI 투자 펀드 총1,000억 원 규모(500억 규모 운용사 2개) (광주광역시 AI 스타트업에 200억 원 이상 투자)</dd>
                          <dd>펀드운용기간 : ’20년~'27년(8년간)</dd>
                          <dd>AI 창업기업의 투자 매칭(투자유치 컨설팅 및 설명회) 지원</dd>
                          <dd>기업 역량 강화를 위한 컨설팅 및 모의IR, 투자유치 설명회<br className="mo" />개최</dd>
                        </dl>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div id="tab4">
                  <div className="banner ai_company_growth_support">AI 기업 성장 지원</div>
                  <div className="biz_list">
                    <div className="def_title">AI 규제해소 컨설팅</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 기업의 성장을 위한 규제관련 애로해소</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>규제해소 상담(컨설팅) 및 인공지능 관련<br className="mo" />법률 상담 서비스지원</dt>
                          <dd>지원대상 : AI 스타트업 및 중소기업</dd>
                          <dd>지원내용 : 사업화 과정에서 발생하거나 발생할 것으로<br className="mo" />예측되는 규제 관련 애로사항 상담<br />(인공지능 창업기업의 법률 상담 서비스 지원)</dd>
                          <dd>지원규모 : 규제 해소 컨설팅 지원 100건</dd>
                          <dd>지원방식 : 상시 모집 및 상시 지원</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">AI 품질 향상 컨설팅 지원</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 제품 및 서비스의 품질 향상 지원을 통한 기업의 경쟁력 제고</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 제품 및 서비스의 품질 테스트, 컨설팅 지원</dt>
                          <dd>지원대상 : 창업 7년 미만 스타트업의 AI 제품 및 서비스</dd>
                          <dd>지원규모 : 30건 내외</dd>
                          <dd>컨설팅 대상 맞춤형 AI 알고리즘 성능 측정 지표 가이드 제공</dd>
                          <dd>AI 제품 및 서비스에 대한 품질 시험 실시</dd>
                          <dd>지원방식 : 상시 모집 및 상시 지원</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">글로벌 AI 제품‧서비스 고도화 지원</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>기업의 AI 제품‧서비스 고도화를 통한 국내외 시장 진출 활성화</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>기존 AI 제품의 개선 및 현지화, 기존 제품의 AI 도입 등 관련 비용 지원</dt>
                          <dd>지원대상 : AI 스타트업 및 중소벤처 기업</dd>
                          <dd>총지원금 : 총 750백만 원 (평가에 따라 선정 및 지원 규모 변동가능)</dd>
                          <dd>지원금의 20%는 민간부담하여야 하며, 민간부담금의 현금 비율은 10%임</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">글로벌 네트워크 구축 및<br className="mo" /> 국내외 마케팅 지원</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 스타트업 글로벌 진출 지원을 기반 마련</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>해외 협력 네트워크 구축 및 지원 체계 마련을 통한 기업 지원</dt>
                          <dd>해외 시장조사(AI 관련 규제 및 경쟁 기업 조사 포함) 및 진출전략 수립 지원</dd>
                          <dd>해외시장 준비도 분석 및 맞춤형 해외 시장 컨설팅 지원</dd>
                          <dd>AI 스타트업 판로개척을 위한 해외 바이어 화상 미팅 지원</dd>
                        </dl>
                      </dd>
                    </dl>
                    <div className="def_title">글로벌 AI컨퍼런스 개최</div>
                    <dl>
                      <dt><span>01</span>사업목표</dt>
                      <dd>AI 기술 및 인적 교류를 위한 네트워킹 행사 추진</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업내용</dt>
                      <dd>
                        <dl>
                          <dt>AI 컨퍼런스 및 포럼, 전시회, 투자설명회,<br className="mo" /> 채용박람회 추진</dt>
                          <dd>컨퍼런스 및 포럼 : 글로벌 AI 리더를 통한 최신 정보 공유하는 컨퍼런스 개최</dd>
                          <dd>전시회 : 국내외 AI 제품‧서비스 전시, 체험 프로그램 등 운영</dd>
                          <dd>광주 AI 펀드 투자설명회 개최 및 국내외 AI 제품‧서비스 바이어 및 투자 상담</dd>
                        </dl>
                      </dd>
                    </dl>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Stack spacing={6} direction="column" className="sub_tit">
                  <Typography variant="h4" component="div">
                    사업개요
                  </Typography>
                </Stack>
                <div className="biz_list">
                  <dl>
                    <dt><span>01</span>사업목표</dt>
                    <dd>AI 기술과 특화 산업의 융합 교육을 통한 AI 융합인재 및<br className='mo' />실무인력 양성</dd>
                  </dl>
                  <dl>
                    <dt><span>02</span>사업기간</dt>
                    <dd>2021.01. ~ 2023.12. (4년)</dd>
                  </dl>
                  <dl>
                    <dt><span>03</span>총사업비</dt>
                    <dd>274억원 (민자 별도)</dd>
                  </dl>
                  <dl>
                    <dt><span>04</span>사업내용</dt>
                    <dd>
                      <dl>
                        <dd>AI 융합대학 (자동차, 에너지, 헬스케어 및 원천기술 등<br className='mo' />4개 분야)</dd>
                        <dd>공용 인프라 구축 (6PF, 10PB)</dd>
                        <dd>AI 직무전환 교육</dd>
                      </dl>
                    </dd>
                  </dl>
                </div>
                <div id="tab2" >
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">
                      AI융합대학
                    </Typography>
                  </Stack>
                  <div className="banner subtxt ai_industry_convergence">
                    인공지능 산업융합 실무형 인재양성
                    <p>자동차<span className="dot">·</span>에너지<span className="dot">·</span>헬스케어<span className="dot">·</span>원천기술</p>
                  </div>
                  <div className="biz_list">
                    <div className="process">
                      <ul>
                        <li>
                          <div className="tit tp01">AI융합대학 교육과정 도입</div>
                          <div className="desc">AI+ 지역특화 및 원천기술의 <br />융합 과정 개발 및 운영</div>
                          <div className="desc_sub">AI 전공과정 개설 및 운영</div>
                        </li>
                        <li>
                          <div className="tit tp02">산학협동 프로젝트 추진</div>
                          <div className="desc">산학협력을 통한 수요자 중심의 AI 실습 프로그램 등<br/>개발 및 운영 (인턴십 취업연계 포함)</div>
                          <div className="desc_sub">AI 산학 협력 활동 강화</div>
                        </li>
                        <li>
                          <div className="tit tp03">글로벌 AI 인재 양성</div>
                          <div className="desc">해외기업, 연구소 등과 네트워크 구축하여<br />글로벌 팀 프로젝트 등 추진</div>
                          <div className="desc_sub">글로벌 역량 강화</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="tab3">
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">공용인프라구축</Typography>
                  </Stack>
                  <div className="banner subtxt common_infra">
                  공용인프라
                    <p>대규모 데이터 처리 및 모델링 · 학습 시뮬레이션 등 지원</p>
                  </div>
                  <div className="biz_list">
                    <div className="process">
                      <ul>
                        <li>
                          <div className="tit tp01">공용인프라 구축</div>
                          <div className="desc">최소 6PF/10PB 연산ㆍ저장용량, 개발환경 및<br />운영시설 등 구축</div>
                        </li>
                        <li>
                          <div className="tit tp02">자원활용 극대화</div>
                          <div className="desc">스케줄링을 통한 공평(FAIR) / 중점 (WEIGHTED) / <br/>전용 (DEDICATED) 지원</div>
                        </li>
                        <li>
                          <div className="tit tp03">활용 분야</div>
                          <div className="desc">대학, 기업, 연구소 등의 HPC-AI환경 하의<br />교육과 연구개발 지원</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="tab4">
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">AI 직무전환교육</Typography>
                  </Stack>
                  <div className="ai_job_change_edu"></div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Stack spacing={6} direction="column" className="sub_tit">
                  <Typography variant="h4" component="div">
                    사업개요
                  </Typography>
                </Stack>
                <div className="biz_list">
                  <dl>
                    <dt><span>01</span>추진목표</dt>
                    <dd>3개분야 (자동차, 에너지, 헬스케어) 실증장비 구축 및 운영으로 사업화 촉진</dd>
                  </dl>
                  <dl>
                    <dt><span>02</span>사업기간 및 사업비</dt>
                    <dd>2020~2024(5년), 총 442억 (민자 및 포털 비용 제외)</dd>
                  </dl>
                  <dl>
                    <dt><span>03</span>사업내용</dt>
                    <dd>
                      <dl>
                        <dd>실증장비 총 77종 구축, ‘21년 25종 구축(자동차 8종, 에너지 11종, 헬스케어 6종)</dd>
                        <dd>장비활용(제품안전성 및 성능평가) 및 실증 서비스</dd>
                        <dd>실증데이터 수집, 분석 및 제공</dd>
                      </dl>
                    </dd>
                  </dl>
                  <dl>
                    <dt><span>04</span>분야별 장비 구축(안)</dt>
                  </dl>
                  <div className="banner subtxt ai_proof_equipment mt-20">
                    AI 실증장비(77종)
                    <p>데이터 수집 · 분석 AI 제품 실증 지원</p>
                  </div>
                  <div className="process quad">
                    <ul>
                      <li>
                        <div className="tit tp01">자동차 실증(25종)</div>
                        <div className="list">
                          <ul>
                            <li>대형 드라이빙 시뮬레이터</li>
                            <li>차량용 통신 + 커넥티드카</li>
                            <li>차량 데이터 수집 등</li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="tit tp02">에너지 실증(26종)</div>
                        <div className="list">
                          <ul>
                            <li>AI 에너지 고장진단 장비</li>
                            <li>에너지 탐지 및 분석 장비</li>
                            <li>데이터 거래분석 장비 등</li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="tit tp03">헬스케어 실증(26종)</div>
                        <div className="list">
                          <ul>
                            <li>기초 신체데이터 수집장비</li>
                            <li>의료지원시스템</li>
                            <li>병원 연계 데이터 수집 시스템 등</li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="tit tp04">실증 서비스</div>
                        <div className="list">
                          <ul>
                            <li>AI 제품 및 서비스 실증</li>
                            <li>장비활용(안전성 및 성능평가)지원</li>
                            <li>실증데이터 수집ㆍ분석ㆍ제공</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="tab2">
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">자동차 분야</Typography>
                  </Stack>
                  <div className="list">
                    <ul>
                      <li>자율주행 및 차량 무선통신 등 실증지원</li>
                      <li>가상 대형드라이빙 시뮬레이터 등을 활용한 데이터 수집/분석/제공</li>
                    </ul>
                  </div>
                  <div className="banner subtxt car_proof_equipment">
                    자동차실증장비
                    <p>데이터 수집 · 분석 AI 제품 실증 지원</p>
                  </div>
                  <div className="biz_list">
                    <div className="process quad">
                      <ul>
                        <li>
                          <div className="tit tp01">AI 기반 차량 시뮬레이션</div>
                          <div className="list">
                            <ul>
                              <li>
                                대형 드라이빙 시뮬레이터
                                <ul>
                                  <li>소형 드라이빙 시뮬레이터와 연계하여<br />
                                  차량 간 가상 주행 시뮬레이션 데이터 형성</li>
                                </ul>
                              </li>
                              <li>
                                HILS 기반 테스트 벤치 구축
                                <ul>
                                  <li>인지 센서류 : LIDAR, RADAR 카메라, 초음파 등</li>
                                  <li>부품단위 제어장치 : 조형, 브레이크, 모터, 엑츄에어터 등</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp02">차량용 통신 + 커넥티드카</div>
                          <div className="list">
                            <ul>
                              <li>
                                차량용 통신보안
                                <ul>
                                  <li>통신기술 : CAN, WAVE, 이더넷, 5G 등</li>
                                  <li>보안기술 : 암호화, 익명화 솔루션 등</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp03">차량 데이터 수집</div>
                          <div className="list">
                            <ul>
                              <li>자율주행용 고화질 지도 제작</li>
                              <li>
                              주행 알고리즘 데이터 생성
                                <ul>
                                  <li>고정시설물(차로, 횡단보도 등), 변동사물(보행자, 차량 등), 환경(온도, 강우, 안개 등), 돌발상황(사고차량, 어린이 등) 데이터 생성</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp03">평가 및 인증자원 체계 구축</div>
                          <div className="list">
                            <ul>
                              <li>AI 부품 / 알고리즘 / 시나리오 개발</li>
                              <li>
                                인지 평가 성능 검증 등
                                <ul>
                                  <li>제품인증지원 및 검증</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="tab3">
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">에너지 분야</Typography>
                  </Stack>
                  <div className="list">
                    <ul>
                      <li>전력 소비량 예측 및 전력소비 최소화 제품 및 서비스 등 실증지원</li>
                      <li>에너지 소비 및 태양광발전, ESS 등의 데이터 수집/분석/제공</li>
                    </ul>
                  </div>
                  <div className="banner subtxt energy_proof_equipment">
                    에너지실증장비
                    <p>데이터 수집 · 분석 AI 제품 실증 지원</p>
                  </div>
                  <div className="biz_list">
                    <div className="process quad">
                      <ul>
                        <li>
                          <div className="tit tp01">에너지 고장진단</div>
                          <div className="list">
                            <ul>
                              <li>에너지 데이터 수집에 따른 설비 고장 진단 실증 장비 구축 및 지원</li>
                              <li>이차전지, 전력변화장치 및 전력반도체, 분산전력시스템 고장진단 등</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp02">에너지 탐지 및 분석</div>
                          <div className="list">
                            <ul>
                              <li>에너지 발전 / 수요에 따라 발생하는 변화량 탐지 및 분석</li>
                              <li>ESS 및 신재생 에너지 분석, 태양광 발전 데이터 수집 및 분석</li>
                              <li>EV 충방전 실증 등</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp03">에너지 거래분석</div>
                          <div className="list">
                            <ul>
                              <li>수집된 데이터 분석을 통한 거래 활용성 확보</li>
                              <li>에너지 커뮤니티 실증</li>
                              <li>전력 계통에 대한 시뮬레이션 등</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp03 fnt-less">AI빅데이터 활용 상용화 실증플랫폼</div>
                          <div className="list">
                            <ul>
                              <li>데이터 수집 및 분석을 통한 사업화 제품 테스트 및 실증자원 활성화</li>
                              <li>실증 데이터 공유를 통한 연구 확대</li>
                              <li>데이터 공유 연계 기술 확보</li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="tab4">
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">헬스케어 분야</Typography>
                  </Stack>
                  <div className="list">
                    <ul>
                      <li>헬스케어 제품 및 서비스 실증지원</li>
                      <li>생체신호 및 병원 연계를 통한 데이터 수집/분석/제공</li>
                    </ul>
                  </div>
                  <div className="banner subtxt healthcare_proof">
                  헬스케어실증장비
                    <p>데이터 수집 · 분석 AI 제품 실증 지원</p>
                  </div>
                  <div className="biz_list">
                    <div className="process quad">
                      <ul>
                        <li>
                          <div className="tit tp01">AI보건소</div>
                          <div className="list">
                            <ul>
                              <li>AI 영상진단보조기기</li>
                              <li>폐X-ray Data 분석</li>
                              <li>영상기반 AI의료기기 개발 제품 및 서비스</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp02">병ㆍ의원</div>
                          <div className="list">
                            <ul>
                              <li>AI의료지원플랫폼 구축 및 운영</li>
                              <li>병원 간 온라인 협진</li>
                              <li>진단 및 치료 기기 등 실증</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp03">AI 시민체감</div>
                          <div className="list">
                            <ul>
                              <li>전산반응 분석시스템 등</li>
                              <li>보행패턴, 신체정보 분석, 근기능 Data 분석</li>
                              <li>시민의료앱 서비스</li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="tit tp04">공통</div>
                          <div className="list">
                            <ul>
                              <li>데이터 수집ㆍ분석ㆍ제공</li>
                              <li>AI S/W 검증 시스템</li>
                              <li>헬스케어 창업 / 전환기업 / 서비스</li>
                              <li>연구개발(R&D) 연계 데이터 수집 / 활용</li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className="datacenter">
                  <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">
                      서비스 개요
                    </Typography>
                  </Stack>
                  <div className="biz_list first">
                    <dl>
                      <dt><span>01</span>지원목적</dt>
                      <dd>국가 AI데이터센터 서비스 제공을 통한 AI 산업융합 촉진 및 AI 생태계 활성화</dd>
                    </dl>
                    <dl>
                      <dt><span>02</span>사업기간</dt>
                      <dd>2020년~2024년 (5년)</dd>
                    </dl>
                    <dl>
                      <dt><span>03</span>사업비</dt>
                      <dd>902억원 (민자 55억 포함)</dd>
                    </dl>
                    <dl>
                      <dt><span>04</span>서비스 성능</dt>
                      <dd>
                        <dl>
                          <dd>연산성능 88.5PF, 저장공간 107PB * 클라우드서버(68.5PF) + HPC-AI서버 (20PF)</dd>
                          <dd>1단계 ’21 ~ ’22년 8.85PF / 10.7PB</dd>
                          <dd>2단계 ’23~’24년 88.5PF / 107PB * 25~29년 지속운영</dd>
                        </dl>
                      </dd>
                    </dl>
                    <dl>
                      <dt><span>05</span>서비스 목표</dt>
                      <dd>데이터를 포함한 AI 연구·개발 컴퓨팅자원 및 SaaS, 추론검증 환경 등 지원</dd>
                    </dl>
                  </div>
                  <Grid container columnSpacing={2.4} mt={0}>
                      <Grid item xs md={6} sm={12}>
                        <img src="/images/subpage/datacenter.png" className="img_datacenter" alt='data center' />
                      </Grid>
                      <Grid item xs md={6} sm={12}>
                        <Box className='alaas'>
                          <Box className='title'>Total 패키지 &amp; 서비스 (AlaaS)</Box>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4} className="saas">
                              <Box className="subTitle">SaaS 서비스</Box>
                              <Typography variant="subtitle1">인공지능 솔루션 서비스</Typography>
                              <Typography variant="subtitle2">얼굴인식, OCR, 음성인식,<br className='pc' />번호판인식 등</Typography>
                            </Grid>
                            <Grid item xs={12} md={4} className="paas">
                              <Box className="subTitle">PaaS 서비스</Box>
                              <Typography variant="subtitle1">AI연구개발 서비스</Typography>
                              <Typography variant="subtitle2">개발언어, 프레임워크, 빅데이터, ML/DL 등</Typography>
                            </Grid>
                            <Grid item xs={12} md={4} className="iaas">
                              <Box className="subTitle">IaaS 서비스</Box>
                              <Typography variant="subtitle1">인프라 서비스</Typography>
                              <Typography variant="subtitle2">가속기(HPC-AI), 스토리지 등 인프라 자원</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  <div id="tab2" >
                    <Stack spacing={6} direction="column" className="sub_tit mt60">
                      <Typography variant="h4" component="div">운영 및 추진계획</Typography>
                    </Stack>
                    <Box className="img_operation_plan">
                      <img src="/images/subpage/temp_operation_plan.png" alt="operation plan" />
                    </Box>
                  </div>
                  <div id="tab3">
                    <Stack spacing={6} direction="column" className="sub_tit">
                      <Typography variant="h4" component="div">지원 사양</Typography>
                    </Stack>
                    <p className="sub_tit_sub">컴퓨팅 자원</p>
                    <Box className='biz_list'>
                      <dl>
                        <dt><span>01</span>기준 사양</dt>
                        <dd>’21~ 최대 8GPUs, 50TB (이용자 선택)</dd>
                      </dl>
                      <dl>
                        <dt><span>02</span>HPC-AI</dt>
                        <dd>’23~ 자원공유체계(scheduler) 적용</dd>
                      </dl>
                    </Box>
                    <Typography variant="subtitle1" component="div" className="bracket_tit">&lt;제공 Instance 상세 내역&gt;</Typography>
                      <div className="tableDefault_scroll">
                        <table className="tableDefault type2">
                          <colgroup>
                            <col style={{width:'7%'}} />
                            <col style={{width:'18%'}} />
                            <col style={{width:'18%'}} />
                            <col style={{width:'19%'}} />
                            <col style={{width:'19%'}} />
                            <col style={{width:'19%'}} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th rowSpan={2}>순번</th>
                              <th rowSpan={2}>종류</th>
                              <th rowSpan={2}>성능(TF)</th>
                              <th colSpan={3}>사양</th>
                            </tr>
                            <tr>
                              <th>GPU메모리</th>
                              <th>CPU</th>
                              <th>서버메모리</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>A100×8개</td>
                              <td className="num">156</td>
                              <td>40GB×8개</td>
                              <td>92코어</td>
                              <td className="num">1.8TB</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>A100×4개</td>
                              <td className="num">78</td>
                              <td>40GB×4개</td>
                              <td>48코어</td>
                              <td className="num">900GB</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>T4×8개</td>
                              <td className="num">64</td>
                              <td>16GB×8개</td>
                              <td>24코어</td>
                              <td className="num">350GB</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>T4×4개</td>
                              <td className="num">32</td>
                              <td>16GB×4개</td>
                              <td>24코어</td>
                              <td className="num">350GB</td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>T4×2개</td>
                              <td className="num">16</td>
                              <td>16GB×2개</td>
                              <td>12코어</td>
                              <td className="num">175GB</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    <Typography variant="subtitle1" component="div" className="bracket_tit">&lt;스케줄러 활용 자원 Pool제 운영&gt;</Typography>
                    <div className="tableDefault_scroll">
                        <table className="tableDefault type2">
                          <colgroup>
                            <col style={{width:'33.3%'}} />
                            <col style={{width:'33.3%'}} />
                            <col style={{width:'33.3%'}} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>사양</th>
                              <th>사양</th>
                              <th>사양</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>32 / 64 / 128 GPUs</td>
                              <td>’23년 최신 성능 (SOTA급)</td>
                              <td>필요 시, 20PF Full 사용</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    <p className="sub_tit_sub mt60">활용 환경</p>
                    <Box className='biz_list'>
                      <dl>
                        <dt><span>01</span>기준 사양</dt>
                        <dd>AI개발 프레임워크, 개발언어, 데이터레이크 기능</dd>
                      </dl>
                      <dl>
                        <dt><span>02</span>SaaS</dt>
                        <dd>완성된 모델 활용으로 상품화 진행
                          <div className="list">
                          <ul>
                            <li>매년 2개 추가 및 3rd 솔루션 협업 추진</li>
                          </ul>
                          </div>
                        </dd>
                      </dl>
                    </Box>
                    <Box component="div" className="box type01 environment">
                      <p className="tit">제공환경 항목</p>
                      <Typography variant="subtitle1" component="div" mt={2.5}>개발프레임워크</Typography>
                      <div className="list type2">
                        <ul>
                          <li>Tensorflow, Pytorch, Django, Spring, Flask, Vuejs, Spark, Reactjs, Nodejs, ONNX, scikit-learn 등</li>
                        </ul>
                      </div>
                      <Typography variant="subtitle1" component="div" mt={2.5}>개발언어</Typography>
                      <div className="list type2">
                        <ul>
                          <li>C++, Python, GO, Ruby, Swift, Java, PHP, R 등</li>
                        </ul>
                      </div>
                      <Typography variant="subtitle1" component="div" mt={2.5} fontWeight={500}>SaaS (Software as a Service)</Typography>
                      <div className="list type2">
                        <ul>
                          <li>‘21년 상반기 : 얼굴인식(Face Recognition), 문자인식(OCR), 유사 이미지검색(Fashion Search)</li>
                          <li>‘21년 하반기 : 자동차번호판인식(Carplate), 음성인식(STT), 음성합성</li>
                        </ul>
                      </div>
                    </Box>
                  </div>
                  <div id="tab4">
                    <Stack spacing={6} direction="column" className="sub_tit mt60">
                      <Typography variant="h4" component="div">서비스 운영</Typography>
                    </Stack>
                    <p className="sub_tit_sub">이용자 모집</p>
                    <Box className='biz_list'>
                      <dl>
                        <dt><span>01</span>공모 일정</dt>
                        <dd>매년 11월 정기 모집 (상시: 사업단 홈페이지*, ‘21년은 4월 진행)</dd>
                      </dl>
                      <dl>
                        <dt><span>01</span>활용 기준</dt>
                        <dd>제공자원 기준 사용률 50%이상 (미비시 자원조정 대상)</dd>
                      </dl>
                      <dl>
                        <dt><span>02</span>지원 대상</dt>
                        <dd>
                          인공지능 조성사업 관련 기업(기관)*에 우선 지원하고, 가용자원을 그 외 AI 연구개발 과제에 제공<br />
                          (에너지, 자동차, 헬스케어, 문화컨텐츠 분야 인공지능 집적단지 조성 관련 기업, 광주 이전 및 예정 기업, R&D과제기업, 예비창업기업, (시)제품제작기업 등)
                        </dd>
                      </dl>
                    </Box>
                    <Typography variant="subtitle1" component="div" className="bracket_tit">&lt;평가 항목&gt;</Typography>
                      <div className="tableDefault_scroll">
                        <table className="tableDefault type2">
                          <colgroup>
                            <col style={{width:'30%'}} />
                            <col style={{width:'52.6%'}} />
                            <col style={{width:'17.4%'}} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>사양</th>
                              <th>세부항목</th>
                              <th>배점</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>정책의 부합성</td>
                              <td className="tal">
                                <div className="list">
                                  <ul>
                                    <li>집적단지 조성사업 목적 및 기여도</li>
                                  </ul>
                                </div>
                              </td>
                              <td className="num">30</td>
                            </tr>
                            <tr>
                              <td>수행과제 우수성</td>
                              <td className="tal">
                                <div className="list">
                                  <ul>
                                    <li>과제 내용의 우수성 및 구체성</li>
                                    <li>과제 수행계획에 따른 개발 및 서비스·제품화 가능성</li>
                                  </ul>
                                </div>
                              </td>
                              <td className="num">30</td>
                            </tr>
                            <tr>
                              <td>HPC 필요성 및 요구스펙 당위성</td>
                              <td className="tal">
                                <div className="list">
                                  <ul>
                                    <li>고성능 컴퓨팅 기반 연구의 계획 및 구체성</li>
                                    <li>고성능 컴퓨팅 클라우드 자원의 필요성 및 당위성</li>
                                  </ul>
                                </div>
                              </td>
                              <td className="num">30</td>
                            </tr>
                            <tr>
                              <td>목표성과</td>
                              <td className="tal">
                                <div className="list">
                                  <ul>
                                    <li>목표성과에 대한 구체성 및 가능성</li>
                                    <li>성과 활용 계획</li>
                                  </ul>
                                </div>
                              </td>
                              <td className="num">30</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={2} className="bdr">합계</td>
                              <td className="num">100</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Stack spacing={6} direction="column" className="sub_tit">
                    <Typography variant="h4" component="div">
                    공간건축
                    </Typography>
                  </Stack>
                  <div className="spaceArchitecture">
                    <div className="sub_tit_sub">컴퓨팅 자원</div>
                    <Box className="biz_list">
                      <dl>
                        <dt><span>01</span>대지위치</dt>
                        <dd>광주광역시 북구 오룡동 1089번지 일원(첨단3지구)</dd>
                      </dl>
                      <dl>
                        <dt><span>02</span>사업기간</dt>
                        <dd>2020~2023(4년)</dd>
                      </dl>
                      <dl>
                        <dt><span>03</span>면적대지</dt>
                        <dd>47,256㎡, 연면적 24,955㎡</dd>
                      </dl>
                      <dl>
                        <dt><span>04</span>사업비</dt>
                        <dd>958억원</dd>
                      </dl>
                      <dl>
                        <dt><span>05</span>규모</dt>
                        <dd>2개동 - 창업,실증(지하1층 ~ 지상7층), 데이터센터(지상2층)</dd>
                      </dl>
                    </Box>
                    <Typography variant="h6" component="div">연차별 사업추진계획</Typography>
                    <div className="yearPlan">
                      <div className="inner">
                        <ul>
                          <li>
                            <img src="/images/subpage/temp_space_architecture_2020.png" alt="2020년" />
                            <div className="title">
                              기본 및 실시설계
                              <div className="processRate">공정률 10%</div>
                            </div>
                            <div className="list">
                              <ul className="large">
                                <li>설계용역사 선정 및 설계완료</li>
                                <li>건설사업관리</li>
                                <li>요역 착수</li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <img src="/images/subpage/temp_space_architecture_2021.png" alt="2021년" />
                            <div className="title">
                              대지 및 골조공사
                              <div className="processRate">공정률 40%</div>
                            </div>
                            <div className="list">
                              <ul className="small">
                                <li>대지조성공사</li>
                                <li>가설공사</li>
                                <li>기초터파기</li>
                                <li>기초공사</li>
                                <li>골조공사</li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <img src="/images/subpage/temp_space_architecture_2022.png" alt="2022년" />
                            <div className="title">
                              골조 / 설비공사
                              <div className="processRate">공정률 75%</div>
                            </div>
                            <div className="list">
                              <ul className="small">
                                <li>골조공사</li>
                                <li>데크플레이트</li>
                                <li>창호공사</li>
                                <li>전기/통신공사</li>
                                <li>소방공사</li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <img src="/images/subpage/temp_space_architecture_2023.png" alt="2023년" />
                            <div className="title">
                              마감공사 및 준공
                              <div className="processRate">공정률 100%</div>
                            </div>
                            <div className="list">
                              <ul className="small">
                                <li>인테리어등 마감</li>
                                <li>등기구설치공사</li>
                                <li>수배전반 설치</li>
                                <li>시운전 등</li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <img src="/images/subpage/temp_space_architecture_2024.png" alt="2024년" />
                            <div className="title">
                              유지관리
                              <div className="processRate">-</div>
                            </div>
                            <div className="list">
                              <ul className="large">
                                <li>BF 등 각종인증</li>
                                <li>공간건축 공사 완료에 따른<br className="pc" /> 운영관리계획 수립 및<br className="pc" /> 시설 운영</li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <Typography variant="h6" component="div">사업추진체계</Typography>
                    <Box className="box_business_system">
                      <div className="business_push_plan"></div>
                    </Box>
                    <Box className="biz_list onlyDesc">
                      <dl>
                        <dt>설계분과위원회 및 기술자문위원회 구성 운영(5월 구성 완료)</dt>
                        <dd>운영방향 : 창업동, 실증동, 데이터센터와의 협업과 기술자문위원회 자문으로 설계 에러 최소화</dd>
                        <dd className="list">
                          <div>
                            <ul>
                              <li>설계분과위원회(13명) - 기술자문위원회 상정을 위한 각종 현안 사전논의 (헬스케어·자동차·에너지 실증 및 장비구축에 대한 전문성을 공간건축설계에 검토 반영)</li>
                              <li>기술자문위원회(16명) - 건설기술진흥법 제6조(지방건설기술심의위원회)의 기능 수행 (건설공사의 설계의 타당성, 시설물의 안전 및 공사시행의 적정성 자문 등)</li>
                            </ul>
                          </div>
                        </dd>
                        <dd>공법선정위원회 구성 운영 : AI 집적단지에 최적화된 공법 및 시스템, 자재를 설계에 반영하여 추진</dd>
                        <dd>분야별 공간건축 사업관리 TF팀 구성완료(광주도시공사) : (총21명) 기술인력 13명, 행정지원인력 8명</dd>
                      </dl>
                    </Box>
                    <Box className="air_view">
                      <img src="/images/subpage/air_view.png" alt='air view' />
                    </Box>
                  </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </Box>
    </div>
    </>
  );
}

export default OneByOneInquiry;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from 'react';
import create from "zustand";
import * as styles from './styles';
import { styled } from '@mui/material/styles';
import {
  Box,Typography,Button,Stack,Card,CardContent,
  CardMedia,CardActionArea,useTheme,useRadioGroup,RadioGroup,
  Radio,FormControlLabel,FormControlLabelProps,Chip,useMediaQuery
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
import SwiperCore, { Navigation, Autoplay, Pagination, EffectCube} from 'swiper';
import { HomeModal } from './HomeModal';
import Footer from '~/layout/Studio/Footer';
import { swiperParams } from '../Notice/NoticeModel';
import { swiperData, swiperData02, swiperParams02, swiperParams03 } from '~/models/Model';

/* 
  작성일    :   2022/06/14
  화면명    :   홈 - 사용자지원 홈
  회면ID    :   (UI-USP-FRN-0370101) 
  화면/개발 :   Seongeonjoo / navycui
*/
export const HomeMobile: React.FC<{
}> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [modalOpen, setModalOpen] = useState(true);
  const [ctx, setCtx] = useState<string>("");
  const [titx, setTitx] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollPos:any = useRef(null);

  return (
    <div css={styles.container} >
      {/* 모달 팝업부분 */}
      <HomeModal isOpen={modalOpen} modalClose={()=>{setModalOpen(false)}} ctx={ctx} titx={titx}/>
      <div className="mainfull" >
            <Box css={styles.maincont01} ref={scrollPos}>
              <div className="main_benner">
                {isMobile ? (
                  <img src="/images/main/main_banner01_mo.png" />
                ) : (
                  <img src="/images/main/main_banner01.png" />
                )}
              </div>
              <div className="main_txtbox">
                <div className="main_tit">
                  인공지능 <br />
                  혁신거점 <br />
                  <strong>
                    AI 인공지능 <br />
                    직접단지
                  </strong>
                </div>
                <p>
                  인공지능 강국 대한민국을 열어갈 수 있도록 <br />
                  최고 수준의 인공지능산업융합 <br className="mo" />
                  생태계를 조성하겠습니다.
                </p>
                {/* <Button type="button" className='swifebtn'>SWIPE<br/> PLAY</Button> */}
              </div>
            </Box>
            <Box css={styles.maincont02}>
              <div className="content">
                <Stack
                  spacing={6}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h2" component="div">
                    인기공고
                    <div className="title_icon"></div>
                  </Typography>
                  <Button size="large" className="md_btn">
                    더보기
                  </Button>
                </Stack>
                {/* 슬라이드 */}
                <Box css={styles.slide_cont}>
                  <Swiper {...swiperParams}>
                    {swiperData.map((item,i) => (
                      <SwiperSlide key={i}>
                        <Card css={styles.hotslide}>
                          <CardActionArea>
                            <Stack direction="row" className="tag" spacing={1}>
                              <Chip label="사업화" className="blue" />
                              <Chip
                                label="마감 D-30"
                                variant="outlined"
                                className="wh"
                              />
                            </Stack>
                            <CardMedia
                              component="img"
                              image={item.img}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                2021년도 글로벌 AI제품&middot;서비스
                                <br />
                                고도화 지원기업 모집공고
                              </Typography>
                              <p className="sub_txt">접수기간</p>
                              <p className="sub_txt sub2">
                                2021-11-21~2021-12-11 18:00(모집중)
                              </p>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </div>
            </Box>
            <Box css={styles.maincont03}>
              <div className="content">
                <Box>
                  <Stack css={styles.stack}>
                    <div>
                      <Typography variant="h2" component="div" gutterBottom>
                        나에게 맞는
                        <br />
                        <span className="blue">사업찾기</span>
                      </Typography>
                      <img
                        src="/images/main/character01.png"
                        className="char01"
                      />
                    </div>
                    <div css={styles.radioBox}>
                      <p className="txt">
                        나의 창업단계와 관심사업을 선택하여
                        <br /> 나에게 맞는 사업공고를 빠르게 찾아볼 수 있습니다.
                      </p>
                      <dl className="arrow">
                        <dt>
                          <span>STEP 1</span>
                          <strong>창업단계</strong>
                        </dt>
                        <dd>
                          <RadioGroup
                            name="use-radio-group"
                            defaultValue="first"
                          >
                            <MyFormControlLabel
                              value="예비"
                              label={
                                <div>
                                  예비<span>(사업자 등록 전)</span>
                                </div>
                              }
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="초기"
                              label={
                                <div>
                                  초기<span>(창업 3년 미만)</span>
                                </div>
                              }
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="도약"
                              label={
                                <div>
                                  도약<span>(창업 3~7 미만)</span>
                                </div>
                              }
                              control={<Radio />}
                            />
                          </RadioGroup>
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          <span>STEP 2</span>
                          <strong>관심사업</strong>
                        </dt>
                        <dd className="center">
                          <RadioGroup
                            name="use-radio-group"
                            defaultValue="first"
                          >
                            <MyFormControlLabel
                              value="예비"
                              label="사업화"
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="초기"
                              label="창업교육"
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="도약"
                              label="시설/공간/보육"
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="멘토링"
                              label="멘토링"
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="행사/네트워크"
                              label="행사/네트워크"
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              value="R.D"
                              label="R.D"
                              control={<Radio />}
                            />
                          </RadioGroup>
                        </dd>
                      </dl>
                      <Stack spacing={2} direction="row" css={styles.btnGroup}>
                        <Button variant="contained" fullWidth type="button">
                          사업찾기
                        </Button>
                      </Stack>
                    </div>
                  </Stack>
                </Box>
                {/* 사업찾기 클릭시 보이는 테이블 주석처리*/}
                <div>   
                  <hr/>
                  <Typography variant="h5" component="div">
                    검색된 사업
                    <span className='data'><em>12</em> 건</span>
                  </Typography>
                  <Box css={styles.slide_cont02}>
                    <Swiper {...swiperParams02}>
                        {swiperData.map((item,i) => (
                          <SwiperSlide key={i}>
                            <Card css={styles.hotslide}>
                              <CardActionArea>
                              <Stack direction="row" className='tag' spacing={1} >
                                <Chip label="사업화" className='blue'/>
                                <Chip label="마감 D-30" variant="outlined" className='wh' />
                              </Stack>
                                <CardMedia
                                  component="img"
                                  height='200'
                                  image={item.img}
                                  alt="green iguana"
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h6" component="div" className="black">
                                    2021년도 글로벌 AI제품&middot;서비스<br/>
                                    고도화 지원기업 모집공고
                                  </Typography>
                                  <p className="sub_txt">
                                    접수기간
                                  </p>
                                  <p className="sub_txt">
                                    2021-11-21~2021-12-11 18:00(모집중)
                                  </p>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </Box>
                </div> 
                <Box className="off">
                  <hr/>
                  <Typography variant="h5" component="div">
                    검색된 사업
                    <span className='data'><em>12</em> 건</span>
                  </Typography>
                  <Box css={styles.slide_cont02}>
                    <Swiper {...swiperParams02}>
                        {swiperData.map((item,i) => (
                          <SwiperSlide key={i}>
                            <Card css={styles.hotslide}>
                              <CardActionArea>
                              <Stack direction="row" className='tag' spacing={1} >
                                <Chip label="사업화" className='blue'/>
                                <Chip label="마감 D-30" variant="outlined" className='wh' />
                              </Stack>
                                <CardMedia
                                  component="img"
                                  height='200'
                                  image={item.img}
                                  alt="green iguana"
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h6" component="div" className="black">
                                    2021년도 글로벌 AI제품&middot;서비스<br/>
                                    고도화 지원기업 모집공고
                                  </Typography>
                                  <p className="sub_txt">
                                    접수기간
                                  </p>
                                  <p className="sub_txt">
                                    2021-11-21~2021-12-11 18:00(모집중)
                                  </p>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </Box>
                </Box>
              </div>
            </Box>
            <Box css={styles.maincont04}>
              <div>
                <div className="content">
                  <Typography variant="h2" component="div" gutterBottom>
                    다양한 <br className="pc" />
                    서비스
                    <div className="title_icon"></div>
                  </Typography>
                  <div className="sub_txt01">
                    지원사업과 더불어 AI 교육, 입주/시설 제공, 실증지원 등{' '}
                    <br className="pc"/>
                    다양한 서비스를 제공하고 있습니다.
                  </div>
                  <p className="count">
                    <b>01</b>/05
                  </p>
                  <Typography variant="h4" component="div" gutterBottom>
                    <div>AI 교육</div> <hr />
                  </Typography>
                  <div className="sub_txt02">
                    AI 실무인력 양성 및 우수 인재 양성을 위해 <br />
                    AI교육 및 AI 직무전환 교육을 운영하고 있습니다.
                    <span className="em">
                      * 입주는 사업공고를 통해 지원받을 수 있습니다.
                    </span>
                  </div>
                </div>
              </div>
              <div css={styles.back_slide}>
                <Swiper
                  pagination={{ clickable: true }}
                  navigation
                  effect="cube"
                  cubeEffect={{ shadow: false }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  centeredSlides
                >
                  {swiperData02.map((item,i) => (
                    <SwiperSlide key={i}>
                      <img src={item.img} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Box>
            <Box css={styles.maincont05}>
              <div className="content">
                <Stack
                  direction="row"
                  flexWrap={'wrap'}
                  justifyContent="space-between"
                >
                  <Typography variant="h2" component="div" gutterBottom>
                    최신 소식
                    <span>
                      을 <br />
                      전해 드립니다
                    </span>
                    <div className="title_icon"></div>
                  </Typography>
                  <div className="right_cont">
                    <p className="sub_txt01">
                      빠르게 전해드리는 AICA의 최신 소식을 <br />
                      지금 바로 확인해 보세요.
                    </p>
                    <Stack spacing={2} direction="row" className="btn">
                      <Button size="large">사업찾기</Button>
                      <Button size="large">공지사항</Button>
                    </Stack>
                  </div>
                </Stack>
                <Stack
                  direction="row"
                  flexWrap={'wrap'}
                  justifyContent="space-between"
                >
                  <div className="txt_box">
                    <Typography variant="h4" component="div" gutterBottom>
                      AI 투자유치 설명회
                    </Typography>
                    <div className="sub_txt02">
                      중소벤처기업부(장관 권칠승, 이하 중기부)는 10월 13일(수)
                      양재동 소재의 엘타워에서 우수한 기술력을 보유한
                      기술지주회사 소속 자회사를 대상으로 투자유치 설명회(IR)를
                      개최했다고 밝혔다.
                    </div>
                    <p className="em">2022. 03. 08 14:51</p>
                  </div>
                  <div css={styles.main05_slide}>
                    <Box css={styles.slide_cont02}>
                      <Swiper {...swiperParams03}>
                          {swiperData.map((item,i) => (
                            <SwiperSlide key={i}>
                              <Card css={styles.hotslide}>
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    height='200'
                                    image={item.img}
                                    alt="green iguana"
                                  />
                                </CardActionArea>
                              </Card>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </Box>
                  </div>
                </Stack>
              </div>
            </Box>
            <Footer />
      </div>
    </div>
  );  
}
interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}
export type cotype ={
  bgcolorType:string;
}
export const useConfigStore = create<cotype>( () => ({bgcolorType:""}))
// Swiper
SwiperCore.use([EffectCube, Navigation, Autoplay, Pagination]);

const StyledFormControlLabel01 = styled(
  (props: StyledFormControlLabelProps) => <FormControlLabel {...props} />
  )(({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  }));
  
  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();
    let checked = false;
    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }
    return <StyledFormControlLabel01 checked={checked} {...props} />;
  }
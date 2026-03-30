import useSWR from 'swr';
import {NavLink, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Box, Button, IconButton, Stack} from '@mui/material';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Navigation, Autoplay} from "swiper";
import {RouteType} from '../../utils/RouteUtiles';
import {HorizontalInterval, VerticalInterval} from '../../components/LayoutComponents';
import {CustomIconButton} from '../../components/ButtonComponents';
import {Icons} from '../../components/IconContainer';
import {useGlobalConfigStore} from '../../store/GlobalConfigStore';
import {Body3, Body4} from '../../components/TextComponents';
import {Color} from "../../components/StyleUtils";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useRouteStore} from "../../store/RouteConfigStore";
import {useResize} from "../../components/useResize";
import {isTspPortal} from "../../utils/validUtil";

// SwiperCore.use([Navigation])

function Footer() {
  const location = useLocation();
  // const {data: routes = []} = useSWR('route://service');
  const {routes} = useRouteStore()
  const {isDesktop} = useGlobalConfigStore()
  // const size = useResize()
  const rootPath = isTspPortal? '/tsp' : ''
  const isMobile = !isDesktop || window.innerWidth < 1280

  return <footer
    style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    }}>
    <Stack sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    }}>
      <RelationPageLink isDeskTop={!isMobile}/>
      <Stack
        flexDirection={'row'} justifyContent={'flex-start'}
        sx={{maxWidth: '1260px', width: '100%'}}>
        {
          !isMobile && <Stack padding={'60px 0 80px'} justifyContent={'space-between'} flex={!isMobile ? '0 0 70%' : ''}>
            <Stack flexDirection={'row'}>
              {
                !isMobile && routes.map((row: RouteType, i: number) => {
                  return (
                    <Box key={i} sx={{width: '160px', marginRight: '20px', alignItems: 'left'}}>
                      {/*<Button sx={{fontWeight: 'bold', color: '#222222', fontSize: '15px', paddingLeft: 0, marginBottom:"20px"}}>*/}
                      {/*  {row.label}*/}
                      {/*</Button>*/}
                      <Body3 bold>{row.label}</Body3>
                      <VerticalInterval size={'20px'}/>
                      <Stack sx={{display: 'flex', gap: '10px'}}>
                        {(row.children || []).map((child: RouteType, j: number) => {
                          return (
                            <Box key={j}>
                              <NavLink to={`${child.path}`} replace>
                                <Body4 color={Color.warm_gray}>{child.label}</Body4>
                              </NavLink>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  );
                })}
            </Stack>
            <SimpleMenu isDesktop={!isMobile}/>
          </Stack>
        }
        {
          !isMobile && <Box style={{borderRight: '1px solid rgb(204,204,204,0.5)', height: '100%'}}/>
        }
        <Box padding={!isMobile ? '60px 0 80px 80px' : '40px 0 50px 15px'} flex={!isMobile ? '0 0 30%' : ''}>
          <img src={`${rootPath}/images/img/logo_footer.png`}/>
          {
            !isMobile || <SimpleMenu isDesktop={!isMobile}/>
          }
          <VerticalInterval size={'21px'}/>
          <Body4 color={Color.warm_gray} style={{letterSpacing: -0.56}}>
            광주광역시 북구 첨단과기로 176번길 11 3층
          </Body4>
          {!isMobile ? <VerticalInterval size={'10px'}/> : ''}
          <Stack direction={"row"} gap={'12px'}>
            <Body4 color={Color.warm_gray} style={{letterSpacing: -0.56}}>TEL. 062-610-3910</Body4>
            <Body4 color={Color.warm_gray} style={{letterSpacing: -0.56}}>FAX. 062-974-1943</Body4>
          </Stack>
          <VerticalInterval size={'20px'}/>
          <Body4 color={Color.warm_gray}>©2021 인공지능산업융합사업단. ALL RIGHTS RESERVED</Body4>
          <VerticalInterval size={isMobile ? '20px' : '55px'}/>
          <Stack flexDirection={'row'} gap={'8px'}>
            <CustomIconButton icon={Icons.Facebook} style={{padding: 0}}/>
            <CustomIconButton icon={Icons.Twitter} style={{padding: 0}}/>
            <CustomIconButton icon={Icons.Instagram} style={{padding: 0}}/>
          </Stack>
        </Box>
      </Stack>
    </Stack>

    {/*<img src={'/images/common/othergroup_01.png'}/>*/}
  </footer>;
}

const SimpleMenu = (props: { isDesktop: boolean }) => {
  return <Stack direction={props.isDesktop ? 'row' : 'column'} spacing={props.isDesktop ? '30px' : ''}
                mt={props.isDesktop ? '60px' : '30px'} style={{flexWrap: 'wrap'}}>
    <Stack direction={"row"} alignItems={"center"}>
      <Body4 nowrap bold>{'개인정보처리방침'}</Body4>
      <Box style={{
        borderRight: props.isDesktop ? '0px' : `1px solid #cccccc`,
        margin: props.isDesktop ? '0px' : '1px 16px 1px 16px',
        marginRight: props.isDesktop ? '30px' : '16px',
        height: props.isDesktop ? '0px' : '12px'
      }}></Box>
      <Body4 nowrap color={Color.warm_gray}>{'이용약관'}</Body4>
      <Box style={{
        borderRight: props.isDesktop ? '0px' : `1px solid #cccccc`,
        margin: props.isDesktop ? '0px' : '1px 16px 1px 16px',
        marginRight: props.isDesktop ? '30px' : '16px',
        height: props.isDesktop ? '0px' : '12px'
      }}></Box>
      <Body4 nowrap color={Color.warm_gray}>{'FAQ'}</Body4>
    </Stack>
    <Stack direction={"row"} alignItems={"center"}>
      <Body4 nowrap color={Color.warm_gray}>{'사용자 메뉴얼'}</Body4>
      <Box style={{
        borderRight: props.isDesktop ? '0px' : `1px solid #cccccc`,
        margin: props.isDesktop ? '0px' : '1px 16px 1px 16px',
        marginRight: props.isDesktop ? '30px' : '16px',
        height: props.isDesktop ? '0px' : '12px'
      }}></Box>
      <Body4 nowrap color={Color.warm_gray}>{'자료실'}</Body4>
    </Stack>
  </Stack>
}

const RelationPageLink = (props: { isDeskTop: boolean }) => {
  const rootPath = isTspPortal? '/tsp' : ''
  return <Box sx={{
    borderBottom: '1px solid rgb(204,204,204,0.5)',
    borderTop: '1px solid rgb(204,204,204,0.5)',
    height: '80px',
    width: '100%'
  }}>
    <SwiperContent
      loopFillGroupWithBlank={true}
      loop navigation
      spaceBetween={props.isDeskTop ? 60 : 24}
      slidesPerView={'auto'}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      modules={[Navigation, Autoplay]}
      style={{height: '100%'}}
    >
      <SwiperSlide>
        <SwiperSlideItem href="https://www.nipa.kr" target="_blank" src={`${rootPath}/images/common/othergroup_01.png`}/>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem href="http://www.kopti.re.kr" target="_blank" src={`${rootPath}/images/common/othergroup_02.png`}/>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem href="http://www.gjtp.or.kr" target="_blank" src={`${rootPath}/images/common/othergroup_03.png`}/>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem href="https://www.gigca.or.kr" target="_blank" src={`${rootPath}/images/common/othergroup_04.png`}/>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem href="https://www.gmcc.or.kr" target="_blank" src={`${rootPath}images/common/othergroup_05.png`}/>
      </SwiperSlide>
    </SwiperContent>
  </Box>
}

const SwiperSlideItem = styled('a')<{ src: string }>`
  display: block;
  background-image: url(${props => props.src});
  width: 156px;
  height: 32px;
`

const SwiperContent = styled(Swiper)`
  max-width: 1260px;
  margin: 0 auto;
  padding: 12px 50px;

  .swiper-slide {
    display: flex;
    width: 180px;
    align-items: center;
  }

  .swiper-button-prev {
    left: 0;
    background-color: #fff;
  }

  .swiper-button-prev:after {
    color: #999;
    font-size: 15px;
    padding-top: 0;
    font-weight: bold
  }

  .swiper-button-next {
    right: 0;
    background-color: #fff;
  }

  .swiper-button-next:after {
    color: #999;
    font-size: 15px;
    padding-top: 0;
    font-weight: bold
  }

  @media (min-width: 320px) and (max-width: 1280px) {
    .swiper-button-prev {
      left: auto;
      right: 50px;
      background-color: transparent;
    }

    .swiper-button-next {
      right: 10px;
      background-color: transparent;
    }

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 160px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 55%);
      z-index: 1;
    }

  }
`

export default Footer;

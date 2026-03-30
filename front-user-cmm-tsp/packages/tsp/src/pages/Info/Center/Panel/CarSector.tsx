import React from "react";
import {Box, Stack} from "@mui/material";
import styled from "@emotion/styled";
import 'styles/style.css';
import {IMG, FiledList, OvalList} from "./BusinessIntro"
import {Body1, Body3, H2, H3} from "shared/components/TextComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Color} from "shared/components/StyleUtils";

export const CarSectorPanel = () => {

  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;

  return (
    <Stack sx={{marginBottom: "100px"}}>
      <Stack style={{marginTop: isMobile ? "40px" : "60px", marginBottom: isMobile ? "20px" : "40px"}}>
        <H2 style={{fontWeight: "bold", marginBottom: isMobile ? '12px' : '40px'}}>자동차분야</H2>
        <FiledList text={"자율주행 및 차량 무선통신 등 실증지원"} ismobile={isMobile ? true : false}></FiledList>
        <FiledList text={"가상 대형 드라이빙 시뮬레이터 등을 활용한 데이터 수집/분석/제공"} ismobile={isMobile ? true : false}></FiledList>
      </Stack>
      <Stack>
        <IMG style={{backgroundImage: "url(/tsp/images/img/Int_Car.png)"}}>
          <Stack alignItems={'center'} justifyContent={'center'} sx={{width: '100%', height: '200px'}}>
            <H3 style={{color: "white", marginBottom: "10px"}}>자동차실증장비</H3>
            <Body3 style={{color: "white"}}>데이터 수집·분석 AI 제품 실증 지원</Body3>
          </Stack>
        </IMG>
      </Stack>
      <Stack className={"Mygrid"} justifyContent={"space-between"}>
        <OvalList title={'AI 기반 차량 시뮬레이션'}
                  listText={[
                    {
                      mainList: '대형 드라이빙 시뮬레이터',
                      subList: ['소형 드라이빙 시뮬레이터와 연계하여 차량 간 가상 주행 시뮬레이션 데이터 형성']
                    },
                    {
                      mainList: '차량용 통신 + 커넥티드카',
                      subList: ['인지 센서류 : LIDAR, RADAR 카메라, 초음파 등','부품단위 제어장치 : 조형, 브레이크, 모터, 엑츄에이터 등']
                    }]}
                  isDesktop={isMobile ? false : true}>
        </OvalList>
        <OvalList title={'차량용 통신 + 커넥티드카'}
                  listText={[
                    {
                      mainList: '차량용 통신보안',
                      subList: ['통신기술 : CAN, WAVE, 이더넷, 5G 등', '보안기술 : 암호화, 익명화 솔루션 등']
                    }]}
                  isDesktop={isMobile ? false : true} backgroundcolor={'linear-gradient(51deg, rgba(52,134,225,1) 0%, rgba(78,95,241,1) 100%)'}>
        </OvalList>
        <OvalList title={'차량 데이터 수집'}
                  listText={[
                    {mainList: '자율주행용 고화질 지도 제작'},
                    {
                      mainList: '주행 알고리즘 데이터 생성',
                      subList: ['고정시설물(차로,횡단보도 등), 변동사물(보행자, 차량 등), 환경(온도, 강우, 안개 등), 돌발상황(사고차량, 어린이 등) 데이터 생성']
                    }]}
                  isDesktop={isMobile ? false : true} backgroundcolor={'linear-gradient(51deg, rgba(80,95,242,1) 0%, rgba(109,88,255,1) 100%)'}>
        </OvalList>
        <OvalList title={'평가 및 인증자원 체계 구축'}
                  listText={[
                    {mainList: 'AI 부품 / 알고리즘 / 시나리오 개발'},
                    {
                      mainList: '인지 평가 성능 검증 등',
                      subList: ['제품인증지원 및 검증']
                    }]}
                  isDesktop={isMobile ? false : true} backgroundcolor={'linear-gradient(51deg, rgba(87,93,246,1) 0%, rgba(109,88,254,1) 100%)'}>
        </OvalList>
      </Stack>
    </Stack>
  )
}

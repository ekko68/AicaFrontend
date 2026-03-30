import React from "react";
import {Box, Stack} from "@mui/material";
import styled from "@emotion/styled";
import 'styles/style.css';
import {IMG, FiledList, OvalList} from "./BusinessIntro"
import {Body1, Body3, H2, H3} from "shared/components/TextComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Color} from "shared/components/StyleUtils";

export const EnergySectorPanel = () => {

  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;

  return (
    <Stack sx={{marginBottom: "100px"}}>
      <Stack style={{marginTop: isMobile ? "40px" : "60px", marginBottom: isMobile ? "20px" : "40px"}}>
        <H2 style={{fontWeight: "bold", marginBottom: isMobile ? '12px' : '40px'}}>에너지분야</H2>
        <FiledList text={"전력 소비량 예측 및 전력소비 최소화 제품 및 서비스 등 실증지원"} ismobile={isMobile ? true : false}></FiledList>
        <FiledList text={"에너지 소비 및 태양광발전, ESS 등의 데이터 수집/분석/제공"} ismobile={isMobile ? true : false}></FiledList>
      </Stack>
      <Stack>
        <IMG style={{backgroundImage: "url(/tsp/images/img/Int_Energy.png)"}}>
          <Stack alignItems={'center'} justifyContent={'center'} sx={{width: '100%', height: '200px'}}>
            <H3 style={{color: "white", marginBottom: "10px"}}>에너지실증장비</H3>
            <Body3 style={{color: "white"}}>데이터 수집·분석AI 제품 실증 지원</Body3>
          </Stack>
        </IMG>
      </Stack>
      <Stack className={"Mygrid"} justifyContent={"space-between"}>
        <OvalList title={'에너지 고장진단'}
                  listText={[
                    {mainList:'에너지 데이터 수집에 따른 설비 고장 진단 실증 장비 구축 및 지원'},
                    {mainList:'이차전지, 전력변화장치 및 전력반도체, 분산전력시스템 고장진단 등'}]}
                  isDesktop={isMobile? false : true}>
        </OvalList>
        <OvalList title={'에너지 탐지 및 분석'}
                  listText={[
                    {mainList:'에너지 발전 / 수요에 따라 발생하는 변화량 탐지 및 분석'},
                    {mainList:'ESS 및 신재생 에너지 분석, 태양광 발전 데이터 수집 및 분석'},
                    {mainList:'EV 충방전 실증 등'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(52,134,225,1) 0%, rgba(78,95,241,1) 100%)'}>
        </OvalList>
        <OvalList title={'에너지 거래분석'}
                  listText={[
                    {mainList:'수집된 데이터 분석을 통한 거래 활용성 확보'},
                    {mainList:'에너지 커뮤니티 실증'},
                    {mainList:'전력 계통에 대한 시뮬레이션 등'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(80,95,242,1) 0%, rgba(109,88,255,1) 100%)'}>
        </OvalList>
        <OvalList title={'AI빅데이터 활용 상용화 실증플랫폼'} fontSize={'19px'}
                  listText={[
                    {mainList:'데이터 수집 및 분석을 통한 사업화 제품 테스트 및 실증자원 활성화'},
                    {mainList:'실증 데이터 공유를 통한 연구 확대'},
                    {mainList:'데이터 공유 연계 기술 확보'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(87,93,246,1) 0%, rgba(109,88,254,1) 100%)'}>
        </OvalList>
      </Stack>
    </Stack>

  )
}

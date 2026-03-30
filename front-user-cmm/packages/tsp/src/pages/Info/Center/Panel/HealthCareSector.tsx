import React from "react";
import {Box, Stack} from "@mui/material";
import styled from "@emotion/styled";
import 'styles/style.css';
import {IMG, FiledList, OvalList} from "./BusinessIntro"
import {Body1, Body3, H2, H3} from "shared/components/TextComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Color} from "shared/components/StyleUtils";

export const HealthCareSectorPanel = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;

  return (
    <Stack sx={{marginBottom: "100px"}}>
      <Stack style={{marginTop: isMobile ? "40px" : "60px", marginBottom: isMobile ? "20px" : "40px"}}>
        <H2 style={{fontWeight: "bold", marginBottom: isMobile ? '12px' : '40px'}}>헬스케어분야</H2>
        <FiledList text={"헬스케어 제품 및 서비스 실증지원"} ismobile={isMobile ? true : false}></FiledList>
        <FiledList text={"생체신호 및 병원 연계를 통한 데이터 수집/분석/제공"} ismobile={isMobile ? true : false}></FiledList>
      </Stack>
      <Stack>
        <IMG style={{backgroundImage: "url(/tsp/images/img/Int_HealthCare.png)"}}>
          <Stack alignItems={'center'} justifyContent={'center'} sx={{width: '100%', height: '200px'}}>
            <H3 style={{color: "white", marginBottom: "10px"}}>헬스케어실증장비</H3>
            <Body3 style={{color: "white"}}>데이터 수집·분석AI 제품 실증 지원</Body3>
          </Stack>
        </IMG>
      </Stack>
      <Stack className={"Mygrid"} justifyContent={"space-between"}>
        <OvalList title={'AI 보건소'}
                  listText={[
                    {mainList:'AI 영상진단보조기기'},
                    {mainList:'폐X-ray Data 분석'},
                    {mainList:'영상기반 AI의료기기 개발 제품 및 서비스'}]}
                  isDesktop={isMobile? false : true}>
        </OvalList>
        <OvalList title={'병 · 의원'}
                  listText={[
                    {mainList:'AI의료지원플랫폼 구축 및 운영'},
                    {mainList:'병원 간 온라인 협진'},
                    {mainList:'진단 및 치료 기기 등 실증'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(52,134,225,1) 0%, rgba(78,95,241,1) 100%)'}>
        </OvalList>
        <OvalList title={'AI 시민체감'}
                  listText={[
                    {mainList:'전신반응 분석시스템 등'},
                    {mainList:'보행패턴, 신체정보 분석, 근기능 Data 분석'},
                    {mainList:'시민의료앱 서비스'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(80,95,242,1) 0%, rgba(109,88,255,1) 100%)'}>
        </OvalList>
        <OvalList title={'공통'}
                  listText={[
                    {mainList:'데이터 수집 · 분석 · 제공'},
                    {mainList:'AI S/W 검증 시스템'},
                    {mainList:'헬스케어 창업 / 전환기업 / 서비스'},
                    {mainList:'연구개발(R&D) 연계 데이터 수집 / 활용'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(87,93,246,1) 0%, rgba(109,88,254,1) 100%)'}>
        </OvalList>
      </Stack>
    </Stack>
  )
}

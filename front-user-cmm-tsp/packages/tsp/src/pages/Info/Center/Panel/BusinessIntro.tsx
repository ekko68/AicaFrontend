import React, {CSSProperties, Fragment} from "react";
import {Box, Stack} from "@mui/material";
import styled from "@emotion/styled";
import 'styles/style.css';
import {Body1, Body2, Body3, H2, H3} from "shared/components/TextComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Color} from "shared/components/StyleUtils";
import {size} from "polished";


export const BusinessIntroPanel = () => {

  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;

  return (
    <Stack sx={{marginBottom:"100px"}}>
      <H2 style={{fontWeight:"bold", marginTop:isMobile ? "40px" : "60px"}}>사업개요</H2>
      <Box sx={{color: "royalblue", marginTop:isMobile ? "24px" : "40px", marginBottom: "4px"}}>01</Box>
      <Stack direction={isMobile ? 'column' : 'row'} sx={{marginBottom: "40px", gap:isMobile ? '20px' : ''}}>
        <Box sx={{width:"160px", fontSize:"16px", fontWeight:"bold"}}>추진목표</Box>
        <Body3>3개분야(자동차,에너지,헬스케어) 실증장비 구축 및 운영으로 사업화 촉진</Body3>
      </Stack>
      <Box sx={{color: "royalblue", marginBottom: "4px"}}>02</Box>
      <Stack direction={isMobile ? 'column' : 'row'} sx={{marginBottom: "40px", gap:isMobile ? '20px' : ''}}>
        <Box sx={{width:"160px", fontSize:"16px", fontWeight:"bold"}}>사업기간 및 사업비</Box>
        <Body3>사업비 2020~2024(5년), 총 442억 * 민자 및 포털 비용 제외</Body3>
      </Stack>
      <Box sx={{color: "royalblue", marginBottom: "4px"}}>03</Box>
      <Stack direction={isMobile ? 'column' : 'row'} sx={{marginBottom: "40px", gap:isMobile ? '20px' : ''}}>
        <Box sx={{width:"160px", fontSize:"16px", fontWeight:"bold"}}>사업기간 및 사업비</Box>
        <Body3 weight={500}>총사업비
            <Body3 listItem style={{color:'#707070', marginTop:'10px', marginBottom:isMobile ? '8px' : '6px'}}>
              <span style={{color:'#222222', fontSize:isMobile ? '14px' : '16px', letterSpacing:isMobile ? '-0.56px' : '-0.64px', marginLeft:'8px'}}>AI 창업 경진대회</span></Body3>
            <Body3 listItem style={{color:'#707070', marginTop:'10px', marginBottom:isMobile ? '8px' : '6px'}}>
              <span style={{color:'#222222', fontSize:isMobile ? '14px' : '16px', letterSpacing:isMobile ? '-0.56px' : '-0.64px', marginLeft:'8px'}}>창업 교육 프로그램 운영</span></Body3>
            <Body3 listItem style={{color:'#707070', marginTop:'10px', marginBottom:isMobile ? '8px' : '6px'}}>
              <span style={{color:'#222222', fontSize:isMobile ? '14px' : '16px', letterSpacing:isMobile ? '-0.56px' : '-0.64px', marginLeft:'8px'}}>창업 교육 프로그램 운영</span></Body3>
        </Body3>
      </Stack>
      <Box sx={{color: "royalblue", marginBottom: "4px"}}>04</Box>
      <Stack direction={isMobile ? 'column' : 'row'} sx={{marginBottom:"20px"}}>
        <Box sx={{width:"160px", fontSize:"16px", fontWeight:"bold"}}>분야별 장비 구축(안)</Box>
      </Stack>
      <Stack style={{marginBottom:isMobile ? "-10px" : ""}}>
        <IMG style={{backgroundImage:"url(/tsp/images/img/Int_Business.png)"}}>
          <Stack alignItems={'center'} justifyContent={'center'} sx={{width:'100%', height:'200px'}}>
            <H3 style={{color: "white", marginBottom: "10px"}}>AI 실증장비(77종)</H3>
            <Body3 style={{color: "white"}}>데이터 수집·분석AI 제품 실증 지원</Body3>
          </Stack>
        </IMG>
      </Stack>
      <Stack className={"Mygrid"} justifyContent={"space-between"}>
        <OvalList title={'자동차 실증(25종)'}
                  listText={[
                    {mainList:'대형 드라이빙 시뮬레이터'},{mainList:'차량용 통신 + 커넥티드카'},{mainList:'차량 데이터 수집 등'}]}
                  isDesktop={isMobile? false : true}>
        </OvalList>
        <OvalList title={'에너지 실증(26종)'}
                  listText={[
                    {mainList:'AI 에너지 고장진단 장비'},{mainList:'에너지 탐지 및 분석 장비'},{mainList:'데이터 거래분석 장비 등'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(52,134,225,1) 0%, rgba(78,95,241,1) 100%)'}>
        </OvalList>
        <OvalList title={'헬스케어 실증(26종)'}
                  listText={[
                    {mainList:'기초 신체데이터 수집장비'},{mainList:'의료지원시스템'},{mainList:'병원 연계 데이터 수집 시스템 등'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(80,95,242,1) 0%, rgba(109,88,255,1) 100%)'}>
        </OvalList>
        <OvalList title={'실증 서비스'}
                  listText={[
                    {mainList:'AI 제품 및 서비스 실증'},{mainList:'장비활용(안정성 및 성능평가)지원'},{mainList:'실증데이터 수집 · 분석 · 제공'}]}
                  isDesktop={isMobile? false : true} backgroundcolor={'linear-gradient(51deg, rgba(87,93,246,1) 0%, rgba(109,88,254,1) 100%)'}>
        </OvalList>
      </Stack>
    </Stack>
  )
}


export const IMG = styled('div')`
  margin-bottom: 30px;
  width: 100%;
  height: 200px;
  background-size: cover;
  position: relative;
  border-radius: 15px;
`

export const OvalList: React.FC<{
  title: string
  listText: {mainList: string, subList?: string[]}[]
  backgroundcolor?: string
  isDesktop:boolean
  fontSize?: string

}> = (props) => {
  return (
      <Stack>
        <Stack style={{
          marginBottom:props.isDesktop ? '30px' : '12px',
          background:props.backgroundcolor ? props.backgroundcolor : 'linear-gradient(51deg, rgba(28,205,204,1) 0%, rgba(50,138,224,1) 100%)',
          height: '63px',
          borderRadius: '30px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          width:props.isDesktop? '278px' : '100%'
        }}><Body3 style={{color:'white', fontSize: props.isDesktop? props.fontSize ? props.fontSize : '20px' : '16px'}}>{props.title}</Body3>
        </Stack>
        {
          props.listText.map((m, i:number) => {
          return <Fragment>
             <Body3 listItem
                 style={{width: props.isDesktop ? '278px' : '100%'}}>
              <Body3 style={{marginLeft:'5px', fontSize: props.isDesktop ? '18px' : '14px', lineHeight:'30px'}}>{m.mainList}</Body3>
             </Body3>
            {
              m.subList && m.subList.map((n, i) =>{
                return <Stack direction={'row'}>
                        <Stack style={{marginLeft:'15px', color:'#707070', marginTop: '3px'}}>-</Stack>
                        <Stack><Body3 style={{color:'#707070', lineHeight:'28px', marginLeft:'6px'}}>{n}</Body3></Stack>
                       </Stack>
              })
            }
          </Fragment>
        })}
      </Stack>
  )
}

export const FiledList: React.FC<{
  text: string
  ismobile: boolean
}> = (props) => {

  return (
    <Body3 listItem style={{color:'#707070',  marginBottom:props.ismobile ? '8px' : '6px'}}>
      <Body3 style={{
        color:'#222222',
        marginLeft:'6px',
      }}>
        {props.text}
      </Body3>
    </Body3>
  )
}


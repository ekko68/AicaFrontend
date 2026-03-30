import React, {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Stack, TableContainer} from "@mui/material";
import {
  HorizontalInterval,
  VerticalInterval,
} from "shared/components/LayoutComponents";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {BannerContents} from "shared/components/BannerContents";
import styled from "@emotion/styled";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Body2, Body3} from "shared/components/TextComponents";
import {Icons} from "shared/components/IconContainer";
import {Color} from "shared/components/StyleUtils";

const ApplyNotice = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;

  return <BannerContents
    title={"사용절차안내"}
    subTitle={"실증장비 및 실증자원 사용 절차를 확인해 보세요."}>

    <Stack width={"100%"} spacing={"40px"} sx={{marginBottom: '80px'}}>
      <VerticalInterval size={"11px"}/>
      <div style={{overflow: 'auto', minWidth: '350px'}}>
        <ImageBox>장비사용 견적요청</ImageBox>
        <Box sx={{
          display: isMobile ? 'flex' : '',
          justifyContent: isMobile ? 'center' : 'left',
          borderBottom: '1px solid #d7dae6',
          paddingBottom: '30px',
          width: '100%'
        }}>
          <img src={isMobile ? '/tsp/images/img/apply_estimation_mobile.png' : '/tsp/images/img/apply_estimation.png'}
               alt={''}/>
        </Box>

        <VerticalInterval size={'30px'}/>
        <ImageBox>장비사용</ImageBox>
        <Box sx={{
          display: isMobile ? 'flex' : '',
          justifyContent: isMobile ? 'center' : 'left',
          borderBottom: '1px solid #d7dae6',
          paddingBottom: '30px',
          width: '100%'
        }}>
          <img src={isMobile ? '/tsp/images/img/use_equipment_mobile.png' : '/tsp/images/img/use_equipment.png'} alt={''}/>
        </Box>

        <VerticalInterval size={'30px'}/>
        <ImageBox>실증자원 신청</ImageBox>
        <Box sx={{
          display: isMobile ? 'flex' : '',
          justifyContent: isMobile ? 'center' : 'left',
          paddingBottom: '30px',
          width: '100%'
        }}>
          <img src={isMobile ? '/tsp/images/img/apply_resourece_mobile.png' : '/tsp/images/img/apply_resourece.png'} alt={''}/>
        </Box>
      </div>

      <TableContainer sx={{borderTop: "1px solid #222222"}}>
        <Accordion
          sx={{
            borderBottom: '1px solid #e0e0e0',
            '&.MuiAccordion-root:before':{backgroundColor:'transparent'},
            '&.Mui-expanded': {margin: '0', border: 0},
          }}>
          <MyAccordionSummary
            sx={{'&.Mui-expanded': {minHeight: '74px'}}} expandIcon={<ExpandMoreIcon style={{fontSize:'35px'}}/>}>
            <Body2 bold>장비사용 견적요청</Body2>
          </MyAccordionSummary>
          <AccordionDetails sx={{backgroundColor: "#f5f5f5", padding: '20px 16px', borderTop:'1px solid #e0e0e0'}}>
            <div>
              <Body3 lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>1. 장비선택</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', lineHeight:'20px'}}>
                실증포털 사이트 {'<장비사용견적요청>'}화면에서 견적 요청하실 장비를 선택합니다.{isMobile? <br/> : null}
                <a href={"http://pc.atops.or.kr:5500/Apply/Estimation"}
                   style={{color: Color.azul, fontSize: isMobile ? '14px' : '16px'}}> {'<장비사용 견적요청>'}화면으로
                  바로가기 <img src={'/tsp/images/common/icon_up_blueArrow.png'} alt={'화살표'}/></a>
              </Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>견적 요청은 각 장비별로 신청 가능합니다.</Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>2. 견적서 작성</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}> 견적서 요청은 회원만 가능합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}> 1)장비선택 2)신청장비 및 지불방법 확인 3)활용목적 작성 4)반출신청 작성은 모두 필수 작성 항목입니다.</Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>3. 사용기간 선택</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}> 장비를 사용할 기간을 선택해주세요.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}> 대여 시작일시와 반납일시를 적어주세요.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}> 장비사용기간은 연속적으로만 선택 가능합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', lineHeight:'20px'}}> 장비사용료는 1시간당 또는 1일로 계산되어 적용됩니다. </Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}> 사용기간 선택은 견적 산출을 위함이므로, 실제 사용신청시 해당기간에 장비를 사용하지 못할 수도 있습니다.</Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>4. 견적요청 완료</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}> 견적요청이 완료되었습니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}> 담당자가 확인 후 견적서 송부까지 약3일정도가 소요됩니다.</Body3>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderBottom: '1px solid #e0e0e0',
            '&.MuiAccordion-root:before':{backgroundColor:'transparent'},
            '&.Mui-expanded': {margin: '0', border: 0},
          }}>
          <MyAccordionSummary
            sx={{'&.Mui-expanded': {minHeight: '74px'}}} expandIcon={<ExpandMoreIcon style={{fontSize:'35px'}}/>}>
            <Body2 bold>장비사용 사용요청</Body2>
          </MyAccordionSummary>
          <AccordionDetails sx={{backgroundColor: "#f5f5f5", padding: '20px 16px',borderTop:'1px solid #e0e0e0'}}>
            <div>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>1. 장비선택</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:'6px', lineHeight:'20px'}}>실증포털 사이트{'<장비사용 요청>'}화면에서 사용 신청하실 장비를 선택합니다.{isMobile? <br/> : null}
                <a href={"http://pc.atops.or.kr:5500/Apply/Equipment"} style={{color: "blue",fontSize: isMobile ? '14px' : '16px', marginTop:isMobile ? '4px' : '0px'}}> {'<장비사용 요청>'}화면으로
                  바로가기 <img src={'/tsp/images/common/icon_up_blueArrow.png'} alt={'화살표'}/></a>
              </Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', lineHeight:'20px'}}>사용 신청은 견적요청과 별개의 신청입니다. 견적 요청 후에도 사용 신청을 하셔야 합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px'}}>사용신청시 1대의 장비만 선택 가능합니다.</Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>2. 신청서 작성</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>신청서 요청은 회원만 가능합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}>1)신청자정보 확인 2)신청장비 및 지불방법 작성 3)활용목적 작성 4)반출신청은 모두 필수 작성 항목입니다.</Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>3. 사용기간 선택</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>장비를 사용할 실기간을 선택해주세요.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>대여 시작일시와 반납일시를 적어주세요.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>장비사용기간은 연속적으로만 선택 가능합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}>장비사용료는 1시간당 또는 1일로 계산되어 적용됩니다.</Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>4. 사용신청 완료</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>사용요청이 완료되었습니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}>사용신청 완료 확인은{'\n'}
                <a href={'http://pc.atops.or.kr:5500/Mypage/Estimation'}
                   style={{color: "blue", borderBottom: "1px solid blue"}}>마이페이지</a>
                와 등록하신 이메일 또는 휴대폰에서 확인하실 수 있습니다</Body3>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderBottom: '1px solid #e0e0e0',
            '&.MuiAccordion-root:before':{backgroundColor:'transparent'},
            '&.Mui-expanded': {margin: '0', border: 0},
          }}>
          <MyAccordionSummary
            sx={{'&.Mui-expanded': {minHeight: '74px'}}} expandIcon={<ExpandMoreIcon style={{fontSize:'35px'}}/>}>
            <Body2 bold>장비반납</Body2>
          </MyAccordionSummary>
          <AccordionDetails sx={{backgroundColor: "#f5f5f5", padding: '20px 16px',borderTop:'1px solid #e0e0e0'}}>
            <div>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500', }}>1. 장비반납</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', lineHeight:'20px'}}>장비 반납일시를 꼭 지켜주세요. 사용신청시 선택한 반납일시에서 반납이 지연될 경우에 연체료가 발생합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}>기간연장이 필요하신 경우에는 반납일시 전에 {'<장비사용관리>'}화면에서 기간연장신청을 해주시면 됩니다.{isMobile? <br/> : null}
                <a href={"http://pc.atops.or.kr:5500/Apply/Equipment"} style={{color: "blue",fontSize: isMobile ? '14px' : '16px'}}> {'<장비사용 요청>'}화면으로 바로가기
                  {'\n'}<img src={'/tsp/images/common/icon_up_blueArrow.png'} alt={'화살표'}/></a>
              </Body3>
            </div>

            <div style={{marginTop: '16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>2. 대여장소 방문</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', }}>대여하신 회원분의 신분증을 필히 지참해주세요.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}>대여하신 장비를 검수하는 시간과 수리 또는 교체 비용이 추가로 부여될 수 있습니다.</Body3>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            borderBottom: '1px solid #e0e0e0',
            '&.MuiAccordion-root:before':{backgroundColor:'transparent'},
            '&.Mui-expanded': {margin: '0', border: 0},
          }}>
          <MyAccordionSummary
            sx={{'&.Mui-expanded': {minHeight: '74px'}}} expandIcon={<ExpandMoreIcon style={{fontSize:'35px'}}/>}>
            <Body2 bold>실증자원 신청</Body2>
          </MyAccordionSummary>
          <AccordionDetails sx={{backgroundColor: "#f5f5f5", padding: '20px 16px',borderTop:'1px solid #e0e0e0'}}>
            <div>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>1. 신청서 작성</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>신청서 작성은 회원만 가능합니다.</Body3>
              <Body3 listItem style={{paddingLeft: '6px', lineHeight:'20px'}}>1)신청자정보 확인 2)신청자원 선택 3)활용목적 작성은 모두 필수 작성 항목입니다.</Body3>
            </div>

            <div style={{marginTop:'16px'}}>
              <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>2. 사용기간 선택</Body3>
              <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px'}}>실증자원을 사용하실 실제 기간을 선택해주세요.</Body3>
              <Body3 listItem style={{paddingLeft: '6px'}}>사용기간은 연속적으로만 선택 가능합니다.</Body3>
            </div>

          <div style={{marginTop:'16px'}}>
            <Body3 bold lineClamp={1} style={{marginBottom: '8px', fontWeight:'500'}}>3. 사용신청 완료</Body3>
            <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', lineHeight:'20px'}}>사용신청이 완료되었습니다.</Body3>
            <Body3 listItem style={{paddingLeft: '6px', marginBottom:isMobile ? '4px' : '6px', lineHeight:'20px'}}>사용신청 여부는 담당자가 확인 후 승인 여부를 안내해드립니다.</Body3>
            <Body3 listItem style={{paddingLeft: '6px'}}>궁금하신 내용은 {'\n'}
              <a href={"http://pc.atops.or.kr:5500/About/Inquiry"} style={{color: "blue", borderBottom: "1px solid blue"}}>1:1
                문의</a>
                  {'\n'}혹은 담당자 메일로 문의하실 수 있습니다.</Body3>
          </div>
          </AccordionDetails>
        </Accordion>
      </TableContainer>
    </Stack>
  </BannerContents>
}

export default ApplyNotice

const ImageBox = styled(Box)`
  width: 100%;
  font-weight: bold;
  font-size: 25px;
  padding-bottom: 25px;
`

const MyAccordionSummary = styled(AccordionSummary)`
  width: 100%;
  min-height: 74px;
`
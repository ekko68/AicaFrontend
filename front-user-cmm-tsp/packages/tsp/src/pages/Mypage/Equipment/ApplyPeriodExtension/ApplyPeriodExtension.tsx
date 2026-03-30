import {BannerContents} from "shared/components/BannerContents";
import {Box, Stack} from "@mui/material";
import UsePeriodSelect from "~/pages/Apply/Estimation/UsePeriodSelect";
import React, {useState} from "react";
import {TabContext, TabPanel} from "@mui/lab";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {PeriodExtensionCompleted} from "~/pages/Mypage/Equipment/ApplyPeriodExtension/PeriodExtensionCompleted";
import {VerticalInterval} from "shared/components/LayoutComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Body2} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

const ApplyPeriodExtension = () => {
  const navi = useNavigate()
  const [step, setStep] = useState('사용기간 선택')
  const [activeStep, setActiveStep] = useState(0);
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  const {isDesktop} = useGlobalConfigStore()
  return <BannerContents title={'기간연장신청'} stepper={{step: ['사용기간 선택', '신청완료'], activeStep: activeStep}}>
    <VerticalInterval size={isDesktop ? '50px' : '30px'}/>
    <Stack width={'100%'} spacing={'48px'} style={{marginBottom: '30px'}}>
      <TabContext value={step}>
        <TabPanel value={'사용기간 선택'} sx={{padding: 0}}>
          <UsePeriodSelect onClickSave={() => setExtendPeriodView(false)}
                           onClickList={() => setExtendPeriodView(false)}/>
          <Box display={"flex"} justifyContent={"center"} sx={{marginTop: '30px'}}>
            <CustomButton label={<Body2>이전</Body2>} color={"outlinedblack"}
                          style={{
                            width: isDesktop ? '140px' : '168px',
                            height: isDesktop ? '60px' : '52px',
                            borderRadius: isDesktop ? "30px" : '26px'
                          }}
                          onClick={() => {
                            navi(-1)
                          }}
            />
            <Box width={"20px"}/>
            <CustomButton label={<Body2 color={Color.white}>다음</Body2>}
                          style={{
                            width: isDesktop ? '140px' : '168px',
                            height: isDesktop ? '60px' : '52px',
                            borderRadius: isDesktop ? "30px" : '26px'
                          }}
                          onClick={() => {
                            window.scrollTo(0, 0)
                            setStep('신청완료')
                            setActiveStep(activeStep + 1)
                          }}/>
          </Box>
        </TabPanel>
        <TabPanel value={'신청완료'} sx={{padding:0}}>
          <PeriodExtensionCompleted/>
          <Box display={"flex"} justifyContent={"center"}>
            <Box width={"20px"}/>
            <CustomButton type={"large"} label={"기간연장내역"} style={{borderRadius: "50px"}}
                          onClick={() => {
                            navi(-1)
                          }}/>
          </Box>
        </TabPanel>
      </TabContext>
    </Stack>
  </BannerContents>
}

export default ApplyPeriodExtension
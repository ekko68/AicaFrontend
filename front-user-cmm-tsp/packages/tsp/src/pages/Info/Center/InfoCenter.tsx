import React, {useEffect, useState} from "react";
import {BannerContents} from "shared/components/BannerContents";
import {TabContext, TabPanel} from "@mui/lab";
import {BusinessIntroPanel} from "~/pages/Info/Center/Panel/BusinessIntro";
import {CarSectorPanel} from "~/pages/Info/Center/Panel/CarSector";
import {EnergySectorPanel} from "~/pages/Info/Center/Panel/EnergySector";
import {HealthCareSectorPanel} from "~/pages/Info/Center/Panel/HealthCareSector";

const InfoCenter = () => {
  const [tabValue, setTabValue] = useState('사업개요')

  return <BannerContents
      title={"실증기반센터소개"}
      subTitle={"실증기반센터는 AI 사업의 생태계를 마련하기 위해 실증기반 환경 조성의 중심지 입니다."}
      tabs={{
            tabValue: tabValue,
            items: ["사업개요", "자동차분야", "에너지분야", "헬스케어분야"],
            onClick: (selectTab) => {
              setTabValue(selectTab)
              window.scrollTo(0, 5);
            }
      }}>
      <TabContext value={tabValue}>
          <TabPanel value={"사업개요"} sx={{overflow:"auto", padding: 0}}>
              <BusinessIntroPanel/>
          </TabPanel>
          <TabPanel value={"자동차분야"}  sx={{overflow:"auto", padding: 0}}>
              <CarSectorPanel/>
          </TabPanel>
          <TabPanel value={"에너지분야"}  sx={{overflow:"auto", padding: 0}}>
              <EnergySectorPanel/>
          </TabPanel>
          <TabPanel value={"헬스케어분야"}  sx={{overflow:"auto", padding: 0}}>
              <HealthCareSectorPanel/>
          </TabPanel>
      </TabContext>
  </BannerContents>
}

export default InfoCenter
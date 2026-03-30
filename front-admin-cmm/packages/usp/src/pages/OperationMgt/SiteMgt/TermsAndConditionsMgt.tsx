// 사이트관리/ ->  약관관리 페이지
import React from "react"
import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TermsAndConditionInfo} from "~/pages/OperationMgt/SiteMgt/Detail/TermsAndConditionInfo";
import {TabPanel} from "@mui/lab";

function TermsAndConditionsMgt() {

  return <TitleContents title={'약관관리'}>
    <CustomTabs tabs={['약관관리', '개인정보처리방침', '개인정보 수집 및 활용동의']}>
      <TabPanel value={'약관관리'} sx={{padding: '0', height: '100%'}}>
        <TermsAndConditionInfo/>
      </TabPanel>
      <TabPanel value={'개인정보처리방침'} sx={{padding: '0', height: '100%'}}>
        <TermsAndConditionInfo/>
      </TabPanel>
      <TabPanel value={'개인정보 수집 및 활용동의'} sx={{padding: '0', height: '100%'}}>
        <TermsAndConditionInfo/>
      </TabPanel>
    </CustomTabs>
  </TitleContents>
}

export default TermsAndConditionsMgt;
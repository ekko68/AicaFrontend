import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {SurveyContent} from "~/pages/OperationMgt/SatisfaSurveyMgt/SurveyDetail/SurveyContent";
import {SurveyRespondent} from "~/pages/OperationMgt/SatisfaSurveyMgt/SurveyDetail/SurveyRespondent";
import {SurveyResult} from "~/pages/OperationMgt/SatisfaSurveyMgt/SurveyDetail/SurveyResult";


const SatisfaSurveryMgtDetail = () => {
  return <TitleContents title={'설문지 상세'}>
    <CustomTabs tabs={["설문내용", "조사결과","설문응답자"]}>
      <TabPanel value="설문내용" sx={{padding: "0", height: '100%'}}>
        <SurveyContent/>
      </TabPanel>
      <TabPanel value="조사결과" sx={{padding: "0", height: '100%'}}>
        <SurveyResult/>
      </TabPanel>
      <TabPanel value="설문응답자" sx={{padding: "0", height: '100%'}}>
        <SurveyRespondent/>
      </TabPanel>
    </CustomTabs>
  </TitleContents>
}

export default SatisfaSurveryMgtDetail
import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {ExpertInformationMgtInfo} from "~/pages/OperationMgt/ExpertMgt/ExpertInformationMgt/ExpertInformationMgtInfo";
import {ExpertInformationMgtHist} from "~/pages/OperationMgt/ExpertMgt/ExpertInformationMgt/ExpertInformationMgtHist";

const ExpertInformationMgtDetail = () =>{
  return <TitleContents title={"전문가정보 상세"}>
      <CustomTabs tabs={["전문가 정보", "매칭이력"]}>
        <TabPanel value="전문가 정보" sx={{padding: "0", height: '100%'}}>
          <ExpertInformationMgtInfo/>
        </TabPanel>
        <TabPanel value="매칭이력" sx={{padding: "0", height: '100%'}}>
          <ExpertInformationMgtHist/>
        </TabPanel>
      </CustomTabs>
    </TitleContents>
}

export default ExpertInformationMgtDetail
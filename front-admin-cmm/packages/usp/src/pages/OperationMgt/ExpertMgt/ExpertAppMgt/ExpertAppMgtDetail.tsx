import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {ExpertAppMgtInfo} from "~/pages/OperationMgt/ExpertMgt/ExpertAppMgt/ExpertAppMgtInfo";
import {ExpertAppMgtHist} from "~/pages/OperationMgt/ExpertMgt/ExpertAppMgt/ExpertAppMgtHist";

const ExpertAppMgtDetail = () =>{
  return <TitleContents title={"전문가신청 상세"}>
      <CustomTabs tabs={["신청정보", "처리이력"]}>
        <TabPanel value="신청정보" sx={{padding: "0", height: '100%'}}>
          <ExpertAppMgtInfo/>
        </TabPanel>
        <TabPanel value="처리이력" sx={{padding: "0", height: '100%'}}>
          <ExpertAppMgtHist/>
        </TabPanel>
      </CustomTabs>
    </TitleContents>
}

export default ExpertAppMgtDetail
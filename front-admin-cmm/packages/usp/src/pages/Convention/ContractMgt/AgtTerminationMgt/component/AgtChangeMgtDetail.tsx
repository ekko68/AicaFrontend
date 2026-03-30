import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {AgtChangeMgtInfo} from "~/pages/Convention/ContractMgt/AgtChangeMgt/component/AgtChangeMgtInfo"
import {AgtChangeMgtHist} from "~/pages/Convention/ContractMgt/AgtChangeMgt/component/AgtChangeMgtHist";

const AgtChangeMgtDetail = () =>{
  return <TitleContents title={"협약변경 상세"}>
      <CustomTabs tabs={["신청내역", "처리이력"]}>
        <TabPanel value="신청내역" sx={{padding: "0", height: '100%'}}>
          <AgtChangeMgtInfo/>
        </TabPanel>
        <TabPanel value="처리이력" sx={{padding: "0", height: '100%'}}>
          <AgtChangeMgtHist />
        </TabPanel>
      </CustomTabs>
    </TitleContents>
}

export default AgtChangeMgtDetail
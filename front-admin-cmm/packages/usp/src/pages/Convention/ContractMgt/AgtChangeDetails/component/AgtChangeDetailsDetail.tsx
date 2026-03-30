import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {AgtChangeDetailsInfo} from "~/pages/Convention/ContractMgt/AgtChangeDetails/component/AgtChangeDetailsInfo"

const AgtChangeDetailsDetail = () =>{
  return <TitleContents title={"협약변경내역 상세"}>
      <AgtChangeDetailsInfo />
    </TitleContents>
}

export default AgtChangeDetailsDetail
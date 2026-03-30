// 협약 -> 협약체결관리 -> 사업계획서 상세 
/*
    Date Created          :   2022/08/26
    Screen Name           :   파일 첨부 리스트
    Screen ID             :   UI-USP-ADM-0220201
    Developer Name        :   jhan
*/
import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {
      BusPlanReceptionMgtInfo as InfoPanel, 
      BusPlanReceptionMgtHist as HistPanel
} from './index'

const BusPlanReceptionMgtDetail = () =>{
  return <TitleContents title={"사업계획서 상세"}>
      <CustomTabs tabs={["접수정보", "처리이력"]}>
        <TabPanel value="접수정보" sx={{padding: "0", height: '100%'}}>
          <InfoPanel/>
        </TabPanel>
        <TabPanel value="처리이력" sx={{padding: "0", height: '100%'}}>
          <HistPanel/>
        </TabPanel>
      </CustomTabs>
    </TitleContents>
}

export default BusPlanReceptionMgtDetail
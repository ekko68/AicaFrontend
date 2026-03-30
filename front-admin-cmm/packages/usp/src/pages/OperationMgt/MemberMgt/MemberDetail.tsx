import {CustomTabs, TitleContents} from "shared/components/LayoutComponents";
import {TabPanel} from "@mui/lab";
import {MemberInfo} from "~/pages/OperationMgt/MemberMgt/Detail/MemberInfo";
import {MemberHist} from "~/pages/OperationMgt/MemberMgt/Detail/MemberHist";
import {MemberBusinessInfo} from "~/pages/OperationMgt/MemberMgt/Detail/MemberBusinessInfo";
import {MemberBusinessDetailInfo} from "~/pages/OperationMgt/MemberMgt/Detail/MemberBusinessDetailInfo";
import {useState} from "react";
import {useParams} from "react-router-dom";

const MemberDetail = () => {
  // API 통신
  const {id} = useParams()
  const [value, setValue] = useState('dd')
  const [member, setMember] = useState('정상')
  return <TitleContents title={'회원 상세'}>
    {
      id === 'id-1235' ?
        <CustomTabs tabs={['회원정보', '기업정보', '처리이력']}>
          <TabPanel value={'회원정보'} sx={{padding: 0, height:'100%'}}>
            <MemberBusinessInfo member={member}/>
          </TabPanel>
          <TabPanel value={'기업정보'} sx={{padding: 0, height:'100%'}}>
            <MemberBusinessDetailInfo member={member}/>
          </TabPanel>
          <TabPanel value={'처리이력'} sx={{padding: 0, height:'100%'}}>
            <MemberHist/>
          </TabPanel>
        </CustomTabs>
        :
        <CustomTabs tabs={['회원정보', '처리이력']}>
          <TabPanel value={'회원정보'} sx={{padding: 0, height:'100%'}}>
            <MemberInfo/>
          </TabPanel>
          <TabPanel value={'처리이력'} sx={{padding: 0, height:'100%'}}>
            <MemberHist/>
          </TabPanel>
        </CustomTabs>

    }
  </TitleContents>
}

export default MemberDetail;
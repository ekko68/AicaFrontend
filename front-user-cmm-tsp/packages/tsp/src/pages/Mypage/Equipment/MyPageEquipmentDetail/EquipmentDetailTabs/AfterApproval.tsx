import React, {useState} from "react";
import {BannerContents} from "shared/components/BannerContents";
import {ApplyInfoProps} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail";
import {
    ApplyInformation
} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/AfterApprovalTabs/ApplyInformation";
import {
    PeriodExtensionDetails
} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/AfterApprovalTabs/PeriodExtensionDetails";
import {
    UsageChargeDetail
} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/AfterApprovalTabs/UsageChargeDetails";
import {
    ResultReport
} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/AfterApprovalTabs/ResultReport";
import {TabContext, TabPanel} from "@mui/lab";

export const AfterApproval: React.FC<{
    applyInfoProps: ApplyInfoProps;
    isMobile: boolean
}> = props => {
    const [tab, setTab] = useState('신청정보');
    return <>
        <BannerContents title={'장비사용 상세'}
                        subTitle={'장비 신청정보를 조회하고 현재 사용상태를 변경할 수 있습니다.'}
                        tabs={{
                            tabValue: tab, items: ['신청정보', '기간연장내역', '사용료부과내역', '결과보고서'],
                            onClick: selectTab => {
                                setTab(selectTab);
                                window.scrollTo(0,0);
                            }
                        }}>
            <TabContext value={tab}>
                <TabPanel value={'신청정보'} sx={{width:'100%', padding:0}}>
                    <ApplyInformation isMobile={props.isMobile}/>
                </TabPanel>
                <TabPanel value={'기간연장내역'} sx={{width:'100%', padding:0}}>
                    <PeriodExtensionDetails isMobile={props.isMobile}/>
                </TabPanel>
                <TabPanel value={'사용료부과내역'} sx={{width:'100%', padding:0}}>
                    <UsageChargeDetail isMobile={props.isMobile}/>
                </TabPanel>
                <TabPanel value={'결과보고서'} sx={{width:'100%', padding:0}}>
                    <ResultReport isMobile={props.isMobile}/>
                </TabPanel>
            </TabContext>

        </BannerContents>
    </>
}
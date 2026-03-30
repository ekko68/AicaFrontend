import React, {useState} from "react"
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {BannerContents} from "shared/components/BannerContents";
import ApplicationForm from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/ApplicationForm";
import {PeriodSelect} from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/PeriodSelect";
import {ApplyCompleted} from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/ApplyCompleted";

const UseEquipmentApply = () => {
    const {isDesktop} = useGlobalConfigStore()
    const isMobile = !isDesktop;
    const [stepper, setStepper] = useState(1);
console.log('UseEquipmentApply')
    return (
        <BannerContents title={"장비사용 신청"}
                        stepper={{activeStep: stepper, step: ["장비선택", "신청서작성", "사용기간선택", "신청완료"]}}>
            {
                stepper === 1 ? // 신청서작성
                    <ApplicationForm stepper={stepper} setStepper={setStepper} isMobile={isMobile}/> :
                    stepper === 2 ? // 사용기간선택
                        <PeriodSelect stepper={stepper} setStepper={setStepper} isMobile={isMobile}/> :
                        // 신청완료
                        <ApplyCompleted stepper={stepper} setStepper={setStepper} isMobile={isMobile}/>
            }
        </BannerContents>
    )
}

export default UseEquipmentApply


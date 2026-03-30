import React, {useEffect, useState} from "react"
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {BannerContents} from "shared/components/BannerContents";
import ApplicationForm from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/ApplicationForm";
import {PeriodSelect} from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/PeriodSelect";
import {ApplyCompleted} from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/ApplyCompleted";
import {ApplyEstmtPost} from "~/service/Model";

const UseEquipmentApply = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [stepper, setStepper] = useState(1);
  const [state, setState] = useState<ApplyEstmtPost>()

  useEffect(() => {
    console.log(state)
  }, [stepper, state])

  return (
    <BannerContents title={"장비사용 신청"}
                    stepper={{activeStep: stepper, step: ["장비선택", "신청서작성", "사용기간선택", "신청완료"]}}>
      {
        stepper === 1 ? // 신청서작성
          <ApplicationForm stepper={stepper} setStepper={setStepper} isMobile={isMobile} setState={setState}/> :
          stepper === 2 ? // 사용기간선택
            <PeriodSelect stepper={stepper} setStepper={setStepper} isMobile={isMobile} state={state} setState={setState}/> :
            // 신청완료
            <ApplyCompleted stepper={stepper} setStepper={setStepper} isMobile={isMobile}/>
      }
    </BannerContents>
  )
}

export default UseEquipmentApply


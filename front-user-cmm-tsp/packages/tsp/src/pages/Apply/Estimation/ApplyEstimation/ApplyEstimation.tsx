import React, {useEffect, useState} from "react"
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {BannerContents} from "shared/components/BannerContents"
import {ApplyWrite} from "./ApplyEstimationDetail/ApplyWrite";
import {DateSelect} from "./ApplyEstimationDetail/DateSelect";
import {ApplyCompleted} from "./ApplyEstimationDetail/ApplyCompleted";
import {ApplyEstmtPost} from "~/service/Model";

const ApplyEstimation = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [stepper, setStepper] = useState(1);
  const [state, setState] = useState<ApplyEstmtPost>()

  useEffect(() => {
    console.log(state)
  }, [stepper,state])

  return (
    <BannerContents title={"장비사용 견적 요청"}
                    stepper={{
                      activeStep: stepper,
                      step: ["장비선택", "신청서작성", "사용기간선택", "견적신청완료"]
                    }}>
      {
        stepper === 1 ?
          <ApplyWrite stepper={stepper} isMobile={isMobile} setStepper={setStepper} setState={setState}/>
          : stepper === 2 ?
            <DateSelect setStepper={setStepper} stepper={stepper} isMobile={isMobile} state={state!} setState={setState}/>
            : <ApplyCompleted stepper={stepper} setStepper={setStepper} isMobile={isMobile}/>
      }
    </BannerContents>
  )
}

export default ApplyEstimation
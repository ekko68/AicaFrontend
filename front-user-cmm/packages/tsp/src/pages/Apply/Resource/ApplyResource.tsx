import React, {useEffect, useState} from "react"
import {BannerContents} from "shared/components/BannerContents"
import {ApplyResourceDate} from "~/pages/Apply/Resource/ApplyResourceDate";
import {ApplyResourceEnd} from "~/pages/Apply/Resource/ApplyResourceEnd";
import ApplyResourceWrite from "~/pages/Apply/Resource/ApplyResourceWirte";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";

const ApplyReource = () => {
    const [stepper, setStepper] = useState(0);
    const {isDesktop} = useGlobalConfigStore();
    const isMobile = !isDesktop

    useEffect(() => {
        window.scrollTo(0, 5);
    }, [stepper])
    return (
        <BannerContents title={"실증자원 신청"}
                        stepper={{activeStep: stepper,
                            step: ["신청서작성", "사용기간선택", "신청완료"]}}>
            {stepper === 0?
                <ApplyResourceWrite stepper={stepper} setStepper={setStepper}/>
                : stepper === 1 ?
                    <ApplyResourceDate setStepper={setStepper} stepper={stepper} isMobile={isMobile}/>
                    : stepper === 2 ?
                        <ApplyResourceEnd setStepper={setStepper} stepper={stepper} isMobile={isMobile}/>
                          : ''}
        </BannerContents>
    )
}

export default ApplyReource
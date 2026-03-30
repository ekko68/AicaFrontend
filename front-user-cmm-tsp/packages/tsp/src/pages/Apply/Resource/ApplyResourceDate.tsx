import React, {useState} from "react"
import {Box, Stack, TableRow} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import UsePeriodSelect from "~/pages/Apply/Estimation/UsePeriodSelect";
import {Body2} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const ApplyResourceDate: React.FC<{
  stepper: number
  setStepper: any
  isMobile?: boolean
}> = props => {
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  return (
    <Stack width={"100%"} spacing={"40px"} style={{marginBottom: "30px"}}>
      <UsePeriodSelect onClickSave={() => setExtendPeriodView(false)}
                       onClickList={() => setExtendPeriodView(false)}/>
      <TableRow>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomButton type={"listBack"} label={<Body2>이전</Body2>} color={"outlinedblack"}
                        style={{width: props.isMobile ? '50%' : '140px'}}
                        onClick={() => {
                          props.setStepper(props.stepper - 1)
                        }}
          />
          <Box width={"20px"}/>
          <CustomButton type={"largeList"} label={<Body2 color={Color.white}>다음</Body2>}
                        style={{width: props.isMobile ? '50%' : '140px'}}
                        onClick={() => {
                          props.setStepper(props.stepper + 1)
                        }}/>
        </Box>
      </TableRow>
    </Stack>
  )
}
import React, {useState} from "react"
import {Box, Stack, TableRow} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import UsePeriodSelect from "~/pages/Apply/Estimation/UsePeriodSelect";
import {DefaultDrawer, DefaultModal} from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/PeriodSelect";
import {Body2} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const DateSelect: React.FC<{
  stepper: number
  setStepper: any
  isMobile?: boolean
}> = props => {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Stack width={"100%"} spacing={"40px"} style={{marginBottom: "30px"}}>
      <UsePeriodSelect onClickSave={() => setExtendPeriodView(false)}
                       onClickList={() => setExtendPeriodView(false)}/>
      <TableRow>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomButton type={"listBack"} label={<Body2>이전</Body2>} color={"outlinedblack"}
                        style={{width:props.isMobile ? '50%' : '140px'}}
                        onClick={() => {
                          props.setStepper(props.stepper - 1)
                        }}
          />
          <Box width={"20px"}/>
          <CustomButton type={"listBack"} label={<Body2 color={Color.white}>다음</Body2>}
                        style={{width:props.isMobile ? '50%' : '140px'}}
                        onClick={() => {
                          window.scrollTo(0, 0)
                          props.isMobile ?
                            setDrawerOpen(!drawerOpen) :
                            setDefaultOpen(!defaultOpen)
                        }}/>
        </Box>
      </TableRow>
      <DefaultModal stepper={props.stepper} setStepper={props.setStepper} open={defaultOpen} setOpen={setDefaultOpen} check/>
      <DefaultDrawer stepper={props.stepper} setStepper={props.setStepper} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} check/>
    </Stack>
  )
}
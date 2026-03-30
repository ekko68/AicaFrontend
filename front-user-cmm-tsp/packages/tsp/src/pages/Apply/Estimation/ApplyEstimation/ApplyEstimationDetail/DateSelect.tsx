import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Box, Stack, TableRow} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import UsePeriodSelect from "~/pages/Apply/Estimation/UsePeriodSelect";
import {DefaultDrawer, DefaultModal} from "~/pages/Apply/Equipment/UseEquipmentApply/Steppers/PeriodSelect";
import {Body2} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";
import {ApplyEstmtPost} from "~/service/Model";
import {ApplyEstimationService} from "~/service/UseApply/ApplyEstimationService";
import {useParams} from "react-router-dom";
import {dayFormat} from "shared/utils/stringUtils";

export const DateSelect: React.FC<{
  stepper: number
  setStepper: any
  isMobile?: boolean
  state: ApplyEstmtPost
  setState: Dispatch<SetStateAction<ApplyEstmtPost | undefined>>
}> = props => {
  const {id} = useParams()
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  /*const [date, setDate] = useState(0)
  const [dateNow, setDateNow] = useState(0)*/
  /*const disableTime = ApplyEstimationService.getEstmtUseDate({
    beginDt: dateNow, endDt: date, eqpmnId: id!.toString()
  })*/
  const [disableList, setDisableList] = useState<string[]>([])

  useEffect(() => {
    /*setDate(new Date(Date.now()).setMonth(new Date(Date.now()).getMonth() + 3))
    setDateNow(Date.now())*/
    let result: string[] = [];
    let curDate = new Date('2022-09-01')
    let endDate = new Date('2022-09-21')
    for (; dayFormat(curDate.getTime()) <= dayFormat(endDate.getTime());) {
      result.push(dayFormat(curDate.getTime()))
      curDate.setDate(curDate.getDate() + 1);
    }
    setDisableList(disableList.concat(result))

    /*if (disableTime.data) {
      disableTime.data.list.map((m) => {
        let result: string[] = [];
        let curDate = new Date(m.beginDt)
        while (dayFormat(curDate.getTime()) <= dayFormat(m.endDt)) {
          result.push(dayFormat(curDate.getTime()))
          curDate.setDate(curDate.getDate() + 1);
        }
        setDisableList(disableList.concat(result))
      })
    }*/
  }, [])

  return (
    <Stack width={"100%"} spacing={"40px"} style={{marginBottom: "30px"}}>
      <UsePeriodSelect onClickSave={() => setExtendPeriodView(false)}
                       onClickList={() => setExtendPeriodView(false)}
                       state={props.state} setState={props.setState} disableTime={disableList}
      />
      <TableRow>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomButton type={"listBack"} label={<Body2>이전</Body2>} color={"outlinedblack"}
                        style={{width: props.isMobile ? '50%' : '140px'}}
                        onClick={() => {
                          props.setStepper(props.stepper - 1)
                        }}
          />
          <Box width={"20px"}/>
          <CustomButton type={"listBack"} label={<Body2 color={Color.white}>다음</Body2>}
                        style={{width: props.isMobile ? '50%' : '140px'}}
                        onClick={() => {
                          window.scrollTo(0, 0)
                          props.isMobile ?
                            setDrawerOpen(!drawerOpen) :
                            setDefaultOpen(!defaultOpen)
                        }}/>
        </Box>
      </TableRow>
      <DefaultModal stepper={props.stepper} setStepper={props.setStepper} open={defaultOpen} setOpen={setDefaultOpen}
                    check state={props.state!}/>
      <DefaultDrawer stepper={props.stepper} setStepper={props.setStepper} drawerOpen={drawerOpen}
                     setDrawerOpen={setDrawerOpen} check/>
    </Stack>
  )
}
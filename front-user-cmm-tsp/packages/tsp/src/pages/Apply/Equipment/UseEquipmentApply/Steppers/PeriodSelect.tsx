import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Box, Drawer, FormControlLabel, Stack, TableRow} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import UsePeriodSelect from "~/pages/Apply/Estimation/UsePeriodSelect";
import {ModalComponents} from "shared/components/ModalComponents";
import {SubContents} from "shared/components/LayoutComponents";
import {CheckboxStyle, CustomInfoTable, TableTextCell} from "shared/components/TableComponents";
import {Color} from "shared/components/StyleUtils";
import {Body2, Body3, Body4} from "shared/components/TextComponents";
import {useGlobalModalStore} from "shared/store/GlobalModalStore";
import {DeletIcon} from "shared/components/IconComponents";
import {ApplyEstmtPost} from "~/service/Model";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";
import {ApplyEstimationService} from "~/service/UseApply/ApplyEstimationService";

export const PeriodSelect: React.FC<{
  stepper: number
  setStepper: any
  isMobile?: boolean
  state?: any
  setState?: Dispatch<SetStateAction<ApplyEstmtPost | undefined>>
}> = props => {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [boxCheck, setBoxCheck] = useState(false);
  const [disableList, setDisableList] = useState<string[]>([])

  useEffect(() => {
    let result: string[] = [];
    let curDate = new Date('2022-09-01')
    let endDate = new Date('2022-09-21')
    for (; dayFormat(curDate.getTime()) <= dayFormat(endDate.getTime());) {
      result.push(dayFormat(curDate.getTime()))
      curDate.setDate(curDate.getDate() + 1);
    }
    setDisableList(disableList.concat(result))
  }, [])

  return (
    <Stack width={"100%"} spacing={"40px"} style={{marginBottom: "30px"}}>
      <UsePeriodSelect onClickSave={() => setExtendPeriodView(false)}
                       onClickList={() => setExtendPeriodView(false)}
                       state={props.state} setState={props.setState} disableTime={disableList}/>
      <TableRow>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomButton type={"largeList"} label={"이전"} color={"outlinedblack"}
                        style={{width: '120px', borderRadius: "50px"}}
                        onClick={() => {
                          window.scrollTo(0, 0)
                          props.setStepper(props.stepper - 1)
                        }}
          />
          <Box width={"20px"}/>
          <CustomButton type={"largeList"} label={"다음"}
                        style={{width: '120px', borderRadius: "50px"}}
                        onClick={() => {
                          window.scrollTo(0, 0)
                          props.isMobile ?
                            setDrawerOpen(!drawerOpen) :
                            setDefaultOpen(!defaultOpen)
                        }}/>
        </Box>
      </TableRow>
      <DefaultModal stepper={props.stepper} setStepper={props.setStepper} open={defaultOpen} setOpen={setDefaultOpen}
                    isMobile={props.isMobile} check state={props.state!}/>
      <DefaultDrawer stepper={props.stepper} setStepper={props.setStepper} drawerOpen={drawerOpen}
                     setDrawerOpen={setDrawerOpen} check/>
    </Stack>
  )
}

export const DefaultDrawer: React.FC<{
  stepper: number
  setStepper: any
  drawerOpen: boolean
  setDrawerOpen: any
  check: boolean
  state?: ApplyEstmtPost
}> = props => {
  const [check, setCheck] = useState(!props.check)
  const {addModal} = useGlobalModalStore()
  const expectRntfee = ApplyEstimationService.getEstmtExpertRntfee(props.state!)

  if (!props.state) return <Box></Box>

  return <>
    <Drawer
      PaperProps={{
        sx: {
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '24px 15px 20px',
          height: 'calc(100% - 20px)',
          maxHeight: '761px'
        }
      }}
      anchor={'bottom'}
      open={props.drawerOpen}
      onClose={() => {
        props.setDrawerOpen(false)
      }
      }>
      <div style={{}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '20px'}}>사용금액확인</span>
          <div onClick={() => {
            props.setDrawerOpen(false)
          }}><DeletIcon/></div>
        </div>
        <CustomInfoTable columnCount={1} elements={[
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"시작일"} label={props.state.useBeginDt ? toTimeFormat(props.state.useBeginDt) : ''}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"종료일"} label={props.state.useEndDt ? toTimeFormat(props.state.useEndDt) : ''}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"1일 가용시간"} label={expectRntfee.data ? `${expectRntfee.data.usefulHour}시간` : ''}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"총 사용시간"} label={expectRntfee.data ? `${expectRntfee.data.expectUsgtm}시간` : ''}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"1시간 사용료"}
            label={expectRntfee.data ? `${expectRntfee.data.rntfeeHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원` : ''}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"예상 사용금액"}
            label={
              <div>
                <Body2 weight={500} style={{color: Color.azul}}>
                  {expectRntfee.data ? expectRntfee.data.expectRntfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</Body2><Body3>원</Body3><br/><Body4>
                (총 사용시간 * 1시간 사용료)
              </Body4>
              </div>}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"지불방법"} label={"선납"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"안내"} label={<div>
            <Body3 listItem style={{paddingLeft: '6px'}}>사용금액은 신청완료 후 담당자 검토 후 변경될 수 있습니다.</Body3>
            <Body3 listItem style={{paddingLeft: '6px'}}>사용금액 변경 시 담당자가 별도로 연락을 드립니다.</Body3>
          </div>}
          />,
        ]}/>
        {
          props.check && <FormControlLabel
                sx={{display: 'flex', alignItems: 'start', paddingTop: '4px'}}
                label={<Body3>{'선택한 기간은 장비사용 견적을 위함이며 실제 사용신청 시 해당 기간에 사용하지 못할 수 있음을 확인하였습니다.'}</Body3>}
                control={<CheckboxStyle style={{marginTop: '5px'}} onClick={() => setCheck(!check)}/>}
            />
        }
      </div>
      <Box>
        <CustomButton
          type={'full'} label={'저장'}
          onClick={() => {
            if (!check) {
              addModal({
                open: true, isDist: true, type: 'normal', content: '체크해주세요!'
              })
            } else {
              props.setDrawerOpen(false)
              props.setStepper(props.stepper + 1)
            }
          }}/>
      </Box>
    </Drawer>
  </>
}

export const DefaultModal: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDist?: boolean
  setStepper?: any
  stepper: number
  check: boolean
  isMobile?: boolean
  state?: ApplyEstmtPost
}> = props => {
  const [check, setCheck] = useState(!props.check)
  const {addModal} = useGlobalModalStore()
  const expectRntfee = ApplyEstimationService.getEstmtExpertRntfee(props.state!)

  if (!props.state) return <Box></Box>

  return <ModalComponents
    style={{minWidth: '780px', height: '700px', overflow: 'auto'}}
    open={props.open}
    buttonName={'재설정'}
    isDist={props.isDist}
    type={"complete"} title={"사용금액확인"}
    borderRadius={'50px'} outlinedblack
    onConfirm={async () => {
      if (check) {
        props.setStepper(props.stepper + 1)
        props.setOpen(false)
      } else
        addModal({
          open: true, isDist: true, type: 'normal', content: '확인 체크해주세요.'
        })
    }}
    onClose={() => {
      props.setOpen(false)
    }}>
    <SubContents title={"사용금액확인"} maxHeight={'100%'} style={{fontWeight: 500}}>
      <CustomInfoTable columnCount={1} elements={[
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"시작일"} label={props.state.useBeginDt ? toTimeFormat(props.state.useBeginDt) : ''}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"종료일"} label={props.state.useEndDt ? toTimeFormat(props.state.useEndDt) : ''}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"1일 가용시간"} label={expectRntfee.data ? `${expectRntfee.data.usefulHour}시간` : ''}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"총 사용시간"} label={expectRntfee.data ? `${expectRntfee.data.expectUsgtm}시간` : ''}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"1시간 사용료"}
          label={expectRntfee.data ? `${expectRntfee.data.rntfeeHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원` : ''}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"예상 사용금액"}
          label={
            <div>
              <Body2 weight={500} style={{color: Color.azul}}>
                {expectRntfee.data ? expectRntfee.data.expectRntfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</Body2><Body3>원</Body3><br/><Body4>
              (총 사용시간 * 1시간 사용료)
            </Body4>
            </div>}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"지불방법"} label={"선납"}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"안내"} label={<div>
          <Body3 listItem style={{paddingLeft: '6px'}}>사용금액은 신청완료 후 담당자 검토 후 변경될 수 있습니다.</Body3>
          <Body3 listItem style={{paddingLeft: '6px'}}>사용금액 변경 시 담당자가 별도로 연락을 드립니다.</Body3>
        </div>}
        />,
      ]}/>
      {
        props.check && <FormControlLabel
              sx={{display: 'flex', alignItems: 'start', paddingTop: '4px'}}
              label={<Body3>{'선택한 기간은 장비사용 견적을 위함이며 실제 사용신청 시 해당 기간에 사용하지 못할 수 있음을 확인하였습니다.'}</Body3>}
              control={<CheckboxStyle style={{marginTop: '5px'}} onClick={() => setCheck(!check)}/>}
          />
      }
    </SubContents>
  </ModalComponents>
}
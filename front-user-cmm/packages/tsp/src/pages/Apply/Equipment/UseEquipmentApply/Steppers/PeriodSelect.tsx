import React, {Dispatch, SetStateAction, useState} from "react"
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

export const PeriodSelect: React.FC<{
  stepper: number
  setStepper: any
  isMobile?: boolean
}> = props => {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [boxCheck, setBoxCheck] = useState(false);

  return (
    <Stack width={"100%"} spacing={"40px"} style={{marginBottom: "30px"}}>
      <UsePeriodSelect onClickSave={() => setExtendPeriodView(false)}
                       onClickList={() => setExtendPeriodView(false)}/>
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
      <DefaultModal stepper={props.stepper} setStepper={props.setStepper} open={defaultOpen} setOpen={setDefaultOpen} isMobile={props.isMobile} check/>
      <DefaultDrawer stepper={props.stepper} setStepper={props.setStepper} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} check/>
    </Stack>
  )
}

export const DefaultDrawer: React.FC<{
  stepper: number
  setStepper: any
  drawerOpen: boolean
  setDrawerOpen: any
  check: boolean
}> = props => {
  const [check, setCheck] = useState(!props.check)
  const {addModal} = useGlobalModalStore()

  return <>
    <Drawer
      PaperProps={{
        sx: {
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '24px 15px 20px',
          height : 'calc(100% - 20px)',
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
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span style={{fontWeight:'bold', fontSize:'20px', marginBottom:'20px'}}>사용금액확인</span>
          <div onClick={() => {props.setDrawerOpen(false)}}><DeletIcon/></div>
        </div>
        <CustomInfoTable columnCount={1} elements={[
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"시작일"} label={"2021-11-16 10시 15분"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"종료일"} label={"2021-11-17 15시 25분"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"1일 가용시간"} label={"8시간"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"총 사용시간"} label={"12시간"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"1시간 사용료"} label={"100원"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"예상 사용금액"}
            label={<div><Body3 style={{color: Color.azul}}>1,200</Body3><Body4>원</Body4><br/><Body4> (총 사용시간 * 1시간
              사용료)</Body4></div>}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"지불방법"} label={"선납"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"안내"} label={<div>
              <li style={{paddingLeft:'18px', textIndent:'-18px'}}>사용금액은 신청완료 후 담당자 검토 후 변경될 수 있습니다.</li>
              <li style={{paddingLeft:'18px', textIndent:'-18px'}}>사용금액 변경 시 담당자가 별도로 연락을 드립니다.</li>
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
            if(!check) {
              addModal({
                open: true, isDist: true, type: 'normal', content: '체크해주세요!'
              })
            }
            else {
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
}> = props => {
  const [check, setCheck] = useState(!props.check)
  const {addModal} = useGlobalModalStore()
  return <ModalComponents
    style={{minWidth:'780px', minHeight:'557px'}}
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
          open: true, isDist: true, type: 'normal', content: '체크해주세요!'
        })
    }}
    onClose={() => {
      props.setOpen(false)
    }}>
    <SubContents title={"사용금액확인"} maxHeight={'100%'} style={{fontWeight:500}}>
      <CustomInfoTable columnCount={1} elements={[
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"시작일"} label={"2021-11-16 10시 15분"}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"종료일"} label={"2021-11-17 15시 25분"}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"1일 가용시간"} label={"8시간"}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"총 사용시간"} label={"12시간"}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"1시간 사용료"} label={"100원"}
        />,
        <TableTextCell
          thWidth={100} tdWidth={200}
          title={"예상 사용금액"}
          label={<div><Body2 weight={500} style={{color: Color.azul}}>1,200</Body2><Body3>원</Body3><br/><Body4> (총 사용시간 * 1시간
            사용료)</Body4></div>}
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
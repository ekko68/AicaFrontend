import * as React from "react";
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps
} from "@mui/x-date-pickers-pro/DateRangePickerDay";
import {DateRange, StaticDateRangePicker} from "@mui/x-date-pickers-pro";
import {Dispatch, SetStateAction, useState} from "react";
import {Box, FormControl, MenuItem, Select, Stack, TextField} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from "@mui/x-date-pickers-pro";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";
import koLocale from 'date-fns/locale/ko'
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {random} from "shared/utils/str";
import {SelectChangeEvent} from "@mui/material/Select";
import styled from "@emotion/styled";
import dayjs from 'shared/libs/dayjs';
import {CustomButton} from "shared/components/ButtonComponents";
import {EquipmentService} from "~/service/UseMgt/Equipment/EquipmentService";
import {useParams} from "react-router-dom";

export const UsePeriodSelect: React.FC<{
  onClickSave: () => void
  onClickList: () => void
  startTime: number
  disabled?: string[]
}> = props => {
  const [value, setValue] = React.useState<DateRange<Date>>([new Date(props.startTime), null]);
  const [startTime, setStartTime] = useState<Date>(new Date)
  const [endTime, setEndTime] = useState<Date>(new Date)
  const [endTimeSecond, setEndTimeSecond] = useState(0)
  const [usgtm, setUsgtm] = useState(0)
  const [detail, setDetail] = useState('')
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const splitTime = ["2022-07-13"]
  const {id} = useParams()
  const {addModal} = useGlobalModalStore()

  const renderWeekPickerDay = (
    date: Date,
    dateRangePickerDayProps: DateRangePickerDayProps<Date>
  ) => {
    const day = dayFormat(date.getTime())
    const today = dayFormat(Date.now())
    let color = date.getDay() === 0 ? '#ee1a1a' : date.getDay() === 6 ? '#4063ec' : 'black' // '#4063ec' -> Color.azul

    if(props.disabled) {
      if (props.disabled.includes(day)) {
        color = '#e0e0e0' // Color.line
      } else if (dateRangePickerDayProps.isStartOfHighlighting || dateRangePickerDayProps.isEndOfHighlighting) {
        color = 'white'
      } else if (today === day) {
        color = '#1ccdcc' //Color.topaz
      }
    }

    if (splitTime.includes(day) && !dateRangePickerDayProps.selected) {
      return <Box key={random().toString()} sx={{position: "relative"}}>
        <Box sx={{
          position: 'absolute',
          height: 6,
          width: 6,
          border: '1px solid rgb(0,0,0)',
          backgroundColor: 'black',
          borderRadius: 4,
          right: '50%',
          transform: 'translateX(3px)',
          top: '10%',
          color: 'red'
        }}/>
        {/*@ts-ignore*/}
        <DateRangePickerDay {...dateRangePickerDayProps} color={color} disabled={props.disabled.includes(day)}/>
      </Box>
    }

    //@ts-ignore
    return <DateRangePickerDay
      key={random().toString()}
      {...dateRangePickerDayProps}
      color={color}
      disabled={props.disabled ? props.disabled.includes(day) : false}/>
  }

  return <><Stack alignItems={"center"} width={'100%'} display={'flex'} flexDirection={'row'}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
      <Stack sx={{width: "50%"}}>
        <Box sx={{
          "& .css-1tape97": {
            width: "100%",
          },
          "& .css-170k9md": {
            minHeight: '420px'
          },
          "& > div": {
            width: "100%",
          },
          "& > div > div, & > div > div > div, & .MuiCalendarPicker-root": {
            width: "100%",
          },
          width: '100%',
          '& .MuiPickersArrowSwitcher-root': {
            justifyContent: 'space-evenly',
          },
          // 년 월
          "& .MuiTypography-root": {
            fontSize: '28px',
            fontWeight: 'bold'
          },
          // 일 월 화 수 목 금 토
          "& .MuiTypography-caption": {
            width: '60px',
            //width: calendarSize,
            margin: 0,
            fontSize: '14px',
          },
          "& .PrivatePickersSlideTransition-root": {
            //minHeight: calendarSize * 7,
            /*marginBottom: calendarSize.dateSize*/
            height: '100%',
            overflow: 'hidden',
          },
          '& .PrivatePickersSlideTransition-root [role="row"]': {
            margin: '11px',
          },
          "& .MuiPickersDay-dayWithMargin": {
            margin: 0
          },
          "& .MuiPickersDay-root": {
            transform: 'scale(1)',
            width: '55px',
            height: '55px',
            //width: calendarSize - 4,
            //height: calendarSize - 4,
            fontSize: '16px',
          },
        }}>
          <StaticDateRangePicker
            defaultCalendarMonth={new Date(props.startTime)}
            displayStaticWrapperAs={"desktop"}
            calendars={1}
            value={value}
            showToolbar={false}
            inputFormat={"yyyy-MM-dd"}
            shouldDisableDate={(date) => {
              return false;
            }}
            onChange={(newValue) => {
              // 사용 불가 일정이 있을시 하루전 까지 이용 신청 되도록 예외 처리.
              if (newValue[0] && newValue[1]) {
                const startTime = props.startTime
                const endTime = newValue[1].getTime()
                if(props.disabled) {
                  props.disabled.some(s => {
                    const compare = new Date(s)
                    if (startTime <= compare.getTime() && compare.getTime() < endTime) {
                      newValue[1] = new Date(compare.setDate(compare.getDate() - 1))
                      addModal({
                        open: true,
                        title: '제목',
                        content: `${s}일은 사용 불가 합니다.`,
                        cancelLabel: '아니오',
                        outlined: true
                      })
                      return true;
                    }
                  })
                }

                splitTime.some(s => {
                  const compare = new Date(s)
                  if (startTime <= compare.getTime() && compare.getTime() < endTime) {
                    if (dayFormat(startTime) === dayFormat(compare.getTime())) return false;
                    newValue[1] = new Date(compare.setDate(compare.getDate()))
                    addModal({
                      open: true,
                      title: '제목',
                      content: `${s}일 까지 사용 가능 합니다.`,
                      cancelLabel: '아니오',
                      outlined: true
                    })
                    return true;
                  }
                })

                /*if (dayFormat(props.startTime) !== dayFormat(newValue[0].getTime())) {
                  addModal({open: true, isDist: true, content: `${dayFormat(props.startTime)} 시작일을 맞춰주세요`})
                  return
                }*/
              }

              setValue(newValue)
              setStartTime(newValue[0] ? newValue[0] : new Date(props.startTime))
              setEndTime(newValue[1] ? newValue[1] : new Date)
            }}
            renderDay={renderWeekPickerDay}
            renderInput={(startProps, endProps) => {
              return <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{mx: 2}}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            }}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
    <Stack>
      <Box sx={{width: "100%"}}>
        <h3>{'사용시간을 선택해주세요.'}</h3>
        <Stack sx={{borderTop: "1px solid #d7dae6", paddingTop: "20px", marginTop: '20px'}}>
          <DaySelectContents title={"시작일"} setHour={value1 => {
          }} setMinute={value1 => {
          }} date={dayFormat(props.startTime)} startTime={props.startTime} disabled
                             selectTime={['']}/>
          <HorizontalInterval size={"120px"}/>
          <DaySelectContents title={"종료일"} date={dayFormat(endTime.getTime())} selectTime={["10", "11"]}
                             setMinute={setMinute} setHour={setHour}/>
          <Stack flexDirection={"row"} alignItems={"center"} marginY={"15px"}>
            <span style={{minWidth: "65px"}}>사용시간</span>
            <HorizontalInterval size={"172px"}/>
            <Box sx={{display: "flex", alignItems: "center"}}>
              <TextField
                sx={{pr: "5px", minWidth: "120px"}}
                size={"small"} type={"number"}
                inputProps={{style: {textAlign: 'right'}}}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsgtm(Number(event.target.value))
                  endTime.setHours(hour)
                  endTime.setMinutes(minute)
                }}
              />
              <span>시간</span>
            </Box>
          </Stack>

          {/*<Stack flexDirection={"row"} alignItems={"center"} marginY={"15px"}>
            <span style={{minWidth: "65px"}}>할인적용금액</span>
            <HorizontalInterval size={"156px"}/>
            <Box sx={{display: "flex", alignItems: "center"}}>
              <TextField
                sx={{pr: "5px", minWidth: "120px"}} disabled
                size={"small"} type={"number"}
                value={(Number(props.rntfeeHour) * usgtm) - (((Number(props.rntfeeHour) * usgtm ) * (Number(props.dscntRate) / 100)))}
                inputProps={{style: {textAlign: 'right'}}}
              />
              <span>원</span>
            </Box>
          </Stack>*/}

          <Stack alignItems={"start"} marginY={"15px"}>
            <span style={{minWidth: "60px"}}>사유</span>
            {/*<HorizontalInterval size={"30px"}/>*/}
            <VerticalInterval size={'15px'}/>
            <FormControl sx={{width: "100%",}}>
              <TextField
                size={"small"} multiline
                inputProps={{style: {height: "130px", overflow: "auto"}}}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDetail(event.target.value)
                }}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Stack>
    <VerticalInterval size={'20px'}/>
    <Stack flexDirection={"row"} justifyContent={"center"}>
      <CustomButton label={"목록"} color={"outlined"} onClick={() => {
        props.onClickList()
      }}/>
      <HorizontalInterval size={"20px"}/>
      <CustomButton label={"저장"} onClick={async () => {
        await EquipmentService.putUseExtnd({
          usgtm: usgtm,
          rsndqf: detail,
          useBeginDt: props.startTime,
          useEndDt: endTime.getTime(),
          reqstId: id!.toString()
        })
        addModal({
          open: true,
          content: "기간 연장 되었습니다.",
          onConfirm: props.onClickSave,
          onClose: props.onClickSave,
        })
      }}/>
    </Stack>
  </>
}

const DaySelectContents: React.FC<{
  title: string,
  date: string,
  selectTime: string[]
  onChange?: (hour: string, minute: string) => void
  disabled?: boolean
  startTime?: number
  endTime?: Date
  setHour: Dispatch<SetStateAction<number>>
  setMinute: Dispatch<SetStateAction<number>>
}> = props => {
  const [day, setDay] = useState('');
  const date = new Date()
  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  }

  return <Box>
    <span>{props.title}</span>
    {/*<span color={'#1ccdcc'} style={{fontSize:'18px',marginLeft: "5px"}}>*</span>*/}
    <Stack flexWrap={"wrap"} flexDirection={"row"} alignItems={"center"} justifyContent={"right"}>
      <span style={{
        fontSize: '20px',
        marginBottom: '14px',
        fontFamily: 'Roboto',
        fontWeight: 500
      }}>{props.date || `${dayFormat(date.getTime())}`}</span>
      <HorizontalInterval size={"63px"}/>
      <Stack display={'flex'} flexDirection={"row"} justifyContent={'right'} alignItems={"center"}>
        {/*{props.date && <>*/}
        {
          props.disabled && <><TextField size={'small'} sx={{width: "120px", paddingX: "5px", marginBottom: '14px'}}
                                         inputProps={{style: {textAlign: 'end'}}}
                                         defaultValue={props.startTime ? dayjs(props.startTime).format('HH') : ''}
                                         disabled={props.disabled}/>
                <span style={{fontSize: '16px', marginBottom: '14px'}}>시</span>
            </>
        }
        {
          !props.disabled && <>
            {/*{props.selectTime.map((value, index) => {
                return <MenuItem value={index}>{props.selectTime[index]}시</MenuItem>
              })}
                <Select size={'small'} sx={{minWidth: "140px", marginBottom: '14px'}} disabled={props.disabled} value={day}
                        onChange={handleChange}>
                </Select>*/}
                <TextField size={"small"} disabled={props.disabled}
                           defaultValue={props.disabled ? dayjs(props.startTime).format('mm') : ''}
                           sx={{width: "120px", paddingX: "5px", marginBottom: '14px'}}
                           inputProps={{style: {textAlign: 'end'}}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setHour(Number(event.target.value))}
                />
                <span style={{fontSize: '16px', marginBottom: '14px'}}>시</span>
            </>
        }
        <HorizontalInterval size={'20px'}/>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <TextField size={"small"} disabled={props.disabled}
                     defaultValue={props.disabled ? dayjs(props.startTime).format('mm') : ''}
                     sx={{maxWidth: "100px", paddingX: "5px", marginBottom: '14px'}}
                     inputProps={{style: {textAlign: 'end'}}}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setMinute(Number(event.target.value))}
          />
          <span style={{fontSize: '16px', marginBottom: '14px'}}>분</span>
        </Box>
        {/*</>}*/}
      </Stack>
    </Stack>
  </Box>
}

const DateRangePickerDay = styled(MuiDateRangePickerDay)<{
  isHighlighting: boolean,
  isStartOfHighlighting: boolean,
  isEndOfHighlighting: boolean,
  color: string
}>`
  //border-radius: 0;
  background-color: ${props => props.isHighlighting ? '#e0e0e0' : 'white'};
  border-top-left-radius: ${props => props.isStartOfHighlighting ? '50%' : 0};
  border-bottom-left-radius: ${props => props.isStartOfHighlighting ? '50%' : 0};
  border-top-right-radius: ${props => props.isEndOfHighlighting ? '50%' : 0};
  border-bottom-right-radius: ${props => props.isEndOfHighlighting ? '50%' : 0};

  > div {
    .MuiDateRangePickerDay-day {
      color: ${props => props.color}
    }
  }
`

export default UsePeriodSelect
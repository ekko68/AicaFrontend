import * as React from "react";
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps
} from "@mui/x-date-pickers-pro/DateRangePickerDay";
import {DateRange, StaticDateRangePicker} from "@mui/x-date-pickers-pro";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {Box, Stack, TextField} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from "@mui/x-date-pickers-pro";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {dayFormat, toTimeFormat} from "shared/utils/stringUtils";
import koLocale from 'date-fns/locale/ko'
import {useGlobalModalStore} from "shared/store/GlobalModalStore";
import {random} from "shared/utils/str";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {SelectChangeEvent} from "@mui/material/Select";
import {Color} from "shared/components/StyleUtils";
import styled from "@emotion/styled";
import {Body1, Body2, Body3, Body4} from "shared/components/TextComponents";
import {ApplyEstmtPost} from "~/service/Model";

export const UsePeriodSelect: React.FC<{
  onClickSave: () => void
  onClickList: () => void
  state?: any
  setState?: Dispatch<SetStateAction<ApplyEstmtPost | undefined>>
  disableTime?: string[]
}> = props => {
  const {isDesktop, device} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [startTime, setStartTime] = useState<Date>(new Date)
  const [endTime, setEndTime] = useState<Date>(new Date)
  const [startHour, setStartHour] = useState<number>(0)
  const [startMinute, setStartMinute] = useState<number>(0)
  const [endHour, setEndHour] = useState<number>(0)
  const [endMinute, setEndMinute] = useState<number>(0)
  const disableTime = props.disableTime ? props.disableTime : ['']
  const splitTime = ["2022-07-13"]
  const {addModal} = useGlobalModalStore()
  const [calendarSize, setCalendarSize] = useState(
    device == 'mobile' ? window.screen.width / 8 : isMobile ?
      window.innerWidth / 8 : window.innerWidth / 20
  )

  useEffect(() => {
    startTime.setHours(startHour)
    startTime.setMinutes(startMinute)
    endTime.setHours(endHour)
    endTime.setMinutes(endMinute)
    if(props.setState) {
      props.setState({...props.state, useBeginDt: startTime.getTime(), useEndDt: endTime.getTime()})
    }
  }, [startHour, startMinute, endHour, endMinute])

  const handlerResize = useCallback((e) => {
    let dateSize = device == 'mobile' ? window.screen.width / 8 : window.innerWidth / 20
    if (isMobile && device == 'pc') {
      dateSize = window.innerWidth / 8
    }
    // dateSize = dateSize < 60 ? 60 : dateSize
    dateSize = dateSize > 80 ? 80 : dateSize

    setCalendarSize(dateSize)
  }, [device == 'mobile' ? window.screen.width : window.innerWidth])

  useEffect(() => {
    window.addEventListener("resize", handlerResize)
    return () => {
      window.removeEventListener("resize", handlerResize)
    }
  }, [])

  const renderWeekPickerDay = (
    date: Date,
    dateRangePickerDayProps: DateRangePickerDayProps<Date>
  ) => {
    const day = dayFormat(date.getTime())
    const today = dayFormat(Date.now())
    let color = date.getDay() == 0 ? '#ee1a1a' : date.getDay() == 6 ? Color.azul : 'black'

    if (disableTime.includes(day)) {
      color = Color.line
    } else if (dateRangePickerDayProps.isStartOfHighlighting || dateRangePickerDayProps.isEndOfHighlighting) {
      color = 'white'
    } else if (today == day) {
      color = Color.topaz
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
        <DateRangePickerDay {...dateRangePickerDayProps} color={color} disabled={disableTime.includes(day)}/>
      </Box>
    }

    //@ts-ignore
    return <DateRangePickerDay
      key={random().toString()}
      {...dateRangePickerDayProps}
      color={color}
      disabled={disableTime.includes(day)}/>
  }

  return <Stack alignItems={"center"} width={'100%'}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
      <Box
        sx={{borderRadius: '5px'}}
        marginTop={"20px"}
        style={{width: "100%", padding: "30px 20px 30px 20px"}}
        display={"flex"}
        alignItems="center"
        bgcolor={"#f5f5f5"}>
        <span>• <span style={{color: '#1ccdcc', fontWeight: 'bold'}}>*</span> 표시는 필수입력 항목입니다.</span>
      </Box>
      <VerticalInterval size={"50px"}/>
      <Stack flexDirection={isMobile ? "column" : "row"} sx={{width: "100%"}}>
        <Box sx={{
          "& .css-1tape97": {
            width: "100%",
          },
          "& > div": {
            width: "100%"
          },
          "& > div > div, & > div > div > div, & .MuiCalendarPicker-root": {
            width: "100%"
          },
          width: '100%',
          '& .MuiPickersArrowSwitcher-root': {
            justifyContent: 'space-evenly'
          },
          // 년 월
          "& .MuiTypography-root": {
            fontSize: '24px',
            fontWeight: 'bold'
          },
          // 일 월 화 수 목 금 토
          "& .MuiTypography-caption": {
            width: calendarSize,
            margin: 0,
            fontSize: '14px',
          },
          "& .PrivatePickersSlideTransition-root": {
            minHeight: calendarSize * 7,
            /*marginBottom: calendarSize.dateSize*/
          },
          '& .PrivatePickersSlideTransition-root [role="row"]': {
            margin: 0,
          },
          "& .MuiPickersDay-dayWithMargin": {
            margin: 0
          },
          "& .MuiPickersDay-root": {
            transform: 'scale(1)',
            width: calendarSize - 4,
            height: calendarSize - 4,
            fontSize: '16px',
          },
        }}>
          <StaticDateRangePicker
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
                const startTime = newValue[0].getTime()
                const endTime = newValue[1].getTime()
                disableTime.some(s => {
                  const compare = new Date(s)
                  if (startTime <= compare.getTime() && compare.getTime() < endTime) {
                    newValue[1] = new Date(compare.setDate(compare.getDate() - 1))
                    addModal({open: true, title: '제목', content: `${s}일은 사용 불가 합니다.`, buttonName: '아니오', outlined: true})
                    return true;
                  }
                })

                splitTime.some(s => {
                  const compare = new Date(s)
                  if (startTime <= compare.getTime() && compare.getTime() < endTime) {
                    if (dayFormat(startTime) == dayFormat(compare.getTime())) return false;
                    newValue[1] = new Date(compare.setDate(compare.getDate()))
                    addModal({
                      open: true,
                      title: '제목',
                      content: `${s}일 까지 사용 가능 합니다.`,
                      buttonName: '아니오',
                      outlined: true
                    })
                    return true;
                  }
                })
              }

              setValue(newValue)
              setStartTime(newValue[0] ? newValue[0] : new Date)
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
          <Box sx={{width: "100%", overflow: "hidden"}}>
            <Box sx={{borderTop: "1px solid #d7dae6"}} display={"flex"} alignItems={"center"}>
              <Box sx={{
                maxWidth: "20px",
                borderRadius: "50%",
                backgroundColor: Color.azul,
                height: "20px",
                marginTop: "20px",
                marginRight: '8px'
              }}/>
              <Body4 style={{marginTop: "20px", marginRight: '20px'}}>선택</Body4>
              <Box sx={{
                maxWidth: "20px",
                borderRadius: "50%",
                backgroundColor: Color.line,
                height: "20px",
                marginTop: "20px",
                marginRight: '8px'
              }}/>
              <Body4 style={{marginTop: "20px", marginRight: '20px'}}>예약마감</Body4>
              <Box
                sx={{
                  maxWidth: "6px", borderRadius: "50%", backgroundColor: '#222222', height: "6px", marginTop: "20px",
                  marginRight: '8px'
                }}/>
              <Body4 style={{marginTop: "20px", marginRight: '20px'}}>사용중</Body4>
            </Box>
          </Box>
        </Box>
        <HorizontalInterval size={"70px"}/>
        <Box sx={{width: "100%", marginTop: isMobile ? '40px' : 0}}>
          <Body1 bold style={{fontSize: isDesktop ? '20px' : '16px'}}>{'사용시간을 선택해주세요.'}</Body1>
          <Stack sx={{borderTop: "1px solid #d7dae6", paddingTop: "20px", marginTop: '20px'}}>
            <DaySelectContents title={"시작일"} date={dayFormat(startTime.getTime())} selectTime={["10시", "11시"]}
                               setMinute={setStartMinute} setHour={setStartHour}/>
            <VerticalInterval size={"30px"}/>
            <DaySelectContents title={"종료일"} date={dayFormat(endTime.getTime())} selectTime={["10시", "11시"]}
                               setMinute={setEndMinute} setHour={setEndHour}/>
          </Stack>
        </Box>
      </Stack>
    </LocalizationProvider>
  </Stack>
}

const DaySelectContents: React.FC<{
  title: string,
  date: string,
  selectTime: string[]
  onChange?: (hour: string, minute: string) => void
  onStartChange?: any
  onEndChange?: any
  setHour?: Dispatch<SetStateAction<number>>
  setMinute?: Dispatch<SetStateAction<number>>
}> = props => {
  /*const [day, setDay] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  }*/
  return <Box>
    <Body2 weight={500}>{props.title}</Body2>
    <Body2 color={Color.topaz} style={{marginLeft: "5px"}}>*</Body2>
    <Stack flexWrap={"wrap"} flexDirection={"row"} alignItems={"center"} justifyContent={"start"}>
      <Body1 style={{marginTop: "15px", fontFamily: 'Roboto', fontWeight: 500}}>{props.date}</Body1>
      <HorizontalInterval size={"63px"}/>
      <Stack flexDirection={"row"} alignItems={"center"} mt={"15px"}>
        <TextField size={"small"}
                   sx={{width: "120px", paddingX: "5px", marginBottom: '14px'}}
                   inputProps={{style: {textAlign: 'end'}}}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     if (props.setHour) props.setHour(Number(event.target.value));
                   }}
        />
        <span style={{fontSize: '16px', marginBottom: '14px'}}>시</span>
        {/*{props.date && <><Select size={'small'} sx={{minWidth: "140px"}} value={day} onChange={handleChange}>
          {props.selectTime.map((value, index) => {
            return <MenuItem value={index}>{props.selectTime[index]}</MenuItem>
          })}
        </Select>*/}
        <HorizontalInterval size={'20px'}/>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <TextField size={"small"}
                     sx={{maxWidth: "100px", paddingX: "5px", marginBottom: '14px'}}
                     inputProps={{style: {textAlign: 'end'}}}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                       if (props.setMinute) props.setMinute(Number(event.target.value));
                     }}
          />
          <span style={{fontSize: '16px', marginBottom: '14px'}}>분</span>
        </Box>
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
  background-color: ${props => props.isHighlighting ? Color.line : 'white'};
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
import React from "react"
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateIcon } from 'shared/components/IconComponents';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import styled from '@emotion/styled';
import { Box, SxProps } from "@mui/material";
import DateFnsUtils from "@date-io/date-fns";
// or import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ko } from "date-fns/locale";
// import dayjs from 'shared/libs/dayjs';

/* 
  작성일    :   2022/05/15
  화면명    :   공통 달력 데이터 피클
  회면ID    :   common component
  화면/개발 :   navycui
*/
const  DatePicker:React.FC<{
    pickerType: 'one' | 'two'
    questDay?:string,
    questBeginDay?:string,
    questEndDay?:string,
    changeStart?: (newTime: Date | null) => void,
    changeEnd?: (newTime: Date | null) => void,
    changeNowDate?: (newTime: Date | null) => void
}> = (props) => {
    const [val, setVal] = React.useState('오늘');
    const handleChangeStart = (newTime: Date | null) => {
        if(props.changeStart) props.changeStart(newTime)
    };
    const handleChangeEnd = (newTime: Date | null) => {
        if(props.changeEnd) props.changeEnd(newTime)
    };
    const handleChangeNowDate = (newTime: Date | null) => {
      if(props.changeNowDate) props.changeNowDate(newTime)
  };
    if(props.pickerType == 'two')
      return(
        <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
          <PickerStyle sx={{margin: '0 auto'}}>
            <DesktopDatePicker
              className='pickertime'
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              value={props.questBeginDay !== 'Invalid Date' || !!props.questBeginDay? props.questBeginDay : new Date()}
              onChange={handleChangeStart}
              renderInput={(params) => <TextField {...params} />}
              PopperProps={{
                sx: popperSx,
              }}
              components={{
                OpenPickerIcon: DateIcon
              }}
              componentsProps={{
                actionBar: {
                  actions: ['today'], 
                },
              }}
            />
            <Box className="pickertwo">~</Box>
            <DesktopDatePicker
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              value={props.questEndDay !== 'Invalid Date'  || !!props.questBeginDay ? props.questEndDay : new Date()}
              onChange={handleChangeEnd}
              renderInput={(params) => <TextField {...params} />}
              components={{
                OpenPickerIcon: DateIcon
              }}
              PopperProps={{
                sx: popperSx
              }}
              componentsProps={{
                actionBar: {
                  actions: ['today'],
                },
              }}
            />
          </PickerStyle>
        </LocalizationProvider>
      );
    
    return(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PickerStyle>
          <DesktopDatePicker
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
            value={props.questDay !== 'Invalid Date'  ? props.questDay : new Date()}
            onChange={handleChangeNowDate}
            renderInput={(params) => <TextField {...params} />}
            components={{
              OpenPickerIcon: DateIcon
            }}
            PopperProps={{
              sx: popperSx
            }}
            componentsProps={{
              actionBar: {
                actions: ['today'],
              },
            }}
          />
        </PickerStyle>
      </LocalizationProvider>
    );
  }
  export default DatePicker;

// .css-l0iinn e1de0imv0 {
//   position: fixed;
//   margin-left: 65px;
// }
// MuiButtonBase-root 
// MuiIconButton-root 
// MuiIconButton-edgeEnd 
// MuiIconButton-sizeSmall 
// MuiPickersArrowSwitcher-button 
// e1de0imv0 e1de0imv0 
// css-1ae9t7h-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button 
// e1de0imv0 {
//   padding-left: 8px;
// }
// MuiPickersArrowSwitcher-spacer css-xb7uwb-MuiPickersArrowSwitcher-spacer e1de0imv0{
//   padding-left: 207px
// }

const popperSx: SxProps = {
  "& .MuiPaper-root": {
    padding: 2,
    marginTop: 1,
    borderRadius: '10px',
    position: 'relative',
  },
  "& .css-epd502":{
    maxHeight: '380px',
  },
  "& .MuiCalendarPicker-root": {
      maxHeight: '380px',
    "& .MuiCalendarPicker-viewTransitionContainer":{
      overflow: 'hidden',
    },
    "& .css-1dozdou": {
      padding: "0 80px",
      marginTop: '8px',
    },
    "& .css-i6bazn":{
      position: 'relative',
    },
    "& .css-l0iinn": {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      "& Button":{
        display: 'none',
      },
      " .css-1v994a0": {
        marginRight: 0,
      },
    },
    "& .MuiPickersArrowSwitcher-root": {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  " .MuiDialogActions-root" :{
    position: 'absolute',
    right: 0,
    top: '23px',
    padding: '0 20px 0 0',
    " .MuiButton-root" :{
      width: '50px',
      height: '30px',
      border: '1px solid #ccc',
      fontSize: '14px',
      letterSpacing: '-0.56px',
      borderRadius: '15px',
      color: '#707070',
    },
  },
};

  const PickerStyle = styled(Stack)`
    align-items: center;
    max-width: 100%;
    flex-direction: row;
    display: flex;
    max-width: 350px;
    .MuiInputBase-root{
      height: 48px;
      padding-right: 20px;
      border:1px solid #ccc;
      .MuiOutlinedInput-notchedOutline{
        display: none;
      }
      .MuiOutlinedInput-input{
        font-family: 'Roboto';
        font-size: 15px;
        letter-spacing: -0.64px;
        padding: 11.5px 0 11.5px 20px;
        padding-left: 18px;
        font-weight: 400;
      }
    }
    .MuiFormControl-root{
      width: 160px;
    }
    .MuiFormControlLabel-root{
      flex: 0 0 48%;
      margin: 0;
      margin-bottom: 10px;
    }
    .pickertwo{
      display: inline-block;
      width: 10px;
      height: 19px;
      margin: 14px 10px;
      font-family: Roboto;
      letter-spacing: -0.64px;
      font-size: 16px;
      font-weight: 400;
      line-height: 1;
    }
    .MuiInputAdornment-root {
      margin-left: 0;
    }
    @media (min-width: 320px) and (max-width: 768px) {
    .MuiInputBase-root{
      height: 46px;
    }
    .MuiInputBase-root{
      .MuiOutlinedInput-input{
        padding: 11.5px 0 11.5px 16px;
      }
    }
  }
`

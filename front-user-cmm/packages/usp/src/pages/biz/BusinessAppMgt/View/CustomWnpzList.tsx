import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import {Box, OutlinedInput, Checkbox } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import {UsptEtcCareer, UsptWnpz} from "~/models/biz/BusinessAppMgt";

/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 수상
  회면ID    :   CustomWnpzList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomWnpzList: React.FC<{
  data:UsptWnpz
  setData: (update: UsptWnpz) => void
  setSelected: (rn: number) => void
  checkList: number[]
}> = props => {

  // 입력 저장
  const handleOnChange = (event:any) => {
      event.preventDefault();
      if (event.currentTarget == null) {
        return;
      }

    props.setData({
      ...props.data,
      [event.currentTarget.name]: event.currentTarget.value
    })
  };

  return (
    <tr>
      <td>
        <Box className="checkbox">
          <Checkbox
            value={props.checkList.includes(props.data.rn)} checked={props.checkList.includes(props.data.rn)}
            onClick={(() => {
              props.setSelected(props.data.rn)
            })}/>
        </Box>
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={props.data.wnpzNm} name='wnpzNm' onChange={handleOnChange}/></td>
      <td>
        <DatePicker
          pickerType='one'
          questDay={dayjs(props.data.acqdt,'yyyy-MM-dd').toString()}
          changeNowDate={(newTime: Date | null)=>{
            props.setData({
              ...props.data,
              acqdt: dayjs(newTime).format('YYYYMMDD')
            })
        }}
        />
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={props.data.isuInstt} name='isuInstt' onChange={handleOnChange}/></td>
    </tr>
  )
}
import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import {Box, OutlinedInput, Checkbox } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import { UsptEtcCareer} from "~/models/biz/BusinessAppMgt";

/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 프로젝트
  회면ID    :   CustomEtcCareerList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomEtcCareerPrjcList: React.FC<{
  data:UsptEtcCareer
  setData: (update: UsptEtcCareer) => void
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
  }

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
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={props.data.careerNm} name='careerNm' onChange={handleOnChange}/></td>
      <td>
        <DatePicker
          pickerType='two' 
          questBeginDay={dayjs(props.data.bgnde,'yyyy-MM-dd').toString()}
          questEndDay={dayjs(props.data.endde,'yyyy-MM-dd').toString()}
          changeStart={(startNewTime: Date | null)=>{
            props.setData({
              ...props.data,
            bgnde: dayjs(startNewTime).format('YYYYMMDD')
          })
        }}
        changeEnd={(endNewTime: Date | null)=>{
          props.setData({
            ...props.data,
            endde: dayjs(endNewTime).format('YYYYMMDD')
          })
        }}
        />
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={props.data.cn} name='cn' onChange={handleOnChange}/></td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={props.data.instt} name='instt' onChange={handleOnChange}/></td>
    </tr>
  )
}
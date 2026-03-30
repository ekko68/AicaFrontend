import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import * as styles from '../styles';
import {Box, Checkbox, OutlinedInput, MenuItem } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import {UsptAcdmcr, UsptCrqfc} from "~/models/biz/BusinessAppMgt";


/* 
  작성일    :   2022/06/30
  화면명    :   나의경력관리 -> 자격증 아이템
  회면ID    :   UI-USP-FRN-0150101
  화면/개발 :   yhkim2 / navycui
*/
export const CustomCrqfcList:React.FC<{ 
  data:UsptCrqfc
  setData: (update: UsptCrqfc) => void
  setSelected: (rn: number) => void
  checkList: number[]
}> = (props) => {

    // useEffect(()=>{
    //   setData(props.data)
    // },[props.data])
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
    <>
      <tr>
        <td><Box className="checkbox">
          <Checkbox
            value={props.checkList.includes(props.data.rn)} checked={props.checkList.includes(props.data.rn)}
            onClick={(() => {
              props.setSelected(props.data.rn)
            })}/>
        </Box></td>
        <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} name='crqfcNm' value={props.data.crqfcNm} onChange={handleOnChange}/></td>
        <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} name='grad' value={props.data.grad} onChange={handleOnChange}/></td>
        <td>
        <DatePicker
            pickerType='one'
            questDay={props.data ? dayjs(props.data.acqdt,'yyyy-MM-dd').toString() : new Date().toString()}
            changeNowDate={(newTime: Date | null)=>{
              props.setData({
                ...props.data,
                acqdt: dayjs(newTime).format('YYYYMMDD')
              })
            }}
        />
        </td>
        <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} name='athrzInstt' value={props.data.athrzInstt} onChange={handleOnChange}/></td>
      </tr>
    </>
    )
}

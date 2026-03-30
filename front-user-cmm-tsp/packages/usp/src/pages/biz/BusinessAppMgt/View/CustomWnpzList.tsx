import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import {Box, OutlinedInput, Checkbox } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import { UsptWnpz} from "~/models/biz/BusinessAppMgt";

/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 수상
  회면ID    :   CustomWnpzList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomWnpzList: React.FC<{
  data:UsptWnpz
  updateItem : any
  checkList : boolean[]
  change : any
  idx:number
}> = props => {
  // form data 저장
  const [data,setData] = useState<UsptWnpz>(props.data);
  useEffect(()=>{
    setData(props.data)
  },[props.data])
  // 입력 저장
  const handleOnChange = (event:any) => {
      event.preventDefault();
      if (event.currentTarget == null) {
        return;
      }
      setData({...data,
      [event.currentTarget.name]: event.currentTarget.value
      })
  };
  // 입력데이터 변경에 따라 부모 상태 값 변경
  useEffect(() => {
      props.updateItem(data,props.idx);
  }, [data]);

  return (
    <tr>
      <td>
        <Box className="checkbox">
        <Checkbox value={props.checkList[props.idx]||''} checked={props.checkList[props.idx]||false} onClick={(()=>{
              props.change(props.idx,!props.checkList[props.idx])
              })}/>
        </Box>
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.wnpzNm} name='wnpzNm' onChange={handleOnChange}/></td>
      <td>
        <DatePicker
          pickerType='one'
          questDay={dayjs(data.acqdt,'yyyy-MM-dd').toString()}
          changeNowDate={(newTime: Date | null)=>{
            setData({...data,
              acqdt: dayjs(newTime).format('YYYYMMDD')
            })
        }}
        />
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.isuInstt} name='isuInstt' onChange={handleOnChange}/></td>
    </tr>
  )
}
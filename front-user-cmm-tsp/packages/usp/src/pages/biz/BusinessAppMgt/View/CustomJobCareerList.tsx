import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import {Box, OutlinedInput, Checkbox } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import { UsptJobCareer} from "~/models/biz/BusinessAppMgt";

/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 경력
  회면ID    :   CustomJobCareerList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomJobCareerList: React.FC<{
  data:UsptJobCareer
  updateItem : any
  checkList : boolean[]
  change : any
  idx:number
}> = props => {
  // form data 저장
  const [data,setData] = useState<UsptJobCareer>(props.data);
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
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data ? data.wrkplc : ''} name='wrkplc' onChange={handleOnChange}/></td>
      <td>
        <DatePicker
          pickerType='two' 
          questBeginDay={data ? dayjs(data.bgnde,'yyyy-MM-dd').toString() : new Date().toString()}
          questEndDay={data ? dayjs(data.endde,'yyyy-MM-dd').toString() : new Date().toString()}
          changeStart={(startNewTime: Date | null)=>{
            setData({...data,
            bgnde: dayjs(startNewTime).format('YYYYMMDD')
          })
        }}
        changeEnd={(endNewTime: Date | null)=>{
          setData({...data,
            endde: dayjs(endNewTime).format('YYYYMMDD')
          })
        }}
        />
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data ? data.job : ''} name='job' onChange={handleOnChange}/></td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data ? data.retireResn : ''} name='retireResn' onChange={handleOnChange}/></td>
    </tr>
  )
}
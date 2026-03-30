import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import * as styles from '../styles';
import {Box, Checkbox, OutlinedInput, MenuItem } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import { UsptCrqfc } from "~/models/biz/BusinessAppMgt";


/* 
  작성일    :   2022/06/30
  화면명    :   나의경력관리 -> 자격증 아이템
  회면ID    :   UI-USP-FRN-0150101
  화면/개발 :   yhkim2 / navycui
*/
export const CustomCrqfcList:React.FC<{ 
  data:UsptCrqfc 
  updateItem : any
  checkList : boolean[]
  change : any
  i:number
}> = (props) => {
    // form data 저장
    const [data,setData] = useState<UsptCrqfc>(props.data);

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
        // props.updateItem(data,props.i);
    };
    // 입력데이터 변경에 따라 부모 상태 값 변경
    useEffect(() => {
      props.updateItem(data,props.i);
    }, [data]);
    
  return (
    <>
      <tr>
        <td><Box className="checkbox">        
          <Checkbox value={props.checkList[props.i]||''} checked={props.checkList[props.i]||false} onClick={(()=>{
            props.change(props.i,!props.checkList[props.i])
            })}/></Box></td>
        <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} name='crqfcNm' value={data.crqfcNm} onChange={handleOnChange}/></td>
        <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} name='grad' value={data.grad} onChange={handleOnChange}/></td>
        <td>
        <DatePicker
            pickerType='one'
            questDay={props.data ? dayjs(props.data.acqdt,'yyyy-MM-dd').toString() : new Date().toString()}
            changeNowDate={(newTime: Date | null)=>{
              setData({...data,
                acqdt: dayjs(newTime).format('YYYYMMDD')
              })
            }}
        />
        </td>
        <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} name='athrzInstt' value={data.athrzInstt} onChange={handleOnChange}/></td>
      </tr>
    </>
    )
}

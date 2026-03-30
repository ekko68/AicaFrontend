import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import {Box, OutlinedInput, Checkbox } from '@mui/material';
import DatePicker from '~/components/DatePicker';
import { UsptEtcCareer} from "~/models/biz/BusinessAppMgt";

/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 대외활동
  회면ID    :   CustomEtcCareerList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomEtcCareerActList: React.FC<{
  data:UsptEtcCareer
  updateItem : any
  checkList : boolean[]
  change : any
  idx:number
}> = props => {
  // form data 저장
  const [data,setData] = useState<UsptEtcCareer>(props.data);
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
//   {etcCareerId: '',careerNm: '',careerTypeCd: '',bgnde: '',endde: '',cn: '',instt: '',flag: '',rn: 0,}
  return (
    <tr>
      <td>
        <Box className="checkbox">
        <Checkbox value={props.checkList[props.idx]||''} checked={props.checkList[props.idx]||false} onClick={(()=>{
              props.change(props.idx,!props.checkList[props.idx])
              })}/>
        </Box>
      </td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.careerNm} name='careerNm' onChange={handleOnChange}/></td>
      <td>
        <DatePicker
          pickerType='two' 
          questBeginDay={dayjs(data.bgnde,'yyyy-MM-dd').toString()}
          questEndDay={dayjs(data.endde,'yyyy-MM-dd').toString()}
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
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.cn} name='cn' onChange={handleOnChange}/></td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.instt} name='instt' onChange={handleOnChange}/></td>
    </tr>
  )
}
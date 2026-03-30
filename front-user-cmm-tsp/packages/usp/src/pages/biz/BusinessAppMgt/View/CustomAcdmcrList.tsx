import React, { useEffect,useState } from "react"
import dayjs from "~/../../shared/src/libs/dayjs";
import {Box,FormControl, OutlinedInput, MenuItem, Checkbox, styled } from '@mui/material';
import Select from '@mui/material/Select';
import DatePicker from '~/components/DatePicker';
import { UsptAcdmcr} from "~/models/biz/BusinessAppMgt";
import { codeType } from "~/models/ModelCode";
import { SelectIcon } from "~/components/IconComponents";


/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 경력
  회면ID    :   CustomAcdmcr
  화면/개발 :   yhkim2 / navycui
*/
export const CustomAcdmcrList: React.FC<{
  codeList:codeType[]
  data:UsptAcdmcr
  updateItem : any
  checkList : boolean[]
  change : any
  idx:number
}> = props => {
  // form data 저장
  const [data,setData] = useState<UsptAcdmcr>(props.data);
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
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.schulNm} name='schulNm' onChange={handleOnChange}/></td>
      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} value={data.major} name='major' onChange={handleOnChange}/></td>
      <td>
        <FormControl fullWidth>
          <Select
            value={data.grdtnDivCd}
            name='grdtnDivCd'
            onChange={(e)=>{
              setData({...data,
                grdtnDivCd: e.target.value
              })
            }}
            displayEmpty
            sx={{ height: '48px'}}
            inputProps={{ 'aria-label': '전체' }}
            // IconComponent = {SelectIcon}
            IconComponent = {SelectIcon}
            MenuProps={MenuProps}
          >
            {props.codeList ? props.codeList.map((option:any,key:number) => (
              <SelectItemStyle key={key} value={option.code}>
                  {option.codeNm}
              </SelectItemStyle>
            )) : []}
          </Select>
        </FormControl>
      </td>
    </tr>
  )
}

const MenuProps = {
  PaperProps: {
      style: {
          marginTop: '5px',
          padding: '5px',
          boxShadow: 'none',
          border: '1px solid #e0e0e0', 
          borderRadius: '5px',
      },
  },
};

const SelectItemStyle = styled(MenuItem)`
  width: 100%;
  height: 44px;
  margin-bottom: 5px;
  font-size: 16px;
  letter-spacing: -0.64px;
  font-family: Noto Sans CJK KR;
  padding: 4px 12px 4px 35px;
  border-radius: 5px;
  line-height: 2.2;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
  &:first-of-type{
    margin-top: -8px;
  }
  &:last-of-type{
    margin-bottom: -8px;
  }
  &.MuiMenuItem-root{
    padding: 4px 12px 4px 35px;
    margin-bottom: 5px;
    display: block;
    text-align: left;
    &:last-of-type{
      margin-bottom: -8px;
    }
  }
  &:hover,  &:focus-visible{
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  &.Mui-selected{
    background-color: #f5f5f5;
    border-radius: 5px;
    &:hover,  &:focus-visible, &.Mui-selected{
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 14px;
    max-width: 100%;
    padding: 4px 12px 4px 20px;
    line-height: 2;
    height: 40px;
    min-height: 40px;
  }
`;
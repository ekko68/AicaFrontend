import React, { useEffect,useState } from "react"
import * as styles from '../styles';
import {Box, OutlinedInput, Checkbox, FormControl, Select, MenuItem, styled } from '@mui/material';
import {UsptEtcCareer, UsptProgrm} from "~/models/biz/BusinessAppMgt";
import { codeType } from "~/models/ModelCode";
import { SelectIcon } from "~/components/IconComponents";
import { useIsDayDisabled } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";

/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 프로그램 
  회면ID    :   CustomProgrmList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomProgrmList: React.FC<{
  GradCodeList:codeType[]
  ProgrmCodeList:codeType[]
  data:UsptProgrm
  setData: (update: UsptProgrm) => void
  setSelected: (rn: number) => void
  checkList: number[]
}> = props => {
  // form data 저장
  const [disabled,setDdisabled] = useState(true);

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
  const handleOnChangeSelect= (e:any) => {
    props.setData({
      ...props.data,
      progrmTypeCd: e.target.value
    })
}

  
  useEffect(() => {
    if(props.data.progrmTypeCd == 'ETC'){
      setDdisabled(false)
    } else {
      setDdisabled(true)
    }
  }, [props.data.progrmTypeCd]);

  return (
    <tr>
    <td className="checkbox">
      <Checkbox
        value={props.checkList.includes(props.data.rn)} checked={props.checkList.includes(props.data.rn)}
        onClick={(() => {
          props.setSelected(props.data.rn)
        })}/>
      </td>
    <td>
      <Box css={styles.inputBox}>
        <OutlinedInput value={props.data.progrmTypeInput} disabled={disabled} name='progrmTypeInput' onChange={handleOnChange} size="small" className="ipt_tp01" sx={{width:'50%'}}/>
        <FormControl sx={{ width: '100%'}}>
          <Select
            value={props.data.progrmTypeCd}
            name='progrmTypeCd'
            onChange={handleOnChangeSelect}
            displayEmpty
            sx={{ height: '48px'}}
            inputProps={{ 'aria-label': '전체' }}
            IconComponent = {SelectIcon}
            MenuProps={MenuProps}
            // IconComponent = {SelectIcon}
          >
            {props.GradCodeList ? props.GradCodeList.map((option:any,key:number) => (
              <SelectItemStyle key={key} value={option.code}>
                {option.codeNm}
              </SelectItemStyle>
            )) : []}
          </Select>
        </FormControl>
      </Box>
    </td>
    <td>
      <Box css={styles.inputBox}>
      <FormControl sx={{ width: '100%'}}>
          <Select
            value={props.data.gradTypeCd}
            name='gradTypeCd'
            onChange={(e)=>{
              props.setData({
                ...props.data,
                gradTypeCd: e.target.value
              })
            }}
            displayEmpty
            sx={{ height: '48px'}}
            inputProps={{ 'aria-label': '전체' }}
            IconComponent = {SelectIcon}
            MenuProps={MenuProps}
            // IconComponent = {SelectIcon}
          >
            {props.ProgrmCodeList ? props.ProgrmCodeList.map((option:any,key:number) => (
              <SelectItemStyle key={key} value={option.code}>
                  {option.codeNm}
              </SelectItemStyle>
            )) : []}
          </Select>
        </FormControl>
      </Box>
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
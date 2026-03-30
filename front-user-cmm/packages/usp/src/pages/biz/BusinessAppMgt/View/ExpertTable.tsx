/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Box, OutlinedInput, Checkbox, Stack, FormControl, Select, MenuItem, SelectChangeEvent, styled } from '@mui/material';
import { taskPartcptsList, usptExpertClMapng } from '~/models/Model';
import { SelectIcon } from '~/components/IconComponents';
import { useEffect } from "react";
import { useQuery } from 'react-query';
import { fetchExpertClid, fetchExpertParnts } from '~/fetches/fetchExpert';
/*
    컴포넌트: ExpertTable
    개발자  : seok
    작성일  : 20220802
*/

export const ExpertTable: React.FC<{
  data:usptExpertClMapng[];
  parents_box:any;
  childs_box:any;
  updateItem : any;
  updateItem2 : any;
  checkList : boolean[];
  change : any;
  parents : usptExpertClMapng[];
  childs : usptExpertClMapng[];
}> = props => {
    return ( 
        <>
        {props.data.map((item:any,i:number)=>(
            <ListItem 
            key={i} 
            data={item} 
            updateItem={props.updateItem} 
            updateItem2={props.updateItem2} 
            i={i} 
            check={props.checkList[i]} 
            change={props.change} 
            parents_box={props.parents_box}
            childs_box={props.childs_box}
            parent={props.parents[i].expertClId}
            child={props.childs[i].expertClId}
            />
        ))}
        </>
    );
}

export const ListItem: React.FC<{
    data:usptExpertClMapng;
    updateItem:any;
    updateItem2:any;
    i:number;
    check : boolean;
    parents_box:any;
    childs_box:any;
    change : any;
    parent : any;
    child : any;
  }> = props => {
    const data:usptExpertClMapng = props.data;
    const [number,setNumber] = useState(0);
    const handleChange1 = (event: SelectChangeEvent) => {
        const update = {"expertClId": event.target.value as string};
        props.updateItem2(update,props.i);
    };
        
    const handleChange2 = (event: SelectChangeEvent) => {
        const update = {"expertClId": event.target.value as string};
        props.updateItem(update,props.i);
    };
    const check = (i:number) =>{
        setNumber(i);
        const update = {"expertClId": props.childs_box[i][0].expertClId};
        props.updateItem(update,props.i);
    }
    console.log(props.parent)
    console.log(props.parents_box)
    console.log(props.childs_box)
      return ( 
                  <tr>
                    {data?
                    <>
                    <td><Box className="checkbox">
                        <Checkbox value={props.check||''} checked={props.check||false} onClick={(()=>{
                            props.change(props.i,!props.check)
                            })}/>
                        </Box></td>
                    <td>{props.i}</td>
                    <td>
                        <Stack direction="row" justifyContent="flex-start" spacing={1}>
                        <FormControl sx={{ width: '220px'}}>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="expertClId"
                            sx={{ height: '48px'}}
                            IconComponent = {SelectIcon}
                            onChange={handleChange1}
                            value={props.parent}
                            MenuProps={MenuProps}
                            
                            >
                            {props.parents_box?props.parents_box.map((item:any, i:number)=>(
                                <SelectItemStyle value={item.parntsExpertClId} key={i} onClick={()=>check(i)}>{item.expertClNm}</SelectItemStyle>
                            ))
                            :null}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '220px'}}>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="expertClId"
                            sx={{ height: '48px'}}
                            IconComponent = {SelectIcon}
                            onChange={handleChange2}
                            value={props.child}
                            MenuProps={MenuProps}

                            >
                            {props.childs_box[number]?props.childs_box[number].map((item:any, i:number)=>(
                                <SelectItemStyle value={item.expertClId} key={i}>{item.expertClNm}</SelectItemStyle>
                            ))
                            :null}
                            </Select>
                        </FormControl>
                        </Stack>
                    </td>
                    </>
                    :null}
                  </tr>
      );
  }
  // Swiper   //loop : true,
  SwiperCore.use([Navigation,Autoplay,Pagination]);

  const MenuProps = {
    PaperProps: {
        style: {
            minWidth: '220px',
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
    max-width: 220px;
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

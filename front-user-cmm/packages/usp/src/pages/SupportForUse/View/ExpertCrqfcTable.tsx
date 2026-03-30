/* eslint-disable jsx-a11y/alt-text */
import * as styles from '../styles';
import React, { useEffect, useState } from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Box, OutlinedInput, Checkbox } from '@mui/material';
import { applyExpertCrqfc } from '~/models/Model';
import DatePicker from '~/components/DatePicker';
import dayjs from "~/../../shared/src/libs/dayjs";
/*
    컴포넌트: ExpertCrqfcTable
    개발자  : seok
    작성실  : 20220627
*/

export const ExpertCrqfcTable: React.FC<{
  data:applyExpertCrqfc[];
  updateItem : any;
  checkList : boolean[];
  change : any;
}> = props => {
    return ( 
        <>
        {props.data.map((item:any,i:number)=>(
            <ListItem key={i} data={item} updateItem={props.updateItem} i={i} check={props.checkList[i]} change={props.change}/>
        ))}
        </>
    );
}

export const ListItem: React.FC<{
    data:applyExpertCrqfc;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:applyExpertCrqfc = props.data;
    const onChange = (event:any) => {
        if (event.currentTarget == null) {
          return;
        }
        event.preventDefault();
        const update = {...data,[event.currentTarget.name]: event.currentTarget.value};
        props.updateItem(update,props.i);

      };
    
      return ( 
        
                  <tr>
                    {data?
                    <>
                    <td>
                    <Box className="checkbox">
                    <Checkbox value={props.check||''} checked={props.check||false} onClick={(()=>{
                        props.change(props.i,!props.check)
                        })}/>
                    </Box>
                    </td>
                    <td>
                    <DatePicker
                        pickerType='one' 
                        questDay={dayjs(data.acqdt,'yyyy-MM-dd').toString()}
                        changeNowDate={(startNewTime: Date | null)=>{
                          props.updateItem({...data,
                                acqdt: dayjs(startNewTime).format('YYYYMMDD')
                            },props.i)
                        }}
                    />
                    </td>
                    <td>
                    <OutlinedInput 
                    name="crqfcNm"
                    value={data.crqfcNm}
                    onChange={onChange}
                    size="small"
                    sx={{width:'100%'}}
                    />
                    </td>
                    <td>
                    <OutlinedInput 
                    name="issuInsttNm"
                    value={data.issuInsttNm}
                    onChange={onChange}
                    size="small"
                    sx={{width:'100%'}}
                    />
                    </td>
                    </>
                    :null}
                  </tr>
      );
  }
export const MoExpertCrqfcTable: React.FC<{
  data:applyExpertCrqfc[];
  updateItem : any;
  checkList : boolean[];
  change : any;
}> = props => {
    return ( 
        <>
        {props.data.map((item:any,i:number)=>(
            <MoListItem key={i} data={item} updateItem={props.updateItem} i={i} check={props.checkList[i]} change={props.change}/>
        ))}
        </>
    );
}

export const MoListItem: React.FC<{
    data:applyExpertCrqfc;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:applyExpertCrqfc = props.data;
    const onChange = (event:any) => {
        if (event.currentTarget == null) {
          return;
        }
        event.preventDefault();
        const update = {...data,[event.currentTarget.name]: event.currentTarget.value};
        props.updateItem(update,props.i);

      };
    
      return ( 
        
        <>
        {data?
        <>
                  <tr>
                    <td>
                    <Box className="checkbox">
                    <Checkbox value={props.check||''} checked={props.check||false} onClick={(()=>{
                        props.change(props.i,!props.check)
                        })}/>
                    </Box>
                    </td>
                    <th>기간</th>
                  </tr>
                  <tr>
                    <td rowSpan={9}>
                    </td>
                    <td>
                    <DatePicker
                        pickerType='one' 
                        questDay={dayjs(data.acqdt,'yyyy-MM-dd').toString()}
                        changeNowDate={(startNewTime: Date | null)=>{
                          props.updateItem({...data,
                                acqdt: dayjs(startNewTime).format('YYYYMMDD')
                            },props.i)
                        }}
                    />
                    </td>
                  </tr>
                  <tr>
                    <th>학위</th>
                  </tr>
                  <tr>
                  <td>
                    <OutlinedInput 
                    name="crqfcNm"
                    value={data.crqfcNm}
                    onChange={onChange}
                    size="small"
                    sx={{width:'100%'}}
                    />
                    </td>
                  </tr>
                  <tr>
                    <th>학교명</th>
                  </tr>
                  <tr>
                    <td>
                    <OutlinedInput 
                    name="issuInsttNm"
                    value={data.issuInsttNm}
                    onChange={onChange}
                    size="small"
                    sx={{width:'100%'}}
                    />
                    </td>
                  </tr>
        </>
                    :null}
      </>
      );
  }
  // Swiper   //loop : true,
  SwiperCore.use([Navigation,Autoplay,Pagination]);

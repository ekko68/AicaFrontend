/* eslint-disable jsx-a11y/alt-text */
import * as styles from '../styles';
import React, { useEffect, useState } from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Box, OutlinedInput, Checkbox } from '@mui/material';
import { applyExpertCareer } from '~/models/Model';
import DatePicker from '~/components/DatePicker';
import dayjs from "~/../../shared/src/libs/dayjs";
/*
    컴포넌트: ExpertCareerTable
    개발자  : seok
    작성실  : 20220627
*/

export const ExpertCareerTable: React.FC<{
  data:applyExpertCareer[];
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
    data:applyExpertCareer;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:applyExpertCareer = props.data;
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
                        pickerType='two' 
                        questBeginDay={dayjs(data.workBgnde,'yyyy-MM-dd').toString()}
                        questEndDay={dayjs(data.workEndde,'yyyy-MM-dd').toString()}
                        changeStart={(startNewTime: Date | null)=>{
                          props.updateItem({...data,
                            workBgnde: dayjs(startNewTime).format('YYYYMMDD')
                        },props.i)
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                        props.updateItem({...data,
                            workEndde: dayjs(endNewTime).format('YYYYMMDD')
                        },props.i)
                    }}
                    />
                    </td>
                    <td>
                    <OutlinedInput 
                    name="wrcNm"
                    value={data.wrcNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                    <td>
                    <OutlinedInput 
                    name="deptNm"
                    value={data.deptNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                    <td>
                    <OutlinedInput 
                    name="ofcpsNm"
                    value={data.ofcpsNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                    <td>
                    <OutlinedInput 
                    name="chrgJobNm"
                    value={data.chrgJobNm}
                    onChange={onChange}
                    size="small" sx={{width:'100%'}}/>
                    </td>
                    </>
                    :null}
                  </tr>
      );
  }
export const MoExpertCareerTable: React.FC<{
  data:applyExpertCareer[];
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
    data:applyExpertCareer;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:applyExpertCareer = props.data;
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
                    <th>근무기간</th>
                  </tr>
                  <tr>
                    <td rowSpan={9}>
                    </td>
                    <td>
                    <DatePicker
                        pickerType='two' 
                        questBeginDay={dayjs(data.workBgnde,'yyyy-MM-dd').toString()}
                        questEndDay={dayjs(data.workEndde,'yyyy-MM-dd').toString()}
                        changeStart={(startNewTime: Date | null)=>{
                          props.updateItem({...data,
                            workBgnde: dayjs(startNewTime).format('YYYYMMDD')
                        },props.i)
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                        props.updateItem({...data,
                            workEndde: dayjs(endNewTime).format('YYYYMMDD')
                        },props.i)
                    }}
                    />
                    </td>
                  </tr>
                  <tr>
                    <th>직장명</th>
                  </tr>
                  <tr>
                    <td>
                    <OutlinedInput 
                    name="wrcNm"
                    value={data.wrcNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                  </tr>
                  <tr>
                    <th>부서명</th>
                  </tr>
                  <tr>
                    <td>
                    <OutlinedInput 
                    name="deptNm"
                    value={data.deptNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                  </tr>
                  <tr>
                    <th>직위</th>
                  </tr>
                  <tr>
                    <td>
                    <OutlinedInput 
                    name="ofcpsNm"
                    value={data.ofcpsNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                  </tr>
                  <tr>
                    <th>담당업무</th>
                  </tr>
                  <tr>
                    <td>
                    <OutlinedInput 
                    name="chrgJobNm"
                    value={data.chrgJobNm}
                    onChange={onChange}
                    size="small" sx={{width:'100%'}}/>
                    </td>
                  </tr>
                    </>
                    :null}
          </>

                  
      );
  }
  // Swiper   //loop : true,
  SwiperCore.use([Navigation,Autoplay,Pagination]);

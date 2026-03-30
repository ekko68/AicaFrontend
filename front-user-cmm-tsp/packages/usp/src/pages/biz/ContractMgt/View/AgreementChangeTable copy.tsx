/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Box, OutlinedInput, Checkbox } from '@mui/material';
import { taskPartcptsList } from '~/models/Model';
/*
    컴포넌트: AgreementChange
    개발자  : seok
    작성일  : 20220809
*/

export const AgreementChangeTable: React.FC<{
  data:taskPartcptsList[];
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
    data:taskPartcptsList;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:taskPartcptsList = props.data;
    const onChange = (event:any) => {
        if (event.currentTarget == null) {
          return;
        }
        event.preventDefault();
        const update = {...props.data,[event.currentTarget.name]: event.currentTarget.value};
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
          <td className="text lf">
            {'참여 A 기업'}
          </td>
          <td>
            <OutlinedInput 
              name='partcptsNm'
              value={data.partcptsNm}
              onChange={onChange}
              size="small" className="ipt_tp01" sx={{width:'100%'}} />
          </td>
          <td>
          <OutlinedInput 
          name="chrgRealmNm"
          value={data.chrgRealmNm}
          onChange={onChange}
          size="small" className="ipt_tp01" sx={{width:'100%'}} />
          </td>
          <td>
          <OutlinedInput 
          name="mbtlnum"
          value={data.mbtlnum}
          onChange={onChange}
          size="small" className="ipt_tp01" sx={{width:'100%'}} />
          </td>
          <td>
          <OutlinedInput 
          name="brthdy"
          value={data.brthdy}
          onChange={onChange}
          size="small" className="ipt_tp01" sx={{width:'100%'}} />
          </td>
          <td>
          <OutlinedInput 
          name="partcptnRate"
          value={data.partcptnRate}
          onChange={onChange}
          size="small" className="ipt_tp01" sx={{width:'100%'}} />
          </td>
          </>
          :null}
        </tr>
      );
  }

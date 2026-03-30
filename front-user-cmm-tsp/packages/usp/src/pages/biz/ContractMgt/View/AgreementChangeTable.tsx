/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Box, OutlinedInput, Checkbox, FormControl, SelectChangeEvent } from '@mui/material';
import { CustomSelect } from '~/components/SelectBoxComponents';
/*
    컴포넌트: AgreementChange
    개발자  : seok
    작성일  : 20220809
*/

export const AgreementChangeTable: React.FC<{
  data:any;
  updateItem : any;
  checkList : boolean[];
  change : any;
}> = props => {
    return ( 
        <>
        {props.data?.map((item:any,i:number)=>(
            <ListItem key={i} data={item} updateItem={props.updateItem} i={i} check={props.checkList[i]} change={props.change}/>
        ))}
        </>
    );
}
export const ListItem: React.FC<{
    data:any;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:any = props.data;
    const onChange = (event:any) => {
        if (event.currentTarget == null||props.data== null) {
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
          {/* <td className="text lf">
            {data?.entrpsNm}
          </td> */}
          <td>
            <OutlinedInput 
              name='entrpsNm'
              value={props.data?.entrpsNm}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name='rspnberNm'
              value={props.data?.rspnberNm}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="clsfNm"
              value={props.data?.clsfNm}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="encMbtlnum"
              value={props.data?.encMbtlnum}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="encTelno"
              value={props.data?.encTelno}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="encEmail"
              value={props.data?.encEmail}
              onChange={onChange}
            />
          </td>
          </>
          :null}
        </tr>
      );
  }
export const AgreementChangeTable2: React.FC<{
  data:any;
  updateItem : any;
  checkList : boolean[];
  change : any;
}> = props => {
    return ( 
        <>
        {props.data?.map((item:any,i:number)=>(
            <ListItem2 key={i} data={item} updateItem={props.updateItem} i={i} check={props.checkList[i]} change={props.change}/>
        ))}
        </>
    );
}
export const ListItem2: React.FC<{
    data:any;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:any = props.data;
    const [histId, setHistId] = useState<string>();
    const onChange = (event:any) => {
        if (event.currentTarget == null||props.data== null) {
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
          {/* <td className="text lf">
            {data?.entrpsNm}
          </td> */}
          <td>
            <FormControl fullWidth>
              <CustomSelect value={props.data?.entrpsNm} data={[{code:"01",codeNm:"01"}, {code:"02",codeNm:"02"}]} 
                onClick={(selected) => {
                  setHistId(selected)
                }}
              />
            </FormControl>
          </td>
          <td>
            <OutlinedInput 
              name='partcptsNm'
              value={props.data?.partcptsNm}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="chrgRealmNm"
              value={props.data?.chrgRealmNm}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="encMbtlnum"
              value={props.data?.encMbtlnum}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="encBrthdy"
              value={props.data?.encBrthdy}
              onChange={onChange}
            />
          </td>
          <td>
            <OutlinedInput 
              name="partcptnRate"
              value={props.data?.partcptnRate}
              onChange={onChange}
            />
          </td>
          </>
          :null}
        </tr>
      );
  }

export const AgreementChangeTable3: React.FC<{
  data:any;
  updateItem : any;
}> = props => {
    return ( 
        <>
        {props.data?.map((item:any,i:number)=>(
            <ListItem3 key={i} data={item} updateItem={props.updateItem} i={i}/>
        ))}
        </>
    );
}
export const ListItem3: React.FC<{
    data:any;
    updateItem:any;
    i:number;
  }> = props => {
    const data:any = props.data;
    const onChange = (event:any) => {

        event.preventDefault();
        const update = {...props.data,[event.currentTarget.name]: Number(uncomma2(event.currentTarget.value))};
        props.updateItem(update,props.i);
      };
      return (               
      <dl className='horz'>
      <dt>사업비</dt>
      <dd>
        {data?
        <div className='tableDefault_scroll'>
          <table className="tableDefault type5">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th rowSpan={2}>사업년도</th>
                <th rowSpan={2}>지원금</th>
                <th colSpan={3}>민간부담금</th>
                <th rowSpan={2}>합계</th>
              </tr>
              <tr>
                <th>현금</th>
                <th>현물</th>
                <th>소계</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tar">
                {props.data?.bsnsYear}
                </td>
                <td className="tar">
                <OutlinedInput 
                  name='sportBudget'
                  value={inputPriceFormat(props.data?.sportBudget)}
                  onChange={onChange}
                  />  
                </td>
                <td className="tar">
                <OutlinedInput 
                  name='alotmCash'
                  value={inputPriceFormat(props.data?.alotmCash)}
                    onChange={onChange}
                    />  
                </td>
                <td className="tar">
                <OutlinedInput 
                  name='alotmActhng'
                  value={inputPriceFormat(props.data?.alotmActhng)}
                  onChange={onChange}
                />  
                </td>
                <td className="tar">
                <OutlinedInput 
                  name='alotmSum'
                  value={inputPriceFormat(props.data?.alotmSum)}
                    onChange={onChange}
                    />  
                </td>
                <td className="tar">
                <OutlinedInput 
                  name='alotmSumTot'
                  value={inputPriceFormat(props.data?.alotmSumTot)}
                    onChange={onChange}
                    />  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        :null}
      </dd>
      </dl>
      );
  }

  export const AgreementBeforeTable: React.FC<{
    data:any;
    updateItem? : any;
    // checkList? : boolean[];
    // change? : any;
  }> = props => {
      return ( 
          <>
          {props.data?.map((item:any,i:number)=>(
              <BeforeListItem key={i} data={item} updateItem={props.updateItem} i={i}/>
          ))}
          </>
      );
  }
  export const BeforeListItem: React.FC<{
      data:any;
      updateItem?:any;
      i:number;
      // check? : boolean;
      // change? : any;
    }> = props => {
      const data:any = props.data;
        return ( 
          <tr>
            {data?
            <>
            <td>
            <Box className="checkbox">
              <Checkbox/>
            </Box>
            </td>
            <td className="text lf">{data?.entrpsNm}</td>
            <td>{data?.rspnberNm}</td>
            <td>{data?.clsfNm}</td>
            <td>{data?.encTelno}</td>
            <td>{data?.encencMbtlnum}</td>
            <td>{data?.encEmail}</td>
            </>
            :null}
          </tr>
        );
    }

    export const AgreementBeforeTable02: React.FC<{
      data:any;
      updateItem? : any;
      // checkList? : boolean[];
      // change? : any;
    }> = props => {
        return ( 
            <>
            {props.data?.map((item:any,i:number)=>(
                <BeforeListItem02 key={i} data={item} updateItem={props.updateItem} i={i}/>
            ))}
            </>
        );
    }
    export const BeforeListItem02: React.FC<{
        data:any;
        updateItem?:any;
        i:number;
        // check? : boolean;
        // change? : any;
      }> = props => {
        const data:any = props.data;
          return ( 
            <tr>
              {data?
              <>
              <td>
              <Box className="checkbox">
                <Checkbox/>
              </Box>
              </td>
              <td className="text lf">{data?.entrpsNm}</td>
              <td>{data?.partcptsNm}</td>
              <td>{data?.chrgRealmNm}</td>
              <td>{data?.encMbtlnum}</td>
              <td>{data?.encBrthdy}</td>
              <td>{data?.partcptnRate}</td>
              </>
              :null}
            </tr>
          );
      }

      export const inputPriceFormat = (str:any) => {
        const comma = (str:any) => {
          str = String(str);
          return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
        };
        const uncomma = (str:any) => {
          str = String(str);
          return str.replace(/[^\d]+/g, "");
        };
        return comma(uncomma(str));
      };
      
      export const uncomma2 = (str:any) => {
        str = String(str);
        return str.replace(/[^\d]+/g, "");
      };
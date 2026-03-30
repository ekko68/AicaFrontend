/* eslint-disable jsx-a11y/alt-text */
import * as styles from '../styles';
import React, { useEffect, useState } from 'react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import { Box, OutlinedInput, Checkbox, FormControl, Select, MenuItem, SelectChangeEvent, styled } from '@mui/material';
import { applyExpertAcdmcr } from '~/models/Model';
import DatePicker from '~/components/DatePicker';
import dayjs from "~/../../shared/src/libs/dayjs";
import { SelectIcon } from '~/components/IconComponents';
import { useQueries } from 'react-query';
import { fetchGetCommCode } from '~/fetches';
/*
    컴포넌트: ExpertAcdmcrTable
    개발자  : seok
    작성실  : 20220627
*/

export const ExpertAcdmcrTable: React.FC<{
  data:applyExpertAcdmcr[];
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
    data:applyExpertAcdmcr;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:applyExpertAcdmcr = props.data;
    const userQueries:any = useQueries(
      [
        'DGRI',     // 학위
        'GRDTN_DIV',   // 졸업구분
      ].map(TermsType => {
        return {
          queryKey: [TermsType],
          queryFn: () => fetchGetCommCode(TermsType),
        }
      })
    )
    const onChange = (event:any) => {
        if (event.currentTarget == null) {
          return;
        }
        event.preventDefault();
        const update = {...data,[event.currentTarget.name]: event.currentTarget.value};
        props.updateItem(update,props.i);
      };

      const handleChangeSelect = (event: SelectChangeEvent) => {
        // setAge(event.target.value as string);
        const update = { ...data, [event.target.name as string]: event.target.value as string }
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
                        questBeginDay={dayjs(data.acdmcrBgnde,'yyyy-MM-dd').toString()}
                        questEndDay={dayjs(data.acdmcrEndde,'yyyy-MM-dd').toString()}
                        changeStart={(startNewTime: Date | null)=>{
                          props.updateItem({...data,
                            acdmcrBgnde: dayjs(startNewTime).format('YYYYMMDD')
                        },props.i)
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                      props.updateItem({...data,
                            acdmcrEndde: dayjs(endNewTime).format('YYYYMMDD')
                        },props.i)
                    }}
                    />
                    </td>
                    <td>
                    <FormControl sx={{ width: '146.8px'}}>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            IconComponent = {SelectIcon}
                            onChange={handleChangeSelect}
                            name="dgriCd"
                            value={data.dgriCd}
                            MenuProps={MenuProps}
                            >
                          {
                            (userQueries[0].status === 'success') ?
                              userQueries[0].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
                              ))
                            : null

                          }
                            </Select>
                    </FormControl> 
                    </td>
                    <td>
                    <OutlinedInput 
                    name="schulNm"
                    value={data.schulNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                    <td>
                    <OutlinedInput 
                    name="majorNm"
                    value={data.majorNm}
                    onChange={onChange}
                    size="small"/>
                    </td>
                    <td>
                    <OutlinedInput 
                    name="profsrNm"
                    value={data.profsrNm}
                    onChange={onChange}
                    size="small" />
                    </td>
                    <td>
                    <FormControl sx={{ width: '146.8px'}}>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            onChange={handleChangeSelect}
                            name="grdtnDivCd"
                            value={data.grdtnDivCd}
                            IconComponent = {SelectIcon}
                            MenuProps={MenuProps}
                            >
                          {
                            (userQueries[1].status === 'success') ?
                              userQueries[1].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
                              ))
                            : null

                          }
                            </Select>
                    </FormControl> 
                    </td>
                    </>
                    :null}
                  </tr>
      );
  }
export const MoExpertAcdmcrTable: React.FC<{
  data:applyExpertAcdmcr[];
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
    data:applyExpertAcdmcr;
    updateItem:any;
    i:number;
    check : boolean;
    change : any;
  }> = props => {
    const data:applyExpertAcdmcr = props.data;
    const userQueries:any = useQueries(
      [
        'DGRI',     // 학위
        'GRDTN_DIV',   // 졸업구분
      ].map(TermsType => {
        return {
          queryKey: [TermsType],
          queryFn: () => fetchGetCommCode(TermsType),
        }
      })
    )
    const onChange = (event:any) => {
        if (event.currentTarget == null) {
          return;
        }
        event.preventDefault();
        const update = {...data,[event.currentTarget.name]: event.currentTarget.value};
        props.updateItem(update,props.i);
      };

      const handleChangeSelect = (event: SelectChangeEvent) => {
        // setAge(event.target.value as string);
        const update = { ...data, [event.target.name as string]: event.target.value as string }
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
          <td rowSpan={11}>
          </td>
          <td>
          <DatePicker
              pickerType='two' 
              questBeginDay={dayjs(data.acdmcrBgnde,'yyyy-MM-dd').toString()}
              questEndDay={dayjs(data.acdmcrEndde,'yyyy-MM-dd').toString()}
              changeStart={(startNewTime: Date | null)=>{
                props.updateItem({...data,
                  acdmcrBgnde: dayjs(startNewTime).format('YYYYMMDD')
              },props.i)
          }}
          changeEnd={(endNewTime: Date | null)=>{
            props.updateItem({...data,
                  acdmcrEndde: dayjs(endNewTime).format('YYYYMMDD')
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
          <FormControl sx={{ width: '146.8px'}}>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  IconComponent = {SelectIcon}
                  onChange={handleChangeSelect}
                  name="dgriCd"
                  value={data.dgriCd}
                  MenuProps={MenuProps}
                  >
                {
                  (userQueries[0].status === 'success') ?
                    userQueries[0].data.list.map((option:any) => (
                      <SelectItemStyle key={option.code} value={option.code}>
                        {option.codeNm}
                      </SelectItemStyle>
                    ))
                  : null

                }
                  </Select>
          </FormControl> 
          </td>
        </tr>
        <tr>
          <th>학교명</th>
        </tr>
        <tr>
          <td>
          <OutlinedInput 
          name="schulNm"
          value={data.schulNm}
          onChange={onChange}
          size="small"/>
          </td>
        </tr>
        <tr>
          <th>전공</th>
        </tr>
        <tr>
          <td>
          <OutlinedInput 
          name="majorNm"
          value={data.majorNm}
          onChange={onChange}
          size="small"/>
          </td>
        </tr>
        <tr>
          <th>지도교수</th>
        </tr>
        <tr>
          <td>
          <OutlinedInput 
          name="profsrNm"
          value={data.profsrNm}
          onChange={onChange}
          size="small" />
          </td>
        </tr>
        <tr>
          <th>졸업구분</th>
        </tr>
        <tr>
          <td>
          <FormControl sx={{ width: '146.8px'}}>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  onChange={handleChangeSelect}
                  name="grdtnDivCd"
                  value={data.grdtnDivCd}
                  IconComponent = {SelectIcon}
                  MenuProps={MenuProps}
                  >
                {
                  (userQueries[1].status === 'success') ?
                    userQueries[1].data.list.map((option:any) => (
                      <SelectItemStyle key={option.code} value={option.code}>
                        {option.codeNm}
                      </SelectItemStyle>
                    ))
                  : null

                }
                  </Select>
          </FormControl> 
          </td>
        </tr>
        </>
                    :null}
      </>
      );
  }
  // Swiper   //loop : true,
  SwiperCore.use([Navigation,Autoplay,Pagination]);

  
  const MenuProps = {
    PaperProps: {
        style: {
            minWidth: '150px',
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
    min-width: 120px;
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
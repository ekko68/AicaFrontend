/* eslint-disable jsx-a11y/alt-text */
import React, { useState,useEffect, useCallback, useReducer } from 'react';
import { CodeType } from "../pages/Notice/NoticeModel";
import {FormControl, Radio, RadioGroup, styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup} from "@mui/material";
import { CSSProperties } from '@mui/styles';
import { allCkCode } from '~/models/Model';


export const CustomCheckBoxs: React.FC<{
    checkbox?: CodeType[];
    row?: boolean;
    justifyContent?: 'center' | 'right' | 'left';
    children?: React.ReactNode;
    onClick?: (selected: string[]) => void;
  }> = (props) => {
    
    const [selected, setSelected] = useState<string[]>([]);
  
    useEffect(() => {
      if (props.onClick) props.onClick(selected);
    }, [selected]);
  
    const handlerCheck = (label: string) => {
      const selectedIndex = selected.indexOf(label);
      let newSelected: string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, label);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    };
  
    return (
      <FormControl>
        <FormGroup
          row={props.row}
          style={{
            justifyContent: props.justifyContent,
          }}
        >
        <FormControlLabel
          control={
            <CheckboxStyle
              // {...m}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handlerCheck('');
              }}
            />
          }
          label={'전체'}
        />
          {!!props.checkbox ? props.checkbox.map((m, i) => {
            return (
              <FormControlLabel
                key={i}
                control={
                  <CheckboxStyle
                    // {...m}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handlerCheck(m.code);
                    }}
                  />
                }
                label={m.codeNm}
              />
            );
          }) : []}
          {props.children}
        </FormGroup>
      </FormControl>
    );
  };

  export const NoticeCheckBoxs: React.FC<{
    checkbox?: any;
    row?: boolean;
    justifyContent?: 'center' | 'right' | 'left';
    children?: React.ReactNode;
    onClick?: (selected: string[]) => void;
    onChangeBox?:(data: any) => void;
  }> = (props) => {
    const [dataBox,setDataBox]  = useState<any>([]);
    const [selectedBox, setSelectedBox] = useState<string[]>([]);
    const [checkAll,setCheckAll]  = useState(false);
    const [selected, setSelected] = useState<boolean[]>([]);

    const handlerCheck = (label: string) => {
      const selectedIndex = selectedBox.indexOf(label);
      let newSelected: string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedBox, label);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedBox.slice(1));
      } else if (selectedIndex === selectedBox.length - 1) {
        newSelected = newSelected.concat(selectedBox.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedBox.slice(0, selectedIndex),
          selectedBox.slice(selectedIndex + 1)
        );
      }
      setSelectedBox(newSelected);
    };

    useEffect(() => {
      if(!!dataBox){
        let selectBox:boolean[] = [...selected];
          for(let i =selected.length; i<dataBox.length; i++){
            selectBox = selectBox.concat(false);
          }
          setSelected(selectBox)
      }
    }, [dataBox]);

    useEffect(() => {
      if (props.onClick){
        props.onClick(selectedBox);
      } 
    }, [selectedBox]);
    console.log('useEffect')
    // data 초기화
    useEffect(() => {
      if(!!props.checkbox){
        let allVal:string[] = [];
        props.checkbox.map((item:any,i:number)=>{
          allVal.push(item.code)
        })
        setDataBox(props.checkbox)
      }      
    }, []);

    return (
      <FormControl>
        <FormGroup
          row={props.row}
          style={{
            justifyContent: props.justifyContent,
          }}
        >
          <FormControlLabel 
            control={
            <CheckboxStyle checked={checkAll} 
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                let update = [...selected];
                if(checkAll===false){
                  for(let i =0; i<selected.length; i++){
                    update[i] = true;
                  }
                  // setSelectedBox(imsiBox)
                }else if(checkAll===true){
                  for(let i =0; i<selected.length; i++){
                    update[i] = false;
                  }
                  // setSelectedBox([])
                }
                setSelected(update);
                setCheckAll(!checkAll);
              }}
              />} 
            label="전체" />
        </FormGroup>
        <FormGroup
          row={props.row}
          style={{
            justifyContent: props.justifyContent,
          }}
        >
          {!!dataBox ? dataBox.map((m:any, i:number) => {
            return (
              <FormControlLabel
                key={i}
                control={
                  <CheckboxStyle
                    // {...m}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handlerCheck(m.code);
                    }}
                    value={selected[i] || ''} 
                    checked={selected[i] || false}
                    onChange={((e)=>{
                      // handlerCheck(m.code)
                      //체크 값 변경
                      let k = e.target.checked;
                        let update = [...selected];
                        update[i] = k;
                        setSelected(update); 
                        if(k===false){
                          setCheckAll(false)
                        }
                        let b = 0;
                        for(let i =0; i<selected.length; i++){
                          if(update[i]===true){
                            b++;
                          }
                        }
                        if(b===selected.length){
                          setCheckAll(true)   
                        }
                    })}
                  />
                }
                label={m.codeNm}
              />
            );
          }) : []}
          {props.children}
        </FormGroup>
      </FormControl>
    );
  };

  export const CustomRadioButtons: React.FC<{
    data?: any[]
    row?: boolean
    val?:string
    viewId?:string
    justifyContent?: 'center' | 'right' | 'left'
    style?: CSSProperties;
    onClick?: (selected: string) => void;
  }> = (props) => {
    const [value, setValue] = useState<string>('');
  
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('handlerChange - ' + value)
      setValue((event.target as HTMLInputElement).value);
      if (props.onClick) props.onClick((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
      if(!!props.val){
        setValue(props.val)
      }
    }, []);
   return (
      <FormControl>
        <RadioGroup row={true} defaultValue={value} onChange={handlerChange}>
        {
          !!props.viewId ? props.viewId == '군필여부' ? null : 
          
            <FormControlLabel value='' control={<RadioStyle />} label='전체' />
          : 
            <FormControlLabel value='' control={<RadioStyle />} label='전체' />
          
        }

          {!!props.data ? props.data.map((m:any, i:any) => {
            return (
              <FormControlLabel key={i} value={m.code} control={<RadioStyle />} label={m.codeNm} />
            );
          }) : ''}
        </RadioGroup>
      </FormControl>
    );
  };

  export const NoticeRadioButtons: React.FC<{
    data: string[];
    row?: boolean;
    justifyContent?: 'center' | 'right' | 'left';
    style?: CSSProperties;
    onClick?: (selected: string) => void;
  }> = (props) => {
    const [value, setValue] = useState(props.data[0]);
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
      if (props.onClick) props.onClick(event.target.value);
    };
  
    return (
      <FormControl>
        <RadioGroup row={props.row} value={value} onChange={handlerChange}>
          {props.data.map((m, i) => {
            return (
              <FormControlLabel
                key={i}
                value={m}
                control={<RadioStyle />}
                label={m}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  };
  
  const RadioStyle = styled(Radio)`
  padding: 0;
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin-right: 6px;
    border-radius: 100%;
    path {
      display: none;
    }
  }
  &.Mui-checked {
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      margin: -5px 0 0 -8px;
      border-radius: 100%;
      background-color: #4063ec;
    }
    .MuiSvgIcon-root {
      position: relative;
      border-color: #4063ec;
      &[data-testid='RadioButtonCheckedIcon'] {
        display: none;
      }
    }
  }
`;

  export const CheckboxStyle = styled(Checkbox)`
  padding: 0;
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin-right: 6px;
    border-radius: 100%;
    path {
      display: none;
    }
  }
  &.Mui-checked {
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      margin: -5px 0 0 -8px;
      border-radius: 100%;
      background-color: #4063ec;
    }
    .MuiSvgIcon-root {
      position: relative;
      border-color: #4063ec;
      &[data-testid='RadioButtonCheckedIcon'] {
        display: none;
      }
    }
  }
`;
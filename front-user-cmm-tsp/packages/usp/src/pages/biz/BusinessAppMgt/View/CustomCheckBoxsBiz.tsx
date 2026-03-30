
import * as styles from '../styles';
import React, { useState,useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {TermsResponse } from '~/models/Model';
import styled from '@emotion/styled';
import { FormGroup, FormHelperText } from '@mui/material';

export const CustomCheckBoxsBiz: React.FC<{
    checkbox: TermsResponse[];
    isAll?:boolean
    isValid?: boolean
    row?: boolean;
    justifyContent?: 'center' | 'right' | 'left';
    children?: React.ReactNode;
    // style?: CSSProperties;
    onClick?: (selected: string[]) => void
    setValidationBox:any;
  }> = (props) => {
    const [selected, setSelected] = useState<string[]>([]);
  
    useEffect(() => {
      if (props.onClick) props.onClick(selected);
    }, [selected]);
  
    useEffect(() => {
      let strBox:string[] = [];
        if(props.isAll){
          props.checkbox.map((m,k)=>{
            strBox = strBox.concat(m.termsType + "_" + m.required +  "_" +  k);
          })
          setSelected(strBox)
          console.log(strBox)
          props.setValidationBox(strBox);
        } else if(!props.isAll && selected.length == props.checkbox.length){
          setSelected([])
        }
      
    }, [props.isAll]);
  
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
      <Fragment>
        {props.checkbox.map((m, i) => {
          return (
            <Box className="agree" key={i}>
            <FormGroup>
              <FormControlLabel control={
                    <Checkbox checked={selected.includes(m.termsType + "_" + m.required +  "_" +  i)}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        handlerCheck(m.termsType + "_" + m.required +  "_" +  i)
                      }}/>
                  }
              id={m.termsType + "_" + m.required +  "_" +  i}
              label={<>{m.termsTypeNm+" "} <span className="color_primary">(필수)</span></>}
              className="checkbox" 
              />
            </FormGroup>
            <Box className="agreeBox" mt={1.7}>
              <Box className="inner">
              {m.termsCn}
              </Box>
            </Box>
            {props.isValid?<FormHelperText error={props.isValid}>"개인정보 수집 및 활용 동의해주세요."</FormHelperText>:null}
            </Box>
          );
        })}
      </Fragment>
    );
  };

  const CheckboxStyle = styled(Checkbox)`
  &.MuiCheckbox-root{
    padding: 0;
    margin-right: 10px;
  }
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 4px;
    path {
      display: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border-radius: 3px;
  }
  &.Mui-checked {
    &:before {
      border: none;
      background-color: #4063ec;
      background:  url('/images/common/checkbox_active.png');
    }
    .MuiSvgIcon-root{
      background: none;
    }
  }
`;
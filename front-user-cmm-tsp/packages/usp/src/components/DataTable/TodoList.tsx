import React, {CSSProperties, useEffect, useState} from 'react';
import {Box, FormControlLabel, FormGroup, IconButton} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CheckboxStyle } from '~/components/TableComponents';
import { DefaultCheckBoxProps } from '~/components/ButtonComponents';
import { PlusIcon, TrashIcon } from "~/components/IconComponents";
/*
    공통 컴포넌트: todo list 
    작성 : navycui
*/ 
export const CustomTodoList: React.FC<{
    dataList: DefaultCheckBoxProps[];                       // 데이터 전달
    row?: boolean;
    justifyContent?: 'center' | 'right' | 'left';
    children?: React.ReactNode;
    style?: CSSProperties;
    onChangeBox?: (dataBox: DefaultCheckBoxProps[]) => void; // 데이터 반환
  }> = (props) => {
    const [selected, setSelected] = useState<boolean[]>([]);
    const [checkAll,setCheckAll]  = useState<boolean>(false);
    const [dataBox,setDataBox]  = useState<DefaultCheckBoxProps[]>();
    
    // data 초기화
    useEffect(() => {
      if(!!props.dataList){
        setDataBox(props.dataList)
      }
    }, []);

    // 선택한 data 변경 시
    useEffect(() => {
      if(!!dataBox){
        let selectBox:boolean[] = [...selected];
          for(let i =selected.length; i<dataBox.length; i++){
            selectBox = selectBox.concat(false);
          }
          setSelected(selectBox)
          if(props.onChangeBox) props.onChangeBox(dataBox);
      }
    }, [dataBox]);

    return (
      <FormControl>
        <FormGroup
          row={props.row}
          style={{
            justifyContent: props.justifyContent,
            ...props.style,
          }}
        >
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
          <FormControlLabel
            label="addItem"
            control={
              <IconButton 
                value='button' 
                onClick={() => {
                  if(!!dataBox){
                    setDataBox((pre:any)=>([...pre,{ label: 'Todo new item' }]))
                    setCheckAll(false);
                  }
                }} 
                >
                <PlusIcon />
              </IconButton>
            }
          />
          <FormControlLabel
            label="removeItem"
            control={
              <IconButton 
                value='button' 
                onClick={() => {
                  if(checkAll===true){
                    setDataBox([{ label: 'Todo new item' }]);
                    setCheckAll(false)
                    setSelected([false])
                  }else{
                    if(!!dataBox){
                      const upBox = [...dataBox];
                      const upSelete = [...selected];
                      if(!!dataBox){
                        for(let i=dataBox.length-1; i>-1; i--){
                          if(selected[i]===true){
                            upBox.splice(i,1);
                            setDataBox(upBox)
                            upSelete.splice(i,1);
                            setSelected(upSelete);
                          }
                        }
                      }
                    }
                  }
                }} 
              >
                <TrashIcon />
              </IconButton>
          }
          />
        </Box>
          <FormControlLabel 
            label={'전체 선택'}
            control={
              <CheckboxStyle
                checked={checkAll}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  let update = [...selected];
                  if(checkAll===false){
                    for(let i =0; i<selected.length; i++){
                      update[i] = true;
                    }
                  }else if(checkAll===true){
                    for(let i =0; i<selected.length; i++){
                      update[i] = false;
                    }
                  }
                  setSelected(update);
                  setCheckAll(!checkAll);
                }}
              />
            }
          />
          {dataBox ? dataBox.map((m, i) => {
            return (
              <FormControlLabel
                key={i}
                control={
                  <CheckboxStyle
                    {...m}
                    value={selected[i] || ''} 
                    checked={selected[i] || false}
                    onChange={((e)=>{
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
                label={m.label}
              />
            );
          }): null}
          {props.children}
        </FormGroup>
      </FormControl>
    );
  };
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import * as styles from '~/styles/styles';
import Stack from '@mui/material/Stack';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import Chip from '@mui/material/Chip';
import { CustomButton } from '~/components/ButtonComponents';
import { DeletIcon } from '~/components/IconComponents';
import { styled } from '@mui/material/styles';

export const FileUpload: React.FC<{
  files:never[];
  handleDelete:any;
  handleUpload:any; 
  id?: number;
}> = props => {
    const Input = styled('input')({
        display: 'none',
      });

    function onClickUpload(){
        let myInput:any = document.getElementById("contained-button-file" + props.id);
        myInput.click();
      }
      
      useEffect(() => {
        console.log(typeof props.files);
        console.log(props.files);
      }, []);

    return(
      <Stack spacing={1.25} direction="row" justifyContent="left" css={styles.deletTag}>
        <Input hidden accept="*.*" id={"contained-button-file"+props.id} multiple type="file" onChange={(e)=>{props.handleUpload(e)}}/>
        <CustomButton label={'파일선택'} type={'fileBtn'} color={'outlined'} onClick={onClickUpload}/>
        {!!props.files ? props.files.map((item:any, i:number) => (
          <Chip key={i} variant="outlined" label={item.name} onDelete={()=>props.handleDelete(i)} deleteIcon={<DeletIcon />}/>
        )):null}
      </Stack>
    );
}

export const FileUpload1: React.FC<{
  files1?:never[];
  files?:never[];
  handleDelete?:any;
  handleDelete2?:any;
  handleUpload?:any; 
  handleUpload1?:any; 
}> = props => {
    const Input = styled('input')({
        display: 'none',
      });

    function onClickUpload(){
      let myInput:any;
      if(props.handleUpload1){
        myInput = document.getElementById("contained-button-file1");
      }else if(props.handleUpload){
        myInput = document.getElementById("contained-button-file");

      }
        myInput.click();
      }
  
      return(
        <Stack spacing={1.25} direction="row" justifyContent="left" css={styles.deletTag}>
          {props.handleUpload?
          <Input hidden accept="*.*" id="contained-button-file" multiple type="file" onChange={(e)=>{props.handleUpload(e)}}/>
          :null}
          {props.handleUpload1?
          <Input hidden accept="*.*" id="contained-button-file1" multiple type="file" onChange={(e)=>{props.handleUpload1(e)}}/>
          :null}
          <CustomButton label={'파일선택'} type={'fileBtn'} color={'outlined'} onClick={onClickUpload}/>
          {props.files1? props.files1.map((item:any, i:number) => (
            <Chip key={i} variant="outlined" label={item.fileNm} onDelete={()=>props.handleDelete2(item.attachmentId,i)} deleteIcon={<DeletIcon />}/>
          )):null}
          {props.files? props.files.map((item:any, i:number) => (
            <Chip key={i} variant="outlined" label={item.name} onDelete={()=>props.handleDelete(i)} deleteIcon={<DeletIcon />}/>
          )):null}
        </Stack>
      );
}

export const FileUploadbiz: React.FC<{
  files:any[];
  handleDelete:any;
  handleUpload:any; 
  id?: number;
}> = props => {

    const Input = styled('input')({
        display: 'none',
      });

  const [num,setNum] = useState<number>();

    function onClickUpload(){
        let myInput:any = document.getElementById("contained_button_file_" + num);
        myInput.click();
      }
      
      useEffect(() => {
        console.log(typeof props.files);
        console.log('FileUploadFileUpload:',props.files);
        if(props.id !== undefined){
          setNum(props.id)
        }
      }, []);

    return(
      <Stack spacing={1.25} direction="row" justifyContent="left" css={styles.deletTag}>
        <Input hidden accept="*.*" id={"contained_button_file_"+ num} multiple type="file" onChange={(e)=>{props.handleUpload(e)}}/>
        <CustomButton label={'파일선택'} type={'fileBtn'} color={'outlined'} onClick={onClickUpload}/>
        {!!props.files ? 
          <Chip variant="outlined" label={props.files[0].name} onDelete={(e)=>props.handleDelete(e)} deleteIcon={<DeletIcon />}/>
        :null}
      </Stack>
    );
}


// Swiper   //loop : true,
SwiperCore.use([Navigation,Autoplay,Pagination]);

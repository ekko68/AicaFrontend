// 이용지원/ ->  전문가신청 페이지
// import React from "react"
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, OutlinedInput, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import BreadCrumb from '~/components/BreadCrumb';
import * as styles from '~/styles/styles';
import { applyExpertAcdmcr, applyExpertCareer, applyExpertCrqfc, initExpertAcdmcr, steps03 } from '~/models/Model';
import { CustomButton } from '~/components/ButtonComponents';
import { TrashIcon, PlusIcon } from '~/components/IconComponents';
import { FileUpload } from "../../EventNews/FileUpload";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { initExpertCarrer } from "./../../../models/Model";
import { ExpertCareerTable, MoExpertCareerTable } from "./ExpertCareerTable";
import { ExpertAcdmcrTable, MoExpertAcdmcrTable } from './ExpertAcdmcrTable';
import { initExpertCrqfc } from "./../../../models/Model";
import { ExpertCrqfcTable, MoExpertCrqfcTable } from './ExpertCrqfcTable';
import { fetchTermsImsi } from '~/fetches';
import { fetchExpertPost } from '~/fetches/fetchExpert';
import { ModalComponents } from '~/components/ModalComponents';

function ExpertApplicationDetail02() {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const receive:any = useLocation();
  // console.log(receive.state.usptExpert) //신청자 전문가정보
  // console.log(receive.state.usptExpertClMapng) // 전문가 분야정보 api 미흡
  const navigate = useNavigate();
  const [files, setFiles]:any= useState([]);

  const today = new Date();
  today.setHours(today.getHours()-24);
  //전문가 경력 정보
  const [usptExpertCareer, setExpertCarrer] = useState<applyExpertCareer[]>([initExpertCarrer]);
  const [allCheck1, setAllCheck1] = useState(false);
  const [select1,setSelect1] = useState<boolean[]>([false]);
  //학력 정보
  const [usptExpertAcdmcr, setExpertAcdmcr] = useState<applyExpertAcdmcr[]>([initExpertAcdmcr])
  const [allCheck2, setAllCheck2] = useState(false);
  const [select2,setSelect2] = useState<boolean[]>([false]);
  //자격증 정보
  const [usptExpertCrqfc, setExpertCrqfc] = useState<applyExpertCrqfc[]>([initExpertCrqfc])
  const [allCheck3, setAllCheck3] = useState(false);
  const [select3,setSelect3] = useState<boolean[]>([false]);
  console.log(receive);
  console.log(usptExpertCareer)
  console.log(usptExpertAcdmcr)
  console.log(usptExpertCrqfc)
  //파일 삭제
  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };
  //파일 업로드
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
        update.push(upfile[i]);
      }
    setFiles(update)
  }
  //체크 값 변경
  const changeCheck1 = (i:number,k:boolean) => {
    let update = [...select1];
    update[i] = k;
    setSelect1(update); 
    if(k===false){
      setAllCheck1(false)
    }
    let b = 0;
    for(let i =0; i<select1.length; i++){
      if(update[i]===true){
        b++;
      }
    }
    if(b===select1.length){
      setAllCheck1(true)   
    }
  }
  //모두 선택or 해제
  const changeAllCheck1 = () => {
    let update = [...select1];
    if(allCheck1===false){
      for(let i =0; i<select1.length; i++){
        update[i] = true;
      }
    }else if(allCheck1===true){
      for(let i =0; i<select1.length; i++){
        update[i] = false;
      }
    }
    setSelect1(update); 
    setAllCheck1(!allCheck1)
  }
  
  //업데이트
  const updateItem1 = (item:applyExpertCareer,i:number) => {
    const updated = [...usptExpertCareer];
    updated[i] = item;
    setExpertCarrer(updated);
  };
  //삭제
  const deleteItem1 = () =>{
    if(allCheck1===true){
      setExpertCarrer([initExpertCarrer])
      setAllCheck1(false)
      setSelect1([false])
    }else{
      const updated = [...usptExpertCareer];
      const updated1 = [...select1];
      for(let i=usptExpertCareer.length-1; i>-1; i--){
        if(select1[i]===true){
          updated.splice(i,1);
          setExpertCarrer(updated);
          updated1.splice(i,1);
          setSelect1(updated1);
        }
      }
    }
    if(usptExpertCareer.length===0){
      addItem1();
    }
  }
  //추가
  const addItem1 = () =>{
    const updated = [...usptExpertCareer];
    const updated1 = [...select1]
    updated.push(initExpertCarrer);
    updated1.push(false);
    setExpertCarrer(updated);
    setSelect1(updated1)
    setAllCheck1(false);
  }

  //체크 값 변경2
  const changeCheck2 = (i:number,k:boolean) => {
    let update = [...select2];
    update[i] = k;
    setSelect2(update); 
    if(k===false){
      setAllCheck2(false)
    }
    let b = 0;
    for(let i =0; i<select2.length; i++){
      if(update[i]===true){
        b++;
      }
    }
    if(b===select2.length){
      setAllCheck2(true)   
    }
  }
  //모두 선택or 해제2
  const changeAllCheck2 = () => {
    let update = [...select2];
    if(allCheck2===false){
      for(let i =0; i<select2.length; i++){
        update[i] = true;
      }
    }else if(allCheck2===true){
      for(let i =0; i<select2.length; i++){
        update[i] = false;
      }
    }
    setSelect2(update); 
    setAllCheck2(!allCheck2)
  }
  //업데이트2
  const updateItem2 = (item:applyExpertAcdmcr,i:number) => {
    const updated = [...usptExpertAcdmcr];
    updated[i] = item;
    setExpertAcdmcr(updated);
  };
  //삭제2
  const deleteItem2 = () =>{
    if(allCheck2===true){
      setExpertAcdmcr([initExpertAcdmcr])
      setAllCheck2(false)
      setSelect2([false])
    }else{
      const updated = [...usptExpertAcdmcr];
      const updated1 = [...select2];
      for(let i=usptExpertAcdmcr.length-1; i>-1; i--){
        if(select2[i]===true){
          updated.splice(i,1);
          setExpertAcdmcr(updated);
          updated1.splice(i,1);
          setSelect2(updated1);
        }
      }
    }
    if(usptExpertAcdmcr.length===0){
      addItem2();
    }
  }
  //추가2
  const addItem2 = () =>{
    const updated = [...usptExpertAcdmcr];
    const updated1 = [...select2]
    updated.push(initExpertAcdmcr);
    updated1.push(false);
    setExpertAcdmcr(updated);
    setSelect2(updated1)
    setAllCheck2(false);
  }

  //체크 값 변경3
  const changeCheck3 = (i:number,k:boolean) => {
    let update = [...select3];
    update[i] = k;
    setSelect3(update); 
    if(k===false){
      setAllCheck3(false)
    }
    let b = 0;
    for(let i =0; i<select3.length; i++){
      if(update[i]===true){
        b++;
      }
    }
    if(b===select3.length){
      setAllCheck3(true)   
    }
  }
  //모두 선택or 해제3
  const changeAllCheck3 = () => {
    let update = [...select3];
    if(allCheck3===false){
      for(let i =0; i<select3.length; i++){
        update[i] = true;
      }
    }else if(allCheck3===true){
      for(let i =0; i<select3.length; i++){
        update[i] = false;
      }
    }
    setSelect3(update); 
    setAllCheck3(!allCheck3)
  }
  //업데이트3
  const updateItem3 = (item:applyExpertCrqfc,i:number) => {
    const updated = [...usptExpertCrqfc];
    updated[i] = item;
    setExpertCrqfc(updated);
  };
  //삭제3
  const deleteItem3 = () =>{
    if(allCheck3===true){
      setExpertCrqfc([initExpertCrqfc])
      setAllCheck3(false)
      setSelect3([false])
    }else{
      const updated = [...usptExpertCrqfc];
      const updated1 = [...select3];
      for(let i=usptExpertCrqfc.length-1; i>-1; i--){
        if(select3[i]===true){
          updated.splice(i,1);
          setExpertCrqfc(updated);
          updated1.splice(i,1);
          setSelect3(updated1);
        }
      }
    }
    if(usptExpertCrqfc.length===0){
      addItem3();
    }
  }
  //추가2
  const addItem3 = () =>{
    const updated = [...usptExpertCrqfc];
    const updated1 = [...select3]
    updated.push(initExpertCrqfc);
    updated1.push(false);
    setExpertCrqfc(updated);
    setSelect3(updated1)
    setAllCheck3(false);

  }


  const send = () =>{
    // if(!validate()){
    //   return;
    // };
    try{
      fetchTermsImsi(receive.state.validationBox).then((res)=>{

      const form = new FormData();
      
      for(let i=0; i<files.length; i++){
        form.append("fileList",files[i])
      }

      let params = {
        sessionId : res.key,
        usptExpert : receive.state.usptExpert,
        usptExpertClMapng : receive.state.usptExpertClMapng,
        usptExpertCareer : usptExpertCareer,
        usptExpertAcdmcr : usptExpertAcdmcr,
        usptExpertCrqfc : usptExpertCrqfc
      };
      console.log(params);
      form.append("info", new Blob([JSON.stringify(params)], {type: 'application/json'}));
      fetchExpertPost(form)
        .then(()=> navigate('/SupportForUse/ExpertApplicationDetail03'))
        .catch((e)=>{
          setOpen(true);
          setError(e.response.data.message)
        });
      })
    } catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }
  }
  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">전문가 신청</h2>
              <Stepper activeStep={2} alternativeLabel css={styles.step03}>
                {steps03.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className="content">
          <Box css={styles.box_graylist}>
            <ul>
              <li>경력, 학력, 자격증 및 증빙 서류를 등록해주세요.</li>
              <li>경력정보는 최소 1개 이상 등록해 주시기 바라며, 학력정보는 최종학력정보까지 모두 입력바랍니다.</li>
              <li><em>*</em> 표시는 필수입력 항목입니다.</li>
            </ul>
          </Box>
          <Box css={styles.table05}>
            <Stack direction="row" justifyContent="space-between" className="table_tit">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
              >
                {'경력정보'} <em>*</em>
              </Typography>
              <Stack direction="row">
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} onClick={deleteItem1}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" onClick={addItem1}>
                  <PlusIcon />
                </IconButton>
              </Stack>
            </Stack>
            {/* 테이블 pc start */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'5%'}}/>
                <col style={{width:'30%'}}/>
                <col style={{width:'13%'}}/>
                <col style={{width:'13%'}}/>
                <col style={{width:'13%'}}/>
                <col />
              </colgroup>
              <thead>
                <tr>
                <th>
                  <Box className="checkbox">
                    <Checkbox checked={allCheck1} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    changeAllCheck1()
                    }}/>
                  </Box>
                </th>
                  <th>근무기간</th>
                  <th>직장명</th>
                  <th>부서명</th>
                  <th>직위</th>
                  <th>담당업무</th>
                </tr>
              </thead>
              <tbody>
                <ExpertCareerTable checkList={select1} change={changeCheck1} data={usptExpertCareer} updateItem={updateItem1}/>
              </tbody>
            </table>
            {/* 테이블 pc end */}
            {/* 테이블 모바일 start */}
            <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={allCheck1} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    changeAllCheck1()
                    }}/>} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col />
                </colgroup>
                <tbody>
                <MoExpertCareerTable checkList={select1} change={changeCheck1} data={usptExpertCareer} updateItem={updateItem1}/>
                </tbody>
              </table>
            </div>
            {/* 테이블 모바일 end */}
          </Box>
          {/* table02 */}
          <Box css={styles.table05} sx={{ mt: 5 }}>
            <Stack direction="row" justifyContent="space-between" className="table_tit">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
              >
                {'학력정보'} <em>*</em>
              </Typography>
              <Stack direction="row">
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} onClick={deleteItem2}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" onClick={addItem2}>
                  <PlusIcon />
                </IconButton>
              </Stack>
            </Stack>
            {/* 테이블 pc start */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'5%'}}/>
                <col style={{width:'30%'}}/>
                <col style={{width:'13%'}}/>
                <col style={{width:'13%'}}/>
                <col style={{width:'13%'}}/>
                <col style={{width:'13%'}}/>
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <Box className="checkbox">
                      <Checkbox checked={allCheck2} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                      changeAllCheck2()
                      }}/>
                    </Box>
                  </th>
                  <th>기간</th>
                  <th>학위</th>
                  <th>학교명</th>
                  <th>전공</th>
                  <th>지도교수</th>
                  <th>졸업구분</th>
                </tr>
              </thead>
              <tbody>
              <ExpertAcdmcrTable checkList={select2} change={changeCheck2} data={usptExpertAcdmcr} updateItem={updateItem2}/>
              </tbody>
            </table>
            {/* 테이블 pc end */}
            {/* 테이블 모바일 start */}
            <div className="mo">
              <FormGroup>
                <FormControlLabel control={                      
                <Checkbox checked={allCheck2} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                      changeAllCheck2()
                      }}/>} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col />
                </colgroup>
                <tbody>
                <MoExpertAcdmcrTable checkList={select2} change={changeCheck2} data={usptExpertAcdmcr} updateItem={updateItem2}/>
                </tbody>
              </table>
            </div>
            {/* 테이블 모바일 end */}
          </Box>
          {/* table03 */}
          <Box css={styles.table05} sx={{ mt: 5 }}>
            <Stack direction="row" justifyContent="space-between" className="table_tit">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
              >
                {'자격증정보'}
              </Typography>
              <Stack direction="row">
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} onClick={deleteItem3}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" onClick={addItem3}>
                  <PlusIcon />
                </IconButton>
              </Stack>
            </Stack>
            {/* 테이블 pc start */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'5%'}}/>
                <col style={{width:'13%'}}/>
                <col style={{width:'40%'}}/>
                <col style={{width:'40%'}}/>
                <col />
              </colgroup>
              <thead>
                <tr>
                <th>
                    <Box className="checkbox">
                      <Checkbox checked={allCheck3} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                      changeAllCheck3()
                      }}/>
                    </Box>
                  </th>
                  <th>기간</th>
                  <th>자격증명</th>
                  <th>발급기관</th>
                </tr>
              </thead>
              <tbody>
                      <ExpertCrqfcTable checkList={select3} change={changeCheck3} data={usptExpertCrqfc} updateItem={updateItem3}/>
              </tbody>
            </table>
            {/* 테이블 pc end */}
            {/* 테이블 모바일 start */}
            <div className="mo">
              <FormGroup>
                <FormControlLabel control={                      
                <Checkbox checked={allCheck3} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                      changeAllCheck3()
                      }}/>} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col />
                </colgroup>
                <tbody>
                <MoExpertCrqfcTable checkList={select3} change={changeCheck3} data={usptExpertCrqfc} updateItem={updateItem3}/>
                </tbody>
              </table>
            </div>
            {/* 테이블 모바일 end */}
          </Box>
          <Box css={styles.inputBox} sx={{mt: 4}}>
            <div className="inputtxt" >파일첨부</div>
            <FileUpload
              files={files}
              handleDelete={handleDelete}
              handleUpload={handleUpload}
            />
          </Box>
          <hr className="m20"/>
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
            <CustomButton label={'이전'} type={'listBack'} color={'outlinedblack'} onClick={()=> navigate('/SupportForUse/ExpertApplicationDetail01',{state:{usptExpert : receive.state.usptExpert, usptExpertClMapng:receive.state.usptExpertClMapng, validationBox:receive.state.validationBox}})}/>
            <CustomButton label={'완료'} type={'listBack'} color={'primary'} onClick={()=> send()}/>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default ExpertApplicationDetail02;

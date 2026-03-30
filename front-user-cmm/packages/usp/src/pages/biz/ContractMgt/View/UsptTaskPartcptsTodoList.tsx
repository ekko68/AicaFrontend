import React, {CSSProperties, useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, FormGroup, IconButton, OutlinedInput, Stack} from "@mui/material";
import { CheckboxStyle } from '~/components/TableComponents';
import { CustomButton, DefaultCheckBoxProps } from '~/components/ButtonComponents';
import { PlusIcon, TrashIcon } from "~/components/IconComponents";
import { TaskPrtcmpny,TaskPartcpts } from '~/models/ModelBizPlanMgt';
import { useNavigate } from 'react-router-dom';
/*
    공통 컴포넌트: todo list 
    작성 : navycui
*/ 
export const UsptTaskPartcptsTodoList: React.FC<{
    dataList: any[]
    type:'usptTaskPartcpts' | 'usptTaskPrtcmpny'                       // 데이터 전달
    row?: boolean
    justifyContent?: 'center' | 'right' | 'left'
    children?: React.ReactNode
    style?: CSSProperties
    onChangeBox?: (dataBox: TaskPrtcmpny[]) => void // 데이터 반환
    onChangeBox2?: (dataBox2: TaskPartcpts[]) => void // 데이터 반환
  }> = (props) => {
    const [selected, setSelected] = useState<boolean[]>([]);
    const [checkAll,setCheckAll]  = useState<boolean>(false);
    const [dataBox,setDataBox]  = useState<TaskPrtcmpny[]>([]);
    const [dataBox2,setDataBox2]  = useState<TaskPartcpts[]>([]);
    const navigate = useNavigate();
     // data 초기화
     useEffect(() => {
      if(!!props.dataList){
        if(props.type == 'usptTaskPrtcmpny'){
          setDataBox(props.dataList)
        } else {
          setDataBox2(props.dataList)
        }
      }
    }, []);

    // 선택한 data 변경 시
    useEffect(() => {

      if(props.type == 'usptTaskPrtcmpny'){
        if(!!dataBox){
          let selectBox:boolean[] = [...selected];
            for(let i =selected.length; i<dataBox.length; i++){
              selectBox = selectBox.concat(false);
            }
            setSelected(selectBox)
            if(props.onChangeBox) props.onChangeBox(dataBox);
        }
      } else {
        if(!!dataBox2){
          let selectBox:boolean[] = [...selected];
            for(let i =selected.length; i<dataBox2.length; i++){
              selectBox = selectBox.concat(false);
            }
            setSelected(selectBox)
            if(props.onChangeBox2) props.onChangeBox2(dataBox2);
        }
      }
    }, [dataBox,dataBox2]);

    const handelChangeInfo = (event:React.ChangeEvent<HTMLInputElement>,item:TaskPrtcmpny,idx:number) => {
      if (event.currentTarget == null) {
        return;
      }

      event.preventDefault();
        const updated:any = [...dataBox];
        updated[idx] = {...item,[event.currentTarget.name]:event.currentTarget.value};
        setDataBox(updated)
      // setDataBox((pre:any)=>[...pre,{...pre[idx],...item}])
    };
    const handelChangeInfo2 = (event:React.ChangeEvent<HTMLInputElement>,item:TaskPartcpts,idx:number) => {
      if (event.currentTarget == null) {
        return;
      }

      event.preventDefault();
        const updated:any = [...dataBox2];
        updated[idx] = {...item,[event.currentTarget.name]:event.currentTarget.value};
        setDataBox2(updated)
      // setDataBox((pre:any)=>[...pre,{...pre[idx],...item}])
    };
    // 참여기업
    if(props.type == 'usptTaskPrtcmpny')
    return (
      <>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
          <h4 className="tbl_title">참여기업</h4>
          <Box>
            <CustomButton label={'기업선택'} onClick={()=> navigate('/')} type={'modify'} color={'outlinedblack'} style={{margin:'10px 18px'}} />
            <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
              onClick={() => {
                if(checkAll===true){
                  setDataBox([{ entrpsNm: '', rspnberNm: '', clsfNm: '', regTelno: '', regMbtlnum: '', regEmail: '' }]);
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
            <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                onClick={() => {
                  if(!!dataBox){
                    setDataBox((pre:any)=>([...pre,{ entrpsNm: '', rspnberNm: '', clsfNm: '', regTelno: '', regMbtlnum: '', regEmail: ''}]))
                    setCheckAll(false);
                  }
                }} 
              >
              <PlusIcon />
            </IconButton>
          </Box>
        </Stack>
        <table className="tableDefault type5 pc">
          <colgroup>
            <col style={{width:'5%'}}/>
            <col style={{width:'16%'}}/>
            <col style={{width:'10%'}}/>
            <col style={{width:'12%'}}/>
            <col style={{width:'14%'}}/>
            <col style={{width:'14%'}}/>
            <col style={{width:'15%'}}/>
            {/* <col style={{width:'14%'}}/> */}
          </colgroup>
          <thead>
            <tr>
              <th>
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
              </th>
              <th>업체명<span className='must'>*</span></th>
              <th>책임자명<span className='must'>*</span></th>
              <th>직위/직급<span className='must'>*</span></th>
              <th>연락처</th>
              <th>휴대전화<span className='must'>*</span></th>
              <th>이메일<span className='must'>*</span></th>
              {/* <th>국가연구자번호</th> */}
            </tr>
          </thead>
          <tbody>
            {dataBox ? dataBox.map((m, i) => {
              return (
                <tr>
                  <td>
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
                  </td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                      name='entrpsNm'
                      value={m.entrpsNm}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
                    /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='rspnberNm'
                    value={m.rspnberNm}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='clsfNm'
                    value={m.clsfNm}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='regTelno'
                    value={m.regTelno}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='regMbtlnum' 
                    value={m.regMbtlnum}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='regEmail' 
                    value={m.regEmail}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
                  /></td>
                  {/* <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='encEmail' 
                    value={m.encEmail}
                    onChange={()=>{handelChangeInfo(e,m,i)}}
                  /></td> */}
                </tr>
              )
            }): null}
          </tbody>
        </table>
        {/* <div className="mo">
          <FormGroup>
            <FormControlLabel 
              label={'전체 선택'}
              control={
                <Checkbox
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
          </FormGroup>
          <table className="tableDefault type5">
            <colgroup>
              <col style={{width:'9%'}}/>
              <col style={{width:'27%'}}/>
              <col style={{width:'64%'}}/>
            </colgroup>
            <tbody>
              <tr>
                <td rowSpan={7} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                <th>업체명<span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>책임자명 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>직위/직급 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>연락처</th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>휴대전화 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>이메일 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>과학<br className='mo' />기술인<br className='mo' />등록번호</th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <td rowSpan={7} className='chkbox'><Box className="checkbox"><Checkbox
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></Box></td>
                <th>업체명<span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>책임자명 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>직위/<br className='mo' />직급 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>연락처</th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>휴대전화 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>이메일 <span className="must">*</span></th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
              <tr>
                <th>과학<br className='mo' />기술인<br className='mo' />등록번호</th>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}}
                  name='adresDetail' 
                  value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,'02')}}
                /></td>
              </tr>
            </tbody>
          </table>
        </div> */}

      </>
    );

    //참여인력
    return (
      <>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
          <h4 className="tbl_title">참여인력</h4>
          <Box>
            <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
              onClick={() => {
                if(checkAll===true){
                  setDataBox2([{partcptsNm: '',chrgRealmNm: '', encMbtlnum: '',encBrthdy: '', partcptnRate: 0,memberId: '',memberNm: '' }]);
                  setCheckAll(false)
                  setSelected([false])
                }else{
                  if(!!dataBox2){
                    const upBox = [...dataBox2];
                    const upSelete = [...selected];
                    if(!!dataBox2){
                      for(let i=dataBox2.length-1; i>-1; i--){
                        if(selected[i]===true){
                          upBox.splice(i,1);
                          setDataBox2(upBox)
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
            <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                onClick={() => {
                  if(!!dataBox2){
                    setDataBox2((pre:any)=>([...pre,{partcptsNm: '',chrgRealmNm: '', encMbtlnum: '',encBrthdy: '', partcptnRate: 0,memberId: '',memberNm: '' }]))
                    setCheckAll(false);
                  }
                }} 
              >
              <PlusIcon />
            </IconButton>
          </Box>
        </Stack>
      {/* <div className="mo">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
        </FormGroup>
        <table className="tableDefault type5">
        <colgroup>
            <col style={{width:'9%'}}/>
            <col style={{width:'27%'}}/>
            <col style={{width:'64%'}}/>
          </colgroup>
          <tbody>
            <tr>
              <td rowSpan={5} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
              <th>이름<span className="must">*</span></th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>담당분야</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>휴대폰번호</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>참여율(%)</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <td rowSpan={5} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
              <th>이름<span className="must">*</span></th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>담당분야</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>휴대폰번호</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
            <tr>
              <th>참여율(%)</th>
              <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
              name='adresDetail' 
              value={PlanDocInfo.usptBsnsPlanDoc.bsnsPd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo(e,m,i)}}
              /></td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <table className="tableDefault type5 pc">
        <colgroup>
          <col style={{width:'5%'}}/>
          <col style={{width:'19%'}}/>
          <col style={{width:'19%'}}/>
          <col style={{width:'19%'}}/>
          <col style={{width:'19%'}}/>
          <col style={{width:'18%'}}/>
        </colgroup>
        <thead>
          <tr>
            <th>
              <Box className="checkbox">
                <Checkbox
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
              </Box>
            </th>
            <th>이름</th>
            <th>담당분야</th>
            <th>휴대폰번호</th>
            <th>생년월일</th>
            <th>참여율(%)</th>
          </tr>
        </thead>
        <tbody>
          {dataBox2 ? dataBox2.map((m, i) => {
              return (
                <tr>
                  <td>
                    <Box className="checkbox">
                      <Checkbox 
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
                    </Box>
                  </td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='partcptsNm' 
                    value={m.partcptsNm}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo2(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='chrgRealmNm' 
                    value={m.chrgRealmNm}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo2(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='encMbtlnum' 
                    value={m.encMbtlnum}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo2(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='encBrthdy' 
                    value={m.encBrthdy}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo2(e,m,i)}}
                  /></td>
                  <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='partcptnRate' 
                    value={m.partcptnRate}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handelChangeInfo2(e,m,i)}}
                  /></td>
                </tr>
              )
          }): null}
        </tbody>
      </table>
      </>
    )
  };

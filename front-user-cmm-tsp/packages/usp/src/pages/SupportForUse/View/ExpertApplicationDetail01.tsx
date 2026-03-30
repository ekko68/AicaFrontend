// 이용지원/ ->  전문가신청 페이지
// import React from "react"
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import BreadCrumb from '~/components/BreadCrumb';
import * as styles from '~/styles/styles';
import { applyExpert, steps03, usptExpertClMapng } from '~/models/Model';
import { CustomButton } from '~/components/ButtonComponents';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, SelectIcon } from '~/components/IconComponents';
import { useEffect, useState } from 'react';
import { initApplyExpert } from "./../../../models/Model";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { intialErrorExpert } from '~/models/ModelExpert';
import { fetchExpertClid, fetchExpertGet, fetchExpertParnts } from '~/fetches/fetchExpert';
import { ExpertTable } from '~/pages/biz/BusinessAppMgt/View/ExpertTable';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { useQuery } from 'react-query';
function ExpertApplicationDetail01() {
  const receive:any = useLocation();
  const {addModal} = useGlobalModalStore();
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  //신청자정보
  const [memberData, setMemberData]:any = useState();
  const navigate = useNavigate();
  // 신청자 전문가정보
  const [usptExpert, setExpert] = useState<applyExpert>(initApplyExpert);
  // 입력값오류
  const [errorValues, setErrorValues] = useState(intialErrorExpert);
  const [allCheck, setAllCheck] = useState(false);
  const [select, setSelect]:any = useState([false]);
  const getList = () => {
    fetchExpertGet().then((res:any)=>{
      setMemberData(res);
      setExpert((state:any) => ({...state,expertNm : res.memberNm,genderCd : res.gender,encEmail:res.encEmail,encMbtlnum:res.encMobileNo,encBrthdy:res.encBirthday}))
    }).catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open:true,
        content:message
      })
    })
  }
  useEffect(()=>{
    getList()
  },[])
  const [initParents,setInitParensts]= useState({expertClId: ''});
  const [initChilds,setInitChilds]= useState({expertClId: ''});
  // 전문가 분야정보
  const [parents,setParents] = useState<usptExpertClMapng[]>([initParents]);
  const [usptExpertClMapng,setMapng] = useState<usptExpertClMapng[]>([initChilds]);
  const [childs_box, setChildsBox]:any = useState([]);
  const {data:parents_box} = useQuery("getExpertParants", async () => await fetchExpertParnts(),{
    onSuccess : (res:any) =>{
        console.log(res.list[0]);
        setParents([{expertClId: res.list[0].parntsExpertClId}])
        setInitParensts({expertClId: res.list[0].parntsExpertClId})
        // fetchExpertClid(res[0].parntsExpertClId).then((item)=>{
        //     setMapng([{expertClId:item[0].expertClId}])
        //     setInitChilds({expertClId:item[0].expertClId})
        // })
        let box:any = [];
        res.list.map((item:any , i:number)=>{
          fetchExpertClid(item.parntsExpertClId).then((res)=>{
            box.push(res.list);
            if(i===0){
              setMapng([{expertClId:res.list[0].expertClId}])
              setInitChilds({expertClId:res.list[0].expertClId})
            }
          })
        })
        setChildsBox(box);
    }
  });

  //체크 값 변경
  const changeCheck = (i:number,k:boolean) => {
    let update = [...select];
    update[i] = k;
    setSelect(update); 
    if(k===false){
      setAllCheck(false)
    }
    let b = 0;
    for(let i =0; i<select.length; i++){
      if(update[i]===true){
        b++;
      }
    }
    if(b===select.length){
      setAllCheck(true)   
    }
  }
  //소속 및 대학정보 입력부분
  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setExpert((state:any) => ({ ...state, [name]: value }));
  }

  // Daum 우편번호 서비스
  const DaumPost = (data:any) => {
    setExpert((pre:any)=>({...pre,wrcAdresZip:data.zonecode,wrcAdres:data.address}))
  };

  // 주소 찾기 호출
  const handleClick = () => {
    open({ onComplete: DaumPost });
  };

  const validate = () => {
    let check = true;
    let update = {...errorValues};
    if(usptExpert.lastUnivNm===""){
      update = {...update,errorLastUnivNm:true , helperLastUnivNm:"최종 대학명을 입력하세요."}
      check = false;
    }else{
      update = {...update,errorLastUnivNm:false , helperLastUnivNm:""}
    }
    //학부 확인
    if (usptExpert.univDeptNm===""){
      check = false;
      update = {...update,errorUnivDeptNm:true, helperUnivDeptNm:"학부를 입력하세요."}
    }else{
      update = {...update,errorUnivDeptNm:false, helperUnivDeptNm:""}
    }
    setErrorValues(update);


    if(check===true){
      navigate('/SupportForUse/ExpertApplicationDetail02',{state:{usptExpert : usptExpert, usptExpertClMapng:usptExpertClMapng, validationBox:receive.state.validationBox}});
    }

  }

  const addItem = () =>{
    const updated = [...parents];
    const updated2 = [...usptExpertClMapng];
    const updated3 = [...select]
    updated.push(initParents);
    updated2.push(initChilds);
    updated3.push(false);
    setParents(updated);
    setMapng(updated2);
    setSelect(updated3)
    setAllCheck(false);
  }

  const updateItem = (item:usptExpertClMapng,i:number) => {
    const updated = [...usptExpertClMapng];
    updated[i] = item;
    setMapng(updated);
  };
  const updateItem2 = (item:usptExpertClMapng,i:number) => {
    const updated = [...parents];
    updated[i] = item;
    setParents(updated);
  };

  const deleteItem = () =>{
    if(allCheck===true){
      setParents([initParents]);
      setMapng([initChilds])
      setAllCheck(false)
      setSelect([false])
    }else{
      const updated = [...usptExpertClMapng];
      const updated1 = [...select];
      const updated2 = [...parents];
      for(let i=usptExpertClMapng.length-1; i>-1; i--){
        if(select[i]===true){
          updated.splice(i,1);
          setMapng(updated);
          updated1.splice(i,1);
          setSelect(updated1);
          updated2.splice(i,1);
          setParents(updated2);
        }
      }
    }
    if(usptExpertClMapng.length===0){
      addItem();
    }
  }

  const changeAllCheck = () => {
    let update = [...select];
    if(allCheck===false){
      for(let i =0; i<select.length; i++){
        update[i] = true;
      }
    }else if(allCheck===true){
      for(let i =0; i<select.length; i++){
        update[i] = false;
      }
    }
    setSelect(update); 
    setAllCheck(!allCheck)
  }
  console.log(usptExpertClMapng)
  console.log(receive)
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">전문가 신청</h2>
              <Stepper activeStep={1} alternativeLabel css={styles.step03}>
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
              <li>신청자정보를 확인해 주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
              <li>소속 및 대학정보를 입력해 주세요. 상세하게 입력해 주실수록 접수 시 도움이 됩니다.</li>
              <li><em>*</em> 표시는 필수입력 항목입니다.</li>
            </ul>
          </Box>
          <Box>
            <Box css={styles.table05}>
              {/* 신청자 정보 */}
              <Stack direction="row" justifyContent="space-between" className="table_tit">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {'신청자 정보'}
                </Typography>
                <NavLink to="/MyPage/MemberInfoMmt/MemberInfoMdf">
                <CustomButton label={'회원정보 변경'} type={'modify'} color={'outlinedblack'} style={{marginBottom:'10px'}} />
                </NavLink>
              </Stack>
              {memberData?
              <div className="detail_table"> 
                <dl>
                  <dt>이름</dt>
                  <dd>{memberData.memberNm}</dd>
                  <dt>생년월일</dt>
                  <dd>{memberData.encBirthday}</dd>
                </dl>
                <dl>
                  <dt>성별</dt>
                  <dd>{memberData.gender}</dd>
                  {/* <dt>내외국인</dt>
                  <dd>내국인</dd> */}
                </dl>
                <dl>
                  <dt>휴대폰번호</dt>
                  <dd>{memberData.encMobileNo}</dd>
                  <dt>이메일</dt>
                  <dd>{memberData.encEmail}</dd>
                </dl>
              </div>
              :null}
            </Box>
            <Box css={styles.table04}>
              {/* 소속 및 대학정보 */}
              <Typography
                gutterBottom
                variant="h6"
                component="div"
              >
                {'소속 및 대학정보'}
              </Typography>
              {/* 테이블 pc */}
              <Box className="pc">
                <table>
                  <colgroup>
                    <col width='15%'></col>
                    <col width='35%'></col>
                    <col width='15%'></col>
                    <col width='35%'></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>최종 대학명<em>*</em></th>
                      <td className='table_input'>
                        <TextField
                          id='lastUnivNm'
                          name='lastUnivNm'
                          value={usptExpert.lastUnivNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                          error={errorValues.errorLastUnivNm}
                          helperText={errorValues.helperLastUnivNm}
                        />
                      </td>
                      <th>학부<em className="star">*</em></th>
                      <td className='table_input'>
                        <TextField
                          id='univDeptNm'
                          name='univDeptNm'
                          value={usptExpert.univDeptNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                          error={errorValues.errorUnivDeptNm}
                          helperText={errorValues.helperUnivDeptNm}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직장명</th>
                      <td className='table_input'>
                        <TextField
                          id='wrcNm'
                          name='wrcNm'
                          value={usptExpert.wrcNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                      <th>부서명</th>
                      <td className='table_input'>
                        <TextField
                          id='deptNm'
                          name='deptNm'
                          value={usptExpert.deptNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직위</th>
                      <td className='table_input'>
                        <TextField
                          id='ofcpsNm'
                          name='ofcpsNm'
                          value={usptExpert.ofcpsNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                      <th>직무</th>
                      <td className='table_input'>
                        <TextField
                          id='dtyNm'
                          name='dtyNm'
                          value={usptExpert.dtyNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th rowSpan={2}>직장주소</th>
                      <td className='table_input noline'>
                        <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100%'}}>
                          <TextField
                            id='wrcAdresZip'
                            name='wrcAdresZip'
                            value={usptExpert.wrcAdresZip}
                            onChange={handelChangeInput}
                            variant='outlined'
                            fullWidth
                          />
                          <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={handleClick}/>
                        </Stack>
                      </td>
                    </tr>
                    <tr>
                      <td className='table_input pt0'>
                        <TextField
                          id='wrcAdres'
                          name='wrcAdres'
                          value={usptExpert.wrcAdres}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                      <th className='table_input wh pt0' colSpan={2}>
                        <TextField
                          id='wrcAdresDetail'
                          name='wrcAdresDetail'
                          value={usptExpert.wrcAdresDetail}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>직장 전화번호</th>
                      <td className='table_input'>
                        <TextField
                          id='wrcTelno'
                          name='wrcTelno'
                          value={usptExpert.wrcTelno}
                          onChange={handelChangeInput}
                          variant='outlined'
                          sx={{maxWidth: '480px', width:'100%'}}
                        />
                      </td>
                      <th className='table_input wh' colSpan={2}>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </Box>
              {/* 테이블 mo */}
              <Box className="mo">
                <table>
                  <colgroup>
                    <col width='30%'></col>
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>최종 대학명<em>*</em></th>
                      <td className='table_input'>
                        <TextField
                          id='lastUnivNm'
                          name='lastUnivNm'
                          value={usptExpert.lastUnivNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>학부<em className="star">*</em></th>
                      <td className='table_input'>
                        <TextField
                          id='univDeptNm'
                          name='univDeptNm'
                          value={usptExpert.univDeptNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직장명</th>
                      <td className='table_input'>
                        <TextField
                          id='wrcNm'
                          name='wrcNm'
                          value={usptExpert.wrcNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>부서명</th>
                      <td className='table_input'>
                        <TextField
                          id='deptNm'
                          name='deptNm'
                          value={usptExpert.deptNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직위</th>
                      <td className='table_input'>
                        <TextField
                          id='ofcpsNm'
                          name='ofcpsNm'
                          value={usptExpert.ofcpsNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직무</th>
                      <td className='table_input'>
                        <TextField
                          id='dtyNm'
                          name='dtyNm'
                          value={usptExpert.dtyNm}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th rowSpan={3}>직장주소</th>
                      <td className='table_input noline'>
                        <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100%'}}>
                          <TextField
                            id='wrcAdresZip'
                            name='wrcAdresZip'
                            value={usptExpert.wrcAdresZip}
                            onChange={handelChangeInput}
                            variant='outlined'
                            fullWidth
                          />
                          <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={handleClick}/>
                        </Stack>
                      </td>
                    </tr>
                    <tr>
                      <td className='table_input' colSpan={2}>
                        <TextField
                          id='wrcAdres'
                          name='wrcAdres'
                          value={usptExpert.wrcAdres}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='table_input wh'>
                        <TextField
                          id='wrcAdresDetail'
                          name='wrcAdresDetail'
                          value={usptExpert.wrcAdresDetail}
                          onChange={handelChangeInput}
                          variant='outlined'
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직장 전화번호</th>
                      <td className='table_input'>
                        <TextField
                          id='wrcTelno'
                          name='wrcTelno'
                          value={usptExpert.wrcTelno}
                          onChange={handelChangeInput}
                          variant='outlined'
                          sx={{maxWidth: '480px', width:'100%'}}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
            <Box css={styles.table05}>
              {/* 전문분야 */}
              <Stack direction="row" justifyContent="space-between" className="table_tit">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {'전문분야'} <em>*</em> <span>(복수선택 가능)</span>
                </Typography>
                <Stack direction="row">
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} onClick={deleteItem}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" onClick={addItem}>
                    <PlusIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    changeAllCheck()
                  }}/>} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'5%'}}/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <td className='chkbox'>

                    </td>
                    <th>전문가 분야</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'5%'}}/>
                <col style={{width:'7%'}}/>
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>                      
                      <Box className="checkbox"><Checkbox checked={allCheck} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    changeAllCheck()
                  }}/></Box></th>
                  <th>번호</th>
                  <th>전문가분야</th>
                </tr>
              </thead>
              <tbody>
              <ExpertTable 
              checkList={select} 
              change={changeCheck} 
              data={usptExpertClMapng} 
              updateItem={updateItem} 
              parents_box={parents_box?parents_box.list:[]}
              childs_box={childs_box}
              parents={parents}
              childs={usptExpertClMapng}
              updateItem2={updateItem2}
              />
              </tbody>
            </table>
            </Box>
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
              <CustomButton label={'다음'} type={'listBack'} color={'primary'} onClick={validate}/>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default ExpertApplicationDetail01;


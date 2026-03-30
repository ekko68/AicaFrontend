import React, { useEffect, useState } from "react"
import { useQueries, useQuery } from "react-query";
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import {Box, Stack, IconButton,Checkbox, OutlinedInput } from '@mui/material';
import { fetchCareerInfo, fetchCareerInfoModify } from "~/fetches/biz/fetchBusinessAppMgt";
import { PlusIcon, TrashIcon } from "~/components/IconComponents";
import { UsptAcdmcr, UsptCrqfc,UsptMsvc,UsptEtcCareer,UsptJobCareer,UsptProgrm,UsptWnpz} from "~/models/biz/BusinessAppMgt";
import { CustomEtcCareerPrjcList} from "./View/CustomEtcCareerPrjcList";
import { CustomEtcCareerActList} from "./View/CustomEtcCareerActList";
import { CustomEtcCareerEdcList } from "./View/CustomEtcCareerEdcList";
import { CustomWnpzList } from "./View/CustomWnpzList";
import { CustomProgrmList } from "./View/CustomProgrmList";
import { CustomJobCareerList } from "./View/CustomJobCareerList";
import { CustomRadioButtons } from "~/components/NoticeCustomCheckBoxs";
import DatePicker from '~/components/DatePicker';
import dayjs from "~/../../shared/src/libs/dayjs";
import { CustomAcdmcrList } from "./View/CustomAcdmcrList";
import { CustomCrqfcList } from "./View/CustomCrqfcList";
import { useGlobalModalStore } from "./../../store/GlobalModalStore";
import { CustomButton, DefaultCheckBoxProps } from "~/components/ButtonComponents";
import { fetchGetCommCode } from "~/fetches";

/* 
  작성일    :   2022/06/25
  화면명    :   사업신청관리 / 나의경력관리 -> 나의경력관리
  회면ID    :   UI-USP-FRN-0150101
  화면/개발 :   yhkim2 / navycui
*/
const MyCareerMgt = () => {
  const today = new Date();
  const {addModal} = useGlobalModalStore();
  // const [dataSet, setDataSet] = useState<careerType>();
  const [acdmcrList, setAcdmcrList] = useState<UsptAcdmcr[]>([]);
  const [msvcInfo, setMsvcInfo] = useState<UsptMsvc>();
  const [crqfcList, setCrqfcList] = useState<UsptCrqfc[]>([]);
  const [jobCareerList, setJobCareerList] = useState<UsptJobCareer[]>([]);
  const [etcCareerActList, setEtcCareerActList] = useState<UsptEtcCareer[]>([]);
  const [etcCareerEdcList, setEtcCareerEdcList] = useState<UsptEtcCareer[]>([]);
  const [etcCareerPrjctList, setEtcCareerPrjctList] = useState<UsptEtcCareer[]>([]);
  const [wnpzList, setWnpzList] = useState<UsptWnpz[]>([]);
  const [progrmList, setProgrmList] = useState<UsptProgrm[]>([]);

  const [allCheck, setAllCheck] = useState(false);
  const [select, setSelect]:any = useState([]);

  const [allCheckAcdmcrList, setAllCheckAcdmcrList] = useState(false);
  const [selectAcdmcrList, setSelectAcdmcrList]:any = useState([]);

  const [allCheckJobCareerList, setAllCheckJobCareerList] = useState(false);
  const [selectJobCareerList, setSelectJobCareerList]:any = useState([]);

  const [allCheckEtcCareerActList, setAllCheckEtcCareerActList] = useState(false);
  const [selectEtcCareerActList, setSelectEtcCareerActList]:any = useState([]);
  
  const [allCheckEtcCareerEdcList, setAllCheckEtcCareerEdcList] = useState(false);
  const [selectEtcCareerEdcList, setSelectEtcCareerEdcList]:any = useState([]);

  const [allCheckEtcCareerPrjctList, setAllCheckEtcCareerPrjctList] = useState(false);
  const [selectEtcCareerPrjctList, setSelectEtcCareerPrjctList]:any = useState([]);

  const [allCheckWnpzList, setAllCheckWnpzList] = useState(false);
  const [selectWnpzList, setSelectWnpzList]:any = useState([]);
  
  const [allCheckProgrmList, setAllCheckProgrmList] = useState(false);
  const [selectProgrmList, setSelectProgrmList]:any = useState([]);

  // 공통코드 조회
  const userQueries:any = useQueries(
    [
      'GRDTN_DIV',    // 졸업구분코드
      'MSVC_TYPE',    // 군복무유형코드
      'CAREER_TYPE',  // 경력유형코드
      'PROGRM_TYPE',  // 프로그램유형코드
      'GRAD_TYPE'     // 등급유형코드
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn: () => fetchGetCommCode(TermsType),
      }
    })
  )
  // 경력정보 조회
  const {data,refetch}:any = useQuery("getSiteMap", async () => await fetchCareerInfo(),{
    onSuccess: (data)=> {
      setAcdmcrList(data.acdmcrList)
      setCrqfcList(data.crqfcList)
      setMsvcInfo(data.msvcInfo)
      setJobCareerList(data.jobCareerList)
      setProgrmList(data.progrmList)
      setWnpzList(data.wnpzList)

      if(!!data){
        let {etcCareerList} = data;
        let act = etcCareerList.filter((el:any)=>el.careerTypeCd == 'ACT')
        let prjct = etcCareerList.filter((el:any)=>el.careerTypeCd == 'PRJCT')
        let edc = etcCareerList.filter((el:any)=>el.careerTypeCd == 'EDC')
        setEtcCareerActList(act)
        setEtcCareerEdcList(edc)
        setEtcCareerPrjctList(prjct)
      }
    }
  });
  
  useEffect(() => {
    console.log("useEffectuseEff학력")
    let selectBox:boolean[] = [...selectAcdmcrList];
    if(!!acdmcrList){
      for(let i =selectAcdmcrList.length; i<acdmcrList.length; i++){
        selectBox = selectBox.concat(false);
      }
      let boxshca = acdmcrList.filter(()=>{

      })
      setSelectAcdmcrList(selectBox)
    }
  }, [acdmcrList]); 

  useEffect(() => {
    console.log("useEffectuseEf자격증")
    let selectBox:boolean[] = [...select];
    if(!!crqfcList){
      for(let i =select.length; i<crqfcList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelect(selectBox)
    }
  }, [crqfcList]); 

  useEffect(() => {
    console.log("useEffectuseEf경력")
    let selectBox:boolean[] = [...selectJobCareerList];
    if(!!jobCareerList){
      for(let i =selectJobCareerList.length; i<jobCareerList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelectJobCareerList(selectBox)
    }
  }, [jobCareerList]); 

  useEffect(() => {
    let selectBox:boolean[] = [...selectEtcCareerActList];
    if(!!etcCareerActList){
      for(let i =selectEtcCareerActList.length; i<etcCareerActList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelectEtcCareerActList(selectBox)
    }
  }, [etcCareerActList]); 

  useEffect(() => {
    let selectBox:boolean[] = [...selectEtcCareerEdcList];
    if(!!etcCareerEdcList){
      for(let i =selectEtcCareerEdcList.length; i<etcCareerEdcList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelectEtcCareerEdcList(selectBox)
    }
  }, [etcCareerEdcList]); 

  useEffect(() => {
    let selectBox:boolean[] = [...selectEtcCareerPrjctList];
    if(!!etcCareerPrjctList){
      for(let i =selectEtcCareerPrjctList.length; i<etcCareerPrjctList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelectEtcCareerPrjctList(selectBox)
    }
  }, [etcCareerPrjctList]); 

  useEffect(() => {
    let selectBox:boolean[] = [...selectWnpzList];
    if(!!wnpzList){
      for(let i =selectWnpzList.length; i<wnpzList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelectWnpzList(selectBox)
    }
  }, [wnpzList]); 

  useEffect(() => {
    console.log("progrmList: 프로그램")
    let selectBox:boolean[] = [...selectProgrmList];
    if(!!progrmList){
      for(let i =selectProgrmList.length; i<progrmList.length; i++){
        selectBox = selectBox.concat(false);
      }
      setSelectProgrmList(selectBox)
    }
  }, [progrmList]); 


  // 저장 실행
  const handleSave = () =>{
    let acdmcrList1:any = [];
    for (const key in acdmcrList) {
      acdmcrList1 = [...acdmcrList]
      if (Object.prototype.hasOwnProperty.call(acdmcrList, key)) {
        acdmcrList[key].flag = 'U'
        acdmcrList1[key] = acdmcrList[key];
      }
    
    }
    let crqfcList1:any = [];
    for (const key in crqfcList) {
      crqfcList1 = [...crqfcList]
      if (Object.prototype.hasOwnProperty.call(crqfcList, key)) {
        crqfcList[key].flag = 'U'
        crqfcList1[key] = crqfcList[key];
      }
  
    }
    let jobCareerList1:any = [];
    for (const key in jobCareerList) {
      jobCareerList1 = [...jobCareerList]
      if (Object.prototype.hasOwnProperty.call(jobCareerList, key)) {
        jobCareerList[key].flag = 'U'
        jobCareerList1[key] = jobCareerList[key];
      }
     
    }
    let progrmList1:any = [];
    for (const key in progrmList) {
      progrmList1 = [...progrmList]
      if (Object.prototype.hasOwnProperty.call(progrmList, key)) {
        progrmList[key].flag = 'U'
        progrmList1[key] = progrmList[key];
      }
    
    }
    let wnpzList1:any = [];
    for (const key in wnpzList) {
      wnpzList1 = [...wnpzList]
      if (Object.prototype.hasOwnProperty.call(wnpzList, key)) {
        wnpzList[key].flag = 'U'
        wnpzList1[key] = wnpzList[key];
      }

    }
    let etcCareerActList1:any = [];
    for (const key in etcCareerActList) {
      etcCareerActList1 = [...etcCareerActList]
      if (Object.prototype.hasOwnProperty.call(etcCareerActList, key)) {
        etcCareerActList[key].flag = 'U'
        etcCareerActList1[key] = etcCareerActList[key];
      }
    }
    let etcCareerEdcList1:any = [];
    for (const key in etcCareerEdcList) {
      etcCareerEdcList1 = [...etcCareerEdcList]
      if (Object.prototype.hasOwnProperty.call(etcCareerEdcList, key)) {
        etcCareerEdcList[key].flag = 'U'
        etcCareerEdcList1[key] = etcCareerEdcList[key];
      }
    }
    let etcCareerPrjctList1:any = [];
    for (const key in etcCareerPrjctList) {
      etcCareerPrjctList1 = [...etcCareerPrjctList]
      if (Object.prototype.hasOwnProperty.call(etcCareerPrjctList, key)) {
        etcCareerPrjctList[key].flag = 'U'
        etcCareerPrjctList1[key] = etcCareerPrjctList[key];
      }
    }


   
      let params = {
        acdmcrList:     acdmcrList1,
        crqfcList:      crqfcList1,
        msvcInfo:       msvcInfo,
        jobCareerList:  jobCareerList1,
        progrmList:     progrmList1,
        wnpzList:       wnpzList1,
        etcCareerList:[...etcCareerActList1,...etcCareerEdcList1,...etcCareerPrjctList1]
      }

      fetchCareerInfoModify(params).then(()=>{
        addModal({
          open: true,
          type:'normal',
          content: '저장 되었습니다',
          onConfirm() {
            refetch()
          },
          
        });
      }).catch((e)=>{
        addModal({
          open: true,
          content: e.response.data.message
        });
      })
    
    }


  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">나의경력관리</h2>
           </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom:0}}>
            <Box className="box_guide">
              <ul>
                <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
              </ul>
            </Box>
            {/* 학력 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">학력</h4>
              <Box>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} 
                  onClick={(e)=>{
                    if(allCheckAcdmcrList===true){
                      setAcdmcrList([{acdmcrId: "", bgnde: "", endde: "", flag: '', grdtnDivCd: "", major: "", schulNm: "",rn:(acdmcrList ? acdmcrList.length : 0 ) + 1}]);
                      setAllCheckAcdmcrList(false)
                      setSelectAcdmcrList([false])
                    }else{
                      if(!!acdmcrList){
                        const updated = [...acdmcrList];
                        const updated1 = [...selectAcdmcrList];
                        if(!!acdmcrList){
                          for(let i=acdmcrList.length-1; i>-1; i--){
                            if(selectAcdmcrList[i]===true){
                              updated.splice(i,1);
                              setAcdmcrList(updated)
                              updated1.splice(i,1);
                              setSelectAcdmcrList(updated1);
                            }
                          }
                        }
                      }
                    }
                  }}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e)=>{
                    if(!!acdmcrList){
                      const updated = [...acdmcrList];
                      updated.push({acdmcrId: "", bgnde: "", endde: "", flag: '', grdtnDivCd: "", major: "", schulNm: "",rn:(acdmcrList.length + 1)});
                      setAcdmcrList(updated)
                      setAllCheckAcdmcrList(false);
                    }
                  }}>
                  <PlusIcon />
                </IconButton>
              </Box>
            </Stack>
            {/* mobile 학력  */}
            {/* <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'60%'}}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th>기간</th>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questBeginDay}
                            onChange={handleChangeStart}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                          <div>~</div>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questEndDay}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </td>
                  </tr>
                  <tr>
                    <th>학교명</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>전공</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>졸업구분</th>
                    <td>
                      <FormControl fullWidth>
                        <Select labelId="" id="" sx={{ height: '48px'}}>
                          <MenuItem>AI 분석 전문가</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th>기간</th>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questBeginDay}
                            onChange={handleChangeStart}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                          <div>~</div>
                          <DesktopDatePicker
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            value={questEndDay}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField {...params} />}
                            components={{
                              OpenPickerIcon: DateIcon
                            }}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </td>
                  </tr>
                  <tr>
                    <th>학교명</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>전공</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>졸업구분</th>
                    <td>
                      <FormControl fullWidth>
                        <Select labelId="" id="" sx={{ height: '48px'}}>
                          <MenuItem>AI 분석 전문가</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            {/* mobile 학력 끝  */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'4%'}}/>
                <col style={{width:'30.7%'}}/>
                <col style={{width:'21.4%'}}/>
                <col style={{width:'21.4%'}}/>
                <col style={{width:'21.4%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th><Box className="checkbox"><Checkbox  checked={allCheckAcdmcrList}  
                    onClick={(e)=>{
                      let update = [...selectAcdmcrList];
                      if(allCheckAcdmcrList===false){
                        for(let i =0; i<selectAcdmcrList.length; i++){
                          update[i] = true;
                        }
                      }else if(allCheckAcdmcrList===true){
                        for(let i =0; i<selectAcdmcrList.length; i++){
                          update[i] = false;
                        }
                      }
                      setSelectAcdmcrList(update); 
                      setAllCheckAcdmcrList(!allCheckAcdmcrList)
                  }}/></Box></th>
                  <th>기간</th>
                  <th>학교명</th>
                  <th>전공</th>
                  <th>졸업구분</th>
                </tr>
              </thead>
              <tbody>
                {(acdmcrList.length > 0 ? acdmcrList : [{acdmcrId: "", bgnde: "", endde: "", flag: '', grdtnDivCd: "", major: "", schulNm: "",rn: 0}]).map((item:UsptAcdmcr,key:number) => (
                  <CustomAcdmcrList
                    key={key}
                    checkList = {selectAcdmcrList}
                    data={item}
                    idx={key} 
                    change = {(i:number,k:boolean)=>{
                      //체크 값 변경
                        let update = [...selectAcdmcrList];
                        update[i] = k;
                        setSelectAcdmcrList(update); 
                        if(k===false){
                          setAllCheckAcdmcrList(false)
                        }
                        let b = 0;
                        for(let i =0; i<selectAcdmcrList.length; i++){
                          if(update[i]===true){
                            b++;
                          }
                        }
                        if(b===selectAcdmcrList.length){
                          setAllCheckAcdmcrList(true)   
                        }
                    }}
                    codeList={(userQueries[0].status === 'success') ? userQueries[0].data.list : []} 
                    updateItem={(data:UsptAcdmcr,idx:number) => {
                      const updated:any = [...acdmcrList];
                      if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                        return;
                      } else {
                        updated[idx] = data;
                        setAcdmcrList(updated)
                      }
                  }}/>
                ))}
              </tbody>
            </table>
            {/* //학력 end*/}
            {/* 병역 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">병역</h4>
            </Stack>
            <Box css={styles.table}>
              <div className="detail_table type2"> 
                <dl>
                  <dt>군필여부</dt>
                  <dd><CustomRadioButtons row data={(userQueries[1].status === 'success') ? userQueries[1].data.list : []} 
                    val={!!msvcInfo ? msvcInfo.msvcTypeCd : ''}
                    viewId="군필여부" 
                    onClick={(s:string) => 
                      setMsvcInfo((preState:any)=>({
                        ...preState,msvcTypeCd:s
                      }))
                    }/></dd>
                  <dt>복무기간</dt>
                  <dd>
                    <div className="datepicker" >
                      <DatePicker
                        pickerType='two' 
                        questBeginDay={msvcInfo ? dayjs(msvcInfo.msvcBgnde,'yyyy-MM-dd').toString() : ''} 
                        questEndDay={msvcInfo ? dayjs(msvcInfo.msvcEndde,'yyyy-MM-dd').toString() : ''}
                        changeStart={(newTime: Date | null)=>{
                          setMsvcInfo((preState:any)=>({
                            ...preState,msvcBgnde:dayjs(newTime).format('YYYYMMDD')
                          }))
                        }}
                        changeEnd={(newTime: Date | null)=>{
                          setMsvcInfo((preState:any)=>({
                            ...preState,msvcEndde:dayjs(newTime).format('YYYYMMDD')
                          }))
                        }}
                      />
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>미필 및 면제 사유</dt>
                  <dd><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} 
                    name='msvcExemptReason' 
                    value={msvcInfo ? msvcInfo.msvcExemptReason : ''} 
                    onChange={(e:any)=>{
                      setMsvcInfo((preState:any)=>({
                      ...preState,msvcExemptReason:e.target.value
                    }))
                  }} /></dd>
                </dl>
              </div>
            </Box>
            {/* //병역  end*/}
            
            {/* 자격증 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">자격증</h4>
              <Box>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} 
                  onClick={(e)=>{
                    if(allCheck===true){
                      setCrqfcList([{crqfcId:'',crqfcNm:'',grad:'',   acqdt:'',  athrzInstt:'',flag:'',rn:(crqfcList.length + 1)}])
                      setAllCheck(false)
                      setSelect([false])
                    }else{
                      if(!!crqfcList){
                        const updated = [...crqfcList];
                        const updated1 = [...select];
                        if(!!crqfcList){
                          for(let i= crqfcList.length-1; i>-1; i--){
                            if(select[i]===true){
                              updated.splice(i,1);
                              setCrqfcList(updated)
                              updated1.splice(i,1);
                              setSelect(updated1);
                            }
                          }
                        }
                      }
                    }
                  }}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e)=>{
                    if(!!crqfcList){
                      const updated = [...crqfcList];
                      updated.push({crqfcId:'',crqfcNm:'',grad:'',   acqdt:'',  athrzInstt:'',flag:'',rn:(crqfcList.length + 1)});
                      setCrqfcList(updated)
                      setAllCheck(false);
                    }
                  }}>
                  <PlusIcon />
                </IconButton>
              </Box>
            </Stack>
            {/* mobile 자격증  */}
            {/* <div className="mo">
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="전체선택" className="checkbox" />
              </FormGroup>
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'10%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'60%'}}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                    <th>자격명칭</th>
                    <td>
                      <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                    </td>
                  </tr>
                  <tr>
                    <th>등급</th>
                    <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                  </tr>
                  <tr>
                    <th>취득일</th>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat={"yyyy-MM-dd"}
                          mask={"____-__-__"}
                          value={questBeginDay}
                          onChange={handleChangeStart}
                          renderInput={(params) => <TextField {...params} />}
                          components={{
                            OpenPickerIcon: DateIcon
                          }}
                        />
                      </LocalizationProvider>
                    </td>
                  </tr>
                  <tr>
                    <th>검정기관</th>
                    <td>
                      <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div> */}
            {/* mobile 자격증  */}
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'4%'}}/>
                <col style={{width:'26%'}}/>
                <col style={{width:'26%'}}/>
                <col style={{width:'14%'}}/>
                <col style={{width:'28%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th><Box className="checkbox"><Checkbox checked={allCheck}  
                    onClick={(e)=>{
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
                  }}/></Box></th>
                  <th>자격명칭</th>
                  <th>등급</th>
                  <th>취득일</th>
                  <th>검정기관</th>
                </tr>
              </thead>
              <tbody>
                {/* <CustomCrqfc/> */}
                {(crqfcList.length > 0 ? crqfcList : [{crqfcId:'',crqfcNm:'',grad:'',   acqdt:'',  athrzInstt:'',flag:'',rn:0}]).map((item:UsptCrqfc,key:number) => (
                  <CustomCrqfcList key={key} 
                    data={item}
                    i={key}
                    updateItem={(data:UsptCrqfc,idx:number) => {
                      const updated:any = [...crqfcList];
                      updated[idx] = data;
                      setCrqfcList(updated)
                    }}
                    change = {(i:number,k:boolean)=>{
                      //체크 값 변경
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
                    }}
                    checkList={select}
                  />
                  ))}
              </tbody>
            </table> 
            {/* //자격증 */}

            {/* 경력 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">경력</h4>
              <Box>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }} 
                  onClick={(e)=>{
                    if(allCheckJobCareerList===true){
                      setJobCareerList([{jobCareerId:'',wrkplc:'',bgnde:'',endde:'',job:'',retireResn:'',flag:'',rn:(jobCareerList ? jobCareerList.length : 0 ) + 1}]);
                      setAllCheckJobCareerList(false)
                      setSelectJobCareerList([false])
                    }else{
                      if(!!jobCareerList){
                        const updated = [...jobCareerList];
                        const updated1 = [...selectJobCareerList];
                        if(!!jobCareerList){
                          for(let i=jobCareerList.length-1; i>-1; i--){
                            if(selectJobCareerList[i]===true){
                              updated.splice(i,1);
                              setJobCareerList(updated)
                              updated1.splice(i,1);
                              setSelectJobCareerList(updated1);
                            }
                          }
                        }
                      }
                    }
                  }}>
                  <TrashIcon />
                </IconButton>
                <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                  onClick={(e)=>{
                    if(!!jobCareerList){
                      const updated = [...jobCareerList];
                      updated.push({jobCareerId:'',wrkplc:'',bgnde:'',endde:'',job:'',retireResn:'',flag:'',rn:(jobCareerList.length + 1)});
                      setJobCareerList(updated)
                      setAllCheckJobCareerList(false);
                    }
                  }}>
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
                    <col style={{width:'10%'}}/>
                    <col style={{width:'30%'}}/>
                    <col style={{width:'60%'}}/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>근무처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>근무기간</th>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questBeginDay}
                              onChange={handleChangeStart}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                            <div>~</div>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questEndDay}
                              onChange={handleChangeEnd}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </td>
                    </tr>
                    <tr>
                      <th>담당업무</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>퇴사사유</th>
                      <td>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan={4} className='chkbox'><Box className="checkbox"><Checkbox /></Box></td>
                      <th>근무처</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>근무기간</th>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack direction="column" alignItems="center" spacing={0} sx={{ maxWidth: 360, margin:'0 auto' }}>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questBeginDay}
                              onChange={handleChangeStart}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                            <div>~</div>
                            <DesktopDatePicker
                              inputFormat={"yyyy-MM-dd"}
                              mask={"____-__-__"}
                              value={questEndDay}
                              onChange={handleChangeEnd}
                              renderInput={(params) => <TextField {...params} />}
                              components={{
                                OpenPickerIcon: DateIcon
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </td>
                    </tr>
                    <tr>
                      <th>담당업무</th>
                      <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                    </tr>
                    <tr>
                      <th>퇴사사유</th>
                      <td>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'4%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'22%'}}/>
                </colgroup>
                <thead>
                  <tr>
                  <th><Box className="checkbox"><Checkbox  checked={allCheckJobCareerList}  
                    onClick={(e)=>{
                      let update = [...selectJobCareerList];
                      if(allCheckJobCareerList===false){
                        for(let i =0; i<selectJobCareerList.length; i++){
                          update[i] = true;
                        }
                      }else if(allCheckJobCareerList===true){
                        for(let i =0; i<selectJobCareerList.length; i++){
                          update[i] = false;
                        }
                      }
                      setSelectJobCareerList(update); 
                      setAllCheckJobCareerList(!allCheckJobCareerList)
                  }}/></Box></th>
                    <th>근무처</th>
                    <th>근무기간</th>
                    <th>담당업무</th>
                    <th>퇴사사유</th>
                  </tr>
                </thead>
                <tbody>
                {/* CustomJobCareerList */}
                  {(jobCareerList.length > 0 ? jobCareerList : [{jobCareerId:'',wrkplc:'',bgnde:'',endde:'',job:'',retireResn:'',flag:'',rn:0}]).map((item:UsptJobCareer,key:number) => (
                    <CustomJobCareerList 
                      key={key}
                      checkList = {selectJobCareerList}
                      data={item}
                      idx={key} 
                      change = {(i:number,k:boolean)=>{
                        //체크 값 변경
                          let update = [...selectJobCareerList];
                          update[i] = k;
                          setSelectJobCareerList(update); 
                          if(k===false){
                            setAllCheckJobCareerList(false)
                          }
                          let b = 0;
                          for(let i =0; i<selectJobCareerList.length; i++){
                            if(update[i]===true){
                              b++;
                            }
                          }
                          if(b===selectJobCareerList.length){
                            setAllCheckJobCareerList(true)   
                          }
                      }}
                      updateItem={(data:UsptAcdmcr,idx:number) => {
                        const updated:any = [...jobCareerList];
                        if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                          return;
                        } else {
                          updated[idx] = data;
                          setJobCareerList(updated)
                        }
                      }}/>
                    ))}
                </tbody>
              </table>
              {/* //경력 */}

              {/* 대외활동 */}
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">대외활동</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
                    onClick={(e)=>{
                      if(allCheckEtcCareerActList===true){
                        setEtcCareerActList([{etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:(etcCareerActList ? etcCareerActList.length : 0 ) + 1}]);
                        setAllCheckEtcCareerActList(false)
                        setSelectEtcCareerActList([false])
                      }else{
                        if(!!etcCareerActList){
                          const updated = [...etcCareerActList];
                          const updated1 = [...selectEtcCareerActList];
                          if(!!etcCareerActList){
                            for(let i=etcCareerActList.length-1; i>-1; i--){
                              if(selectEtcCareerActList[i]===true){
                                updated.splice(i,1);
                                setEtcCareerActList(updated)
                                updated1.splice(i,1);
                                setSelectEtcCareerActList(updated1);
                              }
                            }
                          }
                        }
                      }
                    }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                    onClick={(e)=>{
                      if(!!etcCareerActList){
                        const updated = [...etcCareerActList];
                        updated.push({etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:(etcCareerActList ? etcCareerActList.length : 0 ) + 1});
                        setEtcCareerActList(updated)
                        setAllCheckEtcCareerActList(false);
                      }
                    }}>
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Stack>
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'4%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'22%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <Box className="checkbox">
                      <Checkbox  checked={allCheckEtcCareerActList}  
                        onClick={(e)=>{
                          let update = [...selectEtcCareerActList];
                          if(allCheckEtcCareerActList===false){
                            for(let i =0; i<selectEtcCareerActList.length; i++){
                              update[i] = true;
                            }
                          }else if(allCheckEtcCareerActList===true){
                            for(let i =0; i<selectEtcCareerActList.length; i++){
                              update[i] = false;
                            }
                          }
                          setSelectEtcCareerActList(update); 
                          setAllCheckEtcCareerActList(!allCheckEtcCareerActList)
                      }}/>
                      </Box>
                    </th>
                    <th>활동명</th>
                    <th>활동기간</th>
                    <th>활동내용</th>
                    <th>활동기간</th>
                  </tr>
                </thead>
                <tbody>
                {(etcCareerActList.length > 0 ? etcCareerActList : [{etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn: 0}]).map((item:UsptEtcCareer,key:number) =>(
                  <CustomEtcCareerActList 
                    key={key}
                    checkList = {selectEtcCareerActList}
                    data={item}
                    idx={key}
                    change = {(i:number,k:boolean)=>{
                      //체크 값 변경
                        let update = [...selectEtcCareerActList];
                        update[i] = k;
                        setSelectEtcCareerActList(update); 
                        if(k===false){
                          setAllCheckEtcCareerActList(false)
                        }
                        let b = 0;
                        for(let i =0; i<selectEtcCareerActList.length; i++){
                          if(update[i]===true){
                            b++;
                          }
                        }
                        if(b===selectEtcCareerActList.length){
                          setAllCheckEtcCareerActList(true)   
                        }
                    }}
                    updateItem={(data:UsptAcdmcr,idx:number) => {
                      const updated:any = [...etcCareerActList];
                      if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                        return;
                      } else {
                        updated[idx] = data;
                        setEtcCareerActList(updated)
                      }
                    }}/>
                  ))}
                </tbody>
              </table>
              {/* //대외활동 */}

              {/* 외부교육 */}
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">외부교육</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
                    onClick={(e)=>{
                      if(allCheckEtcCareerEdcList===true){
                        setEtcCareerEdcList([{etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:(etcCareerEdcList ? etcCareerEdcList.length : 0 ) + 1}]);
                        setAllCheckEtcCareerEdcList(false)
                        setSelectEtcCareerEdcList([false])
                      }else{
                        if(!!etcCareerEdcList){
                          const updated = [...etcCareerEdcList];
                          const updated1 = [...selectEtcCareerEdcList];
                          if(!!etcCareerEdcList){
                            for(let i=etcCareerEdcList.length-1; i>-1; i--){
                              if(selectEtcCareerEdcList[i]===true){
                                updated.splice(i,1);
                                setEtcCareerEdcList(updated)
                                updated1.splice(i,1);
                                setSelectEtcCareerEdcList(updated1);
                              }
                            }
                          }
                        }
                      }
                    }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                    onClick={(e)=>{
                      if(!!etcCareerEdcList){
                        const updated = [...etcCareerEdcList];
                        updated.push({etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:(etcCareerEdcList ? etcCareerEdcList.length : 0 ) + 1});
                        setEtcCareerEdcList(updated)
                        setAllCheckEtcCareerEdcList(false);
                      }
                    }}>
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Stack>
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'4%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'22%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <Box className="checkbox">
                      <Checkbox  checked={allCheckEtcCareerEdcList}  
                        onClick={(e)=>{
                          let update = [...selectEtcCareerEdcList];
                          if(allCheckEtcCareerEdcList===false){
                            for(let i =0; i<selectEtcCareerEdcList.length; i++){
                              update[i] = true;
                            }
                          }else if(allCheckEtcCareerEdcList===true){
                            for(let i =0; i<selectEtcCareerEdcList.length; i++){
                              update[i] = false;
                            }
                          }
                          setSelectEtcCareerEdcList(update); 
                          setAllCheckEtcCareerEdcList(!allCheckEtcCareerEdcList)
                      }}/>
                      </Box>
                    </th>
                    <th>활동명</th>
                    <th>활동기간</th>
                    <th>활동내용</th>
                    <th>활동기간</th>
                  </tr>
                </thead>
                <tbody>
                {(etcCareerEdcList.length > 0 ? etcCareerEdcList : [{etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:0}]).map((item:UsptEtcCareer,key:number) =>(
                  <CustomEtcCareerEdcList 
                    key={key}
                    checkList = {selectEtcCareerEdcList}
                    data={item}
                    idx={key}
                    change = {(i:number,k:boolean)=>{
                      //체크 값 변경
                        let update = [...selectEtcCareerEdcList];
                        update[i] = k;
                        setSelectEtcCareerEdcList(update); 
                        if(k===false){
                          setAllCheckEtcCareerEdcList(false)
                        }
                        let b = 0;
                        for(let i =0; i<selectEtcCareerEdcList.length; i++){
                          if(update[i]===true){
                            b++;
                          }
                        }
                        if(b===selectEtcCareerEdcList.length){
                          setAllCheckEtcCareerEdcList(true)   
                        }
                    }}
                    updateItem={(data:UsptAcdmcr,idx:number) => {
                      const updated:any = [...etcCareerEdcList];
                      if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                        return;
                      } else {
                        updated[idx] = data;
                        setEtcCareerEdcList(updated)
                      }
                    }}/>
                  ))}
                </tbody>
              </table>
              {/* //외부교육 */}

              {/* 프로젝트 */}
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">프로젝트</h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
                    onClick={(e)=>{
                      if(allCheckEtcCareerPrjctList===true){
                        setEtcCareerPrjctList([{etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:(etcCareerPrjctList ? etcCareerPrjctList.length : 0 ) + 1}]);
                        setAllCheckEtcCareerPrjctList(false)
                        setSelectEtcCareerPrjctList([false])
                      }else{
                        if(!!etcCareerPrjctList){
                          const updated = [...etcCareerPrjctList];
                          const updated1 = [...selectEtcCareerPrjctList];
                          if(!!etcCareerPrjctList){
                            for(let i=etcCareerPrjctList.length-1; i>-1; i--){
                              if(selectEtcCareerPrjctList[i]===true){
                                updated.splice(i,1);
                                setEtcCareerPrjctList(updated)
                                updated1.splice(i,1);
                                setSelectEtcCareerPrjctList(updated1);
                              }
                            }
                          }
                        }
                      }
                    }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                    onClick={(e)=>{
                      if(!!etcCareerPrjctList){
                        const updated = [...etcCareerPrjctList];
                        updated.push({etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn:(etcCareerPrjctList ? etcCareerPrjctList.length : 0 ) + 1});
                        setEtcCareerPrjctList(updated)
                        setAllCheckEtcCareerPrjctList(false);
                      }
                    }}>
                    <PlusIcon />
                  </IconButton>
                </Box>
              </Stack>
              <table className="tableDefault type5 pc">
                <colgroup>
                  <col style={{width:'4%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'30%'}}/>
                  <col style={{width:'22%'}}/>
                  <col style={{width:'22%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <Box className="checkbox">
                      <Checkbox  checked={allCheckEtcCareerPrjctList}  
                        onClick={(e)=>{
                          let update = [...selectEtcCareerPrjctList];
                          if(allCheckEtcCareerPrjctList===false){
                            for(let i =0; i<selectEtcCareerPrjctList.length; i++){
                              update[i] = true;
                            }
                          }else if(allCheckEtcCareerPrjctList===true){
                            for(let i =0; i<selectEtcCareerPrjctList.length; i++){
                              update[i] = false;
                            }
                          }
                          setSelectEtcCareerPrjctList(update); 
                          setAllCheckEtcCareerPrjctList(!allCheckEtcCareerPrjctList)
                      }}/>
                      </Box>
                    </th>
                    <th>활동명</th>
                    <th>활동기간</th>
                    <th>활동내용</th>
                    <th>활동기간</th>
                  </tr>
                </thead>
                <tbody>
                {(etcCareerPrjctList.length > 0 ? etcCareerPrjctList : [{etcCareerId:'',careerNm:'',careerTypeCd:'',bgnde:'',endde:'',cn:'',instt:'',flag:'',rn: 0}]).map((item:UsptEtcCareer,key:number) =>(
                  <CustomEtcCareerPrjcList 
                    key={key}
                    checkList = {selectEtcCareerPrjctList}
                    data={item}
                    idx={key}
                    change = {(i:number,k:boolean)=>{
                      //체크 값 변경
                        let update = [...selectEtcCareerPrjctList];
                        update[i] = k;
                        setSelectEtcCareerPrjctList(update); 
                        if(k===false){
                          setAllCheckEtcCareerPrjctList(false)
                        }
                        let b = 0;
                        for(let i =0; i<selectEtcCareerPrjctList.length; i++){
                          if(update[i]===true){
                            b++;
                          }
                        }
                        if(b===selectEtcCareerPrjctList.length){
                          setAllCheckEtcCareerPrjctList(true)   
                        }
                    }}
                    updateItem={(data:UsptAcdmcr,idx:number) => {
                      const updated:any = [...etcCareerPrjctList];
                      if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                        return;
                      } else {
                        updated[idx] = data;
                        setEtcCareerPrjctList(updated)
                      }
                    }}/>
                  ))}
                </tbody>
              </table>
              {/* //프로젝트 */}

            {/* 수상 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">수상 <span className="must">*</span></h4>
                <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
                    onClick={(e)=>{
                      if(allCheckWnpzList===true){
                        setWnpzList([{wnpzId:'',wnpzNm:'',acqdt:'', isuInstt:'',flag:'',rn:(wnpzList ? wnpzList.length : 0 ) + 1}]);
                        setAllCheckWnpzList(false)
                        setSelectWnpzList([false])
                      }else{
                        if(!!wnpzList){
                          const updated = [...wnpzList];
                          const updated1 = [...selectWnpzList];
                          if(!!wnpzList){
                            for(let i=wnpzList.length-1; i>-1; i--){
                              if(selectWnpzList[i]===true){
                                updated.splice(i,1);
                                setWnpzList(updated)
                                updated1.splice(i,1);
                                setSelectWnpzList(updated1);
                              }
                            }
                          }
                        }
                      }
                    }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                    onClick={(e)=>{
                      if(!!wnpzList){
                        const updated = [...wnpzList];
                        updated.push({wnpzId:'',wnpzNm:'',acqdt:'', isuInstt:'',flag:'',rn:(wnpzList ? wnpzList.length : 0 ) + 1});
                        setWnpzList(updated)
                        setAllCheckWnpzList(false);
                      }
                    }}>
                    <PlusIcon />
                  </IconButton>
                </Box>
            </Stack>

            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'4%'}}/>
                <col style={{width:'39%'}}/>
                <col style={{width:'16%'}}/>
                <col style={{width:'42%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th>
                  <Box className="checkbox">
                      <Checkbox  checked={allCheckWnpzList}  
                        onClick={(e)=>{
                          let update = [...selectWnpzList];
                          if(allCheckWnpzList===false){
                            for(let i =0; i<selectWnpzList.length; i++){
                              update[i] = true;
                            }
                          }else if(allCheckWnpzList===true){
                            for(let i =0; i<selectWnpzList.length; i++){
                              update[i] = false;
                            }
                          }
                          setSelectWnpzList(update); 
                          setAllCheckWnpzList(!allCheckWnpzList)
                      }}/>
                      </Box>
                  </th>
                  <th>종류</th>
                  <th>취득일</th>
                  <th>발행기관</th>
                </tr>
              </thead>
              <tbody>
                {(wnpzList.length > 0 ? wnpzList : [{wnpzId:'',wnpzNm:'',acqdt:'', isuInstt:'',flag:'',rn:0}]).map((item:UsptWnpz,key:number) =>(
                  <CustomWnpzList 
                    key={key}
                    checkList = {selectWnpzList}
                    data={item}
                    idx={key}
                    change = {(i:number,k:boolean)=>{
                      //체크 값 변경
                        let update = [...selectWnpzList];
                        update[i] = k;
                        setSelectWnpzList(update); 
                        if(k===false){
                          setAllCheckWnpzList(false)
                        }
                        let b = 0;
                        for(let i =0; i<selectWnpzList.length; i++){
                          if(update[i]===true){
                            b++;
                          }
                        }
                        if(b===selectWnpzList.length){
                          setAllCheckWnpzList(true)   
                        }
                    }}
                    updateItem={(data:UsptAcdmcr,idx:number) => {
                      const updated:any = [...wnpzList];
                      if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                        return;
                      } else {
                        updated[idx] = data;
                        setWnpzList(updated)
                      }
                    }}/>
                  ))}
                </tbody>
            </table>
            {/* //수상 */}

            {/* 프로그램명 */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
              <h4 className="sub_title">프로그램 <span className="must">*</span></h4>
               <Box>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
                    onClick={(e)=>{
                      if(allCheckProgrmList===true){
                        setProgrmList([{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'',rn:(progrmList ? progrmList.length : 0 ) + 1}]);
                        setAllCheckProgrmList(false)
                        setSelectProgrmList([false])
                      }else{
                        if(!!progrmList){
                          const updated = [...progrmList];
                          const updated1 = [...selectProgrmList];
                          if(!!progrmList){
                            for(let i=progrmList.length-1; i>-1; i--){
                              if(selectProgrmList[i]===true){
                                updated.splice(i,1);
                                setProgrmList(updated)
                                updated1.splice(i,1);
                                setSelectProgrmList(updated1);
                              }
                            }
                          }
                        }
                      }
                    }}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="large" edge="start" color="inherit" aria-label="delete"
                    onClick={(e)=>{
                      if(!!progrmList){
                        const updated = [...progrmList];
                        updated.push({progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'',rn:(progrmList ? progrmList.length : 0 ) + 1});
                        setProgrmList(updated)
                        setAllCheckProgrmList(false);
                      }
                    }}>
                    <PlusIcon />
                  </IconButton>
               </Box>
            </Stack>
            <table className="tableDefault type5 pc">
              <colgroup>
                <col style={{width:'4%'}}/>
                <col style={{width:'63%'}}/>
                <col style={{width:'33%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th className="checkbox">
                    <Checkbox  checked={allCheckProgrmList}  
                      onClick={(e)=>{
                        let update = [...selectProgrmList];
                        if(allCheckProgrmList===false){
                          for(let i =0; i<selectProgrmList.length; i++){
                            update[i] = true;
                          }
                        }else if(allCheckProgrmList===true){
                          for(let i =0; i<selectProgrmList.length; i++){
                            update[i] = false;
                          }
                        }
                        setSelectProgrmList(update);
                        setAllCheckProgrmList(!allCheckProgrmList)
                    }}/>
                  </th>
                  <th>프로그램명</th>
                  <th>프로그램 능력</th>
                </tr>
              </thead>
              <tbody>
              {(progrmList.length > 0 ? progrmList : [{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'',rn: 0}]).map((item:UsptProgrm,key:number) =>(
                <CustomProgrmList 
                  key={key}
                  checkList = {selectProgrmList}
                  data={item}
                  idx={key}
                  change = {(i:number,k:boolean)=>{
                    //체크 값 변경
                      let update = [...selectProgrmList];
                      update[i] = k;
                      setSelectProgrmList(update); 
                      if(k===false){
                        setAllCheckProgrmList(false)
                      }
                      let b = 0;
                      for(let i =0; i<selectProgrmList.length; i++){
                        if(update[i]===true){
                          b++;
                        }
                      }
                      console.log('선택한 값 :', selectProgrmList.length[3] );
                      if(b===selectProgrmList.length){
                        setAllCheckProgrmList(true)   
                      }
                  }}
                  GradCodeList={(userQueries[3].status === 'success') ? userQueries[3].data.list : []} 
                  ProgrmCodeList={(userQueries[4].status === 'success') ? userQueries[4].data.list : []} 
                  updateItem={(data:UsptProgrm,idx:number) => {
                    const updated:any = [...progrmList];
                    if(JSON.stringify(updated[idx]) === JSON.stringify(data)){
                      return;
                    } else {
                      updated[idx] = data;
                      setProgrmList(updated)
                    }
                  }}/>
                ))}
              </tbody>
            </table>
            
             {/* <CustomProgrmListTodo
              GradCodeList={(userQueries[3].status === 'success') ? userQueries[3].data.list : []} 
              ProgrmCodeList={(userQueries[4].status === 'success') ? userQueries[4].data.list : []} 
              dataList={progrmList}
              onChangeBox={(usptdata: UsptProgrm[]) => {
                let demobox = [...usptdata]
                setProgrmList(demobox)
                if (usptdata.length > 0) console.log(usptdata);
              }}
              // children={<Box>todo list</Box>}
            /> */}

            {/* <table className="tableDefault type5 mo">
              <colgroup>
                <col style={{width:'4%'}}/>
                <col style={{width:'63%'}}/>
                <col style={{width:'33%'}}/>
              </colgroup>
              <thead>
                <tr>
                  <th className="checkbox">
                    <Checkbox />
                  </th>
                  <th>프로그램명</th>
                  <th>프로그램 능력</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="checkbox"><Checkbox /></td>
                  <td>
                    <Box css={styles.inputBox}>
                      <FormControl>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'50%'}} />
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">업아이디창어</MenuItem>
                          <MenuItem value="CATE-STEP-02">구인/구직</MenuItem>
                          <MenuItem value="CATE-STEP-03">제안/기타</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td className="vat">
                    <Box css={styles.inputBox}>
                      <FormControl sx={{ width: '100%'}}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">상</MenuItem>
                          <MenuItem value="CATE-STEP-02">중</MenuItem>
                          <MenuItem value="CATE-STEP-03">하</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td className="checkbox"><Checkbox /></td>
                  <td>
                    <Box css={styles.inputBox}>
                      <FormControl>
                        <OutlinedInput size="small" className="ipt_tp01" sx={{width:'50%'}} />
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">업아이디창어</MenuItem>
                          <MenuItem value="CATE-STEP-02">구인/구직</MenuItem>
                          <MenuItem value="CATE-STEP-03">제안/기타</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td className="vat">
                    <Box css={styles.inputBox}>
                      <FormControl sx={{ width: '100%'}}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value='test'
                        >
                          <MenuItem value="CATE-STEP-01">상</MenuItem>
                          <MenuItem value="CATE-STEP-02">중</MenuItem>
                          <MenuItem value="CATE-STEP-03">하</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                </tr>
              </tbody>
            </table> */}
            {/* //프로그램명 */}

            <Stack direction="row" justifyContent="center" sx={{marginTop: '40px'}} css={styles.btn_next}>
              <CustomButton label={'저장'} type={'listBack'} color={'primary'} onClick={handleSave}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default MyCareerMgt;

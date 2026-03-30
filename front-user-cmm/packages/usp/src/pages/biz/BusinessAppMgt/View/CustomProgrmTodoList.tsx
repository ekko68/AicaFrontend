import React, { CSSProperties, useEffect,useReducer,useState } from "react"
import * as styles from '../styles';
import styled from "@emotion/styled";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { UsptProgrm} from "~/models/biz/BusinessAppMgt";
import { codeType } from "~/models/ModelCode";
import { PlusIcon, TrashIcon } from "~/components/IconComponents";
import { FormControl, OutlinedInput, Select } from "@mui/material";
import { SelectIcon } from "~/components/IconComponents";
import { fetchCareerInfo } from "~/fetches/biz/fetchBusinessAppMgt";
import { useQuery } from "react-query";
/* 
  작성일    :   2022/06/28
  화면명    :   나의경력관리 -> 프로그램 
  회면ID    :   CustomProgrmList
  화면/개발 :   yhkim2 / navycui
*/
export const CustomProgrmListTodo: React.FC<{
  GradCodeList:codeType[]
  ProgrmCodeList:codeType[]
  dataList: UsptProgrm[];                       // 데이터 전달
  justifyContent?: 'center' | 'right' | 'left';
  row?: boolean;
  style?: CSSProperties;
  children?: React.ReactNode;
  onChangeBox?: (dataBox: UsptProgrm[]) => void; // 데이터 반환
  
}> = props => {
  const [disabled,setDdisabled] = useState(true);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [checkAll,setCheckAll]  = useState<boolean>(false);
  const [dataBox,setDataBox]  = useState<UsptProgrm[]>([{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'I',rn: 0}]);
  
  // 경력정보 조회
  const {data,refetch}:any = useQuery(["CustomProgrmListTodo",dataBox], async () => await fetchCareerInfo(),{
    onSuccess: (data)=> {
      setDataBox(data.progrmList)
    }
  });

  // data 초기화
  useEffect(() => {
    refetch()
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


  // useEffect(() => {
  //   if(disabled){
  //     setData((pre)=>({...pre,
  //       progrmTypeInput: ''
  //     }))
  //   }
  // }, [disabled]);



  // 입력 저장
  const handleOnChange = (e:any,key:number) => {
    if (e.currentTarget == null) {
      return;
    }
    const upBoxs:UsptProgrm[] = [...dataBox];
    upBoxs[key].progrmTypeInput = e.currentTarget.value;
    setDataBox(upBoxs)
  };

  const handleOnChangeSelect= (e:any,key:number) => {
    const inputList = document.querySelectorAll(`[name='progrmTypeInput']`)
    const upBoxs:UsptProgrm[] = [...dataBox];
    upBoxs[key].progrmTypeCd = e.target.value;
    setDataBox(upBoxs)
    if(upBoxs[key].progrmTypeCd == 'ETC'){
      // inputList[key].setAttribute('disabled','false')
      setDdisabled(false)
    } else {
      upBoxs[key].progrmTypeInput = ''
      // inputList[key].setAttribute('disabled','true')
      setDdisabled(true)
      setDataBox(upBoxs)
    }
  };

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
        <h4 className="sub_title">프로그램 <span className="must">*</span></h4>
          <Box>
            <IconButton size="large" edge="start" color="inherit" aria-label="delete" sx={{ mr: 1.5 }}
              onClick={(e)=>{
                if(checkAll===true){
                  setDataBox([{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'I',rn: 0}]);
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
                // if(allCheckProgrmList===true){
                //   setProgrmList([{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'',rn:(progrmList ? progrmList.length : 0 ) + 1}]);
                //   setAllCheckProgrmList(false)
                //   setSelectProgrmList([false])
                // }else{
                //   if(!!progrmList){
                //     const updated = [...progrmList];
                //     const updated1 = [...selectProgrmList];
                //     if(!!progrmList){
                //       for(let i=progrmList.length-1; i>-1; i--){
                //         if(selectProgrmList[i]===true){
                //           updated.splice(i,1);
                //           setProgrmList(updated)
                //           updated1.splice(i,1);
                //           setSelectProgrmList(updated1);
                //         }
                //       }
                //     }
                //   }
                // }
              }}>
              <TrashIcon />
            </IconButton>
            <IconButton size="large" edge="start" color="inherit" aria-label="delete"
              onClick={()=>{
                if(!!dataBox){
                  setDataBox((pre:any)=>([...pre,{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'I',rn: 0}]))
                  setCheckAll(false);
                }
                // if(!!progrmList){
                //   const updated = [...progrmList];
                //   updated.push({progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'',rn:(progrmList ? progrmList.length : 0 ) + 1});
                //   setProgrmList(updated)
                //   setAllCheckProgrmList(false);
                // }
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
              {/* <Checkbox  
                checked={allCheckProgrmList}  
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
              }}/> */}
            </th>
            <th>프로그램명</th>
            <th>프로그램 능력</th>
          </tr>
        </thead>
        <tbody>
        { dataBox.map((item, i) => {
          return (
            <tr key={i}>
              <td className="checkbox">   
                <Checkbox 
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
              <td>
                <Box css={styles.inputBox}>
                  <OutlinedInput value={item.progrmTypeInput} disabled={disabled} name='progrmTypeInput' 
                    onChange={(e)=>{handleOnChange(e,i)}} size="small" className="ipt_tp01" sx={{width:'50%'}}/>
                  <FormControl sx={{ width: '100%'}}>
                    <Select
                      value={item.progrmTypeCd}
                      name='progrmTypeCd'
                      onChange={(e)=>{handleOnChangeSelect(e,i)}}
                      displayEmpty
                      sx={{ height: '48px'}}
                      inputProps={{ 'aria-label': '전체' }}
                      IconComponent = {SelectIcon}
                      MenuProps={MenuProps}
                      // IconComponent = {SelectIcon}
                    >
                      {props.GradCodeList ? props.GradCodeList.map((option:any,key:number) => (
                        <SelectItemStyle key={key} value={option.code}>
                          {option.codeNm}
                        </SelectItemStyle>
                      )) : []}
                    </Select>
                  </FormControl>
                </Box>
              </td>
              <td>
                <Box css={styles.inputBox}>
                <FormControl sx={{ width: '100%'}}>
                    <Select
                      value={item.gradTypeCd}
                      name='gradTypeCd'
                      onChange={(e)=>{
                        const upBoxs:UsptProgrm[] = [...dataBox];
                        upBoxs[i].gradTypeCd = e.target.value;
                        setDataBox(upBoxs)
                      }}
                      displayEmpty
                      sx={{ height: '48px'}}
                      inputProps={{ 'aria-label': '전체' }}
                      IconComponent = {SelectIcon}
                      MenuProps={MenuProps}
                      // IconComponent = {SelectIcon}
                    >
                      {props.ProgrmCodeList ? props.ProgrmCodeList.map((option:any,key:number) => (
                        <SelectItemStyle key={key} value={option.code}>
                            {option.codeNm}
                        </SelectItemStyle>
                      )) : []}
                    </Select>
                  </FormControl>
                </Box>
              </td>
            </tr>

            // <FormControlLabel
            //   key={i}
            //   control={
            //     <CheckboxStyle
            //       {...m}
            //       value={selected[i] || ''} 
            //       checked={selected[i] || false}
            //       onChange={((e)=>{
            //           //체크 값 변경
            //           let k = e.target.checked;
            //             let update = [...selected];
            //             update[i] = k;
            //             setSelected(update); 
            //             if(k===false){
            //               setCheckAll(false)
            //             }
            //             let b = 0;
            //             for(let i =0; i<selected.length; i++){
            //               if(update[i]===true){
            //                 b++;
            //               }
            //             }
            //             if(b===selected.length){
            //               setCheckAll(true)   
            //             }
            //       })}
            //     />
            //   }
            //   label={''}
            // />
            )
          })}
        {/* {(progrmList.length > 0 ? progrmList : [{progrmId:'', progrmTypeCd:'',progrmTypeInput:'',gradTypeCd:'',flag:'',rn: 0}]).map((item:UsptProgrm,key:number) =>(
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
              updated[idx] = data;
              setProgrmList(updated)
            }}/>
          ))} */}
        </tbody>
      </table>
    </>
  )
}
const MenuProps = {
  PaperProps: {
      style: {
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



// import React, { useEffect, useState } from "react"
// import { useQueries, useQuery } from "react-query";
// import * as styles from './styles';
// import BreadCrumb from '~/components/BreadCrumb';
// import {Box, Stack, IconButton,Checkbox, OutlinedInput } from '@mui/material';
// import { fetchCareerInfo, fetchCareerInfoModify } from "~/fetches/biz/fetchBusinessAppMgt";
// import { PlusIcon, TrashIcon } from "~/components/IconComponents";
// import { UsptAcdmcr, UsptCrqfc,UsptMsvc,UsptEtcCareer,UsptJobCareer,UsptProgrm,UsptWnpz} from "~/models/biz/BusinessAppMgt";
// import { CustomEtcCareerPrjcList} from "./View/CustomEtcCareerPrjcList";
// import { CustomEtcCareerActList} from "./View/CustomEtcCareerActList";
// import { CustomEtcCareerEdcList } from "./View/CustomEtcCareerEdcList";
// import { CustomWnpzList } from "./View/CustomWnpzList";
// import { CustomProgrmList } from "./View/CustomProgrmList";
// import { CustomJobCareerList } from "./View/CustomJobCareerList";
// import { CustomRadioButtons } from "~/components/NoticeCustomCheckBoxs";
// import DatePicker from '~/components/DatePicker';
// import dayjs from "~/../../shared/src/libs/dayjs";
// import { CustomAcdmcrList } from "./View/CustomAcdmcrList";
// import { CustomCrqfcList } from "./View/CustomCrqfcList";
// import { useGlobalModalStore } from "./../../store/GlobalModalStore";
// import { CustomButton, DefaultCheckBoxProps } from "~/components/ButtonComponents";
// import { fetchGetCommCode } from "~/fetches";
// import { CustomTodoList } from '~/components/DataTable/TodoList';
// import { CustomProgrmListTodo } from "./View/CustomProgrmTodoList";

// /* 
//   작성일    :   2022/06/25
//   화면명    :   사업신청관리 / 나의경력관리 -> 나의경력관리
//   회면ID    :   UI-USP-FRN-0150101
//   화면/개발 :   yhkim2 / navycui
// */
// const MyCareerMgt = () => {
//   const today = new Date();
//   const {addModal} = useGlobalModalStore();
//   // const [dataSet, setDataSet] = useState<careerType>();
//   const [acdmcrList, setAcdmcrList] = useState<UsptAcdmcr[]>([]);
//   const [msvcInfo, setMsvcInfo] = useState<UsptMsvc>();
//   const [crqfcList, setCrqfcList] = useState<UsptCrqfc[]>([]);
//   const [jobCareerList, setJobCareerList] = useState<UsptJobCareer[]>([]);
//   const [etcCareerActList, setEtcCareerActList] = useState<UsptEtcCareer[]>([]);
//   const [etcCareerEdcList, setEtcCareerEdcList] = useState<UsptEtcCareer[]>([]);
//   const [etcCareerPrjctList, setEtcCareerPrjctList] = useState<UsptEtcCareer[]>([]);
//   const [wnpzList, setWnpzList] = useState<UsptWnpz[]>([]);
//   const [progrmList, setProgrmList] = useState<UsptProgrm[]>([]);


//   // 공통코드 조회
//   const userQueries:any = useQueries(
//     [
//       'GRDTN_DIV',    // 졸업구분코드
//       'MSVC_TYPE',    // 군복무유형코드
//       'CAREER_TYPE',  // 경력유형코드
//       'PROGRM_TYPE',  // 프로그램유형코드
//       'GRAD_TYPE'     // 등급유형코드
//     ].map(TermsType => {
//       return {
//         queryKey: [TermsType],
//         queryFn: () => fetchGetCommCode(TermsType),
//       }
//     })
//   )
//   // 경력정보 조회
//   const {data,refetch}:any = useQuery("getSiteMap", async () => await fetchCareerInfo(),{
//     onSuccess: (data)=> {
//       setAcdmcrList(data.acdmcrList)
//       setCrqfcList(data.crqfcList)
//       setMsvcInfo(data.msvcInfo)
//       setJobCareerList(data.jobCareerList)
//       setProgrmList(data.progrmList)
//       setWnpzList(data.wnpzList)

//       if(!!data){
//         let {etcCareerList} = data;
//         let act = etcCareerList.filter((el:any)=>el.careerTypeCd == 'ACT')
//         let prjct = etcCareerList.filter((el:any)=>el.careerTypeCd == 'PRJCT')
//         let edc = etcCareerList.filter((el:any)=>el.careerTypeCd == 'EDC')
//         setEtcCareerActList(act)
//         setEtcCareerEdcList(edc)
//         setEtcCareerPrjctList(prjct)
//       }
//     }
//   });

//   // 저장 실행
//   const handleSave = () =>{

//     for (const key in acdmcrList) {
//       let arrbox = [...acdmcrList]
//       if (Object.prototype.hasOwnProperty.call(acdmcrList, key)) {
//         acdmcrList[key].flag = 'U'
//         arrbox[key] = acdmcrList[key];
//       }
    
//     }

//     for (const key in crqfcList) {
//       let arrbox = [...crqfcList]
//       if (Object.prototype.hasOwnProperty.call(crqfcList, key)) {
//         crqfcList[key].flag = 'U'
//         arrbox[key] = crqfcList[key];
//       }
  
//     }

//     for (const key in jobCareerList) {
//       let arrbox = [...jobCareerList]
//       if (Object.prototype.hasOwnProperty.call(jobCareerList, key)) {
//         jobCareerList[key].flag = 'U'
//         arrbox[key] = jobCareerList[key];
//       }
     
//     }

//     for (const key in progrmList) {
//       let arrbox = [...progrmList]
//       if (Object.prototype.hasOwnProperty.call(progrmList, key)) {
//         progrmList[key].flag = 'U'
//         arrbox[key] = progrmList[key];
//       }
    
//     }

//     for (const key in wnpzList) {
//       let arrbox = [...wnpzList]
//       if (Object.prototype.hasOwnProperty.call(wnpzList, key)) {
//         wnpzList[key].flag = 'U'
//         arrbox[key] = wnpzList[key];
//       }

//     }

//     for (const key in etcCareerActList) {
//       let arrbox = [...etcCareerActList]
//       if (Object.prototype.hasOwnProperty.call(etcCareerActList, key)) {
//         etcCareerActList[key].flag = 'U'
//         arrbox[key] = etcCareerActList[key];
//       }
//     }

//     for (const key in etcCareerEdcList) {
//       let arrbox = [...etcCareerEdcList]
//       if (Object.prototype.hasOwnProperty.call(etcCareerEdcList, key)) {
//         etcCareerEdcList[key].flag = 'U'
//         arrbox[key] = etcCareerEdcList[key];
//       }
//     }

//     for (const key in etcCareerPrjctList) {
//       let arrbox = [...etcCareerPrjctList]
//       if (Object.prototype.hasOwnProperty.call(etcCareerPrjctList, key)) {
//         etcCareerPrjctList[key].flag = 'U'
//         arrbox[key] = etcCareerPrjctList[key];
//       }
//     }


   
//       let params = {
//         acdmcrList:     acdmcrList,
//         crqfcList:      crqfcList,
//         msvcInfo:       msvcInfo,
//         jobCareerList:  jobCareerList,
//         progrmList:     progrmList,
//         wnpzList:       wnpzList,
//         etcCareerList:[...etcCareerActList,...etcCareerEdcList,...etcCareerPrjctList]
//       }

//       fetchCareerInfoModify(params).then(()=>{
//         addModal({
//           open: true,
//           type:'normal',
//           content: '저장 되었습니다',
//           onConfirm() {
//             refetch()
//           },
          
//         });
//       }).catch((e)=>{
//         addModal({
//           open: true,
//           content: e.response.data.message
//         });
//       })
    
//     }


//   return (
//     <div css={styles.container}>
//       <Box css={styles.sub_cont01}>
//         <div className="benner">
//           <BreadCrumb />
//           <div className="content">
//             <div className="txtbox">
//               <h2 className="tit">나의경력관리</h2>
//            </div>
//           </div>
//         </div>
//         <div className='content_body'>
//           <div className="content" style={{paddingBottom:0}}>
//             <Box className="box_guide">
//               <ul>
//                 <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
//               </ul>
//             </Box>

//             {/* 프로그램명 */}
//             <CustomProgrmListTodo
//               GradCodeList={(userQueries[3].status === 'success') ? userQueries[3].data.list : []} 
//               ProgrmCodeList={(userQueries[4].status === 'success') ? userQueries[4].data.list : []} 
//               dataList={progrmList}
//               onChangeBox={(usptdata: UsptProgrm[]) => {
//                 let demobox = [...usptdata]
//                 setProgrmList(demobox)
//                 if (usptdata.length > 0) console.log(usptdata);
//               }}
//               // children={<Box>todo list</Box>}
//             />

//             <Stack direction="row" justifyContent="center" sx={{marginTop: '40px'}} css={styles.btn_next}>
//               <CustomButton label={'저장'} type={'listBack'} color={'primary'} onClick={handleSave}/>
//             </Stack>
//           </div>
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default MyCareerMgt;

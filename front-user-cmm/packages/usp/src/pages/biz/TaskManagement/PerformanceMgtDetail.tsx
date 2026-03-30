// 성과관리 -> 성과관리
// import React from "react"
import { useState, useRef, useEffect } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Tabs, Tab, Stack, Typography, Grid, Button, OutlinedInput, FormControl, TextField, Select, MenuItem,FormHelperText, SelectChangeEvent } from '@mui/material';
import {Link} from 'react-scroll'
import { FileUpload1} from "../../EventNews/FileUpload";
import { fetchPerformanceDetailGet, fetchPerformanceHistGet, fetchPerformancePresentnGet, fetchPerformanceSubmit } from '~/fetches/fetchPerformanceMgt';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { resultList, rsltIdxIemCnList1 } from '~/models/ModelPerformanceMgt';
import fetchDownload from '~/fetches/fetchDownload';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomButton } from "~/components/ButtonComponents";
import { CustomSelectMd, CustomSelectSubmitDay } from '~/components/SelectBoxComponents';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function PerformanceMgtDetail() {
  const navigate = useNavigate();
  const receive:any = useLocation();
  const {addModal} = useGlobalModalStore();
  const [value, setValue] = useState(0);
  const [data,setData] = useState<resultList>();
  const [data2,setData2]:any = useState();
  const [files, setFiles]:any= useState([]);
  const [files1, setFiles1]:any= useState([]);
  // const []
  const [rsltIdxIemCnList,setRsltIdxIemCnList] = useState<rsltIdxIemCnList1[]>();
  const [attachmentFileList,setAttachmentFileList]:any = useState();
  const [rsltIdxIemCnList2,setRsltIdxIemCnList2] = useState<rsltIdxIemCnList1[]>();
  const [attachmentFileList2,setAttachmentFileList2]:any = useState();
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [histList, setHistList]:any = useState();
  const [histId, setHistId] = useState<string>();
  const [rsltIdxFileList,setRsltIdxFileList]:any = useState([]);
  const [rsltIdxFileList2,setRsltIdxFileList2]:any = useState([]);
  const [deleteAttachmentId,setDeleteAttachmentId] = useState<string>();
  const loaded = useRef(false); 

  const [stdIemNm,setStdIemNm] = useState<string[]>([]);
  const [detailIemNm,setDetailIemNm] = useState<string[]>([]);
  const [stdIemNm2,setStdIemNm2] = useState<string[]>([]);
  const [detailIemNm2,setDetailIemNm2] = useState<string[]>([]);
  const getData = () => {
    fetchPerformanceDetailGet(receive.state.item.rsltId).then((res:any) => {
      setData(res);
      setAttachmentFileList(res.attachFileList);
      setRsltIdxIemCnList(res.rsltIdxIemList[0].rsltIdxIemCnList);
      const a:any= [];
      const b:any= [];
      res.rsltIdxIemList[0].rsltIdxIemCnList.map((item:any)=>{
            a.push(item.stdIemNm)
            b.push(item.detailIemNm)
      })
      const objUnique:any = {}; // 중복없는 배열 요소만 담는 객체
      a.forEach((el: string | number) => { 
        objUnique[el] = true;
      });
      const arrUnique = Object.keys(objUnique); // 객체 키만 모아서 배열로 반환
      setStdIemNm(arrUnique)
      const objUnique1:any = {}; // 중복없는 배열 요소만 담는 객체
      b.forEach((el: string | number) => { 
        objUnique1[el] = true;
      });
      const arrUnique1 = Object.keys(objUnique1); // 객체 키만 모아서 배열로 반환
      setDetailIemNm(arrUnique1)

      if(res.rsltIdxIemList[0].prufFile){
        setRsltIdxFileList([res.rsltIdxIemList[0].prufFile]);
      }
    })
    // .catch((e)=>{
      //   let message = e.response.data.message;
      //   addModal({
        //     open: true,const [data,setData] = useState<resultList>();
        //     content: message
        //   })
        // })
        fetchPerformancePresentnGet(receive.state.item.rsltId).then((res:any)=>{
          setHistList(res.list);
          setHistId(res.list[0].rsltHistId);
          fetchPerformanceHistGet(receive.state.item.rsltId,res.list[0].rsltHistId).then((res:any)=>{
            setData2(res);
            setAttachmentFileList2(res.attachFileList);
            setRsltIdxIemCnList2(res.rsltIdxIemList[0]?.rsltIdxIemCnList)
            const a:any= [];
            const b:any= [];
            res.rsltIdxIemList[0]?.rsltIdxIemCnList.map((item:any)=>{
                  a.push(item.stdIemNm)
                  b.push(item.detailIemNm)
            })
            const objUnique:any = {}; // 중복없는 배열 요소만 담는 객체
            a.forEach((el: string | number) => { 
              objUnique[el] = true;
            });
            const arrUnique = Object.keys(objUnique); // 객체 키만 모아서 배열로 반환
            setStdIemNm2(arrUnique)
            const objUnique1:any = {}; // 중복없는 배열 요소만 담는 객체
            b.forEach((el: string | number) => { 
              objUnique1[el] = true;
            });
            const arrUnique1 = Object.keys(objUnique1); // 객체 키만 모아서 배열로 반환
            setDetailIemNm2(arrUnique1)
      
            if(res.rsltIdxIemList[0]?.prufFile){
              setRsltIdxFileList2([res.rsltIdxIemList[0]?.prufFile]);
            }
          })
      })
    }
    console.log(data?.rsltIdxIemList[0].rsltIdxIemCnList)
    console.log(stdIemNm)
    console.log(detailIemNm)
    console.log(stdIemNm2)
    console.log(detailIemNm2)
  const getData2 = () =>{
    if(histId){
      fetchPerformanceHistGet(receive.state.item.rsltId,histId).then((res:any)=>{
        setData2(res);
        setAttachmentFileList2(res.attachFileList);
        setRsltIdxIemCnList2(res.rsltIdxIemList[0]?.rsltIdxIemCnList)
        if(res.rsltIdxIemList[0]?.prufFile){
          setRsltIdxFileList2([res.rsltIdxIemList[0]?.prufFile]);
        }
      })
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };   
  useEffect(() => {
      getData();
      getData2();
  },[])

  const onChange = (event:any,i:number) => {
    if (event.currentTarget == null) {
      return;
    }
    event.preventDefault();
    if(rsltIdxIemCnList){
      const update = [...rsltIdxIemCnList];
      update[i] = {...update[i],[event.currentTarget.name] : event.currentTarget.value};
      setRsltIdxIemCnList(update)
    }
  };
  //조회된 첨부파일 삭제
  const deleteAttach1 = (attachmentId:string,i:number) =>{
    const update = [...deleteAttachFileList]
    update.push({
      attachmentId : attachmentId
    })
    setDeleteAttachFileList(update);
    const update1 = [...attachmentFileList]
    update1.splice(i,1)
    setAttachmentFileList(update1);
  }
  //조회된 증빙자료첨부파일삭제
  const deleteAttach2 = (attachmentId:string,i:number) =>{
    setDeleteAttachmentId(attachmentId);
    const update1 = [...rsltIdxFileList]
    update1.splice(i,1)
    setRsltIdxFileList(update1);
  }
  //파일첨부 삭제
  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };
  //등록하려는 증빙자료첨부파일삭제
  const handleDelete1 = (i:number) => {
    const update = [...files1]
    update.splice(i,1)
    setFiles1(update);
  };
  //파일첨부
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
      update.push(upfile[i]);
    }
    setFiles(update)
  }
  //증빙자료첨부
  const handleUpload1 = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files1]
    for(var i = 0; i < 1; i++){
        update.push(upfile[i]);
      }
    if(rsltIdxFileList.length!==1){
      setFiles1(update)
    }
  }

  const checkIemUnit = (item:string|null) => {
    if(item==="WON"){
      return "원"
    }
    else if(item==="PT"){
      return "%"
    }
    else if(item==="NM"){
      return "명"
    }
    else if(item==="CO"){
      return "개"
    }
    else if(item==="POINT"){
      return "점"
    }
  }
  const submit = () =>{
    try{
      const form = new FormData();
      if(data){
        let a = 0;
        form.append("deleteAttachFileList", new Blob([JSON.stringify(deleteAttachFileList)], {type: "application/json"}));
        for(let i=0; i<files.length; i++){
          form.append("attachFileList",files[i])
        }
        for(let i=0; i<files1.length; i++){
          form.append("rsltIdxFileList",files1[i])
          a++;
        }
        const infoList = [{
          rsltIdxIemId : data.rsltIdxIemList[0].rsltIdxIemId,
          attachFileOrder : a,
          rsltIdxIemCnList : rsltIdxIemCnList,
          deleteAttachmentId : deleteAttachmentId,
          }]
        
          form.append("infoList", new Blob([JSON.stringify(infoList)], {type: "application/json"}));
          fetchPerformanceSubmit(receive.state.item.rsltId,form).then(()=>{
            navigate('../biz/TaskManagement/PerformanceMgt')
            // getData();
            // getData2();
          }).catch((e: { response: { data: { message: any; }; }; })=>{
            addModal({
              open: true,
              content: e.response.data.message
            });
          })
        }
      } catch (e:any){
        if(!!e.response && e.response.data) return alert(e.response.data.message);
      }
      
    }


  //다운로드
  const download = async (rsltId:string,attachmentId:string) =>{ 
      fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist/atchmnfl/${attachmentId}?rsltHistId=${histId}`)
      .then()
      .catch((e)=>{
        let status = e.response.status;
        
        if(status === 400){
          addModal({
            open: true,
            content: "파일이 없습니다."
          })
        }
        });
    }
  const downloadAll = async (rsltId:string) =>{ 
      fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist/atchmnfl?rsltHistId=${histId}`)
      .then()
      .catch((e)=>{
        let status = e.response.status;
        
        if(status === 400){
          addModal({
            open: true,
            content: "파일이 없습니다."
          })
        }
        });
    }

    // console.log(data2)
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">성과 상세</h2>
              <p>성과를 제출하고 이력을 조회할 수 있습니다. </p>
            </div>
            <div className='tab_wrap double'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="제출" {...a11yProps(0)} />
                <Tab label="제출이력" {...a11yProps(1)} />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content">
          <TabPanel value={value} index={0}>
            <h4 className='tbl_title'>기본정보</h4>
            <Box css={styles.table}>
              {data&&data.basicInfo?
              <div className="detail_table"> 
                <dl>
                  <dt>공고명</dt>
                  <dd>{data.basicInfo.pblancNm}</dd>
                </dl>
                <dl>
                  <dt>과제명</dt>
                  <dd>{data.basicInfo.taskNm}</dd>
                  <dt>접수번호</dt>
                  <dd>{data.basicInfo.receiptNo}</dd>
                </dl>
                <dl>
                  <dt>사업기간</dt>
                  <dd>{data.basicInfo.bsnsBgnde.substring(0,4)+"-"+data.basicInfo.bsnsBgnde.substring(4,6)+"-"+data.basicInfo.bsnsBgnde.substring(6,8)+"~"+data.basicInfo.bsnsEndde.substring(0,4)+"-"+data.basicInfo.bsnsEndde.substring(4,6)+"-"+data.basicInfo.bsnsEndde.substring(6,8)}</dd>
                  <dt>성과년도</dt>
                  <dd>{data.basicInfo.bsnsYear}</dd>
                </dl>
              </div>
              :null}
            </Box>
            <h4 className='tbl_title'>{data?data.rsltIdxIemList[0].rsltIdxNm:null}</h4>
            {detailIemNm.length>0 ?
            <div className="tableDefault_scroll">
              <table className="tableDefault type5 w_triple">
                <thead>
                  <tr>
                    <th>구분</th>
                    {stdIemNm.map((item:any)=>(
                      <th>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detailIemNm?.map((item:any)=>(
                    <tr>
                      <td className="tal pl-20">{item}</td>
                    {rsltIdxIemCnList?.map((res:any)=>(
                      stdIemNm?.map((k:any)=>(
                        res.stdIemNm===k&&res.detailIemNm===item?
                        <td>
                          <OutlinedInput 
                          size="small" 
                          className="ipt_tp01 tar unit" 
                          sx={{width:'93.5%',marginRight:'10px'}} 
                          name = "rsltIdxIemCn"
                          value = {inputPriceFormat(res.rsltIdxIemCn)}
                          onChange = {(e)=>onChange(e,0)}
                          />{checkIemUnit(res.iemUnitCd)}
                        </td>
                        :null
                      ))
                    ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="tal pl-20">증빙자료첨부</td>
                    <td colSpan={2}>
                      <Box css={styles.fileupload}>
                        <FileUpload1
                              files={files1}
                              handleDelete={handleDelete1}
                              handleUpload1={handleUpload1} 
                              files1={rsltIdxFileList} 
                              handleDelete2={deleteAttach2}                        
                        />
                      </Box>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            :null}
            {/* 기준지표가 없을때 */}
            {rsltIdxIemCnList&&Array.isArray(detailIemNm) && detailIemNm.length === 0?
            <h4 className='tbl_title'>{data?data.rsltIdxIemList[0].rsltIdxNm:null}</h4>
            :null}
            {/* !rsltIdxIemCnList[0].stdIemNm */}
            {rsltIdxIemCnList&&Array.isArray(detailIemNm) && detailIemNm.length === 0?
            <Box css={styles.table}>
              <div className="detail_table"> 
              {rsltIdxIemCnList.map((item:any, i:number)=>(
                i*2<rsltIdxIemCnList.length?
                <dl>
                  <dt>{rsltIdxIemCnList[i*2].detailIemNm}</dt>
                  <dd>
                      <OutlinedInput 
                      size="small" 
                      className="ipt_tp01 tar" 
                      sx={{width:'93.5%',marginRight:'10px'}} 
                      name = "rsltIdxIemCn"
                      value = {inputPriceFormat(rsltIdxIemCnList[i*2].rsltIdxIemCn)}
                      onChange = {(e)=>onChange(e,i)}
                      />{checkIemUnit(rsltIdxIemCnList[i*2].iemUnitCd)}
                    </dd>
                  <dt>{rsltIdxIemCnList[i*2+1].detailIemNm}</dt>
                  <dd>
                      <OutlinedInput 
                      size="small" 
                      className="ipt_tp01 tar" 
                      sx={{width:'93.5%',marginRight:'10px'}}  
                      name = "rsltIdxIemCn"
                      value = {inputPriceFormat(rsltIdxIemCnList[i*2+1].rsltIdxIemCn)}
                      onChange = {(e)=>onChange(e,i*2+1)}
                      />{checkIemUnit(rsltIdxIemCnList[i*2+1].iemUnitCd)}
                    </dd>
                </dl>
                :null
              ))}
                <dl className='horz file'>
                  <dt>증빙자료첨부</dt>
                  <dd>
                    <Box css={styles.fileupload}>
                        <FileUpload1
                              files={files1}
                              handleDelete={handleDelete1}
                              handleUpload1={handleUpload1} 
                              files1={rsltIdxFileList} 
                              handleDelete2={deleteAttach2}                        
                        />
                    </Box>
                  </dd>
                </dl>
              </div>
            </Box>
            :null}
            {/* 단위가 텍스트 또는 서술형으로 설정된 경우 */}
            {rsltIdxIemCnList&&(rsltIdxIemCnList[0].iemUnitCd==="TEXT"||rsltIdxIemCnList[0].iemUnitCd==="DSCRP")?
            <>
            <h4 className='tbl_title'>{data?data.rsltIdxIemList[0].rsltIdxNm:null}</h4>
            <Box css={styles.table}>
              <div className="detail_table"> 
                <dl className='horz'>
                  <dt>{rsltIdxIemCnList[0].detailIemNm}</dt>
                  <dd>
                  <OutlinedInput 
                      size="small" 
                      className="ipt_tp01 tar" 
                      sx={{width:'100%'}}
                      name = "rsltIdxIemCn"
                      value = {inputPriceFormat(rsltIdxIemCnList[0].rsltIdxIemCn)}
                      onChange = {(e)=>onChange(e,0)}
                  />
                  </dd>
                  <dt>{rsltIdxIemCnList[1].detailIemNm}</dt>
                  <dd>
                  <OutlinedInput 
                      size="small" 
                      className="ipt_tp01 tar" 
                      sx={{width:'100%'}} 
                      name = "rsltIdxIemCn"
                      value = {inputPriceFormat(rsltIdxIemCnList[1].rsltIdxIemCn)}
                      onChange = {(e)=>onChange(e,1)}
                  />
                  </dd>
                </dl>
                <dl className='horz'>
                  <dt>{rsltIdxIemCnList[2].detailIemNm}</dt>
                  <dd style={{flexDirection:'column'}}>
                    <TextField
                      id="outlined-multiline-static"
                      multiline rows={4} 
                      className="textfield_tp01" 
                      inputProps={{
                        maxLength: 1000,
                      }}
                      value = {inputPriceFormat(rsltIdxIemCnList[2].rsltIdxIemCn)}
                      onChange = {(e)=>onChange(e,2)}
                    />
                    <div className='tf_count mo'>1/1000</div>
                  </dd>
                </dl>
                <dl className='horz file'>
                  <dt>증빙자료첨부</dt>
                  <dd>
                    <Box css={styles.fileupload}>
                        <FileUpload1
                              files={files1}
                              handleDelete={handleDelete1}
                              handleUpload1={handleUpload1} 
                              files1={rsltIdxFileList} 
                              handleDelete2={deleteAttach2}                        
                        />
                    </Box>
                  </dd>
                </dl>
              </div>
            </Box>
            </>
            :null}
            {/* TABLE -> LIST로 바꿀것 */}
            {data&&data.rsltIdxIemList[0].rsltIdxTypeCd==="LIST"&&rsltIdxIemCnList?
            <h4 className='tbl_title'>{data?data.rsltIdxIemList[0].rsltIdxNm:null}</h4>
            :null}
            <div>
            {data&&data.rsltIdxIemList[0].rsltIdxTypeCd==="LIST"&&rsltIdxIemCnList?
            <div className="tableDefault_scroll">
              <table className="tableDefault type5">
                <thead>
                  <tr>
                    {rsltIdxIemCnList.map((item:any)=>(
                    <th>{item.detailIemNm}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {rsltIdxIemCnList.map((item:any,i:number)=>(
                      <td>
                        <OutlinedInput 
                        size="small" 
                        className="ipt_tp01 tar" 
                        sx={{width:'91%',marginRight:'10px'}} 
                        name = "rsltIdxIemCn"
                        value = {inputPriceFormat(item.rsltIdxIemCn)}
                        onChange = {(e)=>onChange(e,i)}
                        />{checkIemUnit(item.iemUnitCd)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="tal pl-20">증빙자료첨부</th>
                    <td colSpan={4}>
                      <Box css={styles.fileupload}>
                        <FileUpload1
                              files={files1}
                              handleDelete={handleDelete1}
                              handleUpload1={handleUpload1} 
                              files1={rsltIdxFileList} 
                              handleDelete2={deleteAttach2}                        
                        />
                      </Box>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
              :null}
            <h4 className='tbl_title'>파일첨부</h4>
            <Box css={styles.fileupload}>
                        <FileUpload1
                              files={files}
                              handleDelete={handleDelete}
                              handleUpload={handleUpload} 
                              files1={attachmentFileList} 
                              handleDelete2={deleteAttach1}                        
                        />
            </Box>
            <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
              <Button fullWidth variant="contained" type="button" className="primary" onClick={submit}>제출</Button>
            </Stack>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Stack css={styles.submission_date}>
              <div className='tit'>제출일</div>
              <div className='selectLine'>
                <CustomSelectSubmitDay 
                value={histId?histId:''} 
                data={histList}
                onClick={(selected) => {
                  setHistId(selected)
                }}
                />
                <CustomButton type={'modalBtn'} label={'선택'} onClick={()=>getData2()}/>
              </div>
            </Stack>
            <h4 className='tbl_title'>기본정보</h4>
            <Box css={styles.table}>
            {data2&&data2.basicInfo?
              <div className="detail_table"> 
                <dl>
                  <dt>공고명</dt>
                  <dd>{data2.basicInfo.pblancNm}</dd>
                </dl>
                <dl>
                  <dt>과제명</dt>
                  <dd>{data2.basicInfo.taskNm}</dd>
                  <dt>접수번호</dt>
                  <dd>{data2.basicInfo.receiptNo}</dd>
                </dl>
                <dl>
                  <dt>사업기간</dt>
                  <dd>{data2.basicInfo.bsnsBgnde.substring(0,4)+"-"+data2.basicInfo.bsnsBgnde.substring(4,6)+"-"+data2.basicInfo.bsnsBgnde.substring(6,8)+"~"+data2.basicInfo.bsnsEndde.substring(0,4)+"-"+data2.basicInfo.bsnsEndde.substring(4,6)+"-"+data2.basicInfo.bsnsEndde.substring(6,8)}</dd>
                  <dt>성과년도</dt>
                  <dd>{data2.basicInfo.bsnsYear}</dd>
                </dl>
              </div>
            :null}
            </Box>
            <h4 className='tbl_title'>{data2&&data2.rsltIdxIemList[0]?data2.rsltIdxIemList[0].rsltIdxNm:null}</h4>
            {detailIemNm2.length>0 ?
            <div className="tableDefault_scroll">
              <table className="tableDefault type5 w_triple">
                <thead>
                  <tr>
                    <th>구분</th>
                    {stdIemNm2.map((item:any)=>(
                      <th>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {detailIemNm2?.map((item:any)=>(
                    <tr>
                      <td className="tal pl-20">{item}</td>
                    {rsltIdxIemCnList2?.map((res:any)=>(
                      stdIemNm?.map((k:any)=>(
                        res.stdIemNm===k&&res.detailIemNm===item?
                        <td className='tar'>
                        {inputPriceFormat(res.rsltIdxIemCn)}<span className='unit_space'></span>{checkIemUnit(res.iemUnitCd)}
                        </td>
                        :null
                      ))
                    ))}
                    </tr>
                  ))}
                  {rsltIdxFileList2?
                  <tr>
                    <td className="tal pl-20">증빙자료첨부</td>
                    <td colSpan={2} className="tal">
                      <Stack css={styles.btnDown}>
                        {rsltIdxFileList2.map((item:any,i:number)=>(
                          <Button key={i} onClick={() => download(receive.state.item.rsltId,item.attachmentId)}>
                            <span>{item?.fileNm}</span>
                          </Button>
                        ))}
                      </Stack>
                    </td>
                  </tr>
                  :null}
                </tbody>
              </table>
            </div>
            :null}
            {/* 기준지표가 없을때 */}
            {rsltIdxIemCnList2&&Array.isArray(detailIemNm2) && detailIemNm2.length === 0?
            <h4 className='tbl_title'>{data2&&data2.rsltIdxIemList2?data2.rsltIdxIemList2[0].rsltIdxNm:null}</h4>
              :null}
            {rsltIdxIemCnList2&&Array.isArray(detailIemNm2) && detailIemNm2.length === 0?
            <Box css={styles.table}>
              {rsltIdxIemCnList2&&rsltIdxIemCnList2[0].stdIemNm?
              <div className="detail_table"> 
              {rsltIdxIemCnList2.map((item:any, i:number)=>(
                i*2<rsltIdxIemCnList2.length?
                <dl>
                  <dt>{rsltIdxIemCnList2[i*2].detailIemNm}</dt>
                  <dd className='tar'>{inputPriceFormat(rsltIdxIemCnList2[i*2].rsltIdxIemCn)}<span className='unit_space'></span>{checkIemUnit(rsltIdxIemCnList2[i*2].iemUnitCd)}</dd>
                  <dt>{rsltIdxIemCnList2[i*2+1].detailIemNm}</dt>
                  <dd className='tar'>{inputPriceFormat(rsltIdxIemCnList2[i*2+1].rsltIdxIemCn)}<span className='unit_space'></span>{checkIemUnit(rsltIdxIemCnList2[i*2+1].iemUnitCd)}</dd>
                </dl>
                :null
              ))}
                {rsltIdxFileList2?
                <dl className='horz file'>
                  <dt>증빙자료첨부</dt>
                  <dd>
                    <Stack css={styles.btnDown}>
                        {rsltIdxFileList2.map((item:any,i:number)=>(
                          <Button key={i} onClick={() => download(receive.state.item.rsltId,item.attachmentId)}>
                            <span>{item.fileNm}</span>
                          </Button>
                        ))}
                    </Stack>
                  </dd>
                </dl>
                :null}
              </div>
              :null}
            </Box>
            :null}
            {/* 단위가 텍스트 또는 서술형으로 설정된 경우 */}
            {rsltIdxIemCnList2&&(rsltIdxIemCnList2[0].iemUnitCd==="TEXT"||rsltIdxIemCnList2[0].iemUnitCd==="DSCRP")?
            <>
            <h4 className='tbl_title'>{data2&&data2.rsltIdxIemList2[0]?data2.rsltIdxIemList2[0].rsltIdxNm:null}</h4>
            <Box css={styles.table}>
              {rsltIdxIemCnList2&&rsltIdxIemCnList2[0].stdIemNm?
              <div className="detail_table"> 
                <dl className='horz'>
                  <dt>{rsltIdxIemCnList2[0].detailIemNm}</dt>
                  <dd className='tar'><p>{inputPriceFormat(rsltIdxIemCnList2[0].rsltIdxIemCn)}<span className='unit_space'></span>{checkIemUnit(rsltIdxIemCnList2[0].iemUnitCd)}</p></dd>
                  <dt>{rsltIdxIemCnList2[1].detailIemNm}</dt>
                  <dd className='tar'><p>{inputPriceFormat(rsltIdxIemCnList2[1].rsltIdxIemCn)}<span className='unit_space'></span>{checkIemUnit(rsltIdxIemCnList2[0].iemUnitCd)}</p></dd>
                </dl>
                <dl className='horz'>
                  <dt>{rsltIdxIemCnList2[2].detailIemNm}</dt>
                  <dd className='tar'>
                    <div className='txt_view'><p>{inputPriceFormat(rsltIdxIemCnList2[2].rsltIdxIemCn)}<span className='unit_space'></span>{checkIemUnit(rsltIdxIemCnList2[0].iemUnitCd)}</p></div>
                  </dd>
                </dl>
                {rsltIdxFileList2?
                <dl className='horz file'>
                  <dt>증빙자료첨부</dt>
                  <dd>
                    <Stack css={styles.btnDown}>
                        {rsltIdxFileList2.map((item:any,i:number)=>(
                          <Button key={i} onClick={() => download(receive.state.item.rsltId,item.attachmentId)}>
                            <span>{item.fileNm}</span>
                          </Button>
                        ))}
                    </Stack>
                  </dd>
                </dl>
                  :null}
              </div>
              :null}
            </Box>
            </>
            :null}
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginBottom:'10px'}}>
              <h4>파일첨부</h4>
              {!(Array.isArray(attachmentFileList2) && attachmentFileList2.length === 0)?
              <Stack css={styles.btnDown}>
                <Button onClick={() => downloadAll(receive.state.item.rsltId)}>
                  <span>일괄다운로드</span>
                </Button>
              </Stack>
              :null}
            </Stack>
            <Stack css={styles.attatchedFile}>
              <Stack css={styles.btnDown}>
              {!(Array.isArray(attachmentFileList2) && attachmentFileList2.length === 0)?
                attachmentFileList2?.map((item:any,i:number)=>(
                                <Button key={i} onClick={() => download(receive.state.item.rsltId,item.attachmentId)}>
                                  <span>{item.fileNm}</span>
                                </Button>
                ))
                :"첨부파일 없습니다."}
              </Stack>
            </Stack>
          </TabPanel>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default PerformanceMgtDetail;

export const inputPriceFormat = (str:any) => {
  const comma = (str:any) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };
  const uncomma = (str:any) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  };
  return comma(uncomma(str));
};

export const uncomma2 = (str:any) => {
  str = String(str);
  return str.replace(/[^\d]+/g, "");
};
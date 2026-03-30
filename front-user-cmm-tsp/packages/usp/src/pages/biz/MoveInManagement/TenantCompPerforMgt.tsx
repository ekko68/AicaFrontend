import { useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import * as comstyles from '~/styles/styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Tabs, Tab, Stack, Box, TextField,OutlinedInput,Button } from '@mui/material';
import {CustomButton, FileUpload} from "shared/components/ButtonComponents";
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { fetchMovinGet } from '~/fetches/fetchMoveIn';
import { useGlobalModalStore, useGlobalScroll } from '~/pages/store/GlobalModalStore';
import { fetchPerformanceDetailGet, fetchPerformancePresentnGet, fetchPerformanceSubmit, fetchRsltIdGet } from '~/fetches/fetchPerformanceMgt';
import { resultList, rsltIdxIemCnList1 } from '~/models/ModelPerformanceMgt';
import { FileUpload1 } from '~/pages/EventNews/FileUpload';
import fetchDownload from '~/fetches/fetchDownload';
import { fetchCmpnyRsltAdd } from '~/fetches/fetchMvnCmpnyRslt';
import { CustomSelect} from '~/components/SelectBoxComponents';
import { fetchBsnsYearList } from '~/fetches/fetchBusiness';
import { ModalComponents } from '~/components/ModalComponents';
import { useNavigate } from 'react-router-dom';

/*
  // 입주기업성과관리 -> 입주기업성과관리
*/
function TenantCompPerforMgt() {
  const {addModal} = useGlobalModalStore();
  const {scrollActive,setScroll}:any = useGlobalScroll();
  const [valueDate, setValueDate] = useState<Date | null>(new Date());
  const [year,setYear] = useState(dayjs(new Date()).format('YYYY').toString())
  const [month,setMonth] = useState(dayjs(new Date()).format('MM').toString())
  const [year2,setYear2] = useState(dayjs(new Date()).format('YYYY').toString())
  const [month2,setMonth2] = useState(dayjs(new Date()).format('MM').toString())
  const today = new Date();
  const [value, setValue] = useState(0);
  const [rsltId, setRsltId] = useState<string>();
  const [rsltId2, setRsltId2] = useState<string>();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const navigate = useNavigate()
  //사용자입주현황조회
  const {data:list} = useQuery("fetchMovinGet", async () => await fetchMovinGet(false),{
    // onSuccess: (res:any) => {
    //   console.log(res);
    //   // fetchBsnsRsltIdxGet(res.bsnsCd).then((res:any)=>{
    //   //   console.log(res);
    //   // })
    // },
    onError: (e:any) => {
      setOpen(true);
      setError(e.response.data.message)
      // addModal({
      //   open: true,
      //   content: e.response.data.message
      // });
    }
  })
  const [bsns_box, setBsnsBox]:any = useState([]);
  const {data:bsnsYearList} = useQuery("getYearList", async () => await fetchBsnsYearList(),{
    // onSuccess: (res:any)=>{
    //   console.log(1)
    //   const update: { code: any; codeNm: any; }[] = [];
    //   // eslint-disable-next-line array-callback-return
    //   res.map((item:any)=>{
    //     update.push({code:item,codeNm:item})
    //     console.log(update);
    //   })
    //   console.log(update);
    //   setBsnsBox(update);
    // }
    onError: (e:any) => {
      setOpen(true);
      setError(e.response.data.message)
      // addModal({
      //   open: true,
      //   content: e.response.data.message
      // });
    }
  });

  const [height, setHeight] = useState(0);
  const scrollref = useRef<HTMLElement>(null);
  useEffect(() => {
    if(!!scrollref.current){
      setHeight(scrollref.current.clientHeight);
    }
  },[scrollActive])

  useEffect(()=>{
    if(!!bsnsYearList){
      const update: { code: any; codeNm: any; }[] = [];
      bsnsYearList.list.map((item:any)=>{
        update.push({code:item,codeNm:item})
      })
      setBsnsBox(update);
    }
  },[bsnsYearList])
  //성과ID
  const getRsltId = () => {
    if(list){
    const data = {
      applyId : list?.applyId,
      rsltYm : year+month,
    }
    fetchRsltIdGet(data).then((res:any)=>{
      setRsltId(res.rsltId);
    });
    }
  }
  //제출이력조회용성과ID
  const getRsltId2 = () => {
    if(list){
    const data = {
      applyId : list?.applyId,
      rsltYm : year2+month2,
    }
    console.log(data)
    fetchRsltIdGet(data).then((res:any)=>{
      setRsltId2(res.rsltId);
    });
    }
  }
  const [data,setData] = useState<resultList>();
  const [data2,setData2]:any = useState();
  const [files, setFiles]:any= useState([]);
  const [files1, setFiles1]:any= useState([]);
  const [rsltIdxIemCnList,setRsltIdxIemCnList] = useState<rsltIdxIemCnList1[]>();
  const [attachmentFileList,setAttachmentFileList]:any = useState();
  const [rsltIdxIemCnList2,setRsltIdxIemCnList2] = useState<rsltIdxIemCnList1[]>();
  const [attachmentFileList2,setAttachmentFileList2]:any = useState();
  const [deleteAttachFileList,setDeleteAttachFileList]:any = useState([]);
  const [rsltIdxFileList,setRsltIdxFileList]:any = useState([]);
  const [rsltIdxFileList2,setRsltIdxFileList2]:any = useState([]);
  const [deleteAttachmentId,setDeleteAttachmentId] = useState<string>();
  const [histId, setHistId] = useState<string>();

  const [stdIemNm,setStdIemNm] = useState<string[]>([]);
  const [detailIemNm,setDetailIemNm] = useState<string[]>([]);
  const [stdIemNm2,setStdIemNm2] = useState<string[]>([]);
  const [detailIemNm2,setDetailIemNm2] = useState<string[]>([]);
  //성과제출데이터
  const getData = () => {
    if(rsltId){
      fetchPerformanceDetailGet(rsltId).then((res:any) => {
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
      fetchPerformancePresentnGet(rsltId).then((res:any)=>{
        setHistId(res[0].rsltHistId);
    })
    }
  }
  //제출이력조회용 데이터
  const getData2 = () => {
    if(rsltId2){
      fetchPerformanceDetailGet(rsltId2).then((res:any) => {
        setData2(res);
        setAttachmentFileList2(res.attachFileList);
        setRsltIdxIemCnList2(res.rsltIdxIemList[0].rsltIdxIemCnList);
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
        if(res.rsltIdxIemList[0].prufFile){
          setRsltIdxFileList2([res.rsltIdxIemList[0].prufFile]);
        }
      })
    }
  }
  useEffect(() => {
    setScroll(false)
    getData();
},[rsltId])

  useEffect(()=>{
    getData2();
  },[rsltId2])
  useEffect(()=>{
    getRsltId()
  },[list,year,month])
  useEffect(()=>{
    getRsltId2()
  },[list])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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

    const submit = () =>{
      try{
        const form = new FormData();
        if(data&&rsltId){
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
            fetchPerformanceSubmit(rsltId,form).then(()=>{
              const data = {
                rsltId : rsltId
              }
              const params = {
                mvnId : list?.mvnId,
                sbmsnYm : dayjs(valueDate).format('YYYYMM').toString()
              }
              fetchCmpnyRsltAdd(params,data).then()
              // .catch((e: { response: { data: { message: any; }; }; })=>{
              //   addModal({
              //     open: true,
              //     content: e.response.data.message
              //   });
              // })
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
  console.log(rsltIdxIemCnList)
  return (
    <div css={comstyles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false);navigate(-1); }} 
        onClose={() => { setOpen(false);navigate(-1);}}>
      </ModalComponents>
      <Box css={comstyles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">입주성과 상세</h2>
              <p>입주성과를 제출하고 이력을 조회할 수 있습니다.</p>
            </div>
            <div className='tab_wrap triple'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="제출" {...a11yProps(0)} />
                <Tab label="제출이력" {...a11yProps(1)} />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content">
            <div className="ai_startup">
              <TabPanel value={value} index={0}>
                <h4 className="tbl_title">제출년월</h4>
                <Box css={styles.table}>
                  <div className="detail_table"> 
                    <dl>
                      <dt>제출년월</dt>
                      <dd>
                        <div className='select_set'>
                          <CustomSelect 
                          value={year}  
                          data={bsns_box ? bsns_box : []}
                          onClick={(selected) => {
                            setYear(selected)
                          }} />
                          <CustomSelect 
                          value={month}  
                          data={[{code:"01",codeNm:"01"},{code:"02",codeNm:"02"},{code:"03",codeNm:"03"},{code:"04",codeNm:"04"},{code:"05",codeNm:"05"},{code:"06",codeNm:"06"},{code:"07",codeNm:"07"},{code:"08",codeNm:"08"},{code:"09",codeNm:"09"},{code:"10",codeNm:"10"},{code:"11",codeNm:"11"},{code:"12",codeNm:"12"}]} 
                          onClick={(selected) => {
                            setMonth(selected)
                          }} />
                        </div>
                      </dd>
                    </dl>
                  </div>
                </Box>
            <h4 className='tbl_title'>{data?data.rsltIdxIemList[0].rsltIdxNm:null}</h4>
            {detailIemNm.length>0 ?
            <div className="tableDefault_scroll">
              <table className="tableDefault type5">
                <colgroup>
                  <col style={{width:'20%'}} />
                  <col style={{width:'40%'}} />
                  <col style={{width:'40%'}} />
                </colgroup>
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
                  <dt>{rsltIdxIemCnList[0]?.detailIemNm}</dt>
                  <dd>
                  <OutlinedInput 
                      size="small" 
                      className="ipt_tp01 tar" 
                      fullWidth
                      name = "rsltIdxIemCn"
                      value = {rsltIdxIemCnList[0]?.rsltIdxIemCn}
                      onChange = {(e)=>onChange(e,0)}
                  />
                  </dd>
                  <dt>{rsltIdxIemCnList[1]?.detailIemNm}</dt>
                  <dd>
                  <OutlinedInput 
                      size="small" 
                      className="ipt_tp01 tar" 
                      fullWidth
                      name = "rsltIdxIemCn"
                      value = {rsltIdxIemCnList[1]?.rsltIdxIemCn}
                      onChange = {(e)=>onChange(e,1)}
                  />
                  </dd>
                </dl>
                <dl className='horz'>
                  <dt>{rsltIdxIemCnList[2]?.detailIemNm}</dt>
                  <dd style={{flexDirection:'column'}}>
                    <TextField
                      id="outlined-multiline-static"
                      multiline rows={4} 
                      className="textfield_tp01" 
                      inputProps={{
                        maxLength: 1000,
                      }}
                      value = {rsltIdxIemCnList[2]?.rsltIdxIemCn}
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
                <colgroup>
                  <col style={{width:'17%'}}/>
                  <col style={{width:'29%'}}/>
                  <col style={{width:'29%'}}/>
                  <col style={{width:'29%'}}/>
                </colgroup>
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
                    <td colSpan={4} style={{paddingLeft:'20px'}}>
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
                <Stack direction={'row'} justifyContent={''} alignItems={'flex-start'} css={styles.selectBox}>
                  <div className='item1'>
                    <h4 className="tbl_title">제출년월</h4>
                    <div className='select_set cbutton'>
                      <CustomSelect 
                        value={year2}  
                        data={bsns_box ? bsns_box : []}
                        onClick={(selected) => {
                          setYear2(selected)
                        }} />
                      <CustomSelect 
                      value={month2}  
                      data={[{code:"01",codeNm:"01"},{code:"02",codeNm:"02"},{code:"03",codeNm:"03"},{code:"04",codeNm:"04"},{code:"05",codeNm:"05"},{code:"06",codeNm:"06"},{code:"07",codeNm:"07"},{code:"08",codeNm:"08"},{code:"09",codeNm:"09"},{code:"10",codeNm:"10"},{code:"11",codeNm:"11"},{code:"12",codeNm:"12"}]} 
                      onClick={(selected) => {
                        setMonth2(selected)
                      }} />
                      <CustomButton label={'선택'} type={'modalBtn'} color={'primary'} onClick={()=>(getRsltId2())}/>
                    </div>
                  </div>
                </Stack>
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
                        {rsltIdxFileList2&&rsltId2?
                        rsltIdxFileList2.map((item:any,i:number)=>(
                          <Button key={i} onClick={() => download(rsltId2,item.attachmentId)}>
                            <span>{item.fileNm}</span>
                          </Button>
                        ))
                        :null}
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
                    {rsltIdxFileList2&&rsltId2?
                        rsltIdxFileList2.map((item:any,i:number)=>(
                          <Button key={i} onClick={() => download(rsltId2,item.attachmentId)}>
                            <span>{item.fileNm}</span>
                          </Button>
                        ))
                        :null}
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
                  <dt>{rsltIdxIemCnList2[0]?.detailIemNm}</dt>
                  <dd><p>{rsltIdxIemCnList2[0]?.rsltIdxIemCn}</p></dd>
                  <dt>{rsltIdxIemCnList2[1]?.detailIemNm}</dt>
                  <dd><p>{rsltIdxIemCnList2[1]?.rsltIdxIemCn}</p></dd>
                </dl>
                <dl className='horz'>
                  <dt>{rsltIdxIemCnList2[2]?.detailIemNm}</dt>
                  <dd>
                    <div className='txt_view'><p>{rsltIdxIemCnList2[2]?.rsltIdxIemCn}</p></div>
                  </dd>
                </dl>
                {rsltIdxFileList2?
                <dl className='horz file'>
                  <dt>증빙자료첨부</dt>
                  <dd>
                    <Stack css={styles.btnDown}>
                    {rsltId2?
                        rsltIdxFileList2.map((item:any,i:number)=>(
                          <Button key={i} onClick={() => download(rsltId2,item.attachmentId)}>
                            <span>{item.fileNm}</span>
                          </Button>
                        ))
                        :null}
                    </Stack>
                  </dd>
                </dl>
                :null}
              </div>
              :null}
            </Box>
            </>
            :null}
              {rsltId2?
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title' sx={{marginBottom:'10px'}}>
              <h4>파일첨부</h4>
              {!(Array.isArray(attachmentFileList2) && attachmentFileList2.length === 0)?
              <Stack css={styles.btnDown}>
                <Button onClick={() => downloadAll(rsltId2)}>
                  <span>일괄다운로드</span>
                </Button>
              </Stack>
              :null}
            </Stack>
              :null}

              {attachmentFileList2&&rsltId2?
            <Stack css={styles.attatchedFile}>
              <Stack css={styles.btnDown}>
                {!(Array.isArray(attachmentFileList2) && attachmentFileList2.length === 0)?attachmentFileList2?.map((item:any,i:number)=>(
                  <Button key={i} onClick={() => download(rsltId2,item.attachmentId)}>
                    <span>{item.fileNm}</span>
                  </Button>
                )):"첨부파일 없습니다."}
              </Stack>
            </Stack>
                :null}
          </TabPanel>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default TenantCompPerforMgt;


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
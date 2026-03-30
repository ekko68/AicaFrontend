// 입주현황관리 -> 입주현황관리
// import React from "react"
import { useRef, useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import { Tabs, Tab, Stack, Box, Link,TextField  } from '@mui/material';
import {CustomButton, FileUpload} from "shared/components/ButtonComponents";
import { questsType} from '~/fetches/fetchQnaQuest';
import dayjs from 'dayjs';
import DatePicker from '~/components/DatePicker';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useQuery } from "react-query";
import { fetchCheckOut, fetchCheckOutDetailGet, fetchExtendAttachmentListGet, fetchExtendDetailGet, fetchExtendModifyState, fetchMovinExtend, fetchMovinExtendModify, fetchMovinGet, fetchMovinModifyState } from '~/fetches/fetchMoveIn';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { FileUpload1 } from '~/pages/EventNews/FileUpload';
import { fetchCheckOutModify } from "./../../../fetches/fetchMoveIn";
import { ModalComponents } from '~/components/ModalComponents';

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

function MoveInStatusMgt() {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const {addModal} = useGlobalModalStore();
  const today = new Date();
  const [value, setValue] = useState(0);
  const [files, setFiles]: any = useState([]);
  const [changeNumber, setChangeNumber] = useState(0);
  const [extendData, setExtendData]:any = useState();
  const [checkOutData, setCheckOutData]:any = useState();
  const [deleteAttach, setDeleteAttach]:any = useState([]);
  const [attachmentFileList,setAttachmentFileList]:any = useState([]);
  //연장신청input
  const [mvnEtReq,setMvnEtReq] = useState(
    {
    mvnEtEndDay: "",
    mvnEtReqCn: ""
    }
    );
  //퇴실신청input
  const [checkOutInput,setCheckOutInput] = useState({
    mvnId: "",
    checkoutPlanDay: "",
    checkoutReason: ""
  })
  //사용자 입주현황 상세조회
  const {data:userMovein ,refetch:reUserMoveIn} = useQuery("fetchMovinGet1", async () => await fetchMovinGet(false),{
    onSuccess: (res:any) => {
      setMvnEtReq({mvnEtReqCn: "",mvnEtEndDay : res.mvnEndDay})
      setCheckOutInput({...checkOutInput,mvnId:res.mvnId})
      //사용자 입주연장신청 조회
      fetchExtendDetailGet(res.mvnId).then((item)=>{
        console.log(item)
        setExtendData(item);
        if(item.mvnEtReqSt!=="RTRCN"){
          setMvnEtReq({mvnEtReqCn: item.mvnEtReqCn,mvnEtEndDay : item.mvnEtEndDay})
        }
        fetchExtendAttachmentListGet(item.mvnEtReqId).then((List:any)=>{
          setAttachmentFileList(List.list)
        })
      })
      //사용자 퇴실신청 상세조회
      fetchCheckOutDetailGet(res.mvnId).then((item)=>{
        setCheckOutData(item);
        let setCkOutInput = {
          mvnId:res.mvnId,
          checkoutPlanDay:"",
          checkoutReason:"",
        }
        if(item.checkoutReqSt!=="RTRCN"){
           setCkOutInput = {
            mvnId:res.mvnId,
            checkoutPlanDay: item.checkoutPlanDay,
            checkoutReason: item.checkoutReason
          }
        }
        setCheckOutInput(setCkOutInput);
      })
    },
      onError:(e:any)=>{
        setOpen(true);
        setError(e.response.data.message)

      }
  });
  console.log(!!userMovein)
  // console.log(extendData)
  // console.log(checkOutInput)
  // console.log(mvnEtReq)
  //연장신청
  const moveExtend = (event:any) =>{
    // if(!validate()){
      //   return;
      // };
    try{
      const form = new FormData();
      form.append("mvnEtReq", new Blob([JSON.stringify(mvnEtReq)], {type: "application/json"}));
      for(let i=0; i<files.length; i++){
        form.append("file",files[i])
      }
      console.log(extendData.mvnEtReqStNm)
    if(extendData.mvnEtReqStNm==="취소"||extendData.mvnEtReqStNm==="보완요청"||extendData.mvnEtReqStNm==="신청"){
      console.log(1)
      fetchMovinExtendModify(userMovein.mvnId,extendData.mvnEtReqId,form).then().catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
        // addModal({
        //   open: true,
        //   content: e.response.data.message
        // });
      })
    }else{
      fetchMovinExtend(userMovein.mvnId,form).then().catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
        // addModal({
        //   open: true,
        //   content: e.response.data.message
        // });
      })
    }  
    } catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }
    finally{
      reUserMoveIn();
    }
  }
  //퇴실신청
  const checkOut = () =>{
    if(checkOutData.checkoutReqStNm==="신청취소"){
      const params = {
        checkoutReqId:checkOutData.checkoutReqId,
        checkoutPlanDay: checkOutInput.checkoutPlanDay,
        checkoutReason: checkOutInput.checkoutReason
      }
      fetchCheckOutModify(params).then(()=>{
        reUserMoveIn();
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
        // addModal({
        //   open: true,
        //   content: e.response.data.message
        // });
      })
    }else{
      fetchCheckOut(checkOutInput).then(()=>{
        reUserMoveIn();
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
        // addModal({
        //   open: true,
        //   content: e.response.data.message
        // });
      })
    }

  }
  //연장신청취소
  const extendCut = () =>{
    const param = {
      mvnEtReqId:extendData.mvnEtReqId,
      mvnEtReqSt:"RTRCN"
    }
    fetchExtendModifyState(param).then(()=>{
      reUserMoveIn();
    })
  }
  //퇴실신청취소
  const checkoutCut = () =>{
    const param = {
      checkoutReqId:checkOutData.checkoutReqId,
      checkoutReqSt:"RTRCN"
    }
    fetchMovinModifyState(param).then(()=>{
      reUserMoveIn();
    })
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = (i: number) => {
    files.splice(i, 1)
    setFiles(files);
    setChangeNumber(changeNumber + 1);
  };
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upfile: any = e.target.files;
    for (var i = 0; i < upfile.length; i++) {
      files.push(upfile[i]);
    }
    setFiles(files)
    setChangeNumber(changeNumber + 1);
  }
  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setMvnEtReq((state:any) => ({ ...state, [name]: value }));
  }
  const handelChangeInput1 = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCheckOutInput((state:any) => ({ ...state, [name]: value }));
  }

  const handleDelete2 = (attachmentId:string,i:number) =>{
    const update = [...deleteAttach]
    update.push({
      attachmentId : attachmentId
    })
    setDeleteAttach(update);
    const update1 = [...attachmentFileList]
    update1.splice(i,1)
    setAttachmentFileList(update1);
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
              <h2 className="tit">입주현황 관리</h2>
              <p>현재 입주하고 있는 입주실 정보를 확인하고<br className='mo' /> 기간연장 및 퇴실처리할 수 있습니다.</p>
            </div>
            <div className='tab_wrap triple'>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="입주현황" {...a11yProps(0)} />
                <Tab label="연장신청" {...a11yProps(1)} />
                <Tab label="퇴실신청" {...a11yProps(2)} />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content">
            <div className="ai_startup">
              <TabPanel value={value} index={0}>
                <h4 className="tbl_title">입주현황</h4>
                <Box css={styles.table}>
                  {userMovein?
                  <div className="detail_table"> 
                    <dl>
                      <dt>입주상태</dt>
                      <dd>{userMovein.mvnStNm}</dd>
                      <dt>입주호실</dt>
                      <dd>{userMovein.bnoNm+" "+userMovein.roomNo}</dd>
                    </dl>
                    <dl>
                      <dt>입주일</dt>
                      <dd>{userMovein.mvnBeginDay}</dd>
                      <dt>입주종료일</dt>
                      <dd>{userMovein.mvnEndDay}</dd>
                    </dl>
                    <dl>
                      <dt>입주연장여부</dt>
                      <dd>{userMovein.mvnEtNum?userMovein.mvnEtNum+"회연장":0+"회연장"}</dd>
                    </dl>
                  </div>
                  :null}
                </Box>
                <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                  <CustomButton label={'연장신청'} type={'listBack'} color={'outlined'} onClick={()=>setValue(1)}/>
                  <CustomButton label={'퇴실신청'} type={'listBack'} color={'primary'} onClick={()=>setValue(2)}/>
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <h4 className="tbl_title none"></h4>
                <Box className="box_guide">
                  <ul>
                    <li>입주연장은 최대 3년까지 가능합니다.</li>
                    <li>연장신청 시 내용 검토 후 1차 접수처리가 진행되며, ‘접수완료’가 되면 연장평가를 통해 최종 승인여부를 결정합니다. </li>
                    <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                  </ul>
                </Box>
                {extendData?
                <Box css={styles.table} sx={{marginTop:'40px'}}>
                  <div className="detail_table status"> 
                    <dl>
                      <dt>상태</dt>
                      <dd className="withLink">
                        <Stack direction='row' justifyContent={'space-between'} sx={{width:'100%'}} alignItems={'center'}>
                          <div>
                            {extendData.mvnEtReqStNm} <Link underline="hover" className="home" key="1" color="inherit" href="#">사유확인</Link>
                          </div>
                          {extendData.mvnEtReqStNm==="신청"?
                          <CustomButton label={'신청취소'} type={'modalBtn2'} color={'outlined'} onClick={extendCut}/>
                          :null}
                        </Stack>
                      </dd>
                    </dl>
                  </div>
                </Box>
                :null}
                <h4 className="tbl_title type2">연장기간 <span className='must'>*</span></h4>
                <div className='datepicker'>
                  <DatePicker 
                      pickerType='two' 
                      questBeginDay={userMovein?dayjs(userMovein.mvnEndDay,'YYYYMMDD').toString():dayjs(new Date(),'YYYYMMDD').toString()}
                      questEndDay={mvnEtReq?dayjs(mvnEtReq.mvnEtEndDay,'YYYYMMDD').toString():dayjs(new Date(),'YYYYMMDD').toString()}
                      changeStart={(startNewTime: Date | null)=>{
                    }}
                    changeEnd={(endNewTime: Date | null)=>{
                      setMvnEtReq((mvnEtReq)=>({...mvnEtReq,mvnEtEndDay:dayjs(endNewTime).format('YYYYMMDD').toString()}))
                    }}
                  />
                </div>
                <h4 className='tbl_title type2'>신청내용 <span className='must'>*</span></h4>
                <Box css={styles.textfieldBox}>
                  <TextField
                    id="outlined-multiline-static"
                    onChange={handelChangeInput}
                    name="mvnEtReqCn"
                    value={mvnEtReq.mvnEtReqCn}
                    multiline rows={4} 
                    className="scrollBox" 
                    inputProps={{
                      maxLength: 1000,
                    }}
                  />
                  <div className='tf_count'>{mvnEtReq?.mvnEtReqCn?.length}/1000</div>
                </Box>
                <h4 className='tbl_title type2'>파일첨부</h4>
                <div className='fileupload'>
                  <FileUpload1
                      files={files}
                      handleDelete={handleDelete}
                      handleUpload={handleUpload}
                      files1={attachmentFileList}
                      handleDelete2={handleDelete2}  
                  />
                </div>
                {extendData?.mvnEtReqStNm!=="신청"||extendData?.mvnEtReqStNm!=="연장반려"||extendData?.mvnEtReqStNm!=="접수완료"?
                <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                  <CustomButton label={'연장신청'} type={'listBack'} color={'primary'} onClick={moveExtend}/>
                </Stack>
                :null}
              </TabPanel>
              <TabPanel value={value} index={2}>
                <h4 className="tbl_title none"></h4>
                <Box className="box_guide">
                  <ul>
                    <li>입주연장은 최대 3년까지 가능합니다.</li>
                    <li>연장신청 시 내용 검토 후 1차 접수처리가 진행되며, ‘접수완료’가 되면 연장평가를 통해 최종 승인여부를 결정합니다. </li>
                    <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
                  </ul>
                </Box>
                {checkOutData?
                <Box css={styles.table} sx={{marginTop:'40px'}}>
                  <div className="detail_table status"> 
                    <dl>
                      <dt>상태</dt>
                      <dd className="withLink">
                        <Stack direction='row' justifyContent={'space-between'} sx={{width:'100%'}} alignItems={'center'}>
                          <div>
                          {checkOutData.checkoutReqStNm} <Link underline="hover" className="home" key="1" color="inherit" href="#">사유확인</Link>
                          </div>
                          {checkOutData.checkoutReqStNm==="신청"?
                          <CustomButton label={'신청취소'} type={'modalBtn2'} color={'outlined'} onClick={checkoutCut}/>
                          :null}
                        </Stack>
                      </dd>
                    </dl>
                  </div>
                </Box>
                :null}
                <h4 className="tbl_title type2">퇴실예정일 <span className='must'>*</span></h4>
                <div className='ipt_datepicker'>
                    <DatePicker
                    pickerType='one' 
                    questDay={checkOutInput.checkoutPlanDay!==""?dayjs(checkOutInput.checkoutPlanDay,'YYYYMMDD').toString():dayjs(new Date(),'YYYYMMDD').toString()}
                    changeNowDate={(startNewTime: Date | null)=>{
                      setCheckOutInput((checkOutInput=>({...checkOutInput,checkoutPlanDay:dayjs(startNewTime).format('YYYYMMDD').toString()})))
                    }}/>
                </div>
                <h4 className='tbl_title type2'>퇴실사유 <span className='must'>*</span></h4>
                <Box css={styles.textfieldBox}>
                  <TextField
                    onChange={handelChangeInput1}
                    id="outlined-multiline-static"
                    name="checkoutReason"
                    value={checkOutInput.checkoutReason}
                    multiline rows={4} 
                    className="scrollBox" 
                    inputProps={{
                      maxLength: 1000,
                    }}
                  />
                  <div className='tf_count'>{checkOutInput?.checkoutReason?.length}/1000</div>
                </Box>
                <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
                  <CustomButton label={'퇴실신청'} type={'listBack'} color={'primary'} onClick={checkOut}/>
                </Stack>
              </TabPanel>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default MoveInStatusMgt;
// 사업단소개/ ->  사업단소개 페이지
import React, { useRef } from "react"
import { useState } from 'react';
import * as styles from './styles';
import Box from '@mui/material/Box';
import { Stack,Step, Stepper, StepLabel } from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from '~/components/BreadCrumb';
import { steps_reservation } from '~/models/Model';
import TextField from '@mui/material/TextField';
import { useGlobalModalStore, useGlobalOne } from "../store/GlobalModalStore";
import { intialInputValues } from "~/models/ModelReservation";
import { fetchMovinUser, fetchReservationInsert } from "~/fetches/fetchReservation";
import fetchMember from "~/fetches/fetchMember";
import { ModalComponents } from '~/components/ModalComponents';

function ReservationTwo() {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const {addModal} = useGlobalModalStore();
  const receive:any = useLocation();
  const peopleNumInput:any = useRef(1);
  const navigate = useNavigate();
  const purposeInput:any = useRef("");
  const [arr,setArr] = useState([]);
  const [data,setData]:any = useState([]);
  const [myData,setMyData]:any = useState([]);
  const [movinData,setMovinData]:any = useState([]);
  const [rsvtBgngTm,setRsvtBgngTm]:any =useState();
  const [rsvtEndTm,setRsvtEndTm]:any =useState();
  const [rsvtDay,setRsvtDay] = useState("");
  const [insert,setInsert] = useState(intialInputValues);
  const [peopleNum,setPeopleNum] = useState("1");
  const [purpose,setPurpose] = useState("");
  const {one} = useGlobalOne();
  const [peopleNumError,setPeopleNumError] = useState({errorPeopleNum:false,helperPeopleNum:""});
  const [purposeError,setPurposeError] = useState({errorPurpose:false,helperPurpose:""})
  const changePeopleNum = () => {
    if(peopleNumInput.current.value==="0"){
      setPeopleNum("1");
      return
    }else if(data.mvnFcCapacity<peopleNumInput.current.value){
      setPeopleNum(data.mvnFcCapacity);
    }else {
      setPeopleNum(peopleNumInput.current.value.replace(/[^\d]+/g, ""));
    }
  }
  const changePurpose = () => {
    setPurpose(purposeInput.current.value);
  }
  const getList = () => {
    fetchMember().then((res:any) => {
      setMyData(res);
    }).catch((e)=>{
      let message = e.response.data.message;
      addModal({
        open: true,
        content: message
      })
    })
    fetchMovinUser(false).then((res:any) => {
      setMovinData(res);
    })
  }
  useEffect(() => {
    getList();
  },[])   
  
  useEffect(()=>{
    setInsert({
      mvnFcId: data.mvnFcId, 
      rsvtDay: rsvtDay,
      rsvtBgngTm: rsvtBgngTm,
      rsvtEndTm:rsvtEndTm,
      rsvtNope:parseInt(peopleNum),
      utztnPurpose:purpose
    })
  },[peopleNum,purpose])
  useEffect(()=>{
    setArr(one.timeList);
    setData(one.data);
    setRsvtDay(one.date);
    console.log(one);
  },[])
  useEffect(()=>{
    console.log(arr.length)
    if(arr.length===1){
      if(arr[0]===9){
        console.log("09:00")
        setRsvtBgngTm("09:00");
      }else{
        setRsvtBgngTm(arr[0]+":00");
      }
      setRsvtEndTm((arr[0]+1)+":00");
    }else{
      if(arr[0]===9){
        console.log("09:00")
        setRsvtBgngTm("09:00");
      }else{
        setRsvtBgngTm(arr[0]+":00");
      }
      setRsvtEndTm((arr[1]+1)+":00");
    }
  },[arr])
  console.log(insert);
  const validate = (event:any,insert:any) => {
    let check = true;
    // eslint-disable-next-line use-isnan
    if (isNaN(insert.rsvtNope)===true){
      setPeopleNumError({
        errorPeopleNum:true, helperPeopleNum:"이용인원수를 입력하세요"
      })
      check = false;
    }else{
      setPeopleNumError({
        errorPeopleNum:false, helperPeopleNum:""
      })
      check = true;
    }
    if (insert.utztnPurpose===""){
      setPurposeError({
        errorPurpose:true, helperPurpose:"이용목적을 입력하세요"
      })
      check = false;
    }else{
      setPurposeError({
        errorPurpose:false, helperPurpose:""
      })
      check = true;
    }
    return check;
  }

  const send = (event:any) =>{
    if(!validate(event,insert)){
      return;
    };
    try{
      // const form = new FormData();
      // form.append("SpacesParam", new Blob([JSON.stringify(insert)], {type: "application/json"}));
      fetchReservationInsert(insert).then(()=>{
        return navigate('../MyPage/UsageMmt/FacilityReservationMmt');
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
      });
      // .catch((e)=>{
      //   addModal({
      //     open: true,
      //     content: e.response.data.message
      //   });
      // })
    }  catch (e:any){
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
              <h2 className="tit">시설 예약</h2>
              {/* <p>입주기업은 물론 누구나 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p> */}
              <Stepper activeStep={1} alternativeLabel css={styles.step02}>
                {steps_reservation.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom:0}}>
              <Box css={styles.box_reserve_guide}>
                <ul>
                  <li>신청자 정보에 대해 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</li>
                  <li>예약유형이 즉시예약형인 경우 신청 즉시 예약처리되나, 승인형의 경우 관리자 검토 후 예약이 접수됩니다.</li>
                </ul>
              </Box>
              <h4 className="sub_title">시설정보</h4>
              <Box css={styles.table}>
                <div className="detail_table"> 
                  <dl>
                    <dt>시설명</dt>
                    <dd>[{data.mvnFcNm}] {data.bnoNm+" "+data.mvnFcNm}</dd>
                    <dt>예약유형</dt>
                    <dd>{data.reserveTypeNm}</dd>
                  </dl>
                  <dl>
                    <dt>수용인원</dt>
                    <dd>최대 {data.mvnFcCapacity}명</dd>
                    <dt>이용가능시간</dt>
                    <dd>{data.utztnBeginHh+"~"+data.utztnEndHh}시</dd>
                  </dl>
                </div>
              </Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <h4 className="sub_title">신청자정보</h4>
                <NavLink to="/MyPage/MemberInfoMmt/MemberInfoMdf" 
                >
                <CustomButton label={'회원정보 변경'} type={'modify'} color={'outlinedblack'} style={{marginBottom:'10px'}} />
                </NavLink>    
              </Stack>
              <Box css={styles.table}>
                <div className="detail_table"> 
                  <dl>
                    <dt>사업자명/이름</dt>
                    <dd>{myData.memberNm}</dd>
                    <dt>휴대폰번호</dt>
                    <dd>{myData.mobileNo}</dd>
                  </dl>
                  <dl>
                    <dt>이메일</dt>
                    <dd>{myData.email}</dd>
                    <dt>입주여부</dt>
                    <dd>{movinData.length===0?"미입주":"("+movinData.bnoNm+" "+movinData.roomNo+")"}</dd>
                  </dl>
                </div>
              </Box>
              <h4 className="sub_title">신청정보</h4>
              <Box css={styles.table}>
                <div className="detail_table"> 
                  <dl>
                    <dt>예약일</dt>
                    <dd>{rsvtDay}</dd>
                    <dt>예약시간</dt>
                    <dd>{rsvtBgngTm} ~ {rsvtEndTm}</dd>
                  </dl>
                  <dl>
                    <dt>이용인원수 <span className="must">*</span></dt>
                    <dd>                    
                    <TextField
                      minRows="1"
                      id="outlined-multiline-static"
                      className="ipt_tp01" 
                      onChange={changePeopleNum}
                      value={peopleNum}
                      inputRef={peopleNumInput}
                      error = {peopleNumError.errorPeopleNum}
                      helperText = {peopleNumError.helperPeopleNum}
                      sx={{marginRight:'8px'}}
                      />명
					          </dd>
                  </dl>
                  <dl className="horz">
                    <dt>이용목적 <span className="must">*</span></dt>
                    <dd style={{flexDirection:'column'}}>
                      <TextField
                      id="outlined-multiline-static"
                      multiline rows={4} 
                      className="textfield_tp01" 
                      onChange={changePurpose}
                      inputRef={purposeInput}
                      error = {purposeError.errorPurpose}
                      helperText = {purposeError.helperPurpose}
                      inputProps={{
                        maxLength: 1000,
                      }}
                      />
                      <Box sx={{width:'100%',textAlign:'right',fontSize:'14px',marginBottom:'10px',fontFamily:'roboto'}}>{purpose.length}/1000</Box>
                    </dd>
                  </dl>
                </div>
              </Box>
              <Stack direction="row" justifyContent="center" spacing={2} mt={5} css={styles.btn_next}>
                <NavLink to={`/ReservationOne/${receive.state.data.mvnFcId}`} 
                      // // key={}
                      state={{data:data}}
                  >
                    <CustomButton label={'이전'} type={'listBack'} color={'outlinedblack'} />
                </NavLink>    
                <CustomButton label={'예약 신청'} type={'listBack'} color={'primary'} onClick={send} />
              </Stack>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default ReservationTwo;

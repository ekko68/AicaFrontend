/* eslint-disable no-loop-func */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// 사업단소개/ ->  사업단소개 페이지
import React from "react"
import { useState } from 'react';
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, Grid,Step, Stepper, StepLabel,} from '@mui/material';
import { CustomButton } from '~/components/ButtonComponents';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import { fetchReservation } from "~/fetches";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { steps_reservation } from '~/models/Model';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import koLocale from 'date-fns/locale/ko'
import { useLocation } from 'react-router-dom';
import { useGlobalModalStore, useGlobalOne } from '../store/GlobalModalStore';

function ReservationOne() {
  const {addModal} = useGlobalModalStore();
  const receive:any = useLocation();
  const receiveData = receive.state.data;
  const mvnFcId:string = receiveData.mvnFcId;
  const [dateValue, setDateValue] = React.useState<Date>(new Date());
  const today = new Date();
  const [params, setParams] = useState({mvnFcId:mvnFcId,ymd:dateValue.toISOString().substring(0,10).replace(/-/g,'')});
  const [data, setData]:any = useState([]);
  const [am, setAm]:any = useState([]);
  const [pm, setPm]:any = useState([]);
  const [cutoffTimeList, setTimeList]:any = useState([]);
  const [arr, setArr]:any = useState([]);
  const {setOne} = useGlobalOne();
  //최초 데이터 세팅
  const getList = () => {
    fetchReservation(params).then((res:any) => {
        console.log(res);
        setData(res);
        setTimeList(res.cutoffTimeList);
      }).catch((e:any)=>{
        let message = e.response.data.message;
        addModal({
          open: true,
          content: message
        })
      })
      const a={
        data:receiveData,timeList:arr,date:dateValue.toISOString().substring(0,10)
      }
      setOne(a);
    }
    useEffect(() => {
      getList();
    },[params])   

  useEffect(()=>{
    setParams({mvnFcId:mvnFcId,ymd:dateValue.toISOString().substring(0,10).replace(/-/g,'')})
  },[dateValue])
  // const {data, error, isFetching, isLoading}:any = ReservationService.FetchTimeListGet({mvnFcId:mvnFcId,ymd:dateValue.toISOString().substring(0,10).replace(/-/g,'')});

  const week = new Array ('[일]','[월]','[화]','[수]','[목]','[금]','[토]');
  let beginHh = parseInt(receiveData.utztnBeginHh);
  const EndHh = parseInt(receiveData.utztnEndHh);
  const getReservationTime = () =>{
  let am:any = [];
  let pm:any = [];
  if(today.toISOString().substring(0,10)===dateValue.toISOString().substring(0,10)){
        if(beginHh<12){
              for(let i = beginHh; i <12; i++){
                    if(i<today.getHours()){
                      am.push({number:i,color:"disabled"});
                    }else{
                      am.push({number:i,color:"outlinedblack"});
                    }
                  }
              for(let i =12; i<EndHh; i++){
                    if(i<today.getHours()+1){
                      pm.push({number:i,color:"disabled"});
                    }else{
                      pm.push({number:i,color:"outlinedblack"});
                    }
                    
              }
            }else{
              for(let i = beginHh; i<EndHh; i++){
                if(i<today.getHours()){
                  pm.push({number:i,color:"disabled"});
                }else{
                  pm.push({number:i,color:"outlinedblack"});
                }
                  }
          }
      // if(today.getHours()>9){
        //   beginHh = today.getHours()+1;
        // }
      }else{
        if(beginHh<12){
              for(let i = beginHh; i <12; i++){
                    am.push({number:i,color:"outlinedblack"});
                  }
              for(let i =12; i<EndHh; i++){
                    pm.push({number:i,color:"outlinedblack"});
      
              }
            }else{
              for(let i = beginHh; i<EndHh; i++){
                    pm.push({number:i,color:"outlinedblack"});
                  }
          }

  }


    for(let i = 0; i<am.length; i++){
      // eslint-disable-next-line no-lone-blocks
      {cutoffTimeList && cutoffTimeList.map((item:any)=>{
        if(parseInt(item.time.slice(0,2))===am[i].number){
          if(am[i].color===""||am[i].color==="outlinedblack"){
            am[i].color="disabled"
          }
        }
      })}
    }
    for(let i = 0; i<pm.length; i++){
      // eslint-disable-next-line no-lone-blocks
      {cutoffTimeList && cutoffTimeList.map((item:any)=>{
        if(parseInt(item.time.slice(0,2))===pm[i].number){
          if(pm[i].color===""||pm[i].color==="outlinedblack"){
            pm[i].color="disabled"
          }
        }
      })}
    }
    if(week[dateValue.getDay()][1]==="토"||week[dateValue.getDay()][1]==="일"){
      am=[];
      pm=[];
    }
    setAm(am);
    setPm(pm);
  }

  useEffect(()=>{
    getReservationTime();
  },[cutoffTimeList,dateValue])

  const change = (i:number,k:string) => {
    if(k==="am"){
      if(am[i].color==="outlinedblack"&&arr.length<2){
        const arr2 = arr;
        arr2.push(am[i].number);
        setArr(arr2);
        let a = 1;
        let updateA = {...am};
        let updateB = {...pm};
        if(arr.length===2){
          if(arr[0]<arr[1]){
            for(let b in am){
              if(arr[0]<am[b].number&&am[b].number<arr[1]){
                if(am[b].color==="outlinedblack"){
                  updateA[b] ={number:am[b].number, color: "primary"};
                }else if(am[b].color==="disabled"){
                  a =2;
                }
              }
            }
            for(let c in pm){
              if(arr[0]<pm[c].number&&pm[c].number<arr[1]){
                if(pm[c].color==="outlinedblack"){
                  updateB[c] ={number:pm[c].number, color: "primary"};
                }else if(pm[c].color==="disabled"){
                  a =2;
                }           
              }
            }
          }
          if(arr[1]<arr[0]){
            for(let b in am){
              if(arr[0]>am[b].number&&am[b].number>arr[1]){
                if(am[b].color==="outlinedblack"){
                  updateA[b] ={number:am[b].number, color: "primary"};
                }else if(am[b].color==="disabled"){
                  a =2;
                }
              }
            }
            for(let c in pm){
              if(arr[0]>pm[c].number&&pm[c].number>arr[1]){
                if(pm[c].color==="outlinedblack"){
                  updateB[c] ={number:pm[c].number, color: "primary"};
                }else if(pm[c].color==="disabled"){
                  a =2;
                }           
              }
            }

          }
        }

        if(a!==2){
          updateA[i] ={number:am[i].number, color: "primary"};
        }else{
          const index = arr2.indexOf(pm[i].number);
          if(index>-1){
            arr2.splice(index,1);
          }
          setArr(arr2);
          updateA = {...am};
          updateB = {...pm};
        }
        setAm(updateA);
        setPm(updateB);
      }else if(am[i].color==="primary"&&(am[i].number===arr[0]||am[i].number===arr[1])){
        const updateA = {...am};
        const updateB = {...pm};
        updateA[i] ={number:am[i].number, color: "outlinedblack"};
        const arr2 = arr;
        // const index1 = arr2.indexOf("씨");
        // console.log(index1);
        const index = arr2.indexOf(am[i].number);
        if(index>-1){
          arr2.splice(index,1);
        }
        setArr(arr2);
        if(arr.length===1){
          if(am[i].number<arr[0]){
            for(let b in am){
              if(am[i].number<am[b].number&&am[b].number<arr[0]){
                if(am[b].color==="primary"){
                  updateA[b] ={number:am[b].number, color: "outlinedblack"};
                }
              }
            }
            for(let c in pm){
              if(am[i].number<pm[c].number&&pm[c].number<arr[0]){
                if(pm[c].color==="primary"){
                  updateB[c] ={number:pm[c].number, color: "outlinedblack"};
                }        
              }
            }
          }else if(am[i].number>arr[0]){
            for(let b in am){
              if(am[i].number>am[b].number&&am[b].number>arr[0]){
                if(am[b].color==="primary"){
                  updateA[b] ={number:am[b].number, color: "outlinedblack"};
                }
              }
            }
            for(let c in pm){
              if(am[i].number>pm[c].number&&pm[c].number>arr[0]){
                if(pm[c].color==="primary"){
                  updateB[c] ={number:pm[c].number, color: "outlinedblack"};
                }          
              }
            }

          }
        }
        setAm(updateA);
        setPm(updateB);
      }
    }
    if(k==="pm"){
      if(pm[i].color==="outlinedblack"&&arr.length<2){
        const arr2 = arr;
        arr2.push(pm[i].number);
        setArr(arr2);
        let a = 1;
        let updateA = {...am};
        let updateB = {...pm};

        if(arr.length===2){
          if(arr[0]<arr[1]){
            for(let b in am){
              if(arr[0]<am[b].number&&am[b].number<arr[1]){
                if(am[b].color==="outlinedblack"){
                  updateA[b] ={number:am[b].number, color: "primary"};
                }else if(am[b].color==="disabled"){
                  a =2;
                }
              }
            }
            for(let c in pm){
              if(arr[0]<pm[c].number&&pm[c].number<arr[1]){
                if(pm[c].color==="outlinedblack"){
                  updateB[c] ={number:pm[c].number, color: "primary"};
                }else if(pm[c].color==="disabled"){
                  a =2;
                }           
              }
            }
          }
          if(arr[1]<arr[0]){
            for(let b in am){
              if(arr[0]>am[b].number&&am[b].number>arr[1]){
                if(am[b].color==="outlinedblack"){
                  updateA[b] ={number:am[b].number, color: "primary"};
                }else if(am[b].color==="disabled"){
                  a =2;
                }
              }
            }
            for(let c in pm){
              if(arr[0]>pm[c].number&&pm[c].number>arr[1]){
                if(pm[c].color==="outlinedblack"){
                  updateB[c] ={number:pm[c].number, color: "primary"};
                }else if(pm[c].color==="disabled"){
                  a =2;
                }           
              }
            }

          }
        }

        if(a!==2){
          updateB[i] ={number:pm[i].number, color: "primary"};
        }else{
          const index = arr2.indexOf(pm[i].number);
          if(index>-1){
            arr2.splice(index,1);
          }
          setArr(arr2);
          updateA = {...am};
          updateB = {...pm};
        }
        setAm(updateA);
        setPm(updateB);
      
      }else if(pm[i].color==="primary"&&(pm[i].number===arr[0]||pm[i].number===arr[1])){
        const updateA = {...am};
        const updateB = {...pm};
        updateB[i] ={number:pm[i].number, color: "outlinedblack"};
        const arr2 = arr;
        // const index1 = arr2.indexOf("씨");
        // console.log(index1);
        const index = arr2.indexOf(pm[i].number);
        if(index>-1){
          arr2.splice(index,1);
        }
        setArr(arr2);
        if(arr.length===1){
          if(pm[i].number<arr[0]){
            for(let b in am){
              if(pm[i].number<am[b].number&&am[b].number<arr[0]){
                if(am[b].color==="primary"){
                  updateA[b] ={number:am[b].number, color: "outlinedblack"};
                }
              }
            }
            for(let c in pm){
              if(pm[i].number<pm[c].number&&pm[c].number<arr[0]){
                if(pm[c].color==="primary"){
                  updateB[c] ={number:pm[c].number, color: "outlinedblack"};
                }        
              }
            }
          }else if(pm[i].number>arr[0]){
            for(let b in am){
              if(pm[i].number>am[b].number&&am[b].number>arr[0]){
                if(am[b].color==="primary"){
                  updateA[b] ={number:am[b].number, color: "outlinedblack"};
                }
              }
            }
            for(let c in pm){
              if(pm[i].number>pm[c].number&&pm[c].number>arr[0]){
                if(pm[c].color==="primary"){
                  updateB[c] ={number:pm[c].number, color: "outlinedblack"};
                }          
              }
            }

          }
        }
        setAm(updateA);
        setPm(updateB);
      }
    }
  }
  console.log(am)
  console.log(pm)

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">시설 예약</h2>
              {/* <p>입주기업은 물론 누구나 창업지원센터의 시설을 예약할 수 있습니다.<br/>
              원하는 시설 선택 후 예약을 진행해 주세요.</p> */}
              <Stepper activeStep={0} alternativeLabel css={styles.step02}>
                {steps_reservation.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className='tab_wrap'>
            </div>
          </div>
        </div>
        <div className='content_body'>
          <div className="content" style={{paddingBottom:0}}>
              <Box css={styles.box_reserve_guide}>
                <ul>
                  <li>시설을 예약할 일자 및 시간을 선택해주세요.</li>
                  <li>선택되지 않은 일자 및 시간은 이미 예약이 마감되어 예약이 불가합니다.</li>
                </ul>
              </Box>
              <h4 className="sub_title">시설정보</h4>
              <Box css={styles.table}>
                <div className="detail_table"> 
                  <dl>
                    <dt>시설명</dt>
                    <dd>[{receiveData.mvnFcNm}] {receiveData.bnoNm+" "+receiveData.mvnFcNm}</dd>
                    <dt>예약유형</dt>
                    <dd>{receiveData.reserveTypeNm}</dd>
                  </dl>
                  <dl>
                    <dt>수용인원</dt>
                    <dd>최대 {receiveData.mvnFcCapacity}명</dd>
                    <dt>이용가능시간</dt>
                    <dd>{receiveData.utztnBeginHh+"~"+receiveData.utztnEndHh}시</dd>
                  </dl>
                </div>
              </Box>
              <Grid container mt={5}>
                <Grid item md={6} css={styles.datepicker}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      value={dateValue}
                      inputFormat="MM/dd/yyyy"
                      onChange={(newValue:any) => {
                        // eslint-disable-next-line no-lone-blocks
                        {newValue<today?newValue=today:newValue}
                        setDateValue(newValue);
                        setArr([]);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {/* 예약마감 버튼 색은 div role="cell" 밑에 button에 disabled 클래스를 넣으면 나타납니다.  */}
                  </LocalizationProvider>
                  <Box className="legend">
                    <span className="selected">선택</span>
                    <span className="closed">예약마감</span>
                  </Box>
                </Grid>
                <Grid item md={6} css={styles.datepicker_desc}>
                  <Box className="title">
                    <span>{('0' + (dateValue.getMonth() + 1)).slice(-2)}.{('0' + dateValue.getDate()).slice(-2)} {week[dateValue.getDay()]}</span>예약시간을 선택해 주세요.
                  </Box>
                  {/* {week[dateValue.getDay()]!=="토"||week[dateValue.getDay()]!=="일"? */}
                  {Object.keys(am).length !== 0?
                  <>
                  <Box mt={4} className="title_sub">오전</Box>
                  <Grid container mt={1.25} rowGap={1.875} columnSpacing={1.875}>
                    {Object.keys(am).map((key:any)=>(
                      
                        <Grid item xs={6} md={3} key={key}>
                        <CustomButton label={am[key].number+'시'} type={'time'} color={am[key].color} onClick={()=>{change(key,"am")}}/>
                        </Grid>
                    ))}
                  
                  </Grid>
                  </>
                  :null}
                  {pm.length!==0?
                  <>
                  <Box mt={4} className="title_sub">오후</Box>
                  <Grid container mt={1.25} rowGap={1.875} columnSpacing={1.875}>
                  {Object.keys(pm).map((key:any)=>(
                      <Grid item xs={6} md={3} key={key}>
                      <CustomButton label={pm[key].number+'시'} type={'time'} color={pm[key].color} onClick={()=>{change(key,"pm")}}/>
                      </Grid>
                  ))}
                  </Grid>
                  </>:null}
              {/* :null} */}
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="center" sx={{marginTop: '40px'}}>
                {arr.length!==0?
                <NavLink to={`/Community/ReservationTwo/${mvnFcId}`}
                state={{data:receiveData,timeList:arr,date:dateValue.toISOString().substring(0,10)}}
                >
                    <CustomButton label={'다음'} type={'listBack'} color={'primary'} />
                </NavLink>:null}    
              </Stack>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default ReservationOne;

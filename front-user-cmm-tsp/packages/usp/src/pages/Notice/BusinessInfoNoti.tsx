/* eslint-disable array-callback-return */
import * as styles from '~/styles/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BreadCrumb from '~/components/BreadCrumb';
import Typography from '@mui/material/Typography';
import {  CustomButton,} from '~/components/ButtonComponents';
import { CustomCheckBoxs } from '~/components/ButtonComponents';
import { fetchBusinessInfoNoti, fetchBusinessInfoNotiDelete} from "~/fetches";
import { useScroll } from '../store/GlobalModalStore';
import { fetchBusiGet } from '~/fetches/fetchBusinessInfoNoti';
import { ModalComponents } from '~/components/ModalComponents';
import { useMediaQuery,useTheme } from '@mui/material';

function BusinessInfoNoti() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  
  const [bus,setBus] = useState<string[]>([]);
  const [train,setTrain] = useState<string[]>([]);
  const [recommendClCode,setRecommendClCode]:any = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //사업정보
  const [checkBoxParamBus,setParamBus]:any = useState([]);
  //교육정보
  const [checkBoxParamTrain,setParamTrain]:any = useState([]);
  // 코드 조회
  const getCommCode = () => {

    fetchBusiGet()
        .then((res) => {
          const update = [...checkBoxParamBus];
          const update2 = [...checkBoxParamTrain];
          res.list.map((item:any)=>{
            if(item.recomendClTypeCd === "BSR"){
              let infoNtcn = {
                label : item.recomendClNm,
                checked : item.isCheck
              };
              update.push(infoNtcn);
            }else if(item.recomendClTypeCd === "EDU"){
              let infoNtcn = {
                label : item.recomendClNm,
                checked : item.isCheck
              };
              update2.push(infoNtcn);
            }
          })
          setParamBus(update);
          setParamTrain(update2);
          setRecommendClCode(res.list);
        })
  };
  useEffect(()=>{
    getCommCode();
  },[])

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const save = () => {
    var infoNtcnList: { recomendClCd: string; recomendClTypeCd: string | undefined; }[] = [];
    if(bus.length>0){
      bus.map((bus:any)=>{
        const newArray = recommendClCode.filter(function(element:any){
          return element.recomendClNm === bus;
        });
        let infoNtcn = {
          recomendClCd : newArray[0].recomendClCd,
          recomendClTypeCd : newArray[0].recomendClTypeCd
        };
        infoNtcnList.push(infoNtcn);
      })
    }

    if(train.length>0){
      train.map((train:any)=>{
        const newArray = recommendClCode.filter(function(element:any){
          return element.recomendClNm === train;
        });
        let infoNtcn = {
          recomendClCd : newArray[0].recomendClCd,
          recomendClTypeCd : newArray[0].recomendClTypeCd
        };
        infoNtcnList.push(infoNtcn);
      })
    }
    fetchBusinessInfoNoti(infoNtcnList).then(()=>{
      setOpen(true);
      setError("사업정보알림이 저장되었습니다.")
    }).catch((e)=>{
      setOpen(true);
      setError(e.response.data.message)
    });

  }

  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
      <Box css={styles.sub_cont01}  className={scrollY ? "fixed scrollaction" : "fixed"} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
        <div className="benner" ref={measuredRef}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">사업정보알림</h2>
              <p>
                관심있는 사업 및 교육 분야를 선택해주세요. <br />
                로그인 시마다 선택한 분야의 새로운 정보를 안내해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}
        sx={{marginTop:( scrollY ? 
          (isMobile ? `${height - 180}px` : `${height - 100}px`) 
          :
          (isMobile ? `${height - 150}px` : `${height}px`))}}>
      <div className="content">
          <div css={styles.detal_list}>
            <div className="Check_listbox">
              <Stack spacing={6} direction="column" className="sub_tit">
                <Typography variant="h4" component="div">
                  사업 정보
                </Typography>
              </Stack>
              <CustomCheckBoxs
                row
                checkbox={checkBoxParamBus}
                onClick={(s: string[]) => {
                  setBus(s);
              }}
              />
              <Stack
                spacing={6}
                direction="column"
                className="sub_tit"
                sx={{ mt: 4 }}
              >
                <Typography variant="h4" component="div">
                  교육 정보
                </Typography> 
              </Stack>
              <CustomCheckBoxs
              row
              checkbox={checkBoxParamTrain}
              onClick={(s: string[]) => {
                setTrain(s);
              }}
              />
            </div>
              <Stack spacing={2} direction="row" css={styles.btnGroup}>
                <CustomButton
                  style={{background:'url(/images/common/return.png) 36px center no-repeat', padding: '0 36px 0 64px'}}
                  label={'사업정보알림 해지'}
                  type={'wauto'}
                  color={'outlinedblack'}
                  onClick={() => {
                    fetchBusinessInfoNotiDelete().then((res:any)=>{
                      const update: { label: any; checked: any; }[] = [];
                      const update2: { label: any; checked: any; }[] = [];
                      res.list.map((item:any)=>{
                        if(item.recomendClTypeCd === "BSR"){
                          let infoNtcn = {
                            label : item.recomendClNm,
                            checked : false
                          };
                          update.push(infoNtcn);
                        }else if(item.recomendClTypeCd === "EDU"){
                          let infoNtcn = {
                            label : item.recomendClNm,
                            checked : false
                          };
                          update2.push(infoNtcn);
                        }
                      })
                      setParamBus(update);
                      setParamTrain(update2);
                      setOpen(true);
                      setError("사업정보알림이 해지되었습니다.")
                    }).catch((e)=>{
                      setOpen(true);
                      setError(e.response.data.message)
                    });
                  }}
                />
              <CustomButton label={'저장'} type={'wauto'} color={'primary'} style={{padding: '0 54px'}} onClick={()=>save()}/>
            </Stack>
          </div>
      </div>
      </Box>
    </div>
  );
}


export default BusinessInfoNoti;


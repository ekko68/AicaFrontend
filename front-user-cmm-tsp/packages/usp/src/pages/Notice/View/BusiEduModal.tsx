import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBusinessInfoNotiGet, fetchEduInfoNotiGet } from "~/fetches";
import { CustomTabsBlacks } from "../../../components/LayoutComponents";
import { Modalfront } from "../../../components/SharedModalComponents";
import * as styles from '~/styles/styles';
import { TabPanel } from "@mui/lab";
import { NavLink } from "react-router-dom";

function BusiEduModal() {
    type modalType = 'normal' | 'confirm' | 'none';
    const [type, setType] = useState<modalType>('none');
    const [data, setData] = useState(false);
    const [open, setOpen] = useState(false);
    const [busiList, setBusi]:any = useState([]);
    const [eduList, setEdu]:any = useState([]);

    const getList = () => {
      let a = 1;
      let b = 1;
      fetchBusinessInfoNotiGet().then((res:any) => {
        setBusi(res.list);
        if(Array.isArray(res) && res.length === 0){
            a = 0;
        }
      })
      fetchEduInfoNotiGet().then((res:any)=>{
        setEdu(res.list);
        if(Array.isArray(res) && res.length === 0){
            b = 0;
        }
      })
      if(a===1 || b===1){
        setOpen(true)
      }
    }
    useEffect(() => {
      getList();
    },[]);
    const [busiTotal,setBusiTotal] = useState(busiList.length);
    const [eduTotal,setEduTotal] = useState(eduList.length);

    useEffect(()=>{
      if(busiList.length>5){
        setBusiTotal(5)
      }else{
        setBusiTotal(busiList.length)
      }
      
      if(eduList.length>5){
        setEduTotal(5)
      }else{
        setEduTotal(eduList.length)
      }
    },[eduList,busiList])
    
    const pre = (i:number) =>{
      setI(i-1)
    }
    const next = (i:number) => {
      setI(i+1)
    }

    const [i, setI] = useState(0);

    return (
        <div>
        {busiTotal>0 || eduTotal>0?
        <Modalfront
          open={open}
          type={'normal'}
          title={'사업정보알림'}
          content={type.toString() + ' 모달'}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => { setOpen(false); if (data) setData(false);}}
          >
        <Box css={styles.modalCustom} className="home_tabpop" minWidth={'500px'} minHeight={'300px'}>
          <CustomTabsBlacks tabs={[{name:'사업정보',count:busiTotal},{name:'교육정보',count:eduTotal}]} onClick={()=>setI(0)}>
            {busiTotal>0?
            // `사업정보(${busiTotal})`
            <TabPanel value={`사업정보`}>
              <NavLink to={`../NoticeDetall/${busiList[i].pblancId}`}>
              <Stack direction="row" spacing={1} css={styles.tagstyle}>
                <div>
                  <Chip className="blue" label={busiList[i].recomendCl} />
                  <Chip className="wh" variant="outlined" label={busiList[i].pblancSttus} />
                </div> 
                <Chip
                  label={'마감 D-' + busiList[i].rmndrDay}
                  className="green"
                  />
              </Stack>
              <Typography variant="h6" component="div">
                {busiList[i].pblancNm}
              </Typography>
              <hr className="m20"/>
              <div className="modal_text">
                {busiList[i].pblancSumry}
              </div>
              </NavLink>
            </TabPanel>
            :null}
            {eduTotal>0?
            <TabPanel value={`교육정보`}>
              <Card css={styles.modalCard}>
                <CardActionArea>
                  <Stack direction="row" className="tag" spacing={1}>
                    <div>
                      <Chip className="blue" label={'기업가정신'} />
                      <Chip className="wh" variant="outlined" label={'마감 D' + 1} />
                    </div>
                    <Chip
                      label={'오늘마감'}
                      className="green"
                      />
                  </Stack>
                  <CardMedia component="img" height="267" image={'/images/main/list_img01.png'} alt="green iguana"/>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      AI 사업 빅데이터 비즈니스 모델
                    </Typography>
                    <p className="sub_txt icon01">총 20 챕터</p>
                    <p className="sub_txt icon02">교육인정 17시간</p>
                    <p className="sub_txt icon03">
                      수강기간 2021-12-01 ~ 2021-12-15
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </TabPanel>
            :null}
          </CustomTabsBlacks>
          <Box className="popup_listbtn">
            {i > 0?
              <Box className="next" onClick={() => {pre(i)}}/>
            : <Box className="next blind"/> }
            {i < busiTotal-1? 
              <Box className="prev" onClick={() => {next(i)}}/>
            : <Box className="prev blind"/>}
          </Box>
        </Box> 
        </Modalfront>
        :null}
        </div>
    );
  };

export default BusiEduModal;
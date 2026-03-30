import React, { useEffect, useState } from 'react';
import * as styles from '../styles';
import { Box, Stack} from '@mui/material';
import { fetchBusinessChklst } from '~/fetches/biz/fetchBusinessAppMgt';
import { CustomRadioButtons} from '~/components/ButtonComponents';
import { CustomButton } from '~/components/ButtonComponents';

const RequiredCheckList:React.FC<{
  applyId:string
  cklist?:string []
  handelBizCancel: () => void
  handelBizTemporaryStorage:() => void
  handelBizSend:() => void
}> = (props) => {
  const [chkList, setChkList]:any = useState([]);//체크 박스 리스트
  const [checkList, setCheckList]:any = useState([]);//체크리스트 항목
  
  // 사업신청 필수확인사항 조회 
  const getChklst = () => {
    fetchBusinessChklst(props.applyId).then((res:any) => {
      setCheckList(Object.values(res))
    }).catch((e)=>{
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }

  const updateChkList = (i:number,chk:any) => {
    setChkList(() => {
      const updated = chkList;
      updated[i] = chk;
      return Object.values(updated);
    })
  }

  useEffect(() => {
    getChklst()
  }, []);

  useEffect(()=>{
    let k:any = [];
    checkList.map((item:any)=>{
      k.push({chklstId:item.chklstId,ceckResultDivCd:'Y'})
    })
    setChkList(k);
  },[checkList])

  return (
    <>
      <Box className="box_guide">
        <ul>
            <li>필수확인사항을 꼼꼼하게 확인한 후 해당 부분에 체크하시기 바랍니다.</li>
            <li>아니오 선택 시 심사 및 선정에 제한이 있을 수 있으며, 아래 사항을 제대로 검토하지 않음으로 발생하는 불이익에 대한 책임은 전적으로 지원자에게 있습니다. </li>
            <li><span className="must">*</span> 표시는 필수입력 항목입니다.</li>
        </ul>
      </Box>
        <h4 className="sub_title">필수확인사항 <span className="must">*</span></h4>
      <Box css={styles.table2}>
        <div className="detail_table"> 
            <dl className="header">
            <dt className="num">번호</dt>
            <dt>체크사항</dt>
            <dt className="check">체크</dt>
            </dl>
            {checkList.map((item:any,i:number)=>(
            <dl key={i}>
            <dd className="num">{i}</dd>
            <dd className="cnt">
                <p>{item.chklstCn}</p>
                <dd className="check"><CustomRadioButtons row data={['예', '아니오']}
                onClick={(selected)=>{
                    if(selected==="아니오"){
                    chkList[i].ceckResultDivCd = "N";
                    }
                    updateChkList(i,chkList[i])
                }} 
                /></dd>
            </dd>
            </dl>
            ))}
        </div>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
      <CustomButton label={'신청취소'} type={'listBack'} color={'outlinedblack'} onClick={props.handelBizCancel}/>
      <CustomButton label={'임시저장'} type={'listBack'} color={'outlined'} onClick={props.handelBizTemporaryStorage}/>
      <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={props.handelBizSend}/>
      </Stack>
    </>
  );
}

export default RequiredCheckList;




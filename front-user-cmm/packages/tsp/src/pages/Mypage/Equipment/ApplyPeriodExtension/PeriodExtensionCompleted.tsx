import React from "react"
import {Stack} from "@mui/material";
import {
  VerticalInterval,
} from "shared/components/LayoutComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Icons} from "shared/components/IconContainer";
import {Body3} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const PeriodExtensionCompleted: React.FC<{}> = props => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  return (<>
      <VerticalInterval size={'10px'}/>
      <Stack width={"100%"}>
        <div style={{
          display: "flex",
          justifyContent: 'center',
          width: "100%",
          letterSpacing: "-1px"
        }}>
          <div><Icons.Complete/></div>
        </div>
        <VerticalInterval size={"30px"}/>
        <div style={{textAlign: 'center', fontWeight: 900, fontSize: "25px"}}>기간연장 신청이 완료되었습니다.</div>
        <VerticalInterval size={'30px'}/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            width: '620px',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: isMobile ? '20px' : '30px 30px 30px 80px',
          }}>
            <MyDiv isMobile={isMobile} title={'연장 신청기간'} label={'2021-11-17 16시 26분 ~ 2021-11-20 18시 11분'}/>
            <MyDiv title={'사용시간'} label={'30시간'}/>
            <MyDiv title={'1시간 사용료'} label={'100원'}/>
            <MyDiv title={'사용금액'} label={'1,000원'}/>
            <MyDiv color title={'할인적용금액'} label={'2,100원'}/>
            <MyDiv title={'지불방법'} label={'선납'}/>
          </div>
        </div>
      </Stack>
    </>
  )
}

const MyDiv: React.FC<{
  title: string
  label: string
  isMobile?: boolean
  color?: boolean
}> = props => {
  return <>
    <div style={{display: 'flex'}}>
      <Body3 listItem style={{minWidth: '100px', margin: '10px', paddingLeft: '8px'}}>{props.title}</Body3>
      <Body3 color={props.color ? Color.azul : '#222222'} weight={500} style={{margin: '10px'}}>{props.label}</Body3>
    </div>
  </>
}
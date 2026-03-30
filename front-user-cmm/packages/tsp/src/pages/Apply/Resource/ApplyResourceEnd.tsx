import React from "react"
import {Box, Stack} from "@mui/material";
import {VerticalInterval} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {Color} from "shared/components/StyleUtils";
import {Body2} from "shared/components/TextComponents";

export const ApplyResourceEnd: React.FC<{
  stepper: number
  setStepper: any
  isMobile?: boolean
}> = props => {
  const navigation = useNavigate();
  return (
    <Stack width={"100%"} spacing={"40px"}>
      <div style={{
        display: "flex",
        textAlign: "center",
        width: "100%",
        marginTop: "40px",
        flexDirection: "column",
        letterSpacing: "-1px",
        alignItems: 'center'
      }}>
        <Icons.Complete/>
        <VerticalInterval size={"30px"}/>
        <div style={{fontWeight: 900, fontSize: "25px"}}>실증자원 신청이 완료되었습니다.</div>
        <VerticalInterval size={"30px"}/>
        <Body2>담당자가 신청내용 확인 후 승인 여부를 통보해 드릴 예정입니다.</Body2>
        <Body2>궁금하신 내용은 해당 담당자 연락처로 문의바랍니다.</Body2>
      </div>
      <Box display={"flex"} justifyContent={"center"} style={{marginBottom: "40px"}}>
        <CustomButton label={<Body2 color={Color.azul}>실증자원사용관리</Body2>} color={"outlined"}
                      style={{borderRadius: "30px", width:props.isMobile ? '50%' : '200px', height:'60px'}}
                      onClick={() => {
                        navigation('/tsp/Mypage/Resource/MyPageResourceDetail')
                      }}
        />
        <Box width={"20px"}/>
        <CustomButton type={"largeList"} label={<Body2 color={Color.white}>홈</Body2>} style={{width:props.isMobile ? '50%' : '140px'}}
                      onClick={() => {
                        props.setStepper(0)
                      }}/>
      </Box>
    </Stack>
  )
}
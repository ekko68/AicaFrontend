import React from "react"
import {Box, Stack} from "@mui/material";
import {
  VerticalInterval,
} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {useNavigate} from "react-router-dom";
import {Body2, H2} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const ApplyCompleted: React.FC<{
  stepper: number
  setStepper: any
  isMobile: boolean
}> = props => {
  const navigate = useNavigate()
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
        <H2 bold>장비 사용신청이 완료되었습니다.</H2>
        <VerticalInterval size={"19px"}/>
        <Body2 style={{textAlign:'center', fontSize:props.isMobile ? '14px' : '18px'}}>담당자가 신청내용 확인 후 승인 여부를 통보해 드릴 예정입니다.</Body2>
        <Body2 style={{textAlign:'center', fontSize:props.isMobile ? '14px' : '18px'}}>궁금하신 내용은 해당 담당자 연락처로 문의바랍니다.</Body2>
      </div>
      <Box display={"flex"} justifyContent={"center"} style={{marginBottom: "40px"}}>
        <CustomButton label={<Body2 color={Color.azul}>견적요청관리</Body2>} color={"outlined"}
                      style={{borderRadius: "30px", width:props.isMobile ? '50%' : '168px', height:'60px'}}
                      onClick={() => {
                        navigate('/tsp/Mypage/Resource')
                      }}
        />
        <Box width={"20px"}/>
        <CustomButton type={"listBack"} label={<Body2 color={Color.white}>홈</Body2>}
                      style={{width:props.isMobile ? '50%' : '140px'}}
                      onClick={() => {
                        props.setStepper(1)
                      }}/>
      </Box>
    </Stack>
  )
}
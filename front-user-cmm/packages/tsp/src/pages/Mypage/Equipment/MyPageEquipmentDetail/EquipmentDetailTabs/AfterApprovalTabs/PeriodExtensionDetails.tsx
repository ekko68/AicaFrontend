import React from "react";
import {Stack, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import {ApplyInfoProps, periodTempData} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail";
import {styled} from "@mui/material/styles";
import {SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import {useNavigate} from "react-router-dom";
import {Body2, Body3} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const PeriodExtensionDetails: React.FC<{
  isMobile?: boolean
}> = props => {
  const navi = useNavigate()
  return <>
    <VerticalInterval size={props.isMobile ? '30px':'50px'}/>
    <Stack width={'100%'} spacing={'40px'} sx={{marginBottom: '90px'}}>
      <SubContents title={'기간연장'} marginBottom={'20px'} maxHeight={'100%'}>
        <TableContainer sx={{borderTop: "1px solid #000000", width: "100%", paddingBottom:'15px'}}>
          <Table sx={{minWidth: 700}}>
            <TableHead>
              <TableRow>
                <StyledTableCell><Body3 weight={500}>번호</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>사용상태</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>연장 신청기간</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>사용시간</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>1시간 사용료</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>사용금액</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>할인적용금액</Body3></StyledTableCell>
                <TableCell align={'center'} sx={{backgroundColor: '#f5f5f5', fontWeight: 'bold'}}>지불방법</TableCell>
              </TableRow>
            </TableHead>
            {
              periodTempData.map(m => {
                return <TableBody>
                  <StyledTableCell sx={{minWidth: '61px'}}><Body3>{m.id}</Body3></StyledTableCell>
                  <StyledTableCell sx={{minWidth: '90px'}}><Body3>{m.useSt}</Body3></StyledTableCell>
                  <StyledTableCell sx={{minWidth: '340px'}}><Body3>{m.extensionDt}</Body3></StyledTableCell>
                  <StyledTableCell sx={{minWidth: '90px'}}><Body3>{m.useTime}</Body3></StyledTableCell>
                  <StyledTableCell sx={{minWidth: '116px'}}><Body3>{m.hourFare}</Body3></StyledTableCell>
                  <StyledTableCell sx={{minWidth: '90px'}}><Body3>{m.useFare}</Body3></StyledTableCell>
                  <StyledTableCell sx={{minWidth: '118px'}}><Body3>{m.discountFare}</Body3></StyledTableCell>
                  <TableCell align={'center'} sx={{minWidth: '90px'}}><Body3>{m.payment}</Body3></TableCell>
                </TableBody>
              })
            }
          </Table>
        </TableContainer>
      </SubContents>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CustomButton
          label={<Body2 color={Color.white}>기간연장신청</Body2>}
          style={{width:props.isMobile ? '100%' : '168px', height: '60px', borderRadius: '30px', backgroundColor: Color.azul}}
          onClick={() => navi(`/tsp/Mypage/Equipment/ApplyPeriodExtension`)}/>
      </div>
    </Stack>
  </>
}

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #d7dae6',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  [`&.${tableCellClasses.body}`]: {
    borderRight: '1px solid #d7dae6',
    textAlign: 'center'
  },
}));

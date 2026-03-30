import React from "react";
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import {
  UsageChargeDetailProps, usageTempData
} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail";
import {SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import {
  StyledTableCell
} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/AfterApprovalTabs/PeriodExtensionDetails";
import {useNavigate} from "react-router-dom";
import {Body2, Body3} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const UsageChargeDetail: React.FC<{
  isMobile?: boolean
}> = props => {
  const navi = useNavigate()
  let arr: string[] = [''];
  for (let i = 0; i < usageTempData.length; ++i) {
    arr[i] = usageTempData[i].fare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function subtotal(items: readonly UsageChargeDetailProps[]) {
    return items.map(({fare}) => fare).reduce((sum, i) => sum + i, 0);
  }

  const subtotal1 = subtotal(usageTempData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return <>
    <VerticalInterval size={props.isMobile ? '30px':'50px'}/>
    <Stack width={'100%'} spacing={'40px'} sx={{marginBottom: '90px'}}>
      <SubContents title={'사용료 부과내역'} marginBottom={'20px'} maxHeight={'100%'}>
        <TableContainer sx={{borderTop: "1px solid #000000", width: "100%",paddingBottom:'15px'}}>
          <Table sx={{minWidth: 700}}>
            <TableHead>
              <TableRow>
                <StyledTableCell><Body3 weight={500}>번호</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>구분</Body3></StyledTableCell>
                <StyledTableCell><Body3 weight={500}>구분</Body3></StyledTableCell>
                <TableCell align={'center'}
                           sx={{backgroundColor: '#f5f5f5', fontWeight: 'bold'}}>
                  <Body3 weight={500}>금액</Body3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                usageTempData.map((m, i) => {
                  return <TableRow key={m.id}>
                    <StyledTableCell sx={{minWidth: '61px'}}><Body3>{i + 1}</Body3></StyledTableCell>
                    <StyledTableCell sx={{minWidth: '90px'}}><Body3>{m.useDivision}</Body3></StyledTableCell>
                    <StyledTableCell sx={{minWidth: '200px'}}><Body3>{m.division}</Body3></StyledTableCell>
                    <TableCell sx={{minWidth: '90px', textAlign: 'center'}}><Body3>{arr[i]}</Body3></TableCell>
                  </TableRow>
                })
              }
              <TableRow>
                <StyledTableCell colSpan={3} sx={{minWidth: '61px', backgroundColor: '#eff1f8'}}>
                  <Body3 weight={500}>총 사용료</Body3></StyledTableCell>
                <TableCell sx={{
                  minWidth: '90px',
                  backgroundColor: '#eff1f8',
                  textAlign: 'center'
                }}><Body3 weight={500}>{subtotal1}</Body3></TableCell>
              </TableRow>
            </TableBody>
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

import React, { useState } from "react"
import * as styles from '~/styles/styles';
import { Box, Stack, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import BreadCrumb from "~/components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { CustomButton } from '~/components/ButtonComponents';
import { CustomCheckBoxs } from '../../../components/ButtonComponents';
import { checkinfo } from "~/pages/Temp/DummyData";
import { fetchWithdrawal } from "~/fetches/fetchSignIn";
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";

/* 
  작성일    :   2022/06/09
  화면명    :   이페이지 -> 사용자 지원 -> 회원탈퇴
  회면ID    :   UI-USP-FRN-0050101
  화면/개발 :   Seongeonjoo / navycui
*/
 const MemberInfoOut: React.FC<{
    children?:any
  }> = props => {
  const navigate = useNavigate();
  const {addModal} = useGlobalModalStore();
  const [chk,setChk] = useState(false);

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <Box className="benner">
          <BreadCrumb />
          <Box className="content">
            <Box className="txtbox">
              <Typography
                variant="h2"
                component="div"
                className="tit"
              >
                회원탈퇴
              </Typography>
              <p>유의사항을 꼭 확인하고, 회원탈퇴를 진행해주세요. </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box css={styles.sub_cont02}>
        <Box className="content">
          <Box css={styles.box_gray}>
              <Typography
                variant="h3"
                component="div"
                className="tit"
              >
                회원 탈퇴시 유의사항
              </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="AICA 내 모든 포털 동시 탈퇴"
                  secondary='AICA 회원 탈퇴 시 AICA 내 모든 포털 (사용자지원포털, 실증지원포털, 데이터마켓, 데이터센터)에서 모두 탈퇴됩니다.'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="재가입 가능 기간"
                  secondary='개인정보 도용 등으로 인한 원치 않는 회원탈퇴 등에 대비하기 위하여 회원탈퇴 후 7일 이내 재가입 시 회원탈퇴를 취소하고 정상회원으로 이용할 수 있습니다.'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="회원정보삭제"
                  secondary={<>{'탈퇴 시 재가입 가능 기간 이후에는 회원가입정보 및 각 포털에 등록된 부가정보가 모두 삭제됩니다.'}<br/>{'- 단, 각 포털 별 법률에 기반하여 특정 정보의 경우 회원정보를 일정기간 보관 후 파기합니다.(예: 상거래정보 등)'}</>}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="탈퇴 불가 상태"
                  secondary='하단 상태인 경우 탈퇴 가능 조건이 될 때까지 즉시 탈퇴가 불가능합니다.'
                />
              </ListItem>
            </List>
            <Box css={styles.table06}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 320 }} >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">플랫폼</TableCell>
                      <TableCell align="center">상태</TableCell>
                      <TableCell align="center">탈퇴 가능 조건</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell scope="row">사용자지원포털</TableCell>
                        <TableCell>진행중인 사업이 있을 경우</TableCell>
                        <TableCell>사업이 종료된 후 탈퇴 가능</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell scope="row">실증지원포털</TableCell>
                        <TableCell>장비 반출 상태일 경우</TableCell>
                        <TableCell>장비 반입완료 및 추가요금 납입 완료 후</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell scope="row">데이터유통</TableCell>
                        <TableCell>미정산 내역이 있을 경우</TableCell>
                        <TableCell>정산완료 후</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box sx={{marginTop: '35px', textAlign: 'center', fontSize: '18px'}}>
          <CustomCheckBoxs checkbox={checkinfo} onClick={(s: string[]) => { 
              if (s.length > 0){
                setChk(true)
              } else {
                setChk(false)
              }
            }}/>
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
            <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'} onClick={()=>navigate('/')}/>
            <CustomButton label={'회원탈퇴'} type={'listBack'} color={'primary'} onClick={()=>{
              if(!chk){
                addModal({
                  type:'normal',
                  open: true,
                  content: '회원 탈퇴시 유의사항 동의하세요.'
                })
                return;
              }
              fetchWithdrawal().then((res)=>{
                addModal({
                  type:'normal',
                  open: true,
                  content: '회원 탈퇴 처리되었습니다',
                  onClose: ()=> {
                    navigate('/signin/signout')
                  },
                  onConfirm: () => {
                    navigate('/signin/signout')
                  },
                })
              }).catch((e)=>{
                addModal({
                  type:'normal',
                  open: true,
                  content: e.response.data.message
                })
              })
            }}/>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default MemberInfoOut;
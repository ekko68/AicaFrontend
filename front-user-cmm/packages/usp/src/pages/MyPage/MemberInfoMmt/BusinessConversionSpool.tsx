// import React, { useState,useRef,useEffect } from 'react';
import * as styles from '~/styles/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import BreadCrumb from "~/components/BreadCrumb";
import { CustomButton } from '~/components/ButtonComponents';
import { Card, CardContent, Typography } from '@mui/material';
import authentication from '~/../../shared/src/authentication';

/* 
  작성일    :   2022/06/14
  화면명    :   이페이지 -> 사용자지원 -> 사업자로 전환불가
  회면ID    :   UI-USP-FRN-0070502
  화면/개발 :   Seongeonjoo / navycui
  // 모바일 작업안됨 추후수정예정
*/
const BusinessConversionSpool = () => {
  const navigate = useNavigate();
  const memberNm =authentication.getUserNm();

  return (
    <div css={styles.container} className="darkbg">
        <Box css={styles.sub_cont01}>
          <div className='benner'>
            <BreadCrumb />
            <div className='content'>
              <div className='txtbox'>
                <h2 className='tit'>사업자로 전환불가</h2>
              </div>
            </div>
          </div>
          <Box css={styles.sxform}>
            <Box className="confirm_tit">
              <Box className="icon_Box">
                <img src="/images/subpage/icon_error.png" />
              </Box>
              <Typography
                variant="h3"
                component="div"
              >
                <em>{memberNm ? memberNm : ''}</em> 님은 사업자 회원입니다.
              </Typography>
              <p>
                {memberNm ? memberNm : ''}은 현재 AICA 사업자 회원으로서 <br/>
                포털 내 다양한 서비스를 자유롭게 이용하시기 바랍니다.
              </p>
            </Box>
            <Card css={styles.card_box}>
              <CardContent className="tit">
                <span className="subtit">
                  기업 상세정보를 미리 입력해 두시면 나중에 사업신청 시 미리 입력한 정보가 
                  자동으로 출력되어 빠르고 간편하게 접수가 가능합니다.
                </span>
              </CardContent>
              <NavLink className="linkicon" to="/">기업 상세정보 지금 입력하기</NavLink>
            </Card>
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup} sx={{pb: 10}}>
            <CustomButton label={'홈으로 이동'} type={'formbtn'} color={'outlinedgwhite'} onClick={()=> navigate('/')}/>
            <CustomButton label={'기업정보 입력하기'} type={'formbtn'} color={'primary'} onClick={()=> navigate('/MyPage/MemberInfoMmt/CorporateInfoMmt')}/>
          </Stack>
        </Box>
    </div>
  );
}

export default BusinessConversionSpool;
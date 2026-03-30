import React from "react";
import {Box, Chip, Stack} from "@mui/material";
import {SubContents} from "shared/components/LayoutComponents";
import {CustomInfoTable, TableAttachCell, TableTextCell} from "shared/components/TableComponents";
import {Icons} from "shared/components/IconContainer";
import {CustomButton} from "shared/components/ButtonComponents";
import {BannerContents} from "shared/components/BannerContents";
import {ApplyInfoProps} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {Body2, Body3, Body4} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const BeforeApproval: React.FC<{
  applyInfoProps: ApplyInfoProps;
  isMobile: boolean
}> = props => {
  const navigate = useNavigate()
  const columnCount = props.isMobile ? 1 : 2
  return <>
    <BannerContents title={'장비사용 상세'}
                    subTitle={'장비 신청정보를 조회하고 현재 사용상태를 변경할 수 있습니다.'}
                    tabs={{
                      tabValue: '신청정보', items: ['신청정보'], onClick: selectTab => {
                      }
                    }}>
      <Stack width={'100%'} spacing={'40px'} sx={{marginBottom: '90px', paddingTop: '60px'}}>
        <SubContents title={'신청정보'} maxHeight={'100%'} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell title={'접수번호'} label={props.applyInfoProps.applyNb}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'신청일'} label={props.applyInfoProps.applyDt}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'사용상태'} label={props.applyInfoProps.useSt}
                           thWidth={100} tdWidth={200} tdSpan={3}/>,
          ]}/>
        </SubContents>

        <SubContents title={'신청자정보'} maxHeight={'100%'} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell title={'구분'} label={props.applyInfoProps.division}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'업체명'} label={props.applyInfoProps.comNm}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'이름'} label={props.applyInfoProps.name}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'직위'} label={props.applyInfoProps.spot}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'연락처'} label={props.applyInfoProps.callNb}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'이메일'} label={props.applyInfoProps.email}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'AI 집적단지 사업참여 여부'} label={props.applyInfoProps.AI}
                           thWidth={100} tdWidth={200} tdSpan={3}/>,

          ]}/>
        </SubContents>

        <SubContents title={'신청장비'} maxHeight={'100%'} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell title={'장비명(국문)'} label={props.applyInfoProps.equipKoNm}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'장비명(영문)'} label={props.applyInfoProps.equipEgNm}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'모델명'} label={props.applyInfoProps.modelNm}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'자산번호'} label={props.applyInfoProps.equipNb}
                           thWidth={100} tdWidth={200}/>,
          ]}/>
        </SubContents>

        <SubContents title={'활용목적'} marginBottom={'20px'}>
          <div style={{
            borderTop: '1px solid #1f2437',
            borderBottom: '1px solid #e0e0e0',
            minHeight: '80px',
            padding: '20px 15px 20px 15px'
          }}>
            <Body3>{props.applyInfoProps.usePurpose}</Body3>
          </div>
        </SubContents>

        <SubContents title={'반출신청'} maxHeight={'100%'} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell title={'반출여부'} label={props.applyInfoProps.takeout}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'반출기간'} label={props.applyInfoProps.takeoutDate}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'반출지 주소'} label={props.applyInfoProps.takeoutAddress}
                           thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
            <TableTextCell title={'사유(용도)'} label={props.applyInfoProps.purpose}
                           thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
            <TableAttachCell thWidth={100} tdWidth={200} tdSpan={3} title={'서약서'} element={
              <MyChip
                icon={<Icons.FileDownloadColor/>}
                label={<Body4 weight={500}>{props.applyInfoProps.pledge}</Body4>}
                variant="outlined"
                onClick={() => {
                }}
              />}/>,
          ]}/>
        </SubContents>

        <SubContents title={'사용기간'} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell title={'시작일'} label={props.applyInfoProps.startDt}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'종료일'} label={props.applyInfoProps.endDt}
                           thWidth={100} tdWidth={200}/>,
          ]}/>
        </SubContents>

        <SubContents title={'신청 사용금액'} maxHeight={'100%'} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell title={'1시간 사용료'} label={props.applyInfoProps.hourFare}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'1일 가용시간'} label={props.applyInfoProps.dayTime}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'수량 및 단위'} label={props.applyInfoProps.unit}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'예상 사용금액'} label={props.applyInfoProps.expectationFare}
                           thWidth={100} tdWidth={200}/>,
            <TableTextCell title={'지불방법'} label={props.applyInfoProps.payment}
                           thWidth={100} tdWidth={200} tdSpan={3}/>,
          ]}/>
        </SubContents>

        <SubContents marginBottom={'8px'} maxHeight={'100%'} title={'첨부파일'} rightContent={
          <Chip
            icon={<Icons.FileDownloadColor/>}
            label={<Body4 weight={500}>일괄다운로드</Body4>}
            variant="outlined"
            sx={{
              width: '148px',
              height: '48px',
              marginRight: '-30px',
              backgroundColor: 'white',
              borderRadius: '24px',
            }}
            onClick={() => {
            }}
          />}>
          <Box alignItems={'center'} sx={{borderRadius: '10px', backgroundColor: Color.light_gray02, padding: '20px'}}>
            <Stack direction={'row'} sx={{width: '100%', flexWrap: 'wrap', gap: '10px'}}>
              {
                props.applyInfoProps.file.map((m, i) => {
                  return <MyChip
                    key={i}
                    icon={<Icons.FileDownloadColor/>}
                    label={<Body4 weight={500}>{m}</Body4>}
                    variant="outlined"
                    onClick={() => {
                    }}
                  />
                })
              }
            </Stack>
          </Box>
        </SubContents>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <CustomButton
            label={<Body2 color={Color.white}>신청취소</Body2>}
            style={{
              width: props.isMobile ? '100%' : '140px',
              height: '60px',
              borderRadius: '30px',
              backgroundColor: Color.azul
            }}
            onClick={() => navigate(-1)}/>
        </div>
      </Stack>
    </BannerContents>
  </>
}

export const MyChip = styled(Chip)`
  height: 48px;
  min-width: 178px;
  padding: 24px;
  background-color: white;
  border-radius: 24px;
`
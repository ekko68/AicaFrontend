import React from "react";
import {Box, Chip, Stack} from "@mui/material";
import {SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import {CustomInfoTable, TableAttachCell, TableEmptyCell, TableTextCell} from "shared/components/TableComponents";
import {Icons} from "shared/components/IconContainer";
import {CustomButton} from "shared/components/ButtonComponents";
import {tempData} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail";
import {MyChip} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/BeforeApproval";
import {useNavigate} from "react-router-dom";
import {Body2, Body3, Body4} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

export const ApplyInformation: React.FC<{
  isMobile: boolean
}> = props => {
  const columnCount = props.isMobile ? 1 : 2;
  const navigate = useNavigate()
  return <>
    <VerticalInterval size={props.isMobile ? '30px' : '50px'}/>
    <Stack width={'100%'} spacing={'40px'} sx={{marginBottom: '90px'}}>
      <SubContents title={'신청정보'} maxHeight={'100%'} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'접수번호'} label={tempData.applyNb}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'신청일'} label={tempData.applyDt}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'사용상태'} label={'승인'}
                         thWidth={100} tdWidth={200} tdSpan={3}/>,
        ]}/>
      </SubContents>

      <SubContents title={'신청자정보'} maxHeight={'100%'} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'구분'} label={tempData.division}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'업체명'} label={tempData.comNm}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'이름'} label={tempData.name}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'직위'} label={tempData.spot}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'연락처'} label={tempData.callNb}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'이메일'} label={tempData.email}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'AI 집적단지 사업참여 여부'} label={tempData.AI}
                         thWidth={100} tdWidth={200} tdSpan={3}/>,

        ]}/>
      </SubContents>

      <SubContents title={'신청장비'} maxHeight={'100%'} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'장비명(국문)'} label={tempData.equipKoNm}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'장비명(영문)'} label={tempData.equipEgNm}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'모델명'} label={tempData.modelNm}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'자산번호'} label={tempData.equipNb}
                         thWidth={100} tdWidth={200}/>,
        ]}/>
      </SubContents>

      <SubContents title={'활용목적'} maxHeight={'100%'} marginBottom={'20px'}>
        <div style={{
          borderTop: '1px solid #000000',
          borderBottom: '1px solid #d7dae6',
          minHeight: '80px',
          padding: '20px 15px'
        }}>
          <Body3>{tempData.usePurpose}</Body3>
        </div>
      </SubContents>

      <SubContents title={'반출신청'} maxHeight={'100%'} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'반출여부'} label={tempData.takeout}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'반출기간'} label={tempData.takeoutDate}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'반출지 주소'} label={tempData.takeoutAddress}
                         thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
          <TableTextCell title={'사유(용도)'} label={tempData.purpose}
                         thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
          <TableAttachCell
            thWidth={100} tdWidth={200} tdSpan={3}
            title={'서약서'} element={
            <MyChip
              icon={<Icons.FileDownloadColor/>}
              label={<Body4 weight={500}>{tempData.pledge}</Body4>}
              variant="outlined"
              onClick={() => {
              }}
            />}
          />, <></>,
          <TableTextCell title={'반출심의결과'} label={tempData.carryExaminationResult}
                         thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
          <TableTextCell title={'반출심의내용'} label={tempData.carryExaminationDetails}
                         thWidth={100} tdWidth={200} tdSpan={3}/>
        ]}/>
      </SubContents>

      <SubContents title={'사용기간'} maxHeight={'100%'} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'시작일'} label={tempData.startDt}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'종료일'} label={tempData.endDt}
                         thWidth={100} tdWidth={200}/>,
        ]}/>
      </SubContents>

      <SubContents title={'신청 사용금액'} maxHeight={'100%'} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'1시간 사용료'} label={tempData.hourFare}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'1일 가용시간'} label={tempData.dayTime}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'수량 및 단위'} label={tempData.unit}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'예상 사용금액'} label={tempData.expectationFare}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'지불방법'} label={tempData.payment}
                         thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
          <TableTextCell title={'할인사유'} label={tempData.applyDiscount}
                         thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
          <TableTextCell title={'할인금액'} label={tempData.discount}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'할인적용금액'} label={tempData.additionalAmounts}
                         thWidth={100} tdWidth={200}/>,
        ]}/>
      </SubContents>

      <SubContents title={'추가금액'} marginBottom={'20px'} maxHeight={'100%'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'추가금액'} label={tempData.additionalAmounts}
                         thWidth={100} tdWidth={200}/>,
          props.isMobile ? <></> : <TableEmptyCell thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'청구사유'} label={tempData.reason}
                         thWidth={100} tdWidth={200}/>,
          props.isMobile ? <></> : <TableEmptyCell thWidth={100} tdWidth={200}/>,
        ]}/>
      </SubContents>

      <SubContents title={'반입상태'} marginBottom={'20px'} maxHeight={'100%'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell title={'처리상태'} label={tempData.carrySt}
                         thWidth={100} tdWidth={200}/>,
          <TableTextCell title={'완료일시'} label={tempData.completionDt}
                         thWidth={100} tdWidth={200}/>,
        ]}/>
      </SubContents>

      <SubContents maxHeight={'100%'} title={'첨부파일'} marginBottom={'8px'} rightContent={
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
        />
      }>
        <Box alignItems={'center'} sx={{borderRadius: '10px', backgroundColor: Color.light_gray02, padding: '20px'}}>
          <Stack direction={'row'} sx={{width: '100%', flexWrap: 'wrap', gap: '10px'}}>
            {
              tempData.file.map((m, i) => {
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
  </>
}
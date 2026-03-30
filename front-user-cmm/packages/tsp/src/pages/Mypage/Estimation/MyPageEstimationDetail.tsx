import React, {useState} from "react";
import {BannerContents} from "shared/components/BannerContents";
import {Box, Chip, FormControl, Stack, TableContainer} from "@mui/material";
import {CustomInfoTable, TableComponents, TableTextCell} from "shared/components/TableComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {SubContents, VerticalInterval, WordCount} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {Body2, Body3, Body4} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";
import {MyChip} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/BeforeApproval";


export const MyPageEstimationDetail = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const navigation = useNavigate();
  const columnCount = isMobile ? 1 : 2

  return (
    <BannerContents
      title={"견적요청 상세"}
      subTitle={"장비 신청정보를 조회 및 수정하고, 현재 사용상태를 확인할 수 있습니다."}>
      <Stack width={"100%"} spacing={"40px"} style={{marginTop: "40px"}}>
        <SubContents title={"신청정보"} maxHeight={"100%"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"접수번호"} label={EstimateData.recepNum}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"신청일"} label={EstimateData.applyDt}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"사용상태"} label={EstimateData.useStatus} tdSpan={3}/>,
          ]}/>
        </SubContents>

        <SubContents maxHeight={'100%'} title={"신청자정보"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"구분"} label={EstimateData.apc_sort}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"업체명"} label={EstimateData.companyNm}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"이름"} label={EstimateData.apc_Nm}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"직위"} label={EstimateData.apc_Position}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"연락처"} label={EstimateData.apc_Contact}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"이메일"} label={EstimateData.apc_Email}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"AI 집적단지 사업참여 여부"} label={EstimateData.participation} tdSpan={3}/>,
          ]}/>
        </SubContents>

        <SubContents title={"신청장비"} maxHeight={"100%"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"장비명(국문)"} label={EstimateData.equi_KoNm}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"장비명(영문)"} label={EstimateData.equi_EnNm}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"모델명"} label={EstimateData.equi_ModelNm}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"자산번호"} label={EstimateData.equi_Num}/>,
          ]}/>
        </SubContents>

        <SubContents title={"활용목적"} maxHeight={"100%"} marginBottom={'20px'}>
          <TableContainer style={{overflow: "hidden"}}>
            <div style={{
              display: "flex",
              border: "1px solid #d7dae6",
              borderRadius: "5px",
              padding: '20px',
              minHeight: "95px",
              overflow: "auto"
            }}>
              <Body3>{EstimateData.usePurpose}</Body3>
            </div>
          </TableContainer>
        </SubContents>

        <SubContents title={"반출신청"} maxHeight={"100%"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"반출여부"} label={EstimateData.carryWeth}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"반출기간"} label={EstimateData.carryPeriod}/>,
            <TableTextCell thWidth={100} tdWidth={200} tdSpan={3}
                           title={"반출지 주소"} label={EstimateData.carryAddr}/>, <></>,
            <TableTextCell thWidth={100} tdWidth={200} tdSpan={3}
                           title={"사유(용도)"} label={EstimateData.carryReason}/>,
          ]}/>
        </SubContents>

        <SubContents title={"사용기간"} maxHeight={"100%"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"시작일"} label={EstimateData.startDtDetail}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"종료일"} label={EstimateData.endDtDetail}/>,
          ]}/>
        </SubContents>

        <SubContents title={"신청 사용금액"} maxHeight={"100%"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"1시간 사용료"} label={EstimateData.onehourUsageFee}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"1일 가용시간"} label={EstimateData.onedayAvailTime}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"수량 및 단위"} label={EstimateData.quantity}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"예상 사용금액"} label={EstimateData.expct_UsageFee}/>,
            <TableTextCell thWidth={100} tdWidth={200}
                           title={"지불방법"} label={EstimateData.payMethod} tdSpan={3}/>,
          ]}/>
        </SubContents>

        <SubContents title={"첨부파일"} maxHeight={"100%"} marginBottom={'10px'} rightContent={
          <Chip
            icon={<Icons.FileDownloadColor/>}
            label={<Body4 weight={500}>일괄다운로드</Body4>}
            variant="outlined"
            sx={{
              width: '148px',
              height: '48px',
              backgroundColor: 'white',
              borderRadius: '24px',
              marginRight: '-30px',
            }}
            onClick={() => {
            }}
          />
        }>
          <Box alignItems={'center'} sx={{borderRadius: '10px', backgroundColor: Color.light_gray02, padding: '20px'}}>
            <Stack direction={'row'} sx={{width: '100%', flexWrap: 'wrap', gap: '10px'}}>
              {
                EstimateData.fileNm.map((item, i) => {
                  return (
                    <MyChip
                      key={i}
                      icon={<Icons.FileDownloadColor/>}
                      label={<Body4 weight={500}>{item}</Body4>}
                      variant="outlined"
                      onClick={() => {
                      }}
                    />)
                })
              }
            </Stack>
          </Box>
        </SubContents>
        <Box display={"flex"} justifyContent={"center"} style={{marginBottom: "40px"}}>
          <CustomButton label={<Body2>신청취소</Body2>} color={"outlinedblack"}
                        style={{borderRadius: "30px", width: isMobile ? '50%' : '140px', height: '60px'}}
                        onClick={() => {
                          navigation(-1)
                        }}
          />
          <Box width={"20px"}/>
          <CustomButton label={<Body2 color={Color.white}>견적서 다운로드</Body2>}
                        style={{
                          borderRadius: "30px",
                          width: isMobile ? '50%' : '186px',
                          height: '60px',
                          backgroundColor: Color.azul
                        }}
                        onClick={() => {
                        }}/>
        </Box>
      </Stack>
    </BannerContents>
  )
}


export default MyPageEstimationDetail;

export interface Estimate {
  recepNum: string /*접수번호*/
  applyDt: string /*신청일*/
  useStatus: string /*사용상태*/

  apc_sort: string /*구분*/
  companyNm: string  /*업체명*/
  apc_Nm: string /*신청자 이름*/
  apc_Position: string /*신청자 직위*/
  apc_Contact: string /*신청자 연락처*/
  apc_Email: string /*신청자 이메일*/
  participation: string  /*사업참여 여부*/

  equi_KoNm: string /*장비명(국문)*/
  equi_EnNm: string /*장비명(영문)*/
  equi_ModelNm: string /*모델명*/
  equi_Num: string /*자산번호*/

  usePurpose: string   /*활용목적*/

  carryWeth: string
  carryPeriod: string
  carryAddr: string
  carryReason: string

  startDtDetail: string  /*시작일*/
  endDtDetail: string  /*종료일*/

  onehourUsageFee: string /*1시간 사용료*/
  onedayAvailTime: string /*1일 가용시간*/
  quantity: string /*수량 및 단위*/
  expct_UsageFee: string /*예상 사용금액*/
  payMethod: string /*지불방법*/

  fileNm: string[]  /*첨부파일명*/
}

const EstimateData: Estimate = {
  recepNum: '12345',
  applyDt: '2021-10-31',
  useStatus: '신청',
  apc_sort: '법인사업자',
  companyNm: '(주)블루레몬',
  apc_Nm: '홍길동',
  apc_Position: '대리',
  apc_Contact: '010-1234-1234',
  apc_Email: 'abc@gmail.com',
  participation: 'R&D',

  equi_KoNm: '자외선 및 IR 이미지 측정시스템',
  equi_EnNm: 'UV @ IR image measurement system',
  equi_ModelNm: 'ABCDEDF',
  equi_Num: '2021-1-20-32',

  usePurpose: '활용목적이 출력됩니다.활용목적이 출력됩니다.활용목적이 출력됩니다.활용목적이 출력됩니다.',

  carryWeth: '반출',
  carryPeriod: '2021-10-01 ~ 2021-10-01',
  carryAddr: '광주시 중구 1동',
  carryReason: '직접 사용하기위해입니다.직접 사용하기위해입니다.직접 사용하기위해입니다.직접 사용하기위해입니다.직접 사용하기위해입니다. 직접 사용하기위해입니다.직접 사용하기위해입니다.직접 사용하기위해입니다.직접 사용하기위해입니다.직접 사용하기위해입니다.',

  startDtDetail: '2021-11-16 10시 15분',
  endDtDetail: '2021-11-17 15시 25분',

  onehourUsageFee: '100원',
  onedayAvailTime: '8시간',
  quantity: '1',
  expct_UsageFee: '1,200원',
  payMethod: '선납',

  fileNm: ['이의신청서.pdf(2KB)', '이의신청서.pdf(2KB)'],
}

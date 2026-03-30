import React from "react";
import {BannerContents} from "shared/components/BannerContents";
import {Box, Chip, FormControl, Stack, TableContainer} from "@mui/material";
import {CustomInfoTable, TableTextCell} from "shared/components/TableComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import 'styles/style.css';
import {Color} from "shared/components/StyleUtils";
import {Body2, Body3, Body4} from "shared/components/TextComponents";
import {useNavigate} from "react-router-dom";

export const MyPageResourceDetail = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const columnCount = isMobile ? 1 : 2
  const navigate = useNavigate()

  return (
    <BannerContents
      title={"실증자원사용 상세"}
      subTitle={"실증자원 신청정보를 조회 및 수정하고, 현재 사용상태를 확인할 수 있습니다."}>
      <Stack width={"100%"} spacing={"40px"} style={{marginTop: "40px"}}>
        <SubContents
          title={"신청정보"}
          maxHeight={"100%"}
          marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"접수번호"} label={ResourceData.recepNum}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"신청일"} label={ResourceData.applyDt}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"사용상태"} label={ResourceData.useStatus}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"반환요청일"} label={ResourceData.returnReqDt}
            />,
          ]}/>
        </SubContents>

        <SubContents maxHeight={'100%'} title={"신청자정보"} marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"구분"} label={ResourceData.apc_sort}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"업체명"} label={ResourceData.companyNm}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"이름"} label={ResourceData.apc_Nm}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"직위"} label={ResourceData.apc_Position}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"연락처"} label={ResourceData.apc_Contact}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"이메일"} label={ResourceData.apc_Email}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"AI 집적단지 사업참여 여부"} label={ResourceData.participation} tdSpan={3}
            />,
          ]}/>
        </SubContents>

        <SubContents
          title={"신청자원"}
          maxHeight={"100%"}
          marginBottom={'20px'}>
          <CustomInfoTable columnCount={columnCount} elements={[
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"GPU"} label={ResourceData.resourceGPU}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"CPU"} label={ResourceData.resourceCPU}
            />,
            <TableTextCell
              thWidth={100} tdWidth={200}
              title={"데이터 저장소"} label={ResourceData.resourceDataStorage} tdSpan={3}
            />,
          ]}/>
        </SubContents>

        <SubContents title={"활용목적"} maxHeight={"100%"} marginBottom={'20px'}>
          <TableContainer style={{overflow: "hidden"}}>
            <div style={{
              display: "flex",
              border: "1px solid #d7dae6",
              minHeight:'95px',
              borderRadius: "5px",
              padding: '20px',
              overflow: "auto"
            }}>
              <Body3>{ResourceData.usePurpose}</Body3>
            </div>
          </TableContainer>
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
                ResourceData.fileNm.map((item,i) => {
                  return <Chip
                    key={i}
                    icon={<Icons.FileDownloadColor/>}
                    label={<Body4 weight={500}>{item}</Body4>}
                    variant="outlined"
                    sx={{padding: '24px', backgroundColor: 'white', borderRadius: '24px'}}
                    onClick={() => {
                    }}
                  />
                })}
            </Stack>
          </Box>
        </SubContents>
        <Box display={"flex"} justifyContent={"center"} style={{marginBottom: "40px"}}>
          <CustomButton
            label={<Body2 color={Color.white}>신청취소</Body2>}
            style={{width:isMobile? '100%' : '140px', height: '60px', borderRadius: '30px', backgroundColor: Color.azul}}
            onClick={() => navigate(-1)}/>
        </Box>
      </Stack>
    </BannerContents>
  )
}


export default MyPageResourceDetail;

interface Resource {
  recepNum: string /*접수번호*/
  applyDt: string /*신청일*/
  useStatus: string /*사용상태*/
  returnReqDt: string /*반환요청일*/

  apc_sort: string /*구분*/
  companyNm: string  /*업체명*/
  apc_Nm: string /*신청자 이름*/
  apc_Position: string /*신청자 직위*/
  apc_Contact: string /*신청자 연락처*/
  apc_Email: string /*신청자 이메일*/
  participation: string  /*사업참여 여부*/

  resourceGPU: string /*GPU*/
  resourceCPU: string /*CPU*/
  resourceDataStorage: string /*데이터 저장소*/

  usePurpose: string   /*활용목적*/

  fileNm: string[]  /*첨부파일명*/
}

const ResourceData: Resource = {
  recepNum: '12345',
  applyDt: '2021-10-31',
  useStatus: '반환완료',
  returnReqDt: '2021-11-05',

  apc_sort: '법인사업자',
  companyNm: '(주)블루레몬',
  apc_Nm: '홍길동',
  apc_Position: '대리',
  apc_Contact: '010-1234-1234',
  apc_Email: 'abc@gmail.com',
  participation: 'R&D',

  resourceGPU: '사용',
  resourceCPU: '3 core',
  resourceDataStorage: '사용안함',

  usePurpose: '활용목적이 출력됩니다.활용목적이 출력됩니다.활용목적이 출력됩니다.활용목적이 출력됩니다.활용목적이 출력됩니다.활용목적이 출력됩니다',

  fileNm: ['이용계획서.pdf(2MB)', '사용계획서.pdf(2MB)', '테스트계획서.pdf(4MB)', '테스트계획서.pdf(4MB)', '테스트계획서.pdf(4MB)'],
}

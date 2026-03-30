import {Box, Button, Chip, FormControl, Stack, TableContainer} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import React from "react";
import {Body2, Body3, Body4, H2} from "shared/components/TextComponents";
import styled from '@emotion/styled'
import {useNavigate} from "react-router-dom";
import {CustomButton} from "shared/components/ButtonComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Icons} from "shared/components/IconContainer";
import {Color} from "shared/components/StyleUtils";

const AboutNoticeDetail = () => {
  return <BannerContents title={"공지사항"} subTitle={"AICA에서 안내하는 운영과 관련한 사항 등을 확인하실 수 있습니다."}>
    <Contents detailProps={tempData}/>
  </BannerContents>
}

const Contents: React.FC<{
  detailProps: DetailContentsProps;
}> = (props) => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const navi = useNavigate();
  const OnClickUp = () => {
    navi(`/tsp/About/Notice/1`) // props.detailProps.이전글
  }
  const OnClickDown = () => {
    navi(`/tsp/About/Notice/2`) // props.detailProps.이전글
  }
  const OnClickHome = () => {
    navi(`/tsp/About/Notice`)
  }

  return <>
    <Stack width={"100%"} spacing={"20px"} marginBottom={'150px'}>
      <Box display={"flex"} flexDirection={'column'} alignItems={'center'} textAlign={'center'}
           sx={{minHeight: '80px'}}>
        <H2 bold style={{marginBottom: '16px', textAlign: 'center', marginTop: '60px'}}>{props.detailProps.title}</H2>
        <Stack flexDirection={'row'}>
          <Body4 style={{marginRight: '16px'}}>조회 {props.detailProps.lookup}</Body4>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{borderRight: '1px solid #cccccc', minHeight: '14px', maxHeight: '14px', width: '1px'}}></Box>
          </div>
          <Body4 style={{marginLeft: '16px'}}>{props.detailProps.date}</Body4>
        </Stack>
      </Box>

      <TableContainer sx={{borderTop: '1px solid #d7dae6', width: '100%'}}>
        <Box sx={{minHeight: '200px', backgroundColor: '#d7dae6', marginTop: '20px', marginBottom: '16px'}}>img
          area</Box>
        <div style={{marginBottom: '30px', minHeight: '80px'}}>
          {props.detailProps.content}
        </div>

        <Box sx={{minHeight: '120px', borderRadius: '10px', backgroundColor: '#f5f5f5', padding: '24px 40px'}}>
          <Box display={'flex'} sx={{flexDirection: 'row'}}>
            <Body2 style={{fontWeight: 500, marginRight: '30px', lineHeight: '30px',minWidth:'110px'}}>관련 사이트 주소</Body2>
            <div style={{display:'flex',flexDirection: isMobile ? 'column' : 'row', gap:'15px', flexWrap:'wrap'}}>
            <a href={'https://www.naver.com'} style={{display: 'flex', alignItems: 'center'}}><Icons.Link/>
              <Body4 style={{
                borderBottom: '1px solid black',
                margin: '0 15px 0 8px',
                fontWeight: 500
              }}>https://www.naver.com</Body4></a>
            <a href={'https://www.naver.com'} style={{display: 'flex', alignItems: 'center'}}><Icons.Link/>
              <Body4 style={{
                borderBottom: '1px solid black',
                margin: '0 15px 0 8px',
                fontWeight: 500
              }}>https://www.naver.com</Body4></a>
            </div>
          </Box>
          <VerticalInterval size={isMobile ? '18px' : '24px'}/>

          <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
            <Body2 style={{minWidth: '70px', fontWeight: 500, marginTop: '11px',marginBottom:'15px'}}>첨부 파일</Body2>
            {
              !isMobile && <div>
                    <Box
                        sx={{
                      borderRight: '2px solid #cccccc',
                      minHeight: '20px',
                      maxHeight: '20px',
                      width: '2px',
                      marginX: '40px',
                      marginTop: '16px'
                    }}>
                    </Box>
                </div>
            }
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              {
                props.detailProps.fileName.map((m, i) => {
                  return <Chip
                    key={i}
                    icon={<Icons.FileDownloadColor/>}
                    label={<Body4 lineClamp={1} overflow={'hidden'} ellipsis style={{fontWeight: 500}}>{m}</Body4>}
                    variant="outlined"
                    sx={{
                      height: '48px',
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      marginRight: '6px',
                      paddingX: '24px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => {
                    }}
                  />
                })
              }
            </div>
          </Box>
        </Box>
      </TableContainer>

      <TableContainer sx={{borderTop: '1px solid #d7dae6', width: '100%', overflow: 'hidden'}}>
        <Button sx={{padding: '0px'}} fullWidth onClick={OnClickUp}>
          <MyBox>
            <Stack direction={'row'} padding={'28px 40px'} alignItems={'center'}>
              <Icons.UpArrow/>
              <HorizontalInterval size={'8px'}/>
              <Body3 style={{minWidth: '43px',fontWeight:500}}>{'이전글'}</Body3>
              <HorizontalInterval size={'53px'}/>
              <Body3 style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}
                     color={Color.warm_gray}>2021년도 AI 융합대학 지원사업 공고</Body3>
            </Stack>
          </MyBox>
        </Button>

        <Button sx={{padding: '0px'}} fullWidth onClick={OnClickDown}>
          <MyBox>
            <Stack direction={'row'} padding={'28px 40px'} alignItems={'center'}
                   sx={{width: '100%'}}>
              <Icons.DownArrow/>
              <HorizontalInterval size={'8px'}/>
              <Body3 style={{minWidth: '43px', fontWeight:500}}>{'다음글'}</Body3>
              <HorizontalInterval size={'53px'}/>
              <Body3 style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}
                     color={Color.warm_gray}>{'2021년도 AI 펀드 투자지원 및 AI 파트너십 데이(IR) 참여기업 모집 공고'}</Body3>
            </Stack>
          </MyBox>
        </Button>
      </TableContainer>

      <Box display={'flex'} justifyContent={'center'}>
        <CustomButton style={{marginTop:'40px'}} label={<Body2 color={Color.azul}>목록</Body2>} color={'outlined'} type={'listBack'} onClick={OnClickHome}/>
      </Box>
    </Stack>
  </>
}

export interface DetailContentsProps {
  title: string;
  lookup?: number;
  date: string;
  //img?: ..
  content: string;
  // 관련사이트[]
  fileName: string[];
  // 이전글
  // 다음글
}

const tempData: DetailContentsProps = {
  title: '2022년도 상반기 공공기관 통합채용 면접시험 안내 공고문',
  content: '본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. 본문이 출력됩니다. ',
  date: '2022-05-02',
  lookup: 92,
  fileName: ['2022년도 상반기 공공기관 통합채용 면접시험 안내 공고문.hwp', '첨부파일6', '첨부파일7']
}

const MyBox = styled(Box)`
  border-bottom: 1px solid #d7dae6;
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 80px;
  flex-direction: row;
  align-items: center;
`

export default AboutNoticeDetail


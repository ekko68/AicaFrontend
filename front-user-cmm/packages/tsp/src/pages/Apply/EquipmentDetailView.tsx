import {BannerContents} from "shared/components/BannerContents";
import {Box, Stack} from "@mui/material";
import {useState} from "react";
import {Body2, Body3, H2} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useLocation, useNavigate} from "react-router-dom";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";

export const EquipmentDetailView = (props: {
  title: string
  onClick: (id: string) => void
}) => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [eqpmnData, setEqpmnData] = useState(data)
  const location = useLocation()
  const buttonLabel = location.pathname.includes('Estimation') ? '장비사용 견적요청' : '장비사용 신청'
  const navigate = useNavigate()

  return <BannerContents
    title={props.title}
    /*subTitle={'AICA는 주력산업인 자동차 · 에너지 · 헬스케어와 관련한 총 77종의 장비를 구축하고 있으며 점차 구축 규모를 확대하고 있습니다.' +
      '\n실증장비를 이용한 실험 기회를 제공하여 AI제품 및 서비스에 대한 안정성 및 성능평가,실증과 관련한 연구를 지원합니다.'}*/
    stepper={{
      activeStep: 0,
      step: ["장비선택", "신청서작성", "사용기간선택", "견적요청완료"]
    }}>

    <Stack sx={{padding:isMobile ? '40px 0 80px' : '60px 0 120px', overflow:'hidden'}}>
      <Box sx={{borderBottom: '1px solid black', paddingBottom: '20px', textAlign: isMobile ? 'center' : ''}}>
        <H2 bold style={{fontSize: isMobile ? '20px' : '28px', letterSpacing: isMobile ? '-0.8' : '-1.12px'}}>{eqpmnData.eqpmnNmKo}</H2>
      </Box>

      <VerticalInterval size={'20px'}/>
      <Stack direction={isMobile ? 'column' : 'row'}>
        <div style={{display: isMobile ? 'flex' : 'unset', justifyContent: isMobile ? 'center' : 'normal'}}>
          <img src={eqpmnData.imgUrl} style={{minWidth:isMobile ? '345px' : '380px', height:isMobile ? '345px' : '380px'}}/>
        </div>

        <VerticalInterval size={isMobile ? '15px' : '60px'}/>
        <HorizontalInterval size={isMobile ? '15px' : '40px'}/>
        <Stack justifyContent={'space-around'} width={'100%'}>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'장비명(영문) : '}</Body3>
            <Body3>{eqpmnData.eqpmnNmEn}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'모델명 : '}</Body3>
            <Body3>{eqpmnData.modelNm}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'모델 분류 : '}</Body3>
            <Body3>{eqpmnData.modelCategory}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'규격 : '}</Body3>
            <Body3>{eqpmnData.eqpmnStndrd}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '15px' : '20px'}}>
            <Body3 weight={500}>{'전원 : '}</Body3>
            <Body3>{eqpmnData.srcelct}</Body3>
          </Box>

          <Box style={{border: `0.1px solid ${Color.divider}`}}/>

          <Box style={{marginBottom:isMobile ? '10px' : '12px', marginTop:isMobile ? '15px' : '20px'}}>
            <Body3 weight={500}>{'메뉴얼 : '}</Body3>
            <Body3>{eqpmnData.hasManual ? '있음' : '없음'}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'소프트웨어 : '}</Body3>
            <Body3>{eqpmnData.hasSw ? '있음' : '없음'}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'설치장소 : '}</Body3>
            <Body3>{eqpmnData.itlpc}</Body3>
          </Box>
          <Box style={{marginBottom:isMobile ? '10px' : '12px'}}>
            <Body3 weight={500}>{'유무료 : '}</Body3>
            <Body3>{eqpmnData.pchrg ? '유료' : '무료'}</Body3>
          </Box>
          <Box>
              <Body3 weight={500} >{'특기사항 : '}</Body3>
              <Body3>{eqpmnData.spcmnt}</Body3>
          </Box>
        </Stack>
      </Stack>


      <VerticalInterval size={isMobile ? '52px' : '60px'}/>
      <Body2 listItem weight={500} style={{paddingLeft: '7px'}}>{'소개'}</Body2>
      <Body3 style={{margin: '12px 0 40px 16px', lineHeight:'28px'}}>{eqpmnData.info}</Body3>

      {/*<li style={{fontWeight: 500, fontSize: isMobile ? '16px' : '18px'}}>{'제원 및 주요구성품'}</li>*/}
      <Body2 listItem weight={500} style={{paddingLeft: '7px'}}>{'제원 및 주요구성품'}</Body2>
      <Body3 style={{margin: '12px 0 40px 16px', lineHeight:'28px'}}>{eqpmnData.spec}</Body3>

      {/*<li style={{fontWeight: 500, fontSize: isMobile ? '16px' : '18px'}}>{'보조기기'}</li>*/}
      <Body2 listItem weight={500} style={{paddingLeft: '7px'}}>{'보조기기'}</Body2>
      <Body3 style={{margin: '12px 0 40px 16px', lineHeight:'28px'}}>{eqpmnData.subMhrls}</Body3>

      {/*<li style={{fontWeight: 500, fontSize: isMobile ? '16px' : '18px'}}>{'분야/용도'}</li>*/}
      <Body2 listItem weight={500} style={{paddingLeft: '7px'}}>{'분야/용도'}</Body2>
      <Body3 style={{margin: '12px 0 40px 16px', lineHeight:'28px'}}>{eqpmnData.eqpmnPurpose}</Body3>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CustomButton label={<Body2 color={Color.azul}>목록</Body2>} type={'listBack'} color={'outlined'}
                      style={{width:isMobile ? '50%' : '140px'}}
                      onClick={() => {
                        navigate(-1)
                      }}/>
        <HorizontalInterval size={isMobile ? '10px' : '20px'}/>
        <CustomButton label={<Body2 color={Color.white}>{buttonLabel}</Body2>} type={'listBack'}
                      style={{width:isMobile ? '50%' : '202px'}}
                      onClick={() => {
          const id = location.pathname.split('/').slice(-1)[0]
          props.onClick(id);
        }}/>
      </Box>
    </Stack>
  </BannerContents>
}

const data: EquipmentData = {
  imgUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,

  eqpmnNmKo: '고사양 Driving Simulator(High Specification Driving Simulator)',
  eqpmnNmEn: 'UV @ IR image measurement system',
  modelNm: 'AS1',
  modelCategory: '헬스케어 > 측정시스템',
  eqpmnStndrd: 'DKFSFSF - 100',
  srcelct: '220v',

  hasManual: true,
  hasSw: true,
  itlpc: '한국관광기술원 실험동 1층 2104B호',
  pchrg: true,
  spcmnt: '특기사항 특기사항 특기사항 특기사항 특기사항 특기사항 특기사항 특기사항 특기사항',

  info: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용' +
    ' 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용',
  spec: '제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 ' +
    '및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 ' +
    '주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품 제원 및 주요 구성품',
  subMhrls: '보조기기명 쏼라 쏼라',
  eqpmnPurpose: '에너지 산업의 인공지능 기반 제품화 및 데이터 활요을 위한 장비 구축이 중요한 장비입니다. \n 전력데이터 수집용 지능형 센싱디바이스'
}

interface EquipmentData {
  imgUrl: string

  eqpmnNmKo: string /*장비명 (한글)*/
  eqpmnNmEn: string /*장비명 (영문)*/
  modelNm: string /*모델명*/
  modelCategory: string /*카테고리*/
  eqpmnStndrd: string /*장비규격*/
  srcelct: string /*전원*/

  hasManual: boolean /*메뉴얼 유무*/
  hasSw: boolean /*소프트웨어 유무*/
  itlpc: string /*설치 장소*/
  pchrg: boolean /*유무료*/
  spcmnt: string /*특기사항*/

  info: string /*소개*/
  spec: string /*제원 및 주요 구성품*/
  subMhrls: string /*보조기기*/
  eqpmnPurpose: string /*분야 및 용도*/
}
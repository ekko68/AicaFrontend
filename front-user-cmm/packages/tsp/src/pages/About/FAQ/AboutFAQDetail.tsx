import {BannerContents} from "shared/components/BannerContents";
import {Box, Button, Chip, Stack} from "@mui/material";
import {Color} from "shared/components/StyleUtils";
import {Body2, Body3, Body4, H2} from "shared/components/TextComponents";
import {useState} from "react";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {useNavigate} from "react-router-dom";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";

const AboutFAQDetail = () => {
  const [faqData, setFAQData] = useState(data)
  const {isDesktop} = useGlobalConfigStore()
  const navigate = useNavigate()

  return <BannerContents
    title={"자주묻는질문"}
    subTitle={'AICA에 반복적으로 문의되는 질물들을 모아 놓았습니다. \n' +
      '자주묻는 질문에서 궁금하신 점을 먼저 찾아보시면 궁금한 점을 바로 해결하실 수 있습니다.'}
  >
    <Stack sx={{padding: "60px 0 120px", width: '100%', overflow: 'auto'}}>
      <Stack alignItems={'center'}
             sx={{
               pb: '30px',
               borderBottom: `1px solid ${Color.line}`
             }}>
        <H2 bold color={Color.primary}>Q</H2>
        <H2 bold>{faqData.title}</H2>
      </Stack>
      <VerticalInterval size={'26px'}/>
      <Body3 preLine>{faqData.content}</Body3>

      <VerticalInterval size={'60px'}/>
      <Box alignItems={'center'} sx={{borderRadius: '10px', backgroundColor: Color.light_gray02}}>
        <Stack alignItems={'center'} direction={'row'} padding={'24px 40px'}
               sx={{width: '100%', flexWrap: 'wrap', gap: '10px'}}>
          <Box sx={{
            width: `${isDesktop ? 'unset' : '100%'}`,
            paddingRight: '40px',
            borderRight: `${isDesktop ? `2px solid ${Color.gray}` : 'unset'}`
          }}>
            <Body2 weight={500}>{'첨부파일'}</Body2>
          </Box>
          {isDesktop && <HorizontalInterval size={'40px'}/>}
          {
            faqData.attach.map((m, i) => {
              return <Chip
                key={i}
                icon={<Icons.FileDownloadColor/>}
                label={<Body4 ellipsis overflow={'hidden'} nowrap weight={500}>{m.title}</Body4>}
                variant="outlined"
                sx={{padding: '24px', backgroundColor: 'white', borderRadius: '24px'}}
                onClick={() => {
                }}
              />
            })}
        </Stack>
      </Box>

      <VerticalInterval size={'20px'}/>
      <Stack sx={{borderTop: `1px solid ${Color.line}`}}>
        <Button sx={{width: '100%', padding: '0px'}} onClick={() => {
          // navigate()
        }}>
          <Stack direction={'row'} padding={'28px 40px'} alignItems={'center'}
                 sx={{width: '100%', borderBottom: `1px solid ${Color.line}`}}>
            <Icons.UpArrow/>
            <HorizontalInterval size={'5px'}/>
            <Body3 style={{minWidth: '43px',fontWeight:500}}>{'이전글'}</Body3>
            <HorizontalInterval size={'53px'}/>
            <Body3 style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}
                   color={Color.warm_gray}>{faqData.preTitle}</Body3>
          </Stack>
        </Button>

        <Button sx={{width: '100%',padding: '0px'}} onClick={() => {
          // navigate()
        }}>
          <Stack direction={'row'} padding={'28px 40px'} alignItems={'center'}
                 sx={{width: '100%', borderBottom: `1px solid ${Color.line}`}}>
            <Icons.DownArrow/>
            <HorizontalInterval size={'5px'}/>
            <Body3 style={{minWidth: '43px',fontWeight:500}}>{'다음글'}</Body3>
            <HorizontalInterval size={'53px'}/>
            <Body3 style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}
                   color={Color.warm_gray}>{faqData.preTitle}</Body3>
          </Stack>
        </Button>
      </Stack>

      <VerticalInterval size={'40px'}/>
      <Box justifyContent={'center'} sx={{display: 'flex', width: '100%'}}>
        <CustomButton label={'목록'} type={'listBack'} color={'outlined'} onClick={() => {
          navigate(-1)
        }}/>
      </Box>
    </Stack>
  </BannerContents>
}


interface FAQData {
  title: string
  content: string
  attach: { attachId: string, title: string }[]
  preTitle: string
  nextTitle: string
}

const data: FAQData = {
  title: 'AI 자원은 어떻게 신청하나요 ?',
  content: 'AI관련 예비창업자는 참가 가능합니다. 단, 동일, 유사 아이템으로 정부과금지원 과제를 수행중인 경우에는 참가할 수 없습니다.\n' +
    'AI 관련 사업화 계획의 서면평가를 통해 30개 내외 팀을 선정 후 창업 및 사업화 교육,본선,수요조사 기반 컨설팅,결선을 통해 최종 10개팀을 선정하고 수상합니다. \n' +
    '수상팀은 창업을 조건으로 AI 시제품,서비스 제작 및 창업/사업화 지원을 받을 수 있습니다.\n' +
    '자원금은 최대 1억원입니다.\n\n' +
    '연 1회 실사하는 경진대회에 많은 관심 부탁드립니다.',
  attach: [{attachId: 'test', title: '창업경진대회 공고문.pdf(293 MB)'},{attachId: 'test', title: '창업경진대회 공고문.pdf(293 MB)'}],
  preTitle: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  nextTitle: '개인으로 회원가입 후에 창업을 한 경우에 회원정보를 변경할 수 있나요?'
}

export default AboutFAQDetail
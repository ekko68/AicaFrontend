import {Box, Button, Stack} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import {Fragment, useState} from "react";
import {Body1, Body2, Body3, Body4, H2} from "shared/components/TextComponents";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {Color} from "shared/components/StyleUtils";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Icons} from "shared/components/IconContainer";

const AboutFAQ = () => {
  const [tabValue, setTabValue] = useState('전체')
  const [itemList, setItemList] = useState(data)
  const isLastItem = false;
  const navigate = useNavigate()

  return <BannerContents
    title={"자주묻는질문"}
    subTitle={'AICA에 반복적으로 문의되는 질물들을 모아 놓았습니다. \n' +
      '자주묻는 질문에서 궁금하신 점을 먼저 찾아보시면 궁금한 점을 바로 해결하실 수 있습니다.'}
    placeholder={'궁금하신 내용을 검색해 보세요.'}
    onSearchClick={((searchText: string) => {
    })}
    tabs={{
      tabValue: tabValue,
      items: ['전체', '장비사용', '자원사용', '가입/변경', '기타'],
      onClick: ((selectTab) => {
        setTabValue(selectTab)
        window.scrollTo(0, 5);
      })
    }}>
    <Stack sx={{padding: "60px 0 120px", width: '100%', overflow: 'auto'}}>
      <Stack direction={'row'} alignItems={'baseline'} sx={{
        width: '100%',
        borderBottom: '1px solid black',
        paddingBottom:'20px'
      }}>
        <H2 bold>{tabValue}</H2>
        <HorizontalInterval size={'10px'}/>
        <Body4 style={{fontFamily:'Roboto'}} bold color={Color.azul}>{itemList.length}</Body4>
        <Body3>건</Body3>
      </Stack>

      {
        itemList && itemList.map((m, i) => {
          const isFinish = i == (itemList.length - 1)
          return <Fragment key={i}>
            <Button sx={{justifyContent: 'flex-start'}}
                    onClick={() => {
                      navigate(`/tsp/About/FAQ/${i}`)
                    }}>
              <QuestionItem data={m}/>
            </Button>
            {isFinish || <Box sx={{borderBottom: `1px solid ${Color.line}`}}/>}
          </Fragment>
        })
      }

      {
        !isLastItem && <Fragment>
          <CustomButton
            type={'full'} color={'item'}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <Body4>더보기</Body4>
                <HorizontalInterval size={'16px'}/>
                <Icons.DownArrow/>
              </Stack>
            }
            onClick={() => {
              setItemList(itemList.concat([...data]))
            }}/>
        </Fragment>
      }
    </Stack>
  </BannerContents>
}

const QuestionItem = (props: { data: FAQData }) => {
  const {isDesktop} = useGlobalConfigStore()
  return <Stack
    direction={`${isDesktop ? 'row' : 'column'}`}
    padding={`${isDesktop ? 30 : 15}px`}
    alignItems={`${isDesktop ? 'center' : 'flex-start'}`}>
    <Box sx={{paddingRight: '147px'}}>
      <Body3 weight={500}>{props.data.category}</Body3>
    </Box>
    {
      !isDesktop && <VerticalInterval size={'10px'}/>
    }
    <Stack direction={'row'}>
      <Body1 bold color={Color.primary}>Q</Body1>
      <HorizontalInterval size={'10px'}/>
      <Body1 bold style={{fontSize: isDesktop? '20px' : '16px'}}>{props.data.title}</Body1>
    </Stack>
  </Stack>
}

interface FAQData {
  title: string
  content: string
  category: string
}

const data: FAQData[] = [{
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '자원/신청',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '시설/방문',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '가입/변경',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '자원/신청',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '시설/방문',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '자원/신청',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '가입/변경',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '가입/변경',
}, {
  title: '창업 경진대회에 참가 가능한 자격과 혜택은 무엇인가요?',
  content: '내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ',
  category: '자원/신청',
},]

export default AboutFAQ
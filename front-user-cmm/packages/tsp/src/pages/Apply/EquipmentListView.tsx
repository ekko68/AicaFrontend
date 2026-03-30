import {Box, Button, Stack, Tabs} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import {Fragment, useState} from "react";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {Color} from "shared/components/StyleUtils";
import {Body1, Body3, Body4, H2} from "shared/components/TextComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {CustomButton} from "shared/components/ButtonComponents";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const EquipmentListView = (props:{
  title: string
  placeholder?: string
  onClickEquipment: (id:string) => void
}) => {
  const [tabValue, setTabValue] = useState('전체')
  const [itemList, setItemList] = useState(data)
  const {isDesktop} = useGlobalConfigStore()
  const isLastItem = false;

  return <BannerContents
    title={props.title}
    /*subTitle={'AICA는 주력산업인 자동차 · 에너지 · 헬스케어와 관련한 총 77종의 장비를 구축하고 있으며 점차 구축 규모를 확대하고 있습니다.' +
      '\n실증장비를 이용한 실험 기회를 제공하여 AI제품 및 서비스에 대한 안정성 및 성능평가,실증과 관련한 연구를 지원합니다.'}*/
    category={['전체', '자동차', '에너지', '헬스케어']}
    stepper={{activeStep: 0,
      step: ["장비선택", "신청서작성", "사용기간선택", "견적요청완료"]}}
    tabs={{
      tabValue: tabValue,
      items: ['전체', '자동차', '에너지', '헬스케어'],
      onClick: ((selectTab) => {
        window.scrollTo(0, 5);
        setTabValue(selectTab)
      })
    }}
    placeholder={props.placeholder || '검색어 입력'}
    onSearchClick={() => {
    }}
  >
    <Stack sx={{padding: "40px 0 120px", width: '100%', overflow: 'auto'}}>
      <Stack direction={'row'} alignItems={'baseline'} sx={{marginBottom:'20px'}}>
        <H2 bold>{tabValue}</H2>
        <HorizontalInterval size={'10px'}/>
        <Body3 style={{fontFamily:'Roboto', fontWeight:'bold'}} color={Color.azul}>{itemList.length}</Body3>
        <Body3>건</Body3>
      </Stack>
      <Box sx={{
        display: 'grid', width: '100%', gridGap: '60px',
        gridTemplateColumns: `repeat(${isDesktop ? 3 : 1}, 380px)`,
        overflow: 'auto'
      }}>
        {
          itemList.map((m, i) =>
            <EquipmentItem key={i} data={m} onClick={props.onClickEquipment}/>)
        }
      </Box>

      {
        !isLastItem && <Fragment>
          <VerticalInterval size={'20px'}/>
          <CustomButton
            type={'full'} color={'item'}
            label={
                <Stack direction={'row'} alignItems={'center'}>
                  <Body4>더보기</Body4>
                  <HorizontalInterval size={'16px'}/>
                  <ExpandMoreIcon fontSize={'small'}/>
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

const EquipmentItem = (props: { data: EquipmentData, onClick: (id:string) => void }) => {
  return <Stack sx={{minWidth: '380px', height: '359px'}}>
    <img src={props.data.url}
         style={{
           width: '100%', height: '200px', borderRadius: '15px 15px 10px 10px',border:'1px solid rgba(204,204,204,0.35)'
         }}/>
    <VerticalInterval size={'25px'}/>

    <Box>
      <Body4 style={{backgroundColor: Color.light_gray02, borderRadius: '5px', padding: '5px 10px'}}>
        {props.data.type}
      </Body4>
    </Box>

    <VerticalInterval size={'13px'}/>
    <Body1 bold overflow={'hidden'} nowrap ellipsis>{props.data.title}</Body1>

    <VerticalInterval size={'24px'}/>
    <Button sx={{border: '1px solid black', borderRadius: '24px', width: '108px', alignItems: 'center', height:'48px'}}
            onClick={() => {props.onClick('id-1234')}}>
      <Body3 color={Color.black}>상세 사양</Body3>
    </Button>
  </Stack>
}

interface EquipmentData {
  url: string
  type: string
  title: string
}

const data: EquipmentData[] = [
  {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator 고사양 Driving Simulator고사양 Driving Simulator고사양 Driving Simulator고사양 Driving Simulator고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }
]
import {Box, Button, Stack, Tabs} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import {Fragment, useEffect, useState} from "react";
import {TabContext, TabPanel} from "@mui/lab";
import {CustomTabs, HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {Color} from "shared/components/StyleUtils";
import {Body1, Body3, Body4, H2} from "shared/components/TextComponents";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";

const InfoEquipment = () => {
  const [tabValue, setTabValue] = useState('전체')
  const [itemList, setItemList] = useState(data)
  const {isDesktop} = useGlobalConfigStore()
  const isLastItem = false;
  const navigate = useNavigate()
  
  const handlerItem = (id: string) => {
    navigate(`/tsp/Info/Equipment/${id}`);
  }

  return <BannerContents
    title={"실증장비소개"}
    subTitle={'실증장비를 이용한 실험 기회를 제공하여 AI 제품 및 서비스에 대한 안정성 및 성능평가, 실증과 관련한 연구를 지원합니다.'}
    category={['전체', '자동차', '에너지', '헬스케어']}
    tabs={{
      tabValue: tabValue,
      items: ['전체', '자동차', '에너지', '헬스케어'],
      onClick: (selectTab) => {
        setTabValue(selectTab)
        window.scrollTo(0, 5);
      }
    }}
    placeholder={'어떤 장비를 찾고 계신가요?'}
    onSearchClick={() => {
    }}
  >
    <Stack sx={{padding: "40px 0 120px", width: '100%', overflow: 'auto'}}>
      <Stack direction={'row'} alignItems={'baseline'}>
        <H2 bold>{tabValue}</H2>
        <HorizontalInterval size={'10px'}/>
        <Body4 color={Color.primary}>{itemList.length}</Body4>
        <Body3>건</Body3>
      </Stack>
      <Box sx={{
        display: 'grid', width: '100%', gridGap: '60px',
        gridTemplateColumns: `repeat(${isDesktop ? 3 : 1}, 380px)`,
        overflow: 'auto'
      }}>
        {
          itemList.map((m, i) => <EquipmentItem key={i} data={m} onClick={handlerItem}/>)
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

const EquipmentItem = (props: { data: EquipmentData, onClick: (id:string) => void }) => {
  return <Stack sx={{minWidth: '380px', height: '380px'}}>
    <img src={props.data.url}
         style={{
           width: '100%', height: '200px', borderRadius: '15px 15px 10px 10px'
         }}/>
    <VerticalInterval size={'20px'}/>

    <Box>
      <Body4 style={{backgroundColor: Color.light_gray02, borderRadius: '5px', padding: '5px 10px'}}>
        {props.data.type}
      </Body4>
    </Box>

    <VerticalInterval size={'16px'}/>
    <Body1 bold>{props.data.title}</Body1>

    <VerticalInterval size={'16px'}/>
    <Button sx={{border: '1px solid black', borderRadius: '24px', width: '108px', alignItems: 'center', height:'48px'}}
    onClick={() => {props.onClick(props.data.type)}}>
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
  }, {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/400`,
    type: '측정시스템',
    title: '고사양 Driving Simulator'
  }
]

export default InfoEquipment
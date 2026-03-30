import {Box, Button, Chip, Stack} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import React, {Fragment, useState} from "react";
import {Body1, Body3, Body4, H2} from "shared/components/TextComponents";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {Color} from "shared/components/StyleUtils";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {CustomButton} from "shared/components/ButtonComponents";
import {toStringFullDayFormat} from "shared/utils/stringUtils";
import {styled} from "@mui/material/styles";
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const MyPageResource = () => {
  const [selectCondition, setSelectCondition] = useState<string[]>([])
  const [itemList, setItemList] = useState(data)
  const isLastItem = false;
  const navigation = useNavigate();
  const isDesktop = useGlobalConfigStore();

  return <BannerContents
    title={"실증자원사용 관리"} subTitle={"실증자원 신청정보를 조회 및 수정하고, 현재 사용상태를 확인할 수 있습니다."}
    placeholder={'실증자원 신청정보를 조회해 보세요.'}
    detail={{
      column1Title: '신청일',
      column2Title: '신청상태',
      condition: ['신청', '보완요청', '승인', '반려', '신청취소', '사용중', '반환요청', '반환완료'],
      onChangeDate: (start, end) => {
      },
      onChangeCondition: (select) => {
        setSelectCondition(select)
      }
    }}
    onSearchClick={(searchText: string, selectCategory?: string) => {
    }}>
    <Stack sx={{padding: "40px 0 120px", width: '100%', overflow: 'auto'}}>
      <Stack
        direction={'row'} alignItems={'baseline'} justifyContent={'space-between'}
        sx={{
          width: '100%',
          borderBottom: '1px solid black',
          paddingBottom: '20px'
        }}>
        <Stack direction={'row'} alignItems={'baseline'}>
          <H2 bold> 자원정보</H2>
          <HorizontalInterval size={'10px'}/>
          <Body4 bold color={Color.primary}>{10}</Body4>
          <Body3>건</Body3>
        </Stack>
        <Stack direction={'row'} alignItems={'baseline'} sx={{display: 'flex', alignItems: 'center'}}>
          <Body3>사용상태 안내</Body3>
          <HtmlTooltip
            placement={"bottom-end"}
            title={
              <Stack>
                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('신청')}>
                  보완요청 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`신청을 완료한 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('보완요청')}>
                  보완요청 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`담당자가 신청서 보완을 요청한 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('승인')}>
                  승인 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`담당자가 신청을 승인 한 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('반려')}>
                  반려 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`담당자가 신청을 반려 한 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('신청취소')}>
                  신청취소 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`신청자가 신청을 취소한 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('사용중')}>
                  사용중 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`사용중인 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('반환요청')}>
                  사용종료 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`자원 반환을 요청한 상태`}</Body4>
                </Body4>

                <Body4 weight={500}
                       style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                       listItem color={TypeColor('반환완료')}>
                  사용종료 {!isDesktop && <VerticalInterval size={'9px'}/>}
                  <Body4 style={{marginLeft: isDesktop ? '5px' : 0}}
                         color={Color.warm_gray}>{`자원 반환이 완료된 상태`}</Body4>
                </Body4>
              </Stack>
            }
          >
            <HelpOutlineIcon color={'primary'} sx={{
              marginLeft: '6px',
              width: isDesktop ? '18px' : '16px',
              height: isDesktop ? '18px' : '16px'
            }}/>
          </HtmlTooltip>
        </Stack>
      </Stack>

      {
        itemList && itemList.map((m, i) => {
          const isFinish = i == (itemList.length - 1)
          return <Fragment key={i}>
            <Button sx={{justifyContent: 'flex-start'}}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      navigation(`/tsp/Mypage/Resource/MyPageResourceDetail`)
                    }}>
              <ResourceItem data={m}/>
            </Button>
            {isFinish || <Box sx={{borderBottom: `1px solid ${Color.line}`}}/>}
          </Fragment>
        })
      }

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

const ResourceItem = (props: { data: ResourceData }) => {
  const {isDesktop} = useGlobalConfigStore()
  const createDt = toStringFullDayFormat(props.data.createDt)
  const usingTime = `${toStringFullDayFormat(props.data.startTime)} ~ ${toStringFullDayFormat(props.data.endTime)}`

  return <Stack
    sx={{width: '100%'}}
    direction={`${isDesktop ? 'row' : 'column'}`}
    padding={`${isDesktop ? 30 : 15}px`}
    alignItems={`${isDesktop ? 'center' : 'flex-start'}`}
    justifyContent={'space-between'}>
    <Stack>
      <Body1 bold>{props.data.title}</Body1>
      <VerticalInterval size={'12px'}/>
      <SimpleRowView title={'사용시간'} value={usingTime}/>
      <VerticalInterval size={'4px'}/>
      <SimpleRowView title={'신청일'} value={createDt}/>
    </Stack>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={isDesktop ? 'auto' : '100%'}>
      <Box sx={{width: '70px', display: `${isDesktop ? 'unset' : 'flex'}`,marginTop: isDesktop ? 0 : '16px'}}>
        <Body3 weight={500} color={TypeColor(props.data.type)}>{props.data.type.toString()}</Body3>
      </Box>
      <Box sx={{width: isDesktop ? '190px' : 'auto'}}>
        {
          (props.data.type == '보완요청' || props.data.type == '반려') &&
            <Chip
                label={<Body4 weight={500}>사유 확인</Body4>}
                sx={{height: '48px', borderRadius: '24px', width: '100px', border: '1px solid #cccccc'}}
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation()
                }}/>
        }
      </Box>
    </Stack>
  </Stack>
}

const TypeColor = (type: ResourceType) => {
  switch (type) {
    case "신청":
      return Color.azul
    case "보완요청":
      return Color.black
    case "승인":
      return Color.topaz
    case "반려":
      return Color.navy_light
    case "신청취소":
      return Color.warm_gray
    case "사용중":
      return Color.green
    case "반환요청":
      return Color.navy_paling
    case "반환완료":
      return Color.navy
  }
}

const SimpleRowView = (props: { title: string, value: string }) => {

  return <Stack direction={'row'}>
    <Body4 style={{minWidth: '50px'}} color={Color.warm_gray}>{props.title}</Body4>
    <HorizontalInterval size={'6px'}/>
    <Body4 style={{minWidth: '38px'}}>{props.value}</Body4>
  </Stack>
}

type ResourceType = '신청' | '보완요청' | '승인' | '반려' | '신청취소' | '사용중' | '반환요청' | '반환완료'

interface ResourceData {
  title: string
  startTime: Date,
  endTime: Date,
  createDt: Date,
  type: ResourceType
}

const data: ResourceData[] = [{
  title: 'GPU: 사용 / CPU : 8core / 데이터저장소:사용안함',
  startTime: new Date('2021-11-10T10:15:00'),
  endTime: new Date('2021-11-17T15:21:00'),
  createDt: new Date('2021-11-05'),
  type: "신청"
}, {
  title: '자외선 및 IR 이미지 측정시스템',
  startTime: new Date('2021-11-10T10:15:00'),
  endTime: new Date('2021-11-17T15:21:00'),
  createDt: new Date('2021-11-05'),
  type: "보완요청"
}, {
  title: '자외선 및 IR 이미지 측정시스템',
  startTime: new Date('2021-11-10T10:15:00'),
  endTime: new Date('2021-11-17T15:21:00'),
  createDt: new Date('2021-11-05'),
  type: "승인"
}, {
  title: '자외선 및 IR 이미지 측정시스템',
  startTime: new Date('2021-11-10T10:15:00'),
  endTime: new Date('2021-11-17T15:21:00'),
  createDt: new Date('2021-11-05'),
  type: "반려"
}, {
  title: '자외선 및 IR 이미지 측정시스템',
  startTime: new Date('2021-11-10T10:15:00'),
  endTime: new Date('2021-11-17T15:21:00'),
  createDt: new Date('2021-11-05'),
  type: "신청취소"
}]

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '20px',
    border: '1px solid #dadde9',
    padding: '30px'
  },
}));

export default MyPageResource
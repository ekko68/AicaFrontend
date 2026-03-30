import {Box, Button, Chip, Stack} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import React, {Fragment, useState, useEffect, SetStateAction, Dispatch} from "react";
import {Body1, Body3, Body4, H2} from "shared/components/TextComponents";
import {HorizontalInterval, VerticalInterval} from "shared/components/LayoutComponents";
import {Color} from "shared/components/StyleUtils";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {CustomButton} from "shared/components/ButtonComponents";
import {dayFormat, toStringFullDayFormat, toStringTimeKoFormat, toTimeFormat} from "shared/utils/stringUtils";
import {styled} from "@mui/material/styles";
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {useNavigate} from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {Icons} from "shared/components/IconContainer";
import {MyPageEstimationService} from "~/service/MyPageService/MyPageEstimationService";
import {useCommtCode} from "~/utils/useCommtCode";
import {CommtCodeNms, CommtCodes, toCommtCode, toCommtCodeName} from "~/utils/CommtCodeUtil";
import {MyPageEstmt, SearchParam} from "~/service/Model";

const MyPageEstimation = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  const [search, setSearch] = useState(false)
  const {commtCode} = useCommtCode(["EQPMN_REQST_ST"])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  type WithCustomRowData<T> = T & {
    key: string
    edit?: boolean
  }
  const information = MyPageEstimationService.getEstmtList({...pagination, ...searchParam})
  const [itemList, setItemList] = useState<WithCustomRowData<MyPageEstmt>[]>([]);
  const isLastItem = false;
  const navigation = useNavigate();
  const isDesktop = useGlobalConfigStore();
  useEffect(() => {
    if (!information.isLoading && !information.isFetching) {
      if (!!information.data) {
        setItemList(information.data.list.map((m,) => {
          return {
            key: m.estmtId,
            ...m,
          }
        }));
        setPagination((state) => ({...state, rowCount: information.data.totalItems}))
      }
    }
  }, [information.data, information.isLoading, information.isFetching])

  return <BannerContents
    title={"견적요청 관리"} subTitle={"장비 신청정보를 조회 및 수정하고, 현재 사용상태를 확인할 수 있습니다."}
    placeholder={'장비명 정보를 조회해 보세요.'}
    detail={{
      column1Title: '신청일',
      column2Title: '신청상태',
      condition: !commtCode ? [''] : CommtCodeNms(commtCode, "EQPMN_REQST_ST").filter(f => f != '승인'),
      // condition: ['신청', '보완요청', '견적서발급', '반려', '신청취소'],
      onChangeDate: (start, end) => setSearchParam({...searchParam, creatBeginDt: start.getTime(), creatEndDt: end.getTime()}),
      onChangeCondition: (select) => setSearchParam({...searchParam, reqstSttus: !select ? undefined : select.map(m => toCommtCode(commtCode, "EQPMN_REQST_ST", m.toString()))})

    }}

    onSearchClick={(searchText: string, selectCategory?: string) =>
        setSearchParam({...searchParam, eqpmnNmKorean: searchText})
    }>
    <Stack sx={{padding: "40px 0 120px", width: '100%', overflow: 'auto'}}>
      <Stack
        direction={'row'} alignItems={'baseline'} justifyContent={'space-between'}
        sx={{
          width: '100%',
          borderBottom: '1px solid black',
          paddingBottom: '20px'
        }}>
        <Stack direction={'row'} alignItems={'baseline'}>
          <H2 bold> 견적요청</H2>
          <HorizontalInterval size={'10px'}/>
          <Body4 bold color={Color.primary}>{information.data?.totalItems}</Body4>
          <Body3>건</Body3>
        </Stack>

        <Stack direction={'row'} alignItems={'end'} sx={{display: 'flex', alignItems:'center'}}>
          <Body3>신청상태 안내</Body3>
          <HtmlTooltip
            placement={"bottom-end"}
            title={
              <Stack>
                {helpdata.map(m => {
                  return <Body4 weight={500}
                         style={{paddingLeft: isDesktop ? '6px' : '8px', marginBottom: isDesktop ? '6px' : '16px'}}
                         listItem color={TypeColor(m.label)}>
                    {m.label} {!isDesktop && <VerticalInterval size={'9px'}/>}
                    <Body4 style={{marginLeft: isDesktop ? '5px' : 0, paddingTop: '50px'}}
                           color={Color.warm_gray}>{m.content}</Body4>
                  </Body4>
                })
                }
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

      {/*{*/}
      {/*  itemList && itemList.map((m, i) => {*/}
      {/*    const isFinish = i == (itemList.length - 1)*/}
      {/*    return <Fragment key={i}>*/}
      {/*      <Button sx={{justifyContent: 'flex-start'}}*/}
      {/*              onClick={(e: React.MouseEvent<HTMLElement>) => {*/}
      {/*                navigation(`/tsp/Mypage/Estimation/MypageEstimationDetail`)*/}
      {/*              }}>*/}
      {/*        <EstimationItem data={m}/>*/}
      {/*      </Button>*/}
      {/*      {isFinish || <Box sx={{borderBottom: `1px solid ${Color.line}`}}/>}*/}
      {/*    </Fragment>*/}
      {/*  })*/}
      {/*}*/}
      {
          itemList && itemList.map((m, i) => {
          const isFinish = i == (itemList.length - 1)
          return <Fragment key={i}>
            <Button sx={{justifyContent: 'flex-start'}}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      navigation(`/tsp/Mypage/Estimation/MypageEstimationDetail/${m.key}`)
                    }}>
              <EstimationItem1 data={m}/>
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
              pagination.rowCount > pagination.rowsPerPage ?
                setPagination({
                  ...pagination,
                  page: pagination.page,
                  rowsPerPage: pagination.rowsPerPage + 5,
                  rowCount: pagination.rowCount
                }) :
                setPagination({
                  ...pagination,
                  page: pagination.page,
                  rowsPerPage: pagination.rowCount,
                  rowCount: pagination.rowCount
                })

            }}/>
        </Fragment>
      }
    </Stack>
  </BannerContents>
}

const EstimationItem1 = (props: { data: MyPageEstmt }) => {
  const {commtCode} = useCommtCode(['EQPMN_REQST_ST'])
  const {isDesktop} = useGlobalConfigStore()
  const creatDt = dayFormat(props.data.creatDt)
  const usingTime = `${toTimeFormat(props.data.useBeginDt)} ~ ${toTimeFormat(props.data.useEndDt)}`
  let reqstSttus = ''
  if (commtCode && props.data) {
    reqstSttus = toCommtCodeName(commtCode, "EQPMN_REQST_ST", props.data.reqstSttus)
  }
  return <Stack
    sx={{width: '100%'}}
    direction={`${isDesktop ? 'row' : 'column'}`}
    padding={`${isDesktop ? 30 : 15}px`}
    alignItems={`${isDesktop ? 'center' : 'flex-start'}`}
    justifyContent={'space-between'}>
    <Stack>
      <Body1 bold>{props.data.eqpmnNmKorean}</Body1>
      <VerticalInterval size={'13px'}/>
      <SimpleRowView title={'사용시간'} value={usingTime}/>
      <VerticalInterval size={'4px'}/>
      <SimpleRowView title={'신청일'} value={creatDt}/>
    </Stack>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={isDesktop? 'auto' : '100%'}>
      <Box sx={{width: '80px', display: `${isDesktop ? 'unset' : 'flex'}`}}>
        <Body3 weight={500} color={TypeColor(reqstSttus)}>{reqstSttus.toString()}</Body3>
      </Box>
      <Box sx={{width: isDesktop? '190px' : 'auto'}}>
        {
          (props.data.eqpmnNmKorean == '보완요청' || props.data.eqpmnNmKorean == '반려') &&
          <Chip sx={{minWidth: '100px', height: '48px', borderRadius: '24px',border:'1px solid #cccccc'}} label={<Body4 weight={500}>사유확인</Body4>} variant="outlined"
                onClick={(e) => {
                  e.stopPropagation()
                }}/>
        }

        {
          props.data.reqstSttus == '견적서발급' &&
          <Chip sx={{minWidth: '113px', height: '48px', borderRadius: '24px',border:'1px solid #cccccc'}} label={<Body4 weight={500}>견적서 확인</Body4>} variant="outlined"
                onClick={(e) => {
                  e.stopPropagation()
                }}/>
        }
        {
          (props.data.reqstSttus == '신청' || props.data.reqstSttus == '신청취소') &&
          <Box style={{height: "32px", visibility: "hidden"}}></Box>
        }
      </Box>
    </Stack>
  </Stack>
}

// const EstimationItem = (props: { data: EstimationData }) => {
//   const {isDesktop} = useGlobalConfigStore()
//   const creatDt = toStringFullDayFormat(props.data.creatDt)
//   const usingTime = `${toStringFullDayFormat(props.data.useBeginDt)} ${toStringFullDayFormat(props.data.useBeginDt)}
//    ~ ${toStringFullDayFormat(props.data.useEndDt)} ${toStringFullDayFormat(props.data.useEndDt)}`
//
//   return <Stack
//     sx={{width: '100%'}}
//     direction={`${isDesktop ? 'row' : 'column'}`}
//     padding={`${isDesktop ? 30 : 15}px`}
//     alignItems={`${isDesktop ? 'center' : 'flex-start'}`}
//     justifyContent={'space-between'}>
//     <Stack>
//       <Body1 bold>{props.data.eqpmnNmKorean}</Body1>
//       <VerticalInterval size={'13px'}/>
//       <SimpleRowView title={'사용시간'} value={usingTime}/>
//       <VerticalInterval size={'4px'}/>
//       <SimpleRowView title={'신청일'} value={creatDt}/>
//     </Stack>
//     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={isDesktop? 'auto' : '100%'}>
//       <Box sx={{width: '80px', display: `${isDesktop ? 'unset' : 'flex'}`}}>
//         <Body3 weight={500} color={TypeColor(props.data.type)}>{props.data.type.toString()}</Body3>
//       </Box>
//       <Box sx={{width: isDesktop? '190px' : 'auto'}}>
//         {
//           (props.data.eqpmnNmKorean == '보완요청' || props.data.eqpmnNmKorean == '반려') &&
//           <Chip sx={{minWidth: '100px', height: '48px', borderRadius: '24px',border:'1px solid #cccccc'}} label={<Body4 weight={500}>사유확인</Body4>} variant="outlined"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                 }}/>
//         }
//
//         {
//           props.data.type == '견적서발급' &&
//           <Chip sx={{minWidth: '113px', height: '48px', borderRadius: '24px',border:'1px solid #cccccc'}} label={<Body4 weight={500}>견적서 확인</Body4>} variant="outlined"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                 }}/>
//         }
//         {
//           (props.data.type == '신청' || props.data.type == '신청취소') &&
//           <Box style={{height: "32px", visibility: "hidden"}}></Box>
//         }
//       </Box>
//     </Stack>
//   </Stack>
// }

const TypeColor = (type: string) => {
  switch (type) {
    case "신청":
      return Color.azul
    case "보완요청":
      return Color.black
    case "견적서발급":
      return Color.topaz
    case "반려":
      return Color.navy_light
    case "신청취소":
      return Color.warm_gray
  }
}
const SimpleRowView = (props: { title: string, value: string }) => {

  return <Stack direction={'row'}>
    <Body4 style={{minWidth:'50px'}} color={Color.warm_gray}>{props.title}</Body4>
    <HorizontalInterval size={'6px'}/>
    <Body4 style={{minWidth:'38px'}}>{props.value}</Body4>
  </Stack>
}

// export type EstimateionType = '신청' | '보완요청' | '견적서발급' | '반려' | '신청취소'
//
// interface EstimationData {
//   eqpmnNmKorean: string
//   useBeginDt: Date,
//   useEndDt: Date,
//   creatDt: Date,
//   type: EstimateionType
// }
//
// interface infotype {
//   label: EstimateionType
//   content: string
// }

const helpdata = [{
  label: '신청',
  content: '신청을 완료한 상태'
}, {
  label: '보완요청',
  content: '담당자가 신청서 보완을 요청한 상태'
}, {
  label: '견적서발급',
  content: '담당자가 견적서를 발급한 상태'
}, {
  label: '반려',
  content: '담당자가 신청을 반려한 상태'
}, {
  label: '신청취소',
  content: '신청자가 신청을 취소한 상태'
}]

// const data: EstimationData[] = [{
//   eqpmnNmKorean: '자외선 및 IR 이미지 측정시스템',
//   useBeginDt: new Date('2021-11-10T10:15:00'),
//   useEndDt: new Date('2021-11-17T15:21:00'),
//   creatDt: new Date('2021-11-05'),
//   type: "신청"
// }, {
//   eqpmnNmKorean: '자외선 및 IR 이미지 측정시스템',
//   useBeginDt: new Date('2021-11-10T10:15:00'),
//   useEndDt: new Date('2021-11-17T15:21:00'),
//   creatDt: new Date('2021-11-05'),
//   type: "보완요청"
// }, {
//   eqpmnNmKorean: '자외선 및 IR 이미지 측정시스템',
//   useBeginDt: new Date('2021-11-10T10:15:00'),
//   useEndDt: new Date('2021-11-17T15:21:00'),
//   creatDt: new Date('2021-11-05'),
//   type: "견적서발급"
// }, {
//   eqpmnNmKorean: '자외선 및 IR 이미지 측정시스템',
//   useBeginDt: new Date('2021-11-10T10:15:00'),
//   useEndDt: new Date('2021-11-17T15:21:00'),
//   creatDt: new Date('2021-11-05'),
//   type: "반려"
// }, {
//   eqpmnNmKorean: '자외선 및 IR 이미지 측정시스템',
//   useBeginDt: new Date('2021-11-10T10:15:00'),
//   useEndDt: new Date('2021-11-17T15:21:00'),
//   creatDt: new Date('2021-11-05'),
//   type: "신청취소"
// }]
const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '20px',
    border: '1px solid #dadde9',
    padding: '30px',
    minWidth: '354px'
  },
}));

export default MyPageEstimation
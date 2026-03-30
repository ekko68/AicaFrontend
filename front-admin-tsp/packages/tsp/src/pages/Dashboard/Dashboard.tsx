import React, {Fragment, useEffect, useState} from "react"
import {TableCell} from "@mui/material";
import {DashboardService} from "~/service/DashboardService";
import {CustomHeadCell, WithCustomRowData, TableComponents} from "shared/components/TableComponents";
import dayjs from "shared/libs/dayjs";
import {
  DashboardCountContents,
  DashboardItem,
  DashboardMain,
  SubContents,
  TitleContents
} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useQueryClient, UseQueryResult} from "react-query";
import {CommonCode, DashboardDataResponse} from "~/service/Model";
import {CommonService} from "~/service/CommonService";
import {CommtCodeNms, toCommtCode} from "~/utils/CommtCodeUtil";
import {useCommtCode} from "~/utils/useCommtCode";

const Dashboard = () => {
  const navigate = useNavigate()

  return <TitleContents title={'미처리업무'}>
    {/*<DashboardCount />*/}
    <SubContents
      hideDivision
      title={"공지사항"}
      maxHeight={'100%'}
      rightContent={
      <CustomButton
        type={"small"} color={"list"} label={"더 보기"}
        onClick={() => {
          // TODO: 공지사항 페이지로 이동.
          // navigate()
        }}/>
    }>
      <Notice/>
    </SubContents>
  </TitleContents>
}

const DashboardCount = () => {

  const dashboardData:undefined | DashboardDataResponse = DashboardService.DashboardData().data
  if(dashboardData === undefined)
    return (<></>);

  let dashboardMains: DashboardMain[];
  let dashboardItems_1: DashboardItem[]
  let dashboardItems_2: DashboardItem[]
  let dashboardItems_3: DashboardItem[]

  dashboardItems_1 = [
    {
      itemTitle: "견적신청",
      itemSubtitle: "신청",
      itemValue: dashboardData.estimateCount
    },
    {
      itemTitle: "사용신청",
      itemSubtitle: "신청",
      itemValue: dashboardData.useCount
    }
  ]
  dashboardItems_2 = [
    {
      itemTitle: "기간연장신청",
      itemSubtitle: "신청",
      itemValue: dashboardData.extentionCount
    },
    {
      itemTitle: "결과보고서제출",
      itemSubtitle: "제출",
      itemValue: dashboardData.reportCount
    }
  ]
  dashboardItems_3 = [
    {
      itemTitle: "사용신청",
      itemSubtitle: "신청",
      itemValue: dashboardData.resourceCount
    },
    {
      itemTitle: "반환요청",
      itemSubtitle: "요청",
      itemValue: dashboardData.resourceReturnCount
    }
  ]

  dashboardMains = [
      {
        title: "장비사용 신청관리",
        value: dashboardData.rentalTotal,
        items: dashboardItems_1
      },
      {
        title: "장비 사용관리",
        value: dashboardData.usageTotal,
        items: dashboardItems_2
      },
      {
        title: "실증자원 사용관리",
        value: dashboardData.resourceTotal,
        items: dashboardItems_3
      }
    ]

  return <>
      <DashboardCountContents dashboardMain={dashboardMains} />
  </>
}
const Notice = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<NoticeData>[]>([]);

  // const notice = DashboardService.Notice(pagination)

  // useEffect(() => {
  //   if (!!notice.data) {
  //     const data = notice.data.list.map((m, i) => {
  //       return {key: m.articleId, ...{title: m.title, createdDt: dayjs(m.createdDt).format('YYYY-MM-DD')}}
  //     });
  //
  //     setRowList(data);
  //     setPagination((state) => ({...state, rowCount: notice.data.totalItems}))
  //   }
  // }, [notice.data])

  return <TableComponents<NoticeData>
    hideRowPerPage
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      // console.log(key)
    }}
    tableCell={(data) => {
      return (
        data ? <Fragment>
          <TableCell sx={{paddingLeft: "30px"}} width={"80%"}>{data.title}</TableCell>
          <TableCell align={"center"} width={"20%"}>{data.createdDt}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

interface NoticeData {
  title: string,
  createdDt: string,
}

const headCells: CustomHeadCell<NoticeData>[] = [
  {
    id: 'title',
    align: 'center',
    label: '제목',
  },
  {
    id: 'createdDt',
    align: "center",
    label: '등록일',
  },
];

export default Dashboard;

import React, {Fragment, useState} from 'react'
import {SubContents} from "shared/components/LayoutComponents";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {TableCell} from "@mui/material";
import {CustomButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import UsePeriodSelect from "~/pages/UseMgt/EquipmentMgt/UsePeriodSelect";
import {useCommtCode} from "~/utils/useCommtCode";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";

export const UseEquipmentExtendPeriodMgt = () => {
  const {commtCode} = useCommtCode(["EQPMN_USAGE_ST",'EQPMN_PAYMENT'])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const navigation = useNavigate();
  const [extendPeriodView, setExtendPeriodView] = useState(false)
  const [rowList, setRowList] = useState<WithCustomRowData<NoticeData>[]>(tempData);

  return <SubContents
    title={"기간연장"}
    maxHeight={"100%"}
    rightContent={
      <Fragment>
        {
          extendPeriodView || <CustomButton
            label={"사용기간연장"} type={"small"} color={"list"}
            onClick={() => setExtendPeriodView(true)}/>
        }
      </Fragment>
    }>
    {
      extendPeriodView ? <UsePeriodSelect
        onClickSave={() => {
          setExtendPeriodView(false)
        }}
        onClickList={() => setExtendPeriodView(false)}
      /> : <TableComponents<NoticeData>
        {...pagination}
        showTotal
        //isLoading={}
        headCells={headCells}
        bodyRows={rowList}
        tableCell={(data) => {
          let eqpmnRentalSt = ''
          let payType = ''
          if (commtCode && data) {
            eqpmnRentalSt = toCommtCodeName(commtCode,"EQPMN_USAGE_ST", data.eqpmnRentalSt)
            payType = toCommtCodeName(commtCode,"EQPMN_PAYMENT", data.payType)
          }

          return <Fragment>
            <TableCell key={"eqpmnRentalSt-" + data.key} align={"center"}>{eqpmnRentalSt}</TableCell>
            <TableCell key={"period-" + data.key} align={"center"}>{data?.period}</TableCell>
            <TableCell key={"usingTime-" + data.key} align={"center"}>{data?.usingTime}</TableCell>
            <TableCell key={"rntfeeHour-" + data.key} align={"center"}>{data?.rntfeeHour}</TableCell>
            <TableCell key={"useCost-" + data.key} align={"center"}>{data?.useCost}</TableCell>
            <TableCell key={"discountCost-" + data.key} align={"center"}>{data?.discountCost}</TableCell>
            <TableCell key={"payType-" + data.key} align={"center"}>{payType}</TableCell>
            <TableCell key={"detail-" + data.key} align={"center"}>
              <CustomButton label={"상세보기"} type={"small"} color={"list"} onClick={() => {
                // 해당 기간연장
                navigation('/tsp_admin/UseMgt/EquipmentMgt/PeriodExtendMgt/' + data.key);
              }}/>
            </TableCell>
          </Fragment>
        }}
      />
    }
  </SubContents>
}

interface NoticeData {
  eqpmnRentalSt: string
  period: string
  beginTime: string
  endTime: string
  usingTime?: string
  rntfeeHour: number
  useCost: number
  discountCost: number
  payType: string
  detail: boolean
}

const tempData: WithCustomRowData<NoticeData>[] = [{
  key: "id-1234",
  eqpmnRentalSt: "신청",
  period: "2022-05-15 ~ 2022-06-10",
  beginTime: "2022-05-15",
  endTime: "2022-06-10",
  usingTime: "38 : 10",
  rntfeeHour: 100,
  discountCost: 300,
  useCost: 1000,
  payType: "AFTER_PAYMENT",
  detail: true
}]

const headCells: CustomHeadCell<NoticeData>[] = [
  {
    id: 'eqpmnRentalSt',
    align: 'center',
    label: '신청상태',
  },
  {
    id: 'period',
    align: "center",
    label: '연장 신청기간',
  },
  {
    id: 'usingTime',
    align: "center",
    label: '사용 시간기간',
  },
  {
    id: 'rntfeeHour',
    align: "center",
    label: '1시간 사용료',
  },
  {
    id: 'useCost',
    align: "center",
    label: '사용금액',
  },
  {
    id: 'discountCost',
    align: "center",
    label: '할인적용금액',
  },
  {
    id: 'payType',
    align: "center",
    label: '지불방법',
  },
  {
    id: 'detail',
    align: "center",
    label: '상세내역',
  },
];

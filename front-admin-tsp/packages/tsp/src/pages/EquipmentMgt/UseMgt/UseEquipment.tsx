import React, {Fragment, useEffect, useState} from 'react'
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {
  CustomHeadCell,
  SearchTable, TableComponents, TableDateTermCell,
  TableRadioCell,
  TableSelectCell,
  TableSelectTextFieldCell,
  TableTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {EquipmentInformationService} from "~/service/EquipmentMgt/EquipmentInformationService";
import {useNavigate} from "react-router-dom";
import dayjs from "shared/libs/dayjs";
import {Icons} from "shared/components/IconContainer";
import {HorizontalInterval, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {UseEquipmentService} from "~/service/EquipmentMgt/UseEquipmentService";
import {
  getUseTime,
  toDayAndTimeFormat,
  toStringFullDayFormat,
  toStringTimeForMinutes,
  toTimeFormat
} from "shared/utils/stringUtils";
import {EquipmentCorrectData, UseEquipmentData} from "~/service/Model";
import {DateType} from "@date-io/type";
import {toCommtCodeName} from "~/utils/CommtCodeUtil";
import {useCommtCode} from "~/utils/useCommtCode";


/* 장비 사용 현황*/
const UseEquipment = () => {
  const [useEquipmentData, setUseEquipmentData] = useState<UseEquipmentData | null>(null)

  return <TitleContents
    title={"장비사용현황"}>
    <SearchBox onClick={(data: UseEquipmentData | null) => {
      setUseEquipmentData(data);
    }}/>

    <VerticalInterval size={"30px"}/>
    <ListView useEquipmentData={useEquipmentData}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  onClick: (data: UseEquipmentData | null) => void
}> = props => {
  const [useEquipmentData, setUseEquipmentData] = useState<UseEquipmentData | null>(null)

  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableDateTermCell
              division type={"Date"} label={"사용기간"} thWidth={"12%"}
              onChange={(beginTime, endTime) => {
                setUseEquipmentData((e) => ({
                  ...e!,
                  useEndDt: endTime.getTime(),
                  useBeginDt: beginTime.getTime()
                }))
              }}
            />
            <TableTextFieldCell
              label={"사업자명"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(selected: string) => {
                setUseEquipmentData((e) => ({
                  ...e!,
                  userNm: selected
                }))
              }}/>
          </TableRow>
          <TableRow>
            <TableTextFieldCell
              division label={"장비명"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(selected: string) => {
                setUseEquipmentData((e) => ({
                  ...e!,
                  eqpmnNmKorean: selected
                }))
              }}/>
            <TableTextFieldCell
              label={"자산번호"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(selected: string) => {
                setUseEquipmentData((e) => ({
                  ...e!,
                  assetsNo: selected
                }))
              }}/>

          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"}
                            onClick={
                              () => {
                                props.onClick(useEquipmentData);
                              }
                            }
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </SearchTable>
    </TableContainer>
  </Box>
}

const ListView: React.FC<{
  useEquipmentData: UseEquipmentData | null
}> = props => {
  const [rowList, setRowList] = useState<WithCustomRowData<UseEquipmentData>[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0
  });

  const useEqpmn = UseEquipmentService.getList({
    ...pagination,
    ...props.useEquipmentData
  });
  const navigation = useNavigate();
  const {commtCode} = useCommtCode(["MEMBER_TYPE"])

  useEffect(() => {
    if (!useEqpmn.isLoading && !useEqpmn.isFetching) {
      if (!!useEqpmn.data) {
        setRowList(useEqpmn.data.list.map((m,) => {
          return {
            key: m.assetsNo,
            ...m,
          }
        }));
        setPagination((state) => ({...state, rowCount: useEqpmn.data.totalItems}))
      }
    }
  }, [useEqpmn.data,useEqpmn.isLoading, useEqpmn.isFetching])

  return <TableComponents<UseEquipmentData>
    showTotal isLoading={useEqpmn.isLoading || useEqpmn.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          const res = await UseEquipmentService.getEquipmentListExcelDownload({
            ...props.useEquipmentData
          });

          const blob = new Blob([res]);
          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.setAttribute(
            "download",
            `장비사용현황_리스트.xlsx`
          );
          document.body.appendChild(link);
          link.click();
        }}>
      </CustomIconButton>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    tableCell={(data) => {
      let mberDiv = ''
      if (commtCode && data) {
        mberDiv = toCommtCodeName(commtCode,"MEMBER_TYPE", data.mberDiv)
      }

      return (
        data ? <Fragment>
          <TableCell key={"assetsNo"} sx={{paddingLeft: "30px"}}>{data.assetsNo}</TableCell>
          <TableCell key={"eqpmnNmKorean"}>{data.eqpmnNmKorean}</TableCell>
          <TableCell key={"mberDiv"}>{mberDiv}</TableCell>
          <TableCell key={"entrprsNm"}>{data.entrprsNm}</TableCell>
          <TableCell key={"userNm"}>{data.userNm}</TableCell>
          <TableCell key={"useBeginDt"}>{toTimeFormat(data.useBeginDt)}</TableCell>
          <TableCell key={"useEndDt"}>{toTimeFormat(data.useEndDt)}</TableCell>
          <TableCell key={"expectUsgtm"}>{data.expectUsgtm}</TableCell>
        </Fragment> : <></>
      )
    }}
  />
}

const headCells: CustomHeadCell<UseEquipmentData>[] = [
  {
    id: 'assetsNo',
    align: 'center',
    label: '자산번호',
  },
  {
    id: 'eqpmnNmKorean',
    align: "center",
    label: '장비명',
  },
  {
    id: 'mberDiv',
    align: "center",
    label: '구분',
  },
  {
    id: 'entrprsNm',
    align: "center",
    label: '사업자명',
  },
  {
    id: 'userNm',
    align: "center",
    label: '대표자명',
  },
  {
    id: 'useBeginDt',
    align: "center",
    label: '사용시작일',
  },
  {
    id: 'useEndDt',
    align: "center",
    label: '사용종료일',
  },
  {
    id: 'expectUsgtm',
    align: "center",
    label: '사용시간',
  }
];

export default UseEquipment;
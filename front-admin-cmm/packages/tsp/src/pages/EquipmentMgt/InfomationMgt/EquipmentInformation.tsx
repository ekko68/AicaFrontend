import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react'
import {
  Box, Icon, Stack,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import {
  CustomHeadCell,
  WithCustomRowData, SearchTable,
  TableComponents, TableDateTermCell, TableTextFieldCell,
  TableRadioCell,
  TableSelectCell, TableSelectTextFieldCell
} from "shared/components/TableComponents";
import {BlockContents, HorizontalInterval, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import dayjs from "shared/libs/dayjs";
import {EquipmentInformationService} from "~/service/EquipmentMgt/EquipmentInformationService";
import {Icons} from "shared/components/IconContainer";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {CommonService} from "~/service/CommonService";
import {SearchParam} from "~/service/Model";
import {dayFormat} from "shared/utils/stringUtils";
import {useCommtCode} from "~/utils/useCommtCode";
import {CommtCodeNms, toCommtCodeName} from "~/utils/CommtCodeUtil";

/* 장비 정보 관리 */
const EquipmentInformation = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  // const {clear} = useEquipmentDetailStore();
  // useEffect(() => {
  //   return () => clear()
  // })

  return <TitleContents
    title={"장비정보관리"}>
    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  // const common = CommonService.CommonCode(["EQPMN_ST"])

  const {commtCode} = useCommtCode(["EQPMN_ST"])
  const [eqpmnStatus, setEqpmnStatus] = useState(["전체"]);
  const [searchParam, setSearchParam] = useState<SearchParam>()
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchText, setSearchText] = useState("")
  const [search, setSearch] = useState(false)

  useEffect(() => {
    if (search) {
      props.setSearch(searchParam!)
      // if (props.onClick) props.onClick(searchParam!)
      setSearch(false)
    }
  }, [search])

  useEffect(() => {
    if (!!commtCode){
      const state = CommtCodeNms(commtCode, 'EQPMN_ST')
      if (state.length > 0) setEqpmnStatus(['전체'].concat(state))
    }
  }, [commtCode])

  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableSelectCell
              division medium label={"장비 상태"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={eqpmnStatus}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, eqpmnSttus: selected})
              }}/>
            <TableTextFieldCell
              label={"장비명"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(selected: string) => {
                setSearchParam({...searchParam, eqpmnNmKorean: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableSelectCell
              division medium label={"반출 상태"}
              thWidth={"12%"} tdWidth={"38%"}
              selectLabel={["전체", "미반출", "반출중"]}
              defaultLabel={"전체"}
              onClick={(selected: string) => {
                let tkout: boolean | undefined = undefined;
                if (selected == "반출중") tkout = true
                else if (selected == "미반출") tkout = false
                setSearchParam({...searchParam, tkoutAt: tkout})
              }}/>
            <TableRadioCell
              row
              label={"불용 여부"}
              radioLabel={["정상", "불용"]}
              defaultLabel={"정상"}
              thWidth={"12%"} tdWidth={"38%"}
            />
          </TableRow>
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={["자산번호", "모델명"]}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                setSearchKeyword(selected)
                setSearchText("")
                setSearchParam({...searchParam, assetsNo: "", modelNm: ""})
              }}
              onChange={(text: string) => {
                setSearchText(text)
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                if (searchKeyword == "자산번호") {
                  setSearchParam({...searchParam, assetsNo: searchText})
                } else if (searchKeyword == "모델명") {
                  setSearchParam({...searchParam, modelNm: searchText})
                }
                // props.onClick(searchParam!)
                // searchParam을 검색시 적용하기 떄문에 useEffect에서 검색되도록 함.
                setSearch(true);
              }}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </SearchTable>
    </TableContainer>
  </Box>
}

const ListView: React.FC<{
  searchParam?: SearchParam
}> = props => {
  const {commtCode} = useCommtCode(["EQPMN_ST"])
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<NoticeData>[]>([]);
  const information = EquipmentInformationService.getList({...pagination, ...props.searchParam});
  const navigation = useNavigate();
  useEffect(() => {
    if (!information.isLoading || !information.isFetching) {
      if (!!information.data) {
        setRowList(information.data.list.map((m,) => {
          return {
            key: m.eqpmnId,
            ...m,
            creatDt: dayFormat(m.creatDt),
          }
        }));
        setPagination((state) => ({...state, rowCount: information.data.totalItems}))
      }
    }
  }, [information.data, information.isLoading, information.isFetching])

  return <TableComponents<NoticeData>
    showTotal
    isLoading={information.isLoading || information.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
        onClick={async () => {
          await EquipmentInformationService.getEquipmentListExcelDownload({...props.searchParam}).then((res) => {
            const blob = new Blob([res]);
            const fileObjectUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileObjectUrl;
            link.setAttribute(
              "download",
              `장비정보관리_리스트.xlsx`
            );
            document.body.appendChild(link);
            link.click();
          });
        }}/>
      <HorizontalInterval size={"10px"}/>
      <CustomButton
        type={"small"} color={"list"} label={"등록"}
        onClick={() => {
          navigation('/tsp_admin/EquipmentMgt/EquipmentRegist')
        }}/>
    </Stack>}
    headCells={headCells}
    bodyRows={rowList}
    {...pagination}
    onChangePagination={(page, rowPerPage) => {
      setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    handleClick={(key: string) => {
      navigation('/tsp_admin/EquipmentMgt/InfomationMgt/' + key);
    }}
    tableCell={(data:WithCustomRowData<NoticeData>) => {
      let eqpmnSttus = ''
      if (commtCode && data)
        eqpmnSttus = toCommtCodeName(commtCode,"EQPMN_ST", data.eqpmnSttus)

      return (
        <Fragment>
          <TableCell key={"eqpmnSt-" + data.key} sx={{paddingLeft: "30px"}}>{eqpmnSttus}</TableCell>
          <TableCell key={"assetNo-" + data.key}>{data?.assetsNo}</TableCell>
          <TableCell key={"eqpmnNmKo-" + data.key}>{data?.eqpmnNmKorean}</TableCell>
          <TableCell key={"eqpmnClfcId-" + data.key}>{data?.eqpmnClNm}</TableCell>
          <TableCell key={"modelNm-" + data.key}>{data?.modelNm}</TableCell>
          <TableCell key={"tkout-" + data.key}>{data?.tkoutAt? '반출' : '미반출'}</TableCell>
          <TableCell key={"createdDt-" + data.key}>{data?.creatDt}</TableCell>
        </Fragment>
      )
    }}
  />
}

interface NoticeData {
  eqpmnId: string
  assetsNo: string
  eqpmnSttus: string
  eqpmnNmKorean: string
  eqpmnClNm: string
  modelNm: string
  tkoutAt: boolean
  creatDt: string
}

const headCells: CustomHeadCell<NoticeData>[] = [
  {
    id: 'eqpmnSttus',
    align: 'center',
    label: '장비상태',
  },
  {
    id: 'assetsNo',
    align: "center",
    label: '자산번호',
  },
  {
    id: 'eqpmnNmKorean',
    align: "center",
    label: '장비명',
  },
  {
    id: 'eqpmnClNm',
    align: "center",
    label: '분류',
  },
  {
    id: 'modelNm',
    align: "center",
    label: '모델명',
  },
  {
    id: 'tkoutAt',
    align: "center",
    label: '반출상태',
  },
  {
    id: 'creatDt',
    align: "center",
    label: '등록일',
  },
];


export default EquipmentInformation;
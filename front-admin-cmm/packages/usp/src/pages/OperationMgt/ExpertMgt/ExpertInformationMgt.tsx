// 전문가관리/ ->  전문가정보관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useRef, useState} from "react"
import {HorizontalInterval, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {
  dummyExpertInfoList,
  dummyExpertList,
  SearchParam, 전문가단분류,
  전문가신청리스트,
  전문가정보리스트
} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {Box, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  SearchTable, TableComponents,
  TableDateTermCell,
  TableSelectCell,
  TableSelectTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {Icons} from "shared/components/IconContainer";
import {dayFormat} from "shared/utils/stringUtils";
import {readExcelFile, workbookToJsonArray} from "shared/utils/excelUtil";
import dayjs from "shared/libs/dayjs";
import {GridColumns} from "@mui/x-data-grid";
import DataTable from "shared/components/CustomDataGride";
import {ModalComponents} from "shared/components/ModalComponents";
import {ExpertMgtService} from "~/pages/OperationMgt/ExpertMgt/Service/ExpertMgtService";
import {GridSelectionModel} from "@mui/x-data-grid/models/gridSelectionModel";
import {Color} from "shared/components/StyleUtils";

function ExpertInformationMgt() {
  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={'전문가정보관리'}>
    <SearchBox setSearch={setSearchParam}/>

    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
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

  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableSelectTextFieldCell
              label={"키워드검색"} tdSpan={3}
              selectLabel={["직장명", "전문가명"]}
              defaultLabel={searchText}
              onClick={(selected: string) => {
                setSearchKeyword(selected)
                setSearchText("")
                setSearchParam({...searchParam, 직장명: "", 전문가명: ""})
              }}
              onChange={(text: string) => {
                setSearchText(text)
              }}
            />
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                if (searchKeyword == "전문가명") {
                  setSearchParam({...searchParam, 전문가명: searchText})
                } else if (searchKeyword == "직장명") {
                  setSearchParam({...searchParam, 직장명: searchText})
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
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [rowList, setRowList] = useState<WithCustomRowData<전문가정보리스트>[]>(dummyExpertInfoList);
  const [xlsxData, setXlsxData] = useState<Array<any>>()
  const navigation = useNavigate();
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [excelData, setExcelData] = useState<{ columns: GridColumns, row: any[] }>()
  const [excelModal, setExcelModal] = useState(false)

  // const experList = ExpertMgtService.getList({...pagination, ...props.searchParam});
  // useEffect(() => {
  //   if (!experList.isLoading || !experList.isFetching) {
  //     if (!!experList.data) {
  //       setRowList(experList.data.list.map((m,) => {
  //         return {
  //           key: m.id,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: information.data.totalItems}))
  //     }
  //   }
  // }, [information.data, information.isLoading, information.isFetching])

  useEffect(() => {
    if (!!xlsxData) {
      const columns: GridColumns = Object.keys(xlsxData[0]).map((m, i) => {
        return {
          field: m,
          headerName: m,
          headerAlign: 'center'
        }
      })

      console.log('colums - ' + JSON.stringify(columns))
      console.log('row - ' + JSON.stringify(xlsxData.map((m, i) => {
        return {id: i, ...m}
      })))
      setExcelData({
        columns: columns, row: xlsxData.map((m, i) => {
          return {id: i, ...m}
        })
      })
      setExcelModal(true)
    }
  }, [xlsxData])

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0)) {
      const file = e.target.files[0]
      readExcelFile(file, (workbook) => {
        const json = workbookToJsonArray(workbook)
        setXlsxData(json)
      })
    }
  }

  return <Fragment>
    <input hidden type={'file'} ref={inputFileRef} onChange={upload} accept='.xlsx, .xls'/>
    <TableComponents<전문가정보리스트>
      showTotal
      // isLoading={experList.isLoading || experList.isFetching}
      rightContent={<Stack flexDirection={"row"}>
        <CustomButton
          type={"small"} color={"list"} label={'전문가 엑셀등록'}
          onClick={() => {
            if (inputFileRef.current) {
              inputFileRef.current.value = ''
              inputFileRef.current.click()
            }
          }}/>
        <HorizontalInterval size={'15px'}/>
        <CustomButton
          type={"small"} color={"list"} label={'엑셀 템플릿 다운로드'}
          onClick={() => {
            // const res = await ExpertMgtService.getExcelTemplateDownload()
            // const blob = new Blob([res]);
            // const fileObjectUrl = window.URL.createObjectURL(blob);
            // const link = document.createElement("a");
            // link.href = fileObjectUrl;
            // link.setAttribute(
            //   "download",
            //   `엑셀_템플릿.xlsx`
            // );
            // document.body.appendChild(link);
            // link.click();
          }}/>
        <HorizontalInterval size={'15px'}/>
        <CustomIconButton
          startText={'엑셀저장'} icon={Icons.FileDownload}
          style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
          onClick={() => {
            // const res = await ExpertMgtService.getInformationExcelDownload()
            // const blob = new Blob([res]);
            // const fileObjectUrl = window.URL.createObjectURL(blob);
            // const link = document.createElement("a");
            // link.href = fileObjectUrl;
            // link.setAttribute(
            //   "download",
            //   `전문가정보관리.xlsx`
            // );
            // document.body.appendChild(link);
            // link.click();
          }}/>
      </Stack>}
      headCells={headCells}
      bodyRows={rowList}
      {...pagination}
      onChangePagination={(page, rowPerPage) => {
        setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
      }}
      handleClick={(key: string) => {
        navigation('/OperationMgt/ExpertMgt/ExpertInformationMgt/' + key);
      }}
      tableCell={(data: WithCustomRowData<전문가정보리스트>, i) => {
        return <Fragment>
          <TableCell key={"번호-" + data.key} sx={{textAlign: 'center'}}>{i + 1}</TableCell>
          <TableCell key={"전문가명-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.전문가명}</TableCell>
          <TableCell key={"성별-" + data.key} sx={{textAlign: 'center', width: '10%'}}>{data.성별}</TableCell>
          <TableCell key={"내외국인-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.내외국인}</TableCell>
          <TableCell key={"직장명-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.직장명}</TableCell>
          <TableCell key={"직위-" + data.key} sx={{textAlign: 'center', width: '20%'}}>{data.직위}</TableCell>
        </Fragment>
      }}
    />

    {excelModal && excelData && <ExcelRegisterModal data={excelData} setModal={setExcelModal}/>}
  </Fragment>
}

const ExcelRegisterModal = (props: {
  data: { columns: GridColumns, row: any[] }
  setModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 5,
    rowCount: 0,
  });
  const [removeData, setRemoveData] = useState<any[]>([])
  const [row,setRow] = useState(props.data.row)

  return <ModalComponents
    open isDist title={'엑셀등록'} type={'normal'}
    onConfirm={() => {
      props.setModal(false)
    }}
    onClose={() => {
      props.setModal(false)
    }}
  >
    <Stack sx={{width: '800px'}} spacing={'15px'}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack flexDirection={"row"}>
          <span>TOTAL</span>
          <HorizontalInterval size={'11px'}/>
          <span style={{color: Color.primary}}>{row.length}</span>
        </Stack>
        <Stack flexDirection={"row"}>
          <CustomButton
            label={'엑셀등록'} type={"small"} color={"list"}
            onClick={async () => {
              // const columns = props.data.columns.flatMap(m=> m.field)
              // const req = await ExpertMgtService.postInformationExcelRegister({colums: columns, row: row})
              // if (!req.success) return
              props.setModal(false)
            }}
          />
          <HorizontalInterval size={'15px'}/>
          <CustomIconButton
            icon={Icons.Trash}
            style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}
            onClick={() => {
              setRow(row.filter(f => !removeData.includes(f)))
            }}
          />
        </Stack>
      </Stack>
      <DataTable
        isCheckBox pagination
        {...pagination}
        columns={props.data.columns}
        rows={row}
        rowCount={row.length}
        onPageChange={(page: number) => {
          setPagination((state) => ({...state, page}));
        }}
        onPageSizeChange={(pageSize: number) => {
          setPagination((state) => ({...state, pageSize}));
        }}
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          const selected = row.filter(f => {
            if (selectionModel.includes(f.id!))
              return f
          })
          if (!!selected)
            setRemoveData(selected)
        }}
      />
    </Stack>
  </ModalComponents>
}

const headCells: CustomHeadCell<전문가정보리스트 & { count: number }>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: '전문가명',
    align: "center",
    label: '전문가명',
  },
  {
    id: '성별',
    align: "center",
    label: '성별',
  },
  {
    id: '내외국인',
    align: "center",
    label: '내외국인',
  },
  {
    id: '직장명',
    align: "center",
    label: '직장명',
  },
  {
    id: '직위',
    align: "center",
    label: '직위',
  },
];
export default ExpertInformationMgt;
// 통계/로그/ ->  기업현황 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {HorizontalInterval, Pagination, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {Box, IconButton, LinearProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {
  CheckboxStyle,
  CustomHeadCell,
  SearchTable, TableComponents,
  TableDateTermCell,
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import TableContainer from "@mui/material/TableContainer";
import {dummyCorporationList, SearchParam, 기업현황} from "~/pages/OperationMgt/StatsLogs/Model/Model";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import styled from "@emotion/styled";
import {Color} from "shared/components/StyleUtils";

function CompanyStatus() {

  const [searchParam, setSearchParam] = useState<SearchParam>()

  return <TitleContents title={"기업 현황"}>

    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"100px"}/>
    <CustomListView searchParam={searchParam}/>

  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [businessYear, setBusinessYear] = useState(["전체", "2022"])
  const [searchParam, setSearchParam] = useState<SearchParam>()
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
            <TableSelectCell
              division medium label={"사업연도"}
              thWidth={"12%"} tdWidth={"70%"}
              selectLabel={businessYear}
              defaultLabel={"2022"}
              onClick={(selected: string) => {
                setSearchParam({...searchParam, 사업연도: selected})
              }}/>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                // if (searchKeyword == "분류") {
                //   setSearchParam({...searchParam, 이름: searchText})
                // }
                // // props.onClick(searchParam!)
                // setSearch(true);
              }}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </SearchTable>
    </TableContainer>
  </Box>
}

export const CustomListView: React.FC<{
  searchParam?: SearchParam
}> = props => {

  const [rowList, setRowList] = useState<WithCustomRowData<기업현황>[]>(dummyCorporationList);

  return <CustomTableComponents<기업현황>
    // isLoading={dummyCorporationList.isLoading || dummyCorporationList.isFetching}
    rightContent={<Stack flexDirection={"row"}>
      <CustomIconButton
        startText={'엑셀저장'} icon={Icons.FileDownload}
        style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', margin: 0}}
        onClick={() => {

        }}/>
    </Stack>}
    onefloorhead={['기업유형', '총 기업수', '상태']}
    secfloorhead={['최종선정', '사업중', '사업종료']}
    year={'2022'}
    bodyRows={rowList}
    tableCell={(data, index) => {
      return (<>
        <TableCell style={{borderRight: '1px solid #d7dae6'}}>{data.기업유형}</TableCell>
        <TableCell style={{borderRight: '1px solid #d7dae6'}}>{data.총기업수}</TableCell>
        <TableCell style={{borderRight: '1px solid #d7dae6'}}>{data.최종선정}</TableCell>
        <TableCell style={{borderRight: '1px solid #d7dae6'}}>{data.사업중}</TableCell>
        <TableCell style={{borderRight: '1px solid #d7dae6'}}>{data.사업종료}</TableCell>
      </>)
    }}
  />
}

export interface CustomTableComponentsProps<T> {
  year?: string
  rightContent?: React.ReactNode;
  isLoading?: boolean
  onefloorhead?: string[]
  secfloorhead?: string[]
  bodyRows: WithCustomRowData<T>[]
  rows?: WithCustomRowData<T>[],
  tableCell: (item: WithCustomRowData<T>, index: number) => JSX.Element
  headCells?: CustomHeadCell<any>[]
}

export interface SecCustomTableComponentsProps<T> {
  rightContent?: React.ReactNode;
  isLoading?: boolean
  bodyRows: WithCustomRowData<T>[]
  rows?: WithCustomRowData<T>[],
  tableCell: (item: WithCustomRowData<T>, index: number) => JSX.Element
  headCells: CustomHeadCell<any>[]
}

export const CustomTableComponents = <T extends unknown>(props: CustomTableComponentsProps<T>) => {

  return (
    <Box sx={{width: '100%'}}>
      <Stack flexDirection={"row"} padding={'30px'}
             justifyContent={"space-between"}
             alignItems={"center"}
             style={{
               borderRadius: "20px 20px 0 0",
               border: "1px solid #d7dae6"
             }}>
        <Stack flexDirection={"row"}>
          <span>사업연도 : </span>
          <HorizontalInterval size={'11px'}/>
          <span>{props.year}년</span>
        </Stack>
        <Box>
          {props.rightContent}
        </Box>
      </Stack>
      {props.isLoading && <LinearProgress/>}
      <TableContainer>
        <Table
          className={'dataTable'}
          style={{
            minWidth: 750,
            borderLeft: "1px solid #d7dae6",
            borderRight: "1px solid #d7dae6"
          }}>
          <TableHead>
            <TableRow style={{borderTop: '0.9px solid #4063ec'}}>
              <CustomCell align={"center"} rowSpan={2}>{props.onefloorhead ? props.onefloorhead[0] : ""}</CustomCell>
              <CustomCell align={"center"} rowSpan={2}>{props.onefloorhead ? props.onefloorhead[1] : ""}</CustomCell>
              <TableCell align={"center"} colSpan={3}>{props.onefloorhead ? props.onefloorhead[2] : ""}</TableCell>
            </TableRow>
            <TableRow>
              <CustomCell align={"center"}>{props.secfloorhead ? props.secfloorhead[0] : ""}</CustomCell>
              <CustomCell align={"center"}>{props.secfloorhead ? props.secfloorhead[1] : ""}</CustomCell>
              <TableCell align={"center"}>{props.secfloorhead ? props.secfloorhead[2] : ""}</TableCell>
            </TableRow>
          </TableHead>
          <CustomTableBody
            rows={props.bodyRows}
            tableCell={props.tableCell}
          />
        </Table>
      </TableContainer>
    </Box>
  )
}

const CustomTableBody = <T extends unknown>(props: {
  rows: WithCustomRowData<T>[],
  tableCell: (data: WithCustomRowData<T>, index: number) => JSX.Element,
}) => {

  return <TableBody>
    {
      props.rows.map((row, index) => {

        return (
          <TableRow
            key={row.key}
            hover
            role="checkbox"
            tabIndex={-1}
            style={{border: "1px solid #d7dae6"}}
          >
            {props.tableCell(row, index)}
          </TableRow>
        );
      })}
  </TableBody>
}

const CustomCell = styled(TableCell)`
  border-right: 1px solid #d7dae6
`;

export interface SecCustomTableComponentsProps<T> {
  rightContent?: React.ReactNode;
  isLoading?: boolean
  bodyRows: WithCustomRowData<T>[]
  rows?: WithCustomRowData<T>[],
  tableCell: (item: WithCustomRowData<T>, index: number) => JSX.Element
  headCells: CustomHeadCell<any>[]
}


export const SimpleTableComponents = <T extends unknown>(props: SecCustomTableComponentsProps<T>) => {

  return <Box sx={{width: '100%'}}>
    {
     <Stack
            flexDirection={"row"} padding={'30px'}
            justifyContent={"space-between"}
            alignItems={"center"}
            style={{
              borderRadius: "20px 20px 0 0",
              border: "1px solid #d7dae6"
            }}>
       <Stack>
       </Stack>
        {props.rightContent}
        </Stack>
    }
    {props.isLoading && <LinearProgress/>}
    <TableContainer>
      <Table
        className={"dataTable"}
        sx={{
          minWidth: 750,
          borderBottom: "1px solid #d7dae6",
          borderLeft: "1px solid #d7dae6",
          borderRight: "1px solid #d7dae6"
        }}
        // size={"small"}
      >
        <SimpleTableHead
          headCells={props.headCells}
        />

        <SimpleTableBody<T>
          rows={props.bodyRows}
          tableCell={props.tableCell}
        />
      </Table>
    </TableContainer>
  </Box>
}

const SimpleTableHead: React.FC<{
  headCells: CustomHeadCell<any>[];

}> = (props) => {

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id as string}
              align={headCell.align || 'right'}
              style={{
                border: "1px solid #d7dae6",
                borderTop: "1px solid #d7dae6",
                fontWeight: 600,
              }}>
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

const SimpleTableBody = <T extends unknown>(props: {
  rows: WithCustomRowData<T>[],
  tableCell: (data: WithCustomRowData<T>, index: number) => JSX.Element,

}) => {

  return <TableBody>
    {
      props.rows.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableBodyRow
            key={row.key}
            hover
            role="checkbox"
            tabIndex={-1}
            style={{border: "1px solid #d7dae6"}}>
            {props.tableCell(row, index)}
          </TableBodyRow>
        );
      })}
  </TableBody>
}

const TableBodyRow = styled(TableRow)`
  &.MuiTableRow-root {
    .MuiTableCell-root {
      border: 1px solid #d7dae6;
    }

    &.Mui-selected, &:hover {
      background-color: rgba(64, 99, 236, 0.1);

      //td {
      //  font-weight: 600;
      //}
    }
  }
`







export default CompanyStatus;
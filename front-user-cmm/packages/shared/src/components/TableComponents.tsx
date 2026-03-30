import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import {Pagination, WordCount} from "../components/LayoutComponents";
import {useEffect, useLayoutEffect, useState} from "react";
import styled from '@emotion/styled';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {CustomRadioButtons} from "../components/ButtonComponents";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {Body3, Body4} from "../components/TextComponents";
import {Color} from "../components/StyleUtils";
import {useGlobalConfigStore} from "../store/GlobalConfigStore";

export interface CustomHeadCell<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
}

export interface CustomRowData<T> {
  key: string;
}

export const TableComponents: React.FC<{
  headCells: CustomHeadCell<any>[],
  bodyRows: CustomRowData<any>[],
  tableCell: (index: number) => JSX.Element
  page: number,
  rowsPerPage: number,
  rowCount: number,
  isCheckBox?: boolean,
  handleClick?: (key: string) => void
  onChangePagination?: (page: number, rowPerPage: number) => void
}> = props => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(props.page);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);

  useEffect(() => {
    if (props.onChangePagination) props.onChangePagination(page, rowsPerPage)
  }, [page, rowsPerPage])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.bodyRows.map((n) => n.key);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    key: string
  ) => {
    if (props.isCheckBox) {
      const selectedIndex = selected.indexOf(key);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, key);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    }

    if (props.handleClick) props.handleClick(key);
  };

  const totalPage = props.rowCount <= rowsPerPage ? 1 : Math.floor((props.rowCount / rowsPerPage) + 1);

  return <Box sx={{width: '100%'}} paddingX={2}>
    <TableContainer>
      <Table
        sx={{minWidth: 750}}
        size={"small"}
      >
        <EnhancedTableHead
          headCells={props.headCells}
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={rowsPerPage}
          isCheckBox={props.isCheckBox}
        />

        <EnhancedTableBody
          rows={props.bodyRows}
          rowsPerPage={rowsPerPage}
          isSelected={(key: string) => selected.indexOf(key) !== -1}
          handleClick={handleClick}
          isCheckBox={props.isCheckBox}
          tableCell={props.tableCell}
        />

      </Table>
    </TableContainer>

    <Pagination
      curPage={page}
      totalPage={totalPage}
      rowsPerPage={rowsPerPage}
      handleChangePage={(event: unknown, newPage: number) => {
        setPage(newPage - 1);
      }}
      handleChangeRowsPerPage={(event: any) => {
        setRowsPerPage(event.target.value);
      }}
    />
  </Box>
}

const EnhancedTableHead: React.FC<{
  headCells: CustomHeadCell<any>[];
  numSelected: number;
  rowCount: number;
  isCheckBox?: boolean;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const {onSelectAllClick, numSelected, rowCount, isCheckBox} = props;

  return (
    <TableHead style={{backgroundColor: 'gray'}}>
      <TableRow>
        {isCheckBox && (
          <TableCell padding="checkbox">
            <CheckboxStyle
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected >= rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {props.headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id as string}
              align={headCell.align || 'right'}
            >
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableBody: React.FC<{
  rows: CustomRowData<any>[],
  rowsPerPage: number,
  isSelected: (name: string) => boolean,
  tableCell: (index: number) => JSX.Element,
  handleClick: (event: React.MouseEvent<HTMLTableRowElement>, name: string) => void
  isCheckBox?: boolean
}> = props => {
  const {rowsPerPage, isSelected, handleClick, isCheckBox} = props;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsPerPage - props.rows.length

  return <TableBody>
    {
      props.rows.map((row, index) => {
        const isItemSelected = isSelected(row.key);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            key={row.key}
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            onClick={(event: React.MouseEvent<HTMLTableRowElement>) => {
              handleClick(event, row.key);
            }}>
            {
              isCheckBox && <TableCell padding="checkbox">
                    <CheckboxStyle
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
            }
            {props.tableCell(index)}
          </TableRow>
        );
      })}
    {
      emptyRows > 0 && (
        <TableRow
          style={{
            height: 33 * emptyRows,
          }}
        >
          <TableCell colSpan={6}/>
        </TableRow>
      )}
  </TableBody>
}

export const TableSelectCell: React.FC<{
  label: string
  selectLabel: string[]
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  required?: boolean
  tdWidth?: string | number
  division?: boolean
  onClick?: (selectValue: string) => void
}> = props => {
  const [select, SetSelect] = React.useState<string>("")
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan}
                     sx={{background: "#f5f5f5", fontWeight: "bold", paddingLeft: "20px"}}>
      <Body3 weight={500}>{props.label}</Body3>
      {props.required && <Body4 color={Color.topaz} style={{paddingLeft: '3px'}}>*</Body4>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <FormControl fullWidth>
        {/*<InputLabel>{props.label}</InputLabel>*/}
        <Select
          size={'small'}
          required={props.required}
          name={props.label} //label={props.label}
          value={select}
          onChange={(event: SelectChangeEvent) => {
            if (props.onClick) props.onClick(event.target.value)
            SetSelect(event.target.value)
          }}>
          {
            props.selectLabel.map((m, i) => {
              return <MenuItem key={i} value={m}>
                <Body3>{m}</Body3>
              </MenuItem>
            })
          }
        </Select>
      </FormControl>
    </TableBodyCell>
  </>
}

export const TableTextFieldCell: React.FC<{
  label: string
  inputType?: 'text' | 'number'
  defaultLabel?: string
  endText?: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  required?: boolean
  division?: boolean
  multiline?: boolean
  wordCount?: number | any
  onChange?: (text: string) => void
}> = props => {
  const [value, setValue] = useState<string>('')
  const {isDesktop} = useGlobalConfigStore()
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan}
                     sx={{background: "#f5f5f5", fontWeight: "bold", paddingLeft: "20px"}}>
      <Body3 weight={500}>{props.label}</Body3>
      {props.required && <Body4 color={Color.topaz} style={{paddingLeft: '3px'}}>*</Body4>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      //sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <FormControl fullWidth>
        <TextField
          value={value}
          name={props.label}
          //sx={{height: props.wordCount ? '120px' : 'unset'}}
          //label={props.label}
          inputMode={'text'}
          type={props.inputType}
          //InputLabelProps={{style:{fontSize: isDesktop? '16px' : '14px'}}}
          //inputProps={{style:{fontSize: isDesktop? '16px' : '14px', height: '48px', padding:'0px', paddingLeft:'16px'}}}
          required={props.required}
          multiline={props.multiline}
          variant={"outlined"}
          size={"small"}
          rows={5}
          onChange={(e) => {
            if (props.onChange)
              props.onChange(e.target.value)
            setValue(e.target.value)
            if (props.wordCount <= value.length) {
              setValue(value.slice(0, -1));
              alert("제한글자를 지켜주세요")
            }
          }}/>
        {
          props.wordCount && <WordCount curWord={value.length} maxWord={props.wordCount}/>
        }
      </FormControl>
      {props.endText && <span style={{paddingLeft: "10px", whiteSpace: "nowrap"}}>{props.endText}</span>}
    </TableBodyCell>
  </>
}

export const TableInputCell: React.FC<{
  label: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  onChange?: (text: string) => void
}> = props => {
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan}>
      <Body3>{props.label}</Body3>
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <FormControl fullWidth>
        <TextField
          label={<Body3>{props.label}</Body3>}
          variant={"outlined"}
          onChange={(e) => {
            if (props.onChange) props.onChange(e.target.value)
          }}/>
      </FormControl>
    </TableBodyCell>
  </>
}

export const TableDateTermCell: React.FC<{
  label: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  onChange?: (text: string) => void
}> = props => {
  const [start, setStart] = React.useState<Date | null>(new Date());
  const [end, setEnd] = React.useState<Date | null>(new Date());

  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan}>
      {props.label}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <DatePicker
              value={start}
              openTo={"day"}
              views={['year', 'month', 'day']}
              onChange={(newValue: any) => {
                setStart(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl fullWidth>
            <DatePicker
              value={end}
              openTo={"day"}
              views={['year', 'month', 'day']}
              onChange={(newValue: any) => {
                setEnd(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </FormControl>
        </Stack>
      </LocalizationProvider>
    </TableBodyCell>
  </>
}

export const TableRadioCell: React.FC<{
  label: string
  radioLabel: string[]
  defaultLabel?: string
  row?: boolean
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  required?: boolean
  tdWidth?: string | number
  division?: boolean
  onClick?: (selected: string) => void
}> = props => {
  return <>
    <TableHeaderCell
      width={props.thWidth} colSpan={props.thSpan}
      sx={{background: "#f5f5f5", fontWeight: "bold", paddingLeft: "20px"}}>
      <Body3 weight={500}>{props.label}</Body3>
      {props.required && <Body4 color={Color.topaz} style={{paddingLeft: '3px'}}>*</Body4>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <CustomRadioButtons
        row={props.row}
        defaultData={props.defaultLabel}
        data={props.radioLabel}
        onClick={(selected: string) => {
          if (props.onClick) props.onClick(selected)
        }}/>
    </TableBodyCell>
  </>
}

export const TableAttachCell: React.FC<{
  title: string
  row?: boolean
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  required?: boolean
  division?: boolean
  onClick?: (selected: string) => void
  element: JSX.Element
}> = props => {
  return <>
    <TableHeaderCell
      width={props.thWidth} colSpan={props.thSpan}
      sx={{background: "#f5f5f5", fontWeight: "bold", minWidth: props.thWidth, paddingLeft: "20px"}}>
      <Body3 weight={500}>{props.title}</Body3>
      {props.required && <Body4 color={Color.topaz} style={{paddingLeft: '3px'}}>*</Body4>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{maxWidth: '420px', overflowX: 'auto'}}
    >
      <TableRow>
        {props.element}
      </TableRow>
    </TableBodyCell>
  </>
}

export const CustomInfoTable = (props: {
  columnCount: number,
  elements: JSX.Element[]
}) => {
  const spliceTableRow = (elements: JSX.Element[], size: number) => {
    const res = []
    let index = 0
    while (elements.length > 0) {
      const chunk = elements.splice(0, size)
      res.push(<TableRow key={`tableRow-${index}`}>{chunk}</TableRow>)
      index += 1
    }
    return res;
  }

  const row = spliceTableRow(props.elements, props.columnCount)
  return <TableContainer sx={{borderTop: "1px solid #1f2437", width: "100%", overflow: "hidden"}}>
    <Table>
      <TableBody>
        {row}
      </TableBody>
    </Table>
  </TableContainer>
}

export const TableTextCell: React.FC<{
  title: string
  label: string | React.ReactNode
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  height?: string | number
  rightContent?: React.ReactNode;
  onClick?: (selectValue: string) => void
}> = (props) => {
  return <>
    <TableHeaderCell
      width={props.thWidth} colSpan={props.thSpan}
      sx={{background: "#f5f5f5", fontWeight: "bold", minWidth: props.thWidth, paddingLeft: '20px'}}
    >
      <Body3 weight={500}>{props.title}</Body3>
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      height={props.height}
      sx={{minWidth: props.tdWidth}}
    >
      <Body3 weight={300}>{props.label}</Body3>
      {props.rightContent}
    </TableBodyCell>
  </>
}

export const TableEmptyCell: React.FC<{
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
}> = (props) => {
  return <>
    <TableHeaderCell
      width={props.thWidth} colSpan={props.thSpan}
      sx={{minWidth: props.thWidth}}/>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{minWidth: props.tdWidth}}/>
  </>
}


const TableHeaderCell = styled(TableCell)`
  height: 60px;
  color: #222;
  font-weight: 700;
  width: 115px;
`
const TableBodyCell = styled(TableCell)`
  padding: 6px 20px;
`
export const CheckboxStyle = styled(Checkbox)`
  &.MuiCheckbox-root {
    padding: 0;
    margin-right: 10px;
    margin-left: 11px;
  }

  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 4px;

    path {
      display: none;
    }
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  &.Mui-checked {
    &:before {
      border: none;
      background-color: #4063ec;
      background: url('/images/common/checkbox_active.png');
    }
  }
`;

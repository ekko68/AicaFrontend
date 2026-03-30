import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import {HorizontalInterval, Pagination, VerticalInterval, WordCount} from "../components/LayoutComponents";
import {Fragment, useCallback, useEffect, useLayoutEffect, useState} from "react";
import styled from '@emotion/styled';
import {FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {CustomButton, CustomCheckBoxs, CustomIconButton, CustomRadioButtons} from "../components/ButtonComponents";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker, DateTimePicker, TimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Icons} from "../components/IconContainer";
import {Color} from "../components/StyleUtils";
import koLocale from "date-fns/locale/ko";
import 'styles/Calendar.scss';

export interface CustomHeadCell<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
}

export type WithCustomRowData<T> = T & {
  key: string
  edit?: boolean
}

interface TableComponentsProps<T> {
  headCells: CustomHeadCell<any>[]
  bodyRows: WithCustomRowData<T>[]
  tableCell: (item: WithCustomRowData<T>, index: number) => JSX.Element
  page: number
  rowsPerPage: number
  rowCount: number
  showTotal?: boolean
  rightContent?: React.ReactNode;
  hidePagination?: boolean
  hideRowPerPage?: boolean
  hideBoarderTopColor?: boolean
  isCheckBox?: boolean
  isLoading?: boolean
  minWidth?: string
  handleClick?: (key: string) => void
  onChangePagination?: (page: number, rowPerPage: number) => void
  onSelectedKey?: (key: string[]) => void
}

export const TableComponents = <T extends unknown>(props: TableComponentsProps<T>) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(props.page);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);

  useEffect(() => {
    if (props.onChangePagination) props.onChangePagination(page, rowsPerPage)
  }, [page, rowsPerPage])

  useEffect(() => {
    if (props.onSelectedKey) props.onSelectedKey(selected)
  }, [selected])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.bodyRows.map((n) => n.key);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, key: string) => {
    if (props.isCheckBox) {
      const selectedIndex = selected.indexOf(key);
      let newSelected: string[] = [];

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

  const totalPage = (props.rowCount % rowsPerPage) == 0 ?
    (props.rowCount / rowsPerPage) : Math.floor((props.rowCount / rowsPerPage) + 1);

  return <Box sx={{width: '100%'}}>
    {
      props.showTotal && <Stack
        flexDirection={"row"} padding={'30px'}
        justifyContent={"space-between"}
        alignItems={"center"}
        style={{
          borderRadius: "20px 20px 0 0",
          border: "1px solid #d7dae6"
        }}>
        <Stack flexDirection={"row"}>
          <span>TOTAL</span>
          <HorizontalInterval size={'11px'}/>
          <span style={{color: Color.primary}}>{props.rowCount}</span>
        </Stack>
        {props.rightContent}
      </Stack>
    }
    {props.isLoading && <LinearProgress/>}
    <TableContainer>
      <Table
        className={"dataTable"}
        // stickyHeader
        sx={{
          ...(!!props.minWidth && {
            minWidth: props.minWidth,
          }),
          borderBottom: "1px solid #d7dae6",
          borderLeft: "1px solid #d7dae6",
          borderRight: "1px solid #d7dae6"
        }}
        // size={"small"}
      >
        <EnhancedTableHead
          headCells={props.headCells}
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={props.rowCount}
          isCheckBox={props.isCheckBox}
          hideBoarderTopColor={props.hideBoarderTopColor}
        />

        <EnhancedTableBody<T>
          rows={props.bodyRows}
          rowsPerPage={rowsPerPage}
          isSelected={(key: string) => selected.indexOf(key) !== -1}
          handleClick={handleClick}
          isCheckBox={props.isCheckBox}
          tableCell={props.tableCell}
        />
      </Table>
    </TableContainer>

    {
      !props.hidePagination && <Pagination
        curPage={page}
        totalPage={totalPage}
        hideRowPerPage={props.hideRowPerPage}
        rowsPerPage={rowsPerPage}
        handleChangePage={(event: unknown, newPage: number) => {
          setPage(newPage - 1);
        }}
        handleChangeRowsPerPage={(event: any) => {
          setRowsPerPage(event.target.value);
        }}
      />
    }
  </Box>
}

const EnhancedTableHead: React.FC<{
  headCells: CustomHeadCell<any>[];
  numSelected: number;
  rowCount: number;
  isCheckBox?: boolean;
  hideBoarderTopColor?: boolean
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const {onSelectAllClick, numSelected, rowCount, isCheckBox} = props;

  return (
    <TableHead>
      <TableRow>
        {isCheckBox && (
          <TableCell
            padding="checkbox"
            sx={{
              border: "1px solid #d7dae6",
              borderTop: `1px solid ${props.hideBoarderTopColor ? '#d7dae6' : '#4063ec'}`
            }}>
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
              style={{
                border: "1px solid #d7dae6",
                borderTop: `1px solid ${props.hideBoarderTopColor ? '#d7dae6' : '#4063ec'}`,
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

const EnhancedTableBody = <T extends unknown>(props: {
  rows: WithCustomRowData<T>[],
  rowsPerPage: number,
  isSelected: (name: string) => boolean,
  tableCell: (data: WithCustomRowData<T>, index: number) => JSX.Element,
  handleClick: (event: any, name: string) => void
  isCheckBox?: boolean
}) => {
  const {rowsPerPage, isSelected, handleClick, isCheckBox} = props;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rowsPerPage - props.rows.length

  return <TableBody>
    {
      props.rows.map((row, index) => {
        const isItemSelected = isSelected(row.key);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableBodyRow
            key={row.key}
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            style={{border: "1px solid #d7dae6"}}
            onClick={(event: React.MouseEvent<HTMLTableRowElement>) => {
              event.preventDefault()
              console.log('table row Click')
              if (!row.key.includes("new")) handleClick(event, row.key);
            }}>
            {
              isCheckBox && <TableCell
                key={"table-cell" + row.key}
                padding="checkbox"
                onClick={(evet) => {
                  if (row.key.includes("new")) handleClick(evet, row.key);
                }}>
                <CheckboxStyle
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
            }
            {props.tableCell(row, index)}
          </TableBodyRow>
        );
      })}
    {
      emptyRows > 0 && (
        <Box sx={{}}>
          <VerticalInterval size={33 * emptyRows}/>
        </Box>
        // <TableRow
        //   style={{
        //     height: 33 * emptyRows,
        //   }}
        // >
        //   <TableCell colSpan={6}/>
        // </TableRow>
      )}
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
export const TableTextCell: React.FC<{
  title: string
  label: string | React.ReactNode
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  rightContent?: React.ReactNode;
  onClick?: (selectValue: string) => void
}> = (props) => {
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.title}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      {props.label}{props.rightContent}
    </TableBodyCell>
  </>
}


export const TableDoubleSelectCell: React.FC<{
  label: string
  firstSelectLabel: string[]
  lastSelectLabel?: string[]
  defaultFirstLabel?: string
  defaultLastLabel?: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  required?: boolean
  onFirstClick?: (firstSelectedValue: string) => void
  onLastClick?: (lastSelectedValue: string) => void
}> = props => {
  const [firstSelectedValue, SetFirstSelected] = React.useState(props.defaultFirstLabel)
  const [lastSelectedValue, SetLastSelected] = React.useState(props.defaultLastLabel)

  useEffect(() => {
    if (!!props.defaultFirstLabel) SetFirstSelected(props.defaultFirstLabel)
    if (!!props.defaultLastLabel) SetLastSelected(props.defaultLastLabel)
  }, [props.defaultFirstLabel, props.defaultLastLabel])

  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <FormControl sx={{m: 1, minWidth: 100}}>
        <InputLabel>{props.label}</InputLabel>
        <Select label={props.label} value={firstSelectedValue} required={props.required}
                onChange={(event: SelectChangeEvent) => {
                  if (props.onFirstClick) props.onFirstClick(event.target.value)
                  SetFirstSelected(event.target.value)
                }}>
          {
            props.firstSelectLabel.map((m, i) => {
              return <MenuItem key={i} value={m}>{m}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <FormControl sx={{m: 1, minWidth: 100}} disabled={props.lastSelectLabel ? false : true}>
        <InputLabel>{props.label}</InputLabel>
        <Select label={props.label} value={lastSelectedValue} required={props.required}
                onChange={(event: SelectChangeEvent) => {
                  if (props.onLastClick) props.onLastClick(event.target.value)
                  SetLastSelected(event.target.value)
                }}>
          {
            props.lastSelectLabel?.map((m, i) => {
              return <MenuItem key={i} value={m}>{m}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </TableBodyCell>
  </>
}

export const TableSelectCell: React.FC<{
  label: string
  selectLabel: string[]
  medium?: boolean
  disable?: boolean
  required?: boolean
  defaultLabel?: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  onClick?: (selectValue: string) => void
}> = props => {
  const [select, SetSelect] = React.useState(props.defaultLabel || "")
  const size = props.medium ? "medium" : "small"

  useEffect(() => {
    if (!!props.defaultLabel) SetSelect(props.defaultLabel)
  }, [props.defaultLabel])
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <FormControl fullWidth size={size}>
        <InputLabel>{props.label}</InputLabel>
        <Select disabled={props.disable} label={props.label} required={props.required} size={size} value={select}
                onChange={(event: SelectChangeEvent) => {
                  if (props.onClick) props.onClick(event.target.value)
                  SetSelect(event.target.value)
                }}>
          {
            props.selectLabel.map((m, i) => {
              return <MenuItem key={i} value={m}>{m}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </TableBodyCell>
  </>
}

const SelectStyle = styled(Select)`
  border: 1px solid #d7dae6;
  width: 121px;
  height: 80px;
  padding: 0;

  .MuiSelect-select {
    padding: 0 20px 0 16px;
    height: 80px;
    line-height: 40px;
  }

  .MuiSvgIcon-root {
    margin-right: 10px;
  }
`;

export const TableTextFieldCell: React.FC<{
  label?: string
  defaultLabel?: string
  additionContent?: React.ReactNode
  additionDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  multiline?: boolean
  required?: boolean
  wordCount?: number | any
  onChange?: (text: string) => void
  height?: string
}> = props => {
  const [value, setValue] = useState(props.defaultLabel || '')
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])
  return <>

    {props.label ? <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
    </TableHeaderCell> : ""}
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined, padding: "15px"}}
    >
      <Stack direction={props.additionDirection || 'column'}>
        <FormControl fullWidth size={"small"}>
          <Stack direction={props.multiline ? "column" : 'row'} alignItems={'center'} width={'100%'}>
            <TextField
              value={value}
              name={props.label}
              // sx={{height: props.wordCount ? '120px' : 'unset'}}
              fullWidth
              required={props.required}
              multiline={props.multiline}
              variant={"outlined"}
              size={"small"}
              rows={5}
              onClick={(e)=> {
                e.stopPropagation()
              }}
              onChange={(e) => {
                console.log('TextFiled')
                if (props.onChange)
                  props.onChange(e.target.value)
                setValue(e.target.value)
                if (props.wordCount <= value.length) {
                  setValue(value.slice(0, -1));
                  alert("제한글자를 지켜주세요")
                }
              }}/>
            {
              props.wordCount && <WordCount curWord={value.length} maxWord={props.wordCount} style={{
                width: props.multiline ? '100%' : 'unset'
              }}/>
            }
          </Stack>
        </FormControl>
        {props.additionContent}
      </Stack>
    </TableBodyCell>
  </>
}

export const TextFieldCell: React.FC<{
  defaultLabel?: string
  additionContent?: React.ReactNode
  additionDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  multiline?: boolean
  required?: boolean
  wordCount?: number | any
  onChange?: (text: string) => void
  height?: string
}> = props => {
  const [value, setValue] = useState(props. defaultLabel|| '')
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])
  return <>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined, padding: "15px"}}
    >
      <Stack direction={props.additionDirection || 'column'}>
        <FormControl fullWidth size={"small"}>
          <Stack direction={props.multiline ? "column" : 'row'} alignItems={'center'} width={'100%'}>
            <TextField
              value={value}
              // sx={{height: props.wordCount ? '120px' : 'unset'}}
              fullWidth
              required={props.required}
              multiline={props.multiline}
              variant={"outlined"}
              size={"small"}
              rows={5}
              onClick={(e)=> {
                e.stopPropagation()
              }}
              onChange={(e) => {
                console.log('TextFiled')
                if (props.onChange)
                  props.onChange(e.target.value)
                setValue(e.target.value)
                if (props.wordCount <= value.length) {
                  setValue(value.slice(0, -1));
                  alert("제한글자를 지켜주세요")
                }
              }}/>
            {
              props.wordCount && <WordCount curWord={value.length} maxWord={props.wordCount} style={{
                width: props.multiline ? '100%' : 'unset', paddingTop:"5px", marginBottom:"-5px"
              }}/>
            }
          </Stack>
        </FormControl>
        {props.additionContent}
      </Stack>
    </TableBodyCell>
  </>
}

type MultiTextFieldContents = 'Trash' | 'Direction'
export const TableMultiTextFieldCell: React.FC<{
  label: string
  defaultLabel?: string[]
  wordCountEnd?: number | any
  rightContent?: MultiTextFieldContents[]
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  multiline?: boolean
  required?: boolean
  wordCount?: number | any
  onChange?: (list: string[]) => void
  height?: string
  fixLabel?: boolean
}> = props => {
  const [value, setValue] = useState<string[]>(props.defaultLabel || [''])
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])
  useEffect(() => {
    if (props.onChange) props.onChange(value)
  }, [value])
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined, padding: "15px"}}
    >
      <Stack spacing={'15px'}>
        {
          value.map((m, i) => {
            return <Stack key={i} direction={props.rightContent ? 'row' : 'column'}>
              <FormControl fullWidth size={"small"}>
                <Stack direction={props.multiline ? "column" : 'row'} alignItems={'center'} width={'100%'}>
                  <TextField
                    value={m}
                    name={props.label + (i + 1).toString()}
                    fullWidth
                    required={props.required}
                    multiline={props.multiline}
                    variant={"outlined"}
                    size={"small"}
                    rows={5}
                    onChange={(e) => {
                      if (!props.fixLabel) {
                        let text = e.target.value
                        if (props.wordCount <= e.target.value.length) {
                          text = e.target.value.slice(0, -1)
                          alert("제한글자를 지켜주세요")
                        }
                        const newValue = value.map((n, j) => {
                          const newValue = i == j ? text : n
                          return newValue
                        })

                        setValue(newValue)
                      }
                    }}/>
                  {
                    props.wordCount && <WordCount curWord={m.length} maxWord={props.wordCount} style={{
                      width: props.multiline ? '100%' : 'unset'
                    }}/>
                  }
                </Stack>
              </FormControl>
              <Stack direction={'row'}>
                {
                  props.rightContent?.includes('Direction') && <Fragment>
                    <CustomIconButton icon={Icons.UpArrow} onClick={() => {
                      if (i > 0) {
                        let temp = JSON.parse(JSON.stringify(value))
                        temp[i] = temp.at(i - 1)!
                        temp[i - 1] = m
                        setValue(temp)
                      }
                    }}/>
                    <CustomIconButton icon={Icons.DownArrow} onClick={() => {
                      if (i < value.length - 1) {
                        let temp = JSON.parse(JSON.stringify(value))
                        temp[i] = temp.at(i + 1)!
                        temp[i + 1] = m
                        setValue(temp)
                      }
                    }}/>
                  </Fragment>
                }
                {
                  props.rightContent?.includes('Trash') &&
                  <CustomIconButton icon={Icons.Trash} onClick={() => {
                    const selectedIndex = value.indexOf(m)
                    let newValue: string[] = [];

                    if (selectedIndex === -1) {
                      newValue = newValue.concat(value, m);
                    } else if (selectedIndex === 0) {
                      newValue = newValue.concat(value.slice(1));
                    } else if (selectedIndex === value.length - 1) {
                      newValue = newValue.concat(value.slice(0, -1));
                    } else if (selectedIndex > 0) {
                      newValue = newValue.concat(
                        value.slice(0, selectedIndex),
                        value.slice(selectedIndex + 1)
                      );
                    }
                    setValue(newValue)
                  }}/>
                }
              </Stack>
            </Stack>
          })
        }
      </Stack>
    </TableBodyCell>
  </>
}

export const TableTextFieldButtonCell: React.FC<{
  label: string;
  defaultLabel?: string;
  thSpan?: number;
  thWidth?: string | number;
  tdSpan?: number;
  tdWidth?: string | number;
  division?: boolean;
  multiline?: boolean;
  required?: boolean;
  onChange?: (text: string) => void;
  buttonOnclick?: (event: React.MouseEvent<HTMLElement>) => void;
  buttonDisabled?: boolean;
  buttonLabel: string;
}> = (props) => {
  const [value, setValue] = useState(props.defaultLabel);
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel);
    }
  }, [props.defaultLabel]);
  return (
    <>
      <TableHeaderCell
        width={props.thWidth}
        colSpan={props.thSpan}
        style={{borderRight: '1px solid #d7dae6'}}
      >
        {props.label}
        {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
      </TableHeaderCell>
      <TableBodyCell
        width={props.tdWidth}
        colSpan={props.tdSpan}
        sx={{
          borderRight: props.division ? '1px solid #d7dae6' : undefined,
          padding: '15px',
        }}
      >
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'row'}
        >
          <FormControl
            fullWidth
            sx={{
              marginBottom: '0px',
              paddingTop: '0px',
            }}
          >
            <TextField
              value={value}
              //label={props.label}
              name={props.label}
              required={props.required}
              variant={'outlined'}
              size={'small'}
              multiline={props.multiline}
              onChange={(e) => {
                if (props.onChange) props.onChange(e.target.value);
                setValue(e.target.value);
              }}
            />
          </FormControl>
          <CustomButton
            style={{minWidth: '120px'}}
            onClick={props.buttonOnclick}
            disabled={props.buttonDisabled}
            label={props.buttonLabel}
            type={'small'}
            color={'primary'}
          />
        </Stack>
      </TableBodyCell>
    </>
  )
}

export const TableSelectTextFieldCell: React.FC<{
  label: string
  defaultLabel?: string
  selectLabel: string[]
  defaultSelect?: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  multiline?: boolean
  onChange?: (text: string) => void
  onClick?: (selectValue: string) => void
}> = props => {
  const [select, SetSelect] = React.useState(props.defaultLabel || "")
  const [value, setValue] = useState(props.defaultLabel)

  useEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])

  useEffect(() => {
    if (!!props.defaultSelect) SetSelect(props.defaultSelect)
  }, [props.defaultSelect])

  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined, padding: "15px"}}
    >
      <Stack flexDirection={"row"} alignItems={"center"}>
        <FormControl size={"small"} sx={{flex: 2, maxWidth: "125px"}}>
          <InputLabel>{props.label}</InputLabel>
          <Select disabled={false} label={props.label} value={select}
                  onChange={(event: SelectChangeEvent) => {
                    if (props.onClick) props.onClick(event.target.value)
                    SetSelect(event.target.value)
                  }}>
            {
              props.selectLabel.map((m, i) => {
                return <MenuItem key={i} value={m}>{m}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <HorizontalInterval size={"15px"}/>
        <FormControl fullWidth sx={{flex: 8}}>
          <TextField
            value={value}
            label={props.label}
            variant={"outlined"}
            size={"small"}
            multiline={props.multiline}
            onChange={(e) => {
              if (props.onChange) props.onChange(e.target.value)
              setValue(e.target.value)
            }}/>
        </FormControl>
      </Stack>
    </TableBodyCell>
  </>
}

export const DateCell: React.FC<{
  label: string
  width?: number | string
  defaultTime?: number
  onChange?: (time: Date) => void
}> = props => {
  const initTime = props.defaultTime ? new Date(props.defaultTime) : new Date()
  initTime.setMinutes(0)

  const [time, setTime] = React.useState<Date>(initTime);

  useEffect(() => {
    if (!!props.defaultTime) setTime(new Date(props.defaultTime))
  }, [props.defaultTime])

  const handlerTimeDate = (newValue: Date | null) => {
    if (newValue) {
      newValue.setMinutes(0)
      setTime(newValue)
      if (props.onChange)
        props.onChange(newValue)
    }
  }
  return <>
    <TableBodyCell width={props.width} sx={{padding: '16px 10px', border: 'none'}}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <FormControl
          fullWidth size={'small'}
          onClick={(e) => {
            e.stopPropagation()
          }}>
          <DatePicker
            value={time}
            PaperProps={{
              sx: {
                '& .css-l0iinn, e1de0imv0': {position: 'absolute', left: '35%'},
                '& .MuiPickersArrowSwitcher-spacer': {width: '200px'}
              }
            }}
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
            openTo={"day"}
            views={['year', 'month', 'day']}
            components={{
              OpenPickerIcon: Icons.Calendar
            }}
            onChange={handlerTimeDate}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </FormControl>
      </LocalizationProvider>
    </TableBodyCell>
  </>
}

export const DateTermCell: React.FC<{
  label: string
  width?: number | string
  defaultStartTime?: number
  defaultEndTime?: number
  disableStartTime?: boolean
  disableEndTime?: boolean
  onChange?: (beginTime: Date, endTime: Date) => void

}> = props => {
  const initStartTime = props.defaultStartTime ? new Date(props.defaultStartTime) : new Date()
  const initEndTime = props.defaultEndTime ? new Date(props.defaultEndTime) : new Date()
  initStartTime.setMinutes(0)
  initEndTime.setMinutes(0)

  const [start, setStart] = React.useState<Date>(initStartTime);
  const [end, setEnd] = React.useState<Date>(initEndTime);


  useEffect(() => {
    if (!!props.defaultStartTime) setStart(new Date(props.defaultStartTime))
    if (!!props.defaultEndTime) setEnd(new Date(props.defaultEndTime))
  }, [props.defaultStartTime, props.defaultEndTime])

  const handlerBeginDate = (newValue: Date | null) => {
    if (newValue) {
      newValue.setMinutes(0)
      setStart(newValue)
      if (props.onChange)
        props.onChange(newValue, end)
    }
  }
  const handlerEndDate = (newValue: Date | null) => {
    if (newValue) {
      newValue.setMinutes(0)
      setEnd(newValue)
      if (props.onChange)
        props.onChange(start, newValue)
    }
  }

  return <>
    <TableBodyCell width={props.width} sx={{padding: '16px 10px'}}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <FormControl
            fullWidth size={'small'}
            onClick={(e) => {
              e.stopPropagation()
            }}>
            <DatePicker
              value={start}
              PaperProps={{
                sx: {
                  '& .css-l0iinn, e1de0imv0': {position: 'absolute', left: '35%'},
                  '& .MuiPickersArrowSwitcher-spacer': {width: '200px'}
                }
              }}
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              disabled={props.disableStartTime}
              openTo={"day"}
              views={['year', 'month', 'day']}
              components={{
                OpenPickerIcon: Icons.Calendar
                // }}
                // renderDay={(date,selectedDays,pickersDayProps)=>{
                //   return <DatePicker
                //     {...pickersDayProps}
                //   />
              }}
              onChange={handlerBeginDate}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </FormControl>
          <span>~</span>
          <FormControl
            fullWidth size={'small'}
            onClick={(e) => {
              e.stopPropagation()
            }}>
            <DatePicker
              value={end}
              PaperProps={{
                sx: {
                  '& .css-l0iinn, e1de0imv0': {position: 'absolute', left: '35%'},
                  '& .MuiPickersArrowSwitcher-spacer': {width: '200px'},
                }
              }}
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              disabled={props.disableEndTime}
              openTo={"day"}
              views={['year', 'month', 'day']}
              components={{
                OpenPickerIcon: Icons.Calendar
              }}
              onChange={handlerEndDate}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </FormControl>
        </Stack>
      </LocalizationProvider>
    </TableBodyCell>
  </>
}

export const TableDateTermCell: React.FC<{
  label: string
  type?: "Date" | "DateTime" | "Time"
  defaultStartTime?: number
  defaultEndTime?: number
  disableStartTime?: boolean
  disableEndTime?: boolean
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  required?: boolean
  onChange?: (beginTime: Date, endTime: Date) => void
  detailPadding?: boolean
}> = props => {
  const type = props.type ? props.type : "Date"
  const initStartTime = props.defaultStartTime ? new Date(props.defaultStartTime) : new Date()
  const initEndTime = props.defaultEndTime ? new Date(props.defaultEndTime) : new Date()
  initStartTime.setMinutes(0)
  initEndTime.setMinutes(0)

  const [start, setStart] = React.useState<Date>(initStartTime);
  const [end, setEnd] = React.useState<Date>(initEndTime);


  useEffect(() => {
    if (!!props.defaultStartTime) setStart(new Date(props.defaultStartTime))
    if (!!props.defaultEndTime) setEnd(new Date(props.defaultEndTime))
  }, [props.defaultStartTime, props.defaultEndTime])

  const handlerBeginDate = (newValue: Date | null) => {
    if (newValue) {
      newValue.setMinutes(0)
      setStart(newValue)
      if (props.onChange)
        props.onChange(newValue, end)
    }
  }
  const handlerEndDate = (newValue: Date | null) => {
    if (newValue) {
      newValue.setMinutes(0)
      setEnd(newValue)
      if (props.onChange)
        props.onChange(start, newValue)
    }
  }

  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <Stack className={'Calendar-Test'} direction="row" spacing={2} alignItems={"center"}>
          <FormControl fullWidth sx={{paddingY: props.detailPadding ? '5px' : 0}}>
            {
              type === "DateTime" &&
              <DateTimePicker
                value={start}
                inputFormat={"yyyy-MM-dd hh:mm a"}
                disabled={props.disableStartTime}
                openTo={"day"}
                views={['year', 'month', 'day', 'hours']}
                components={{
                  OpenPickerIcon: Icons.Calendar
                }}
                onChange={handlerBeginDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            }
            {
              type === "Date" &&
              <DatePicker
                value={start}
                PaperProps={{
                  sx: {
                    '& .css-l0iinn, e1de0imv0': {position: 'absolute', left: '35%'},
                    '& .MuiPickersArrowSwitcher-spacer': {width: '200px'}
                  }
                }}
                inputFormat={"yyyy-MM-dd"}
                mask={"____-__-__"}
                disabled={props.disableStartTime}
                openTo={"day"}
                views={['year', 'month', 'day']}
                components={{
                  OpenPickerIcon: Icons.Calendar
                  // }}
                  // renderDay={(date,selectedDays,pickersDayProps)=>{
                  //   return <DatePicker
                  //     {...pickersDayProps}
                  //   />
                }}
                onChange={handlerBeginDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            }
            {
              type === "Time" &&
              <TimePicker
                value={start}
                inputFormat={"hh:mm a"}
                disabled={props.disableStartTime}
                openTo={"hours"}
                views={['hours']}
                onChange={handlerBeginDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            }
          </FormControl>
          <span>~</span>
          <FormControl fullWidth>
            {
              type === "DateTime" &&
              <DateTimePicker
                value={end}
                inputFormat={"yyyy-MM-dd hh:mm a"}
                disabled={props.disableEndTime}
                openTo={"day"}
                views={['year', 'month', 'day', 'hours']}
                components={{
                  OpenPickerIcon: Icons.Calendar
                }}
                onChange={handlerEndDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            }
            {
              type === "Date" &&
              <DatePicker
                value={end}
                PaperProps={{
                  sx: {
                    '& .css-l0iinn, e1de0imv0': {position: 'absolute', left: '35%'},
                    '& .MuiPickersArrowSwitcher-spacer': {width: '200px'},
                    '& MuiButtonBase-root MuiPickersDay-root MuiPickersDay-dayWithMargin e1de0imv0 css-bkrceb-MuiButtonBase-root-MuiPickersDay-root e1de0imv0': {color: 'red'}
                  }
                }}
                inputFormat={"yyyy-MM-dd"}
                mask={"____-__-__"}
                disabled={props.disableEndTime}
                openTo={"day"}
                views={['year', 'month', 'day']}
                components={{
                  OpenPickerIcon: Icons.Calendar
                }}
                onChange={handlerEndDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            }

            {
              type === "Time" &&
              <TimePicker
                value={end}
                inputFormat={"hh:mm a"}
                disabled={props.disableEndTime}
                openTo={"hours"}
                views={['hours']}
                onChange={handlerEndDate}
                renderInput={(params: any) => <TextField {...params} />}
              />
            }
          </FormControl>
        </Stack>
      </LocalizationProvider>
    </TableBodyCell>
  </>
}

export const TableDateCell: React.FC<{
  label: string
  defaultTime?: string
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  onChange?: (date: Date) => void
}> = props => {
  const initTime = props.defaultTime ? new Date(props.defaultTime) : new Date()
  const [start, setStart] = React.useState<Date | null>(initTime)

  const onChangeHandler = (newValue: Date | null) => {
    if (newValue) {
      setStart(newValue);
      if (props.onChange) props.onChange(newValue);
    }
  };

  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined}}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <FormControl fullWidth>
            <DatePicker
              value={start}
              openTo={"day"}
              views={['year', 'month', 'day']}
              components={{
                OpenPickerIcon: Icons.Calendar
              }}
              onChange={onChangeHandler}
              renderInput={(params) => <TextField {...params} />}
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
  tdWidth?: string | number
  division?: boolean
  onClick?: (selected: string) => void
  required?: boolean
}> = props => {
  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
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

export const TableCheckboxCell: React.FC<{
  label: string;
  checkboxs: string[];
  defaultSelected?: string[];
  row?: boolean;
  thSpan?: number;
  thWidth?: string | number;
  tdSpan?: number;
  tdWidth?: string | number;
  division?: boolean;
  onClick?: (selected: string[]) => void;
  required?: boolean;
}> = (props) => {
  return (
    <>
      <TableHeaderCell
        width={props.thWidth}
        colSpan={props.thSpan}
        style={{borderRight: '1px solid #d7dae6'}}
      >
        {props.label}
        {props.required && (
          <em
            style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}
          >
            *
          </em>
        )}
      </TableHeaderCell>
      <TableBodyCell
        width={props.tdWidth}
        colSpan={props.tdSpan}
        sx={{borderRight: props.division ? '1px solid #d7dae6' : undefined}}
      >
        <CustomCheckBoxs
          row={props.row}
          defaultSelected={props.defaultSelected}
          checkbox={props.checkboxs}
          onClick={(selected: string[]) => {
            if (props.onClick) props.onClick(selected);
          }}
        />
      </TableBodyCell>
    </>
  );
};

export interface AddressParam {
  zonecode: string
  address: string
  detailAddress: string
}

export const TableAddressCell: React.FC<{
  label: string
  default?: AddressParam
  required?: boolean
  thSpan?: number
  thWidth?: string | number
  tdSpan?: number
  tdWidth?: string | number
  division?: boolean
  onOpen: () => void
  onChange?: (address: AddressParam) => void
}> = props => {
  const [value, setValue] = useState<AddressParam>(props.default || {
    zonecode: '', address: '', detailAddress: ''
  })

  useEffect(() => {
    if (!!props.default) {
      setValue(props.default)
    }
  }, [props.default])

  const handleChange = (e: any) => {
    const {value, name} = e.target;
    const newData = {
      ...value,
      [name]: value
    }
    if (props.onChange) props.onChange(newData)
    setValue(newData);
  }

  return <>
    <TableHeaderCell width={props.thWidth} colSpan={props.thSpan} style={{borderRight: "1px solid #d7dae6"}}>
      {props.label}
      {props.required && <em style={{paddingLeft: '3px', color: 'skyblue', fontSize: '16px'}}>*</em>}
    </TableHeaderCell>
    <TableBodyCell
      width={props.tdWidth}
      colSpan={props.tdSpan}
      sx={{borderRight: props.division ? "1px solid #d7dae6" : undefined, padding: "15px"}}
    >
      <Stack spacing={'10px'} paddingY={'10px'}>
        <Stack direction={'row'} spacing={'15px'} alignItems={'center'}>
          <TextField
            value={value.zonecode}
            name={'zonecode'}
            sx={{width: '80px'}}
            variant={"outlined"}
            size={"small"}
            onChange={handleChange}/>
          <CustomButton type={"small"} color={"list"} label={"주소찾기"} onClick={props.onOpen}/>
        </Stack>
        <Stack direction={'row'} spacing={'15px'}>
          <TextField
            value={value.address}
            required={props.required}
            name={props.label}
            variant={"outlined"}
            size={"small"}
            onChange={handleChange}/>
          <TextField
            value={value.detailAddress}
            name={`상세${props.label}`}
            required={props.required}
            variant={"outlined"}
            size={"small"}
            onChange={handleChange}/>
        </Stack>
      </Stack>
    </TableBodyCell>
  </>
}
// 서치 박스만들떄도 tableCell 컴포넌트를 사용할떄 높이값을 다른게 주기 위함.
export const SearchTable = styled(Table)`
  .MuiTableRow-root {
    height: 72px;
  }
`

export const TableHeaderCell = styled(TableCell)`
  height: 56px;
  color: #222;
  font-weight: 600;
`
export const TableBodyCell = styled(TableCell)`
  padding: 10px 10px;
  align-items: center;
  align-content: center;
  color: ${Color.brownishGrey}
`

export const CheckboxStyle = styled(Checkbox)`
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 3px;

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
    border: 1px solid #d8dbe7;
    border-radius: 3px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 6px;
    margin: -4px 0 0 -5px;
    border-left: 2px solid #d8dbe7;
    border-bottom: 2px solid #d8dbe7;
    transform: rotate(-45deg);
  }

  &.Mui-checked {
    &:before {
      border-color: #4063ec;
      background-color: #4063ec;
    }

    &:after {
      border-color: #fff;
    }
  }
`;

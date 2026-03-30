import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Pagination } from '~/components/LayoutComponents';
import styled from '@emotion/styled';

export interface CustomHeadCell<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
}

export interface CustomRowData<T> {
  key: string;
}

export const TableComponents: React.FC<{
  headCells: CustomHeadCell<any>[];
  bodyRows: CustomRowData<any>[];
  tableCell: (index: number) => JSX.Element;
  isCheckBox?: boolean;
  handleClick?: (key: string) => void;
}> = (props) => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.bodyRows.map((n) => n.key);
      setSelected(newSelecteds);
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

  const rowCount = props.bodyRows.length;
  const totalPage =
    rowCount <= rowsPerPage ? 1 : Math.floor(rowCount / rowsPerPage + 1);

  return (
    <Box sx={{ width: '100%' }} paddingX={2}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'small'}
        >
          <EnhancedTableHead
            headCells={props.headCells}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rowCount}
            isCheckBox={props.isCheckBox}
          />

          <EnhancedTableBody
            rows={props.bodyRows}
            page={page}
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
          setPage(0);
        }}
      />
    </Box>
  );
};

const EnhancedTableHead: React.FC<{
  headCells: CustomHeadCell<any>[];
  numSelected: number;
  rowCount: number;
  isCheckBox?: boolean;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { onSelectAllClick, numSelected, rowCount, isCheckBox } = props;

  return (
    <TableHead style={{ backgroundColor: 'gray' }}>
      <TableRow>
        {isCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
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
  rows: CustomRowData<any>[];
  page: number;
  rowsPerPage: number;
  isSelected: (name: string) => boolean;
  tableCell: (index: number) => JSX.Element;
  handleClick: (
    event: React.MouseEvent<HTMLTableRowElement>,
    name: string
  ) => void;
  isCheckBox?: boolean;
}> = (props) => {
  const { page, rowsPerPage, isSelected, handleClick, isCheckBox } = props;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <TableBody>
      {props.rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
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
              }}
            >
              {isCheckBox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </TableCell>
              )}
              {props.tableCell(index + page * rowsPerPage)}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 33 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};


const TableHeaderCell = styled(TableCell)`
  height: 72px;
  color: #222;
  font-weight: 700;
`
const TableBodyCell = styled(TableCell)`
  padding: 0 10px;
`

export const CheckboxStyle = styled(Checkbox)`
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
      background:  url('/images/common/checkbox_active.png');
    }
    .MuiSvgIcon-root{
      background: none;
    }
  }
`;

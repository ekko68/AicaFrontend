import Box from '@mui/material/Box';
import {
  DataGrid,
  DataGridProps, GridCellEditCommitParams,
  MuiBaseEvent, MuiEvent,
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {Pagination} from "~/components/LayoutComponents";
import * as React from "react";
import {GridSelectionModel} from "@mui/x-data-grid/models/gridSelectionModel";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";

export const DataTable: React.FC<DataGridProps & {
  height?: string
  isCheckBox?: boolean
  onCellEditCommit?: (params: GridCellEditCommitParams) => void
  onSelectionModelChange?: (selectionModel: GridSelectionModel) => void
}> = props => {
  const options = Object.assign({rowsPerPageOptions: [5, 10, 15]}, props);

  return <Box sx={{
    width: '100%',
    height: props.height? props.height : '400px',
  }}>
    <DataGrid
      {...options}
      // autoHeight
      checkboxSelection={props.isCheckBox}
      pagination
      paginationMode="server"
      components={{Footer, ...{LoadingOverlay: LinearProgress}}}
      componentsProps={{footer: options}}
      onCellEditCommit={(params: GridCellEditCommitParams, event: MuiEvent<MuiBaseEvent>) => {
        if (props.onCellEditCommit) props.onCellEditCommit(params)
      }}
      onSelectionModelChange={(selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
        if (props.onSelectionModelChange) props.onSelectionModelChange(selectionModel)
      }}
    />
  </Box>
}

const Footer: React.FC<{
  rowsPerPageOptions: number[],
  rowCount: number,
  pageSize: number,
  page: number,
  onPageSizeChange: (value: number) => void,
  onPageChange: (value: number) => void,
}> = props => {
  const handleChange = (e: any) => {
    props.onPageSizeChange(e.target.value);
  };

  const totalPage = props.rowCount <= props.pageSize ? 1 : Math.floor((props.rowCount / props.pageSize) + 1);

  return <Pagination
    curPage={props.page}
    totalPage={totalPage}
    rowsPerPage={props.pageSize}
    handleChangePage={(event: unknown, newPage: number) => {
      props.onPageChange(newPage - 1);
    }}
    handleChangeRowsPerPage={handleChange}
    style={{padding: "10px 0"}}
  />
}

export default DataTable;

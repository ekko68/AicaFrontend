import React from 'react';
import { CssBaseline, Stack, FormControl, TableCell } from '@mui/material';
import { TableComponents } from 'shared/components/TableComponents';
import { bodyRows, headCells } from '~/pages/Temp/DummyData';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import {
  CustomButton,
  CustomCheckBoxs,
  CustomRadioButtons,
  CustomIconButton
} from 'shared/components/ButtonComponents';
import { BlockContents } from 'shared/components/LayoutComponents';
import { Icons } from 'shared/components/IconContainer';
import Modal from '@mui/material/Modal';

// 사업정보관리/ -> 기준사업정보관리 페이지
const BusInformationMgt = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [value1, setValue1] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const Table = () => {
    return (<div/>
      // <TableComponents
      //   {...pagination}
      //   isCheckBox
      //   headCells={headCells}
      //   bodyRows={bodyRows}
      //   handleClick={(key: string) => {
      //     console.log(key);
      //   }}
      //   tableCell={(index: number) => {
      //     const data = bodyRows.at(index) as any;
      //
      //     return (
      //       <>
      //         {data ? (
      //           <>
      //             <TableCell sx={{ paddingLeft: 1 }}>{data.name}</TableCell>
      //             <TableCell align="right">{data.calories}</TableCell>
      //             <TableCell align="right">{data.fat}</TableCell>
      //             <TableCell align="right">{data.carbs}</TableCell>
      //             <TableCell align="right">{data.protein}</TableCell>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //       </>
      //     );
      //   }}
      // />
    );
  };
  return (
    <div className="main-container">
      <div className='minWidth'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='modal-content'
        >
          <div className='modal-box large'>
            <BlockContents 
              title={'메뉴명'}
            ></BlockContents>
            <div className="btn_close_top">
              <CustomIconButton onClick={handleClose} icon={Icons.Exit} />
            </div>
            <div className="search-table">
              <table>
                <colgroup>
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '38%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '38%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>항목명</th>
                    <td>
                      <div className="formSet">
                        <FormControl size="small" fullWidth>
                          <Select value={age} onChange={handleChange} displayEmpty>
                            <MenuItem value="">전체</MenuItem>
                            <MenuItem value="{2}">현역</MenuItem>
                            <MenuItem value="{3}">전역</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </td>
                    <th>검색항목</th>
                    <td>
                      <div className='selectBtnSet'>
                        <FormControl size="small" fullWidth>
                          <Select value={age} onChange={handleChange} displayEmpty>
                            <MenuItem value="">전체</MenuItem>
                            <MenuItem value="{2}">현역</MenuItem>
                            <MenuItem value="{3}">전역</MenuItem>
                          </Select>
                        </FormControl>
                        <CustomButton label={'검색'} type={'small'} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="dataTable">
              <div className="dataTable_header">
                <div className="total">
                  TOTAL<span>30</span>
                </div>
                <div className="ctrl_buttons">
                  <CustomButton label={'버튼'} type={'small'} color={'list'} />
                </div>
              </div>
              <Table />
            </div>
            <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} mt={'48px'}>
              <CustomButton label={'취소'} color={'secondary'} onClick={handleClose} />
              <CustomButton label={'확인'} />
            </Stack>
          </div>
        </Modal>
        <CssBaseline />
        <BlockContents title={'기준사업정보관리'}></BlockContents>
        <div className="search-table">
          <table>
            <colgroup>
              <col style={{ width: '12%' }} />
              <col style={{ width: '38%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '38%' }} />
            </colgroup>
            <tbody>
              <tr>
                <th>항목명</th>
                <td>
                  <div className="formSet">
                    <div className="select">
                      <FormControl size="small">
                        <Select value={age} onChange={handleChange} displayEmpty>
                          <MenuItem value="">전체</MenuItem>
                          <MenuItem value="{2}">현역</MenuItem>
                          <MenuItem value="{3}">전역</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="datePicker">
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={value1}
                            onChange={(newValue1) => {
                              setValue1(newValue1);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="dash">~</div>
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={value2}
                            onChange={(newValue2) => {
                              setValue2(newValue2);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                </td>
                <th>항목명</th>
                <td>
                  <div className="radioSet">
                    <FormControl>
                      <CustomRadioButtons
                        row
                        data={['전체', '현역', '전역']}
                        onClick={(selected) => {
                          console.log(selected);
                        }}
                      />
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <th>항목명</th>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                </td>
                <th>항목명</th>
                <td>
                  <CustomCheckBoxs
                    row
                    checkbox={['전체', '현역', '전역']}
                    onClick={(s: string[]) => {
                      if (s.length > 0) console.log(s);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>항목명</th>
                <td>
                  <div className="select">
                    <FormControl fullWidth size="small">
                      <Select value={age} onChange={handleChange} displayEmpty>
                        <MenuItem value="">전체</MenuItem>
                        <MenuItem value="{2}">현역</MenuItem>
                        <MenuItem value="{3}">전역</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </td>
                <th>항목명</th>
                <td>
                  <div className="select">
                    <div className="inputDouble">
                      <FormControl size="small">
                        <Select value={age} onChange={handleChange} displayEmpty>
                          <MenuItem value="">전체</MenuItem>
                          <MenuItem value="{2}">현역</MenuItem>
                          <MenuItem value="{3}">전역</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl size="small">
                        <Select value={age} onChange={handleChange} displayEmpty>
                          <MenuItem value="">전체</MenuItem>
                          <MenuItem value="{2}">현역</MenuItem>
                          <MenuItem value="{3}">전역</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="center-button">
                  <CustomButton label={'검색'} type={'large'} onClick={handleOpen} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dataTable">
          <div className="dataTable_header">
            <div className="total">
              TOTAL<span>30</span>
            </div>
            <div className="ctrl_buttons">
              <CustomIconButton icon={Icons.FileDownload} startText={'엑셀저장'} style={{height:'40px',marginRight:'10px',borderRadius:'5px',fontSize:'16px',fontWeight:'bold'}}/>
              <CustomButton label={'목록 버튼'} type={'small'} color={'list'} />
            </div>
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default BusInformationMgt;

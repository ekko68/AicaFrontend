// 사업/시설 -> 사업예약 페이지
import React from "react"
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { BlockContents } from 'shared/components/LayoutComponents';
import { Icons } from 'shared/components/IconContainer';
import { CustomButton, CustomRadioButtons, CustomIconButton } from 'shared/components/ButtonComponents';
import Modal from '@mui/material/Modal';


function EvalPlanMgt() {
  const [age, setAge] = useState('');
  const [value1, setValue1] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectHandleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="main-container">
      <div className="minWidth">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='modal-content'
        >
          <div className='modal-box middle popup'>
            <div className="btn_close_top">
              <CustomIconButton onClick={handleClose} icon={Icons.Exit} />
            </div>
            <div className="popup_content">
              <img src='https://picsum.photos/780/600?random=1' alt="test" />
            </div>
            <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} mt={'48px'}>
              <CustomButton label={'오늘은 그만 보기'} color={'outlined'} />
              <CustomButton label={'닫기'} onClick={handleClose} />
            </Stack>
          </div>
        </Modal>
        <BlockContents title={'홈팝업창 등록'}></BlockContents>
        <div className="tableDefault">
          <div className="table_header">
            <BlockContents
              title_sub={'기본정보'}
            ></BlockContents>
          </div>
          <table>
            <colgroup>
              <col style={{ width: '12%' }} />
              <col style={{ width: '38%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '38%' }} />
            </colgroup>
            <tbody>
            <tr>
              <th className="must">팝업명</th>
              <td colSpan={3}>
                <div className="inputCharNum">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                  <div className="right">50/50</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>이동경로(URL)</th>
              <td colSpan={3}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                />
              </td>
            </tr>
            <tr>
              <th className="must">전시기간</th>
              <td>
                <div className="datePicker withTime">
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
                    <FormControl size="small">
                      <Select
                        value={age}
                        onChange={selectHandleChange}
                        displayEmpty
                      >
                        <MenuItem value="">선택</MenuItem>
                        <MenuItem value="{1}">1시</MenuItem>
                        <MenuItem value="{2}">2시</MenuItem>
                        <MenuItem value="{3}">3시</MenuItem>
                        <MenuItem value="{4}">4시</MenuItem>
                        <MenuItem value="{5}">5시</MenuItem>
                        <MenuItem value="{6}">6시</MenuItem>
                        <MenuItem value="{7}">7시</MenuItem>
                        <MenuItem value="{8}">8시</MenuItem>
                        <MenuItem value="{9}">9시</MenuItem>
                        <MenuItem value="{10}">10시</MenuItem>
                        <MenuItem value="{11}">11시</MenuItem>
                        <MenuItem value="{12}">12시</MenuItem>
                      </Select>
                    </FormControl>
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
                    <FormControl size="small">
                      <Select
                        value={age}
                        onChange={selectHandleChange}
                        displayEmpty
                      >
                        <MenuItem value="">선택</MenuItem>
                        <MenuItem value="{1}">1시</MenuItem>
                        <MenuItem value="{2}">2시</MenuItem>
                        <MenuItem value="{3}">3시</MenuItem>
                        <MenuItem value="{4}">4시</MenuItem>
                        <MenuItem value="{5}">5시</MenuItem>
                        <MenuItem value="{6}">6시</MenuItem>
                        <MenuItem value="{7}">7시</MenuItem>
                        <MenuItem value="{8}">8시</MenuItem>
                        <MenuItem value="{9}">9시</MenuItem>
                        <MenuItem value="{10}">10시</MenuItem>
                        <MenuItem value="{11}">11시</MenuItem>
                        <MenuItem value="{12}">12시</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </td>
              <th>새창여부</th>
              <td>
                <CustomRadioButtons
                  row
                  data={['예', '아니오']}
                  onClick={(selected) => {
                    console.log(selected);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th className="must">팝업창 폭 크기</th>
              <td>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                />
              </td>
              <th>팝업창 높이 크기</th>
              <td>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div  className="tableDefault">
          <div className="table_header">
            <BlockContents
              title_sub={'이미지'}
              title_must={'must'}
              rightContent={
                <Stack flexDirection={'row'}>
                  <CustomButton
                    label={'등록'}
                    type={'small'}
                    color={'list'}
                  />
                </Stack>
              }
            ></BlockContents>
          </div>
          <table>
            <tbody>
            <tr>
              <td>
                <div className="bg-thumbnail popup">
                  <img src='https://picsum.photos/780/600?random=1' alt="thumbnail" />
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="list_btm">
          <CustomButton label={'목록'} type={'largeList'} color={'outlined'} />
          <div>
            <CustomButton label={'삭제'} type={'large'} color={'outlined_del'} />
            <CustomButton label={'미리보기'} type={'large'} color={'secondary'} onClick={handleOpen}/>
            <CustomButton label={'전시안함'} type={'large'} color={'primary'} />
            <CustomButton label={'저장'} type={'large'} color={'primary'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvalPlanMgt;

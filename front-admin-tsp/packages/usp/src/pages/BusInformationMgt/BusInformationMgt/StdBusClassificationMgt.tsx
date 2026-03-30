// 사업정보관리/ -> 기준사업분류관리 페이지
// import React from "react"
import { Tabs, Tab, Box, Checkbox, Stack, TextField,FormControl, Select, SelectChangeEvent } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { BlockContents } from 'shared/components/LayoutComponents';
import { Icons } from 'shared/components/IconContainer';
import { CustomButton, CustomRadioButtons, CustomIconButton } from 'shared/components/ButtonComponents';
import Modal from '@mui/material/Modal';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function StdBusClassificationMgt() {
  const [text, setText] = useState('내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.');//text defaultValue 오류처리
  const [text2, setText2] = useState('내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.');//text defaultValue 오류처리

  const [value, setValue] = useState(0);
  const [age, setAge] = useState('');
  const [value1, setValue1] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const selectHandleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className="main-container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal-content'
      >
        <div className='modal-box middle'>
          <BlockContents 
            title={'화면명'}
          ></BlockContents>
          <div className="btn_close_top">
            <CustomIconButton onClick={handleClose} icon={Icons.Exit} />
          </div>
          <div className="tableDefault">
            <table>
              <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '75%' }} />
              </colgroup>
              <tbody>
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
                </tr>
                <tr>
                  <th>항목명</th>
                  <td>
                    <div className="textarea-set">
                      <div className="inner">
                        <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value) }
                        >
                        </textarea>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} mt={'48px'}>
            <CustomButton label={'취소'} color={'secondary'} onClick={handleClose} />
            <CustomButton label={'확인'} />
          </Stack>
        </div>
      </Modal>
      <BlockContents title={'메뉴명'}></BlockContents>
      <Box sx={{ width: '100%' }} className='minWidth'>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="탭1" {...a11yProps(0)} />
            <Tab label="탭2" {...a11yProps(1)} />
            <Tab label="탭3" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="tableDefault">
            <BlockContents
              title_sub={'서브타이틀'}
              rightContent={
                <Stack flexDirection={'row'}>
                  <CustomButton
                    label={'섹션 버튼'}
                    type={'small'}
                    color={'list'}
                  />
                </Stack>
              }
            ></BlockContents>
            <table>
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '38%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '38%' }} />
              </colgroup>
              <tbody>
              <tr>
                <th className="must">항목명</th>
                <td colSpan={3}>
                  <div className="inputCharNum">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                    />
                    <div className="right">200/200</div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="must">항목명</th>
                <td>
                  <div className="select">
                    <FormControl size="small" fullWidth>
                      <Select
                        value={age}
                        onChange={selectHandleChange}
                        displayEmpty
                      >
                        <MenuItem value="">전체</MenuItem>
                        <MenuItem value="{2}">현역</MenuItem>
                        <MenuItem value="{3}">전역</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </td>
                <th className="must">항목명</th>
                <td>
                  <CustomRadioButtons
                      row
                      data={['선택항목1', '선택항목2']}
                      onClick={(selected) => {
                        console.log(selected);
                      }}
                    />
                </td>
              </tr>
              <tr>
                <th>항목명</th>
                <td>
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
                </td>
                <th>항목명1</th>
                <td>
                  <div className="select">
                    <div className="inputDouble time">
                      <FormControl size="small">
                        <Select
                          value={age}
                          onChange={selectHandleChange}
                          displayEmpty
                        >
                          <MenuItem value="">선택</MenuItem>
                          <MenuItem value="{1}">1</MenuItem>
                          <MenuItem value="{2}">2</MenuItem>
                          <MenuItem value="{3}">3</MenuItem>
                          <MenuItem value="{4}">4</MenuItem>
                          <MenuItem value="{5}">5</MenuItem>
                          <MenuItem value="{6}">6</MenuItem>
                          <MenuItem value="{7}">7</MenuItem>
                          <MenuItem value="{8}">8</MenuItem>
                          <MenuItem value="{9}">9</MenuItem>
                          <MenuItem value="{10}">10</MenuItem>
                          <MenuItem value="{11}">11</MenuItem>
                          <MenuItem value="{12}">12</MenuItem>
                        </Select>
                      </FormControl>
                      <span>시</span>
                      <FormControl size="small">
                        <Select
                          value={age}
                          onChange={selectHandleChange}
                          displayEmpty
                        >
                          <MenuItem value="">선택</MenuItem>
                          <MenuItem value="{10}">10</MenuItem>
                          <MenuItem value="{20}">20</MenuItem>
                          <MenuItem value="{30}">30</MenuItem>
                          <MenuItem value="{40}">40</MenuItem>
                          <MenuItem value="{50}">50</MenuItem>
                          <MenuItem value="{60}">60</MenuItem>
                        </Select>
                      </FormControl>
                      <span>분</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>항목명</th>
                <td>
                  <div className="inputCharNum">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                    />
                    <div className="right">
                      <CustomButton type={"small"} label={'선택'} color={'item'} />
                    </div>
                  </div>
                </td>
                <th></th>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="tableDefault">
            <div className="table_header">
              <BlockContents
                title_sub={'섹션명(첨부파일)'}
                rightContent={
                  <Stack flexDirection={'row'}>
                    <CustomIconButton icon={Icons.FileDownload} startText={'전체 다운로드'} style={{height:'40px',fontSize:'16px',fontWeight:'bold'}} />
                    <CustomIconButton icon={Icons.Trash} />
                    <CustomIconButton icon={Icons.Plus} />
                  </Stack>
                }
              ></BlockContents>
            </div>
            <table>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '80%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <tbody>
              <tr>
                <th>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </th>
                <th>번호</th>
                <th>파일명</th>
                <th>용량</th>
              </tr>
              <tr>
                <td>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </td>
                <td className="center">1</td>
                <td>파일명이 길때는 이렇게 처리했으면 좋겠습니다.pdf</td>
                <td className="center">2 MB</td>
              </tr>
              <tr>
                <td>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </td>
                <td className="center">2</td>
                <td>파일명.pdf</td>
                <td className="center">2 MB</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="tableDefault ">
            <div className="table_header">
              <BlockContents
                title_sub={'섹션명(템플릿 입력형)'}
                rightContent={
                  <Stack flexDirection={'row'}>
                    <CustomIconButton icon={Icons.Trash} />
                    <CustomIconButton icon={Icons.Plus} />
                  </Stack>
                }
              ></BlockContents>
            </div>
            <table>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '23%' }} />
                <col style={{ width: '72%' }} />
              </colgroup>
              <tbody>
              <tr>
                <td>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </td>
                <td className="center">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                  />
                </td>
                <td>
                  <div className="textarea-set">
                    <div className="inner">
                      <textarea
                      value={text2}
                      onChange={(e) => setText2(e.target.value) }
                      >
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                        내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.
                      </textarea>
                    </div>
                    <div className="countNum">200/200</div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="tableDefault ">
            <div className="table_header">
              <BlockContents
                title_sub={'섹션명(입력창 추가형)'}
              ></BlockContents>
            </div>
            <table>
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '88%' }} />
              </colgroup>
              <tbody>
              <tr>
                <th className='tal pl-30'>항목명</th>
                <td>
                  <div className="input-field-set">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      placeholder="항목명"
                    />
                    <CustomIconButton icon={Icons.CancelSquareOutline} />
                  </div>
                  <div className="input-field-set">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      placeholder="항목명"
                    />
                    <CustomIconButton icon={Icons.CancelSquareOutline} />
                    <CustomIconButton icon={Icons.PlusSquareFill} onClick={handleOpen} />
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="tableDefault ">
            <div className="table_header">
              <BlockContents
                title_sub={'섹션명(입력목록 추가형)'}
                rightContent={
                  <Stack flexDirection={'row'}>
                    <CustomIconButton icon={Icons.Trash} />
                    <CustomIconButton icon={Icons.Plus} />
                  </Stack>
                }
              ></BlockContents>
            </div>
            <table>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} />
              </colgroup>
              <tbody>
              <tr>
                <th>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </th>
                <th>항목명</th>
                <th>항목명</th>
                <th>항목명</th>
                <th>항목명</th>
                <th>항목명</th>
                <th>항목명</th>
              </tr>
              <tr>
                <td>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="checkboxSet">
                    <Checkbox {...label} />
                  </div>
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="항목명"
                    className="tac"
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="list_btm">
            <CustomButton label={'목록'} type={'largeList'} color={'outlined'} />
            <div>
            <CustomButton label={'부버튼'} type={'large'} color={'secondary'} />
              <CustomButton label={'주버튼'} type={'large'} color={'primary'} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
}

export default StdBusClassificationMgt;

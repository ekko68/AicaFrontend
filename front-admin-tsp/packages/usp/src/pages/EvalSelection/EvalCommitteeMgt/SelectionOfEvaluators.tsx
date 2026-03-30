// 사업/시설 -> 사업단소개 페이지
import React from "react"
import { Tabs, Tab, Box, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { BlockContents } from 'shared/components/LayoutComponents';
import { Icons } from 'shared/components/IconContainer';
import { CustomButton, CustomRadioButtons, CustomIconButton } from 'shared/components/ButtonComponents';
import Modal from '@mui/material/Modal';

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

function SelectionOfEvaluators() {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState<Date | null>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = useState('내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.');//text defaultValue 오류처리
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
            title={'전문분야설정'}
          ></BlockContents>
          <div className="btn_close_top">
            <CustomIconButton onClick={handleClose} icon={Icons.Exit} />
          </div>
          <div className="tableDefault topBdrBlue">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="scroll_inner" style={{height:'360px'}}>
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                        입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용 입력 내용  입력 내용 입력 내용 입력 내용 입력 내용 입력 내용
                      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} mt={'-16px'} mb={'38px'}>
            <CustomButton label={'선택완료'} />
          </Stack>
        </div>
      </Modal>
      <div className="minWidth">
      <BlockContents title={'이용약관 상세'}></BlockContents>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="이용약관" {...a11yProps(0)} />
          <Tab label="개인정보처리방침" {...a11yProps(1)} />
          <Tab label="개인정보 수집 및 활용동의" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={2.7}>
            <div className="tableDefault">
              <div className="table_header agreement">
                <CustomRadioButtons
                  row
                  data={['오늘기준', '전체']}
                  onClick={(selected) => {
                    console.log(selected);
                  }}
                />
                <CustomButton label={'조회'} type={'small'} />
              </div>
              <table>
                <colgroup>
                  <col style={{width:'35%'}} />
                  <col style={{width:'65%'}} />
                </colgroup>
                <thead>
                  <tr>
                    <th>상세</th>
                    <th>시행일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <CustomButton label={'상세'} type={'small'} color={'item'} />
                    </td>
                    <td className="tac">2022-05-23</td>
                  </tr>
                  <tr>
                    <td>
                      <CustomButton label={'상세'} type={'small'} color={'item'} />
                    </td>
                    <td className="tac">2022-05-23</td>
                  </tr>
                  <tr>
                    <td>
                      <CustomButton label={'상세'} type={'small'} color={'item'} />
                    </td>
                    <td className="tac">2022-05-23</td>
                  </tr>
                  <tr>
                    <td>
                      <CustomButton label={'상세'} type={'small'} color={'item'} />
                    </td>
                    <td className="tac">2022-05-23</td>
                  </tr><tr>
                    <td>
                      <CustomButton label={'상세'} type={'small'} color={'item'} />
                    </td>
                    <td className="tac">2022-05-23</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={9.3}>
            <div className="tableDefault">
              <div className="table_header">
              <BlockContents
                title_sub={'약관내용'}
                rightContent={
                  <Stack flexDirection={'row'}>
                    <CustomButton
                      label={'미리보기'}
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
                  <td style={{padding:"16px 10px"}}>
                    <div className="textarea-set">
                      <div className="inner" style={{height:'255px'}}>
                        <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value) }
                        style={{minHeight:'237px'}}
                        >
                        </textarea> 
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="tal">
                    <CustomRadioButtons
                      row
                      data={['내용수정', '개정 및 시행 (시행일']}
                      onClick={(selected) => {
                        console.log(selected);
                      }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={value1}
                          onChange={(newValue1) => {
                            setValue1(newValue1);
                          }}
                          renderInput={(params) => <TextField {...params}
                          sx={{width: '169px'}}
                          />}
                        />
                      </LocalizationProvider>
                      <span style={{padding: '10px',display: 'inline-block',color: '#666'}}>)</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>
        <div className="list_btm">
          <CustomButton label={'목록'} type={'largeList'} color={'outlined'} />
          <CustomButton label={'저장'} type={'large'} color={'primary'} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomButton label={'전문분야설정 미리보기'} onClick={handleOpen} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        t3
      </TabPanel>
      </div>
    </div>
  );
}

export default SelectionOfEvaluators;

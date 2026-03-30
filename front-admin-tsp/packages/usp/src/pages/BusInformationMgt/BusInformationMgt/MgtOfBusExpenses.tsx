// 사업정보관리/ -> 사업비비목관리 페이지
// import React from "react"
import { Tabs, Tab, Box, Stack} from '@mui/material';
import { useState } from 'react';
import { BlockContents } from 'shared/components/LayoutComponents';
import { Icons } from 'shared/components/IconContainer';
import { CustomButton, CustomIconButton } from 'shared/components/ButtonComponents';
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
function MgtOfBusExpenses() {
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          <div className='modal-box small'>
            <BlockContents 
              title={'제목'}
            ></BlockContents>
            {/* 제목 없을시 title={''} 처럼 빈스페이스를 하나 넣어주셔야됩니다. */}
            <div className="btn_close_top">
              <CustomIconButton onClick={handleClose} icon={Icons.Exit} />
            </div>
            <div className='content_text tac'>
              내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 
            </div>
            <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} mt={'32px'}>
              {/* <CustomButton label={'취소'} color={'secondary'} onClick={handleClose} /> */}
              <CustomButton label={'확인'} />
            </Stack>
          </div>
        </Modal>
        <BlockContents title={'메뉴명'}></BlockContents>
        <Box sx={{ width: '100%' }}>
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
                title_sub={'섹션명(테이블형)'}
                rightContent={
                  <Stack flexDirection={'row'}>
                    <CustomButton
                      label={'섹션 버튼'}
                      type={'small'}
                      color={'list'}
                      onClick={handleOpen}
                    />
                  </Stack>
                }
              ></BlockContents>
              <table>
                <colgroup>
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '21%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '21%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '21%' }} />
                </colgroup>
                <tbody>
                <tr>
                  <th className='tal pl-30'>일시</th>
                  <td>
                    2022-05-13 14:30
                  </td>
                  <th className='tal pl-30'>텍스트</th>
                  <td>내용</td>
                  <th className='tal pl-30'>텍스트</th>
                  <td>내용</td>
                </tr>
                <tr>
                  <th className='tal pl-30'>항목명</th>
                  <td>내용</td>
                  <th className='tal pl-30'>항목명</th>
                  <td>내용</td>
                  <th className='tal pl-30'>항목명</th>
                  <td>
                    <div className='flex_bewteen'>
                    내용
                    <CustomButton label={'항목 버튼'} type={'small'} color={'item'} />
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="tableDefault">
              <div className="table_header">
                <BlockContents
                  title_sub={'섹션명(목록형)'}
                ></BlockContents>
              </div>
              <table>
                <colgroup>
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '46%' }} />
                </colgroup>
                <thead>
                <tr>
                  <th>번호</th>
                  <th>날짜</th>
                  <th>금액</th>
                  <th>숫자</th>
                  <th>기본</th>
                  <th>제목</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className='tac'>2022-05-13</td>
                    <td className="tar">1,000</td>
                    <td className='tac'>12345</td>
                    <td>텍스트</td>
                    <td className="ellipis">제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.</td>
                  </tr>
                  <tr>
                    <td className="tac">2</td>
                    <td className='tac'>2022-05-13</td>
                    <td className="tar">1,000</td>
                    <td className='tac'>12345</td>
                    <td>텍스트</td>
                    <td className="ellipis">제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className='tac'>2022-05-13</td>
                    <td className="tar">1,000</td>
                    <td className='tac'>12345</td>
                    <td>텍스트</td>
                    <td className="ellipis">제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td className='tac'>2022-05-13</td>
                    <td className="tar">1,000</td>
                    <td className='tac'>12345</td>
                    <td>텍스트</td>
                    <td className="ellipis">제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td className='tac'>2022-05-13</td>
                    <td className="tar">1,000</td>
                    <td className='tac'>12345</td>
                    <td>텍스트</td>
                    <td className="ellipis">제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.</td>
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
                    </Stack>
                  }
                ></BlockContents>
              </div>
              <table>
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '75%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <tbody>
                <tr>
                  <th>번호</th>
                  <th>파일명</th>
                  <th>용량</th>
                  <th>다운로드</th>
                </tr>
                <tr>
                  <td>
                    1
                  </td>
                  <td>파일명이 길때는 이렇게 처리했으면 좋겠습니다.pdf</td>
                  <td className="center">2 MB</td>
                  <td className="center"><CustomIconButton icon={Icons.FileDownload} /></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>파일명.pdf</td>
                  <td className="center">2 MB</td>
                  <td className="center"><CustomIconButton icon={Icons.FileDownload} /></td>
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
    </div>
  );
}

export default MgtOfBusExpenses;

// 사업/시설 -> 사업단소개 페이지
import React from "react"
import { useState } from 'react';
import { TextField, Grid, Stack, Checkbox } from '@mui/material';
import { BlockContents } from 'shared/components/LayoutComponents';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomButton, CustomRadioButtons, CustomIconButton } from 'shared/components/ButtonComponents';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Icons } from 'shared/components/IconContainer';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

function EvalSheetMgt() {
  const [text, setText] = useState('내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다. 내용을 입력합니다.');//text defaultValue 오류처리

  const [value1, setValue1] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);

  return (
    <div className="main-container">
      <BlockContents title={'행사/이벤트 등록'}></BlockContents>
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
              <th className="must">이벤트명</th>
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
              <td colSpan={3}><TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  /></td>
            </tr>
            <tr>
              <th className="must">진행기간</th>
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
                  <CustomRadioButtons
                    row
                    data={['예', '아니오']}
                    onClick={(selected) => {
                      console.log(selected);
                    }}
                  />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="tableDefault">
              <div className="table_header">
                <BlockContents
                  title_sub={'썸네일'}
                  title_must= {'must'}
                ></BlockContents>
              </div>
              <table>
                <colgroup>
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '50%' }} />
                </colgroup>
                <tbody>
                <tr>
                  <td>
                    <div className="table_header type02">
                      <div className="total">
                      PC
                      </div>
                      <div className="ctrl_buttons">
                        <CustomButton label={'첨부'} type={'small'} color={'item'} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table_header type02">
                      <div className="total">
                      모바일
                      </div>
                      <div className="ctrl_buttons">
                        <CustomButton label={'첨부'} type={'small'} color={'item'} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="bg-thumbnail">
                      <img src='https://picsum.photos/400/300?random=1' alt="thumbnail1" />
                    </div>
                  </td>
                  <td>
                    <div className="bg-thumbnail">
                      <img src='https://picsum.photos/300/300?random=2' alt="thumbnail2" />
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={6}>
          <div className="tableDefault">
              <div className="table_header">
                <BlockContents
                  title_sub={'이미지'}
                  title_must= {'must'}
                ></BlockContents>
              </div>
              <table>
                <colgroup>
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '50%' }} />
                </colgroup>
                <tbody>
                <tr>
                  <td>
                    <div className="table_header type02">
                      <div className="total">
                      PC
                      </div>
                      <div className="ctrl_buttons">
                        <CustomButton label={'첨부'} type={'small'} color={'item'} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table_header type02">
                      <div className="total">
                      모바일
                      </div>
                      <div className="ctrl_buttons">
                        <CustomButton label={'첨부'} type={'small'} color={'item'} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="bg-thumbnail"></div>
                  </td>
                  <td>
                    <div className="bg-thumbnail"></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>
        <div className="tableDefault ">
          <div className="table_header">
            <BlockContents
              title_sub={'상세정보'}
              rightContent={
                <Stack flexDirection={'row'}>
                  <CustomIconButton icon={Icons.Trash} />
                  <CustomIconButton icon={Icons.Plus} />
                </Stack>
              }
            ></BlockContents>
          </div>
          <table>
            <tbody>
            <tr>
              <td>
                <div className="textarea-set">
                  <div className="inner">
                    <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value) }
                    >
                    </textarea>
                  </div>
                  <div className="countNum">200/200</div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="tableDefault">
          <div className="table_header">
            <BlockContents
              title_sub={'첨부파일'}
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
              <td>성과공유회 발표자료.pdf</td>
              <td className="center">2 MB</td>
            </tr>
            <tr>
              <td>
                <div className="checkboxSet">
                  <Checkbox {...label} />
                </div>
              </td>
              <td className="center">2</td>
              <td>신청시 첨부서류.pdf</td>
              <td className="center">2 MB</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="list_btm">
          <CustomButton label={'목록'} type={'largeList'} color={'outlined'} />
          <CustomButton label={'저장'} type={'large'} color={'primary'} />
        </div>
    </div>
  );
}

export default EvalSheetMgt;

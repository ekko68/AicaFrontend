// 커뮤니티/ ->  사업단 소개 페이지
import React from "react"
import { Checkbox, Stack, TextField, FormControl } from '@mui/material';
import { BlockContents } from 'shared/components/LayoutComponents';
import {} from '@mui/material';
import { Icons } from 'shared/components/IconContainer';
import { CustomButton, CustomIconButton } from 'shared/components/ButtonComponents';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

function RegularReceptionMgt() {
  const [age, setAge] = React.useState('');
  const selectHandleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
      <div className="main-container" >
        <div className="minWidth">
          <BlockContents 
          title={'기준사업분류 관리'}
          rightContent={
            <div className="rightContent">홈 &gt; 메뉴명 &gt; 화면명</div>
          }
          ></BlockContents>
          <Grid container>
            <Grid xs={3} item={true} alignItems="stretch" style={{backgroundColor:'#ccc'}}></Grid>
            <Grid xs={9} item={true} style={{paddingLeft:'20px'}}>
              <div className="tableDefault">
                <div className="table_header">
                  <BlockContents
                    title_sub={'AICA 사업단'}
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
                    <col style={{ width: '7%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '62%' }} />
                    <col style={{ width: '16%' }} />
                  </colgroup>
                  <tbody>
                  <tr>
                    <th>
                      <div className="checkboxSet">
                        <Checkbox {...label} />
                      </div>
                    </th>
                    <th>순서</th>
                    <th>순서변경</th>
                    <th>분류명</th>
                    <th>사용여부</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkboxSet">
                        <Checkbox {...label} />
                      </div>
                    </td>
                    <td className="center">1</td>
                    <td className="center">
                      <CustomIconButton icon={Icons.Equal} />
                    </td>
                    <td><TextField fullWidth value='예비사업자지원사업'/></td>
                    <td className="center">
                    <FormControl size="small" fullWidth>
                      <Select
                            value={age}
                            onChange={selectHandleChange}
                            displayEmpty
                            autoWidth
                          >
                        <MenuItem value="">사용</MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                    </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkboxSet">
                        <Checkbox {...label} />
                      </div>
                    </td>
                    <td className="center">2</td>
                    <td className="center"><CustomIconButton icon={Icons.Equal} /></td>
                    <td><TextField fullWidth value='스타트업자지원사업'/></td>
                    <td className="center">
                    <FormControl size="small" fullWidth>
                      <Select
                            value={age}
                            onChange={selectHandleChange}
                            displayEmpty
                            autoWidth
                          >
                        <MenuItem value="">사용</MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                    </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkboxSet">
                        <Checkbox {...label} />
                      </div>
                    </td>
                    <td className="center">3</td>
                    <td className="center"><CustomIconButton icon={Icons.Equal} /></td>
                    <td><TextField fullWidth value='인재양성사업'/></td>
                    <td className="center">
                    <FormControl size="small" fullWidth>
                      <Select
                            value={age}
                            onChange={selectHandleChange}
                            displayEmpty
                            autoWidth
                          >
                        <MenuItem value="">사용</MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                    </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkboxSet">
                        <Checkbox {...label} />
                      </div>
                    </td>
                    <td className="center">5</td>
                    <td className="center"><CustomIconButton icon={Icons.Equal} /></td>
                    <td><TextField fullWidth value='글로벌진출사업'/></td>
                    <td className="center">
                    <FormControl size="small" fullWidth>
                      <Select
                            value={age}
                            onChange={selectHandleChange}
                            displayEmpty
                            autoWidth
                          >
                        <MenuItem value="">사용</MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                    </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkboxSet">
                        <Checkbox {...label} />
                      </div>
                    </td>
                    <td className="center">6</td>
                    <td className="center"><CustomIconButton icon={Icons.Equal} /></td>
                    <td><TextField fullWidth value='입력한 내용'/></td>
                    <td className="center">
                    <FormControl size="small" fullWidth>
                      <Select
                            value={age}
                            onChange={selectHandleChange}
                            displayEmpty
                          >
                        <MenuItem value="">사용</MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                    </FormControl>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <Stack flexDirection={'row'} style={{marginTop:'40px'}} justifyContent={'right'}>
                <CustomButton label={'저장'} />
              </Stack>
            </Grid>
          </Grid>
        </div>
      </div>
  );
}

export default RegularReceptionMgt;

import React, { useState,useEffect } from 'react'
import * as styles from '~/styles/styles';
import {useQuery,useMutation,useQueryClient, useQueries} from 'react-query';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import BreadCrumb from '~/components/BreadCrumb';
import { CustomButton } from '~/components/ButtonComponents';
import { LocalizationProvider } from '@mui/lab';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import { DataService } from '~/service/DataService';
import { reqEnterpriseType } from '~/models/Model';
import { ModalComponents } from '~/components/ModalComponents';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { fetchGetCommCode } from '~/fetches';
import { DateIcon } from '~/components/IconComponents';
/* 
  작성일    :   2022/06/05
  화면명    :   이페이지 -> 사용자지원 -> 기업정보관리
  회면ID    :   UI-USP-FRN-0060101
  화면/개발 :   Seongeonjoo / navycui
  // 모바일 작업안됨 추후수정예정
*/
const CorporateInfoMmt = () => {
  const navigate = useNavigate();
  const [formValues,setFormValues] = useState({open:false,title:'',message:''})
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const queryClient = useQueryClient();
  const [cmpnyTypebox, setCmpnyTypebox] = useState<reqEnterpriseType>({
    adres:'',
    ceoEmail:'',
    ceoTelno:'',
    cmpnyTypeCd:'',
    cmpnyTypeNm:'',
    emplyCnt:'',
    empmnPrearngeNmpr:'',
    fondDay:new Date(),
    fondPlanCd:'',
    fondPlanNm:'',
    fxnum:'',
    industRealmCd:'',
    industRealmNm:'',
    induty:'',
    mainInduty:'',
    mainTchnlgyProduct:'',
    newFntnPlanCd:'',
    newFntnPlanNm:'',
    reprsntTelno:'',
    resdngNmpr:'',
    zip:'',
  }); 

  const userQueries:any = useQueries( //todo ....
    [
    'CMPNY_TYPE',     // 기업유형
    'INDUST_REALM',   // 산업분야
    'NEW_FNTN_PLAN',  // 신규 창업 계획
    'FOND_PLAN'       // 이전 및 설립계획
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn:  () => fetchGetCommCode(TermsType),
      }
    })
  )

  // 기업정보 조회
  const { data:memInfo} = useQuery('getEnterprise', () => DataService.FetchEnterpriseGet({}));
  
  // 사업자 정보 저장
  const {mutate} = useMutation(async () => await DataService.FetchEnterprisePut(cmpnyTypebox), {
    onError: (error:any) => {
      // error
      setFormValues((pre)=>({...pre,title:error[0].status,open:true,message:error[0].message}))
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('getEnterprise')
      setFormValues((pre)=>({...pre,title:'성공!',open:true,message:'저장 되었습니다.'}))
    }
  });

  // 상태에 따라 셋팅
  useEffect(() => {
    if(!!memInfo) setCmpnyTypebox(memInfo);
  }, [memInfo]);

  // 기업정보 저장
  const handelOnSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  // change event
  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCmpnyTypebox((state:any) => ({ ...state, [name]: value }));
  }
  
  // Daum 우편번호 서비스
  const DaumPost = (data:any) => {
    setCmpnyTypebox((pre:any)=>({...pre,zip:data.zonecode,adres:data.address}))
  };

  // 주소 찾기 호출
  const handleClick = () => {
    open({ onComplete: DaumPost });
  };

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    setCmpnyTypebox((state:any) => ({ ...state, [event.target.name as string]: event.target.value as string }));
  };
  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className='benner'>
          <BreadCrumb />
          <div className='content'>
            <div className='txtbox'>
              <h2 className='tit'>기업정보관리</h2>
              <p>기업의 상세정보를 등록하고 관리할 수 있습니다. 입력한 정보는 사업신청 시 신청정보로 활용될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02} component='form' onSubmit={handelOnSubmit}>
        <div className='content'>
          <Box css={styles.table04}>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
            >
              {'기본정보'}
            </Typography>
              <table>
                <colgroup>
                  <col width='15%'></col>
                  <col width='35%'></col>
                  <col width='15%'></col>
                  <col width='35%'></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>산업분야</th>
                    <td className='table_input'>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                          // labelId="demo-simple-select-label"
                          id="industRealmCd"
                          name="industRealmCd"
                          value={cmpnyTypebox.industRealmCd}
                          // label="Age"
                          onChange={handleChange}
                        >
                          {
                            (userQueries[1]) ?
                            userQueries[1].map((option:any) => (
                                <MenuItem key={option.code} value={option.code}>
                                  {option.codeNm}
                                </MenuItem>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                    </td>
                    <th>기업/기관유형</th>
                    <td className='table_input'>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                          // labelId="demo-simple-select-label"
                          id="cmpnyTypeCd"
                          name="cmpnyTypeCd"
                          value={cmpnyTypebox.cmpnyTypeCd}
                          // label="Age"
                          onChange={handleChange}
                        >
                          {
                            (userQueries[0]) ?
                            userQueries[0].map((option:any) => (
                                <MenuItem key={option.code} value={option.code}>
                                  {option.codeNm}
                                </MenuItem>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td className='table_input'>
                      <DatePicker 
                        fondDay={cmpnyTypebox.fondDay} 
                        onChange={(val)=>{
                          setCmpnyTypebox((state:any) => ({ ...state, fondDay: val }));
                      }}/>
                    </td>
                    <th>종사자수</th>
                    <td className='table_input'>
                      <TextField
                        id='emplyCnt'
                        name='emplyCnt' 
                        variant='outlined'
                        value={cmpnyTypebox.emplyCnt}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                      <span className='ml8'>명</span>
                    </td>
                  </tr>
                  <tr>
                    <th>상주인원</th>
                    <td className='table_input'>
                      <TextField
                        id='resdngNmpr'
                        name='resdngNmpr' 
                        variant='outlined'
                        value={cmpnyTypebox.resdngNmpr}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                      <span className='ml8'>명</span>
                    </td>
                    <th>채용예정인력</th>
                    <td className='table_input'>
                      <TextField
                        id='empmnPrearngeNmpr'
                        name='empmnPrearngeNmpr' 
                        variant='outlined'
                        value={cmpnyTypebox.empmnPrearngeNmpr}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                      <span className='ml8'>명</span>
                    </td>
                  </tr>
                  <tr>
                    <th>업종</th>
                    <td className='table_input'>
                      <TextField
                        id='induty'
                        name='induty' 
                        variant='outlined'
                        value={cmpnyTypebox.induty}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th>주 업종</th>
                    <td className='table_input'>
                      <TextField
                        id='mainInduty'
                        name='mainInduty' 
                        variant='outlined'
                        value={cmpnyTypebox.mainInduty}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>주요기술 및 생산품</th>
                    <td className='table_input'>
                      <TextField
                        id='mainTchnlgyProduct'
                        name='mainTchnlgyProduct' 
                        variant='outlined'
                        value={cmpnyTypebox.mainTchnlgyProduct}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th className='table_input wh' colSpan={2}></th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>주소</th>
                    <td className='table_input noline'>
                      <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100%'}}>
                        <TextField
                          id='zip'
                          name='zip' 
                          variant='outlined'
                          value={cmpnyTypebox.zip}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                        <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={handleClick}/>
                      </Stack>
                    </td>
                  </tr>
                  <tr>
                    <td className='table_input'>
                      <TextField
                        id='adres'
                        name='adres' 
                        variant='outlined'
                        value={cmpnyTypebox.adres}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th className='table_input wh' colSpan={2}>
                      <TextField
                        id='adresDetail'
                        name='adresDetail' 
                        variant='outlined'
                        value={cmpnyTypebox.adres}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>대표전화</th>
                    <td className='table_input'>
                      <TextField
                        id='reprsntTelno'
                        name='reprsntTelno' 
                        variant='outlined'
                        value={cmpnyTypebox.reprsntTelno ? cmpnyTypebox.reprsntTelno : ''}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th>팩스</th>
                    <td className='table_input'>
                      <TextField
                        id='fxnum'
                        name='fxnum' 
                        variant='outlined'
                        value={cmpnyTypebox.fxnum ? cmpnyTypebox.fxnum : ''}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>대표자 연락처</th>
                    <td className='table_input'>
                      <TextField
                        id='ceoTelno'
                        name='ceoTelno' 
                        variant='outlined'
                        value={cmpnyTypebox.ceoTelno ? cmpnyTypebox.ceoTelno : ''}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th>대표자 이메일</th>
                    <td className='table_input'>
                      <TextField
                        id='ceoEmail'
                        name='ceoEmail'
                        type="email" 
                        variant='outlined'
                        value={cmpnyTypebox.ceoEmail ? cmpnyTypebox.ceoEmail : ''}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>신규창업계획</th>
                    <td className='table_input'>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                          // labelId="demo-simple-select-label"
                          id="newFntnPlanCd"
                          name="newFntnPlanCd"
                          value={cmpnyTypebox.newFntnPlanCd}
                          // label="Age"
                          onChange={handleChange}
                        >
                          {
                            (userQueries[2]) ?
                            userQueries[2].map((option:any) => (
                                <MenuItem key={option.code} value={option.code}>
                                  {option.codeNm}
                                </MenuItem>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                    </td>
                    <th>이전 및 설립계획</th>
                    <td className='table_input'>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                          // labelId="demo-simple-select-label"
                          id="fondPlanCd"
                          name="fondPlanCd"
                          value={cmpnyTypebox.fondPlanCd}
                          // label="Age"
                          onChange={handleChange}
                        >
                          {
                            (userQueries[3]) ?
                            userQueries[3].map((option:any) => (
                                <MenuItem key={option.code} value={option.code}>
                                  {option.codeNm}
                                </MenuItem>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <Typography
                gutterBottom
                variant='h6'
                component='div'
              >
                {'매출정보'}
              </Typography>
              <table>
                <colgroup>
                  <col width='15%'></col>
                  <col width='35%'></col>
                  <col width='15%'></col>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th>기준년도</th>
                    <td className='table_input'>
                      <TextField
                        id='baseYear'
                        name='baseYear' 
                        variant='outlined'
                        value={cmpnyTypebox.baseYear}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th>전년도 매출액</th>
                    <td className='table_input'>
                      <TextField
                        id='salesInThePreYear' 
                        variant='outlined'
                        name='salesInThePreYear'
                        value={cmpnyTypebox.salesInThePreYear}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>전전년도 매출액</th>
                    <td className='table_input'>
                      <TextField
                        id='salesInThePreviousPreYear' 
                        variant='outlined'
                        name='salesInThePreviousPreYear'
                        value={cmpnyTypebox.salesInThePreviousPreYear}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th>3년전 매출액</th>
                    <td className='table_input'>
                      <TextField
                        id='salesThreeYearsAgo' 
                        variant='outlined'
                        name='salesThreeYearsAgo'
                        value={cmpnyTypebox.salesThreeYearsAgo}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                  </tr>
                </tbody>
              </table> */}
              <Stack direction='row' justifyContent='center' spacing={2} sx={{ marginTop: '40px' }}>
                <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'} onClick={()=>navigate('/')}/>
                <CustomButton label={'저장'} actionType={true} type={'listBack'} color={'primary'}/>
              </Stack>
            </Box>
        </div>
      </Box>
      <ModalComponents open={formValues.open} type={'normal'} title={formValues.title + ':ERROR'} content={formValues.message} 
        onConfirm={() => { 
          setFormValues({
          ...formValues,
          open:false,
        })}} 
        onClose={() => {
          setFormValues({
            ...formValues,
            open:false,
          })
        }}>
      </ModalComponents>
    </div>
  );
}

// 달력부분
const  DatePicker: React.FC<{
    fondDay: Date | null | undefined;
    onChange?: (newValue:Date | null) => void;
  }> = (props) => {
    // datepicker 영역
    const handleChange = (newValue: Date | null) => {
      if(props.onChange) props.onChange(newValue);
    };
      return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction='row' alignItems='center' spacing={2} sx={{ maxWidth: 160}}>
            <DesktopDatePicker
              inputFormat={'yyyy-MM-dd'}
              mask={'____-__-__'}
              value={props.fondDay ? props.fondDay : new Date()}
              onChange={handleChange}
              renderInput={(params:any) => <TextField {...params} />}
              components={{
                OpenPickerIcon: DateIcon
              }}
            />
          </Stack>
        </LocalizationProvider>
      );
  }
export default CorporateInfoMmt;
import React, { useState,useEffect, useCallback } from 'react'
import * as styles from '~/styles/styles';
import {useQuery,useMutation,QueryClient, useQueries} from 'react-query';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import BreadCrumb from '~/components/BreadCrumb';
import { CustomButton } from '~/components/ButtonComponents';
import { SelectIcon } from '../../../components/IconComponents';
import { useNavigate } from 'react-router-dom';
import {  reqEnterpriseType2 } from '~/models/Model';
import { ModalComponents } from '~/components/ModalComponents';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { fetchGetCommCode } from '~/fetches';
import DatePicker from '~/components/DatePicker';
import dayjs from '~/../../shared/src/libs/dayjs';
import { fetchEnterpriseGet, fetchEnterprisePost, fetchEnterprisePut } from '~/fetches/fetchQnaQuest';
import { inputPriceFormat } from '~/pages/biz/ContractMgt/View/BusinessPlanMgtDetail';
import { useScroll } from '~/pages/store/GlobalModalStore';

/* 
  작성일    :   2022/06/05
  화면명    :   이페이지 -> 사용자지원 -> 기업정보관리
  회면ID    :   UI-USP-FRN-0060101
  화면/개발 :   Seongeonjoo / navycui
  // 모바일 작업안됨 추후수정예정
*/
const CorporateInfoMmt = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {scrollY, direction} = useScroll();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formValues,setFormValues] = useState({open:false,title:'',message:'',isNew:false})
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const queryClient = new QueryClient()

  const [cmpnyTypebox, setCmpnyTypebox] = useState<reqEnterpriseType2>({
    adres:'',
    ceoEmail:'',
    ceoTelno:'',
    cmpnyTypeCd:'',
    cmpnyTypeNm:'',
    emplyCnt:'',
    empmnPrearngeNmpr:'',
    fondDay:dayjs(new Date()).format('YYYY-MM-DD'),
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
    prvyySalamt:0
  }); 

  // 공통코드 조회  참고:기업 회원 만 조회 가능 
  const userQueries:any = useQueries(
    [
    'CMPNY_TYPE',     // 기업유형
    'INDUST_REALM',   // 산업분야
    'NEW_FNTN_PLAN',  // 신규 창업 계획
    'FOND_PLAN'       // 이전 및 설립계획
    ].map(TermsType => {
      return {
        queryKey: [TermsType],
        queryFn: () => fetchGetCommCode(TermsType),
      }
    })
  )

  // 기업정보 조회
  const { data:memInfo}:any = useQuery(['getEnterprise',cmpnyTypebox], () => fetchEnterpriseGet(),{
    onError: (err:any) => {
      setFormValues((pre)=>({...pre,open:true,message:err.response.data.message,isNew: err.response.status == 400 ? true : false}))
    }
  });
  
  // 사업자 정보 저장 수정
  const {mutate:updatebiz,isSuccess} = useMutation(async () => await fetchEnterprisePut(cmpnyTypebox), {
    onError: (err:any) => {
      setFormValues((pre)=>({...pre,open:true,message:err.response.data.message}))
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('getEnterprise')
      setFormValues((pre)=>({...pre,title:'',open:true,message:'저장 되었습니다.'}))
    }
  });

  // 사업자 정보 저장 등록
  const {mutate:registNew} = useMutation(async () => await fetchEnterprisePost(cmpnyTypebox), {
    onError: (err:any) => {
      setFormValues((pre)=>({...pre,open:true,message:err.response.data.message}))
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('getEnterprise')
      setFormValues((pre)=>({...pre,open:true,message:'등록 되었습니다.'}))
    }
  });
  console.log(memInfo)
  // 상태에 따라 셋팅
  useEffect(() => {
    
    if(!!memInfo) setCmpnyTypebox(memInfo);
  }, [memInfo]);

  // 기업정보 저장
  const handelOnSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formValues.isNew){
      registNew()
    } else {
      updatebiz();
    }
  };

  // change event
  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setCmpnyTypebox((state:any) => ({ ...state, [name]: (name == 'prvyySalamt') ? parseInt(value.replaceAll(',','')) : value }));
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
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);
  

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={scrollY ? "fixed scrollaction" : "fixed"}>
        <Box className='benner' component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className='content'>
            <div className='txtbox'>
              <h2 className='tit'>기업정보관리</h2>
              <p>기업의 상세정보를 등록하고 관리할 수 있습니다. <br/>입력한 정보는 사업신청 시 신청정보로 활용될 수 있습니다.</p>
            </div>
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} component='form' onSubmit={handelOnSubmit} sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className='content'>
          <Box css={styles.table04}>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
            >
              {'기본정보'}
            </Typography>
            <Box className="pc">
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
                          name="industRealmCd"
                          value={cmpnyTypebox.industRealmCd}
                          // label="Age"
                          onChange={handleChange}
                          IconComponent = {SelectIcon}
                          MenuProps={MenuProps}
                        >
                          {
                            (userQueries[1].status === 'success') ?
                              userQueries[1].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
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
                          name="cmpnyTypeCd"
                          value={cmpnyTypebox.cmpnyTypeCd}
                          onChange={handleChange}
                          IconComponent = {SelectIcon}
                          MenuProps={MenuProps}
                        >
                          {
                            (userQueries[0].status === 'success') ?
                              userQueries[0].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <th>설립일</th>
                    <td className='table_input datepick'>
                      <DatePicker
                        pickerType='one'
                        questDay={cmpnyTypebox.fondDay ? dayjs(cmpnyTypebox.fondDay,'YYYY-MM-DD').toString() : dayjs(new Date()).format('YYYY-MM-DD')}
                        changeNowDate={(newTime: Date | null)=>{
                          setCmpnyTypebox((state:any) => ({ ...state, fondDay: dayjs(newTime).format('YYYY-MM-DD') }));
                        }}
                      />
                    </td>
                    <th>종사자수</th>
                    <td className='table_input alignr'>
                      <TextField
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
                    <td className='table_input alignr'>
                      <TextField
                        name='resdngNmpr' 
                        variant='outlined'
                        value={cmpnyTypebox.resdngNmpr}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                      <span className='ml8'>명</span>
                    </td>
                    <th>채용예정인력</th>
                    <td className='table_input alignr'>
                      <TextField
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
                    <td className='table_input pt0' >
                      <TextField
                        id='adres'
                        name='adres' 
                        variant='outlined'
                        value={cmpnyTypebox.adres}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th className='table_input wh pt0' colSpan={2}>
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
                        name='ceoTelno' 
                        variant='outlined'
                        value={cmpnyTypebox?.ceoTelno}
                        onChange={handelChangeInput}
                        fullWidth
                      />
                    </td>
                    <th>대표자 이메일</th>
                    <td className='table_input'>
                      <TextField
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
                          name="newFntnPlanCd"
                          value={cmpnyTypebox.newFntnPlanCd}
                          onChange={handleChange}
                          IconComponent = {SelectIcon}
                          MenuProps={MenuProps}
                        >
                          {
                            (userQueries[2].status === 'success') ?
                              userQueries[2].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
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
                          name="fondPlanCd"
                          value={cmpnyTypebox.fondPlanCd}
                          onChange={handleChange}
                          IconComponent = {SelectIcon}
                          MenuProps={MenuProps}
                        >
                          {
                            (userQueries[3].status === 'success') ?
                              userQueries[3].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
              {/* 테이블 mo */}
              <Box className="mo">
                <table>
                  <colgroup>
                    <col width='40%'></col>
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>산업분야</th>
                      <td className='table_input'>
                      <FormControl fullWidth>
                        <Select
                          name="industRealmCd"
                          value={cmpnyTypebox.industRealmCd}
                          onChange={handleChange}
                          IconComponent = {SelectIcon}
                          MenuProps={MenuProps}
                        >
                          {
                            (userQueries[1].status === 'success') ?
                              userQueries[1].data.list.map((option:any) => (
                                <SelectItemStyle key={option.code} value={option.code}>
                                  {option.codeNm}
                                </SelectItemStyle>
                              ))
                            : null

                          }
                        </Select>
                      </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <th>기업/기관유형</th>
                      {/* <em className="star">*</em> 중요표시*/}
                      <td className='table_input'>
                        <FormControl fullWidth>
                          <Select
                            name="cmpnyTypeCd"
                            value={cmpnyTypebox.cmpnyTypeCd}
                            onChange={handleChange}
                            IconComponent = {SelectIcon}
                            MenuProps={MenuProps}
                          >
                            {
                              (userQueries[0].status === 'success') ?
                                userQueries[0].data.list.map((option:any) => (
                                  <SelectItemStyle key={option.code} value={option.code}>
                                    {option.codeNm}
                                  </SelectItemStyle>
                                ))
                              : null

                            }
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <th>설립일</th>
                      <td className='table_input datepick'>
                        <DatePicker
                          pickerType='one'
                          questDay={cmpnyTypebox.fondDay ? dayjs(cmpnyTypebox.fondDay,'yyyy-MM-dd').toString() : new Date().toString()}
                          changeNowDate={(newTime: Date | null)=>{
                            setCmpnyTypebox((state:any) => ({ ...state, fondDay: newTime }));
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>종사자수</th>
                      <td className='table_input alignr'>
                        <TextField
                          name='emplyCnt' 
                          variant='outlined'
                          value={cmpnyTypebox.emplyCnt}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>상주인원</th>
                      <td className='table_input alignr'>
                        <TextField
                          name='resdngNmpr' 
                          variant='outlined'
                          value={cmpnyTypebox.resdngNmpr}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>채용예정인력</th>
                      <td className='table_input alignr'>
                        <TextField
                          name='empmnPrearngeNmpr' 
                          variant='outlined'
                          value={cmpnyTypebox.empmnPrearngeNmpr}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>업종</th>
                      <td className='table_input'>
                        <TextField
                          name='induty' 
                          variant='outlined'
                          value={cmpnyTypebox.induty}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>주 업종</th>
                      <td className='table_input'>
                        <TextField
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
                          name='mainTchnlgyProduct' 
                          variant='outlined'
                          value={cmpnyTypebox.mainTchnlgyProduct}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th rowSpan={3}>주소</th>
                      <td className='table_input noline'>
                        <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100%'}}>
                          <TextField
                            id='wrcAdresZip'
                            name='wrcAdresZip' 
                            value={cmpnyTypebox.zip}
                            onChange={handelChangeInput}
                            variant='outlined'
                            fullWidth
                          />
                          <CustomButton label={'주소찾기'} type={'modalBtn'} color={'outlined'} onClick={handleClick}/>
                        </Stack>
                      </td>
                    </tr>
                    <tr>
                      <td className='table_input noline pt0'>
                        <TextField
                          id='adres'
                          name='adres' 
                          variant='outlined'
                          value={cmpnyTypebox.adres}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='table_input wh pt0'>
                        <TextField
                          id='adresDetail'
                          name='adresDetail' 
                          variant='outlined'
                          value={cmpnyTypebox.adres}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>대표전화</th>
                      <td className='table_input'>
                        <TextField
                          name='reprsntTelno' 
                          variant='outlined'
                          value={cmpnyTypebox.reprsntTelno ? cmpnyTypebox.reprsntTelno : ''}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>팩스</th>
                      <td className='table_input'>
                        <TextField
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
                          name='ceoTelno' 
                          variant='outlined'
                          value={cmpnyTypebox.ceoTelno ? cmpnyTypebox.ceoTelno : ''}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>대표자 이메일</th>
                      <td className='table_input'>
                        <TextField
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
                            name="newFntnPlanCd"
                            value={cmpnyTypebox.newFntnPlanCd}
                            onChange={handleChange}
                            IconComponent = {SelectIcon}
                            MenuProps={MenuProps}
                          >
                            {
                              (userQueries[2].status === 'success') ?
                                userQueries[2].data.list.map((option:any) => (
                                  <SelectItemStyle key={option.code} value={option.code}>
                                    {option.codeNm}
                                  </SelectItemStyle>
                                ))
                              : null

                            }
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <th>이전 및 설립계획</th>
                      <td className='table_input'>
                        <FormControl fullWidth>
                          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                          <Select
                            name="fondPlanCd"
                            value={cmpnyTypebox.fondPlanCd}
                            onChange={handleChange}
                            IconComponent = {SelectIcon}
                            MenuProps={MenuProps}
                          >
                            {
                              (userQueries[3].status === 'success') ?
                                userQueries[3].data.list.map((option:any) => (
                                  <SelectItemStyle key={option.code} value={option.code}>
                                    {option.codeNm}
                                  </SelectItemStyle>
                                ))
                              : null

                            }
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Typography
                gutterBottom
                variant='h6'
                component='div'
              >
                {'매출정보'}
              </Typography>
              <Box className="pc">
                <table>
                  <colgroup>
                    <col width='15%'></col>
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>전년도 매출액</th>
                      <td className='table_input alignr'>
                        <TextField
                          variant='outlined'
                          name='prvyySalamt'
                          value={inputPriceFormat(!!cmpnyTypebox ? cmpnyTypebox.prvyySalamt : 0)}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Box className="mo">
                <table>
                  <colgroup>
                    <col width='40%'></col>
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>전년도 매출액</th>
                      <td className='table_input alignr'>
                        <TextField
                          variant='outlined'
                          name='prvyySalamt'
                          value={inputPriceFormat(!!cmpnyTypebox ? cmpnyTypebox.prvyySalamt : 0)}
                          onChange={handelChangeInput}
                          fullWidth
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Stack direction='row' justifyContent='center' spacing={2} css={styles.btnGroup}>
                <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'} onClick={()=>navigate('/')}/>
                <CustomButton label={'저장'} actionType={true} type={'listBack'} color={'primary'}/>
              </Stack>
            </Box>
        </div>
      </Box>
      <ModalComponents open={formValues.open} type={'normal'} title={formValues.title} content={formValues.message} 
        onConfirm={() => { 
          setFormValues({...formValues,open:false})
        }} 
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
export default CorporateInfoMmt;

const MenuProps = {
  PaperProps: {
      style: {
          width: 'auto',
          marginTop: '4px',
          padding: '4px',
          boxShadow: 'none',
          border: '1px solid #ccc',
          borderRadius: '5px',
      },
  },
};

const SelectItemStyle = styled(MenuItem)`
  font-size: 16px;
  letter-spacing: -0.64px;
  font-family: Noto Sans CJK KR;
  padding: 0 12px;
  min-height: 40px !important;
  border-radius: 3px;
  margin-bottom: 4px;
  height:44px;
  line-height: 2.2;
  &:first-of-type{
      margin-top: -8px;
  }
  &:last-of-type{
      margin-bottom: -8px;
  }
  &.Mui-selected{
      background-color: #f5f5f5;
      &:hover,  &:focus-visible{
          background-color: #f5f5f5;
      }
  }
`;
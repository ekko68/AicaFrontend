/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Box, Stack, Tab, Tabs, TooltipProps, Tooltip, tooltipClasses, styled } from '@mui/material';
import { taskPartcptsList } from '~/models/Model';
import * as styles from '../styles';
import { useState } from 'react';
import { QuestionIcon } from '~/components/IconComponents';
import IconButton from '@material-ui/core/IconButton';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TaskReqstWctSum } from '~/models/ModelBizPlanMgt';


/*
    컴포넌트: AgreementChange
    개발자  : seok
    작성일  : 20220819
*/
export const uncomma2 = (str:any) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  };
  
export const inputPriceFormat = (str:any) => {
const comma = (str:any) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
};
const uncomma = (str:any) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
};
return comma(uncomma(str));
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

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
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

export const AgreementTaskTaxitmBeforeTable: React.FC<{
  data:any;
}> = props => {
    const TaskTaxitmWct = props.data;
    const [value, setValue] = useState(0);
    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const [sumVal, setSumVal] = useState<TaskReqstWctSum>({ReqstWctSum1:{sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0},ReqstWctSum2:{sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0},ReqstWctSum3:{sum1:0 ,sum2:0 ,sum3:0 ,sum4:0 ,sum5:0}});
    return ( 
        <>
          <Box className="detailtab_02">
            <Box className='scrollTab' sx={{mb: '20px'}}>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                <Tab label="2022년" {...a11yProps(0)} />
                <Tab label="2021년" {...a11yProps(1)} />
                <Tab label="2020년" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="tableDefault_scroll">
              <table className="tableDefault type6">
                <colgroup>
                  <col style={{width:'7%'}}/>
                  <col style={{width:'14%'}}/>
                  <col style={{width:'27%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                  <col style={{width:'13%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={2} className="noline_left">구분</th>
                    <th colSpan={4}>사업비 편성 내용</th>
                    <th rowSpan={3}>합계</th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>비목</th>
                    <th rowSpan={2}>세목</th>
                    <th rowSpan={2}>산출근거</th>
                    <th rowSpan={2}>지원예산</th>
                    <th colSpan={2}>민간부담금</th>
                  </tr>
                  <tr>
                    <th>현금</th>
                    <th>현물</th>
                  </tr>
                </thead>
              </table>
              <div className="table_rowScroll">
                <table className="tableDefault type7 newType">
                  <colgroup>
                    <col style={{width:'7%'}}/>
                    <col style={{width:'14%'}}/>
                    <col style={{width:'27%'}}/>
                    <col style={{width:'13%'}}/>
                    <col style={{width:'13%'}}/>
                    <col style={{width:'13%'}}/>
                    <col style={{width:'13%'}}/>
                  </colgroup>
                  <tbody>
                  {
                    TaskTaxitmWct?.length > 0 ? TaskTaxitmWct.map((item:any,idx:number)=>{
                      
                      if(item.wctIoeNm  == '인건비')
                        return<>
                            { item.wctTaxitmNm == '보수' ? 
                              <tr>
                                  <td rowSpan={4}>인건비</td>
                                    <td className="tal">
                                    <Stack style={{alignSelf:'end'}} flexDirection={'row'} css={styles.tooltip} className="pb0">
                                      {item.wctTaxitmNm}
                                      <HtmlTooltip
                                        title={
                                          <React.Fragment>
                                            {/* <Typography color="inherit">신청상태 안내</Typography> */}
                                            <ul className='tooltip_list'>
                                              추후 내용 추가 예정
                                              {/* <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                                              <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                              <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                                              <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                                              <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                                              <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li> */}
                                            </ul>
                                          </React.Fragment>
                                        }
                                        placement="bottom-start"
                                      >
                                        <IconButton>
                                          <QuestionIcon />
                                        </IconButton>
                                      </HtmlTooltip>
                                    </Stack>
                                    </td> 
                                    <td className="tal">{item.computBasisCn}</td>
                                    <td className="tar">{inputPriceFormat(item.sportBudget)} </td>
                                    <td className="tar">{inputPriceFormat(item.alotmCash)}</td>
                                    <td className="tar">{inputPriceFormat(item.alotmActhng)}</td>
                                    <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>   
                              </tr>
                            : 
                            <>
                              <tr>
                                  <td className="tal">{item.wctTaxitmNm}</td>
                                  <td className="tal">{item.computBasisCn}</td>
                                  <td className="tar">{inputPriceFormat(item.sportBudget)} </td>
                                  <td className="tar">{inputPriceFormat(item.alotmCash)}</td>
                                  <td className="tar">{inputPriceFormat(item.alotmActhng)}</td>
                                  <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>   
                              </tr>
                              </>
                            }

                            </>
                    }) : null
                  }
                  <tr>
                    <td className="tal sum">소계</td>
                    <td>-</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum1)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum2)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum3)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum1.sum4)}</td>
                  </tr>
                {                 
                  TaskTaxitmWct?.length > 0 ? TaskTaxitmWct.map((item:any,idx:number)=>{
                    if(item.wctIoeNm  == '운영비')
                        return (
                          <>
                            {/* 운영비 */}
                          {
                            item.wctTaxitmNm == '일반수용비' ? 
                            <tr>
                              <td rowSpan={11}>운영비</td>
                              <td className="tal">일반수용비</td>
                              <td></td>
                              <td className="tar">{inputPriceFormat(item.sportBudget)} </td>
                              <td className="tar">{inputPriceFormat(item.alotmCash)}</td>
                              <td className="tar">{inputPriceFormat(item.alotmActhng)}</td>
                              <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>   
                            </tr>
                            : 
                            <tr>
                                  <td className="tal">{item.wctTaxitmNm}</td>
                                  <td></td>
                                  <td className="tar">{inputPriceFormat(item.sportBudget)} </td>
                                  <td className="tar">{inputPriceFormat(item.alotmCash)}</td>
                                  <td className="tar">{inputPriceFormat(item.alotmActhng)}</td>
                                  <td className="tar">{inputPriceFormat(item.wctTaxitmTot)}</td>   
                            </tr>
                          }
                        </>
                      )
                }): null
              }
                <>
                  <tr>
                    <td className="tal sum">소계</td>
                    <td>-</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum1)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum2)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum3)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum2.sum4)}</td>
                  </tr>
                  <tr className="total">
                    <td colSpan={2}>합계</td>
                    <td>-</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum1)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum2)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum3)}</td>
                    <td className="tar">{inputPriceFormat(sumVal.ReqstWctSum3.sum4)}</td>
                  </tr>
                </>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            2021년
          </TabPanel>
          <TabPanel value={value} index={2}>
            2020년
          </TabPanel>
        </>
    );
}

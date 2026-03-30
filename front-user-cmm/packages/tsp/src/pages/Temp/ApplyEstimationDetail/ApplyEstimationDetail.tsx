import React, {Fragment, useState} from "react"
import {Box, Button, FormControl, Stack, Table, TableBody, TableContainer, TableRow, TextField} from "@mui/material";
import styled from "@emotion/styled";
import {FullPage, Slide} from 'react-full-page';
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {
    HorizontalInterval,
    SubContents,
    SimpleTextField,
    VerticalInterval, WordCount,
} from "shared/components/LayoutComponents";
import {
    CustomInfoTable, TableAttachCell,
    TableRadioCell,
    TableSelectCell,
    TableTextCell,
    TableTextFieldCell
} from "shared/components/TableComponents";
import {BannerContents} from "shared/components/BannerContents";
import {isMobile} from "react-device-detect";
import {CustomButton, CustomCheckBoxs, FileUpload} from "shared/components/ButtonComponents";

const ApplyEstimationDetail = () => {
    const {isDesktop} = useGlobalConfigStore()
    const isMobile = !isDesktop;
    const [label, setLabel] = useState('');

    return (
        <BannerContents
            title={"견적요청 상세"}
            subTitle={"장비 신청정보를 조회 및 수정하고, 현재 사용상태를 확인할 수 있습니다."}>
            <Stack width={"100%"} spacing={"40px"} style={{marginTop: "40px"}}>
                <SubContents
                    title={"신청정보"}
                    maxHeight={"100%"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"접수번호"} label={"12345"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"신청일"} label={"2021-10-31"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"사용상태"} label={"신청"} tdSpan={3}
                        />,
                    ]}/>
                </SubContents>

                <SubContents maxHeight={'100%'} title={"신청자정보"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"구분"} label={"법인사업자"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"업체명"} label={"㈜블루레몬"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"이름"} label={"홍길동"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"직위"} label={"대리"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"연락처"} label={"010-1234-1234"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"이메일"} label={"abc@gmail.com"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"AI 집적단지 사업참여 여부"} label={"R&D"} tdSpan={3}
                        />,
                    ]}/>
                </SubContents>

                <SubContents
                    title={"신청장비"}
                    maxHeight={"100%"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"장비명(국문)"} label={"자외선 및 IR 이미지 측정시스템"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"장비명(영문)"} label={"UV @ IR image measurement system"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"모델명"} label={"ABCDEFGH"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"자산번호"} label={"2021-1-20-32"}
                        />,
                    ]}/>
                </SubContents>

                <SubContents title={"활용목적"} maxHeight={"100%"}>
                    <TableContainer style={{overflow: "hidden"}}>
                        <Box>
                            <div style={{display: "flex", margin: "8px 11px 0px 0px", border: "1px solid #d7dae6", borderRadius:"5px", height:"120px", overflow: "auto"}}>
                                <FormControl fullWidth>
                                    <h5 style={{margin: "10px"}}>활용목적활용목적활용목적활용목적활용목적활용목적</h5>
                                </FormControl>
                            </div>
                            <WordCount curWord={label.length} maxWord={1000}/>
                        </Box>
                    </TableContainer>
                </SubContents>

                <SubContents title={"반출신청"} maxHeight={"100%"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"반출여부"} label={"반출"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"반출기간"} label={"2021-10-01 ~ 2021-10-01"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"반출지 주소"} label={"광주시 중구 1동"}
                            tdSpan={3}
                        />, <></>,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"사유(용도)"} label={"직접사용하기 위함 \n 킥킥"}
                            height={"150px"} tdSpan={3}
                        />,
                    ]}/>
                </SubContents>

                <SubContents title={"사용기간"} maxHeight={"100%"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"시작일"} label={"2021-11-16 10시 15분"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"종료일"} label={"2021-11-17 15시 25분"}
                        />,
                    ]}/>
                </SubContents>

                <SubContents title={"신청 사용금액"} maxHeight={"100%"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"1시간 사용료"} label={"100원"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"1일 가용시간"} label={"8시간"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"수량 및 단위"} label={"1"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"예상 사용금액"} label={"1,200원"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"지불방법"} label={"선납"} tdSpan={3}
                        />,
                    ]}/>
                </SubContents>

                <SubContents title={"첨부파일"} maxHeight={"100%"} rightContent={
                    <CustomButton type={"modalBtn"} label={"일괄다운로드"} color={"outlinedblack"}
                                  style={{
                                      border: "1px solid #d7dae6",
                                      borderRadius: "50px",
                                      fontSize: "12px",
                                      marginRight: "-30px"
                                  }}/>
                }>
                    <div style={{
                        display: "flex", backgroundColor: "#f5f5f5", overflow: "hidden", height: "80px",
                        borderRadius: "3px", alignItems: "center", paddingLeft: "10px"
                    }}>첨부파일 이미지
                    </div>
                </SubContents>

                <TableRow>
                    <Box display={"flex"} justifyContent={"center"} style={{marginBottom:"40px"}}>
                        <CustomButton type={"largeList"} label={"신청취소"} color={"outlinedblack"}
                                      style={{borderRadius: "50px"}}
                                      onClick={() => {

                                      }}
                        />
                        <Box width={"20px"}/>
                        <CustomButton type={"large"} label={"견적서 다운로드"} style={{borderRadius: "50px"}}
                                      onClick={() => {

                                      }}/>
                    </Box>
                </TableRow>
            </Stack>
        </BannerContents>
    )
}

export default ApplyEstimationDetail
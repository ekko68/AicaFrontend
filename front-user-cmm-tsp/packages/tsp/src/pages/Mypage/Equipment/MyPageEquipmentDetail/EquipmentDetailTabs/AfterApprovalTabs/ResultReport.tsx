import React from "react";
import {Stack} from "@mui/material";
import {SubContents, VerticalInterval, WordCount} from "shared/components/LayoutComponents";
import {CustomInfoTable, TableTextCell} from "shared/components/TableComponents";
import {resultTempData} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/MyPageEquipmentDetail";

export const ResultReport: React.FC<{
    isMobile: boolean
}> = props => {
    const columnCount = props.isMobile ? 1 : 2;
    return <>
        <VerticalInterval size={props.isMobile ? '30px':'50px'}/>
        <Stack width={'100%'} spacing={'40px'} sx={{marginBottom: '90px'}}>
            <SubContents title={'신청정보'} marginBottom={'20px'}>
                <CustomInfoTable columnCount={columnCount} elements={[
                    <TableTextCell title={'처리상태'} label={resultTempData.processingSt}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'제출일'} label={resultTempData.submitDt}
                                   thWidth={100} tdWidth={200}/>,
                ]}/>
            </SubContents>

            <SubContents title={'활용분야'} maxHeight={'100%'} marginBottom={'20px'} overflow>
                <div style={{
                    border: '1px solid #d7dae6',
                    borderRadius: '8px',
                    minHeight: '120px',
                    padding: '20px 15px 20px 15px',
                }}>
                    {resultTempData.useField}
                </div>
                <WordCount curWord={resultTempData.useField.length} maxWord={1000}/>
            </SubContents>

            <SubContents title={'신청장비 및 지불방법'} maxHeight={'100%'} marginBottom={'20px'}>
                <CustomInfoTable columnCount={columnCount} elements={[
                    <TableTextCell title={'장비명(국문)'} label={resultTempData.equipKoNm}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'장비명(영문)'} label={resultTempData.equipEgNm}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'모델명'} label={resultTempData.modelNm}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'자산번호'} label={resultTempData.equipNb}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'1시간 사용료'} label={resultTempData.hourFare}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'수량 및 단위'} label={resultTempData.unit}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'지불방법'} label={resultTempData.payment}
                                   thWidth={100} tdWidth={200} tdSpan={3}/>,
                ]}/>
            </SubContents>

            <SubContents title={'사용기간'} marginBottom={'20px'}>
                <CustomInfoTable columnCount={columnCount} elements={[
                    <TableTextCell title={'시작일'} label={resultTempData.startDt}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'종료일'} label={resultTempData.endDt}
                                   thWidth={100} tdWidth={200}/>,
                ]}/>
            </SubContents>

            <SubContents title={'사용금액'} maxHeight={'100%'} marginBottom={'20px'}>
                <CustomInfoTable columnCount={columnCount} elements={[
                    <TableTextCell title={'사용시간'} label={resultTempData.useTime}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'1시간 사용료'} label={resultTempData.hourFare}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'사용금액'} label={resultTempData.useFare}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'지불방법'} label={resultTempData.payment}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'할인적용'} label={resultTempData.applyDiscount}
                                   thWidth={100} tdWidth={200} tdSpan={3}/>, <></>,
                    <TableTextCell title={'할인금액'} label={resultTempData.discount}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'할인적용금액'} label={resultTempData.discountFare}
                                   thWidth={100} tdWidth={200}/>,
                ]}/>
            </SubContents>

            <SubContents title={'실사용금액'} maxHeight={'100%'} marginBottom={'20px'}>
                <CustomInfoTable columnCount={columnCount} elements={[
                    <TableTextCell title={'실사용날짜'} label={resultTempData.actualUseDt}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'실사용시간'} label={resultTempData.actualUseTime}
                                   thWidth={100} tdWidth={200}/>,
                    <TableTextCell title={'실사용금액'} label={resultTempData.actualUseFare}
                                   thWidth={100} tdWidth={200} tdSpan={3}/>,
                ]}/>
            </SubContents>

        </Stack>
    </>
}
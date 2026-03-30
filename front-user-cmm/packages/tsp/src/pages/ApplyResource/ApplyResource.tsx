import React, {useState, useEffect} from "react"
import {Box, Stack, TableContainer, TableRow} from "@mui/material";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {SubContents, SimpleTextField, ConsentLayout} from "shared/components/LayoutComponents";
import {CustomInfoTable, TableRadioCell, TableTextCell, TableTextFieldCell
} from "shared/components/TableComponents";
import {CustomButton, CustomCheckBoxs, FileUpload} from "shared/components/ButtonComponents";
import {BannerContents} from "shared/components/BannerContents";
import {Color} from "shared/components/StyleUtils";

const ApplyResource = () => {
    const {isDesktop} = useGlobalConfigStore()
    const isMobile = !isDesktop;
    const [files, setFiles]:any= useState([]);
    const [changeNumber, setChangeNumber] = useState(0);
    const [allChecked, setAllChecked] = useState(false);
    const [checked, setChecked] = useState(false);

    const allCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllChecked(event.target.checked);
        setChecked(!allChecked);
    };

    const checkEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (!checked) {
            setAllChecked(false)
        } else setAllChecked(true)
    }, [allChecked, checked])

    const handleDelete = (i:number) => {
        files.splice(i,1)
        setFiles(files);
        setChangeNumber(changeNumber+1);
    };

    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let upfile:any = e.target.files;
        for(var i = 0; i < upfile.length; i++){
            files.push(upfile[i]);
        }
        setFiles(files)
        setChangeNumber(changeNumber+1);
    }

    return (
        <BannerContents title={"실증자원 신청"}
                        stepper={{activeStep: 0, step: ["신청서작성", "사용기간선택", "신청완료"]}}>
            <Stack width={"100%"} spacing={"40px"}>
                <Box
                    sx={{borderRadius: 3}}
                    marginTop={"20px"}
                    style={{width: "100%", padding: "30px 20px 30px 20px"}}
                    display={"flex"}
                    alignItems="center"
                    //fontWeight={"bold"}
                    bgcolor={"#f5f5f5"}>
                    <span>• <span style={{color: '#1ccdcc', fontWeight: 'bold'}}>*</span> 표시는 필수입력 항목입니다.</span>
                </Box>

                <SubContents
                    title={"신청자정보"}
                    maxHeight={"100%"}
                    rightContent={
                        <CustomButton
                            type={"modalBtn"} style={{borderRadius: "50px", marginRight: "-30px"}}
                            color={"outlinedblack"} label={"회원정보 변경"}
                            onClick={() => {

                            }}
                        />
                    }>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"구분"} label={"법인사업자"}
                        />,
                        <TableTextCell
                            thWidth={100} tdWidth={200}
                            title={"사업자명/이름"} label={"㈜블루레몬"}
                        />,
                        <TableTextFieldCell
                            thWidth={100} tdWidth={200}
                            label={"직위"}
                            onChange={() => {

                            }}
                        />,
                        <TableTextFieldCell
                            thWidth={100} tdWidth={200}
                            label={"연락처 *"}
                            inputType={'number'}
                            defaultLabel={""}
                            onChange={() => {

                            }}
                        />,
                        <TableTextFieldCell
                            thWidth={100} tdWidth={200}
                            label={"이메일 *"}
                            defaultLabel={""}
                            onChange={() => {

                            }}
                        />,
                        <TableRadioCell
                            thWidth={100} tdWidth={200}
                            row label={"AI 집적단지 사업참여 여부"}
                            defaultLabel={"참여안함"}
                            radioLabel={["참여안함", "R&D", "비 R&D"]}
                            onClick={() => {

                            }}
                        />,
                    ]}/>
                    <Box
                        style={{width: "100%", paddingLeft: "10px"}}
                        display={"flex"}
                        alignItems="center"
                        fontSize={"13px"}
                    >
                        <li style={{marginTop: "10px"}}>
                            신청자정보를 확인해주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.
                        </li>
                    </Box>
                </SubContents>

                <SubContents maxHeight={'100%'} title={"신청자원"}>
                    <CustomInfoTable columnCount={isMobile ? 1 : 2} elements={[
                        <TableRadioCell
                            thWidth={100} tdWidth={200}
                            row label={"GPU *"}
                            defaultLabel={"사용안함"}
                            radioLabel={["사용안함", "사용"]}
                            onClick={() => {

                            }}
                        />,
                        <TableTextFieldCell
                            thWidth={100} tdWidth={200}
                            label={"CPU *"}
                            defaultLabel={""}
                            endText={"core"}
                            onChange={() => {

                            }}
                        />,
                        <TableRadioCell
                            thWidth={100} tdWidth={200}
                            row label={"데이터 저장소 *"}
                            defaultLabel={"사용안함"}
                            radioLabel={["사용안함", "사용"]}
                            tdSpan={3}
                            onClick={() => {

                            }}
                        />,
                    ]}/>
                </SubContents>

                <SubContents title={"활용목적 *"} maxHeight={"100%"}>
                    <TableContainer style={{overflow:"hidden"}}>
                        <SimpleTextField
                            multiline row={6} wordCount={1000} fullWidth/>
                    </TableContainer>
                </SubContents>

                <SubContents title={"첨부파일"} maxHeight={"100%"}>
                    <TableRow>
                        <FileUpload
                            isMobile={isMobile}
                            direction={isMobile ? "column" : "row"}
                            label={"파일 첨부"}
                            files={files}
                            handleDelete={handleDelete}
                            handleUpload={handleUpload}
                        />
                    </TableRow>
                    <Box
                        style={{width: "100%", paddingLeft: "10px"}}
                        display={"flex"}
                        alignItems="center"
                        fontSize={"14px"}
                    >
                        <li style={{marginTop: "7px", color: Color.warm_gray}}>
                            처음 신청하는 업체는 사업자등록증을 꼭 첨부해 주세요.
                        </li>
                    </Box>
                </SubContents>

                <SubContents title={"개인정보 수집 동의 *"} maxHeight={"100%"}>
                    <ConsentLayout
                        onChange={allCheck}
                        checked={allChecked}
                        checkbox={{label: "개인정보 수집 및 이용 전체 동의 (실증분석 장비 신청)"}}
                        subCheckbox={[{
                            essential: true,
                            label: "개인정보 수집 및 이용 동의",
                            content: "1.수집 이용 목적",
                            subContents: "-서비스제공... \n -회원제 서비스...",
                            checked: checked,
                            checkedEvent: checkEvent
                        },]}/>
                </SubContents>
                <TableRow>
                    <Box display={"flex"} justifyContent={"center"} style={{marginBottom:"40px"}}>
                        <CustomButton type={"largeList"} label={"이전"} color={"outlinedblack"}
                                      style={{borderRadius: "50px"}}
                                      onClick={() => {

                                      }}
                        />
                        <Box width={"20px"}/>
                        <CustomButton type={"largeList"} label={"다음"} style={{borderRadius: "50px"}}
                                      onClick={() => {

                                      }}/>
                    </Box>
                </TableRow>
            </Stack>
        </BannerContents>
    )
}

export default ApplyResource
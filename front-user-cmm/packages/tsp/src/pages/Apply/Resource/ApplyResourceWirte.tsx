import {Box, Stack, TableContainer, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {ConsentLayout, SimpleTextField, SubContents} from "shared/components/LayoutComponents";
import {CustomButton, FileUpload} from "shared/components/ButtonComponents";
import {CustomInfoTable, TableRadioCell, TableTextCell, TableTextFieldCell} from "shared/components/TableComponents";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "shared/store/GlobalModalStore";
import {Color} from "shared/components/StyleUtils";
import {Body2} from "shared/components/TextComponents";

const ApplyResourceWrite: React.FC<{
  stepper: number
  setStepper: any
}> = props => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [files, setFiles]: any = useState([]);
  const [changeNumber, setChangeNumber] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const columnCount = isMobile ? 1 : 2;
  const {addModal} = useGlobalModalStore()
  const [userApplyResourceInformation, setUserApplyResourceInformation] = useState<ApplyResourceInformation>(tempData)

  const allCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(event.target.checked);
    setChecked(!allChecked);
  };

  const checkEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (checked === false) {
      setAllChecked(false)
    } else setAllChecked(true)
  }, [allChecked, checked])

  const handleDelete = (i: number) => {
    files.splice(i, 1)
    setFiles(files);
    setChangeNumber(changeNumber + 1);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upfile: any = e.target.files;
    for (var i = 0; i < upfile.length; i++) {
      files.push(upfile[i]);
    }
    setFiles(files)
    setChangeNumber(changeNumber + 1);
  }

  return (
    <Stack width={"100%"} spacing={"40px"} component={'form'} id={'applyResourceWirte'}>
      <Box
        sx={{borderRadius: '5px'}}
        marginTop={isMobile ? "20px" : '40px'}
        style={{width: "100%", padding: "30px 20px"}}
        display={"flex"}
        alignItems="center"
        //fontWeight={"bold"}
        bgcolor={"#f5f5f5"}>
        <span>• <span style={{color: '#1ccdcc', fontWeight: 'bold'}}>*</span>표시는 필수입력 항목입니다.</span>
      </Box>

      <SubContents
        title={"신청자정보"}
        maxHeight={"100%"}
        marginBottom={'5px'}
        overflow
        rightContent={
          <CustomButton
            type={"modalBtn"} style={{borderRadius: "50px", marginRight: "-30px"}}
            color={"outlinedblack"} label={"회원정보 변경"}
            onClick={() => {
              addModal({open:true, isDist:true, type:'normal', content:'구현중입니다.'})
            }}
          />
        }>
        <CustomInfoTable columnCount={columnCount} elements={[
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
            onChange={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, position: s})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={200}
            required
            label={"연락처"}
            inputType={'number'}
            defaultLabel={""}
            onChange={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, callNb:s})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={200}
            required
            label={"이메일"}
            defaultLabel={""}
            onChange={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, email:s})
            }}
          />,
          <TableRadioCell
            thWidth={100} tdWidth={200}
            row label={"AI 집적단지 사업참여 여부"}
            defaultLabel={"참여안함"}
            radioLabel={["참여안함", "R&D", "비 R&D"]}
            onClick={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, AI:s})
            }}
          />,
        ]}/>

        <Box
          style={{width: "100%", paddingLeft: "10px"}}
          display={"flex"}
          alignItems="center"
          fontSize={"13px"}
        >
          <li style={{marginTop: "10px", color: '#707070'}}>
            신청자정보를 확인해주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.
          </li>
        </Box>
      </SubContents>

      <SubContents maxHeight={'100%'} title={"신청자원"} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableRadioCell
            thWidth={100} tdWidth={200}
            row label={"GPU"}
            defaultLabel={"사용안함"}
            radioLabel={["사용안함", "사용"]}
            onClick={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, GPU: s})
              console.log(userApplyResourceInformation.GPU)
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={200}
            label={"CPU"} endText={"core"}
            onChange={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, CPU: s})
            }}
          />,
          <TableRadioCell
            thWidth={100} tdSpan={3}
            row label={"데이터 저장소"}
            defaultLabel={"사용안함"}
            radioLabel={["사용안함", "사용"]}
            onClick={(s) => {
              setUserApplyResourceInformation({...userApplyResourceInformation, dataStorage: s})
            }}
          />
          ,
        ]}/>
      </SubContents>

      <SubContents title={"활용목적"} maxHeight={"100%"} required marginBottom={'20px'}>
        <TableContainer style={{overflow: "hidden"}}>
          <SimpleTextField multiline wordCount={1000} fullWidth required
                           onChange={(s) => {
                             setUserApplyResourceInformation({...userApplyResourceInformation, purposeUse: s})
                           }}
          />
        </TableContainer>
      </SubContents>

      <SubContents title={"첨부파일"} maxHeight={"100%"} overflow fileSize marginBottom={'15px'}>
        <TableRow>
          <FileUpload
            isMobile={isMobile}
            direction={isMobile ? 'column' : 'row'}
            label={"파일 첨부"}
            files={files}
            id={1}
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
          <li style={{marginTop: "15px", color: Color.warm_gray}}>
            처음 신청하는 업체는 사업자등록증을 꼭 첨부해 주세요.
          </li>
        </Box>
      </SubContents>

      <SubContents title={"개인정보 수집 동의"} maxHeight={"100%"} required >
        <ConsentLayout style={{margin: "12px"}}
                       isMobile={isMobile}
                       checked={allChecked}
                       checkbox={{label: "개인정보 수집 및 이용 전체 동의 (실증분석 장비 신청)"}}
                       subCheckbox={[{
                         checked: checked,
                         essential: true, // 필수
                         label: "개인정보 수집 및 이용 동의",
                         content: "1.수집 이용 목적",
                         subContents: "- 서비스 제공에 관한 인공지능산업융합사업단 AI통합지원서비스플랫폼에서 \n제공하는 모든 서비스에 활용",
                         checkedEvent: checkEvent
                       },]}
                       onChange={allCheck}
        />
      </SubContents>

      <TableRow>
        <Box display={"flex"} justifyContent={"center"} style={{marginBottom: "40px"}}>
          <CustomButton type={"listBack"} label={<Body2 color={Color.white}>다음</Body2>}
                        style={{width:isMobile? 'full' : '140px'}}
                        onClick={() => {
                          if (checkValidity('applyResourceWirte')) {
                            if (!checked) {
                              addModal({open: true, isDist: true, type: 'normal',
                                title: '개인정보 수집에 동의해주세요.'})
                            } else {
                              props.setStepper(props.stepper + 1)
                            }
                          }
                        }}/>
        </Box>
      </TableRow>
    </Stack>
  )
}

export default ApplyResourceWrite

export interface ApplyResourceInformation { // 신청자 정보
  position: string // 직위
  callNb: string // 연락처
  email: string // 이메일
  AI: string // AI 집적단지 사업참여 여부
  GPU: string
  CPU: string
  dataStorage: string // 데이터저장소
  purposeUse: string // 활용목적
}

const tempData: ApplyResourceInformation = {
  position: '',
  callNb: '',
  email: '',
  AI: '참여안함',
  GPU: '사용안함',
  CPU: '',
  dataStorage: '사용안함',
  purposeUse: '',
}
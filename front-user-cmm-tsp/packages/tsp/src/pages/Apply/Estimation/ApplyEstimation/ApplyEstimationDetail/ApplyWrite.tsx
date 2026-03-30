import React, {useState, useEffect, Dispatch, SetStateAction} from "react"
import {Box, Stack, TableContainer, TableRow} from "@mui/material";
import {
  SubContents,
  SimpleTextField,
  ConsentLayout, HorizontalInterval,
} from "shared/components/LayoutComponents";
import {
  CustomInfoTable,
  TableRadioCell,
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell,
} from "shared/components/TableComponents";
import {CustomButton, FileUpload} from "shared/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "shared/store/GlobalModalStore";
import {useNavigate, useParams} from "react-router-dom";
import {Color} from "shared/components/StyleUtils";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {Body2, Body3} from "shared/components/TextComponents";
import {ApplyEstmtPost} from "~/service/Model";

// 장비사용 견적 요청 신청서 작성
export const ApplyWrite: React.FC<{
  isMobile?: boolean
  stepper: number
  setStepper?: any
  setState: Dispatch<SetStateAction<ApplyEstmtPost | undefined>>
}> = props => {
  const [files, setFiles]: any = useState([]);
  const [changeNumber, setChangeNumber] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const {addModal} = useGlobalModalStore()
  const [state, setState] = useState<ApplyEstmtPost>({tkoutAt: true});
  const navigate = useNavigate()
  const columnCount = props.isMobile ? 1 : 2
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const {id} = useParams()

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
    } else {
      setAllChecked(true)
    }
  }, [allChecked, checked])

  const handleDelete = (i: number) => {
    files.splice(i, 1)
    setFiles(files);
    setChangeNumber(changeNumber + 1);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upFile: any = e.target.files;
    for (let i = 0; i < upFile.length; i++) {
      files.push(upFile[i]);
    }
    setFiles(files)
    setChangeNumber(changeNumber + 1);
  }

  return (
    <Stack width={"100%"} component={"form"} id={'applyWrite'} style={{marginBottom: isMobile ? '80px' : '120px'}}>
      <Box
        sx={{borderRadius: '5px'}}
        marginTop={isMobile ? "40px" : "60px"}
        marginBottom={isMobile ? "40px" : "48px"}
        style={{width: "100%", padding: "30px"}}
        display={"flex"}
        alignItems="center"
        //fontWeight={"bold"}
        bgcolor={"#f5f5f5"}>
        <Body3 listItem><span style={{color: '#1ccdcc', fontWeight: 'bold', paddingLeft: '8px'}}>*</span>표시는 필수입력 항목입니다.</Body3>
      </Box>

      <SubContents
        title={"신청자정보"}
        maxHeight={"100%"}
        marginBottom={'5px'}
        overflow
        rightContent={
          <CustomButton
            type={"modalBtn"} style={{borderRadius: "50px", marginRight: "-30px"}}
            color={"outlinedblack"} label={<Body3>회원정보 변경</Body3>}
            onClick={() => {
              addModal({open: true, isDist: true, type: 'normal', content: '구현중입니다.'})
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
              setState({...state, 직위: s})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={220}
            label={"연락처"}
            required
            onlyNumber
            placeholder={" '-' 없이 입력해주세요"}
            defaultLabel={""}
            onChange={(s) => {
              setState({...state, 연락처: Number(s), eqpmnId: id!.toString()})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={220}
            label={"이메일"}
            required
            defaultLabel={""}
            onChange={(s) => {
              setState({...state, email: s})
            }}
          />,
          <TableRadioCell
            thWidth={100} tdWidth={220}
            row label={"AI 집적단지 사업참여 여부"}
            defaultLabel={"참여안함"}
            radioLabel={["참여안함", "R&D", "비 R&D"]}
            onClick={(s) => {
              setState({...state, AI: s})
            }}
          />,
        ]}/>

        <Body3 listItem
               style={{color: '#707070', fontSize: '14px', marginTop: isMobile ? '8px' : '12px', marginBottom: '40px'}}><span
          style={{color: '#warm-grey', fontSize: '14px', marginLeft: '8px'}}>신청자 정보를 확인해주세요. 변경이 필요하시면 마이페이지에서 수정할 수 있습니다.</span></Body3>

      </SubContents>

      <SubContents maxHeight={'100%'} title={"신청장비 및 지불방법"} marginBottom={isMobile ? '10px' : '20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableTextCell
            thWidth={100} tdWidth={220}
            title={"장비명(국문)"} label={"자외선 및 IR 이미지 측정시스템"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={220}
            title={"장비명(영문)"} label={"UV @ IR image measurement system"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={220}
            title={"모델명"} label={"ABCD"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={220}
            title={"자산번호"} label={"2021-1-20-32"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={220}
            title={"1시간 사용료"} label={"100원"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={220}
            title={"1일 가용시간"} label={"8시간"}
          />,
          <TableSelectCell
            thWidth={100} tdWidth={50} tdSpan={3} required
            label={"지불방법"} selectLabel={["선납", "후납"]}
            onClick={(s) => {
              setState({...state, pymntMth: s})
            }}
          />
        ]}/>
      </SubContents>

      <SubContents title={"활용목적"} maxHeight={"100%"} style={{marginTop: "40px"}}
                   marginBottom={isMobile ? '10px' : '20px'} required>
        <TableContainer style={{overflow: "hidden"}}>
          <SimpleTextField
            required multiline fullWidth wordCount={1000} row={6}
            onChange={(s) => {
              setState({...state, useprps: s})
            }}/>
        </TableContainer>
      </SubContents>

      <SubContents title={"반출신청"} maxHeight={"100%"} style={{marginTop: "40px"}}
                   marginBottom={isMobile ? '10px' : '20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableRadioCell
            thWidth={100} tdWidth={220}
            row label={"반출여부"}
            required
            defaultLabel={"반출"}
            radioLabel={["반출안함", "반출"]}
            onClick={(s) => {
              setState({...state, tkoutAt: s === '반출'})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={220}
            label={"반출지 주소"}
            required
            defaultLabel={""}
            onChange={(s) => {
              setState({...state, tkoutAdres: s})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={220}
            label={"사유(용도)"} multiline tdSpan={3}
            required
            wordCount={1000}
            onChange={(s) => {
              setState({...state, tkoutResn: s})
            }}
          />
        ]}/>
      </SubContents>

      <SubContents title={"첨부파일"} maxHeight={"100%"} overflow fileSize style={{marginTop: "40px"}}
                   marginBottom={isMobile ? '10px' : '20px'}>
        <TableRow>
          <FileUpload
            isMobile={props.isMobile}
            direction={props.isMobile ? "column" : "row"}
            label={<Body3 color={Color.azul}>파일첨부</Body3>}
            files={files}
            handleDelete={handleDelete}
            handleUpload={handleUpload}
          />
          <Body3 listItem style={{
            color: '#707070',
            fontSize: '14px',
            marginTop: isMobile ? '-2px' : '10px',
            marginBottom: '40px'
          }}><span style={{
            color: '#warm-grey',
            fontSize: '14px',
            marginLeft: '8px'
          }}>처음 신청하는 업체는 사업자 등록증을 꼭 첨부해 주세요.</span></Body3>
        </TableRow>
        <Box
          style={{width: "100%", paddingLeft: "10px"}}
          display={"flex"}
          alignItems="center"
          fontSize={"14px"}
        >
        </Box>
      </SubContents>

      <SubContents title={"개인정보 수집 동의"} maxHeight={"100%"} required marginBottom={'20px'}>
        <ConsentLayout
          isMobile={props.isMobile}
          checked={allChecked}
          checkbox={{label: "개인정보 수집 및 이용 전체 동의 (실증분석 장비 신청)"}}
          subCheckbox={[{
            checked: checked,
            essential: true, // 필수
            label: "개인정보 수집 및 이용 동의",
            content: "1.수집 이용 목적",
            subContents: "-서비스제공...\n-회원제 서비스...",
            checkedEvent: checkEvent
          },]}
          onChange={allCheck}
        />
      </SubContents>

      <TableRow style={{marginTop: '40px'}}>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomButton label={<Body2>이전</Body2>} color={"outlinedblack"}
                        style={{borderRadius: "30px", width: isMobile ? '50%' : '140px', height: '60px'}}
                        onClick={() => {
                          navigate(-1)
                        }}
          />
          <HorizontalInterval size={isMobile ? '10px' : '20px'}/>
          <CustomButton label={<Body2 color={Color.white}>다음</Body2>}
                        style={{borderRadius: "30px", width: isMobile ? '50%' : '140px', height: '60px'}}
                        onClick={() => {
                          if (checkValidity('applyWrite')) {
                            const file = files.length == 0
                            if (file || !checked) {
                              let title = ''
                              if (file && !checked)
                                title = '파일 첨부 및 개인정보 수집에 동의해주세요';
                              else if (file && checked)
                                title = '파일을 첨부해주세요';
                              else if (!file && !checked)
                                title = '개인정보 수집에 동의해주세요';

                              addModal({
                                open: true, isDist: true, type: 'normal',
                                content: title
                              })
                            } else {
                              props.setState(state!)
                              props.setStepper(props.stepper + 1)
                              window.scrollTo(0, 0)
                            }
                          }
                        }}/>
        </Box>
      </TableRow>
    </Stack>
  )
}
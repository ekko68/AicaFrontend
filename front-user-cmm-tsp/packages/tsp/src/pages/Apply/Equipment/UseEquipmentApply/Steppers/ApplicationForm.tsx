import React, {useState, Dispatch, SetStateAction, ChangeEvent} from "react"
import {Box, Stack, TableContainer, TableRow} from "@mui/material";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {
  SubContents,
  SimpleTextField, HorizontalInterval,
} from "shared/components/LayoutComponents";
import {
  CustomInfoTable, TableAttachCell,
  TableRadioCell,
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell,
} from "shared/components/TableComponents";
import {CustomButton, FileUpload} from "shared/components/ButtonComponents";
import {useNavigate, useParams} from "react-router-dom";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "shared/store/GlobalModalStore";
import {Color} from "shared/components/StyleUtils";
import {Body2, Body3} from "shared/components/TextComponents";
import {ApplyEstmtPost} from "~/service/Model";

// 장비사용 신청 (신청서 작성페이지)
export const ApplicationForm: React.FC<{
  isMobile?: boolean
  stepper: number
  setStepper?: any
  setState: Dispatch<SetStateAction<ApplyEstmtPost | undefined>>
}> = props => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const {id} = useParams()
  const [files, setFiles]: any = useState([]);
  const [files1, setFiles1]: any = useState([]);
  const [changeNumber, setChangeNumber] = useState(0);
  const columnCount = isMobile ? 1 : 2
  const navigate = useNavigate();
  const [state, setState] = useState<ApplyEstmtPost>({tkoutAt:true});
  const {addModal} = useGlobalModalStore();

  const handleDelete = (i: number) => {
    files.splice(i, 1)
    setFiles(files);
    setChangeNumber(changeNumber + 1);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upfile: any = e.target.files;
    for (let i = 0; i < upfile.length; i++) {
      files.push(upfile[i]);
    }
    setFiles(files)
    setChangeNumber(changeNumber + 1);
  }

  const handleDelete1 = (i: number) => {
    files1.splice(i, 1)
    setFiles1(files1);
    setChangeNumber(changeNumber + 1);
  };

  const handleUpload1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upfile: any = e.target.files;
    for (let i = 0; i < upfile.length; i++) {
      files1.push(upfile[i]);
    }
    setFiles1(files1)
    setChangeNumber(changeNumber + 1);
  }

  return (
    <Stack width={"100%"} spacing={"41px"} component={'form'} id={'applicationForm'}>
      <Box
        sx={{borderRadius: '5px'}}
        marginTop={"20px"}
        style={{width: "100%", padding: "30px 20px 30px 20px"}}
        display={"flex"}
        alignItems="center"
        //fontWeight={"bold"}
        bgcolor={"#f5f5f5"}>
        <span>• <span style={{color: '#1ccdcc', fontWeight: 'bold'}}>*</span>표시는 필수입력 항목입니다.</span>
      </Box>

      <SubContents
        title={"신청자정보"}
        maxHeight={"100%"}
        marginBottom={'10px'}
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
            thWidth={100} tdWidth={200}
            required
            label={"연락처"}
            inputType={'number'}
            defaultLabel={""}
            onChange={(s) => {
              setState({...state, 연락처: Number(s),eqpmnId:id!.toString()})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={200}
            required
            label={"이메일"}
            defaultLabel={""}
            onChange={(s) => {
              setState({...state, email: s})
            }}
          />,
          <TableRadioCell
            thWidth={100} tdWidth={200}
            row label={"AI 집적단지 사업참여 여부"}
            defaultLabel={"참여안함"}
            radioLabel={["참여안함", "R&D", "비 R&D"]}
            onClick={(s) => {
              setState({...state, AI: s})
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

      <SubContents maxHeight={'100%'} title={"신청장비 및 지불방법"} marginBottom={'20px'}>
        <CustomInfoTable columnCount={columnCount} elements={[
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
            title={"모델명"} label={"ABCD"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"자산번호"} label={"2021-1-20-32"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"1시간 사용료"} label={"100원"}
          />,
          <TableTextCell
            thWidth={100} tdWidth={200}
            title={"1일 가용시간"} label={"8시간"}
          />,
          <TableSelectCell
            thWidth={100} tdWidth={200}
            required tdSpan={3}
            label={"지불방법"} selectLabel={["선납", "후납"]}
            onClick={(s) => {
              setState({...state, pymntMth: s})
            }}
          />,
        ]}/>
      </SubContents>

      <SubContents title={"활용목적"} maxHeight={"100%"} required>
        <SimpleTextField required multiline wordCount={1000} fullWidth row={6}
                         onChange={(s) => {
                           setState({...state, useprps: s})
                         }}/>
      </SubContents>

      <SubContents title={"반출신청"} maxHeight={"100%"}>
        <CustomInfoTable columnCount={columnCount} elements={[
          <TableRadioCell
            thWidth={100} tdWidth={200}
            row label={"반출여부"}
            required
            defaultLabel={"반출"}
            radioLabel={["반출안함", "반출"]}
            onClick={(s) => {
              setState({...state, tkoutAt: s === '반출'})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={200}
            required
            label={"반출지 주소"}
            defaultLabel={""}
            onChange={(s) => {
              setState({...state, tkoutAdres: s})
            }}
          />,
          <TableTextFieldCell
            thWidth={100} tdWidth={200}
            label={"사유(용도)"} multiline wordCount={1000}
            required
            tdSpan={3}
            onChange={(s) => {
              setState({...state, tkoutResn: s})
            }}
          />, <></>,
          <TableAttachCell title={"서약서"} tdSpan={3} thWidth={100} tdWidth={200} required
                           element={
                             <FileUpload
                               isMobile={isMobile}
                               direction={isMobile ? 'column' : 'row'}
                               label={"서약서 등록"}
                               files={files}
                               id={2}
                               handleDelete={handleDelete}
                               handleUpload={handleUpload}
                             />
                           }/>,
        ]}/>
      </SubContents>

      <SubContents title={"첨부파일"} maxHeight={"100%"} overflow fileSize>
        <TableRow>
          <FileUpload
            isMobile={isMobile}
            direction={isMobile ? 'column' : "row"}
            label={"파일 첨부"}
            files={files1}
            id={1}
            handleDelete={handleDelete1}
            handleUpload={handleUpload1}
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

      <TableRow>
        <Box display={"flex"} justifyContent={"center"} style={{marginBottom: "40px"}}>
          <CustomButton label={<Body2>이전</Body2>} color={"outlinedblack"}
                        style={{borderRadius: "30px", width:isMobile ? '50%': '140px',height:'60px'}}
                        onClick={() => {
                          navigate(-1);
                        }}
          />
          <HorizontalInterval size={isMobile ? '10px' : '20px'}/>
          <CustomButton label={<Body2 color={Color.white}>다음</Body2>}
                        style={{borderRadius: "30px", width:isMobile ? '50%': '140px',height:'60px'}}
                        onClick={() => {
                          if (checkValidity('applicationForm')) {
                            const file = files.length == 0
                            const file1 = files1.length == 0
                            if (file || file1) {
                              let title = ''
                              if (file && file1)
                                title = '서약서 등록과 파일을 첨부해주세요.';
                              else if (file && !file1)
                                title = '서약서를 등록해주세요.';
                              else if (!file && file1)
                                title = '파일을 첨부해주세요.';

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

export default ApplicationForm
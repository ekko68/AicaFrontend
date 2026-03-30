import React, {Dispatch, Fragment, SetStateAction, useRef, useState} from "react";
import {
  CustomTabs,
  SubAttachFileContents,
  SubContents,
  TitleContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {Box, Stack, Table, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  TableComponents,
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {useNavigate, useParams} from "react-router-dom";
import {TabPanel} from "@mui/lab";
import {CustomButton} from "~/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {ModalComponents} from "shared/components/ModalComponents";
import styled from "@emotion/styled";
import {OneByOne문의} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";
import {ExpertManagerAddModal} from "~/pages/OperationMgt/ExpertMgt/ExpertClassificationMgt";
import {dummyExpertManager, 전문가분류관리_담당자} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {Icons} from "shared/components/IconContainer";
import {CustomIconButton} from "shared/components/ButtonComponents";

export const OnebyOneInquiryMgtDetail = () => {

  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const [defaultOpen, setdefaultOpen] = useState(false)
  const [expertManagerModal, setExpertManagerModal] = useState(false)
  const [expertManagerRowList, setExpertManagerRowList] = useState<WithCustomRowData<전문가분류관리_담당자>[]>(dummyExpertManager)
  const [expertManager, setExpertManager] = useState("김원희")

  return <Stack id={'UserManual'} width={'100%'}>
    <TitleContents title={"1:1문의 상세"}>
      <CustomTabs tabs={["상세내용"]}>
        <TabPanel value="상세내용" sx={{padding: "0", height: "100%"}}>
          <Stack>
            <SubContents title={"기본정보"}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextCell
                        division title={"접수일"} label={"2021-10-01"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                      <TableTextCell
                        division title={"처리상태"} label={"접수"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                      <TableTextCell
                        title={"채널"} label={"안심구역포털"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                    </TableRow>
                    <TableRow>
                        <TableTextCell
                          title={"담당자"} label={expertManager}
                          thWidth={"13%"} tdSpan={5} rightContent={
                          <CustomButton
                            label={"담당자변경"} type={"small"}
                            color={"list"} style={{marginLeft: '15px'}}
                            onClick={() => {
                              setExpertManagerModal(true)
                            }}/>
                        }/>
                      {expertManagerModal && <ExpertManagerAddModal
                      open={expertManagerModal}
                      onClose={() => setExpertManagerModal(false)}
                      onSelect={(data) => {
                        setExpertManagerRowList(expertManagerRowList.concat(data))
                        setExpertManagerModal(false)
                        data.map((item)=>
                          setExpertManager(item.이름)
                        )
                      }}
                    />}


                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SubContents>
            <VerticalInterval size={'40px'}/>
            <SubContents title={"기본정보"}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextCell
                        division title={"회원유형"} label={"법인사업자"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                      <TableTextCell
                        division title={"사업자명/이름"} label={"(주)블루레몬"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                      <TableTextCell
                        title={"담당자명"} label={"홍길동"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                    </TableRow>
                    <TableRow>
                      <TableTextCell
                        division title={"직급"} label={"책임"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                      <TableTextCell
                        division title={"휴대폰번호"} label={"010-1111-9999"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                      <TableTextCell
                        title={"이메일"} label={"abc@gmail.com"}
                        thWidth={"13%"} tdWidth={"21%"}/>
                    </TableRow>
                    <TableRow>
                      <TableTextCell
                        title={"회원ID"} label={"ABCD"}
                        thWidth={"13%"} tdSpan={5}/>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SubContents>
          </Stack>
          <VerticalInterval size={'40px'}/>
          <Stack>
            <SubContents title={"기본정보"}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextCell
                        title={"문의구분"} label={"지원/신청"}
                        thWidth={"13%"}/>
                    </TableRow>
                    <TableRow>
                      <TableTextCell
                        title={"사업자명/이름"} label={"(주)블루레몬"}
                        thWidth={"13%"}/>
                    </TableRow>
                    <TableRow>
                      <TableTextCell
                        title={"담당자명"} label={"홍길동"}
                        thWidth={"13%"}/>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SubContents>
          </Stack>
          <VerticalInterval size={'40px'}/>
          <Stack>
            <SubAttachFileContents
              atchmnflGroupId={''}
              atchmnfl={[]}
              onAllDownload={() => {}}
              onDownload={() => {}}>
            </SubAttachFileContents>
          </Stack>
          <VerticalInterval size={'40px'}/>
          <Stack>
            <SubContents title={"답변보내기"} maxHeight={'100%'}
                         rightContent={<CustomButton label={"답변전송"}
                         type={"small"} color={"list"} onClick={()=>{
                         }}
                         />}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextFieldCell
                        label={"제목"} defaultLabel={"AI 기반 서비스 확장을 위한..."} required wordCount={50}
                        thWidth={"13%"} onChange={(text) => {
                        //setReq((state) => ({...req!, sumry: text}))
                      }}/>
                    </TableRow>
                    <TableRow>
                      <TableTextFieldCell
                        label={"내용"} defaultLabel={"안녕하세요. 이은영님..."} multiline required wordCount={1000}
                        thWidth={"20%"} onChange={(text) => {
                        //setReq((state) => ({...req!, sumry: text}))
                      }}/>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SubContents>
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%", marginTop: "40px"}}>
            <Stack>
              <CustomButton
                label={"목록"} type={"largeList"} color={"outlined"}
                onClick={() => {
                  navigate('/OperationMgt/CustomerSupportMgt/OnebyOneInquiryMgtMgt')
                }}
              />
            </Stack>
          </Stack>
        </TabPanel>
      </CustomTabs>
    </TitleContents>
  </Stack>
}

const ManagerListView = (props: {
  rowList: WithCustomRowData<전문가분류관리_담당자>[]
  selected: WithCustomRowData<전문가분류관리_담당자>[]
  setSelected: Dispatch<SetStateAction<WithCustomRowData<전문가분류관리_담당자>[]>>
  pagination: { page: number, rowsPerPage: number, rowCount: number }
  setPagination: Dispatch<SetStateAction<{ page: number, rowsPerPage: number, rowCount: number }>>
}) => {

  return <TableComponents<전문가분류관리_담당자>
    hideRowPerPage showTotal isCheckBox
    headCells={managerHeadCells}
    bodyRows={props.rowList}
    {...props.pagination}
    onChangePagination={(page, rowPerPage) => {
      props.setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    onSelectedKey={(keys: string[]) => {
      const selected = props.selected.map(m => m.key)

      if (selected.length < keys.length) {
        // 추가시
        const newKey = keys.find(f => !selected.includes(f))
        const data = props.rowList.find(f => f.key == newKey) as any
        props.setSelected(props.selected.concat(data))
      } else {
        // 삭제시
        const deleteKey = selected.find(f => !keys.includes(f))
        props.setSelected(props.selected.filter(f => f.key != deleteKey))
      }
      // props.setSelected(keys)
    }}
    tableCell={(data) => {

      return (
        <Fragment>
          <TableCell key={"부서명-" + data.key} sx={{textAlign: 'center'}}>{data.부서명}</TableCell>
          <TableCell key={"이름-" + data.key} sx={{textAlign: 'center'}}>{data.이름}</TableCell>
          <TableCell key={"직급-" + data.key} sx={{textAlign: 'center'}}>{data.직급}</TableCell>
        </Fragment>
      )
    }}
  />
}

const managerHeadCells: CustomHeadCell<전문가분류관리_담당자>[] = [
  {
    id: '부서명',
    align: 'center',
    label: '부서명',
  },
  {
    id: '이름',
    align: 'center',
    label: '이름',
  },
  {
    id: '직급',
    align: "center",
    label: '직급',
  },
];


export default OnebyOneInquiryMgtDetail



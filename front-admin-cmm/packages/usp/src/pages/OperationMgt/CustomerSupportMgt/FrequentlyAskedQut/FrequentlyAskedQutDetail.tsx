import React, {Fragment, useState} from "react";
import {
  CustomTabs,
  SubAttachFileContents,
  SubContents,
  TitleContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {CustomHeadCell, TableSelectCell, TableTextCell, TableTextFieldCell,} from "shared/components/TableComponents";
import {useNavigate} from "react-router-dom";
import {TabPanel} from "@mui/lab";
import {CustomButton} from "~/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";

export const FrequentlyAskedQutDetail = () => {

  const [classify, setClassify] = useState(["선택"]);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const [displaySttus, setDisplaySttus] =useState("전시");

  return <Stack id={'FreAsk'} width={'100%'}>
    <TitleContents title={"자주묻는질문 상세"}>
      <CustomTabs tabs={["상세내용"]}>
        <TabPanel value="상세내용" sx={{padding: "0", height: "100%"}}>
          <Stack>
            <SubContents title={"작성자정보"}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextCell
                        division title={"등록일"} label={"2021-10-01"}
                        thWidth={"13%"} tdWidth={"36%"}/>
                      <TableTextCell
                        title={"전시상태"} label={displaySttus}
                        thWidth={"13%"} tdWidth={"36%"}/>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </SubContents>
          </Stack>
          <VerticalInterval size={'40px'}/>
          <Stack>
            <SubContents title={"상세내용"} maxHeight={'100%'}>
              <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableTextFieldCell
                        label={"제목"} defaultLabel={"AI 펀드 투자유치설명회 참여..."} required wordCount={100}
                        division thWidth={"20%"} tdSpan={3} onChange={(text) => {
                        //setReq((state) => ({...req!, sumry: text}))
                      }}/>
                      <TableSelectCell
                        label={"분류"} required
                        thWidth={"20%"}
                        defaultLabel={"선택"}
                        selectLabel={classify}
                        onClick={(selected: string) => {
                          //setSearchParam({...searchParam, 분류: selected})
                        }}/>
                    </TableRow>
                    <TableRow>
                      <TableTextFieldCell
                        label={"내용"} defaultLabel={"내용을 출력합니다."} multiline required wordCount={500}
                        thWidth={"20%"} tdSpan={5} onChange={(text) => {
                        //setReq((state) => ({...req!, sumry: text}))
                      }}/>
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
          <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%", marginTop: "40px"}}>
            <Stack>
              <CustomButton
                label={"목록"} type={"largeList"} color={"outlined"}
                onClick={() => {
                  navigate('/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut')
                }}
              />
            </Stack>
            <Stack direction={'row'}>
              <CustomButton
                label={"삭제"}
                type={"largeList"}
                onClick={async () => {
                  //   const result = await FrequentlyAskedQutService.delete(id!)
                  //   if (result.success) {
                       addModal({
                         open: true, isDist: true, type: 'normal', content: '삭제되었습니다.',
                         onConfirm: () => {
                           navigate('/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut')
                         }
                       })
                     }
                 }
              />
              {
                (displaySttus === '전시') &&
                <CustomButton
                  label={"전시안함"}
                  //label={state.전시상태}
                  type={"largeList"}
                  onClick={async () => {
                    //   const result = await FrequentlyAskedQutService.change(id!)
                    //   if (result.success) {
                         addModal({
                           open: true, isDist: true, type: 'normal', content: '전시안함 처리되었습니다',
                           onConfirm: () => {
                             setDisplaySttus("전시안함")
                           }
                         })
                    //   }
                  }}
                />
              }
              {
                (displaySttus === '전시안함') &&
                <CustomButton
                  label={"전시"}
                  type={"largeList"}
                  onClick={async () => {
                    //   const result = await FrequentlyAskedQutServiceService.change(id!)
                    //   if (result.success) {
                         addModal({
                           open: true, isDist: true, type: 'normal', content: '전시 처리되었습니다',
                           onConfirm: () => {
                             setDisplaySttus("전시")
                           }
                         })
                    //   }
                  }}
                />
              }

              <CustomButton
                label={"저장"}
                type={"largeList"}
                onClick={() => {
                  if (checkValidity('FreAsk')) {
                    addModal({open: true, isDist: true, type: 'normal', content: '저장되었습니다.'})
                    navigate('/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut/1156')
                  }

                  // const result = await FrequentlyAskedQutService.deleteEquipment(id!)
                  // if (result.success) {
                  //   addModal({
                  //     open: true, isDist: true, type: 'normal', content: '저장되었습니다.',
                  //     onConfirm: () => {
                  //       navigate(-1)
                  //     }
                  //   })
                  // }
                }}/>
            </Stack>
          </Stack>
        </TabPanel>
      </CustomTabs>
    </TitleContents>
  </Stack>
}


export default FrequentlyAskedQutDetail
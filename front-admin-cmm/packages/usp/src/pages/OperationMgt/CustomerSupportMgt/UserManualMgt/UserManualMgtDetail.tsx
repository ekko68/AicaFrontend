import React, {useRef, useState} from "react";
import {
  CustomTabs,
  SubAttachFileContents,
  SubContents,
  TitleContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {Box, Stack, Table, TableBody, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {CustomHeadCell, TableSelectCell, TableTextCell, TableTextFieldCell,} from "shared/components/TableComponents";
import {useNavigate} from "react-router-dom";
import {TabPanel} from "@mui/lab";
import {CustomButton} from "~/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";

export const UserManualMgtDetail = () => {

  const [classify, setClassify] = useState(["전체"]);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const [displaySttus, setDisplaySttus] =useState("전시");
  const imgRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<any>();

  return <Stack id={'UserManual'} width={'100%'}>
    <TitleContents title={"사용자메뉴얼 상세"}>
      <CustomTabs tabs={["상세내용"]}>
        <TabPanel value="상세내용" sx={{padding: "0", height: "100%"}}>
          <Stack>
            <SubContents title={"기본정보"}>
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
            <VerticalInterval size={"40px"}/>
            <SubContents title={"이미지"} maxHeight={'100%'}
                         required
                         rightContent={<Box>
                           <CustomButton
                             label={"삭제"} type={"small"} color={"list"}
                             onClick={() => {
                               setSelectedImage(null)
                             }}
                           />
                           <CustomButton
                             label={"등록"} type={"small"} color={"list"}
                             onClick={() => {
                               if (imgRef.current) imgRef.current.click()
                             }}
                           />
                         </Box>}

            >
              <input
                hidden ref={imgRef}
                type={"file"}
                accept='image/*'
                onChange={async (event: any) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setSelectedImage(event.target.files[0])
                    const img = new FormData();
                    img.append("image", event.target.files[0])
                  }
                }}
              />
              <Stack style={{border: "1px solid #d7dae6", width: '100%', height: "320px", alignItems: "center", justifyContent:"center"}}>
                {selectedImage ?
                  <img src={URL.createObjectURL(selectedImage)} style={{width: "300px", height: "300px"}}/> : "이미지를 등록해주세요"}
              </Stack>
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
                        label={"제목"} defaultLabel={"2021년 인공지능사업융합사업단 사업 경과 보고 자료"} required wordCount={100}
                        division thWidth={"13%"} tdSpan={3} onChange={(text) => {
                        //setReq((state) => ({...req!, sumry: text}))
                      }}/>
                      <TableSelectCell
                        label={"분류"} required
                        thWidth={"13%"}
                        defaultLabel={"전체"}
                        selectLabel={classify}
                        onClick={(selected: string) => {
                          //setSearchParam({...searchParam, 분류: selected})
                        }}/>
                    </TableRow>
                    <TableRow>
                      <TableTextFieldCell
                        label={"내용"} defaultLabel={"2021년 인공지능융합..."} multiline required wordCount={500}
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
                  navigate('/OperationMgt/CustomerSupportMgt/UserManualMgt')
                }}
              />
            </Stack>
            <Stack direction={'row'}>
              <CustomButton
                label={"삭제"}
                type={"largeList"}
                onClick={async () => {
                  //   const result = await UserManualMgtService.delete(id!)
                  //   if (result.success) {
                       addModal({
                         open: true, isDist: true, type: 'normal', content: '삭제되었습니다.',
                         onConfirm: () => {
                           navigate(-1)
                         }
                       })
                  //   }
                }}
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
                  if (checkValidity('UserManual')) {
                    addModal({open: true, isDist: true, type: 'normal', content: '저장되었습니다.'})
                    navigate('/OperationMgt/CustomerSupportMgt/UserManualMgt/1157')
                  }

                  // const result = await UserManualMgtService.deleteEquipment(id!)
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


export default UserManualMgtDetail
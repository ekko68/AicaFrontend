import React, {Fragment, useRef, useState} from "react";
import {
  SubAttachFileContents,
  SubContents,
  TitleContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {TableSelectCell, TableTextFieldCell,} from "shared/components/TableComponents";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";

export const UserManualMgtRegi = () => {

  const [classify, setClassify] = useState(["선택"]);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const imgRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<any>();

  return <TitleContents title={"사용자메뉴얼 등록"}>
    <Stack style={{marginTop: '40px'}} width={'100%'} id={'UserManualRegi'}>
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
      <VerticalInterval size={"40px"}/>
      <SubContents title={"상세내용"} maxHeight={"100%"}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
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
                  label={"제목"} defaultLabel={"AI 펀드 투자유치설명회 참여..."} required wordCount={30}
                  thWidth={"20%"} tdSpan={5} onChange={(text) => {
                  //setReq((state) => ({...req!, sumry: text}))
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
      <VerticalInterval size={'40px'}/>
      <SubAttachFileContents
        atchmnflGroupId={''}
        atchmnfl={[]}
        onAllDownload={() => {
        }}
        onDownload={() => {
        }}>
      </SubAttachFileContents>
    </Stack>
    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%", marginTop: "40px"}}>
      <Stack>
        <CustomButton
          label={"목록"} type={"largeList"} color={"outlined"}
          onClick={() => {
            navigate(-1)
          }}
        />
      </Stack>
      <Stack>
        <CustomButton
          label={"저장"}
          type={"largeList"}
          onClick={() => {
            if (checkValidity('UserManualRegi')) {
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
  </TitleContents>
}


export default UserManualMgtRegi
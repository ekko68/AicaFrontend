import React, {Fragment, useState} from "react";
import {
  SubAttachFileContents,
  SubContents,
  TitleContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  TableComponents, TableSelectCell,
  TableTextCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {dayFormat} from "shared/utils/stringUtils";
import {CustomButton} from "~/components/ButtonComponents";
import {CustomCheckBoxs, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {useNavigate} from "react-router-dom";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";

export const FrequentlyAskedQutRegi = () => {

  const [classify, setClassify] = useState(["선택"]);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()

  return <TitleContents title={"자주묻는질문 등록"}>

    <Stack style={{marginTop: '40px'}} width={'100%'} id={'FreAskRegi'}>
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
                  label={"제목"} defaultLabel={"AI 펀드 투자유치설명회 참여..."} required wordCount={100}
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
          onAllDownload={() => {}}
          onDownload={() => {}}>
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
          onClick={()=>{
            if (checkValidity('FreAskRegi')) {
              addModal({open: true, isDist: true, type: 'normal', content: '저장되었습니다.'})
              navigate('/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut/1156')
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


export default FrequentlyAskedQutRegi
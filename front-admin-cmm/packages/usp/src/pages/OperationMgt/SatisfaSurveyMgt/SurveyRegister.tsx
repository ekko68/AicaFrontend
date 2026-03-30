import {SubContents, TitleContents} from "shared/components/LayoutComponents";
import TableContainer from "@mui/material/TableContainer";
import {Stack, Table, TableBody, TableRow} from "@mui/material";
import {
  TableDateTermCell,
  TableRadioCell,
  TableSelectCell,
  TableTextCell,
  TableTextFieldCell
} from "shared/components/TableComponents";
import {dayFormat} from "shared/utils/stringUtils";
import React, {useState} from "react";
import {설문지등록, 포털구분} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {checkValidity} from "shared/utils/validUtil";
import {SatisfaSurveyMgtService} from "~/pages/OperationMgt/SatisfaSurveyMgt/Service/SatisfaSurveyMgtService";
import {useGlobalModalStore} from "~/store/GlobalModalStore";

const SurveyRegister = () => {
  const navigate = useNavigate()
  const [register, setRegister] = useState<설문지등록>()
  const {addModal} = useGlobalModalStore()

  return <TitleContents title={'설문지 등록'} id={'SurveyRegister'}>
    <SubContents title={'기본정보'} maxHeight={'100%'}>
      <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextFieldCell
                division label={"설문지명"} defaultLabel={''}
                required thWidth={"13%"} tdSpan={3}
                onChange={(text) => {
                  setRegister({...register!, 설문지명: text})
                }}
              />

              <TableSelectCell
                label={'포털구분'} selectLabel={포털구분}
                required thWidth={"13%"} tdWidth={"21%"}
                onClick={(selectValue) => {
                  setRegister({...register!, 포털구분: selectValue})
                }}/>
            </TableRow>

            <TableRow>
              <TableDateTermCell
                division label={'진행기간'}
                thWidth={"13%"} tdWidth={"21%"}
                onChange={(beginTime, endTime) => {
                  setRegister({...register!, 진행시작일자: beginTime.getTime(), 진행시종료일자: endTime.getTime()})
                }}/>

              <TableRadioCell
                division label={'사용여부'} radioLabel={['사용', '사용안함']}
                row thWidth={"13%"} tdWidth={"21%"}
                onClick={(selected) => {
                  setRegister({...register!, 사용여부: (selected == '사용')})
                }}/>

              <TableRadioCell
                label={'중복응답'} radioLabel={['허용', '불가']}
                row thWidth={"13%"} tdWidth={"21%"}
                onClick={(selected) => {
                  setRegister({...register!, 중복응답: (selected == '허용')})
                }}/>
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                required multiline label={'설명'}
                thWidth={"13%"} tdSpan={5} wordCount={1000}
                onChange={(text) => {
                  setRegister({...register!, 설명: text})
                }}
              />
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1)
        }}
      />

      <CustomButton
        label={"저장"}
        onClick={async () => {
          if (checkValidity('SurveyRegister') && register) {
            // const res = await SatisfaSurveyMgtService.postRegister(register)
            // if (!res.success) return

            addModal({
              open: true, isDist: true, content: '저장되었습니다.',
              onConfirm: () => {navigate('/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt')},
              onClose: () =>  {navigate('/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt')}
            })
          }
        }}
      />
    </Stack>
  </TitleContents>
}

export default SurveyRegister
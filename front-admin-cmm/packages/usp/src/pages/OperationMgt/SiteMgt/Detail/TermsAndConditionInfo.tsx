import {Box, Button, Stack, Table, TableRow, TextField} from "@mui/material";
import {SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import {CustomButton, CustomRadioButtons} from "shared/components/ButtonComponents";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import React, {Dispatch, SetStateAction, useState} from "react";
import {약관관리페이지} from "~/pages/OperationMgt/SiteMgt/Model";
import {dayFormat} from "shared/utils/stringUtils";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {ModalComponents} from "shared/components/SharedModalComponents";
import {DateCell} from "shared/components/TableComponents";
import {Color} from "shared/components/StyleUtils";

export const TermsAndConditionInfo = () => {
  const {addModal} = useGlobalModalStore()
  const [list, setList] = useState<약관관리페이지[]>(tempData);
  const [copyList, setCopyList] = useState<약관관리페이지[]>(tempData);
  const [detail, setDetail] = useState('')
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(0)
  const [id, setId] = useState(0)
  const [day, setDay] = useState('')
  const navigate = useNavigate()

  return <Stack spacing={'40px'}>
    <Stack flexDirection={'row'}>
      <SubContents width={'480px'} maxHeight={'100%'} title={
        <CustomRadioButtons data={['오늘기준', '전체']} defaultData={'오늘기준'} row onClick={selected => setDay(selected)}/>}
                   rightContent={<CustomButton label={'조회'} color={'list'} type={'small'} onClick={() => {
                     if (day === '오늘기준') {
                       const result = list.filter(m => {
                         if (m.날짜) {
                           const day1 = dayFormat(m.날짜)
                           const day2 = dayFormat(Date.now())
                           if (day1 === day2) {
                             return true
                           }
                         }
                         return false
                       })
                       if (result) setCopyList(result)
                     } else {
                       setCopyList([])
                       setCopyList(list)
                     }
                   }}/>}>
        <Box sx={{
          border: '1px solid #c4c4c4',
          height: '585px',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          <Table sx={{textAlign: 'center'}}>
            {
              copyList.map((m, i) => {
                return <TableRow>
                  <Button
                    sx={{
                      borderBottom: '1px solid #c4c4c4',
                      height: '53px',
                      width: '100%',
                      color: Color.blackAlphaTest,
                      borderRadius: '4px',
                      backgroundColor: m.id === id ? '#c4c4c4' : '#ffffff'
                    }}
                    onClick={() => {
                      m.내용 ? setDetail(m.내용) : setDetail('')
                      setId(m.id)
                      setIndex(i)
                    }}
                  >{m.날짜 && dayFormat(m.날짜) || ''}</Button>
                </TableRow>
              })
            }
          </Table>
        </Box>
      </SubContents>

      <SubContents title={'약관내용'} maxHeight={'100%'} rightContent={
        <CustomButton label={'미리보기'} type={'small'} color={'list'}
                      onClick={() => {
                        setOpen(!open)
                      }}/>}>
        <Box sx={{margin: '8px', border: 'none', height: '600px', textAlign: 'center'}}>
          <TextFieldContainer fullWidth rows={20} multiline value={detail}
                              onChange={event => setDetail(event.target.value)}/>
          <VerticalInterval size={'14px'}/>
          <Box sx={{
            border: '1px solid #c4c4c4',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CustomRadioButtons data={['내용수정', '개정 및 시행']} row defaultData={'내용수정'}/>
            <DateCell label={''} width={180} onChange={time => setTime(time.getTime())}/>
          </Box>
        </Box>
      </SubContents>
    </Stack>

    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1);
        }}
      />
      <CustomButton
        label={'저장'} type={"largeList"}
        onClick={() => {
          setList(list.map((m, i) => {
            return i === index ? {...list, 날짜: m.날짜, 내용: detail, id: m.id, 시행일자: time} : m
          }))
          addModal({open: true, isDist: true, content: '저장되었습니다.'})
        }}
      />
    </Stack>
    <TextView open={open} setOpen={setOpen} detail={detail} title={'약관관리'}/>
  </Stack>
}

const TextView: React.FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  detail: string
  title: string
}> = props => {
  return <ModalComponents
    open={props.open}
    type={'normal'} title={'미리보기'}
    onConfirm={async () => {
      /*await EquipmentService.putUseNpyProcess({reqstId: id!.toString(), npyResn: details})
      props.setState({...props.state, npyResn: details})*/
      //props.setState('정상')

      // const endCheck = await EquipmentInformationService.putEquipmentsEndCheck(id!, correctData)
      // mgtInfoData.setModalOpen("checkFinish",false);
      // mgtInfoData.setMgtInfoData({
      //   ...mgtInfoData.mgtInfoData!,
      //   available: endCheck.eqpmntStateInfo!.available,
      //   eqpmnSt: endCheck.eqpmntStateInfo!.eqpmnSt,
      //   inspectSt: "0",
      //   checkParam: null
      // })
      props.setOpen(false)
      window.scrollTo(0, 0)
    }}
    onClose={() => {
      // mgtInfoData.setModalOpen("checkFinish",false);
      props.setOpen(false)
    }}>
    <SubContents title={props.title} hideDivision>
      <Box height={'150px'} width={'100%'} paddingX={'30px'}>
        {props.detail}
      </Box>
    </SubContents>
  </ModalComponents>
}

const TextFieldContainer = styled(TextField)`
  .MuiInputBase-root {
    height: 492px;
    align-items: baseline;
  }
`

const tempData: 약관관리페이지[] = [
  {
    id: 1,
    날짜: Date.now(),
    내용: '내용1'
  }, {
    id: 2,
    날짜: Date.now(),
    내용: '내용8'
  }, {
    id: 3,
    날짜: Date.now() - (60 * 60 * 24 * 1000 * 1),
    내용: '내용2'
  }, {
    id: 4,
    날짜: Date.now() - (60 * 60 * 24 * 1000 * 3),
    내용: '내용3'
  }, {
    id: 5,
    날짜: Date.now() - (60 * 60 * 24 * 1000 * 2),
    내용: '내용4'
  },
  {
    id: 6,
    날짜: Date.now() - (60 * 60 * 24 * 1000 * 6),
    내용: '내용5'
  }, {
    id: 7,
    날짜: Date.now(),
    내용: '내용6'
  },
  {id: 8, 날짜: Date.now(),}, {id: 9, 날짜: Date.now(),}, {id: 10, 날짜: Date.now(),}, {id: 11, 날짜: Date.now(),}
]


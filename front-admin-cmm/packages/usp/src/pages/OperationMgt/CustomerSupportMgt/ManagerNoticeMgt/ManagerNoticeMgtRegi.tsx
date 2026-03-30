import React, {Fragment, useRef, useState} from "react";
import {
  SubAttachFileContents,
  SubContents,
  TitleContents,
  VerticalInterval
} from "shared/components/LayoutComponents";
import {Box, FormControl, Stack, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  CustomHeadCell,
  DateTermCell,
  TableComponents,
  TableRadioCell,
  TableSelectCell,
  TableTextFieldCell, TextFieldCell, WithCustomRowData,
} from "shared/components/TableComponents";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {공지상세정보, 관련주소사이트} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

export const ManagerNoticeMgtRegi = () => {

  const [classify, setClassify] = useState(["선택"]);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const imgRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<any>();

  const [noticeRowList, setNoticeRowList] = useState<WithCustomRowData<공지상세정보>[]>([])
  const [noticeSelected, setNoticeSelected] = useState<string[]>([])

  const [relatedSiteRowList, setRelatedSiteRowList] = useState<WithCustomRowData<관련주소사이트>[]>([])
  const [siteSelected, setSiteSelected] = useState<string[]>([])


  return <TitleContents title={"관리자공지사항 등록"}>
    <Stack style={{marginTop: '40px'}} width={'100%'} id={'ManagerNoticeRegi'}>
      <SubContents title={"공지정보"}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  label={"제목"} defaultLabel={"사용자지원포털 어드민 일시 사용..."} required wordCount={30}
                  division thWidth={"13%"} tdSpan={3} onChange={(text) => {
                  //setReq((state) => ({...req!, sumry: text}))
                }}/>
              </TableRow>
              <TableRow>
                <TableRadioCell
                  label={"상단고정여부"} radioLabel={["고정안함", "고정"]} row
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
      <VerticalInterval size={"40px"}/>
      <SubContents title={"공지상세정보"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setNoticeRowList(noticeRowList.filter(f => !noticeSelected.includes(f.key)))
          }}/>
          <CustomButton type={"small"} color={"list"} label={"추가"} onClick={() => {
            setNoticeRowList(noticeRowList.concat({
              key: Math.random().toString(),
              주제: '', 내용: '',
            }))
          }}/>
        </Stack>
      }>
        <TableComponents<공지상세정보>
          isCheckBox hidePagination hideRowPerPage
          hideBoarderTopColor page={0} rowCount={noticeRowList.length} rowsPerPage={0}
          headCells={noticeHeadCells}
          bodyRows={noticeRowList}
          onSelectedKey={(keys: string[]) => {
            setNoticeSelected(keys)
          }}
          tableCell={(data, i) => {

            return <Fragment>
              <TableCell key={"주제-" + data.key} width={"25%"}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.주제}
                    //label={props.label}
                    name={'주제'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setNoticeRowList(noticeRowList.map(m => {
                        return {
                          ...m,
                          주제: (m.key == data.key) ? e.target.value : m.주제
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>
              <TextFieldCell
                multiline
                required
                wordCount={500}
                tdWidth={"100%"}
                defaultLabel={''}

                onChange={(e) => {
                  setNoticeRowList(noticeRowList.map(m => {
                    return {
                      ...m,
                      내용: (m.key == data.key) ? "" : m.내용
                    }
                  }))
                }}/>
            </Fragment>
          }}
        />
      </SubContents>

      <VerticalInterval size={'40px'}/>
      <SubContents title={"관련사이트주소"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setRelatedSiteRowList(relatedSiteRowList.filter(f => !siteSelected.includes(f.key)))
          }}/>
          <CustomButton type={"small"} color={"list"} label={"추가"} onClick={() => {
            setRelatedSiteRowList(relatedSiteRowList.concat({
              key: Math.random().toString(),
              사이트명: '', 사이트주소: '',
            }))
          }}/>
        </Stack>
      }>
        <TableComponents<관련주소사이트>
          isCheckBox hidePagination hideRowPerPage
          hideBoarderTopColor page={0} rowCount={relatedSiteRowList.length} rowsPerPage={0}
          headCells={siteHeadCells}
          bodyRows={relatedSiteRowList}
          onSelectedKey={(keys: string[]) => {
            setSiteSelected(keys)
          }}
          tableCell={(data, i) => {

            return <Fragment>
              <TableCell key={"count-" + data.key} width={'6%'}>{i + 1}</TableCell>
              <TableCell key={"사이트명-" + data.key} width={"25%"}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.사이트명}
                    //label={props.label}
                    name={'사이트명'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setRelatedSiteRowList(relatedSiteRowList.map(m => {
                        return {
                          ...m,
                          사이트명: (m.key == data.key) ? e.target.value : m.사이트명
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"사이트주소-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.사이트주소}
                    multiline
                    //label={props.label}
                    name={'사이트주소'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setRelatedSiteRowList(relatedSiteRowList.map(m => {
                        return {
                          ...m,
                          사이트주소: (m.key == data.key) ? e.target.value : m.사이트주소
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>
            </Fragment>
          }}
        />
      </SubContents>

      <VerticalInterval size={"40px"}/>
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
            if (checkValidity('ManagerNoticeRegi')) {
              addModal({open: true, isDist: true, type: 'normal', content: '저장되었습니다.'})
              navigate('/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt/1159')
            }
            // const result = await ManagerNoticeMgtService.deleteEquipment(id!)
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

const noticeHeadCells: CustomHeadCell<공지상세정보>[] = [
  {
    id: '주제',
    align: 'center',
    label: '주제',
  },
  {
    id: '내용',
    align: 'center',
    label: '내용',
  },
];

const siteHeadCells: CustomHeadCell<관련주소사이트>[] = [
  {
    id: '번호',
    align: 'center',
    label: '번호',
  },
  {
    id: '사이트명',
    align: 'center',
    label: '사이트명',
  },
  {
    id: '사이트주소',
    align: 'center',
    label: '사이트주소',
  },
];

export default ManagerNoticeMgtRegi
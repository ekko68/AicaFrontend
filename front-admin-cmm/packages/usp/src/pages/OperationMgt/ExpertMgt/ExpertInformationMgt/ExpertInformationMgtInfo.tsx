import React, {Fragment, useEffect, useState} from "react";
import {SubAttachFileContents, SubContents} from "shared/components/LayoutComponents";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  AddressParam,
  CustomHeadCell, DateCell, DateTermCell, TableAddressCell,
  TableComponents, TableSelectCell,
  TableTextCell,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {dayFormat} from "shared/utils/stringUtils";
import {CustomButton} from "~/components/ButtonComponents";
import {
  dummyExpertInformation,
  firstClsfc,
  secondClsfc,
  경력정보, 자격증정보,
  전문가신청리스트, 전문가정보상세,
  전문분야, 졸업구분,
  학력정보,
  학위,
} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {useNavigate, useParams} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select";
import {ModalComponents} from "shared/components/ModalComponents";
import styled from "@emotion/styled";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {isValidDateValue} from "@testing-library/user-event/dist/utils";
import {checkValidity} from "shared/utils/validUtil";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {ExpertMgtService} from "~/pages/OperationMgt/ExpertMgt/Service/ExpertMgtService";

export const ExpertInformationMgtInfo = () => {
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  const {id} = useParams()
  // const info = ExpertMgtService.getExpertInformation(id!)

  const postPopup = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const [editData, setEditData] = useState<전문가정보상세>(dummyExpertInformation)
  const [address, setAddress] = useState<AddressParam>({zonecode: '', address: '', detailAddress: ''})

  const [expertSelected, setExpertSelected] = useState<string[]>([])
  const [expertRowList, setExpertRowList] = useState<WithCustomRowData<전문분야>[]>([])

  const [careerRowList, setCareerRowList] = useState<WithCustomRowData<경력정보>[]>([])
  const [careerSelected, setCareerSelected] = useState<string[]>([])

  const [academicAbilityRowList, setAcademicAbilityRowList] = useState<WithCustomRowData<학력정보>[]>([])
  const [academicAbilitySelected, setAcademicAbilitySelected] = useState<string[]>([])

  const [certificateRowList, setCertificateRowList] = useState<WithCustomRowData<자격증정보>[]>([])
  const [certificateSelected, setCertificateSelected] = useState<string[]>([])

  // useEffect(() => {
  //   if (!info.isLoading && !info.isFetching) {
  //     if (!!info.data) {
  //       setEditData({...info.data})
  //       setExpertRowList(info.data.전문분야.map((m) => {
  //         return {key: m.id!, ...m}
  //       }))
  //
  //       setCareerRowList(info.data.경력정보.map(m => {
  //         return {key: m.id!, ...m}
  //       }))
  //
  //       setAcademicAbilityRowList(info.data.학력정보.map(m => {
  //         return {key: m.id!, ...m}
  //       }))
  //
  //       setCertificateRowList(info.data.자격증정보.map(m => {
  //         return {key: m.id!, ...m}
  //       }))
  //
  //       setAddress(info.data.주소)
  //     }
  //   }
  // }, [info.data, info.isLoading, info.isFetching])

  // 임시 가데이터를 위한 Effect
  useEffect(() => {
    if (!!editData) {
      setExpertRowList(editData.전문분야.map((m) => {
        return {key: m.id!, ...m}
      }))

      setCareerRowList(editData.경력정보.map(m => {
        return {key: m.id!, ...m}
      }))

      setAcademicAbilityRowList(editData.학력정보.map(m => {
        return {key: m.id!, ...m}
      }))

      setCertificateRowList(editData.자격증정보.map(m => {
        return {key: m.id!, ...m}
      }))

      setAddress(editData.주소)
    }
  }, [])

  const handleComplete = (data) => {
    let fullAddress = data.address
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress({...address, zonecode: data.zonecode, address: fullAddress})
  };

  return <Fragment>
    <Stack spacing={"40px"}>
      <SubContents title={"신청자정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"이름"} label={editData?.이름 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                />
                <TableTextCell
                  division title={"생년월일"} label={editData?.생년월일 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                />
                <TableTextCell
                  title={"성별"} label={editData?.성별 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  division title={"내외국인"} label={editData?.내외국인 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                />
                <TableTextCell
                  division title={"휴대폰번호"} label={editData?.휴대폰번호 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                />
                <TableTextCell
                  title={"이메일"} label={editData?.이메일 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"소속 및 대학정보"} id={'info'} maxHeight={'100%'}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  division label={"직장명"} defaultLabel={editData?.직장명 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 직장명: text})
                  }}
                />
                <TableTextFieldCell
                  division label={"부서명"} defaultLabel={editData?.부서명 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 부서명: text})
                  }}
                />
                <TableTextFieldCell
                  label={"직위"} defaultLabel={editData?.직위 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 직위: text})
                  }}
                />
              </TableRow>

              <TableRow>
                <TableTextFieldCell
                  division label={"직무"} defaultLabel={editData?.직무 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 직무: text})
                  }}
                />
                <TableTextFieldCell
                  division label={"직장 전화번호"} defaultLabel={editData?.직장전화번호 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 직장전화번호: text})
                  }}
                />
                <TableTextFieldCell
                  required label={"학부"} defaultLabel={editData?.학부 || ''}
                  thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 학부: text})
                  }}
                />
              </TableRow>

              <TableRow>
                <TableTextFieldCell
                  division label={"최종 대학명"} defaultLabel={editData?.최종대학명 || ''}
                  required thWidth={"13%"} tdWidth={"21%"}
                  onChange={(text) => {
                    setEditData({...editData!, 최종대학명: text})
                  }}
                />
                <TableAddressCell
                  label={"직장주소"} default={address}
                  required thWidth={"13%"} tdSpan={3}
                  onOpen={() => postPopup({onComplete: handleComplete})}
                  onChange={(data: AddressParam) => {
                    setAddress(data)
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>


      <SubContents required title={"전문분야"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setExpertRowList(expertRowList.filter(f => !expertSelected.includes(f.key)))
          }}/>
          <CustomButton type={"small"} color={"list"} label={"추가"} onClick={() => {
            setExpertRowList(expertRowList.concat({
              key: Math.random().toString(),
              depth1: '', depth2: ''
            }))
          }}/>
        </Stack>
      }>
        <TableComponents<전문분야>
          isCheckBox hidePagination hideRowPerPage
          hideBoarderTopColor page={0} rowCount={expertRowList.length} rowsPerPage={0}
          headCells={headCells}
          bodyRows={expertRowList}
          onSelectedKey={(keys: string[]) => {
            setExpertSelected(keys)
          }}
          tableCell={(data, i) => {

            return <Fragment>
              <TableCell key={"count-" + data.key} width={'5%'}>{i + 1}</TableCell>
              <TableCell key={"dscntRate-" + data.key} width={'90%'}>
                <Stack direction={'row'} spacing={'20px'}>
                  <Select
                    size={'small'} value={data.depth1}
                    sx={{width: '150px'}}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(event: SelectChangeEvent) => {
                      setExpertRowList(expertRowList.map(m => {
                        const depth1 = (m.key == data.key)? event.target.value : m.depth1
                        return {
                          ...m,
                          depth1: depth1
                        }
                      }))
                    }}>
                    {
                      firstClsfc.map((m, i) => {
                        return <MenuItem key={i} value={m}>{m}</MenuItem>
                      })
                    }
                  </Select>
                  <Select
                    size={'small'} value={data.depth2}
                    sx={{width: '150px'}}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(event: SelectChangeEvent) => {
                      setExpertRowList(expertRowList.map(m => {
                        const depth2 = (m.key == data.key)? event.target.value : m.depth2
                        return {
                          ...m,
                          depth2: depth2
                        }
                      }))
                    }}>
                    {
                      secondClsfc.map((m, i) => {
                        return <MenuItem key={i} value={m}>{m}</MenuItem>
                      })
                    }
                  </Select>
                </Stack>
              </TableCell>
            </Fragment>
          }}
        />
      </SubContents>

      <SubContents title={"경력정보"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setCareerRowList(careerRowList.filter(f => !careerSelected.includes(f.key)))
          }}/>
          <CustomButton type={"small"} color={"list"} label={"추가"} onClick={() => {
            setCareerRowList(careerRowList.concat({
              key: Math.random().toString(),
              직장명: '', 담당업무: '', 부서명: '', 직위: '',
              근무시작일: Date.now(), 근무종료일: Date.now()
            }))
          }}/>
        </Stack>
      }>
        <TableComponents<경력정보>
          isCheckBox hidePagination hideRowPerPage
          hideBoarderTopColor page={0} rowCount={careerRowList.length} rowsPerPage={0}
          headCells={careerHeadCells}
          bodyRows={careerRowList}
          onSelectedKey={(keys: string[]) => {
            setCareerSelected(keys)
          }}
          tableCell={(data, i) => {

            return <Fragment>
              <DateTermCell
                label={'근무시간'} defaultStartTime={data.근무시작일} defaultEndTime={data.근무종료일}
                width={'380px'} onChange={(beginTime, endTime) => {
                careerRowList.map(m => {
                  if (m.key == data.key) {
                    m.근무시작일 = beginTime.getTime()
                    m.근무종료일 = endTime.getTime()
                  }
                })
              }}
              />

              <TableCell key={"직장명-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.직장명}
                    //label={props.label}
                    name={'직장명'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setCareerRowList(careerRowList.map(m => {
                        return {
                          ...m,
                          직장명: (m.key == data.key) ? e.target.value : m.직장명
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"부서명-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.부서명}
                    //label={props.label}
                    name={'부서명'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setCareerRowList(careerRowList.map(m => {
                        return {
                          ...m,
                          부서명: (m.key == data.key) ? e.target.value : m.부서명
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"직위-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.직위}
                    //label={props.label}
                    name={'직위'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setCareerRowList(careerRowList.map(m => {
                        return {
                          ...m,
                          직위: (m.key == data.key) ? e.target.value : m.직위
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"담당업무-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.담당업무}
                    //label={props.label}
                    name={'담당업무'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setCareerRowList(careerRowList.map(m => {
                        return {
                          ...m,
                          담당업무: (m.key == data.key) ? e.target.value : m.담당업무
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>
            </Fragment>
          }}
        />
      </SubContents>

      <SubContents title={"학력정보"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setAcademicAbilityRowList(academicAbilityRowList.filter(f => !academicAbilitySelected.includes(f.key)))
          }}/>
          <CustomButton type={"small"} color={"list"} label={"추가"} onClick={() => {
            setAcademicAbilityRowList(academicAbilityRowList.concat({
              key: Math.random().toString(),
              전공: '', 학교명: '', 학위: '', 지도교수: '', 졸업구간: '',
              근무시작일: Date.now(), 근무종료일: Date.now()
            }))
          }}/>
        </Stack>
      }>
        <TableComponents<학력정보>
          isCheckBox hidePagination hideRowPerPage
          hideBoarderTopColor page={0} rowCount={academicAbilityRowList.length} rowsPerPage={0}
          headCells={academicAbilityHeadCells}
          bodyRows={academicAbilityRowList}
          onSelectedKey={(keys: string[]) => {
            setAcademicAbilitySelected(keys)
          }}
          tableCell={(data, i) => {

            return <Fragment>
              <DateTermCell
                label={'근무시간'} defaultStartTime={data.근무시작일} defaultEndTime={data.근무종료일}
                width={'380px'} onChange={(beginTime, endTime) => {
                academicAbilityRowList.map(m => {
                  if (m.key == data.key) {
                    m.근무시작일 = beginTime.getTime()
                    m.근무종료일 = endTime.getTime()
                  }
                })
              }}
              />

              <TableCell key={"학위-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <Select
                    size={'small'} value={data.학위}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(event: SelectChangeEvent) => {
                      setAcademicAbilityRowList(academicAbilityRowList.map(m => {
                        const 학위 = (m.key == data.key)? event.target.value : m.학위
                        return {
                          ...m,
                          학위: 학위
                        }
                      }))
                    }}>
                    {
                      학위.map((m, i) => {
                        return <MenuItem key={i} value={m}>{m}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell key={"학교명-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.학교명}
                    //label={props.label}
                    name={'학교명'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setAcademicAbilityRowList(academicAbilityRowList.map(m => {
                        return {
                          ...m,
                          학교명: (m.key == data.key) ? e.target.value : m.학교명
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"전공-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.전공}
                    //label={props.label}
                    name={'전공'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setAcademicAbilityRowList(academicAbilityRowList.map(m => {
                        return {
                          ...m,
                          전공: (m.key == data.key) ? e.target.value : m.전공
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"지도교수-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.지도교수}
                    //label={props.label}
                    name={'지도교수'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setAcademicAbilityRowList(academicAbilityRowList.map(m => {
                        return {
                          ...m,
                          지도교수: (m.key == data.key) ? e.target.value : m.지도교수
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"졸업구간-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <Select
                    size={'small'} value={data.졸업구간}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(event: SelectChangeEvent) => {
                      setAcademicAbilityRowList(academicAbilityRowList.map(m => {
                        const 졸업구간 = (m.key == data.key)? event.target.value : m.졸업구간
                        return {
                          ...m,
                          졸업구간: 졸업구간
                        }
                      }))
                    }}>
                    {
                      졸업구분.map((m, i) => {
                        return <MenuItem key={i} value={m}>{m}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>
            </Fragment>
          }}
        />
      </SubContents>

      <SubContents title={"자격증정보"} rightContent={
        <Stack direction={'row'} spacing={'10px'}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setCertificateRowList(certificateRowList.filter(f => !certificateSelected.includes(f.key)))
          }}/>
          <CustomButton type={"small"} color={"list"} label={"추가"} onClick={() => {
            setCertificateRowList(certificateRowList.concat({
              key: Math.random().toString(),
              자격증명: '', 발급기관: '', 취득일: Date.now()
            }))
          }}/>
        </Stack>
      }>
        <TableComponents<자격증정보>
          isCheckBox hidePagination hideRowPerPage
          hideBoarderTopColor page={0} rowCount={certificateRowList.length} rowsPerPage={0}
          headCells={certificateHeadCells}
          bodyRows={certificateRowList}
          onSelectedKey={(keys: string[]) => {
            setCertificateSelected(keys)
          }}
          tableCell={(data, i) => {

            return <Fragment>
              <DateCell
                label={'취득일'} defaultTime={data.취득일} width={'280px'}
                onChange={(time) => {
                  certificateRowList.map(m => {
                    if (m.key == data.key) {
                      m.취득일 = time.getTime()
                    }
                  })
                }}/>

              <TableCell key={"자격증명-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.자격증명}
                    //label={props.label}
                    name={'자격증명'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setCertificateRowList(certificateRowList.map(m => {
                        return {
                          ...m,
                          자격증명: (m.key == data.key) ? e.target.value : m.자격증명
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>

              <TableCell key={"발급기관-" + data.key}>
                <FormControl fullWidth size={"small"}>
                  <TextField
                    value={data.발급기관}
                    //label={props.label}
                    name={'발급기관'}
                    variant={"outlined"}
                    size={"small"}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onChange={(e) => {
                      setCertificateRowList(certificateRowList.map(m => {
                        return {
                          ...m,
                          발급기관: (m.key == data.key) ? e.target.value : m.발급기관
                        }
                      }))
                    }}/>
                </FormControl>
              </TableCell>
            </Fragment>
          }}
        />
      </SubContents>


      <SubAttachFileContents
        atchmnflGroupId={''}
        atchmnfl={[{fileNm: 'file', fileSize: 1024 * 1024 * 2.4, attachmentId: 'att-sdfsdf', fileType: 'xlxs'}]}
        onAllDownload={() => {
        }}
        onDownload={() => {
        }}/>
    </Stack>

    <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate('/OperationMgt/ExpertMgt/ExpertInformationMgt')
        }}
      />
      <Stack flexDirection={"row"} spacing={'30px'}>
        <CustomButton
          label={"삭제"}
          onClick={async () => {
            // const res = await ExpertMgtService.deleteExpertInformation(id!)
            // if (!res.success) return

            addModal({
              open: true, isDist: true, content: '삭제되었습니다.',
              onConfirm: () => {navigate('/OperationMgt/ExpertMgt/ExpertInformationMgt')},
              onClose: () => {navigate('/OperationMgt/ExpertMgt/ExpertInformationMgt')}
            })
          }}
        />
        <CustomButton
          label={"저장"}
          onClick={async () => {
            if (expertRowList.length == 0 || expertRowList[0].depth1 == '' || expertRowList[0].depth2 == '') {
              addModal({open: true, isDist: true, content: '전문분야를 선택해주세요.'})
              return;
            }

            if (checkValidity('info')) {
              // const res = await ExpertMgtService.putSave(id!, {
              //   ...editData!,
              //   주소: address,
              //   전문분야: expertRowList,
              //   경력정보: careerRowList,
              //   학력정보: academicAbilityRowList,
              //   자격증정보: certificateRowList
              // })
              // if (!res.success) return
              // setEditData({...res})

              addModal({open: true, isDist: true, content: '저장됐습니다.'})
            }
          }}
        />
      </Stack>
    </Stack>
  </Fragment>
}

const headCells: CustomHeadCell<{ count: number, experApp: string }>[] = [
  {
    id: 'count',
    align: 'center',
    label: '번호',
  },
  {
    id: 'experApp',
    align: "center",
    label: '전문분야',
  },
];

const careerHeadCells: CustomHeadCell<경력정보 & { 근무기간: string }>[] = [
  {
    id: '근무기간',
    align: 'center',
    label: '근무기간',
  },
  {
    id: '직장명',
    align: 'center',
    label: '직장명',
  },
  {
    id: '부서명',
    align: "center",
    label: '부서명',
  },
  {
    id: '직위',
    align: "center",
    label: '직위',
  },
  {
    id: '담당업무',
    align: "center",
    label: '담당업무',
  },
];

const academicAbilityHeadCells: CustomHeadCell<학력정보 & { 기간: string }>[] = [
  {
    id: '기간',
    align: 'center',
    label: '기간',
  },
  {
    id: '학위',
    align: 'center',
    label: '학위',
  },
  {
    id: '학교명',
    align: "center",
    label: '학교명',
  },
  {
    id: '전공',
    align: "center",
    label: '전공',
  },
  {
    id: '지도교수',
    align: "center",
    label: '지도교수',
  },
  {
    id: '졸업구간',
    align: "center",
    label: '졸업구간',
  },
];

const certificateHeadCells: CustomHeadCell<자격증정보>[] = [
  {
    id: '취득일',
    align: 'center',
    label: '취득일',
  },
  {
    id: '자격증명',
    align: 'center',
    label: '자격증명',
  },
  {
    id: '발급기관',
    align: "center",
    label: '발급기관',
  },
];
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow
} from "@mui/material";
import {
  SimpleTextField,
  SubAttachFileContents,
  SubContents, TitleContents
} from "shared/components/LayoutComponents";
import {
  TableDateTermCell,
  TableRadioCell,
  TableTextCell, TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import React, {useEffect, useRef, useState} from "react";
import {자원정보공유상세조회, 행사이벤트상세조회} from "~/pages/OperationMgt/ParticipationEventMgt/Model";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {AttachmentParam} from "shared/utils/Model";
import {checkValidity} from "shared/utils/validUtil";

const EventEventResister = () => {
  const [state, setState] = useState<행사이벤트상세조회>(tempData);
  const {addModal} = useGlobalModalStore()
  const pcImgRef = useRef<HTMLInputElement>(null);
  const mobileImgRef = useRef<HTMLInputElement>(null);
  const [pcSelectedImage, setPcSelectedImage] = useState<any>();
  const [mobileSelectedImage, setMobileSelectedImage] = useState<any>();
  const imagePcImgRef = useRef<HTMLInputElement>(null);
  const imageMobileImgRef = useRef<HTMLInputElement>(null);
  const [imagePcSelectedImage, setImagePcSelectedImage] = useState<any>();
  const [imageMobileSelectedImage, setImageMobileSelectedImage] = useState<any>();
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<WithCustomRowData<AttachmentParam>[]>([]);
  const [fileSelect, setFileSelect] = useState<string[]>([]);
  const [detail, setDetail] = useState('')

  return <TitleContents title={'행사/이벤트 등록'}>
    <Stack spacing={'40px'} component={'form'} id={'eventEventResister'}>
      <SubContents title={'기본정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell
                  label={'이벤트명'} wordCount={50} required
                  thWidth={"12%"} tdWidth={"38%"} tdSpan={3}/>
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  label={'이동경로URL'}
                  thWidth={"12%"} tdWidth={"38%"} tdSpan={3}/>
              </TableRow>
              <TableRow>
                <TableDateTermCell
                  detailPadding required division label={"진행기간"} thWidth={"12%"} tdWidth={"38%"}
                  onChange={(beginTime, endTime) => {
                  }}/>
                <TableRadioCell
                  row label={'새창여부'} radioLabel={['예', '아니오']}
                  thWidth={"12%"} tdWidth={"38%"} defaultLabel={'예'}
                  onClick={(selected) => {
                  }}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={'썸네일'} maxHeight={'100%'} required>
        <Stack sx={{display: 'flex', flexDirection: 'row', border: "1px solid #d7dae6", overflow: 'hidden'}}>
          <Box sx={{width: '50%', borderRight: '1px solid #d7dae6'}}>
            <Stack
              flexDirection={"row"} paddingX={'20px'}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack flexDirection={"row"}>
                <span>PC</span>
              </Stack>
              <CustomButton label={'첨부'} type={'small'} color={'list'} onClick={() => {
                if (pcImgRef.current) pcImgRef.current.click()
              }}/>
              <input
                hidden ref={pcImgRef}
                type={"file"}
                accept='image/*'
                onChange={async (event: any) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setPcSelectedImage(event.target.files[0])
                    const img = new FormData();
                    img.append("image", event.target.files[0])
                  }
                }}
              />
            </Stack>
            <Box sx={{height: '260px', borderTop: '1px solid #d7dae6', textAlign: 'center'}}>
              {pcSelectedImage ?
                <img src={URL.createObjectURL(pcSelectedImage)}
                     style={{width: "260px", height: "260px"}}/> : '이미지를 등록하세요'}
            </Box>
          </Box>
          <Box sx={{width: '50%'}}>
            <Stack
              flexDirection={"row"} paddingX={'20px'}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack flexDirection={"row"}>
                <span>모바일</span>
              </Stack>
              <CustomButton label={'첨부'} type={'small'} color={'list'} onClick={() => {
                if (mobileImgRef.current) mobileImgRef.current.click()
              }}/>
              <input
                hidden ref={mobileImgRef}
                type={"file"}
                accept='image/*'
                onChange={(event: any) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setMobileSelectedImage(event.target.files[0])
                    const img = new FormData();
                    img.append("image", event.target.files[0])
                  }
                }}
              />
            </Stack>
            <Box sx={{height: '260px', borderTop: "1px solid #d7dae6", textAlign: 'center'}}>
              {mobileSelectedImage ?
                <img src={URL.createObjectURL(mobileSelectedImage)}
                     style={{width: "260px", height: "260px"}}/> : '이미지를 등록하세요'}
            </Box>
          </Box>
        </Stack>
      </SubContents>

      <SubContents title={'이미지'} maxHeight={'100%'} required>
        <Stack sx={{display: 'flex', flexDirection: 'row', border: "1px solid #d7dae6", overflow: 'hidden'}}>
          <Box sx={{width: '50%', borderRight: '1px solid #d7dae6'}}>
            <Stack
              flexDirection={"row"} paddingX={'20px'}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack flexDirection={"row"}>
                <span>PC</span>
              </Stack>
              <CustomButton label={'첨부'} type={'small'} color={'list'} onClick={() => {
                if (imagePcImgRef.current) imagePcImgRef.current.click()
              }}/>
              <input
                hidden ref={imagePcImgRef}
                type={"file"}
                accept='image/*'
                onChange={async (event: any) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setImagePcSelectedImage(event.target.files[0])
                    const img = new FormData();
                    img.append("image", event.target.files[0])
                  }
                }}
              />
            </Stack>
            <Box sx={{height: '260px', borderTop: '1px solid #d7dae6', textAlign: 'center'}}>
              {imagePcSelectedImage ?
                <img src={URL.createObjectURL(imagePcSelectedImage)}
                     style={{width: "260px", height: "260px"}}/> : '이미지를 등록하세요'}
            </Box>
          </Box>
          <Box sx={{width: '50%'}}>
            <Stack
              flexDirection={"row"} paddingX={'20px'}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack flexDirection={"row"}>
                <span>모바일</span>
              </Stack>
              <CustomButton label={'첨부'} type={'small'} color={'list'} onClick={() => {
                if (imageMobileImgRef.current) imageMobileImgRef.current.click()
              }}/>
              <input
                hidden ref={imageMobileImgRef}
                type={"file"}
                accept='image/*'
                onChange={(event: any) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setImageMobileSelectedImage(event.target.files[0])
                    const img = new FormData();
                    img.append("image", event.target.files[0])
                  }
                }}
              />
            </Stack>
            <Box sx={{height: '260px', borderTop: "1px solid #d7dae6", textAlign: 'center'}}>
              {imageMobileSelectedImage ?
                <img src={URL.createObjectURL(imageMobileSelectedImage)}
                     style={{width: "260px", height: "260px"}}/> : '이미지를 등록하세요'}
            </Box>
          </Box>
        </Stack>
      </SubContents>

      <SubContents title={'상세정보'}>
        <Box sx={{paddingX: '10px'}}>
          <SimpleTextField label={'내용'} multiline row={6} wordCount={1000} fullWidth onChange={(text) => {
            setDetail(text)
          }}/>
        </Box>
      </SubContents>

      <SubAttachFileContents edit fileList={fileList} fileSelect={fileSelect}
                             setFileList={setFileList} setFileSelect={setFileSelect}/>

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
            if (checkValidity('eventEventResister') && pcSelectedImage && mobileSelectedImage && imageMobileSelectedImage && imagePcSelectedImage) {
              addModal({open: true, isDist: true, content: '저장되었습니다.'})
            } else
              alert('필수항목을 확인해주세요')
          }}
        />
      </Stack>
    </Stack>
  </TitleContents>
}

export default EventEventResister

const tempData: 행사이벤트상세조회 = {
  이벤트명: '팝업명이 출력됩니다.',
  이동경로: 'URL이 출력됩니다.',
  전시시작일: Date.now(),
  전시종료일: Date.now(),
  새창여부: true,
  첨부파일: [{fileNm: '파일이름', fileSize: 20, attachmentId: 'aaaaa', fileType: 'zip'}]
}
{/*<SubContents title={'첨부파일'} maxHeight={'100%'} rightContent={
        <Box>
          <CustomButton
            label={"첨부"} type={"small"} color={"list"}
            onClick={() => {
              if (fileRef.current) fileRef.current.click()
            }}/>
          <input
            hidden ref={fileRef}
            type={"file"}
            onChange={(event: any) => {
              if (event.target.files && event.target.files.length > 0) {
                const files: WithCustomRowData<첨부파일>[] = {
                  ...event.target.files[0],
                  파일이름: event.target.files[0].name,
                  파일용량: event.target.files[0].size
                };
                setFileList(fileList.concat({...files, key: Math.random().toString()}))
                const file = new FormData();
                file.append("file", event.target.files[0])
              }
            }}
          />
          <CustomButton
            label={"삭제"} type={"small"} color={"list"}
            onClick={() => {
              setFileList(fileList.filter(f => !fileSelect?.includes(f.key)))
              setFileSelect([])
            }}/>
        </Box>}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align={'center'} width={"70px"}>
                <Checkbox checked={isAllCheck} onClick={(e) => {
                  handleSelectAllClick(e)
                }}/>
              </TableCell>
              <TableCell align={"center"} width={"70px"}>번호</TableCell>
              <TableCell align={"center"}>파일명</TableCell>
              <TableCell align={"center"} width={"150px"}>용량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList &&
              fileList.map((m, i) => {
                return <TableRow>
                  <TableCell align={'center'}>
                    <Checkbox checked={fileSelect.includes(m.key)} onClick={(e) => handleClick(e, m.key)}/>
                  </TableCell>
                  <TableCell align={"center"}>{i + 1}</TableCell>
                  <TableCell align={"center"}>{m.파일이름}</TableCell>
                  <TableCell align={"center"}>{`${(m.파일용량 / 1024 / 1024).toFixed(1)}(MB)`}</TableCell>
                </TableRow>
              })
            }

          </TableBody>
        </Table>
      </SubContents>*/
}

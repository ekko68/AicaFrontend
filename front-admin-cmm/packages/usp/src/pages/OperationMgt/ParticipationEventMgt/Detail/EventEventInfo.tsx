import {SubContents} from "shared/components/LayoutComponents";
import {Box, Stack, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TableDateTermCell, TableRadioCell, TableTextCell, TableTextFieldCell} from "shared/components/TableComponents";
import React, {useRef, useState} from "react";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {dayFormat} from "shared/utils/stringUtils";
import {행사이벤트상세조회} from "~/pages/OperationMgt/ParticipationEventMgt/Model";
import {checkValidity} from "shared/utils/validUtil";

export const EventEventInfo = () => {
  const [state, setState] = useState<행사이벤트상세조회>(tempData);
  const pcImgRef = useRef<HTMLInputElement>(null);
  const mobileImgRef = useRef<HTMLInputElement>(null);
  const [pcSelectedImage, setPcSelectedImage] = useState<any>();
  const [mobileSelectedImage, setMobileSelectedImage] = useState<any>();
  const imagePcImgRef = useRef<HTMLInputElement>(null);
  const imageMobileImgRef = useRef<HTMLInputElement>(null);
  const [imagePcSelectedImage, setImagePcSelectedImage] = useState<any>();
  const [imageMobileSelectedImage, setImageMobileSelectedImage] = useState<any>();
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  return <>
    <Stack spacing={'40px'} component={'form'} id={'eventEventInfo'}>
      <SubContents title={'관리정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"등록일"} label={`${dayFormat(Number(state.등록일))}`}
                  thWidth={"13%"} tdWidth={"37%"}/>

                <TableTextCell
                  title={"전시여부"} label={state.전시여부}
                  thWidth={"13%"} tdWidth={"37%"}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={'기본정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldCell label={'이벤트명'} thWidth={'12%'} tdSpan={3} wordCount={50} required
                                    onChange={() => {
                                    }}/>
              </TableRow>
              <TableRow>
                <TableTextFieldCell label={'이동경로'} thWidth={'12%'} tdSpan={3}
                                    onChange={() => {
                                    }}/>
              </TableRow>
              <TableRow>
                <TableDateTermCell division label={'전행기간'} thWidth={'12%'} tdWidth={'38%'} required
                                   onChange={(beginTime, endTime) => {
                                   }}/>
                <TableRadioCell label={'새창여부'} radioLabel={['예', '아니오']} defaultLabel={'예'} row
                                onClick={selected => {
                                }}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={'썸네일'} maxHeight={'100%'}>
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

      <SubContents title={'이미지'} maxHeight={'100%'}>
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

      <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
        <CustomButton
          label={"목록"} type={"largeList"} color={"outlined"}
          onClick={() => {
            navigate(-1);
          }}
        />
        <Stack flexDirection={'row'}>
          <CustomButton
            label={'삭제'} type={"largeList"}
            onClick={() => {
              addModal({
                open: true, content: '삭제하시겠습니까?', onConfirm: () => {
                  addModal({open: true,isDist:true, content:'구현중입니다.'})
                }
              })
            }}
          />
          <CustomButton
            label={'미리보기'} type={"largeList"}
            onClick={() => {
              addModal({open: true, isDist: true, content: '구현중입니다.'})
            }}
          />
          <CustomButton
            label={state.전시여부 === '전시안함' ? '전시' : '전시안함'} type={"largeList"}
            onClick={() => {
              addModal({open: true, isDist: true, content:state.전시여부 === '전시안함' ? '전시 처리되었습니다.' : '전시안함 처리되었습니다.'})
              setState({...state, 전시여부:state.전시여부 === '전시안함' ? '전시' : '전시안함'})
            }}
          />
          <CustomButton
            label={'저장'} type={"largeList"}
            onClick={() => {
              if (checkValidity('eventEventInfo') && pcSelectedImage && mobileSelectedImage && imageMobileSelectedImage && imagePcSelectedImage) {
                addModal({open: true, isDist: true, content: '저장되었습니다.'})
              } else
                alert('필수항목을 확인해주세요')
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  </>
}

const tempData: 행사이벤트상세조회 = {
  등록일: Date.now(),
  전시여부: '전시',
  이벤트명: '팝업명이 출력됩니다.',
  이동경로: 'URL이 출력됩니다.',
  전시시작일: Date.now(),
  전시종료일: Date.now(),
  새창여부: true,
}
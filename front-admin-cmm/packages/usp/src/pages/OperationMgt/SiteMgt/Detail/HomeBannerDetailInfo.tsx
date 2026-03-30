import React, {useRef, useState} from "react";
import {홈배너상세} from "~/pages/OperationMgt/SiteMgt/Model";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {Box, Stack, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {SubContents} from "shared/components/LayoutComponents";
import {TableDateTermCell, TableRadioCell, TableTextCell, TableTextFieldCell} from "shared/components/TableComponents";
import {dayFormat} from "shared/utils/stringUtils";
import {CustomButton} from "~/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import {ImageView} from "~/pages/OperationMgt/SiteMgt/Detail/HomePopupWindowDetailInfo";

export const HomeBannerDetailInfo = () => {
  const [state, setState] = useState<홈배너상세>(tempData);
  const imgRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()
  return <>
    <Stack spacing={'40px'} component={'form'} id={'bannerDetail'}>
      <SubContents title={'관리정보'}>
        <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"등록일"} label={`${dayFormat(Number(state.등록일))}`}
                  thWidth={"12%"} tdWidth={"37%"}/>

                <TableTextCell
                  title={"전시여부"} label={state.전시여부}
                  thWidth={"12%"} tdWidth={"37%"}/>
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
                <TableTextFieldCell label={'배너명'} defaultLabel={state.배너명} thWidth={'12%'} tdSpan={3} wordCount={50} required
                                    onChange={text => setState({...state, 배너명:text})}/>
              </TableRow>
              <TableRow>
                <TableTextFieldCell label={'이동경로'} defaultLabel={state.이동경로} thWidth={'12%'} tdSpan={3}
                                    onChange={text => setState({...state, 이동경로:text})}/>
              </TableRow>
              <TableRow>
                <TableDateTermCell division label={'전시기간'} thWidth={'12%'} tdWidth={'38%'} required
                                   onChange={(beginTime, endTime) => {
                                     setState({...state, 전시시작일: beginTime.getTime(), 전시종료일: endTime.getTime()})
                                   }}/>
                <TableRadioCell label={'새창여부'} radioLabel={['예', '아니오']} defaultLabel={'예'} row
                                onClick={selected => setState({...state, 새창여부:selected === '예'})}/>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={'이미지'} maxHeight={'100%'} required
                   rightContent={
                     <><CustomButton label={'첨부'} type={'small'} color={'list'} onClick={() => {
                       if (imgRef.current) imgRef.current.click()
                     }}/>
                       <input
                         hidden ref={imgRef}
                         type={"file"}
                         accept='image/*'
                         onChange={async (event: any) => {
                           if (event.target.files && event.target.files.length > 0) {
                             setSelectedImage(event.target.files[0])
                             const img = new FormData();
                             img.append("image", event.target.files[0])
                             setState({...state, 이미지:selectedImage})
                           }
                         }}
                       /></>}>
        <Stack sx={{display: 'flex', flexDirection: 'row', border: "1px solid #d7dae6", overflow: 'hidden'}}>
          <Box sx={{width: '100%', borderRight: '1px solid #d7dae6'}}>
            <Box sx={{height: '300px', textAlign: 'center'}}>
              {selectedImage ?
                <img src={URL.createObjectURL(selectedImage)}
                     style={{width: "300px", height: "300px"}}/> : '이미지를 등록하세요'}
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
              setOpen(!open)
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
              if (checkValidity('bannerDetail') && selectedImage) {
                addModal({open: true, isDist: true, content: '저장되었습니다.'})
              } else
                alert('필수항목을 확인해주세요')
            }}
          />
        </Stack>
      </Stack>
      <ImageView open={open} setOpen={setOpen} image={selectedImage}/>
    </Stack>
  </>
}

const tempData: 홈배너상세 = {
  등록일: Date.now(),
  전시여부: '전시',
  배너명: '배너명이 출력됩니다.',
  이동경로: 'URL이 출력됩니다.',
  전시시작일: Date.now(),
  전시종료일: Date.now(),
  새창여부: true,
}
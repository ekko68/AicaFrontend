import {SubContents, TitleContents} from "shared/components/LayoutComponents";
import {Box, Stack, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TableDateTermCell, TableRadioCell, TableTextFieldCell} from "shared/components/TableComponents";
import React, {useRef, useState} from "react";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {checkValidity} from "shared/utils/validUtil";
import {ImageView} from "~/pages/OperationMgt/SiteMgt/Detail/HomePopupWindowDetailInfo";
import {홈팝업창등록} from "~/pages/OperationMgt/SiteMgt/Model";

const HomePopUpWindowApply = () => {
  const [state, setState] = useState<홈팝업창등록>();
  const imgRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [popupWidth, setPopupWidth] = useState(50);
  const [popupHeight, setPopupHeight] = useState(50);
  const {addModal} = useGlobalModalStore()
  return <>
    <TitleContents title={'홈팝업창 등록'}>
      <Stack spacing={'40px'} component={'form'} id={'popupWindow'}>
        <SubContents title={'기본정보'} maxHeight={'100%'}>
          <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableTextFieldCell label={'팝업명'} thWidth={'12%'} tdSpan={3} wordCount={50} required
                                      onChange={text => setState({...state, 팝업명: text})}/>
                </TableRow>
                <TableRow>
                  <TableTextFieldCell label={'이동경로'} thWidth={'12%'} tdSpan={3}
                                      onChange={text => setState({...state, 이동경로: text})}/>
                </TableRow>
                <TableRow>
                  <TableDateTermCell division label={'전시기간'} thWidth={'12%'} tdWidth={'38%'} required
                                     onChange={(beginTime, endTime) => {
                                       setState({...state, 전시시작일: beginTime.getTime(), 전시종료일: endTime.getTime()})
                                     }}/>
                  <TableRadioCell label={'새창여부'} radioLabel={['예', '아니오']} defaultLabel={'예'} row
                                  onClick={selected => setState({...state, 새창여부: selected === '예'})}/>
                </TableRow>
                <TableRow>
                  <TableTextFieldCell division label={'팝업창 폭'} thWidth={'12%'} required onChange={(text) => {
                    setPopupWidth(Number(text));
                    setState({...state,팝업창폭:Number(text)})
                  }}/>
                  <TableTextFieldCell label={'팝업창 높이'} thWidth={'12%'} required onChange={(text) => {
                    setPopupHeight(Number(text));
                    setState({...state,팝업창높이:Number(text)})
                  }}/>
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
              label={'미리보기'} type={"largeList"}
              onClick={() => {
                setOpen(!open)
              }}
            />
            <CustomButton
              label={'저장'} type={"largeList"}
              onClick={() => {
                if (checkValidity('popupWindow') && selectedImage) {
                  addModal({open: true, isDist: true, content: '저장되었습니다.'})
                } else
                  alert('필수항목을 확인해주세요')
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <ImageView open={open} setOpen={setOpen} image={selectedImage} width={popupWidth} height={popupHeight}/>
    </TitleContents>
  </>
}

export default HomePopUpWindowApply
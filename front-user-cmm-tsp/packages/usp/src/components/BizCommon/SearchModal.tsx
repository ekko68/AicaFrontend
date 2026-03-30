import React, { ReactNode, useState } from 'react';
import DatePicker from "~/components/DatePicker";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CustomButton } from "~/../../shared/src/components/ButtonComponents";
import { CustomRadioButtons } from '~/components/NoticeCustomCheckBoxs';
import CloseIcon from '@mui/icons-material/Close';
import * as styles from '../../pages/biz/ContractMgt/styles';
import dayjs from '~/../../shared/src/libs/dayjs';
/*
  공통컴포넌트 : 검색 모달 모바일
*/
export const SearchModal:React.FC<{
    handleSearch:(searchInput:string | undefined,sdt:string,edt:string) => void
    assign_box:any[]
    placehold?:string
    children?: ReactNode
  }> = (props) => {
    const today = new Date();
    const [modalOpen, setModalOpen] = useState(false);
    const [stsVal, setStsVal] = useState('');
    const [questBeginDay, setQuestBeginDay] = useState<Date | null>(today);
    const [questEndDay, setQuestEndDay] = useState<Date | null>(today);

    const handleSearch = () => {
      if(!!props.handleSearch) {
        props.handleSearch(stsVal,dayjs(questBeginDay).format('YYYYMMDD'),dayjs(questEndDay).format('YYYYMMDD'))
      }
    }

    return(
      <div css={styles.detal_btn}>
        <Button type="button" onClick={()=>{setModalOpen(true)}}>
          상세조건 열기
        </Button>
        <Modal
          keepMounted
          open={modalOpen}
          onClose={()=>{setModalOpen(false)}}
        >
          <Box css={styles.modalpop}>
            <Typography id="keep-mounted-modal-title" component="h2">
              사유 확인
              <Button type="button" onClick={()=>{setModalOpen(false)}}>
                <CloseIcon />
              </Button>
            </Typography>
            <Box css={styles.picker_card}>
              <dl>
                <dt>접수일</dt>
                <dd>
                <DatePicker
                  pickerType='two' 
                  questBeginDay={questBeginDay?questBeginDay.toString():new Date().toString()}
                  questEndDay={questEndDay?questEndDay.toString():new Date().toString()}
                  changeStart={(startNewTime: Date | null)=>{
                    setQuestBeginDay(startNewTime)
                }}
                changeEnd={(endNewTime: Date | null)=>{
                  setQuestEndDay(endNewTime)
                }}
                />
                </dd>
              </dl>
              {
                props.assign_box.length < 0 ? 
                <dl>
                  <dt>상태</dt>
                  <dd>
                  <CustomRadioButtons
                    row
                    data={props.assign_box}
                    onClick={(s: string) => {
                      setStsVal(s)
                    }}
                  />
                  </dd>
                </dl>
                : null
              }

            </Box>
            <CustomButton
              label={'검색'}
              type={'full'}
              color={'primary'}
              onClick={()=>{
                handleSearch()
                setModalOpen(false)
              }}
            />
          </Box>
        </Modal>    
      </div>
    );
}
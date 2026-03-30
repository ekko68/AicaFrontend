// 사업단소개/ ->  사업단소개 페이지
import React from "react"
import {Box,Typography } from '@mui/material';
import {CustomButton, CustomIconButton} from 'shared/components/ButtonComponents';
import { BlockContents } from 'shared/components/LayoutComponents';
import Modal from '@mui/material/Modal';
import { Icons } from 'shared/components/IconContainer';

function AppReceptionMgt() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
      <div className="main-container">
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal-content'
      >
        <div className='modal-box large scroll'>
          <BlockContents 
            title={'항목명'}
          ></BlockContents>
          <div className="btn_close_top">
            <CustomIconButton onClick={handleClose} icon={Icons.Exit} />
          </div>
          <div className="scroll_inner">
            <Box sx={{padding:'18px 0 18px 20px',backgroundColor:'#f5f5f5',borderRadius:'15px 15px 0 0',fontWeight:600}}>인공지능산업융합사업단 공고 제2021-50호</Box>
            <Box sx={{textAlign:'center',fontSize:'28px',paddingBottom:'60px',marginBottom:'60px', borderBottom:'1px solid #e0e0e0'}}>
              <Typography component="div" sx={{fontSize:'28px',fontWeight:'bold', letterSpacing:'-1.12px'}} mt={'60px'}>
                2021년도 글로벌 AI 제품·서비스 고도화 지원 최종 선정업체
              </Typography>
              <Typography sx={{fontSize:'18px', letterSpacing:'-0.72px'}} mt={'32px'}>
                금번 지원사업에 참여해주신 기업 관계자분들께 깊은 감사의 말씀을 드리며 최종 선정기업을 아래와 같이 공지합니다.
              </Typography>
              <Typography sx={{fontSize:'18px'}} mt={'56px'}>
                2021년 10월 2일
              </Typography>
              <Typography sx={{fontSize:'18px',fontWeight:'600'}}>인공지능산업융합사업단장</Typography>
            </Box>
            <div className='tableDefault type2'>
              <table>
                <colgroup>
                  <col style={{width:'20%'}} />
                  <col style={{width:'30%'}} />
                  <col style={{width:'20%'}} />
                  <col style={{width:'30%'}} />
                </colgroup>
                <tbody>
                <tr>
                  <th>관련 모집공고</th>
                  <td colSpan={3}>2021년 글로벌 AI 제품·서비스 고도화 지원 사업 공고</td>
                </tr>
                <tr>
                  <th>담당부서</th>
                  <td>창업지원팀</td>
                  <th>담당자</th>
                  <td>홍길동 책임 aica@aica.com / 062-123-1234</td>
                </tr>
                </tbody>
              </table>
            </div>
            <h4 className="blt">선정업체</h4>
            <div className='tableDefault type2'>
              <table>
                <colgroup>
                  <col style={{width:'20%'}} />
                  <col style={{width:'30%'}} />
                  <col style={{width:'20%'}} />
                  <col style={{width:'30%'}} />
                </colgroup>
                <tbody>
                <tr>
                  <th>관련 모집공고</th>
                  <td colSpan={3}>2021년 글로벌 AI 제품·서비스 고도화 지원 사업 공고</td>
                </tr>
                <tr>
                  <th>담당부서</th>
                  <td>창업지원팀</td>
                  <th>담당자</th>
                  <td>홍길동 책임 aica@aica.com / 062-123-1234</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
        <CustomButton label={'미리보기'} type={'large'} onClick={handleOpen} />
      </div>
  );
}

export default AppReceptionMgt;
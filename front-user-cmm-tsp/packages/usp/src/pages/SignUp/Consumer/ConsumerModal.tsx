import * as styles from '../styles';
import React, { Fragment } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export const ConsumerModal: React.FC<{
    isOpen:boolean
    ctx:string
    titx:string
    children?: React.ReactNode;
    // style?: CSSProperties;
    modalClose?:() => void;
  }> = (props) => {

return (
    <Modal
        keepMounted
        open={props.isOpen}
        onClose={props.modalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
      <Box css={styles.modalpop}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {props.titx ? props.titx : null}
            <Button type="button" onClick={props.modalClose}><CloseIcon/></Button>
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          <Box className="scroll" component='span'>
            {props.ctx ? 
              props.ctx.replace(/(?: \r\n)/g, '\r\n').split("\r\n\r\n").map((m,k)=>{
                return (
                  <Fragment key={k}>
                    {
                      m.split('\r\n').map((t,i)=>{
                        return (
                          <Fragment>
                            { k == 0 && i==0 && <Box className="Box_tit" component='span'>{t}</Box> }
                            <Box className="popup_Box" component='span'>
                              {t.match(/[0-9]/) && !t.includes('-') && <Box className="popsub_tit">제{t.split('')[0]}조 ({t.slice(3)})</Box>}
                              {!!t && t.includes('-') && 
                                <Box className="popsub_text">
                                    {/* 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. */}
                                    <ul>
                                      {k == 0 && i == 2 && <li>&nbsp;{t.replace('-','①')}</li>}
                                      {k == 0 && i == 3 && <li>&nbsp;{t.replace('-','②')}</li>}
                                      {k == 0 && i == 4 && <li>&nbsp;{t.replace('-','③')}</li>}
                                      {k == 0 && i == 5 && <li>&nbsp;{t.replace('-','④')}</li>}
                                      {k == 0 && i == 6 && <li>&nbsp;{t.replace('-','⑤')}</li>}

                                      {k != 0 && i == 1 && <li>&nbsp;{t.replace('-','①')}</li>}
                                      {k != 0 && i == 2 && <li>&nbsp;{t.replace('-','②')}</li>}
                                      {k != 0 && i == 3 && <li>&nbsp;{t.replace('-','③')}</li>}
                                      {k != 0 && i == 4 && <li>&nbsp;{t.replace('-','④')}</li>}
                                      {k != 0 && i == 5 && <li>&nbsp;{t.replace('-','⑤')}</li>}
                                    </ul>
                                </Box>}
                              
                            </Box>
                          </Fragment>
                        )
                      })
                    }
                    {/* <Box className="popsub_text">
                        이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                        <ul>
                            <li>① 회원 : e나라도움 회원 가입을 한 후에 서비스를 이용하고 있는 자</li>
                            <li>② 사용자지원센터 : e나라도움 업무 처리를 지원하는 사용자지원센터 및 위탁 업체 직원 등</li>
                            <li>③ 비밀번호 : 이용자와 회원ID가 일치하는지를 확인하고 통신상의 자신의 비밀보호를 위하여 이용자 자신이 선정한 문자와 숫자의 조합</li>
                            <li>④ 탈퇴 : 회원이 e나라도움 이용계약을 종료시키는 행위</li>
                            <li>⑤ 본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 기능별 안내에서 정의합니다.</li>
                        </ul>
                    </Box> */}
                  </Fragment>
                )
              } )
            : null}
          </Box>
        </Typography>
        <Stack direction="row" css={styles.modalbtn}>
            <Button variant="contained" type="button" onClick={props.modalClose}>확인</Button>
        </Stack>
      </Box>
    </Modal>
    )
}
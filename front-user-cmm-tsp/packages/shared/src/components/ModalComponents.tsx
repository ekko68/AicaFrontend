import React, {CSSProperties, Fragment, useEffect} from 'react';
import {Button, Modal, Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {styled} from '@mui/styles';
import {VerticalInterval} from '../components/LayoutComponents';
import {Icons} from '../components/IconContainer';
import {CustomButton} from '../components/ButtonComponents';
import {Body2, H3} from "../components/TextComponents";

export type ModalType = 'normal' | 'confirm' | 'save' | 'transmit';

export type ModalParam = {
  open: boolean;
  content?: string;
  type?: string;
  hideBackdrop?: boolean;
  title?: string;
  isDist?: boolean;
  noButton?: boolean;
  buttonName?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  outlinedblack?: boolean;
  outlined?: boolean;
  borderRadius?: string;
  style?: CSSProperties;
}

export const ModalComponents: React.FC<ModalParam> = (props) => {
    const {type, isDist, noButton} = props;
    let confirmLabel = ""
    if (type == "normal") {
      confirmLabel = "확인";
    } else if (type == "save") {
      confirmLabel = "저장";
    } else if (type == "transmit") {
      confirmLabel = "전송";
    } else if (type == "complete") {
      confirmLabel = "완료";
    } else {
      confirmLabel = "예";
    }

    const handlerConfirm = (event: React.MouseEvent<HTMLElement>) => {
      if (props.onConfirm) props.onConfirm();
      document.body.style.overflow = 'unset';
    };

    const handlerExit = (event: React.MouseEvent<HTMLElement>) => {
      if (props.onClose) props.onClose();
      document.body.style.overflow = 'unset';
    };

    const handlerModalClose = (
      event: {},
      reason: 'backdropClick' | 'escapeKeyDown'
    ) => {
      if (props.onClose) props.onClose();
      document.body.style.overflow = 'unset';
    };

    useEffect(() => {
      if (props.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }, [props.open])

    return (
      <>
        <Modal
          disableScrollLock
          open={props.open}
          onClose={handlerModalClose}
          hideBackdrop={props.hideBackdrop}
        >
          <ModalBoxContainer style={props.style}>
            <Stack justifyContent={'space-between'} flexDirection={'column'}>
              <Box
                sx={{position: 'absolute', right: 24, top: 24}}
                component={'button'}
                onClick={handlerExit}>
                {<Icons.Exit/>}
              </Box>

              <Box sx={{pb: '32px'}}>
                {
                  props.children ? <Fragment>
                    {
                      props.title ? <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}><H3 bold>{props.title}</H3></div> :
                      <VerticalInterval size={'20px'}/>
                    }
                    {props.children}
                  </Fragment> : <Fragment>
                    {
                      props.title ?
                        <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}><H3 bold>{props.title}</H3></div> :
                      <VerticalInterval size={'20px'}/>
                    }
                    <Box display={'flex'} justifyContent={'center'}>
                      <Body2 center>{props.content}</Body2>
                    </Box>
                  </Fragment>
                }
              </Box>

              <Stack justifyContent={'center'} direction={'row'} spacing={'10px'}>
                {
                  isDist || (
                  <CustomButton
                    type={'modalBtn'}
                    label={props.buttonName || '취소'}
                    color={props.outlinedblack ? "outlinedblack" : props.outlined ? 'outlined' : 'primary'}
                    onClick={handlerExit}
                    // style={{borderRadius: props.borderRadius}}
                  />
                )}
                {
                  noButton || (
                  <CustomButton
                    type={'modalBtn'}
                    label={confirmLabel} onClick={handlerConfirm}
                    // style={{borderRadius: props.borderRadius ? '50px' : ''}}
                  />
                )}
              </Stack>
            </Stack>
          </ModalBoxContainer>
        </Modal>
      </>
    );
  }
;

const ModalBoxContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '360px',
  maxWidth: '460px',
  backgroundColor: 'white',
  borderRadius: '20px',
  // margin: '18px 220px 18px 0',
  padding: '40px',
})
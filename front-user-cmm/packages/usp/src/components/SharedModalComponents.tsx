import React, { CSSProperties, useEffect } from 'react';
import { Button, Modal, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/styles';
import { VerticalInterval } from '../components/LayoutComponents';
import { Icons } from '../components/IconContainer';
import { CustomButton } from '../components/ButtonComponents';

type ModalType = 'normal' | 'confirm'| 'save';
type SnackbarType = 	{ horizontal: 'center' | 'left' | 'right', vertical: 'bottom' | 'top' };

export type ModalParam = {
  open: boolean;
  content?: string;
  type?: ModalType;
  hideBackdrop?: boolean;
  title?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  style?: CSSProperties;
}

export type SnackbarParam = {
  open: boolean;
  anchorOrigin:SnackbarType;
  message: string;
  type?: ModalType;
  autoHideDuration?: number;
  severity?:string;
  key?: string;
  onClose?: () => void;
  style?: CSSProperties;
}

export const ModalComponents: React.FC<ModalParam> = (props) => {
    const type = props.type || 'normal';
    const confirmLabel = type == 'normal' ? '확인' : type == 'save' ? '저장' : '예';
    const handlerConfirm = (event: React.MouseEvent<HTMLElement>) => {
      if (props.onConfirm) props.onConfirm();
    };

    const handlerExit = (event: React.MouseEvent<HTMLElement>) => {
      if (props.onClose) props.onClose();
    };

    const handlerModalClose = (
      event: {},
      reason: 'backdropClick' | 'escapeKeyDown'
    ) => {
      if (props.onClose) props.onClose();
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
          <ModalBoxContainer>
            <Stack justifyContent={'space-between'} flexDirection={'column'}>
              <Box style={{display: 'flex', justifyContent: 'right'}}>
                <Button
                  style={{minWidth: '24px', height: '24px'}}
                  onClick={handlerExit}
                >
                  {<Icons.Exit/>}
                </Button>
              </Box>

              <Box sx={{pb: '32px'}}>
                {props.children ? (
                  <>
                    {props.title ? (
                      <h2>{props.title}</h2>
                    ) : (
                      <VerticalInterval size={'12px'}/>
                    )}
                    {props.children}
                  </>
                ) : (
                  <>
                    {props.title ? (
                      <h2 className="modaltit">{props.title}</h2>
                    ) : (
                      <VerticalInterval size={'12px'}/>
                    )}
                    <p className="modaltext">{props.content}</p>
                  </>
                )}
              </Box>
              <Stack justifyContent={'center'} direction={'row'} spacing={'10px'}>
                {type === 'confirm' && (
                  <CustomButton
                    type={'modalBtn'}
                    color={'outlined'}
                    label={'아니오'}
                    onClick={handlerExit}
                  />
                )}
                <CustomButton type={'modalBtn'} color={'primary'} label={confirmLabel} onClick={handlerConfirm}/>
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
  minWidth: '480px',
  backgroundColor: 'white',
  borderRadius: '20px',
  margin: '18px 220px 18px 0',
  padding: '24px 24px 40px',
  '& .modaltext' : {
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '1.56',
    letterSpacing: '-0.72px',
  },
  '& .modaltit' : {
    textAlign: 'center',
    fontSize: '24px',
    lineHeight: '0.83',
    letterSpacing: '-0.96px',
    fontWeight: '700',
  }
});

export const Modalfront: React.FC<{
  open: boolean;
  content: string;
  type?: ModalType;
  hideBackdrop?: boolean;
  title?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  style?: CSSProperties;
}> = (props) => {
  const handlerExit = (event: React.MouseEvent<HTMLElement>) => {
    if (props.onClose) props.onClose();
  };

  const handlerModalClose = (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (props.onClose) props.onClose();
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={handlerModalClose}
        hideBackdrop={props.hideBackdrop}
      >
        <ModalFrontBoxContainer>
          <Stack justifyContent={'space-between'} flexDirection={'column'} >
            <Box>
              {props.children ? (
                <>
                  {props.title ? (
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h2 className="pop_title">{props.title}</h2>
                      <Button
                        style={{ width: '24px', height: '24px', padding: 0, minWidth: '24px' }}
                        onClick={handlerExit}
                      >
                        {<Icons.Exit />}
                      </Button>
                    </Box>
                  ) : (
                    <VerticalInterval size={'40px'} />
                  )}
                  {props.children}
                </>
              ) : (
                <>
                  {props.title ? (
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h2 className="pop_title">{props.title}</h2>
                      <Button
                        style={{ width: '24px', height: '24px', padding: 0, minWidth: '24px' }}
                        onClick={handlerExit}
                      >
                        {<Icons.Exit />}
                      </Button>
                    </Box>
                  ) : (
                    <VerticalInterval size={'40px'} />
                  )}
                  <p style={{ textAlign: 'center' }}>{props.content}</p>
                </>
              )}
            </Box>
          </Stack>
        </ModalFrontBoxContainer>
      </Modal>
    </>
  );
};

const ModalFrontBoxContainer = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '18px 0',
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '24px',
  maxHeight: '100%',
  boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
  '& .MuiTabPanel-root':{
    padding: '20px 2px  10px 2px'
  },
  '& .Mui-selected': {
    background: '#000'
  },
  '& .pop_title':{
    fontSize: '20px',
    letterSpacing: '-0.8px',
  },
  '@media (min-width: 320px) and (max-width: 768px)' : {
    overflowY: 'auto',
    bottom: '0',
    top: 'auto',
    transform: 'translateX(-50%)',
    width: '100%',
    minWidth: 'auto',
    maxHeight: 'calc(100% - 20px)',
    margin: '0',
    borderRadius: '20px 20px 0 0',
  }
});
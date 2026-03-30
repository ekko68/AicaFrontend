import * as styles from './styles';
import React, { Fragment } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CustomButton } from '~/components/ButtonComponents';
import { CloseIcon } from '~/components/IconComponents';

export const HomeModal: React.FC<{
    item?:any;
    isOpen:boolean
    ctx?:string
    titx?:string
    children?: React.ReactNode;
    // style?: CSSProperties;
    modalClose?:() => void;
    closeWin?:() => void;
  }> = (props) => {
    console.log(props?.item?.popupWidth)
    console.log(props?.item?.popupHeight)
    const check = () =>{
        if(props?.item?.popupWidth<300)
        return 300;
        else{
        return props?.item?.popupWidth
        }
    }
    console.log(props?.item)
return (
    <Modal
        keepMounted
        open={props.isOpen}
        onClose={props.modalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
        <Box css={styles.modalpop} style={{width:check()}}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                {props.titx ? props.titx : null}
                <Button type="button" onClick={props.modalClose}><CloseIcon/></Button>
            </Typography>
            {props?.item.newWindow?
            <a href={props?.item?.linkUrl} target='_blank' rel='noreferrer'>
            <Box className="img">
                <img src={`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/popups/${props?.item?.popupId}/image`} alt={"팝업이미지가 없습니다."} style={{verticalAlign:"middle"}}/>
            </Box>
            </a>
            :
            <Box className="img">
            <img src={`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/popups/${props?.item?.popupId}/image`} alt={"팝업이미지가 없습니다."} style={{verticalAlign:"middle"}}/>
            </Box>
            }
            <Stack spacing={2} direction="row" css={styles.btnGroup} className="btnpop_group">
                <CustomButton label={'오늘은 그만 보기'} type={'modalBtn'} color={'outlined'} onClick={props.closeWin}/>
                <CustomButton label={'닫기'} type={'modalBtn2'} color={'primary'} onClick={props.modalClose}/>
            </Stack>
        </Box>
    </Modal>
    )
}
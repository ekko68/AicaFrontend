/* eslint-disable jsx-a11y/alt-text */
import React, { useState,useEffect } from 'react';
import { groupId, SttusType } from "./NoticeModel";
import * as styles from '~/styles/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, Modal } from '@mui/material';
import { NoticeCheckBoxs, NoticeRadioButtons } from '~/components/NoticeCustomCheckBoxs';
import CloseIcon from '@mui/icons-material/Close';
import { fetchGetCommCode } from '~/fetches';
import { useQueries } from 'react-query';
/*
    컴포넌트: NoticeModalMobile
    개발자  : navycui
    작성실  : 20220511
*/

export const NoticeModalMobile: React.FC<{
    userQueries?:any,
    open:boolean
    setModalOpen:(ck:boolean) => void
    handlerSearch: (sttus:SttusType) => void
}> = (props) => {
//#region -------상태 값 초기화

    const [sttus,setSttus] = useState<SttusType>({pblancSttus:'', applyMberType:'', recomendCl:''});

    // 공통코드 조회  참고:기업 회원 만 조회 가능 
    const userQueries = useQueries(
        groupId.map(groupType => {
      return {
        queryKey: [groupType],
        queryFn: () => fetchGetCommCode(groupType),
      }
    })
    )

    const handlerSearch = () => {
        if(props.handlerSearch){
            props.handlerSearch(sttus);
        }
    }

  //#endregion ---- end  

return ( 
    <Modal
        keepMounted
        open={props.open}
        onClose={()=>{props.setModalOpen(false)}}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
    <Box css={styles.modalpop} className="btntype_radio">
        <Typography id="keep-mounted-modal-title" component="h2">
        사유 확인
        <Button type="button" onClick={()=>{props.setModalOpen(false)}}>
            <CloseIcon />
        </Button>
        </Typography>
        <Box className="scrollpop">
        <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
            모집 상태
            </Typography>
            <Stack
            sx={{ justifyContent: 'center' }}
            >
            {

                <NoticeCheckBoxs
                    row
                    checkbox={(userQueries[1].status == 'success') ? userQueries[1].data.list : []}
                    onClick={(s: string[]) => {
                        if(s.length>0)console.log(s)
                        setSttus((prev)=>({
                            ...prev,
                            pblancSttus:s.toString()
                        }))
                }}/>

            }
            </Stack>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
            모집 대상
            </Typography>
            <Stack
            sx={{ justifyContent: 'center' }}
            >
            <NoticeCheckBoxs
                row
                checkbox={(userQueries[0].status == 'success') ? userQueries[0].data.list : []}
                onClick={(s: string[]) => {
                    setSttus((prev)=>({
                        ...prev,
                        applyMberType:s.toString()
                    }))
                }}/>
            </Stack>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
            사업 분야
            </Typography>
            <Stack
            sx={{ justifyContent: 'center' }}
            >
            <NoticeCheckBoxs
                row
                checkbox={(userQueries[2].status == 'success') ? userQueries[2].data.list.filter((val: any) => val.codeType === 'BSR') : []}
                onClick={(s: string[]) => {
                    setSttus((prev)=>({
                        ...prev,
                        recomendCl:s.toString()
                    }))
                }}/>
            </Stack>
        </Box>
        <Stack
            spacing={2}
            direction="row"
            css={styles.btnGroup}
            sx={{ mt: 6 }}
        >
            <Button
            variant="contained"
            fullWidth
            type="button"
            className="blue"
            onClick={()=>{
                handlerSearch()
                props.setModalOpen(false)
            }}
            >
            검색
            </Button>
        </Stack>
        </Box>
    </Box>
    </Modal>
);
}


     
     
     
     
     
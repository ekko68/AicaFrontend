/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { groupId, SttusType } from '~/pages/Notice/NoticeModel';
import * as styles from '~/styles/styles';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, Modal } from '@mui/material';
import {
  NoticeCheckBoxs,
  NoticeRadioButtons,
} from '~/components/NoticeCustomCheckBoxs';
import CloseIcon from '@mui/icons-material/Close';
import { fetchGetCommCode } from '~/fetches';
import { useQueries } from 'react-query';

import SearchCheckboxEach from './SearchCheckboxEach';
import SearchCheckboxTotal from './SearchCheckboxTotal';

/*
    컴포넌트: NoticeModalMobile
    개발자  : navycui
    작성실  : 20220511
*/

export const SearchResultModalMobile: React.FC<{
  userQueries?: any;
  open: boolean;
  setModalOpen: (ck: boolean) => void;
  handlerSearch: (sttus: SttusType) => void;
}> = (props) => {
  //#region -------상태 값 초기화

  const [sttus, setSttus] = useState<SttusType>({
    pblancSttus: '',
    applyMberType: '',
    recomendCl: '',
  });

  // 공통코드 조회  참고:기업 회원 만 조회 가능
  const userQueries = useQueries(
    groupId.map((groupType) => {
      return {
        queryKey: [groupType],
        queryFn: () => fetchGetCommCode(groupType),
      };
    })
  );

  const handlerSearch = () => {
    if (props.handlerSearch) {
      props.handlerSearch(sttus);
    }
  };

  //#endregion ---- end

  return (
    <Modal
      keepMounted
      open={props.open}
      onClose={() => {
        props.setModalOpen(false);
      }}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        css={styles.modalpop}
        className="btntype_radio"
        style={{
          maxWidth: '100%',
          height: 'auto',
          maxHeight: 'calc(100% - 20px)',
        }}
      >
        <Typography id="keep-mounted-modal-title" component="h2">
          상세 검색
          <Button
            type="button"
            onClick={() => {
              props.setModalOpen(false);
            }}
            style={{
              right: '15px',
              width: '24px',
              minWidth: 'auto',
              height: '24px',
              padding: '0',
            }}
          >
            <CloseIcon />
          </Button>
        </Typography>
        <Box className="scrollpop">
          <Box sx={{ mt: 2.5 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
              정렬
            </Typography>
            <Stack sx={{ justifyContent: 'center' }}>
              <SearchCheckboxEach />
            </Stack>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
              모집 대상
            </Typography>
            <Stack sx={{ justifyContent: 'center' }}>
              <SearchCheckboxTotal />
            </Stack>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
              사업 분야
            </Typography>
            <Stack sx={{ justifyContent: 'center' }}>
              <NoticeCheckBoxs
                row
                checkbox={
                  userQueries[2].status == 'success'
                    ? userQueries[2].data.list.filter(
                        (val: any) => val.codeType === 'BSR'
                      )
                    : []
                }
                onClick={(s: string[]) => {
                  setSttus((prev) => ({
                    ...prev,
                    recomendCl: s.toString(),
                  }));
                }}
              />
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
              onClick={() => {
                handlerSearch();
                props.setModalOpen(false);
              }}
            >
              검색
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { groupId, SttusType } from '~/pages/Notice/NoticeModel';
import * as styles from '~/styles/styles';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { searchRdoContainer, searchCkboxContainer } from '../styles';

import Stack from '@mui/material/Stack';
import { Box, Typography, Button, Modal } from '@mui/material';

import {
  NoticeCheckBoxs,
  NoticeRadioButtons,
} from '~/components/NoticeCustomCheckBoxs';
import CloseIcon from '@mui/icons-material/Close';
import { fetchGetCommCode } from '~/fetches';
import { useQueries } from 'react-query';

import SearchRadio from './SearchRadio';
import SearchRadioTotal from './SearchRadioTotal';
import SearchCheckbox from './SearchCheckbox';
import SearchDatePicker from './SearchDatePicker';

import {
  filterKeywords1,
  filterKeywords2,
  filterKeywords3,
} from '../Data/dataSearch';

export const SearchResultModalMobile: React.FC<{
  userQueries?: any;
  open: boolean;
  quests: any;
  setQuests: any;
  setModalOpen: (ck: boolean) => void;
  handlerSearch: (sttus: SttusType) => void;
}> = (props) => {
  const { quests, setQuests } = props;
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

  const [ckboxDefaultVal, setCkboxDefaultVal] = useState<any>([
    [true, false],
    [true, false, false],
  ]);

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
        className="btntype_radio --search"
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
        <Box className="scrollpop" css={scrollPopCss}>
          <Box sx={{ mt: 2.5 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
              정렬
            </Typography>
            <Stack sx={{ justifyContent: 'center' }} css={searchRdoContainer}>
              <SearchRadio rdoData={filterKeywords2} />
            </Stack>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
              검색기간
            </Typography>
            <Stack sx={{ justifyContent: 'center' }} css={searchRdoContainer}>
              <SearchRadioTotal rdoData={filterKeywords3} />
              <Box css={datePickerGroup}>
                <SearchDatePicker quests={quests} setQuests={setQuests} />
              </Box>
            </Stack>
            {/* <Stack sx={{ justifyContent: 'center' }} css={searchCkboxContainer}>
              <SearchCheckbox
                ckData={filterKeywords3}
                maxNum={3}
                bval={ckboxDefaultVal[1]}
              />
            </Stack> */}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography id="keep-mounted-modal-title" component="h3">
              검색영역
            </Typography>
            <Stack sx={{ justifyContent: 'center' }} css={searchRdoContainer}>
              <SearchRadioTotal rdoData={filterKeywords1} />
            </Stack>
          </Box>
        </Box>
        <Stack direction="row" css={(styles.btnGroup, modalBtnGroup)}>
          <Button
            type="button"
            className="reset"
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            <span className="ico"></span>
            <span className="txt">초기화</span>
          </Button>
          <Button
            type="button"
            className="save"
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            <span className="txt">저장</span>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const scrollPopCss = css`
  height: auto !important;
  overflow-y: auto;
  padding-bottom: 0 !important;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const datePickerGroup = css`
  margin-top: 15px;

  > div {
    max-width: 100%;

    .MuiFormControl-root {
      width: calc((100% - 30px) / 2);

      .MuiOutlinedInput-root {
        justify-content: space-between;
        padding-right: 12px;
      }
      .MuiOutlinedInput-input {
        width: calc(100% - 48px);
        padding-left: 16px;
        font-size: 16px;
        font-weight: 400;
        color: ${Color.black};
        line-height: 19px;
      }

      .MuiButtonBase-root {
        width: 24px;
        height: 24px;
        margin: 0;
        padding: 0;
        border-radius: 0;
      }
    }
  }
`;
const modalBtnGroup = css`
  height: 104px;
  height: 104px;
  margin: 0;
  padding: 32px 0 20px;
  padding: 32px 0 20px;
  background: ${Color.white};

  > button {
    width: calc((100% - 10px) / 2);
    height: 52px;
    border: 1px solid transparent;
    border-radius: 26px;

    .txt {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.06em;
    }

    &.reset {
      border-color: ${Color.black};

      .ico {
        width: 24px;
        height: 24px;
        margin-right: 5px;
        background: url('/images/search/ico_search_refresh_black.svg') no-repeat
          center / contain;
      }

      .txt {
        color: ${Color.black};
      }
    }
    &.save {
      background: ${Color.azul};
      border-color: ${Color.azul};

      .txt {
        color: ${Color.white};
      }
    }
    & + button {
      margin-left: 10px;
    }
  }
`;

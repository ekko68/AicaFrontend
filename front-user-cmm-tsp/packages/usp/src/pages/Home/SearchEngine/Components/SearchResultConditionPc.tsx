/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import dayjs from 'dayjs';
import DatePicker from '~/components/DatePicker';

import { Box, List, ListItem } from '@mui/material';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { CustomSelect } from '~/components/SelectBoxComponents';

import {
  filterKeywords1,
  filterKeywords2,
  filterKeywords3,
} from '../Data/dataSearch';

export default function SearchResultConditionPc(props: any) {
  const {
    filterKeyword1,
    filterKeyword2,
    filterKeyword3,
    setFilterKeyword1,
    setFilterKeyword2,
    setFilterKeyword3,
    quests,
    setQuests,
  } = props;

  const pcContainerCss = css`
    display: flex;
    align-items: center;
  `;
  const pcList = css`
    display: flex;
    padding: 0;

    > li {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: auto;

      &:not(:last-of-type) {
        &::after {
          content: '';
          width: 1px;
          height: 38px;
          margin: 0 12px;
          background: ${Color.line};
        }
      }
    }
  `;
  const pcListItem = css`
    padding: 0;
  `;
  const selectGroupCss = css`
    flex-shrink: 0;
    width: 134px;

    .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
      height: 40px;
    }

    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
      font-size: 16px;
      color: ${Color.brownish_gray};
      letter-spacing: -0.06em;
    }
    .css-10u8eq3-MuiFormControl-root-SelectStyle
      .MuiOutlinedInput-root
      .MuiOutlinedInput-notchedOutline {
      border-color: ${Color.line} !important;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${Color.black} !important;
    }
  `;
  const filterDatePicker = css`
    .css-1pkdtyp-MuiStack-root-PickerStyle {
      .MuiInputBase-root {
        height: 40px;
        padding-left: 16px;
        padding-right: 12px;
        border-color: ${Color.line};
      }
      .MuiOutlinedInput-input {
        padding-left: 0 !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        color: ${Color.black};
      }
    }
    .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
      padding: 0;
      border-radius: 0;
      margin: 0;
    }
  `;

  return (
    <Box css={pcContainerCss}>
      <List css={pcList}>
        <ListItem css={pcListItem}>
          <Box css={selectGroupCss}>
            <CustomSelect
              value={filterKeyword1}
              data={filterKeywords1}
              onClick={(selected) => {
                setFilterKeyword1(selected);
              }}
            />
          </Box>
        </ListItem>
        <ListItem css={pcListItem}>
          <Box css={selectGroupCss}>
            <CustomSelect
              value={filterKeyword2}
              data={filterKeywords2}
              onClick={(selected) => {
                setFilterKeyword2(selected);
              }}
            />
          </Box>
        </ListItem>
        <ListItem css={pcListItem}>
          <Box css={selectGroupCss} style={{ marginRight: '8px' }}>
            <CustomSelect
              value={filterKeyword3}
              data={filterKeywords3}
              onClick={(selected) => {
                setFilterKeyword3(selected);
              }}
            />
          </Box>
          <Box css={filterDatePicker}>
            <DatePicker
              pickerType="two"
              questBeginDay={dayjs(quests.srchBeginDay, 'YYYYMMDD').toString()}
              questEndDay={dayjs(quests.srchEndDay, 'YYYYMMDD').toString()}
              changeStart={(startNewTime: Date | null) => {
                setQuests((prevState: any) => ({
                  ...prevState,
                  srchBeginDay: dayjs(startNewTime)
                    .format('YYYYMMDD')
                    .toString(),
                }));
              }}
              changeEnd={(endNewTime: Date | null) => {
                setQuests((prevState: any) => ({
                  ...prevState,
                  srchEndDay: dayjs(endNewTime).format('YYYYMMDD').toString(),
                }));
              }}
            />
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

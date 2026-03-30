/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';

import { Box } from '@mui/material';
import { css } from '@emotion/react';
import { Color } from '~/components/StyleUtils';
import { breakpoint } from '../../styles/styleCommon';
import { screenOut } from '../styles';

export default function SearcgBarRescan(props: any) {
  const SearcgBarRescanCss = css`
    position: relative;

    label {
      display: flex;
      align-items: center;

      .ico {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-right: 6px;
        border: 1px solid ${Color.gray};
        border-radius: 3px;
      }
      .txt {
        font-size: 16px;
        font-weight: 400;
        color: ${Color.warm_gray};
        line-height: 24px;
      }

      @media (max-width: ${breakpoint.mobile}) {
        .ico {
          display: none;
        }
        .txt {
          display: flex;
          align-items: center;
          height: 30px;
          padding: 0 10px;
          border: 1px solid ${Color.gray};
          border-radius: 15px;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }

    input {
      &:checked + label {
        .ico {
          border-color: ${Color.azul};
          background: ${Color.azul}
            url('/images/search/ico_search_checkbox_checked.svg') no-repeat
            center / contain;
        }

        @media (max-width: ${breakpoint.mobile}) {
          .txt {
            border-color: ${Color.azul};
            color: ${Color.azul};
          }
        }
      }

      &:disabled + label {
        cursor: not-allowed;

        .ico {
          background: ${Color.line};
        }
        .txt {
          color: ${Color.gray};
        }
      }
    }

    .search-main & {
      display: none;
    }
    .search-result & {
      display: block;
      margin: 0 24px 0 14px;

      @media (max-width: ${breakpoint.mobile}) {
        margin-left: 8px;
        margin-right: 12px;
      }
    }
  `;

  return (
    <Box css={SearcgBarRescanCss}>
      {/* 
        [D] 검색결과가 없을 경우,  disabled => true 로 변경
        */}
      <input
        type="checkbox"
        id="ckbox1"
        name="ckbox1"
        css={screenOut}
        disabled={props.iptDisabled}
      />
      <label htmlFor="ckbox1">
        <span className="ico"></span>
        <span className="txt">결과 내 재검색</span>
      </label>
    </Box>
  );
}

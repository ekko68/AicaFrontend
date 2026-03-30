import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { breakpoint, common } from '../styles/styleCommon';

type dataType = {
  codeNm?: string;
  child?: string;
  code?: string;
};

export const SearchCorpInpItem: React.FC<{
  searchCate: dataType[];
  inpType: string;
  inpName: string;
  onCheckedCkbox: any;
  onCheckedRdobox: any;
}> = (props) => {
  const [inpTypeCheck, setInpTypeCheck] = useState<boolean>(false);

  const data = props.searchCate;

  const group = css`
    position: relative;
    flex-grow: 1;
    width: calc((100% - ${common.sz60}) / 3);
    height: ${common.sz80};

    &:nth-of-type(3n - 1) {
      margin-left: ${common.sz20};
      margin-right: ${common.sz20};
    }
    &:nth-of-type(n + 4) {
      margin-top: ${common.sz20};
    }

    @media (max-width: ${breakpoint.mobile}) {
      flex-grow: 0;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border: 1px solid ${common.pinkish_grey};
      border-radius: ${common.sz10};
      cursor: ${common.cursor_click};

      span {
        font-size: ${common.sz16};
        font-weight: 500;
        color: ${common.black};
        line-height: ${common.sz24};
        letter-spacing: -0.06em;
        text-align: center;

        &:nth-of-type(2) {
          font-size: ${common.sz14};
          font-weight: 400;
          color: ${common.warm_grey};
          line-height: ${common.sz20};
        }
      }
    }

    input:checked + label {
      border-color: ${common.azul};
      border-width: 2px;

      span {
        color: ${common.azul};
      }
    }

    @media (max-width: ${breakpoint.mobile}) {
      width: calc((100% - 15px) / 2);
      height: 60px;

      &:nth-of-type(3n - 1),
      &:nth-of-type(n + 4) {
        margin: 0;
      }
      &:nth-of-type(even) {
        margin-left: 15px;
      }
      &:nth-of-type(n + 3) {
        margin-top: 15px;
      }

      label {
        span {
          font-size: ${common.sz14} !important;
          line-height: ${common.sz20} !important;
        }
      }
    }
  `;

  useEffect(() => {
    props.inpType === 'radio' ? setInpTypeCheck(true) : setInpTypeCheck(false);
  }, []);

  return (
    <>
      {data.map((item, idx) => {
        return inpTypeCheck ? (
          // 라디오버튼
          <div css={group} key={idx}>
            <input
              type={props.inpType}
              name={props.inpName}
              id={`${props.inpName}-${idx}`}
              css={screenOut}
              value ={item.code}
              onChange={(e) => {
                props.onCheckedRdobox(e.currentTarget);
              }}
            />
            <label htmlFor={`${props.inpName}-${idx}`}>
              <span>{item.codeNm}</span>
              <span>{item.child}</span>
            </label>
          </div>
        ) : (
          // 체크박스
          <div css={group} key={idx}>
            <input
              type={props.inpType}
              name={`${props.inpName}-${idx}`}
              id={`${props.inpName}-${idx}`}
              css={screenOut}
              value ={item.code}
              onChange={(e) => {
                console.log(e.currentTarget)
                props.onCheckedCkbox(e.currentTarget);
              }}
            />
            <label htmlFor={`${props.inpName}-${idx}`}>
              <span>{item.codeNm}</span>
            </label>
          </div>
        );
      })}
    </>
  );
};

const screenOut = css`
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  text-indent: -9999px;
`;

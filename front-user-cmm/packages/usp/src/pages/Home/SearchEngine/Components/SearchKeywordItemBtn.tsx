/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { SearchResultHashTag, SearchMainHashTag } from '../styles';

export default function SearchKeywordItemBtn(props: any) {
  return (
    <>
      <button
        type="button"
        css={props.type === 'main' ? SearchMainHashTag : SearchResultHashTag}
        className={
          props.type === 'new'
            ? '--new'
            : props.type === 'relation'
            ? '--relation'
            : ''
        }
        onClick={props.evtClick}
      >
        {props.itemTxt}
      </button>
    </>
  );
}

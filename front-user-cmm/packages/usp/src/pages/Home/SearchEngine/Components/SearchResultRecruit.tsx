/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import SearchSwiper from './SearchSwiper';

export default function SearchResultRecruit(props: any) {
  const { result } = props;

  return <SearchSwiper data={result} />;
}

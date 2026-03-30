import api from '~/api';
import { useState } from "react";

export type inputType = {
  posting?:boolean,
  categoryCd?:string,
  articleSrchCd?:string,
  articleSrchWord?:string,
  page?:number,
  itemsPerPage?:number;
}

export type detailType = {
  articleId : string,
}

export type selectionType = {
  slctnPblancNm : string,
  page? : number,
  itemsPerPage? : number,
}

//목록 가져오기
export default (data: inputType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/usp-qna/articles?categoryCd=${data.categoryCd}&posting=${data.posting}&articleSrchCd=${data.articleSrchCd}&articleSrchWord=${data.articleSrchWord}&page=${data.page}&itemsPerPage=${data.itemsPerPage}`,
    method:'get',
  })

export const fetchFrequentlyAskedQuestionsDetail = (data: detailType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/usp-qna/articles/`,
    method:'get',
    params:data,
  })

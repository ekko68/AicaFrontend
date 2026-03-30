import api from '~/api';

export type inputType = {
  boardId : string,
  posting?:boolean,
  articleSrchCd?:string,
  articleSrchWord?:string,
  page?:number,
  itemsPerPage?:number;
}

export type detailType = {
  boardId : string,
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
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${data.boardId}/articles`,
    method:'get',
    params:data,
  })


export const fetchAnnouncementDetail = (data: detailType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${data.boardId}/articles/${data.articleId}`,
    method:'get',
  })

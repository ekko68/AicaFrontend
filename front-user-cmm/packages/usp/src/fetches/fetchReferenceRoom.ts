import api from '~/api';

export type inputType = {
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

export default (data:inputType) => 
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${process.env.REACT_APP_REFERENCE_ROOM}/articles`,
    params: data,
  });


export const fetchReferenceRoomDetail = (data: detailType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${data.boardId}/articles/${data.articleId}`,
    method:'get',
  })
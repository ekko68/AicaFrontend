import api from '~/api';

export type inputType = {
  boardId : string,
  articleId : string,
  posting?:boolean,
  categoryCd?:string,
  beginDt?:number,
  endDt?:number,
  title?:string,
}

export type insertType = {
  title : string,
  notice : boolean,
  artilce : string,
  categoryCd? : string,
  posting : boolean,
  webEditor? : boolean,
  sharedUrl? : string,
  thumbnailAltCn? : string,

}

export default (key?: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/usp-notice/articles${
      key ? `/${key}` : `?page=1&itemsPerPage=2`
    }`,
    method: 'get',
  });

//이전글 다음글 boardId가져오기
export const fetchBoardPreNext = (data: inputType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${data.boardId}/articles/${data.articleId}/previous-next`,
    method:'get',
    params:data
  })

//게시글 등록(PRG-COM-BBA-03)
// UI-USP-FRN-0330201 UI-USP-ADM-0530201 UI-USP-ADM-0540201 UI-USP-ADM-0550201 UI-USP-ADM-0570201 UI-USP-ADM-0740201
export const fetchBoardInsert = (boardId:string | undefined,form:FormData) =>  
  api({
  url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${boardId}/articles`,
  method:'post',
  data:form
})

//이미지 첨부파일 목록 조회(PRG-COM-BBF-04)
export const fetchImageListGet = (boardId : string , articleId : string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${boardId}/articles/${articleId}/images`,
  method:'get',
})
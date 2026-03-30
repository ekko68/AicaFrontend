import api from '~/api';

export type questsType = {
  qnaId:string,
  questId?:string,
  questStatus:string,
  categoryCd?:string,
  title?:string,
  memberNm?:string,
  questBeginDay?: Date | null | string,
  questEndDay?:Date | null  | string,
  page:number,
  itemsPerPage:number,
}

//질의응답 등록 (PRG-COM-QAA-02)
export default (form:FormData) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/usp-persnal/quests`,
    method:'post',
    data:form
  })

// 디딤널 과 둥일
export const fetchOneByOneMmt = (questsType:questsType) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/usp-persnal/quests`,
    params:questsType
})

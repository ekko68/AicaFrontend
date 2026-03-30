import api from '~/api';

export type getListType = {
  eventId ? : string,
  beginDay? : string,
  endDay? : string,
  searchType? : string,
  searchCn? : string,
  sortType? : string,
  page? : number,
  itemsPerPage? : number,
}

export type getType = {
  eventId : string,
}

//게시 이벤트 목록 조회 (PRG-COM-EVV-02)
export default (data: getListType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events-view`,
    method:'get',
    params:data,
  })

//이벤트 조회 (PRG-COM-EVF-03)
export const fetchEventGet = (data: getType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${data}`,
    method:'get',
  })

//첨부파일 목록 조회(PRG-COM-EVF-01)
export const fetchGetAttachList = (data: getType) =>
  api({
      url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events/${data}/attachments`,
      method:'get',
  })

//이전글 다음글 eventId가져오기
export const fetchEventPreNext = (data: getListType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/events-view/${data.eventId}/previous-next`,
    method:'get',
    params:data
  })  
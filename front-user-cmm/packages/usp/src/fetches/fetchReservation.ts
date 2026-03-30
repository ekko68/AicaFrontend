import api from '~/api';

export type inputType = {
    mvnFcId : string,
    ymd : string,
}

export type inputType1 = {
  mvnFcId: string,
  rsvtDay: string,
  rsvtBgngTm: string,
  rsvtEndTm: string,
  rsvtNope: number|null,
  utztnPurpose?: string

}

//공유시설 일자별 예약불가시간 목록 조회(PRG-USP-R04-02)
export default (data:inputType) => 
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/reservation/cutoff-time/${data.mvnFcId}`,
    params: data,
  });

//시설예약 신청 (PRG-USP-R01-06)
export const fetchReservationInsert= (data:inputType1 ) =>
  api({
    // url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${boardId}/articles`,
    url: `${process.env.REACT_APP_DOMAIN_RSVT_BNET}/rsvt/api/mvn/spaces`,
    method:'post',
    data:data
  })

//사용자 입주현황 상세조회 (PRG-USP-IJH-02)
export const fetchMovinUser= (allInqireYn:boolean ) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/status/movin-user`,
    params: allInqireYn,
  });
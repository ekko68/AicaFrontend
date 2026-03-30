import api from '~/api';
import { checkOutInput} from '~/models/ModelMoveIn';
import { reqReserveStatusType } from '~/service/Model';

//사용자 입주현황 상세조회 (PRG-USP-IJH-02)
export const fetchMovinGet = (allInqireYn:boolean) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/status/movin-user`,
    method:'get',
    params : {allInqireYn:allInqireYn}
});

//입주연장 신청 (PRG-USP-IJY-01)
export const fetchMovinExtend = (mvnId:string, data:FormData) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/extension/user/${mvnId}`,
    method:'post',
    data : data
});

//입주연장신청 신청상태 변경(PRG-USP-IJY-06) 신청취소
export const fetchExtendModifyState = (params:any) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/extension/${params.mvnEtReqId}/udpate-status`,
    method:'put',
    data :params    
});

//입주연장신청 수정 (PRG-USP-IJY-15)
export const fetchMovinExtendModify = (mvnId:string, mvnEtReqId:string, data:FormData) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/extension/user/${mvnId}/${mvnEtReqId}`,
    method:'put',
    data : data
});

//사용자 입주연장신청 조회 (PRG-USP-IJY-14)
export const fetchExtendDetailGet = (mvnId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/extension/user/${mvnId}`,
    method:'get', 
});

//퇴실신청 (PRG-USP-TAM-01)
export const fetchCheckOut = (params:checkOutInput) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/checkouts`,
    method:'post',
    params :params
});

//입주연장신청 첨부파일 목록 조회 (PRG-USP-IJY-10)
export const fetchExtendAttachmentListGet = (mvnEtReqId:string) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/extension/${mvnEtReqId}/req-files`,
    method:'get',
});

//퇴실신청 신청상태 변경 (PRG-USP-TAM-04)
export const fetchMovinModifyState = (params:any) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/checkouts/${params.checkoutReqId}/update-status`,
    method:'put',
    params :params
});

//사용자 퇴실신청 상세조회 (PRG-USP-TAM-06)
export const fetchCheckOutDetailGet = (mvnId:string) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/checkouts/user/last-view/${mvnId}`,
    method:'get',
});

//퇴실신청 수정 (PRG-USP-TAM-07)
export const fetchCheckOutModify = (params:any) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/checkouts/user/${params.checkoutReqId}`,
    method:'put',
    params :params
});

//입주연장신청 첨부파일 삭제 (PRG-USP-IJY-16)
export const fetchExtendAttachDelete = (mvnEtReqId:string,attachmentId:string) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/extension/${mvnEtReqId}/req-files/${attachmentId}`,
    method:'delete',
});

//사용자 시설예약 목록조회 (PRG-USP-R03-01)
export const fetchReservationUser = (params:any) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/reservation/user`,
    method:'get',
    params :params
})

// 사용자 시설예약 상세조회 (PRG-USP-R03-02)
export const fetchReservationUserDetail = (reserveId:string) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/reservation/user/${reserveId}`,
})

// 사용자 시설예약 상태 변경 (PRG-USP-R01-03)
export const fetchMvnFcSpacesPut = (data:reqReserveStatusType) =>
  api({
    method: 'put',
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/reservation/spaces/${data.reserveId}/update-state`,
    data:{ reserveSt:data.reserveSt, rejectReasonCn:data.rejectReasonCn}
})

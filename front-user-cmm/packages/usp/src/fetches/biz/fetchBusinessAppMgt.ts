import api from '~/api';
import { TypeReqMgnt } from '~/models/biz/BusinessAppMgt';

export type inputType = {
  boardId : string,
  posting?:boolean,
  articleSrchCd?:string,
  articleSrchWord?:string,
  page?:number,
  itemsPerPage?:number;
}

//목록 가져오기
export default (data: inputType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${data.boardId}/articles`,
    method:'get',
    params:data,
  })

// 경력정보 조회 (PRG-USP-MCM-01)
export const fetchCareerInfo = () =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/career`,
    method:'get',
})
// 경력정보 수정 (PRG-USP-MCM-02)
export const fetchCareerInfoModify = (data:any) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/career`,
    method:'put',
    data
})

//사업신청 목록 조회 (PRG-USP-SPA-07)
export const fetchBusinessList = (param:TypeReqMgnt) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt`,
    method:'get',
    params:param
  })

//사업신청 사유 내용 조회 (PRG-USP-SPA-08)
export const fetchBusinessReason = (applyId:string) =>
  api({                                 
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/reason`,
    method:'get',
  })

//사업신청 필수확인사항 조회 (PRG-USP-SPA-09)
export const fetchBusinessChklst = (applyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/chklst`,
    method:'get',
  })

//사업 신청자 정보 확인 (PRG-USP-SPA-02)
export const fetchBusinessApplicantConfirm = (applyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/applicant`,
    method:'get',
  })

//사업 신청정보 확인 (PRG-USP-SPA-03)
export const fetchBusinessApplyConfirm = (applyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/apply`,
    method:'get',
  })

//사업 신청서 임시저장 (PRG-USP-SPA-05)
export const fetchBusinessTmpSave = (form:FormData,applyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/tmp-save`,
    method:'put',
    data:form
  })

//사업 신청서 수정 제출 (PRG-USP-SPA-13)
export const fetchBusinessMgntSave = (form:FormData,applyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/save`,
    method:'put',
    data:form
  })

//사업신청 취소 (PRG-USP-SPA-14)
export const fetchBusinessCancel = (applyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/mgnt/${applyId}/cancel`,
    method:'put',
  })
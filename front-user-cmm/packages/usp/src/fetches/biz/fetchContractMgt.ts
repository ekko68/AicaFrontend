import api from '~/api';
import { TypeReqMgnt } from '~/models/biz/BusinessAppMgt';
import { FrontBsnsPlanType, UsptTaskTaxitmWct } from '~/models/biz/ContractMgt';
import { BsnsPlanDocInfo, planInput } from '~/models/ModelBizPlanMgt';


export type BsnsPlanDocInfo1 = {
  bsnsPlanDocId:string,
  planPresentnSttusCd:string
  
}
export type ResnInfo = {
  bsnsPlanDocId:string,
  bsnsSlctnId:string
  
}

//사업계획서 목록조회
export const fetchPlanList = (params:planInput) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan`,
    method:'get',
    params: {frontBsnsPlanParam: params}
})

// 사업계획서 사유 확인팝업
export const fetchResnInfo = (params: ResnInfo) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/resn`,
    method:'get',
    params: params
})

// /사업계획서 상세 조회  
export const fetchBsnsPlanDocInfo = (params: ResnInfo) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/detail-info`,
    method:'get',
    params: params
})

//사업계획서 사유 확인팝업-파일 전체 다운
export const fetchGrpFileDwln = (params: FrontBsnsPlanType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/resn/grp-file-dwln`,
    method:'get',
})

// 사업계획서 비목별 사업비 구성팝업_조회
export const fetchTaxitmWct = (taskReqstWctId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/taxitm-wct`,
    method:'get',
    params:{FrontBsnsPlanParam:{taskReqstWctId:taskReqstWctId}}
})

// 사업계획서 비목별 사업비 구성팝업_저장
export const fetchAddTaxitmWct = (data: UsptTaskTaxitmWct[]) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/taxitm-wct/save`,
    method:'post',
    data:data
})
// 사업계획서 임시저장
export const fetchModifyPlanTmp = (data: FormData,planPresentnSttusCd:string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/${planPresentnSttusCd}/tmp-save`,
    method:'put',
    data
})

// 사업계획서 저장
export const fetchModifyPlan = (data: FormData,planPresentnSttusCd:string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-plan/${planPresentnSttusCd}/save`,
    method:'put',
    data
})

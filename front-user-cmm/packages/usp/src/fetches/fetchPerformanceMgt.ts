import api from '~/api';
import { performanceListInput } from '~/models/ModelPerformanceMgt';


//성과관리 목록 조회 (PRG-USP-SGF-01)
export const fetchPerformanceListGet = (params: performanceListInput) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt`,
  method:'get',
  params : params
})

//성과 보완요청 조회 (PRG-USP-SGF-02)
export const fetchPerformanceSupplementGet = (rsltId: string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/makeup`,
    method:'get',
})

//성과 보완요청 첨부파일 다운로드 (PRG-USP-SGF-03)
export const fetchPerformanceSupplementAttachmentGet = (rsltId: string, attachmentId : string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/makeup/atchmnfl/${attachmentId}`,
    method:'get',
})

//성과 상세 조회 (PRG-USP-FBG-04)
export const fetchPerformanceDetailGet = (rsltId: string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}`,
    method:'get',
})

//성과 제출 (PRG-USP-SGF-05)
export const fetchPerformanceSubmit = (rsltId:string,form:FormData) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}`,
    method:'put',
    data:form
})

//성과 제출일시 목록 조회 (PRG-USP-SGF-06)
export const fetchPerformancePresentnGet = (rsltId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/presentn-dt`,
    method:'get',
})

//성과 제출이력 조회 (PRG-USP-SGF-07)
export const fetchPerformanceHistGet = (rsltId:string,histId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist?rsltHistId=${histId}`,
    method:'get',
})

//성과 제출이력 첨부파일 일괄 다운로드 (PRG-USP-SGF-08)
export const fetchPerformanceAttachGetAll = (rsltId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist/atchmnfl`,
    method:'get',
})

//성과 제출이력 첨부파일 다운로드 (PRG-USP-SGF-09)
export const fetchPerformanceAttachGet = (rsltId:string, attachmentId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist/atchmnfl/${attachmentId}`,
    method:'get',
})

//입주성과 성과ID 생성 요청 (PRG-USP-SGF-10)
export const fetchRsltIdGet = (data:any)=>
api({
    url:`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/mvn/rsltId`,
    method:'post',
    data : data
})
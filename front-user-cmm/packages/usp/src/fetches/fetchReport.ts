import api from '~/api';
import { reportListInput } from '~/models/ModelReport';

//보고서 제출 목록 조회 (PRG-USP-FBG-01)
export const fetchReportListGet = (params: reportListInput) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn`,
  method:'get',
  params : params
})

//보고서 보완요청 조회 (PRG-USP-FBG-02)
export const fetchReportSupplementGet = (reprtId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${reprtId}/makeup`,
  method:'get',
})

//보고서 보완요청 첨부파일 다운로드 (PRG-USP-FBG-03)
export const fetchReportSupplementAttachmentGet = (reprtId: string,attachmentId : string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${reprtId}/makeup/atchmnfl/${attachmentId}`,
  method:'get',
})

//보고서 제출 상세조회 (PRG-USP-FBG-04)
export const fetchReportDetailGet = (reprtId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${reprtId}`,
  method:'get',
})

//보고서 첨부파일 다운로드 (PRG-USP-FBG-05)
export const fetchReportMakeupAttachmentGet = (reprtId: string,attachmentId : string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${reprtId}/atchmnfl/${attachmentId}`,
  method:'get',
})

//보고서 제출 (PRG-USP-FBG-06)
export const fetchReportSubmit = (reprtId:string,form:FormData) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/reprt-presentn/${reprtId}`,
    method:'put',
    data:form
})
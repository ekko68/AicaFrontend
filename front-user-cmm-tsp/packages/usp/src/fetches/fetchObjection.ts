import api from '~/api';
import { objectionInput } from '~/models/ModelObjection';

//결과이의신청 목록 조회 (PRG-USP-RDS-01)
export const fetchObjectionGet = (params: objectionInput) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc`,
  method:'get',
  params : params
});

//결과이의신청 상세조회 (PRG-USP-RDS-02)
export const fetchObjectionDetailGet = (objcReqstId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${objcReqstId}`,
  method:'get',
});

//결과이의신청 신청취소 (PRG-USP-RDS-03)
export const fetchObjectionCancel = (objcReqstId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${objcReqstId}/cancel`,
  method:'put',
});

//결과이의신청 첨부파일 일괄 다운로드 (PRG-USP-RDS-04)
export const fetchObjectionAttachDownload = (objcReqstId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${objcReqstId}/objc/atchmnfl`,
  method:'get',
});

//심의결과 첨부파일 일괄 다운로드 (PRG-USP-RDS-05)
export const fetchReqstAttachDownload = (objcReqstId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${objcReqstId}/dlbrt/atchmnfl`,
  method:'get',
});

//반려사유 조회 (PRG-USP-RDS-06)
export const fetchRejectReasonGet = (objcReqstId: string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-objc/${objcReqstId}/reject-reason`,
  method:'get',
});

//결과이의신청 (PRG-USP-VRS-03)
export const fetchEvglRequest = (evlTrgetId:string, data:FormData) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/evl-result/${evlTrgetId}/objc-reqst`,
    method:'post',
    data : data
});

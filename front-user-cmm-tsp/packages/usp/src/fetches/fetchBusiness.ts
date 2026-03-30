import api from '~/api';

//사업연도 목록 조회 (PRG-USP-BCM-01)
export const fetchBsnsYearList = () =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/common/bsnsYearList`,
    method:'get',
})

//사업신청 필수확인사항 조회 (PRG-USP-SPA-01)
export default (pblancId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${pblancId}/chklst`,
    method:'get',
  })

//사업 신청자 정보 확인 (PRG-USP-SPA-02)
export const fetchBusinessMyData = (pblancId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${pblancId}/applicant`,
    method:'get',
  })

//사업 신청정보 확인 (PRG-USP-SPA-03)
export const fetchBusinessApplyData = (pblancId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${pblancId}/apply`,
    method:'get',
  })

//사업 신청서 임시저장 (PRG-USP-SPA-05)
export const fetchBusinessApplyDataSave = (form:FormData,pblancId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${pblancId}/tmp-save`,
    method:'post',
    data:form
  })

//사업 신청서 제출 (PRG-USP-SPA-06)
export const fetchBusinessApplyDataSubmit = (form:FormData,pblancId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-apply/${pblancId}/save`,
    method:'post',
    data:form
  })


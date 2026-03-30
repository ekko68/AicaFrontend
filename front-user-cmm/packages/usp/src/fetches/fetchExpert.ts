import api from '~/api';

//전문가 신청- 조회 (PRG-USP-ESG-02)
export const fetchExpertGet = () =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/expert-reqst`,
    method:'get',
  })

//전문가 신청- 완료 (PRG-USP-ESG-03)
export const fetchExpertPost = (form:FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/expert-reqst`,
  method:'post',
  data:form
})

//전문분야 부모 목록 조회
export const fetchExpertParnts = () =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/expert-reqst/expert-clid/parnts`,
  method:'get',
})

//전문분야 자식 목록 조회
export const fetchExpertClid = (expertId : string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/expert-reqst/expert-clid/${expertId}`,
  method:'get',
})
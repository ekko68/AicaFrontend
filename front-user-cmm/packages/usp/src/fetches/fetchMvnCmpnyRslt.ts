import api from '~/api';

//입주업체성과 제출정보 상세조회 (PRG-USP-CFM-02)
export const fetchCmpnyRsltDetailGet = (params:any) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/company-result/${params.mvnId}/${params.sbmsnYm}`,
    method:'get',
})

//입주업체성과 제출정보 등록 (PRG-USP-CFM-03)
export const fetchCmpnyRsltAdd = (params:any,data:any) =>
api({
    url:`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/company-result/${params.mvnId}/${params.sbmsnYm}`,
    method:'post',
    data : data
})

//입주업체성과 제출정보 삭제 (PRG-USP-CFM-04)
export const fetchCmpnyRsltDelete = (params:any) =>
api({
    url:`http://pc.bent.com:8086/mvn/api/company-result/${params.mvnId}/${params.sbmsnYm}`,
    method:'delete'
})
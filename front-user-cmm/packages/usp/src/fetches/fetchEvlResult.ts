import api from "~/api";

//평가결과 조회 (PRG-USP-VRS-01)
export const fetchEvlResultListGet = (params:any) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/evl-result`,
    method:'get',
    params : params
})

//평가의견 확인 (PRG-USP-VRS-02)
export const fetchEvlResultChk = (evlTrgetId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/evl-result/${evlTrgetId}`,
    method:'get',
})
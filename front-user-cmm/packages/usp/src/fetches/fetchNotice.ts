import axios from 'shared/libs/axios';
import api from '~/api';
import { detailType, paramsType } from '~/pages/Notice/NoticeModel';

// 모집공고 목록조회 (PRG-USP-MJG-01)
export default (params: paramsType) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc`,
    params:params
  });
};
// 마감 임박공고 목록조회 (PRG-USP-MJG-02)
export const  fetchNoticeCloseing = (params: paramsType) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/closeing`,
    params:params
  });
};
// 모집공고 상세조회 (PRG-USP-MJG-03) todo....
export const  fetchNoticeDetall = (params: detailType) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${params.pblancId}`,
    params:params
  });
};

//인기공고 목록조회 (PRG-USP-MJG-06)
export const fetchPopularPblanc = () =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/main/popular`,
    method:'get',
  })

//나에게 맞는 사업 추천 목록 조회 (PRG-USP-MJG-07)
export const fetchRecomendPblanc = (params: any) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/main/recomend`,
    method:'get',
    params : params
  })

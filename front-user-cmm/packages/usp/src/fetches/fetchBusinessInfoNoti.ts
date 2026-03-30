import api from '~/api';

//알림정보 등록
export default (data:any) => 
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/info-ntcn`, 
    data:data
  })


//사업정보 알림 조회 (PRG-USP-BIN-01)
export const fetchBusiGet = () =>
api({
  method: 'get',
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/info-ntcn`,
})

//삭제
export const fetchBusinessInfoNotiDelete = () =>
  api({
    method: 'delete',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/info-ntcn`,
  })

//사업정보 받기
export const fetchBusinessInfoNotiGet = () =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/info-ntcn/bsrList`,
  })

//교육정보 받기
export const fetchEduInfoNotiGet = () =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/info-ntcn/eduList`,
  })

//나의 사업관리알림 목록 조회 (PRG-USP-BIN-06)
export const bizInfoNotiList = () =>
api({
  method: 'get',
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/info-ntcn/bsns-ntcn`,
})
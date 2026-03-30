import api from '~/api';

//협약변경 관리(변경요청 조회) (PRG-USP-HYB-01)
export default (params : any) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change`,
    method:'get',
    params : params
  });

//협약변경 관리(변경요청 조회_사업년도) (PRG-USP-HYB-01)
export const fetchBsnsYearGet = () =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/bsnsYear`,
  method:'get',
})

//협약변경 관리(변경요청 조회_과제명) (PRG-USP-HYB-01)
export const fetchTaskNmGet = (params : any) =>
api({

  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/taskNm`,
  method:'get',
  params : params
})

//협약변경 관리(신청내역 조회) (PRG-USP-HYB-02)
export const fetchCnvnChangeGet = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/request`,
  method:'get',
  params : params
})

//협약변경 신청(수행기관신분 조회) (PRG-USP-HYB-03)
export const fetchCnvnSclpstGet = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_sclpst`,
  method:'get',
  params : params
})

//협약변경 신청(수행기관신분 신청) (PRG-USP-HYB-03)
export const fetchCnvnSclpstPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_sclpst/request`,
  method:'put',
  data : data
})

//협약변경 신청(수행기관신분 신청취소) (PRG-USP-HYB-03)
export const fetchCnvnSclpstCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_sclpst/cancel`,
  method:'put',
  data : params
})

//협약변경 신청(과제정보 조회) (PRG-USP-HYB-04)
export const fetchCnvnTaskInfoGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_task_info`,
  method:'get',
  params : params
})

//협약변경 신청(과제정보 신청) (PRG-USP-HYB-04)
export const fetchCnvnTaskInfoPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_task_info/request`,
  method:'put',
  data : data
})

//협약변경 신청(과제정보 신청취소) (PRG-USP-HYB-04)
export const fetchCnvnTaskInfoCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_sclpst/cancel`,
  method:'put',
  data : params
})

//협약변경 신청(참여기업 조회) (PRG-USP-HYB-05)
export const fetchCnvnPrtcmpnyGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_prtcmpny_info`,
  method:'get',
  params : params
})

//협약변경 신청(참여기업 신청) (PRG-USP-HYB-05)
export const fetchCnvnPrtcmpnyPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_prtcmpny_info/request`,
  method:'put',
  data : data
})

//협약변경 신청(참여기업 신청취소) (PRG-USP-HYB-05)
export const fetchCnvnPrtcmpnyCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_prtcmpny_info/cancel`,
  method:'put',
  data : params
})

//협약변경 신청(참여인력 조회) (PRG-USP-HYB-06)
export const fetchTaskPartGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_partcpt`,
  method:'get',
  params : params
})

//협약변경 신청(참여인력 신청) (PRG-USP-HYB-06)
export const fetchTaskPartPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_partcpt/request`,
  method:'put',
  data : data
})

//협약변경 신청(참여인력 신청취소) (PRG-USP-HYB-06)
export const fetchTaskPartCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_partcpt/cancel`,
  method:'put',
  data : params
})

////////
//협약변경 신청(사업비 조회) (PRG-USP-HYB-07)
export const fetchTaskReqstGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_reqst_wct`,
  method:'get',
  params : params
})

//협약변경 신청(사업비 신청) (PRG-USP-HYB-07)
export const fetchTaskReqstPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_reqst_wct/request`,
  method:'put',
  data : data
})

//협약변경 신청(사업비 신청취소) (PRG-USP-HYB-07)
export const fetchTaskReqstCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_reqst_wct/cancel`,
  method:'put',
  data : params
})
////////
//협약변경 신청(비목별사업비 조회) (PRG-USP-HYB-08)
export const fetchTaskTaxitmGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_taxitm_wc`,
  method:'get',
  params : params
})

//협약변경 신청(비목별사업비 신청) (PRG-USP-HYB-08)
export const fetchCnvnApplcntPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_taxitm_wc/request`,
  method:'put',
  data : data
})

//협약변경 신청(비목별사업비 신청취소) (PRG-USP-HYB-08)
export const fetchCnvnApplcntCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_taxitm_wc/cancel`,
  method:'put',
  data : params
})
////////
//협약변경 신청(신청자정보 조회) (PRG-USP-HYB-09)
export const fetchCnvnApplcntGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_applcnt`,
  method:'get',
  params : params
})

//협약변경 신청(신청자정보 신청) (PRG-USP-HYB-09)
export const fetchTaskTaxitmPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_applcnt/request`,
  method:'put',
  data : data
})

//협약변경 신청(신청자정보 신청취소) (PRG-USP-HYB-09)
export const fetchTaskTaxitmCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/cnvn_applcnt/cancel`,
  method:'put',
  data : params
})

////////
//협약변경 신청(과제책임자 조회) (PRG-USP-HYB-10)
export const fetchTaskRspnBerGet = (params : any) => 
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_rspnber`,
  method:'get',
  params : params
})

//협약변경 신청(과제책임자 신청) (PRG-USP-HYB-10)
export const fetchTaskRspnBerPost = (data : FormData) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_rspnber/request`,
  method:'put',
  data : data
})

//협약변경 신청(과제책임자 신청취소) (PRG-USP-HYB-10)
export const fetchTaskRspnBerCancel = (params : any) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/cnvn-change/task_rspnber/cancel`,
  method:'put',
  data : params
})
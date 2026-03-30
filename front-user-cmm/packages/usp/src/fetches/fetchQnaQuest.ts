import api from '~/api';
import { changePwType, memberType, reqEnterpriseType, reqEnterpriseType2 } from "~/models/Model";

export type questsType = {
  qnaId:string | undefined,
  questId?:string,
  questStatus:string,
  categoryCd?:string,
  title?:string,
  memberNm?:string,
  questBeginDay?: Date | null | string,
  questEndDay?:Date | null  | string,
  page:number,
  itemsPerPage:number,
}

type authType = {
  passwdCheckKey:string,
  mobileNo?:string,
  email?:string,
  emailCertKey?:string
  certNo?:string
  phoneCertKey?:string
}
// passwdCheckKey
// emailCertKey
// certNo

//질의응답 등록 (PRG-COM-QAA-02)
export default (form:FormData,qnaId:string | undefined) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/${qnaId}/quests`,
    method:'post',
    data:form
  })

//질의응답 목록 조회 (PRG-COM-QAA-01) tartDate: 없음 / endDate: 없음
// UI-USP-FRN-0350101 UI-USP-FRN-0360101 UI-USP-ADM-0560101 UI-USP-ADM-0690101
// 디딤널 과 둥일
export const fetchOneByOneMmt = (questsType:questsType,qnaId:string) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/${qnaId}/quests`,
    params:questsType
})

// 질의응답파일 목록
export const fetchOneByOneFiles = (questId:string,qnaId:string) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/${qnaId}/quests/${questId}/attachments`,
})

// 질의응답 조회 상세(PRG-COM-QAA-03) param : qnaId(질의응답 게시판ID ) / questId(질의응답글ID) / startDate: 없음 / endDate: 없음
// UI-USP-FRN-0350201 UI-USP-FRN-0360201 UI-USP-ADM-0560201 UI-USP-ADM-0690201
// 디딤널 과 둥일 
export const fetchOneByOneMmtDetail = (questId:string ,qnaId:string) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/qna/${qnaId}/quests/${questId}`,
})
// 회원정보 조회
export const fetchGetMemberInfo = (passwdCheckKey:string | null) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${passwdCheckKey}`,
})
//회원정보 수정
export const fetchInfoModif = (data:memberType,passwdCheckKey:string) =>
  api({
    method: 'put',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${passwdCheckKey}`,
    data:data
})
//비밀번호 변경
export const fetchChangePw = (data:changePwType) =>
  api({
    method: 'put',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/passwd`,
    data:data
})

//회원본인 휴대폰 인증요청(PRG-COM-MSF-14)
export const fetchSelfPhoneCertReq = (data:authType) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${data.passwdCheckKey}/phone-cert-req`,
    params:{mobileNo:data.mobileNo,passwdCheckKey:data.passwdCheckKey}
})

//회원본인 휴대폰 인증확인(PRG-COM-MSF-15)
export const fetchSelfPhoneCertCheck = (data:authType) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${data.passwdCheckKey}/phone-cert-check`,
    params:{certNo:data.certNo,phoneCertKey:data.phoneCertKey,passwdCheckKey:data.passwdCheckKey}
})
// 회원본인 이메일 인증요청(PRG-COM-MSF-17)
export const fetchSelfEmailCertReq = (data:authType) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${data.passwdCheckKey}/email-cert-req`,
    params:{email:data.email}
    // data:data.email
}) 
// 회원본인 이메일 인증요청(PRG-COM-MSF-17)
export const fetchSelfEmailCertCheck = (data:authType) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${data.passwdCheckKey}/email-cert-check`,
    params:data
})
// 회원본인 휴대폰 변경(PRG-COM-MSF-16)
export const fetchPhoneChange = (passwdCheckKey:string,phoneCertKey:string) =>
api({
  method: 'put',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${passwdCheckKey}/phone`,
  params:{phoneCertKey:phoneCertKey}
});

// 회원본인 이메일 변경(PRG-COM-MSF-19)
export const fetchEmailChange = (passwdCheckKey:string,emailCertKey:string) =>
api({
  method: 'put',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${passwdCheckKey}/email`,
  params:{emailCertKey:emailCertKey}
});

// 기업정보 등록(PRG-COM-ENT-01) UI-USP-FRN-0060101
export const fetchEnterprisePost = (data:reqEnterpriseType2) =>
api({
  method: 'post',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/enterprise`,
  data:data
});

// 기업정보 조회(PRG-COM-ENT-02) UI-USP-FRN-0060101
export const fetchEnterpriseGet = () =>
api({
  method: 'get',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/enterprise`,
});

// 기업정보 수정(PRG-COM-ENT-03) UI-USP-FRN-0060101
export const fetchEnterprisePut = (data:reqEnterpriseType2) =>
api({
  method: 'put',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/enterprise`,
  data:data
});
// 기업정보 삭제(PRG-COM-ENT-04) UI-USP-FRN-0060101
export const fetchEnterpriseDel = (data:reqEnterpriseType2) =>
api({
  method: 'delete',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/enterprise`,
  data:data
});
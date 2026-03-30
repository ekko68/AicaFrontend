import api from '~/api';

export type inputType = {
  loginId?:string;
  memberNm:string,
  birthday?:string | undefined,
  bizrno?:string | undefined,
  mobileNo:string,
  email:string,
  key:string,
}
export type certNoType = {
  key:string,
  certNo?:string,
  mobileNo?:string,
  email?:string,
}

export type pwChangeType = {
  key:string,
  passwd1:string,
  passwd2:string,
}

// id 찾기 개인
export default (data: inputType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/individual-id`,
    method: 'post',
    data,
});

// id 찾기 사업자
export const fetchIdTrouverBiz = (data: inputType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/bzmn-id`,
    method: 'post',
    data,
});
// 개인회원 비밀번호 찾기 1단계(PRG-COM-MBA-03)
export const fetchFactorPw= (data: inputType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/individual-passwd`,
    method: 'post',
    data,
});
// 사업자 비밀번호 찾기 1단계(PRG-COM-MBA-04) 
export const fetchFactorPwBiz = (data: inputType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/bzmn-passwd`,
    method: 'post',
    data,
});

// 비밀번호 찾기 휴대폰 인증 요청(PRG-COM-MBA-05) 
export const fetchFactorPhoneCertReq= (data: certNoType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/phone-cert-req`,
    method: 'post',
    data,
});
// 비밀번호 찾기 휴대폰 인증 확인(PRG-COM-MBA-06)
export const fetchFactorPhoneCertCheck = (data: certNoType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/phone-cert-check`,
    method: 'post',
    data,
});
// 비밀번호 찾기 이메일 인증 요청(PRG-COM-MBA-07) 
export const fetchFactorEmailCertReq= (data: certNoType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/email-cert-req`,
    method: 'post',
    data,
});
// 비밀번호 찾기 이메일 인증 확인(PRG-COM-MBA-08)
export const fetchFactorEmailCertCheck = (data: certNoType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/email-cert-check`,
    method: 'post',
    data,
});

// 비밀번호 찾기 비밀번호 재설정(PRG-COM-MBA-09) 
export const fetchFactorPwChange = (data: pwChangeType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/help/find/change-passwd`,
    method: 'post',
    data,
});

// 비밀번호 확인
export const fetchFactorPwCheck = (pw: string) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/members/me/passwd-check`,
    method: 'post',
    params: { passwd: pw },
});

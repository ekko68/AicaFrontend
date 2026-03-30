import api from '~/api';
import { bzmnChangeType,  } from '~/models/Model';
import { joinMemberType, NiceIdResult,TermCdimsiType } from '~/models/ModelSignin';

type typeGroupCode= {
  group: string,
  type: string,
  id: string
}

export default (types: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/terms/${types}/now`,
    // url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/terms/${types}/now`,
    method: 'get',
  });

// 약관 임시 저장
export const fetchTermsImsi = (data: TermCdimsiType[]) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/terms-consent/session`,
    data:data,
  });

  export const fetchTermsImsiBizChange = (data: TermCdimsiType[]) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/terms-hist/temparary-storage`,
    data:data,
  });


// 회원가입-탈퇴회원 정상전환(PRG-COM-MBR-15) 
export const fetchJoinUnsecesstion= (sessionId:string) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/unsecession`,
    data:{sessionId:sessionId},
  });
// 회원가입 폰 인증 요청
  export const fetchSignUpPhoneRes = (data:FormData) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/phone/cert-req`,
    data:data,
  });
// 회원가입 폰 인증 확인
  export const fetchSignUpPhoneCk = (data:FormData) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/phone/cert-check`,
    data:data,
  });

// 회원가입 이메일 인증 요청
export const fetchSignUpEmailRes = (data:FormData) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/email/cert-req`,
    data:data,
  });

// 회원가입 이메일 인증 확인
export const fetchSignUpEmailCk= (data: FormData) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/email/cert-check`,
    data:data,
  });

  // 회원가입 요청
export const fetchSignUp = (data: joinMemberType) =>
api({
  method: 'post',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join`,
  data:data,
});

  // 본인인증 서비스 nice
  export const FetchNiceIdPost = (data:{successUrl:string,failUrl:string}) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/contact-module/mobile-cert/init`,
    data:data,
  });

  // 본인인증 결과 저장
  export const FetchNiceIdRes = (data:NiceIdResult) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/mobile`,
    data:data,
  });


  // 사업자전환 - 이메일인증요청(PRG-COM-MSF-11)
  export const FetchEmailCertReq = (data:{email:string}) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/email-cert-req`,
    data:data,
  });  

  // 사업자전환 - 이메일인증확인(PRG-COM-MSF-11)
  export const FetchEmailCertReqCheck = (params:{emailCertKey: string,certNo: string}) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/email-cert-check`,
    params:params,
  });  

  // 사업자전환 - 핸드폰인증요청(PRG-COM-MSF-11)
  export const FetchPhoneCertReq = (params:{mobileNo:string}) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-req`,
    params:params,
  });  

  // 사업자전환 - 핸드폰인증확인(PRG-COM-MSF-11)
  export const FetchPhoneCertReqCheck = (data:{mobileNoCertKey:string,certNo:string}) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-check`,
    data:data,
  });  

  // 사업자전환(PRG-COM-MSF-13)
  export const FetchSelfBzmnPhoneChange = (data:bzmnChangeType) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/change`,
    data:data,
  }); 

  // // 사업자용 공동인증서 진행 전 초기화 데이터 호출
  export const FetchreactAppPkiCertInitUrl = () =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_PKI_CERT_INIT_URL}`,
  }); 

  // // 사업자용 공동인증서 진행 결과값 수신 CallBack
  export const FetchreactAppPkiCertResultUrl = (params:any) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_PKI_CERT_RESULT_URL}`,
    data:params
  }); 

  // 사업자회원 계정 인증 (PRG-COM-AST-02) 
  export const FetchAccountCertBzmn = (data:{pkiCertSessionId: string}) =>
  api({
    method: 'post',
    url: `${process.env.REACT_APP_PKI_CERT_RESULT_URL}`,
    data
  }); 
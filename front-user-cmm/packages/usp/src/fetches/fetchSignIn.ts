import axios from 'shared/libs/axios';
import api from '~/api';
import { NiceIdResult, UserType } from '~/models/ModelSignin';
import {AuthenticationType} from 'shared/authentication/index';
export type SnsType = {
  accessToken: AuthenticationType;
  code?: string;
  uri: string;
};
export default (data: UserType) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/login/member`,
    data,
  });
};
// refresh-token
export const fetchRefreshToken = () =>
  axios({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/login/refresh-token/member`,
    method: 'post',
  });

// 아이디 중복 확인
export const fetchCheckUserId = (data: FormData) =>
axios({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/verify/login-id`,
    // url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/terms-consent/session`,
    data,
});

// 비밀번호 확인
export const fetchCheckUserPw = (data:FormData) => {
  return axios({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/passwd-check`,
    method: 'post',
    data
  });
};

// 회원 탈퇴
export const fetchWithdrawal = () => {
  return axios({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/members/secession`,
    method: 'put',
  });
};
// todo..
export const fetchMe =  (key: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/members/me/${key}`,
    method: 'get',
  });
// sns 로그인 api
export const fetchSignInSns =  (data: SnsType) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/login/${data.uri}`,
    data,
  });
};

// sns 로그인 설정 api
export const fetchSignInSnsSelf =  (data: SnsType) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${data.uri}`,
    data,
  });
};

// sns 로그인 설정 api
export const fetchSignInSnsSelfDelete =  (data: SnsType) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${data.uri}`,
  });
};

// sns 로그인 설정 조회
export const fetchGetSnsConfig =  () => {///${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/members/secession
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/sns`,
  });
};

// 본인인증 비밀번호 변경
export const fetchPasswdChange = (data:string,passwdCheckKey:string) =>
api({
  method: 'put',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/${passwdCheckKey}/mobile-cert`,
  data:{encodeData:data},
});

// 로그인 계정 휴면 해제 (PRG-COM-AST-04) 
export const fetchAccountUndomant = (secessionKey:string) =>
api({
  method: 'put',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/account/undomant`,
  data:{sessionId:secessionKey},
});

// 로그인 계정 잠금 해제 (PRG-COM-AST-03) 
export const fetchAccountUnlocck = (data:any) =>
api({
  method: 'put',
  url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/account/unlock`,
  data: data,
});


import api from '~/api';
import { bzmnChangeType } from '~/models/Model';

export type inputType = {
  posting?:boolean,
  articleSrchCd?:string,
  articleSrchWord?:string,
  page?:number,
  itemsPerPage?:number;
}

export type detailType = {
  boardId : string,
  articleId : string,
}

export default (data:inputType) => 
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/user-menual/articles`,
    params: data,
  });


export const fetchUserManualDetail = (data: detailType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/${data.boardId}/articles/${data.articleId}`,
    method:'get',
  })

//사업자전환 - 이메일인증요청(PRG-COM-MSF-11)
export const FetchEmailCertReq= (data: FormData) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/email-cert-req`,
    method: 'post',
    data,
});

//사업자전환 - 이메일인증확인(PRG-COM-MSF-11)string
export const FetchEmailCertReqCheck= (data:FormData) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/email-cert-check`,
    method: 'post',
    data,
});

//사업자전환 - 핸드폰인증요청(PRG-COM-MSF-11)
export const FetchPhoneCertReq= (data:FormData) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-req`,
    method: 'post',
    data,
});

//사업자전환 - 핸드폰인증확인(PRG-COM-MSF-11)
export const FetchPhoneCertReqCheck= (data:FormData) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-check`,
    method: 'post',
    data,
});

//사업자전환(PRG-COM-MSF-13)
export const FetchSelfBzmnPhoneChange= (data:bzmnChangeType) =>   
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-check`,
    method: 'post',
    data,
});
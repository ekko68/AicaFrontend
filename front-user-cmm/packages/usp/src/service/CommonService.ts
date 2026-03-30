import {UseQueryResult} from "react-query";
import {AxiosGet, AxiosPost, GetQuery,PostQuery} from "shared/libs/axios";
import { bzmnChangeType } from "~/models/Model";
import {CodeGroup, CommonCode} from "~/service/Model";

// type urls = {
//   successUrl:string,
//   failUrl:string,
// }
export class CommonService {
  static CommonCode(groupName: CodeGroup[]): UseQueryResult<CommonCode, any> {
    // @ts-ignore
    // const conf = JSON.parse(localStorage.getItem("serverConfig"))
    return GetQuery("", {codeGroup: groupName}, 
    // {baseURL: conf?.url.replace("admin","code")}
    )
  }

  // 공통 코드 조회
  static async FetchGetCommCode(param:{codeGroup?: string}): Promise<any[]> {
    return await  AxiosGet(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/codegroups/${param.codeGroup}/codes/enabled`,{})
  }

  // 본인인증 서비스 nice
  static async FetchNiceIdPost(data:{successUrl:string,failUrl:string}): Promise<any> {
    return await  AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/nice/encdata/`,data)
  }
  
  // 본인인증 서비스 nice
  static async FetchNiceIdRes(data:{encodeData:string}): Promise<any> {
    return await  AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/nice/result`,data)
  }

  //사업자전환 - 이메일인증요청(PRG-COM-MSF-11)
  static async FetchEmailCertReq(data:{email:string}): Promise<any> {
    return  await AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/email-cert-req`,data)
  }

  //사업자전환 - 이메일인증확인(PRG-COM-MSF-11)string
  static async FetchEmailCertReqCheck(param:{emailCertKey: string,certNo: string}): Promise<any> {
    return await AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/email-cert-check`,param)
  }

  //사업자전환 - 핸드폰인증요청(PRG-COM-MSF-11)
  static async FetchPhoneCertReq(param:{mobileNo:string}): Promise<any> {
    return await AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-req?mobileNo=${param.mobileNo}`)
  }

  //사업자전환 - 핸드폰인증확인(PRG-COM-MSF-11)
  static async FetchPhoneCertReqCheck(data:{mobileNoCertKey:string,certNo:string}): Promise<any> {
    return await AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/phone-cert-check`,data)
  }

  //사업자전환(PRG-COM-MSF-13)
  static async FetchSelfBzmnPhoneChange(data:bzmnChangeType): Promise<any> {
    return await AxiosPost(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/bzmn/change`,data)
  }

  static  fetchSiteMap(menu: string): UseQueryResult<any, any> {
    return  GetQuery(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/auth/menus/${menu}/me`)
  }

  static async fetchSiteMapAxios(menu: string): Promise<any[]> {
    return await AxiosGet(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/auth/menus/${menu}/me`,menu)
  }

}
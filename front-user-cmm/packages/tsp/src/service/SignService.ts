import {AxiosPost} from "shared/libs/axios";
import {BaseResponse} from "shared/utils/Model";

export class SignService {
  static SignIn(data: {loginId:string, passwd: string}):Promise<any> {
    return AxiosPost('/member/api/login/member', data,{baseURL: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}`} )
  }

  static SignOut():Promise<any> {
    return AxiosPost('/member/api/logout/member', undefined,{baseURL: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}`} )
  }
}
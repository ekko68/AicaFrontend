import {UseQueryResult} from "react-query";
import { GetQuery,AxiosGet,AxiosPost,AxiosPut} from "shared/libs/axios";
import {DataResponse, NoticeDataResponse,reqEnterpriseType,TermsResponse} from "~/models/Model";
import { reqReserveStatusType, reqReserveType, resReserveType } from "./Model";

export class DataService {
  static BasicBoard(param: { page: number, pageSize: number, rowCount: number }): UseQueryResult<DataResponse, any> {
    return GetQuery(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/boards/usp-notice/articles`, {page: param.page + 1, itemsPerPage: param.pageSize})
  }

  static FetchNoticeDetall(param: {pblancId:string | null | undefined, queryBox?:string}): UseQueryResult<NoticeDataResponse, any> {
    return GetQuery(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/bsns-pblanc/${param.pblancId}/?${param.queryBox}`)
  }

  // 약관조회
  static async FetchTermsGet(TermsType: string, req: []): Promise<TermsResponse[]> {
    return await  AxiosGet(`${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/terms/${TermsType}/now`, req)
  }

  // 이메일 인증 todo ...
  static async FetchSignUpEmailRes(data: {email:string}): Promise<any> {
    return await  AxiosPost(` ${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/join/email/cert-req?email=${data.email}`)
  }
  // 1:1문의 관리 목록 조회
  static async FetchOneByOneMmtGet(param: {codeGroup:string}): Promise<any[]> {
    return await  AxiosGet(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/codegroups/${param.codeGroup}/codes/enabled`,param)
  }

  // 사용자 시설예약 목록조회 (PRG-USP-R03-01)
  static async FetchMvnFcRsvtGet(param: reqReserveType): Promise<resReserveType[]> {
    return await  AxiosGet(`/mvn/api/reservation/user`,param)
  }
  // /mvn/api/reservation/spaces/{reserveId}/update-state  PRG-USP-R01-03
  static async FetchMvnFcSpacesPut(data: reqReserveStatusType): Promise<any[]> {
    return await  AxiosPut(`/mvn/api/reservation/spaces/${data.reserveId}/update-state`,{ reserveSt:data.reserveSt , rejectReasonCn:data.rejectReasonCn})
  }
  // 기업정보 조회(PRG-COM-ENT-02) UI-USP-FRN-0060101
  static async FetchEnterpriseGet(param: {}): Promise<reqEnterpriseType> {
    return await  AxiosGet(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/enterprise`,param)
  }
  // 기업정보 수정(PRG-COM-ENT-03) UI-USP-FRN-0060101   todo ... -> {param: reqEnterpriseType}
  static async FetchEnterprisePut(data: any): Promise<any[]> {
    return await  AxiosPut(`${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/enterprise`,data)
  }

}
import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {GetQuery} from "shared/libs/axios";
import {OneByOne문의} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

export class OnebyOneInquiryMgtService {
  static getList(param: {
    처리상태:string
    문의구분:string
    제목:string
    회원명:string
    담당자:string
    접수일:string
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<OneByOne문의>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  // static getHistInfo(OnebyOneInquiryMgtId: string, param: {
  //   page: number,
  //   rowsPerPage: number,
  //   rowCount: number,
  // }): UseQueryResult<WithResponse<WithPagination<>>, any> {
  //   return GetQuery("/" + OnebyOneInquiryMgtId, {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  // }
}

import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {GetQuery} from "shared/libs/axios";
import {관리자공지} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

export class ManagerNoticeMgtService {
  static getList(param: {
    전시여부?: string
    제목?: string
    고정여부?: string
    등록일?: string
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<관리자공지>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  // static getHistInfo(ManagerNoticeMgtId: string, param: {
  //   page: number,
  //   rowsPerPage: number,
  //   rowCount: number
  // }): UseQueryResult<WithResponse<WithPagination<>>, any> {
  //   return GetQuery("/" + ManagerNoticeMgtId, {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  // }
}

import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {GetQuery} from "shared/libs/axios";
import {공지사항} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

export class NoticeInfoMgtService {
  static getList(param: {
    전시여부?: string
    제목?: string
    고정여부?: string
    등록일?: string
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<공지사항>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  // static getHistInfo(NoticeInfoMgtId: string, param: {
  //   page: number,
  //   rowsPerPage: number,
  //   rowCount: number
  // }): UseQueryResult<WithResponse<WithPagination<>>, any> {
  //   return GetQuery("/" + experMgtId, {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  // }
}

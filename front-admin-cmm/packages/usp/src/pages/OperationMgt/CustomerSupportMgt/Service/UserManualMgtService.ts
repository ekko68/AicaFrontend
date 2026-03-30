import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {GetQuery} from "shared/libs/axios";
import {사용자메뉴얼} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

export class UserManualMgtService {
  static getList(param: {
    분류?: string
    제목?: string
    전시여부?: string
    등록일?: number
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<사용자메뉴얼>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  // static getHistInfo(experMgtId: string, param: {
  //   page: number,
  //   rowsPerPage: number,
  //   rowCount: number
  // }): UseQueryResult<WithResponse<WithPagination<>>, any> {
  //   return GetQuery("/" + experMgtId, {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  // }
}

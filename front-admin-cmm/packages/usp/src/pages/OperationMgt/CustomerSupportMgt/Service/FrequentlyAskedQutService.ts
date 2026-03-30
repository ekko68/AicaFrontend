import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {GetQuery} from "shared/libs/axios";
import {자주묻는질문} from "~/pages/OperationMgt/CustomerSupportMgt/Model/Model";

export class FrequentlyAskedQutService {
  static getList(param: {
    분류?: string
    제목?: string
    전시여부?: string
    등록일?: number
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<자주묻는질문>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  // static getHistInfo(experMgtId: string, param: {
  //   page: number,
  //   rowsPerPage: number,
  //   rowCount: number
  // }): UseQueryResult<WithResponse<WithPagination<전문가신청처리이력>>, any> {
  //   return GetQuery("/" + experMgtId, {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  // }
}

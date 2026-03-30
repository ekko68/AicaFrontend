import {AxiosGet, AxiosPut, GetQuery} from "shared/libs/axios";
import {UseQueryResult} from "react-query";
import {MyPageEstmt, MyPageEstmtDetail, WithPagination} from "~/service/Model";
import {WithResponse} from "shared/utils/Model";

export class MyPageEstimationService {
  // 견적요청관리 목록조회
  static getEstmtList(param:{
    page: number
    rowsPerPage: number
  }) : UseQueryResult<WithResponse<WithPagination<MyPageEstmt>>, any> {
    return GetQuery('/mypage/estmts', {...param, page:param.page + 1, itemsPerPage:param.rowsPerPage})
  }
  // 견적요청관리 목록조회
  static getEstmtDetail(estmtId: string) : UseQueryResult<WithResponse<MyPageEstmtDetail>, any> {
    return GetQuery('/mypage/estmts/' + estmtId)
  }
}
import {AxiosGet, AxiosPut, GetQuery, PostQuery} from "shared/libs/axios";
import {UseQueryResult} from "react-query";
import {
  ApplyEstmtList,
  ApplyEstmtPost,
  ApplyEstmtSelect,
  ApplyEstmtUseDate,
  UseReqstEstmtRntfee,
  WithPagination
} from "~/service/Model";
import {WithResponse} from "shared/utils/Model";

export class ApplyEstimationService {
  // 장비사용견적요청 목록
  static getEstmtList(param: {
    page: number
    rowsPerPage: number
  }) : UseQueryResult<WithResponse<WithPagination<ApplyEstmtList>>, any> {
    return GetQuery('/use-reqst/estmts', {...param, page:param.page + 1, itemsPerPage:param.rowsPerPage})
  }

  // 견적신청 장비선택 디테일
  static getEstmtDetailView(eqpmnId:string) : UseQueryResult<WithResponse<ApplyEstmtSelect>> {
    return GetQuery(`/use-reqst/estmts/${eqpmnId}`)
}

  // 견적신청 사용시간 선택
  static getEstmtUseDate(data: ApplyEstmtUseDate) : UseQueryResult<WithResponse<WithPagination<ApplyEstmtUseDate>>,any> {
    return GetQuery('/use-reqst/estmts/eqpmn-use-date', data)
  }

  // 견적신청 예상 사용금액
  static getEstmtExpertRntfee(data: ApplyEstmtPost) : UseQueryResult<WithResponse<UseReqstEstmtRntfee>> {
    return GetQuery('/use-reqst/estmts/expect-rntfee', data)
}

  // 견적신청
  static postEstmt(data:ApplyEstmtPost) {
    return PostQuery('/use-reqst/estmts', data)
  }
}
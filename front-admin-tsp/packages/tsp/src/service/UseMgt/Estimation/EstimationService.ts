import {AxiosGet, AxiosPut, GetQuery} from "shared/libs/axios";
import {UseQueryResult} from "react-query";
import {
  EqpmnEstmtDetailData,
  EqpmnEstmtList, EqpmnEstmtModifyPrice,
  EqpmnReqstProcess,
  TsptEqpmnEstmtReqstHist,
  WithPagination
} from "~/service/Model";
import {WithResponse} from "shared/utils/Model";

export class EstimationService {
  // 견적신청 목록 조회
  static getList(param: {
    page: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<EqpmnEstmtList>>, any> {
    return GetQuery("/eqpmns/estmts",{...param,page: param.page +1, itemsPerPage:param.rowsPerPage})
  }

  // 견적요청 상세 - 신청정보
  static getUseEquipEstmtMgtInfo(estmtId: string) : UseQueryResult<EqpmnEstmtDetailData, any> {
    return GetQuery("/eqpmns/estmts/" + estmtId)
  }

  // 견적요청 상세 - 신청정보 - 사용금액 재설정
  static putEstmtModifyPrice(data: EqpmnEstmtModifyPrice) {
    return AxiosPut('/eqpmns/estmts/dscnt', data)
  }

  // 견적신청 처리내역 조회
  static getTsptEqpmnEstmtReqstHist(estmtId:string,param:{page: number, rowsPerPage:number}) : UseQueryResult<WithResponse<WithPagination<TsptEqpmnEstmtReqstHist>>,any> {
    return GetQuery(`/eqpmns/estmts/hist-list/${estmtId}`, {...param, page: param.page +1, itemsPerPage:param.rowsPerPage})
  }

  // 견적신청 엑셀 다운로드
  static getUseEquipListExcelDownload() {
    return AxiosGet("/eqpmns/estmts/excel-dwld", undefined, {responseType: 'blob'});
  }

  // 견적신청 처리
  static putUseEquipEstmtCheck(data: EqpmnReqstProcess) : Promise<WithResponse<EqpmnEstmtDetailData>> {
    return AxiosPut('/eqpmns/estmts/estmt-reqst-process', data)
  }
}

import {AxiosGet, AxiosPut, GetQuery} from "shared/libs/axios";
import {UseQueryResult} from "react-query";
import {
  AditRntfee, EqpmnApplyReqstProcess,
  EqpmnReqstProcess,
  EqpmnUseDetail,
  EqpmnUseList,
  EqpmnUseReqstDetail,
  EqpmnUseReqstHistList,
  EqpmnUseReqstList, EqpmnUseRntfeeHist,
  NpyProcess, RcpmnyGdcc,
  TkoutDlbrt,
  WithPagination
} from "~/service/Model";
import {WithResponse} from "shared/utils/Model";

export class EquipmentService {
  static getEquipApplyList(param: {
    page: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<EqpmnUseReqstList>>, any> {
    return GetQuery("/eqpmns/use-reqst", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static getUseEquipListExcelDownload() {
    return AxiosGet("/eqpmns/estmts/use-reqst/excel-dwld", undefined, {responseType: 'blob'});
  }

  static getUseEquipListApplyInfo(reqstId: string): UseQueryResult<EqpmnUseReqstDetail, any> {
    return GetQuery("/eqpmns/use-reqst/" + reqstId)
  }

  // 사용신청 처리내역 조회
  static getApplyEquipDetailHistList(param: { page: number, rowsPerPage: number }) : UseQueryResult<WithResponse<WithPagination<EqpmnUseReqstHistList>>,any> {
    return GetQuery("eqpmns/use-reqst/hist-list", {...param, page:param.page +1, itemsPerPage:param.rowsPerPage})
  }

  static getApplyEquipExcelDownload() {
    return AxiosGet("/eqpmns/use-reqst/excel-dwld", undefined, {responseType: 'blob'});
  }

  // 장비사용관리 정보 조회
  static getEquipUseList(param: {
    page: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<EqpmnUseList>>, any> {
    return GetQuery("/eqpmns/use", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  // 장비사용관리 상세정보 조회
  static getEquipUseDetail(reqstId: string): UseQueryResult<EqpmnUseDetail, any> {
    return GetQuery("/eqpmns/use/" + reqstId)
  }

  // console.log('put data - ' + JSON.stringify(data))
  // 장비사용관리 추가금액설정
  static putUseAditRntfee(data:AditRntfee) {
    return AxiosPut(`/eqpmns/use/adit-rntfee`, {data})
  }

  // 장비사용관리 엑셀 다운로드
  static getUseExcelDownload() {
    return AxiosGet(`/eqpmns/use/excel-dwld`, undefined, {responseType:'blob'})
}

// 장비사용관리 사용료 부과내역
static getUseRntfee(reqstId:string): UseQueryResult<WithResponse<WithPagination<EqpmnUseRntfeeHist>>, any> {
    return GetQuery(`/eqpmns/use/rntfee/${reqstId}`)
}

  // 장비사용관리 미납처리
  static putUseNpyProcess(data: NpyProcess) : Promise<WithResponse<NpyProcess>> {
    return AxiosPut(`/eqpmns/use/npy-process`, data)
}

  // 장비사용관리 반입 완료처리
  static putUseTkin(reqstId: string) {
    return AxiosPut(`/eqpmns/use/tkin`, {param:reqstId})
  }

  // 장비사용관리 장비사용처리
  static putUseReqstProcess(data: EqpmnReqstProcess) {
    return AxiosPut(`/eqpmns/use/process`, data)
  }

  // 장비사용관리 입금 안내문 발송
  static putUseRcpmnyGdcc(data: RcpmnyGdcc) :Promise<WithResponse<RcpmnyGdcc>> {
    return AxiosPut(`/eqpmns/use/rcpmny-gdcc`, data)
  }

  // 사용신청 승인 처리
  static putUseReqstConsent(data: string) {
    return AxiosPut('/eqpmns/use-reqst/consent', {param:data})
  }

  // 사용신청 할인 적용
  static putUseReqstDscnt(reqstId: string, dscntId: string) {
    console.log(dscntId);
    return AxiosPut(`/eqpmns/use-reqst/dscnt/${reqstId}`, {param:dscntId})
  }

  // 사용신청 보완,반려 처리
  static putUseEquipEstmtCheck(data: EqpmnApplyReqstProcess) : Promise<WithResponse<EqpmnUseReqstDetail>> {
    return AxiosPut('/eqpmns/use-reqst/process/', data)
  }

  // 사용신청 반출심의 처리
  static putUseReqstTkout(data :TkoutDlbrt ) {
    return AxiosPut(`/eqpmns/use-reqst/tkout`, data)
  }
}
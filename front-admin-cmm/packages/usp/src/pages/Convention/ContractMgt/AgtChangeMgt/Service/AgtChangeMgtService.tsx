import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {AxiosGet, GetQuery} from "shared/libs/axios";
import { CnvnChange , BsnsPlanProcessHist} from "~/pages/Convention/ContractMgt/AgtChangeMgt/Model";


export class AgtChangeMgtService {
  static getList(param: {
    cnvnChangeSttusCd?: string  /** 협약변경상태코드(G:CNVN_CHANGE_STTUS) */
    cnvnChangeTypeCd?: string  /** 협약변경유형(CNVN_CHANGE_TYPE) */
    changeIemDivCd?: string /** 협약변경항목구분코드(G:CHANGE_IEM_DIV) */
    receiptNo?: string /*접수번호*/
    taskNmKo?: string /*과제명*/
    memberNm?: string /** 신정자명 */
    page: number
    rowCount: number
    rowsPerPage: number

  }): UseQueryResult<WithResponse<WithPagination<CnvnChange>>, any> {
    console.log(param)
    const data= GetQuery("/pms/api/cnvn-change", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage});
    console.log('#########################')
    console.log(data)
    return data;
  }

  static getDetailInfo(bsnsSlctnId: string): UseQueryResult<WithResponse<WithPagination<BsnsPlanProcessHist>>, any> {
    const data = GetQuery("/pms/api/bsns-plan/detail-info", {bsnsSlctnId});
    console.log('#########################')
    console.log(data)
    return data;
  }

  static getHistInfo(bsnsPlanDocId: string, param: {
    page: number,
    rowsPerPage: number,
    rowCount: number
  }): UseQueryResult<WithResponse<WithPagination<BsnsPlanProcessHist>>, any> {

    const data= GetQuery("/pms/api/cnvn-change/hist" + bsnsPlanDocId, {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage});
    console.log('#########################')
    console.log(data)

    const data2 = GetQuery("/pms/api/cnvn-change/hist", {bsnsPlanDocId, page: param.page + 1, itemsPerPage: param.rowsPerPage});
    console.log('#########################')
    console.log(data2)

    return GetQuery("/pms/api/cnvn-change/hist", {bsnsPlanDocId, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static AllfileExceDownload() {
    return AxiosGet("/tsp/api/admin/eqpmns/estmts/excel-dwld", undefined, {responseType: 'blob'});
  }
}

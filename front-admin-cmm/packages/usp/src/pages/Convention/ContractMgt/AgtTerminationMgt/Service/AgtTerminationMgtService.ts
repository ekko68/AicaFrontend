import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {AxiosGet, GetQuery} from "shared/libs/axios";
import { CnvnTrmnat as TEntity , BsnsPlanProcessHist} from "~/pages/Convention/ContractMgt/AgtTerminationMgt/Model";


export class AgtTerminationMgtService {
  static getList(param: {
    bsnsYear?: string /*사업연도*/
    cnvnTrmnatDe?: string  /**협약해지일**/
    receiptNo?: string /*접수번호*/
    taskNmKo?: string /*과제명*/
    memberNm?: string /** 사업자명 */
    bsnsNm?: string  /**사업명*/
    page: number
    rowCount: number
    rowsPerPage: number

  }): UseQueryResult<WithResponse<WithPagination<TEntity>>, any> {
    console.log(param)
    const data= GetQuery("/pms/api/cnvn-trmnat", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage});
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

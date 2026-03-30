import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {AxiosGet, GetQuery} from "shared/libs/axios";
import {UspBsnsPlan as TEntity, BsnsPlanEntity } from "../Model";


export class BusPlanReceptionMgtService {
  static getList(param: {
    bsnsYear?: string /*사업연도*/
    bsnsNm?: string /*사업명*/
    planPresentnSttusCd?: string /*처리상태*/
    pblancNm?: string /*공고명*/
    receiptNo?: string /*접수번호*/
    taskNmKo?: string /*과제명*/
    memberNm?: string /*회원명*/
    page: number
    rowCount: number
    rowsPerPage: number

  }): UseQueryResult<WithResponse<WithPagination<TEntity>>, any> {
    return GetQuery("/pms/api/bsns-plan/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage});
  }

  static getDetailInfo(bsnsPlanDocId: string, bsnsSlctnId: string): UseQueryResult<WithResponse<BsnsPlanEntity>, any> {
    return  GetQuery("/pms/api/bsns-plan/detail-info", {bsnsPlanDocId, bsnsSlctnId});;
  }

  static getHistInfo(bsnsPlanDocId: string, param: {
    page: number,
    rowsPerPage: number,
    rowCount: number
  }): UseQueryResult<WithResponse<any>, any> {
    return GetQuery("/pms/api/bsns-plan/hist", {bsnsPlanDocId, page: param.page + 1, itemsPerPage: param.rowsPerPage});
  }

  static AllfileExceDownload() {
    return AxiosGet("/tsp/api/admin/eqpmns/estmts/excel-dwld", undefined, {responseType: 'blob'});
  }
}

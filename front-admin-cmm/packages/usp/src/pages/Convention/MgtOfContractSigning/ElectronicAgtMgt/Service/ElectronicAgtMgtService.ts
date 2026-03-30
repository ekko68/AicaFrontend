import {UseQueryResult} from "react-query";
import {WithPagination, WithResponse} from "shared/utils/Model";
import {AxiosGet, GetQuery} from "shared/libs/axios";
import {CnvnCncls} from "~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt/Model";

export class ElectronicAgtMgtService {
  static getList(param: {
    bsnsYear?: string /*사업연도*/
    bsnsNm?: string /*사업명*/
    cnvnSttusCd?: string /*처리상태*/
    cnvnDeStart?: string /**협약일자시작- 조회조건**/
    cnvnDeEnd?: string /**협약일자종료- 조회조건**/
    pblancNm?: string /*공고명*/
    receiptNo?: string /*접수번호*/
    taskNmKo?: string /*과제명*/
    memberNm?: string /**회원명(주관업체명) */
    rspnberNm?: string  /**과제책임자명 */
    page: number
    rowCount: number
    rowsPerPage: number

  }): UseQueryResult<WithResponse<WithPagination<CnvnCncls>>, any> {
    console.log(param)
    const data= GetQuery("/pms/api/cnvn-cncls", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage});
    console.log('#########################')
    console.log(data)
    return data;
  }

  static getDetailInfo(bsnsSlctnId: string): UseQueryResult<WithResponse<WithPagination<CnvnCncls>>, any> {
    const data = GetQuery("/pms/api/bsns-plan/detail-info", {bsnsSlctnId});
    console.log('#########################')
    console.log(data)
    return data;
  }

  static AllfileExceDownload() {
    return AxiosGet("/pms/api/cnvn-cncls/excel-dwld", undefined, {responseType: 'blob'});
  }
}

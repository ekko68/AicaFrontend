import {AxiosGet, AxiosPut, GetQuery} from "shared/libs/axios";
import {UseQueryResult} from "react-query";
import {
  UseResourceCancelProcess,
  UseResourceDetailData,
  UseResourceHistData,
  UseResourceMgtData, UseResourceReturnProcess,
  WithPagination
} from "~/service/Model";
import {WithResponse} from "shared/utils/Model";


export class UseResourceService {
  static getList(param: {
    reqstSttus?: string /*신청상태*/
    useBeginDt?: number
    useEndDt?: number
    entrprsNm?: string
    userNm?: string
    rceptNo?: string
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<UseResourceMgtData>>, any> {
    return GetQuery("/resrce/resrce-use/",{...param,page: param.page +1, itemsPerPage:param.rowsPerPage})
  }

  static getUseResourceMgtInfo(reqstId: string) : UseQueryResult<UseResourceDetailData, any> {
    return GetQuery("/resrce/resrce-use/" + reqstId)
  }

   static putUseResourceApplyCancel(data: UseResourceCancelProcess): Promise<WithResponse<UseResourceDetailData>> {
     return AxiosPut("/resrce/resrce-use/" + data.reqstId + "/cancel/", data)
   }

  static putUseResourceApplyReturn(data: UseResourceReturnProcess): Promise<WithResponse<UseResourceDetailData>> {
    return AxiosPut("/resrce/resrce-use/" + data.reqstId + "/return/", data)
  }

  static getProcessHistoryList(reqstId: string, param: {
    page: number,
    rowsPerPage: number,
    rowCount: number
  }) : UseQueryResult<WithResponse<WithPagination<UseResourceHistData>>, any> {
    return GetQuery('/resrce/resrce-use/' + reqstId + '/hist/', {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static getUseResourceHistInfoExcelDownload(param: {}) {
    return AxiosGet("/resrce/resrce-use/excel-dwld", param ,{responseType: 'blob'});
  }
}
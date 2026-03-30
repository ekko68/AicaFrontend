import {UseQueryResult} from "react-query";
import {BaseResponse, WithPagination, WithResponse} from "shared/utils/Model";
import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut, GetQuery} from "shared/libs/axios";
import {WithCustomRowData} from "shared/components/TableComponents";
import {
  전문가단분류,
  전문가매칭,
  전문가매칭이력,
  전문가분류관리_담당자,
  전문가신청리스트,
  전문가신청처리이력,
  전문가정보상세
} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {질문답변데이터} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";

export class ExpertMgtService {
  /* 전문가 신청 관리*/
  static getList(param: {
    처리상태?: string
    시작일?: number
    종료일?: number
    이름?: string
    직장명?: string
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<전문가신청리스트>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static getHistInfo(expertMgtId: string, param: {
    page: number,
    rowsPerPage: number,
    rowCount: number
  }): UseQueryResult<WithResponse<WithPagination<전문가신청처리이력>>, any> {
    return GetQuery("/" + expertMgtId, {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static putApprove(expertMgtId: string): Promise<BaseResponse> {
    return AxiosPut('/' + expertMgtId)
  }

  static putReject(expertMgtId: string): Promise<BaseResponse> {
    return AxiosPut('/' + expertMgtId)
  }

  static getExpertReqExcelDownload() {
    return AxiosGet("/", undefined, {responseType: 'blob'});
  }

  /* 전문가 정보 관리 */
  static getInformationHistInfo(param: {
    page: number,
    rowsPerPage: number,
    rowCount: number
  }): UseQueryResult<WithResponse<전문가매칭>, any> {
    return GetQuery("/", {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static getExcelTemplateDownload() {
    return AxiosGet("/", undefined, {responseType: 'blob'});
  }

  static getInformationExcelDownload() {
    return AxiosGet("/", undefined, {responseType: 'blob'});
  }

  static postInformationExcelRegister(data:{colums:string[], row: any[]}): Promise<BaseResponse> {
    return AxiosPost("/", data );
  }

  static getExpertInformation(expertMgt: string): UseQueryResult<WithResponse<전문가정보상세>, any> {
    return GetQuery('/' + expertMgt)
  }

  static putSave(expertMgtId: string, data: 전문가정보상세): Promise<WithResponse<전문가정보상세>> {
    return AxiosPut('/' + expertMgtId)
  }

  static deleteExpertInformation(expertMgtId: string): Promise<BaseResponse> {
    return AxiosDelete('/' + expertMgtId)
  }

  /*전문가 분루 관리*/
  static getClassification(): UseQueryResult<WithResponse<전문가단분류[]>, any> {
    return GetQuery('/')
  }

  static putClassification(parentExpertId: string, data: 전문가단분류[]): Promise<WithResponse<전문가단분류[]>>{
    return AxiosPut('/' + parentExpertId, data)
  }

  static deleteClassification(parentExpertId: string, data: 전문가단분류[]): Promise<WithResponse<전문가단분류[]>>{
    return AxiosDelete('/' + parentExpertId, data)
  }

  static getAuthManager(): UseQueryResult<WithResponse<전문가분류관리_담당자[]>, any>{
    return GetQuery('/')
  }

  static getManagerList(param: {
    담당부서?: string,
    담당자명?: string
    page: number,
    rowsPerPage: number,
    rowCount: number
  }): UseQueryResult<WithResponse<WithPagination<전문가분류관리_담당자[]>>, any> {
    return GetQuery('/',{...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static deleteAuthManager(data: 전문가분류관리_담당자[]): Promise<WithResponse<전문가분류관리_담당자[]>>{
    return AxiosDelete('/',data)
  }

  static postAuthManager(data: 전문가분류관리_담당자[]): Promise<WithResponse<전문가분류관리_담당자[]>>{
    return AxiosPost('/',data)
  }
}

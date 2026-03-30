import {UseQueryResult} from "react-query";
import {BaseResponse, WithPagination, WithResponse} from "shared/utils/Model";
import {AxiosGet, AxiosPost, AxiosPut, GetQuery} from "shared/libs/axios";
import {만족도조사리스트, 설문지기본정보, 설문지등록, 응답자, 질문답변데이터, 질문데이터} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";

export class SatisfaSurveyMgtService {
  /* 만족도조사 관리*/
  static getList(param: {
    포털구분?: string
    진행상태?: string
    시작일?: number
    종료일?: number
    설문지명?: string
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<만족도조사리스트>>, any> {
    return GetQuery("/", {...param, page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static postRegister(data: 설문지등록): Promise<BaseResponse> {
    return AxiosPost('', data)
  }

  static putRegister(data: 설문지기본정보): Promise<WithResponse<설문지기본정보>> {
    return AxiosPut('', data)
  }

  static putQuestion(data: 질문데이터[]): Promise<WithResponse<질문데이터[]>> {
    return AxiosPut('', data)
  }

  static getRespondentList(param: {
    page: number
    rowCount: number
    rowsPerPage: number
  }): UseQueryResult<WithResponse<WithPagination<응답자>>, any> {
    return GetQuery("/", {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }

  static getResearchData(data: {beginTime: Date, endTime: Date}):Promise<WithResponse<질문답변데이터[]>> {
    return AxiosGet('/', data)
  }

  static getAllResearchData():Promise<WithResponse<질문답변데이터[]>> {
    return AxiosGet('/', )
  }
}
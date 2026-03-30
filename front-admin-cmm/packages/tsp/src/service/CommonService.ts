import {UseQueryResult} from "react-query";
import {AxiosGet, getBaseUrl, GetQuery} from "shared/libs/axios";
import {BaseResponse} from "shared/utils/Model";
import {CodeGroup, CommonCode, EqpmnEstmtDetailData} from "~/service/Model";

// EQPMN_REQST_ST - 장비상태
export class CommonService {
  static CommonCode(groupName: CodeGroup[]): UseQueryResult<CommonCode, any> {
    const index = getBaseUrl().indexOf('/admin')
    const newBase = getBaseUrl().substring(0,index)
    return GetQuery("/code", {codeGroup: groupName}, {baseURL: newBase } )
  }

  // 첨부 파일 한개 다운로드
  static AttachmentFile(attachmentId: string) {
    const index = getBaseUrl().indexOf('/admin')
    const newBase = getBaseUrl().substring(0,index)
    return AxiosGet("/file-dwld-contentType/" + attachmentId, undefined, {responseType: 'blob',baseURL: newBase})
  }

  // 첨부 파일 그룹 다운로드
  static AttachmentGroupFile(attachmentGroupId: string) {
    const index = getBaseUrl().indexOf('/admin')
    const newBase = getBaseUrl().substring(0,index)
    return AxiosGet("/file-dwld-groupfiles/" + attachmentGroupId, undefined, {responseType: 'blob',baseURL: newBase})
  }}
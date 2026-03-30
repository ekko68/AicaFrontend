import {UseQueryResult} from "react-query";
import {AxiosGet, GetQuery} from "shared/libs/axios";
import {DataResponse} from "~/service/Model";

export class DataService {
  static BasicBoard(param: { page: number, pageSize: number, rowCount: number }): UseQueryResult<DataResponse, any> {
    return GetQuery("/common/api/boards/usp-notice/articles", {page: param.page + 1, itemsPerPage: param.pageSize})
  }
}
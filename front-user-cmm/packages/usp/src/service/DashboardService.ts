import {UseQueryResult} from "react-query";
import {BoardData, DashboardDataResponse, BoardDataResponse} from "~/service/Model";
import {GetQuery} from "shared/libs/axios";

export class DashboardService {
  static Notice(param: { page: number, rowsPerPage: number, rowCount: number }): UseQueryResult<BoardDataResponse, any> {
    return GetQuery("/dashboard/list", {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }
  static DashboardData(): UseQueryResult<DashboardDataResponse, any> {
    return GetQuery("/dashboard/count")
  }
}
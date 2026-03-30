import {UseQueryResult} from "react-query";
import {BoardDataResponse, EquipmentClassifyResponse, EquipmentInformationResponse} from "~/service/Model";
import {GetQuery} from "shared/libs/axios";


export class EquipmentInformationService {
  static getList(param: {
    page: number,
    rowsPerPage: number,
    rowCount: number
  }): UseQueryResult<EquipmentInformationResponse, any> {
    console.log("param - " + JSON.stringify(param))
    return GetQuery("/equipments/info", {page: param.page + 1, itemsPerPage: param.rowsPerPage})
  }
}

import { UseQueryResult} from "react-query";
import {
  EquipmentClassifyRequest,
  EquipmentClassifyResponse
} from "~/service/Model";
import {AxiosDelete, AxiosPost, GetQuery} from "shared/libs/axios";

export class EquipmentCategoryService {
  static getRoot(): UseQueryResult<EquipmentClassifyResponse[], any> {
    return GetQuery("/equipments/categories")
  }

  static getCategory(parentId: string): UseQueryResult<EquipmentClassifyResponse[], any> {
    return GetQuery("/equipments/categories/trees/" + parentId)
  }

  static setCategory(parentId: string, req: EquipmentClassifyRequest[]): Promise<EquipmentClassifyResponse[]> {
    return AxiosPost("/equipments/categories/" + parentId, req)
  }

  static deleteCategory(parentId: string, req: EquipmentClassifyRequest[]): Promise<EquipmentClassifyResponse[]> {
    return AxiosDelete("equipments/categories/" + parentId, req)
  }

  static setTest(parentId: string, req: EquipmentClassifyRequest[]): Promise<EquipmentClassifyResponse[]> {
    return AxiosPost("/equipments/categories/" + parentId, req)
  }
}

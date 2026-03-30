import {BaseResponse} from "shared/utils/Model";

export interface BoardData {
  articleId: string
  boardId: string
  title: string
  notice: boolean
  attachmentGroupId: string | null
  imageGroupId: string | null
  categoryCd: string | null
  posting: boolean
  webEditor: boolean
  sharedUrl: string | null
  thumbnailFileId: string | null
  readCnt: number
  creatorId: string
  createdDt: number
  updaterId: string
  updatedDt: number
  rn: number
}

export interface BoardDataResponse extends BaseResponse {
  page: number
  itemsPerPage: number
  totalItems: number
  list: BoardData[]
}

export interface EquipmentClassifyResponse extends  BaseResponse{
  eqpmnClfcId: string
  eqpmnClfcNm: string
  parentEqpmnClfcId: string | null
  sortOrder: number
  enabled: boolean
}

export interface EquipmentClassifyData{
  eqpmnClfcId: string
  eqpmnClfcNm: string
  parentEqpmnClfcId: string | null
  sortOrder: number
  enabled: boolean
  child: EquipmentClassifyData[]
}

export interface EquipmentClassifyRequest {
  eqpmnClfcNm?: string
  eqpmnClfcId?: string
  sortOrder?: number
  enabled?: boolean
  parentEqpmnClfcId?: string | null
}

export interface EquipmentClassifyRowData {
  id: string,
  order: number,
  title: string,
  enable: string,
}

export interface DashboardDataResponse extends BaseResponse {
  estimateCount: number
  useCount: number
  rentalTotal: number
  extentionCount: number
  reportCount: number
  usageTotal: number
  resourceCount: number
  resourceReturnCount: number
  resourceTotal: number
}

export interface EquipmentInformationData {
  eqpmnId: string
  eqpmnSt: string
  enabled: boolean
  checkTarget: boolean
  crrcTarget: boolean
  crrcCycle: number
  lastCrrcDay: string
  lastCrrcHistId: string
  crrcInstt: string
  crrcResult: string
  rntfeeHour: number
  useBeginHour: string
  useEndHour: string
  utilizationLow: boolean
  tkoutIncHoliday: boolean
  nottkoutIncHoliday: boolean
  assetNo: string
  eqpmnNmKo: string
  eqpmnNmEn: string
  modelNm: string
  eqpmnClfcId: string
  eqpmnStndrd: string
  sumry: string
  spec: string
  subMhrls: string
  eqpmnPurpose: string
  imageFileId: string
  srcelct: string
  hasManual: boolean
  hasSw: boolean
  itlpc: string
  pchrg: boolean
  spcmnt: string
  purchaseDay: string
  store: string
  purchasePrice: number
  maker: string
  asCompany: string
  asCharger: string
  asTelNo: string
  creatorId: string
  createdDt: string
  updaterId: string
  updatedDt: string
}

export interface EquipmentInformationResponse extends BaseResponse {
  page: number
  itemsPerPage: number
  totalItems: number
  list: EquipmentInformationData[]
}

export interface DataResponse extends BaseResponse {
  page: number
  itemsPerPage: number
  totalItems: number
  list: BoardData[]
}
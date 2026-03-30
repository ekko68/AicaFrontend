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

// 시설예약 타입
export interface ReserveItem {
  reserveId: string             // 예약ID
  mvnFcId: string               // 입주시설ID
  reserveSt: string,            // 예약상태(G:RESERVE_ST)
  reserveStNm: string           // 예약상태명
  mvnFcDtype: string            // 입주시설세부유형(G:MVN_FC_DTYPE)
  mvnFcDtypeNm: string          // 입주시설세부유형명
  mvnFcNm: string               // 입주시설명
  reserveType: string           // 예약유형(G:RESERVE_TYPE)
  reserveTypeNm: string         // 예약유형명
  rsvtDay: string               // 예약일
  rsvtBgngTm: string            // 예약시작시간
  rsvtEndTm: string             // 예약종료시간
  rsvtDtPeriod: string          // 예약일시기간
  rsvtNope: number,             // 예약인원수
  rsvctmId: string              // 예약자ID
  rsvctmNm: string              // 예약자명(CMMT_MEMBER.MEMBER)
  mvnYn: string                 // 입주여부(true:입주, false:미입주)
  rsvtReqDt: Date               // 예약요청일시
}
export interface reqReserveType {
  questBeginDay: string      //검색시작일
  questEndDay: string        //검색종료일
  reserveSt: string         // 예약상태(null:전체, APLY:신청, RJCT:반려, APRV:승인, RTRCN:취소, CLOSE:종료)
  page: number              // 페이지 번호
  itemsPerPage: number      // 페이지 당 출력 건수

}
export interface resReserveType extends BaseResponse {
  page: number
  itemsPerPage: number
  totalItems: number
  list: ReserveItem[]
}


export interface reqReserveStatusType {
  reserveId: string             //예약ID
  reserveSt: string             //예약상태
  rejectReasonCn: string        //반려사유내용

}
export interface CommonCode {
  // codeGroup: CodeKey<keyof CodeGroup>
  codeGroup: Record<CodeGroup, Code[]>
}

export type CodeGroup = "CMPNY_TYPE" | "INDUST_REALM" | "NEW_FNTN_PLAN" |
  "PBLANC_STTUS" | "MEMBER_TYPE" | "RECOMEND_CL" | "FOND_PLAN" |
  "EQPMN_TKOUT_ST" | "EQPMN_USAGE_ST"

export interface Code {
  codeNm: string
}
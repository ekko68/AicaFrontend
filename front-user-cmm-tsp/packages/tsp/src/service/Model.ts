import {AttachmentParam} from "shared/utils/Model";

export type CodeGroup = "EQPMN_AVAILABLE_ST" | "EQPMN_ESTMT_ST" | "EQPMN_RENTAL_REPORT_ST" |
    "EQPMN_RENTAL_ST" | "EQPMN_RESOURCE_REQST_ST" | "EQPMN_RESOURCE_USAGE_ST" | "EQPMN_ST" |
    "EQPMN_TKOUT_ST" | "EQPMN_USAGE_ST" | "EQPMN_EXTEND" | 'EQPMN_REQST_ST' | 'EQPMN_PAYMENT' | 'MEMBER_TYPE'

export interface Code {
  code: string
  codeNm: string
}

export interface CommonCode {
  // codeGroup: CodeKey<keyof CodeGroup>
  codeGroup: Record<CodeGroup, { codeGroup: Code[] }>
}


export interface EquipmentData{
  assetsNo: string /*자산번호*/
  atchmnflGroupId: string /*첨부파일그룹ID*/
  creatDt: number /*생성일시*/
  cttpc: string /*연락처*/
  email: string /*email*/
  entrprsNm: string /*업체명*/
  eqpmnNmEngl: string /*장비명(영문)*/
  eqpmnNmKorean: string /*장비명(국문)*/
  expectRntfee: number /*예상사용료*/
  expectUsgtm: number /*예상사용시간*/
  mberDiv: string /*구분(개인, 기업)*/
  modelNm: string /*모델명*/
  ofcps: string /*직위*/
  partcptnAt: string /*AI직접단지 참여사업*/
  promsAtchmnflId: string /*서약서ID*/
  pymntMth: string /*지불방법*/
  rceptNo: string /*접수번호*/
  reqstId: string /*신청ID*/
  reqstSttus: string /*신청상태*/
  rntfeeHour: number /*1시간 사용료*/
  tkoutAdres: string /*반출지주소*/
  tkoutAt: boolean /*반출여부*/
  tkoutResn: string /*반출사유*/
  useBeginDt: number /*사용시작시간*/
  useEndDt: number /*사용종료시간*/
  usefulBeginHour: number /*1일 가용시작시간*/
  usefulEndHour: number /*1일 가용종료시간*/
  useprps: string /*활용목적*/
  userNm: string /*사용자*/
  usgtm: number /*사용시간*/
  approveParam: MyUseApproveParam
  attachMentParam: AttachmentParam
}

export type WithPagination<T> = T & {
  page: number
  itemsPerPage: number
  totalItems: number
  list: T[]
}

export interface MyUseApproveParam{
  aditRntfee: number /*추가금액*/
  dscntAmount: number /*할인금액*/
  dscntId: string /*할인ID*/
  dscntRate: number /*할인률(%)*/
  dscntResn: string /*할인사유*/
  expectUsgtm: number /*예상사용시간*/
  rntfee: number /*사용료*/
  rqestResn: string /*청구사유*/
  tkoutDlbrtCn: string /*반출심의내용*/
  tkoutDlbrtResult: string /*반출심의결과*/
  usgtm: number /*사용시간*/
  tkinAtParam: MyUseDetailTkinAtParam
}

export interface MyUseDetailTkinAtParam{
  processKnd: string /*반입여부*/
  creatDt: number /*반입여부 생성일시*/
}

export interface EquipmentOverview{
  eqpmnId: string /*장비ID*/
  eqpmnNmEngl: string /*장비명(국문)*/
  eqpmnNmKorean: string /*장비명(국문)*/
  modelNm: string /*모델명*/
  rntfeeHour: number /*1시간 사용료*/
}

export interface EquipmentOverview{
  eqpmnId: string /*장비ID*/
  eqpmnNmEngl: string /*장비명(국문)*/
  eqpmnNmKorean: string /*장비명(국문)*/
  modelNm: string /*모델명*/
  rntfeeHour: number /*1시간 사용료*/
}

export interface UseReqstEstmtRntfeeParam{
  expectRntfee: number /*예상 사용금액*/
  expectUsgtm: number /*총 사용시간*/
  rntfeeHour: number /*1시간 사용료*/
  usefulHour: number /*1일 가용시간*/
}

export interface EstimationData{
  atchmnflGroupId: string /*첨부파일 ID*/
  dscntAmount: number /*할인금액*/
  eqpmnId: string /*장비Id*/
  expectRntfee: number /*예상사용료*/
  expectUsgtm: number /*예상사용시간*/
  pymntMth: string /*지불방법*/
  rntfee: number /*사용료*/
  tkoutAdres: string /*반출지 주소*/
  tkoutAt: boolean /*반출신청 여부*/
  tkoutResn: string /*반출 사유*/
  useBeginDt: number /*사용시작시간*/
  useEndDt: number /*사용종료시간*/
  useprps: string /*활용목적*/
}
export interface SearchParam {
  eqpmnNmKorean?: string /*검색텍스트*/
  reqstSttus?: string[] /*신청상태*/
  creatBeginDt?: number /*신청시작일*/
  creatEndDt?: number /*신청종료일*/
  // useBeginDt?: number /*사용시작일*/
  // useEndDt?: number /*사용종료일*/
}


export interface MyPageEstmt {
  estmtId: string /*신청 ID*/
  creatDt: number /*생성일자*/
  eqpmnNmKorean: string /*장비명*/
  reqstSttus: string /*신청상태*/
  rsndqf: string /*사유(보완,반려)*/
  updtDt: number /*수정일시*/
  useBeginDt: number /*사용시작시간*/
  useEndDt: number /*사용종료시간*/
}

export interface MyPageEstmtDetail {
  assetsNo: string,
  atchmnflGroupId: string,
  creatDt: number,
  cttpc: string,
  email: string,
  entrprsNm: string,
  eqpmnNmEngl: string,
  eqpmnNmKorean: string,
  estmtId: string,
  expectRntfee: number,
  mberDiv: string,
  modelNm: string,
  ofcps: string,
  partcptnAt: string,
  pymntMth: string,
  rceptNo: string,
  reqstSttus: string,
  rntfeeHour: number,
  tkoutAdres: string,
  tkoutAt: true,
  tkoutResn: string,
  useBeginDt: number,
  useEndDt: number,
  usefulBeginHour: number,
  usefulEndHour: number,
  useprps: string,
  userNm: string,
  MyAttachMentParamList: MyAttachMentParam[]
}
export interface MyAttachMentParam{
  attachmentId: string,
  contentType: string,
  fileNm: string,
  fileSize: number
}


// 사용신청 - 견적신청 장비선택 리스트
export interface ApplyEstmtList {
  eqpmnClNm: string, /*장비분류명*/
  eqpmnId: string, /*장비 ID*/
  eqpmnNmEngl: string, /*장비명(영문)*/
  eqpmnNmKorean: string, /*장비명(국문)*/
  modelNm: string, /*모델명*/
  rntfeeHour: number, /*1시간 사용료*/
  savedFilePath: string /*이미지 경로*/
}

// 사용신청 - 견적신청 장비선택 디테일
export interface ApplyEstmtSelect {
  asstnMhrls: string, /*보조기기*/
  eqpmnClNm: string, /*카테고리*/
  eqpmnId: string, /*장비 ID*/
  eqpmnNmEngl: string, /*장비명(영문)*/
  eqpmnNmKorean: string, /*장비명(국문)*/
  eqpmnStndrd: string, /*규격*/
  legacyItlpc: string, /*설치장소*/
  mnlAt: string, /*메뉴얼 여부*/
  modelNm: string, /*모델명*/
  pchrgAt: string, /*유료 여부*/
  realmPrpos: string, /*분야/용도*/
  savedFilePath: string, /*이미지*/
  spcmnt: string, /*특기사항*/
  specComposition: string, /*제원 및 주요구성품*/
  srcelct: string, /*전원*/
  sumry: string, /*요약*/
  swAt: string /*소프트웨어 여부*/
}

// 사용신청 - 견적신청
export interface ApplyEstmtPost {
  atchmnflGroupId?: string /*첨부파일 ID*/
  dscntAmount?:number /*할인금액*/
  eqpmnId?:string /*장비 ID*/
  expectRntfee?:number /*예상사용료*/
  expectUsgtm?:number /*예상사용시간*/
  pymntMth?:string /*지불방법*/
  rntfee?:number /*사용료*/
  tkoutAdres?:string /*반출지주소*/
  tkoutAt?:boolean /*반출 여부*/
  tkoutResn?:string /*반출 사유*/
  useBeginDt?:number /*사용시작시간*/
  useEndDt?:number /*사용종료시간*/
  useprps?:string /*활용목적*/
  직위?: string /*직위*/
  연락처?: number /*연락처*/
  email?: string /*이메일*/
  AI?: string /*AI 집적단지 참여여부*/
}

// 사용신청 - 사용시간 선택
export interface ApplyEstmtUseDate {
  beginDt: number /*검색시작일*/
  endDt: number /*검색종료일*/
  eqpmnId?: string /*장비 ID*/
  reqstSttus?: string /*신청상태*/
}

// 사용신청 - 예상사용금액
export interface UseReqstEstmtRntfee {
  expectRntfee:number /*예상사용금액*/
  expectUsgtm:number /*총 사용시간*/
  rntfeeHour:number /*1시간 사용료*/
  usefulHour:number /*1일 가용시간*/
}
import {AttachmentParam} from "shared/utils/Model";


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
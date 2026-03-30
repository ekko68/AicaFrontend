import {WithCustomRowData} from "shared/components/TableComponents";

export interface SearchParam {
  bsnsYear?: string /*사업연도*/
  bsnsNm?: string /*사업명*/
  planPresentnSttusCd?: string /*처리상태*/
  pblancNm?: string /*공고명*/
  receiptNo?: string /*접수번호*/
  taskNmKo?: string /*과제명*/
  memberNm?: string /*회원명*/
}

/** 사업계획서 */
export interface UspBsnsPlan{
  rn: string /*순번*/ 
  bsnsPlanDocId: string /*사업계획서ID*/
  bsnsSlctnId: string /*사업선정대상ID*/
  taskNmKo?: string /*과제명(국문)*/
  taskNmEn?: string /*과제명(영문)*/
  applyField?: string /*지원분야*/
  prsentrId?: string /*제출자ID*/
  presentnDt?: string /*제출일시*/
  planPresentnSttusCd?: string /*사업계획제출상태코드(G:PLAN_PRESENTN_STTUS)  처리상태 */
  planPresentnSttusNm?: string /*사업계획제출상태코드명*/
  applyId?: string
  bsnsNm?: string /*사업명*/
  bsnsYear?: string /*사업연도*/
  receiptNo?: string /*접수번호*/
  presentnDtStart?: string /*제출일시작*/
  presentnDtEnd?: string /*제출일종료*/
  pblancNm?: string /*공고명*/
  bsnsBgnde?: string /*사업시작일*/
  bsnsEndde?: string /*사업종료일*/
  rspnberNm: number /*책임자명*/
  presentnDy: number /*제출일*/
  bsnsPd?:  string /*사업기간*/
  bsnsPdAll?:  string /** 사업기간(전체) */
  bsnsPdYw?:  string /** 사업기간(당해) */

  memberType?: string /*신청자구분*/
  memberId?: string /*신정자ID (회원명)*/
  memberNm?: string /*회원명*/
  mbtlnum?: string /*휴대폰번호*/
  brthdy?: string /*생년월일*/
  email?: string /*이메일*/
  gender?: string /*성별*/
  ceoNm?: string /*대표자명*/
  chargerNm?: string /*담당자명*/
  bizrno?: string /*사업자등록번호*/
  requestDt?: string /*요청일시*/
}

/** 과제책임자 */
export interface UspTaskRspnber {
  taskRspnberId?: string /*과제책임자ID*/
  bsnsPlanDocId: string /*사업계획서ID*/
  rspnberNm?: string /*책임자명*/
  encBrthdy?: string /*암호화된 생년월일*/
  encMbtlnum?: string /*암호화된 휴대폰번호*/
  encEmail?: string /*암호화된 이메일*/
  deptNm?: string /*부서명*/
  clsfNm?: string /*직급명*/
  adres?: string /*주소*/
  encTelno?: string /*암호화된 전화번호*/
  encFxnum?: string /*암호화된 팩스번호*/
  tlsyRegistNo?: string /*과학기술인등록번호*/
  partcptnCompanyCnt?: string /*참여기업수*/
  smlpzCnt?: string /*중소기업수*/
  mspzCnt?: string /*중견기업수*/
  etcCnt?: string /*기타수*/
  rn: string /*순번*/ 
}

/** 참여기업 */
export interface UsptTaskPrtcmpny {
  taskPartcptnEntrprsId?: string /*과제참여기업ID*/
  entrpsNm?: string /*업체명*/
  rspnberNm?: string /*책임자명*/
  clsfNm?: string /*직급명*/
  telno?: string /*전화번호*/
  encTelno?: string /*암호화된 전화번호*/
  mbtlnum?: string /*휴대폰번호*/
  encMbtlnum?: string /*암호화된 휴대폰번호*/
  email?: string /*이메일*/
  encEmail?: string /*암호화된 이메일*/
  tlsyRegistNo?: string /*과학기술인등록번호*/
}

/** 파일첨부 */
export interface UsptTaskPartcpts {
  rn: string; /*순번*/
  taskPartcptsId?: string /*과제참여자ID*/
  bsnsPlanDocId?: string /*사업계획서ID*/
  partcptsNm?: string /*참여자명*/
  chrgRealmNm?: string /*담당분야명*/
  mbtlnum?: string /*휴대폰번호*/
  encMbtlnum?: string /*암호화된 휴대폰번호*/
  brthdy?: string /*생년월일*/
  encBrthdy?: string /* 암호화된 생년월일*/
  partcptnRate?: number /*참여율*/
  memberId?: number /*회원ID : 소속업체회원ID*/
  memberNm?: boolean /*회원명*/
}

/** 파일첨부 */
export interface CmmtAttachment {
  rn: string;
  attachmentId?: string /*파일 아이디*/
  attachmentGroupId?: string /*파일 그룹 아이디*/
  fileNm?: string /*파일 이름*/
  contentType?: string /*파일 유형*/
  fileSize?: number /* 파일사이즈*/
  savedFilePath?: string /*저장된 파일 경로*/
  downloadCnt?: number /*다운로드수*/
  fileDeleted?: boolean /*파일 삭제 여부*/
}

export interface BsnsPlanEntity{
  usptBsnsPlanDoc?: UspBsnsPlan;
  usptTaskRspnber?: UspTaskRspnber;
  usptTaskPrtcmpny?: UsptTaskPrtcmpny[];
  usptTaskPartcpts?: UsptTaskPartcpts[];
  attachFileList: CmmtAttachment[];
}

export interface BsnsPlanProcessHist{
  rn: string /*순번*/ 
  planProcessHistId: string /*구분*/
  bsnsPlanDocId: string /*구분*/
  planPresentnSttusCd: string /*구분*/
  planPresentnSttusNm: string /*구분*/
  resnCn: string /*사유*/
  name: string /*처리자명*/
  creatorId: string /*처리자ID*/
  creatorNm: string /*처리자명*/
  createdDt: number /*처리일시*/
}

export interface CmmCode{
  code?: string /*코드*/ 
  codeGroup?: string /*코드그룹*/ 
  codeNm?: string /*코드명*/ 
  codeType?: string /*코드유형*/ 
  enabled?: string /*사용가능여부*/ 
  remark?: string /**/ 
  sortOrder?: number /*순서*/ 
}
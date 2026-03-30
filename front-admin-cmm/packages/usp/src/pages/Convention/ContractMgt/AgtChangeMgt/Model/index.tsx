
export interface SearchParam {
  cnvnChangeSttusCd?: string  /** 협약변경상태코드(G:CNVN_CHANGE_STTUS) */
  cnvnChangeTypeCd?: string  /** 협약변경유형(CNVN_CHANGE_TYPE) */
  changeIemDivCd?: string /** 협약변경항목구분코드(G:CHANGE_IEM_DIV) */
  receiptNo?: string /*접수번호*/
  taskNmKo?: string /*과제명*/
  memberNm?: string /** 신정자명 */
}

export interface CnvnChange{
  rn: string /*순번*/ 
  cnvnChangeSttusCd: string /*처리상태*/ /** 협약변경상태코드(G:CNVN_CHANGE_STTUS) */
  receiptNo: string /*접수번호*/
  taskNmKo: string /*과제명*/
  memberNm: string /** 신청자명 */
  cnvnChangeTypeCd: string /** 협약변경유형(CNVN_CHANGE_TYPE) */
  changeIemDivCd: string /** 협약변경항목구분코드(G:CHANGE_IEM_DIV) */
  cnvnChangeReqId: string /** 협약변경요청ID */
  reqDe: number /*신청일*/
  bsnsSlctnId: string  /** 사업선정대상ID */
}

export interface BsnsPlanProcessHist{
  rn: string /*순번*/ 
  createdDt: number /*처리일시*/
  planPresentnSttusCd: string /*구분*/
  resnCn: string /*사유*/
  name: string /*처리자명*/
  creatorId: string /*처리자ID*/
}
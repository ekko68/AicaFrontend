
export interface SearchParam {
  bsnsYear?: string /*사업연도*/
  cnvnTrmnatDe?: string  /**협약해지일**/
  receiptNo?: string /*접수번호*/
  taskNmKo?: string /*과제명*/
  memberNm?: string /** 사업자명 */
  bsnsNm?: string  /**사업명*/
}

export interface CnvnTrmnat{
  rn: string /*순번*/ 
  receiptNo?: string /*접수번호*/
  taskNmKo?: string /*과제명*/
  bsnsYear?: string /*사업연도*/
  bsnsNm?: string  /**사업명*/
  memberNm?: string /** 신정자명 */
  cnvnTrmnatDeStart?: string /**협약해지일 시작- 조회조건**/
  cnvnTrmnatDeEnd?: string /**협약해지일 종료- 조회조건**/
  resnCn?: string  /** 사유내용 */
  cnvnTrmnatDe?: string  /**협약해지일**/
  applyId: string  /** 신청ID */
  bsnsCnvnId: string /** 사업협약ID */
}

export interface BsnsPlanProcessHist{
  rn: string /*순번*/ 
  createdDt: number /*처리일시*/
  planPresentnSttusCd: string /*구분*/
  resnCn: string /*사유*/
  name: string /*처리자명*/
  creatorId: string /*처리자ID*/
}
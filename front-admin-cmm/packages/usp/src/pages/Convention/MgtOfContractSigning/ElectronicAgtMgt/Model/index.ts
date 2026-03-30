import {WithCustomRowData} from "shared/components/TableComponents";

export interface SearchParam {
  bsnsYear?: string /*사업연도*/
  bsnsNm?: string /*사업명*/
  cnvnSttusCd?: string /*협약상태*/
  cnvnBgnde?: number /**협약시작일**/
  cnvnEndde?: number /**협약종료일**/
  receiptNo?: string /*접수번호*/
  taskNmKo?: string /*과제명*/
  memberNm?: string /**회원명(주관업체명) */
  rspnberNm?: string /**과제책임자명 */
}

export interface CnvnCncls{
  rn: string /*순번*/ 
  cnvnSttusCd: string /*협약상태*/
  receiptNo: string /*접수번호*/
  taskNmKo: string /*과제명*/
  bsnsYear: string /*사업연도*/
  bsnsNm: string /*사업명*/
  pblancNm: string /*공고명*/
  memberNm: string /*회원명*/
  cnvnDe: number /*협약일*/
  cnvnTrmnatDe: number /** 협약해지일 */
  bsnsCnvnId: string /** 사업협약ID */
}
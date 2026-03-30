import dayjs from "dayjs";
import {BaseResponse} from "shared/utils/Model";

export type questsType = {
  qnaId:string,
  questId?:string,
  questStatus:string,
  categoryCd?:string,
  title?:string,
  memberNm?:string,
  questBeginDay?: Date | null | string,
  questEndDay?:Date | null  | string,
  page:number,
  itemsPerPage:number,
}

export interface applyExpertCareer{
  workBgnde:string,               /** 근무시작일 */
  workEndde:string,               /** 근무종료일 */
  wrcNm:string,                   /** 직장명 */
  deptNm:string,                  /** 부서명 */
  ofcpsNm:string,                      /** 직위명 */
  chrgJobNm:string,                   /** 담당업무명 */

}
// 레이아웃 유형
export type LayoutType = 'studio' | 'promotion' | 'space' | 'paper'| 'empty';
// 라우터 유형
export type RouteType = {
  label?: string;
  layout?: LayoutType;
  element?: any;
  path?: string;
  index?: boolean;
  middleware?: string[];
  children?: RouteType[];
};

// 미들웨어 유형
export type MiddlewareType = 'auth' | 'factor'; 

export const initExpertCarrer:applyExpertCareer ={
  workBgnde: dayjs(new Date()).format('YYYYMMDD'),
  workEndde: dayjs(new Date()).format('YYYYMMDD'),
  wrcNm: "",
  deptNm: "",
  ofcpsNm: "",
  chrgJobNm: ""
}













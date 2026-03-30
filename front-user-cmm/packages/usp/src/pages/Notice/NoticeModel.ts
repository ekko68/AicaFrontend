import {BaseResponse} from "shared/utils/Model";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface Noticeitems {
  img?:string;
  isNew: string;
  pblancDay: string;
  pblancId: string;
  pblancNm: string;
  pblancSttus: string;
  pblancSumry: string;
  rceptEndde: string;
  rceptPd: string;
  rdcnt: number;
  recomendCl: string;
  rmndrDay: number
}

export interface CodeType {
  code: string;
  codeGroup : string;
  codeNm: string;
  codeType?: string;
}
export interface paramsType {
  pblancNm:string,
  ordtmRcrit: boolean,
  pblancSttus: string,
  applyMberType: string,
  recomendCl: string,
  sortOrder: string,
  page:number
  itemsPerPage: number
}

export interface detailType {
  pblancId:string,
  ordtmRcrit?: boolean,
  pblancSttus?: string,
  applyMberType?: string,
  recomendCl?: string,
  sortOrder?: string,
}

export interface SttusType { pblancSttus:string, applyMberType:string, recomendCl:string}

// 검색구분 코드
export const groupId:string[] = ["MEMBER_TYPE","PBLANC_STTUS","RECOMEND_CL"];
export const imsiBox:CodeType[] = [{codeGroup: "NOTICE_CODE", code: "false", codeNm: "정시모집"},{ codeGroup: "NOTICE_CODE", code: "true", codeNm: "상시모집"}]
export const alwaysCurrencies = [
  { value: 'pblancDay', label: '공고일수' },
  { value: 'close', label: '마감일순' },
  { value: 'rdcnt', label: '조회순' },
];
export const alwaysBsnsPblan = [
  { value: 'pblancDay', label: '공고일수' },
  { value: 'close', label: '마감일순' },
  { value: 'rdcnt', label: '조회순' },
];
export const alwaysPercontBox = [
  { value: '10', label: '10개씩' },
  { value: '20', label: '20개씩' },
  { value: '30', label: '30개씩' },
];
export const ontimeCurrencies = [
  { value: 'pblancDay', label: '공고일수' },
  { value: 'close', label: '마감일순' },
  { value: 'rdcnt', label: '조회순' },
];
export const ontimeBsnsPblan = [
  { value: 'pblancDay', label: '공고일수' },
  { value: 'close', label: '마감일순' },
  { value: 'rdcnt', label: '조회순' },
];
export const ontimePercontBox = [
  { value: '10', label: '10개씩' },
  { value: '20', label: '20개씩' },
  { value: '30', label: '30개씩' },
];

export const swiperParams = {
  navigation : false,
  slidesPerView: 4.5,
  slidesPerGroup: 4,
  spaceBetween: 20,
  speed: 600, 
  pagination : true,
  autoHeight : true,
  breakpoints : {// 반응형	
    320 : { 
      slidesPerView : 1.3,
      slidesPerGroup: 1,
    },	
    768 : {  
      slidesPerView : 2.5,
      slidesPerGroup: 2,
    },
    1224 : { // 테블릿
      slidesPerView : 4.5,
      slidesPerGroup: 4,
    },
  }
}
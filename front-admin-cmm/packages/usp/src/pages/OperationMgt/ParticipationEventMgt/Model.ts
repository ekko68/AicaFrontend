/*검색 파라미터*/
import {AttachmentParam} from "shared/utils/Model";

export interface SearchParam {
  제목?: string
  회원명?: string
  문의구분?: string
  처리상태?: string
  전시여부?: string
  시작시간?: number
  종료시간?: number
  이벤트명?: string
}

// 디딤널 목록 조회
export interface 디딤널목록조회 {
  처리상태: string
  문의구분: string
  제목: string
  회원명: string
  담당자: string
  접수일: number
}

// 디딤널 상세
export interface 디딤널상세조회 {
  접수일: number
  처리상태: string
  담당자: string
  회원유형: string
  사업자명: string
  담당자명: string
  직급: string
  휴대폰번호: number
  이메일: string
  회원ID: string
  문의구분: string
  제목: string
  내용: string
  첨부파일: AttachmentParam[];
}

// 자원정보공유 관리 목록 조회
export interface 자원정보공유목록조회 {
  전시여부: string
  제목: string
  회원명: string
  등록일: number
}

export interface 자원정보공유상세조회 {
  등록일: number
  전시상태: string
  회원유형: string
  사업자명: string
  담당자명: string
  직급: string
  휴대폰번호: number
  이메일: string
  회원ID: string
  문의구분: string
  제목: string
  내용: string
  첨부파일: AttachmentParam[];
}

export interface 행사이벤트관리목록조회 {
  이벤트명: string
  전시여부: string
  이벤트시작일: number
  이벤트종료일: number
  등록일: number
}

export interface 행사이벤트상세조회 {
  등록일?: number
  전시여부?: string
  이벤트명: string
  이동경로: string
  전시시작일: number
  전시종료일: number
  새창여부: boolean
  상세정보?: string
  첨부파일?: AttachmentParam[];
}
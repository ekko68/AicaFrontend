export interface 검색파라미터 {
  전시여부?: string
  전시시작일?: number
  전시종료일?: number
  팝업명?: string
  배너명?: string
}

export interface 홈팝업창목록조회 {
  팝업명: string
  전시시작일:number
  전시종료일:number
  전시여부: string
  등록일: number
}

// 홈팝업창 상세 및 등록
export interface 홈팝업창상세 {
  등록일?: number
  전시여부?: string
  팝업명: string
  이동경로: string
  전시시작일: number
  전시종료일: number
  새창여부: boolean
  팝업창폭: number
  팝업창높이: number
  이미지?: any
}

export interface 홈팝업창등록 {
  팝업명?: string
  이동경로?: string
  전시시작일?: number
  전시종료일?: number
  새창여부?: boolean
  팝업창폭?: number
  팝업창높이?: number
  이미지?: any
}

export interface 홈배너목록조회 {
  배너명: string
  전시시작일: number
  전시종료일: number
  전시여부: string
  등록일: number
}

export interface 홈배너상세 {
  등록일?: number
  전시여부?: string
  배너명: string
  이동경로: string
  전시시작일: number
  전시종료일: number
  새창여부: boolean
  이미지?: any
}

export interface 홈배너등록 {
  배너명?: string
  이동경로?: string
  전시시작일?: number
  전시종료일?: number
  새창여부?: boolean
  이미지?: any
}

export interface 약관관리페이지 {
  id: number
  날짜: number
  내용?: string
  시행일자?: number
}
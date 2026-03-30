
export interface ErrorMessage {
  message: string
  field?: string
}

export interface BaseResponse {
  success: boolean,
  headers: string,
  errors?: ErrorMessage[]
}

export type WithResponse<T> = T & {
  success: boolean,
  headers: string,
  errors?: ErrorMessage[]
}

export type WithPagination<T> = T & {
  page: number
  itemsPerPage: number
  totalItems: number
  list: T[]
}

// 서버에서 nhn게이트웨이에 등록을 위해 오브젝트로 내려야 해서 list 혹은 value값을 던질때 사용
export type WithListResponse<T> = T & {
  success: boolean,
  headers: string,
  errors?: ErrorMessage[]
  list: T[]
}

export type WithValueResponse<T> = T & {
  success: boolean,
  headers: string,
  errors?: ErrorMessage[]
  value: T
}

// 첨부파일 관련
export interface AttachmentParam {
  fileNm?: string
  attachmentId?: string | any
  fileSize?: number | any
  fileType?: string
}

// 첨부파일 관련
export interface 첨부파일 {
  파일이름?: string
  파일ID?: string | any
  파일용량?: number | any
  파일타입?: string
}
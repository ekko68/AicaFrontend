export interface BoardQuery {
  systemId: string;
  enabled?: boolean;
  qnaId?: string;
  qnaNm?: string;
}

export interface BoardItem {
  qnaId: string;
  qnaNm: string;
  systemId: string;
  articleCnt: number;
  category: boolean;
  categoryCodeGroup: string;
  attachable: boolean;
  attachmentSize: number;
  attachmentExt: string;
  enabled: boolean;
  creatorId: string;
  createdDt: Date;
  updaterId: string;
  updatedDt: Date;
}

export interface AnswerQuery {
  loginId?: string;
  memberNm?: string;
  deptNm?: string;
}

export interface AnswerResult {
  memberId: string;
  memberNm: string;
  deptNm: string;
  positionNm: string;
  authorityNm: string;
  key: string;
  loginId : string;
}

export interface Qna {
  qnaId: string;
  qnaNm: string;
  systemId: string;
  category: any; //state에 편리하게 관리하기 위해 any request, response 시에는 boolean
  categoryCodeGroup?: string;
  attachable?: boolean;
  attachmentSize?: number;
  attachmentExt?: string;
  enabled?: boolean;
  options?: string[]; //옵션 관리를 위해 API 스펙에는 없지만 추가
}

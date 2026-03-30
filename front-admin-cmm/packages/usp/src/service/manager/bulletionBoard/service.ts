export interface BoardQuery {
  systemId: string;
  enabled?: boolean;
  boardId?: string;
  boardNm?: string;
}

export interface BoardItem {
  boardId: string;
  systemId: string;
  boardNm: string;
  articleCnt: number;
  enabled: boolean;
  noticeAvailable: boolean;
  commentable: boolean;
  category: boolean;
  categoryCodeGroup: string;
  attachable: boolean;
  attachmentSize: number;
  attachmentExt: string;
  useSharedUrl: boolean;
  useThumbnail: boolean;
  useForm: boolean;
  allReadable: boolean;
  creatorId: string;
  createdDt: Date;
  updaterId: string;
  updatedDt: Date;
}

export interface Authority {
  boardId: string;
  authorityId: string;
  boardAuthority: string;
}

export interface BoradInfomation {
  boardId: string;
  systemId: string;
  boardNm: string;
  articleCnt: number;
  enabled: any; //state에 편리하게 관리하기 위해 any request, response 시에는 boolean
  noticeAvailable: boolean;
  commentable: boolean;
  category: boolean;
  categoryCodeGroup: string;
  attachable: boolean;
  attachmentSize: number;
  attachmentExt: string;
  useSharedUrl: any; //state에 편리하게 관리하기 위해 any request, response 시에는 boolean
  useThumbnail: any; //state에 편리하게 관리하기 위해 any request, response 시에는 boolean
  useForm: any; //state에 편리하게 관리하기 위해 any request, response 시에는 boolean
  allReadable: any; //state에 편리하게 관리하기 위해 any request, response 시에는 boolean
  authority: Partial<Authority>[] | { [key: string]: string };
  options: string[]; //옵션 관리를 위해 API 스펙에는 없지만 추가
}

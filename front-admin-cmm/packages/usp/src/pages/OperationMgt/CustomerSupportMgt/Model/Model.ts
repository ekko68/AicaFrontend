import {WithCustomRowData} from "shared/components/TableComponents";

export interface SearchParam {
  분류?: string /*분류*/
  전시여부?: string /*전시여부*/
  제목?:string /*제목*/
  제목명?: string /*제목명*/
  처리상태?: string /*처리상태*/
  문의구분?: string /*문의구분*/
  회원명?: string /*회원명*/
  시작일?: number /*시작일*/
  종료일?: number /*종료일*/
 
}

export interface 자주묻는질문{
  id: string
  분류: string
  제목: string
  전시여부: string
  등록일: string
}

export interface 사용자메뉴얼{
  id:string
  분류:string
  제목:string
  전시여부:string
  등록일:string
}

export interface 자료실{
  id:string
  분류:string
  제목:string
  전시여부:string
  등록일:string
}

export interface OneByOne문의{
  id:string
  처리상태:string
  문의구분:string
  제목:string
  회원명:string
  담당자:string
  접수일:string
}

export interface 공지사항{
  id:string
  전시여부:string
  제목:string
  고정여부:string
  등록일:string
}

export interface 공지상세정보{
  주제: string
  내용: string
}

export interface 관련주소사이트{
  번호?: number
  사이트명: string
  사이트주소: string
}

export interface 관리자공지{
  id:string
  전시여부:string
  제목:string
  고정여부:string
  등록일:string
}


export const dummyFreAskList:WithCustomRowData<자주묻는질문>[] = [
  {
    key: '1',
    id: '1',
    분류: '지원/신청',
    제목: 'AICA에서만...',
    전시여부: '전시',
    등록일: '2021-10-01'
  },{
    key: '1',
    id: '1',
    분류: '시설/운영',
    제목: 'Aica에서도...',
    전시여부: '전시안함',
    등록일: '2021-10-01'
  }
]

export const dummyUserManualList:WithCustomRowData<사용자메뉴얼>[] = [
  {
    key: '1',
    id: '1',
    분류: '사업관리',
    제목: '지원사업공고 신청 시스템 메뉴얼',
    전시여부: '전시',
    등록일: '2021-10-01'
  },{
    key: '1',
    id: '1',
    분류: '실증지원',
    제목: '과제 보고서 작성 메뉴얼',
    전시여부: '전시안함',
    등록일: '2021-10-01'
  }
]

export const dummyArchiveList:WithCustomRowData<자료실>[] = [
  {
    key: '1',
    id: '1',
    분류: '사업관리',
    제목: '지원사업공고 신청 시스템 메뉴얼',
    전시여부: '전시',
    등록일: '2021-10-01'
  },{
    key: '1',
    id: '1',
    분류: '실증지원',
    제목: '과제 보고서 작성 메뉴얼',
    전시여부: '전시안함',
    등록일: '2021-10-01'
  }
]

export const dummyOneByOneList:WithCustomRowData<OneByOne문의>[] = [
  {
    key: '1',
    id: '1',
    처리상태:'접수',
    문의구분:'지원/신청',
    제목:'사업계획서를 제출해야 하는데...',
    회원명:'(주)블루레몬',
    담당자: '박원희',
    접수일: '2021-10-01',
  },{
    key: '1',
    id: '1',
    처리상태:'답변완료',
    문의구분:'데이터/시스템',
    제목:'데이터 반출을 신청했는데, 오류가 생겼습니다.',
    회원명:'고은영',
    담당자: '박원희',
    접수일: '2021-10-01',
  }
]

export const dummyNoticeList:WithCustomRowData<공지사항>[] = [
  {
    key: '1',
    id: '1',
    전시여부:'전시',
    제목:'2022년 AI 인공지능...',
    고정여부:'고정',
    등록일:'2021-10-01',
  },{
    key: '1',
    id: '1',
    전시여부:'전시안함',
    제목:'광주시, 인공지능 사내대학 특강 실시',
    고정여부:'고정안함',
    등록일:'2021-10-01',
  }
]

export const dummyManagerNoticeList:WithCustomRowData<관리자공지>[] = [
  {
    key: '1',
    id: '1',
    전시여부:'전시',
    제목:'사용자지원포털 어드민 일시 사용...',
    고정여부:'고정',
    등록일:'2021-10-01',
  },{
    key: '1',
    id: '1',
    전시여부:'전시안함',
    제목:'안심구역 임시 공사로 ...',
    고정여부:'고정안함',
    등록일:'2021-10-01',
  }
]
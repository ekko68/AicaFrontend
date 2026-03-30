import {AddressParam, WithCustomRowData} from "shared/components/TableComponents";
import {WithPagination} from "shared/utils/Model";

export interface SearchParam {
  처리상태?: string /*처리상태*/
  시작일?: number /*시작일*/
  종료일?: number /*종료일*/
  이름?: string /*이름*/
  직장명?: string /*직장명*/
  전문가명?: string  /*전문가명*/
}

export interface 전문가신청리스트 {
  id: string
  처리상태: string
  이름: string
  직장명: string
  직위: string
  신청일: number
}

export interface 전문가정보리스트 {
  id: string
  전문가명: string
  성별: string
  내외국인: string
  직장명: string
  직위: string
}

export interface 전문분야 {
  id?: string
  depth1: string
  depth2: string
}

export interface 경력정보 {
  id?: string
  근무시작일: number
  근무종료일: number
  직장명: string
  부서명: string
  직위: string
  담당업무: string
}

export interface 학력정보 {
  id?: string
  근무시작일: number
  근무종료일: number
  학위: string
  학교명: string
  전공: string
  지도교수: string
  졸업구간: string
}

export interface 자격증정보 {
  id?: string
  취득일: number
  자격증명: string
  발급기관: string
}

export interface 전문가신청처리이력 {
  id: string
  처리일시: number
  구분: string
  사유: string
  처리자명: string
  처리자ID: string
}

export type 전문가매칭 = WithPagination<전문가매칭이력> & {
  년도: string[]
}

export interface 전문가정보상세 {
  id: string
  이름: string
  생년월일: string
  성별: string
  내외국인: string
  휴대폰번호: string
  이메일: string

  직장명: string
  부서명: string
  직위: string
  직무: string
  직장전화번호: string
  학부: string
  최종대학명: string
  주소: AddressParam

  전문분야: 전문분야[]
  경력정보: 경력정보[]
  학력정보: 학력정보[]
  자격증정보: 자격증정보[]
}

export interface 전문가매칭이력 {
  id: string
  매칭일: number
  사업년도: string
  사업명: string
  공고번호: string
  공고명: string
  활동분야: string
}

export interface 전문가단분류 {
  id: string /*전문가분류 ID*/
  전문가단명: string /*전문가단명*/
  부모Id: string /*부모장비분류 ID*/
  순서: number /*정렬 순서*/
  depth: number /*Depth*/
  사용여부: string /*사용여부*/

  child?: 전문가단분류[]
}

export interface 전문가분류관리_담당자 {
  id: string /*id*/
  부서명: string /*부서명*/
  이름: string /*이름*/
  직급: string /*직급*/
}

export const firstClsfc = ['평가위원', '법률/변호사']
export const secondClsfc = ['AI 에너지', '특허/상표']

export const 학위 = ['고졸', '학사', '석사', '박사']
export const 졸업구분 = ['수료', '졸업']

export const dummyExpertList: WithCustomRowData<전문가신청리스트>[] = [
  {
    key: '1',
    id: '1',
    처리상태: '신청',
    이름: '김영현',
    직장명: 'bNet',
    직위: '책임',
    신청일: 1660815022610,
  }, {
    key: '2',
    id: '2',
    처리상태: '반려',
    이름: '이종현',
    직장명: 'bNet',
    직위: '책임',
    신청일: 1660815022610,
  }, {
    key: '3',
    id: '3',
    처리상태: '승인',
    이름: '배정주',
    직장명: 'bNet',
    직위: '책임',
    신청일: 1660815022610,
  }, {
    key: '4',
    id: '4',
    처리상태: '반려',
    이름: '이충혁',
    직장명: 'bNet',
    직위: '책임',
    신청일: 1660815022610,
  }, {
    key: '5',
    id: '5',
    처리상태: '신청',
    이름: '윤여택',
    직장명: 'bNet',
    직위: '책임',
    신청일: 1660815022610,
  }
]
export const dummyExpertHistList: WithCustomRowData<전문가신청처리이력>[] = [
  {
    key: '1',
    id: '1',
    처리일시: 1660815022610,
    구분: '승인',
    사유: '승인 처리되었습니다.',
    처리자명: '김영현',
    처리자ID: 'yhkim',
  }, {
    key: '2',
    id: '2',
    처리일시: 1660815022610,
    구분: '반려',
    사유: '첨부된 신청정보파일의 양식이 본 사업의 사업신청정보 양식과 다릅니다. 확인 및 수정 후 재 신청바랍니다.\n' +
      '기한을 넘길 경우 반려처리될 수 있습니다. \n' +
      '기한 : 2021-12-32 18:00 까지\n' +
      '\n' +
      '보완요청 내용이 출력됩니다. 보완요청 내용이 출력됩니다. 보완요청 내용이 출력됩니다. 보완요청 내용이 출력됩니다. \n',
    처리자명: '김영현',
    처리자ID: 'yhkim',
  }
]
export const dummyExpertInformationHistList: WithCustomRowData<전문가매칭이력>[] = [
  {
    key: '1',
    id: '1',
    매칭일: 1660815022610,
    사업년도: '2021',
    사업명: '21 AI (시)제품/서비스 제작지원 사업',
    공고번호: '2021-39',
    공고명: 'AI (시)제품/서비스 제작지원 사업 공고',
    활동분야: '평가위원',
  }, {
    key: '2',
    id: '2',
    매칭일: 1660815022610,
    사업년도: '2022',
    사업명: '22 AI (시)제품/서비스 제작지원 사업',
    공고번호: '2021-40',
    공고명: 'AI (시)제품/서비스 제작지원 사업 공고',
    활동분야: '평가위원',
  }
]
export const dummyExpertInfoList: WithCustomRowData<전문가정보리스트>[] = [
  {
    key: '1',
    id: '1',
    전문가명: '김영현',
    성별: '남자',
    직위: '책임',
    직장명: 'bnet',
    내외국인: '내국인'
  }, {
    key: '2',
    id: '2',
    전문가명: 'brad',
    성별: '남자',
    직위: '책임',
    직장명: 'bnet',
    내외국인: '외국인'
  }, {
    key: '3',
    id: '3',
    전문가명: '이종현',
    성별: '여자',
    직위: '책임',
    직장명: 'bnet',
    내외국인: '내국인'
  },
]

export const categoryFlatten: 전문가단분류[] = [
  {
    id: '1',
    전문가단명: '평가위원',
    부모Id: 'ROOT',
    순서: 1,
    depth: 1,
    사용여부: '사용',
  }, {
    id: '1-1',
    전문가단명: 'AI 자율주행',
    부모Id: '1',
    순서: 1,
    depth: 2,
    사용여부: '사용',
  }, {
    id: '1-3',
    전문가단명: 'AI 헬스케어',
    부모Id: '1',
    순서: 3,
    depth: 2,
    사용여부: '사용',
  }, {
    id: '1-4',
    전문가단명: 'AI 에너지',
    부모Id: '1',
    순서: 4,
    depth: 2,
    사용여부: '사용',
  }, {
    id: '2',
    전문가단명: '창업,사업화 컨설팅',
    부모Id: 'ROOT',
    순서: 2,
    depth: 1,
    사용여부: '사용',
  }, {
    id: '3',
    전문가단명: '법률/변호사',
    부모Id: 'ROOT',
    순서: 3,
    depth: 1,
    사용여부: '사용',
  }, {
    id: '3-1',
    전문가단명: '특허/상표',
    부모Id: '3',
    순서: 1,
    depth: 2,
    사용여부: '사용',
  }, {
    id: '3-2',
    전문가단명: '저작권',
    부모Id: '3',
    순서: 2,
    depth: 2,
    사용여부: '사용',
  }, {
    id: '4',
    전문가단명: '투자유치 컨설턴트',
    부모Id: 'ROOT',
    순서: 4,
    depth: 1,
    사용여부: '사용',
  }
]

export const dummyExpertManager: WithCustomRowData<전문가분류관리_담당자>[] = [
  {
    key: '1',
    id: '1',
    부서명: '창업지원팀',
    이름: '홍길동',
    직급: '책임'
  }, {
    key: '2',
    id: '2',
    부서명: '창업지원팀',
    이름: '이은영',
    직급: '책임'
  }
]

export const dummyExpertInformation: 전문가정보상세 = {
  id: 'expert-fsndklfnw',
  이름: '김원희',
  생년월일: '1970-09-23',
  성별: '여성',
  내외국인: '내국인',
  휴대폰번호: '010-1234-1234',
  이메일: 'abc@gmail.com',

  직장명: '블루레몬',
  부서명: '개발부서',
  직위: '부장',
  직무: 'AI 기술개발',
  직장전화번호: '0625566695',
  학부: 'AI 융합개발학부',
  최종대학명: '서울대학교',
  주소: {zonecode: '32156', address: '서울시 중구 정동길 35', detailAddress: 'A 빌딩 2021호'},

  전문분야: [{id: 'id-njkneqwf', depth1: '평가위원', depth2: 'AI 에너지'}],
  경력정보: [{
    id: 'id-smnvlkw',
    근무시작일: 1660815022610,
    근무종료일: 1660815022610,
    직장명: '김원희 법률사무소',
    부서명: '-',
    직위: '대표',
    담당업무: '특허관련 법률 상담'
  }],
  학력정보: [{
    id: 'id-vnsajlkje',
    근무시작일: 1660815022610,
    근무종료일: 1660815022610,
    학위: '석사',
    학교명: '서울데학교',
    전공: 'AI 융합과',
    지도교수: '강하늘',
    졸업구간: '수료'
  }],
  자격증정보: [{id: 'id-jbkwewfds', 취득일: 1660815022610, 자격증명: '인공지능산업컨설턴트', 발급기관: '(사)한국인공지능협회'}]
}